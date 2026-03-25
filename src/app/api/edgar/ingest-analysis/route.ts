import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { filingCrossRefs, timelineEvents, seenFilings } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { VALID_TICKERS } from '@/lib/stocks';
import { parseAnalysis, entriesToCrossRefs, entriesToTimelineEvents } from '@/lib/analysis-parser';

/**
 * POST /api/edgar/ingest-analysis
 *
 * Parses a structured AI analysis and inserts the extracted data into
 * the filingCrossRefs and timelineEvents tables. Also updates the
 * seenFilings status to 'data_only' so the EDGAR tab recognizes
 * that data has been captured from this filing.
 *
 * Body: {
 *   ticker: string,
 *   accessionNumber: string,
 *   form: string,
 *   filingDate: string,
 *   analysisText: string,
 * }
 *
 * Returns: { ok: true, crossRefs: number, timelineEntries: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { ticker, accessionNumber, form, filingDate, analysisText } = await request.json();

    if (!ticker || !analysisText) {
      return NextResponse.json(
        { error: 'Missing required fields (ticker, analysisText)' },
        { status: 400 },
      );
    }

    const t = ticker.toLowerCase();
    if (!VALID_TICKERS.has(t)) {
      return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
    }

    // 1. Parse the analysis text into structured entries
    const parsed = parseAnalysis(analysisText);

    if (parsed.entries.length === 0) {
      return NextResponse.json({
        ok: true,
        crossRefs: 0,
        timelineEntries: 0,
        message: 'No structured entries found in analysis text',
      });
    }

    // 2. Build cross-reference entries
    const crossRefs = entriesToCrossRefs(parsed.entries);

    // 3. Build the filing key for cross-refs
    //    Prefer accession number; fall back to form|date format
    const filingKey = accessionNumber || `${form}|${filingDate}`;

    // 4. Insert cross-refs into filingCrossRefs table
    let crossRefsInserted = 0;
    if (crossRefs.length > 0 && filingKey) {
      const crossRefValues = crossRefs.map(cr => ({
        ticker: ticker.toUpperCase(),
        filingKey,
        source: cr.source,
        data: cr.data,
      }));

      // Delete existing cross-refs for this filing first (to allow re-ingestion)
      await db
        .delete(filingCrossRefs)
        .where(
          and(
            eq(filingCrossRefs.ticker, ticker.toUpperCase()),
            eq(filingCrossRefs.filingKey, filingKey),
          ),
        );

      await db.insert(filingCrossRefs).values(crossRefValues);
      crossRefsInserted = crossRefValues.length;
    }

    // 5. Insert timeline events for critical/timeline entries
    let timelineInserted = 0;
    if (filingDate) {
      const timelineEntries = entriesToTimelineEvents(parsed.entries, filingDate, ticker);
      if (timelineEntries.length > 0) {
        // Avoid duplicates by checking existing entries for same ticker+date+event
        for (const entry of timelineEntries) {
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
            timelineInserted++;
          }
        }
      }
    }

    // 6. Update seenFilings status to 'data_only' if accession number is known
    //    and status is currently null/empty (don't downgrade 'tracked' status)
    if (accessionNumber) {
      await db
        .update(seenFilings)
        .set({
          status: 'data_only',
          crossRefs: JSON.stringify(crossRefs),
        })
        .where(
          and(
            eq(seenFilings.ticker, t),
            eq(seenFilings.accessionNumber, accessionNumber),
          ),
        );
    }

    return NextResponse.json({
      ok: true,
      crossRefs: crossRefsInserted,
      timelineEntries: timelineInserted,
      categories: crossRefs.map(cr => cr.source),
    });
  } catch (error) {
    console.error('[ingest-analysis] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: String(error) },
      { status: 500 },
    );
  }
}
