import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analysisCache } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

/**
 * GET /api/analysis-cache?ticker=ASTS
 *
 * Returns all persisted AI analyses for a ticker.
 * Response: { edgar: { [accession]: { text, ts } }, sources: { [articleKey]: { text, ts } } }
 *
 * POST /api/analysis-cache
 *
 * Persists (or removes) a single AI analysis result.
 * Body: { ticker, type: 'edgar'|'sources', key: string, text: string | null }
 *   - text: analysis text to store, or null to delete
 */

const VALID_TICKERS = new Set(['asts', 'bmnr', 'crcl']);

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  if (!ticker) {
    return NextResponse.json({ error: 'Missing ticker' }, { status: 400 });
  }

  const t = ticker.toLowerCase();
  if (!VALID_TICKERS.has(t)) {
    return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
  }

  const rows = await db
    .select()
    .from(analysisCache)
    .where(eq(analysisCache.ticker, t));

  // Transform flat rows into nested object format for backward compatibility
  const result: {
    edgar: Record<string, { text: string; ts: number }>;
    sources: Record<string, { text: string; ts: number }>;
  } = { edgar: {}, sources: {} };

  for (const row of rows) {
    const bucket = row.cacheType as 'edgar' | 'sources';
    if (bucket === 'edgar' || bucket === 'sources') {
      result[bucket][row.cacheKey] = {
        text: row.analysisText,
        ts: row.updatedAt.getTime(),
      };
    }
  }

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, type, key, text } = await request.json();

    if (!ticker || !type || !key) {
      return NextResponse.json({ error: 'Missing required fields (ticker, type, key)' }, { status: 400 });
    }
    if (type !== 'edgar' && type !== 'sources') {
      return NextResponse.json({ error: 'type must be "edgar" or "sources"' }, { status: 400 });
    }

    const t = ticker.toLowerCase();
    if (!VALID_TICKERS.has(t)) {
      return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
    }

    if (text === null || text === undefined) {
      // Delete entry
      await db
        .delete(analysisCache)
        .where(
          and(
            eq(analysisCache.ticker, t),
            eq(analysisCache.cacheType, type),
            eq(analysisCache.cacheKey, key),
          ),
        );
    } else {
      // Upsert entry
      await db
        .insert(analysisCache)
        .values({
          ticker: t,
          cacheType: type,
          cacheKey: key,
          analysisText: text,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [analysisCache.ticker, analysisCache.cacheType, analysisCache.cacheKey],
          set: {
            analysisText: text,
            updatedAt: new Date(),
          },
        });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Analysis cache write error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
