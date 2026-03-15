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
 * Uses solid opaque colors (Sims-style) with distinct face shading.
 */
export default function IsoDeskUnit({ wx, wy, color, isActive, rotation: rot, pitch: pitchDeg = 0 }: IsoDeskUnitProps) {
  const monitorFilter = isActive ? `url(#glow-${color.replace('#', '')})` : undefined;
  const p = (x: number, y: number, z: number) => toIso(x, y, z, rot, pitchDeg);

  const deskFaces = blockFaces(wx - 2.0, wy - 0.3, 1.5, 4.0, 1.6, 0.12, rot, pitchDeg);
  const legs = [
    blockFaces(wx - 1.85, wy, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.73, wy, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx - 1.85, wy + 1.1, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.73, wy + 1.1, 0, 0.12, 0.12, 1.5, rot, pitchDeg),
  ];

  const monL = { cx: wx - 0.8, cy: wy + 0.5 };
  const monR = { cx: wx + 0.8, cy: wy + 0.5 };

  // ── Chair geometry ──
  // Five-star base (5 short legs radiating from center)
  const baseCenterX = wx;
  const baseCenterY = wy - 1.05;
  const starLegs = [
    blockFaces(baseCenterX - 0.5,  baseCenterY - 0.15, 0, 0.5, 0.12, 0.08, rot, pitchDeg),
    blockFaces(baseCenterX + 0.02, baseCenterY - 0.15, 0, 0.5, 0.12, 0.08, rot, pitchDeg),
    blockFaces(baseCenterX - 0.15, baseCenterY - 0.5,  0, 0.12, 0.5, 0.08, rot, pitchDeg),
    blockFaces(baseCenterX - 0.15, baseCenterY + 0.02, 0, 0.12, 0.5, 0.08, rot, pitchDeg),
  ];
  // Central cylinder / gas lift
  const chairPole = blockFaces(baseCenterX - 0.1, baseCenterY - 0.1, 0.08, 0.2, 0.2, 0.62, rot, pitchDeg);
  // Seat cushion (wider, padded look)
  const chairSeat = blockFaces(wx - 0.55, wy - 1.6, 0.7, 1.1, 1.1, 0.18, rot, pitchDeg);
  // Backrest (tall, behind the seat — away from desk)
  const chairBack = blockFaces(wx - 0.45, wy - 1.74, 0.75, 0.9, 0.14, 0.95, rot, pitchDeg);
  // Armrests (two thin bars on each side)
  const armrestL = blockFaces(wx - 0.5,  wy - 1.4, 0.88, 0.1, 0.9, 0.08, rot, pitchDeg);
  const armrestR = blockFaces(wx + 0.4,  wy - 1.4, 0.88, 0.1, 0.9, 0.08, rot, pitchDeg);
  // Armrest supports (vertical posts, near back of seat)
  const armSupportL = blockFaces(wx - 0.5,  wy - 1.5, 0.7, 0.1, 0.12, 0.18, rot, pitchDeg);
  const armSupportR = blockFaces(wx + 0.4,  wy - 1.5, 0.7, 0.1, 0.12, 0.18, rot, pitchDeg);

  return (
    <g>
      {/* ── Chair ── */}
      {/* Star base legs (dark metal) */}
      {starLegs.map((leg, i) => (
        <g key={`starleg${i}`}>
          <polygon points={leg.top} fill="#555560" stroke="#48484f" strokeWidth={0.5} />
          <polygon points={leg.south} fill="#4a4a54" stroke="#3e3e48" strokeWidth={0.5} />
          <polygon points={leg.east} fill="#505058" stroke="#44444e" strokeWidth={0.5} />
        </g>
      ))}
      {/* Central pole / gas lift (chrome) */}
      <polygon points={chairPole.east} fill="#606068" stroke="#52525a" strokeWidth={0.5} />
      <polygon points={chairPole.south} fill="#686870" stroke="#5a5a62" strokeWidth={0.5} />
      <polygon points={chairPole.top} fill="#707078" stroke="#62626a" strokeWidth={0.5} />
      {/* Seat cushion (dark fabric) */}
      <polygon points={chairSeat.east} fill="#404048" stroke="#36363e" strokeWidth={0.5} />
      <polygon points={chairSeat.south} fill="#45454d" stroke="#3a3a42" strokeWidth={0.5} />
      <polygon points={chairSeat.top} fill="#4d4d55" stroke="#42424a" strokeWidth={0.5} />
      {/* Armrest supports */}
      <polygon points={armSupportL.east} fill="#505058" stroke="#44444e" strokeWidth={0.5} />
      <polygon points={armSupportL.south} fill="#555560" stroke="#48484f" strokeWidth={0.5} />
      <polygon points={armSupportR.east} fill="#505058" stroke="#44444e" strokeWidth={0.5} />
      <polygon points={armSupportR.south} fill="#555560" stroke="#48484f" strokeWidth={0.5} />
      {/* Armrests (padded) */}
      <polygon points={armrestL.top} fill="#48484f" stroke="#3e3e46" strokeWidth={0.5} />
      <polygon points={armrestL.south} fill="#404048" stroke="#36363e" strokeWidth={0.5} />
      <polygon points={armrestR.top} fill="#48484f" stroke="#3e3e46" strokeWidth={0.5} />
      <polygon points={armrestR.south} fill="#404048" stroke="#36363e" strokeWidth={0.5} />
      {/* Backrest (fabric) */}
      <polygon points={chairBack.east} fill="#3a3a42" stroke="#30303a" strokeWidth={0.5} />
      <polygon points={chairBack.south} fill="#404048" stroke="#36363e" strokeWidth={0.5} />
      <polygon points={chairBack.top} fill="#48484f" stroke="#3e3e46" strokeWidth={0.5} />

      {/* ── Desk legs (steel gray) ── */}
      {legs.map((leg, i) => (
        <g key={`leg${i}`}>
          <polygon points={leg.east} fill="#5a5a64" stroke="#4e4e58" strokeWidth={0.5} />
          <polygon points={leg.south} fill="#62626c" stroke="#56565f" strokeWidth={0.5} />
        </g>
      ))}

      {/* ── Desk surface (warm wood) ── */}
      <polygon points={deskFaces.east} fill="#8b6e47" stroke="#7a6040" strokeWidth={0.6} />
      <polygon points={deskFaces.south} fill="#96764d" stroke="#856a44" strokeWidth={0.6} />
      <polygon points={deskFaces.north} fill="#8b6e47" stroke="#7a6040" strokeWidth={0.6} />
      <polygon points={deskFaces.west} fill="#96764d" stroke="#856a44" strokeWidth={0.6} />
      <polygon points={deskFaces.top} fill="#a5845a" stroke="#947550" strokeWidth={0.6} />

      {/* ── Monitor stands (dark metal) ── */}
      {[monL, monR].map((mon, mi) => {
        const standFaces = blockFaces(mon.cx - 0.08, mon.cy, 1.62, 0.16, 0.12, 0, rot, pitchDeg);
        return <polygon key={`stand${mi}`} points={standFaces.top} fill="#555560" stroke="#48484f" strokeWidth={0.5} />;
      })}

      {/* ── Dual monitors — wide trading panels ── */}
      {[monL, monR].map((mon, mi) => {
        const bl = p(mon.cx - 0.7, mon.cy, 1.65);
        const br = p(mon.cx + 0.7, mon.cy, 1.65);
        const tr = p(mon.cx + 0.7, mon.cy, 2.85);
        const tl = p(mon.cx - 0.7, mon.cy, 2.85);

        const sbl = p(mon.cx - 0.6, mon.cy, 1.75);
        const sbr = p(mon.cx + 0.6, mon.cy, 1.75);
        const str = p(mon.cx + 0.6, mon.cy, 2.75);
        const stl = p(mon.cx - 0.6, mon.cy, 2.75);

        return (
          <g key={`mon${mi}`}>
            {/* Bezel */}
            <polygon points={isoPoints([bl, br, tr, tl])}
              fill="#2a2a32" stroke="#1e1e26" strokeWidth={1} />
            {/* Screen */}
            <polygon points={isoPoints([sbl, sbr, str, stl])}
              fill={isActive ? `${color}40` : '#141422'}
              filter={monitorFilter}
              className={isActive ? 'scene-monitor-active' : ''} />
            {/* Content lines */}
            {isActive && [0, 0.2, 0.4, 0.6].map((off, li) => {
              const ll = p(mon.cx - 0.45, mon.cy, 2.55 - off);
              const lr = p(mon.cx - 0.45 + [0.55, 0.4, 0.65, 0.3][li], mon.cy, 2.55 - off);
              return <line key={li} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                stroke={`${color}${['80', '60', '70', '50'][li]}`} strokeWidth={1.5} />;
            })}
          </g>
        );
      })}

      {/* ── Keyboard (dark plastic) ── */}
      {(() => {
        const kbFaces = blockFaces(wx - 0.5, wy + 0.1, 1.62, 1, 0.3, 0.04, rot, pitchDeg);
        return <polygon points={kbFaces.top}
          fill={isActive ? `${color}35` : '#38383f'}
          stroke="#2e2e36" strokeWidth={0.5}
          className={isActive ? 'scene-keyboard-active' : ''} />;
      })()}

      {/* ── Mouse ── */}
      {(() => {
        const mp = p(wx + 0.8, wy + 0.2, 1.62);
        return <ellipse cx={mp.x} cy={mp.y} rx={3} ry={2}
          fill="#404048" stroke="#36363e" strokeWidth={0.5} />;
      })()}
    </g>
  );
}
