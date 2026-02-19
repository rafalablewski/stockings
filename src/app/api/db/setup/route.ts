import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '@/lib/schema';

// ── Data imports ─────────────────────────────────────────────────────────────
import { ASTS_SEC_FILINGS, ASTS_FILING_CROSS_REFS } from '@/data/asts/sec-filings';
import { ASTS_TIMELINE_EVENTS } from '@/data/asts/timeline-events';
import { UPCOMING_CATALYSTS as ASTS_CATALYSTS, COMPLETED_MILESTONES as ASTS_MILESTONES } from '@/data/asts/catalysts';
import { PARTNER_NEWS } from '@/data/asts/partners';
import { COMPS_TIMELINE } from '@/data/asts/comps-timeline';

import { BMNR_SEC_FILINGS, BMNR_FILING_CROSS_REFS } from '@/data/bmnr/sec-filings';
import { BMNR_TIMELINE_EVENTS } from '@/data/bmnr/timeline-events';
import { UPCOMING_CATALYSTS as BMNR_CATALYSTS, COMPLETED_MILESTONES as BMNR_MILESTONES } from '@/data/bmnr/catalysts';
import { BMNR_COMPETITOR_NEWS } from '@/data/bmnr/competitor-news';
import { BMNR_ADOPTION_TIMELINE } from '@/data/bmnr/ethereum-adoption';

import { SEC_FILINGS as CRCL_SEC_FILINGS } from '@/data/crcl/financials';
import { TIMELINE as CRCL_TIMELINE } from '@/data/crcl/timeline';
import { UPCOMING_CATALYSTS as CRCL_CATALYSTS, COMPLETED_MILESTONES as CRCL_MILESTONES } from '@/data/crcl/catalysts';
import { CRCL_COMPETITOR_NEWS } from '@/data/crcl/competitor-news';

/**
 * GET /api/db/setup
 *
 * One-click database setup: creates all tables and seeds data.
 * Visit this URL in your browser after setting DATABASE_URL in Vercel env vars.
 *
 * Safe to re-run — clears and re-inserts all data each time.
 */

// ── Types ────────────────────────────────────────────────────────────────────
type SecFilingRow = typeof schema.secFilings.$inferInsert;
type CrossRefRow = typeof schema.filingCrossRefs.$inferInsert;
type TimelineRow = typeof schema.timelineEvents.$inferInsert;
type CatalystRow = typeof schema.catalysts.$inferInsert;
type PartnerNewsRow = typeof schema.partnerNews.$inferInsert;

