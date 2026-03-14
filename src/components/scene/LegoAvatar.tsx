'use client';

import React from 'react';
import { type ActivityType, ACTIVITIES } from './activities';
import { toIso } from './iso';

export interface LegoAvatarProps {
  wx: number;
  wy: number;
  color: string;
  badge: string;
  label: string;
  activity: ActivityType;
  isWorking: boolean;
  chattingWith: number | null;
}

/**
 * LEGO-style avatar positioned in isometric world space.
 * Rendered as a 2D sprite at the correct isometric screen position,
 * with a floor shadow for depth perception.
 */
export default function LegoAvatar({
  wx,
  wy,
  color,
  badge,
  label,
  activity,
  isWorking,
}: LegoAvatarProps) {
  const actDef = ACTIVITIES[activity];
  const seated = actDef.seated;
  const hidden = activity === 'bathroom';

  // Convert world position to screen position (avatar stands at z=0)
  const screenPos = toIso(wx, wy, 0);
  // Scale down slightly for isometric perspective feel
  const scale = 0.7;

  const headColor = `${color}cc`;

  return (
    <g
      className="scene-avatar"
      style={{
        transform: `translate(${screenPos.x}px, ${screenPos.y}px)`,
        opacity: hidden ? 0.3 : 1,
      }}
    >
      {/* Floor shadow (ellipse on ground plane) */}
      <ellipse
        cx={0} cy={2}
        rx={10 * scale} ry={5 * scale}
        fill="rgba(0,0,0,0.25)"
        className="scene-avatar-shadow"
      />

      {/* Avatar body group — scaled for isometric */}
      <g transform={`scale(${scale})`}>
        {/* Head */}
        <rect
          x={-9} y={seated ? -56 : -62} width={18} height={18} rx={4}
          fill={headColor} stroke={color} strokeWidth={1}
        />
        {/* Eyes */}
        <circle cx={-3} cy={seated ? -48 : -54} r={1.5} fill="#0a0a0a" />
        <circle cx={5} cy={seated ? -48 : -54} r={1.5} fill="#0a0a0a" />
        {/* Mouth */}
        {(activity === 'chatting' || activity === 'gaming') ? (
          <path d={`M-3,${seated ? -42 : -48} Q1,${seated ? -39 : -45} 5,${seated ? -42 : -48}`}
            fill="none" stroke="#0a0a0a" strokeWidth={1} />
        ) : (
          <line x1={-2} y1={seated ? -42 : -48} x2={4} y2={seated ? -42 : -48}
            stroke="#0a0a0a" strokeWidth={0.8} opacity={0.5} />
        )}

        {/* Body */}
        <rect
          x={-12} y={seated ? -37 : -43} width={24} height={28} rx={3}
          fill={color} opacity={0.9}
        />
        {/* Badge text */}
        <text
          x={0} y={seated ? -19 : -25}
          textAnchor="middle" fill="#0a0a0a"
          fontSize={8} fontFamily="'Space Mono', monospace" fontWeight={700}
        >
          {badge}
        </text>

        {/* Left arm */}
        <g style={{
          transformOrigin: `${-12}px ${seated ? -34 : -40}px`,
          transform: `rotate(${actDef.leftArm}deg)`,
          transition: 'transform 0.5s ease-in-out',
        }}>
          <rect x={-18} y={seated ? -34 : -40} width={6} height={22} rx={3} fill={color} opacity={0.75} />
        </g>

        {/* Right arm */}
        <g style={{
          transformOrigin: `${12}px ${seated ? -34 : -40}px`,
          transform: `rotate(${actDef.rightArm}deg)`,
          transition: 'transform 0.5s ease-in-out',
        }}>
          <rect x={12} y={seated ? -34 : -40} width={6} height={22} rx={3} fill={color} opacity={0.75} />
        </g>

        {/* Legs */}
        <rect x={-9} y={-15} width={8} height={seated ? 10 : 15} rx={2} fill={`${color}88`} />
        <rect x={1}  y={-15} width={8} height={seated ? 10 : 15} rx={2} fill={`${color}88`} />

        {/* ── Props ── */}
        {actDef.prop === 'coffee-cup' && (
          <g className="scene-prop-bob">
            <rect x={-26} y={-52} width={8} height={10} rx={2} fill="#8B6914" opacity={0.8} />
            <rect x={-26} y={-54} width={8} height={3} rx={1} fill="#d4a832" opacity={0.6} />
            <path d="M-24,-56 Q-22,-60 -24,-64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} className="scene-steam" />
            <path d="M-20,-56 Q-18,-61 -20,-65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} className="scene-steam scene-steam-delay" />
          </g>
        )}

        {actDef.prop === 'book' && (
          <g>
            <rect x={-10} y={-52} width={20} height={14} rx={2} fill="#6366f1" opacity={0.7} />
            <line x1={0} y1={-52} x2={0} y2={-38} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
            <rect x={-8} y={-50} width={7} height={10} rx={1} fill="rgba(255,255,255,0.08)" />
          </g>
        )}

        {actDef.prop === 'controller' && (
          <g className="scene-controller-tilt">
            <rect x={-10} y={-36} width={20} height={8} rx={4} fill="#333" stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
            <circle cx={-5} cy={-32} r={1.5} fill={color} opacity={0.5} />
            <circle cx={5} cy={-32} r={1.5} fill={color} opacity={0.5} />
          </g>
        )}

        {actDef.prop === 'phone' && (
          <g>
            <rect x={10} y={-64} width={6} height={12} rx={2} fill="#444" stroke="rgba(255,255,255,0.2)" strokeWidth={0.5} />
            <path d="M20,-60 Q24,-58 20,-56" fill="none" stroke={`${color}40`} strokeWidth={0.8} className="scene-signal" />
            <path d="M23,-62 Q28,-58 23,-54" fill="none" stroke={`${color}25`} strokeWidth={0.8} className="scene-signal scene-signal-delay" />
          </g>
        )}

        {/* Speech bubble when chatting */}
        {actDef.bubble && (
          <g className="scene-bubble-pop">
            <rect x={-16} y={-84} width={32} height={14} rx={7} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
            <polygon points="-2,-70 2,-70 0,-66" fill="rgba(255,255,255,0.08)" />
            <circle cx={-6} cy={-77} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-1" />
            <circle cx={0}  cy={-77} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-2" />
            <circle cx={6}  cy={-77} r={1.5} fill="rgba(255,255,255,0.3)" className="scene-chat-dot scene-dot-3" />
          </g>
        )}
      </g>

      {/* Name label (outside scale group so it's always readable) */}
      <text
        x={0} y={hidden ? 5 : 12}
        textAnchor="middle" fill="rgba(255,255,255,0.6)"
        fontSize={8} fontFamily="'Outfit', sans-serif" fontWeight={500}
      >
        {label}
      </text>

      {/* Working status pulse */}
      {isWorking && (
        <circle cx={0} cy={-48 * scale} r={3} fill={color} className="scene-status-pulse" />
      )}
    </g>
  );
}
