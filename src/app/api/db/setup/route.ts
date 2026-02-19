import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/lib/schema';
import {
  mapSecFilings, mapCrossRefs, mapCrclTimeline, mapAstsTimeline,
  mapBmnrTimeline, mapCatalysts, mapPartnerNews, mapCompetitorNews,
  mapEthereumAdoption,
} from '@/lib/seed-helpers';

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
 * POST /api/db/setup
 *
 * One-click database setup: creates all tables and seeds data.
 * Use the /db-setup page to trigger this, or POST directly.
 *
 * Safe to re-run — clears and re-inserts all data each time.
 */

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

// ── Main handler ─────────────────────────────────────────────────────────────

export async function POST() {
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
    await sql.query(CREATE_TABLES_SQL);
    log.push('  Tables created successfully.');

    // Step 2: Clear existing data (all rows, not per-ticker)
    log.push('Step 2: Clearing existing data...');
    await db.delete(schema.filingCrossRefs);
    await db.delete(schema.secFilings);
    await db.delete(schema.timelineEvents);
    await db.delete(schema.catalysts);
    await db.delete(schema.partnerNews);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['ASTS']['timeline_events'] = await batchInsert(schema.timelineEvents, mapAstsTimeline(ASTS_TIMELINE_EVENTS as any));
    counts['ASTS']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('ASTS', ASTS_CATALYSTS, ASTS_MILESTONES));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['ASTS']['partner_news'] = await batchInsert(schema.partnerNews, mapPartnerNews(PARTNER_NEWS as any));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['ASTS']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('ASTS', COMPS_TIMELINE as any));

    // BMNR
    log.push('Step 4: Seeding BMNR...');
    counts['BMNR'] = {};
    counts['BMNR']['sec_filings'] = await batchInsert(schema.secFilings, mapSecFilings('BMNR', BMNR_SEC_FILINGS));
    counts['BMNR']['filing_cross_refs'] = await batchInsert(schema.filingCrossRefs, mapCrossRefs('BMNR', BMNR_FILING_CROSS_REFS));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['BMNR']['timeline_events'] = await batchInsert(schema.timelineEvents, mapBmnrTimeline(BMNR_TIMELINE_EVENTS as any));
    counts['BMNR']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('BMNR', BMNR_CATALYSTS, BMNR_MILESTONES));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['BMNR']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('BMNR', BMNR_COMPETITOR_NEWS as any));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['BMNR']['ethereum_adoption'] = await batchInsert(schema.partnerNews, mapEthereumAdoption(BMNR_ADOPTION_TIMELINE as any));

    // CRCL
    log.push('Step 5: Seeding CRCL...');
    counts['CRCL'] = {};
    counts['CRCL']['sec_filings'] = await batchInsert(schema.secFilings, mapSecFilings('CRCL', CRCL_SEC_FILINGS));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['CRCL']['timeline_events'] = await batchInsert(schema.timelineEvents, mapCrclTimeline(CRCL_TIMELINE as any));
    counts['CRCL']['catalysts'] = await batchInsert(schema.catalysts, mapCatalysts('CRCL', CRCL_CATALYSTS, CRCL_MILESTONES));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    counts['CRCL']['competitor_news'] = await batchInsert(schema.partnerNews, mapCompetitorNews('CRCL', CRCL_COMPETITOR_NEWS as any));

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
