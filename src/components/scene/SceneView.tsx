'use client';

import React, { useMemo } from 'react';
import IsoDeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';
import { DESK_POS } from './activities';
import {
  toIso, isoPoints, blockFaces, computeViewBox,
  visibleWalls, isoDepth,
  ROOM_W, ROOM_D, WALL_H,
} from './iso';
import type { AvatarState } from './Scene';

// ── Helper: isometric block component ──
function IsoBlock({
  x, y, z, w, d, h, rot,
  topFill, southFill, eastFill,
  topStroke, southStroke, eastStroke,
  strokeWidth = 0.5,
  className,
}: {
  x: number; y: number; z: number;
  w: number; d: number; h: number;
  rot: number;
  topFill: string; southFill: string; eastFill: string;
  topStroke?: string; southStroke?: string; eastStroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const faces = blockFaces(x, y, z, w, d, h, rot);
  const s = 'rgba(255,255,255,0.04)';
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
}

export default function SceneView({ avatars, workingState, rotation: rot }: SceneViewProps) {
  const vb = useMemo(() => computeViewBox(rot), [rot]);
  const walls = useMemo(() => visibleWalls(rot), [rot]);

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

  const p = (wx: number, wy: number, wz: number = 0) => toIso(wx, wy, wz, rot);

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

        {/* Carpet area under desks */}
        <polygon
          points={isoPoints([p(6, 5.5), p(26, 5.5), p(26, 10.5), p(6, 10.5)])}
          fill="rgba(20,20,40,0.3)"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth={0.5}
        />
        {/* Lounge rug */}
        <polygon
          points={isoPoints([p(20, 1), p(26, 1), p(26, 5), p(20, 5)])}
          fill="rgba(99,102,241,0.04)"
          stroke="rgba(99,102,241,0.05)"
          strokeWidth={0.5}
        />

        {/* ═══ WALLS ═══ */}
        {/* Back wall (y=ROOM_D) */}
        {walls.back && (
          <polygon
            points={isoPoints([p(0, ROOM_D, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(0, ROOM_D, WALL_H)])}
            fill="#0e0e14"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        )}
        {/* Front wall (y=0) */}
        {walls.front && (
          <polygon
            points={isoPoints([p(0, 0, 0), p(ROOM_W, 0, 0), p(ROOM_W, 0, WALL_H), p(0, 0, WALL_H)])}
            fill="#0e0e14"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        )}
        {/* Left wall (x=0) */}
        {walls.left && (
          <polygon
            points={isoPoints([p(0, 0, 0), p(0, ROOM_D, 0), p(0, ROOM_D, WALL_H), p(0, 0, WALL_H)])}
            fill="#111118"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        )}
        {/* Right wall (x=ROOM_W) */}
        {walls.right && (
          <polygon
            points={isoPoints([p(ROOM_W, 0, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(ROOM_W, 0, WALL_H)])}
            fill="#111118"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        )}

        {/* ═══ BACK WALL DECORATIONS (y=ROOM_D) ═══ */}
        {walls.back && (<g>
          {/* ── NYSE Banner ── */}
          {(() => {
            const bx = 4, bz = 3, bw = 5, bh = 2.2;
            const bl = p(bx, ROOM_D, bz), br = p(bx + bw, ROOM_D, bz);
            const tr = p(bx + bw, ROOM_D, bz + bh), tl = p(bx, ROOM_D, bz + bh);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,50,120,0.5)" stroke="rgba(100,180,255,0.25)" strokeWidth={1} />
                {/* NYSE Blue gradient overlay */}
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,70,170,0.15)" />
                <WallText wx={bx + bw / 2} wy={ROOM_D} wz={bz + bh - 0.5} rot={rot}
                  fontSize={11} fill="rgba(255,255,255,0.9)" fontWeight={800}
                  letterSpacing={3} fontFamily="'Space Mono', monospace">NYSE</WallText>
                <WallText wx={bx + bw / 2} wy={ROOM_D} wz={bz + 0.4} rot={rot}
                  fontSize={4.5} fill="rgba(100,180,255,0.7)" letterSpacing={1}>
                  NEW YORK STOCK EXCHANGE
                </WallText>
                {/* Decorative line under NYSE */}
                {(() => {
                  const ll = p(bx + 0.5, ROOM_D, bz + 0.9);
                  const lr = p(bx + bw - 0.5, ROOM_D, bz + 0.9);
                  return <line x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                    stroke="rgba(100,180,255,0.3)" strokeWidth={1} />;
                })()}
              </g>
            );
          })()}

          {/* ── NASDAQ Banner ── */}
          {(() => {
            const bx = 19, bz = 3, bw = 5, bh = 2.2;
            const bl = p(bx, ROOM_D, bz), br = p(bx + bw, ROOM_D, bz);
            const tr = p(bx + bw, ROOM_D, bz + bh), tl = p(bx, ROOM_D, bz + bh);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,80,50,0.5)" stroke="rgba(52,211,153,0.25)" strokeWidth={1} />
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(0,120,80,0.12)" />
                <WallText wx={bx + bw / 2} wy={ROOM_D} wz={bz + bh - 0.5} rot={rot}
                  fontSize={10} fill="rgba(255,255,255,0.9)" fontWeight={800}
                  letterSpacing={2} fontFamily="'Space Mono', monospace">NASDAQ</WallText>
                <WallText wx={bx + bw / 2} wy={ROOM_D} wz={bz + 0.4} rot={rot}
                  fontSize={4.5} fill="rgba(52,211,153,0.7)" letterSpacing={1}>
                  STOCK MARKET
                </WallText>
                {(() => {
                  const ll = p(bx + 0.5, ROOM_D, bz + 0.9);
                  const lr = p(bx + bw - 0.5, ROOM_D, bz + 0.9);
                  return <line x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
                    stroke="rgba(52,211,153,0.3)" strokeWidth={1} />;
                })()}
              </g>
            );
          })()}

          {/* Ticker tape strip across wall */}
          {(() => {
            const bl = p(3, ROOM_D, 5.5), br = p(ROOM_W - 3, ROOM_D, 5.5);
            const tr = p(ROOM_W - 3, ROOM_D, 5.8), tl = p(3, ROOM_D, 5.8);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,200,0,0.06)" stroke="rgba(255,200,0,0.12)" strokeWidth={0.5} />
                <WallText wx={ROOM_W / 2} wy={ROOM_D} wz={5.6} rot={rot}
                  fontSize={3.5} fill="rgba(255,200,0,0.4)" letterSpacing={2} fontFamily="'Space Mono', monospace">
                  ASTS +2.4% {'  '} NVDA +1.2% {'  '} TSLA -0.8% {'  '} MSFT +0.5% {'  '} AAPL +0.3%
                </WallText>
              </g>
            );
          })()}

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
        </g>)}

        {/* ═══ LEFT WALL DECORATIONS (x=0) ═══ */}
        {walls.left && (<g>
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
        </g>)}

        {/* ═══ RIGHT WALL DECORATIONS (x=ROOM_W) ═══ */}
        {walls.right && (<g>
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
        </g>)}

        {/* ═══ FRONT WALL DECORATIONS (y=0) ═══ */}
        {walls.front && (<g>
          {/* Glass entrance doors */}
          {(() => {
            const bl = p(12, 0, 0), br = p(16, 0, 0);
            const tr = p(16, 0, 4.5), tl = p(12, 0, 4.5);
            return (
              <g>
                <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(100,150,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
                {/* Door divider */}
                {(() => { const ml = p(14, 0, 0), mr = p(14, 0, 4.5); return <line x1={ml.x} y1={ml.y} x2={mr.x} y2={mr.y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />; })()}
                <WallText wx={14} wy={0} wz={2.5} rot={rot} fontSize={4} fill="rgba(255,255,255,0.15)" letterSpacing={2}>
                  ENTRANCE
                </WallText>
              </g>
            );
          })()}
        </g>)}

        {/* ═══ FURNITURE ═══ */}

        {/* Coffee station */}
        <IsoBlock x={4} y={12.5} z={0} w={2.5} d={1} h={2.5} rot={rot}
          topFill="rgba(139,69,19,0.2)" southFill="rgba(139,69,19,0.15)" eastFill="rgba(139,69,19,0.1)" />
        {/* Coffee machine buttons */}
        {(() => { const c1 = p(4.8, 12.5, 2.2), c2 = p(5.3, 12.5, 2.2); return (<>
          <circle cx={c1.x} cy={c1.y} r={2} fill="rgba(52,211,153,0.4)" />
          <circle cx={c2.x} cy={c2.y} r={2} fill="rgba(251,146,60,0.3)" />
        </>); })()}
        <WallText wx={5.25} wy={12.5} wz={2.8} rot={rot} fontSize={5} fill="rgba(255,255,255,0.15)"
          fontFamily="'Space Mono', monospace" letterSpacing={1}>COFFEE</WallText>
        {/* Steam */}
        {(() => { const sp = p(5, 12.5, 2.6); return (<>
          <path d={`M${sp.x},${sp.y} Q${sp.x - 2},${sp.y - 8} ${sp.x},${sp.y - 14}`}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} className="scene-steam" />
          <path d={`M${sp.x + 4},${sp.y} Q${sp.x + 2},${sp.y - 9} ${sp.x + 4},${sp.y - 15}`}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} className="scene-steam scene-steam-delay" />
        </>); })()}

        {/* Water cooler */}
        <IsoBlock x={7.5} y={12.5} z={0} w={0.8} d={0.8} h={2.8} rot={rot}
          topFill="rgba(100,150,255,0.12)" southFill="rgba(100,150,255,0.08)" eastFill="rgba(100,150,255,0.05)" />
        {(() => { const wp = p(7.9, 12.5, 2.5); return <circle cx={wp.x} cy={wp.y} r={3} fill="rgba(100,180,255,0.08)" stroke="rgba(100,180,255,0.15)" strokeWidth={0.5} />; })()}

        {/* Filing cabinets row */}
        {[0, 1.4, 2.8].map((offset, i) => (
          <IsoBlock key={`fc${i}`} x={1 + offset} y={11} z={0} w={1.2} d={1} h={2.5} rot={rot}
            topFill="rgba(255,255,255,0.05)" southFill="rgba(255,255,255,0.035)" eastFill="rgba(255,255,255,0.025)" />
        ))}

        {/* Server rack */}
        <IsoBlock x={1} y={2} z={0} w={1.5} d={2} h={4} rot={rot}
          topFill="rgba(255,255,255,0.04)" southFill="rgba(255,255,255,0.03)" eastFill="rgba(255,255,255,0.02)" />
        {/* Server LEDs */}
        {[0.5, 1.2, 1.9, 2.6, 3.3].map((z, i) => {
          const led = p(2.5, 2, z + 0.3);
          return <circle key={`led${i}`} cx={led.x} cy={led.y} r={1.5}
            fill={i % 2 === 0 ? 'rgba(52,211,153,0.4)' : 'rgba(100,180,255,0.3)'}
            className="scene-ps5-light" />;
        })}
        <WallText wx={1.75} wy={2} wz={3.8} rot={rot} fontSize={3.5} fill="rgba(255,255,255,0.1)"
          fontFamily="'Space Mono', monospace">SERVERS</WallText>

        {/* Bookshelf */}
        <IsoBlock x={25} y={12} z={0} w={2.5} d={1.2} h={4.5} rot={rot}
          topFill="rgba(255,255,255,0.04)" southFill="rgba(255,255,255,0.03)" eastFill="rgba(255,255,255,0.02)" />
        {/* Books on shelves */}
        {[1.5, 2.6, 3.7].map((shelfZ, si) => (
          <g key={`shelf${si}`}>
            {(() => {
              const sl = p(25, 12, shelfZ), sr = p(27.5, 12, shelfZ);
              return <line x1={sl.x} y1={sl.y} x2={sr.x} y2={sr.y} stroke="rgba(255,255,255,0.05)" strokeWidth={0.8} />;
            })()}
            {[0, 0.35, 0.7, 1.05, 1.4, 1.75].map((off, bi) => {
              const bp = p(25.2 + off, 12, shelfZ + 0.1);
              const colors = ['rgba(99,102,241,0.18)', 'rgba(52,211,153,0.15)', 'rgba(251,146,60,0.15)',
                'rgba(167,139,250,0.15)', 'rgba(34,211,238,0.15)', 'rgba(244,114,182,0.12)'];
              return <rect key={`b${si}${bi}`} x={bp.x - 2} y={bp.y - (10 - bi % 3)}
                width={3.5} height={10 - bi % 3} rx={0.5} fill={colors[bi]} />;
            })}
          </g>
        ))}

        {/* Couch */}
        <IsoBlock x={21} y={2} z={0} w={4.5} d={2} h={0.9} rot={rot}
          topFill="rgba(255,255,255,0.05)" southFill="rgba(255,255,255,0.035)" eastFill="rgba(255,255,255,0.025)" />
        <IsoBlock x={21} y={3.5} z={0} w={4.5} d={0.5} h={1.6} rot={rot}
          topFill="rgba(255,255,255,0.04)" southFill="rgba(255,255,255,0.03)" eastFill="rgba(255,255,255,0.02)" />

        {/* TV on stand near couch */}
        <IsoBlock x={22.5} y={5} z={0} w={0.5} d={0.5} h={1.8} rot={rot}
          topFill="rgba(255,255,255,0.05)" southFill="rgba(255,255,255,0.04)" eastFill="rgba(255,255,255,0.03)" />
        {/* TV screen */}
        {(() => {
          const bl = p(21.5, 5.2, 1.8), br = p(24, 5.2, 1.8);
          const tr = p(24, 5.2, 3.6), tl = p(21.5, 5.2, 3.6);
          return (
            <g>
              <polygon points={isoPoints([bl, br, tr, tl])} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.6} />
              <polygon points={isoPoints([
                p(21.7, 5.2, 1.9), p(23.8, 5.2, 1.9),
                p(23.8, 5.2, 3.5), p(21.7, 5.2, 3.5),
              ])} fill="rgba(20,20,50,0.25)" className="scene-tv-screen" />
            </g>
          );
        })()}

        {/* PS5 */}
        <IsoBlock x={25} y={5} z={0} w={0.4} d={0.4} h={1} rot={rot}
          topFill="rgba(255,255,255,0.05)" southFill="rgba(255,255,255,0.04)" eastFill="rgba(255,255,255,0.03)" />
        {(() => { const lp = p(25.2, 5, 0.7); return <rect x={lp.x - 1} y={lp.y - 2} width={3} height={2.5} rx={1} fill="rgba(100,149,237,0.3)" className="scene-ps5-light" />; })()}

        {/* Plants */}
        {[{ x: 3, y: 8 }, { x: 27, y: 11 }, { x: 1, y: 5 }, { x: 20, y: 1 }].map((pl, i) => {
          const pp = p(pl.x, pl.y, 0);
          const sizes = [14, 10, 12, 9];
          const colors = ['rgba(52,211,153,0.08)', 'rgba(167,139,250,0.08)', 'rgba(52,211,153,0.06)', 'rgba(99,102,241,0.07)'];
          return (
            <g key={`plant${i}`}>
              <rect x={pp.x - 4} y={pp.y - sizes[i]} width={8} height={sizes[i]} rx={3}
                fill={colors[i]} stroke={colors[i].replace('0.0', '0.1')} strokeWidth={0.5} />
              <circle cx={pp.x} cy={pp.y - sizes[i] - 4} r={sizes[i] * 0.5}
                fill={colors[i].replace('0.0', '0.0')} />
            </g>
          );
        })}

        {/* Conference table */}
        <IsoBlock x={3} y={3} z={0} w={5} d={3} h={1.5} rot={rot}
          topFill="rgba(80,60,40,0.12)" southFill="rgba(80,60,40,0.08)" eastFill="rgba(80,60,40,0.06)" />
        {/* Conference chairs */}
        {[[3.5, 2.5], [5.5, 2.5], [7.5, 2.5], [3.5, 6.5], [5.5, 6.5], [7.5, 6.5]].map(([cx, cy], i) => (
          <IsoBlock key={`cc${i}`} x={cx} y={cy} z={0} w={0.8} d={0.8} h={0.7} rot={rot}
            topFill="rgba(255,255,255,0.04)" southFill="rgba(255,255,255,0.03)" eastFill="rgba(255,255,255,0.02)" />
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
          />
        ))}
      </svg>
    </div>
  );
}
