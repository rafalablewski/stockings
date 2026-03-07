"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { stocks, stockList } from "@/lib/stocks";
import "./press-intelligence.css";

/* ═══════════════════════════════════════════════════════════════════════════
   STOCK FEED CONFIGURATION
   Add new stocks here. The page auto-adapts — no other changes needed.
   ═══════════════════════════════════════════════════════════════════════════ */

interface FeedConfig {
  ticker: string;
  endpoint: string;
  accent: string;        // CSS variable name (cyan, violet, mint)
  color: string;         // hex for pill & badge
  colorDim: string;      // hex at 15% for badge bg
  sourceFilter: (source: string) => boolean;
  categories: Record<string, (headline: string) => boolean>;
}

const FEED_CONFIGS: FeedConfig[] = [
  {
    ticker: "ASTS",
    endpoint: "/api/asts-news",
    accent: "cyan",
    color: "#22D3EE",
    colorDim: "rgba(34,211,238,0.15)",
    sourceFilter: (src) => src.toLowerCase().includes("business wire"),
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d/i.test(h),
      Launches: (h) => /launch|bluebird|satellite|orbit|unfold|spacex/i.test(h),
      Partnerships: (h) => /partner|agreement|definitive|carrier|vodafone|verizon|at&t|telus|vi |stc/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|note repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "BMNR",
    endpoint: "/api/bmnr-news",
    accent: "violet",
    color: "#A78BFA",
    colorDim: "rgba(167,139,250,0.15)",
    sourceFilter: (src) => {
      const s = src.toLowerCase();
      return s.includes("pr newswire") || s.includes("prnewswire") || s.includes("business wire") || s.includes("accesswire") || s.includes("globe newswire");
    },
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Ethereum: (h) => /eth|ethereum|staking|crypto|digital asset|blockchain|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|name|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|warrant|stock|note repurchase|\$\d/i.test(h),
    },
  },
];

/* Build merged category set from all configs */
const ALL_CATEGORIES = (() => {
  const set = new Set<string>();
  for (const cfg of FEED_CONFIGS) {
    for (const cat of Object.keys(cfg.categories)) set.add(cat);
  }
  return ["All", ...Array.from(set)];
})();

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

