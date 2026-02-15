/**
 * SharedAITab — Unified AI / Research Hub
 *
 * Wraps AI Agents, Sources, and EDGAR into a single tab with
 * sub-navigation. Ive × Tesla design language.
 */

'use client';

import React, { useState } from 'react';
import { SharedAIAgentsTab } from './SharedAIAgentsTab';
import SharedSourcesTab from './SharedSourcesTab';
import SharedEdgarTab from './SharedEdgarTab';
import type { SourceGroup, Competitor } from './SharedSourcesTab';
import type { LocalFiling } from './SharedEdgarTab';

interface SharedAITabProps {
  ticker: string;
  companyName: string;
  /** Sources tab */
  researchSources: SourceGroup[];
  competitorLabel?: string;
  competitors?: Competitor[];
  /** EDGAR tab (optional — CRCL doesn't have it) */
  localFilings?: LocalFiling[];
  cik?: string;
  typeColors?: Record<string, { bg: string; text: string }>;
  crossRefIndex?: Record<string, { source: string; data: string }[]>;
}

type SubTab = 'agents' | 'sources' | 'edgar';

export function SharedAITab({
  ticker,
  companyName,
  researchSources,
  competitorLabel,
  competitors,
  localFilings,
  cik,
  typeColors,
  crossRefIndex,
}: SharedAITabProps) {
  const hasEdgar = !!(localFilings && cik && typeColors);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('agents');

  const subTabs: { id: SubTab; label: string }[] = [
    { id: 'agents', label: 'AI Agents' },
    { id: 'sources', label: 'Sources' },
    ...(hasEdgar ? [{ id: 'edgar' as SubTab, label: 'EDGAR' }] : []),
  ];

  return (
    <div>
      {/* ── Sub-navigation ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        {subTabs.map((t) => {
          const active = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              style={{
                fontSize: 9,
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '5px 14px',
                borderRadius: 4,
                border: active
                  ? '1px solid rgba(130,200,130,0.5)'
                  : '1px solid rgba(255,255,255,0.10)',
                background: active
                  ? 'rgba(130,200,130,0.12)'
                  : 'rgba(255,255,255,0.04)',
                color: active
                  ? 'rgba(130,200,130,0.95)'
                  : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      {activeSubTab === 'agents' && <SharedAIAgentsTab ticker={ticker} />}

      {activeSubTab === 'sources' && (
        <SharedSourcesTab
          ticker={ticker}
          companyName={companyName}
          researchSources={researchSources}
          competitorLabel={competitorLabel}
          competitors={competitors}
        />
      )}

      {activeSubTab === 'edgar' && hasEdgar && (
        <SharedEdgarTab
          ticker={ticker}
          companyName={companyName}
          localFilings={localFilings!}
          cik={cik!}
          typeColors={typeColors!}
          crossRefIndex={crossRefIndex}
        />
      )}
    </div>
  );
}

export default SharedAITab;
