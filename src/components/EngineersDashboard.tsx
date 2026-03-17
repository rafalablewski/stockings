'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import type { EngineerTask } from '@/lib/engineers';
import type { Workflow } from '@/data/workflows';
import type { RunStatus } from '@/lib/engineer-engine';
import NetworkGraph from '@/components/NetworkGraph';
import DecisionDashboard from '@/components/DecisionDashboard';
import OperationsPipeline from '@/components/OperationsPipeline';
import { orgNodes } from '@/data/org-hierarchy';

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

const STATUS_LABELS: Record<RunStatus, string> = {
  completed: 'OK',
  failed: 'FAIL',
  running: 'RUN',
  queued: 'QUEUE',
  cancelled: 'CANCEL',
};

function extractPreview(text: string | null, maxLen = 120): string {
  if (!text) return '';
  const line = text.split('\n').find(l => l.trim());
  return line?.trim().slice(0, maxLen) || '';
}

interface HistoryRun {
  id: number;
  ticker: string;
  engineerId: string;
  workflowId: string | null;
  status: RunStatus;
  triggerType: string;
  triggerReason: string | null;
  outputSummary: string | null;
  patchesApplied: number;
  errorsEncountered: string | null;
  durationMs: number | null;
  hidden: boolean;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

interface TickerInfo {
  ticker: string;
  name: string;
}

interface Props {
  engineers: EngineerTask[];
  workflows: Workflow[];
  tickers: TickerInfo[];
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
  documentation: 'rose',
};

const categoryLabels: Record<string, string> = {
  research: 'Research',
  monitoring: 'Monitoring',
  intelligence: 'Intelligence',
  audit: 'Audit',
  documentation: 'Documentation',
};

const categoryDescriptions: Record<string, string> = {
  research: 'Pressure-test theses, track capital structure, validate data quality',
  monitoring: 'Watch SEC filings, insider trades, and regulatory changes in real-time',
  intelligence: 'Track catalysts, aggregate sentiment, monitor press and news signals',
  audit: 'Validate database integrity, flag stale data, cross-reference consistency',
  documentation: 'Review code changes, maintain style guides, audit doc freshness',
};

// ── Shared trigger computation ────────────────────────────────────────────────

interface SharedTrigger {
  event: string;
  engineers: { id: string; name: string; category: string }[];
}

function computeSharedTriggers(engineers: EngineerTask[]): SharedTrigger[] {
  const eventMap = new Map<string, { id: string; name: string; category: string }[]>();
  for (const eng of engineers) {
    for (const event of eng.triggerEvents) {
      if (!eventMap.has(event)) eventMap.set(event, []);
      eventMap.get(event)!.push({ id: eng.id, name: eng.name, category: eng.category });
    }
  }
  // Only return events that trigger engineers across multiple categories
  return Array.from(eventMap.entries())
    .filter(([, engs]) => {
      const cats = new Set(engs.map(e => e.category));
      return cats.size > 1;
    })
    .map(([event, engs]) => ({ event, engineers: engs }));
}

// ── Detail Panel ──────────────────────────────────────────────────────────────

function EngineerDetailPanel({
  engineer,
  workflows,
  allEngineers,
  selectedTicker,
  status,
  isRunning,
  onClose,
  onRun,
  onSchedule,
  onEnableSchedule,
  onPromptPreview,
  onViewFullReport,
  fullReportLoading,
}: {
  engineer: EngineerTask;
  workflows: Workflow[];
  allEngineers: EngineerTask[];
  selectedTicker: string;
  status: EngineerStatus | undefined;
  isRunning: boolean;
  onClose: () => void;
  onRun: (engineerId: string, workflowId?: string) => void;
  onSchedule: (engineerId: string, enabled: boolean, interval: number) => void;
  onEnableSchedule: (engineer: EngineerTask) => void;
  onPromptPreview: (wf: Workflow, ticker: string, label: string) => void;
  onViewFullReport: (runId: number) => void;
  fullReportLoading: boolean;
}) {
  const linkedWorkflows = workflows.filter(w => engineer.workflowIds.includes(w.id));
  const color = categoryColors[engineer.category] || 'cyan';

  // Find other engineers sharing triggers with this one
  const sharedWith = new Map<string, string[]>();
  for (const event of engineer.triggerEvents) {
    const others = allEngineers
      .filter(e => e.id !== engineer.id && e.triggerEvents.includes(event))
      .map(e => e.name);
    if (others.length > 0) sharedWith.set(event, others);
  }

  const dotStatus = isRunning || status?.lastRun?.status === 'running'
    ? 'running'
    : status?.schedule?.enabled ? 'active' : 'idle';

  return (
    <div className="eng-detail" data-color={color}>
      <div className="eng-detail-header">
        <div className="eng-detail-title-group">
          <div className="eng-detail-icon" data-color={color}>{'\u2B22'}</div>
          <div>
            <h2 className="eng-detail-name">{engineer.name}</h2>
            <div className="eng-detail-role">{engineer.role}</div>
            {(() => {
              const engNode = orgNodes.find(n => n.engineerId === engineer.id);
              const pm = engNode?.parentId ? orgNodes.find(n => n.id === engNode.parentId) : null;
              return pm ? (
                <div className="eng-detail-pm" style={{ color: pm.color }}>Reports to {pm.label}</div>
              ) : null;
            })()}
          </div>
        </div>
        <div className="eng-detail-actions">
          {status?.schedule ? (
            <button
              className="eng-btn"
              data-variant={status.schedule.enabled ? 'active' : 'paused'}
              onClick={() => onSchedule(engineer.id, status.schedule!.enabled, status.schedule!.intervalMinutes)}
            >
              {status.schedule.enabled ? 'Scheduled' : 'Paused'}
            </button>
          ) : (
            <button className="eng-btn" onClick={() => onEnableSchedule(engineer)}>
              Schedule
            </button>
          )}
          {linkedWorkflows.length > 1 ? (
            <div className="eng-run-group">
              <button
                className="eng-btn"
                data-variant="run"
                data-state={isRunning ? 'running' : undefined}
                onClick={() => onRun(engineer.id)}
                disabled={isRunning}
              >
                {isRunning ? 'Running\u2026' : 'Run All'}
              </button>
              {linkedWorkflows.map(wf => (
                <button
                  key={wf.id}
                  className="eng-btn eng-btn-sm"
                  data-variant="run-single"
                  data-state={isRunning ? 'running' : undefined}
                  onClick={() => onRun(engineer.id, wf.id)}
                  disabled={isRunning}
                  title={wf.description}
                >
                  {wf.name}
                </button>
              ))}
            </div>
          ) : (
            <button
              className="eng-btn"
              data-variant="run"
              data-state={isRunning ? 'running' : undefined}
              onClick={() => onRun(engineer.id)}
              disabled={isRunning}
            >
              {isRunning ? 'Running\u2026' : 'Run Now'}
            </button>
          )}
          <button className="eng-detail-close" onClick={onClose}>{'\u2715'}</button>
        </div>
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
          <span className="eng-status-dot" data-status={dotStatus} />
          <span className="eng-metric-label">{dotStatus === 'running' ? 'Running' : dotStatus === 'active' ? 'Active' : 'Idle'}</span>
        </div>
      </div>

      <div className="eng-detail-grid">
        <div className="eng-detail-section">
          <div className="eng-detail-section-title">Capabilities</div>
          {engineer.capabilities.map((cap, i) => (
            <div key={i} className="eng-cap-item">
              <span className="eng-cap-bullet">+</span>
              {cap}
            </div>
          ))}
        </div>

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

      {/* Linked Workflows — ticker-aware with prompt preview */}
      <div className="eng-detail-block">
        <div className="eng-detail-section-title">Workflows for {selectedTicker}</div>
        {linkedWorkflows.length > 0 ? (
          <div className="eng-resources-grid eng-detail-block-sm">
            {linkedWorkflows.map(wf => {
              const hasPrompt = !!(wf.promptTemplate || wf.variants.find(
                v => v.ticker === selectedTicker.toLowerCase()
              ));

              return (
                <div key={wf.id} className="eng-resource-card">
                  <div className="eng-resource-header">
                    <div className="eng-resource-icon" data-color={color}>{'\u2726'}</div>
                    <div>
                      <div className="eng-resource-name">{wf.name}</div>
                      <div className="eng-resource-type">
                        {wf.requiresUserData ? 'requires input' : 'autonomous'}
                      </div>
                    </div>
                  </div>
                  <div className="eng-resource-desc">{wf.description}</div>
                  {hasPrompt ? (
                    <div className="eng-resource-footer">
                      <button
                        className="eng-btn eng-btn-prompt"
                        data-color={color}
                        onClick={() => onPromptPreview(wf, selectedTicker.toLowerCase(), selectedTicker)}
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                        View Prompt
                      </button>
                    </div>
                  ) : (
                    <div className="eng-resource-footer">
                      <span className="eng-resource-no-variant">No prompt for {selectedTicker}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="eng-workflow-id-list">
            {engineer.workflowIds.map(id => (
              <span key={id} className="eng-map-workflow-tag">{id}</span>
            ))}
          </div>
        )}
      </div>

      {sharedWith.size > 0 && (
        <div className="eng-detail-block">
          <div className="eng-detail-section-title">Shared Triggers</div>
          <table className="eng-matrix-table eng-detail-block-sm">
            <thead>
              <tr>
                <th>Event</th>
                <th>Also Triggers</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(sharedWith.entries()).map(([event, others]) => (
                <tr key={event}>
                  <td className="eng-conn-from">{event.replace(/-/g, ' ')}</td>
                  <td className="eng-conn-to">{others.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Last run output */}
      {status?.lastRun?.outputSummary && (
        <div className="eng-detail-block">
          <div className="eng-detail-section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Last Run Output
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="eng-btn eng-btn-pdf"
                onClick={() => onViewFullReport(status.lastRun!.id)}
                title="View full report"
              >
                {fullReportLoading ? '...' : 'View Full'}
              </button>
              <button
                className="eng-btn eng-btn-pdf"
                onClick={() => {
                  const url = `/api/engineers/report?runId=${status.lastRun!.id}`;
                  window.open(url, '_blank');
                }}
                title="Download full report as PDF"
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M12 18v-6" />
                  <path d="M9 15l3 3 3-3" />
                </svg>
                PDF
              </button>
            </div>
          </div>
          <pre className="eng-output-pre eng-detail-block-sm">{status.lastRun.outputSummary}</pre>
        </div>
      )}

      {status?.lastRun?.error && (
        <div className="eng-error-box eng-detail-block-error">
          <div className="eng-error-label">Error</div>
          <div className="eng-error-text">{status.lastRun.error}</div>
        </div>
      )}
    </div>
  );
}

// ── Prompt Preview types ──────────────────────────────────────────────────────

const PROMPT_PREVIEW_LIMIT = 1200;

interface PromptPreview {
  workflowName: string;
  workflowDescription: string;
  ticker: string;
  label: string;
  prompt: string;
  requiresUserData: boolean;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function EngineersDashboard({ engineers, workflows, tickers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]?.ticker || 'ASTS');
  const [statuses, setStatuses] = useState<EngineerStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningIds, setRunningIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'network' | 'history' | 'pms' | 'operations'>('network');
  const [graphView, setGraphView] = useState<'default' | 'interactive'>('default');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // ── Ticker dropdown state ──
  const [tickerDropdownOpen, setTickerDropdownOpen] = useState(false);
  const [tickerSearch, setTickerSearch] = useState('');
  const tickerDropdownRef = useRef<HTMLDivElement>(null);
  const tickerSearchRef = useRef<HTMLInputElement>(null);

  const [promptPreview, setPromptPreview] = useState<PromptPreview | null>(null);

  // ── History tab state ──
  const [historyRuns, setHistoryRuns] = useState<HistoryRun[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [expandedRunId, setExpandedRunId] = useState<number | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [fullReport, setFullReport] = useState<{ runId: number; output: string; error: string | null } | null>(null);
  const [fullReportLoading, setFullReportLoading] = useState(false);

  // ── Ticker dropdown helpers ──
  const selectedTickerInfo = tickers.find(t => t.ticker === selectedTicker);

  const filteredTickers = useMemo(() => {
    if (!tickerSearch.trim()) return tickers;
    const q = tickerSearch.toLowerCase();
    return tickers.filter(t =>
      t.ticker.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
    );
  }, [tickers, tickerSearch]);

  const selectTicker = useCallback((ticker: string) => {
    setSelectedTicker(ticker);
    setTickerDropdownOpen(false);
    setTickerSearch('');
  }, []);

  useEffect(() => {
    if (!tickerDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (tickerDropdownRef.current && !tickerDropdownRef.current.contains(e.target as Node)) {
        setTickerDropdownOpen(false);
        setTickerSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [tickerDropdownOpen]);

  useEffect(() => {
    if (tickerDropdownOpen && tickerSearchRef.current) {
      tickerSearchRef.current.focus();
    }
  }, [tickerDropdownOpen]);

  // ── Network graph data ──
  const selectedEngineer = selectedNode
    ? engineers.find(e => e.id === selectedNode) ?? null
    : null;

  const sharedTriggers = useMemo(() => computeSharedTriggers(engineers), [engineers]);

  const grouped = useMemo(() => {
    const g: Record<string, EngineerTask[]> = {};
    for (const eng of engineers) {
      if (!g[eng.category]) g[eng.category] = [];
      g[eng.category].push(eng);
    }
    return g;
  }, [engineers]);

  // ── Data fetching ──
  const fetchStatus = useCallback(async () => {
    try {
      const res = await authFetch(`/api/engineers/status?ticker=${selectedTicker}`);
      if (res.ok) {
        const data = await res.json();
        setStatuses(data.engineers || []);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }, [selectedTicker]);

  useEffect(() => {
    setLoading(true);
    fetchStatus();
  }, [fetchStatus]);

  // ── Fetch history when history tab is active ──
  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const hiddenParam = showHidden ? '&showHidden=true' : '';
      const res = await authFetch(`/api/engineers/history?ticker=${selectedTicker}&limit=50${hiddenParam}`);
      if (res.ok) {
        const data = await res.json();
        setHistoryRuns(data.runs || []);
      }
    } catch { /* silent */ }
    setHistoryLoading(false);
  }, [selectedTicker, showHidden]);

  useEffect(() => {
    if (activeTab === 'history') fetchHistory();
  }, [activeTab, fetchHistory]);

  const handleHideRun = useCallback(async (id: number, hidden: boolean) => {
    try {
      await authFetch(`/api/engineers/history?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden }),
      });
      // Update in place so hidden rows stay visible when showHidden is on
      setHistoryRuns(prev => showHidden
        ? prev.map(r => r.id === id ? { ...r, hidden } : r)
        : prev.filter(r => r.id !== id)
      );
      if (expandedRunId === id) setExpandedRunId(null);
    } catch { /* silent */ }
  }, [expandedRunId, showHidden]);

  const handleDeleteRun = useCallback(async (id: number) => {
    try {
      await authFetch(`/api/engineers/history?id=${id}`, { method: 'DELETE' });
      setHistoryRuns(prev => prev.filter(r => r.id !== id));
      if (expandedRunId === id) setExpandedRunId(null);
    } catch { /* silent */ }
  }, [expandedRunId]);

  const openFullReport = useCallback(async (runId: number) => {
    setFullReportLoading(true);
    try {
      const res = await authFetch(`/api/engineers/history/full?id=${runId}`);
      if (res.ok) {
        const data = await res.json();
        setFullReport({ runId: data.id, output: data.output, error: data.error });
      }
    } catch { /* silent */ }
    setFullReportLoading(false);
  }, []);

  const handleRun = async (engineerId: string, workflowId?: string) => {
    setRunningIds(prev => { const next = new Set(prev); next.add(engineerId); return next; });
    try {
      await authFetch('/api/engineers/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, engineerId, workflowId }),
      });
      await fetchStatus();
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

  const categories = ['research', 'monitoring', 'intelligence', 'audit', 'documentation'] as const;

  // Division leads data for the PM section
  const divisionLeads = useMemo(() => {
    const divNodes = orgNodes.filter(n => n.type === 'division');
    return divNodes.map(div => {
      const managedEngineers = orgNodes.filter(
        n => n.parentId === div.id && n.type === 'engineer'
      );
      return { ...div, engineerCount: managedEngineers.length, managedEngineers };
    });
  }, []);

  const openPromptPreview = useCallback((wf: Workflow, ticker: string, label: string) => {
    const prompt = wf.promptTemplate ?? wf.variants.find(v => v.ticker === ticker.toLowerCase())?.prompt;
    if (!prompt) return;
    setPromptPreview({
      workflowName: wf.name,
      workflowDescription: wf.description,
      ticker: ticker.toUpperCase(),
      label,
      prompt,
      requiresUserData: wf.requiresUserData,
    });
  }, []);

  // Stats
  const scheduledCount = statuses.filter(s => s.schedule?.enabled).length;
  const uniqueWorkflows = new Set(engineers.flatMap(e => e.workflowIds)).size;
  const requiresDataCount = engineers.filter(e => e.requiresData).length;

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
            <div className="eng-kpi-bar-label">Agents</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{uniqueWorkflows}</div>
            <div className="eng-kpi-bar-label">Workflows</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{scheduledCount}</div>
            <div className="eng-kpi-bar-label">Scheduled</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{sharedTriggers.length}</div>
            <div className="eng-kpi-bar-label">Cross-Links</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="coral">{requiresDataCount}</div>
            <div className="eng-kpi-bar-label">External Data</div>
          </div>
        </div>

        {/* Unified nav row: ticker dropdown + tabs */}
        <div className="eng-nav-row">
          <div className="eng-ticker-dropdown" ref={tickerDropdownRef}>
            <button
              className="eng-ticker-trigger"
              onClick={() => setTickerDropdownOpen(!tickerDropdownOpen)}
            >
              <span className="eng-ticker-trigger-ticker">{selectedTicker}</span>
              {selectedTickerInfo?.name && (
                <span className="eng-ticker-trigger-name">{selectedTickerInfo.name}</span>
              )}
              <svg className="eng-ticker-trigger-chevron" data-open={tickerDropdownOpen || undefined} width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {tickerDropdownOpen && (
              <div className="eng-ticker-menu">
                <div className="eng-ticker-search-wrap">
                  <input
                    ref={tickerSearchRef}
                    className="eng-ticker-search"
                    type="text"
                    placeholder="Search ticker or name..."
                    value={tickerSearch}
                    onChange={(e) => setTickerSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setTickerDropdownOpen(false);
                        setTickerSearch('');
                      }
                      if (e.key === 'Enter' && filteredTickers.length > 0) {
                        selectTicker(filteredTickers[0].ticker);
                      }
                    }}
                  />
                </div>
                <div className="eng-ticker-list">
                  {filteredTickers.length === 0 && (
                    <div className="eng-ticker-empty">No matches</div>
                  )}
                  {filteredTickers.map(t => (
                    <button
                      key={t.ticker}
                      className="eng-ticker-option"
                      data-active={selectedTicker === t.ticker || undefined}
                      onClick={() => selectTicker(t.ticker)}
                    >
                      <span className="eng-ticker-option-ticker">{t.ticker}</span>
                      <span className="eng-ticker-option-name">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="eng-tab-strip eng-tab-strip-flush">
            <button className="eng-tab" data-active={activeTab === 'network'} onClick={() => setActiveTab('network')}>
              Network Graph<span className="eng-tab-count">{engineers.length}</span>
            </button>
            <button className="eng-tab" data-active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
              History
            </button>
            <button className="eng-tab" data-active={activeTab === 'pms'} onClick={() => setActiveTab('pms')}>
              PMs<span className="eng-tab-count">{divisionLeads.length}</span>
            </button>
            <button className="eng-tab" data-active={activeTab === 'operations'} onClick={() => setActiveTab('operations')}>
              Operations
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="eng-feed">

        {/* ══ NETWORK GRAPH TAB ══ */}
        {activeTab === 'network' && (
          <div>
            {/* View toggle */}
            <div className="eng-view-toggle-bar">
              <button
                className={`eng-view-toggle ${graphView === 'default' ? 'active' : ''}`}
                onClick={() => setGraphView('default')}
              >
                Swimlane
              </button>
              <button
                className={`eng-view-toggle ${graphView === 'interactive' ? 'active' : ''}`}
                onClick={() => setGraphView('interactive')}
              >
                Interactive
              </button>
            </div>

            {/* ── Default: Category Swimlanes ── */}
            {graphView === 'default' && (
              <>
                {categories.map(cat => {
                  const engs = grouped[cat] || [];
                  if (engs.length === 0) return null;
                  const color = categoryColors[cat];

                  return (
                    <div key={cat} className="eng-swimlane" data-color={color}>
                      <div className="eng-swimlane-header">
                        <div className="eng-swimlane-label-row">
                          <span className="eng-swimlane-dot" data-color={color} />
                          <span className="eng-swimlane-label">{categoryLabels[cat]}</span>
                          <span className="eng-swimlane-count">{engs.length}</span>
                        </div>
                        <div className="eng-swimlane-desc">{categoryDescriptions[cat]}</div>
                      </div>

                      <div className="eng-swimlane-cards">
                        {engs.map(eng => {
                          const linkedWfs = workflows.filter(w => eng.workflowIds.includes(w.id));
                          const isSelected = selectedNode === eng.id;

                          return (
                            <div
                              key={eng.id}
                              className="eng-swim-card"
                              data-color={color}
                              data-selected={isSelected || undefined}
                              onClick={() => setSelectedNode(isSelected ? null : eng.id)}
                            >
                              <div className="eng-swim-card-header">
                                <div className="eng-swim-card-icon" data-color={color}>{'\u2B22'}</div>
                                <div>
                                  <div className="eng-swim-card-name">{eng.name}</div>
                                  <div className="eng-swim-card-role">{eng.role}</div>
                                </div>
                              </div>

                              <div className="eng-swim-card-badges">
                                <span className="eng-swim-badge-label">Workflows</span>
                                {linkedWfs.map(wf => (
                                  <span key={wf.id} className="eng-swim-badge" data-type="workflow">
                                    {'\u2726'} {wf.name}
                                  </span>
                                ))}
                                {eng.workflowIds
                                  .filter(id => !linkedWfs.some(w => w.id === id))
                                  .map(id => (
                                    <span key={id} className="eng-swim-badge" data-type="workflow">{id}</span>
                                  ))}
                              </div>

                              <div className="eng-swim-card-badges">
                                <span className="eng-swim-badge-label">Triggers</span>
                                {eng.triggerEvents.map(ev => {
                                  const isShared = sharedTriggers.some(st => st.event === ev);
                                  return (
                                    <span
                                      key={ev}
                                      className="eng-swim-badge"
                                      data-type={isShared ? 'shared-trigger' : 'trigger'}
                                    >
                                      {'\u26A1'} {ev.replace(/-/g, ' ')}
                                    </span>
                                  );
                                })}
                              </div>

                              {eng.requiresData && eng.dataSource && (
                                <div className="eng-swim-card-badges">
                                  <span className="eng-swim-badge-label">Data</span>
                                  <span className="eng-swim-badge" data-type="datasource">
                                    {eng.dataSource}
                                  </span>
                                </div>
                              )}

                              {/* Approval Chain */}
                              {(eng.chainsTo || eng.decisionsFor) && (
                                <div className="eng-swim-card-badges">
                                  <span className="eng-swim-badge-label">Approval Chain</span>
                                  {eng.chainsTo && (() => {
                                    const downstream = engineers.find(e => e.id === eng.chainsTo);
                                    return (
                                      <span className="eng-swim-badge" data-type="chain">
                                        {'\u2192'} {downstream?.name ?? eng.chainsTo}
                                      </span>
                                    );
                                  })()}
                                  {eng.decisionsFor && (
                                    <span className="eng-swim-badge" data-type="chain">
                                      {'\u2192'} {eng.decisionsFor} (approval)
                                    </span>
                                  )}
                                </div>
                              )}

                              <div className="eng-swim-card-schedule">
                                Every {formatInterval(eng.defaultIntervalMinutes)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Cross-Category Triggers */}
                {sharedTriggers.length > 0 && (
                  <div className="eng-cross-triggers">
                    <div className="eng-section-header">
                      <span className="eng-section-dot" data-color="violet" />
                      <span className="eng-section-label">Cross-Category Triggers</span>
                      <div className="eng-section-line" />
                    </div>
                    <div className="eng-cross-trigger-desc">
                      Events that fire engineers across multiple categories — these are the key system-wide connections.
                    </div>

                    <div className="eng-cross-trigger-grid">
                      {sharedTriggers.map(st => (
                        <div key={st.event} className="eng-cross-trigger-card">
                          <div className="eng-cross-trigger-event">
                            {'\u26A1'} {st.event.replace(/-/g, ' ')}
                          </div>
                          <div className="eng-cross-trigger-agents">
                            {st.engineers.map(eng => (
                              <span
                                key={eng.id}
                                className="eng-cross-trigger-chip"
                                data-color={categoryColors[eng.category]}
                              >
                                {eng.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Interactive: SVG Org Hierarchy ── */}
            {graphView === 'interactive' && (
              <NetworkGraph
                engineers={engineers}
                runningIds={runningIds}
                onSelectEngineer={(engineerId) => setSelectedNode(engineerId)}
              />
            )}

            {/* Detail Modal */}
            {selectedEngineer && (
              <div className="eng-modal-overlay" onClick={() => setSelectedNode(null)}>
                <div className="eng-modal" onClick={(e) => e.stopPropagation()}>
                  <EngineerDetailPanel
                    engineer={selectedEngineer}
                    workflows={workflows}
                    allEngineers={engineers}
                    selectedTicker={selectedTicker}
                    status={statuses.find(s => s.engineer.id === selectedEngineer.id)}
                    isRunning={runningIds.has(selectedEngineer.id)}
                    onClose={() => setSelectedNode(null)}
                    onRun={handleRun}
                    onSchedule={handleToggleSchedule}
                    onEnableSchedule={handleEnableSchedule}
                    onPromptPreview={openPromptPreview}
                    onViewFullReport={openFullReport}
                    fullReportLoading={fullReportLoading}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ HISTORY TAB ══ */}
        {activeTab === 'history' && (
          <div>
            {historyLoading && historyRuns.length === 0 ? (
              <div className="eng-empty">
                <div>Loading history...</div>
              </div>
            ) : historyRuns.length === 0 && !showHidden ? (
              <div className="eng-empty">
                <div>No operations history recorded yet for {selectedTicker}.</div>
                <div className="eng-empty-sub">
                  History will appear here as agents execute tasks.
                </div>
              </div>
            ) : (
              <div className="eng-history-list">
                {/* ── Toolbar ── */}
                {(() => {
                  const hiddenCount = historyRuns.filter(r => r.hidden).length;
                  const visibleCount = historyRuns.length - hiddenCount;
                  return (
                    <div className="eng-history-toolbar">
                      <span className="eng-history-count">
                        {visibleCount} run{visibleCount !== 1 ? 's' : ''}
                        {showHidden && hiddenCount > 0 && (
                          <span className="eng-history-hidden-count">
                            {' + '}{hiddenCount} hidden
                          </span>
                        )}
                      </span>
                      <div className="eng-history-toolbar-right">
                        <label className="eng-history-toggle">
                          <input
                            type="checkbox"
                            checked={showHidden}
                            onChange={() => setShowHidden(h => !h)}
                          />
                          <span>Show hidden</span>
                        </label>
                        <button className="eng-btn" onClick={fetchHistory} disabled={historyLoading}>
                          {historyLoading ? 'Refreshing...' : 'Refresh'}
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* ── Run list ── */}
                {historyRuns.map(run => {
                  const isExpanded = expandedRunId === run.id;
                  const statusLabel = STATUS_LABELS[run.status];
                  const preview = extractPreview(run.outputSummary) || extractPreview(run.errorsEncountered);

                  return (
                    <div
                      key={run.id}
                      className={`eng-history-row ${run.hidden ? 'eng-history-row-hidden' : ''}`}
                      data-status={run.status}
                    >
                      {/* ── Collapsed header ── */}
                      <div
                        className={`eng-history-row-header ${isExpanded ? 'eng-history-row-header-active' : ''}`}
                        onClick={() => setExpandedRunId(isExpanded ? null : run.id)}
                      >
                        <span className="eng-history-chevron">{isExpanded ? '\u25BC' : '\u25B6'}</span>
                        <span className="eng-history-pill" data-status={run.status}>
                          {statusLabel}
                        </span>
                        <span className="eng-history-engineer">{run.engineerId}</span>
                        {run.workflowId && (
                          <span className="eng-history-workflow">{run.workflowId}</span>
                        )}
                        <span className="eng-history-trigger" data-trigger={run.triggerType}>
                          {run.triggerType}
                        </span>
                        {run.hidden && <span className="eng-history-badge-hidden">HIDDEN</span>}
                        <span className="eng-history-spacer" />
                        <span className="eng-history-duration">{formatDuration(run.durationMs)}</span>
                        <span className="eng-history-time">{formatTime(run.completedAt || run.startedAt || run.createdAt)}</span>
                      </div>

                      {/* ── Preview line (only when collapsed) ── */}
                      {!isExpanded && preview && (
                        <div
                          className="eng-history-preview"
                          onClick={() => setExpandedRunId(run.id)}
                        >
                          {preview}{preview.length >= 120 ? '...' : ''}
                        </div>
                      )}

                      {/* ── Expanded details ── */}
                      {isExpanded && (
                        <div className="eng-history-details">
                          {/* Meta grid */}
                          <div className="eng-history-meta">
                            <div className="eng-history-meta-item">
                              <span className="eng-history-meta-label">Trigger</span>
                              <span className="eng-history-meta-value">{run.triggerReason || run.triggerType}</span>
                            </div>
                            <div className="eng-history-meta-item">
                              <span className="eng-history-meta-label">Started</span>
                              <span className="eng-history-meta-value">{run.startedAt ? new Date(run.startedAt).toLocaleString() : '\u2014'}</span>
                            </div>
                            <div className="eng-history-meta-item">
                              <span className="eng-history-meta-label">Duration</span>
                              <span className="eng-history-meta-value">{formatDuration(run.durationMs)}</span>
                            </div>
                            {run.patchesApplied > 0 && (
                              <div className="eng-history-meta-item">
                                <span className="eng-history-meta-label">Patches</span>
                                <span className="eng-history-meta-value">{run.patchesApplied}</span>
                              </div>
                            )}
                          </div>

                          {/* Output */}
                          {run.outputSummary && (
                            <div className="eng-history-section">
                              <div className="eng-history-section-label">Output</div>
                              <pre className="eng-history-output">{run.outputSummary}</pre>
                            </div>
                          )}

                          {/* Error */}
                          {run.errorsEncountered && (
                            <div className="eng-history-section">
                              <div className="eng-history-section-label eng-history-section-label-error">Error</div>
                              <pre className="eng-history-output eng-history-error">{run.errorsEncountered}</pre>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="eng-history-actions">
                            <button
                              className="eng-btn eng-btn-ghost"
                              onClick={(e) => { e.stopPropagation(); openFullReport(run.id); }}
                            >
                              {fullReportLoading ? '...' : 'View Full'}
                            </button>
                            <button
                              className="eng-btn eng-btn-ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/api/engineers/report?runId=${run.id}`, '_blank');
                              }}
                            >
                              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <path d="M14 2v6h6" />
                                <path d="M12 18v-6" />
                                <path d="M9 15l3 3 3-3" />
                              </svg>
                              PDF
                            </button>
                            <span className="eng-history-spacer" />
                            {run.hidden ? (
                              <button
                                className="eng-btn eng-btn-ghost"
                                onClick={(e) => { e.stopPropagation(); handleHideRun(run.id, false); }}
                              >
                                Unhide
                              </button>
                            ) : (
                              <button
                                className="eng-btn eng-btn-ghost"
                                onClick={(e) => { e.stopPropagation(); handleHideRun(run.id, true); }}
                              >
                                Hide
                              </button>
                            )}
                            <button
                              className="eng-btn eng-btn-danger"
                              onClick={(e) => { e.stopPropagation(); handleDeleteRun(run.id); }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Empty state when only hidden exist but toggle is off */}
                {historyRuns.length === 0 && showHidden && (
                  <div className="eng-empty">
                    <div>No hidden runs found for {selectedTicker}.</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ PMS TAB ══ */}
        {activeTab === 'pms' && (
          <div className="eng-pms-tab">
            {/* KPI Bar */}
            <div className="eng-pms-kpi-bar">
              <div className="eng-kpi-bar-cell">
                <div className="eng-kpi-bar-value" data-color="gold">{divisionLeads.length}</div>
                <div className="eng-kpi-bar-label">Divisions</div>
              </div>
              <div className="eng-kpi-bar-cell">
                <div className="eng-kpi-bar-value" data-color="cyan">
                  {divisionLeads.reduce((sum, d) => sum + d.engineerCount, 0)}
                </div>
                <div className="eng-kpi-bar-label">Total Engineers</div>
              </div>
              <div className="eng-kpi-bar-cell">
                <div className="eng-kpi-bar-value" data-color="mint">
                  {divisionLeads.filter(d => d.engineerCount > 0).length}
                </div>
                <div className="eng-kpi-bar-label">Active Teams</div>
              </div>
              <div className="eng-kpi-bar-cell">
                <div className="eng-kpi-bar-value" data-color="violet">
                  {Math.round(divisionLeads.reduce((sum, d) => sum + d.engineerCount, 0) / divisionLeads.filter(d => d.engineerCount > 0).length) || 0}
                </div>
                <div className="eng-kpi-bar-label">Avg Team Size</div>
              </div>
              <div className="eng-kpi-bar-cell">
                <div className="eng-kpi-bar-value" data-color="coral">
                  {uniqueWorkflows}
                </div>
                <div className="eng-kpi-bar-label">Total Workflows</div>
              </div>
            </div>

            {/* Decision Queue */}
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="gold" />
              <span className="eng-section-label">Decision Queue</span>
              <span className="eng-section-line" />
            </div>
            <DecisionDashboard />

            {/* Division Cards */}
            <div className="eng-section-header">
              <span className="eng-section-dot" data-color="cyan" />
              <span className="eng-section-label">Division Leads</span>
              <span className="eng-section-line" />
            </div>
            <div className="eng-pms-grid">
              {divisionLeads.map(div => {
                // Find engineers under this division
                const divEngineers = engineers.filter(eng => {
                  const engNode = orgNodes.find(n => n.engineerId === eng.id);
                  return engNode?.parentId === div.id;
                });
                const divWorkflowCount = new Set(divEngineers.flatMap(e => e.workflowIds)).size;
                const divScheduledCount = statuses.filter(s =>
                  divEngineers.some(e => e.id === s.engineer.id) && s.schedule?.enabled
                ).length;
                const divRunningCount = divEngineers.filter(e => runningIds.has(e.id)).length;
                const divCategories = [...new Set(divEngineers.map(e => e.category))];

                return (
                  <div
                    key={div.id}
                    className="eng-pm-card"
                    style={{ '--div-color': div.color } as React.CSSProperties}
                  >
                    {/* Card Header */}
                    <div className="eng-pm-card-header">
                      <div className="eng-division-card-badge" style={{ background: `${div.color}18`, color: div.color }}>
                        {div.badge}
                      </div>
                      <div className="eng-pm-card-title">
                        <div className="eng-division-card-name">{div.label}</div>
                        <div className="eng-division-card-role">{div.role}</div>
                      </div>
                      {divRunningCount > 0 && (
                        <span className="eng-pm-running-badge">
                          {divRunningCount} running
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {div.description && (
                      <div className="eng-pm-card-desc">{div.description}</div>
                    )}

                    {/* Mini KPIs */}
                    <div className="eng-pm-card-metrics">
                      <div className="eng-pm-metric">
                        <span className="eng-pm-metric-value" style={{ color: div.color }}>{div.engineerCount}</span>
                        <span className="eng-pm-metric-label">Engineers</span>
                      </div>
                      <div className="eng-pm-metric">
                        <span className="eng-pm-metric-value">{divWorkflowCount}</span>
                        <span className="eng-pm-metric-label">Workflows</span>
                      </div>
                      <div className="eng-pm-metric">
                        <span className="eng-pm-metric-value">{divScheduledCount}</span>
                        <span className="eng-pm-metric-label">Scheduled</span>
                      </div>
                      <div className="eng-pm-metric">
                        <span className="eng-pm-metric-value">{divCategories.length}</span>
                        <span className="eng-pm-metric-label">Categories</span>
                      </div>
                    </div>

                    {/* Engineer List */}
                    {divEngineers.length > 0 ? (
                      <div className="eng-pm-engineer-list">
                        <div className="eng-pm-engineer-list-title">Managed Engineers</div>
                        {divEngineers.map(eng => {
                          const engStatus = statuses.find(s => s.engineer.id === eng.id);
                          const isRunning = runningIds.has(eng.id);
                          const dotStatus = isRunning || engStatus?.lastRun?.status === 'running'
                            ? 'running'
                            : engStatus?.schedule?.enabled ? 'active' : 'idle';

                          return (
                            <div
                              key={eng.id}
                              className="eng-pm-engineer-row"
                              onClick={() => setSelectedNode(eng.id)}
                            >
                              <span className="eng-status-dot" data-status={dotStatus} />
                              <span className="eng-pm-engineer-name">{eng.name}</span>
                              <span className="eng-pm-engineer-role">{eng.role}</span>
                              <span className="eng-pm-engineer-interval">
                                {formatInterval(eng.defaultIntervalMinutes)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="eng-pm-no-engineers">
                        No engineers managed — this division focuses on infrastructure and coordination.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ OPERATIONS TAB ══ */}
        {activeTab === 'operations' && (
          <OperationsPipeline />
        )}

        {loading && (
          <div className="eng-loading">
            <div className="eng-spinner" />
          </div>
        )}
      </div>

      {/* Full Report Modal */}
      {fullReport && (
        <div className="eng-modal-overlay" onClick={() => setFullReport(null)}>
          <div className="eng-modal" onClick={(e) => e.stopPropagation()}>
            <div className="eng-modal-header">
              <h2 className="eng-modal-title">Full Report</h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="eng-btn eng-btn-pdf"
                  onClick={() => window.open(`/api/engineers/report?runId=${fullReport.runId}`, '_blank')}
                  title="Download as PDF"
                >
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M12 18v-6" />
                    <path d="M9 15l3 3 3-3" />
                  </svg>
                  PDF
                </button>
                <button className="eng-modal-close" onClick={() => setFullReport(null)}>
                  &times;
                </button>
              </div>
            </div>
            <div className="eng-modal-body">
              {fullReport.output && (
                <div className="eng-modal-section">
                  <div className="eng-modal-heading">Output</div>
                  <pre className="eng-modal-prompt">{fullReport.output}</pre>
                </div>
              )}
              {fullReport.error && (
                <div className="eng-modal-section">
                  <div className="eng-modal-heading" style={{ color: 'var(--color-red, #ef4444)' }}>Error</div>
                  <pre className="eng-modal-prompt" style={{ color: 'var(--color-red, #ef4444)' }}>{fullReport.error}</pre>
                </div>
              )}
              {!fullReport.output && !fullReport.error && (
                <div className="eng-modal-section">
                  <div className="eng-modal-desc">No output recorded for this run.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prompt Preview Modal */}
      {promptPreview && (
        <div className="eng-modal-overlay" onClick={() => setPromptPreview(null)}>
          <div className="eng-modal" onClick={(e) => e.stopPropagation()}>
            <div className="eng-modal-header">
              <h2 className="eng-modal-title">
                {promptPreview.ticker} &mdash; {promptPreview.workflowName}
              </h2>
              <button className="eng-modal-close" onClick={() => setPromptPreview(null)}>
                &times;
              </button>
            </div>
            <div className="eng-modal-body">
              <div className="eng-modal-section">
                <div className="eng-modal-heading">Workflow Details</div>
                <div className="eng-modal-row">
                  <span className="eng-modal-label">Workflow</span>
                  <span className="eng-modal-value">{promptPreview.workflowName}</span>
                </div>
                <div className="eng-modal-row">
                  <span className="eng-modal-label">Ticker</span>
                  <span className="eng-modal-value">{promptPreview.ticker}</span>
                </div>
                <div className="eng-modal-row">
                  <span className="eng-modal-label">Type</span>
                  <span className="eng-modal-value">{promptPreview.requiresUserData ? 'Paste data' : 'Autonomous'}</span>
                </div>
                <div className="eng-modal-row">
                  <span className="eng-modal-label">Prompt length</span>
                  <span className="eng-modal-value">{(promptPreview.prompt.length / 1000).toFixed(1)}k chars</span>
                </div>
              </div>

              <div className="eng-modal-section">
                <div className="eng-modal-heading">Description</div>
                <div className="eng-modal-desc">
                  {promptPreview.workflowDescription}
                </div>
              </div>

              <div className="eng-modal-section">
                <div className="eng-modal-heading">Prompt Preview</div>
                <pre className="eng-modal-prompt">
                  {promptPreview.prompt.length > PROMPT_PREVIEW_LIMIT
                    ? promptPreview.prompt.slice(0, PROMPT_PREVIEW_LIMIT) + '\n\n[\u2026truncated \u2014 ' + ((promptPreview.prompt.length - PROMPT_PREVIEW_LIMIT) / 1000).toFixed(1) + 'k chars remaining]'
                    : promptPreview.prompt}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
