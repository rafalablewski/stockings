'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import { workflows } from '@/data/workflows';
import { PIPELINES } from '@/lib/derive-pipelines';

// ── Props ────────────────────────────────────────────────────────────────────

interface OperationsPipelineProps {
  selectedTicker: string;
}

// ── Prompt lookup ────────────────────────────────────────────────────────────

const workflowPromptMap: Record<string, { name: string; prompt: string }> = {};
for (const wf of workflows) {
  const prompt = wf.promptTemplate ?? wf.variants?.[0]?.prompt;
  if (prompt) {
    workflowPromptMap[wf.id] = { name: wf.name, prompt };
  }
}

// ── Terminal log types ───────────────────────────────────────────────────────

interface TerminalLine {
  time: string;
  type: 'info' | 'success' | 'error' | 'warn' | 'step' | 'system';
  message: string;
}

interface PipelineRunState {
  pipelineId: string;
  running: boolean;
  activeStepIndex: number;   // which engineer step is executing (-1 = none)
  completedSteps: number[];  // step indices that completed
  failedSteps: number[];     // step indices that failed
  logs: TerminalLine[];
  durationMs?: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

const STEP_TYPE_META: Record<string, { badge: string; badgeClass: string }> = {
  trigger:  { badge: 'TRIGGER',  badgeClass: 'ops-badge-trigger' },
  engineer: { badge: 'ENGINEER', badgeClass: 'ops-badge-engineer' },
  review:   { badge: 'REVIEW',   badgeClass: 'ops-badge-review' },
  decision: { badge: 'GATE',     badgeClass: 'ops-badge-gate' },
  output:   { badge: 'OUTPUT',   badgeClass: 'ops-badge-output' },
};

const DIVISION_COLOR: Record<string, string> = {
  system: 'sky',
  gemini: 'mint',
  claude: 'cyan',
  bobman: 'gold',
  maszka: 'rose',
};

function timestamp(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function OperationsPipeline({ selectedTicker }: OperationsPipelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    PIPELINES[0]?.id ?? null,
  );
  const [promptOpen, setPromptOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Pipeline run states keyed by pipelineId
  const [runStates, setRunStates] = useState<Record<string, PipelineRunState>>({});
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  });

  const addLog = useCallback((pipelineId: string, type: TerminalLine['type'], message: string) => {
    setRunStates(prev => {
      const state = prev[pipelineId];
      if (!state) return prev;
      return {
        ...prev,
        [pipelineId]: {
          ...state,
          logs: [...state.logs, { time: timestamp(), type, message }],
        },
      };
    });
  }, []);

