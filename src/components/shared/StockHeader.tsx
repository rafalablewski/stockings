'use client';

import React, { useMemo } from 'react';
import type { MarketData } from './LivePrice';

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface HudMarker {
  label: string;
  value: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface StockHeaderProps {
  /** Exchange label (e.g. "NASDAQ", "NYSE") */
  exchange: string;
  /** Stock ticker symbol */
  ticker: string;
  /** Full company name */
  companyName: string;
  /** Metadata rows shown below the company name */
  metadata?: Array<{ label: string; value: string }>;
  /** Current stock price */
  price: number;
  /** Daily change percentage (null = not yet loaded) */
  changePct: number | null;
  /** Refresh handler (price + chart) */
  onRefresh: () => void;
  /** Whether a refresh is in progress */
  isRefreshing: boolean;
  /** Timestamp of last successful price update */
  lastUpdated: Date | null;
  /** Stock-specific badge below the change pill (e.g. satellite count, NAV premium) */
  badge?: React.ReactNode;
  /** HUD spine markers for the right column */
  hudMarkers?: HudMarker[];
  /** Stats row content — pass <Stat /> components as children */
  children?: React.ReactNode;
}

/* ── Helper ────────────────────────────────────────────────────────────────── */

/**
 * Build standard HUD markers from market data returned by useLiveStockPrice.
 * Ordered top→bottom: 52W High → Day High → Open → Day Low → 52W Low.
 */
export function buildHudMarkers(data: MarketData): HudMarker[] {
  const markers: HudMarker[] = [];
  if (data.fiftyTwoWeekHigh != null) markers.push({ label: '52W HIGH', value: `$${data.fiftyTwoWeekHigh.toFixed(2)}`, sentiment: 'positive' });
  if (data.dayHigh != null) markers.push({ label: 'DAY HIGH', value: `$${data.dayHigh.toFixed(2)}`, sentiment: 'neutral' });
  if (data.open != null) markers.push({ label: 'OPEN', value: `$${data.open.toFixed(2)}`, sentiment: 'neutral' });
  if (data.dayLow != null) markers.push({ label: 'DAY LOW', value: `$${data.dayLow.toFixed(2)}`, sentiment: 'neutral' });
  if (data.fiftyTwoWeekLow != null) markers.push({ label: '52W LOW', value: `$${data.fiftyTwoWeekLow.toFixed(2)}`, sentiment: 'negative' });
  return markers;
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export const StockHeader: React.FC<StockHeaderProps> = ({
  exchange,
  ticker,
  companyName,
  metadata = [],
  price,
  changePct,
  onRefresh,
  isRefreshing,
  lastUpdated,
  badge,
  hudMarkers = [],
  children,
}) => {
  const timeStr = useMemo(() => {
    if (!lastUpdated) return null;
    return lastUpdated.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });
  }, [lastUpdated]);

  return (
    <>
      <header className="hdr">
        {/* Red accent line */}
        <div className="hdr-accent-line" />

        <div className="hdr-grid">
          {/* ═══ LEFT: Identity ═══ */}
          <div className="hdr-identity">
            <div className="hdr-status">
              <span className="hdr-status-dot" />
              <span className="hdr-status-text">SYSTEM ONLINE</span>
            </div>

            <div className="hdr-exchange">{exchange}</div>
            <h1 className="hdr-ticker">{ticker}</h1>
            <div className="hdr-company">{companyName}</div>

            {metadata.length > 0 && (
              <div className="hdr-meta">
                <div className="hdr-meta-sep" />
                {metadata.map((m, i) => (
                  <div className="hdr-meta-row" key={i}>
                    <span className="hdr-meta-label">{m.label}</span>
                    <span className="hdr-meta-value">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ═══ CENTER: Price + Gauge Arc ═══ */}
          <div className="hdr-price">
            <div className="hdr-price-label">MARKET PRICE</div>

            {/* Decorative gauge arc */}
            <div className="hdr-arc-wrap">
              <svg className="hdr-arc" viewBox="-160 -160 320 100" aria-hidden="true">
                <path d="M-140,-100 A160,160 0 0,1 140,-100" fill="none" className="hdr-arc-track" strokeWidth="3" />
                <path d="M-140,-100 A160,160 0 0,1 80,-130" fill="none" className="hdr-arc-fill" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <div className="hdr-price-value">
              <span>${price.toFixed(2)}</span>
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="hdr-refresh-btn"
                title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Click to refresh'}
                data-loading={isRefreshing ? 'true' : undefined}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-spin={isRefreshing ? 'true' : undefined}>
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              </button>
            </div>

            <div className="hdr-currency">USD</div>

            {changePct !== null && (
              <div className={`hdr-change ${changePct >= 0 ? 'up' : 'down'}`}>
                {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
              </div>
            )}

            {badge && <div className="hdr-badge">{badge}</div>}

            <div className="hdr-live">
              <span className="hdr-live-dot" />
              <span>LIVE{timeStr ? ` · ${timeStr}` : ''}</span>
            </div>
          </div>

          {/* ═══ RIGHT: HUD Spine ═══ */}
          {hudMarkers.length > 0 && (
            <div className="hdr-spine">
              {hudMarkers.map((marker, i) => (
                <div className="hdr-marker" key={i} data-sentiment={marker.sentiment}>
                  <div className="hdr-marker-label">{marker.label}</div>
                  <div className="hdr-marker-value">{marker.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Stats row */}
      {children && (
        <div className="hdr-stats">
          {children}
        </div>
      )}
    </>
  );
};

export default StockHeader;
