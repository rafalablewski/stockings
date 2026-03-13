'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import type { EngineerTask } from '@/lib/engineers';
import {
  agents,
  resources,
  connections,
  dashboardStats,
  type AgentNode,
} from '@/data/ai-engineers';

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
  tickers: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(ms: number | null): string {
  if (!ms) return '—';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function formatTime(iso: string | null): string {
  if (!iso) return '—';
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

function agentIcon(category: string) {
  switch (category) {
    case 'hook':     return '\u26A1';
    case 'workflow': return '\u2699';
    case 'pipeline': return '\u25C8';
    default:         return '\u25CF';
  }
}

function resourceIcon(type: string) {
  switch (type) {
    case 'api':      return '\u2197';
    case 'database': return '\u2B21';
    case 'config':   return '\u229E';
    case 'prompt':   return '\u2726';
    case 'file':     return '\u25FB';
    default:         return '\u25CB';
  }
}

function connTypeLabel(type: string) {
  switch (type) {
    case 'triggers':    return 'triggers';
    case 'reads':       return 'reads';
    case 'writes':      return 'writes';
    case 'uses-prompt': return 'uses prompt';
    case 'feeds':       return 'feeds into';
    default:            return type;
  }
}

function nameFromId(id: string): string {
  const agent = agents.find((a) => a.id === id);
  if (agent) return agent.name;
  const res = resources.find((r) => r.id === id);
  if (res) return res.name;
  return id;
}

const categoryLabels: Record<string, string> = {
  research: 'Research Engineers',
  monitoring: 'Monitoring Engineers',
  intelligence: 'Intelligence Engineers',
  audit: 'Audit Engineers',
};

// ── SVG Connection Lines ──────────────────────────────────────────────────────

interface NodeRect {
  id: string;
  cx: number;
  cy: number;
}

function ConnectionLines({ nodeRects, selected }: { nodeRects: NodeRect[]; selected: string | null }) {
  if (nodeRects.length === 0) return null;

  const relevantConns = selected
    ? connections.filter((c) => c.from === selected || c.to === selected)
    : connections;

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
      {relevantConns.map((conn, i) => {
        const fromNode = nodeRects.find((n) => n.id === conn.from);
        const toNode = nodeRects.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return null;

        const midX = (fromNode.cx + toNode.cx) / 2;
        const midY = (fromNode.cy + toNode.cy) / 2;
        const offsetY = Math.abs(fromNode.cx - toNode.cx) > 100 ? -30 : 0;

        return (
          <g key={i}>
            <path
              d={`M ${fromNode.cx} ${fromNode.cy} Q ${midX} ${midY + offsetY} ${toNode.cx} ${toNode.cy}`}
              className="eng-graph-line"
              data-type={conn.type}
              filter={selected ? 'url(#eng-glow)' : undefined}
              style={{ opacity: selected ? 0.8 : 0.4 }}
            />
            <circle className="eng-graph-flow-dot" data-type={conn.type}>
              <animateMotion
                dur={`${3 + i * 0.5}s`}
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

// ── Agent Detail Panel ────────────────────────────────────────────────────────

function AgentDetailPanel({ agent, onClose }: { agent: AgentNode; onClose: () => void }) {
  const relatedConnections = connections.filter(
    (c) => c.from === agent.id || c.to === agent.id
  );

  return (
    <div className="eng-detail" data-color={agent.color}>
      <div className="eng-detail-header">
        <div className="eng-detail-title-group">
          <div className="eng-detail-icon" data-color={agent.color}>
            {agentIcon(agent.category)}
          </div>
          <div>
            <h2 className="eng-detail-name">{agent.name}</h2>
            <div className="eng-detail-role">{agent.role}</div>
          </div>
        </div>
        <button className="eng-detail-close" onClick={onClose}>{'\u2715'}</button>
      </div>

      <p className="eng-detail-desc">{agent.description}</p>

      <div className="eng-metrics-row">
        {agent.metrics.runsPerDay !== undefined && (
          <div className="eng-metric">
            <span className="eng-metric-value">{agent.metrics.runsPerDay}</span>
            <span className="eng-metric-label">Runs / day</span>
          </div>
        )}
        {agent.metrics.avgLatencyMs !== undefined && (
          <div className="eng-metric">
            <span className="eng-metric-value">
              {agent.metrics.avgLatencyMs >= 1000
                ? `${(agent.metrics.avgLatencyMs / 1000).toFixed(1)}s`
                : `${agent.metrics.avgLatencyMs}ms`}
            </span>
            <span className="eng-metric-label">Avg Latency</span>
          </div>
        )}
        {agent.metrics.findings !== undefined && (
          <div className="eng-metric">
            <span className="eng-metric-value">{agent.metrics.findings}</span>
            <span className="eng-metric-label">Findings</span>
          </div>
        )}
        {agent.metrics.lastRun && (
          <div className="eng-metric">
            <span className="eng-metric-value" style={{ fontSize: 13 }}>{agent.metrics.lastRun}</span>
            <span className="eng-metric-label">Last Run</span>
          </div>
        )}
      </div>

      <div className="eng-detail-grid">
        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Prompt Templates</div>
          <div className="eng-prompt-tags">
            {agent.prompts.map((p) => (
              <span key={p} className="eng-prompt-tag" data-color={agent.color}>{p}</span>
            ))}
          </div>
        </div>

        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Trigger Matchers</div>
          <div className="eng-matcher-list">
            {agent.matchers.map((m) => (
              <span key={m} className="eng-matcher-badge">{m}</span>
            ))}
          </div>
        </div>

        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Files Touched</div>
          <ul className="eng-file-list">
            {agent.files.map((f) => (
              <li key={f} className="eng-file-item">
                <span className="eng-file-dot" style={{ background: `var(--${agent.color}, rgba(255,255,255,0.3))` }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {relatedConnections.length > 0 && (
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
              {relatedConnections.map((conn, i) => {
                const isFrom = conn.from === agent.id;
                return (
                  <tr key={i}>
                    <td style={{
                      color: isFrom ? 'rgba(126,231,135,0.6)' : 'rgba(121,192,255,0.6)',
                      fontWeight: 600, fontSize: 10, fontFamily: "'Space Mono', monospace",
                    }}>
                      {isFrom ? 'OUT \u2192' : '\u2190 IN'}
                    </td>
                    <td>
                      <span className="eng-conn-dot" data-type={conn.type} />
                      <span className="eng-conn-type">{connTypeLabel(conn.type)}</span>
                    </td>
                    <td className="eng-conn-to">{nameFromId(isFrom ? conn.to : conn.from)}</td>
                    <td className="eng-conn-label">{conn.label ?? '\u2014'}</td>
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

export default function EngineersDashboard({ engineers, tickers }: Props) {
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

  const selectedAgent = selectedNode
    ? agents.find((a) => a.id === selectedNode) ?? null
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

  return (
    <div className="eng-app">
      {/* Header */}
      <div className="eng-header">
        <div className="eng-subtitle">Autonomous Operations</div>
        <div className="eng-title">Engineers Dashboard</div>
        <div className="eng-desc">
          Command center for AI engineers — network topology, autonomous operations,
          and execution intelligence across all monitored tickers.
        </div>

        {/* KPI Strip — Palantir-style segmented bar */}
        <div className="eng-kpi-bar">
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="cyan">{dashboardStats.totalAgents}</div>
            <div className="eng-kpi-bar-label">Total Agents</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{dashboardStats.activeAgents}</div>
            <div className="eng-kpi-bar-label">Active</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{dashboardStats.totalConnections}</div>
            <div className="eng-kpi-bar-label">Connections</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{dashboardStats.totalPrompts}</div>
            <div className="eng-kpi-bar-label">Prompts</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="sky">{scheduledCount}</div>
            <div className="eng-kpi-bar-label">Scheduled</div>
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
            <button
              key={t}
              className="eng-ticker-pill"
              data-active={selectedTicker === t}
              onClick={() => setSelectedTicker(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab strip — 3 tabs */}
        <div className="eng-tab-strip">
          <button className="eng-tab" data-active={activeTab === 'network'} onClick={() => setActiveTab('network')}>
            Network Graph<span className="eng-tab-count">{agents.length}</span>
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
            {/* Agent Network Section */}
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="cyan" />
              <span className="eng-section-label">Agent Network</span>
              <div className="eng-section-line" />
            </div>

            <div className="eng-graph-container" ref={graphRef}>
              <ConnectionLines nodeRects={nodeRects} selected={selectedNode} />
              <div className="eng-graph-nodes">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    ref={(el) => { if (el) nodeRefs.current.set(agent.id, el); }}
                    className="eng-node"
                    data-color={agent.color}
                    data-selected={selectedNode === agent.id ? 'true' : undefined}
                    onClick={() => setSelectedNode(selectedNode === agent.id ? null : agent.id)}
                  >
                    <span className="eng-node-pulse" data-status={agent.status} />
                    <div className="eng-node-header">
                      <div className="eng-node-icon" data-color={agent.color}>
                        {agentIcon(agent.category)}
                      </div>
                      <div>
                        <div className="eng-node-name">{agent.name}</div>
                        <div className="eng-node-role">{agent.role}</div>
                      </div>
                    </div>
                    <div className="eng-node-desc">{agent.description}</div>
                    <div className="eng-node-meta">
                      <span className="eng-node-badge" data-variant={agent.status}>{agent.status}</span>
                      <span className="eng-node-badge" data-variant={agent.category}>{agent.category}</span>
                      <span className="eng-node-badge" data-variant="phase">{agent.phase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="eng-legend">
              {([['triggers', 'Triggers'], ['reads', 'Reads'], ['writes', 'Writes'], ['uses-prompt', 'Uses Prompt'], ['feeds', 'Feeds Into']] as const).map(([type, label]) => (
                <div key={type} className="eng-legend-item">
                  <span className="eng-legend-line" data-type={type} />
                  {label}
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            {selectedAgent && (
              <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedNode(null)} />
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
                  {connections.map((conn, i) => (
                    <tr key={i}>
                      <td className="eng-conn-from">{nameFromId(conn.from)}</td>
                      <td>
                        <span className="eng-conn-dot" data-type={conn.type} />
                        <span className="eng-conn-type">{connTypeLabel(conn.type)}</span>
                      </td>
                      <td className="eng-conn-to">{nameFromId(conn.to)}</td>
                      <td className="eng-conn-label">{conn.label ?? '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Resources Grid */}
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="gold" />
              <span className="eng-section-label">Resources & Infrastructure</span>
              <div className="eng-section-line" />
            </div>

            <div className="eng-resources-grid">
              {resources.map((res) => (
                <div key={res.id} className="eng-resource-card">
                  <div className="eng-resource-header">
                    <div className="eng-resource-icon" data-color={res.color}>
                      {resourceIcon(res.type)}
                    </div>
                    <div>
                      <div className="eng-resource-name">{res.name}</div>
                      <div className="eng-resource-type">{res.type}</div>
                    </div>
                  </div>
                  <div className="eng-resource-desc">{res.description}</div>
                  {res.path && <div className="eng-resource-path">{res.path}</div>}
                  <div className="eng-resource-agents">
                    {res.connectedAgents.map((agentId) => (
                      <span key={agentId} className="eng-resource-agent-chip">{nameFromId(agentId)}</span>
                    ))}
                  </div>
                </div>
              ))}
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
                          <button
                            className="eng-chevron"
                            onClick={() => setExpandedId(isExpanded ? null : eng.id)}
                          >
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
