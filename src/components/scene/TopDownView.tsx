'use client';

import React from 'react';
import { ROOM_W, ROOM_D } from './iso';
import { DESK_POS, ZONES } from './activities';
import type { AvatarState } from './Scene';

const S = 30; // px per world unit
const PAD = 40;
const W = ROOM_W * S + 2 * PAD;
const H = ROOM_D * S + 2 * PAD;

function ts(wx: number, wy: number) {
  return { x: PAD + wx * S, y: PAD + wy * S };
}

// Furniture definitions for floor plan
const FURNITURE: Array<{ x: number; y: number; w: number; d: number; label?: string; fill: string; stroke: string }> = [
  // Conference table
  { x: 3, y: 3, w: 5, d: 3, label: 'CONF', fill: 'rgba(120,90,50,0.15)', stroke: 'rgba(120,90,50,0.3)' },
  // Couch
  { x: 21, y: 2, w: 4.5, d: 2, label: 'COUCH', fill: 'rgba(100,100,120,0.12)', stroke: 'rgba(100,100,120,0.25)' },
  // TV
  { x: 22, y: 5, w: 2.5, d: 0.4, fill: 'rgba(60,60,80,0.15)', stroke: 'rgba(60,60,80,0.3)' },
  // Server rack
  { x: 1, y: 2, w: 1.5, d: 2, label: 'SRV', fill: 'rgba(50,50,70,0.15)', stroke: 'rgba(50,50,70,0.3)' },
  // Filing cabinets
  { x: 1, y: 11, w: 4.2, d: 1, fill: 'rgba(80,80,90,0.1)', stroke: 'rgba(80,80,90,0.2)' },
  // Coffee station
  { x: 4, y: 12.5, w: 2.5, d: 1, label: 'COFFEE', fill: 'rgba(139,90,43,0.15)', stroke: 'rgba(139,90,43,0.3)' },
  // Water cooler
  { x: 7.5, y: 12.5, w: 0.8, d: 0.8, fill: 'rgba(80,130,200,0.12)', stroke: 'rgba(80,130,200,0.25)' },
  // Bookshelf
  { x: 25, y: 12, w: 2.5, d: 1.2, label: 'BOOKS', fill: 'rgba(100,70,40,0.12)', stroke: 'rgba(100,70,40,0.25)' },
];

export interface TopDownViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function TopDownView({ avatars, workingState }: TopDownViewProps) {
  return (
    <div className="scene-view">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="scene-svg">
        {/* Room background */}
        <rect x={PAD} y={PAD} width={ROOM_W * S} height={ROOM_D * S}
          fill="rgba(255,255,255,0.015)" rx={2} />

        {/* Grid */}
        {Array.from({ length: ROOM_W + 1 }, (_, i) => (
          <line key={`gx${i}`} x1={PAD + i * S} y1={PAD} x2={PAD + i * S} y2={PAD + ROOM_D * S}
            stroke="rgba(255,255,255,0.025)" strokeWidth={0.5}
            strokeDasharray={i % 4 === 0 ? 'none' : '2,4'} />
        ))}
        {Array.from({ length: ROOM_D + 1 }, (_, i) => (
          <line key={`gy${i}`} x1={PAD} y1={PAD + i * S} x2={PAD + ROOM_W * S} y2={PAD + i * S}
            stroke="rgba(255,255,255,0.025)" strokeWidth={0.5}
            strokeDasharray={i % 4 === 0 ? 'none' : '2,4'} />
        ))}

        {/* Room outline (walls) */}
        <rect x={PAD} y={PAD} width={ROOM_W * S} height={ROOM_D * S}
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} rx={1} />

