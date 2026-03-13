"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks } from "@/lib/stocks";
import "./sec-intelligence.css";

/* ═══════════════════════════════════════════════════════════════════════════
   SEC INTELLIGENCE — Unified SEC EDGAR filings feed
   Displays all SEC filings for stocks tracked in Press Intelligence.

   ── DB-First Architecture ──
   1. On mount: load filings ONLY from database (mode=db). If nothing
      saved yet → empty state with prompt to refresh.
   2. "Refresh" button → fetches fresh filings from SEC EDGAR API,
      persists ALL to seen_filings DB (same table as Edgar tab).
      New filings (not already in DB) get dismissed=false → NEW badge.
   3. NEW badge stays until user clicks it → dismisses via API.
   4. Edgar tab for individual stocks sees the SAME seen_filings rows —
      status, crossRefs, dismissed, hidden state fully preserved.
   ═══════════════════════════════════════════════════════════════════════════ */

interface SecFiling {
  ticker: string;
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
  dismissed?: boolean;
}

interface ApiResponse {
  filings: SecFiling[];
  totalCount: number;
  tickerStats: Record<string, { count: number; companyName: string }>;
  errors?: Record<string, string>;
  fetchedAt: string;
  mode: string;
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
/** Normalize form type for filter matching (strips spaces, slashes, hyphens, "Form" prefix) */
const normalizeForm = (f: string) =>
  f.replace(/[/\s-]/g, '').replace(/^FORM/i, '').replace(/^SCHEDULE/i, 'SC').toUpperCase();

const FORM_FILTERS: { key: string; label: string; match: (f: string) => boolean }[] = [
  { key: "10-K",        label: "10-K",        match: f => /^10K/i.test(normalizeForm(f)) },
  { key: "10-Q",        label: "10-Q",        match: f => /^10Q/i.test(normalizeForm(f)) },
  { key: "8-K",         label: "8-K",         match: f => /^8K/i.test(normalizeForm(f)) },
  { key: "Form 4",      label: "Form 4",      match: f => { const n = normalizeForm(f); return n === '4' || n === '4A'; } },
  { key: "Form 3",      label: "Form 3",      match: f => { const n = normalizeForm(f); return n === '3' || n === '3A'; } },
  { key: "Form 5",      label: "Form 5",      match: f => { const n = normalizeForm(f); return n === '5' || n === '5A'; } },
  { key: "SC 13",       label: "SC 13D/G",    match: f => normalizeForm(f).startsWith('SC13') },
  { key: "Form 144",    label: "Form 144",    match: f => { const n = normalizeForm(f); return n === '144' || n === '144A'; } },
  { key: "Proxy",       label: "Proxy",       match: f => { const n = normalizeForm(f); return n.includes('14A') || n.includes('14C'); } },
  { key: "Prospectus",  label: "Prospectus",  match: f => { const n = normalizeForm(f); return /^424/.test(n) || /^S[138]/.test(n) || n === 'FWP'; } },
  { key: "Registration", label: "S/F-Reg",    match: f => { const n = normalizeForm(f); return /^S/.test(n) || /^F/.test(n); } },
];

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

  /* Track dismissed accessions locally (optimistic UI) */
  const [dismissedLocal, setDismissedLocal] = useState<Set<string>>(new Set());

