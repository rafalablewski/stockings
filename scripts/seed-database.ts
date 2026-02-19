/**
 * Seed script: Populates the Neon database from hardcoded TypeScript data files.
 *
 * Usage: npm run seed
 * (or: npx tsx scripts/seed-database.ts)
 *
 * Idempotent: Clears tables before inserting, safe to re-run.
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../src/lib/schema';

// ── ASTS data imports ────────────────────────────────────────────────────────
import { ASTS_SEC_FILINGS, ASTS_FILING_CROSS_REFS } from '../src/data/asts/sec-filings';
import { ASTS_TIMELINE_EVENTS } from '../src/data/asts/timeline-events';
import { UPCOMING_CATALYSTS as ASTS_CATALYSTS, COMPLETED_MILESTONES as ASTS_MILESTONES } from '../src/data/asts/catalysts';
import { PARTNER_NEWS } from '../src/data/asts/partners';
import { COMPS_TIMELINE } from '../src/data/asts/comps-timeline';

// ── BMNR data imports ────────────────────────────────────────────────────────
import { BMNR_SEC_FILINGS, BMNR_FILING_CROSS_REFS } from '../src/data/bmnr/sec-filings';
import { BMNR_TIMELINE_EVENTS } from '../src/data/bmnr/timeline-events';
import { UPCOMING_CATALYSTS as BMNR_CATALYSTS, COMPLETED_MILESTONES as BMNR_MILESTONES } from '../src/data/bmnr/catalysts';
import { BMNR_COMPETITOR_NEWS } from '../src/data/bmnr/competitor-news';
import { BMNR_ADOPTION_TIMELINE } from '../src/data/bmnr/ethereum-adoption';

// ── CRCL data imports ────────────────────────────────────────────────────────
import { SEC_FILINGS as CRCL_SEC_FILINGS } from '../src/data/crcl/financials';
import { TIMELINE as CRCL_TIMELINE } from '../src/data/crcl/timeline';
import { UPCOMING_CATALYSTS as CRCL_CATALYSTS, COMPLETED_MILESTONES as CRCL_MILESTONES } from '../src/data/crcl/catalysts';
import { CRCL_COMPETITOR_NEWS } from '../src/data/crcl/competitor-news';

// ── Types ────────────────────────────────────────────────────────────────────
type SecFilingRow = typeof schema.secFilings.$inferInsert;
type CrossRefRow = typeof schema.filingCrossRefs.$inferInsert;
type TimelineRow = typeof schema.timelineEvents.$inferInsert;
type CatalystRow = typeof schema.catalysts.$inferInsert;
type PartnerNewsRow = typeof schema.partnerNews.$inferInsert;

// ── DB connection ────────────────────────────────────────────────────────────
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not set. Create .env.local with your Neon connection string.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Insert rows in batches to avoid hitting query size limits */
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

// ── SEC Filings ──────────────────────────────────────────────────────────────

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
      rows.push({
        ticker,
        filingKey,
        source: entry.source,
        data: entry.data,
      });
    }
  }
  return rows;
}

// ── Timeline Events ──────────────────────────────────────────────────────────

// CRCL uses the shared TimelineEntry type
function mapCrclTimeline(entries: Array<{ date: string; category: string; event: string; impact: string; source: string; verdict: string; details: string; url?: string }>): TimelineRow[] {
  return entries.map(e => ({
    ticker: 'CRCL',
    date: e.date,
    category: e.category,
    event: e.event,
    impact: e.impact,
    source: e.source,
    verdict: e.verdict,
    details: e.details,
    url: e.url ?? null,
  }));
}

// ASTS uses custom shape: title, summary, details[], sources[], prevValue, newValue
function mapAstsTimeline(entries: Array<{ date: string; category: string; title: string; summary?: string; details?: string[]; sources?: string[]; impact?: string }>): TimelineRow[] {
  return entries.map(e => ({
    ticker: 'ASTS',
    date: e.date,
    category: e.category,
    event: e.title,
    impact: e.impact ?? '',
    source: (e.sources ?? []).join(', '),
    verdict: mapImpactToVerdict(e.impact),
    details: [e.summary, ...(e.details ?? [])].filter(Boolean).join('\n'),
    url: null,
  }));
}

