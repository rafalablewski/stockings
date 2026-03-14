'use client';

import React from 'react';
import IsoDeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';
import { DESK_POS } from './activities';
import { toIso, isoPoints, blockFaces, ROOM_W, ROOM_D, WALL_H } from './iso';
import type { AvatarState } from './Scene';

/** Draw an isometric block (3 visible faces) */
function IsoBlock({
  x, y, z, w, d, h,
  topFill, southFill, eastFill,
  topStroke, southStroke, eastStroke,
  strokeWidth = 0.5,
  className,
}: {
  x: number; y: number; z: number;
  w: number; d: number; h: number;
  topFill: string; southFill: string; eastFill: string;
  topStroke?: string; southStroke?: string; eastStroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const faces = blockFaces(x, y, z, w, d, h);
  const stroke = 'rgba(255,255,255,0.06)';
  return (
    <g className={className}>
      {/* Draw back-to-front: east, south, top */}
      <polygon points={faces.east} fill={eastFill} stroke={eastStroke ?? stroke} strokeWidth={strokeWidth} />
      <polygon points={faces.south} fill={southFill} stroke={southStroke ?? stroke} strokeWidth={strokeWidth} />
      <polygon points={faces.top} fill={topFill} stroke={topStroke ?? stroke} strokeWidth={strokeWidth} />
    </g>
  );
}

export interface SceneViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function SceneView({ avatars, workingState }: SceneViewProps) {
  // Sort avatars by draw order (back-to-front: higher wx+wy drawn later)
  const sortedAvatars = [...avatars].sort((a, b) => (a.wx + a.wy) - (b.wx + b.wy));

  return (
    <div className="scene-view">
      <svg
        viewBox="0 -10 880 520"
        preserveAspectRatio="xMidYMid meet"
        className="scene-svg"
      >
        <defs>
          {/* Glow filters for active monitors */}
          {avatars.map(a => (
            <filter
              key={a.id}
              id={`glow-${a.color.replace('#', '')}`}
              x="-50%" y="-50%" width="200%" height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={a.color} floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          {/* Floor tile pattern */}
          <pattern id="iso-floor-grid" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse">
            {/* Grid lines are drawn inline for isometric accuracy */}
          </pattern>
        </defs>

        {/* ═══════════════════════════════════════════════════════════
            FLOOR — Isometric diamond grid
            ═══════════════════════════════════════════════════════════ */}
        {/* Floor base fill */}
        <polygon
          points={isoPoints([
            toIso(0, 0),
            toIso(ROOM_W, 0),
            toIso(ROOM_W, ROOM_D),
            toIso(0, ROOM_D),
          ])}
          fill="#0a0a0d"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={1}
        />

        {/* Floor grid lines (X direction) */}
        {Array.from({ length: ROOM_W + 1 }, (_, i) => {
          const p1 = toIso(i, 0);
          const p2 = toIso(i, ROOM_D);
          return (
            <line
              key={`gx-${i}`}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="rgba(255,255,255,0.025)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Floor grid lines (Y direction) */}
        {Array.from({ length: ROOM_D + 1 }, (_, i) => {
          const p1 = toIso(0, i);
          const p2 = toIso(ROOM_W, i);
          return (
            <line
              key={`gy-${i}`}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="rgba(255,255,255,0.025)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Rug under couch area */}
        <polygon
          points={isoPoints([
            toIso(18, 1.5),
            toIso(23, 1.5),
            toIso(23, 4.5),
            toIso(18, 4.5),
          ])}
          fill="rgba(99,102,241,0.04)"
          stroke="rgba(99,102,241,0.06)"
          strokeWidth={0.5}
        />

        {/* ═══════════════════════════════════════════════════════════
            WALLS — Back wall (y=ROOM_D) and Left wall (x=0)
            ═══════════════════════════════════════════════════════════ */}

        {/* Back wall (y=ROOM_D face) */}
        <polygon
          points={isoPoints([
            toIso(0, ROOM_D, 0),
            toIso(ROOM_W, ROOM_D, 0),
            toIso(ROOM_W, ROOM_D, WALL_H),
            toIso(0, ROOM_D, WALL_H),
          ])}
          fill="#0d0d10"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
        />

        {/* Left wall (x=0 face) */}
        <polygon
          points={isoPoints([
            toIso(0, 0, 0),
            toIso(0, ROOM_D, 0),
            toIso(0, ROOM_D, WALL_H),
            toIso(0, 0, WALL_H),
          ])}
          fill="#101014"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
        />

        {/* Wall corner edge */}
        {(() => {
          const bottom = toIso(0, ROOM_D, 0);
          const top = toIso(0, ROOM_D, WALL_H);
          return <line x1={bottom.x} y1={bottom.y} x2={top.x} y2={top.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />;
        })()}

        {/* ═══ BACK WALL DECORATIONS ═══ */}

        {/* Bathroom door on left wall */}
        <IsoBlock
          x={0} y={7} z={0} w={0.1} d={2.5} h={4.5}
          topFill="rgba(255,255,255,0.04)"
          southFill="rgba(255,255,255,0.03)"
          eastFill="rgba(255,255,255,0.02)"
          strokeWidth={0.5}
        />
        {/* WC sign */}
        {(() => {
          const pos = toIso(0.1, 8.25, 3.5);
          return (
            <text
              x={pos.x + 2} y={pos.y}
              textAnchor="middle" fill="rgba(255,255,255,0.25)"
              fontSize={7} fontFamily="'Space Mono', monospace" fontWeight={700}
            >
              WC
            </text>
          );
        })()}

        {/* Door handle */}
        {(() => {
          const pos = toIso(0.1, 7.3, 2.2);
          return <circle cx={pos.x + 2} cy={pos.y} r={2} fill="rgba(255,255,255,0.12)" />;
        })()}

        {/* Coffee machine on back wall */}
        <IsoBlock
          x={3.5} y={9.5} z={0} w={2} d={0.8} h={2.5}
          topFill="rgba(139,69,19,0.2)"
          southFill="rgba(139,69,19,0.15)"
          eastFill="rgba(139,69,19,0.1)"
        />
        {/* Coffee machine buttons */}
        {(() => {
          const p1 = toIso(4, 9.5, 2);
          const p2 = toIso(4.5, 9.5, 2);
          return (
            <>
              <circle cx={p1.x} cy={p1.y} r={2} fill="rgba(52,211,153,0.4)" />
              <circle cx={p2.x} cy={p2.y} r={2} fill="rgba(251,146,60,0.3)" />
            </>
          );
        })()}
        {/* COFFEE label */}
        {(() => {
          const pos = toIso(4.5, 9.5, 2.8);
          return (
            <text
              x={pos.x} y={pos.y}
              textAnchor="middle" fill="rgba(255,255,255,0.15)"
              fontSize={6} fontFamily="'Outfit', sans-serif" letterSpacing={1}
            >
              COFFEE
            </text>
          );
        })()}

        {/* Steam animation */}
        {(() => {
          const pos = toIso(4.2, 9.5, 2.6);
          return (
            <>
              <path d={`M${pos.x},${pos.y} Q${pos.x - 2},${pos.y - 6} ${pos.x},${pos.y - 12}`}
                fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} className="scene-steam" />
              <path d={`M${pos.x + 4},${pos.y} Q${pos.x + 2},${pos.y - 7} ${pos.x + 4},${pos.y - 13}`}
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} className="scene-steam scene-steam-delay" />
            </>
          );
        })()}

        {/* Window 1 on back wall */}
        {(() => {
          const bl = toIso(8, ROOM_D, 2);
          const br = toIso(10, ROOM_D, 2);
          const tr = toIso(10, ROOM_D, 5);
          const tl = toIso(8, ROOM_D, 5);
          const ml = toIso(9, ROOM_D, 2);
          const mr = toIso(9, ROOM_D, 5);
          const bm = toIso(8, ROOM_D, 3.5);
          const bm2 = toIso(10, ROOM_D, 3.5);
          return (
            <g>
              <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(30,40,80,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
              <line x1={bm.x} y1={bm.y} x2={bm2.x} y2={bm2.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            </g>
          );
        })()}

        {/* Sprint Board / Whiteboard */}
        {(() => {
          const bl = toIso(11, ROOM_D, 2.5);
          const br = toIso(13.5, ROOM_D, 2.5);
          const tr = toIso(13.5, ROOM_D, 4.8);
          const tl = toIso(11, ROOM_D, 4.8);
          const labelPos = toIso(12.25, ROOM_D, 4.3);
          const line1l = toIso(11.3, ROOM_D, 3.8);
          const line1r = toIso(12.8, ROOM_D, 3.8);
          const line2l = toIso(11.3, ROOM_D, 3.4);
          const line2r = toIso(13.2, ROOM_D, 3.4);
          const line3l = toIso(11.3, ROOM_D, 3.0);
          const line3r = toIso(12.3, ROOM_D, 3.0);
          return (
            <g>
              <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
              <text x={labelPos.x} y={labelPos.y} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize={5} fontFamily="'Outfit', sans-serif">SPRINT BOARD</text>
              <line x1={line1l.x} y1={line1l.y} x2={line1r.x} y2={line1r.y} stroke="rgba(52,211,153,0.12)" strokeWidth={1} />
              <line x1={line2l.x} y1={line2l.y} x2={line2r.x} y2={line2r.y} stroke="rgba(34,211,238,0.1)" strokeWidth={1} />
              <line x1={line3l.x} y1={line3l.y} x2={line3r.x} y2={line3r.y} stroke="rgba(251,146,60,0.08)" strokeWidth={1} />
            </g>
          );
        })()}

        {/* Clock on back wall */}
        {(() => {
          const center = toIso(12.25, ROOM_D, 5.3);
          return (
            <g>
              <circle cx={center.x} cy={center.y} r={10} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
              <circle cx={center.x} cy={center.y} r={1} fill="rgba(255,255,255,0.15)" />
              <line x1={center.x} y1={center.y} x2={center.x} y2={center.y - 7} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
              <line x1={center.x} y1={center.y} x2={center.x + 5} y2={center.y} stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
            </g>
          );
        })()}

        {/* Window 2 on back wall */}
        {(() => {
          const bl = toIso(15, ROOM_D, 2);
          const br = toIso(17, ROOM_D, 2);
          const tr = toIso(17, ROOM_D, 5);
          const tl = toIso(15, ROOM_D, 5);
          const ml = toIso(16, ROOM_D, 2);
          const mr = toIso(16, ROOM_D, 5);
          const bm = toIso(15, ROOM_D, 3.5);
          const bm2 = toIso(17, ROOM_D, 3.5);
          return (
            <g>
              <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(30,40,80,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
              <line x1={bm.x} y1={bm.y} x2={bm2.x} y2={bm2.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            </g>
          );
        })()}

        {/* Bookshelf on back wall */}
        <IsoBlock
          x={21} y={9} z={0} w={2.5} d={1} h={5}
          topFill="rgba(255,255,255,0.04)"
          southFill="rgba(255,255,255,0.03)"
          eastFill="rgba(255,255,255,0.02)"
        />
        {/* Shelf lines */}
        {[1.5, 2.8, 4.1].map(shelfZ => {
          const sl = toIso(21, 9, shelfZ);
          const sr = toIso(23.5, 9, shelfZ);
          return (
            <line key={shelfZ} x1={sl.x} y1={sl.y} x2={sr.x} y2={sr.y}
              stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
          );
        })}
        {/* Books on shelves */}
        {[1.6, 2.9, 4.2].map((shelfZ, si) => (
          <g key={si}>
            {[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8].map((offset, bi) => {
              const bookPos = toIso(21.2 + offset, 9, shelfZ);
              const colors = [
                'rgba(99,102,241,0.18)',
                'rgba(52,211,153,0.15)',
                'rgba(251,146,60,0.15)',
                'rgba(167,139,250,0.15)',
                'rgba(34,211,238,0.15)',
                'rgba(244,114,182,0.12)',
                'rgba(99,102,241,0.12)',
              ];
              return (
                <rect key={bi} x={bookPos.x - 2} y={bookPos.y - (10 - bi % 3)} width={3} height={10 - bi % 3}
                  rx={0.5} fill={colors[bi]} />
              );
            })}
          </g>
        ))}

        {/* ═══ PLANTS ═══ */}
        {/* Plant near coffee area */}
        {(() => {
          const pos = toIso(3, 8, 0);
          return (
            <g>
              <rect x={pos.x - 4} y={pos.y - 14} width={8} height={14} rx={3} fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth={0.5} />
              <circle cx={pos.x} cy={pos.y - 18} r={7} fill="rgba(52,211,153,0.06)" />
            </g>
          );
        })()}

        {/* Plant near bookshelf */}
        {(() => {
          const pos = toIso(23.5, 8, 0);
          return (
            <g>
              <rect x={pos.x - 3} y={pos.y - 10} width={6} height={10} rx={3} fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.12)" strokeWidth={0.5} />
              <circle cx={pos.x} cy={pos.y - 14} r={5} fill="rgba(167,139,250,0.06)" />
            </g>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════
            FURNITURE — drawn back-to-front
            ═══════════════════════════════════════════════════════════ */}

        {/* ── TV on back wall area ── */}
        {(() => {
          const tvBl = toIso(19.5, ROOM_D - 0.5, 2);
          const tvBr = toIso(22, ROOM_D - 0.5, 2);
          const tvTr = toIso(22, ROOM_D - 0.5, 4);
          const tvTl = toIso(19.5, ROOM_D - 0.5, 4);
          return (
            <g>
              {/* TV frame */}
              <polygon points={isoPoints([tvBl, tvBr, tvTr, tvTl])}
                fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
              {/* TV screen */}
              <polygon
                points={isoPoints([
                  toIso(19.7, ROOM_D - 0.5, 2.2),
                  toIso(21.8, ROOM_D - 0.5, 2.2),
                  toIso(21.8, ROOM_D - 0.5, 3.8),
                  toIso(19.7, ROOM_D - 0.5, 3.8),
                ])}
                fill="rgba(26,26,62,0.3)"
                className="scene-tv-screen"
              />
              {/* TV stand */}
              <IsoBlock x={20.5} y={9} z={0} w={0.5} d={0.5} h={2}
                topFill="rgba(255,255,255,0.06)"
                southFill="rgba(255,255,255,0.04)"
                eastFill="rgba(255,255,255,0.03)"
              />
            </g>
          );
        })()}

        {/* PS5 console near TV */}
        {(() => {
          const ps5Pos = toIso(22.2, 9, 0);
          return (
            <g>
              <IsoBlock x={22} y={8.8} z={0} w={0.4} d={0.4} h={1.2}
                topFill="rgba(255,255,255,0.06)"
                southFill="rgba(255,255,255,0.04)"
                eastFill="rgba(255,255,255,0.03)"
              />
              <rect x={ps5Pos.x - 1} y={ps5Pos.y - 10} width={3} height={2} rx={1}
                fill="rgba(100,149,237,0.3)" className="scene-ps5-light" />
            </g>
          );
        })()}

        {/* ── Couch ── */}
        {/* Couch seat */}
        <IsoBlock x={19} y={2} z={0} w={4} d={2} h={1}
          topFill="rgba(255,255,255,0.05)"
          southFill="rgba(255,255,255,0.035)"
          eastFill="rgba(255,255,255,0.025)"
        />
        {/* Couch back */}
        <IsoBlock x={19} y={3.5} z={0} w={4} d={0.5} h={1.8}
          topFill="rgba(255,255,255,0.04)"
          southFill="rgba(255,255,255,0.03)"
          eastFill="rgba(255,255,255,0.02)"
        />

        {/* ═══ DESKS (back to front, left to right) ═══ */}
        {DESK_POS.map((desk, i) => (
          <IsoDeskUnit
            key={i}
            wx={desk.x}
            wy={desk.y}
            color={avatars[i].color}
            isActive={workingState[avatars[i].id] ?? false}
          />
        ))}

        {/* ═══════════════════════════════════════════════════════════
            AVATARS — sorted back-to-front for proper overlap
            ═══════════════════════════════════════════════════════════ */}
        {sortedAvatars.map((avatar) => (
          <LegoAvatar
            key={avatar.id}
            wx={avatar.wx}
            wy={avatar.wy}
            color={avatar.color}
            badge={avatar.badge}
            label={avatar.label}
            activity={avatar.activity}
            isWorking={avatar.isWorking}
            chattingWith={avatar.chattingWith}
          />
        ))}
      </svg>
    </div>
  );
}
