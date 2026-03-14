'use client';

import React from 'react';

export interface DeskUnitProps {
  x: number;
  y: number;
  color: string;
  isActive: boolean;
}

/**
 * SVG desk station: desk surface, monitor, keyboard, chair.
 * Monitor glows when isActive is true.
 */
export default function DeskUnit({ x, y, color, isActive }: DeskUnitProps) {
  const monitorFilter = isActive ? `url(#glow-${color.replace('#', '')})` : undefined;

  return (
    <g>
      {/* Desk surface */}
      <rect
        x={x - 40}
        y={y - 10}
        width={80}
        height={8}
        rx={2}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5}
      />
      {/* Desk legs */}
      <rect x={x - 36} y={y - 2} width={4} height={20} rx={1} fill="rgba(255,255,255,0.04)" />
      <rect x={x + 32} y={y - 2} width={4} height={20} rx={1} fill="rgba(255,255,255,0.04)" />

      {/* Monitor stand */}
      <rect
        x={x - 2}
        y={y - 18}
        width={4}
        height={8}
        fill="rgba(255,255,255,0.08)"
      />
      {/* Monitor frame */}
      <rect
        x={x - 22}
        y={y - 44}
        width={44}
        height={26}
        rx={3}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1}
      />
      {/* Monitor screen */}
      <rect
        x={x - 19}
        y={y - 41}
        width={38}
        height={20}
        rx={2}
        fill={isActive ? `${color}20` : 'rgba(255,255,255,0.02)'}
        filter={monitorFilter}
        className={isActive ? 'scene-monitor-active' : ''}
      />
      {/* Screen content lines (when active) */}
      {isActive && (
        <>
          <rect x={x - 14} y={y - 37} width={20} height={1.5} rx={0.5} fill={`${color}40`} />
          <rect x={x - 14} y={y - 33} width={14} height={1.5} rx={0.5} fill={`${color}30`} />
          <rect x={x - 14} y={y - 29} width={24} height={1.5} rx={0.5} fill={`${color}35`} />
          <rect x={x - 14} y={y - 25} width={10} height={1.5} rx={0.5} fill={`${color}25`} />
        </>
      )}

      {/* Keyboard */}
      <rect
        x={x - 16}
        y={y - 7}
        width={32}
        height={4}
        rx={1}
        fill={isActive ? `${color}15` : 'rgba(255,255,255,0.04)'}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.5}
        className={isActive ? 'scene-keyboard-active' : ''}
      />

      {/* Chair (behind desk, slightly lower) */}
      <rect
        x={x - 14}
        y={y + 6}
        width={28}
        height={16}
        rx={4}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.5}
      />
      {/* Chair back */}
      <rect
        x={x - 12}
        y={y + 2}
        width={24}
        height={6}
        rx={3}
        fill="rgba(255,255,255,0.04)"
      />
    </g>
  );
}
