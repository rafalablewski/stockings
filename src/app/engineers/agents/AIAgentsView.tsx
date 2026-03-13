'use client';

import React, { useState } from 'react';
import type { EngineerTask } from '@/lib/engineers';
import type { AgentNode, ResourceNode, Connection } from '@/data/ai-engineers';

interface Props {
  engineers: EngineerTask[];
  agents: AgentNode[];
  resources: ResourceNode[];
  connections: Connection[];
  stats: {
    totalAgents: number;
    activeAgents: number;
    disabledAgents: number;
    totalConnections: number;
    totalResources: number;
    totalPrompts: number;
    categories: { hooks: number; workflows: number; pipelines: number };
  };
}

function agentIcon(category: string) {
  switch (category) {
    case 'hook':     return '\u26A1';
    case 'workflow': return '\u2699';
    case 'pipeline': return '\u25C8';
    default:         return '\u25CF';
  }
}

function resourceIcon(type: string) {
  switch (type) {
    case 'api':      return '\u2197';
    case 'database': return '\u2B21';
    case 'config':   return '\u229E';
    case 'prompt':   return '\u2726';
    case 'file':     return '\u25FB';
    default:         return '\u25CB';
  }
}

function formatInterval(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(0)}h`;
  return `${(minutes / 1440).toFixed(0)}d`;
}

function nameFromId(id: string, agentsList: AgentNode[], resourcesList: ResourceNode[]): string {
  const agent = agentsList.find((a) => a.id === id);
  if (agent) return agent.name;
  const res = resourcesList.find((r) => r.id === id);
  if (res) return res.name;
  return id;
}

export default function AIAgentsView({ engineers, agents, resources, connections, stats }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const categories = [
    { key: 'hook', label: 'Hooks', color: 'cyan', count: stats.categories.hooks },
    { key: 'workflow', label: 'Workflows', color: 'gold', count: stats.categories.workflows },
    { key: 'pipeline', label: 'Pipelines', color: 'mint', count: stats.categories.pipelines },
  ];

  const filteredAgents = selectedCategory
    ? agents.filter(a => a.category === selectedCategory)
    : agents;

  return (
    <div className="eng-app">
      <div className="eng-header">
        <div className="eng-subtitle">Agent Infrastructure</div>
        <div className="eng-title">AI Agents</div>
        <div className="eng-desc">
          Hired AI agents operating across the platform — hooks enforcing code quality,
          workflows processing intelligence, and pipelines monitoring external data sources.
        </div>

        {/* KPI Bar */}
        <div className="eng-kpi-bar">
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="cyan">{stats.totalAgents}</div>
            <div className="eng-kpi-bar-label">Agents</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{stats.activeAgents}</div>
            <div className="eng-kpi-bar-label">Active</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="coral">{stats.disabledAgents}</div>
            <div className="eng-kpi-bar-label">Disabled</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{stats.totalConnections}</div>
            <div className="eng-kpi-bar-label">Connections</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{stats.totalPrompts}</div>
            <div className="eng-kpi-bar-label">Prompts</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="sky">{stats.totalResources}</div>
            <div className="eng-kpi-bar-label">Resources</div>
          </div>
        </div>

        {/* Category filter strip */}
        <div className="eng-tab-strip">
          <button
            className="eng-tab"
            data-active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            All<span className="eng-tab-count">{agents.length}</span>
          </button>
          {categories.map(cat => (
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
        {/* Agent Cards */}
        {filteredAgents.map(agent => {
          const isExpanded = expandedAgent === agent.id;
          const relatedConns = connections.filter(c => c.from === agent.id || c.to === agent.id);
          const connectedResources = resources.filter(r => r.connectedAgents.includes(agent.id));

          return (
            <div key={agent.id} className="eng-card" data-expanded={isExpanded}>
              <div
                className="eng-card-inner"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
              >
                <div className="eng-status-dot" data-status={agent.status === 'active' ? 'active' : agent.status === 'standby' ? 'running' : 'idle'} />
                <div className="eng-card-body">
                  <div className="eng-card-name-row">
                    <span className="eng-card-name">
                      <span style={{ marginRight: 6 }}>{agentIcon(agent.category)}</span>
                      {agent.name}
                    </span>
                    <span className="eng-card-role">{agent.role}</span>
                  </div>
                  <div className="eng-card-desc">{agent.description}</div>
                  <div className="eng-card-meta">
                    <span className="eng-card-meta-item">
                      <span className="eng-node-badge" data-variant={agent.status}>{agent.status}</span>
                    </span>
                    <span className="eng-card-meta-item">
                      <span className="eng-node-badge" data-variant={agent.category}>{agent.category}</span>
                    </span>
                    <span className="eng-card-meta-item">{agent.phase}</span>
                    <span className="eng-card-meta-item">{relatedConns.length} connections</span>
                    {agent.metrics.runsPerDay !== undefined && agent.metrics.runsPerDay > 0 && (
                      <span className="eng-card-meta-item">{agent.metrics.runsPerDay} runs/day</span>
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
                    <div>
                      <div className="eng-expand-label">Prompt Templates</div>
                      <div className="eng-prompt-tags">
                        {agent.prompts.map(p => (
                          <span key={p} className="eng-prompt-tag" data-color={agent.color}>{p}</span>
                        ))}
                      </div>

                      <div className="eng-expand-label" style={{ marginTop: 16 }}>Trigger Matchers</div>
                      <div className="eng-matcher-list">
                        {agent.matchers.map(m => (
                          <span key={m} className="eng-matcher-badge">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="eng-expand-label">Configuration</div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Category</span>
                        <span className="eng-config-val">{agent.category}</span>
                      </div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Phase</span>
                        <span className="eng-config-val">{agent.phase}</span>
                      </div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Status</span>
                        <span className="eng-config-val">{agent.status}</span>
                      </div>
                      <div className="eng-config-row">
                        <span className="eng-config-key">Connections</span>
                        <span className="eng-config-val">{relatedConns.length}</span>
                      </div>
                      {agent.metrics.avgLatencyMs !== undefined && (
                        <div className="eng-config-row">
                          <span className="eng-config-key">Avg latency</span>
                          <span className="eng-config-val">
                            {agent.metrics.avgLatencyMs >= 1000
                              ? `${(agent.metrics.avgLatencyMs / 1000).toFixed(1)}s`
                              : `${agent.metrics.avgLatencyMs}ms`}
                          </span>
                        </div>
                      )}
                      {agent.metrics.findings !== undefined && (
                        <div className="eng-config-row">
                          <span className="eng-config-key">Findings</span>
                          <span className="eng-config-val">{agent.metrics.findings}</span>
                        </div>
                      )}
                      {agent.metrics.lastRun && (
                        <div className="eng-config-row">
                          <span className="eng-config-key">Last run</span>
                          <span className="eng-config-val">{agent.metrics.lastRun}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Files */}
                  <div style={{ marginTop: 16 }}>
                    <div className="eng-expand-label">Files Touched</div>
                    <ul className="eng-file-list">
                      {agent.files.map(f => (
                        <li key={f} className="eng-file-item">
                          <span className="eng-file-dot" style={{ background: `var(--${agent.color}, rgba(255,255,255,0.3))` }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connected Resources */}
                  {connectedResources.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div className="eng-expand-label">Connected Resources</div>
                      <div className="eng-resources-grid">
                        {connectedResources.map(res => (
                          <div key={res.id} className="eng-resource-card">
                            <div className="eng-resource-header">
                              <div className="eng-resource-icon" data-color={res.color}>
                                {resourceIcon(res.type)}
                              </div>
                              <div>
                                <div className="eng-resource-name">{res.name}</div>
                                <div className="eng-resource-type">{res.type}</div>
                              </div>
                            </div>
                            <div className="eng-resource-desc">{res.description}</div>
                            {res.path && <div className="eng-resource-path">{res.path}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connections table */}
                  {relatedConns.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div className="eng-expand-label">Connection Map</div>
                      <table className="eng-matrix-table" style={{ fontSize: 11 }}>
                        <thead>
                          <tr>
                            <th>Direction</th>
                            <th>Type</th>
                            <th>Target</th>
                            <th>Label</th>
                          </tr>
                        </thead>
                        <tbody>
                          {relatedConns.map((conn, i) => {
                            const isFrom = conn.from === agent.id;
                            return (
                              <tr key={i}>
                                <td style={{
                                  color: isFrom ? 'rgba(126,231,135,0.6)' : 'rgba(121,192,255,0.6)',
                                  fontWeight: 600, fontSize: 10, fontFamily: "'Space Mono', monospace",
                                }}>
                                  {isFrom ? 'OUT \u2192' : '\u2190 IN'}
                                </td>
                                <td>
                                  <span className="eng-conn-dot" data-type={conn.type} />
                                  <span className="eng-conn-type">
                                    {conn.type === 'uses-prompt' ? 'uses prompt' : conn.type === 'feeds' ? 'feeds into' : conn.type}
                                  </span>
                                </td>
                                <td className="eng-conn-to">{nameFromId(isFrom ? conn.to : conn.from, agents, resources)}</td>
                                <td className="eng-conn-label">{conn.label ?? '\u2014'}</td>
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

        {/* Autonomous Engineers Section */}
        <div className="eng-section-header" style={{ marginTop: 48 }}>
          <span className="eng-section-dot" data-color="mint" />
          <span className="eng-section-label">Autonomous Engineers</span>
          <div className="eng-section-line" />
        </div>

        {engineers.map(eng => (
          <div key={eng.id} className="eng-card">
            <div className="eng-card-inner">
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
                  <span className="eng-card-meta-item">{eng.workflowIds.length} workflows</span>
                  <span className="eng-card-meta-item">{eng.requiresData ? 'External data' : 'Internal data'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
