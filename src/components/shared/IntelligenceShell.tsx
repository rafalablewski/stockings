"use client";

import React, { ReactNode } from "react";
import "./intelligence-shared.css";

/* ═══════════════════════════════════════════════════════════════════════════
   IntelligenceShell — shared layout for SEC + Press intelligence feeds

   Both feeds use this shell for identical visual structure. Feed-specific
   logic (data fetching, type configs, methodology) stays in each page.
   CSS theming: set --ix-accent and --ix-accent-dim on the root .ix-app.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Types ─── */

export interface IxKpi {
  value: string | number;
  label: string;
  /** Optional color override for the value */
  valueColor?: string;
  /** Use smaller font for the value (e.g. date strings) */
  small?: boolean;
}

export interface IxStockStat {
  ticker: string;
  count: number;
  accent?: string;
  grade?: string;
  onClick?: () => void;
}

export interface IxTickerPill {
  ticker: string;
  accent?: string;
  grade?: string;
}

export interface IxTypeTab {
  key: string;
  label: string;
  count?: number;
}

export interface IxCardItem {
  id: string;
  ticker: string;
  /** Accent color key (cyan, violet, gold, etc.) */
  accent?: string;
  /** Main title/headline/description */
  title: string;
  /** Secondary badge (e.g. form type for SEC) */
  badge?: ReactNode;
  /** Source text (e.g. "Business Wire") */
  source?: string;
  /** Formatted date string */
  date: string;
  /** Show NEW badge */
  isNew?: boolean;
  /** Callback when NEW badge is clicked */
  onDismiss?: () => void;
  /** Expanded content (rendered when card is expanded) */
  expandContent?: ReactNode;
}

export interface IntelligenceShellProps {
  /* ─ Theme ─ */
  accentColor: string;
  accentDim: string;

  /* ─ Header ─ */
  title: string;
  subtitle: string;

  /* ─ Search ─ */
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;

  /* ─ Days filter ─ */
  daysFilter: number;
  onDaysChange: (days: number) => void;
  daysOptions?: { days: number; label: string }[];

  /* ─ Refresh ─ */
  refreshing: boolean;
  onRefresh: () => void;
  refreshLabel?: string;

  /* ─ Refresh log (optional) ─ */
  refreshLog?: string[];
  onClearLog?: () => void;

  /* ─ KPIs ─ */
  loading: boolean;
  kpis: IxKpi[];

  /* ─ Per-stock stats in header ─ */
  stockStats: IxStockStat[];

  /* ─ Filter: ticker pills ─ */
  tickers: IxTickerPill[];
  activeTicker: string;
  onTickerChange: (ticker: string) => void;

  /* ─ Filter: type/form/category tabs ─ */
  typeTabs: IxTypeTab[];
  activeType: string;
  onTypeChange: (key: string) => void;
  typeLabel?: string;

  /* ─ Clear filters ─ */
  showClear: boolean;
  onClear: () => void;

  /* ─ Result bar ─ */
  resultText?: ReactNode;

  /* ─ Feed content ─ */
  items: IxCardItem[];
  expandedId: string | null;
  onExpandToggle: (id: string | null) => void;

  /* ─ Pagination ─ */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  /* ─ Timestamp ─ */
  timestampText?: string;

  /* ─ Empty / error states ─ */
  isEmpty?: boolean;
  emptyText?: string;
  errors?: Record<string, string>;
  noResults?: boolean;
  noResultsText?: string;

  /* ─ Extra content after feed (e.g. methodology section) ─ */
  afterFeed?: ReactNode;

  /* ─ Extra content overlaying everything (e.g. modal) ─ */
  overlay?: ReactNode;
}

const DAYS_OPTIONS_DEFAULT = [
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 90, label: "90d" },
  { days: 0, label: "All" },
];

