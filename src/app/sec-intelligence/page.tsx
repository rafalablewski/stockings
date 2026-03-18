"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks, INTELLIGENCE_TICKERS } from "@/lib/stocks";
import "./sec-intelligence.css";

/** Sorted ticker list — single source of truth for display order in both pages */
const SORTED_TICKERS = [...INTELLIGENCE_TICKERS].sort((a, b) => a.localeCompare(b));

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

const isFilingToday = (dateStr: string) => {
  if (!dateStr) return false;
  return dateStr === new Date().toISOString().slice(0, 10);
};

const isThisMonth = (dateStr: string) => {
  if (!dateStr) return false;
  const d = new Date(dateStr + "T00:00:00");
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
};

const isThisYear = (dateStr: string) => {
  if (!dateStr) return false;
  return new Date(dateStr + "T00:00:00").getFullYear() === new Date().getFullYear();
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
  const [methodologyOpen, setMethodologyOpen] = useState(false);

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

  /* ── All intelligence tickers, sorted alphabetically ── */
  const allTickers = SORTED_TICKERS;

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

  /* ── Stats (matching Press Intelligence layout) ── */
  const stats = useMemo(() => {
    if (!data?.filings) return { total: 0, today: 0, thisMonth: 0, thisYear: 0, latest: "\u2014", newFilings: 0, perStock: {} as Record<string, number> };
    const filings = data.filings;

    let today = 0;
    let thisMonth = 0;
    let thisYear = 0;

    for (const f of filings) {
      if (isFilingToday(f.filingDate)) today++;
      if (isThisMonth(f.filingDate)) thisMonth++;
      if (isThisYear(f.filingDate)) thisYear++;
    }

    const latest = filings[0] ? formatDate(filings[0].filingDate) : "\u2014";

    const perStock: Record<string, number> = {};
    for (const ticker of allTickers) {
      perStock[ticker] = data.tickerStats[ticker]?.count || 0;
    }

    return {
      total: filings.length,
      today,
      thisMonth,
      thisYear,
      latest,
      newFilings: newCount,
      perStock,
    };
  }, [data, newCount, allTickers]);

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

        {/* ── KPI Strip (matches Press Intelligence layout) ── */}
        {!loading && (
          <div className="si-kpi-strip">
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.total}</span>
              <span className="si-kpi-label">Total</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.today}</span>
              <span className="si-kpi-label">Today</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.thisMonth}</span>
              <span className="si-kpi-label">This Month</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value">{stats.thisYear}</span>
              <span className="si-kpi-label">This Year</span>
            </div>
            <div className="si-kpi">
              <span className="si-kpi-value si-kpi-value-sm">{stats.latest}</span>
              <span className="si-kpi-label">Latest</span>
            </div>
            {stats.newFilings > 0 && (
              <div className="si-kpi">
                <span className="si-kpi-value" style={{ color: 'var(--violet, #A78BFA)' }}>{stats.newFilings}</span>
                <span className="si-kpi-label">Unseen</span>
              </div>
            )}

            {/* Per-stock counts (same layout as Press Intelligence) */}
            <div className="si-stock-summary-wrap">
              <div className="si-stock-summary">
                {allTickers.map((ticker) => (
                  <div
                    key={ticker}
                    className="si-stock-stat"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveTicker(activeTicker === ticker ? "ALL" : ticker)}
                  >
                    <span className="si-stock-stat-count">
                      {stats.perStock[ticker] || 0}
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
            {allTickers.map((ticker) => (
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

        {/* ── Methodology ── */}
        <div className="si-methodology">
          <div
            className="si-methodology-header"
            onClick={() => setMethodologyOpen(prev => !prev)}
            role="button"
            tabIndex={0}
            aria-expanded={methodologyOpen}
            onKeyDown={(e) => e.key === "Enter" && setMethodologyOpen(prev => !prev)}
          >
            <span className="si-methodology-label">Methodology</span>
            <span className="si-methodology-toggle">{methodologyOpen ? "\u2212" : "+"}</span>
          </div>
          {methodologyOpen && (
            <div className="si-methodology-body">
              {/* DB-First Architecture */}
              <div className="si-method-section-title">DB-First Architecture</div>
              <div className="si-method-flow">
                <div className="si-method-node">Page loads</div>
                <div className="si-method-arrow" />
                <div className="si-method-node si-method-node-accent">GET /api/sec-intelligence?mode=db</div>
                <div className="si-method-arrow" />
                <div className="si-method-node">Load all filings from seen_filings table (Neon PostgreSQL)</div>
                <div className="si-method-arrow" />
                <div className="si-method-highlight">Render from DB &mdash; no SEC API calls on mount</div>
              </div>
              <div className="si-method-details">
                <div><span className="si-method-key">Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_filings table (shared with per-stock Edgar tabs)</div>
                <div><span className="si-method-key">Tickers:</span> INTELLIGENCE_TICKERS from src/lib/stocks.ts &mdash; single source of truth, alphabetical order</div>
                <div><span className="si-method-key">Self-healing:</span> ensureTable() creates seen_filings + indexes on first request</div>
              </div>

              <div className="si-method-divider" />

              {/* Fetch Pipeline */}
              <div className="si-method-section-title">Fetch Pipeline (Refresh)</div>
              <div className="si-method-flow">
                <div className="si-method-node si-method-node-accent">Fetch Filings button</div>
                <div className="si-method-arrow" />
                <div className="si-method-node">GET /api/sec-intelligence?mode=refresh</div>
                <div className="si-method-arrow" />
                <div className="si-method-node">Resolve CIK per ticker (shared cik-map.ts + dynamic fallback)</div>
                <div className="si-method-arrow" />
                <div className="si-method-node">Fetch SEC EDGAR submissions API (data.sec.gov/submissions/CIK&#123;cik&#125;.json)</div>
                <div className="si-method-arrow" />
                <div className="si-method-node">Upsert to seen_filings &mdash; preserves dismissed, hidden, status, crossRefs</div>
                <div className="si-method-arrow" />
                <div className="si-method-highlight">New filings get NEW badge (dismissed=false)</div>
              </div>
              <div className="si-method-details">
                <div><span className="si-method-key">CIK source:</span> shared src/lib/cik-map.ts (55+ entries) with dynamic fallback from SEC company_tickers.json</div>
                <div><span className="si-method-key">Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites form, filingDate, description, reportDate, fileUrl; NEVER overwrites dismissed, hidden, status, crossRefs</div>
                <div><span className="si-method-key">NEW badge:</span> dismissed=false for filings not previously in DB; dismissed via POST /api/seen-filings when user clicks badge</div>
                <div><span className="si-method-key">Concurrency:</span> all tickers fetched in parallel via Promise.allSettled</div>
              </div>

              <div className="si-method-divider" />

              {/* Shared Data */}
              <div className="si-method-section-title">Shared Data with Edgar Tab</div>
              <div className="si-method-details">
                <div><span className="si-method-key">Same table:</span> seen_filings keyed by (ticker, accession_number) &mdash; lowercase tickers</div>
                <div><span className="si-method-key">Edgar tab fetch:</span> routes through /api/sec-intelligence?mode=refresh&amp;ticker=X (same API, single EDGAR fetch path)</div>
                <div><span className="si-method-key">Edgar enrichment:</span> Edgar tab runs matchFilings() locally, saves status + crossRefs back to DB without overwriting other fields</div>
                <div><span className="si-method-key">No data loss:</span> upsert preserves all Edgar tab state (status, crossRefs, dismissed, hidden) during SEC Intelligence refreshes</div>
              </div>

              <div className="si-method-divider" />

              {/* Filters */}
              <div className="si-method-section-title">Client-Side Filters</div>
              <div className="si-method-details">
                <div><span className="si-method-key">Ticker pills:</span> dynamic &mdash; only shows tickers that have filings in current result set</div>
                <div><span className="si-method-key">Form filters:</span> 11 granular categories (8-K, 10-Q, 10-K, Form 4, Schedule 13, DEF 14A, S-1/S-3, Form 3/5, Form 144, Form D, Other) with normalizeForm() matching</div>
                <div><span className="si-method-key">Date filter:</span> 7d / 30d / 90d / All &mdash; server-side via days param on API</div>
                <div><span className="si-method-key">Search:</span> client-side text match against description, form, and ticker</div>
                <div><span className="si-method-key">Pagination:</span> 20 filings per page, resets on any filter change</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
