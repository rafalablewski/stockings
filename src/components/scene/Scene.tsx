'use client';

import React, { useState, useEffect, useCallback } from 'react';
import SceneView from './SceneView';
import Room from '../Room';
import { orgNodes } from '@/data/org-hierarchy';
import { authFetch } from '@/lib/auth-fetch';

// Map division org-node IDs → sender keys used by Room
const DIV_TO_SENDER: Record<string, string> = {
  'div-claude': 'claude',
  'div-cursor': 'cursor',
  'div-gemini': 'gemini',
  'div-ai-engineer': 'ai-engineer',
  'div-pm': 'project-manager',
};

/**
 * Scene: interactive LEGO avatar view (top) + Room chat (bottom).
 * Polls engineer status to detect which division leads are "working".
 */
export default function Scene() {
  const [engineerWorking, setEngineerWorking] = useState<Record<string, boolean>>({});
  const [bridgeThinking, setBridgeThinking] = useState<Record<string, boolean>>({});

  // Poll engineer status to detect running engineers
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

        // Find which engineers are currently running
        const runningEngineerIds = new Set(
          engineerStatuses
            .filter(s => s.lastRun?.status === 'running')
            .map(s => s.engineer.id)
        );

        // Map running engineers → divisions
        const divWorking: Record<string, boolean> = {};
        for (const [divId, senderKey] of Object.entries(DIV_TO_SENDER)) {
          const divEngineers = orgNodes.filter(
            n => n.parentId === divId && n.type === 'engineer' && n.engineerId
          );
          divWorking[senderKey] = divEngineers.some(
            e => e.engineerId && runningEngineerIds.has(e.engineerId)
          );
        }

        if (!cancelled) setEngineerWorking(divWorking);
      } catch {
        // silent — polling failure is non-critical
      }
    };

    poll();
    const interval = setInterval(poll, 10_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Callback from Room when an AI bridge starts/stops thinking
  const handleThinkingChange = useCallback((who: string, thinking: boolean) => {
    setBridgeThinking(prev => ({ ...prev, [who]: thinking }));
  }, []);

  // Merge engineer working state + bridge thinking state
  const workingState: Record<string, boolean> = {};
  for (const key of ['claude', 'gemini', 'cursor', 'ai-engineer', 'project-manager']) {
    workingState[key] = !!(engineerWorking[key] || bridgeThinking[key]);
  }

  return (
    <div className="scene-container">
      <div className="scene-upper">
        <SceneView workingState={workingState} />
      </div>
      <div className="scene-lower">
        <Room onThinkingChange={handleThinkingChange} />
      </div>
    </div>
  );
}
