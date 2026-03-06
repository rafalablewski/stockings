/**
 * Dashboard — Per-stock intelligence feed
 *
 * Renders SharedSourcesTab + SharedEdgarTab per stock in collapsible sections.
 * Reuses the same components as individual stock pages — zero redundant code.
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
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

// ── Main component ─────────────────────────────────────────────────────────
export default function Dashboard() {
  // Which stocks are active (visible)
  const [activeTickers, setActiveTickers] = useState<Set<string>>(
    () => new Set(stockList.map(s => s.ticker)),
  );
  // Which stock sections are expanded
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(stockList.map(s => s.ticker)),
  );
  // Sub-tab per stock: 'sources' or 'edgar'
  const [subTab, setSubTab] = useState<Record<string, 'sources' | 'edgar'>>({});

  const toggleTicker = useCallback((ticker: string) => {
    setActiveTickers(prev => {
      const next = new Set(prev);
      if (next.has(ticker)) next.delete(ticker);
      else next.add(ticker);
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

  // Pre-load dashboard data for all stocks
  const dashData = useMemo(() => {
    const data: Record<string, ReturnType<typeof getStockDashboardData>> = {};
    for (const s of stockList) {
      data[s.ticker] = getStockDashboardData(s.ticker);
    }
    return data;
  }, []);

  const getSubTab = (ticker: string) => subTab[ticker] || 'sources';

  // ── Render ─────────────────────────────────────────────────────────────────
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

        <div className="db-toolbar-right">
          <button
            className="db-scan-btn"
            onClick={() => {
              setExpanded(new Set(stockList.map(s => s.ticker)));
              setActiveTickers(new Set(stockList.map(s => s.ticker)));
            }}
          >
            Expand All
          </button>
        </div>
      </div>

      {/* Per-stock sections */}
      <div className="db-sections">
        {stockList.map((s, idx) => {
          if (!activeTickers.has(s.ticker)) return null;
          const accent = getStockAccent(s.ticker, idx);
          const data = dashData[s.ticker];
          const isExpanded = expanded.has(s.ticker);
          const hasCik = !!stocks[s.ticker]?.cik;
          const currentSubTab = getSubTab(s.ticker);

          return (
            <div key={s.ticker} className="db-stock-section">
              <button
                className="db-stock-header"
                onClick={() => toggleExpanded(s.ticker)}
                style={{ '--accent': accent.color, '--accent-dim': accent.dim } as React.CSSProperties}
              >
                <span className="db-stock-header-dot" style={{ background: accent.color }} />
                <span className="db-stock-header-ticker" style={{ color: accent.color }}>
                  {s.ticker}
                </span>
                <span className="db-stock-header-name">{s.name}</span>
                <svg
                  className="db-stock-header-chevron"
                  data-expanded={isExpanded}
                  width="12" height="12" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {isExpanded && (
                <div className="db-stock-body">
                  {/* Sub-tab pills */}
                  {hasCik && (
                    <div className="db-subtab-bar">
                      <button
                        className="db-subtab-pill"
                        data-active={currentSubTab === 'sources'}
                        onClick={() => setSubTab(prev => ({ ...prev, [s.ticker]: 'sources' }))}
                      >
                        Sources
                      </button>
                      <button
                        className="db-subtab-pill"
                        data-active={currentSubTab === 'edgar'}
                        onClick={() => setSubTab(prev => ({ ...prev, [s.ticker]: 'edgar' }))}
                      >
                        EDGAR
                      </button>
                    </div>
                  )}

                  {/* Sources tab (always if no CIK, or when sources sub-tab selected) */}
                  {(!hasCik || currentSubTab === 'sources') && (
                    <SharedSourcesTab
                      ticker={s.ticker}
                      companyName={s.name}
                      researchSources={data.researchSources}
                      competitorLabel={data.competitorLabel}
                      competitors={data.competitors}
                    />
                  )}

                  {/* EDGAR tab (when edgar sub-tab selected, only for stocks with CIK) */}
                  {hasCik && currentSubTab === 'edgar' && (
                    <SharedEdgarTab
                      ticker={s.ticker}
                      companyName={s.name}
                      localFilings={data.localFilings}
                      cik={stocks[s.ticker].cik!}
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