  /* Filters */
  const [activeTicker, setActiveTicker] = useState("ALL");
  const [activeForm, setActiveForm] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState(30);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  /* ── Load filings (DB-first on mount, refresh fetches from SEC) ── */
  const loadFilings = useCallback(async (mode: "db" | "refresh" = "db") => {
    try {
      const params = new URLSearchParams({ mode, limit: '50' });
      if (daysFilter > 0) params.set('days', String(daysFilter));
      const res = await fetch(`/api/sec-intelligence?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ApiResponse = await res.json();
      setData(json);

      // Build local dismissed set from API response
      const dismissed = new Set<string>();
      for (const f of json.filings) {
        if (f.dismissed) {
          dismissed.add(`${f.ticker}:${f.accessionNumber}`);
        }
      }
      setDismissedLocal(dismissed);
    } catch (err) {
      console.error('[SEC Intelligence] Fetch error:', err);
    }
    setLoading(false);
    setRefreshing(false);
  }, [daysFilter]);

  /* DB-first: load from database on mount */
  useEffect(() => {
    setLoading(true);
    loadFilings("db");
  }, [loadFilings]);

  /* Refresh: fetch from SEC, persist to DB */
  const handleRefresh = () => {
    setRefreshing(true);
    loadFilings("refresh");
  };

  /* Dismiss NEW badge (same API as Edgar tab) */
  const handleDismiss = useCallback(async (filing: SecFiling) => {
    const key = `${filing.ticker}:${filing.accessionNumber}`;
    // Optimistic update
    setDismissedLocal(prev => new Set(prev).add(key));

    try {
      await fetch('/api/seen-filings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: filing.ticker,
          filings: [{
            accessionNumber: filing.accessionNumber,
            form: filing.form,
          }],
          dismiss: true,
        }),
      });
    } catch (err) {
      console.error('[SEC Intelligence] Dismiss error:', err);
    }
  }, []);

  /* ── Tickers with data (for filter pills) ── */
  const activeTickers = useMemo(() => {
    if (!data?.tickerStats) return [];
    return Object.entries(data.tickerStats)
      .filter(([, s]) => s.count > 0)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([ticker]) => ticker);
  }, [data]);

  /* ── Build dynamic form filter options from actual data ── */
  const activeFormFilters = useMemo(() => {
    if (!data?.filings) return [];
    // Only show filters that match at least one filing in current ticker scope
    const scopedFilings = activeTicker !== "ALL"
      ? data.filings.filter(f => f.ticker === activeTicker)
      : data.filings;

    const active: { key: string; label: string; count: number }[] = [];
    for (const ff of FORM_FILTERS) {
      const count = scopedFilings.filter(f => ff.match(f.form)).length;
      if (count > 0) active.push({ key: ff.key, label: ff.label, count });
    }

    // "Other" — forms not matched by any category
    const otherCount = scopedFilings.filter(f => {
      for (const ff of FORM_FILTERS) { if (ff.match(f.form)) return false; }
      return true;
    }).length;
    if (otherCount > 0) active.push({ key: "Other", label: "Other", count: otherCount });

    return active;
  }, [data, activeTicker]);

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
      if (activeForm === "Other") {
        filings = filings.filter(f => {
          for (const ff of FORM_FILTERS) { if (ff.match(f.form)) return false; }
          return true;
        });
      } else {
        const filterDef = FORM_FILTERS.find(ff => ff.key === activeForm);
        if (filterDef) {
          filings = filings.filter(f => filterDef.match(f.form));
        }
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

  /* Count undismissed (NEW) filings */
  const newCount = useMemo(() => {
    if (!data?.filings) return 0;
    return data.filings.filter(f =>
      !f.dismissed && !dismissedLocal.has(`${f.ticker}:${f.accessionNumber}`)
    ).length;
  }, [data, dismissedLocal]);

  /* Reset page on filter change; reset form filter if it no longer has matches */
  useEffect(() => { setPage(1); }, [activeTicker, activeForm, searchQuery, daysFilter]);
  useEffect(() => {
    if (activeForm !== "All" && !activeFormFilters.some(ff => ff.key === activeForm)) {
      setActiveForm("All");
    }
  }, [activeForm, activeFormFilters]);

  /* ── Pagination ── */
  const PAGE_SIZE = 25;
  const totalPages = Math.max(1, Math.ceil(filteredFilings.length / PAGE_SIZE));
  const pagedFilings = filteredFilings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Stats ── */
  const stats = useMemo(() => {
    if (!data?.filings) return { total: 0, tickers: 0, today: 0, thisWeek: 0, newFilings: 0 };
    const filings = data.filings;
    const todayStr = new Date().toISOString().slice(0, 10);

    let today = 0;
    let thisWeek = 0;

    for (const f of filings) {
      if (f.filingDate === todayStr) today++;
      if (isRecent(f.filingDate, 7)) thisWeek++;
    }

    return {
      total: filings.length,
      tickers: Object.keys(data.tickerStats).filter(t => (data.tickerStats[t]?.count ?? 0) > 0).length,
      today,
      thisWeek,
      newFilings: newCount,
    };
  }, [data, newCount]);

  const hasErrors = data?.errors && Object.keys(data.errors).length > 0;
  const isEmpty = !loading && data?.filings?.length === 0 && !hasErrors;

  return (
    <div className="si-app">
      {/* ── Sticky Header ── */}
      <div className="si-header">
        <div className="si-title-row">
          <div className="si-brand">
            <div className="si-pulse" />
            <div>
              <div className="si-title">SEC Intelligence</div>
              <div className="si-subtitle">EDGAR filings feed &middot; DB-first</div>
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
              Fetch Filings
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
            {stats.newFilings > 0 && (
              <div className="si-kpi">
                <span className="si-kpi-value" style={{ color: 'var(--violet, #A78BFA)' }}>{stats.newFilings}</span>
                <span className="si-kpi-label">Unseen</span>
              </div>
            )}

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
            <button
              className="si-form-tab"
              data-active={activeForm === "All"}
              onClick={() => setActiveForm("All")}
            >
              All
            </button>
            {activeFormFilters.map((ff) => (
              <button
                key={ff.key}
                className="si-form-tab"
                data-active={activeForm === ff.key}
                onClick={() => setActiveForm(activeForm === ff.key ? "All" : ff.key)}
              >
                {ff.label}
                <span className="si-filter-count">{ff.count}</span>
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
        {!loading && filteredFilings.length > 0 && (
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

        {/* Empty state — no data in DB yet */}
        {isEmpty && (
          <div className="si-empty">
            No filings in database yet. Click <strong>Fetch Filings</strong> to load from SEC EDGAR.
          </div>
        )}

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

        {/* No results for current filters */}
        {!loading && !isEmpty && !hasErrors && filteredFilings.length === 0 && (
          <div className="si-empty">
            {searchQuery ? `No filings matching "${searchQuery}"` : "No filings match current filters"}
          </div>
        )}

        {/* Filing cards */}
        {!loading && pagedFilings.map((filing) => {
          const id = `${filing.ticker}:${filing.accessionNumber}`;
          const expanded = expandedId === id;
          const companyName = data?.tickerStats[filing.ticker]?.companyName || filing.ticker;
          const formCategory = getFormCategory(filing.form);
          const isNew = !filing.dismissed && !dismissedLocal.has(id);

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
                    {isNew && (
                      <span
                        className="si-new-badge"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(filing);
                        }}
                        title="Click to mark as seen"
                      >
                        NEW
                      </span>
                    )}
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
            {data.mode === "db" && " (from database)"}
          </div>
        )}
      </div>
    </div>
  );
}
