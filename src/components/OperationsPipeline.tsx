'use client';

import React, { useState } from 'react';

// ── Static pipeline definitions ──────────────────────────────────────────────

interface PipelineStep {
  label: string;
  actor: string;
  actorColor: string;
  description: string;
  type: 'trigger' | 'engineer' | 'review' | 'decision' | 'output';
}

interface Pipeline {
  id: string;
  name: string;
  icon: string;
  accent: string;
  steps: PipelineStep[];
}

const PIPELINES: Pipeline[] = [
  {
    id: 'sec-filing',
    name: 'SEC Filing Pipeline',
    icon: '\u{1F4C4}',
    accent: '#34d399',
    steps: [
      {
        label: 'EDGAR Poll',
        actor: 'Schedule',
        actorColor: '#94a3b8',
        description: 'Cron triggers every 60 min — checks SEC EDGAR for new filings',
        type: 'trigger',
      },
      {
        label: 'Filing Scanner',
        actor: 'Gemini Division',
        actorColor: '#34d399',
        description: 'Scans EDGAR API, identifies new/untracked filings, produces coverage report',
        type: 'engineer',
      },
      {
        label: 'Gemini Auto-Review',
        actor: 'Gemini AI',
        actorColor: '#34d399',
        description: 'Gemini AI validates scan output — approves or rejects before chaining',
        type: 'review',
      },
      {
        label: 'PM Decision Gate',
        actor: 'Gemini PM',
        actorColor: '#34d399',
        description: 'Decision created in PM tab (sec-filing-review). Auto-approved → chains forward',
        type: 'decision',
      },
      {
        label: 'DB Ingestor',
        actor: 'Claude Division',
        actorColor: '#22d3ee',
        description: '7-phase deep analysis: materiality triage, form extraction, cross-filing correlation, conflict detection, patch generation, pre-write gate, executive summary',
        type: 'engineer',
      },
      {
        label: 'Boss Decision Gate',
        actor: 'Claude PM → Boss',
        actorColor: '#22d3ee',
        description: 'Data patches created in PM tab (data-patch). Requires Boss approval to apply',
        type: 'decision',
      },
      {
        label: 'Apply Data Patches',
        actor: 'System',
        actorColor: '#7ee787',
        description: 'Validated patches written to database files (capital, financials, timeline, catalysts, etc.)',
        type: 'output',
      },
    ],
  },
  {
    id: 'prompt-audit',
    name: 'Prompt Audit Pipeline',
    icon: '\u{1F50D}',
    accent: '#fb923c',
    steps: [
      {
        label: 'Scheduled Trigger',
        actor: 'Schedule',
        actorColor: '#94a3b8',
        description: 'Daily cron — checks all workflow prompts against live codebase',
        type: 'trigger',
      },
      {
        label: 'Prompt Auditor',
        actor: 'Bobman Division',
        actorColor: '#fb923c',
        description: 'Scans every workflow prompt, inventories codebase features, diffs for drift',
        type: 'engineer',
      },
      {
        label: 'Prompt Remediation',
        actor: 'Maszka Division',
        actorColor: '#f472b6',
        description: 'Receives drift findings, generates anchor-based text patches for prompt templates',
        type: 'engineer',
      },
      {
        label: 'PM Decision Gate',
        actor: 'Maszka PM → Boss',
        actorColor: '#f472b6',
        description: 'Prompt patches in PM tab (prompt-patch). Requires approval to apply',
        type: 'decision',
      },
      {
        label: 'Apply Prompt Patches',
        actor: 'System',
        actorColor: '#7ee787',
        description: 'Patches applied to workflows.ts prompt templates',
        type: 'output',
      },
    ],
  },
  {
    id: 'doc-review',
    name: 'Doc Review Pipeline',
    icon: '\u{1F4DD}',
    accent: '#a78bfa',
    steps: [
      {
        label: 'Scheduled Trigger',
        actor: 'Schedule',
        actorColor: '#94a3b8',
        description: 'Daily cron — reviews recent code changes for documentation gaps',
        type: 'trigger',
      },
      {
        label: 'Documentation Engineer',
        actor: 'Bobman Division',
        actorColor: '#fb923c',
        description: 'Reviews diffs, identifies doc gaps, audits style guides, maintains changelogs',
        type: 'engineer',
      },
      {
        label: 'UX/UI Engineer',
        actor: 'Maszka Division',
        actorColor: '#f472b6',
        description: 'Receives audit report, implements style/theme changes or creates counter-proposals',
        type: 'engineer',
      },
      {
        label: 'PM Decision Gate',
        actor: 'Maszka PM → Boss',
        actorColor: '#f472b6',
        description: 'UI changes routed through PM tab for approval',
        type: 'decision',
      },
      {
        label: 'Changes Applied',
        actor: 'System',
        actorColor: '#7ee787',
        description: 'Approved style guide and documentation updates merged',
        type: 'output',
      },
    ],
  },
];

