'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import type { EngineerTask } from '@/lib/engineers';
import type { Workflow } from '@/data/workflows';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ScheduleState {
  enabled: boolean;
  intervalMinutes: number;
  lastRunAt: string | null;
  nextRunAt: string | null;
}

interface LastRunState {
  id: number;
  status: string;
  triggerType: string;
  outputSummary: string | null;
  durationMs: number | null;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
}

interface EngineerStatus {
  engineer: EngineerTask;
  schedule: ScheduleState | null;
  lastRun: LastRunState | null;
}

interface HistoryEntry {
  id: number;
  ticker: string;
  engineerId: string;
  status: string;
  triggerType: string;
  triggerReason: string | null;
  outputSummary: string | null;
  durationMs: number | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

interface Props {
  engineers: EngineerTask[];
  workflows: Workflow[];
  tickers: string[];
}

// ── Graph types ───────────────────────────────────────────────────────────────

interface GraphNode {
  id: string;
  name: string;
  type: 'engineer' | 'workflow' | 'event' | 'datasource';
  color: string;
  subtitle?: string;
}

interface GraphEdge {
  from: string;
  to: string;
  type: 'executes' | 'triggers' | 'provides-data' | 'shared-trigger';
  label?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(ms: number | null): string {
  if (!ms) return '\u2014';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function formatTime(iso: string | null): string {
  if (!iso) return '\u2014';
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  if (diffMs < 60_000) return 'just now';
  if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
  if (diffMs < 86_400_000) return `${Math.floor(diffMs / 3_600_000)}h ago`;
  return d.toLocaleDateString();
}

function formatInterval(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(0)}h`;
  return `${(minutes / 1440).toFixed(0)}d`;
}

const categoryColors: Record<string, string> = {
  research: 'mint',
  monitoring: 'sky',
  intelligence: 'gold',
  audit: 'violet',
};

const categoryLabels: Record<string, string> = {
  research: 'Research Engineers',
  monitoring: 'Monitoring Engineers',
  intelligence: 'Intelligence Engineers',
  audit: 'Audit Engineers',
};

function edgeTypeLabel(type: string) {
  switch (type) {
    case 'executes':       return 'executes';
    case 'triggers':       return 'triggers';
    case 'provides-data':  return 'provides data';
    case 'shared-trigger': return 'shared trigger';
    default:               return type;
  }
}

// ── Build graph from engineers + workflows ────────────────────────────────────

function buildGraph(engineers: EngineerTask[], workflows: Workflow[]) {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const workflowSet = new Set<string>();
  const eventSet = new Set<string>();
  const datasourceSet = new Set<string>();

  // Add engineer nodes
  for (const eng of engineers) {
    nodes.push({
      id: eng.id,
      name: eng.name,
      type: 'engineer',
      color: categoryColors[eng.category] || 'cyan',
      subtitle: eng.role,
    });

    // Add workflow nodes + edges
    for (const wfId of eng.workflowIds) {
      if (!workflowSet.has(wfId)) {
        workflowSet.add(wfId);
        const wf = workflows.find(w => w.id === wfId);
        nodes.push({
          id: `wf-${wfId}`,
          name: wf?.name || wfId,
          type: 'workflow',
          color: 'gold',
          subtitle: wf?.requiresUserData ? 'requires input' : 'autonomous',
        });
      }
      edges.push({ from: eng.id, to: `wf-${wfId}`, type: 'executes' });
    }

    // Add trigger event nodes + edges
    for (const event of eng.triggerEvents) {
      if (!eventSet.has(event)) {
        eventSet.add(event);
        nodes.push({
          id: `ev-${event}`,
          name: event.replace(/-/g, ' '),
          type: 'event',
          color: 'cyan',
        });
      }
      edges.push({ from: `ev-${event}`, to: eng.id, type: 'triggers' });
    }

    // Add data source nodes + edges
    if (eng.requiresData && eng.dataSource) {
      const dsId = `ds-${eng.dataSource.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
      if (!datasourceSet.has(dsId)) {
        datasourceSet.add(dsId);
        nodes.push({
          id: dsId,
          name: eng.dataSource,
          type: 'datasource',
          color: 'sky',
        });
      }
      edges.push({ from: dsId, to: eng.id, type: 'provides-data' });
    }
  }

