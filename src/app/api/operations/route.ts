import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns, pmDecisions } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { engineers } from '@/lib/engineers';

// ── Pipeline definitions derived from engineer chainsTo config ───────────────

interface PipelineStep {
  engineerId: string;
  label: string;
  decisionsFor?: string;
  decisionCategory?: string;
  autoReviewBy?: string;
}

interface PipelineDef {
  id: string;
  name: string;
  description: string;
  steps: PipelineStep[];
}

function buildPipelineDefs(): PipelineDef[] {
  const pipelines: PipelineDef[] = [];
  const chainedIds = new Set<string>();

  // First, find multi-step chains (chainsTo relationships)
  for (const eng of engineers) {
    if (!eng.chainsTo) continue;
    // Check this engineer isn't downstream of another
    const isDownstream = engineers.some(e => e.chainsTo === eng.id);
    if (isDownstream) continue;

    const steps: PipelineStep[] = [];
    let current: typeof eng | undefined = eng;
    while (current) {
      chainedIds.add(current.id);
      steps.push({
        engineerId: current.id,
        label: current.name,
        decisionsFor: current.decisionsFor,
        decisionCategory: current.decisionCategory,
        autoReviewBy: current.autoReviewBy,
      });
      current = current.chainsTo
        ? engineers.find(e => e.id === current!.chainsTo)
        : undefined;
    }

    pipelines.push({
      id: steps.map(s => s.engineerId).join('→'),
      name: steps.map(s => s.label).join(' → '),
      description: `${steps.length}-step pipeline`,
      steps,
    });
  }

  // Then, add standalone engineers as single-step "pipelines"
  for (const eng of engineers) {
    if (chainedIds.has(eng.id)) continue;
    pipelines.push({
      id: eng.id,
      name: eng.name,
      description: 'Single-step operation',
      steps: [{
        engineerId: eng.id,
        label: eng.name,
        decisionsFor: eng.decisionsFor,
        decisionCategory: eng.decisionCategory,
        autoReviewBy: eng.autoReviewBy,
      }],
    });
  }

  return pipelines;
}

const PIPELINE_DEFS = buildPipelineDefs();
// Separate multi-step from single-step for display grouping
const MULTI_STEP_IDS = new Set(PIPELINE_DEFS.filter(p => p.steps.length > 1).map(p => p.id));

// ── Slim types ───────────────────────────────────────────────────────────────

interface RunSlim {
  id: number;
  engineerId: string;
  status: string;
  triggerType: string;
  triggerReason: string | null;
  outputSummary: string | null;
  durationMs: number | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  patchesApplied: number;
}

interface DecisionSlim {
  id: number;
  engineerId: string;
  runId: number | null;
  status: string;
  category: string;
  title: string;
  pm: string;
  pmNotes: string | null;
  bossNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface StepInstance {
  engineerId: string;
  label: string;
  run: Omit<RunSlim, 'engineerId'> | null;
  decision: Omit<DecisionSlim, 'engineerId' | 'runId'> | null;
  status: 'completed' | 'running' | 'failed' | 'waiting' | 'blocked' | 'skipped';
}

interface Operation {
  pipelineId: string;
  pipelineName: string;
  pipelineStepCount: number;
  startedAt: string | null;
  completedAt: string | null;
  status: 'completed' | 'in-progress' | 'failed' | 'blocked';
  steps: StepInstance[];
}

// ── API ──────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const db = getDb();
  const tickerParam = req.nextUrl.searchParams.get('ticker') || 'asts';
  const ticker = tickerParam.toLowerCase();
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20', 10), 50);

  // Fetch ALL recent runs for this ticker (not filtered by engineer)
  const runs: RunSlim[] = (await db
    .select({
      id: agentRuns.id,
      engineerId: agentRuns.engineerId,
      status: agentRuns.status,
      triggerType: agentRuns.triggerType,
      triggerReason: agentRuns.triggerReason,
      outputSummary: agentRuns.outputSummary,
      durationMs: agentRuns.durationMs,
      startedAt: agentRuns.startedAt,
      completedAt: agentRuns.completedAt,
      createdAt: agentRuns.createdAt,
      patchesApplied: agentRuns.patchesApplied,
    })
    .from(agentRuns)
    .where(eq(agentRuns.ticker, ticker))
    .orderBy(desc(agentRuns.createdAt))
    .limit(limit * 10)) as RunSlim[];

  // Fetch ALL recent decisions for this ticker
  const allDecisions: DecisionSlim[] = (await db
    .select({
      id: pmDecisions.id,
      engineerId: pmDecisions.engineerId,
      runId: pmDecisions.runId,
      status: pmDecisions.status,
      category: pmDecisions.category,
      title: pmDecisions.title,
      pm: pmDecisions.pm,
      pmNotes: pmDecisions.pmNotes,
      bossNotes: pmDecisions.bossNotes,
      createdAt: pmDecisions.createdAt,
      updatedAt: pmDecisions.updatedAt,
    })
    .from(pmDecisions)
    .where(eq(pmDecisions.ticker, ticker))
    .orderBy(desc(pmDecisions.createdAt))
    .limit(limit * 10)) as DecisionSlim[];

  // Group runs by engineer
  const runsByEng: Record<string, RunSlim[]> = {};
  for (const r of runs) {
    (runsByEng[r.engineerId] ||= []).push(r);
  }

