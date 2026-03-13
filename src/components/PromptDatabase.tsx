'use client';

import React, { useMemo, useState } from 'react';
import { SharedAIAgentsTab } from './shared/SharedAIAgentsTab';
import { workflows } from '@/data/workflows';

interface TickerInfo {
  ticker: string;
  name: string;
}

interface Props {
  tickers: TickerInfo[];
}

export default function PromptDatabase({ tickers }: Props) {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]?.ticker || 'ASTS');

  const selectedName = tickers.find(t => t.ticker === selectedTicker)?.name || selectedTicker;

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
          All AI analysis prompts in one place. Select a ticker to run any workflow directly.
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
      </div>

      {/* Feed */}
      <div className="eng-feed">
        <div className="stock-model-app">
          <SharedAIAgentsTab ticker={selectedTicker} />
        </div>
      </div>
    </div>
  );
}
