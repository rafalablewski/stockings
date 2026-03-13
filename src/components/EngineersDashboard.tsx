'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import type { EngineerTask } from '@/lib/engineers';

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

const categoryLabels: Record<string, string> = {
  research: 'Research Engineers',
  monitoring: 'Monitoring Engineers',
  intelligence: 'Intelligence Engineers',
  audit: 'Audit Engineers',
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function EngineersDashboard({ engineers, tickers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0] || 'ASTS');
  const [statuses, setStatuses] = useState<EngineerStatus[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningIds, setRunningIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'engineers' | 'history'>('engineers');

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
    setRunningIds(prev => new Set([...prev, engineerId]));
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
        <div className="eng-title">AI Engineers</div>
        <div className="eng-desc">
          Full-time AI engineers that work autonomously — monitoring filings,
          analyzing data, and updating research databases without manual prompts.
        </div>

        {/* KPI Strip */}
        <div className="eng-kpi-strip">
          <div className="eng-kpi">
            <div className="eng-kpi-value">{engineers.length}</div>
            <div className="eng-kpi-label">Engineers</div>
          </div>
          <div className="eng-kpi">
            <div className="eng-kpi-value">{scheduledCount}</div>
            <div className="eng-kpi-label">Active</div>
          </div>
          <div className="eng-kpi">
            <div className="eng-kpi-value">{completedCount}</div>
            <div className="eng-kpi-label">Completed</div>
          </div>
          <div className="eng-kpi">
            <div className="eng-kpi-value">{failedCount}</div>
            <div className="eng-kpi-label">Failed</div>
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

        {/* Tab strip */}
        <div className="eng-tab-strip">
          <button className="eng-tab" data-active={activeTab === 'engineers'} onClick={() => setActiveTab('engineers')}>
            Engineers<span className="eng-tab-count">{engineers.length}</span>
          </button>
          <button className="eng-tab" data-active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            Run History<span className="eng-tab-count">{history.length}</span>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="eng-feed">
        {/* Engineers tab */}
        {activeTab === 'engineers' && (
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

                      {/* Expanded */}
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

        {/* History tab */}
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
