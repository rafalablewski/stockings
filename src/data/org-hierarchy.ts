// ═══════════════════════════════════════════════════════════════════════════
// ORG HIERARCHY — Node/edge definitions for the interactive network graph
// ═══════════════════════════════════════════════════════════════════════════

import type { EngineerTask } from '@/lib/engineers';

// ── Types ──────────────────────────────────────────────────────────────────

export type OrgNodeType = 'boss' | 'division' | 'engineer';

export interface OrgNode {
  id: string;
  type: OrgNodeType;
  label: string;
  badge: string;            // short label rendered inside the node
  role: string;
  description?: string;     // detailed description of responsibilities
  color: string;            // hex color
  parentId: string | null;
  engineerId?: string;      // links to EngineerTask.id for engineer nodes
}

export interface OrgEdge {
  from: string;
  to: string;
  type: 'hierarchy' | 'trigger' | 'dataflow';
  label?: string;
  color?: string;
}

// ── Colors ─────────────────────────────────────────────────────────────────

export const ORG_COLORS = {
  boss:       '#f59e0b',
  claude:     '#22d3ee',
  cursor:     '#a78bfa',
  gemini:     '#34d399',
  maszka: '#f472b6',
  pm:         '#fb923c',
  docReview:  '#f9a8d4',
} as const;

// ── Nodes ──────────────────────────────────────────────────────────────────

