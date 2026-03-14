'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { EngineerTask } from '@/lib/engineers';
import {
  orgNodes,
  computeHierarchyEdges,
  computeTriggerEdges,
  computeLayout,
  dataFlowEdges,
  type OrgNode,
  type OrgEdge,
  type NodePosition,
} from '@/data/org-hierarchy';

// ── Types ──────────────────────────────────────────────────────────────────

interface Props {
  engineers: EngineerTask[];
  runningIds: Set<string>;
  onSelectEngineer: (engineerId: string) => void;
}

interface TooltipState {
  node: OrgNode;
  x: number;
  y: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function hexagonPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return `M${pts.join('L')}Z`;
}

function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const midY = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
}

function getNodeRadius(type: OrgNode['type']): number {
  switch (type) {
    case 'boss': return 36;
    case 'division': return 28;
    case 'engineer': return 20;
  }
}

// ── SVG Filter Definitions ─────────────────────────────────────────────────

const GLOW_COLORS: Record<string, string> = {
  '#f59e0b': 'glow-amber',
  '#22d3ee': 'glow-cyan',
  '#a78bfa': 'glow-violet',
  '#34d399': 'glow-mint',
  '#f472b6': 'glow-pink',
  '#fb923c': 'glow-orange',
  '#38bdf8': 'glow-sky',
  '#fbbf24': 'glow-gold',
};

