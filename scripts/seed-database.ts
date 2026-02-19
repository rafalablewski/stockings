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
import * as schema from '../src/lib/schema';
import {
  mapSecFilings, mapCrossRefs, mapCrclTimeline, mapAstsTimeline,
  mapBmnrTimeline, mapCatalysts, mapPartnerNews, mapCompetitorNews,
  mapEthereumAdoption,
} from '../src/lib/seed-helpers';

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

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Seeding database...\n');

  // Clear existing data (entire tables, not per-ticker)
  console.log('Clearing existing data...');
  await db.delete(schema.filingCrossRefs);
  await db.delete(schema.secFilings);
  await db.delete(schema.timelineEvents);
  await db.delete(schema.catalysts);
  await db.delete(schema.partnerNews);
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
