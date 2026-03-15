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
import { asts, bmnr, crcl } from '@/data';

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

  // Resolve ALL matching workflow prompts for this engineer + ticker
  const resolvedWorkflows = resolveAllEngineerPrompts(engineer, opts.ticker);
  if (resolvedWorkflows.length === 0) {
    throw new Error(`No prompts found for engineer ${opts.engineerId} on ticker ${opts.ticker}`);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

  const today = new Date().toISOString().split('T')[0];
  const allOutputs: string[] = [];
  let lastRunId = 0;

  // Execute each workflow sequentially (each gets its own run record)
  for (const resolved of resolvedWorkflows) {
    const wfStartTime = Date.now();

    // 1. Create a queued run record per workflow
    const [run] = await db.insert(agentRuns).values({
      ticker: opts.ticker,
      engineerId: opts.engineerId,
      workflowId: resolved.workflowId,
      status: 'queued',
      triggerType: opts.triggerType,
      triggerReason: opts.triggerReason || `${opts.triggerType} run`,
      inputSummary: opts.userData ? `User data: ${opts.userData.slice(0, 200)}...` : 'Database context',
      scheduledAt: new Date(),
    }).returning({ id: agentRuns.id });

    const runId = run.id;
    lastRunId = runId;

    try {
      // 2. Mark as running
      await db.update(agentRuns)
        .set({ status: 'running', startedAt: new Date() })
        .where(eq(agentRuns.id, runId));

      // 3. Build the message with date + prompt + optional user data
      // Replace {{CURRENT_DATE}} placeholders in prompt with today's date
      const resolvedPrompt = resolved.prompt.replace(/\{\{CURRENT_DATE\}\}/g, today);
      const datedPrompt = `[Today's date: ${today}]\n\n${resolvedPrompt}`;
      const fullMessage = opts.userData
        ? `${datedPrompt}\n\n════════════════════════════════════════════════════════════\nAUTO-FETCHED DATA\n════════════════════════════════════════════════════════════\n\n${opts.userData}`
        : datedPrompt;

      // 4. Call Claude API
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
      const durationMs = Date.now() - wfStartTime;

      allOutputs.push(`═══ WORKFLOW: ${resolved.workflowId} ═══\n\n${outputFull}`);

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
    } catch (err) {
      const durationMs = Date.now() - wfStartTime;
      const errorMsg = err instanceof Error ? err.message : String(err);

      await db.update(agentRuns)
        .set({
          status: 'failed',
          errorsEncountered: errorMsg,
          durationMs,
          completedAt: new Date(),
        })
        .where(eq(agentRuns.id, runId));

      allOutputs.push(`═══ WORKFLOW: ${resolved.workflowId} (FAILED) ═══\n\nError: ${errorMsg}`);
    }
  }

  // Update the schedule's lastRunAt
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

  const combinedOutput = allOutputs.join('\n\n');
  const totalDuration = Date.now() - startTime;
  const hasFailure = allOutputs.some(o => o.includes('(FAILED)'));

  return {
    runId: lastRunId,
    status: hasFailure ? 'failed' : 'completed',
    outputSummary: combinedOutput.slice(0, 500),
    outputFull: combinedOutput,
    durationMs: totalDuration,
    error: hasFailure ? 'One or more workflows failed — see output for details' : undefined,
  };
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

// Map ticker -> company data module for dynamic context injection
const TICKER_DATA: Record<string, { COMPANY_INFO: { name: string; ticker: string; exchange: string; sector: string; description: string } }> = {
  asts,
  bmnr,
  crcl,
};

/**
 * Build a company context block from the data files.
 * This ensures every prompt has fresh, authoritative company info.
 */
function getCompanyContext(ticker: string): string {
  const data = TICKER_DATA[ticker.toLowerCase()];
  if (!data?.COMPANY_INFO) return '';
  const c = data.COMPANY_INFO;
  return `\n\n════════════════════════════════════════════════════════════\nCOMPANY CONTEXT (auto-injected from database)\n════════════════════════════════════════════════════════════\nCompany: ${c.name}\nTicker: ${c.ticker}\nExchange: ${c.exchange}\nSector: ${c.sector}\nDescription: ${c.description}\n`;
}

interface ResolvedWorkflow {
  workflowId: string;
  prompt: string;
}

/**
 * Resolve ALL matching prompts for an engineer + ticker combination.
 * Returns a prompt for each workflow that has a variant for this ticker.
 */
function resolveAllEngineerPrompts(engineer: EngineerTask, ticker: string): ResolvedWorkflow[] {
  const tickerLower = ticker.toLowerCase();
  const results: ResolvedWorkflow[] = [];

  for (const wfId of engineer.workflowIds) {
    const workflow = workflows.find(w => w.id === wfId);
    if (!workflow) continue;

    // Prefer promptTemplate (works for any ticker) over per-ticker variants
    const promptText = workflow.promptTemplate ?? workflow.variants.find(v => v.ticker === tickerLower)?.prompt;
    if (promptText) {
      // Resolve {{PLACEHOLDER}} tokens in the prompt
      const resolvedPrompt = resolvePromptPlaceholders(promptText, ticker);
      const companyCtx = getCompanyContext(ticker);
      results.push({
        workflowId: wfId,
        prompt: `[AUTONOMOUS AI ENGINEER MODE]\nYou are operating as the "${engineer.name}" — ${engineer.role}.\n${engineer.description}\n\nThis is an autonomous run. Provide actionable analysis and flag any items that require human review.${companyCtx}\n\n---\n\n${resolvedPrompt}`,
      });
    }
  }

  return results;
}
