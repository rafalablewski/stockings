'use client';

import React from 'react';
import { DESK_POS, ACTIVITIES } from './activities';
import type { AvatarState } from './Scene';

/* ── Layout constants ── */
const SVG_W = 1000;
const SVG_H = 340;
const FLOOR_Y = 280;
const DESK_Y = 240;

/* Map world X → screen X (5 desks spread across the scene) */
const DESK_SCREEN_X = DESK_POS.map(d => 60 + (d.x - 8) / 16 * (SVG_W - 120));

export interface FlatViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function FlatView({ avatars, workingState }: FlatViewProps) {
  return (
    <div className="scene-view">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} preserveAspectRatio="xMidYMid meet" className="scene-svg">
        <defs>
          {avatars.map(a => (
            <filter key={a.id} id={`flat-glow-${a.color.replace('#', '')}`}
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
          <linearGradient id="flat-wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141418" />
            <stop offset="100%" stopColor="#0d0d10" />
          </linearGradient>
          <linearGradient id="flat-floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0d" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>
        </defs>

        {/* ── Wall + Floor ── */}
        <rect x={0} y={0} width={SVG_W} height={FLOOR_Y} fill="url(#flat-wall-grad)" />
        <rect x={0} y={FLOOR_Y} width={SVG_W} height={60} fill="url(#flat-floor-grad)" />
        <line x1={0} y1={FLOOR_Y} x2={SVG_W} y2={FLOOR_Y}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* ── Wall decorations ── */}
        {/* NYSE Banner */}
        <rect x={60} y={40} width={140} height={70} rx={4}
          fill="rgba(0,50,120,0.35)" stroke="rgba(100,180,255,0.3)" strokeWidth={1.2} />
        <text x={130} y={72} textAnchor="middle" fill="rgba(255,255,255,0.9)"
          fontSize={18} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={3}>NYSE</text>
        <text x={130} y={92} textAnchor="middle" fill="rgba(100,180,255,0.6)"
          fontSize={6} fontFamily="'Space Mono', monospace" letterSpacing={1}>NEW YORK STOCK EXCHANGE</text>

        {/* NASDAQ Banner */}
        <rect x={800} y={40} width={140} height={70} rx={4}
          fill="rgba(0,80,50,0.35)" stroke="rgba(52,211,153,0.3)" strokeWidth={1.2} />
        <text x={870} y={72} textAnchor="middle" fill="rgba(255,255,255,0.9)"
          fontSize={16} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={2}>NASDAQ</text>
        <text x={870} y={92} textAnchor="middle" fill="rgba(52,211,153,0.6)"
          fontSize={6} fontFamily="'Space Mono', monospace" letterSpacing={1}>STOCK MARKET</text>

        {/* Ticker tape */}
        <rect x={40} y={120} width={920} height={10} rx={2}
          fill="rgba(255,200,0,0.04)" stroke="rgba(255,200,0,0.08)" strokeWidth={0.5} />
        <text x={500} y={128} textAnchor="middle" fill="rgba(255,200,0,0.4)"
          fontSize={7} fontFamily="'Space Mono', monospace" letterSpacing={1.5}>
          ASTS +2.4%   NVDA +1.2%   TSLA -0.8%   MSFT +0.5%   AAPL +0.3%
        </text>

        {/* Clock */}
        <circle cx={500} cy={60} r={16} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={500} y1={60} x2={500} y2={48} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        <line x1={500} y1={60} x2={509} y2={60} stroke="rgba(255,255,255,0.09)" strokeWidth={0.8} />

        {/* Windows */}
        {[{ x: 250, w: 60 }, { x: 690, w: 60 }].map((win, i) => (
          <g key={`win${i}`}>
            <rect x={win.x} y={50} width={win.w} height={70} rx={3}
              fill="rgba(30,40,80,0.12)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
            <line x1={win.x + win.w / 2} y1={50} x2={win.x + win.w / 2} y2={120}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            <line x1={win.x} y1={85} x2={win.x + win.w} y2={85}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          </g>
        ))}

        {/* Shelves */}
        <rect x={220} y={155} width={80} height={3} rx={1} fill="rgba(255,255,255,0.06)" />
        <rect x={700} y={150} width={70} height={3} rx={1} fill="rgba(255,255,255,0.06)" />

        {/* Plants */}
        <g>
          <rect x={28} y={FLOOR_Y - 32} width={14} height={32} rx={4}
            fill="rgba(160,90,45,0.25)" stroke="rgba(180,110,55,0.2)" strokeWidth={0.8} />
          <circle cx={35} cy={FLOOR_Y - 40} r={12} fill="rgba(52,180,100,0.12)" />
          <circle cx={30} cy={FLOOR_Y - 36} r={9} fill="rgba(40,160,90,0.1)" />
        </g>
        <g>
          <rect x={958} y={FLOOR_Y - 26} width={12} height={26} rx={4}
            fill="rgba(160,90,45,0.25)" stroke="rgba(180,110,55,0.2)" strokeWidth={0.8} />
          <circle cx={964} cy={FLOOR_Y - 33} r={9} fill="rgba(52,180,100,0.1)" />
        </g>

        {/* ── Desks + Monitors ── */}
        {DESK_SCREEN_X.map((deskX, i) => {
          const isActive = workingState[avatars[i]?.id] ?? false;
          const color = avatars[i]?.color ?? '#888';
          const monFilter = isActive ? `url(#flat-glow-${color.replace('#', '')})` : undefined;

          return (
            <g key={`desk${i}`}>
              {/* Desk legs */}
              <rect x={deskX - 36} y={DESK_Y - 2} width={4} height={42} rx={1}
                fill="rgba(120,90,50,0.25)" />
              <rect x={deskX + 32} y={DESK_Y - 2} width={4} height={42} rx={1}
                fill="rgba(120,90,50,0.25)" />
              {/* Desk surface */}
              <rect x={deskX - 40} y={DESK_Y - 10} width={80} height={8} rx={2}
                fill="rgba(120,90,50,0.3)" stroke="rgba(120,90,50,0.5)" strokeWidth={0.8} />

              {/* Monitor stand */}
              <rect x={deskX - 2} y={DESK_Y - 18} width={4} height={8}
                fill="rgba(60,60,70,0.35)" />
              {/* Monitor frame */}
              <rect x={deskX - 22} y={DESK_Y - 44} width={44} height={26} rx={3}
                fill="rgba(40,40,50,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
              {/* Monitor screen */}
              <rect x={deskX - 19} y={DESK_Y - 41} width={38} height={20} rx={2}
                fill={isActive ? `${color}25` : 'rgba(20,20,35,0.4)'}
                filter={monFilter}
                className={isActive ? 'scene-monitor-active' : ''} />
              {/* Screen content lines */}
              {isActive && (
                <>
                  <rect x={deskX - 14} y={DESK_Y - 37} width={20} height={1.5} rx={0.5} fill={`${color}50`} />
                  <rect x={deskX - 14} y={DESK_Y - 33} width={14} height={1.5} rx={0.5} fill={`${color}40`} />
                  <rect x={deskX - 14} y={DESK_Y - 29} width={24} height={1.5} rx={0.5} fill={`${color}45`} />
                  <rect x={deskX - 14} y={DESK_Y - 25} width={10} height={1.5} rx={0.5} fill={`${color}35`} />
                </>
              )}

              {/* Keyboard */}
              <rect x={deskX - 16} y={DESK_Y - 7} width={32} height={4} rx={1}
                fill={isActive ? `${color}20` : 'rgba(255,255,255,0.06)'}
                stroke="rgba(255,255,255,0.08)" strokeWidth={0.5}
                className={isActive ? 'scene-keyboard-active' : ''} />

              {/* Chair */}
              <rect x={deskX - 14} y={DESK_Y + 6} width={28} height={16} rx={4}
                fill="rgba(60,60,65,0.25)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
              <rect x={deskX - 12} y={DESK_Y + 2} width={24} height={6} rx={3}
                fill="rgba(55,55,60,0.2)" />
            </g>
          );
        })}

        {/* ── Avatars (LEGO-style, same as original) ── */}
        {avatars.map((a) => {
          const actDef = ACTIVITIES[a.activity];
          const seated = actDef.seated;
          const hidden = a.activity === 'bathroom';
          // Map world X to screen X
          const ax = 60 + (a.wx - 8) / 16 * (SVG_W - 120);
          const headR = 9;
          const bodyH = seated ? 28 : 40;
          const bodyTop = seated ? DESK_Y + 4 : FLOOR_Y - bodyH - 8;
          const headY = bodyTop - headR - 2;
          const isWalking = a.walkPath.length > 0;

          return (
            <g key={a.id} className={`scene-avatar ${isWalking ? 'scene-avatar-walking' : ''}`}
              style={{
                opacity: hidden ? 0.2 : 1,
                transform: `translate(${ax}px, 0px)`,
              }}>
              {/* Shadow */}
              <ellipse cx={0} cy={FLOOR_Y - 1} rx={12} ry={3}
                fill={`${a.color}18`} />
              {/* Body */}
              <rect x={-8} y={bodyTop} width={16} height={bodyH} rx={3}
                fill={a.color} opacity={0.85} />
              <text x={0} y={bodyTop + bodyH / 2 + 4} textAnchor="middle"
                fill="#0a0a0a" fontSize={7} fontWeight={700} fontFamily="'Space Mono', monospace">{a.badge}</text>
              {/* Head */}
              <circle cx={0} cy={headY} r={headR} fill={`${a.color}dd`} stroke={a.color} strokeWidth={1} />
              {/* Eyes */}
              <circle cx={-3} cy={headY - 1} r={1.4} fill="#0a0a0a" />
              <circle cx={3} cy={headY - 1} r={1.4} fill="#0a0a0a" />
              {/* Label */}
              <text x={0} y={FLOOR_Y + 16} textAnchor="middle"
                fill="rgba(255,255,255,0.55)" fontSize={9} fontFamily="'Outfit', sans-serif">{a.label}</text>
              {/* Working pulse */}
              {workingState[a.id] && (
                <circle cx={0} cy={headY - headR - 6} r={3.5} fill={a.color} className="scene-status-pulse" />
              )}
              {/* Activity icon */}
              {!seated && !hidden && a.activity !== 'idle' && (
                <text x={0} y={bodyTop - 8} textAnchor="middle" fontSize={10}>
                  {a.activity === 'coffee' ? '\u2615' :
                   a.activity === 'reading' ? '\uD83D\uDCDA' :
                   a.activity === 'gaming' ? '\uD83C\uDFAE' :
                   a.activity === 'phone' ? '\uD83D\uDCF1' :
                   a.activity === 'chatting' ? '\uD83D\uDCAC' : ''}
                </text>
              )}
            </g>
          );
        })}

        {/* Floor reflection */}
        <rect x={0} y={FLOOR_Y + 2} width={SVG_W} height={1} fill="rgba(255,255,255,0.02)" />
      </svg>
    </div>
  );
}