// BMNR uses custom shape: title, changes[], notes
function mapBmnrTimeline(entries: Array<{ date: string; category: string; title: string; source?: string; changes?: Array<{ metric: string; previous: string; new: string; change: string }>; notes?: string; impact?: string }>): TimelineRow[] {
  return entries.map(e => {
    const changesText = (e.changes ?? []).map(c => `${c.metric}: ${c.previous} → ${c.new} (${c.change})`).join('\n');
    return {
      ticker: 'BMNR',
      date: e.date,
      category: e.category,
      event: e.title,
      impact: e.impact ?? '',
      source: e.source ?? '',
      verdict: mapImpactToVerdict(e.impact),
      details: [e.notes, changesText].filter(Boolean).join('\n'),
      url: null,
    };
  });
}

function mapImpactToVerdict(impact?: string): string {
  if (!impact) return 'neutral';
  const lower = impact.toLowerCase();
  if (lower === 'bullish' || lower === 'positive') return 'positive';
  if (lower === 'bearish' || lower === 'negative') return 'negative';
  if (lower === 'mixed') return 'mixed';
  return 'neutral';
}

// ── Catalysts ────────────────────────────────────────────────────────────────

function mapCatalysts(ticker: string, upcoming: Array<{ event: string; timeline: string; impact: string; category?: string }>, completed: Array<{ event: string; date: string; category?: string }>): CatalystRow[] {
  const rows: CatalystRow[] = [];
  for (const c of upcoming) {
    rows.push({
      ticker,
      event: c.event,
      timeline: c.timeline,
      impact: c.impact,
      category: c.category ?? null,
      status: 'active',
      completionDate: null,
    });
  }
  for (const m of completed) {
    rows.push({
      ticker,
      event: m.event,
      timeline: null,
      impact: null,
      category: m.category ?? null,
      status: 'completed',
      completionDate: m.date,
    });
  }
  return rows;
}

// ── Partner/Competitor News ──────────────────────────────────────────────────

// ASTS PartnerNewsEntry: { date, partner, category, headline, summary, astsRelevance, impact, source, url? }
function mapPartnerNews(entries: Array<{ date: string; partner: string; category: string; headline: string; summary: string; astsRelevance: string; impact: string; source: string; url?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker: 'ASTS',
    date: e.date,
    entityName: e.partner,
    category: e.category,
    headline: e.headline,
    summary: e.summary,
    relevanceText: e.astsRelevance,
    impact: e.impact,
    source: e.source,
    url: e.url ?? null,
    entryType: 'partner_news',
  }));
}

// CompetitorNewsEntry (shared schema): { date, competitor, category, headline, details[], implication, thesisComparison?, source?, sourceUrl? }
function mapCompetitorNews(ticker: string, entries: Array<{ date: string; competitor: string; category: string; headline: string; details: string[]; implication: string; thesisComparison?: string; source?: string; sourceUrl?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker,
    date: e.date,
    entityName: e.competitor,
    category: e.category,
    headline: e.headline,
    summary: e.details.join('\n'),
    relevanceText: e.thesisComparison ?? null,
    impact: e.implication,
    source: e.source ?? null,
    url: e.sourceUrl ?? null,
    entryType: 'competitor_news',
  }));
}

