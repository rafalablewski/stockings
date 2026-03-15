'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Room from '../Room';

import type { SceneCanvasHandle } from './SceneCanvas';
const SceneCanvas = dynamic(() => import('./SceneCanvas'), { ssr: false });

import { orgNodes } from '@/data/org-hierarchy';
import { authFetch } from '@/lib/auth-fetch';
import {
  type ActivityType,
  type WorldPos,
  ACTIVITIES,
  CHAIR_POS,
  ZONES,
  DEFAULT_IDLE_ACTIVITIES,
  pickRandomActivity,
  randomDuration,
} from './activities';
import { findPath } from './pathfinding';

/** How often (ms) the walk/activity tick runs */
const TICK_MS = 350;

const DIVISIONS = [
  { id: 'claude',          divId: 'div-claude',      color: '#22d3ee', badge: 'ARCH', label: 'Claude' },
  { id: 'gemini',          divId: 'div-gemini',      color: '#34d399', badge: 'R&D',  label: 'Gemini' },
  { id: 'cursor',          divId: 'div-cursor',      color: '#a78bfa', badge: 'UI',   label: 'Cursor' },
  { id: 'maszka',           divId: 'div-maszka',      color: '#f472b6', badge: 'ML',   label: 'Maszka' },
  { id: 'bobman',           divId: 'div-pm',          color: '#fb923c', badge: 'PM',   label: 'Bobman' },
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
  // Walking state
  walkPath: WorldPos[];
  pendingActivity: ActivityType | null;
  pendingChattingWith: number | null;
}

function activityPos(activity: ActivityType, pmIndex: number, chattingWith: number | null): WorldPos {
  switch (activity) {
    case 'working':
      return CHAIR_POS[pmIndex];
    case 'idle':
      return { x: CHAIR_POS[pmIndex].x, y: CHAIR_POS[pmIndex].y - 0.5 };
    case 'coffee':
      return { x: ZONES.coffee.x + pmIndex * 0.8, y: ZONES.coffee.y };
    case 'reading':
      return { x: ZONES.bookshelf.x, y: ZONES.bookshelf.y - 1 + pmIndex * 0.6 };
    case 'gaming':
      return { x: ZONES.couch.x + (pmIndex % 2 === 0 ? -1.5 : 1.5), y: ZONES.couch.y };
    case 'phone':
      return { x: CHAIR_POS[pmIndex].x + 2.5, y: CHAIR_POS[pmIndex].y - 2 };
    case 'bathroom':
      return ZONES.bathroom;
    case 'chatting': {
      if (chattingWith !== null) {
        const my = CHAIR_POS[pmIndex];
        const their = CHAIR_POS[chattingWith];
        return {
          x: (my.x + their.x) / 2 + (pmIndex < chattingWith ? -1.5 : 1.5),
          y: (my.y + their.y) / 2 - 2,
        };
      }
      return CHAIR_POS[pmIndex];
    }
    default:
      return CHAIR_POS[pmIndex];
  }
}

/** Start an avatar walking to a destination, or move immediately if adjacent */
function startWalk(
  pm: AvatarState,
  destPos: WorldPos,
  targetActivity: ActivityType,
  targetChattingWith: number | null,
): AvatarState {
  const path = findPath({ x: pm.wx, y: pm.wy }, destPos);
  if (path.length <= 1) {
    // Close enough — apply immediately
    return {
      ...pm,
      activity: targetActivity,
      wx: destPos.x,
      wy: destPos.y,
      chattingWith: targetChattingWith,
      walkPath: [],
      pendingActivity: null,
      pendingChattingWith: null,
    };
  }
  // Start walking — keep 'idle' pose until arrival
  return {
    ...pm,
    activity: 'idle',
    chattingWith: null,
    walkPath: path,
    pendingActivity: targetActivity,
    pendingChattingWith: targetChattingWith,
  };
}

