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
import { agentRuns, engineerSchedules, roomMessages, pmDecisions } from './schema';
import { eq, and, lte, sql, desc } from 'drizzle-orm';
import { getEngineer, engineers, type EngineerTask } from './engineers';
import { workflows } from '@/data/workflows';
import { resolvePromptPlaceholders } from './prompt-placeholders';
import { asts, bmnr, crcl } from '@/data';
import { scanForNewFilings, fetchFilingText, type FilingCoverageEntry } from './sec-scanner';
import { autoReviewDecision } from './gemini-auto-review';

// Claude models for engineer runs
const CLAUDE_MODEL_DEFAULT = 'claude-sonnet-4-5-20250929';
const CLAUDE_MODEL_FAST = 'claude-haiku-4-5-20251001';

// Status type for run records
export type RunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
export type TriggerType = 'scheduled' | 'event' | 'manual';

interface RunEngineerOptions {
  ticker: string;
  engineerId: string;
  triggerType: TriggerType;
  triggerReason?: string;
  userData?: string;          // optional user-provided data for data-requiring engineers
  chainContext?: Record<string, string>;  // placeholder values injected from upstream engineer
  workflowId?: string;       // optional: run only this specific workflow (for multi-workflow engineers)
}

interface RunResult {
  runId: number;
  status: RunStatus;
  outputSummary: string | null;
  outputFull: string | null;
  durationMs: number;
  error?: string;
  decisionId?: number | null;
  warnings?: string[];
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

  // ── Fallback: if no chainContext provided, try to fetch latest upstream output ──
  // This handles cases where the downstream engineer (e.g. db-ingestor) is triggered
  // manually or via schedule without going through the normal chain path.
  let effectiveChainContext = opts.chainContext;
  if (!effectiveChainContext) {
    const upstreamEngineer = engineers.find(e => e.chainsTo === opts.engineerId);
    if (upstreamEngineer) {
      const [latestRun] = await db
        .select({ outputFull: agentRuns.outputFull })
        .from(agentRuns)
        .where(
          and(
            eq(agentRuns.engineerId, upstreamEngineer.id),
            eq(agentRuns.ticker, opts.ticker),
            eq(agentRuns.status, 'completed'),
          ),
        )
        .orderBy(desc(agentRuns.completedAt))
        .limit(1);

      if (latestRun?.outputFull) {
        console.log(`[engine] No chainContext for ${opts.engineerId} — using latest ${upstreamEngineer.id} output (ticker: ${opts.ticker})`);
        effectiveChainContext = { LATEST_AUDIT_OUTPUT: latestRun.outputFull };
      }
    }
  }

