'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SceneView from './SceneView';
import Room from '../Room';
import { orgNodes } from '@/data/org-hierarchy';
import { authFetch } from '@/lib/auth-fetch';
import {
  type ActivityType,
  type WorldPos,
  ACTIVITIES,
  CHAIR_POS,
  ZONES,
  pickRandomActivity,
  randomDuration,
} from './activities';

const DIVISIONS = [
  { id: 'claude',          divId: 'div-claude',      color: '#22d3ee', badge: 'ARCH', label: 'Claude' },
  { id: 'gemini',          divId: 'div-gemini',      color: '#34d399', badge: 'R&D',  label: 'Gemini' },
  { id: 'cursor',          divId: 'div-cursor',      color: '#a78bfa', badge: 'UI',   label: 'Cursor' },
  { id: 'ai-engineer',     divId: 'div-ai-engineer', color: '#f472b6', badge: 'ML',   label: 'AI Eng' },
  { id: 'project-manager', divId: 'div-pm',          color: '#fb923c', badge: 'PM',   label: 'PM' },
] as const;

export interface AvatarState {
  id: string;
  color: string;
  badge: string;
  label: string;
  activity: ActivityType;
  wx: number;
  wy: number;
  isWorking: boolean;
  chattingWith: number | null;
}

function activityPos(activity: ActivityType, pmIndex: number, chattingWith: number | null): WorldPos {
  switch (activity) {
    case 'working':
      return CHAIR_POS[pmIndex];
    case 'idle':
      return { x: CHAIR_POS[pmIndex].x, y: CHAIR_POS[pmIndex].y - 0.5 };
    case 'coffee':
      return { x: ZONES.coffee.x + pmIndex * 0.4, y: ZONES.coffee.y };
    case 'reading':
      return { x: ZONES.bookshelf.x, y: ZONES.bookshelf.y - 0.5 + pmIndex * 0.3 };
    case 'gaming':
      return { x: ZONES.couch.x + (pmIndex % 2 === 0 ? -0.8 : 0.8), y: ZONES.couch.y };
    case 'phone':
      return { x: CHAIR_POS[pmIndex].x + 1.5, y: CHAIR_POS[pmIndex].y - 1 };
    case 'bathroom':
      return ZONES.bathroom;
    case 'chatting': {
      if (chattingWith !== null) {
        const my = CHAIR_POS[pmIndex];
        const their = CHAIR_POS[chattingWith];
        return {
          x: (my.x + their.x) / 2 + (pmIndex < chattingWith ? -0.8 : 0.8),
          y: (my.y + their.y) / 2 - 1,
        };
      }
      return CHAIR_POS[pmIndex];
    }
    default:
      return CHAIR_POS[pmIndex];
  }
}

