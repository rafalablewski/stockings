'use client';

import React, { useMemo } from 'react';
import IsoDeskUnit from './DeskUnit';
import LegoAvatar from './LegoAvatar';
import { DESK_POS } from './activities';
import {
  toIso, isoPoints, computeViewBox,
  wallOpacity, isoDepth,
  ROOM_W, ROOM_D, WALL_H,
} from './iso';
import type { AvatarState } from './Scene';

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

  const sortedAvatars = useMemo(() =>
    [...avatars].sort((a, b) => isoDepth(a.wx, a.wy, rot) - isoDepth(b.wx, b.wy, rot)),
    [avatars, rot]
  );

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

        {/* ═══ WALLS ═══ */}
        {/* Back wall (y=ROOM_D) */}
        <g className="scene-wall" style={{ opacity: wo.back }}>
          <polygon points={isoPoints([p(0, ROOM_D, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(0, ROOM_D, WALL_H)])}
            fill="#0e0e14" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        </g>
        {/* Front wall (y=0) */}
        <g className="scene-wall" style={{ opacity: wo.front }}>
          <polygon points={isoPoints([p(0, 0, 0), p(ROOM_W, 0, 0), p(ROOM_W, 0, WALL_H), p(0, 0, WALL_H)])}
            fill="#0e0e14" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        </g>
        {/* Left wall (x=0) */}
        <g className="scene-wall" style={{ opacity: wo.left }}>
          <polygon points={isoPoints([p(0, 0, 0), p(0, ROOM_D, 0), p(0, ROOM_D, WALL_H), p(0, 0, WALL_H)])}
            fill="#111118" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        </g>
        {/* Right wall (x=ROOM_W) */}
        <g className="scene-wall" style={{ opacity: wo.right }}>
          <polygon points={isoPoints([p(ROOM_W, 0, 0), p(ROOM_W, ROOM_D, 0), p(ROOM_W, ROOM_D, WALL_H), p(ROOM_W, 0, WALL_H)])}
            fill="#111118" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        </g>

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
