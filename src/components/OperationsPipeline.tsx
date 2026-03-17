'use client';

import React, { useState } from 'react';
import { workflows } from '@/data/workflows';

// ── Static pipeline definitions ──────────────────────────────────────────────

interface PipelineStep {
  label: string;
  actor: string;
  division: string;
  description: string;
  type: 'trigger' | 'engineer' | 'review' | 'decision' | 'output';
  /** Workflow ID(s) whose prompt template is shown in the "View Prompt" panel */
  workflowIds?: string[];
}

interface Pipeline {
  id: string;
  name: string;
  description: string;
  color: 'mint' | 'gold' | 'violet';
  interval: string;
  steps: PipelineStep[];
}

const PIPELINES: Pipeline[] = [
  {
    id: 'sec-filing',
    name: 'SEC Filing Pipeline',
    description: 'EDGAR polling, filing analysis, and database ingestion',
    color: 'mint',
    interval: '60 min',
    steps: [
      {
        label: 'EDGAR Poll',
        actor: 'Cron Scheduler',
        division: 'system',
        description: 'Triggers every 60 min — checks SEC EDGAR for new filings across tracked tickers',
        type: 'trigger',
      },
      {
        label: 'Filing Scanner',
        actor: 'Filing Engineer',
        division: 'gemini',
        description: 'Scans EDGAR API, identifies new/untracked filings, produces filing coverage report',
        type: 'engineer',
        workflowIds: ['sec-filing-delta', 'sec-filing-scan'],
      },
      {
        label: 'AI Auto-Review',
        actor: 'Gemini AI',
        division: 'gemini',
        description: 'Gemini AI validates scan output quality — approves or rejects before chaining forward',
        type: 'review',
      },
      {
        label: 'PM Decision Gate',
        actor: 'Gemini PM',
        division: 'gemini',
        description: 'Decision created in PM Dashboard (sec-filing-review category). Auto-approved chains forward',
        type: 'decision',
      },
      {
        label: 'DB Ingestor',
        actor: 'SEC DB Ingestor',
        division: 'claude',
        description: '7-phase deep analysis: materiality triage, form-type extraction, cross-filing correlation, conflict detection, patch generation, pre-write gate, executive summary',
        type: 'engineer',
        workflowIds: ['sec-db-ingest'],
      },
      {
        label: 'Boss Decision Gate',
        actor: 'Claude PM',
        division: 'claude',
        description: 'Data patches created in PM Dashboard (data-patch category). Requires Boss approval before apply',
        type: 'decision',
      },
      {
        label: 'Apply Patches',
        actor: 'System',
        division: 'system',
        description: 'Validated patches written to database — capital, financials, timeline, catalysts, risk entries',
        type: 'output',
      },
    ],
  },
  {
    id: 'prompt-audit',
    name: 'Prompt Audit Pipeline',
    description: 'Codebase drift detection and prompt template remediation',
    color: 'gold',
    interval: '24 hr',
    steps: [
      {
        label: 'Daily Trigger',
        actor: 'Cron Scheduler',
        division: 'system',
        description: 'Fires daily — initiates full scan of all workflow prompts against live codebase',
        type: 'trigger',
      },
      {
        label: 'Prompt Auditor',
        actor: 'Prompt Auditor',
        division: 'bobman',
        description: 'Scans every workflow prompt template, inventories codebase features, diffs for drift',
        type: 'engineer',
        workflowIds: ['prompt-audit'],
      },
      {
        label: 'Prompt Remediation',
        actor: 'Remediation Engineer',
        division: 'maszka',
        description: 'Receives drift findings, generates anchor-based text patches for prompt templates',
        type: 'engineer',
        workflowIds: ['prompt-remediation'],
      },
      {
        label: 'PM Decision Gate',
        actor: 'Maszka PM',
        division: 'maszka',
        description: 'Prompt patches routed to PM Dashboard (prompt-patch category). Requires Boss approval',
        type: 'decision',
      },
      {
        label: 'Apply Patches',
        actor: 'System',
        division: 'system',
        description: 'Approved patches applied to workflows.ts prompt templates',
        type: 'output',
      },
    ],
  },
  {
    id: 'doc-review',
    name: 'Doc Review Pipeline',
    description: 'Documentation gap analysis and style guide enforcement',
    color: 'violet',
    interval: '24 hr',
    steps: [
      {
        label: 'Daily Trigger',
        actor: 'Cron Scheduler',
        division: 'system',
        description: 'Fires daily — scans recent code changes for documentation and style guide gaps',
        type: 'trigger',
      },
      {
        label: 'Documentation Review',
        actor: 'Doc Reviewer',
        division: 'bobman',
        description: 'Reviews diffs, identifies doc gaps, audits style guides, maintains changelogs',
        type: 'engineer',
        workflowIds: ['doc-review'],
      },
      {
        label: 'UX/UI Implementation',
        actor: 'UX/UI Engineer',
        division: 'maszka',
        description: 'Receives audit report, implements style/theme changes or creates counter-proposals',
        type: 'engineer',
        workflowIds: ['ux-ui-implementation'],
      },
      {
        label: 'PM Decision Gate',
        actor: 'Maszka PM',
        division: 'maszka',
        description: 'UI changes routed to PM Dashboard for approval/rejection',
        type: 'decision',
      },
      {
        label: 'Changes Merged',
        actor: 'System',
        division: 'system',
        description: 'Approved style guide updates and documentation changes merged',
        type: 'output',
      },
    ],
  },
];

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

// ── Component ─────────────────────────────────────────────────────────────────

/** Build a map from workflow id → resolved prompt text (template or first variant). */
const workflowPromptMap: Record<string, { name: string; prompt: string }> = {};
for (const wf of workflows) {
  const prompt = wf.promptTemplate ?? wf.variants?.[0]?.prompt;
  if (prompt) {
    workflowPromptMap[wf.id] = { name: wf.name, prompt };
  }
}

export default function OperationsPipeline() {
  const [expandedId, setExpandedId] = useState<string | null>('sec-filing');
  // Track which step is showing its prompt, keyed as "pipelineId-stepIndex"
  const [promptOpen, setPromptOpen] = useState<string | null>(null);

  return (
    <div className="ops-wrap">
      {/* Section header — matches eng-detail-section-title style */}
      <div className="ops-section-label">OPERATION PIPELINES</div>
      <div className="ops-section-desc">
        How data flows from trigger to database — each pipeline is a multi-step chain of engineers, AI reviews, and PM approval gates.
      </div>

      {/* Pipeline cards — swimlane-style */}
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
              {/* Header row — matches dec-card-header */}
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
                      data-color={DIVISION_COLOR[step.division]}
                      title={step.label}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Expanded body — uses dec-card-body-anim for consistent animation */}
              <div className={`dec-card-body-anim ${isOpen ? 'dec-body-open' : ''}`}>
                <div className="dec-card-body">
                  <div className="ops-steps">
                    {pipeline.steps.map((step, i) => {
                      const meta = STEP_TYPE_META[step.type];
                      const divColor = DIVISION_COLOR[step.division];

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
