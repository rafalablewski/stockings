"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks, stockList, INTELLIGENCE_TICKERS } from "@/lib/stocks";
import IntelligenceShell from "@/components/shared/IntelligenceShell";
import type { IxKpi, IxStockStat, IxTickerPill, IxTypeTab, IxCardItem } from "@/components/shared/IntelligenceShell";
import "./press-feed.css";
import {
  type FeedConfig,
  normalizeHeadline,
  FEED_CONFIGS,
  FEED_CONFIGS_SORTED,
  ALL_CATEGORIES,
} from "@/data/press-feed-configs";

/* ═══════════════════════════════════════════════════════════════════════════ */

interface NewsItem {
  newsid?: string;
  id?: string;
  headline?: string;
  title?: string;
  summary?: string;
  description?: string;
  datetime: string;
  source?: string;
  _ticker: string;      // injected after fetch
  _config: FeedConfig;   // injected after fetch
  _inDb?: boolean;       // true if item was already stored in database
}

const formatDate = (str: string) => {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (str: string) => {
  if (!str) return "";
  const d = new Date(str);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m} ${ampm}`;
};

const isThisYear = (str: string) => new Date(str).getFullYear() === new Date().getFullYear();
const isThisMonth = (str: string) => {
  const d = new Date(str);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
};

const isToday = (str: string) => {
  const d = new Date(str);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
};

/* ═══════════════════════════════════════════════════════════════════════════ */

/* ── Methodology types ── */
interface MethodologySource {
  name: string;
  type: string;
  detail: string;
  sourceFilter?: string;
}

interface MethodologyData {
  ticker: string;
  grade: string;
  type: string;
  sources: MethodologySource[];
  headlineFilter: string | null;
  dbStats?: {
    totalRows: number;
    oldest: string;
    newest: string;
    distinctSources: number;
    topSources: { source: string; count: number }[];
  };
}

export default function PressIntelligencePage() {
  const [feedsByTicker, setFeedsByTicker] = useState<Record<string, NewsItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [refreshLog, setRefreshLog] = useState<string[]>([]);

  /* Methodology popup */
  const [methodologyTicker, setMethodologyTicker] = useState<string | null>(null);
  const [methodologyData, setMethodologyData] = useState<MethodologyData | null>(null);
  const [methodologyLoading, setMethodologyLoading] = useState(false);

  const openMethodology = useCallback(async (ticker: string) => {
    setMethodologyTicker(ticker);
    setMethodologyLoading(true);
    setMethodologyData(null);
    try {
      const res = await fetch(`/api/press-intelligence?ticker=${ticker}&mode=methodology`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMethodologyData(data);
    } catch (e: any) {
      setMethodologyData(null);
    }
    setMethodologyLoading(false);
  }, []);

  /* Filters */
  const [activeTicker, setActiveTicker] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState(30);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /* ── Fetch all feeds in parallel ── */
  const loadAll = useCallback(async (mode: "db" | "refresh" = "db") => {
    const results: Record<string, NewsItem[]> = {};
    const errs: Record<string, string> = {};
    const isRefresh = mode === "refresh";
    const log = (msg: string) => {
      if (isRefresh) setRefreshLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    if (isRefresh) {
      log(`Starting refresh for ${FEED_CONFIGS.length} tickers...`);
    }

    let completed = 0;
    await Promise.allSettled(
      FEED_CONFIGS.map(async (cfg) => {
        try {
          if (isRefresh) log(`${cfg.ticker}: fetching upstream + DB persist...`);
          const url = `${cfg.endpoint}&mode=${mode}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const parse = cfg.parseResponse || ((j: any) => j?.results?.news?.[0]?.newsitem || []);
          const raw: any[] = parse(json);
          const filtered: NewsItem[] = raw
            .filter((item: any) => cfg.sourceFilter(item.source || "") && cfg.headlineFilter(item.headline || item.title || ""))
            .sort((a: any, b: any) => { const da = a.datetime || ''; const db = b.datetime || ''; return db > da ? 1 : db < da ? -1 : 0; })
            .map((item: any) => ({ ...item, _ticker: cfg.ticker, _config: cfg }));
          results[cfg.ticker] = filtered;
          if (isRefresh) log(`${cfg.ticker}: ✓ ${filtered.length} items`);
        } catch (e: any) {
          errs[cfg.ticker] = e.message;
          if (isRefresh) log(`${cfg.ticker}: ✗ error — ${e.message}`);
        } finally {
          completed++;
          if (isRefresh) log(`Progress: ${completed}/${FEED_CONFIGS.length} done`);
        }
      })
    );

    const totalItems = Object.values(results).reduce((sum, list) => sum + list.length, 0);
    // Compute deduplicated count (same logic as allItems useMemo) so the log
    // matches the "X of Y releases" display the user sees after refresh.
    const seenHl = new Set<string>();
    let dedupedTotal = 0;
    for (const list of Object.values(results)) {
      for (const item of list) {
        const key = normalizeHeadline((item as any).headline || (item as any).title || "");
        if (!key || key.length < 4 || !seenHl.has(key)) {
          if (key && key.length >= 4) seenHl.add(key);
          dedupedTotal++;
        }
      }
    }
    const errorCount = Object.keys(errs).length;
    if (isRefresh) {
      log(`Refresh complete: ${dedupedTotal} total items${dedupedTotal !== totalItems ? ` (${totalItems} before cross-ticker dedup)` : ''}, ${errorCount} errors`);
      log(`All data read from database — no cache or in-memory state used`);
    }

    setFeedsByTicker(results);
    setErrors(errs);
    setLastUpdated(new Date());
    setLoading(false);
    setRefreshing(false);
  }, []);

  /* Page load: serve from database only */
  useEffect(() => { loadAll("db"); }, [loadAll]);

  /* Refresh button: fetch upstream, compare with DB, mark new items */
  const handleRefresh = () => {
    setRefreshLog([]);
    setRefreshing(true);
    loadAll("refresh");
  };

  /* ── Merged & filtered feed ── */
  const allItems = useMemo(() => {
    let items: NewsItem[] = [];
    for (const [ticker, list] of Object.entries(feedsByTicker)) {
      if (activeTicker !== "ALL" && ticker !== activeTicker) continue;
      items = items.concat(list);
    }
    /* Deduplicate across tickers — same headline from multiple sources/topics */
    const seenHl = new Set<string>();
    items = items.filter((item) => {
      const key = normalizeHeadline(item.headline || item.title || "");
      if (!key || key.length < 4) return true; // keep items with no meaningful headline
      if (seenHl.has(key)) return false;
      seenHl.add(key);
      return true;
    });
    /* Date filter */
    if (daysFilter > 0) {
      const cutoff = new Date(Date.now() - daysFilter * 86400000).toISOString();
      items = items.filter((i) => (i.datetime || '') >= cutoff);
    }
    /* Sort chronologically (newest first) — string comparison works for both
       ISO 8601 ("2026-03-16T09:00:00.000Z") and PostgreSQL text format
       ("2026-03-16 09:00:00+00") since both start with YYYY-MM-DD */
    items.sort((a, b) => {
      const da = a.datetime || '';
      const db = b.datetime || '';
      return db > da ? 1 : db < da ? -1 : 0;
    });
    return items;
  }, [feedsByTicker, activeTicker, daysFilter]);

  const visibleItems = useMemo(() => {
    let items = allItems;

    /* Category filter */
    if (activeCategory !== "All") {
      items = items.filter((item) => {
        const headline = item.headline || item.title || "";
        const cfg = item._config;
        const fn = cfg.categories[activeCategory];
        return fn ? fn(headline) : false;
      });
    }

    /* Search filter */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) => {
        const headline = (item.headline || item.title || "").toLowerCase();
        const summary = (item.summary || (item as any).qmsummary || item.description || "").toLowerCase();
        return headline.includes(q) || summary.includes(q);
      });
    }

    return items;
  }, [allItems, activeCategory, searchQuery]);

  /* Reset to page 1 when filters change */
  useEffect(() => { setPage(1); }, [activeTicker, activeCategory, searchQuery, daysFilter]);

  /* ── Pagination ── */
  const PAGE_SIZE = 20;
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
  const pagedItems = visibleItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Aggregate stats ── */
  const stats = useMemo(() => {
    const total = allItems.length;
    const thisYear = allItems.filter((i) => isThisYear(i.datetime)).length;
    const thisMonth = allItems.filter((i) => isThisMonth(i.datetime)).length;
    const today = allItems.filter((i) => isToday(i.datetime)).length;
    const latest = allItems[0] ? formatDate(allItems[0].datetime) : "\u2014";

    const perStock: Record<string, number> = {};
    for (const cfg of FEED_CONFIGS_SORTED) {
      perStock[cfg.ticker] = (feedsByTicker[cfg.ticker] || []).length;
    }

    return { total, thisYear, thisMonth, today, latest, perStock };
  }, [allItems, feedsByTicker]);

  /* ── Has errors? ── */
  const hasErrors = Object.keys(errors).length > 0;

  /* ── Build IntelligenceShell props ── */

  const kpis: IxKpi[] = [
    { value: stats.total, label: "Total" },
    { value: stats.today, label: "Today" },
    { value: stats.thisMonth, label: "This Month" },
    { value: stats.thisYear, label: "This Year" },
    { value: stats.latest, label: "Latest", small: true },
  ];

  const stockStatItems: IxStockStat[] = FEED_CONFIGS_SORTED.map((cfg) => ({
    ticker: cfg.ticker,
    count: stats.perStock[cfg.ticker] || 0,
    accent: cfg.accent,
    grade: cfg.grade,
    onClick: () => openMethodology(cfg.ticker),
  }));

  const tickerPills: IxTickerPill[] = FEED_CONFIGS_SORTED.map((cfg) => ({
    ticker: cfg.ticker,
    accent: cfg.accent,
    grade: cfg.grade,
  }));

  const typeTabs: IxTypeTab[] = ALL_CATEGORIES.map((cat) => ({
    key: cat,
    label: cat,
    ...(activeCategory === cat && cat !== "All" ? { count: visibleItems.length } : {}),
  }));

  const cardItems: IxCardItem[] = pagedItems.map((item) => {
    const id = `${item._ticker}-${normalizeHeadline(item.headline || item.title || "")}`;
    const headline = item.headline || item.title || "";
    const summary = item.summary || (item as any).qmsummary || item.description || "";
    const date = formatDate(item.datetime);
    const time = formatTime(item.datetime);
    const source = (item.source || "").split(" ").slice(0, 2).join(" ");
    const cfg = item._config;
    const permalink = (item as any).permalink || (item as any).storyurl || "";
    const link = permalink && permalink.startsWith("http")
      ? permalink
      : `https://feeds.issuerdirect.com/news-release.html?newsid=${item.newsid || item.id}&symbol=${cfg.ticker}`;

    return {
      id,
      ticker: cfg.ticker,
      accent: cfg.accent,
      title: headline,
      source,
      date: isToday(item.datetime) ? time : date,
      isNew: !item._inDb,
      expandContent: (
        <>
          {summary && <div className="ix-card-body">{summary}</div>}
          <div className="ix-card-actions">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="ix-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              &#x2197; Full Release
            </a>
            <a
              href={`/research/${cfg.ticker}`}
              className="ix-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              &#x2192; {stocks[cfg.ticker]?.name || cfg.ticker} Research
            </a>
          </div>
        </>
      ),
    };
  });

  const resultText = visibleItems.length > 0 ? (
    <>
      <strong>{(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, visibleItems.length)}</strong> of {visibleItems.length} releases
      {activeTicker !== "ALL" && <> &middot; {activeTicker}</>}
      {activeCategory !== "All" && <> &middot; {activeCategory}</>}
      {searchQuery && <> &middot; &ldquo;{searchQuery}&rdquo;</>}
    </>
  ) : undefined;

  const timestampText = lastUpdated
    ? `Last updated ${lastUpdated.toLocaleTimeString()} \u00b7 ${visibleItems.length} of ${allItems.length} releases`
    : undefined;

  const methodologyModal = methodologyTicker ? (
    <div className="ix-modal-overlay" onClick={() => setMethodologyTicker(null)}>
      <div className="ix-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ix-modal-header">
          <h2 className="ix-modal-title">
            {methodologyTicker} &mdash; Data Methodology
          </h2>
          <button className="ix-modal-close" onClick={() => setMethodologyTicker(null)}>
            &times;
          </button>
        </div>

        {methodologyLoading && (
          <div className="ix-modal-body">
            <div className="ix-modal-loading">Loading methodology...</div>
          </div>
        )}

        {!methodologyLoading && methodologyData && (
          <div className="ix-modal-body">
            {/* Grade & type */}
            <div className="ix-method-section">
              <div className="ix-method-row">
                <span className="ix-method-label">Grade</span>
                <span className="ix-method-value">
                  <span className="ix-grade-dot-lg" data-grade={methodologyData.grade} />
                  {methodologyData.grade}
                </span>
              </div>
              <div className="ix-method-row">
                <span className="ix-method-label">Fetcher Type</span>
                <span className="ix-method-value">{methodologyData.type}</span>
              </div>
            </div>

            {/* Sources */}
            <div className="ix-method-section">
              <h3 className="ix-method-heading">Data Sources</h3>
              {methodologyData.sources.map((src, i) => (
                <div key={i} className="ix-method-source">
                  <div className="ix-method-source-header">
                    <span className="ix-method-source-name">{src.name}</span>
                    <span className="ix-method-source-type" data-type={src.type}>
                      {src.type}
                    </span>
                  </div>
                  <div className="ix-method-source-detail">{src.detail}</div>
                  {src.sourceFilter && (
                    <div className="ix-method-source-detail">
                      <strong>Source filter:</strong> {src.sourceFilter}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Headline filter */}
            {methodologyData.headlineFilter && (
              <div className="ix-method-section">
                <h3 className="ix-method-heading">Headline Filter</h3>
                <code className="ix-method-code">{methodologyData.headlineFilter}</code>
              </div>
            )}

            {/* DB stats */}
            {methodologyData.dbStats && (
              <div className="ix-method-section">
                <h3 className="ix-method-heading">Database Statistics</h3>
                <div className="ix-method-row">
                  <span className="ix-method-label">Total rows</span>
                  <span className="ix-method-value">{methodologyData.dbStats.totalRows.toLocaleString()}</span>
                </div>
                <div className="ix-method-row">
                  <span className="ix-method-label">Date range</span>
                  <span className="ix-method-value">
                    {methodologyData.dbStats.oldest ? formatDate(methodologyData.dbStats.oldest) : "n/a"}
                    {" "}&mdash;{" "}
                    {methodologyData.dbStats.newest ? formatDate(methodologyData.dbStats.newest) : "n/a"}
                  </span>
                </div>
                <div className="ix-method-row">
                  <span className="ix-method-label">Distinct sources</span>
                  <span className="ix-method-value">{methodologyData.dbStats.distinctSources}</span>
                </div>
                {methodologyData.dbStats.topSources && methodologyData.dbStats.topSources.length > 0 && (
                  <>
                    <h4 className="ix-method-subheading">Top Sources in DB</h4>
                    <div className="ix-method-table">
                      {methodologyData.dbStats.topSources.map((s, i) => (
                        <div key={i} className="ix-method-table-row">
                          <span className="ix-method-table-source">{s.source}</span>
                          <span className="ix-method-table-count">{s.count.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Frontend count */}
            <div className="ix-method-section">
              <h3 className="ix-method-heading">Frontend Display</h3>
              <div className="ix-method-row">
                <span className="ix-method-label">Items shown</span>
                <span className="ix-method-value">
                  {stats.perStock[methodologyTicker] || 0} (after source + headline filters)
                </span>
              </div>
            </div>
          </div>
        )}

        {!methodologyLoading && !methodologyData && (
          <div className="ix-modal-body">
            <div className="ix-modal-loading">Failed to load methodology data.</div>
          </div>
        )}
      </div>
    </div>
  ) : undefined;

  return (
    <IntelligenceShell
      accentColor="#00D2BF"
      accentDim="rgba(0,210,190,0.12)"
      title="Press Intelligence"
      subtitle="Real-time wire feed"
      searchPlaceholder="Search headlines..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      daysFilter={daysFilter}
      onDaysChange={setDaysFilter}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      refreshLabel="Refresh"
      refreshLog={refreshLog}
      onClearLog={() => setRefreshLog([])}
      loading={loading}
      kpis={kpis}
      stockStats={stockStatItems}
      tickers={tickerPills}
      activeTicker={activeTicker}
      onTickerChange={setActiveTicker}
      typeTabs={typeTabs}
      activeType={activeCategory}
      onTypeChange={setActiveCategory}
      typeLabel="Type"
      showClear={activeTicker !== "ALL" || activeCategory !== "All" || !!searchQuery || daysFilter !== 30}
      onClear={() => { setActiveTicker("ALL"); setActiveCategory("All"); setSearchQuery(""); setDaysFilter(30); }}
      resultText={resultText}
      items={cardItems}
      expandedId={expandedId}
      onExpandToggle={setExpandedId}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      timestampText={timestampText}
      isEmpty={!loading && !hasErrors && allItems.length === 0}
      emptyText="No releases match current filters"
      errors={errors}
      noResults={!loading && !hasErrors && allItems.length > 0 && visibleItems.length === 0}
      noResultsText={searchQuery ? `No results for "${searchQuery}"` : "No releases match current filters"}
      overlay={methodologyModal}
    />
  );
}
