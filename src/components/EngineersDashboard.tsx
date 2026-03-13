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

const categoryColors: Record<string, string> = {
  research: 'text-emerald-400',
  monitoring: 'text-blue-400',
  intelligence: 'text-amber-400',
  audit: 'text-violet-400',
};

const statusColors: Record<string, string> = {
  completed: 'text-emerald-400',
  running: 'text-blue-400',
  failed: 'text-red-400',
  queued: 'text-amber-400',
  cancelled: 'text-white/30',
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

  // Fetch status
  const fetchStatus = useCallback(async () => {
    try {
      const res = await authFetch(`/api/engineers/status?ticker=${selectedTicker}`);
      if (res.ok) {
        const data = await res.json();
        setStatuses(data.engineers || []);
      }
    } catch {
      // silently fail on status fetch
    } finally {
      setLoading(false);
    }
  }, [selectedTicker]);

  // Fetch history
  const fetchHistory = useCallback(async () => {
    try {
      const res = await authFetch(`/api/engineers/history?ticker=${selectedTicker}&limit=25`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.runs || []);
      }
    } catch {
      // silently fail
    }
  }, [selectedTicker]);

  useEffect(() => {
    setLoading(true);
    fetchStatus();
    fetchHistory();
  }, [fetchStatus, fetchHistory]);

  // Trigger a manual run
  const handleRun = async (engineerId: string) => {
    setRunningIds(prev => new Set([...prev, engineerId]));
    try {
      const res = await authFetch('/api/engineers/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: selectedTicker,
          engineerId,
          triggerReason: 'Manual trigger from Engineers dashboard',
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Run failed' }));
        console.error('Run failed:', err.error);
      }
      // Refresh status after run
      await fetchStatus();
      await fetchHistory();
    } catch (err) {
      console.error('Run error:', err);
    } finally {
      setRunningIds(prev => {
        const next = new Set(prev);
        next.delete(engineerId);
        return next;
      });
    }
  };

  // Toggle schedule
  const handleToggleSchedule = async (engineerId: string, currentEnabled: boolean, intervalMinutes: number) => {
    try {
      await authFetch('/api/engineers/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: selectedTicker,
          engineerId,
          enabled: !currentEnabled,
          intervalMinutes,
        }),
      });
      await fetchStatus();
    } catch (err) {
      console.error('Schedule toggle error:', err);
    }
  };

  // Enable schedule for the first time
  const handleEnableSchedule = async (engineer: EngineerTask) => {
    try {
      await authFetch('/api/engineers/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: selectedTicker,
          engineerId: engineer.id,
          enabled: true,
          intervalMinutes: engineer.defaultIntervalMinutes,
        }),
      });
      await fetchStatus();
    } catch (err) {
      console.error('Enable schedule error:', err);
    }
  };

  // Group engineers by category
  const grouped = engineers.reduce<Record<string, EngineerTask[]>>((acc, eng) => {
    if (!acc[eng.category]) acc[eng.category] = [];
    acc[eng.category].push(eng);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    research: 'Research Engineers',
    monitoring: 'Monitoring Engineers',
    intelligence: 'Intelligence Engineers',
    audit: 'Audit Engineers',
  };

  return (
    <div>
      {/* Ticker selector */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">Ticker</span>
        <div className="flex gap-2">
          {tickers.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTicker(t)}
              className={`px-4 py-1.5 text-[12px] font-mono font-medium rounded-lg transition-all ${
                selectedTicker === t
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-6 mb-8 border-b border-white/[0.06] pb-3">
        <button
          onClick={() => setActiveTab('engineers')}
          className={`text-[12px] uppercase tracking-[0.2em] pb-1 transition-colors ${
            activeTab === 'engineers'
              ? 'text-white border-b border-white/40'
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          Engineers ({engineers.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`text-[12px] uppercase tracking-[0.2em] pb-1 transition-colors ${
            activeTab === 'history'
              ? 'text-white border-b border-white/40'
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          Run History ({history.length})
        </button>
      </div>

      {/* Engineers tab */}
      {activeTab === 'engineers' && (
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, engs]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold ${categoryColors[category] || 'text-white/40'}`}>
                  {categoryLabels[category] || category}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <div className="space-y-3">
                {engs.map(eng => {
                  const status = statuses.find(s => s.engineer.id === eng.id);
                  const isRunning = runningIds.has(eng.id);
                  const isExpanded = expandedId === eng.id;

                  return (
                    <div
                      key={eng.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                    >
                      {/* Header row */}
                      <div className="flex items-start gap-4 p-5">
                        {/* Status indicator */}
                        <div className="mt-1.5 flex-shrink-0">
                          {isRunning || status?.lastRun?.status === 'running' ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                          ) : status?.schedule?.enabled ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[14px] font-medium text-white/90">{eng.name}</span>
                            <span className="text-[10px] font-mono text-white/25 uppercase">{eng.role}</span>
                          </div>
                          <p className="text-[12px] text-white/35 leading-relaxed">{eng.description}</p>

                          {/* Schedule + last run info */}
                          <div className="flex items-center gap-5 mt-3">
                            {status?.schedule ? (
                              <span className="text-[10px] text-white/25">
                                {status.schedule.enabled
                                  ? `Every ${formatInterval(status.schedule.intervalMinutes)}`
                                  : 'Paused'
                                }
                                {status.schedule.nextRunAt && status.schedule.enabled
                                  ? ` — next ${formatTime(status.schedule.nextRunAt)}`
                                  : ''
                                }
                              </span>
                            ) : (
                              <span className="text-[10px] text-white/15">Not scheduled</span>
                            )}
                            {status?.lastRun && (
                              <span className={`text-[10px] ${statusColors[status.lastRun.status] || 'text-white/25'}`}>
                                Last: {status.lastRun.status} {formatTime(status.lastRun.completedAt)} ({formatDuration(status.lastRun.durationMs)})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Schedule toggle */}
                          {status?.schedule ? (
                            <button
                              onClick={() => handleToggleSchedule(eng.id, status.schedule!.enabled, status.schedule!.intervalMinutes)}
                              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] font-medium rounded-lg border transition-all ${
                                status.schedule.enabled
                                  ? 'border-emerald-400/30 text-emerald-400/70 hover:bg-emerald-400/10'
                                  : 'border-white/10 text-white/25 hover:text-white/40 hover:border-white/20'
                              }`}
                            >
                              {status.schedule.enabled ? 'Active' : 'Paused'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEnableSchedule(eng)}
                              className="px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] font-medium rounded-lg border border-white/10 text-white/25 hover:text-white/40 hover:border-white/20 transition-all"
                            >
                              Schedule
                            </button>
                          )}

                          {/* Run now */}
                          <button
                            onClick={() => handleRun(eng.id)}
                            disabled={isRunning}
                            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] font-semibold rounded-lg border transition-all ${
                              isRunning
                                ? 'border-blue-400/30 text-blue-400/70 cursor-wait'
                                : 'border-white/20 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/[0.04]'
                            }`}
                          >
                            {isRunning ? 'Running...' : 'Run Now'}
                          </button>

                          {/* Expand */}
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : eng.id)}
                            className="p-1.5 text-white/20 hover:text-white/40 transition-colors"
                          >
                            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                              style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                            >
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="border-t border-white/[0.04] px-5 py-4 bg-white/[0.01]">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Capabilities */}
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 block mb-3">Capabilities</span>
                              <ul className="space-y-1.5">
                                {eng.capabilities.map((cap, i) => (
                                  <li key={i} className="text-[11px] text-white/40 flex items-start gap-2">
                                    <span className="text-white/15 mt-0.5">+</span>
                                    {cap}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Config */}
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 block mb-3">Configuration</span>
                              <div className="space-y-2 text-[11px]">
                                <div className="flex justify-between">
                                  <span className="text-white/25">Default interval</span>
                                  <span className="text-white/50 font-mono">{formatInterval(eng.defaultIntervalMinutes)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/25">Linked workflows</span>
                                  <span className="text-white/50 font-mono">{eng.workflowIds.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/25">Requires external data</span>
                                  <span className="text-white/50 font-mono">{eng.requiresData ? 'Yes' : 'No'}</span>
                                </div>
                                {eng.dataSource && (
                                  <div className="flex justify-between">
                                    <span className="text-white/25">Data source</span>
                                    <span className="text-white/50 font-mono text-right">{eng.dataSource}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-white/25">Trigger events</span>
                                  <span className="text-white/50 font-mono text-right">{eng.triggerEvents.join(', ')}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Last run output */}
                          {status?.lastRun?.outputSummary && (
                            <div className="mt-5 pt-4 border-t border-white/[0.04]">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 block mb-2">Last Run Output</span>
                              <pre className="text-[11px] text-white/40 whitespace-pre-wrap leading-relaxed font-mono bg-white/[0.02] rounded-lg p-3 max-h-48 overflow-y-auto">
                                {status.lastRun.outputSummary}
                              </pre>
                            </div>
                          )}

                          {/* Last run error */}
                          {status?.lastRun?.error && (
                            <div className="mt-3 p-3 rounded-lg bg-red-500/5 border border-red-400/10">
                              <span className="text-[10px] text-red-400/70 uppercase tracking-wider block mb-1">Error</span>
                              <span className="text-[11px] text-red-400/50">{status.lastRun.error}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History tab */}
      {activeTab === 'history' && (
        <div>
          {history.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[13px] text-white/25">No engineer runs recorded yet for {selectedTicker}.</p>
              <p className="text-[11px] text-white/15 mt-2">Run an engineer manually or enable a schedule to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map(run => (
                <div
                  key={run.id}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                >
                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    run.status === 'completed' ? 'bg-emerald-400/60'
                    : run.status === 'failed' ? 'bg-red-400/60'
                    : run.status === 'running' ? 'bg-blue-400 animate-pulse'
                    : 'bg-white/10'
                  }`} />

                  {/* Engineer name */}
                  <span className="text-[12px] font-medium text-white/70 w-44 truncate">
                    {engineers.find(e => e.id === run.engineerId)?.name || run.engineerId}
                  </span>

                  {/* Status */}
                  <span className={`text-[10px] uppercase tracking-wider font-mono w-20 ${statusColors[run.status] || 'text-white/25'}`}>
                    {run.status}
                  </span>

                  {/* Trigger type */}
                  <span className="text-[10px] text-white/20 font-mono w-20">
                    {run.triggerType}
                  </span>

                  {/* Duration */}
                  <span className="text-[10px] text-white/20 font-mono w-16 text-right">
                    {formatDuration(run.durationMs)}
                  </span>

                  {/* Time */}
                  <span className="text-[10px] text-white/15 ml-auto">
                    {formatTime(run.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-4 h-4 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
