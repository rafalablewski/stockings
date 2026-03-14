'use client';

import React, { useMemo } from 'react';
import IsoDeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';
import { DESK_POS } from './activities';
import {
  toIso, isoPoints, blockFaces, computeViewBox,
  wallOpacity, isoDepth,
  ROOM_W, ROOM_D, WALL_H,
} from './iso';
import type { AvatarState } from './Scene';

// ── Helper: isometric block component ──
function IsoBlock({
  x, y, z, w, d, h, rot, pitch = 0,
  topFill, southFill, eastFill,
  topStroke, southStroke, eastStroke,
  strokeWidth = 0.5,
  className,
}: {
  x: number; y: number; z: number;
  w: number; d: number; h: number;
  rot: number;
  pitch?: number;
  topFill: string; southFill: string; eastFill: string;
  topStroke?: string; southStroke?: string; eastStroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const faces = blockFaces(x, y, z, w, d, h, rot, pitch);
  const s = 'rgba(0,0,0,0.3)';
  return (
    <g className={className}>
      <polygon points={faces.east} fill={eastFill} stroke={eastStroke ?? s} strokeWidth={strokeWidth} />
      <polygon points={faces.north} fill={eastFill} stroke={eastStroke ?? s} strokeWidth={strokeWidth} />
      <polygon points={faces.south} fill={southFill} stroke={southStroke ?? s} strokeWidth={strokeWidth} />
      <polygon points={faces.west} fill={southFill} stroke={southStroke ?? s} strokeWidth={strokeWidth} />
      <polygon points={faces.top} fill={topFill} stroke={topStroke ?? s} strokeWidth={strokeWidth} />
    </g>
  );
}

// ── Wall text at world position ──
function WallText({ wx, wy, wz, rot, children, fontSize = 6, fill = 'rgba(255,255,255,0.15)', ...rest }: {
  wx: number; wy: number; wz: number; rot: number;
  children: React.ReactNode;
  fontSize?: number; fill?: string;
  [key: string]: unknown;
}) {
  const p = toIso(wx, wy, wz, rot);
  return (
    <text x={p.x} y={p.y} textAnchor="middle" fill={fill} fontSize={fontSize}
      fontFamily="'Outfit', sans-serif" {...rest}>
      {children}
    </text>
  );
}

export interface SceneViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
  rotation: number;
  pitch?: number;
  zoom?: number;
}

