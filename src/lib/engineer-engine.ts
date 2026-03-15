// ============================================================================
// ENGINEER ENGINE — Autonomous execution engine for AI engineers
// ============================================================================
// This module handles the actual execution of engineer tasks:
//  1. Checks which engineers are due to run based on their schedules
//  2. Gathers context data for each engineer (database state, external data)
//  3. Calls the Claude API with the engineer's workflow prompt + context
//  4. Records results in the agent_runs table
//  5. Optionally applies patches if the engineer produces database updates
// ============================================================================

import { getDb } from './db';
import { agentRuns, engineerSchedules } from './schema';
import { eq, and, lte, sql } from 'drizzle-orm';
import { getEngineer, type EngineerTask } from './engineers';
import { workflows } from '@/data/workflows';
import { resolvePromptPlaceholders } from './prompt-placeholders';

// Claude model used for engineer runs
const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929';

// Status type for run records
export type RunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
export type TriggerType = 'scheduled' | 'event' | 'manual';

interface RunEngineerOptions {
  ticker: string;
  engineerId: string;
  triggerType: TriggerType;
  triggerReason?: string;
  userData?: string;          // optional user-provided data for data-requiring engineers
}

interface RunResult {
  runId: number;
  status: RunStatus;
  outputSummary: string | null;
  outputFull: string | null;
  durationMs: number;
  error?: string;
}

/**
 * Execute a single engineer run — the core autonomous execution path.
 *
 * This is called by:
 *  - The scheduler (when an engineer is due)
 *  - Event triggers (when a filing/press-release/etc. is detected)
 *  - Manual trigger (from the Engineers dashboard)
 */
export async function runEngineer(opts: RunEngineerOptions): Promise<RunResult> {
  const db = getDb();
  const engineer = getEngineer(opts.engineerId);
  if (!engineer) {
    throw new Error(`Unknown engineer: ${opts.engineerId}`);
  }

  const startTime = Date.now();

  // 1. Create a queued run record
  const [run] = await db.insert(agentRuns).values({
    ticker: opts.ticker,
    engineerId: opts.engineerId,
    workflowId: engineer.workflowIds[0] || null,
    status: 'queued',
    triggerType: opts.triggerType,
    triggerReason: opts.triggerReason || `${opts.triggerType} run`,
    inputSummary: opts.userData ? `User data: ${opts.userData.slice(0, 200)}...` : 'Database context',
    scheduledAt: new Date(),
  }).returning({ id: agentRuns.id });

  const runId = run.id;

  try {
    // 2. Mark as running
    await db.update(agentRuns)
      .set({ status: 'running', startedAt: new Date() })
      .where(eq(agentRuns.id, runId));

    // 3. Resolve the prompt from the linked workflow
    const prompt = resolveEngineerPrompt(engineer, opts.ticker);
    if (!prompt) {
      throw new Error(`No prompt found for engineer ${opts.engineerId} on ticker ${opts.ticker}`);
    }

    // 3b. Resolve {{PLACEHOLDER}} tokens in the prompt
    const resolvedPrompt = resolvePromptPlaceholders(prompt);

    // 4. Call Claude API
    const apiKey = process.env.ANTHROPIC_API_KEY || '';
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

    const fullMessage = opts.userData
      ? `${resolvedPrompt}\n\n════════════════════════════════════════════════════════════\nAUTO-FETCHED DATA\n════════════════════════════════════════════════════════════\n\n${opts.userData}`
      : resolvedPrompt;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 16384,
        messages: [{ role: 'user', content: fullMessage }],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      let reason = `Claude API returned ${claudeRes.status}`;
      try {
        const parsed = JSON.parse(errText);
        if (parsed?.error?.message) reason = parsed.error.message;
      } catch { /* use default */ }
      throw new Error(reason);
    }

    const result = await claudeRes.json();
    const outputFull = result.content?.[0]?.text || '';
    const outputSummary = outputFull.slice(0, 500);
    const durationMs = Date.now() - startTime;

    // 5. Mark as completed
    await db.update(agentRuns)
      .set({
        status: 'completed',
        outputSummary,
        outputFull,
        durationMs,
        completedAt: new Date(),
      })
      .where(eq(agentRuns.id, runId));

    // 6. Update the schedule's lastRunAt
    await db.update(engineerSchedules)
      .set({
        lastRunAt: new Date(),
        nextRunAt: sql`NOW() + (interval_minutes || ' minutes')::interval`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(engineerSchedules.ticker, opts.ticker),
          eq(engineerSchedules.engineerId, opts.engineerId),
        )
      );

    return { runId, status: 'completed', outputSummary, outputFull, durationMs };
  } catch (err) {
    const durationMs = Date.now() - startTime;
    const errorMsg = err instanceof Error ? err.message : String(err);

    await db.update(agentRuns)
      .set({
        status: 'failed',
        errorsEncountered: errorMsg,
        durationMs,
        completedAt: new Date(),
      })
      .where(eq(agentRuns.id, runId));

    return { runId, status: 'failed', outputSummary: null, outputFull: null, durationMs, error: errorMsg };
  }
}

/**
 * Check which engineers are due to run and execute them.
 * Called by the scheduler endpoint (e.g. via Vercel Cron).
 */
export async function checkAndRunDueEngineers(): Promise<RunResult[]> {
  const db = getDb();

  // Find all enabled schedules whose nextRunAt has passed
  const dueSchedules = await db.select()
    .from(engineerSchedules)
    .where(
      and(
        eq(engineerSchedules.enabled, true),
        lte(engineerSchedules.nextRunAt, new Date()),
      )
    );

  // Run all due engineers in parallel for better throughput
  const results = await Promise.all(
    dueSchedules.map(schedule =>
      runEngineer({
        ticker: schedule.ticker,
        engineerId: schedule.engineerId,
        triggerType: 'scheduled',
        triggerReason: `Scheduled run (every ${schedule.intervalMinutes}min)`,
      })
    )
  );

  return results;
}

/**
 * Resolve the appropriate prompt for an engineer + ticker combination.
 * Uses the first matching workflow variant.
 */
function resolveEngineerPrompt(engineer: EngineerTask, ticker: string): string | null {
  const tickerLower = ticker.toLowerCase();

  for (const wfId of engineer.workflowIds) {
    const workflow = workflows.find(w => w.id === wfId);
    if (!workflow) continue;

    const variant = workflow.variants.find(v => v.ticker === tickerLower);
    if (variant) {
      return `[AUTONOMOUS AI ENGINEER MODE]\nYou are operating as the "${engineer.name}" — ${engineer.role}.\n${engineer.description}\n\nThis is an autonomous run. Provide actionable analysis and flag any items that require human review.\n\n---\n\n${variant.prompt}`;
    }
  }

  return null;
}
