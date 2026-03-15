import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const idStr = request.nextUrl.searchParams.get('id');
  if (!idStr) {
    return NextResponse.json({ error: 'id parameter required' }, { status: 400 });
  }

  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        id: agentRuns.id,
        outputFull: agentRuns.outputFull,
        outputSummary: agentRuns.outputSummary,
        errorsEncountered: agentRuns.errorsEncountered,
      })
      .from(agentRuns)
      .where(eq(agentRuns.id, id))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const run = rows[0];
    return NextResponse.json({
      id: run.id,
      output: run.outputFull ?? run.outputSummary ?? '',
      error: run.errorsEncountered,
    });
  } catch (error) {
    console.error('Engineer history full error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch full output' },
      { status: 500 }
    );
  }
}
