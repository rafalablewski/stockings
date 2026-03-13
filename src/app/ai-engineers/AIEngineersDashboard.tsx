"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  agents,
  resources,
  connections,
  dashboardStats,
  type AgentNode,
} from "@/data/ai-engineers";

// ── Icon helpers ────────────────────────────────────────────────────────────

function agentIcon(category: string) {
  switch (category) {
    case "hook":     return "⚡";
    case "workflow": return "⚙";
    case "pipeline": return "◈";
    default:         return "●";
  }
}

function resourceIcon(type: string) {
  switch (type) {
    case "api":      return "↗";
    case "database": return "⬡";
    case "config":   return "⊞";
    case "prompt":   return "✦";
    case "file":     return "◻";
    default:         return "○";
  }
}

function connTypeLabel(type: string) {
  switch (type) {
    case "triggers":    return "triggers";
    case "reads":       return "reads";
    case "writes":      return "writes";
    case "uses-prompt": return "uses prompt";
    case "feeds":       return "feeds into";
    default:            return type;
  }
}

// ── Resolve display name from ID ────────────────────────────────────────────

function nameFromId(id: string): string {
  const agent = agents.find((a) => a.id === id);
  if (agent) return agent.name;
  const res = resources.find((r) => r.id === id);
  if (res) return res.name;
  return id;
}

// ── SVG connection lines ────────────────────────────────────────────────────

interface NodeRect {
  id: string;
  cx: number;
  cy: number;
}