  // Group decisions by engineer
  const decsByEng: Record<string, DecisionSlim[]> = {};
  for (const d of allDecisions) {
    (decsByEng[d.engineerId] ||= []).push(d);
  }

  // ── Reconstruct operations ──────────────────────────────────────────────

  const operations: Operation[] = [];

  for (const pipeline of PIPELINE_DEFS) {
    // Find root engineer runs (first step) — each is a separate operation
    const rootRuns = runsByEng[pipeline.steps[0].engineerId] || [];
    const recentRoots = rootRuns.slice(0, limit);

    for (const rootRun of recentRoots) {
      const steps: StepInstance[] = [];
      let opStatus: Operation['status'] = 'completed';
      let opCompleted: string | null = null;

      for (let i = 0; i < pipeline.steps.length; i++) {
        const stepDef = pipeline.steps[i];

        // Find the run for this step
        const candidateRuns = (runsByEng[stepDef.engineerId] || []).filter(r => {
          if (i === 0) return r.id === rootRun.id;
          // Downstream run should be after root run started, within 1hr
          const rootTime = new Date(rootRun.createdAt).getTime();
          const runTime = new Date(r.createdAt).getTime();
          return runTime >= rootTime && runTime - rootTime < 3600_000;
        });
        const run = candidateRuns[0] || null;

        // Find decision for this step
        const candidateDecisions = (decsByEng[stepDef.engineerId] || []).filter(d => {
          if (run && d.runId === run.id) return true;
          if (run) {
            const runTime = new Date(run.createdAt).getTime();
            const decTime = new Date(d.createdAt).getTime();
            return decTime >= runTime && decTime - runTime < 3600_000;
          }
          return false;
        });
        const decision = candidateDecisions[0] || null;

        // Determine step status
        let stepStatus: StepInstance['status'] = 'waiting';
        if (run) {
          if (run.status === 'completed') {
            stepStatus = 'completed';
            if (decision) {
              if (decision.status === 'pending' || decision.status === 'pm-approved') {
                stepStatus = 'blocked';
                opStatus = 'blocked';
              } else if (decision.status === 'pm-rejected' || decision.status === 'boss-rejected') {
                stepStatus = 'failed';
                opStatus = 'failed';
              } else if (decision.status === 'applied' || decision.status === 'boss-approved') {
                stepStatus = 'completed';
              }
            }
          } else if (run.status === 'running') {
            stepStatus = 'running';
            opStatus = 'in-progress';
          } else if (run.status === 'failed') {
            stepStatus = 'failed';
            opStatus = 'failed';
          } else if (run.status === 'queued') {
            stepStatus = 'waiting';
            opStatus = 'in-progress';
          }
        } else if (i > 0) {
          const prevStep = steps[i - 1];
          if (prevStep.status === 'failed') {
            stepStatus = 'skipped';
          } else if (prevStep.status === 'completed') {
            stepStatus = 'waiting';
            if (opStatus === 'completed') opStatus = 'in-progress';
          } else {
            stepStatus = 'waiting';
          }
        }

        if (run?.completedAt) {
          opCompleted = run.completedAt as unknown as string;
        }

        steps.push({
          engineerId: stepDef.engineerId,
          label: stepDef.label,
          run: run ? {
            id: run.id,
            status: run.status,
            triggerType: run.triggerType,
            triggerReason: run.triggerReason,
            outputSummary: run.outputSummary,
            durationMs: run.durationMs,
            startedAt: run.startedAt,
            completedAt: run.completedAt,
            createdAt: run.createdAt,
            patchesApplied: run.patchesApplied,
          } : null,
          decision: decision ? {
            id: decision.id,
            status: decision.status,
            category: decision.category,
            title: decision.title,
            pm: decision.pm,
            pmNotes: decision.pmNotes,
            bossNotes: decision.bossNotes,
            createdAt: decision.createdAt,
            updatedAt: decision.updatedAt,
          } : null,
          status: stepStatus,
        });
      }

      operations.push({
        pipelineId: pipeline.id,
        pipelineName: pipeline.name,
        pipelineStepCount: pipeline.steps.length,
        startedAt: rootRun.startedAt as unknown as string || rootRun.createdAt as unknown as string,
        completedAt: opCompleted,
        status: opStatus,
        steps,
      });
    }
  }

  // Sort: multi-step first, then by priority, then by date
  operations.sort((a, b) => {
    // Multi-step pipelines first
    const aMulti = MULTI_STEP_IDS.has(a.pipelineId) ? 0 : 1;
    const bMulti = MULTI_STEP_IDS.has(b.pipelineId) ? 0 : 1;
    if (aMulti !== bMulti) return aMulti - bMulti;

    const priority: Record<string, number> = { 'in-progress': 0, 'blocked': 1, 'failed': 2, 'completed': 3 };
    const pa = priority[a.status] ?? 4;
    const pb = priority[b.status] ?? 4;
    if (pa !== pb) return pa - pb;
    return new Date(b.startedAt || 0).getTime() - new Date(a.startedAt || 0).getTime();
  });

  return NextResponse.json({
    pipelines: PIPELINE_DEFS.filter(p => p.steps.length > 1),
    operations: operations.slice(0, limit),
    ticker,
  });
}
