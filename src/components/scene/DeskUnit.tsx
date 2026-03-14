'use client';

import React from 'react';
import { toIso, isoPoints, blockFaces } from './iso';

export interface IsoDeskUnitProps {
  wx: number;
  wy: number;
  color: string;
  isActive: boolean;
}

/**
 * Isometric desk station: desk surface, monitor, keyboard, chair.
 * Monitor glows when isActive is true.
 */
export default function IsoDeskUnit({ wx, wy, color, isActive }: IsoDeskUnitProps) {
  const monitorFilter = isActive ? `url(#glow-${color.replace('#', '')})` : undefined;

  // Desk surface: 2.5 wide, 1 deep, at height 1.5
  const deskFaces = blockFaces(wx - 1.25, wy, 1.5, 2.5, 1, 0.15);
  // Desk legs
  const legFL = blockFaces(wx - 1.1, wy + 0.1, 0, 0.15, 0.15, 1.5);
  const legFR = blockFaces(wx + 0.95, wy + 0.1, 0, 0.15, 0.15, 1.5);
  const legBL = blockFaces(wx - 1.1, wy + 0.75, 0, 0.15, 0.15, 1.5);
  const legBR = blockFaces(wx + 0.95, wy + 0.75, 0, 0.15, 0.15, 1.5);

  // Monitor on desk
  const monBl = toIso(wx - 0.6, wy + 0.3, 1.65);
  const monBr = toIso(wx + 0.6, wy + 0.3, 1.65);
  const monTr = toIso(wx + 0.6, wy + 0.3, 2.8);
  const monTl = toIso(wx - 0.6, wy + 0.3, 2.8);

  // Monitor screen (slightly inset)
  const scrBl = toIso(wx - 0.5, wy + 0.3, 1.75);
  const scrBr = toIso(wx + 0.5, wy + 0.3, 1.75);
  const scrTr = toIso(wx + 0.5, wy + 0.3, 2.7);
  const scrTl = toIso(wx - 0.5, wy + 0.3, 2.7);

  // Monitor stand
  const standFaces = blockFaces(wx - 0.1, wy + 0.3, 1.65, 0.2, 0.15, 0);

  // Keyboard on desk
  const kbFaces = blockFaces(wx - 0.5, wy + 0.1, 1.65, 1, 0.3, 0.05);

  // Chair (in front of desk, lower)
  const chairSeatFaces = blockFaces(wx - 0.6, wy - 1.2, 0.6, 1.2, 1.2, 0.2);
  const chairBackFaces = blockFaces(wx - 0.5, wy - 0.1, 0.6, 0.15, 1, 1.2);

  return (
    <g>
      {/* Desk legs */}
      {[legBL, legBR, legFL, legFR].map((leg, i) => (
        <g key={`leg-${i}`}>
          <polygon points={leg.east} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
          <polygon points={leg.south} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
        </g>
      ))}

      {/* Desk surface */}
      <polygon points={deskFaces.east} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.south} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.top} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />

      {/* Monitor stand */}
      <polygon points={standFaces.top} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.3} />

      {/* Monitor frame */}
      <polygon
        points={isoPoints([monBl, monBr, monTr, monTl])}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={0.8}
      />

      {/* Monitor screen */}
      <polygon
        points={isoPoints([scrBl, scrBr, scrTr, scrTl])}
        fill={isActive ? `${color}20` : 'rgba(255,255,255,0.02)'}
        filter={monitorFilter}
        className={isActive ? 'scene-monitor-active' : ''}
      />

      {/* Screen content lines when active */}
      {isActive && (
        <>
          {[0, 0.25, 0.5, 0.75].map((offset, li) => {
            const ll = toIso(wx - 0.4, wy + 0.3, 2.5 - offset);
            const lr = toIso(wx - 0.4 + [0.6, 0.4, 0.7, 0.3][li], wy + 0.3, 2.5 - offset);
            return (
              <line key={li}
                x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                stroke={`${color}${['40', '30', '35', '25'][li]}`}
                strokeWidth={1.5}
              />
            );
          })}
        </>
      )}

      {/* Keyboard */}
      <polygon points={kbFaces.top}
        fill={isActive ? `${color}15` : 'rgba(255,255,255,0.04)'}
        stroke="rgba(255,255,255,0.06)" strokeWidth={0.4}
        className={isActive ? 'scene-keyboard-active' : ''}
      />

      {/* Chair */}
      <polygon points={chairSeatFaces.east} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairSeatFaces.south} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairSeatFaces.top} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.4} />

      {/* Chair back */}
      <polygon points={chairBackFaces.east} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairBackFaces.south} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairBackFaces.top} fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.05)" strokeWidth={0.3} />
    </g>
  );
}
