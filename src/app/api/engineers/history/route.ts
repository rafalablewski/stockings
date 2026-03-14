import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getDb } from '@/lib/db';
import { agentRuns } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';

// Auto-migrate: add hidden column if missing
let migrated = false;
async function ensureHiddenColumn(): Promise<void> {
  if (migrated) return;
  const connStr = process.env.DATABASE_URL;
  if (!connStr) return;
  const rawSql = neon(connStr);
  const sql = `ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT false;`;
  const tsa = Object.assign([sql], { raw: [sql] }) as unknown as TemplateStringsArray;
  try { await rawSql(tsa); } catch { /* column may already exist */ }
  migrated = true;
}

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  const engineerId = request.nextUrl.searchParams.get('engineerId');
  const showHidden = request.nextUrl.searchParams.get('showHidden') === 'true';
  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam || '25', 10), 100);

  try {
    await ensureHiddenColumn();
    const db = getDb();

    const conditions = [];
    if (ticker) conditions.push(eq(agentRuns.ticker, ticker));
    if (engineerId) conditions.push(eq(agentRuns.engineerId, engineerId));
    if (!showHidden) conditions.push(eq(agentRuns.hidden, false));

    const columns = {
      id: agentRuns.id,
      ticker: agentRuns.ticker,
      engineerId: agentRuns.engineerId,
      workflowId: agentRuns.workflowId,
      status: agentRuns.status,
      triggerType: agentRuns.triggerType,
      triggerReason: agentRuns.triggerReason,
      outputSummary: agentRuns.outputSummary,
      patchesApplied: agentRuns.patchesApplied,
      errorsEncountered: agentRuns.errorsEncountered,
      durationMs: agentRuns.durationMs,
      hidden: agentRuns.hidden,
      startedAt: agentRuns.startedAt,
      completedAt: agentRuns.completedAt,
      createdAt: agentRuns.createdAt,
    };

    const query = db.select(columns).from(agentRuns).orderBy(desc(agentRuns.createdAt)).limit(limit);
    const runs = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    return NextResponse.json({ runs, count: runs.length });
  } catch (error) {
    console.error('Engineer history error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/engineers/history?id=123
//
// Toggle hidden state on a run.
// Body: { hidden: boolean }
// ---------------------------------------------------------------------------
export async function PATCH(request: NextRequest) {
  const idStr = request.nextUrl.searchParams.get('id');
  if (!idStr) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const id = parseInt(idStr, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'id must be a number' }, { status: 400 });

  try {
    await ensureHiddenColumn();
    const { hidden } = await request.json();
    if (typeof hidden !== 'boolean') {
      return NextResponse.json({ error: 'hidden must be a boolean' }, { status: 400 });
    }

    const db = getDb();
    const [updated] = await db
      .update(agentRuns)
      .set({ hidden })
      .where(eq(agentRuns.id, id))
      .returning({ id: agentRuns.id, hidden: agentRuns.hidden });

    if (!updated) return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    return NextResponse.json({ ok: true, run: updated });
  } catch (error) {
    console.error('Engineer history PATCH error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update run' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/engineers/history?id=123
//
// Permanently delete a run from history.
// ---------------------------------------------------------------------------
export async function DELETE(request: NextRequest) {
  const idStr = request.nextUrl.searchParams.get('id');
  if (!idStr) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const id = parseInt(idStr, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'id must be a number' }, { status: 400 });

  try {
    const db = getDb();
    await db.delete(agentRuns).where(eq(agentRuns.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Engineer history DELETE error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete run' },
      { status: 500 }
    );
  }
}
