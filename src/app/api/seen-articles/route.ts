import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seenArticles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/seen-articles?ticker=ASTS
 *
 * Returns all seen article cache keys for a ticker.
 * Response: { keys: string[], dismissed: string[] }
 *   - keys: all cache keys we've ever seen
 *   - dismissed: cache keys the user explicitly dismissed (clicked NEW)
 *
 * POST /api/seen-articles
 *
 * Batch-upsert seen articles.
 * Body: { ticker, articles: { cacheKey, headline, date? }[], dismiss?: boolean }
 *   - dismiss: true = user clicked NEW badge to dismiss these articles
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
    .select({ cacheKey: seenArticles.cacheKey, dismissed: seenArticles.dismissed })
    .from(seenArticles)
    .where(eq(seenArticles.ticker, t));

  const keys: string[] = [];
  const dismissed: string[] = [];
  for (const row of rows) {
    keys.push(row.cacheKey);
    if (row.dismissed) dismissed.push(row.cacheKey);
  }

  return NextResponse.json({ keys, dismissed });
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, articles, dismiss } = await request.json();

    if (!ticker || !articles || !Array.isArray(articles)) {
      return NextResponse.json({ error: 'Missing required fields (ticker, articles[])' }, { status: 400 });
    }

    const t = ticker.toLowerCase();
    if (!VALID_TICKERS.has(t)) {
      return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
    }

    // Batch upsert — single INSERT per request instead of one per article
    const values = articles
      .filter((art: { cacheKey?: string; headline?: string }) => art.cacheKey && art.headline)
      .map((art: { cacheKey: string; headline: string; date?: string }) => ({
        ticker: t,
        cacheKey: art.cacheKey,
        headline: art.headline,
        date: art.date || null,
        dismissed: !!dismiss,
      }));

    if (values.length > 0) {
      if (dismiss) {
        await db.insert(seenArticles).values(values).onConflictDoUpdate({
          target: [seenArticles.ticker, seenArticles.cacheKey],
          set: { dismissed: true },
        });
      } else {
        await db.insert(seenArticles).values(values).onConflictDoNothing();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Seen articles write error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
