'use client';

import React from 'react';
import { DESK_POS, ACTIVITIES, ZONES } from './activities';
import type { AvatarState } from './Scene';

/* ── Layout constants ── */
const SVG_W = 1200;
const SVG_H = 400;
const FLOOR_Y = 320;
const DESK_Y = 270;
const WALL_Y = 60;

/* Map world X → screen X (5 desks spread across work area, centered) */
const WORK_LEFT = 260;
const WORK_RIGHT = 940;
const DESK_SCREEN_X = DESK_POS.map((_, i) =>
  WORK_LEFT + (i / (DESK_POS.length - 1)) * (WORK_RIGHT - WORK_LEFT)
);

/* Zone screen X positions (matching 3D layout proportionally) */
const zoneX = (worldX: number) => 30 + (worldX / 28) * (SVG_W - 60);
const COFFEE_X = zoneX(ZONES.coffee.x);
const BOOKSHELF_X = zoneX(ZONES.bookshelf.x);
const COUCH_X = zoneX(ZONES.couch.x);
const SERVER_X = zoneX(1.5);
const CONF_X = zoneX(5.5);
const FILING_X = zoneX(2.5);

export interface FlatViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

/* ── Flat LEGO Avatar (2D side-view, matching LegoAvatar.tsx structure) ── */
function FlatLegoAvatar({
  x, color, badge, label, activity, isWorking, isWalking, hidden,
}: {
  x: number; color: string; badge: string; label: string;
  activity: string; isWorking: boolean; isWalking: boolean; hidden: boolean;
}) {
  const actDef = ACTIVITIES[activity as keyof typeof ACTIVITIES];
  const seated = actDef.seated;
  const headR = 10;
  const bodyH = seated ? 26 : 36;
  const bodyTop = seated ? DESK_Y + 2 : FLOOR_Y - bodyH - 10;
  const headY = bodyTop - headR - 3;
  const headColor = `${color}cc`;

  return (
    <g
      className={`scene-avatar ${isWalking ? 'scene-avatar-walking' : ''}`}
      style={{
        opacity: hidden ? 0.25 : 1,
        transform: `translate(${x}px, 0px)`,
      }}
    >
      {/* Shadow */}
      <ellipse cx={0} cy={FLOOR_Y - 1} rx={14} ry={3} fill={`${color}18`} />

      {/* Legs */}
      <g className={isWalking ? 'scene-leg-left' : ''}>
        <rect x={-7} y={bodyTop + bodyH - 2} width={6} height={seated ? 10 : 14} rx={2}
          fill={`${color}88`} />
      </g>
      <g className={isWalking ? 'scene-leg-right' : ''}>
        <rect x={1} y={bodyTop + bodyH - 2} width={6} height={seated ? 10 : 14} rx={2}
          fill={`${color}88`} />
      </g>

      {/* Body */}
      <rect x={-10} y={bodyTop} width={20} height={bodyH} rx={3}
        fill={color} opacity={0.9} />
      <text x={0} y={bodyTop + bodyH / 2 + 4} textAnchor="middle" fill="#0a0a0a"
        fontSize={7} fontWeight={700} fontFamily="'Space Mono', monospace">{badge}</text>

      {/* Arms */}
      <g style={{
        transformOrigin: `${-10}px ${bodyTop + 3}px`,
        transform: `rotate(${actDef.leftArm}deg)`,
        transition: 'transform 0.5s ease-in-out',
      }}>
        <rect x={-16} y={bodyTop + 3} width={6} height={20} rx={3} fill={color} opacity={0.75} />
      </g>
      <g style={{
        transformOrigin: `${10}px ${bodyTop + 3}px`,
        transform: `rotate(${actDef.rightArm}deg)`,
        transition: 'transform 0.5s ease-in-out',
      }}>
        <rect x={10} y={bodyTop + 3} width={6} height={20} rx={3} fill={color} opacity={0.75} />
      </g>

      {/* Head */}
      <rect x={-10} y={headY - headR} width={20} height={headR * 2} rx={5}
        fill={headColor} stroke={color} strokeWidth={1} />
      {/* Eyes */}
      <circle cx={-3} cy={headY - 1} r={1.5} fill="#0a0a0a" />
      <circle cx={5} cy={headY - 1} r={1.5} fill="#0a0a0a" />
      {/* Mouth */}
      {(activity === 'chatting' || activity === 'gaming') ? (
        <path d={`M-3,${headY + 5} Q1,${headY + 8} 5,${headY + 5}`}
          fill="none" stroke="#0a0a0a" strokeWidth={1} />
      ) : (
        <line x1={-2} y1={headY + 5} x2={4} y2={headY + 5}
          stroke="#0a0a0a" strokeWidth={0.8} opacity={0.5} />
      )}

      {/* ── Activity Props ── */}
      {actDef.prop === 'coffee-cup' && (
        <g className="scene-prop-bob">
          <rect x={-24} y={bodyTop - 10} width={8} height={10} rx={2} fill="#8B6914" opacity={0.8} />
          <rect x={-24} y={bodyTop - 12} width={8} height={3} rx={1} fill="#d4a832" opacity={0.6} />
          <path d={`M-22,${bodyTop - 14} Q-20,${bodyTop - 20} -22,${bodyTop - 26}`}
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} className="scene-steam" />
        </g>
      )}
      {actDef.prop === 'book' && (
        <g>
          <rect x={-10} y={bodyTop - 12} width={20} height={14} rx={2} fill="#6366f1" opacity={0.7} />
          <line x1={0} y1={bodyTop - 12} x2={0} y2={bodyTop + 2} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
        </g>
      )}
      {actDef.prop === 'controller' && (
        <g className="scene-controller-tilt">
          <rect x={-10} y={bodyTop + 4} width={20} height={8} rx={4} fill="#333" stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
          <circle cx={-5} cy={bodyTop + 8} r={1.5} fill={color} opacity={0.5} />
          <circle cx={5} cy={bodyTop + 8} r={1.5} fill={color} opacity={0.5} />
        </g>
      )}
      {actDef.prop === 'phone' && (
        <g>
          <rect x={12} y={headY - headR - 4} width={6} height={12} rx={2} fill="#444" stroke="rgba(255,255,255,0.2)" strokeWidth={0.5} />
          <path d={`M22,${headY - headR} Q26,${headY - headR + 2} 22,${headY - headR + 4}`}
            fill="none" stroke={`${color}40`} strokeWidth={0.8} className="scene-signal" />
          <path d={`M24,${headY - headR - 2} Q30,${headY - headR + 2} 24,${headY - headR + 6}`}
            fill="none" stroke={`${color}25`} strokeWidth={0.6} className="scene-signal scene-signal-delay" />
        </g>
      )}

      {/* Chat bubble */}
      {actDef.bubble && (
        <g className="scene-bubble-pop">
          <rect x={-16} y={headY - headR - 28} width={32} height={14} rx={7}
            fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
          <polygon points={`-2,${headY - headR - 14} 2,${headY - headR - 14} 0,${headY - headR - 10}`}
            fill="rgba(255,255,255,0.08)" />
          <circle cx={-6} cy={headY - headR - 21} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-1" />
          <circle cx={0} cy={headY - headR - 21} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-2" />
          <circle cx={6} cy={headY - headR - 21} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-3" />
        </g>
      )}

      {/* Name label */}
      <text x={0} y={FLOOR_Y + 16} textAnchor="middle"
        fill="rgba(255,255,255,0.55)" fontSize={9} fontFamily="'Outfit', sans-serif">{label}</text>

      {/* Working pulse */}
      {isWorking && (
        <circle cx={0} cy={headY - headR - 6} r={3.5} fill={color} className="scene-status-pulse" />
      )}
    </g>
  );
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

        {/* ═══ WALL + FLOOR ═══ */}
        <rect x={0} y={0} width={SVG_W} height={FLOOR_Y} fill="url(#flat-wall-grad)" />
        <rect x={0} y={FLOOR_Y} width={SVG_W} height={80} fill="url(#flat-floor-grad)" />
        <line x1={0} y1={FLOOR_Y} x2={SVG_W} y2={FLOOR_Y}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* ═══ FLOOR ZONES (colored strips matching 3D) ═══ */}
        {/* Work area — dark blue carpet */}
        <rect x={WORK_LEFT - 50} y={FLOOR_Y} width={WORK_RIGHT - WORK_LEFT + 100} height={60}
          fill="#12142a" opacity={0.6} />
        {/* Coffee zone — warm brown */}
        <rect x={COFFEE_X - 50} y={FLOOR_Y} width={100} height={60}
          fill="#1e1810" opacity={0.5} />
        {/* Library zone — warm wood */}
        <rect x={BOOKSHELF_X - 40} y={FLOOR_Y} width={80} height={60}
          fill="#1a1610" opacity={0.5} />
        {/* Lounge zone — burgundy */}
        <rect x={COUCH_X - 60} y={FLOOR_Y} width={120} height={60}
          fill="#201418" opacity={0.5} />
        {/* Conference zone — teal */}
        <rect x={CONF_X - 50} y={FLOOR_Y} width={100} height={60}
          fill="#14282e" opacity={0.5} />

        {/* ═══ WALL DECORATIONS ═══ */}

        {/* NYSE Banner */}
        <rect x={80} y={WALL_Y} width={120} height={60} rx={4}
          fill="rgba(0,50,120,0.5)" stroke="rgba(100,180,255,0.25)" strokeWidth={1} />
        <text x={140} y={WALL_Y + 28} textAnchor="middle" fill="rgba(255,255,255,0.9)"
          fontSize={18} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={3}>NYSE</text>
        <text x={140} y={WALL_Y + 44} textAnchor="middle" fill="rgba(100,180,255,0.6)"
          fontSize={5.5} fontFamily="'Space Mono', monospace" letterSpacing={1}>NEW YORK STOCK EXCHANGE</text>

        {/* NASDAQ Banner */}
        <rect x={SVG_W - 200} y={WALL_Y} width={120} height={60} rx={4}
          fill="rgba(0,80,50,0.5)" stroke="rgba(52,211,153,0.25)" strokeWidth={1} />
        <text x={SVG_W - 140} y={WALL_Y + 28} textAnchor="middle" fill="rgba(255,255,255,0.9)"
          fontSize={16} fontWeight={800} fontFamily="'Space Mono', monospace" letterSpacing={2}>NASDAQ</text>
        <text x={SVG_W - 140} y={WALL_Y + 44} textAnchor="middle" fill="rgba(52,211,153,0.6)"
          fontSize={5.5} fontFamily="'Space Mono', monospace" letterSpacing={1}>STOCK MARKET</text>

        {/* Ticker tape */}
        <rect x={40} y={WALL_Y + 70} width={SVG_W - 80} height={10} rx={2}
          fill="rgba(255,200,0,0.04)" stroke="rgba(255,200,0,0.08)" strokeWidth={0.5} />
        <text x={SVG_W / 2} y={WALL_Y + 78} textAnchor="middle" fill="rgba(255,200,0,0.4)"
          fontSize={7} fontFamily="'Space Mono', monospace" letterSpacing={1.5}>
          ASTS +2.4%   NVDA +1.2%   TSLA -0.8%   MSFT +0.5%   AAPL +0.3%
        </text>

        {/* Clock */}
        <circle cx={SVG_W / 2} cy={WALL_Y + 30} r={16} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={SVG_W / 2} y1={WALL_Y + 30} x2={SVG_W / 2} y2={WALL_Y + 18} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        <line x1={SVG_W / 2} y1={WALL_Y + 30} x2={SVG_W / 2 + 9} y2={WALL_Y + 30} stroke="rgba(255,255,255,0.09)" strokeWidth={0.8} />

        {/* STOCKINGS company logo */}
        <rect x={SVG_W / 2 - 70} y={WALL_Y - 10} width={140} height={24} rx={4}
          fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.12)" strokeWidth={0.5} />
        <text x={SVG_W / 2} y={WALL_Y + 5} textAnchor="middle" fill="rgba(99,102,241,0.5)"
          fontSize={10} fontWeight={700} fontFamily="'Space Mono', monospace" letterSpacing={2}>STOCKINGS</text>

        {/* Windows */}
        {[{ x: 320, w: 50 }, { x: 830, w: 50 }].map((win, i) => (
          <g key={`win${i}`}>
            <rect x={win.x} y={WALL_Y + 10} width={win.w} height={55} rx={3}
              fill="rgba(30,40,80,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
            <line x1={win.x + win.w / 2} y1={WALL_Y + 10} x2={win.x + win.w / 2} y2={WALL_Y + 65}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            <line x1={win.x} y1={WALL_Y + 37} x2={win.x + win.w} y2={WALL_Y + 37}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          </g>
        ))}

        {/* Sprint board / whiteboard */}
        <rect x={BOOKSHELF_X + 30} y={WALL_Y + 10} width={50} height={35} rx={2}
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
        <text x={BOOKSHELF_X + 55} y={WALL_Y + 20} textAnchor="middle" fill="rgba(255,255,255,0.08)"
          fontSize={4} fontFamily="'Space Mono', monospace">SPRINT BOARD</text>
        {[24, 30, 36].map((yy, i) => (
          <line key={`sb${i}`} x1={BOOKSHELF_X + 34} y1={WALL_Y + yy}
            x2={BOOKSHELF_X + 34 + [30, 38, 20][i]} y2={WALL_Y + yy}
            stroke={['rgba(52,211,153,0.15)', 'rgba(34,211,238,0.12)', 'rgba(251,146,60,0.1)'][i]} strokeWidth={1.2} />
        ))}

        {/* Bathroom door */}
        <rect x={20} y={WALL_Y + 10} width={30} height={75} rx={2}
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
        <circle cx={45} cy={WALL_Y + 50} r={2.5} fill="rgba(255,255,255,0.1)" />
        <text x={35} y={WALL_Y + 30} textAnchor="middle" fill="rgba(255,255,255,0.25)"
          fontSize={7} fontWeight={700} fontFamily="'Space Mono', monospace">WC</text>

        {/* Entrance doors */}
        <rect x={SVG_W / 2 - 30} y={WALL_Y + 20} width={26} height={65} rx={2}
          fill="rgba(100,150,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
        <rect x={SVG_W / 2 - 2} y={WALL_Y + 20} width={26} height={65} rx={2}
          fill="rgba(100,150,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
        <text x={SVG_W / 2 - 3} y={WALL_Y + 56} textAnchor="middle" fill="rgba(255,255,255,0.15)"
          fontSize={4} letterSpacing={2}>ENTRANCE</text>

        {/* ═══ SERVER RACK (left side) ═══ */}
        <g>
          <rect x={SERVER_X - 15} y={FLOOR_Y - 100} width={30} height={100} rx={2}
            fill="#3c3c4a" stroke="#282836" strokeWidth={1} />
          {/* Rack slots */}
          {[0, 16, 32, 48, 64].map((off, i) => (
            <line key={`rs${i}`} x1={SERVER_X - 13} y1={FLOOR_Y - 96 + off}
              x2={SERVER_X + 13} y2={FLOOR_Y - 96 + off}
              stroke="#24242f" strokeWidth={0.6} />
          ))}
          {/* LEDs */}
          {[0, 16, 32, 48, 64].map((off, i) => (
            <circle key={`led${i}`} cx={SERVER_X + 10} cy={FLOOR_Y - 88 + off} r={2}
              fill={i % 2 === 0 ? '#34d399' : '#60a5fa'} className="scene-ps5-light" />
          ))}
          <text x={SERVER_X} y={FLOOR_Y - 104} textAnchor="middle"
            fill="#8888a0" fontSize={4} fontFamily="'Space Mono', monospace">SERVERS</text>
        </g>

        {/* ═══ FILING CABINETS ═══ */}
        {[0, 24, 48].map((off, i) => (
          <g key={`fc${i}`}>
            <rect x={FILING_X - 10 + off} y={FLOOR_Y - 60} width={20} height={60} rx={1}
              fill="#7e7e8c" stroke="#5e5e6c" strokeWidth={0.8} />
            {/* Drawer lines */}
            {[18, 36].map((dy, di) => (
              <line key={`dl${di}`} x1={FILING_X - 9 + off} y1={FLOOR_Y - 60 + dy}
                x2={FILING_X + 9 + off} y2={FLOOR_Y - 60 + dy}
                stroke="#52525c" strokeWidth={0.8} />
            ))}
            {/* Handles */}
            {[10, 27, 44].map((dy, di) => (
              <circle key={`dh${di}`} cx={FILING_X + off} cy={FLOOR_Y - 60 + dy} r={2}
                fill="#a0a0ac" stroke="#8a8a96" strokeWidth={0.5} />
            ))}
          </g>
        ))}

        {/* ═══ CONFERENCE TABLE + CHAIRS ═══ */}
        <g>
          {/* Table legs */}
          <rect x={CONF_X - 38} y={DESK_Y + 2} width={4} height={FLOOR_Y - DESK_Y - 2} rx={1}
            fill="#5a5a64" />
          <rect x={CONF_X + 34} y={DESK_Y + 2} width={4} height={FLOOR_Y - DESK_Y - 2} rx={1}
            fill="#5a5a64" />
          {/* Table surface */}
          <rect x={CONF_X - 42} y={DESK_Y - 6} width={84} height={8} rx={2}
            fill="#8b6b3a" stroke="#9c7a45" strokeWidth={0.8} />
          {/* Chairs — red fabric */}
          {[-34, -14, 10, 30].map((off, i) => (
            <g key={`cc${i}`}>
              <rect x={CONF_X + off - 8} y={DESK_Y + 6} width={16} height={16} rx={4}
                fill="#a04040" stroke="#742c2c" strokeWidth={0.5} />
              <rect x={CONF_X + off - 6} y={DESK_Y + 2} width={12} height={6} rx={3}
                fill="#943838" />
            </g>
          ))}
        </g>

        {/* ═══ COFFEE STATION ═══ */}
        <g>
          {/* Counter */}
          <rect x={COFFEE_X - 25} y={DESK_Y - 10} width={50} height={12} rx={2}
            fill="#7a5a32" stroke="#5c4226" strokeWidth={0.8} />
          {/* Counter legs */}
          <rect x={COFFEE_X - 22} y={DESK_Y + 2} width={4} height={FLOOR_Y - DESK_Y - 2} rx={1}
            fill="#6b4e2c" />
          <rect x={COFFEE_X + 18} y={DESK_Y + 2} width={4} height={FLOOR_Y - DESK_Y - 2} rx={1}
            fill="#6b4e2c" />
          {/* Coffee machine */}
          <rect x={COFFEE_X - 12} y={DESK_Y - 30} width={16} height={20} rx={2}
            fill="#8a8a95" stroke="#5e5e68" strokeWidth={0.8} />
          {/* Machine buttons */}
          <circle cx={COFFEE_X - 4} cy={DESK_Y - 22} r={2} fill="#34d399" />
          <circle cx={COFFEE_X + 2} cy={DESK_Y - 22} r={2} fill="#fb923c" />
          {/* Mugs */}
          <circle cx={COFFEE_X + 14} cy={DESK_Y - 12} r={4} fill="#c4956a" stroke="#a87d55" strokeWidth={0.5} />
          <circle cx={COFFEE_X + 22} cy={DESK_Y - 12} r={3.5} fill="#e8e8e8" stroke="#ccc" strokeWidth={0.5} />
          {/* Steam */}
          <path d={`M${COFFEE_X - 6},${DESK_Y - 32} Q${COFFEE_X - 8},${DESK_Y - 42} ${COFFEE_X - 6},${DESK_Y - 48}`}
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} className="scene-steam" />
          <path d={`M${COFFEE_X},${DESK_Y - 32} Q${COFFEE_X + 2},${DESK_Y - 43} ${COFFEE_X},${DESK_Y - 49}`}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} className="scene-steam scene-steam-delay" />
          <text x={COFFEE_X} y={DESK_Y - 34} textAnchor="middle"
            fill="#c4a882" fontSize={5} fontFamily="'Space Mono', monospace" letterSpacing={1}>COFFEE</text>
        </g>

        {/* Water cooler */}
        <g>
          <rect x={COFFEE_X + 50} y={FLOOR_Y - 50} width={12} height={50} rx={2}
            fill="#7a7a88" stroke="#5c5c6a" strokeWidth={0.8} />
          <rect x={COFFEE_X + 51} y={FLOOR_Y - 75} width={10} height={25} rx={2}
            fill="#5baee6" stroke="#3b88c2" strokeWidth={0.8} />
          <circle cx={COFFEE_X + 56} cy={FLOOR_Y - 80} r={4} fill="#7cc4f0" stroke="#5baee6" strokeWidth={0.8} />
        </g>

        {/* ═══ BOOKSHELF / LIBRARY ═══ */}
        <g>
          <rect x={BOOKSHELF_X - 25} y={FLOOR_Y - 110} width={50} height={110} rx={2}
            fill="#6b4422" stroke="#4d3118" strokeWidth={1} />
          {/* Shelf boards */}
          {[30, 60, 85].map((off, si) => (
            <g key={`shelf${si}`}>
              <line x1={BOOKSHELF_X - 24} y1={FLOOR_Y - 110 + off}
                x2={BOOKSHELF_X + 24} y2={FLOOR_Y - 110 + off}
                stroke="#7a5530" strokeWidth={1.2} />
              {/* Books */}
              {[0, 7, 14, 21, 28, 35].map((bOff, bi) => {
                const colors = ['#6366f1', '#34d399', '#fb923c', '#a78bfa', '#22d3ee', '#f472b6'];
                const bh = 22 - (bi % 3) * 2;
                return <rect key={`b${si}${bi}`} x={BOOKSHELF_X - 22 + bOff} y={FLOOR_Y - 110 + off - bh}
                  width={5} height={bh} rx={0.5} fill={colors[bi]} opacity={0.85} />;
              })}
            </g>
          ))}
          <text x={BOOKSHELF_X} y={FLOOR_Y + 14} textAnchor="middle"
            fill="#c4956a" fontSize={5} fontFamily="'Space Mono', monospace">LIBRARY</text>
        </g>

        {/* ═══ LOUNGE: COUCH + TV + PS5 ═══ */}
        <g>
          {/* Couch */}
          <rect x={COUCH_X - 40} y={FLOOR_Y - 38} width={80} height={22} rx={4}
            fill="#4a5568" stroke="#333d4a" strokeWidth={0.8} />
          {/* Couch back */}
          <rect x={COUCH_X - 40} y={FLOOR_Y - 50} width={80} height={14} rx={4}
            fill="#3d4756" stroke="#2b3440" strokeWidth={0.8} />
          {/* Cushion dividers */}
          {[-14, 14].map((off, i) => (
            <line key={`cd${i}`} x1={COUCH_X + off} y1={FLOOR_Y - 38}
              x2={COUCH_X + off} y2={FLOOR_Y - 18}
              stroke="#2b3440" strokeWidth={0.8} />
          ))}
          {/* Throw pillows */}
          <rect x={COUCH_X - 36} y={FLOOR_Y - 44} width={12} height={10} rx={4}
            fill="#e87461" stroke="#c05545" strokeWidth={0.5} />
          <rect x={COUCH_X + 24} y={FLOOR_Y - 44} width={12} height={10} rx={4}
            fill="#f0c040" stroke="#c8a02c" strokeWidth={0.5} />

          {/* TV stand */}
          <rect x={COUCH_X + 56} y={FLOOR_Y - 50} width={8} height={50} rx={1}
            fill="#3a3a42" stroke="#24242c" strokeWidth={0.5} />
          {/* TV screen */}
          <rect x={COUCH_X + 44} y={FLOOR_Y - 90} width={32} height={40} rx={3}
            fill="#2a2a32" stroke="#1e1e26" strokeWidth={1} />
          <rect x={COUCH_X + 47} y={FLOOR_Y - 87} width={26} height={34} rx={2}
            fill="#101028" className="scene-tv-screen" />

          {/* PS5 */}
          <rect x={COUCH_X + 80} y={FLOOR_Y - 30} width={8} height={30} rx={2}
            fill="#e8e8f0" stroke="#b8b8c0" strokeWidth={0.5} />
          <rect x={COUCH_X + 81} y={FLOOR_Y - 22} width={6} height={4} rx={1}
            fill="#4a90e2" className="scene-ps5-light" />
        </g>

        {/* ═══ PLANTS ═══ */}
        {[
          { x: CONF_X - 55, potH: 30, r: 10 },
          { x: BOOKSHELF_X + 35, potH: 24, r: 8 },
          { x: 70, potH: 26, r: 9 },
          { x: COUCH_X - 55, potH: 20, r: 7 },
        ].map((pl, i) => (
          <g key={`plant${i}`}>
            <rect x={pl.x - 6} y={FLOOR_Y - pl.potH} width={12} height={pl.potH} rx={3}
              fill="#b86b35" stroke="#8c4f25" strokeWidth={0.8} />
            <circle cx={pl.x} cy={FLOOR_Y - pl.potH - 2} r={5} fill="#5a3820" />
            <circle cx={pl.x} cy={FLOOR_Y - pl.potH - pl.r * 0.9} r={pl.r} fill="#2d8f52" />
            <circle cx={pl.x - pl.r * 0.5} cy={FLOOR_Y - pl.potH - pl.r * 0.5} r={pl.r * 0.7} fill="#38a862" />
            <circle cx={pl.x + pl.r * 0.5} cy={FLOOR_Y - pl.potH - pl.r * 0.6} r={pl.r * 0.65} fill="#247a44" />
          </g>
        ))}

        {/* ═══ MARKET DATA display (right wall) ═══ */}
        <g>
          <rect x={SVG_W - 70} y={WALL_Y + 15} width={55} height={70} rx={3}
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
          <rect x={SVG_W - 67} y={WALL_Y + 20} width={49} height={60} rx={2}
            fill="rgba(20,20,50,0.3)" className="scene-tv-screen" />
          <text x={SVG_W - 42} y={WALL_Y + 18} textAnchor="middle"
            fill="rgba(100,180,255,0.4)" fontSize={4}>MARKET DATA</text>
          {/* Chart line */}
          <polyline points={`${SVG_W - 64},${WALL_Y + 60} ${SVG_W - 56},${WALL_Y + 52} ${SVG_W - 48},${WALL_Y + 56} ${SVG_W - 40},${WALL_Y + 44} ${SVG_W - 32},${WALL_Y + 48} ${SVG_W - 24},${WALL_Y + 36}`}
            fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth={1.2} />
        </g>

        {/* ═══ DESKS + MONITORS ═══ */}
        {DESK_SCREEN_X.map((deskX, i) => {
          const isActive = workingState[avatars[i]?.id] ?? false;
          const color = avatars[i]?.color ?? '#888';
          const monFilter = isActive ? `url(#flat-glow-${color.replace('#', '')})` : undefined;

          return (
            <g key={`desk${i}`}>
              {/* Desk legs — steel gray */}
              <rect x={deskX - 36} y={DESK_Y} width={4} height={FLOOR_Y - DESK_Y} rx={1}
                fill="#5a5a64" />
              <rect x={deskX + 32} y={DESK_Y} width={4} height={FLOOR_Y - DESK_Y} rx={1}
                fill="#5a5a64" />
              {/* Desk surface — warm wood */}
              <rect x={deskX - 40} y={DESK_Y - 8} width={80} height={8} rx={2}
                fill="#a5845a" stroke="#947550" strokeWidth={0.8} />

              {/* Monitor stand — dark metal */}
              <rect x={deskX - 2} y={DESK_Y - 18} width={4} height={10}
                fill="#555560" stroke="#48484f" strokeWidth={0.5} />
              {/* Left monitor bezel */}
              <rect x={deskX - 28} y={DESK_Y - 50} width={24} height={32} rx={3}
                fill="#2a2a32" stroke="#1e1e26" strokeWidth={1} />
              {/* Left monitor screen */}
              <rect x={deskX - 25} y={DESK_Y - 47} width={18} height={26} rx={2}
                fill={isActive ? `${color}40` : '#141422'}
                filter={monFilter}
                className={isActive ? 'scene-monitor-active' : ''} />
              {/* Right monitor bezel */}
              <rect x={deskX + 4} y={DESK_Y - 50} width={24} height={32} rx={3}
                fill="#2a2a32" stroke="#1e1e26" strokeWidth={1} />
              {/* Right monitor screen */}
              <rect x={deskX + 7} y={DESK_Y - 47} width={18} height={26} rx={2}
                fill={isActive ? `${color}40` : '#141422'}
                filter={monFilter}
                className={isActive ? 'scene-monitor-active' : ''} />

              {/* Screen content lines */}
              {isActive && (
                <>
                  <rect x={deskX - 22} y={DESK_Y - 43} width={12} height={1.5} rx={0.5} fill={`${color}80`} />
                  <rect x={deskX - 22} y={DESK_Y - 39} width={9} height={1.5} rx={0.5} fill={`${color}60`} />
                  <rect x={deskX - 22} y={DESK_Y - 35} width={14} height={1.5} rx={0.5} fill={`${color}70`} />
                  <rect x={deskX + 10} y={DESK_Y - 43} width={10} height={1.5} rx={0.5} fill={`${color}70`} />
                  <rect x={deskX + 10} y={DESK_Y - 39} width={13} height={1.5} rx={0.5} fill={`${color}50`} />
                  <rect x={deskX + 10} y={DESK_Y - 35} width={8} height={1.5} rx={0.5} fill={`${color}60`} />
                </>
              )}

              {/* Keyboard — dark plastic */}
              <rect x={deskX - 16} y={DESK_Y - 5} width={32} height={4} rx={1}
                fill={isActive ? `${color}35` : '#38383f'}
                stroke="#2e2e36" strokeWidth={0.5}
                className={isActive ? 'scene-keyboard-active' : ''} />

              {/* Mouse */}
              <ellipse cx={deskX + 24} cy={DESK_Y - 4} rx={4} ry={3}
                fill="#404048" stroke="#36363e" strokeWidth={0.5} />

              {/* Chair — dark fabric */}
              <rect x={deskX - 14} y={DESK_Y + 6} width={28} height={18} rx={4}
                fill="#4d4d55" stroke="#42424a" strokeWidth={0.5} />
              <rect x={deskX - 12} y={DESK_Y + 2} width={24} height={6} rx={3}
                fill="#45454d" stroke="#3a3a42" strokeWidth={0.5} />
              {/* Chair base / pole */}
              <rect x={deskX - 2} y={DESK_Y + 24} width={4} height={FLOOR_Y - DESK_Y - 24} rx={1}
                fill="#3a3a42" />
            </g>
          );
        })}

        {/* ═══ AVATARS (LEGO-style with full activities) ═══ */}
        {avatars.map((a) => {
          const hidden = a.activity === 'bathroom';
          const isWalking = a.walkPath.length > 0;
          // Map world X to screen X
          const ax = 30 + (a.wx - 0) / 28 * (SVG_W - 60);

          return (
            <FlatLegoAvatar
              key={a.id}
              x={ax}
              color={a.color}
              badge={a.badge}
              label={a.label}
              activity={a.activity}
              isWorking={workingState[a.id] ?? false}
              isWalking={isWalking}
              hidden={hidden}
            />
          );
        })}

        {/* Floor reflection */}
        <rect x={0} y={FLOOR_Y + 2} width={SVG_W} height={1} fill="rgba(255,255,255,0.02)" />
      </svg>
    </div>
  );
}
