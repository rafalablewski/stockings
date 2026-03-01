import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { auditChecks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// ensureTable — creates audit_checks if it doesn't exist.
// Uses the raw neon() HTTP driver (same pattern as seen-articles/seen-filings).
// ---------------------------------------------------------------------------
let tableVerified = false;

async function ensureTable(): Promise<void> {
  if (tableVerified) return;

  const connStr = process.env.DATABASE_URL;
  if (!connStr) throw new Error('DATABASE_URL is not set');

  const rawSql = neon(connStr);

  await rawSql`CREATE TABLE IF NOT EXISTS audit_checks (
    id SERIAL PRIMARY KEY,
    finding_id TEXT NOT NULL,
    verdict TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`;

  await rawSql`CREATE UNIQUE INDEX IF NOT EXISTS audit_checks_finding_id_idx
    ON audit_checks (finding_id)`;

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

/**
 * GET /api/audit-checks
 *
 * Returns all persisted audit check results.
 * Response: Record<findingId, { verdict, summary, updatedAt }>
 */
export async function GET(request: NextRequest) {
  try {
    await ensureTable();
  } catch (e) {
    console.error('[audit-checks] ensureTable failed in GET:', e);
    return NextResponse.json({});
  }

  try {
    const rows = await db.select().from(auditChecks);

    const result: Record<string, { verdict: string; summary: string; updatedAt: number }> = {};
    for (const row of rows) {
      result[row.findingId] = {
        verdict: row.verdict,
        summary: row.summary,
        updatedAt: row.updatedAt.getTime(),
      };
    }

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[audit-checks] GET query error:', error);

    if (isTableMissing(error)) {
      tableVerified = false;
      return NextResponse.json({});
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------

/**
 * POST /api/audit-checks
 *
 * Upserts a single audit check result.
 * Body: { findingId: string, verdict: 'passed' | 'failed', summary: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { findingId, verdict, summary } = await request.json();

    if (!findingId || !verdict || !summary) {
      return NextResponse.json({ error: 'Missing required fields (findingId, verdict, summary)' }, { status: 400 });
    }
    if (verdict !== 'passed' && verdict !== 'failed') {
      return NextResponse.json({ error: 'verdict must be "passed" or "failed"' }, { status: 400 });
    }

    try {
      await ensureTable();
    } catch (e) {
      console.error('[audit-checks] ensureTable failed in POST:', e);
      return NextResponse.json({ error: 'Table creation failed', detail: String(e) }, { status: 500 });
    }

    await db
      .insert(auditChecks)
      .values({
        findingId,
        verdict,
        summary,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [auditChecks.findingId],
        set: {
          verdict,
          summary,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[audit-checks] POST error:', error);

    if (isTableMissing(error)) {
      tableVerified = false;
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg, detail: String(error) }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------

/**
 * DELETE /api/audit-checks?findingId=CRIT-001
 *
 * Deletes a single audit check result. Requires findingId parameter.
 */
export async function DELETE(request: NextRequest) {
  try {
    const findingId = request.nextUrl.searchParams.get('findingId');

    if (!findingId) {
      return NextResponse.json(
        { error: 'findingId query parameter is required' },
        { status: 400 },
      );
    }

    await db.delete(auditChecks).where(eq(auditChecks.findingId, findingId));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[audit-checks] DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