        {/* Carpet area */}
        <rect x={PAD + 6 * S} y={PAD + 5.5 * S} width={20 * S} height={5 * S}
          fill="rgba(20,20,50,0.08)" stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} rx={2} />

        {/* Furniture */}
        {FURNITURE.map((f, i) => {
          const pos = ts(f.x, f.y);
          return (
            <g key={`furn${i}`}>
              <rect x={pos.x} y={pos.y} width={f.w * S} height={f.d * S}
                fill={f.fill} stroke={f.stroke} strokeWidth={1} rx={2} />
              {f.label && (
                <text x={pos.x + f.w * S / 2} y={pos.y + f.d * S / 2 + 3}
                  textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={7}
                  fontFamily="'Space Mono', monospace">{f.label}</text>
              )}
            </g>
          );
        })}

        {/* Desks with monitors */}
        {DESK_POS.map((desk, i) => {
          const pos = ts(desk.x - 1.4, desk.y - 0.2);
          const isActive = workingState[avatars[i]?.id] ?? false;
          const color = avatars[i]?.color ?? '#888';
          return (
            <g key={`desk${i}`}>
              {/* Desk surface */}
              <rect x={pos.x} y={pos.y} width={2.8 * S} height={1.4 * S}
                fill="rgba(120,90,50,0.12)" stroke="rgba(120,90,50,0.25)" strokeWidth={1} rx={2} />
              {/* Monitors (two rectangles on desk) */}
              <rect x={pos.x + 0.4 * S} y={pos.y + 0.7 * S} width={0.8 * S} height={0.15 * S}
                fill={isActive ? `${color}30` : 'rgba(255,255,255,0.06)'}
                stroke={isActive ? `${color}50` : 'rgba(255,255,255,0.1)'} strokeWidth={0.5} rx={1} />
              <rect x={pos.x + 1.6 * S} y={pos.y + 0.7 * S} width={0.8 * S} height={0.15 * S}
                fill={isActive ? `${color}30` : 'rgba(255,255,255,0.06)'}
                stroke={isActive ? `${color}50` : 'rgba(255,255,255,0.1)'} strokeWidth={0.5} rx={1} />
              {/* Chair (circle in front of desk) */}
              <circle cx={pos.x + 1.4 * S} cy={pos.y - 0.5 * S} r={S * 0.35}
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
            </g>
          );
        })}

        {/* Conference chairs */}
        {[[3.5, 2.5], [5.5, 2.5], [7.5, 2.5], [3.5, 6.5], [5.5, 6.5], [7.5, 6.5]].map(([cx, cy], i) => {
          const pos = ts(cx, cy);
          return <circle key={`cc${i}`} cx={pos.x + S * 0.4} cy={pos.y + S * 0.4} r={S * 0.3}
            fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />;
        })}

        {/* Zone labels */}
        {(() => {
          const zones: Array<{ pos: { x: number; y: number }; label: string }> = [
            { pos: ZONES.bathroom, label: 'WC' },
            { pos: ZONES.coffee, label: 'COFFEE' },
            { pos: ZONES.bookshelf, label: 'LIBRARY' },
          ];
          return zones.map((z, i) => {
            const p = ts(z.pos.x, z.pos.y);
            return <text key={`zl${i}`} x={p.x} y={p.y - 6} textAnchor="middle"
              fill="rgba(255,255,255,0.12)" fontSize={6} fontFamily="'Space Mono', monospace">{z.label}</text>;
          });
        })()}

        {/* Plants */}
        {[{ x: 3, y: 8 }, { x: 27, y: 11 }, { x: 1, y: 5 }, { x: 20, y: 1 }].map((pl, i) => {
          const pos = ts(pl.x, pl.y);
          return <circle key={`pl${i}`} cx={pos.x} cy={pos.y} r={S * 0.3}
            fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.12)" strokeWidth={0.5} />;
        })}

        {/* Avatars */}
        {avatars.map(a => {
          const pos = ts(a.wx, a.wy);
          const isActive = workingState[a.id] ?? false;
          return (
            <g key={a.id} className="scene-avatar-topdown">
              <circle cx={pos.x} cy={pos.y} r={S * 0.38}
                fill={`${a.color}${isActive ? 'cc' : '88'}`}
                stroke={a.color} strokeWidth={1} />
              <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="#0a0a0a"
                fontSize={6} fontWeight={700} fontFamily="'Space Mono', monospace">{a.badge}</text>
              <text x={pos.x} y={pos.y + S * 0.6} textAnchor="middle"
                fill="rgba(255,255,255,0.5)" fontSize={7} fontFamily="'Outfit', sans-serif">{a.label}</text>
              {isActive && (
                <circle cx={pos.x} cy={pos.y} r={S * 0.45}
                  fill="none" stroke={a.color} strokeWidth={1} opacity={0.4} className="scene-status-pulse" />
              )}
            </g>
          );
        })}

        {/* Wall labels */}
        <text x={PAD + ROOM_W * S / 2} y={PAD - 10} textAnchor="middle"
          fill="rgba(255,255,255,0.08)" fontSize={8} fontFamily="'Space Mono', monospace"
          letterSpacing={4}>STOCKINGS AI TRADING FLOOR</text>
      </svg>
    </div>
  );
}
