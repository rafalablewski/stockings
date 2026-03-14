'use client';

import React from 'react';

export interface LegoAvatarProps {
  x: number;
  y: number;
  color: string;
  badge: string;
  label: string;
  isWorking: boolean;
}

/**
 * LEGO-style avatar built from SVG primitives.
 * - Idle: stands next to desk, arms at sides
 * - Working: seated at desk, arms forward (typing)
 */
export default function LegoAvatar({ x, y, color, badge, label, isWorking }: LegoAvatarProps) {
  // Idle: offset left of desk center. Working: centered at desk.
  const avatarX = isWorking ? x : x - 28;
  // Working: lower (seated). Idle: standing.
  const avatarY = isWorking ? y + 6 : y;

  // Lighten color for head
  const headColor = `${color}cc`;

  return (
    <g
      className="scene-avatar"
      style={{
        transform: `translate(${avatarX}px, ${avatarY}px)`,
        transition: 'transform 0.6s ease-in-out',
      }}
    >
      {/* Head */}
      <rect
        x={-9}
        y={-62}
        width={18}
        height={18}
        rx={4}
        fill={headColor}
        stroke={color}
        strokeWidth={1}
      />
      {/* Eyes */}
      <circle cx={-3} cy={-54} r={1.5} fill="#0a0a0a" />
      <circle cx={5} cy={-54} r={1.5} fill="#0a0a0a" />

      {/* Body */}
      <rect
        x={-12}
        y={-43}
        width={24}
        height={28}
        rx={3}
        fill={color}
        opacity={0.9}
      />
      {/* Badge text on body */}
      <text
        x={0}
        y={-25}
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize={8}
        fontFamily="'Space Mono', monospace"
        fontWeight={700}
      >
        {badge}
      </text>

      {/* Left arm */}
      <g
        style={{
          transformOrigin: '-12px -40px',
          transform: isWorking ? 'rotate(-50deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <rect
          x={-18}
          y={-40}
          width={6}
          height={22}
          rx={3}
          fill={color}
          opacity={0.75}
        />
      </g>

      {/* Right arm */}
      <g
        style={{
          transformOrigin: '12px -40px',
          transform: isWorking ? 'rotate(50deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <rect
          x={12}
          y={-40}
          width={6}
          height={22}
          rx={3}
          fill={color}
          opacity={0.75}
        />
      </g>

      {/* Left leg */}
      <rect
        x={-9}
        y={-15}
        width={8}
        height={15}
        rx={2}
        fill={`${color}88`}
      />
      {/* Right leg */}
      <rect
        x={1}
        y={-15}
        width={8}
        height={15}
        rx={2}
        fill={`${color}88`}
      />

      {/* Name label */}
      <text
        x={0}
        y={12}
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontSize={10}
        fontFamily="'Outfit', sans-serif"
        fontWeight={500}
      >
        {label}
      </text>

      {/* Status indicator dot */}
      {isWorking && (
        <circle
          cx={0}
          cy={-70}
          r={3}
          fill={color}
          className="scene-status-pulse"
        />
      )}
    </g>
  );
}
