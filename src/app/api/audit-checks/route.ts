import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditChecks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

/**
 * GET /api/audit-checks
 *
 * Returns all persisted audit check results.
 * Response: Record<findingId, { verdict, summary, updatedAt }>
 */
export async function GET() {
  const rows = await db.select().from(auditChecks);

  const result: Record<string, { verdict: string; summary: string; updatedAt: number }> = {};
  for (const row of rows) {
    result[row.findingId] = {
      verdict: row.verdict,
      summary: row.summary,
      updatedAt: row.updatedAt.getTime(),
    };
  }

  return NextResponse.json(result);
}

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
    console.error('Audit check write error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/audit-checks?findingId=CRIT-001
 *
 * Deletes a single audit check result. If no findingId is provided, deletes all.
 */
export async function DELETE(request: NextRequest) {
  try {
    const findingId = request.nextUrl.searchParams.get('findingId');

    if (findingId) {
      await db.delete(auditChecks).where(eq(auditChecks.findingId, findingId));
    } else {
      await db.delete(auditChecks);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Audit check delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