const TTL = 5 * 60 * 1000;

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function PressIntelligencePage() {
  const [feedsByTicker, setFeedsByTicker] = useState<Record<string, NewsItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);

  /* Filters */
  const [activeTicker, setActiveTicker] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const cacheRef = useRef<Record<string, { data: NewsItem[]; ts: number }>>({});

  /* ── Fetch all feeds in parallel ── */
  const loadAll = useCallback(async (force = false) => {
    const results: Record<string, NewsItem[]> = {};
    const errs: Record<string, string> = {};

    await Promise.allSettled(
      FEED_CONFIGS.map(async (cfg) => {
        /* Check cache */
        const cached = cacheRef.current[cfg.ticker];
        if (!force && cached && Date.now() - cached.ts < TTL) {
          results[cfg.ticker] = cached.data;
          return;
        }
        try {
          const res = await fetch(cfg.endpoint);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const raw: any[] = json?.results?.news?.[0]?.newsitem || [];
          const filtered: NewsItem[] = raw
            .filter((item: any) => cfg.sourceFilter(item.source || ""))
            .sort((a: any, b: any) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
            .map((item: any) => ({ ...item, _ticker: cfg.ticker, _config: cfg }));
          cacheRef.current[cfg.ticker] = { data: filtered, ts: Date.now() };
          results[cfg.ticker] = filtered;
        } catch (e: any) {
          errs[cfg.ticker] = e.message;
          /* Keep stale data if available */
          const stale = cacheRef.current[cfg.ticker];
          if (stale) results[cfg.ticker] = stale.data;
        }
      })
    );

    setFeedsByTicker(results);
    setErrors(errs);
    setLastUpdated(new Date());
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadAll(true);
  };

  /* ── Merged & filtered feed ── */
  const allItems = useMemo(() => {
    let items: NewsItem[] = [];
    for (const [ticker, list] of Object.entries(feedsByTicker)) {
      if (activeTicker !== "ALL" && ticker !== activeTicker) continue;
      items = items.concat(list);
    }
    /* Sort chronologically (newest first) */
    items.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    return items;
  }, [feedsByTicker, activeTicker]);

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
        const summary = (item.summary || item.description || "").toLowerCase();
        return headline.includes(q) || summary.includes(q);
      });
    }

    return items;
  }, [allItems, activeCategory, searchQuery]);

  /* ── Aggregate stats ── */
  const stats = useMemo(() => {
    const total = allItems.length;
    const thisYear = allItems.filter((i) => isThisYear(i.datetime)).length;
    const thisMonth = allItems.filter((i) => isThisMonth(i.datetime)).length;
    const today = allItems.filter((i) => isToday(i.datetime)).length;
    const latest = allItems[0] ? formatDate(allItems[0].datetime) : "\u2014";

    const perStock: Record<string, number> = {};
    for (const cfg of FEED_CONFIGS) {
      perStock[cfg.ticker] = (feedsByTicker[cfg.ticker] || []).length;
    }

    return { total, thisYear, thisMonth, today, latest, perStock };
  }, [allItems, feedsByTicker]);

  /* ── Has errors? ── */
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="pi-app">
      {/* ── Sticky Header ── */}
      <div className="pi-header">
        <div className="pi-title-row">
          <div className="pi-brand">
            <div className="pi-pulse" />
            <div>
              <div className="pi-title">Press Intelligence</div>
              <div className="pi-subtitle">Real-time wire feed</div>
            </div>
          </div>

          <div className="pi-controls">
            <div className="pi-search-wrap">
              <span className="pi-search-icon">/</span>
              <input
                className="pi-search"
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="pi-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
              <span style={{ display: "inline-block", animation: refreshing ? "pi-spin 0.8s linear infinite" : "none" }}>
                &#x27F3;
              </span>
              Refresh
            </button>
          </div>
        </div>

        {/* ── KPI Strip ── */}
        {!loading && (
          <div className="pi-kpi-strip">
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.total}</span>
              <span className="pi-kpi-label">Total</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.today}</span>
              <span className="pi-kpi-label">Today</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.thisMonth}</span>
              <span className="pi-kpi-label">This Month</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.thisYear}</span>
              <span className="pi-kpi-label">This Year</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value" style={{ fontSize: 13 }}>{stats.latest}</span>
              <span className="pi-kpi-label">Latest</span>
            </div>

            {/* Per-stock counts */}
            <div style={{ marginLeft: "auto" }}>
              <div className="pi-stock-summary">
                {FEED_CONFIGS.map((cfg) => (
                  <div key={cfg.ticker} className="pi-stock-stat">
                    <span className="pi-stock-dot" style={{ background: cfg.color }} />
                    <span className="pi-stock-stat-count">{stats.perStock[cfg.ticker] || 0}</span>
                    <span className="pi-stock-stat-label">{cfg.ticker}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Filter Bar ── */}
        <div className="pi-filter-bar">
          {/* Stock pills */}
          <button
            className="pi-stock-pill"
            data-active={activeTicker === "ALL"}
            style={{ '--pill-color': 'var(--text)' } as React.CSSProperties}
            onClick={() => setActiveTicker("ALL")}
          >
            ALL
          </button>
          {FEED_CONFIGS.map((cfg) => (
            <button
              key={cfg.ticker}
              className="pi-stock-pill"
              data-active={activeTicker === cfg.ticker}
              style={{ '--pill-color': cfg.color } as React.CSSProperties}
              onClick={() => setActiveTicker(cfg.ticker)}
            >
              {cfg.ticker}
            </button>
          ))}

          <div className="pi-divider" />

          {/* Category tabs */}
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="pi-cat-tab"
              data-active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="pi-feed">
        {/* Loading skeletons */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="pi-skeleton" style={{ opacity: 1 - i * 0.08 }} />
        ))}

        {/* Errors */}
        {!loading && hasErrors && (
          <div style={{ padding: "12px 0 8px" }}>
            {Object.entries(errors).map(([ticker, msg]) => (
              <div key={ticker} className="pi-empty" style={{ padding: "8px 0" }}>
                <span className="pi-error">{ticker}: {msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !hasErrors && visibleItems.length === 0 && (
          <div className="pi-empty">
            {searchQuery ? `No results for "${searchQuery}"` : "No releases match current filters"}
          </div>
        )}

        {/* News cards */}
        {!loading && visibleItems.map((item) => {
          const id = `${item._ticker}-${item.newsid || item.id}`;
          const expanded = expandedId === id;
          const headline = item.headline || item.title || "";
          const summary = item.summary || item.description || "";
          const date = formatDate(item.datetime);
          const time = formatTime(item.datetime);
          const source = (item.source || "").split(" ").slice(0, 2).join(" ");
          const cfg = item._config;
          const link = `https://feeds.issuerdirect.com/news-release.html?newsid=${item.newsid || item.id}&symbol=${cfg.ticker}`;

          return (
            <div
              key={id}
              className="pi-card"
              data-expanded={expanded}
              onClick={() => setExpandedId(expanded ? null : id)}
            >
              <div className="pi-card-inner">
                <div className="pi-card-top">
                  <span
                    className="pi-card-ticker"
                    style={{
                      '--ticker-color': cfg.color,
                      '--ticker-bg': cfg.colorDim,
                    } as React.CSSProperties}
                  >
                    {cfg.ticker}
                  </span>
                  <span className="pi-card-headline">{headline}</span>
                  <div className="pi-card-meta">
                    <span className="pi-card-source">{source}</span>
                    <span className="pi-card-date">
                      {isToday(item.datetime) ? time : date}
                    </span>
                  </div>
                </div>
              </div>

              {expanded && (
                <div className="pi-card-expand">
                  {summary && <div className="pi-card-summary">{summary}</div>}
                  <div className="pi-card-actions">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pi-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2197; Full Release
                    </a>
                    <a
                      href={`/stocks/${cfg.ticker}`}
                      className="pi-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2192; {stocks[cfg.ticker]?.name || cfg.ticker} Research
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Timestamp */}
        {lastUpdated && !loading && (
          <div className="pi-timestamp">
            Last updated {lastUpdated.toLocaleTimeString()} &middot; {visibleItems.length} of {allItems.length} releases
          </div>
        )}
      </div>
    </div>
  );
}