function ConnectionLines({
  nodeRects,
  selected,
}: {
  nodeRects: NodeRect[];
  selected: string | null;
}) {
  if (nodeRects.length === 0) return null;

  const relevantConns = selected
    ? connections.filter((c) => c.from === selected || c.to === selected)
    : connections;

  return (
    <svg className="aie-graph-svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {relevantConns.map((conn, i) => {
        const fromNode = nodeRects.find((n) => n.id === conn.from);
        const toNode = nodeRects.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return null;

        const midX = (fromNode.cx + toNode.cx) / 2;
        const midY = (fromNode.cy + toNode.cy) / 2;
        const offsetY = Math.abs(fromNode.cx - toNode.cx) > 100 ? -30 : 0;

        return (
          <g key={i}>
            <path
              d={`M ${fromNode.cx} ${fromNode.cy} Q ${midX} ${midY + offsetY} ${toNode.cx} ${toNode.cy}`}
              className="aie-graph-line"
              data-type={conn.type}
              filter={selected ? "url(#glow)" : undefined}
              style={{ opacity: selected ? 0.8 : 0.4 }}
            />
            {/* Animated flow dot */}
            <circle className="aie-graph-flow-dot" data-type={conn.type}>
              <animateMotion
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
                path={`M ${fromNode.cx} ${fromNode.cy} Q ${midX} ${midY + offsetY} ${toNode.cx} ${toNode.cy}`}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// ── Main dashboard ──────────────────────────────────────────────────────────

export default function AIEngineersDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [nodeRects, setNodeRects] = useState<NodeRect[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const selectedAgent = selected
    ? agents.find((a) => a.id === selected) ?? null
    : null;

  // Measure node positions for SVG lines
  const measureNodes = useCallback(() => {
    if (!graphRef.current) return;
    const containerRect = graphRef.current.getBoundingClientRect();
    const rects: NodeRect[] = [];
    nodeRefs.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      rects.push({
        id,
        cx: r.left - containerRect.left + r.width / 2,
        cy: r.top - containerRect.top + r.height / 2,
      });
    });
    setNodeRects(rects);
  }, []);

  useEffect(() => {
    measureNodes();
    window.addEventListener("resize", measureNodes);
    return () => window.removeEventListener("resize", measureNodes);
  }, [measureNodes]);

  // Re-measure when selection changes (layout might shift)
  useEffect(() => {
    const t = setTimeout(measureNodes, 50);
    return () => clearTimeout(t);
  }, [selected, measureNodes]);

  return (
    <div className="aie-app">
      {/* ── Hero ── */}
      <div className="aie-hero">
        <div className="aie-hero-glow" />
        <div className="aie-hero-inner">
          <h1 className="aie-hero-title">AI Engineers</h1>
          <p className="aie-hero-subtitle">
            Agent network topology — hooks, workflows, pipelines, and their
            interconnected prompts, APIs, and data flows.
          </p>

          {/* KPI strip */}
          <div className="aie-kpi-strip">
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="cyan">
                {dashboardStats.totalAgents}
              </div>
              <div className="aie-kpi-label">Total Agents</div>
            </div>
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="mint">
                {dashboardStats.activeAgents}
              </div>
              <div className="aie-kpi-label">Active</div>
            </div>
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="coral">
                {dashboardStats.disabledAgents}
              </div>
              <div className="aie-kpi-label">Disabled</div>
            </div>
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="violet">
                {dashboardStats.totalConnections}
              </div>
              <div className="aie-kpi-label">Connections</div>
            </div>
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="gold">
                {dashboardStats.totalPrompts}
              </div>
              <div className="aie-kpi-label">Prompt Templates</div>
            </div>
            <div className="aie-kpi">
              <div className="aie-kpi-value" data-color="sky">
                {dashboardStats.totalResources}
              </div>
              <div className="aie-kpi-label">Resources</div>
            </div>
          </div>
        </div>
      </div>

      <div className="aie-content">
        {/* ══ AGENT NETWORK GRAPH ══ */}
        <div className="aie-section-header">
          <span className="aie-section-dot" data-color="cyan" />
          <span className="aie-section-title">Agent Network</span>
          <span className="aie-section-line" />
        </div>

        <div className="aie-graph-container" ref={graphRef}>
          <ConnectionLines nodeRects={nodeRects} selected={selected} />
          <div className="aie-graph-nodes">
            {agents.map((agent) => (
              <div
                key={agent.id}
                ref={(el) => {
                  if (el) nodeRefs.current.set(agent.id, el);
                }}
                className="aie-node"
                data-color={agent.color}
                data-selected={selected === agent.id ? "true" : undefined}
                onClick={() =>
                  setSelected(selected === agent.id ? null : agent.id)
                }
              >
                <span
                  className="aie-node-pulse"
                  data-status={agent.status}
                />
                <div className="aie-node-header">
                  <div className="aie-node-icon" data-color={agent.color}>
                    {agentIcon(agent.category)}
                  </div>
                  <div>
                    <div className="aie-node-name">{agent.name}</div>
                    <div className="aie-node-role">{agent.role}</div>
                  </div>
                </div>
                <div className="aie-node-desc">{agent.description}</div>
                <div className="aie-node-meta">
                  <span
                    className="aie-node-badge"
                    data-variant={agent.status}
                  >
                    {agent.status}
                  </span>
                  <span
                    className="aie-node-badge"
                    data-variant={agent.category}
                  >
                    {agent.category}
                  </span>
                  <span
                    className="aie-node-badge"
                    data-variant="active"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {agent.phase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="aie-legend">
          {(
            [
              ["triggers", "Triggers"],
              ["reads", "Reads"],
              ["writes", "Writes"],
              ["uses-prompt", "Uses Prompt"],
              ["feeds", "Feeds Into"],
            ] as const
          ).map(([type, label]) => (
            <div key={type} className="aie-legend-item">
              <span className="aie-legend-line" data-type={type} />
              {label}
            </div>
          ))}
        </div>

        {/* ══ DETAIL PANEL ══ */}
        {selectedAgent && (
          <AgentDetailPanel
            agent={selectedAgent}
            onClose={() => setSelected(null)}
          />
        )}

        {/* ══ CONNECTION MATRIX ══ */}
        <div className="aie-section-header">
          <span className="aie-section-dot" data-color="violet" />
          <span className="aie-section-title">Connection Matrix</span>
          <span className="aie-section-line" />
        </div>

        <div className="aie-matrix">
          <table className="aie-matrix-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Type</th>
                <th>To</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn, i) => (
                <tr key={i}>
                  <td className="aie-conn-from">{nameFromId(conn.from)}</td>
                  <td>
                    <span className="aie-conn-dot" data-type={conn.type} />
                    <span className="aie-conn-type">
                      {connTypeLabel(conn.type)}
                    </span>
                  </td>
                  <td className="aie-conn-to">{nameFromId(conn.to)}</td>
                  <td className="aie-conn-label">{conn.label ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ══ RESOURCES ══ */}
        <div className="aie-section-header">
          <span className="aie-section-dot" data-color="gold" />
          <span className="aie-section-title">Resources & Infrastructure</span>
          <span className="aie-section-line" />
        </div>

        <div className="aie-resources-grid">
          {resources.map((res) => (
            <div key={res.id} className="aie-resource-card">
              <div className="aie-resource-header">
                <div className="aie-resource-icon" data-color={res.color}>
                  {resourceIcon(res.type)}
                </div>
                <div>
                  <div className="aie-resource-name">{res.name}</div>
                  <div className="aie-resource-type">{res.type}</div>
                </div>
              </div>
              <div className="aie-resource-desc">{res.description}</div>
              {res.path && (
                <div className="aie-resource-path">{res.path}</div>
              )}
              <div className="aie-resource-agents">
                {res.connectedAgents.map((agentId) => (
                  <span key={agentId} className="aie-resource-agent-chip">
                    {nameFromId(agentId)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Agent detail panel ──────────────────────────────────────────────────────

function AgentDetailPanel({
  agent,
  onClose,
}: {
  agent: AgentNode;
  onClose: () => void;
}) {
  const relatedConnections = connections.filter(
    (c) => c.from === agent.id || c.to === agent.id
  );

  return (
    <div className="aie-detail" data-color={agent.color}>
      <div className="aie-detail-header">
        <div className="aie-detail-title-group">
          <div className="aie-detail-icon" data-color={agent.color}>
            {agentIcon(agent.category)}
          </div>
          <div>
            <h2 className="aie-detail-name">{agent.name}</h2>
            <div className="aie-detail-role">{agent.role}</div>
          </div>
        </div>
        <button className="aie-detail-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <p className="aie-detail-desc">{agent.description}</p>

      {/* Metrics row */}
      <div className="aie-metrics-row" style={{ marginBottom: 24 }}>
        {agent.metrics.runsPerDay !== undefined && (
          <div className="aie-metric">
            <span className="aie-metric-value">
              {agent.metrics.runsPerDay}
            </span>
            <span className="aie-metric-label">Runs / day</span>
          </div>
        )}
        {agent.metrics.avgLatencyMs !== undefined && (
          <div className="aie-metric">
            <span className="aie-metric-value">
              {agent.metrics.avgLatencyMs >= 1000
                ? `${(agent.metrics.avgLatencyMs / 1000).toFixed(1)}s`
                : `${agent.metrics.avgLatencyMs}ms`}
            </span>
            <span className="aie-metric-label">Avg Latency</span>
          </div>
        )}
        {agent.metrics.findings !== undefined && (
          <div className="aie-metric">
            <span className="aie-metric-value">
              {agent.metrics.findings}
            </span>
            <span className="aie-metric-label">Findings</span>
          </div>
        )}
        {agent.metrics.lastRun && (
          <div className="aie-metric">
            <span className="aie-metric-value" style={{ fontSize: 13 }}>
              {agent.metrics.lastRun}
            </span>
            <span className="aie-metric-label">Last Run</span>
          </div>
        )}
      </div>

      <div className="aie-detail-grid">
        {/* Prompts */}
        <div className="aie-detail-section">
          <div className="aie-detail-section-title">Prompt Templates</div>
          <div className="aie-prompt-tags">
            {agent.prompts.map((p) => (
              <span key={p} className="aie-prompt-tag" data-color={agent.color}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Matchers */}
        <div className="aie-detail-section">
          <div className="aie-detail-section-title">Trigger Matchers</div>
          <div className="aie-matcher-list">
            {agent.matchers.map((m) => (
              <span key={m} className="aie-matcher-badge">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="aie-detail-section">
          <div className="aie-detail-section-title">Files Touched</div>
          <ul className="aie-file-list">
            {agent.files.map((f) => (
              <li key={f} className="aie-file-item">
                <span
                  className="aie-file-dot"
                  style={{
                    background: `var(--${agent.color}, rgba(255,255,255,0.3))`,
                  }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Connection sub-table */}
      {relatedConnections.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="aie-detail-section-title">Connections</div>
          <table
            className="aie-matrix-table"
            style={{ fontSize: 11, marginTop: 8 }}
          >
            <thead>
              <tr>
                <th>Direction</th>
                <th>Type</th>
                <th>Target</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              {relatedConnections.map((conn, i) => {
                const isFrom = conn.from === agent.id;
                return (
                  <tr key={i}>
                    <td
                      style={{
                        color: isFrom
                          ? "rgba(126,231,135,0.6)"
                          : "rgba(121,192,255,0.6)",
                        fontWeight: 600,
                        fontSize: 10,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {isFrom ? "OUT →" : "← IN"}
                    </td>
                    <td>
                      <span className="aie-conn-dot" data-type={conn.type} />
                      <span className="aie-conn-type">
                        {connTypeLabel(conn.type)}
                      </span>
                    </td>
                    <td className="aie-conn-to">
                      {nameFromId(isFrom ? conn.to : conn.from)}
                    </td>
                    <td className="aie-conn-label">{conn.label ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
