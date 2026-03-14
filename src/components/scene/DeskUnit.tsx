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
 * Professional trading desk: L-shaped desk surface, ergonomic mesh chair,
 * 2 horizontal monitors + 1 vertical monitor + iPad on stand + MacBook.
 * Frameless/ultra-thin bezel design.
 */
export default function IsoDeskUnit({ wx, wy, color, isActive, rotation: rot, pitch: pitchDeg = 0 }: IsoDeskUnitProps) {
  const monitorFilter = isActive ? `url(#glow-${color.replace('#', '')})` : undefined;
  const p = (x: number, y: number, z: number) => toIso(x, y, z, rot, pitchDeg);

  // ── Desk surface (L-shaped: main + return) ──
  const deskMain = blockFaces(wx - 1.6, wy - 0.3, 1.5, 3.2, 1.6, 0.08, rot, pitchDeg);
  const deskReturn = blockFaces(wx + 1.2, wy - 0.3, 1.5, 0.5, 1.6, 0.08, rot, pitchDeg);

  // ── Desk legs (thin steel) ──
  const legs = [
    blockFaces(wx - 1.45, wy - 0.15, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.4, wy - 0.15, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
    blockFaces(wx - 1.45, wy + 1.1, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.4, wy + 1.1, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.55, wy - 0.15, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
    blockFaces(wx + 1.55, wy + 1.1, 0, 0.06, 0.06, 1.5, rot, pitchDeg),
  ];

  // ── Cable management tray under desk ──
  const cableTray = blockFaces(wx - 1.0, wy + 0.2, 0.8, 2.0, 0.4, 0.06, rot, pitchDeg);

  // ── Monitor arm (clamp-style, thin pole) ──
  const monArmBase = blockFaces(wx - 0.05, wy + 1.15, 1.58, 0.1, 0.1, 0, rot, pitchDeg);
  const monArmPole = blockFaces(wx - 0.02, wy + 1.18, 1.58, 0.04, 0.04, 1.4, rot, pitchDeg);

  // ── Two horizontal monitors (frameless — screen IS the monitor) ──
  const monLBl = p(wx - 1.15, wy + 1.05, 1.75);
  const monLBr = p(wx - 0.15, wy + 1.05, 1.75);
  const monLTr = p(wx - 0.15, wy + 1.05, 2.85);
  const monLTl = p(wx - 1.15, wy + 1.05, 2.85);

  const monRBl = p(wx - 0.05, wy + 1.05, 1.75);
  const monRBr = p(wx + 0.95, wy + 1.05, 1.75);
  const monRTr = p(wx + 0.95, wy + 1.05, 2.85);
  const monRTl = p(wx - 0.05, wy + 1.05, 2.85);

  // ── Vertical monitor (portrait, on right side) ──
  const monVBl = p(wx + 1.05, wy + 1.05, 1.85);
  const monVBr = p(wx + 1.55, wy + 1.05, 1.85);
  const monVTr = p(wx + 1.55, wy + 1.05, 3.15);
  const monVTl = p(wx + 1.05, wy + 1.05, 3.15);

  // ── iPad on stand (on desk return surface) ──
  const ipadStand = blockFaces(wx + 1.3, wy + 0.4, 1.58, 0.15, 0.15, 0.3, rot, pitchDeg);
  const ipadBl = p(wx + 1.15, wy + 0.2, 1.88);
  const ipadBr = p(wx + 1.55, wy + 0.2, 1.88);
  const ipadTr = p(wx + 1.55, wy + 0.2, 2.48);
  const ipadTl = p(wx + 1.15, wy + 0.2, 2.48);

  // ── MacBook (flat on desk, partially open) ──
  const mbBase = blockFaces(wx - 0.8, wy + 0.1, 1.58, 0.8, 0.5, 0.02, rot, pitchDeg);
  const mbScreenBl = p(wx - 0.75, wy + 0.55, 1.6);
  const mbScreenBr = p(wx + 0.0, wy + 0.55, 1.6);
  const mbScreenTr = p(wx + 0.0, wy + 0.55, 2.1);
  const mbScreenTl = p(wx - 0.75, wy + 0.55, 2.1);

  // ── Ergonomic mesh chair ──
  // Chair base (5-star with casters)
  // Seat (curved)
  const chairSeat = blockFaces(wx - 0.55, wy - 1.7, 0.55, 1.0, 1.0, 0.1, rot, pitchDeg);
  // Seat cushion (thinner, softer top)
  const chairCushion = blockFaces(wx - 0.5, wy - 1.65, 0.65, 0.9, 0.9, 0.06, rot, pitchDeg);
  // Backrest (mesh — taller, thinner, slight curve represented by layered polygons)
  const chairBack = blockFaces(wx - 0.4, wy - 0.75, 0.6, 0.8, 0.08, 1.2, rot, pitchDeg);
  // Armrests
  const armL = blockFaces(wx - 0.55, wy - 1.5, 0.65, 0.08, 0.6, 0.35, rot, pitchDeg);
  const armR = blockFaces(wx + 0.4, wy - 1.5, 0.65, 0.08, 0.6, 0.35, rot, pitchDeg);
  const armPadL = blockFaces(wx - 0.58, wy - 1.4, 1.0, 0.14, 0.35, 0.04, rot, pitchDeg);
  const armPadR = blockFaces(wx + 0.37, wy - 1.4, 1.0, 0.14, 0.35, 0.04, rot, pitchDeg);
  // Gas lift cylinder
  const chairPole = blockFaces(wx - 0.04, wy - 1.22, 0.15, 0.08, 0.08, 0.4, rot, pitchDeg);
  // Headrest
  const headrest = blockFaces(wx - 0.25, wy - 0.72, 1.8, 0.5, 0.06, 0.3, rot, pitchDeg);

  const screenOff = '#0a0a18';
  const screenOn = `${color}30`;
  const contentColor = (alpha: string) => `${color}${alpha}`;

  return (
    <g>
      {/* ── Chair (behind desk) ── */}
      {/* Caster base — 5 legs radiating out */}
      {[0, 72, 144, 216, 288].map((angle, ci) => {
        const rad = (angle * Math.PI) / 180;
        const cx = wx - 0.05 + Math.cos(rad) * 0.5;
        const cy = wy - 1.2 + Math.sin(rad) * 0.5;
        const casterBase = blockFaces(cx - 0.04, cy - 0.04, 0, 0.08, 0.08, 0.15, rot, pitchDeg);
        return <polygon key={`cw${ci}`} points={casterBase.top} fill="#2a2a30" stroke="#222228" strokeWidth={0.3} />;
      })}
      {/* Wheel lines (star pattern) */}
      {[0, 72, 144, 216, 288].map((angle, ci) => {
        const rad = (angle * Math.PI) / 180;
        const ox = wx - 0.05;
        const oy = wy - 1.2;
        const inner = p(ox, oy, 0.1);
        const outer = p(ox + Math.cos(rad) * 0.5, oy + Math.sin(rad) * 0.5, 0.1);
        return <line key={`cl${ci}`} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#3a3a42" strokeWidth={1} />;
      })}
      {/* Caster wheels */}
      {[0, 72, 144, 216, 288].map((angle, ci) => {
        const rad = (angle * Math.PI) / 180;
        const wp = p(wx - 0.05 + Math.cos(rad) * 0.5, wy - 1.2 + Math.sin(rad) * 0.5, 0.05);
        return <circle key={`cwh${ci}`} cx={wp.x} cy={wp.y} r={2} fill="#1e1e24" stroke="#16161c" strokeWidth={0.5} />;
      })}
      {/* Gas lift */}
      <polygon points={chairPole.east} fill="#3a3a42" stroke="#2e2e36" strokeWidth={0.3} />
      <polygon points={chairPole.south} fill="#404048" stroke="#36363e" strokeWidth={0.3} />
      {/* Seat */}
      <polygon points={chairSeat.east} fill="#2e2e36" stroke="#262630" strokeWidth={0.4} />
      <polygon points={chairSeat.south} fill="#32323a" stroke="#2a2a34" strokeWidth={0.4} />
      <polygon points={chairSeat.top} fill="#3a3a42" stroke="#32323c" strokeWidth={0.4} />
      {/* Cushion */}
      <polygon points={chairCushion.top} fill="#404048" stroke="#38383f" strokeWidth={0.3} />
      {/* Armrest posts */}
      <polygon points={armL.east} fill="#32323a" stroke="#2a2a32" strokeWidth={0.3} />
      <polygon points={armL.south} fill="#38383f" stroke="#30303a" strokeWidth={0.3} />
      <polygon points={armR.east} fill="#32323a" stroke="#2a2a32" strokeWidth={0.3} />
      <polygon points={armR.south} fill="#38383f" stroke="#30303a" strokeWidth={0.3} />
      {/* Armrest pads (soft-touch) */}
      <polygon points={armPadL.top} fill="#4a4a52" stroke="#404048" strokeWidth={0.3} />
      <polygon points={armPadR.top} fill="#4a4a52" stroke="#404048" strokeWidth={0.3} />
      {/* Backrest (mesh) — slightly translucent look */}
      <polygon points={chairBack.east} fill="#282830" stroke="#222228" strokeWidth={0.4} />
      <polygon points={chairBack.south} fill="#2c2c34" stroke="#242430" strokeWidth={0.4} />
      <polygon points={chairBack.top} fill="#323238" stroke="#2a2a32" strokeWidth={0.4} />
      {/* Mesh pattern on backrest */}
      {[0.15, 0.35, 0.55, 0.75, 0.95].map((zo, mi) => {
        const ll = p(wx - 0.38, wy - 0.74, 0.65 + zo);
        const lr = p(wx + 0.38, wy - 0.74, 0.65 + zo);
        return <line key={`mesh${mi}`} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
          stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />;
      })}
      {/* Headrest */}
      <polygon points={headrest.east} fill="#303038" stroke="#282830" strokeWidth={0.3} />
      <polygon points={headrest.south} fill="#343440" stroke="#2c2c38" strokeWidth={0.3} />
      <polygon points={headrest.top} fill="#3a3a42" stroke="#32323c" strokeWidth={0.3} />

      {/* ── Desk legs (thin steel tube) ── */}
      {legs.map((leg, i) => (
        <g key={`leg${i}`}>
          <polygon points={leg.east} fill="#808090" stroke="#6e6e7e" strokeWidth={0.3} />
          <polygon points={leg.south} fill="#8a8a9a" stroke="#78788a" strokeWidth={0.3} />
        </g>
      ))}
      {/* Cable tray */}
      <polygon points={cableTray.top} fill="#2a2a32" stroke="#22222a" strokeWidth={0.3} />

      {/* ── Desk surface (white/light gray laminate) ── */}
      <polygon points={deskMain.east} fill="#c8c8d0" stroke="#b0b0b8" strokeWidth={0.5} />
      <polygon points={deskMain.south} fill="#d4d4dc" stroke="#bcbcc4" strokeWidth={0.5} />
      <polygon points={deskMain.top} fill="#e0e0e8" stroke="#d0d0d8" strokeWidth={0.5} />
      {/* Desk return */}
      <polygon points={deskReturn.east} fill="#c8c8d0" stroke="#b0b0b8" strokeWidth={0.5} />
      <polygon points={deskReturn.south} fill="#d4d4dc" stroke="#bcbcc4" strokeWidth={0.5} />
      <polygon points={deskReturn.top} fill="#e0e0e8" stroke="#d0d0d8" strokeWidth={0.5} />

      {/* ── Monitor arm (mounted to desk) ── */}
      <polygon points={monArmBase.top} fill="#3a3a42" stroke="#2e2e36" strokeWidth={0.4} />
      <polygon points={monArmPole.east} fill="#404048" stroke="#36363e" strokeWidth={0.3} />
      <polygon points={monArmPole.south} fill="#484850" stroke="#3e3e46" strokeWidth={0.3} />
      {/* Horizontal arm extending to monitors */}
      {(() => {
        const al = p(wx - 0.8, wy + 1.15, 2.9);
        const ar = p(wx + 1.3, wy + 1.15, 2.9);
        return <line x1={al.x} y1={al.y} x2={ar.x} y2={ar.y} stroke="#404048" strokeWidth={1.5} />;
      })()}

      {/* ── Monitor L (horizontal, frameless) ── */}
      <polygon points={isoPoints([monLBl, monLBr, monLTr, monLTl])}
        fill={isActive ? screenOn : screenOff}
        stroke="#1a1a22" strokeWidth={0.6}
        filter={monitorFilter}
        className={isActive ? 'scene-monitor-active' : ''} />
      {/* Thin top bezel accent */}
      {(() => {
        const tl = p(wx - 1.14, wy + 1.04, 2.84);
        const tr = p(wx - 0.16, wy + 1.04, 2.84);
        return <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#222230" strokeWidth={1} />;
      })()}

      {/* ── Monitor R (horizontal, frameless) ── */}
      <polygon points={isoPoints([monRBl, monRBr, monRTr, monRTl])}
        fill={isActive ? screenOn : screenOff}
        stroke="#1a1a22" strokeWidth={0.6}
        filter={monitorFilter}
        className={isActive ? 'scene-monitor-active' : ''} />
      {(() => {
        const tl = p(wx - 0.04, wy + 1.04, 2.84);
        const tr = p(wx + 0.94, wy + 1.04, 2.84);
        return <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#222230" strokeWidth={1} />;
      })()}

      {/* ── Vertical monitor (portrait) ── */}
      <polygon points={isoPoints([monVBl, monVBr, monVTr, monVTl])}
        fill={isActive ? screenOn : screenOff}
        stroke="#1a1a22" strokeWidth={0.6}
        filter={monitorFilter}
        className={isActive ? 'scene-monitor-active' : ''} />

      {/* ── iPad on stand ── */}
      <polygon points={ipadStand.east} fill="#c0c0c8" stroke="#a0a0a8" strokeWidth={0.3} />
      <polygon points={ipadStand.south} fill="#c8c8d0" stroke="#b0b0b8" strokeWidth={0.3} />
      <polygon points={ipadStand.top} fill="#d0d0d8" stroke="#b8b8c0" strokeWidth={0.3} />
      <polygon points={isoPoints([ipadBl, ipadBr, ipadTr, ipadTl])}
        fill={isActive ? `${color}20` : '#0c0c16'}
        stroke="#2a2a32" strokeWidth={0.5} />
      {/* iPad home indicator */}
      {(() => {
        const hc = p(wx + 1.35, wy + 0.2, 1.92);
        return <line x1={hc.x - 3} y1={hc.y} x2={hc.x + 3} y2={hc.y}
          stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} strokeLinecap="round" />;
      })()}

      {/* ── MacBook (open, on desk) ── */}
      <polygon points={mbBase.east} fill="#c0c0c8" stroke="#a0a0a8" strokeWidth={0.3} />
      <polygon points={mbBase.south} fill="#c8c8d0" stroke="#b0b0b8" strokeWidth={0.3} />
      <polygon points={mbBase.top} fill="#d0d0d8" stroke="#b8b8c0" strokeWidth={0.3} />
      {/* MacBook keyboard area (trackpad hint) */}
      {(() => {
        const tp = blockFaces(wx - 0.5, wy + 0.2, 1.6, 0.35, 0.25, 0.005, rot, pitchDeg);
        return <polygon points={tp.top} fill="#c4c4cc" stroke="#b4b4bc" strokeWidth={0.2} />;
      })()}
      {/* MacBook screen (tilted — simplified as wall segment) */}
      <polygon points={isoPoints([mbScreenBl, mbScreenBr, mbScreenTr, mbScreenTl])}
        fill={isActive ? `${color}18` : '#08080e'}
        stroke="#2a2a32" strokeWidth={0.4} />

      {/* ── Screen content (code lines on active monitors) ── */}
      {isActive && (
        <g>
          {/* Left monitor — code */}
          {[0, 0.18, 0.36, 0.54, 0.72].map((off, li) => {
            const ll = p(wx - 1.05, wy + 1.04, 2.7 - off);
            const lr = p(wx - 1.05 + [0.55, 0.4, 0.7, 0.35, 0.5][li], wy + 1.04, 2.7 - off);
            return <line key={`cl${li}`} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
              stroke={contentColor(['80', '60', '70', '50', '65'][li])} strokeWidth={1.2} />;
          })}
          {/* Right monitor — charts/data */}
          {[0, 0.2, 0.4, 0.6].map((off, li) => {
            const ll = p(wx + 0.05, wy + 1.04, 2.7 - off);
            const lr = p(wx + 0.05 + [0.6, 0.45, 0.55, 0.3][li], wy + 1.04, 2.7 - off);
            return <line key={`cr${li}`} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
              stroke={contentColor(['70', '55', '65', '45'][li])} strokeWidth={1.2} />;
          })}
          {/* Vertical monitor — log/terminal */}
          {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((off, li) => {
            const ll = p(wx + 1.1, wy + 1.04, 3.0 - off);
            const lr = p(wx + 1.1 + [0.3, 0.25, 0.35, 0.2, 0.3, 0.25, 0.15][li], wy + 1.04, 3.0 - off);
            return <line key={`cv${li}`} x1={ll.x} y1={ll.y} x2={lr.x} y2={lr.y}
              stroke={contentColor(['50', '40', '55', '35', '45', '40', '30'][li])} strokeWidth={0.8} />;
          })}
        </g>
      )}

      {/* ── Keyboard (low-profile mechanical) ── */}
      {(() => {
        const kbFaces = blockFaces(wx - 0.6, wy + 0.2, 1.58, 1.2, 0.35, 0.03, rot, pitchDeg);
        return (
          <g>
            <polygon points={kbFaces.south} fill="#2a2a32" stroke="#222228" strokeWidth={0.3} />
            <polygon points={kbFaces.east} fill="#262630" stroke="#1e1e28" strokeWidth={0.3} />
            <polygon points={kbFaces.top}
              fill={isActive ? `${color}25` : '#303038'}
              stroke="#262630" strokeWidth={0.3}
              className={isActive ? 'scene-keyboard-active' : ''} />
            {/* Key rows hint */}
            {[0.05, 0.12, 0.19, 0.26].map((yOff, ki) => {
              const kl = p(wx - 0.5, wy + 0.22 + yOff, 1.61);
              const kr = p(wx + 0.5, wy + 0.22 + yOff, 1.61);
              return <line key={`kr${ki}`} x1={kl.x} y1={kl.y} x2={kr.x} y2={kr.y}
                stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />;
            })}
          </g>
        );
      })()}

      {/* ── Mouse (ergonomic) ── */}
      {(() => {
        const mp = p(wx + 0.85, wy + 0.3, 1.59);
        return (
          <g>
            <ellipse cx={mp.x} cy={mp.y} rx={4} ry={3}
              fill="#2e2e36" stroke="#262630" strokeWidth={0.4} />
            {/* Scroll wheel */}
            <line x1={mp.x} y1={mp.y - 1.5} x2={mp.x} y2={mp.y + 0.5}
              stroke="rgba(255,255,255,0.06)" strokeWidth={0.6} />
          </g>
        );
      })()}

      {/* ── Mouse pad ── */}
      {(() => {
        const padFaces = blockFaces(wx + 0.55, wy + 0.05, 1.58, 0.7, 0.6, 0.005, rot, pitchDeg);
        return <polygon points={padFaces.top} fill="#1e1e26" stroke="#16161e" strokeWidth={0.2} />;
      })()}
    </g>
  );
}
