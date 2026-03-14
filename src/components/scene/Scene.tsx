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

// ── Division metadata ──
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
  /** Index of PM they're chatting with, or null */
  chattingWith: number | null;
}

/**
 * Compute world position for a given activity and PM index.
 */
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
        const midX = (my.x + their.x) / 2;
        const midY = (my.y + their.y) / 2 - 1;
        return {
          x: midX + (pmIndex < chattingWith ? -0.8 : 0.8),
          y: midY,
        };
      }
      return CHAIR_POS[pmIndex];
    }
    default:
      return CHAIR_POS[pmIndex];
  }
}

/**
 * Scene: interactive isometric 3D office (top) + Room chat (bottom).
 */
export default function Scene() {
  const [engineerWorking, setEngineerWorking] = useState<Record<string, boolean>>({});
  const [bridgeThinking, setBridgeThinking] = useState<Record<string, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);

  // Activity state for each PM
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

  // ── Poll engineer status ──
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

        const runningEngineerIds = new Set(
          engineerStatuses
            .filter(s => s.lastRun?.status === 'running')
            .map(s => s.engineer.id)
        );

        const divWorking: Record<string, boolean> = {};
        for (const div of DIVISIONS) {
          const divEngineers = orgNodes.filter(
            n => n.parentId === div.divId && n.type === 'engineer' && n.engineerId
          );
          divWorking[div.id] = divEngineers.some(
            e => e.engineerId && runningEngineerIds.has(e.engineerId)
          );
        }
        if (!cancelled) setEngineerWorking(divWorking);
      } catch { /* silent */ }
    };
    poll();
    const interval = setInterval(poll, 10_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // ── Bridge thinking callback ──
  const handleThinkingChange = useCallback((who: string, thinking: boolean) => {
    setBridgeThinking(prev => ({ ...prev, [who]: thinking }));
  }, []);

  // ── Compute working state (memoized to avoid re-render loops) ──
  const workingState = React.useMemo(() => {
    const state: Record<string, boolean> = {};
    for (const div of DIVISIONS) {
      state[div.id] = !!(engineerWorking[div.id] || bridgeThinking[div.id]);
    }
    return state;
  }, [engineerWorking, bridgeThinking]);

  // ── Activity cycling — single interval ticks through all PMs ──
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

        for (let pmIndex = 0; pmIndex < DIVISIONS.length; pmIndex++) {
          if (now < nextChangeRef.current[pmIndex]) continue;
          const pm = next[pmIndex];
          if (ws[pm.id]) continue; // don't change working PMs

          changed = true;
          const pmCopy = { ...pm };

          // Clear any existing chat partner
          if (pmCopy.chattingWith !== null) {
            const partner = { ...next[pmCopy.chattingWith] };
            if (partner.chattingWith === pmIndex) {
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
              .map((_, i) => i)
              .filter(i => i !== pmIndex && !ws[next[i].id] && next[i].activity !== 'chatting' && next[i].activity !== 'bathroom');

            if (available.length > 0) {
              const partnerIdx = available[Math.floor(Math.random() * available.length)];
              const myPos = activityPos('chatting', pmIndex, partnerIdx);
              pmCopy.activity = 'chatting';
              pmCopy.chattingWith = partnerIdx;
              pmCopy.wx = myPos.x;
              pmCopy.wy = myPos.y;

              const theirPos = activityPos('chatting', partnerIdx, pmIndex);
              const partner = { ...next[partnerIdx] };
              partner.activity = 'chatting';
              partner.chattingWith = pmIndex;
              partner.wx = theirPos.x;
              partner.wy = theirPos.y;
              next[partnerIdx] = partner;
              nextChangeRef.current[partnerIdx] = now + randomDuration(ACTIVITIES.chatting.durationRange);
            } else {
              const idlePos = activityPos('idle', pmIndex, null);
              pmCopy.activity = 'idle';
              pmCopy.wx = idlePos.x;
              pmCopy.wy = idlePos.y;
              pmCopy.chattingWith = null;
            }
          } else {
            const pos = activityPos(newActivity, pmIndex, null);
            pmCopy.activity = newActivity;
            pmCopy.wx = pos.x;
            pmCopy.wy = pos.y;
            pmCopy.chattingWith = null;
          }

          next[pmIndex] = pmCopy;
          nextChangeRef.current[pmIndex] = now + randomDuration(ACTIVITIES[newActivity].durationRange);
        }

        return changed ? next : prev;
      });
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Override activity to 'working' when engineer status demands it
  useEffect(() => {
    setAvatars(prev =>
      prev.map((pm, i) => {
        const isWorking = workingState[pm.id] ?? false;
        if (isWorking && pm.activity !== 'working') {
          const pos = CHAIR_POS[i];
          return { ...pm, activity: 'working', wx: pos.x, wy: pos.y, isWorking: true, chattingWith: null };
        }
        if (!isWorking && pm.isWorking) {
          return { ...pm, isWorking: false };
        }
        return pm;
      })
    );
  }, [workingState]);

  return (
    <div className={`scene-container ${fullscreen ? 'scene-fullscreen' : ''}`}>
      <div className="scene-upper">
        <button
          className="scene-fullscreen-btn"
          onClick={() => setFullscreen(f => !f)}
          title={fullscreen ? 'Exit fullscreen' : 'Expand scene'}
        >
          {fullscreen ? '\u2715' : '\u26F6'}
        </button>
        <SceneView avatars={avatars} workingState={workingState} />
      </div>
      {!fullscreen && (
        <div className="scene-lower">
          <Room onThinkingChange={handleThinkingChange} />
        </div>
      )}
    </div>
  );
}