export default function IntelligenceShell(props: IntelligenceShellProps) {
  const {
    accentColor,
    accentDim,
    title,
    subtitle,
    searchPlaceholder,
    searchQuery,
    onSearchChange,
    daysFilter,
    onDaysChange,
    daysOptions = DAYS_OPTIONS_DEFAULT,
    refreshing,
    onRefresh,
    refreshLabel = "Refresh",
    refreshLog,
    onClearLog,
    loading,
    kpis,
    stockStats,
    tickers,
    activeTicker,
    onTickerChange,
    typeTabs,
    activeType,
    onTypeChange,
    typeLabel = "Type",
    showClear,
    onClear,
    resultText,
    items,
    expandedId,
    onExpandToggle,
    page,
    totalPages,
    onPageChange,
    timestampText,
    isEmpty,
    emptyText = "No data available.",
    errors,
    noResults,
    noResultsText = "No items match current filters",
    afterFeed,
    overlay,
  } = props;

  const hasErrors = errors && Object.keys(errors).length > 0;

  return (
    <div
      className="ix-app"
      style={{
        "--ix-accent": accentColor,
        "--ix-accent-dim": accentDim,
      } as React.CSSProperties}
    >
      {/* ── Sticky Header ── */}
      <div className="ix-header">
        <div className="ix-title-row">
          <div className="ix-brand">
            <div className="ix-pulse" />
            <div>
              <div className="ix-title">{title}</div>
              <div className="ix-subtitle">{subtitle}</div>
            </div>
          </div>

          <div className="ix-controls">
            <div className="ix-search-wrap">
              <span className="ix-search-icon">/</span>
              <input
                className="ix-search"
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="ix-days-group">
              {daysOptions.map((opt) => (
                <button
                  key={opt.days}
                  className="ix-days-btn"
                  data-active={daysFilter === opt.days}
                  onClick={() => onDaysChange(opt.days)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button className="ix-refresh-btn" onClick={onRefresh} disabled={refreshing}>
              <span className="ix-refresh-icon" data-spinning={refreshing ? "true" : undefined}>
                &#x27F3;
              </span>
              {refreshLabel}
            </button>
          </div>
        </div>

        {/* ── Refresh Log ── */}
        {refreshLog && refreshLog.length > 0 && (
          <div className="ix-refresh-log">
            <div className="ix-refresh-log-header">
              <span className="ix-refresh-log-title">
                {refreshing ? "\u27F3 Refresh in progress..." : "\u2713 Refresh complete"}
              </span>
              {!refreshing && onClearLog && (
                <button className="ix-refresh-log-close" onClick={onClearLog}>
                  &times;
                </button>
              )}
            </div>
            <div className="ix-refresh-log-body">
              {refreshLog.map((entry, i) => (
                <div
                  key={i}
                  className={`ix-refresh-log-entry${entry.includes("\u2717") ? " ix-log-error" : entry.includes("\u2713") ? " ix-log-success" : ""}`}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KPI Strip ── */}
        {!loading && (
          <div className="ix-kpi-strip">
            {kpis.map((kpi, i) => (
              <div key={i} className="ix-kpi">
                <span
                  className={`ix-kpi-value${kpi.small ? " ix-kpi-value-sm" : ""}`}
                  style={kpi.valueColor ? { color: kpi.valueColor } : undefined}
                >
                  {kpi.value}
                </span>
                <span className="ix-kpi-label">{kpi.label}</span>
              </div>
            ))}

            {/* Per-stock counts */}
            <div className="ix-stock-summary-wrap">
              <div className="ix-stock-summary">
                {stockStats.map((stat) => (
                  <div
                    key={stat.ticker}
                    className={`ix-stock-stat${stat.onClick ? " ix-stock-stat-clickable" : ""}`}
                    data-grade={stat.grade}
                    onClick={stat.onClick}
                    title={stat.onClick ? `Click for ${stat.ticker} details` : undefined}
                    style={stat.onClick ? { cursor: "pointer" } : undefined}
                  >
                    {stat.accent && (
                      <span className="ix-stock-dot" data-accent={stat.accent} />
                    )}
                    <span className="ix-stock-stat-count">{stat.count}</span>
                    <span className="ix-stock-stat-label">{stat.ticker}</span>
                    {stat.grade && (
                      <span className="ix-grade-dot" data-grade={stat.grade} title={`Grade ${stat.grade}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Filter Panel ── */}
        <div className="ix-filter-panel">
          <div className="ix-filter-group">
            <span className="ix-filter-group-label">Stock</span>
            <button
              className="ix-stock-pill"
              data-active={activeTicker === "ALL"}
              data-accent="all"
              onClick={() => onTickerChange("ALL")}
            >
              ALL
            </button>
            {tickers.map((t) => (
              <button
                key={t.ticker}
                className="ix-stock-pill"
                data-active={activeTicker === t.ticker}
                data-accent={t.accent}
                data-grade={t.grade}
                onClick={() => onTickerChange(t.ticker)}
              >
                {t.ticker}
                {t.grade && t.grade !== "A" && (
                  <span className="ix-grade-badge" data-grade={t.grade}>{t.grade}</span>
                )}
              </button>
            ))}
          </div>

          <div className="ix-divider" />

          <div className="ix-filter-group">
            <span className="ix-filter-group-label">{typeLabel}</span>
            {typeTabs.map((tab) => (
              <button
                key={tab.key}
                className="ix-type-tab"
                data-active={activeType === tab.key}
                onClick={() => onTypeChange(tab.key)}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ix-filter-count">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          {showClear && (
            <button className="ix-filter-clear" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="ix-feed">
        {/* Result bar */}
        {!loading && resultText && (
          <div className="ix-result-bar">
            <span className="ix-result-count">{resultText}</span>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="ix-skeleton" />
        ))}

        {/* Empty state */}
        {!loading && isEmpty && (
          <div className="ix-empty">{emptyText}</div>
        )}

        {/* Errors */}
        {!loading && hasErrors && (
          <div className="ix-errors-wrap">
            {Object.entries(errors!).map(([ticker, msg]) => (
              <div key={ticker} className="ix-empty ix-error-item">
                <span className="ix-error">{ticker}: {msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !isEmpty && !hasErrors && noResults && (
          <div className="ix-empty">{noResultsText}</div>
        )}

        {/* Cards */}
        {!loading && items.map((item) => {
          const expanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="ix-card"
              data-expanded={expanded}
              onClick={() => onExpandToggle(expanded ? null : item.id)}
            >
              <div className="ix-card-inner">
                <div className="ix-card-top">
                  <span className="ix-card-ticker" data-accent={item.accent}>
                    {item.ticker}
                  </span>
                  {item.badge}
                  <span className="ix-card-title">{item.title}</span>
                  <div className="ix-card-meta">
                    {item.source && (
                      <span className="ix-card-source">{item.source}</span>
                    )}
                    <span className="ix-card-date">{item.date}</span>
                    {item.isNew && (
                      <span
                        className="ix-new-badge"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onDismiss?.();
                        }}
                        title="Click to mark as seen"
                      >
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {expanded && item.expandContent && (
                <div className="ix-card-expand">
                  {item.expandContent}
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="ix-pagination">
            <button
              className="ix-page-btn"
              disabled={page <= 1}
              onClick={() => onPageChange(Math.max(1, page - 1))}
            >
              &larr; Prev
            </button>
            <span className="ix-page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="ix-page-btn"
              disabled={page >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {/* Timestamp */}
        {timestampText && !loading && (
          <div className="ix-timestamp">{timestampText}</div>
        )}

        {/* Extra content after feed */}
        {afterFeed}
      </div>

      {/* Overlay (modals, etc.) */}
      {overlay}
    </div>
  );
}