const STEP_TYPE_STYLES: Record<string, { icon: string; bg: string }> = {
  trigger:  { icon: '\u26A1', bg: 'rgba(148, 163, 184, 0.12)' },
  engineer: { icon: '\u2699',  bg: 'rgba(255, 255, 255, 0.04)' },
  review:   { icon: '\u{1F916}', bg: 'rgba(52, 211, 153, 0.08)' },
  decision: { icon: '\u2714',  bg: 'rgba(251, 191, 36, 0.08)' },
  output:   { icon: '\u{1F4BE}', bg: 'rgba(126, 231, 135, 0.08)' },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function OperationsPipeline() {
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>('sec-filing');

  return (
    <div className="ops-container">
      <div className="ops-header">
        <div className="ops-header-title">Operation Pipelines</div>
        <div className="ops-header-sub">
          How data flows from trigger to database — each pipeline is a multi-step chain of engineers, reviews, and approvals.
        </div>
      </div>

      <div className="ops-list">
        {PIPELINES.map(pipeline => {
          const isOpen = expandedPipeline === pipeline.id;

          return (
            <div
              key={pipeline.id}
              className={`ops-card ${isOpen ? 'ops-card-open' : ''}`}
              style={{ '--ops-accent': pipeline.accent } as React.CSSProperties}
            >
              {/* Pipeline header */}
              <div
                className="ops-card-header"
                onClick={() => setExpandedPipeline(isOpen ? null : pipeline.id)}
              >
                <div className="ops-card-left">
                  <span className="ops-card-icon">{pipeline.icon}</span>
                  <div>
                    <div className="ops-card-title">{pipeline.name}</div>
                    <div className="ops-card-meta">{pipeline.steps.length} steps</div>
                  </div>
                </div>
                <span className="dec-expand-icon">{isOpen ? '\u25B2' : '\u25BC'}</span>
              </div>

              {/* Miniature pipeline dots (always visible) */}
              <div className="ops-mini-track">
                {pipeline.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="ops-mini-connector" style={{ background: pipeline.accent }} />}
                    <div
                      className="ops-mini-dot"
                      style={{ background: step.actorColor }}
                      title={step.label}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Expanded: full step-by-step breakdown */}
              <div className={`dec-card-body-anim ${isOpen ? 'dec-body-open' : ''}`}>
                <div className="ops-steps">
                  {pipeline.steps.map((step, i) => {
                    const typeStyle = STEP_TYPE_STYLES[step.type];
                    return (
                      <div key={i} className="ops-step-row">
                        {/* Vertical connector */}
                        <div className="ops-step-rail">
                          <div
                            className="ops-step-node"
                            style={{ background: step.actorColor }}
                          >
                            <span className="ops-step-node-num">{i + 1}</span>
                          </div>
                          {i < pipeline.steps.length - 1 && (
                            <div className="ops-step-line" style={{ background: pipeline.accent }} />
                          )}
                        </div>

                        {/* Step content */}
                        <div className="ops-step-content" style={{ background: typeStyle.bg }}>
                          <div className="ops-step-top">
                            <span className="ops-step-type-icon">{typeStyle.icon}</span>
                            <span className="ops-step-label">{step.label}</span>
                            <span className="ops-step-actor" style={{ color: step.actorColor }}>
                              {step.actor}
                            </span>
                          </div>
                          <div className="ops-step-desc">{step.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
