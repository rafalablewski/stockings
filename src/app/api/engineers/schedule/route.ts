import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { getDb } from '@/lib/db';
import { engineerSchedules } from '@/lib/schema';
import { getEngineer } from '@/lib/engineers';

/**
 * POST /api/engineers/schedule — Create or update an engineer's schedule metadata.
 * Body: { ticker, engineerId, enabled, intervalMinutes }
 *
 * NOTE: All engineers are manual-only. This endpoint stores schedule metadata
 * for tracking purposes but no automatic execution occurs. Use
 * POST /api/engineers/run to trigger engineers manually.
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

    const interval = intervalMinutes || engineer.defaultIntervalMinutes;
    const isEnabled = enabled ?? true;

    // Atomic upsert — avoids race condition on concurrent requests
    await db.insert(engineerSchedules)
      .values({
        ticker,
        engineerId,
        enabled: isEnabled,
        intervalMinutes: interval,
        nextRunAt: isEnabled ? new Date(Date.now() + interval * 60_000) : null,
      })
      .onConflictDoUpdate({
        target: [engineerSchedules.ticker, engineerSchedules.engineerId],
        set: {
          enabled: isEnabled,
          intervalMinutes: interval,
          nextRunAt: isEnabled ? new Date(Date.now() + interval * 60_000) : null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ engineerId, ticker, enabled: isEnabled, intervalMinutes: interval });
  } catch (error) {
    console.error('Engineer schedule error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update schedule' },
      { status: 500 }
    );
  }
}