export default function Scene() {
  const [engineerWorking, setEngineerWorking] = useState<Record<string, boolean>>({});
  const [bridgeThinking, setBridgeThinking] = useState<Record<string, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);
  const canvasRef = useRef<SceneCanvasHandle>(null);

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
      walkPath: [],
      pendingActivity: null,
      pendingChattingWith: null,
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

  // ── Enabled activities from DB ──
  const [enabledActivities, setEnabledActivities] = useState<ActivityType[]>(DEFAULT_IDLE_ACTIVITIES);

  useEffect(() => {
    let cancelled = false;
    const fetchActivities = async () => {
      try {
        const res = await authFetch('/api/office-activities');
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const activities: Array<{ type: string; enabled: boolean }> = data.activities || [];
        const enabled = activities
          .filter(a => a.enabled && a.type !== 'working') // working is handled separately
          .map(a => a.type as ActivityType);
        // Ensure 'idle' appears twice for higher weight
        const list: ActivityType[] = [];
        for (const t of enabled) {
          list.push(t);
          if (t === 'idle') list.push(t); // double weight for idle
        }
        if (!cancelled && list.length > 0) setEnabledActivities(list);
      } catch { /* use defaults */ }
    };
    fetchActivities();
    return () => { cancelled = true; };
  }, []);

  // Refs for tick
  const nextChangeRef = useRef<number[]>(
    DIVISIONS.map((_, i) => Date.now() + 4000 + i * 2000)
  );
  const workingStateRef = useRef(workingState);
  workingStateRef.current = workingState;
  const enabledActivitiesRef = useRef(enabledActivities);
  enabledActivitiesRef.current = enabledActivities;

  // ── Main tick: walking + activity cycling ──
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const ws = workingStateRef.current;

      setAvatars(prev => {
        let changed = false;
        const next = [...prev];

        for (let i = 0; i < DIVISIONS.length; i++) {
          const pm = next[i];

          // Working engineers stay at desk
          if (ws[pm.id]) continue;

          // ─── Walking: advance to next waypoint ───
          if (pm.walkPath.length > 0) {
            changed = true;
            const pmCopy = { ...pm };
            const waypoint = pmCopy.walkPath[0];
            pmCopy.wx = waypoint.x;
            pmCopy.wy = waypoint.y;
            pmCopy.walkPath = pmCopy.walkPath.slice(1);

            // Arrived at destination
            if (pmCopy.walkPath.length === 0 && pmCopy.pendingActivity) {
              pmCopy.activity = pmCopy.pendingActivity;
              pmCopy.chattingWith = pmCopy.pendingChattingWith;
              pmCopy.pendingActivity = null;
              pmCopy.pendingChattingWith = null;
              nextChangeRef.current[i] = now + randomDuration(ACTIVITIES[pmCopy.activity].durationRange);
            }
            next[i] = pmCopy;
            continue;
          }

          // ─── Not walking: check if time for new activity ───
          if (now < nextChangeRef.current[i]) continue;

          changed = true;
          const pmCopy = { ...pm };

          // Clean up chatting partner
          if (pmCopy.chattingWith !== null) {
            const partner = { ...next[pmCopy.chattingWith] };
            if (partner.chattingWith === i) {
              const idlePos = activityPos('idle', pmCopy.chattingWith, null);
              next[pmCopy.chattingWith] = startWalk(partner, idlePos, 'idle', null);
              nextChangeRef.current[pmCopy.chattingWith] = now + randomDuration(ACTIVITIES.idle.durationRange);
            }
          }

          const newActivity = pickRandomActivity(pmCopy.activity, enabledActivitiesRef.current);

          if (newActivity === 'chatting') {
            const available = next
              .map((_, idx) => idx)
              .filter(idx =>
                idx !== i &&
                !ws[next[idx].id] &&
                next[idx].activity !== 'chatting' &&
                next[idx].activity !== 'bathroom' &&
                next[idx].walkPath.length === 0 // don't interrupt walking avatars
              );
            if (available.length > 0) {
              const partnerIdx = available[Math.floor(Math.random() * available.length)];
              const myPos = activityPos('chatting', i, partnerIdx);
              const theirPos = activityPos('chatting', partnerIdx, i);

              next[i] = startWalk(pmCopy, myPos, 'chatting', partnerIdx);

              const partner = { ...next[partnerIdx] };
              next[partnerIdx] = startWalk(partner, theirPos, 'chatting', i);
              nextChangeRef.current[partnerIdx] = now + randomDuration(ACTIVITIES.chatting.durationRange) + 5000;
            } else {
              const idlePos = activityPos('idle', i, null);
              next[i] = startWalk(pmCopy, idlePos, 'idle', null);
              nextChangeRef.current[i] = now + randomDuration(ACTIVITIES.idle.durationRange);
            }
          } else {
            const destPos = activityPos(newActivity, i, null);
            next[i] = startWalk(pmCopy, destPos, newActivity, null);
            nextChangeRef.current[i] = now + randomDuration(ACTIVITIES[newActivity].durationRange) + 5000;
          }

          // Don't set nextChangeRef here for walking — it's set on arrival
        }

        return changed ? next : prev;
      });
    };

    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  // Override to working (instant — no walking for urgent state)
  useEffect(() => {
    setAvatars(prev =>
      prev.map((pm, i) => {
        const isWorking = workingState[pm.id] ?? false;
        if (isWorking && pm.activity !== 'working') {
          const pos = CHAIR_POS[i];
          return {
            ...pm,
            activity: 'working',
            wx: pos.x,
            wy: pos.y,
            isWorking: true,
            chattingWith: null,
            walkPath: [],
            pendingActivity: null,
            pendingChattingWith: null,
          };
        }
        if (!isWorking && pm.isWorking) return { ...pm, isWorking: false };
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

        <div className="scene-zoom-controls">
          <button
            className="scene-zoom-btn"
            onClick={() => canvasRef.current?.zoomIn()}
            title="Zoom in"
          >
            +
          </button>
          <button
            className="scene-zoom-btn"
            onClick={() => canvasRef.current?.zoomOut()}
            title="Zoom out"
          >
            &minus;
          </button>
        </div>

        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <SceneCanvas ref={canvasRef} avatars={avatars} workingState={workingState} />
        </div>
      </div>
      {!fullscreen && (
        <div className="scene-lower">
          <Room onThinkingChange={handleThinkingChange} />
        </div>
      )}
    </div>
  );
}
