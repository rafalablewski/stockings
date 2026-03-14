'use client';

import React from 'react';
import { toIso, isoPoints, blockFaces } from './iso';

export interface IsoDeskUnitProps {
  wx: number;
  wy: number;
  color: string;
  isActive: boolean;
  rotation: number;
  pitch?: number;
}

/**
 * Professional trading desk with dual monitors, keyboard, and ergonomic chair.
 */
export default function IsoDeskUnit({ wx, wy, color, isActive, rotation: rot, pitch: pitchDeg = 0 }: IsoDeskUnitProps) {
  const monitorFilter = isActive ? `url(#glow-${color.replace('#', '')})` : undefined;
  const p = (x: number, y: number, z: number) => toIso(x, y, z, rot, pitchDeg);

  // Desk surface: 2.8 wide, 1.4 deep, at height 1.5
  const deskFaces = blockFaces(wx - 1.4, wy - 0.2, 1.5, 2.8, 1.4, 0.12, rot, pitchDeg);
  // Desk legs
  const legs = [
    blockFaces(wx - 1.25, wy, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.13, wy, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx - 1.25, wy + 1, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.13, wy + 1, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
  ];

  // Dual monitors — side by side on desk, facing south (toward camera at rot=0)
  const monL = { cx: wx - 0.55, cy: wy + 0.5 };
  const monR = { cx: wx + 0.55, cy: wy + 0.5 };

  // Chair — in front of desk (south side)
  const chairSeat = blockFaces(wx - 0.55, wy - 1.6, 0.7, 1.1, 1.1, 0.15, rot, pitchDeg);
  const chairBack = blockFaces(wx - 0.45, wy - 0.6, 0.7, 0.9, 0.12, 1.0, rot, pitchDeg);
  // Chair base
  const chairBase = blockFaces(wx - 0.15, wy - 1.1, 0, 0.3, 0.3, 0.7, rot, pitchDeg);

  return (
    <g>
      {/* Chair base + seat (behind desk visually) */}
      <polygon points={chairBase.top} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.03)" strokeWidth={0.3} />
      <polygon points={chairBase.south} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.03)" strokeWidth={0.3} />
      <polygon points={chairSeat.east} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairSeat.south} fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />
      <polygon points={chairSeat.top} fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.4} />
      {/* Chair back */}
      <polygon points={chairBack.east} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.035)" strokeWidth={0.3} />
      <polygon points={chairBack.south} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.035)" strokeWidth={0.3} />
      <polygon points={chairBack.top} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth={0.3} />

      {/* Desk legs */}
      {legs.map((leg, i) => (
        <g key={`leg${i}`}>
          <polygon points={leg.east} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.03)" strokeWidth={0.3} />
          <polygon points={leg.south} fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.03)" strokeWidth={0.3} />
        </g>
      ))}

      {/* Desk surface */}
      <polygon points={deskFaces.east} fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.south} fill="rgba(255,255,255,0.065)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.north} fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.west} fill="rgba(255,255,255,0.065)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      <polygon points={deskFaces.top} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />

      {/* Monitor stands */}
      {[monL, monR].map((mon, mi) => {
        const standFaces = blockFaces(mon.cx - 0.08, mon.cy, 1.62, 0.16, 0.12, 0, rot, pitchDeg);
        return <polygon key={`stand${mi}`} points={standFaces.top} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.3} />;
      })}

      {/* Dual monitors */}
      {[monL, monR].map((mon, mi) => {
        const bl = p(mon.cx - 0.5, mon.cy, 1.65);
        const br = p(mon.cx + 0.5, mon.cy, 1.65);
        const tr = p(mon.cx + 0.5, mon.cy, 2.7);
        const tl = p(mon.cx - 0.5, mon.cy, 2.7);

        const sbl = p(mon.cx - 0.4, mon.cy, 1.75);
        const sbr = p(mon.cx + 0.4, mon.cy, 1.75);
        const str = p(mon.cx + 0.4, mon.cy, 2.6);
        const stl = p(mon.cx - 0.4, mon.cy, 2.6);

        return (
          <g key={`mon${mi}`}>
            {/* Frame */}
            <polygon points={isoPoints([bl, br, tr, tl])}
              fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.7} />
            {/* Screen */}
            <polygon points={isoPoints([sbl, sbr, str, stl])}
              fill={isActive ? `${color}20` : 'rgba(255,255,255,0.02)'}
              filter={monitorFilter}
              className={isActive ? 'scene-monitor-active' : ''} />
            {/* Content lines */}
            {isActive && [0, 0.2, 0.4, 0.6].map((off, li) => {
              const ll = p(mon.cx - 0.3, mon.cy, 2.45 - off);
              const lr = p(mon.cx - 0.3 + [0.4, 0.3, 0.5, 0.2][li], mon.cy, 2.45 - off);
              return <line key={li} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                stroke={`${color}${['40', '30', '35', '25'][li]}`} strokeWidth={1.2} />;
            })}
          </g>
        );
      })}

      {/* Keyboard */}
      {(() => {
        const kbFaces = blockFaces(wx - 0.5, wy + 0.1, 1.62, 1, 0.3, 0.04, rot, pitchDeg);
        return <polygon points={kbFaces.top}
          fill={isActive ? `${color}15` : 'rgba(255,255,255,0.04)'}
          stroke="rgba(255,255,255,0.06)" strokeWidth={0.4}
          className={isActive ? 'scene-keyboard-active' : ''} />;
      })()}

      {/* Mouse */}
      {(() => {
        const mp = p(wx + 0.8, wy + 0.2, 1.62);
        return <ellipse cx={mp.x} cy={mp.y} rx={3} ry={2}
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.3} />;
      })()}
    </g>
  );
}
