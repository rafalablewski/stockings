import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { seenFilings } from '@/lib/schema';
import { eq, and, count, sql } from 'drizzle-orm';
import { VALID_TICKERS } from '@/lib/stocks';

export const dynamic = 'force-dynamic';

/**
 * GET /api/seen-filings?ticker=ASTS
 *
 * Returns all stored EDGAR filings for a ticker (DB-first loading).
 * Response: { filings: [{accessionNumber, form, filingDate, description,
 *             reportDate, fileUrl, status, crossRefs, dismissed}] }
 *
 * Optional: ?accessionNumber=XYZ for single-record lookup (DB tooltip hover).
 *
 * POST /api/seen-filings
 *
 * Batch-upsert filings.
 * Body: { ticker, filings: [{accessionNumber, form, filingDate?, description?,
 *         reportDate?, fileUrl?, status?, crossRefs?}], dismiss?: boolean }
 *   - dismiss: true  = user clicked NEW badge to dismiss
 *   - dismiss: false  = saving filings from SEC fetch
 */

// ---------------------------------------------------------------------------
// ensureTable — creates seen_filings if it doesn't exist.
// Uses the raw neon() HTTP driver for DDL (same pattern as seen-articles).
// ---------------------------------------------------------------------------
let tableVerified = false;

async function ensureTable(): Promise<void> {
  if (tableVerified) return;

  const connStr = process.env.DATABASE_URL;
  if (!connStr) throw new Error('DATABASE_URL is not set');

  const rawSql = neon(connStr);

  await rawSql`CREATE TABLE IF NOT EXISTS seen_filings (
    id SERIAL PRIMARY KEY,
    ticker TEXT NOT NULL,
    accession_number TEXT NOT NULL,
    form TEXT NOT NULL,
    filing_date TEXT,
    description TEXT,
    report_date TEXT,
    file_url TEXT,
    status TEXT,
    cross_refs TEXT,
    dismissed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`;

  await rawSql`CREATE UNIQUE INDEX IF NOT EXISTS seen_filings_ticker_accession_idx
    ON seen_filings (ticker, accession_number)`;

  await rawSql`CREATE INDEX IF NOT EXISTS seen_filings_ticker_idx
    ON seen_filings (ticker)`;

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
    console.error('[seen-filings] ensureTable failed in GET:', e);
    return NextResponse.json({ filings: [], _ensureTableError: String(e) });
  }

  // Optional: single-record lookup by accessionNumber (for DB tooltip hover)
  const accessionNumber = request.nextUrl.searchParams.get('accessionNumber');

  try {
    const rows = await db
      .select({
        accessionNumber: seenFilings.accessionNumber,
        form: seenFilings.form,
        filingDate: seenFilings.filingDate,
        description: seenFilings.description,
        reportDate: seenFilings.reportDate,
        fileUrl: seenFilings.fileUrl,
        status: seenFilings.status,
        crossRefs: seenFilings.crossRefs,
        dismissed: seenFilings.dismissed,
      })
      .from(seenFilings)
      .where(accessionNumber
        ? and(eq(seenFilings.ticker, t), eq(seenFilings.accessionNumber, accessionNumber))
        : eq(seenFilings.ticker, t)
      );

    const filings = rows.map(row => ({
      accessionNumber: row.accessionNumber,
      form: row.form,
      filingDate: row.filingDate,
      description: row.description,
      reportDate: row.reportDate,
      fileUrl: row.fileUrl,
      status: row.status,
      crossRefs: row.crossRefs ? JSON.parse(row.crossRefs) : null,
      dismissed: row.dismissed,
    }));

    return NextResponse.json({ filings });
  } catch (error) {
    console.error('[seen-filings] GET query error:', error);

    if (isTableMissing(error)) {
      tableVerified = false;
      return NextResponse.json({ filings: [] });
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
    const { ticker, filings, dismiss } = await request.json();

    if (!ticker || !filings || !Array.isArray(filings)) {
      return NextResponse.json({ error: 'Missing required fields (ticker, filings[])' }, { status: 400 });
    }

    const t = ticker.toLowerCase();
    if (!VALID_TICKERS.has(t)) {
      return NextResponse.json({ error: `Unknown ticker: ${ticker}` }, { status: 400 });
    }

    try {
      await ensureTable();
    } catch (e) {
      console.error('[seen-filings] ensureTable failed in POST:', e);
      return NextResponse.json({ error: 'Table creation failed', detail: String(e) }, { status: 500 });
    }

    const values = filings
      .filter((f: { accessionNumber?: string; form?: string }) => f.accessionNumber && f.form)
      .map((f: {
        accessionNumber: string; form: string; filingDate?: string;
        description?: string; reportDate?: string; fileUrl?: string;
        status?: string; crossRefs?: unknown;
      }) => ({
        ticker: t,
        accessionNumber: f.accessionNumber,
        form: f.form,
        filingDate: f.filingDate || null,
        description: f.description || null,
        reportDate: f.reportDate || null,
        fileUrl: f.fileUrl || null,
        status: f.status || null,
        crossRefs: f.crossRefs ? JSON.stringify(f.crossRefs) : null,
        dismissed: !!dismiss,
      }));

    let totalInDb = 0;
    if (values.length > 0) {
      if (dismiss) {
        await db.insert(seenFilings).values(values).onConflictDoUpdate({
          target: [seenFilings.ticker, seenFilings.accessionNumber],
          set: { dismissed: true },
        });
      } else {
        // Upsert: always overwrite metadata fields but NOT dismissed
        await db.insert(seenFilings).values(values).onConflictDoUpdate({
          target: [seenFilings.ticker, seenFilings.accessionNumber],
          set: {
            form: sql`excluded.form`,
            filingDate: sql`excluded.filing_date`,
            description: sql`excluded.description`,
            reportDate: sql`excluded.report_date`,
            fileUrl: sql`excluded.file_url`,
            status: sql`excluded.status`,
            crossRefs: sql`excluded.cross_refs`,
          },
        });
      }
      const [row] = await db.select({ n: count() }).from(seenFilings).where(eq(seenFilings.ticker, t));
      totalInDb = row?.n ?? 0;
    }

    return NextResponse.json({ ok: true, sent: filings.length, filtered: values.length, totalInDb });
  } catch (error) {
    console.error('[seen-filings] POST error:', error);

    if (isTableMissing(error)) {
      tableVerified = false;
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg, detail: String(error) }, { status: 500 });
  }
}
