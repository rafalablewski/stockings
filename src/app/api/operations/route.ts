import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns, pmDecisions } from '@/lib/schema';
import { desc, eq, and, inArray } from 'drizzle-orm';
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
  const seen = new Set<string>();

  for (const eng of engineers) {
    if (seen.has(eng.id)) continue;
    if (!eng.chainsTo) continue; // Only root of chains

    // Check this engineer isn't downstream of another
    const isDownstream = engineers.some(e => e.chainsTo === eng.id);
    if (isDownstream) continue;

    // Walk the chain
    const steps: PipelineStep[] = [];
    let current: typeof eng | undefined = eng;
    while (current) {
      seen.add(current.id);
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

  return pipelines;
}

const PIPELINE_DEFS = buildPipelineDefs();

// ── API ──────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const db = getDb();
  const ticker = req.nextUrl.searchParams.get('ticker') || 'asts';
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20', 10), 50);

  // Collect all engineer IDs involved in pipelines
  const allEngIds = PIPELINE_DEFS.flatMap(p => p.steps.map(s => s.engineerId));

  // Fetch recent runs for pipeline engineers
  const runs = await db
    .select()
    .from(agentRuns)
    .where(and(
      eq(agentRuns.ticker, ticker),
      inArray(agentRuns.engineerId, allEngIds),
    ))
    .orderBy(desc(agentRuns.createdAt))
    .limit(limit * allEngIds.length);

  // Fetch decisions linked to those runs
  const runIds = runs.map(r => r.id).filter(Boolean);
  const decisions = runIds.length > 0
    ? await db
        .select()
        .from(pmDecisions)
        .where(and(
          eq(pmDecisions.ticker, ticker),
          inArray(pmDecisions.engineerId, allEngIds),
        ))
        .orderBy(desc(pmDecisions.createdAt))
        .limit(limit * allEngIds.length)
    : [];

  // Also fetch recent decisions not tied to runs (for completeness)
  const standaloneDecisions = await db
    .select()
    .from(pmDecisions)
    .where(and(
      eq(pmDecisions.ticker, ticker),
      inArray(pmDecisions.engineerId, allEngIds),
    ))
    .orderBy(desc(pmDecisions.createdAt))
    .limit(limit * 2);

  const allDecisions = [...decisions, ...standaloneDecisions]
    .filter((d, i, arr) => arr.findIndex(x => x.id === d.id) === i);

  // ── Reconstruct operations ──────────────────────────────────────────────

  interface RunSlim {
    id: number;
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
    run: RunSlim | null;
    decision: DecisionSlim | null;
    status: 'completed' | 'running' | 'failed' | 'waiting' | 'blocked' | 'skipped';
  }

  interface Operation {
    pipelineId: string;
    pipelineName: string;
    startedAt: string | null;
    completedAt: string | null;
    status: 'completed' | 'in-progress' | 'failed' | 'blocked';
    steps: StepInstance[];
  }

  // Group runs by engineer
  const runsByEng: Record<string, typeof runs> = {};
  for (const r of runs) {
    (runsByEng[r.engineerId] ||= []).push(r);
  }

  // Group decisions by engineer
  const decsByEng: Record<string, typeof allDecisions> = {};
  for (const d of allDecisions) {
    (decsByEng[d.engineerId] ||= []).push(d);
  }

  const operations: Operation[] = [];

  for (const pipeline of PIPELINE_DEFS) {
    // Find root engineer runs (first step) — each is a separate operation
    const rootRuns = runsByEng[pipeline.steps[0].engineerId] || [];

    // Cap to limit most recent operations
    const recentRoots = rootRuns.slice(0, limit);

    for (const rootRun of recentRoots) {
      const steps: StepInstance[] = [];
      let opStatus: Operation['status'] = 'completed';
      let opCompleted: string | null = null;

      for (let i = 0; i < pipeline.steps.length; i++) {
        const stepDef = pipeline.steps[i];

        // Find the run for this step that's closest in time to the root
        const candidateRuns = (runsByEng[stepDef.engineerId] || []).filter(r => {
          if (i === 0) return r.id === rootRun.id;
          // Downstream run should be after root run started
          const rootTime = new Date(rootRun.createdAt).getTime();
          const runTime = new Date(r.createdAt).getTime();
          return runTime >= rootTime && runTime - rootTime < 3600_000; // within 1hr
        });
        const run = candidateRuns[0] || null;

        // Find decision for this step
        const candidateDecisions = (decsByEng[stepDef.engineerId] || []).filter(d => {
          if (run && d.runId === run.id) return true;
          // Fallback: decision created after run
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
                stepStatus = 'blocked'; // waiting for approval
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
          // No run yet for downstream step
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

        const runSlim = run ? {
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
        } : null;

        const decSlim = decision ? {
          id: decision.id,
          status: decision.status,
          category: decision.category,
          title: decision.title,
          pm: decision.pm,
          pmNotes: decision.pmNotes,
          bossNotes: decision.bossNotes,
          createdAt: decision.createdAt,
          updatedAt: decision.updatedAt,
        } : null;

        steps.push({
          engineerId: stepDef.engineerId,
          label: stepDef.label,
          run: runSlim,
          decision: decSlim,
          status: stepStatus,
        });
      }

      operations.push({
        pipelineId: pipeline.id,
        pipelineName: pipeline.name,
        startedAt: rootRun.startedAt as unknown as string || rootRun.createdAt as unknown as string,
        completedAt: opCompleted,
        status: opStatus,
        steps,
      });
    }
  }

  // Sort: in-progress/blocked first, then by date descending
  operations.sort((a, b) => {
    const priority: Record<string, number> = { 'in-progress': 0, 'blocked': 1, 'failed': 2, 'completed': 3 };
    const pa = priority[a.status] ?? 4;
    const pb = priority[b.status] ?? 4;
    if (pa !== pb) return pa - pb;
    return new Date(b.startedAt || 0).getTime() - new Date(a.startedAt || 0).getTime();
  });

  return NextResponse.json({
    pipelines: PIPELINE_DEFS,
    operations,
    ticker,
  });
}
