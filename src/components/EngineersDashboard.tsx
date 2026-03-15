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
};

const categoryLabels: Record<string, string> = {
  research: 'Research',
  monitoring: 'Monitoring',
  intelligence: 'Intelligence',
  audit: 'Audit',
};

const categoryDescriptions: Record<string, string> = {
  research: 'Pressure-test theses, track capital structure, validate data quality',
  monitoring: 'Watch SEC filings, insider trades, and regulatory changes in real-time',
  intelligence: 'Track catalysts, aggregate sentiment, monitor press and news signals',
  audit: 'Validate database integrity, flag stale data, cross-reference consistency',
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
}: {
  engineer: EngineerTask;
  workflows: Workflow[];
  allEngineers: EngineerTask[];
  selectedTicker: string;
  status: EngineerStatus | undefined;
  isRunning: boolean;
  onClose: () => void;
  onRun: (engineerId: string) => void;
  onSchedule: (engineerId: string, enabled: boolean, interval: number) => void;
  onEnableSchedule: (engineer: EngineerTask) => void;
  onPromptPreview: (wf: Workflow, ticker: string, label: string) => void;
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
          <button
            className="eng-btn"
            data-variant="run"
            data-state={isRunning ? 'running' : undefined}
            onClick={() => onRun(engineer.id)}
            disabled={isRunning}
          >
            {isRunning ? 'Running\u2026' : 'Run Now'}
          </button>
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
          <div className="eng-detail-section-title">Last Run Output</div>
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
  const [activeTab, setActiveTab] = useState<'network' | 'history'>('network');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // ── Ticker dropdown state ──
  const [tickerDropdownOpen, setTickerDropdownOpen] = useState(false);
  const [tickerSearch, setTickerSearch] = useState('');
  const tickerDropdownRef = useRef<HTMLDivElement>(null);
  const tickerSearchRef = useRef<HTMLInputElement>(null);

  const [promptPreview, setPromptPreview] = useState<PromptPreview | null>(null);

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

  const handleRun = async (engineerId: string) => {
    setRunningIds(prev => { const next = new Set(prev); next.add(engineerId); return next; });
    try {
      await authFetch('/api/engineers/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, engineerId }),
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

  const categories = ['research', 'monitoring', 'intelligence', 'audit'] as const;

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
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="eng-feed">

        {/* ══ NETWORK GRAPH TAB — Category Swimlanes ══ */}
        {activeTab === 'network' && (
          <div>
            {/* Swimlanes */}
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
                          {/* Engineer name + role */}
                          <div className="eng-swim-card-header">
                            <div className="eng-swim-card-icon" data-color={color}>{'\u2B22'}</div>
                            <div>
                              <div className="eng-swim-card-name">{eng.name}</div>
                              <div className="eng-swim-card-role">{eng.role}</div>
                            </div>
                          </div>

                          {/* Workflow badges */}
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

                          {/* Trigger badges */}
                          <div className="eng-swim-card-badges">
                            <span className="eng-swim-badge-label">Triggers</span>
                            {eng.triggerEvents.map(ev => {
                              // Check if this trigger is shared cross-category
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

                          {/* Data source badge */}
                          {eng.requiresData && eng.dataSource && (
                            <div className="eng-swim-card-badges">
                              <span className="eng-swim-badge-label">Data</span>
                              <span className="eng-swim-badge" data-type="datasource">
                                {eng.dataSource}
                              </span>
                            </div>
                          )}

                          {/* Schedule */}
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
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ HISTORY TAB ══ */}
        {activeTab === 'history' && (
          <div>
            <div className="eng-empty">
              <div>No operations history recorded yet for {selectedTicker}.</div>
              <div className="eng-empty-sub">
                History will appear here as agents execute tasks — showing comprehensive
                descriptions of each operation, its inputs, outputs, and duration.
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="eng-loading">
            <div className="eng-spinner" />
          </div>
        )}
      </div>

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
