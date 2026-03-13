import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  const engineerId = request.nextUrl.searchParams.get('engineerId');
  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam || '25', 10), 100);

  try {
    const db = getDb();

    const conditions = [];
    if (ticker) conditions.push(eq(agentRuns.ticker, ticker));
    if (engineerId) conditions.push(eq(agentRuns.engineerId, engineerId));

    const runs = conditions.length > 0
      ? await db.select({
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
          startedAt: agentRuns.startedAt,
          completedAt: agentRuns.completedAt,
          createdAt: agentRuns.createdAt,
        })
        .from(agentRuns)
        .where(and(...conditions))
        .orderBy(desc(agentRuns.createdAt))
        .limit(limit)
      : await db.select({
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
          startedAt: agentRuns.startedAt,
          completedAt: agentRuns.completedAt,
          createdAt: agentRuns.createdAt,
        })
        .from(agentRuns)
        .orderBy(desc(agentRuns.createdAt))
        .limit(limit);

    return NextResponse.json({ runs, count: runs.length });
  } catch (error) {
    console.error('Engineer history error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
