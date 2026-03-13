"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks } from "@/lib/stocks";
import "./sec-intelligence.css";

/* ═══════════════════════════════════════════════════════════════════════════
   SEC INTELLIGENCE — Unified SEC EDGAR filings feed
   Displays all SEC filings for stocks tracked in Press Intelligence.
   ═══════════════════════════════════════════════════════════════════════════ */

interface SecFiling {
  ticker: string;
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

interface ApiResponse {
  filings: SecFiling[];
  totalCount: number;
  tickerStats: Record<string, { count: number; companyName: string }>;
  errors?: Record<string, string>;
  fetchedAt: string;
}

/* ─── Form type classification for color coding ─── */
function getFormCategory(form: string): string {
  const f = form.toUpperCase();
  if (/^10-K/.test(f) || /^20-F/.test(f)) return "annual";
  if (/^10-Q/.test(f) || /^6-K/.test(f)) return "quarterly";
  if (/^8-K/.test(f)) return "current";
  if (/^(FORM\s*)?[345](\/A)?$/.test(f) || /^SC\s*13/.test(f) || /SCHEDULE\s*13/.test(f)) return "insider";
  if (/^DEF/.test(f) || /^PRE/.test(f) || /PROXY/.test(f)) return "proxy";
  if (/^S-/.test(f) || /^F-/.test(f) || /^424/.test(f)) return "registration";
  return "other";
}

/* ─── Form type filter categories ─── */
const FORM_FILTERS = [
  { key: "All", label: "All", match: () => true },
  { key: "10-K", label: "10-K", match: (f: string) => /^10-K/i.test(f) || /^20-F/i.test(f) },
  { key: "10-Q", label: "10-Q", match: (f: string) => /^10-Q/i.test(f) || /^6-K/i.test(f) },
  { key: "8-K", label: "8-K", match: (f: string) => /^8-K/i.test(f) },
  { key: "Insider", label: "Insider", match: (f: string) => /^(Form\s*)?[345](\/A)?$/i.test(f) || /^SC\s*13/i.test(f) },
  { key: "Proxy", label: "Proxy", match: (f: string) => /^DEF/i.test(f) || /^PRE/i.test(f) },
  { key: "S/F-Reg", label: "S/F-Reg", match: (f: string) => /^S-/i.test(f) || /^F-/i.test(f) || /^424/i.test(f) },
] as const;

/* ─── Days filter options ─── */
const DAYS_OPTIONS = [
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 90, label: "90d" },
  { days: 0, label: "All" },
];

