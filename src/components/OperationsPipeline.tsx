'use client';

import React, { useState } from 'react';
import { workflows } from '@/data/workflows';
import { PIPELINES } from '@/lib/derive-pipelines';

// ── Prompt lookup ────────────────────────────────────────────────────────────

/** Build a map from workflow id → resolved prompt text (template or first variant). */
const workflowPromptMap: Record<string, { name: string; prompt: string }> = {};
for (const wf of workflows) {
  const prompt = wf.promptTemplate ?? wf.variants?.[0]?.prompt;
  if (prompt) {
    workflowPromptMap[wf.id] = { name: wf.name, prompt };
  }
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

// ── Component ────────────────────────────────────────────────────────────────

export default function OperationsPipeline() {
  const [expandedId, setExpandedId] = useState<string | null>(
    PIPELINES[0]?.id ?? null,
  );
  // Track which step is showing its prompt, keyed as "pipelineId-stepIndex"
  const [promptOpen, setPromptOpen] = useState<string | null>(null);

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
                  <span className="dec-expand-icon">{isOpen ? '\u25B2' : '\u25BC'}</span>
                </div>
              </div>

              {/* Mini dot track — always visible */}
              <div className="ops-mini-track">
                {pipeline.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="ops-mini-line" data-color={pipeline.color} />}
                    <div
                      className="ops-mini-node"
                      data-color={DIVISION_COLOR[step.division] ?? 'sky'}
                      title={step.label}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Expanded body */}
              <div className={`dec-card-body-anim ${isOpen ? 'dec-body-open' : ''}`}>
                <div className="dec-card-body">
                  <div className="ops-steps">
                    {pipeline.steps.map((step, i) => {
                      const meta = STEP_TYPE_META[step.type];
                      const divColor = DIVISION_COLOR[step.division] ?? 'sky';

                      return (
                        <div key={i} className="ops-step">
                          {/* Vertical rail */}
                          <div className="ops-rail">
                            <div className="ops-node" data-color={divColor}>
                              <span className="ops-node-num">{i + 1}</span>
                            </div>
                            {i < pipeline.steps.length - 1 && (
                              <div className="ops-rail-line" data-color={pipeline.color} />
                            )}
                          </div>

                          {/* Step card */}
                          <div className="ops-step-card">
                            <div className="ops-step-header">
                              <span className="ops-step-name">{step.label}</span>
                              <span className={`ops-step-badge ${meta.badgeClass}`}>{meta.badge}</span>
                            </div>
                            <div className="ops-step-actor">
                              <span className="ops-step-actor-label">ACTOR</span>
                              <span className="ops-step-actor-value" data-color={divColor}>{step.actor}</span>
                              <span className="ops-step-div-tag" data-color={divColor}>{step.division}</span>
                            </div>
                            <div className="ops-step-desc">{step.description}</div>

                            {/* Prompt viewer toggle — only for steps with workflow IDs */}
                            {step.workflowIds && step.workflowIds.length > 0 && (() => {
                              const stepKey = `${pipeline.id}-${i}`;
                              const isPromptOpen = promptOpen === stepKey;
                              return (
                                <>
                                  <button
                                    className="ops-prompt-toggle"
                                    data-color={divColor}
                                    onClick={() => setPromptOpen(isPromptOpen ? null : stepKey)}
                                  >
                                    <span className="ops-prompt-toggle-icon">{isPromptOpen ? '\u25B4' : '\u25BE'}</span>
                                    {isPromptOpen ? 'Hide Prompt' : 'View Prompt'}
                                    <span className="ops-prompt-count">{step.workflowIds!.length}</span>
                                  </button>
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