// ── Table creation SQL ───────────────────────────────────────────────────────
const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS analysis_cache (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  cache_type TEXT NOT NULL,
  cache_key TEXT NOT NULL,
  analysis_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS analysis_cache_ticker_type_key_idx
  ON analysis_cache (ticker, cache_type, cache_key);

CREATE TABLE IF NOT EXISTS sec_filings (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  period TEXT NOT NULL,
  color TEXT,
  accession_number TEXT
);

CREATE INDEX IF NOT EXISTS sec_filings_ticker_date_idx
  ON sec_filings (ticker, date);

CREATE TABLE IF NOT EXISTS filing_cross_refs (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  filing_key TEXT NOT NULL,
  source TEXT NOT NULL,
  data TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS filing_cross_refs_ticker_key_idx
  ON filing_cross_refs (ticker, filing_key);

CREATE TABLE IF NOT EXISTS timeline_events (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  event TEXT NOT NULL,
  impact TEXT NOT NULL,
  source TEXT NOT NULL,
  verdict TEXT NOT NULL,
  details TEXT NOT NULL,
  url TEXT
);

CREATE INDEX IF NOT EXISTS timeline_events_ticker_date_idx
  ON timeline_events (ticker, date);

CREATE TABLE IF NOT EXISTS catalysts (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  event TEXT NOT NULL,
  timeline TEXT,
  impact TEXT,
  category TEXT,
  status TEXT NOT NULL,
  completion_date TEXT
);

CREATE INDEX IF NOT EXISTS catalysts_ticker_status_idx
  ON catalysts (ticker, status);

CREATE TABLE IF NOT EXISTS partner_news (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  date TEXT NOT NULL,
  entity_name TEXT NOT NULL,
  category TEXT NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT,
  relevance_text TEXT,
  impact TEXT,
  source TEXT,
  url TEXT,
  entry_type TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS partner_news_ticker_date_idx
  ON partner_news (ticker, date);
`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function mapImpactToVerdict(impact?: string): string {
  if (!impact) return 'neutral';
  const lower = impact.toLowerCase();
  if (lower === 'bullish' || lower === 'positive') return 'positive';
  if (lower === 'bearish' || lower === 'negative') return 'negative';
  if (lower === 'mixed') return 'mixed';
  return 'neutral';
}

function mapSecFilings(ticker: string, filings: Array<{ date: string; type: string; description: string; period: string; color?: string; accessionNumber?: string }>): SecFilingRow[] {
  return filings.map(f => ({
    ticker,
    date: f.date,
    type: f.type,
    description: f.description,
    period: f.period,
    color: f.color ?? null,
    accessionNumber: f.accessionNumber ?? null,
  }));
}

function mapCrossRefs(ticker: string, refs: Record<string, { source: string; data: string }[]>): CrossRefRow[] {
  const rows: CrossRefRow[] = [];
  for (const [filingKey, entries] of Object.entries(refs)) {
    for (const entry of entries) {
      rows.push({ ticker, filingKey, source: entry.source, data: entry.data });
    }
  }
  return rows;
}

function mapCrclTimeline(entries: Array<{ date: string; category: string; event: string; impact: string; source: string; verdict: string; details: string; url?: string }>): TimelineRow[] {
  return entries.map(e => ({
    ticker: 'CRCL', date: e.date, category: e.category, event: e.event,
    impact: e.impact, source: e.source, verdict: e.verdict, details: e.details, url: e.url ?? null,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAstsTimeline(entries: any[]): TimelineRow[] {
  return entries.map((e: { date: string; category: string; title: string; summary?: string; details?: string[]; sources?: string[]; impact?: string }) => ({
    ticker: 'ASTS', date: e.date, category: e.category, event: e.title,
    impact: e.impact ?? '', source: (e.sources ?? []).join(', '),
    verdict: mapImpactToVerdict(e.impact),
    details: [e.summary, ...(e.details ?? [])].filter(Boolean).join('\n'), url: null,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBmnrTimeline(entries: any[]): TimelineRow[] {
  return entries.map((e: { date: string; category: string; title: string; source?: string; changes?: Array<{ metric: string; previous: string; new: string; change: string }>; notes?: string; impact?: string }) => {
    const changesText = (e.changes ?? []).map((c: { metric: string; previous: string; new: string; change: string }) => `${c.metric}: ${c.previous} → ${c.new} (${c.change})`).join('\n');
    return {
      ticker: 'BMNR', date: e.date, category: e.category, event: e.title,
      impact: e.impact ?? '', source: e.source ?? '',
      verdict: mapImpactToVerdict(e.impact),
      details: [e.notes, changesText].filter(Boolean).join('\n'), url: null,
    };
  });
}

function mapCatalysts(ticker: string, upcoming: Array<{ event: string; timeline: string; impact: string; category?: string }>, completed: Array<{ event: string; date: string; category?: string }>): CatalystRow[] {
  const rows: CatalystRow[] = [];
  for (const c of upcoming) {
    rows.push({ ticker, event: c.event, timeline: c.timeline, impact: c.impact, category: c.category ?? null, status: 'active', completionDate: null });
  }
  for (const m of completed) {
    rows.push({ ticker, event: m.event, timeline: null, impact: null, category: m.category ?? null, status: 'completed', completionDate: m.date });
  }
  return rows;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPartnerNews(entries: any[]): PartnerNewsRow[] {
  return entries.map((e: { date: string; partner: string; category: string; headline: string; summary: string; astsRelevance: string; impact: string; source: string; url?: string }) => ({
    ticker: 'ASTS', date: e.date, entityName: e.partner, category: e.category,
    headline: e.headline, summary: e.summary, relevanceText: e.astsRelevance,
    impact: e.impact, source: e.source, url: e.url ?? null, entryType: 'partner_news',
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCompetitorNews(ticker: string, entries: any[]): PartnerNewsRow[] {
  return entries.map((e: { date: string; competitor: string; category: string; headline: string; details: string[]; implication: string; thesisComparison?: string; source?: string; sourceUrl?: string }) => ({
    ticker, date: e.date, entityName: e.competitor, category: e.category,
    headline: e.headline, summary: e.details.join('\n'),
    relevanceText: e.thesisComparison ?? null, impact: e.implication,
    source: e.source ?? null, url: e.sourceUrl ?? null, entryType: 'competitor_news',
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEthereumAdoption(entries: any[]): PartnerNewsRow[] {
  return entries.map((e: { date: string; category: string; company: string; title: string; summary: string; bmnrImplication: string; impact: string; source: string; url?: string }) => ({
    ticker: 'BMNR', date: e.date, entityName: e.company, category: e.category,
    headline: e.title, summary: e.summary, relevanceText: e.bmnrImplication,
    impact: e.impact, source: e.source, url: e.url ?? null, entryType: 'ethereum_adoption',
  }));
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function GET() {
  const startTime = Date.now();
  const log: string[] = [];

  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      return NextResponse.json({
        error: 'DATABASE_URL not set',
        help: 'Go to Vercel → Settings → Environment Variables and add DATABASE_URL with your Neon connection string',
      }, { status: 500 });
    }

    const sql = neon(DATABASE_URL);
    const db = drizzle(sql, { schema });

    // Step 1: Create tables
    log.push('Step 1: Creating tables...');
    // neon() uses tagged template literals, so we use sql.unsafe() for raw SQL strings
    await sql(CREATE_TABLES_SQL as unknown as TemplateStringsArray);
    log.push('  Tables created successfully.');

    // Step 2: Clear existing data
    log.push('Step 2: Clearing existing data...');
    const tickers = ['ASTS', 'BMNR', 'CRCL'];
    for (const ticker of tickers) {
      await db.delete(schema.filingCrossRefs).where(eq(schema.filingCrossRefs.ticker, ticker));
      await db.delete(schema.secFilings).where(eq(schema.secFilings.ticker, ticker));
      await db.delete(schema.timelineEvents).where(eq(schema.timelineEvents.ticker, ticker));
      await db.delete(schema.catalysts).where(eq(schema.catalysts.ticker, ticker));
      await db.delete(schema.partnerNews).where(eq(schema.partnerNews.ticker, ticker));
    }
    log.push('  Cleared.');

    // Step 3: Seed data
    const counts: Record<string, Record<string, number>> = {};

    // Helper for batch insert
    async function batchInsert<T extends Record<string, unknown>>(
      table: Parameters<typeof db.insert>[0],
      rows: T[],
      batchSize = 50,
    ): Promise<number> {
      if (rows.length === 0) return 0;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await db.insert(table).values(batch as any);
      }
      return rows.length;
    }

    // ASTS
    log.push('Step 3: Seeding ASTS...');
    counts['ASTS'] = {};
    counts['ASTS']['sec_filings'] = await batchInsert(schema.secFilings, mapSecFilings('ASTS', ASTS_SEC_FILINGS));
    counts['ASTS']['filing_cross_refs'] = await batchInsert(schema.filingCrossRefs, mapCrossRefs('ASTS', ASTS_FILING_CROSS_REFS));
    counts['ASTS']['timeline_events'] = await batchInsert(schema.timelineEvents, mapAstsTimeline(ASTS_TIMELINE_EVENTS));
    counts['ASTS']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('ASTS', ASTS_CATALYSTS, ASTS_MILESTONES));
    counts['ASTS']['partner_news'] = await batchInsert(schema.partnerNews, mapPartnerNews(PARTNER_NEWS));
    counts['ASTS']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('ASTS', COMPS_TIMELINE));

    // BMNR
    log.push('Step 4: Seeding BMNR...');
    counts['BMNR'] = {};
    counts['BMNR']['sec_filings'] = await batchInsert(schema.secFilings, mapSecFilings('BMNR', BMNR_SEC_FILINGS));
    counts['BMNR']['filing_cross_refs'] = await batchInsert(schema.filingCrossRefs, mapCrossRefs('BMNR', BMNR_FILING_CROSS_REFS));
    counts['BMNR']['timeline_events'] = await batchInsert(schema.timelineEvents, mapBmnrTimeline(BMNR_TIMELINE_EVENTS));
    counts['BMNR']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('BMNR', BMNR_CATALYSTS, BMNR_MILESTONES));
    counts['BMNR']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('BMNR', BMNR_COMPETITOR_NEWS));
    counts['BMNR']['ethereum_adoption'] = await batchInsert(schema.partnerNews, mapEthereumAdoption(BMNR_ADOPTION_TIMELINE));

    // CRCL
    log.push('Step 5: Seeding CRCL...');
    counts['CRCL'] = {};
    counts['CRCL']['sec_filings'] = await batchInsert(schema.secFilings, mapSecFilings('CRCL', CRCL_SEC_FILINGS));
    counts['CRCL']['timeline_events'] = await batchInsert(schema.timelineEvents, mapCrclTimeline(CRCL_TIMELINE));
    counts['CRCL']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('CRCL', CRCL_CATALYSTS, CRCL_MILESTONES));
    counts['CRCL']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('CRCL', CRCL_COMPETITOR_NEWS));

    // Calculate totals
    let grandTotal = 0;
    for (const tables of Object.values(counts)) {
      for (const count of Object.values(tables)) {
        grandTotal += count;
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log.push(`\nDone! ${grandTotal} rows inserted in ${duration}s`);

    return NextResponse.json({
      success: true,
      message: `Database setup complete — ${grandTotal} rows inserted`,
      duration: `${duration}s`,
      counts,
      log,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log.push(`ERROR: ${message}`);
    return NextResponse.json({
      success: false,
      error: message,
      log,
    }, { status: 500 });
  }
}
