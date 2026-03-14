'use client';

import React from 'react';
import DeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';
import { DESK_X, ZONES } from './activities';
import type { AvatarState } from './Scene';

const FLOOR_Y = 280;
const DESK_Y = 240;

export interface SceneViewProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function SceneView({ avatars, workingState }: SceneViewProps) {
  return (
    <div className="scene-view">
      <svg
        viewBox="0 0 1200 340"
        preserveAspectRatio="xMidYMid meet"
        className="scene-svg"
      >
        <defs>
          {/* Glow filters */}
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
          <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141418" />
            <stop offset="100%" stopColor="#0d0d10" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0d" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>
          {/* TV screen gradient */}
          <linearGradient id="tv-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1a3e" />
            <stop offset="100%" stopColor="#0d1117" />
          </linearGradient>
        </defs>

        {/* ── Background ── */}
        <rect x={0} y={0} width={1200} height={FLOOR_Y} fill="url(#wall-grad)" />
        <rect x={0} y={FLOOR_Y} width={1200} height={60} fill="url(#floor-grad)" />
        <line x1={0} y1={FLOOR_Y} x2={1200} y2={FLOOR_Y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* ═══ LEFT ZONE: Bathroom ═══ */}
        {/* Bathroom door */}
        <rect x={30} y={130} width={50} height={FLOOR_Y - 130} rx={3} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        {/* Door handle */}
        <circle cx={72} cy={210} r={3} fill="rgba(255,255,255,0.1)" />
        {/* WC sign */}
        <rect x={42} y={142} width={26} height={14} rx={3} fill="rgba(255,255,255,0.04)" />
        <text x={55} y={153} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={8} fontFamily="'Space Mono', monospace" fontWeight={700}>WC</text>

        {/* ═══ COFFEE ZONE ═══ */}
        {/* Coffee machine (wall-mounted counter) */}
        <rect x={120} y={FLOOR_Y - 70} width={60} height={70} rx={3} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        {/* Machine body */}
        <rect x={130} y={FLOOR_Y - 64} width={40} height={30} rx={4} fill="rgba(139,69,19,0.15)" stroke="rgba(139,69,19,0.3)" strokeWidth={0.5} />
        {/* Buttons */}
        <circle cx={140} cy={FLOOR_Y - 52} r={2} fill="rgba(52,211,153,0.4)" />
        <circle cx={148} cy={FLOOR_Y - 52} r={2} fill="rgba(251,146,60,0.3)" />
        {/* Drip tray */}
        <rect x={134} y={FLOOR_Y - 30} width={32} height={4} rx={1} fill="rgba(255,255,255,0.04)" />
        {/* Cup */}
        <rect x={144} y={FLOOR_Y - 34} width={10} height={8} rx={2} fill="rgba(255,255,255,0.05)" />
        {/* "COFFEE" label */}
        <text x={150} y={FLOOR_Y - 72} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize={7} fontFamily="'Outfit', sans-serif" letterSpacing="1">COFFEE</text>

        {/* ═══ WORK ZONE: 5 Desks ═══ */}
        {DESK_X.map((deskX, i) => (
          <DeskUnit
            key={i}
            x={deskX}
            y={DESK_Y}
            color={avatars[i].color}
            isActive={workingState[avatars[i].id] ?? false}
          />
        ))}

        {/* ═══ RIGHT ZONE: Couch + TV/PS5 ═══ */}
        {/* TV on wall */}
        <rect x={ZONES.couch - 30} y={140} width={60} height={38} rx={3} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        {/* TV screen */}
        <rect x={ZONES.couch - 27} y={143} width={54} height={32} rx={2} fill="url(#tv-screen)" className="scene-tv-screen" />
        {/* TV stand */}
        <rect x={ZONES.couch - 3} y={178} width={6} height={12} fill="rgba(255,255,255,0.06)" />
        {/* PS5 console */}
        <rect x={ZONES.couch + 28} y={182} width={8} height={18} rx={2} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
        {/* PS5 light strip */}
        <rect x={ZONES.couch + 30} y={185} width={4} height={3} rx={1} fill="rgba(100,149,237,0.3)" className="scene-ps5-light" />
        {/* Couch */}
        <rect x={ZONES.couch - 35} y={FLOOR_Y - 32} width={70} height={32} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        {/* Couch back */}
        <rect x={ZONES.couch - 38} y={FLOOR_Y - 50} width={76} height={22} rx={6} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        {/* Cushion lines */}
        <line x1={ZONES.couch - 10} y1={FLOOR_Y - 28} x2={ZONES.couch - 10} y2={FLOOR_Y - 4} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <line x1={ZONES.couch + 10} y1={FLOOR_Y - 28} x2={ZONES.couch + 10} y2={FLOOR_Y - 4} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />

        {/* ═══ FAR RIGHT: Bookshelf ═══ */}
        <rect x={ZONES.bookshelf - 25} y={130} width={50} height={FLOOR_Y - 130} rx={3} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        {/* Shelves */}
        {[160, 195, 230].map(shelfY => (
          <g key={shelfY}>
            <line x1={ZONES.bookshelf - 23} y1={shelfY} x2={ZONES.bookshelf + 23} y2={shelfY} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            {/* Books on each shelf */}
            {[0, 6, 14, 22, 30, 36].map((offset, bi) => (
              <rect
                key={bi}
                x={ZONES.bookshelf - 21 + offset}
                y={shelfY - 18 + bi % 3 * 2}
                width={5}
                height={16 - bi % 3 * 2}
                rx={0.5}
                fill={[
                  'rgba(99,102,241,0.15)',
                  'rgba(52,211,153,0.12)',
                  'rgba(251,146,60,0.12)',
                  'rgba(167,139,250,0.12)',
                  'rgba(34,211,238,0.12)',
                  'rgba(244,114,182,0.1)',
                ][bi]}
              />
            ))}
          </g>
        ))}

        {/* ═══ Wall decorations ═══ */}
        {/* Clock */}
        <circle cx={600} cy={60} r={18} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <circle cx={600} cy={60} r={1} fill="rgba(255,255,255,0.15)" />
        <line x1={600} y1={60} x2={600} y2={48} stroke="rgba(255,255,255,0.12)" strokeWidth={1.2} />
        <line x1={600} y1={60} x2={609} y2={60} stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
        {/* Windows */}
        <rect x={380} y={50} width={55} height={60} rx={2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <line x1={407.5} y1={50} x2={407.5} y2={110} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <line x1={380} y1={80} x2={435} y2={80} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <rect x={765} y={50} width={55} height={60} rx={2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <line x1={792.5} y1={50} x2={792.5} y2={110} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        <line x1={765} y1={80} x2={820} y2={80} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        {/* Whiteboard between windows */}
        <rect x={470} y={90} width={100} height={50} rx={3} fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        <text x={520} y={110} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize={7} fontFamily="'Outfit', sans-serif">SPRINT BOARD</text>
        {/* Some whiteboard scribbles */}
        <line x1={480} y1={118} x2={510} y2={118} stroke="rgba(52,211,153,0.12)" strokeWidth={1} />
        <line x1={480} y1={125} x2={530} y2={125} stroke="rgba(34,211,238,0.1)" strokeWidth={1} />
        <line x1={480} y1={132} x2={500} y2={132} stroke="rgba(251,146,60,0.08)" strokeWidth={1} />

        {/* ── Plants ── */}
        <rect x={96} y={FLOOR_Y - 28} width={12} height={28} rx={3} fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth={0.5} />
        <circle cx={102} cy={FLOOR_Y - 34} r={9} fill="rgba(52,211,153,0.06)" />
        <rect x={1160} y={FLOOR_Y - 22} width={10} height={22} rx={3} fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.12)" strokeWidth={0.5} />
        <circle cx={1165} cy={FLOOR_Y - 28} r={7} fill="rgba(167,139,250,0.06)" />

        {/* ── Rug under couch area ── */}
        <ellipse cx={ZONES.couch} cy={FLOOR_Y + 5} rx={55} ry={6} fill="rgba(99,102,241,0.04)" />

        {/* ═══ Avatars ═══ */}
        {avatars.map((avatar) => (
          <LegoAvatar
            key={avatar.id}
            x={avatar.x}
            y={FLOOR_Y}
            color={avatar.color}
            badge={avatar.badge}
            label={avatar.label}
            activity={avatar.activity}
            isWorking={avatar.isWorking}
            chattingWith={avatar.chattingWith}
          />
        ))}

        {/* Floor reflections */}
        <rect x={0} y={FLOOR_Y + 2} width={1200} height={1} fill="rgba(255,255,255,0.02)" />
      </svg>
    </div>
  );
}
