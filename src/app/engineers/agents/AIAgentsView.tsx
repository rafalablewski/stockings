'use client';

import React, { useState } from 'react';
import type { EngineerTask } from '@/lib/engineers';
import type { Workflow } from '@/data/workflows';

interface Props {
  engineers: EngineerTask[];
  workflows: Workflow[];
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

export default function AIAgentsView({ engineers, workflows }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['research', 'monitoring', 'intelligence', 'audit'] as const;
  const categoryCounts = categories.map(c => ({
    key: c,
    label: categoryLabels[c],
    count: engineers.filter(e => e.category === c).length,
  }));

  const filtered = selectedCategory
    ? engineers.filter(e => e.category === selectedCategory)
    : engineers;

  const totalWorkflows = new Set(engineers.flatMap(e => e.workflowIds)).size;
  const requiresDataCount = engineers.filter(e => e.requiresData).length;

  return (
    <div className="eng-app">
      <div className="eng-header">
        <div className="eng-subtitle">Hired Agents</div>
        <div className="eng-title">AI Agents</div>
        <div className="eng-desc">
          Autonomous AI agents that execute tasks from the Prompt Database —
          monitoring filings, analyzing data, and updating research databases on schedule.
        </div>

        {/* KPI Bar */}
        <div className="eng-kpi-bar">
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="cyan">{engineers.length}</div>
            <div className="eng-kpi-bar-label">Agents</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{totalWorkflows}</div>
            <div className="eng-kpi-bar-label">Workflows</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{categoryCounts.find(c => c.key === 'research')?.count}</div>
            <div className="eng-kpi-bar-label">Research</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="sky">{categoryCounts.find(c => c.key === 'monitoring')?.count}</div>
            <div className="eng-kpi-bar-label">Monitoring</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{categoryCounts.find(c => c.key === 'audit')?.count}</div>
            <div className="eng-kpi-bar-label">Audit</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="coral">{requiresDataCount}</div>
            <div className="eng-kpi-bar-label">External Data</div>
          </div>
        </div>

        {/* Category filter */}
        <div className="eng-tab-strip">
          <button
            className="eng-tab"
            data-active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            All<span className="eng-tab-count">{engineers.length}</span>
          </button>
          {categoryCounts.map(cat => (
            <button
              key={cat.key}
              className="eng-tab"
              data-active={selectedCategory === cat.key}
              onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
            >
              {cat.label}<span className="eng-tab-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="eng-feed">
        {filtered.map(eng => {
          const isExpanded = expandedId === eng.id;
          const linkedWorkflows = workflows.filter(w => eng.workflowIds.includes(w.id));
          const color = categoryColors[eng.category] || 'cyan';

          return (
            <div key={eng.id} className="eng-card" data-expanded={isExpanded}>
              <div
                className="eng-card-inner"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedId(isExpanded ? null : eng.id)}
              >
                <div className="eng-status-dot" data-status="idle" />
                <div className="eng-card-body">
                  <div className="eng-card-name-row">
                    <span className="eng-card-name">{eng.name}</span>
                    <span className="eng-card-role">{eng.role}</span>
                  </div>
                  <div className="eng-card-desc">{eng.description}</div>
                  <div className="eng-card-meta">
                    <span className="eng-card-meta-item">
                      <span className="eng-map-badge" data-color={eng.category}>{eng.category}</span>
                    </span>
                    <span className="eng-card-meta-item">Every {formatInterval(eng.defaultIntervalMinutes)}</span>
                    <span className="eng-card-meta-item">{eng.workflowIds.length} workflow{eng.workflowIds.length !== 1 ? 's' : ''}</span>
                    {eng.requiresData && (
                      <span className="eng-card-meta-item">{eng.dataSource}</span>
                    )}
                  </div>
                </div>
                <button className="eng-chevron">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {isExpanded && (
                <div className="eng-expand">
                  <div className="eng-expand-grid">
                    {/* Capabilities */}
                    <div>
                      <div className="eng-expand-label">Capabilities</div>
                      {eng.capabilities.map((cap, i) => (
                        <div key={i} className="eng-cap-item">
                          <span className="eng-cap-bullet">+</span>
                          {cap}
                        </div>
                      ))}
                    </div>

                    {/* Configuration */}
                    <div>
                      <div className="eng-expand-label">Configuration</div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Schedule</span>
                        <span className="eng-config-val">Every {formatInterval(eng.defaultIntervalMinutes)}</span>
                      </div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Category</span>
                        <span className="eng-config-val">{eng.category}</span>
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

                  {/* Linked Workflows from Prompt Database */}
                  <div style={{ marginTop: 16 }}>
                    <div className="eng-expand-label">Linked Workflows (Prompt Database)</div>
                    {linkedWorkflows.length > 0 ? (
                      <div className="eng-resources-grid">
                        {linkedWorkflows.map(wf => (
                          <div key={wf.id} className="eng-resource-card">
                            <div className="eng-resource-header">
                              <div className="eng-resource-icon" data-color={color}>
                                {'\u2726'}
                              </div>
                              <div>
                                <div className="eng-resource-name">{wf.name}</div>
                                <div className="eng-resource-type">
                                  {wf.requiresUserData ? 'requires input' : 'autonomous'}
                                </div>
                              </div>
                            </div>
                            <div className="eng-resource-desc">{wf.description}</div>
                            <div className="eng-resource-agents">
                              {wf.variants.map(v => (
                                <span key={v.ticker} className="eng-resource-agent-chip">{v.label}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                        {eng.workflowIds.map(id => (
                          <span key={id} className="eng-map-workflow-tag">{id}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Trigger Event Cross-references */}
                  {eng.triggerEvents.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div className="eng-expand-label">Trigger Cross-References</div>
                      <table className="eng-matrix-table" style={{ fontSize: 11 }}>
                        <thead>
                          <tr>
                            <th>Event</th>
                            <th>Also Triggers</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eng.triggerEvents.map(event => {
                            const othersTriggered = engineers
                              .filter(e => e.id !== eng.id && e.triggerEvents.includes(event))
                              .map(e => e.name);
                            return (
                              <tr key={event}>
                                <td className="eng-conn-from">{event}</td>
                                <td className="eng-conn-to">
                                  {othersTriggered.length > 0 ? othersTriggered.join(', ') : '\u2014'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
