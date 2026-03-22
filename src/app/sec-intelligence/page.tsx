"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks, INTELLIGENCE_TICKERS } from "@/lib/stocks";
import IntelligenceShell, {
  type IxKpi,
  type IxStockStat,
  type IxTickerPill,
  type IxTypeTab,
  type IxCardItem,
} from "@/components/shared/IntelligenceShell";
import "./sec-feed.css";

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

/** Get current NYC date as YYYY-MM-DD ('en-ca' locale reliably gives this format) */
const getNYCDateString = () =>
  new Date().toLocaleDateString('en-ca', { timeZone: 'America/New_York' });

const isFilingToday = (dateStr: string) => {
  if (!dateStr) return false;
  return dateStr === getNYCDateString();
};

const isThisMonth = (dateStr: string) => {
  if (!dateStr) return false;
  return dateStr.slice(0, 7) === getNYCDateString().slice(0, 7);
};

const isThisYear = (dateStr: string) => {
  if (!dateStr) return false;
  return dateStr.slice(0, 4) === getNYCDateString().slice(0, 4);
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

  /* ── Load filings (DB-first on mount, refresh fetches from SEC) ──
     Always loads ALL filings (no days param). Date filtering is client-side,
     matching the Press Intelligence architecture. */
  const loadFilings = useCallback(async (mode: "db" | "refresh" = "db") => {
    try {
      const params = new URLSearchParams({ mode, limit: '200' });
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
  }, []);

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

  /* ── Date-filtered filings (matching Press Intelligence: client-side date filter) ── */
  const allFilings = useMemo(() => {
    if (!data?.filings) return [];
    if (daysFilter <= 0) return data.filings;
    const cutoff = new Date(Date.now() - daysFilter * 86400000).toISOString().slice(0, 10);
    return data.filings.filter(f => (f.filingDate || '') >= cutoff);
  }, [data, daysFilter]);

  /* ── Build dynamic form filter options from actual data ── */
  const activeFormFilters = useMemo(() => {
    if (allFilings.length === 0) return [];
    // Only show filters that match at least one filing in current ticker scope
    const scopedFilings = activeTicker !== "ALL"
      ? allFilings.filter(f => f.ticker === activeTicker)
      : allFilings;

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
  }, [allFilings, activeTicker]);

  /* ── Filtered filings ── */
  const filteredFilings = useMemo(() => {
    let filings = allFilings;

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
        const company = (data?.tickerStats[f.ticker]?.companyName || "").toLowerCase();
        return desc.includes(q) || form.includes(q) || ticker.includes(q) || company.includes(q);
      });
    }

    return filings;
  }, [allFilings, activeTicker, activeForm, searchQuery, data]);

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

  /* ── Stats (matching Press Intelligence layout) ──
     Uses allFilings (date-filtered, like Press uses feedsByTicker).
     perStock counts per-ticker from the date-filtered set. */
  const stats = useMemo(() => {
    if (allFilings.length === 0) return { total: 0, today: 0, thisMonth: 0, thisYear: 0, latest: "\u2014", newFilings: 0, perStock: {} as Record<string, number> };

    let today = 0;
    let thisMonth = 0;
    let thisYear = 0;

    for (const f of allFilings) {
      if (isFilingToday(f.filingDate)) today++;
      if (isThisMonth(f.filingDate)) thisMonth++;
      if (isThisYear(f.filingDate)) thisYear++;
    }

    const latest = allFilings[0] ? formatDate(allFilings[0].filingDate) : "\u2014";

    const perStock: Record<string, number> = {};
    for (const ticker of allTickers) perStock[ticker] = 0;
    for (const f of allFilings) {
      if (perStock[f.ticker] !== undefined) perStock[f.ticker]++;
    }

    return {
      total: allFilings.length,
      today,
      thisMonth,
      thisYear,
      latest,
      newFilings: newCount,
      perStock,
    };
  }, [allFilings, newCount, allTickers]);

  const hasErrors = data?.errors && Object.keys(data.errors).length > 0;
  const isEmpty = !loading && data?.filings?.length === 0 && !hasErrors;

  /* ── Build IntelligenceShell props ── */

  const kpis: IxKpi[] = [
    { value: stats.total, label: "Total" },
    { value: stats.today, label: "Today" },
    { value: stats.thisMonth, label: "This Month" },
    { value: stats.thisYear, label: "This Year" },
    { value: stats.latest, label: "Latest", small: true },
    ...(stats.newFilings > 0
      ? [{ value: stats.newFilings, label: "Unseen", valueColor: "var(--violet, #A78BFA)" } as IxKpi]
      : []),
  ];

  const stockStats: IxStockStat[] = allTickers.map((ticker) => ({
    ticker,
    count: stats.perStock[ticker] || 0,
    onClick: () => setActiveTicker(activeTicker === ticker ? "ALL" : ticker),
  }));

  const tickerPills: IxTickerPill[] = allTickers.map((ticker) => ({
    ticker,
  }));

  const typeTabs: IxTypeTab[] = [
    { key: "All", label: "All" },
    ...activeFormFilters.map((ff) => ({
      key: ff.key,
      label: ff.label,
      count: ff.count,
    })),
  ];

  const resultText = filteredFilings.length > 0 ? (
    <>
      <strong>{(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, filteredFilings.length)}</strong> of {filteredFilings.length} filings
      {activeTicker !== "ALL" && <> &middot; {activeTicker}</>}
      {activeForm !== "All" && <> &middot; {activeForm}</>}
      {searchQuery && <> &middot; &ldquo;{searchQuery}&rdquo;</>}
    </>
  ) : undefined;

  const items: IxCardItem[] = pagedFilings.map((filing) => {
    const id = `${filing.ticker}:${filing.accessionNumber}`;
    const companyName = data?.tickerStats[filing.ticker]?.companyName || filing.ticker;
    const formCategory = getFormCategory(filing.form);
    const isNew = !filing.dismissed && !dismissedLocal.has(id);

    return {
      id,
      ticker: filing.ticker,
      accent: undefined,
      title: filing.primaryDocDescription || filing.form,
      badge: <span className="ix-form-badge" data-form={formCategory}>{filing.form}</span>,
      source: companyName,
      date: formatDate(filing.filingDate),
      isNew,
      onDismiss: () => handleDismiss(filing),
      expandContent: (
        <>
          <div className="ix-card-body">
            <div className="ix-card-detail-row">
              <span className="ix-card-detail-label">Company</span>
              <span className="ix-card-detail-value">{companyName}</span>
            </div>
            <div className="ix-card-detail-row">
              <span className="ix-card-detail-label">Form Type</span>
              <span className="ix-card-detail-value">{filing.form}</span>
            </div>
            <div className="ix-card-detail-row">
              <span className="ix-card-detail-label">Filed</span>
              <span className="ix-card-detail-value">{formatDate(filing.filingDate)}</span>
            </div>
            {filing.reportDate && (
              <div className="ix-card-detail-row">
                <span className="ix-card-detail-label">Period</span>
                <span className="ix-card-detail-value">{formatDate(filing.reportDate)}</span>
              </div>
            )}
            <div className="ix-card-detail-row">
              <span className="ix-card-detail-label">Accession</span>
              <span className="ix-card-detail-value">{filing.accessionNumber}</span>
            </div>
          </div>
          <div className="ix-card-actions">
            <a
              href={filing.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ix-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              &#x2197; View Filing on SEC
            </a>
            <a
              href={`/research/${filing.ticker}`}
              className="ix-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              &#x2192; {stocks[filing.ticker]?.name || filing.ticker} Research
            </a>
          </div>
        </>
      ),
    };
  });

  const timestampText = data?.fetchedAt
    ? `Last updated ${new Date(data.fetchedAt).toLocaleTimeString()} \u00b7 ${filteredFilings.length} of ${data.totalCount} filings${data.mode === "db" ? " (from database)" : ""}`
    : undefined;

  const methodologySection = (
    <div className="ix-methodology">
      <div
        className="ix-methodology-header"
        onClick={() => setMethodologyOpen(prev => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={methodologyOpen}
        onKeyDown={(e) => e.key === "Enter" && setMethodologyOpen(prev => !prev)}
      >
        <span className="ix-methodology-label">Methodology</span>
        <span className="ix-methodology-toggle">{methodologyOpen ? "\u2212" : "+"}</span>
      </div>
      {methodologyOpen && (
        <div className="ix-methodology-body">
          {/* DB-First Architecture */}
          <div className="ix-method-section-title">DB-First Architecture</div>
          <div className="ix-method-flow">
            <div className="ix-method-node">Page loads</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node ix-method-node-accent">GET /api/sec-intelligence?mode=db</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node">Load all filings from seen_filings table (Neon PostgreSQL)</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-highlight">Render from DB &mdash; no SEC API calls on mount</div>
          </div>
          <div className="ix-method-details">
            <div><span className="ix-method-key">Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_filings table (shared with per-stock Edgar tabs)</div>
            <div><span className="ix-method-key">Tickers:</span> INTELLIGENCE_TICKERS from src/lib/stocks.ts &mdash; single source of truth, alphabetical order</div>
            <div><span className="ix-method-key">Self-healing:</span> ensureTable() creates seen_filings + indexes on first request</div>
          </div>

          <div className="ix-method-divider" />

          {/* Fetch Pipeline */}
          <div className="ix-method-section-title">Fetch Pipeline (Refresh)</div>
          <div className="ix-method-flow">
            <div className="ix-method-node ix-method-node-accent">Fetch Filings button</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node">GET /api/sec-intelligence?mode=refresh</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node">Resolve CIK per ticker (shared cik-map.ts + dynamic fallback)</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node">Fetch SEC EDGAR submissions API (data.sec.gov/submissions/CIK&#123;cik&#125;.json)</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-node">Upsert to seen_filings &mdash; preserves dismissed, hidden, status, crossRefs</div>
            <div className="ix-method-arrow" />
            <div className="ix-method-highlight">New filings get NEW badge (dismissed=false)</div>
          </div>
          <div className="ix-method-details">
            <div><span className="ix-method-key">CIK source:</span> shared src/lib/cik-map.ts (55+ entries) with dynamic fallback from SEC company_tickers.json</div>
            <div><span className="ix-method-key">Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites form, filingDate, description, reportDate, fileUrl; NEVER overwrites dismissed, hidden, status, crossRefs</div>
            <div><span className="ix-method-key">NEW badge:</span> dismissed=false for filings not previously in DB; dismissed via POST /api/seen-filings when user clicks badge</div>
            <div><span className="ix-method-key">Concurrency:</span> all tickers fetched in parallel via Promise.allSettled</div>
          </div>

          <div className="ix-method-divider" />

          {/* Shared Data */}
          <div className="ix-method-section-title">Shared Data with Edgar Tab</div>
          <div className="ix-method-details">
            <div><span className="ix-method-key">Same table:</span> seen_filings keyed by (ticker, accession_number) &mdash; lowercase tickers</div>
            <div><span className="ix-method-key">Edgar tab fetch:</span> routes through /api/sec-intelligence?mode=refresh&amp;ticker=X (same API, single EDGAR fetch path)</div>
            <div><span className="ix-method-key">Edgar enrichment:</span> Edgar tab runs matchFilings() locally, saves status + crossRefs back to DB without overwriting other fields</div>
            <div><span className="ix-method-key">No data loss:</span> upsert preserves all Edgar tab state (status, crossRefs, dismissed, hidden) during SEC Intelligence refreshes</div>
          </div>

          <div className="ix-method-divider" />

          {/* Filters */}
          <div className="ix-method-section-title">Client-Side Filters</div>
          <div className="ix-method-details">
            <div><span className="ix-method-key">Ticker pills:</span> dynamic &mdash; only shows tickers that have filings in current result set</div>
            <div><span className="ix-method-key">Form filters:</span> 11 granular categories (8-K, 10-Q, 10-K, Form 4, Schedule 13, DEF 14A, S-1/S-3, Form 3/5, Form 144, Form D, Other) with normalizeForm() matching</div>
            <div><span className="ix-method-key">Date filter:</span> 7d / 30d / 90d / All &mdash; server-side via days param on API</div>
            <div><span className="ix-method-key">Search:</span> client-side text match against description, form, and ticker</div>
            <div><span className="ix-method-key">Pagination:</span> 20 filings per page, resets on any filter change</div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <IntelligenceShell
      accentColor="#A78BFA"
      accentDim="rgba(167,139,250,0.15)"
      title="SEC Intelligence"
      subtitle="EDGAR filings feed &middot; DB-first"
      searchPlaceholder="Search filings..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      daysFilter={daysFilter}
      onDaysChange={setDaysFilter}
      daysOptions={DAYS_OPTIONS}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      refreshLabel="Fetch Filings"
      loading={loading}
      kpis={kpis}
      stockStats={stockStats}
      tickers={tickerPills}
      activeTicker={activeTicker}
      onTickerChange={setActiveTicker}
      typeTabs={typeTabs}
      activeType={activeForm}
      onTypeChange={(key) => setActiveForm(activeForm === key && key !== "All" ? "All" : key)}
      typeLabel="Form"
      showClear={activeTicker !== "ALL" || activeForm !== "All" || !!searchQuery}
      onClear={() => { setActiveTicker("ALL"); setActiveForm("All"); setSearchQuery(""); }}
      resultText={resultText}
      items={items}
      expandedId={expandedId}
      onExpandToggle={setExpandedId}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      timestampText={timestampText}
      isEmpty={isEmpty}
      emptyText='No filings in database yet. Click "Fetch Filings" to load from SEC EDGAR.'
      errors={data?.errors}
      noResults={!isEmpty && !hasErrors && filteredFilings.length === 0}
      noResultsText={searchQuery ? `No filings matching "${searchQuery}"` : "No filings match current filters"}
      afterFeed={methodologySection}
    />
  );
}