export const orgNodes: OrgNode[] = [
  // Root
  {
    id: 'boss',
    type: 'boss',
    label: 'Boss',
    badge: 'BOSS',
    role: 'Chief Executive',
    description: 'Sets strategic direction, approves architectural decisions, resolves cross-division disputes, and gives final go/no-go on all production changes. All divisions report directly to the Boss.',
    color: ORG_COLORS.boss,
    parentId: null,
  },

  // Division leads — each acts as a project manager overseeing their AI engineers
  {
    id: 'div-claude',
    type: 'division',
    label: 'Claude',
    badge: 'ARCH',
    role: 'Architecture & Backend',
    description: 'Manages 7 engineers focused on deep reasoning and complex analysis. Schedules and monitors thesis pressure-testing, capital structure analysis, earnings processing, catalyst evaluation, code security audits, data quality validation, and cross-domain intelligence queries. Reviews engineer outputs and reports findings to the Boss in the Room. Owns backend architecture, API routes, database schema, and infrastructure decisions.',
    color: ORG_COLORS.claude,
    parentId: 'boss',
  },
  {
    id: 'div-cursor',
    type: 'division',
    label: 'Cursor',
    badge: 'ML',
    role: 'ML & AI Systems',
    description: 'Builds and maintains the ML models, AI features, and data pipelines that power the autonomous engineers. Develops the execution engine, prompt templates, and workflow orchestration layer. Reports technical capabilities and pipeline health to the Boss in the Room.',
    color: ORG_COLORS.cursor,
    parentId: 'boss',
  },
  {
    id: 'div-gemini',
    type: 'division',
    label: 'Gemini',
    badge: 'R&D',
    role: 'Research & Data',
    description: 'Manages 6 engineers focused on external data ingestion and analysis. Schedules and monitors SEC filing retrieval from EDGAR, insider activity tracking, press and news monitoring, market sentiment aggregation, regulatory and patent analysis, and disclosure completeness checks. Leverages massive context windows and Google ecosystem access to process long regulatory documents and real-time news feeds. Reports data signals and research findings to the Boss in the Room.',
    color: ORG_COLORS.gemini,
    parentId: 'boss',
  },
  {
    id: 'div-maszka',
    type: 'division',
    label: 'Maszka',
    badge: 'UI',
    role: 'Frontend & UI',
    description: 'Owns all frontend components, styling, client interactivity, and responsive design across the platform. Manages the Performance Engineer (bundle audits, render profiling, caching), the UX/UI Engineer (implements doc-reviewer styling proposals), and the Prompt Remediation Engineer (implements audit-driven fixes to workflow templates). Approves or rejects UX/UI, documentation, and prompt remediation changes via the Decision Dashboard. Reports frontend health and design decisions to the Boss in the Room.',
    color: ORG_COLORS.maszka,
    parentId: 'boss',
  },
  {
    id: 'div-pm',
    type: 'division',
    label: 'Bobman',
    badge: 'PM',
    role: 'ML & AI Project Manager',
    description: 'Manages 1 engineer (Prompt Auditor) focused on prompt-codebase sync and drift detection. Coordinates across all divisions, breaks Boss specifications into actionable task lists, assigns work to the right division, tracks sprint progress, and ensures deadlines are met. Facilitates cross-division communication and flags blockers. Reports project status and timeline updates to the Boss in the Room.',
    color: ORG_COLORS.pm,
    parentId: 'boss',
  },

  // ── Engineers under Claude (7) ──────────────────────────────────────────
  // Deep reasoning, complex analysis, code audits, agentic workflows
  {
    id: 'eng-thesis',
    type: 'engineer',
    label: 'Thesis Engineer',
    badge: 'THE',
    role: 'Senior Research Analyst',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'thesis-engineer',
  },
  {
    id: 'eng-capital',
    type: 'engineer',
    label: 'Capital Structure',
    badge: 'CAP',
    role: 'Capital Markets Analyst',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'capital-engineer',
  },
  {
    id: 'eng-earnings',
    type: 'engineer',
    label: 'Earnings Engineer',
    badge: 'ERN',
    role: 'Earnings & Financials',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'earnings-engineer',
  },
  {
    id: 'eng-catalyst',
    type: 'engineer',
    label: 'Catalyst Tracker',
    badge: 'CAT',
    role: 'Event-Driven Analyst',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'catalyst-engineer',
  },
  {
    id: 'eng-code-security',
    type: 'engineer',
    label: 'Code Security',
    badge: 'CSE',
    role: 'AppSec Analyst',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'code-security-engineer',
  },
  {
    id: 'eng-data-quality',
    type: 'engineer',
    label: 'Data Quality',
    badge: 'DQ',
    role: 'Research Data QA',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'data-quality-engineer',
  },
  {
    id: 'eng-ask-agent',
    type: 'engineer',
    label: 'General Intel',
    badge: 'GEN',
    role: 'Cross-Domain Assistant',
    color: ORG_COLORS.claude,
    parentId: 'div-claude',
    engineerId: 'ask-agent-engineer',
  },

  // ── Engineers under Cursor (0) ──────────────────────────────────────────
  // ML/AI systems — (prompt remediation moved to Maszka)

  // ── Engineers under Gemini (6) ──────────────────────────────────────────
  // Google ecosystem access, massive context, external data analysis
  {
    id: 'eng-filing',
    type: 'engineer',
    label: 'SEC Filing',
    badge: 'SEC',
    role: 'Regulatory Filing Analyst',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'filing-engineer',
  },
  {
    id: 'eng-insider',
    type: 'engineer',
    label: 'Insider Activity',
    badge: 'INS',
    role: 'Governance & Insider',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'insider-engineer',
  },
  {
    id: 'eng-press',
    type: 'engineer',
    label: 'Press Intel',
    badge: 'PRS',
    role: 'Media & PR Analyst',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'press-engineer',
  },
  {
    id: 'eng-sentiment',
    type: 'engineer',
    label: 'Market Sentiment',
    badge: 'SEN',
    role: 'Quant Sentiment',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'sentiment-engineer',
  },
  {
    id: 'eng-regulatory',
    type: 'engineer',
    label: 'Regulatory & IP',
    badge: 'REG',
    role: 'Regulatory & Patent',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'regulatory-engineer',
  },
  {
    id: 'eng-disclosure',
    type: 'engineer',
    label: 'Disclosure & Model',
    badge: 'DIS',
    role: 'Research Integrity',
    color: ORG_COLORS.gemini,
    parentId: 'div-gemini',
    engineerId: 'disclosure-engineer',
  },

  // ── Engineers under Maszka (4) ────────────────────────────────────────
  // Frontend performance, UX/UI implementation, styling, prompt remediation
  {
    id: 'eng-performance',
    type: 'engineer',
    label: 'Performance',
    badge: 'PRF',
    role: 'Platform Performance',
    color: ORG_COLORS.maszka,
    parentId: 'div-maszka',
    engineerId: 'performance-engineer',
  },
  {
    id: 'eng-ux-ui',
    type: 'engineer',
    label: 'UX/UI Engineer',
    badge: 'UXI',
    role: 'UX/UI Implementation',
    color: ORG_COLORS.maszka,
    parentId: 'div-maszka',
    engineerId: 'ux-ui-engineer',
  },
  {
    id: 'eng-prompt-remediation',
    type: 'engineer',
    label: 'Prompt Remediation',
    badge: 'REM',
    role: 'Prompt Template Maintenance',
    color: ORG_COLORS.maszka,
    parentId: 'div-maszka',
    engineerId: 'prompt-remediation-engineer',
  },

  // ── Engineers under Project Mgmt / Bobman (1) ─────────────────────────
  // Prompt-codebase sync auditing, drift detection
  {
    id: 'eng-prompt-auditor',
    type: 'engineer',
    label: 'Prompt Auditor',
    badge: 'PRA',
    role: 'Prompt-to-Codebase Sync',
    color: ORG_COLORS.pm,
    parentId: 'div-pm',
    engineerId: 'prompt-auditor',
  },
  {
    id: 'eng-doc-reviewer',
    type: 'engineer',
    label: 'Doc Reviewer',
    badge: 'DOC',
    role: 'Documentation & Style Guide Reviewer',
    color: ORG_COLORS.docReview,
    parentId: 'div-pm',
    engineerId: 'doc-reviewer-engineer',
  },
];