function GlowFilters() {
  return (
    <defs>
      {Object.entries(GLOW_COLORS).map(([hex, id]) => (
        <filter key={id} id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
      {/* Dim filter for non-selected nodes */}
      <filter id="dim">
        <feColorMatrix type="saturate" values="0.2" />
      </filter>
    </defs>
  );
}

// ── Edge Component ─────────────────────────────────────────────────────────

function GraphEdge({
  edge,
  positions,
  dimmed,
}: {
  edge: OrgEdge;
  positions: Map<string, NodePosition>;
  dimmed: boolean;
}) {
  const from = positions.get(edge.from);
  const to = positions.get(edge.to);
  if (!from || !to) return null;

  const isHierarchy = edge.type === 'hierarchy';
  const isTrigger = edge.type === 'trigger';
  const isDataflow = edge.type === 'dataflow';

  const strokeColor = isHierarchy
    ? 'rgba(255,255,255,0.07)'
    : edge.color || 'rgba(251,191,36,0.3)';

  return (
    <path
      d={curvedPath(from.x, from.y, to.x, to.y)}
      fill="none"
      stroke={strokeColor}
      strokeWidth={isHierarchy ? 1.2 : 1.5}
      strokeDasharray={isHierarchy ? 'none' : isTrigger ? '6 4' : '8 4'}
      opacity={dimmed ? 0.05 : 1}
      className={isDataflow ? 'eng-graph-edge--dataflow' : undefined}
      style={{ transition: 'opacity 0.3s ease' }}
    />
  );
}

// ── Node Component ─────────────────────────────────────────────────────────

function GraphNode({
  node,
  pos,
  selected,
  dimmed,
  isRunning,
  onHover,
  onLeave,
  onClick,
}: {
  node: OrgNode;
  pos: NodePosition;
  selected: boolean;
  dimmed: boolean;
  isRunning: boolean;
  onHover: (node: OrgNode, x: number, y: number) => void;
  onLeave: () => void;
  onClick: (node: OrgNode) => void;
}) {
  const r = getNodeRadius(node.type);
  const isHex = node.type === 'engineer';
  const glowId = GLOW_COLORS[node.color] || 'glow-cyan';
  const fillOpacity = node.type === 'boss' ? 0.25 : 0.15;

  return (
    <g
      className={`eng-graph-node ${selected ? 'eng-graph-node--selected' : ''} ${dimmed ? 'eng-graph-node--dimmed' : ''} ${isRunning ? 'eng-graph-node--running' : ''}`}
      style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
      onMouseEnter={(e) => {
        const svg = (e.target as SVGElement).closest('svg');
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        onHover(node, e.clientX - rect.left, e.clientY - rect.top);
      }}
      onMouseLeave={onLeave}
      onClick={() => onClick(node)}
    >
      {/* Glow background */}
      {isHex ? (
        <path
          d={hexagonPath(pos.x, pos.y, r + 4)}
          fill={node.color}
          opacity={selected ? 0.3 : 0.08}
          filter={selected ? `url(#${glowId})` : undefined}
        />
      ) : (
        <circle
          cx={pos.x}
          cy={pos.y}
          r={r + 4}
          fill={node.color}
          opacity={selected ? 0.3 : 0.08}
          filter={selected ? `url(#${glowId})` : undefined}
        />
      )}

      {/* Main shape */}
      {isHex ? (
        <path
          d={hexagonPath(pos.x, pos.y, r)}
          fill={`${node.color}${Math.round(fillOpacity * 255).toString(16).padStart(2, '0')}`}
          stroke={node.color}
          strokeWidth={selected ? 2 : 1.2}
        />
      ) : (
        <circle
          cx={pos.x}
          cy={pos.y}
          r={r}
          fill={`${node.color}${Math.round(fillOpacity * 255).toString(16).padStart(2, '0')}`}
          stroke={node.color}
          strokeWidth={selected ? 2.5 : 1.5}
        />
      )}

      {/* Badge text inside node */}
      <text
        x={pos.x}
        y={pos.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill={node.color}
        fontSize={node.type === 'boss' ? 11 : node.type === 'engineer' ? 8 : 9}
        fontFamily="'Space Mono', monospace"
        fontWeight={700}
        letterSpacing="0.5px"
      >
        {node.badge}
      </text>

      {/* Label below node */}
      <text
        x={pos.x}
        y={pos.y + r + 14}
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(255,255,255,0.7)"
        fontSize={node.type === 'engineer' ? 9 : 11}
        fontFamily="'Outfit', sans-serif"
        fontWeight={node.type === 'boss' ? 600 : 500}
      >
        {node.label}
      </text>

      {/* Role subtitle for boss and divisions */}
      {(node.type === 'boss' || node.type === 'division') && (
        <text
          x={pos.x}
          y={pos.y + r + 27}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255,255,255,0.25)"
          fontSize={8}
          fontFamily="'Space Mono', monospace"
        >
          {node.role}
        </text>
      )}
    </g>
  );
}

// ── Tooltip Component ──────────────────────────────────────────────────────

function GraphTooltip({ tooltip, engineers }: { tooltip: TooltipState; engineers: EngineerTask[] }) {
  const { node, x, y } = tooltip;
  const eng = node.engineerId
    ? engineers.find(e => e.id === node.engineerId)
    : null;

  return (
    <div
      className="eng-graph-tooltip"
      style={{
        left: x + 12,
        top: y - 10,
      }}
    >
      <div className="eng-graph-tooltip-name" style={{ color: node.color }}>
        {node.label}
      </div>
      <div className="eng-graph-tooltip-role">{node.role}</div>

      {/* Description for Boss and Division leads */}
      {node.description && (node.type === 'boss' || node.type === 'division') && (
        <div className="eng-graph-tooltip-desc">{node.description}</div>
      )}

      {/* Division engineer count */}
      {node.type === 'division' && (
        <div className="eng-graph-tooltip-row">
          <span className="eng-graph-tooltip-key">Engineers</span>
          <span className="eng-graph-tooltip-val">
            {orgNodes.filter(n => n.parentId === node.id && n.type === 'engineer').length}
          </span>
        </div>
      )}

      {/* Engineer PM / Reports to */}
      {node.type === 'engineer' && node.parentId && (() => {
        const pm = orgNodes.find(n => n.id === node.parentId);
        return pm ? (
          <div className="eng-graph-tooltip-row">
            <span className="eng-graph-tooltip-key">Reports to</span>
            <span className="eng-graph-tooltip-val" style={{ color: pm.color }}>{pm.label}</span>
          </div>
        ) : null;
      })()}

      {/* Engineer details */}
      {eng && (
        <>
          <div className="eng-graph-tooltip-row">
            <span className="eng-graph-tooltip-key">Schedule</span>
            <span className="eng-graph-tooltip-val">
              {eng.defaultIntervalMinutes === 0
                ? 'On-demand'
                : eng.defaultIntervalMinutes < 60
                  ? `${eng.defaultIntervalMinutes}m`
                  : eng.defaultIntervalMinutes < 1440
                    ? `${(eng.defaultIntervalMinutes / 60).toFixed(0)}h`
                    : `${(eng.defaultIntervalMinutes / 1440).toFixed(0)}d`}
            </span>
          </div>
          <div className="eng-graph-tooltip-row">
            <span className="eng-graph-tooltip-key">Category</span>
            <span className="eng-graph-tooltip-val">{eng.category}</span>
          </div>
          {eng.requiresData && (
            <div className="eng-graph-tooltip-row">
              <span className="eng-graph-tooltip-key">Data</span>
              <span className="eng-graph-tooltip-val">{eng.dataSource}</span>
            </div>
          )}
          <div className="eng-graph-tooltip-row">
            <span className="eng-graph-tooltip-key">Triggers</span>
            <span className="eng-graph-tooltip-val">
              {eng.triggerEvents.map(e => e.replace(/-/g, ' ')).join(', ')}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function NetworkGraph({ engineers, runningIds, onSelectEngineer }: Props) {
  // Pan & zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Interaction state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [showTriggers, setShowTriggers] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);

  // Computed data
  const layout = useMemo(() => computeLayout(), []);
  const posMap = useMemo(() => {
    const map = new Map<string, NodePosition>();
    for (const p of layout) map.set(p.id, p);
    return map;
  }, [layout]);

  const hierarchyEdges = useMemo(() => computeHierarchyEdges(), []);
  const triggerEdges = useMemo(() => computeTriggerEdges(engineers), [engineers]);

  // Selection logic — find connected node IDs
  const connectedIds = useMemo(() => {
    if (!selectedNodeId) return null;
    const ids = new Set<string>([selectedNodeId]);

    // Add direct children
    for (const node of orgNodes) {
      if (node.parentId === selectedNodeId) ids.add(node.id);
    }
    // Add parent
    const sel = orgNodes.find(n => n.id === selectedNodeId);
    if (sel?.parentId) ids.add(sel.parentId);

    // Add grandchildren (for divisions/PMs)
    for (const node of orgNodes) {
      if (node.parentId && ids.has(node.parentId)) ids.add(node.id);
    }

    // Add trigger-connected
    if (showTriggers) {
      for (const edge of triggerEdges) {
        if (edge.from === selectedNodeId) ids.add(edge.to);
        if (edge.to === selectedNodeId) ids.add(edge.from);
      }
    }

    return ids;
  }, [selectedNodeId, triggerEdges, showTriggers]);

  // ── Pan handlers ──

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.eng-graph-node')) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  }, [dragging]);

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom(prev => Math.max(0.3, Math.min(2, prev + delta)));
  }, []);

  // Reset pan/zoom on double-click background
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.eng-graph-node')) return;
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setSelectedNodeId(null);
  }, []);

  // Close tooltip on scroll/zoom
  useEffect(() => {
    setTooltip(null);
  }, [zoom, pan]);

  // ── Node click handler ──

  const handleNodeClick = useCallback((node: OrgNode) => {
    if (selectedNodeId === node.id) {
      // Deselect
      setSelectedNodeId(null);
    } else {
      setSelectedNodeId(node.id);
      // Open detail modal for engineers
      if (node.engineerId) {
        onSelectEngineer(node.engineerId);
      }
    }
  }, [selectedNodeId, onSelectEngineer]);

  const handleHover = useCallback((node: OrgNode, x: number, y: number) => {
    setTooltip({ node, x, y });
  }, []);

  const handleLeave = useCallback(() => setTooltip(null), []);

  // ── SVG viewBox ──
  const viewBoxW = 1400;
  const viewBoxH = 700;

  return (
    <div className="eng-graph-container">
      {/* Toggle bar */}
      <div className="eng-graph-toggle-bar">
        <button
          className={`eng-graph-toggle ${showTriggers ? 'active' : ''}`}
          onClick={() => setShowTriggers(prev => !prev)}
        >
          <span className="eng-graph-toggle-dot" style={{ background: '#fbbf24' }} />
          Triggers
        </button>
        <button
          className={`eng-graph-toggle ${showDataFlow ? 'active' : ''}`}
          onClick={() => setShowDataFlow(prev => !prev)}
        >
          <span className="eng-graph-toggle-dot" style={{ background: '#38bdf8' }} />
          Data Flow
        </button>
        <button
          className="eng-graph-toggle"
          onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); setSelectedNodeId(null); }}
        >
          Reset
        </button>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className="eng-graph-svg"
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <GlowFilters />

        <g transform={`translate(${pan.x / zoom}, ${pan.y / zoom}) scale(${zoom})`}>
          {/* Hierarchy edges */}
          {hierarchyEdges.map((edge, i) => (
            <GraphEdge
              key={`h-${i}`}
              edge={edge}
              positions={posMap}
              dimmed={!!connectedIds && (!connectedIds.has(edge.from) || !connectedIds.has(edge.to))}
            />
          ))}

          {/* Trigger edges */}
          {showTriggers && triggerEdges.map((edge, i) => (
            <GraphEdge
              key={`t-${i}`}
              edge={edge}
              positions={posMap}
              dimmed={!!connectedIds && (!connectedIds.has(edge.from) || !connectedIds.has(edge.to))}
            />
          ))}

          {/* Data flow edges */}
          {showDataFlow && dataFlowEdges.map((edge, i) => (
            <GraphEdge
              key={`d-${i}`}
              edge={edge}
              positions={posMap}
              dimmed={false}
            />
          ))}

          {/* Nodes */}
          {orgNodes.map(node => {
            const pos = posMap.get(node.id);
            if (!pos) return null;
            const isDimmed = !!connectedIds && !connectedIds.has(node.id);
            const isSelected = selectedNodeId === node.id;
            const isRunning = !!node.engineerId && runningIds.has(node.engineerId);

            return (
              <GraphNode
                key={node.id}
                node={node}
                pos={pos}
                selected={isSelected}
                dimmed={isDimmed}
                isRunning={isRunning}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleNodeClick}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip (HTML overlay) */}
      {tooltip && <GraphTooltip tooltip={tooltip} engineers={engineers} />}

      {/* Legend */}
      <div className="eng-graph-legend">
        <div className="eng-graph-legend-title">LEGEND</div>
        <div className="eng-graph-legend-row">
          <svg width={16} height={16}><circle cx={8} cy={8} r={6} fill="none" stroke="#f59e0b" strokeWidth={1.5} /></svg>
          <span>Boss</span>
        </div>
        <div className="eng-graph-legend-row">
          <svg width={16} height={16}><circle cx={8} cy={8} r={5} fill="none" stroke="#22d3ee" strokeWidth={1.5} /></svg>
          <span>Division</span>
        </div>
        <div className="eng-graph-legend-row">
          <svg width={16} height={16}>
            <path d={hexagonPath(8, 8, 6)} fill="none" stroke="#34d399" strokeWidth={1.2} />
          </svg>
          <span>Engineer</span>
        </div>
        <div className="eng-graph-legend-divider" />
        <div className="eng-graph-legend-row">
          <svg width={16} height={4}><line x1={0} y1={2} x2={16} y2={2} stroke="rgba(255,255,255,0.15)" strokeWidth={1.2} /></svg>
          <span>Hierarchy</span>
        </div>
        <div className="eng-graph-legend-row">
          <svg width={16} height={4}><line x1={0} y1={2} x2={16} y2={2} stroke="#fbbf24" strokeWidth={1.2} strokeDasharray="4 3" /></svg>
          <span>Trigger</span>
        </div>
        <div className="eng-graph-legend-row">
          <svg width={16} height={4}><line x1={0} y1={2} x2={16} y2={2} stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="6 3" /></svg>
          <span>Data Flow</span>
        </div>
      </div>
    </div>
  );
}
