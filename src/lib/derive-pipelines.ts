// ============================================================================
// DERIVE PIPELINES — Auto-generate operation pipelines from engineer metadata
// ============================================================================
// Zero hardcoded pipelines. Every pipeline is built by walking the `chainsTo`
// graph in engineers.ts and inspecting each engineer's properties
// (autoReviewBy, decisionsFor, defaultIntervalMinutes, workflowIds, etc.)
// to auto-generate trigger → engineer → review → gate → output steps.
//
// Adding a new engineer with `chainsTo` automatically creates a new pipeline.
// Adding `decisionsFor` automatically inserts a PM gate step.
// Adding `autoReviewBy` automatically inserts an AI review step.
// ============================================================================

import { engineers, type EngineerTask } from '@/lib/engineers';
import { orgNodes } from '@/data/org-hierarchy';

// ── Types ────────────────────────────────────────────────────────────────────

export interface PipelineStep {
  label: string;
  actor: string;
  division: string;
  description: string;
  type: 'trigger' | 'engineer' | 'review' | 'decision' | 'output';
  /** Workflow IDs whose prompt is viewable in the "View Prompt" panel */
  workflowIds?: string[];
}

export interface DerivedPipeline {
  id: string;
  name: string;
  description: string;
  /** Plain-English "explain like I'm 10" summary of what this pipeline does */
  humanDescription?: string;
  color: 'mint' | 'gold' | 'violet' | 'cyan' | 'rose';
  interval: string;
  steps: PipelineStep[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Map engineer ID → division slug (e.g. 'claude', 'gemini', 'maszka', 'bobman') */
function getDivision(engineerId: string): string {
  const node = orgNodes.find(n => n.engineerId === engineerId);
  if (!node?.parentId) return 'system';
  const divNode = orgNodes.find(n => n.id === node.parentId);
  return divNode?.label?.toLowerCase() ?? 'system';
}

/** Division name used for PM labels */
const DIV_PM_LABEL: Record<string, string> = {
  claude: 'Claude PM',
  gemini: 'Gemini PM',
  maszka: 'Maszka PM',
  bobman: 'Bobman PM',
};

/** Friendly interval label from minutes */
function formatInterval(minutes: number): string {
  if (minutes <= 0) return 'chain-only';
  if (minutes < 60) return `${minutes} min`;
  if (minutes < 1440) return `${minutes / 60} hr`;
  return `${minutes / 1440}d`;
}

/** Pick pipeline color from the head engineer's category */
const CATEGORY_COLOR: Record<string, DerivedPipeline['color']> = {
  research: 'cyan',
  monitoring: 'mint',
  audit: 'gold',
  intelligence: 'violet',
  documentation: 'rose',
};

// ── Pipeline derivation ──────────────────────────────────────────────────────

/**
 * Walk the `chainsTo` graph and build a pipeline for every chain.
 * A "chain head" is an engineer that is NOT the target of any other
 * engineer's `chainsTo` (i.e. a root of a chain).
 */
export function derivePipelines(): DerivedPipeline[] {
  // Build set of engineers that are chained TO (they're not chain heads)
  const chainedTo = new Set<string>();
  for (const eng of engineers) {
    if (eng.chainsTo) chainedTo.add(eng.chainsTo);
  }

  // Chain heads: engineers that start a multi-step chain (have chainsTo)
  // and are not themselves chained to by another engineer.
  // Standalone engineers (no chainsTo) are excluded — they don't form pipelines yet.
  const chainHeads = engineers.filter(
    eng => !chainedTo.has(eng.id) && eng.chainsTo
  );

  return chainHeads.map(head => buildPipeline(head));
}

/** Walk from a head engineer through its chainsTo links and build the full pipeline. */
function buildPipeline(head: EngineerTask): DerivedPipeline {
  // Collect the chain: [head, next, next, ...]
  const chain: EngineerTask[] = [];
  let current: EngineerTask | undefined = head;
  const visited = new Set<string>();
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    chain.push(current);
    current = current.chainsTo ? engineers.find(e => e.id === current!.chainsTo) : undefined;
  }

  const steps: PipelineStep[] = [];

  // ── Step 1: Trigger (if head has a schedule)
  if (head.defaultIntervalMinutes > 0) {
    const triggerLabel = head.triggerEvents[0]
      ? head.triggerEvents[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : 'Scheduled Run';

    steps.push({
      label: triggerLabel,
      actor: 'Cron Scheduler',
      division: 'system',
      description: `Triggers every ${formatInterval(head.defaultIntervalMinutes)}${head.dataSource ? ` — polls ${head.dataSource}` : ''}`,
      type: 'trigger',
    });
  }

  // ── Steps for each engineer in the chain
  for (const eng of chain) {
    const div = getDivision(eng.id);

    // Engineer step
    steps.push({
      label: eng.name,
      actor: eng.name,
      division: div,
      description: eng.description,
      type: 'engineer',
      workflowIds: eng.workflowIds.length > 0 ? eng.workflowIds : undefined,
    });

    // Auto-review step (if configured)
    if (eng.autoReviewBy) {
      const reviewDiv = eng.autoReviewBy;
      steps.push({
        label: 'AI Auto-Review',
        actor: `${reviewDiv.charAt(0).toUpperCase() + reviewDiv.slice(1)} AI`,
        division: reviewDiv,
        description: `${reviewDiv.charAt(0).toUpperCase() + reviewDiv.slice(1)} AI validates output quality — approves or rejects before chaining forward`,
        type: 'review',
      });
    }

    // PM decision gate (if configured)
    if (eng.decisionsFor) {
      const pmDiv = eng.decisionsFor;
      const pmLabel = DIV_PM_LABEL[pmDiv] ?? `${pmDiv.charAt(0).toUpperCase() + pmDiv.slice(1)} PM`;
      steps.push({
        label: 'PM Decision Gate',
        actor: pmLabel,
        division: pmDiv,
        description: `Decision created in PM Dashboard (${eng.decisionCategory ?? 'general'} category). Requires approval before proceeding`,
        type: 'decision',
      });
    }
  }

  // ── Final output step
  const lastEng = chain[chain.length - 1];
  const hasDecisionGate = chain.some(e => e.decisionsFor);
  steps.push({
    label: hasDecisionGate ? 'Apply Patches' : 'Output',
    actor: 'System',
    division: 'system',
    description: hasDecisionGate
      ? 'Approved patches applied to the database'
      : `${lastEng.name} output stored in run history`,
    type: 'output',
  });

  // ── Assemble pipeline metadata
  const headDiv = getDivision(head.id);
  const categoryName = head.category.charAt(0).toUpperCase() + head.category.slice(1);
  const chainNames = chain.map(e => e.name);

  return {
    id: head.id,
    name: chain.length > 1
      ? `${chainNames[0]} Pipeline`
      : `${head.name} Pipeline`,
    description: chain.length > 1
      ? chainNames.join(' \u2192 ')
      : `${categoryName}: ${head.description.split('.')[0]}`,
    humanDescription: head.pipelineDescription,
    color: CATEGORY_COLOR[head.category] ?? 'cyan',
    interval: formatInterval(head.defaultIntervalMinutes),
    steps,
  };
}

// ── Pre-computed singleton ──────────────────────────────────────────────────

/** All derived pipelines, computed once at module load. */
export const PIPELINES: DerivedPipeline[] = derivePipelines();