// ── Hierarchy edges (auto-computed from parentId) ──────────────────────────

export function computeHierarchyEdges(): OrgEdge[] {
  return orgNodes
    .filter(n => n.parentId !== null)
    .map(n => ({
      from: n.parentId!,
      to: n.id,
      type: 'hierarchy' as const,
    }));
}

// ── Trigger edges (computed from engineer triggerEvents) ────────────────────

export function computeTriggerEdges(engineers: EngineerTask[]): OrgEdge[] {
  const edges: OrgEdge[] = [];
  const engineerNodeMap = new Map<string, OrgNode>();
  for (const node of orgNodes) {
    if (node.engineerId) engineerNodeMap.set(node.engineerId, node);
  }

  // Build event → org node IDs map
  const eventMap = new Map<string, string[]>();
  for (const eng of engineers) {
    const node = engineerNodeMap.get(eng.id);
    if (!node) continue;
    for (const event of eng.triggerEvents) {
      if (!eventMap.has(event)) eventMap.set(event, []);
      eventMap.get(event)!.push(node.id);
    }
  }

  // Create edges between engineers sharing a trigger (cross-division only)
  const seen = new Set<string>();
  for (const [event, nodeIds] of eventMap) {
    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        const a = nodeIds[i], b = nodeIds[j];
        const nodeA = orgNodes.find(n => n.id === a);
        const nodeB = orgNodes.find(n => n.id === b);
        // Only show cross-division trigger connections
        if (nodeA?.parentId === nodeB?.parentId) continue;
        const key = [a, b].sort().join('::');
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          from: a,
          to: b,
          type: 'trigger',
          label: event.replace(/-/g, ' '),
          color: 'rgba(251, 191, 36, 0.4)',
        });
      }
    }
  }

  return edges;
}

// ── Data flow edges ──────────────────────────────────────────────────────────
// Gemini ingests external data → Claude reasons over it → Maszka handles frontend
// Prompt Auditor findings → Remediation Engineer (under Cursor/ML) + Bobman (report)
// Doc Reviewer → UX/UI Engineer (under Maszka/UI) → Maszka approves

export const dataFlowEdges: OrgEdge[] = [
  { from: 'div-gemini', to: 'div-claude', type: 'dataflow', label: 'filings & signals', color: 'rgba(52, 211, 153, 0.5)' },
  { from: 'div-claude', to: 'div-maszka', type: 'dataflow', label: 'data updated', color: 'rgba(34, 211, 238, 0.5)' },
  { from: 'eng-prompt-auditor', to: 'eng-prompt-remediation', type: 'dataflow', label: 'audit → remediate', color: 'rgba(167, 139, 250, 0.6)' },
  { from: 'eng-prompt-auditor', to: 'div-pm', type: 'dataflow', label: 'audit report', color: 'rgba(251, 146, 60, 0.5)' },
  { from: 'eng-doc-reviewer', to: 'eng-ux-ui', type: 'dataflow', label: 'doc audit → implement', color: 'rgba(249, 168, 212, 0.5)' },
  { from: 'eng-ux-ui', to: 'div-maszka', type: 'dataflow', label: 'code changes → approve/reject', color: 'rgba(244, 114, 182, 0.6)' },
];

// ── Layout computation ─────────────────────────────────────────────────────

export interface NodePosition {
  id: string;
  x: number;
  y: number;
}

const CANVAS_W = 1400;
const ROW_Y = { boss: 60, division: 220, engineer: 420 };

export function computeLayout(): NodePosition[] {
  const positions: NodePosition[] = [];
  const cx = CANVAS_W / 2;

  // Row 0: Boss
  positions.push({ id: 'boss', x: cx, y: ROW_Y.boss });

  // Row 1: Division leads — evenly spaced
  const divNodes = orgNodes.filter(n => n.type === 'division');
  const divSpacing = CANVAS_W / (divNodes.length + 1);
  divNodes.forEach((n, i) => {
    positions.push({ id: n.id, x: divSpacing * (i + 1), y: ROW_Y.division });
  });

  // Row 2: Engineers — grouped under their division
  for (const div of divNodes) {
    const divPos = positions.find(p => p.id === div.id)!;
    const children = orgNodes.filter(n => n.parentId === div.id && n.type === 'engineer');
    if (children.length === 0) continue;

    const engSpacing = Math.min(110, 500 / Math.max(children.length, 1));
    const totalWidth = (children.length - 1) * engSpacing;
    children.forEach((n, i) => {
      positions.push({
        id: n.id,
        x: divPos.x - totalWidth / 2 + i * engSpacing,
        y: ROW_Y.engineer + (i % 2 === 0 ? 0 : 30), // stagger for readability
      });
    });
  }

  return positions;
}
