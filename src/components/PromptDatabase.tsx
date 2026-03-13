'use client';

import React, { useState } from 'react';
import { SharedAIAgentsTab } from './shared/SharedAIAgentsTab';
import type { EngineerTask } from '@/lib/engineers';

interface TickerInfo {
  ticker: string;
  name: string;
}

interface Props {
  tickers: TickerInfo[];
  engineers: EngineerTask[];
}

export default function PromptDatabase({ tickers, engineers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]?.ticker || 'ASTS');
  const [activeView, setActiveView] = useState<'prompts' | 'engineer-map'>('prompts');

  const selectedName = tickers.find(t => t.ticker === selectedTicker)?.name || selectedTicker;

  return (
    <div>
      {/* Ticker selector */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">Ticker</span>
        <div className="flex gap-2">
          {tickers.map(t => (
            <button
              key={t.ticker}
              onClick={() => setSelectedTicker(t.ticker)}
              className={`px-4 py-1.5 text-[12px] font-mono font-medium rounded-lg transition-all ${
                selectedTicker === t.ticker
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/10'
              }`}
            >
              {t.ticker}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-white/20 ml-2">{selectedName}</span>
      </div>

      {/* View tabs */}
      <div className="flex gap-6 mb-8 border-b border-white/[0.06] pb-3">
        <button
          onClick={() => setActiveView('prompts')}
          className={`text-[12px] uppercase tracking-[0.2em] pb-1 transition-colors ${
            activeView === 'prompts'
              ? 'text-white border-b border-white/40'
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          All Prompts
        </button>
        <button
          onClick={() => setActiveView('engineer-map')}
          className={`text-[12px] uppercase tracking-[0.2em] pb-1 transition-colors ${
            activeView === 'engineer-map'
              ? 'text-white border-b border-white/40'
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          Engineer Map
        </button>
      </div>

      {/* All Prompts — reuses the existing SharedAIAgentsTab component */}
      {activeView === 'prompts' && (
        <div className="stock-model-app">
          <SharedAIAgentsTab ticker={selectedTicker} />
        </div>
      )}

      {/* Engineer Map — shows which engineers use which prompts */}
      {activeView === 'engineer-map' && (
        <div className="space-y-4">
          {engineers.map(eng => (
            <div
              key={eng.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[14px] font-medium text-white/90">{eng.name}</span>
                    <span className="text-[10px] font-mono text-white/25 uppercase">{eng.role}</span>
                  </div>
                  <p className="text-[12px] text-white/35 leading-relaxed max-w-2xl">{eng.description}</p>
                </div>
                <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border flex-shrink-0 ${
                  eng.category === 'research' ? 'text-emerald-400/70 border-emerald-400/20 bg-emerald-400/5' :
                  eng.category === 'monitoring' ? 'text-blue-400/70 border-blue-400/20 bg-blue-400/5' :
                  eng.category === 'intelligence' ? 'text-amber-400/70 border-amber-400/20 bg-amber-400/5' :
                  'text-violet-400/70 border-violet-400/20 bg-violet-400/5'
                }`}>
                  {eng.category}
                </span>
              </div>

              {/* Linked workflows */}
              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-2">
                  Linked Workflows
                </span>
                <div className="flex flex-wrap gap-2">
                  {eng.workflowIds.map(wfId => (
                    <span
                      key={wfId}
                      className="text-[11px] font-mono text-white/40 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]"
                    >
                      {wfId}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trigger info */}
              <div className="flex items-center gap-6 mt-3 text-[10px] text-white/20">
                <span>Schedule: every {eng.defaultIntervalMinutes < 60 ? `${eng.defaultIntervalMinutes}m` : `${(eng.defaultIntervalMinutes / 60).toFixed(0)}h`}</span>
                <span>Triggers: {eng.triggerEvents.join(', ')}</span>
                {eng.dataSource && <span>Data: {eng.dataSource}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
