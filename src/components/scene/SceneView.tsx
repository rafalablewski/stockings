'use client';

import React from 'react';
import DeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';

// Division data for the 5 stations
const STATIONS = [
  { id: 'claude',          color: '#22d3ee', badge: 'ARCH', label: 'Claude' },
  { id: 'gemini',          color: '#34d399', badge: 'R&D',  label: 'Gemini' },
  { id: 'cursor',          color: '#a78bfa', badge: 'UI',   label: 'Cursor' },
  { id: 'ai-engineer',     color: '#f472b6', badge: 'ML',   label: 'AI Eng' },
  { id: 'project-manager', color: '#fb923c', badge: 'PM',   label: 'PM' },
] as const;

// X positions for 5 desks evenly across 1000px width
const DESK_POSITIONS = [120, 310, 500, 690, 880];
const FLOOR_Y = 280;
const DESK_Y = 240;

export interface SceneViewProps {
  workingState: Record<string, boolean>;
}

export default function SceneView({ workingState }: SceneViewProps) {
  return (
    <div className="scene-view">
      <svg
        viewBox="0 0 1000 340"
        preserveAspectRatio="xMidYMid meet"
        className="scene-svg"
      >
        {/* ── SVG Definitions ── */}
        <defs>
          {/* Glow filters per division color */}
          {STATIONS.map(s => (
            <filter
              key={s.id}
              id={`glow-${s.color.replace('#', '')}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={s.color} floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          {/* Wall gradient */}
          <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141418" />
            <stop offset="100%" stopColor="#0d0d10" />
          </linearGradient>

          {/* Floor gradient */}
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0d" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>
        </defs>

        {/* ── Background ── */}
        {/* Wall */}
        <rect x={0} y={0} width={1000} height={FLOOR_Y} fill="url(#wall-grad)" />
        {/* Floor */}
        <rect x={0} y={FLOOR_Y} width={1000} height={60} fill="url(#floor-grad)" />
        {/* Baseboard line */}
        <line
          x1={0} y1={FLOOR_Y}
          x2={1000} y2={FLOOR_Y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {/* ── Wall decorations ── */}
        {/* Shelf */}
        <rect x={60} y={80} width={120} height={3} rx={1} fill="rgba(255,255,255,0.04)" />
        <rect x={820} y={90} width={100} height={3} rx={1} fill="rgba(255,255,255,0.04)" />
        {/* Clock */}
        <circle cx={500} cy={60} r={16} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <line x1={500} y1={60} x2={500} y2={50} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={500} y1={60} x2={508} y2={60} stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
        {/* Window (left) */}
        <rect x={180} y={50} width={50} height={60} rx={2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <line x1={205} y1={50} x2={205} y2={110} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <line x1={180} y1={80} x2={230} y2={80} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        {/* Window (right) */}
        <rect x={740} y={50} width={50} height={60} rx={2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <line x1={765} y1={50} x2={765} y2={110} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <line x1={740} y1={80} x2={790} y2={80} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />

        {/* ── Plant (left corner) ── */}
        <rect x={30} y={FLOOR_Y - 30} width={14} height={30} rx={3} fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth={0.5} />
        <circle cx={37} cy={FLOOR_Y - 38} r={10} fill="rgba(52,211,153,0.06)" />

        {/* ── Plant (right corner) ── */}
        <rect x={956} y={FLOOR_Y - 24} width={12} height={24} rx={3} fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.12)" strokeWidth={0.5} />
        <circle cx={962} cy={FLOOR_Y - 30} r={8} fill="rgba(167,139,250,0.06)" />

        {/* ── Desk stations + Avatars ── */}
        {STATIONS.map((station, i) => {
          const deskX = DESK_POSITIONS[i];
          const isWorking = workingState[station.id] ?? false;

          return (
            <g key={station.id}>
              <DeskUnit
                x={deskX}
                y={DESK_Y}
                color={station.color}
                isActive={isWorking}
              />
              <LegoAvatar
                x={deskX}
                y={FLOOR_Y}
                color={station.color}
                badge={station.badge}
                label={station.label}
                isWorking={isWorking}
              />
            </g>
          );
        })}

        {/* ── Floor reflections (subtle) ── */}
        <rect x={0} y={FLOOR_Y + 2} width={1000} height={1} fill="rgba(255,255,255,0.02)" />
      </svg>
    </div>
  );
}
