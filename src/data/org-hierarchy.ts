// ═══════════════════════════════════════════════════════════════════════════
// ORG HIERARCHY — Node/edge definitions for the interactive network graph
// ═══════════════════════════════════════════════════════════════════════════

import type { EngineerTask } from '@/lib/engineers';

// ── Types ──────────────────────────────────────────────────────────────────

export type OrgNodeType = 'boss' | 'division' | 'pm' | 'engineer';

export interface OrgNode {
  id: string;
  type: OrgNodeType;
  label: string;
  badge: string;            // short label rendered inside the node
  role: string;
  color: string;            // hex color
  parentId: string | null;
  engineerId?: string;      // links to EngineerTask.id for engineer nodes
  managedEngineers?: string[]; // engineer IDs managed by this PM
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
  aiEngineer: '#f472b6',
  pm:         '#fb923c',
  // Engineer categories
  research:     '#34d399', // mint
  monitoring:   '#38bdf8', // sky
  intelligence: '#fbbf24', // gold
  audit:        '#a78bfa', // violet
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
    color: ORG_COLORS.boss,
    parentId: null,
  },

  // Division leads
  {
    id: 'div-claude',
    type: 'division',
    label: 'Claude',
    badge: 'ARCH',
    role: 'Architecture & Backend',
    color: ORG_COLORS.claude,
    parentId: 'boss',
  },
  {
    id: 'div-cursor',
    type: 'division',
    label: 'Cursor',
    badge: 'UI',
    role: 'Frontend & UI',
    color: ORG_COLORS.cursor,
    parentId: 'boss',
  },
  {
    id: 'div-gemini',
    type: 'division',
    label: 'Gemini',
    badge: 'R&D',
    role: 'Research & Data',
    color: ORG_COLORS.gemini,
    parentId: 'boss',
  },
  {
    id: 'div-ai-engineer',
    type: 'division',
    label: 'AI Engineer',
    badge: 'ML',
    role: 'ML & AI Systems',
    color: ORG_COLORS.aiEngineer,
    parentId: 'boss',
  },
  {
    id: 'div-pm',
    type: 'division',
    label: 'Project Mgmt',
    badge: 'PM',
    role: 'Planning & Coordination',
    color: ORG_COLORS.pm,
    parentId: 'boss',
  },

  // Project Managers (under PM division)
  {
    id: 'pm-research',
    type: 'pm',
    label: 'Research & Thesis PM',
    badge: 'PM1',
    role: 'Research Pipeline',
    color: ORG_COLORS.research,
    parentId: 'div-pm',
    managedEngineers: ['thesis-engineer', 'capital-engineer', 'earnings-engineer'],
  },
  {
    id: 'pm-monitoring',
    type: 'pm',
    label: 'Monitoring & Intel PM',
    badge: 'PM2',
    role: 'Data Ingestion & Signals',
    color: ORG_COLORS.intelligence,
    parentId: 'div-pm',
    managedEngineers: [
      'filing-engineer', 'press-engineer', 'insider-engineer',
      'catalyst-engineer', 'sentiment-engineer', 'regulatory-engineer',
      'ask-agent-engineer',
    ],
  },
  {
    id: 'pm-audit',
    type: 'pm',
    label: 'Platform Audit PM',
    badge: 'PM3',
    role: 'Quality & Security',
    color: ORG_COLORS.audit,
    parentId: 'div-pm',
    managedEngineers: [
      'data-quality-engineer', 'code-security-engineer',
      'performance-engineer', 'disclosure-engineer',
    ],
  },

  // Engineers — Research (under PM1)
  {
    id: 'eng-thesis',
    type: 'engineer',
    label: 'Thesis Engineer',
    badge: 'THE',
    role: 'Senior Research Analyst',
    color: ORG_COLORS.research,
    parentId: 'pm-research',
    engineerId: 'thesis-engineer',
  },
  {
    id: 'eng-capital',
    type: 'engineer',
    label: 'Capital Structure',
    badge: 'CAP',
    role: 'Capital Markets Analyst',
    color: ORG_COLORS.research,
    parentId: 'pm-research',
    engineerId: 'capital-engineer',
  },
  {
    id: 'eng-earnings',
    type: 'engineer',
    label: 'Earnings Engineer',
    badge: 'ERN',
    role: 'Earnings & Financials',
    color: ORG_COLORS.research,
    parentId: 'pm-research',
    engineerId: 'earnings-engineer',
  },

  // Engineers — Monitoring & Intelligence (under PM2)
  {
    id: 'eng-filing',
    type: 'engineer',
    label: 'SEC Filing',
    badge: 'SEC',
    role: 'Regulatory Filing Analyst',
    color: ORG_COLORS.monitoring,
    parentId: 'pm-monitoring',
    engineerId: 'filing-engineer',
  },
  {
    id: 'eng-press',
    type: 'engineer',
    label: 'Press Intel',
    badge: 'PRS',
    role: 'Media & PR Analyst',
    color: ORG_COLORS.intelligence,
    parentId: 'pm-monitoring',
    engineerId: 'press-engineer',
  },
  {
    id: 'eng-insider',
    type: 'engineer',
    label: 'Insider Activity',
    badge: 'INS',
    role: 'Governance & Insider',
    color: ORG_COLORS.monitoring,
    parentId: 'pm-monitoring',
    engineerId: 'insider-engineer',
  },
  {
    id: 'eng-catalyst',
    type: 'engineer',
    label: 'Catalyst Tracker',
    badge: 'CAT',
    role: 'Event-Driven Analyst',
    color: ORG_COLORS.intelligence,
    parentId: 'pm-monitoring',
    engineerId: 'catalyst-engineer',
  },
  {
    id: 'eng-sentiment',
    type: 'engineer',
    label: 'Market Sentiment',
    badge: 'SEN',
    role: 'Quant Sentiment',
    color: ORG_COLORS.intelligence,
    parentId: 'pm-monitoring',
    engineerId: 'sentiment-engineer',
  },
  {
    id: 'eng-regulatory',
    type: 'engineer',
    label: 'Regulatory & IP',
    badge: 'REG',
    role: 'Regulatory & Patent',
    color: ORG_COLORS.intelligence,
    parentId: 'pm-monitoring',
    engineerId: 'regulatory-engineer',
  },
  {
    id: 'eng-ask-agent',
    type: 'engineer',
    label: 'General Intel',
    badge: 'GEN',
    role: 'Cross-Domain Assistant',
    color: ORG_COLORS.intelligence,
    parentId: 'pm-monitoring',
    engineerId: 'ask-agent-engineer',
  },

  // Engineers — Audit (under PM3)
  {
    id: 'eng-data-quality',
    type: 'engineer',
    label: 'Data Quality',
    badge: 'DQ',
    role: 'Research Data QA',
    color: ORG_COLORS.audit,
    parentId: 'pm-audit',
    engineerId: 'data-quality-engineer',
  },
  {
    id: 'eng-code-security',
    type: 'engineer',
    label: 'Code Security',
    badge: 'SEC',
    role: 'AppSec Analyst',
    color: ORG_COLORS.audit,
    parentId: 'pm-audit',
    engineerId: 'code-security-engineer',
  },
  {
    id: 'eng-performance',
    type: 'engineer',
    label: 'Performance',
    badge: 'PRF',
    role: 'Platform Performance',
    color: ORG_COLORS.audit,
    parentId: 'pm-audit',
    engineerId: 'performance-engineer',
  },
  {
    id: 'eng-disclosure',
    type: 'engineer',
    label: 'Disclosure & Model',
    badge: 'DIS',
    role: 'Research Integrity',
    color: ORG_COLORS.audit,
    parentId: 'pm-audit',
    engineerId: 'disclosure-engineer',
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

  // Create edges between all engineers sharing a trigger (cross-PM only)
  const seen = new Set<string>();
  for (const [event, nodeIds] of eventMap) {
    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        const a = nodeIds[i], b = nodeIds[j];
        const nodeA = orgNodes.find(n => n.id === a);
        const nodeB = orgNodes.find(n => n.id === b);
        // Only show cross-PM trigger connections
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

// ── Data flow edges (PM2 → PM1 → PM3) ─────────────────────────────────────

export const dataFlowEdges: OrgEdge[] = [
  { from: 'pm-monitoring', to: 'pm-research', type: 'dataflow', label: 'events', color: 'rgba(56, 189, 248, 0.5)' },
  { from: 'pm-research', to: 'pm-audit', type: 'dataflow', label: 'data updated', color: 'rgba(167, 139, 250, 0.5)' },
];

// ── Layout computation ─────────────────────────────────────────────────────

export interface NodePosition {
  id: string;
  x: number;
  y: number;
}

const CANVAS_W = 1400;
const ROW_Y = { boss: 60, division: 220, pm: 380, engineer: 560 };

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

  // Row 2: PM nodes — spread under PM division
  const pmDiv = positions.find(p => p.id === 'div-pm')!;
  const pmNodes = orgNodes.filter(n => n.type === 'pm');
  const pmSpread = 320;
  pmNodes.forEach((n, i) => {
    const offset = (i - (pmNodes.length - 1) / 2) * pmSpread;
    positions.push({ id: n.id, x: pmDiv.x + offset, y: ROW_Y.pm });
  });

  // Row 3: Engineers — grouped under their PM
  for (const pm of pmNodes) {
    const pmPos = positions.find(p => p.id === pm.id)!;
    const children = orgNodes.filter(n => n.parentId === pm.id);
    const engSpacing = Math.min(120, 600 / Math.max(children.length, 1));
    const totalWidth = (children.length - 1) * engSpacing;
    children.forEach((n, i) => {
      positions.push({
        id: n.id,
        x: pmPos.x - totalWidth / 2 + i * engSpacing,
        y: ROW_Y.engineer + (i % 2 === 0 ? 0 : 30), // stagger for readability
      });
    });
  }

  return positions;
}
