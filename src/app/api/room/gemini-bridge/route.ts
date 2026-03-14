import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { roomMessages, agentRuns, engineerSchedules } from '@/lib/schema';
import { desc, eq, inArray } from 'drizzle-orm';
import { generateGeminiResponse } from '@/lib/gemini-bridge';
import { VALID_CHANNELS } from '@/lib/types';

// Gemini's engineers (from org-hierarchy)
const GEMINI_ENGINEER_IDS = [
  'filing-engineer',
  'insider-engineer',
  'press-engineer',
  'sentiment-engineer',
  'regulatory-engineer',
  'disclosure-engineer',
];

const ENGINEER_LABELS: Record<string, string> = {
  'filing-engineer': 'SEC Filing',
  'insider-engineer': 'Insider Activity',
  'press-engineer': 'Press Intel',
  'sentiment-engineer': 'Market Sentiment',
  'regulatory-engineer': 'Regulatory & IP',
  'disclosure-engineer': 'Disclosure & Model',
};

/**
 * Build a live status snapshot of Gemini's engineers from the database.
 */
async function buildEngineerContext(db: ReturnType<typeof getDb>): Promise<string> {
  // Fetch latest run per Gemini engineer (across all tickers)
  const recentRuns = await db
    .select()
    .from(agentRuns)
    .where(inArray(agentRuns.engineerId, GEMINI_ENGINEER_IDS))
    .orderBy(desc(agentRuns.createdAt))
    .limit(30);

  // Fetch schedules for Gemini engineers
  const schedules = await db
    .select()
    .from(engineerSchedules)
    .where(inArray(engineerSchedules.engineerId, GEMINI_ENGINEER_IDS));

  // Dedupe to latest run per engineer
  const latestByEngineer = new Map<string, typeof recentRuns[number]>();
  for (const run of recentRuns) {
    if (!latestByEngineer.has(run.engineerId)) {
      latestByEngineer.set(run.engineerId, run);
    }
  }

  const scheduleByEngineer = new Map<string, typeof schedules[number]>();
  for (const s of schedules) {
    scheduleByEngineer.set(s.engineerId, s);
  }

  const lines: string[] = [];
  for (const engId of GEMINI_ENGINEER_IDS) {
    const label = ENGINEER_LABELS[engId] || engId;
    const run = latestByEngineer.get(engId);
    const sched = scheduleByEngineer.get(engId);

    if (!run && !sched) {
      lines.push(`- ${label}: No runs recorded. Not scheduled.`);
      continue;
    }

    let line = `- ${label}:`;
    if (run) {
      line += ` Last run: ${run.status}`;
      if (run.ticker) line += ` (ticker: ${run.ticker})`;
      if (run.completedAt) line += ` at ${new Date(run.completedAt).toLocaleString()}`;
      else if (run.startedAt) line += ` started ${new Date(run.startedAt).toLocaleString()}`;
      if (run.durationMs) line += `, took ${(run.durationMs / 1000).toFixed(1)}s`;
      if (run.triggerType) line += `, trigger: ${run.triggerType}`;
      if (run.outputSummary) line += `\n  Output: ${run.outputSummary}`;
      if (run.errorsEncountered) line += `\n  Error: ${run.errorsEncountered}`;
    } else {
      line += ' No runs recorded.';
    }
    if (sched) {
      line += `\n  Schedule: ${sched.enabled ? 'enabled' : 'paused'}, every ${sched.intervalMinutes}min`;
      if (sched.lastRunAt) line += `, last: ${new Date(sched.lastRunAt).toLocaleString()}`;
      if (sched.nextRunAt) line += `, next: ${new Date(sched.nextRunAt).toLocaleString()}`;
    }

    lines.push(line);
  }

  if (lines.length === 0) {
    return 'No engineer run data available. None of your engineers have run yet.';
  }

  return lines.join('\n');
}

/**
 * POST /api/room/gemini-bridge
 *
 * Triggers Gemini to read the latest messages in a channel and post a response.
 * Body: { "channel": "general" }
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const channel = body.channel || 'general';

  if (!VALID_CHANNELS.includes(channel)) {
    return NextResponse.json(
      { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` },
      { status: 400 }
    );
  }

  // 1. Fetch recent messages for context
  const db = getDb();
  const recent = await db
    .select()
    .from(roomMessages)
    .where(eq(roomMessages.channel, channel))
    .orderBy(desc(roomMessages.createdAt))
    .limit(30);

  // Chronological order for the conversation
  const messages = recent.reverse();

  // 2. Fetch live engineer status data
  const engineerContext = await buildEngineerContext(db);

  // 3. Generate Gemini response with real data
  let responseText: string;
  try {
    responseText = await generateGeminiResponse(messages, channel, engineerContext);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Gemini error: ${message}` }, { status: 502 });
  }

  // 4. Post response to the room
  const [newMessage] = await db
    .insert(roomMessages)
    .values({
      sender: 'gemini',
      content: responseText,
      channel,
      replyTo: null,
    })
    .returning();

  return NextResponse.json({ message: newMessage }, { status: 201 });
}