export default function Scene() {
  const [engineerWorking, setEngineerWorking] = useState<Record<string, boolean>>({});
  const [bridgeThinking, setBridgeThinking] = useState<Record<string, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Drag-to-rotate state
  const dragRef = useRef<{ startX: number; startRot: number } | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.scene-controls')) return;
    dragRef.current = { startX: e.clientX, startRot: rotation };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const newRot = dragRef.current.startRot + dx * 0.4;
    setRotation(((newRot % 360) + 360) % 360);
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const rotateBy = useCallback((deg: number) => {
    setRotation(prev => ((prev + deg) % 360 + 360) % 360);
  }, []);

  // Activity state
  const [avatars, setAvatars] = useState<AvatarState[]>(() =>
    DIVISIONS.map((div, i) => ({
      id: div.id,
      color: div.color,
      badge: div.badge,
      label: div.label,
      activity: 'idle' as ActivityType,
      wx: CHAIR_POS[i].x,
      wy: CHAIR_POS[i].y,
      isWorking: false,
      chattingWith: null,
    }))
  );

  // Poll engineer status
  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      try {
        const res = await authFetch('/api/engineers/status');
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const engineerStatuses: Array<{
          engineer: { id: string };
          lastRun: { status: string } | null;
        }> = data.engineers || [];
        const runningIds = new Set(
          engineerStatuses.filter(s => s.lastRun?.status === 'running').map(s => s.engineer.id)
        );
        const divWorking: Record<string, boolean> = {};
        for (const div of DIVISIONS) {
          const divEngineers = orgNodes.filter(
            n => n.parentId === div.divId && n.type === 'engineer' && n.engineerId
          );
          divWorking[div.id] = divEngineers.some(e => e.engineerId && runningIds.has(e.engineerId));
        }
        if (!cancelled) setEngineerWorking(divWorking);
      } catch { /* silent */ }
    };
    poll();
    const interval = setInterval(poll, 10_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const handleThinkingChange = useCallback((who: string, thinking: boolean) => {
    setBridgeThinking(prev => ({ ...prev, [who]: thinking }));
  }, []);

  const workingState = React.useMemo(() => {
    const state: Record<string, boolean> = {};
    for (const div of DIVISIONS) {
      state[div.id] = !!(engineerWorking[div.id] || bridgeThinking[div.id]);
    }
    return state;
  }, [engineerWorking, bridgeThinking]);

  // Activity cycling
  const nextChangeRef = useRef<number[]>(
    DIVISIONS.map((_, i) => Date.now() + 4000 + i * 2000)
  );
  const workingStateRef = useRef(workingState);
  workingStateRef.current = workingState;

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const ws = workingStateRef.current;
      setAvatars(prev => {
        let changed = false;
        const next = [...prev];
        for (let i = 0; i < DIVISIONS.length; i++) {
          if (now < nextChangeRef.current[i]) continue;
          const pm = next[i];
          if (ws[pm.id]) continue;
          changed = true;
          const pmCopy = { ...pm };
          if (pmCopy.chattingWith !== null) {
            const partner = { ...next[pmCopy.chattingWith] };
            if (partner.chattingWith === i) {
              const idlePos = activityPos('idle', pmCopy.chattingWith, null);
              partner.activity = 'idle';
              partner.wx = idlePos.x;
              partner.wy = idlePos.y;
              partner.chattingWith = null;
              next[pmCopy.chattingWith] = partner;
            }
          }
          const newActivity = pickRandomActivity(pmCopy.activity);
          if (newActivity === 'chatting') {
            const available = next
              .map((_, idx) => idx)
              .filter(idx => idx !== i && !ws[next[idx].id] && next[idx].activity !== 'chatting' && next[idx].activity !== 'bathroom');
            if (available.length > 0) {
              const partnerIdx = available[Math.floor(Math.random() * available.length)];
              const myPos = activityPos('chatting', i, partnerIdx);
              pmCopy.activity = 'chatting';
              pmCopy.chattingWith = partnerIdx;
              pmCopy.wx = myPos.x;
              pmCopy.wy = myPos.y;
              const theirPos = activityPos('chatting', partnerIdx, i);
              const partner = { ...next[partnerIdx] };
              partner.activity = 'chatting';
              partner.chattingWith = i;
              partner.wx = theirPos.x;
              partner.wy = theirPos.y;
              next[partnerIdx] = partner;
              nextChangeRef.current[partnerIdx] = now + randomDuration(ACTIVITIES.chatting.durationRange);
            } else {
              const idlePos = activityPos('idle', i, null);
              pmCopy.activity = 'idle';
              pmCopy.wx = idlePos.x;
              pmCopy.wy = idlePos.y;
              pmCopy.chattingWith = null;
            }
          } else {
            const pos = activityPos(newActivity, i, null);
            pmCopy.activity = newActivity;
            pmCopy.wx = pos.x;
            pmCopy.wy = pos.y;
            pmCopy.chattingWith = null;
          }
          next[i] = pmCopy;
          nextChangeRef.current[i] = now + randomDuration(ACTIVITIES[newActivity].durationRange);
        }
        return changed ? next : prev;
      });
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Override to working
  useEffect(() => {
    setAvatars(prev =>
      prev.map((pm, i) => {
        const isWorking = workingState[pm.id] ?? false;
        if (isWorking && pm.activity !== 'working') {
          const pos = CHAIR_POS[i];
          return { ...pm, activity: 'working', wx: pos.x, wy: pos.y, isWorking: true, chattingWith: null };
        }
        if (!isWorking && pm.isWorking) return { ...pm, isWorking: false };
        return pm;
      })
    );
  }, [workingState]);

  return (
    <div className={`scene-container ${fullscreen ? 'scene-fullscreen' : ''}`}>
      <div
        className="scene-upper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: dragRef.current ? 'grabbing' : 'grab' }}
      >
        {/* Controls overlay */}
        <div className="scene-controls">
          <button
            className="scene-ctrl-btn"
            onClick={() => rotateBy(-90)}
            title="Rotate left"
          >
            {'\u21B6'}
          </button>
          <button
            className="scene-ctrl-btn"
            onClick={() => rotateBy(90)}
            title="Rotate right"
          >
            {'\u21B7'}
          </button>
          <button
            className="scene-ctrl-btn"
            onClick={() => setRotation(0)}
            title="Reset view"
          >
            {'\u2302'}
          </button>
          <button
            className="scene-fullscreen-btn"
            onClick={() => setFullscreen(f => !f)}
            title={fullscreen ? 'Exit fullscreen' : 'Expand scene'}
          >
            {fullscreen ? '\u2715' : '\u26F6'}
          </button>
        </div>

        <SceneView avatars={avatars} workingState={workingState} rotation={rotation} />
      </div>
      {!fullscreen && (
        <div className="scene-lower">
          <Room onThinkingChange={handleThinkingChange} />
        </div>
      )}
    </div>
  );
}