  const runPipeline = useCallback(async (pipelineId: string) => {
    const pipeline = PIPELINES.find(p => p.id === pipelineId);
    if (!pipeline) return;

    // Initialize run state
    setRunStates(prev => ({
      ...prev,
      [pipelineId]: {
        pipelineId,
        running: true,
        activeStepIndex: -1,
        completedSteps: [],
        failedSteps: [],
        logs: [{ time: timestamp(), type: 'system', message: `Starting pipeline: ${pipeline.name} for ${selectedTicker.toUpperCase()}` }],
      },
    }));

    // Auto-expand this pipeline
    setExpandedId(pipelineId);

    try {
      const res = await authFetch('/api/engineers/run-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: selectedTicker, pipelineId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        addLog(pipelineId, 'error', `Pipeline request failed: ${err.error || res.statusText}`);
        setRunStates(prev => ({
          ...prev,
          [pipelineId]: { ...prev[pipelineId], running: false },
        }));
        return;
      }

      // Parse SSE stream
      const reader = res.body?.getReader();
      if (!reader) {
        addLog(pipelineId, 'error', 'No response stream available');
        setRunStates(prev => ({
          ...prev,
          [pipelineId]: { ...prev[pipelineId], running: false },
        }));
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const event = JSON.parse(jsonStr);

            switch (event.type) {
              case 'pipeline:start':
                addLog(pipelineId, 'system', `Pipeline "${event.name}" — ${event.stepCount} engineer step${event.stepCount !== 1 ? 's' : ''}`);
                break;

              case 'step:start':
                setRunStates(prev => ({
                  ...prev,
                  [pipelineId]: { ...prev[pipelineId], activeStepIndex: event.stepIndex },
                }));
                addLog(pipelineId, 'step', `[Step ${event.stepIndex + 1}/${event.totalSteps}] ${event.label}`);
                break;

              case 'step:log':
                addLog(pipelineId, 'info', `  ${event.message}`);
                break;

              case 'step:complete':
                setRunStates(prev => {
                  const s = prev[pipelineId];
                  return {
                    ...prev,
                    [pipelineId]: {
                      ...s,
                      activeStepIndex: -1,
                      completedSteps: [...s.completedSteps, event.stepIndex],
                    },
                  };
                });
                addLog(pipelineId, 'success', `  Done (${(event.durationMs / 1000).toFixed(1)}s) — run #${event.runId}`);
                break;

              case 'step:error':
                setRunStates(prev => {
                  const s = prev[pipelineId];
                  return {
                    ...prev,
                    [pipelineId]: {
                      ...s,
                      activeStepIndex: -1,
                      failedSteps: [...s.failedSteps, event.stepIndex],
                    },
                  };
                });
                addLog(pipelineId, 'error', `  FAILED: ${event.error}`);
                break;

              case 'step:skip':
                addLog(pipelineId, 'warn', `  Skipped: ${event.label} — ${event.reason}`);
                break;

              case 'pipeline:complete':
                setRunStates(prev => ({
                  ...prev,
                  [pipelineId]: {
                    ...prev[pipelineId],
                    running: false,
                    activeStepIndex: -1,
                    durationMs: event.durationMs,
                  },
                }));
                if (event.stepsFailed > 0) {
                  addLog(pipelineId, 'error', `Pipeline finished — ${event.stepsCompleted} completed, ${event.stepsFailed} failed (${(event.durationMs / 1000).toFixed(1)}s)`);
                } else {
                  addLog(pipelineId, 'success', `Pipeline complete — ${event.stepsCompleted} steps in ${(event.durationMs / 1000).toFixed(1)}s`);
                }
                break;

              case 'pipeline:error':
                addLog(pipelineId, 'error', `Pipeline error: ${event.error}`);
                break;
            }
          } catch {
            // skip unparseable SSE lines
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      addLog(pipelineId, 'error', `Connection error: ${msg}`);
      setRunStates(prev => ({
        ...prev,
        [pipelineId]: { ...prev[pipelineId], running: false },
      }));
    }
  }, [selectedTicker, addLog]);

  return (
    <div className="ops-wrap">
      {/* Section header */}
      <div className="ops-section-label">OPERATION PIPELINES</div>
      <div className="ops-section-desc">
        How data flows from trigger to database — each pipeline is a multi-step chain of engineers, AI reviews, and PM approval gates.
        Pipelines are auto-derived from engineer definitions — add a new engineer and it appears here automatically.
      </div>

      {/* Pipeline cards */}
      <div className="ops-list">
        {PIPELINES.map(pipeline => {
          const isOpen = expandedId === pipeline.id;
          const runState = runStates[pipeline.id];
          const isRunning = runState?.running ?? false;
          // Map stepIndex from SSE (engineer-only index) to full pipeline step index
          const engineerStepIndices = pipeline.steps
            .map((s, i) => s.type === 'engineer' && s.engineerId ? i : -1)
            .filter(i => i >= 0);

          return (
            <div
              key={pipeline.id}
              className="ops-card"
              data-color={pipeline.color}
              data-expanded={isOpen}
            >
              {/* Header row */}
              <div
                className="ops-card-header"
                onClick={() => setExpandedId(isOpen ? null : pipeline.id)}
              >
                <div className="ops-card-left">
                  <div className="ops-card-badge" data-color={pipeline.color}>
                    {pipeline.steps.length}
                  </div>
                  <div>
                    <div className="ops-card-title">{pipeline.name}</div>
                    <div className="ops-card-meta">{pipeline.description}</div>
                  </div>
                </div>
                <div className="ops-card-right">
                  <span className="ops-interval-badge" data-color={pipeline.color}>
                    {pipeline.interval}
                  </span>
                  {/* Run Pipeline button */}
                  <button
                    className="ops-run-pipeline-btn"
                    data-color={pipeline.color}
                    data-state={isRunning ? 'running' : undefined}
                    disabled={isRunning}
                    onClick={(e) => {
                      e.stopPropagation();
                      runPipeline(pipeline.id);
                    }}
                  >
                    {isRunning ? (
                      <>
                        <span className="ops-run-pipeline-spinner" />
                        Running{'\u2026'}
                      </>
                    ) : (
                      <>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        Run Pipeline
                      </>
                    )}
                  </button>
                  <span className="dec-expand-icon">{isOpen ? '\u25B2' : '\u25BC'}</span>
                </div>
              </div>

              {/* Mini dot track — always visible, with active step highlighting */}
              <div className="ops-mini-track">
                {pipeline.steps.map((step, i) => {
                  // Determine status of this step node in the mini-track
                  const engIdx = engineerStepIndices.indexOf(i);
                  let nodeStatus: string | undefined;
                  if (runState) {
                    if (runState.activeStepIndex >= 0 && engineerStepIndices[runState.activeStepIndex] === i) {
                      nodeStatus = 'running';
                    } else if (runState.completedSteps.some(si => engineerStepIndices[si] === i)) {
                      nodeStatus = 'completed';
                    } else if (runState.failedSteps.some(si => engineerStepIndices[si] === i)) {
                      nodeStatus = 'failed';
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {i > 0 && <div className="ops-mini-line" data-color={pipeline.color} />}
                      <div
                        className="ops-mini-node"
                        data-color={DIVISION_COLOR[step.division] ?? 'sky'}
                        data-status={nodeStatus}
                        title={step.label}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Human-readable description — always visible below mini track */}
              {pipeline.humanDescription && (
                <div className="ops-human-desc">{pipeline.humanDescription}</div>
              )}

              {/* Terminal — shows when pipeline has run state */}
              {runState && runState.logs.length > 0 && (
                <div className="ops-terminal" data-color={pipeline.color}>
                  <div className="ops-terminal-header">
                    <span className="ops-terminal-title">
                      {isRunning && <span className="ops-terminal-live-dot" />}
                      Pipeline Log
                    </span>
                    {runState.durationMs != null && (
                      <span className="ops-terminal-duration">
                        {(runState.durationMs / 1000).toFixed(1)}s
                      </span>
                    )}
                    {!isRunning && (
                      <button
                        className="ops-terminal-clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRunStates(prev => {
                            const next = { ...prev };
                            delete next[pipeline.id];
                            return next;
                          });
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="ops-terminal-body" ref={isOpen ? terminalRef : undefined}>
                    {runState.logs.map((log, li) => (
                      <div key={li} className="ops-terminal-line" data-type={log.type}>
                        <span className="ops-terminal-time">{log.time}</span>
                        <span className="ops-terminal-msg">{log.message}</span>
                      </div>
                    ))}
                    {isRunning && (
                      <div className="ops-terminal-line ops-terminal-cursor" data-type="info">
                        <span className="ops-terminal-time">{timestamp()}</span>
                        <span className="ops-terminal-msg">{'\u2588'}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Expanded body */}
              <div className={`dec-card-body-anim ${isOpen ? 'dec-body-open' : ''}`}>
                <div className="dec-card-body">
                  <div className="ops-steps">
                    {pipeline.steps.map((step, i) => {
                      const meta = STEP_TYPE_META[step.type];
                      const divColor = DIVISION_COLOR[step.division] ?? 'sky';

                      // Step status from pipeline run
                      const engIdx = engineerStepIndices.indexOf(i);
                      let stepStatus: string | undefined;
                      if (runState) {
                        if (runState.activeStepIndex >= 0 && engineerStepIndices[runState.activeStepIndex] === i) {
                          stepStatus = 'running';
                        } else if (runState.completedSteps.some(si => engineerStepIndices[si] === i)) {
                          stepStatus = 'completed';
                        } else if (runState.failedSteps.some(si => engineerStepIndices[si] === i)) {
                          stepStatus = 'failed';
                        }
                      }

                      return (
                        <div key={i} className="ops-step" data-step-status={stepStatus}>
                          {/* Vertical rail */}
                          <div className="ops-rail">
                            <div className="ops-node" data-color={divColor} data-status={stepStatus}>
                              <span className="ops-node-num">{i + 1}</span>
                            </div>
                            {i < pipeline.steps.length - 1 && (
                              <div className="ops-rail-line" data-color={pipeline.color} />
                            )}
                          </div>

                          {/* Step card */}
                          <div className="ops-step-card" data-status={stepStatus}>
                            <div className="ops-step-header">
                              <span className="ops-step-name">{step.label}</span>
                              <span className={`ops-step-badge ${meta.badgeClass}`}>{meta.badge}</span>
                              {stepStatus === 'running' && <span className="ops-step-running-indicator" />}
                              {stepStatus === 'completed' && <span className="ops-step-check">{'\u2713'}</span>}
                              {stepStatus === 'failed' && <span className="ops-step-x">{'\u2717'}</span>}
                            </div>
                            <div className="ops-step-actor">
                              <span className="ops-step-actor-label">ACTOR</span>
                              <span className="ops-step-actor-value" data-color={divColor}>{step.actor}</span>
                              <span className="ops-step-div-tag" data-color={divColor}>{step.division}</span>
                            </div>
                            <div className="ops-step-desc">{step.description}</div>

                            {/* Prompt viewer — only for steps with workflow IDs */}
                            {step.workflowIds && step.workflowIds.length > 0 && (() => {
                              const stepKey = `${pipeline.id}-${i}`;
                              const isPromptOpen = promptOpen === stepKey;
                              const isCopied = copied === stepKey;
                              const handleCopy = () => {
                                const text = step.workflowIds!
                                  .map(wfId => workflowPromptMap[wfId]?.prompt)
                                  .filter(Boolean)
                                  .join('\n\n---\n\n');
                                navigator.clipboard.writeText(text).then(() => {
                                  setCopied(stepKey);
                                  setTimeout(() => setCopied(null), 2000);
                                });
                              };
                              return (
                                <>
                                  <div className="ops-prompt-actions">
                                    <button
                                      className="ops-prompt-toggle"
                                      data-color={divColor}
                                      onClick={() => setPromptOpen(isPromptOpen ? null : stepKey)}
                                    >
                                      <span className="ops-prompt-toggle-icon">{isPromptOpen ? '\u25B4' : '\u25BE'}</span>
                                      {isPromptOpen ? 'Hide Prompt' : 'View Prompt'}
                                      <span className="ops-prompt-count">{step.workflowIds!.length}</span>
                                    </button>
                                    <button
                                      className="ops-prompt-toggle ops-copy-btn"
                                      data-color={divColor}
                                      data-copied={isCopied || undefined}
                                      onClick={handleCopy}
                                    >
                                      {isCopied ? 'Copied' : 'Copy Prompt'}
                                    </button>
                                  </div>
                                  <div className={`ops-prompt-panel ${isPromptOpen ? 'ops-prompt-open' : ''}`}>
                                    {step.workflowIds!.map(wfId => {
                                      const entry = workflowPromptMap[wfId];
                                      if (!entry) return null;
                                      return (
                                        <div key={wfId} className="ops-prompt-block">
                                          <div className="ops-prompt-wf-header">
                                            <span className="ops-prompt-wf-id">{wfId}</span>
                                            <span className="ops-prompt-wf-name">{entry.name}</span>
                                          </div>
                                          <pre className="ops-prompt-text">{entry.prompt}</pre>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}

                            {/* Chain arrow for non-last steps */}
                            {i < pipeline.steps.length - 1 && (
                              <div className="ops-chain-arrow" data-color={pipeline.color} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
