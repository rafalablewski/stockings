import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analysisCache, seenFilings, filingCrossRefs, timelineEvents } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { parseAnalysis, entriesToCrossRefs, entriesToTimelineEvents } from '@/lib/analysis-parser';

/**
 * POST /api/edgar/backfill-analysis
 *
 * One-time backfill: reads all existing AI analyses from analysis_cache
 * (type='edgar'), joins with seen_filings for metadata, parses each
 * analysis, and inserts cross-refs + timeline events into DB.
 *
 * Body (optional): { ticker?: string, dryRun?: boolean }
 *   - ticker: limit to a single ticker (default: all tickers)
 *   - dryRun: if true, parse and report but don't write to DB
 *
 * Returns: { processed, inserted, skipped, errors, details[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const filterTicker: string | undefined = body.ticker?.toLowerCase();
    const dryRun: boolean = !!body.dryRun;

    // 1. Load all edgar analyses from cache
    const cacheRows = filterTicker
      ? await db.select().from(analysisCache).where(
          and(eq(analysisCache.cacheType, 'edgar'), eq(analysisCache.ticker, filterTicker)),
        )
      : await db.select().from(analysisCache).where(eq(analysisCache.cacheType, 'edgar'));

    if (cacheRows.length === 0) {
      return NextResponse.json({
        processed: 0, inserted: { crossRefs: 0, timelineEntries: 0 },
        skipped: 0, errors: 0, details: [], message: 'No edgar analyses found in cache',
      });
    }

    // 2. Load all seen_filings for metadata lookup
    const allSeenFilings = filterTicker
      ? await db.select().from(seenFilings).where(eq(seenFilings.ticker, filterTicker))
      : await db.select().from(seenFilings);

    // Build lookup: ticker+accession → seen_filing row
    const seenMap = new Map<string, typeof allSeenFilings[number]>();
    for (const sf of allSeenFilings) {
      seenMap.set(`${sf.ticker}|${sf.accessionNumber}`, sf);
    }

    // 3. Process each cached analysis
    let processed = 0;
    let skipped = 0;
    let errorCount = 0;
    let totalCrossRefs = 0;
    let totalTimeline = 0;
    const details: Array<{
      ticker: string;
      cacheKey: string;
      crossRefs: number;
      timelineEntries: number;
      categories: string[];
      status: string;
    }> = [];

    for (const row of cacheRows) {
      try {
        const parsed = parseAnalysis(row.analysisText);

        if (parsed.entries.length === 0) {
          skipped++;
          details.push({
            ticker: row.ticker,
            cacheKey: row.cacheKey,
            crossRefs: 0,
            timelineEntries: 0,
            categories: [],
            status: 'skipped — no structured entries found',
          });
          continue;
        }

        // Look up seen_filing for metadata
        const sf = seenMap.get(`${row.ticker}|${row.cacheKey}`);
        const accessionNumber = row.cacheKey;
        const form = sf?.form ?? '';
        const filingDate = sf?.filingDate ?? '';
        const filingKey = accessionNumber;
        const tickerUpper = row.ticker.toUpperCase();

        // Build cross-refs
        const crossRefs = entriesToCrossRefs(parsed.entries);

        // Build timeline entries
        const tlEntries = filingDate
          ? entriesToTimelineEvents(parsed.entries, filingDate, row.ticker)
          : [];

        if (!dryRun && crossRefs.length > 0) {
          // Delete existing cross-refs for this filing (idempotent)
          await db.delete(filingCrossRefs).where(
            and(
              eq(filingCrossRefs.ticker, tickerUpper),
              eq(filingCrossRefs.filingKey, filingKey),
            ),
          );

          await db.insert(filingCrossRefs).values(
            crossRefs.map(cr => ({
              ticker: tickerUpper,
              filingKey,
              source: cr.source,
              data: cr.data,
            })),
          );
        }

        let tlInserted = 0;
        if (!dryRun && tlEntries.length > 0) {
          for (const entry of tlEntries) {
            const existing = await db
              .select({ id: timelineEvents.id })
              .from(timelineEvents)
              .where(
                and(
                  eq(timelineEvents.ticker, entry.ticker),
                  eq(timelineEvents.date, entry.date),
                  eq(timelineEvents.event, entry.event),
                ),
              )
              .limit(1);

            if (existing.length === 0) {
              await db.insert(timelineEvents).values(entry);
              tlInserted++;
            }
          }
        } else {
          tlInserted = tlEntries.length; // dry run — count what would be inserted
        }

        // Update seen_filings status
        if (!dryRun && accessionNumber) {
          await db.update(seenFilings).set({
            status: 'data_only',
            crossRefs: JSON.stringify(crossRefs),
          }).where(
            and(
              eq(seenFilings.ticker, row.ticker),
              eq(seenFilings.accessionNumber, accessionNumber),
            ),
          );
        }

        processed++;
        totalCrossRefs += crossRefs.length;
        totalTimeline += tlInserted;

        details.push({
          ticker: row.ticker,
          cacheKey: row.cacheKey,
          crossRefs: crossRefs.length,
          timelineEntries: tlInserted,
          categories: crossRefs.map(cr => cr.source),
          status: dryRun ? 'dry-run' : 'ingested',
        });
      } catch (err) {
        errorCount++;
        details.push({
          ticker: row.ticker,
          cacheKey: row.cacheKey,
          crossRefs: 0,
          timelineEntries: 0,
          categories: [],
          status: `error: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }

    return NextResponse.json({
      dryRun,
      total: cacheRows.length,
      processed,
      inserted: { crossRefs: totalCrossRefs, timelineEntries: totalTimeline },
      skipped,
      errors: errorCount,
      details,
    });
  } catch (error) {
    console.error('[backfill-analysis] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: String(error) },
      { status: 500 },
    );
  }
}
