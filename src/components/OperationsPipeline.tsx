'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RunInfo {
  id: number;
  status: string;
  triggerType: string;
  triggerReason: string | null;
  outputSummary: string | null;
  durationMs: number | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  patchesApplied: number;
}

interface DecisionInfo {
  id: number;
  status: string;
  category: string;
  title: string;
  pm: string;
  pmNotes: string | null;
  bossNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface StepInstance {
  engineerId: string;
  label: string;
  run: RunInfo | null;
  decision: DecisionInfo | null;
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

interface PipelineDef {
  id: string;
  name: string;
  steps: Array<{ engineerId: string; label: string }>;
}

// ── Status config ─────────────────────────────────────────────────────────────

const OP_STATUS: Record<string, { color: string; bg: string; label: string; pulse?: boolean }> = {
  'completed':   { color: '#7ee787', bg: 'rgba(126, 231, 135, 0.12)', label: 'Completed' },
  'in-progress': { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', label: 'In Progress', pulse: true },
  'failed':      { color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)', label: 'Failed' },
  'blocked':     { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', label: 'Awaiting Approval', pulse: true },
};

const STEP_STATUS: Record<string, { color: string; icon: string }> = {
  'completed': { color: '#7ee787', icon: '\u2713' },
  'running':   { color: '#fbbf24', icon: '\u25B6' },
  'failed':    { color: '#f87171', icon: '\u2717' },
  'waiting':   { color: 'rgba(255,255,255,0.2)', icon: '\u2022' },
  'blocked':   { color: '#fb923c', icon: '\u23F8' },
  'skipped':   { color: 'rgba(255,255,255,0.1)', icon: '\u2014' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(ms: number | null): string {
  if (!ms) return '-';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function formatTimeAgo(date: string | null): string {
  if (!date) return '-';
  const diff = Date.now() - new Date(date).getTime();
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function pipelineShortName(name: string): string {
  // "SEC Filing Engineer → SEC DB Ingestor" → "SEC Filing Pipeline"
  const first = name.split(' → ')[0];
  if (first.includes('Filing')) return 'SEC Filing Pipeline';
  if (first.includes('Prompt')) return 'Prompt Audit Pipeline';
  if (first.includes('Doc')) return 'Doc Review Pipeline';
  return first + ' Pipeline';
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  ticker: string;
}

export default function OperationsPipeline({ ticker }: Props) {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [pipelines, setPipelines] = useState<PipelineDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOp, setExpandedOp] = useState<number | null>(null);
  const [filterPipeline, setFilterPipeline] = useState<string | null>(null);

  const fetchOps = useCallback(async () => {
    try {
      const res = await authFetch(`/api/operations?ticker=${ticker}&limit=20`);
      const data = await res.json();
      setOperations(data.operations || []);
      setPipelines(data.pipelines || []);
    } catch {
      console.error('Failed to fetch operations');
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => { fetchOps(); }, [fetchOps]);

  // Auto-refresh every 30s for live operations
  useEffect(() => {
    const interval = setInterval(fetchOps, 30_000);
    return () => clearInterval(interval);
  }, [fetchOps]);

  const filtered = filterPipeline
    ? operations.filter(op => op.pipelineId === filterPipeline)
    : operations;

  const counts = {
    total: operations.length,
    completed: operations.filter(o => o.status === 'completed').length,
    active: operations.filter(o => o.status === 'in-progress').length,
    blocked: operations.filter(o => o.status === 'blocked').length,
    failed: operations.filter(o => o.status === 'failed').length,
  };

  if (loading) {
    return <div className="ops-empty">Loading operations...</div>;
  }

  return (
    <div className="ops-container">
      {/* KPI strip */}
      <div className="ops-kpi-strip">
        <div className="ops-kpi">
          <span className="ops-kpi-value">{counts.total}</span>
          <span className="ops-kpi-label">Total Ops</span>
        </div>
        <div className="ops-kpi">
          <span className="ops-kpi-value" style={{ color: '#7ee787' }}>{counts.completed}</span>
          <span className="ops-kpi-label">Completed</span>
        </div>
        <div className="ops-kpi">
          <span className="ops-kpi-value" style={{ color: '#fbbf24' }}>{counts.active}</span>
          <span className="ops-kpi-label">Active</span>
        </div>
        <div className="ops-kpi">
          <span className="ops-kpi-value" style={{ color: '#fb923c' }}>{counts.blocked}</span>
          <span className="ops-kpi-label">Blocked</span>
        </div>
        <div className="ops-kpi">
          <span className="ops-kpi-value" style={{ color: '#f87171' }}>{counts.failed}</span>
          <span className="ops-kpi-label">Failed</span>
        </div>
      </div>

      {/* Pipeline filter */}
      {pipelines.length > 1 && (
        <div className="eng-view-toggle-bar">
          <button
            className={`eng-view-toggle ${!filterPipeline ? 'active' : ''}`}
            onClick={() => setFilterPipeline(null)}
          >
            All Pipelines
          </button>
          {pipelines.map(p => (
            <button
              key={p.id}
              className={`eng-view-toggle ${filterPipeline === p.id ? 'active' : ''}`}
              onClick={() => setFilterPipeline(p.id)}
            >
              {pipelineShortName(p.name)}
              <span className="ops-pipeline-steps">{p.steps.length} steps</span>
            </button>
          ))}
        </div>
      )}

      {/* Operation cards */}
      {filtered.length === 0 ? (
        <div className="ops-empty">
          No operations recorded yet. Run an engineer pipeline to see it here.
        </div>
      ) : (
        <div className="ops-list">
          {filtered.map((op, idx) => {
            const opSt = OP_STATUS[op.status] || OP_STATUS['completed'];
            const isExpanded = expandedOp === idx;

            return (
              <div
                key={idx}
                className={`ops-card ${op.status === 'in-progress' || op.status === 'blocked' ? 'ops-card-live' : ''}`}
              >
                {/* Card header */}
                <div className="ops-card-header" onClick={() => setExpandedOp(isExpanded ? null : idx)}>
                  <div className="ops-card-left">
                    <div
                      className={`ops-status-dot ${opSt.pulse ? 'ops-pulse' : ''}`}
                      style={{ background: opSt.color }}
                    />
                    <div>
                      <div className="ops-card-title">{pipelineShortName(op.pipelineName)}</div>
                      <div className="ops-card-meta">
                        {formatTimeAgo(op.startedAt)}
                        {op.completedAt && <> &middot; took {formatDuration(
                          new Date(op.completedAt).getTime() - new Date(op.startedAt || op.completedAt).getTime()
                        )}</>}
                      </div>
                    </div>
                  </div>
                  <div className="ops-card-right">
                    <span className="ops-status-badge" style={{ background: opSt.bg, color: opSt.color }}>
                      {opSt.label}
                    </span>
                    <span className="dec-expand-icon">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                  </div>
                </div>

                {/* Pipeline visualization (always visible) */}
                <div className="ops-pipeline-track">
                  {op.steps.map((step, si) => {
                    const ss = STEP_STATUS[step.status];
                    return (
                      <React.Fragment key={si}>
                        {si > 0 && (
                          <div
                            className="ops-connector"
                            style={{
                              background: step.status === 'waiting' || step.status === 'skipped'
                                ? 'rgba(255,255,255,0.06)'
                                : ss.color,
                            }}
                          />
                        )}
                        <div className="ops-step" title={`${step.label}: ${step.status}`}>
                          <div
                            className={`ops-step-dot ${step.status === 'running' ? 'ops-pulse' : ''}`}
                            style={{ background: ss.color, borderColor: ss.color }}
                          >
                            <span className="ops-step-icon">{ss.icon}</span>
                          </div>
                          <span className="ops-step-label">{step.label.replace(/ Engineer$/, '').replace(/^SEC /, '')}</span>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Expanded detail */}
                <div className={`dec-card-body-anim ${isExpanded ? 'dec-body-open' : ''}`}>
                  <div className="ops-detail">
                    {op.steps.map((step, si) => {
                      const ss = STEP_STATUS[step.status];
                      return (
                        <div key={si} className="ops-step-detail">
                          <div className="ops-step-detail-header">
                            <span className="ops-step-detail-num" style={{ color: ss.color }}>
                              {si + 1}
                            </span>
                            <span className="ops-step-detail-name">{step.label}</span>
                            <span className="ops-step-detail-status" style={{ color: ss.color }}>
                              {step.status}
                            </span>
                          </div>

                          {/* Run info */}
                          {step.run && (
                            <div className="ops-step-info">
                              <div className="ops-step-info-row">
                                <span className="ops-info-label">Run #{step.run.id}</span>
                                <span className="ops-info-value">
                                  {step.run.triggerType}
                                  {step.run.durationMs != null && <> &middot; {formatDuration(step.run.durationMs)}</>}
                                </span>
                              </div>
                              {step.run.triggerReason && (
                                <div className="ops-step-info-row">
                                  <span className="ops-info-label">Trigger</span>
                                  <span className="ops-info-value ops-info-mono">{step.run.triggerReason}</span>
                                </div>
                              )}
                              {step.run.outputSummary && (
                                <div className="ops-step-info-row">
                                  <span className="ops-info-label">Output</span>
                                  <span className="ops-info-value">{step.run.outputSummary}</span>
                                </div>
                              )}
                              {step.run.patchesApplied > 0 && (
                                <div className="ops-step-info-row">
                                  <span className="ops-info-label">Patches</span>
                                  <span className="ops-info-value" style={{ color: '#7ee787' }}>
                                    {step.run.patchesApplied} applied
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Decision info */}
                          {step.decision && (
                            <div className="ops-step-decision">
                              <div className="ops-step-info-row">
                                <span className="ops-info-label">Decision</span>
                                <span className="ops-info-value">
                                  <span className="ops-decision-status" data-status={step.decision.status}>
                                    {step.decision.status}
                                  </span>
                                  &nbsp;by {step.decision.pm}
                                </span>
                              </div>
                              {step.decision.pmNotes && (
                                <div className="ops-step-info-row">
                                  <span className="ops-info-label">PM Notes</span>
                                  <span className="ops-info-value">{step.decision.pmNotes.slice(0, 200)}</span>
                                </div>
                              )}
                              {step.decision.category && (
                                <div className="ops-step-info-row">
                                  <span className="ops-info-label">Category</span>
                                  <span className="ops-info-value ops-info-mono">{step.decision.category}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* No run yet */}
                          {!step.run && step.status === 'waiting' && (
                            <div className="ops-step-waiting">Waiting for previous step to complete</div>
                          )}
                          {!step.run && step.status === 'skipped' && (
                            <div className="ops-step-waiting">Skipped — previous step failed</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
