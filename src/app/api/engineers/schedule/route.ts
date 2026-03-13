import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { getDb } from '@/lib/db';
import { engineerSchedules } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { getEngineer } from '@/lib/engineers';

/**
 * POST /api/engineers/schedule — Create or update an engineer's schedule.
 * Body: { ticker, engineerId, enabled, intervalMinutes }
 */
export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  try {
    const body = await request.json();
    const { ticker, engineerId, enabled, intervalMinutes } = body as {
      ticker: string;
      engineerId: string;
      enabled: boolean;
      intervalMinutes: number;
    };

    if (!ticker || !engineerId) {
      return NextResponse.json({ error: 'Missing ticker or engineerId' }, { status: 400 });
    }

    const engineer = getEngineer(engineerId);
    if (!engineer) {
      return NextResponse.json({ error: `Unknown engineer: ${engineerId}` }, { status: 404 });
    }

    const db = getDb();

    // Upsert — check if schedule exists
    const existing = await db.select()
      .from(engineerSchedules)
      .where(
        and(
          eq(engineerSchedules.ticker, ticker),
          eq(engineerSchedules.engineerId, engineerId),
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await db.update(engineerSchedules)
        .set({
          enabled: enabled ?? existing[0].enabled,
          intervalMinutes: intervalMinutes ?? existing[0].intervalMinutes,
          nextRunAt: enabled ? new Date(Date.now() + (intervalMinutes || existing[0].intervalMinutes) * 60_000) : null,
          updatedAt: new Date(),
        })
        .where(eq(engineerSchedules.id, existing[0].id));

      return NextResponse.json({ action: 'updated', engineerId, ticker, enabled, intervalMinutes });
    } else {
      // Create new schedule
      const interval = intervalMinutes || engineer.defaultIntervalMinutes;
      await db.insert(engineerSchedules).values({
        ticker,
        engineerId,
        enabled: enabled ?? true,
        intervalMinutes: interval,
        nextRunAt: enabled !== false ? new Date(Date.now() + interval * 60_000) : null,
      });

      return NextResponse.json({ action: 'created', engineerId, ticker, enabled: enabled ?? true, intervalMinutes: interval });
    }
  } catch (error) {
    console.error('Engineer schedule error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update schedule' },
      { status: 500 }
    );
  }
}
