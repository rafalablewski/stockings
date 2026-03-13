import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { engineerSchedules } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { engineers } from '@/lib/engineers';

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');

  try {
    const db = getDb();

    // Get all schedules for this ticker (or all if no ticker specified)
    const schedules = ticker
      ? await db.select().from(engineerSchedules).where(eq(engineerSchedules.ticker, ticker))
      : await db.select().from(engineerSchedules);

    // Get latest run per engineer using DISTINCT ON (PostgreSQL)
    // This is more efficient and correct than LIMIT 50 which can miss engineers
    interface LatestRun {
      id: number;
      engineer_id: string;
      status: string;
      trigger_type: string;
      output_summary: string | null;
      duration_ms: number | null;
      started_at: string | null;
      completed_at: string | null;
      errors_encountered: string | null;
    }

    const latestRunRows: LatestRun[] = ticker
      ? (await db.execute(sql`SELECT DISTINCT ON (engineer_id) id, engineer_id, status, trigger_type, output_summary, duration_ms, started_at, completed_at, errors_encountered FROM agent_runs WHERE ticker = ${ticker} ORDER BY engineer_id, created_at DESC`)).rows as unknown as LatestRun[]
      : (await db.execute(sql`SELECT DISTINCT ON (engineer_id) id, engineer_id, status, trigger_type, output_summary, duration_ms, started_at, completed_at, errors_encountered FROM agent_runs ORDER BY engineer_id, created_at DESC`)).rows as unknown as LatestRun[];

    // Build status map: engineer definitions + schedule state + latest run
    const statusMap = engineers.map(eng => {
      const schedule = schedules.find(s => s.engineerId === eng.id);
      const lastRun = latestRunRows.find(r => r.engineer_id === eng.id);

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
          triggerType: lastRun.trigger_type,
          outputSummary: lastRun.output_summary,
          durationMs: lastRun.duration_ms,
          startedAt: lastRun.started_at,
          completedAt: lastRun.completed_at,
          error: lastRun.errors_encountered,
        } : null,
      };
    });

    // Count stats
    const running = latestRunRows.filter(r => r.status === 'running').length;
    const completed = latestRunRows.filter(r => r.status === 'completed').length;
    const failed = latestRunRows.filter(r => r.status === 'failed').length;
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