export default function SceneView({ avatars, workingState, rotation: rot, pitch: pitchDeg = 0, zoom = 1.8 }: SceneViewProps) {
  const vb = useMemo(() => computeViewBox(rot, zoom, pitchDeg), [rot, zoom, pitchDeg]);
  const wo = useMemo(() => wallOpacity(rot), [rot]);

  // Sort avatars back-to-front for proper overlap
  const sortedAvatars = useMemo(() =>
    [...avatars].sort((a, b) => isoDepth(a.wx, a.wy, rot) - isoDepth(b.wx, b.wy, rot)),
    [avatars, rot]
  );

  // Sort desks by depth too
  const sortedDesks = useMemo(() =>
    DESK_POS.map((pos, i) => ({ pos, i, depth: isoDepth(pos.x, pos.y, rot) }))
      .sort((a, b) => a.depth - b.depth),
    [rot]
  );

  const p = (wx: number, wy: number, wz: number = 0) => toIso(wx, wy, wz, rot, pitchDeg);

  return (
    <div className="scene-view">
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="scene-svg"
      >
        <defs>
          {avatars.map(a => (
            <filter key={a.id} id={`glow-${a.color.replace('#', '')}`}
              x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={a.color} floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* ═══ FLOOR ═══ */}
        <polygon
          points={isoPoints([p(0, 0), p(ROOM_W, 0), p(ROOM_W, ROOM_D), p(0, ROOM_D)])}
          fill="#0c0c10"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={1}
        />
        {/* Floor grid */}
        {Array.from({ length: ROOM_W + 1 }, (_, i) => {
          const p1 = p(i, 0), p2 = p(i, ROOM_D);
          return <line key={`gx${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke="rgba(255,255,255,0.018)" strokeWidth={0.5} />;
        })}
        {Array.from({ length: ROOM_D + 1 }, (_, i) => {
          const p1 = p(0, i), p2 = p(ROOM_W, i);
          return <line key={`gy${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke="rgba(255,255,255,0.018)" strokeWidth={0.5} />;
        })}

        {/* ── Floor zone: Work area (dark blue carpet under desks) ── */}
        <polygon
          points={isoPoints([p(6, 5.5), p(26, 5.5), p(26, 10.5), p(6, 10.5)])}
          fill="#12142a"
          stroke="#1a1c38"
          strokeWidth={0.8}
        />

        {/* ── Floor zone: Conference room (teal/blue-green rug) ── */}
        <polygon
          points={isoPoints([p(2.5, 2.2), p(8.5, 2.2), p(8.5, 6.8), p(2.5, 6.8)])}
          fill="#14282e"
          stroke="#1c3840"
          strokeWidth={0.8}
        />

        {/* ── Floor zone: Coffee corner (warm brown tiles) ── */}
        <polygon
          points={isoPoints([p(3.5, 11.5), p(9, 11.5), p(9, 13.5), p(3.5, 13.5)])}
          fill="#1e1810"
          stroke="#2a2218"
          strokeWidth={0.8}
        />

        {/* ── Floor zone: Lounge (burgundy/warm rug) ── */}
        <polygon
          points={isoPoints([p(20, 1), p(26.5, 1), p(26.5, 5.5), p(20, 5.5)])}
          fill="#201418"
          stroke="#2e1c22"
          strokeWidth={0.8}
        />

        {/* ── Floor zone: Library (warm wood-toned floor) ── */}
        <polygon
          points={isoPoints([p(24, 11), p(28, 11), p(28, 13.5), p(24, 13.5)])}
          fill="#1a1610"
          stroke="#262018"
          strokeWidth={0.8}
        />

        {/* ═══ WALLS (opacity fades smoothly during rotation) ═══ */}
        {/* Back wall (y=ROOM_D) */}
        <g className="scene-wall" style={{ opacity: wo.back }}>
          <polygon
            points={isoPoints([p(0, ROOM_D, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(0, ROOM_D, WALL_H)])}
            fill="#0e0e14"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        </g>
        {/* Front wall (y=0) */}
        <g className="scene-wall" style={{ opacity: wo.front }}>
          <polygon
            points={isoPoints([p(0, 0, 0), p(ROOM_W, 0, 0), p(ROOM_W, 0, WALL_H), p(0, 0, WALL_H)])}
            fill="#0e0e14"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        </g>
        {/* Left wall (x=0) */}
        <g className="scene-wall" style={{ opacity: wo.left }}>
          <polygon
            points={isoPoints([p(0, 0, 0), p(0, ROOM_D, 0), p(0, ROOM_D, WALL_H), p(0, 0, WALL_H)])}
            fill="#111118"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        </g>
        {/* Right wall (x=ROOM_W) */}
        <g className="scene-wall" style={{ opacity: wo.right }}>
          <polygon
            points={isoPoints([p(ROOM_W, 0, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(ROOM_W, 0, WALL_H)])}
            fill="#111118"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        </g>

        {/* ═══ BACK WALL DECORATIONS (y=ROOM_D) ═══ */}
        <g className="scene-wall" style={{ opacity: wo.back }}>
          {/* Window 1 */}
          {(() => {
            const bl = p(10, ROOM_D, 1.5), br = p(12.5, ROOM_D, 1.5);
            const tr = p(12.5, ROOM_D, 4.5), tl = p(10, ROOM_D, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(30,40,80,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
                {/* Cross bars */}
                {(() => { const ml = p(11.25, ROOM_D, 1.5), mr = p(11.25, ROOM_D, 4.5); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />; })()}
                {(() => { const ml = p(10, ROOM_D, 3), mr = p(12.5, ROOM_D, 3); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />; })()}
              </g>
            );
          })()}

          {/* Clock */}
          {(() => {
            const c = p(14, ROOM_D, 4.5);
            return (
              <g>
                <circle cx={c.x} cy={c.y} r={12} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
                <circle cx={c.x} cy={c.y} r={1} fill="rgba(255,255,255,0.15)" />
                <line x1={c.x} y1={c.y} x2={c.x} y2={c.y - 8} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                <line x1={c.x} y1={c.y} x2={c.x + 5} y2={c.y} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
              </g>
            );
          })()}

          {/* Window 2 */}
          {(() => {
            const bl = p(15.5, ROOM_D, 1.5), br = p(18, ROOM_D, 1.5);
            const tr = p(18, ROOM_D, 4.5), tl = p(15.5, ROOM_D, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(30,40,80,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
                {(() => { const ml = p(16.75, ROOM_D, 1.5), mr = p(16.75, ROOM_D, 4.5); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />; })()}
                {(() => { const ml = p(15.5, ROOM_D, 3), mr = p(18, ROOM_D, 3); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />; })()}
              </g>
            );
          })()}

          {/* Bathroom door */}
          {(() => {
            const bl = p(1, ROOM_D, 0), br = p(3, ROOM_D, 0);
            const tr = p(3, ROOM_D, 4.2), tl = p(1, ROOM_D, 4.2);
            const handlePos = p(2.7, ROOM_D, 2);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
                <circle cx={handlePos.x} cy={handlePos.y} r={2.5} fill="rgba(255,255,255,0.1)" />
                <WallText wx={2} wy={ROOM_D} wz={3.5} rot={rot} fontSize={7} fill="rgba(255,255,255,0.25)"
                  fontFamily="'Space Mono', monospace" fontWeight={700}>WC</WallText>
              </g>
            );
          })()}

          {/* Whiteboard / Sprint Board */}
          {(() => {
            const bl = p(25, ROOM_D, 2), br = p(27.5, ROOM_D, 2);
            const tr = p(27.5, ROOM_D, 4.5), tl = p(25, ROOM_D, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
                <WallText wx={26.25} wy={ROOM_D} wz={4.1} rot={rot} fontSize={4} fill="rgba(255,255,255,0.08)">
                  SPRINT BOARD
                </WallText>
                {[3.6, 3.2, 2.8].map((z, i) => {
                  const ll = p(25.3, ROOM_D, z), lr = p(25.3 + [1.8, 2.3, 1.2][i], ROOM_D, z);
                  const colors = ['rgba(52,211,153,0.15)', 'rgba(34,211,238,0.12)', 'rgba(251,146,60,0.1)'];
                  return <line key={i} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y} stroke={colors[i]} strokeWidth={1.2} />;
                })}
              </g>
            );
          })()}
        </g>

        {/* ═══ LEFT WALL DECORATIONS (x=0) ═══ */}
        <g className="scene-wall" style={{ opacity: wo.left }}>
          {/* Company logo area */}
          {(() => {
            const bl = p(0, 5, 3), br = p(0, 9, 3);
            const tr = p(0, 9, 5), tl = p(0, 5, 5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.12)" strokeWidth={0.5} />
                <WallText wx={0} wy={7} wz={4.2} rot={rot} fontSize={8} fill="rgba(99,102,241,0.5)" fontWeight={700}
                  fontFamily="'Space Mono', monospace" letterSpacing={2}>STOCKINGS</WallText>
                <WallText wx={0} wy={7} wz={3.5} rot={rot} fontSize={4} fill="rgba(99,102,241,0.3)" letterSpacing={1}>
                  AI TRADING DIVISION
                </WallText>
              </g>
            );
          })()}

          {/* Window on left wall */}
          {(() => {
            const bl = p(0, 10.5, 1.5), br = p(0, 12.5, 1.5);
            const tr = p(0, 12.5, 4.5), tl = p(0, 10.5, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(30,40,80,0.12)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
                {(() => { const ml = p(0, 11.5, 1.5), mr = p(0, 11.5, 4.5); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />; })()}
                {(() => { const ml = p(0, 10.5, 3), mr = p(0, 12.5, 3); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />; })()}
              </g>
            );
          })()}
        </g>

        {/* ═══ RIGHT WALL DECORATIONS (x=ROOM_W) ═══ */}
        <g className="scene-wall" style={{ opacity: wo.right }}>
          {/* Large monitor / data display */}
          {(() => {
            const bl = p(ROOM_W, 4, 2), br = p(ROOM_W, 10, 2);
            const tr = p(ROOM_W, 10, 5), tl = p(ROOM_W, 4, 5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
                <polygon points={isoPoints([
                  p(ROOM_W, 4.3, 2.2), p(ROOM_W, 9.7, 2.2),
                  p(ROOM_W, 9.7, 4.8), p(ROOM_W, 4.3, 4.8),
                ])} fill="rgba(20,20,50,0.3)" className="scene-tv-screen" />
                <WallText wx={ROOM_W} wy={7} wz={4.5} rot={rot} fontSize={4} fill="rgba(100,180,255,0.4)">
                  MARKET DATA
                </WallText>
                {/* Chart lines */}
                {(() => {
                  const pts = [2.8, 3.2, 3.0, 3.5, 3.3, 3.8, 3.6, 4.0, 3.7, 4.2].map((z, i) =>
                    p(ROOM_W, 4.8 + i * 0.5, z)
                  );
                  const d = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x},${pt.y}`).join(' ');
                  return <path d={d} fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth={1.2} />;
                })()}
              </g>
            );
          })()}
        </g>

        {/* ═══ FRONT WALL DECORATIONS (y=0) ═══ */}
        <g className="scene-wall" style={{ opacity: wo.front }}>
          {/* ── NYSE Banner ── */}
          {(() => {
            const bx = 4, bz = 3, bw = 5, bh = 2.2;
            const bl = p(bx, 0, bz), br = p(bx + bw, 0, bz);
            const tr = p(bx + bw, 0, bz + bh), tl = p(bx, 0, bz + bh);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,50,120,0.5)" stroke="rgba(100,180,255,0.25)" strokeWidth={1} />
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,70,170,0.15)" />
                <WallText wx={bx + bw / 2} wy={0} wz={bz + bh - 0.5} rot={rot}
                  fontSize={11} fill="rgba(255,255,255,0.9)" fontWeight={800}
                  letterSpacing={3} fontFamily="'Space Mono', monospace">NYSE</WallText>
                <WallText wx={bx + bw / 2} wy={0} wz={bz + 0.4} rot={rot}
                  fontSize={4.5} fill="rgba(100,180,255,0.7)" letterSpacing={1}>
                  NEW YORK STOCK EXCHANGE
                </WallText>
                {(() => {
                  const ll = p(bx + 0.5, 0, bz + 0.9);
                  const lr = p(bx + bw - 0.5, 0, bz + 0.9);
                  return <line x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                    stroke="rgba(100,180,255,0.3)" strokeWidth={1} />;
                })()}
              </g>
            );
          })()}

          {/* ── NASDAQ Banner ── */}
          {(() => {
            const bx = 19, bz = 3, bw = 5, bh = 2.2;
            const bl = p(bx, 0, bz), br = p(bx + bw, 0, bz);
            const tr = p(bx + bw, 0, bz + bh), tl = p(bx, 0, bz + bh);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,80,50,0.5)" stroke="rgba(52,211,153,0.25)" strokeWidth={1} />
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,120,80,0.12)" />
                <WallText wx={bx + bw / 2} wy={0} wz={bz + bh - 0.5} rot={rot}
                  fontSize={10} fill="rgba(255,255,255,0.9)" fontWeight={800}
                  letterSpacing={2} fontFamily="'Space Mono', monospace">NASDAQ</WallText>
                <WallText wx={bx + bw / 2} wy={0} wz={bz + 0.4} rot={rot}
                  fontSize={4.5} fill="rgba(52,211,153,0.7)" letterSpacing={1}>
                  STOCK MARKET
                </WallText>
                {(() => {
                  const ll = p(bx + 0.5, 0, bz + 0.9);
                  const lr = p(bx + bw - 0.5, 0, bz + 0.9);
                  return <line x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                    stroke="rgba(52,211,153,0.3)" strokeWidth={1} />;
                })()}
              </g>
            );
          })()}

          {/* Ticker tape strip across front wall */}
          {(() => {
            const bl = p(3, 0, 5.5), br = p(ROOM_W - 3, 0, 5.5);
            const tr = p(ROOM_W - 3, 0, 5.8), tl = p(3, 0, 5.8);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,200,0,0.06)" stroke="rgba(255,200,0,0.12)" strokeWidth={0.5} />
                <WallText wx={ROOM_W / 2} wy={0} wz={5.6} rot={rot}
                  fontSize={3.5} fill="rgba(255,200,0,0.4)" letterSpacing={2} fontFamily="'Space Mono', monospace">
                  ASTS +2.4% {'  '} NVDA +1.2% {'  '} TSLA -0.8% {'  '} MSFT +0.5% {'  '} AAPL +0.3%
                </WallText>
              </g>
            );
          })()}

          {/* Glass entrance doors */}
          {(() => {
            const bl = p(12, 0, 0), br = p(16, 0, 0);
            const tr = p(16, 0, 4.5), tl = p(12, 0, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(100,150,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
                {(() => { const ml = p(14, 0, 0), mr = p(14, 0, 4.5); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />; })()}
                <WallText wx={14} wy={0} wz={2.5} rot={rot} fontSize={4} fill="rgba(255,255,255,0.15)" letterSpacing={2}>
                  ENTRANCE
                </WallText>
              </g>
            );
          })()}
        </g>

        {/* ═══ FURNITURE ═══ */}

        {/* ═══ COFFEE ZONE ═══ */}
        {/* Coffee counter — warm wood */}
        <IsoBlock x={4} y={12.5} z={0} w={2.5} d={1} h={2.5} rot={rot} pitch={pitchDeg}
          topFill="#7a5a32" southFill="#6b4e2c" eastFill="#5c4226" />
        {/* Coffee machine (silver box on counter) */}
        <IsoBlock x={4.3} y={12.6} z={2.5} w={0.8} d={0.6} h={1} rot={rot} pitch={pitchDeg}
          topFill="#8a8a95" southFill="#72727d" eastFill="#5e5e68" />
        {/* Machine buttons */}
        {(() => { const c1 = p(4.7, 12.5, 3.2), c2 = p(5.0, 12.5, 3.2); return (<>
          <circle cx={c1.x} cy={c1.y} r={2} fill="#34d399" />
          <circle cx={c2.x} cy={c2.y} r={2} fill="#fb923c" />
        </>); })()}
        {/* Mugs on counter */}
        {(() => { const m1 = p(5.5, 12.6, 2.5); return <circle cx={m1.x} cy={m1.y} r={3} fill="#c4956a" stroke="#a87d55" strokeWidth={0.5} />; })()}
        {(() => { const m2 = p(6.0, 12.7, 2.5); return <circle cx={m2.x} cy={m2.y} r={3} fill="#e8e8e8" stroke="#ccc" strokeWidth={0.5} />; })()}
        <WallText wx={5.25} wy={12.5} wz={3.8} rot={rot} fontSize={5} fill="#c4a882"
          fontFamily="'Space Mono', monospace" letterSpacing={1}>COFFEE</WallText>
        {/* Steam */}
        {(() => { const sp = p(4.7, 12.5, 3.5); return (<>
          <path d={`M${sp.x},${sp.y} Q${sp.x - 2},${sp.y - 8} ${sp.x},${sp.y - 14}`}
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} className="scene-steam" />
          <path d={`M${sp.x + 4},${sp.y} Q${sp.x + 2},${sp.y - 9} ${sp.x + 4},${sp.y - 15}`}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} className="scene-steam scene-steam-delay" />
        </>); })()}

        {/* Water cooler */}
        <IsoBlock x={7.5} y={12.5} z={0} w={0.8} d={0.8} h={1.6} rot={rot} pitch={pitchDeg}
          topFill="#7a7a88" southFill="#6a6a78" eastFill="#5c5c6a" />
        <IsoBlock x={7.6} y={12.6} z={1.6} w={0.6} d={0.6} h={1.2} rot={rot} pitch={pitchDeg}
          topFill="#5baee6" southFill="#4a9ad4" eastFill="#3b88c2" />
        {(() => { const wp = p(7.9, 12.5, 2.5); return <circle cx={wp.x} cy={wp.y} r={3} fill="#7cc4f0" stroke="#5baee6" strokeWidth={0.8} />; })()}

        {/* ═══ FILING CABINETS ═══ */}
        {[0, 1.4, 2.8].map((offset, i) => (
          <g key={`fc${i}`}>
            <IsoBlock x={1 + offset} y={11} z={0} w={1.2} d={1} h={2.5} rot={rot} pitch={pitchDeg}
              topFill="#7e7e8c" southFill="#6c6c7a" eastFill="#5e5e6c" />
            {/* Drawer lines */}
            {[0.8, 1.6].map((dz, di) => {
              const ll = p(1 + offset, 11, dz), lr = p(1 + offset + 1.2, 11, dz);
              return <line key={di} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y} stroke="#52525c" strokeWidth={0.8} />;
            })}
            {/* Drawer handles */}
            {[0.5, 1.2, 1.9].map((dz, di) => {
              const hp = p(1 + offset + 0.6, 11, dz);
              return <circle key={di} cx={hp.x} cy={hp.y} r={1.8} fill="#a0a0ac" stroke="#8a8a96" strokeWidth={0.5} />;
            })}
          </g>
        ))}

        {/* ═══ SERVER RACK ═══ */}
        <IsoBlock x={1} y={2} z={0} w={1.5} d={2} h={4} rot={rot} pitch={pitchDeg}
          topFill="#3c3c4a" southFill="#30303e" eastFill="#282836" />
        {/* Rack face detail */}
        {[0.3, 1.0, 1.7, 2.4, 3.1].map((z, i) => {
          const fl = p(1, 2, z), fr = p(2.5, 2, z);
          return <line key={`rf${i}`} x1={fl.x} y1={fl.y} x2={fr.x} y2={fr.y} stroke="#24242f" strokeWidth={0.6} />;
        })}
        {/* Server LEDs */}
        {[0.5, 1.2, 1.9, 2.6, 3.3].map((z, i) => {
          const led = p(2.5, 2, z + 0.3);
          return <circle key={`led${i}`} cx={led.x} cy={led.y} r={2}
            fill={i % 2 === 0 ? '#34d399' : '#60a5fa'}
            className="scene-ps5-light" />;
        })}
        <WallText wx={1.75} wy={2} wz={3.8} rot={rot} fontSize={3.5} fill="#8888a0"
          fontFamily="'Space Mono', monospace">SERVERS</WallText>

        {/* ═══ BOOKSHELF / LIBRARY ═══ */}
        <IsoBlock x={25} y={12} z={0} w={2.5} d={1.2} h={4.5} rot={rot} pitch={pitchDeg}
          topFill="#6b4422" southFill="#5a3a1c" eastFill="#4d3118" />
        {/* Shelf boards */}
        {[1.5, 2.6, 3.7].map((shelfZ, si) => (
          <g key={`shelf${si}`}>
            {(() => {
              const sl = p(25, 12, shelfZ), sr = p(27.5, 12, shelfZ);
              return <line x1={sl.x} y1={sl.y} x2={sr.x} y2={sr.y} stroke="#7a5530" strokeWidth={1.2} />;
            })()}
            {/* Books — vivid colors */}
            {[0, 0.35, 0.7, 1.05, 1.4, 1.75].map((off, bi) => {
              const bp = p(25.2 + off, 12, shelfZ + 0.1);
              const colors = ['#6366f1', '#34d399', '#fb923c', '#a78bfa', '#22d3ee', '#f472b6'];
              return <rect key={`b${si}${bi}`} x={bp.x - 2} y={bp.y - (10 - bi % 3)}
                width={3.5} height={10 - bi % 3} rx={0.5} fill={colors[bi]} opacity={0.85} />;
            })}
          </g>
        ))}
        <WallText wx={26.25} wy={12} wz={0.5} rot={rot} fontSize={3.5} fill="#c4956a"
          fontFamily="'Space Mono', monospace">LIBRARY</WallText>

        {/* ═══ LOUNGE: COUCH ═══ */}
        {/* Couch seat — dark blue-gray fabric */}
        <IsoBlock x={21} y={2} z={0} w={4.5} d={2} h={0.9} rot={rot} pitch={pitchDeg}
          topFill="#4a5568" southFill="#3d4756" eastFill="#333d4a" />
        {/* Couch back */}
        <IsoBlock x={21} y={3.5} z={0} w={4.5} d={0.5} h={1.6} rot={rot} pitch={pitchDeg}
          topFill="#3d4756" southFill="#333d4a" eastFill="#2b3440" />
        {/* Cushion dividers */}
        {[0, 1.5, 3].map((off, ci) => {
          const cl = p(21.2 + off, 2, 0.9), cr = p(21.2 + off, 3.8, 0.9);
          return <line key={`cd${ci}`} x1={cl.x} y1={cl.y} x2={cr.x} y2={cr.y}
            stroke="#2b3440" strokeWidth={0.8} />;
        })}
        {/* Throw pillows */}
        <IsoBlock x={21.3} y={2.2} z={0.9} w={0.7} d={0.7} h={0.4} rot={rot} pitch={pitchDeg}
          topFill="#e87461" southFill="#d4634f" eastFill="#c05545" />
        <IsoBlock x={24.5} y={2.2} z={0.9} w={0.7} d={0.7} h={0.4} rot={rot} pitch={pitchDeg}
          topFill="#f0c040" southFill="#ddb035" eastFill="#c8a02c" />

        {/* TV stand — dark wood */}
        <IsoBlock x={22.5} y={5} z={0} w={0.5} d={0.5} h={1.8} rot={rot} pitch={pitchDeg}
          topFill="#3a3a42" southFill="#2e2e36" eastFill="#24242c" />
        {/* TV screen */}
        {(() => {
          const bl = p(21.5, 5.2, 1.8), br = p(24, 5.2, 1.8);
          const tr = p(24, 5.2, 3.6), tl = p(21.5, 5.2, 3.6);
          return (
            <g>
              <polygon points={isoPoints([bl, br, tr, tl])} fill="#2a2a32" stroke="#1e1e26" strokeWidth={1} />
              <polygon points={isoPoints([
                p(21.7, 5.2, 1.9), p(23.8, 5.2, 1.9),
                p(23.8, 5.2, 3.5), p(21.7, 5.2, 3.5),
              ])} fill="#101028" className="scene-tv-screen" />
            </g>
          );
        })()}

        {/* PS5 */}
        <IsoBlock x={25} y={5} z={0} w={0.4} d={0.4} h={1} rot={rot} pitch={pitchDeg}
          topFill="#e8e8f0" southFill="#d0d0d8" eastFill="#b8b8c0" />
        {(() => { const lp = p(25.2, 5, 0.7); return <rect x={lp.x - 1} y={lp.y - 2} width={3} height={2.5} rx={1} fill="#4a90e2" className="scene-ps5-light" />; })()}

        {/* ═══ PLANTS — terracotta pots ═══ */}
        {[{ x: 3, y: 8 }, { x: 27, y: 11 }, { x: 1, y: 5 }, { x: 20, y: 1 }].map((pl, i) => {
          const potH = [1.2, 0.9, 1.0, 0.8][i];
          const foliageR = [8, 6, 7, 5][i];
          return (
            <g key={`plant${i}`}>
              <IsoBlock x={pl.x - 0.3} y={pl.y - 0.3} z={0} w={0.6} d={0.6} h={potH} rot={rot} pitch={pitchDeg}
                topFill="#b86b35" southFill="#a25c2c" eastFill="#8c4f25" />
              {(() => { const sp = p(pl.x, pl.y, potH); return <circle cx={sp.x} cy={sp.y} r={4} fill="#5a3820" />; })()}
              {(() => {
                const fp = p(pl.x, pl.y, potH + 0.3);
                return (<>
                  <circle cx={fp.x} cy={fp.y - foliageR * 0.7} r={foliageR} fill="#2d8f52" />
                  <circle cx={fp.x - foliageR * 0.5} cy={fp.y - foliageR * 0.4} r={foliageR * 0.7} fill="#38a862" />
                  <circle cx={fp.x + foliageR * 0.5} cy={fp.y - foliageR * 0.5} r={foliageR * 0.65} fill="#247a44" />
                </>);
              })()}
            </g>
          );
        })}

        {/* ═══ CONFERENCE TABLE ═══ */}
        <IsoBlock x={3} y={3} z={0} w={5} d={3} h={1.5} rot={rot} pitch={pitchDeg}
          topFill="#8b6b3a" southFill="#7a5c30" eastFill="#6a4e28"
          topStroke="#9c7a45" southStroke="#8b6b3a" eastStroke="#7a5c30" />
        {/* Table legs */}
        {[[3.3, 3.3], [7.7, 3.3], [3.3, 5.7], [7.7, 5.7]].map(([lx, ly], li) => (
          <IsoBlock key={`tl${li}`} x={lx} y={ly} z={0} w={0.3} d={0.3} h={0.15} rot={rot} pitch={pitchDeg}
            topFill="#5a5a64" southFill="#4e4e58" eastFill="#44444e" />
        ))}
        {/* Conference chairs — red fabric (like Sims ref) */}
        {[[3.5, 2.5], [5.5, 2.5], [7.5, 2.5], [3.5, 6.5], [5.5, 6.5], [7.5, 6.5]].map(([cx, cy], i) => (
          <g key={`cc${i}`}>
            <IsoBlock x={cx} y={cy} z={0} w={0.8} d={0.8} h={0.7} rot={rot} pitch={pitchDeg}
              topFill="#a04040" southFill="#8a3535" eastFill="#742c2c" />
            <IsoBlock x={cx + 0.1} y={cy < 4 ? cy - 0.15 : cy + 0.95} z={0.5} w={0.6} d={0.15} h={0.8} rot={rot} pitch={pitchDeg}
              topFill="#943838" southFill="#7e2f2f" eastFill="#6a2828" />
          </g>
        ))}

        {/* ═══ DESKS (sorted by depth) ═══ */}
        {sortedDesks.map(({ pos, i }) => (
          <IsoDeskUnit
            key={i}
            wx={pos.x}
            wy={pos.y}
            color={avatars[i].color}
            isActive={workingState[avatars[i].id] ?? false}
            rotation={rot}
            pitch={pitchDeg}
          />
        ))}

        {/* ═══ AVATARS (sorted by depth) ═══ */}
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
            rotation={rot}
            pitch={pitchDeg}
            isWalking={avatar.walkPath.length > 0}
          />
        ))}
      </svg>
    </div>
  );
}
