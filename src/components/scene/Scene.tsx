'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SceneView from './SceneView';
import Room from '../Room';
import { orgNodes } from '@/data/org-hierarchy';
import { authFetch } from '@/lib/auth-fetch';
import {
  type ActivityType,
  ACTIVITIES,
  DESK_X,
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
  x: number;
  isWorking: boolean;
  /** Index of PM they're chatting with, or null */
  chattingWith: number | null;
}

/**
 * Compute the X position for a given activity and PM index.
 */
function activityX(activity: ActivityType, pmIndex: number, chattingWith: number | null): number {
  switch (activity) {
    case 'working':
    case 'idle':
      return DESK_X[pmIndex];
    case 'coffee':
      return ZONES.coffee + pmIndex * 8; // slight offset so they don't overlap
    case 'reading':
    case 'gaming':
      return ZONES.couch + (pmIndex % 2 === 0 ? -15 : 15);
    case 'phone':
      return DESK_X[pmIndex] + 35; // near their desk but offset
    case 'bathroom':
      return ZONES.bathroom;
    case 'chatting': {
      // Meet halfway between the two PMs' desks
      if (chattingWith !== null) {
        const myDesk = DESK_X[pmIndex];
        const theirDesk = DESK_X[chattingWith];
        const midpoint = (myDesk + theirDesk) / 2;
        return midpoint + (pmIndex < chattingWith ? -18 : 18);
      }
      return DESK_X[pmIndex];
    }
    default:
      return DESK_X[pmIndex];
  }
}

/**
 * Scene: interactive LEGO avatar view (top) + Room chat (bottom).
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
      x: DESK_X[i],
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
    DIVISIONS.map((_, i) => Date.now() + 3000 + i * 1500)
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
              partner.activity = 'idle';
              partner.x = DESK_X[pmCopy.chattingWith];
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
              pmCopy.activity = 'chatting';
              pmCopy.chattingWith = partnerIdx;
              pmCopy.x = activityX('chatting', pmIndex, partnerIdx);

              const partner = { ...next[partnerIdx] };
              partner.activity = 'chatting';
              partner.chattingWith = pmIndex;
              partner.x = activityX('chatting', partnerIdx, pmIndex);
              next[partnerIdx] = partner;
              nextChangeRef.current[partnerIdx] = now + randomDuration(ACTIVITIES.chatting.durationRange);
            } else {
              pmCopy.activity = 'idle';
              pmCopy.x = activityX('idle', pmIndex, null);
              pmCopy.chattingWith = null;
            }
          } else {
            pmCopy.activity = newActivity;
            pmCopy.x = activityX(newActivity, pmIndex, null);
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
          return { ...pm, activity: 'working', x: DESK_X[i], isWorking: true, chattingWith: null };
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