const formatDate = (str: string) => {
  if (!str) return "";
  const d = new Date(str + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const isRecent = (dateStr: string, days: number) => {
  if (!dateStr) return false;
  const d = new Date(dateStr + "T00:00:00");
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return d >= cutoff;
};

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function SecIntelligencePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* Filters */
  const [activeTicker, setActiveTicker] = useState("ALL");
  const [activeForm, setActiveForm] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState(30);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  /* ── Fetch filings ── */
  const loadFilings = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (daysFilter > 0) params.set('days', String(daysFilter));
      const res = await fetch(`/api/sec-intelligence?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (err) {
      console.error('[SEC Intelligence] Fetch error:', err);
    }
    setLoading(false);
    setRefreshing(false);
  }, [daysFilter]);

  useEffect(() => {
    setLoading(true);
    loadFilings();
  }, [loadFilings]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadFilings();
  };

  /* ── Tickers with data (for filter pills) ── */
  const activeTickers = useMemo(() => {
    if (!data?.tickerStats) return [];
    return Object.entries(data.tickerStats)
      .filter(([, s]) => s.count > 0)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([ticker]) => ticker);
  }, [data]);

  /* ── Filtered filings ── */
  const filteredFilings = useMemo(() => {
    if (!data?.filings) return [];
    let filings = data.filings;

    /* Ticker filter */
    if (activeTicker !== "ALL") {
      filings = filings.filter(f => f.ticker === activeTicker);
    }

    /* Form type filter */
    if (activeForm !== "All") {
      const filterDef = FORM_FILTERS.find(ff => ff.key === activeForm);
      if (filterDef) {
        filings = filings.filter(f => filterDef.match(f.form));
      }
    }

    /* Search filter */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filings = filings.filter(f => {
        const desc = (f.primaryDocDescription || "").toLowerCase();
        const form = f.form.toLowerCase();
        const ticker = f.ticker.toLowerCase();
        const company = (data.tickerStats[f.ticker]?.companyName || "").toLowerCase();
        return desc.includes(q) || form.includes(q) || ticker.includes(q) || company.includes(q);
      });
    }

    return filings;
  }, [data, activeTicker, activeForm, searchQuery]);

  /* Reset page on filter change */
  useEffect(() => { setPage(1); }, [activeTicker, activeForm, searchQuery, daysFilter]);

  /* ── Pagination ── */
  const PAGE_SIZE = 25;
  const totalPages = Math.max(1, Math.ceil(filteredFilings.length / PAGE_SIZE));
  const pagedFilings = filteredFilings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Stats ── */
  const stats = useMemo(() => {
    if (!data?.filings) return { total: 0, tickers: 0, today: 0, thisWeek: 0, forms: {} as Record<string, number> };
    const filings = data.filings;
    const todayStr = new Date().toISOString().slice(0, 10);

    const forms: Record<string, number> = {};
    let today = 0;
    let thisWeek = 0;

    for (const f of filings) {
      forms[f.form] = (forms[f.form] || 0) + 1;
      if (f.filingDate === todayStr) today++;
      if (isRecent(f.filingDate, 7)) thisWeek++;
    }

    return {
      total: filings.length,
      tickers: Object.keys(data.tickerStats).filter(t => (data.tickerStats[t]?.count ?? 0) > 0).length,
      today,
      thisWeek,
      forms,
    };
  }, [data]);

  const hasErrors = data?.errors && Object.keys(data.errors).length > 0;

  return (
    <div className="si-app">
      {/* ── Sticky Header ── */}
      <div className="si-header">
        <div className="si-title-row">
          <div className="si-brand">
            <div className="si-pulse" />
            <div>
              <div className="si-title">SEC Intelligence</div>
              <div className="si-subtitle">EDGAR filings feed</div>
            </div>
          </div>

          <div className="si-controls">
            <div className="si-search-wrap">
              <span className="si-search-icon">/</span>
              <input
                className="si-search"
                type="text"
                placeholder="Search filings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="si-days-group">
              {DAYS_OPTIONS.map((opt) => (
                <button
                  key={opt.days}
                  className="si-days-btn"
                  data-active={daysFilter === opt.days}
                  onClick={() => setDaysFilter(opt.days)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button className="si-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
              <span className="si-refresh-icon" data-spinning={refreshing ? "true" : undefined}>
                &#x27F3;
              </span>
              Refresh
            </button>
          </div>
        </div>

        {/* ── KPI Strip ── */}
        {!loading && (
          <div className="si-kpi-strip">
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.total}</span>
              <span className="si-kpi-label">Total Filings</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.tickers}</span>
              <span className="si-kpi-label">Companies</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.today}</span>
              <span className="si-kpi-label">Today</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.thisWeek}</span>
              <span className="si-kpi-label">This Week</span>
            </div>

            {/* Per-stock counts */}
            <div className="si-stock-summary-wrap">
              <div className="si-stock-summary">
                {activeTickers.slice(0, 20).map((ticker) => (
                  <div
                    key={ticker}
                    className="si-stock-stat"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveTicker(activeTicker === ticker ? "ALL" : ticker)}
                  >
                    <span className="si-stock-stat-count">
                      {data?.tickerStats[ticker]?.count || 0}
                    </span>
                    <span className="si-stock-stat-label">{ticker}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Filter Panel ── */}
        <div className="si-filter-panel">
          <div className="si-filter-group">
            <span className="si-filter-group-label">Stock</span>
            <button
              className="si-stock-pill"
              data-active={activeTicker === "ALL"}
              onClick={() => setActiveTicker("ALL")}
            >
              ALL
            </button>
            {activeTickers.map((ticker) => (
              <button
                key={ticker}
                className="si-stock-pill"
                data-active={activeTicker === ticker}
                onClick={() => setActiveTicker(ticker)}
              >
                {ticker}
              </button>
            ))}
          </div>

          <div className="si-divider" />

          <div className="si-filter-group">
            <span className="si-filter-group-label">Form</span>
            {FORM_FILTERS.map((ff) => (
              <button
                key={ff.key}
                className="si-form-tab"
                data-active={activeForm === ff.key}
                onClick={() => setActiveForm(ff.key)}
              >
                {ff.label}
                {activeForm === ff.key && ff.key !== "All" && (
                  <span className="si-filter-count">{filteredFilings.length}</span>
                )}
              </button>
            ))}
          </div>

          {(activeTicker !== "ALL" || activeForm !== "All" || searchQuery) && (
            <button
              className="si-filter-clear"
              onClick={() => { setActiveTicker("ALL"); setActiveForm("All"); setSearchQuery(""); }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="si-feed">
        {/* Result bar */}
        {!loading && (
          <div className="si-result-bar">
            <span className="si-result-count">
              <strong>{(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, filteredFilings.length)}</strong> of {filteredFilings.length} filings
              {activeTicker !== "ALL" && <> &middot; {activeTicker}</>}
              {activeForm !== "All" && <> &middot; {activeForm}</>}
              {searchQuery && <> &middot; &ldquo;{searchQuery}&rdquo;</>}
            </span>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="si-skeleton" />
        ))}

        {/* Errors */}
        {!loading && hasErrors && (
          <div className="si-errors-wrap">
            {Object.entries(data!.errors!).map(([ticker, msg]) => (
              <div key={ticker} className="si-empty si-error-item">
                <span className="si-error">{ticker}: {msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !hasErrors && filteredFilings.length === 0 && (
          <div className="si-empty">
            {searchQuery ? `No filings matching "${searchQuery}"` : "No filings match current filters"}
          </div>
        )}

        {/* Filing cards */}
        {!loading && pagedFilings.map((filing) => {
          const id = `${filing.ticker}-${filing.accessionNumber}`;
          const expanded = expandedId === id;
          const companyName = data?.tickerStats[filing.ticker]?.companyName || filing.ticker;
          const formCategory = getFormCategory(filing.form);
          const recent = isRecent(filing.filingDate, 2);

          return (
            <div
              key={id}
              className="si-card"
              data-expanded={expanded}
              onClick={() => setExpandedId(expanded ? null : id)}
            >
              <div className="si-card-inner">
                <div className="si-card-top">
                  <span className="si-card-ticker">{filing.ticker}</span>
                  <span className="si-card-form" data-form={formCategory}>
                    {filing.form}
                  </span>
                  <span className="si-card-description">
                    {filing.primaryDocDescription || filing.form}
                  </span>
                  <div className="si-card-meta">
                    <span className="si-card-company">{companyName}</span>
                    <span className="si-card-date">{formatDate(filing.filingDate)}</span>
                    {recent && <span className="si-new-badge">NEW</span>}
                  </div>
                </div>
              </div>

              {expanded && (
                <div className="si-card-expand">
                  <div className="si-card-details">
                    <div className="si-card-detail-row">
                      <span className="si-card-detail-label">Company</span>
                      <span className="si-card-detail-value">{companyName}</span>
                    </div>
                    <div className="si-card-detail-row">
                      <span className="si-card-detail-label">Form Type</span>
                      <span className="si-card-detail-value">{filing.form}</span>
                    </div>
                    <div className="si-card-detail-row">
                      <span className="si-card-detail-label">Filed</span>
                      <span className="si-card-detail-value">{formatDate(filing.filingDate)}</span>
                    </div>
                    {filing.reportDate && (
                      <div className="si-card-detail-row">
                        <span className="si-card-detail-label">Period</span>
                        <span className="si-card-detail-value">{formatDate(filing.reportDate)}</span>
                      </div>
                    )}
                    <div className="si-card-detail-row">
                      <span className="si-card-detail-label">Accession</span>
                      <span className="si-card-detail-value">{filing.accessionNumber}</span>
                    </div>
                  </div>
                  <div className="si-card-actions">
                    <a
                      href={filing.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="si-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2197; View Filing on SEC
                    </a>
                    <a
                      href={`/research/${filing.ticker}`}
                      className="si-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2192; {stocks[filing.ticker]?.name || filing.ticker} Research
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="si-pagination">
            <button
              className="si-page-btn"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              &larr; Prev
            </button>
            <span className="si-page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="si-page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {/* Timestamp */}
        {data?.fetchedAt && !loading && (
          <div className="si-timestamp">
            Last updated {new Date(data.fetchedAt).toLocaleTimeString()} &middot; {filteredFilings.length} of {data.totalCount} filings
          </div>
        )}
      </div>
    </div>
  );
}
