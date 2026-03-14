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
      <polygon points={chairBase.top} fill="rgba(60,60,68,0.35)" stroke="rgba(80,80,90,0.2)" strokeWidth={0.3} />
      <polygon points={chairBase.south} fill="rgba(50,50,58,0.3)" stroke="rgba(70,70,80,0.2)" strokeWidth={0.3} />
      <polygon points={chairSeat.east} fill="rgba(55,55,62,0.35)" stroke="rgba(75,75,85,0.2)" strokeWidth={0.3} />
      <polygon points={chairSeat.south} fill="rgba(60,60,68,0.38)" stroke="rgba(80,80,90,0.22)" strokeWidth={0.3} />
      <polygon points={chairSeat.top} fill="rgba(70,70,78,0.42)" stroke="rgba(90,90,100,0.25)" strokeWidth={0.4} />
      {/* Chair back */}
      <polygon points={chairBack.east} fill="rgba(50,50,58,0.32)" stroke="rgba(70,70,80,0.18)" strokeWidth={0.3} />
      <polygon points={chairBack.south} fill="rgba(55,55,62,0.35)" stroke="rgba(75,75,85,0.2)" strokeWidth={0.3} />
      <polygon points={chairBack.top} fill="rgba(65,65,72,0.38)" stroke="rgba(85,85,95,0.22)" strokeWidth={0.3} />

      {/* Desk legs */}
      {legs.map((leg, i) => (
        <g key={`leg${i}`}>
          <polygon points={leg.east} fill="rgba(100,80,55,0.35)" stroke="rgba(120,95,65,0.2)" strokeWidth={0.3} />
          <polygon points={leg.south} fill="rgba(110,85,58,0.38)" stroke="rgba(120,95,65,0.2)" strokeWidth={0.3} />
        </g>
      ))}

      {/* Desk surface */}
      <polygon points={deskFaces.east} fill="rgba(120,90,55,0.45)" stroke="rgba(140,110,70,0.3)" strokeWidth={0.5} />
      <polygon points={deskFaces.south} fill="rgba(130,95,58,0.5)" stroke="rgba(145,115,72,0.3)" strokeWidth={0.5} />
      <polygon points={deskFaces.north} fill="rgba(120,90,55,0.45)" stroke="rgba(140,110,70,0.3)" strokeWidth={0.5} />
      <polygon points={deskFaces.west} fill="rgba(130,95,58,0.5)" stroke="rgba(145,115,72,0.3)" strokeWidth={0.5} />
      <polygon points={deskFaces.top} fill="rgba(140,105,65,0.55)" stroke="rgba(160,125,80,0.35)" strokeWidth={0.5} />

      {/* Monitor stands */}
      {[monL, monR].map((mon, mi) => {
        const standFaces = blockFaces(mon.cx - 0.08, mon.cy, 1.62, 0.16, 0.12, 0, rot, pitchDeg);
        return <polygon key={`stand${mi}`} points={standFaces.top} fill="rgba(80,80,90,0.4)" stroke="rgba(100,100,110,0.25)" strokeWidth={0.3} />;
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
              fill="rgba(40,40,48,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} />
            {/* Screen */}
            <polygon points={isoPoints([sbl, sbr, str, stl])}
              fill={isActive ? `${color}30` : 'rgba(20,20,40,0.5)'}
              filter={monitorFilter}
              className={isActive ? 'scene-monitor-active' : ''} />
            {/* Content lines */}
            {isActive && [0, 0.2, 0.4, 0.6].map((off, li) => {
              const ll = p(mon.cx - 0.3, mon.cy, 2.45 - off);
              const lr = p(mon.cx - 0.3 + [0.4, 0.3, 0.5, 0.2][li], mon.cy, 2.45 - off);
              return <line key={li} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                stroke={`${color}${['60', '50', '55', '45'][li]}`} strokeWidth={1.5} />;
            })}
          </g>
        );
      })}

      {/* Keyboard */}
      {(() => {
        const kbFaces = blockFaces(wx - 0.5, wy + 0.1, 1.62, 1, 0.3, 0.04, rot, pitchDeg);
        return <polygon points={kbFaces.top}
          fill={isActive ? `${color}25` : 'rgba(50,50,60,0.35)'}
          stroke="rgba(255,255,255,0.12)" strokeWidth={0.4}
          className={isActive ? 'scene-keyboard-active' : ''} />;
      })()}

      {/* Mouse */}
      {(() => {
        const mp = p(wx + 0.8, wy + 0.2, 1.62);
        return <ellipse cx={mp.x} cy={mp.y} rx={3} ry={2}
          fill="rgba(60,60,70,0.35)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.3} />;
      })()}
    </g>
  );
}
