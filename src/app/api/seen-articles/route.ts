import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seenArticles } from '@/lib/schema';
import { eq, count } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

/**
 * GET /api/seen-articles?ticker=ASTS
 *
 * Returns all stored articles for a ticker (full article data for DB-first loading).
 * Response: { articles: [{cacheKey, headline, date, url, source, articleType, dismissed}] }
 *
 * Legacy rows (url is null — saved before the schema addition) are returned with
 * dismissed forced to true so they don't show a NEW badge.
 *
 * POST /api/seen-articles
 *
 * Batch-upsert articles.
 * Body: { ticker, articles: { cacheKey, headline, date?, url?, source?, articleType? }[], dismiss?: boolean }
 *   - dismiss: true = user clicked NEW badge to dismiss these articles
 *   - dismiss: false/omitted = saving new articles from AI Fetch
 */

const VALID_TICKERS = new Set(['asts', 'bmnr', 'crcl', 'mstr']);

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  if (!ticker) {
    return NextResponse.json({ error: 'Missing ticker' }, { status: 400 });
  }

  const t = ticker.toLowerCase();
  if (!VALID_TICKERS.has(t)) {
    return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
  }

  try {
    const rows = await db
      .select({
        cacheKey: seenArticles.cacheKey,
        headline: seenArticles.headline,
        date: seenArticles.date,
        url: seenArticles.url,
        source: seenArticles.source,
        articleType: seenArticles.articleType,
        dismissed: seenArticles.dismissed,
      })
      .from(seenArticles)
      .where(eq(seenArticles.ticker, t));

    // Map to response objects. Legacy rows without url are forced dismissed.
    const articles = rows.map(row => ({
      cacheKey: row.cacheKey,
      headline: row.headline,
      date: row.date,
      url: row.url,
      source: row.source,
      articleType: row.articleType,
      dismissed: row.url ? row.dismissed : true,
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Seen articles read error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
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

    const values = articles
      .filter((art: { cacheKey?: string; headline?: string }) => art.cacheKey && art.headline)
      .map((art: { cacheKey: string; headline: string; date?: string; url?: string; source?: string; articleType?: string }) => ({
        ticker: t,
        cacheKey: art.cacheKey,
        headline: art.headline,
        date: art.date || null,
        url: art.url || null,
        source: art.source || null,
        articleType: art.articleType || null,
        dismissed: !!dismiss,
      }));

    let totalInDb = 0;
    if (values.length > 0) {
      if (dismiss) {
        // User clicked NEW — set dismissed=true, also update article data if provided
        await db.insert(seenArticles).values(values).onConflictDoUpdate({
          target: [seenArticles.ticker, seenArticles.cacheKey],
          set: { dismissed: true },
        });
      } else {
        // AI Fetch saving new articles — insert with full data, don't overwrite existing rows
        await db.insert(seenArticles).values(values).onConflictDoNothing();
      }
      const [row] = await db.select({ n: count() }).from(seenArticles).where(eq(seenArticles.ticker, t));
      totalInDb = row?.n ?? 0;
    }

    return NextResponse.json({ ok: true, sent: articles.length, filtered: values.length, totalInDb });
  } catch (error) {
    console.error('Seen articles write error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
