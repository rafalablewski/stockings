import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { seenArticles } from '@/lib/schema';
import { eq, and, count, sql } from 'drizzle-orm';
import { VALID_TICKERS } from '@/lib/stocks';

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

// ---------------------------------------------------------------------------
// ensureTable — creates seen_articles if it doesn't exist.
// Uses the raw neon() HTTP driver (same as /api/db/setup) instead of drizzle's
// execute(), which was silently failing to run DDL over the neon-http proxy.
// ---------------------------------------------------------------------------
let tableVerified = false;

async function ensureTable(): Promise<void> {
  if (tableVerified) return;

  const connStr = process.env.DATABASE_URL;
  if (!connStr) throw new Error('DATABASE_URL is not set');

  const rawSql = neon(connStr);

  // Run each DDL statement individually
  await rawSql`CREATE TABLE IF NOT EXISTS seen_articles (
    id SERIAL PRIMARY KEY,
    ticker TEXT NOT NULL,
    cache_key TEXT NOT NULL,
    headline TEXT NOT NULL,
    date TEXT,
    url TEXT,
    source TEXT,
    article_type TEXT,
    dismissed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`;

  await rawSql`CREATE UNIQUE INDEX IF NOT EXISTS seen_articles_ticker_key_idx
    ON seen_articles (ticker, cache_key)`;

  await rawSql`CREATE INDEX IF NOT EXISTS seen_articles_ticker_idx
    ON seen_articles (ticker)`;

  tableVerified = true;
}

/** True if the error looks like "relation ... does not exist" */
function isTableMissing(err: unknown): boolean {
  const msg = String(err);
  return msg.includes('does not exist') || msg.includes('relation') || msg.includes('42P01');
}

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------
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
    await ensureTable();
  } catch (e) {
    // ensureTable failed — return empty so the UI doesn't break
    console.error('[seen-articles] ensureTable failed in GET:', e);
    return NextResponse.json({ articles: [], _ensureTableError: String(e) });
  }

  // Optional: single-record lookup by cacheKey (used by DB tooltip hover)
  const cacheKey = request.nextUrl.searchParams.get('cacheKey');

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
      .where(cacheKey
        ? and(eq(seenArticles.ticker, t), eq(seenArticles.cacheKey, cacheKey))
        : eq(seenArticles.ticker, t)
      );

    // Legacy rows (url is null — saved before the schema had url column)
    // are forced to dismissed=true so they don't show a stale NEW badge
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
    console.error('[seen-articles] GET query error:', error);

    // If the table somehow still doesn't exist, return empty instead of 500
    if (isTableMissing(error)) {
      tableVerified = false; // reset so next request retries creation
      return NextResponse.json({ articles: [] });
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg, detail: String(error) }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------
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

    try {
      await ensureTable();
    } catch (e) {
      console.error('[seen-articles] ensureTable failed in POST:', e);
      return NextResponse.json({ error: 'Table creation failed', detail: String(e) }, { status: 500 });
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
        await db.insert(seenArticles).values(values).onConflictDoUpdate({
          target: [seenArticles.ticker, seenArticles.cacheKey],
          set: { dismissed: true },
        });
      } else {
        // Upsert: always overwrite articleType/url/source/headline/date
        // dismissed is NOT touched — only the dismiss=true path sets it
        await db.insert(seenArticles).values(values).onConflictDoUpdate({
          target: [seenArticles.ticker, seenArticles.cacheKey],
          set: {
            articleType: sql`excluded.article_type`,
            url: sql`excluded.url`,
            source: sql`excluded.source`,
            headline: sql`excluded.headline`,
            date: sql`excluded.date`,
          },
        });
      }
      const [row] = await db.select({ n: count() }).from(seenArticles).where(eq(seenArticles.ticker, t));
      totalInDb = row?.n ?? 0;
    }

    return NextResponse.json({ ok: true, sent: articles.length, filtered: values.length, totalInDb });
  } catch (error) {
    console.error('[seen-articles] POST error:', error);

    // If table disappeared mid-request, reset the flag so next request retries
    if (isTableMissing(error)) {
      tableVerified = false;
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg, detail: String(error) }, { status: 500 });
  }
}
