/**
 * Dashboard — Per-stock intelligence feed
 *
 * Renders SharedSourcesTab + SharedEdgarTab for each stock in collapsible
 * sections. All fetch, dismiss, DB persistence, and badge logic is handled
 * by the shared components — no custom reimplementation needed.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { stockList, stocks } from '@/lib/stocks';
import { getStockDashboardData } from '@/lib/stock-dashboard-data';
import SharedSourcesTab from '@/components/shared/SharedSourcesTab';
import SharedEdgarTab from '@/components/shared/SharedEdgarTab';
import '../stocks/stock-model-styles.css';
import './dashboard.css';

// ── Constants ────────────────────────────────────────────────────────────────

const ACCENT_CYCLE = ['cyan', 'violet', 'mint', 'sky', 'gold', 'coral'];

function getStockAccent(ticker: string, index: number): { color: string; dim: string } {
  const accentName = stocks[ticker]?.accent || ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  return { color: `var(--${accentName})`, dim: `var(--${accentName}-dim)` };
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTickers, setActiveTickers] = useState<Set<string>>(
    () => new Set(stockList.map(s => s.ticker))
  );
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(stockList.map(s => s.ticker))
  );

  const toggleTicker = useCallback((ticker: string) => {
    setActiveTickers(prev => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        if (next.size <= 1) return prev;
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((ticker: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(ticker)) next.delete(ticker);
      else next.add(ticker);
      return next;
    });
  }, []);

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', background: 'var(--bg)' }}>
      {/* Toolbar */}
      <div className="db-toolbar">
        <div className="db-toolbar-left">
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const,
            color: 'var(--text3)',
          }}>
            Intel Feed
          </span>
        </div>

        <div className="db-toolbar-center">
          {/* Ticker toggles */}
          {stockList.map((s, idx) => {
            const a = getStockAccent(s.ticker, idx);
            return (
              <button
                key={s.ticker}
                className="db-ticker-pill"
                data-active={activeTickers.has(s.ticker)}
                style={{ '--pill-color': a.color, '--pill-dim': a.dim } as React.CSSProperties}
                onClick={() => toggleTicker(s.ticker)}
              >
                {s.ticker}
              </button>
            );
          })}
        </div>

        <div className="db-toolbar-right" />
      </div>

      {/* Per-stock sections */}
      <div className="db-sections">
        {stockList.filter(s => activeTickers.has(s.ticker)).map((s, idx) => {
          const data = getStockDashboardData(s.ticker);
          const accent = getStockAccent(s.ticker, idx);
          const isExpanded = expanded.has(s.ticker);

          return (
            <div key={s.ticker} className="db-stock-section">
              <button
                className="db-stock-header"
                onClick={() => toggleExpanded(s.ticker)}
              >
                <div className="db-stock-header-left">
                  <span
                    className="db-stock-header-dot"
                    style={{ background: accent.color }}
                  />
                  <span className="db-stock-header-ticker" style={{ color: accent.color }}>
                    {s.ticker}
                  </span>
                  <span className="db-stock-header-name">
                    {s.name}
                  </span>
                </div>
                <svg
                  className="db-stock-header-chevron"
                  data-expanded={isExpanded}
                  width="12" height="12" viewBox="0 0 12 12"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </button>

              {isExpanded && (
                <div className="db-stock-content">
                  <SharedSourcesTab
                    ticker={s.ticker}
                    companyName={s.name}
                    researchSources={data.researchSources}
                    competitorLabel={data.competitorLabel}
                    competitors={data.competitors}
                  />
                  {s.cik && (
                    <SharedEdgarTab
                      ticker={s.ticker}
                      companyName={s.name}
                      localFilings={data.localFilings}
                      cik={s.cik}
                      typeColors={data.typeColors}
                      crossRefIndex={data.crossRefIndex}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