  // Find shared trigger connections (engineers that share events)
  for (const event of eventSet) {
    const triggered = engineers.filter(e => e.triggerEvents.includes(event));
    if (triggered.length > 1) {
      for (let i = 0; i < triggered.length - 1; i++) {
        edges.push({
          from: triggered[i].id,
          to: triggered[i + 1].id,
          type: 'shared-trigger',
          label: event.replace(/-/g, ' '),
        });
      }
    }
  }

  return { nodes, edges };
}

// ── SVG Connection Lines ──────────────────────────────────────────────────────

interface NodeRect { id: string; cx: number; cy: number; }

function ConnectionLines({ nodeRects, selected, edges }: { nodeRects: NodeRect[]; selected: string | null; edges: GraphEdge[] }) {
  if (nodeRects.length === 0) return null;

  const relevantEdges = selected
    ? edges.filter((e) => e.from === selected || e.to === selected)
    : edges;

  return (
    <svg className="eng-graph-svg">
      <defs>
        <filter id="eng-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {relevantEdges.map((edge, i) => {
        const fromNode = nodeRects.find((n) => n.id === edge.from);
        const toNode = nodeRects.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return null;

        const midX = (fromNode.cx + toNode.cx) / 2;
        const midY = (fromNode.cy + toNode.cy) / 2;
        const offsetY = Math.abs(fromNode.cx - toNode.cx) > 100 ? -30 : 0;

        return (
          <g key={i}>
            <path
              d={`M ${fromNode.cx} ${fromNode.cy} Q ${midX} ${midY + offsetY} ${toNode.cx} ${toNode.cy}`}
              className="eng-graph-line"
              data-type={edge.type}
              filter={selected ? 'url(#eng-glow)' : undefined}
              style={{ opacity: selected ? 0.8 : 0.4 }}
            />
            <circle className="eng-graph-flow-dot" data-type={edge.type}>
              <animateMotion
                dur={`${3 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M ${fromNode.cx} ${fromNode.cy} Q ${midX} ${midY + offsetY} ${toNode.cx} ${toNode.cy}`}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// ── Node Icon ─────────────────────────────────────────────────────────────────

function nodeIcon(type: string) {
  switch (type) {
    case 'engineer':   return '\u2B22'; // hexagon
    case 'workflow':   return '\u2726'; // star
    case 'event':      return '\u26A1'; // lightning
    case 'datasource': return '\u2B21'; // pentagon
    default:           return '\u25CF';
  }
}

// ── Detail Panel ──────────────────────────────────────────────────────────────

function EngineerDetailPanel({
  engineer,
  workflows,
  allEngineers,
  edges,
  onClose,
}: {
  engineer: EngineerTask;
  workflows: Workflow[];
  allEngineers: EngineerTask[];
  edges: GraphEdge[];
  onClose: () => void;
}) {
  const linkedWorkflows = workflows.filter(w => engineer.workflowIds.includes(w.id));
  const relatedEdges = edges.filter(e => e.from === engineer.id || e.to === engineer.id);
  const color = categoryColors[engineer.category] || 'cyan';

  return (
    <div className="eng-detail" data-color={color}>
      <div className="eng-detail-header">
        <div className="eng-detail-title-group">
          <div className="eng-detail-icon" data-color={color}>{'\u2B22'}</div>
          <div>
            <h2 className="eng-detail-name">{engineer.name}</h2>
            <div className="eng-detail-role">{engineer.role}</div>
          </div>
        </div>
        <button className="eng-detail-close" onClick={onClose}>{'\u2715'}</button>
      </div>

      <p className="eng-detail-desc">{engineer.description}</p>

      <div className="eng-metrics-row">
        <div className="eng-metric">
          <span className="eng-metric-value">{formatInterval(engineer.defaultIntervalMinutes)}</span>
          <span className="eng-metric-label">Interval</span>
        </div>
        <div className="eng-metric">
          <span className="eng-metric-value">{engineer.workflowIds.length}</span>
          <span className="eng-metric-label">Workflows</span>
        </div>
        <div className="eng-metric">
          <span className="eng-metric-value">{engineer.triggerEvents.length}</span>
          <span className="eng-metric-label">Triggers</span>
        </div>
        <div className="eng-metric">
          <span className="eng-metric-value">{engineer.capabilities.length}</span>
          <span className="eng-metric-label">Capabilities</span>
        </div>
      </div>

      <div className="eng-detail-grid">
        {/* Capabilities */}
        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Capabilities</div>
          {engineer.capabilities.map((cap, i) => (
            <div key={i} className="eng-cap-item">
              <span className="eng-cap-bullet">+</span>
              {cap}
            </div>
          ))}
        </div>

        {/* Linked Workflows */}
        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Prompt Database Workflows</div>
          <div className="eng-prompt-tags">
            {linkedWorkflows.map(wf => (
              <span key={wf.id} className="eng-prompt-tag" data-color={color}>{wf.name}</span>
            ))}
            {engineer.workflowIds.filter(id => !linkedWorkflows.some(w => w.id === id)).map(id => (
              <span key={id} className="eng-prompt-tag">{id}</span>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Configuration</div>
          <div className="eng-config-row">
            <span className="eng-config-key">Schedule</span>
            <span className="eng-config-val">Every {formatInterval(engineer.defaultIntervalMinutes)}</span>
          </div>
          <div className="eng-config-row">
            <span className="eng-config-key">Category</span>
            <span className="eng-config-val">{engineer.category}</span>
          </div>
          <div className="eng-config-row">
            <span className="eng-config-key">External data</span>
            <span className="eng-config-val">{engineer.requiresData ? 'Yes' : 'No'}</span>
          </div>
          {engineer.dataSource && (
            <div className="eng-config-row">
              <span className="eng-config-key">Data source</span>
              <span className="eng-config-val">{engineer.dataSource}</span>
            </div>
          )}
          <div className="eng-config-row">
            <span className="eng-config-key">Triggers</span>
            <span className="eng-config-val">{engineer.triggerEvents.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Connection table */}
      {relatedEdges.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="eng-detail-section-title">Connections</div>
          <table className="eng-matrix-table" style={{ fontSize: 11, marginTop: 8 }}>
            <thead>
              <tr>
                <th>Direction</th>
                <th>Type</th>
                <th>Target</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              {relatedEdges.map((edge, i) => {
                const isFrom = edge.from === engineer.id;
                const targetId = isFrom ? edge.to : edge.from;
                // Resolve name
                let targetName = targetId;
                if (targetId.startsWith('wf-')) {
                  const wf = workflows.find(w => w.id === targetId.slice(3));
                  targetName = wf?.name || targetId.slice(3);
                } else if (targetId.startsWith('ev-')) {
                  targetName = targetId.slice(3).replace(/-/g, ' ');
                } else if (targetId.startsWith('ds-')) {
                  const eng = allEngineers.find(e => e.id === targetId);
                  targetName = eng?.name || targetId;
                } else {
                  const eng = allEngineers.find(e => e.id === targetId);
                  targetName = eng?.name || targetId;
                }

                return (
                  <tr key={i}>
                    <td style={{
                      color: isFrom ? 'rgba(126,231,135,0.6)' : 'rgba(121,192,255,0.6)',
                      fontWeight: 600, fontSize: 10, fontFamily: "'Space Mono', monospace",
                    }}>
                      {isFrom ? 'OUT \u2192' : '\u2190 IN'}
                    </td>
                    <td>
                      <span className="eng-conn-dot" data-type={edge.type} />
                      <span className="eng-conn-type">{edgeTypeLabel(edge.type)}</span>
                    </td>
                    <td className="eng-conn-to">{targetName}</td>
                    <td className="eng-conn-label">{edge.label ?? '\u2014'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function EngineersDashboard({ engineers, workflows, tickers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0] || 'ASTS');
  const [statuses, setStatuses] = useState<EngineerStatus[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningIds, setRunningIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'network' | 'operations' | 'history'>('network');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodeRects, setNodeRects] = useState<NodeRect[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Build the graph from engineers + workflows
  const { nodes: graphNodes, edges: graphEdges } = useMemo(
    () => buildGraph(engineers, workflows),
    [engineers, workflows]
  );

  const selectedEngineer = selectedNode
    ? engineers.find(e => e.id === selectedNode) ?? null
    : null;

  // Measure node positions for SVG lines
  const measureNodes = useCallback(() => {
    if (!graphRef.current) return;
    const containerRect = graphRef.current.getBoundingClientRect();
    const rects: NodeRect[] = [];
    nodeRefs.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      rects.push({
        id,
        cx: r.left - containerRect.left + r.width / 2,
        cy: r.top - containerRect.top + r.height / 2,
      });
    });
    setNodeRects(rects);
  }, []);

  useEffect(() => {
    if (activeTab === 'network') {
      const t = setTimeout(measureNodes, 100);
      window.addEventListener('resize', measureNodes);
      return () => { clearTimeout(t); window.removeEventListener('resize', measureNodes); };
    }
  }, [activeTab, measureNodes]);

  useEffect(() => {
    if (activeTab === 'network') {
      const t = setTimeout(measureNodes, 50);
      return () => clearTimeout(t);
    }
  }, [selectedNode, activeTab, measureNodes]);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await authFetch(`/api/engineers/status?ticker=${selectedTicker}`);
      if (res.ok) {
        const data = await res.json();
        setStatuses(data.engineers || []);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }, [selectedTicker]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await authFetch(`/api/engineers/history?ticker=${selectedTicker}&limit=25`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.runs || []);
      }
    } catch { /* silent */ }
  }, [selectedTicker]);

  useEffect(() => {
    setLoading(true);
    fetchStatus();
    fetchHistory();
  }, [fetchStatus, fetchHistory]);

  const handleRun = async (engineerId: string) => {
    setRunningIds(prev => { const next = new Set(prev); next.add(engineerId); return next; });
    try {
      await authFetch('/api/engineers/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, engineerId }),
      });
      await fetchStatus();
      await fetchHistory();
    } catch (err) {
      console.error('Run error:', err);
    } finally {
      setRunningIds(prev => { const next = new Set(prev); next.delete(engineerId); return next; });
    }
  };

  const handleToggleSchedule = async (engineerId: string, currentEnabled: boolean, intervalMinutes: number) => {
    try {
      await authFetch('/api/engineers/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, engineerId, enabled: !currentEnabled, intervalMinutes }),
      });
      await fetchStatus();
    } catch (err) { console.error('Schedule toggle error:', err); }
  };

  const handleEnableSchedule = async (engineer: EngineerTask) => {
    try {
      await authFetch('/api/engineers/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, engineerId: engineer.id, enabled: true, intervalMinutes: engineer.defaultIntervalMinutes }),
      });
      await fetchStatus();
    } catch (err) { console.error('Enable schedule error:', err); }
  };

  // Group engineers by category
  const grouped = engineers.reduce<Record<string, EngineerTask[]>>((acc, eng) => {
    if (!acc[eng.category]) acc[eng.category] = [];
    acc[eng.category].push(eng);
    return acc;
  }, {});

  // Stats
  const scheduledCount = statuses.filter(s => s.schedule?.enabled).length;
  const completedCount = history.filter(r => r.status === 'completed').length;
  const failedCount = history.filter(r => r.status === 'failed').length;
  const uniqueWorkflows = new Set(engineers.flatMap(e => e.workflowIds)).size;

  return (
    <div className="eng-app">
      {/* Header */}
      <div className="eng-header">
        <div className="eng-subtitle">Autonomous Operations</div>
        <div className="eng-title">Engineers Dashboard</div>
        <div className="eng-desc">
          Command center for AI engineers — network topology showing how agents
          connect to prompt database workflows, trigger events, and data sources.
        </div>

        {/* KPI Bar */}
        <div className="eng-kpi-bar">
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="cyan">{engineers.length}</div>
            <div className="eng-kpi-bar-label">Engineers</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{uniqueWorkflows}</div>
            <div className="eng-kpi-bar-label">Workflows</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{graphEdges.length}</div>
            <div className="eng-kpi-bar-label">Connections</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{scheduledCount}</div>
            <div className="eng-kpi-bar-label">Scheduled</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="sky">{completedCount}</div>
            <div className="eng-kpi-bar-label">Completed</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="coral">{failedCount}</div>
            <div className="eng-kpi-bar-label">Failed</div>
          </div>
        </div>

        {/* Ticker pills */}
        <div className="eng-ticker-strip">
          <span className="eng-ticker-label">Ticker</span>
          {tickers.map(t => (
            <button key={t} className="eng-ticker-pill" data-active={selectedTicker === t} onClick={() => setSelectedTicker(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab strip */}
        <div className="eng-tab-strip">
          <button className="eng-tab" data-active={activeTab === 'network'} onClick={() => setActiveTab('network')}>
            Network Graph<span className="eng-tab-count">{graphNodes.length}</span>
          </button>
          <button className="eng-tab" data-active={activeTab === 'operations'} onClick={() => setActiveTab('operations')}>
            Operations<span className="eng-tab-count">{engineers.length}</span>
          </button>
          <button className="eng-tab" data-active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            Run History<span className="eng-tab-count">{history.length}</span>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="eng-feed">

        {/* ══ NETWORK GRAPH TAB ══ */}
        {activeTab === 'network' && (
          <div>
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="cyan" />
              <span className="eng-section-label">Engineer Network</span>
              <div className="eng-section-line" />
            </div>

            <div className="eng-graph-container" ref={graphRef}>
              <ConnectionLines nodeRects={nodeRects} selected={selectedNode} edges={graphEdges} />
              <div className="eng-graph-nodes">
                {graphNodes.map((node) => (
                  <div
                    key={node.id}
                    ref={(el) => { if (el) nodeRefs.current.set(node.id, el); }}
                    className="eng-node"
                    data-color={node.color}
                    data-selected={selectedNode === node.id ? 'true' : undefined}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    <span className="eng-node-pulse" data-status={node.type === 'engineer' ? 'active' : 'standby'} />
                    <div className="eng-node-header">
                      <div className="eng-node-icon" data-color={node.color}>
                        {nodeIcon(node.type)}
                      </div>
                      <div>
                        <div className="eng-node-name">{node.name}</div>
                        {node.subtitle && <div className="eng-node-role">{node.subtitle}</div>}
                      </div>
                    </div>
                    <div className="eng-node-meta">
                      <span className="eng-node-badge" data-variant={node.type === 'engineer' ? 'active' : 'standby'}>
                        {node.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="eng-legend">
              {([
                ['executes', 'Executes Workflow'],
                ['triggers', 'Triggers Engineer'],
                ['provides-data', 'Provides Data'],
                ['shared-trigger', 'Shared Trigger'],
              ] as const).map(([type, label]) => (
                <div key={type} className="eng-legend-item">
                  <span className="eng-legend-line" data-type={type} />
                  {label}
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            {selectedEngineer && (
              <EngineerDetailPanel
                engineer={selectedEngineer}
                workflows={workflows}
                allEngineers={engineers}
                edges={graphEdges}
                onClose={() => setSelectedNode(null)}
              />
            )}

            {/* Connection Matrix */}
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="violet" />
              <span className="eng-section-label">Connection Matrix</span>
              <div className="eng-section-line" />
            </div>

            <div className="eng-matrix">
              <table className="eng-matrix-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Type</th>
                    <th>To</th>
                    <th>Label</th>
                  </tr>
                </thead>
                <tbody>
                  {graphEdges.map((edge, i) => {
                    const fromNode = graphNodes.find(n => n.id === edge.from);
                    const toNode = graphNodes.find(n => n.id === edge.to);
                    return (
                      <tr key={i}>
                        <td className="eng-conn-from">{fromNode?.name || edge.from}</td>
                        <td>
                          <span className="eng-conn-dot" data-type={edge.type} />
                          <span className="eng-conn-type">{edgeTypeLabel(edge.type)}</span>
                        </td>
                        <td className="eng-conn-to">{toNode?.name || edge.to}</td>
                        <td className="eng-conn-label">{edge.label ?? '\u2014'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ OPERATIONS TAB ══ */}
        {activeTab === 'operations' && (
          <div>
            {Object.entries(grouped).map(([category, engs]) => (
              <div key={category}>
                <div className="eng-category-header">
                  <span className="eng-category-label" data-color={category}>
                    {categoryLabels[category] || category}
                  </span>
                  <div className="eng-category-line" />
                </div>

                {engs.map(eng => {
                  const status = statuses.find(s => s.engineer.id === eng.id);
                  const isRunning = runningIds.has(eng.id);
                  const isExpanded = expandedId === eng.id;
                  const dotStatus = isRunning || status?.lastRun?.status === 'running'
                    ? 'running'
                    : status?.schedule?.enabled ? 'active' : 'idle';

                  return (
                    <div key={eng.id} className="eng-card" data-expanded={isExpanded}>
                      <div className="eng-card-inner">
                        <div className="eng-status-dot" data-status={dotStatus} />
                        <div className="eng-card-body">
                          <div className="eng-card-name-row">
                            <span className="eng-card-name">{eng.name}</span>
                            <span className="eng-card-role">{eng.role}</span>
                          </div>
                          <div className="eng-card-desc">{eng.description}</div>
                          <div className="eng-card-meta">
                            <span className="eng-card-meta-item">
                              {status?.schedule
                                ? status.schedule.enabled
                                  ? `Every ${formatInterval(status.schedule.intervalMinutes)}`
                                  : 'Paused'
                                : 'Not scheduled'}
                            </span>
                            {status?.schedule?.nextRunAt && status.schedule.enabled && (
                              <span className="eng-card-meta-item">
                                Next {formatTime(status.schedule.nextRunAt)}
                              </span>
                            )}
                            {status?.lastRun && (
                              <span className="eng-card-meta-item">
                                Last: {status.lastRun.status} {formatTime(status.lastRun.completedAt)} ({formatDuration(status.lastRun.durationMs)})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="eng-card-actions">
                          {status?.schedule ? (
                            <button
                              className="eng-btn"
                              data-variant={status.schedule.enabled ? 'active' : 'paused'}
                              onClick={() => handleToggleSchedule(eng.id, status.schedule!.enabled, status.schedule!.intervalMinutes)}
                            >
                              {status.schedule.enabled ? 'Active' : 'Paused'}
                            </button>
                          ) : (
                            <button className="eng-btn" onClick={() => handleEnableSchedule(eng)}>
                              Schedule
                            </button>
                          )}
                          <button
                            className="eng-btn"
                            data-variant="run"
                            data-state={isRunning ? 'running' : undefined}
                            onClick={() => handleRun(eng.id)}
                            disabled={isRunning}
                          >
                            {isRunning ? 'Running...' : 'Run Now'}
                          </button>
                          <button className="eng-chevron" onClick={() => setExpandedId(isExpanded ? null : eng.id)}>
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                              style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="eng-expand">
                          <div className="eng-expand-grid">
                            <div>
                              <div className="eng-expand-label">Capabilities</div>
                              {eng.capabilities.map((cap, i) => (
                                <div key={i} className="eng-cap-item">
                                  <span className="eng-cap-bullet">+</span>
                                  {cap}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="eng-expand-label">Configuration</div>
                              <div className="eng-config-row">
                                <span className="eng-config-key">Default interval</span>
                                <span className="eng-config-val">{formatInterval(eng.defaultIntervalMinutes)}</span>
                              </div>
                              <div className="eng-config-row">
                                <span className="eng-config-key">Linked workflows</span>
                                <span className="eng-config-val">{eng.workflowIds.length}</span>
                              </div>
                              <div className="eng-config-row">
                                <span className="eng-config-key">Requires external data</span>
                                <span className="eng-config-val">{eng.requiresData ? 'Yes' : 'No'}</span>
                              </div>
                              {eng.dataSource && (
                                <div className="eng-config-row">
                                  <span className="eng-config-key">Data source</span>
                                  <span className="eng-config-val">{eng.dataSource}</span>
                                </div>
                              )}
                              <div className="eng-config-row">
                                <span className="eng-config-key">Trigger events</span>
                                <span className="eng-config-val">{eng.triggerEvents.join(', ')}</span>
                              </div>
                            </div>
                          </div>

                          {status?.lastRun?.outputSummary && (
                            <div className="eng-output">
                              <div className="eng-expand-label">Last Run Output</div>
                              <pre className="eng-output-pre">{status.lastRun.outputSummary}</pre>
                            </div>
                          )}

                          {status?.lastRun?.error && (
                            <div className="eng-error-box">
                              <div className="eng-error-label">Error</div>
                              <div className="eng-error-text">{status.lastRun.error}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ══ HISTORY TAB ══ */}
        {activeTab === 'history' && (
          <div>
            {history.length === 0 ? (
              <div className="eng-empty">
                <div>No engineer runs recorded yet for {selectedTicker}.</div>
                <div className="eng-empty-sub">Run an engineer manually or enable a schedule to get started.</div>
              </div>
            ) : (
              <div style={{ marginTop: 12 }}>
                {history.map(run => (
                  <div key={run.id} className="eng-history-row">
                    <div className="eng-history-dot" data-status={run.status} />
                    <span className="eng-history-name">
                      {engineers.find(e => e.id === run.engineerId)?.name || run.engineerId}
                    </span>
                    <span className="eng-history-status" data-status={run.status}>{run.status}</span>
                    <span className="eng-history-trigger">{run.triggerType}</span>
                    <span className="eng-history-duration">{formatDuration(run.durationMs)}</span>
                    <span className="eng-history-time">{formatTime(run.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="eng-loading">
            <div className="eng-spinner" />
          </div>
        )}
      </div>
    </div>
  );
}
