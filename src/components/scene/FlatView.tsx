'use client';

import React from 'react';
import { ROOM_W, WALL_H } from './iso';
import { DESK_POS, ACTIVITIES } from './activities';
import type { AvatarState } from './Scene';

const SX = 30;  // px per world unit horizontal
const SZ = 50;  // px per world unit vertical (exaggerated)
const PAD = 35;
const FLOOR_Y = PAD + WALL_H * SZ;
const SVG_W = ROOM_W * SX + 2 * PAD;
const SVG_H = WALL_H * SZ + 2 * PAD + 20;

function tx(wx: number) { return PAD + wx * SX; }
function tz(wz: number) { return FLOOR_Y - wz * SZ; }

export interface FlatViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function FlatView({ avatars, workingState }: FlatViewProps) {
  return (
    <div className="scene-view">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} preserveAspectRatio="xMidYMid meet" className="scene-svg">
        {/* Back wall */}
        <rect x={PAD} y={PAD} width={ROOM_W * SX} height={WALL_H * SZ}
          fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* NYSE banner */}
        <rect x={tx(4)} y={tz(5.2)} width={5 * SX} height={2.2 * SZ}
          fill="rgba(0,50,120,0.25)" stroke="rgba(100,180,255,0.2)" strokeWidth={1} rx={3} />
        <text x={tx(6.5)} y={tz(4.2)} textAnchor="middle" fill="rgba(255,255,255,0.8)"
          fontSize={16} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={3}>NYSE</text>
        <text x={tx(6.5)} y={tz(3.5)} textAnchor="middle" fill="rgba(100,180,255,0.5)"
          fontSize={7} fontFamily="'Space Mono', monospace" letterSpacing={1}>NEW YORK STOCK EXCHANGE</text>

        {/* NASDAQ banner */}
        <rect x={tx(19)} y={tz(5.2)} width={5 * SX} height={2.2 * SZ}
          fill="rgba(0,80,50,0.25)" stroke="rgba(52,211,153,0.2)" strokeWidth={1} rx={3} />
        <text x={tx(21.5)} y={tz(4.2)} textAnchor="middle" fill="rgba(255,255,255,0.8)"
          fontSize={14} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={2}>NASDAQ</text>
        <text x={tx(21.5)} y={tz(3.5)} textAnchor="middle" fill="rgba(52,211,153,0.5)"
          fontSize={7} fontFamily="'Space Mono', monospace" letterSpacing={1}>STOCK MARKET</text>

        {/* Ticker tape */}
        <rect x={tx(3)} y={tz(5.8)} width={(ROOM_W - 6) * SX} height={0.3 * SZ}
          fill="rgba(255,200,0,0.04)" stroke="rgba(255,200,0,0.08)" strokeWidth={0.5} />
        <text x={tx(ROOM_W / 2)} y={tz(5.55)} textAnchor="middle" fill="rgba(255,200,0,0.35)"
          fontSize={7} fontFamily="'Space Mono', monospace" letterSpacing={1}>
          ASTS +2.4%   NVDA +1.2%   TSLA -0.8%   MSFT +0.5%   AAPL +0.3%
        </text>

        {/* Windows */}
        {[[10, 12.5], [15.5, 18]].map(([x1, x2], i) => (
          <g key={`win${i}`}>
            <rect x={tx(x1)} y={tz(4.5)} width={(x2 - x1) * SX} height={3 * SZ}
              fill="rgba(30,40,80,0.1)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} rx={2} />
            <line x1={tx((x1 + x2) / 2)} y1={tz(4.5)} x2={tx((x1 + x2) / 2)} y2={tz(1.5)}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            <line x1={tx(x1)} y1={tz(3)} x2={tx(x2)} y2={tz(3)}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          </g>
        ))}

        {/* Clock */}
        <circle cx={tx(14)} cy={tz(4.5)} r={10} fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />

        {/* Floor line */}
        <line x1={PAD} y1={FLOOR_Y} x2={SVG_W - PAD} y2={FLOOR_Y}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />

        {/* Desks + monitors + chairs */}
        {DESK_POS.map((desk, i) => {
          const deskX = tx(desk.x - 1.4);
          const deskW = 2.8 * SX;
          const deskY = tz(1.62); // desk surface height
          const isActive = workingState[avatars[i]?.id] ?? false;
          const color = avatars[i]?.color ?? '#888';

          return (
            <g key={`desk${i}`}>
              {/* Desk legs */}
              <rect x={deskX + 4} y={deskY} width={3} height={1.62 * SZ}
                fill="rgba(120,90,50,0.15)" />
              <rect x={deskX + deskW - 7} y={deskY} width={3} height={1.62 * SZ}
                fill="rgba(120,90,50,0.15)" />
              {/* Desk surface */}
              <rect x={deskX} y={deskY - 3} width={deskW} height={6}
                fill="rgba(120,90,50,0.2)" stroke="rgba(120,90,50,0.35)" strokeWidth={0.8} rx={1} />

              {/* Monitor stand */}
              <rect x={deskX + deskW / 2 - 2} y={tz(2.1)} width={4} height={0.5 * SZ}
                fill="rgba(60,60,70,0.2)" />
              {/* Monitor (widescreen) */}
              <rect x={deskX + 0.2 * SX} y={tz(2.7)} width={2.4 * SX} height={1 * SZ}
                fill="rgba(30,30,40,0.4)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} rx={2} />
              {/* Screen content */}
              <rect x={deskX + 0.3 * SX} y={tz(2.6)} width={2.2 * SX} height={0.8 * SZ}
                fill={isActive ? `${color}18` : 'rgba(20,20,35,0.3)'}
                rx={1} />
              {isActive && (
                <>
                  {[0, 0.15, 0.3, 0.45].map((off, li) => (
                    <line key={li}
                      x1={deskX + 0.5 * SX} y1={tz(2.5) + off * SZ}
                      x2={deskX + 0.5 * SX + [1.5, 1.1, 1.8, 0.9][li] * SX * 0.5}
                      y2={tz(2.5) + off * SZ}
                      stroke={`${color}50`} strokeWidth={1.5} />
                  ))}
                </>
              )}

              {/* Keyboard */}
              <rect x={deskX + 0.8 * SX} y={deskY - 5} width={1.2 * SX} height={3}
                fill={isActive ? `${color}15` : 'rgba(255,255,255,0.04)'}
                stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} rx={1} />

              {/* Chair */}
              <rect x={deskX + deskW / 2 - 10} y={tz(1)} width={20} height={0.6 * SZ}
                fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} rx={3} />
              {/* Chair back */}
              <rect x={deskX + deskW / 2 - 8} y={tz(1.7)} width={16} height={0.5 * SZ}
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} rx={2} />
            </g>
          );
        })}

        {/* Coffee station */}
        <rect x={tx(4)} y={tz(2.5)} width={2.5 * SX} height={2.5 * SZ}
          fill="rgba(139,90,43,0.12)" stroke="rgba(139,90,43,0.2)" strokeWidth={0.8} rx={2} />
        <text x={tx(5.25)} y={tz(1.2)} textAnchor="middle" fill="rgba(255,255,255,0.12)"
          fontSize={7} fontFamily="'Space Mono', monospace">COFFEE</text>

        {/* Server rack */}
        <rect x={tx(1)} y={tz(4)} width={1.5 * SX} height={4 * SZ}
          fill="rgba(50,50,70,0.12)" stroke="rgba(50,50,70,0.2)" strokeWidth={0.8} rx={1} />
        {[0.5, 1.2, 1.9, 2.6, 3.3].map((z, j) => (
          <circle key={`led${j}`} cx={tx(1.3)} cy={tz(z + 0.3)} r={2}
            fill={j % 2 === 0 ? 'rgba(52,211,153,0.5)' : 'rgba(100,180,255,0.4)'}
            className="scene-ps5-light" />
        ))}

        {/* Bookshelf */}
        <rect x={tx(25)} y={tz(4.5)} width={2.5 * SX} height={4.5 * SZ}
          fill="rgba(100,70,40,0.1)" stroke="rgba(100,70,40,0.2)" strokeWidth={0.8} rx={1} />
        {[1.5, 2.6, 3.7].map((sz, si) => (
          <line key={`sh${si}`} x1={tx(25)} y1={tz(sz)} x2={tx(27.5)} y2={tz(sz)}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        ))}

        {/* Avatars */}
        {avatars.map(a => {
          const actDef = ACTIVITIES[a.activity];
          const seated = actDef.seated;
          const hidden = a.activity === 'bathroom';
          const ax = tx(a.wx);
          const headR = 8;
          const bodyH = seated ? 1.2 * SZ : 1.8 * SZ;
          const bodyTop = seated ? tz(1.3) : tz(2);
          const headY = bodyTop - headR - 2;

          return (
            <g key={a.id} className="scene-avatar-flat" style={{ opacity: hidden ? 0.25 : 1 }}>
              {/* Body */}
              <rect x={ax - 7} y={bodyTop} width={14} height={bodyH}
                fill={a.color} opacity={0.8} rx={3} />
              <text x={ax} y={bodyTop + bodyH / 2 + 3} textAnchor="middle"
                fill="#0a0a0a" fontSize={6} fontWeight={700} fontFamily="'Space Mono', monospace">{a.badge}</text>
              {/* Head */}
              <circle cx={ax} cy={headY} r={headR} fill={`${a.color}cc`} stroke={a.color} strokeWidth={0.8} />
              <circle cx={ax - 2} cy={headY - 1} r={1.2} fill="#0a0a0a" />
              <circle cx={ax + 3} cy={headY - 1} r={1.2} fill="#0a0a0a" />
              {/* Label */}
              <text x={ax} y={FLOOR_Y + 14} textAnchor="middle"
                fill="rgba(255,255,255,0.5)" fontSize={8} fontFamily="'Outfit', sans-serif">{a.label}</text>
              {/* Working pulse */}
              {(workingState[a.id]) && (
                <circle cx={ax} cy={headY - headR - 5} r={3} fill={a.color} className="scene-status-pulse" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
