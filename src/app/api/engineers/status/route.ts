import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns, engineerSchedules } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';
import { engineers } from '@/lib/engineers';

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');

  try {
    const db = getDb();

    // Get all schedules for this ticker (or all if no ticker specified)
    const schedules = ticker
      ? await db.select().from(engineerSchedules).where(eq(engineerSchedules.ticker, ticker))
      : await db.select().from(engineerSchedules);

    // Get latest run for each engineer
    const latestRuns = ticker
      ? await db.select()
          .from(agentRuns)
          .where(eq(agentRuns.ticker, ticker))
          .orderBy(desc(agentRuns.createdAt))
          .limit(50)
      : await db.select()
          .from(agentRuns)
          .orderBy(desc(agentRuns.createdAt))
          .limit(50);

    // Build status map: engineer definitions + schedule state + latest run
    const statusMap = engineers.map(eng => {
      const schedule = schedules.find(s => s.engineerId === eng.id);
      const lastRun = latestRuns.find(r => r.engineerId === eng.id);

      return {
        engineer: eng,
        schedule: schedule ? {
          enabled: schedule.enabled,
          intervalMinutes: schedule.intervalMinutes,
          lastRunAt: schedule.lastRunAt,
          nextRunAt: schedule.nextRunAt,
        } : null,
        lastRun: lastRun ? {
          id: lastRun.id,
          status: lastRun.status,
          triggerType: lastRun.triggerType,
          outputSummary: lastRun.outputSummary,
          durationMs: lastRun.durationMs,
          startedAt: lastRun.startedAt,
          completedAt: lastRun.completedAt,
          error: lastRun.errorsEncountered,
        } : null,
      };
    });

    // Count stats
    const running = latestRuns.filter(r => r.status === 'running').length;
    const completed = latestRuns.filter(r => r.status === 'completed').length;
    const failed = latestRuns.filter(r => r.status === 'failed').length;
    const scheduled = schedules.filter(s => s.enabled).length;

    return NextResponse.json({
      engineers: statusMap,
      stats: { running, completed, failed, scheduled, total: engineers.length },
    });
  } catch (error) {
    console.error('Engineer status error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch engineer status' },
      { status: 500 }
    );
  }
}