  // Resolve matching workflow prompts for this engineer + ticker
  const allResolved = resolveAllEngineerPrompts(engineer, opts.ticker, effectiveChainContext);
  // If a specific workflowId was requested, filter to just that one
  const resolvedWorkflows = opts.workflowId
    ? allResolved.filter(w => w.workflowId === opts.workflowId)
    : allResolved;
  if (resolvedWorkflows.length === 0) {
    throw new Error(
      opts.workflowId
        ? `Workflow "${opts.workflowId}" not found or has no prompt for engineer ${opts.engineerId} on ticker ${opts.ticker}`
        : `No prompts found for engineer ${opts.engineerId} on ticker ${opts.ticker}`
    );
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

      // ── Custom execution: SEC Filing Scanner ────────────────────────────
      // The sec-filing-scan workflow needs its own orchestration loop:
      //   1. Fetch EDGAR → diff DB → identify untracked filings
      //   2. Fetch full text of top 10 untracked filings from EDGAR
      //   3. Include content in output so downstream ingestor can extract real data
      if (resolved.workflowId === 'sec-filing-scan') {
        const scanResult = await scanForNewFilings([opts.ticker]);
        const tickerResult = scanResult.tickerResults[0];

        // Identify top 10 newest untracked filings and fetch their full text
        const MAX_UNTRACKED_TO_FETCH = 10;
        const FILING_TEXT_LIMIT = 12_000; // per filing (10 × 12K = ~120K chars max)
        let untrackedWithContent: Array<FilingCoverageEntry & { filingText?: string }> = [];

        if (tickerResult?.coverage) {
          const untrackedEntries = tickerResult.coverage.entries
            .filter(e => e.status === 'untracked')
            .slice(0, MAX_UNTRACKED_TO_FETCH);

          // Fetch filing content in parallel for all untracked filings
          untrackedWithContent = await Promise.all(
            untrackedEntries.map(async (entry) => {
              if (!entry.fileUrl) return { ...entry, filingText: '[No EDGAR URL available]' };
              const text = await fetchFilingText(entry.fileUrl, FILING_TEXT_LIMIT);
              return { ...entry, filingText: text };
            })
          );
        }

        const outputFull = tickerResult
          ? [
              `# SEC FILING SCAN: ${opts.ticker}`,
              `Scanned at: ${scanResult.scannedAt}`,
              `Company: ${tickerResult.companyName}`,
              '',
              // Database coverage summary
              ...(tickerResult.coverage ? [
                `## DATABASE COVERAGE (${tickerResult.coverage.total} filings checked)`,
                `- **IN DB (tracked):** ${tickerResult.coverage.tracked}`,
                `- **DATA ONLY:** ${tickerResult.coverage.dataOnly}`,
                `- **UNTRACKED:** ${tickerResult.coverage.untracked}`,
                `- **Coverage:** ${tickerResult.coverage.total > 0 ? Math.round(((tickerResult.coverage.tracked + tickerResult.coverage.dataOnly) / tickerResult.coverage.total) * 100) : 0}%`,
              ] : []),
              '',
              // Untracked filings with FULL TEXT for extraction
              ...(untrackedWithContent.length > 0 ? [
                `## UNTRACKED FILINGS WITH FULL TEXT — ${untrackedWithContent.length} FILINGS FOR INGESTION`,
                '',
                'Each filing below includes the full EDGAR document text.',
                'Extract ALL material data points and generate database patches for every relevant data file.',
                '',
                ...untrackedWithContent.flatMap((e, i) => [
                  `════════════════════════════════════════`,
                  `FILING ${i + 1} of ${untrackedWithContent.length}`,
                  `════════════════════════════════════════`,
                  `Form: ${e.form}`,
                  `Date: ${e.filingDate}`,
                  `Accession: ${e.accessionNumber}`,
                  `Description: ${e.edgarDescription || 'N/A'}`,
                  `Status: UNTRACKED`,
                  '',
                  `── FULL DOCUMENT TEXT ──`,
                  e.filingText || '[No content available]',
                  `── END OF FILING ${i + 1} ──`,
                  '',
                ]),
              ] : tickerResult?.coverage?.untracked === 0
                ? ['All EDGAR filings are tracked or have cross-reference data in the database.']
                : []),
              // Remaining untracked filings not fetched this run
              ...(tickerResult?.coverage && tickerResult.coverage.untracked > MAX_UNTRACKED_TO_FETCH ? [
                '',
                `## REMAINING UNTRACKED (${tickerResult.coverage.untracked - MAX_UNTRACKED_TO_FETCH} more — not fetched this run)`,
                ...tickerResult.coverage.entries
                  .filter(e => e.status === 'untracked')
                  .slice(MAX_UNTRACKED_TO_FETCH)
                  .map(e => `- ${e.form} ${e.filingDate} (${e.accessionNumber})`),
              ] : []),
              '',
              '---',
              '',
              // New filing analyses (newly seen since last scan)
              `## NEW FILINGS SINCE LAST SCAN: ${tickerResult.newFilings.length}`,
              ...(tickerResult.newFilings.length > 0
                ? tickerResult.analyses.map(a =>
                    `### ${a.filing.form} — ${a.filing.filingDate}\n**Verdict:** ${a.verdict}\n**Accession:** ${a.filing.accessionNumber}\n\n${a.analysis}`
                  )
                : ['No new filings detected since last scan (all recent filings already seen).']),
              ...(tickerResult.error ? [`\nError: ${tickerResult.error}`] : []),
            ].join('\n')
          : `SEC scan completed for ${opts.ticker} — no results returned.`;

        const outputSummary = outputFull.slice(0, 500);
        const durationMs = Date.now() - wfStartTime;

        allOutputs.push(`═══ WORKFLOW: ${resolved.workflowId} ═══\n\n${outputFull}`);

        await db.update(agentRuns)
          .set({ status: 'completed', outputSummary, outputFull, durationMs, completedAt: new Date() })
          .where(eq(agentRuns.id, runId));

        continue; // Skip the standard Claude API path below
      }

      // ── Standard execution: resolve prompt → call Claude API ────────────

      // 3. Build the message with date + prompt + optional user data
      // Replace {{CURRENT_DATE}} placeholders in prompt with today's date
      const resolvedPrompt = resolved.prompt.replace(/\{\{CURRENT_DATE\}\}/g, today);
      const datedPrompt = `[Today's date: ${today}]\n\n${resolvedPrompt}`;
      const fullMessage = opts.userData
        ? `${datedPrompt}\n\n════════════════════════════════════════════════════════════\nAUTO-FETCHED DATA\n════════════════════════════════════════════════════════════\n\n${opts.userData}`
        : datedPrompt;

      // 4. Call Claude API
      // Use Haiku for audit engineers (large context, need speed for Vercel timeouts)
      const model = engineer.category === 'audit' ? CLAUDE_MODEL_FAST : CLAUDE_MODEL_DEFAULT;
      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 16384,
          messages: [{ role: 'user', content: fullMessage }],
        }),
      });

      if (!claudeRes.ok) {
        const errText = await claudeRes.text();
        // Detect credit/billing errors for a clear message
        const lower = errText.toLowerCase();
        if (lower.includes('credit balance') || lower.includes('billing') || lower.includes('purchase credits')) {
          throw new Error('Anthropic API credits exhausted. Add credits at console.anthropic.com → Plans & Billing.');
        }
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

  // Update the schedule's lastRunAt (non-critical — don't abort if schedule row is missing)
  try {
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
  } catch (err) {
    console.error(`[engine] Schedule update failed for ${opts.engineerId}/${opts.ticker}:`, err);
  }

  const combinedOutput = allOutputs.join('\n\n');
  const totalDuration = Date.now() - startTime;
  const hasFailure = allOutputs.some(o => o.includes('(FAILED)'));

  // ── Notify PM in the Room if configured ──────────────────────────────
  if (engineer.notifyPm) {
    const severityCounts = combinedOutput.match(/CRITICAL/g)?.length ?? 0;
    const summary = severityCounts > 0
      ? `completed with ${severityCounts} CRITICAL findings`
      : hasFailure ? 'failed' : 'completed successfully';
    db.insert(roomMessages).values({
      sender: engineer.notifyPm,
      content: `[Auto] ${engineer.name} run #${lastRunId} for ${opts.ticker} ${summary}. ${hasFailure ? 'Please investigate.' : 'Review the findings in the Decision Dashboard.'}`,
      channel: 'ml',
    }).catch(err => {
      console.error(`[engine] Room notify failed for ${engineer.notifyPm}:`, err);
    });
  }

  // ── Create PM decision item if configured ────────────────────────────
  let decisionId: number | null = null;
  const warnings: string[] = [];
  if (!hasFailure && engineer.decisionsFor) {
    const decisionCategory = engineer.decisionCategory || 'prompt-patch';
    const patchCountPattern = decisionCategory === 'data-patch' ? /"filing_ref"/g : /"finding_id"/g;
    const patchCount = (combinedOutput.match(patchCountPattern) || []).length;
    const itemLabel = decisionCategory === 'data-patch' ? 'data patches' : 'prompt patches';
    try {
      const [row] = await db.insert(pmDecisions).values({
        pm: engineer.decisionsFor,
        engineerId: engineer.id,
        runId: lastRunId,
        ticker: opts.ticker,
        title: `${engineer.name}: ${patchCount} ${itemLabel} for review`,
        category: decisionCategory,
        payload: combinedOutput,
      }).returning({ id: pmDecisions.id });
      decisionId = row?.id ?? null;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[engine] Decision creation failed for ${engineer.decisionsFor}:`, err);
      warnings.push(`Decision creation failed: ${errMsg}. Run 'npm run db:push' if the pm_decisions table doesn't exist.`);
    }
  }

  // ── Auto-review gate: if configured, Gemini AI reviews before chaining ──
  if (!hasFailure && engineer.autoReviewBy && decisionId) {
    try {
      const review = await autoReviewDecision(
        decisionId,
        engineer.autoReviewBy,
        combinedOutput,
        engineer,
        opts.ticker,
      );
      if (review.approved && engineer.chainsTo) {
        const chainPayload = review.enhancedPayload || combinedOutput;
        const downstreamEngineer = getEngineer(engineer.chainsTo);
        if (downstreamEngineer) {
          runEngineer({
            ticker: opts.ticker,
            engineerId: engineer.chainsTo,
            triggerType: 'event',
            triggerReason: `Chained from ${engineer.id} (run #${lastRunId}) — Gemini approved`,
            chainContext: { LATEST_AUDIT_OUTPUT: chainPayload },
          }).catch(err => {
            console.error(`[engine] Chain failed for ${engineer.chainsTo}:`, err);
          });
        }
      }
    } catch (err) {
      console.error(`[engine] Auto-review failed for ${engineer.autoReviewBy}:`, err);
    }
  }

  // ── Chaining: trigger downstream engineer if configured (non-reviewed) ──
  if (!hasFailure && engineer.chainsTo && !engineer.autoReviewBy) {
    const downstreamEngineer = getEngineer(engineer.chainsTo);
    if (downstreamEngineer) {
      runEngineer({
        ticker: opts.ticker,
        engineerId: engineer.chainsTo,
        triggerType: 'event',
        triggerReason: `Chained from ${engineer.id} (run #${lastRunId})`,
        chainContext: { LATEST_AUDIT_OUTPUT: combinedOutput },
      }).catch(err => {
        console.error(`[engine] Chain failed for ${engineer.chainsTo}:`, err);
      });
    }
  }

  return {
    runId: lastRunId,
    status: hasFailure ? 'failed' : 'completed',
    outputSummary: combinedOutput.slice(0, 500),
    outputFull: combinedOutput,
    durationMs: totalDuration,
    error: hasFailure ? 'One or more workflows failed — see output for details' : undefined,
    decisionId,
    warnings: warnings.length > 0 ? warnings : undefined,
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
function resolveAllEngineerPrompts(engineer: EngineerTask, ticker: string, chainContext?: Record<string, string>): ResolvedWorkflow[] {
  const tickerLower = ticker.toLowerCase();
  const results: ResolvedWorkflow[] = [];

  for (const wfId of engineer.workflowIds) {
    const workflow = workflows.find(w => w.id === wfId);
    if (!workflow) continue;

    // Prefer promptTemplate (works for any ticker) over per-ticker variants
    const promptText = workflow.promptTemplate ?? workflow.variants.find(v => v.ticker === tickerLower)?.prompt;
    if (promptText) {
      // Resolve {{PLACEHOLDER}} tokens in the prompt (including chain-injected context)
      const resolvedPrompt = resolvePromptPlaceholders(promptText, ticker, chainContext);
      const companyCtx = getCompanyContext(ticker);
      results.push({
        workflowId: wfId,
        prompt: `[AUTONOMOUS AI ENGINEER MODE]\nYou are operating as the "${engineer.name}" — ${engineer.role}.\n${engineer.description}\n\nThis is an autonomous run. Provide actionable analysis and flag any items that require human review.${companyCtx}\n\n---\n\n${resolvedPrompt}`,
      });
    }
  }

  return results;
}