// BMNR EthereumAdoptionEntry: { date, category, company, title, summary, significance, bmnrImplication, impact, source, url? }
function mapEthereumAdoption(entries: Array<{ date: string; category: string; company: string; title: string; summary: string; significance: string; bmnrImplication: string; impact: string; source: string; url?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker: 'BMNR',
    date: e.date,
    entityName: e.company,
    category: e.category,
    headline: e.title,
    summary: e.summary,
    relevanceText: e.bmnrImplication,
    impact: e.impact,
    source: e.source,
    url: e.url ?? null,
    entryType: 'ethereum_adoption',
  }));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Seeding database...\n');

  const tickers = ['ASTS', 'BMNR', 'CRCL'] as const;

  // Clear existing data (in dependency order)
  console.log('Clearing existing data...');
  for (const ticker of tickers) {
    await db.delete(schema.filingCrossRefs).where(eq(schema.filingCrossRefs.ticker, ticker));
    await db.delete(schema.secFilings).where(eq(schema.secFilings.ticker, ticker));
    await db.delete(schema.timelineEvents).where(eq(schema.timelineEvents.ticker, ticker));
    await db.delete(schema.catalysts).where(eq(schema.catalysts.ticker, ticker));
    await db.delete(schema.partnerNews).where(eq(schema.partnerNews.ticker, ticker));
  }
  console.log('  Done.\n');

  const counts: Record<string, Record<string, number>> = {};

  // ── ASTS ──────────────────────────────────────────────────────────────────
  console.log('Seeding ASTS...');
  counts['ASTS'] = {};

  counts['ASTS']['sec_filings'] = await batchInsert(
    schema.secFilings,
    mapSecFilings('ASTS', ASTS_SEC_FILINGS),
  );

  counts['ASTS']['filing_cross_refs'] = await batchInsert(
    schema.filingCrossRefs,
    mapCrossRefs('ASTS', ASTS_FILING_CROSS_REFS),
  );

  counts['ASTS']['timeline_events'] = await batchInsert(
    schema.timelineEvents,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapAstsTimeline(ASTS_TIMELINE_EVENTS as any),
  );

  counts['ASTS']['catalysts'] = await batchInsert(
    schema.catalysts,
    mapCatalysts('ASTS', ASTS_CATALYSTS, ASTS_MILESTONES),
  );

  counts['ASTS']['partner_news'] = await batchInsert(
    schema.partnerNews,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapPartnerNews(PARTNER_NEWS as any),
  );

  counts['ASTS']['competitor_news'] = await batchInsert(
    schema.partnerNews,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapCompetitorNews('ASTS', COMPS_TIMELINE as any),
  );

  // ── BMNR ──────────────────────────────────────────────────────────────────
  console.log('Seeding BMNR...');
  counts['BMNR'] = {};

  counts['BMNR']['sec_filings'] = await batchInsert(
    schema.secFilings,
    mapSecFilings('BMNR', BMNR_SEC_FILINGS),
  );

  counts['BMNR']['filing_cross_refs'] = await batchInsert(
    schema.filingCrossRefs,
    mapCrossRefs('BMNR', BMNR_FILING_CROSS_REFS),
  );

  counts['BMNR']['timeline_events'] = await batchInsert(
    schema.timelineEvents,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapBmnrTimeline(BMNR_TIMELINE_EVENTS as any),
  );

  counts['BMNR']['catalysts'] = await batchInsert(
    schema.catalysts,
    mapCatalysts('BMNR', BMNR_CATALYSTS, BMNR_MILESTONES),
  );

  counts['BMNR']['competitor_news'] = await batchInsert(
    schema.partnerNews,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapCompetitorNews('BMNR', BMNR_COMPETITOR_NEWS as any),
  );

  counts['BMNR']['ethereum_adoption'] = await batchInsert(
    schema.partnerNews,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapEthereumAdoption(BMNR_ADOPTION_TIMELINE as any),
  );

  // ── CRCL ──────────────────────────────────────────────────────────────────
  console.log('Seeding CRCL...');
  counts['CRCL'] = {};

  counts['CRCL']['sec_filings'] = await batchInsert(
    schema.secFilings,
    mapSecFilings('CRCL', CRCL_SEC_FILINGS),
  );

  counts['CRCL']['timeline_events'] = await batchInsert(
    schema.timelineEvents,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapCrclTimeline(CRCL_TIMELINE as any),
  );

  counts['CRCL']['catalysts'] = await batchInsert(
    schema.catalysts,
    mapCatalysts('CRCL', CRCL_CATALYSTS, CRCL_MILESTONES),
  );

  counts['CRCL']['competitor_news'] = await batchInsert(
    schema.partnerNews,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapCompetitorNews('CRCL', CRCL_COMPETITOR_NEWS as any),
  );

  // ── Report ────────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════');
  console.log('SEED COMPLETE — Row counts:');
  console.log('═══════════════════════════════════════════════════');

  let grandTotal = 0;
  for (const [ticker, tables] of Object.entries(counts)) {
    console.log(`\n  ${ticker}:`);
    let tickerTotal = 0;
    for (const [table, count] of Object.entries(tables)) {
      console.log(`    ${table}: ${count} rows`);
      tickerTotal += count;
    }
    console.log(`    TOTAL: ${tickerTotal}`);
    grandTotal += tickerTotal;
  }

  console.log(`\n  GRAND TOTAL: ${grandTotal} rows`);
  console.log('═══════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
