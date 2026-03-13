'use client';

import React, { useState, useMemo } from 'react';
import { SharedAIAgentsTab } from './shared/SharedAIAgentsTab';
import { workflows } from '@/data/workflows';
import type { EngineerTask } from '@/lib/engineers';

interface TickerInfo {
  ticker: string;
  name: string;
}

interface Props {
  tickers: TickerInfo[];
  engineers: EngineerTask[];
}

const categoryLabels: Record<string, string> = {
  research: 'Research Engineers',
  monitoring: 'Monitoring Engineers',
  intelligence: 'Intelligence Engineers',
  audit: 'Audit Engineers',
};

export default function PromptDatabase({ tickers, engineers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]?.ticker || 'ASTS');
  const [activeView, setActiveView] = useState<'prompts' | 'engineer-map'>('prompts');

  const selectedName = tickers.find(t => t.ticker === selectedTicker)?.name || selectedTicker;

  // Group engineers by category
  const grouped = engineers.reduce<Record<string, EngineerTask[]>>((acc, eng) => {
    if (!acc[eng.category]) acc[eng.category] = [];
    acc[eng.category].push(eng);
    return acc;
  }, {});

  // KPI stats
  const kpiStats = useMemo(() => {
    const totalWorkflows = workflows.length;
    const autonomousCount = workflows.filter(w => !w.requiresUserData && w.category !== 'audit').length;
    const dataInputCount = workflows.filter(w => w.requiresUserData && w.category !== 'audit').length;
    const auditCount = workflows.filter(w => w.category === 'audit').length;
    const tickerWorkflows = workflows.filter(w =>
      w.variants.some(v => v.ticker === selectedTicker.toLowerCase())
    ).length;
    return { totalWorkflows, autonomousCount, dataInputCount, auditCount, tickerWorkflows };
  }, [selectedTicker]);

  return (
    <div className="eng-app">
      {/* Header */}
      <div className="eng-header">
        <div className="eng-subtitle">Engineers / Prompt Database</div>
        <div className="eng-title">Prompt Database</div>
        <div className="eng-desc">
          All AI analysis prompts in one place. Select a ticker to run any workflow
          directly, or browse prompts used by each autonomous engineer.
        </div>

        {/* KPI Bar */}
        <div className="eng-kpi-bar">
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="cyan">{kpiStats.totalWorkflows}</div>
            <div className="eng-kpi-bar-label">Total Prompts</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="mint">{kpiStats.autonomousCount}</div>
            <div className="eng-kpi-bar-label">Autonomous</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="sky">{kpiStats.dataInputCount}</div>
            <div className="eng-kpi-bar-label">Data Input</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="violet">{kpiStats.auditCount}</div>
            <div className="eng-kpi-bar-label">Audits</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="gold">{kpiStats.tickerWorkflows}</div>
            <div className="eng-kpi-bar-label">{selectedTicker} Prompts</div>
          </div>
          <div className="eng-kpi-bar-cell">
            <div className="eng-kpi-bar-value" data-color="coral">{tickers.length}</div>
            <div className="eng-kpi-bar-label">Tickers</div>
          </div>
        </div>

        {/* Ticker pills */}
        <div className="eng-ticker-strip">
          <span className="eng-ticker-label">Ticker</span>
          {tickers.map(t => (
            <button
              key={t.ticker}
              className="eng-ticker-pill"
              data-active={selectedTicker === t.ticker}
              onClick={() => setSelectedTicker(t.ticker)}
            >
              {t.ticker}
            </button>
          ))}
          <span className="eng-ticker-name">
            {selectedName}
          </span>
        </div>

        {/* Tab strip */}
        <div className="eng-tab-strip">
          <button className="eng-tab" data-active={activeView === 'prompts'} onClick={() => setActiveView('prompts')}>
            All Prompts<span className="eng-tab-count">{kpiStats.tickerWorkflows}</span>
          </button>
          <button className="eng-tab" data-active={activeView === 'engineer-map'} onClick={() => setActiveView('engineer-map')}>
            Engineer Map<span className="eng-tab-count">{engineers.length}</span>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="eng-feed">
        {/* All Prompts — reuses SharedAIAgentsTab */}
        {activeView === 'prompts' && (
          <div className="stock-model-app">
            <SharedAIAgentsTab ticker={selectedTicker} />
          </div>
        )}

        {/* Engineer Map */}
        {activeView === 'engineer-map' && (
          <div>
            {Object.entries(grouped).map(([category, engs]) => (
              <div key={category}>
                <div className="eng-category-header">
                  <span className="eng-category-label" data-color={category}>
                    {categoryLabels[category] || category}
                  </span>
                  <div className="eng-category-line" />
                </div>

                {engs.map(eng => (
                  <div key={eng.id} className="eng-map-card">
                    <div className="eng-map-header">
                      <div>
                        <div className="eng-card-name-row">
                          <span className="eng-card-name">{eng.name}</span>
                          <span className="eng-card-role">{eng.role}</span>
                        </div>
                        <div className="eng-card-desc">{eng.description}</div>
                      </div>
                      <span className="eng-map-badge" data-color={eng.category}>
                        {eng.category}
                      </span>
                    </div>

                    <div className="eng-map-workflows">
                      <div className="eng-expand-label">Linked Workflows</div>
                      <div>
                        {eng.workflowIds.map(wfId => (
                          <span key={wfId} className="eng-map-workflow-tag">{wfId}</span>
                        ))}
                      </div>
                    </div>

                    <div className="eng-map-meta">
                      <span>Schedule: {eng.defaultIntervalMinutes < 60 ? `${eng.defaultIntervalMinutes}m` : `${(eng.defaultIntervalMinutes / 60).toFixed(0)}h`}</span>
                      <span>Triggers: {eng.triggerEvents.join(', ')}</span>
                      {eng.dataSource && <span>Data: {eng.dataSource}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
