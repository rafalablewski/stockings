import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { secFilings, filingCrossRefs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

/**
 * POST /api/edgar/refresh-local
 *
 * Returns the latest local filings and cross-refs from the database.
 * Replaces the old approach of reading sec-filings.ts from disk via regex.
 *
 * Body: { ticker: string }
 * Returns: { localFilings: LocalFiling[], crossRefIndex: Record<string, ...> }
 */

const TICKER_PATTERN = /^[a-z]{2,10}$/;

export async function POST(request: NextRequest) {
  try {
    const { ticker } = await request.json();
    if (!ticker || !TICKER_PATTERN.test(ticker.toLowerCase())) {
      return NextResponse.json({ error: 'Invalid ticker' }, { status: 400 });
    }

    const upperTicker = ticker.toUpperCase();

    // Query filings and cross-refs in parallel
    const [filingRows, crossRefRows] = await Promise.all([
      db.select({
        date: secFilings.date,
        type: secFilings.type,
        description: secFilings.description,
        period: secFilings.period,
        color: secFilings.color,
        accessionNumber: secFilings.accessionNumber,
      })
        .from(secFilings)
        .where(eq(secFilings.ticker, upperTicker)),

      db.select({
        filingKey: filingCrossRefs.filingKey,
        source: filingCrossRefs.source,
        data: filingCrossRefs.data,
      })
        .from(filingCrossRefs)
        .where(eq(filingCrossRefs.ticker, upperTicker)),
    ]);

    // Build cross-ref index (grouped by filing key)
    const crossRefIndex: Record<string, { source: string; data: string }[]> = {};
    for (const row of crossRefRows) {
      if (!crossRefIndex[row.filingKey]) {
        crossRefIndex[row.filingKey] = [];
      }
      crossRefIndex[row.filingKey].push({
        source: row.source,
        data: row.data,
      });
    }

    // Map to response shape matching the old format
    const localFilings = filingRows.map(f => ({
      date: f.date,
      type: f.type,
      description: f.description,
      period: f.period,
      ...(f.color ? { color: f.color } : {}),
      ...(f.accessionNumber ? { accessionNumber: f.accessionNumber } : {}),
    }));

    return NextResponse.json({ localFilings, crossRefIndex });
  } catch (error) {
    console.error('[refresh-local] Error:', error);
    return NextResponse.json({ error: 'Failed to read local data' }, { status: 500 });
  }
}
