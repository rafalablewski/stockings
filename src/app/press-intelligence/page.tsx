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
  headlineFilter: (headline: string) => boolean;  // relevance gate — must mention company
  parseResponse?: (json: any) => any[];  // custom response parser (default: QuoteMedia nested)
  categories: Record<string, (headline: string) => boolean>;
}

const FEED_CONFIGS: FeedConfig[] = [
  {
    ticker: "ASTS",
    endpoint: "/api/press-intelligence?ticker=ASTS",
    accent: "cyan",
    color: "#22D3EE",
    colorDim: "rgba(34,211,238,0.15)",
    sourceFilter: (src) => src.toLowerCase().includes("business wire"),
    headlineFilter: (h) => /ast\s*spacemobile|asts/i.test(h),
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d/i.test(h),
      Launches: (h) => /launch|bluebird|satellite|orbit|unfold|spacex/i.test(h),
      Partnerships: (h) => /partner|agreement|definitive|carrier|vodafone|verizon|at&t|telus|vi |stc/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|note repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "BMNR",
    endpoint: "/api/press-intelligence?ticker=BMNR",
    accent: "violet",
    color: "#A78BFA",
    colorDim: "rgba(167,139,250,0.15)",
    sourceFilter: (src) => {
      const s = src.toLowerCase();
      return s.includes("pr newswire") || s.includes("prnewswire") || s.includes("business wire") || s.includes("accesswire") || s.includes("globe newswire");
    },
    headlineFilter: (h) => /bitmine|bmnr|bit\s*mine/i.test(h),
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Ethereum: (h) => /eth|ethereum|staking|crypto|digital asset|blockchain|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|name|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|warrant|stock|note repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "IRDM",
    endpoint: "/api/press-intelligence?ticker=IRDM",
    accent: "gold",
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "iridium"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|iot|certus|l-band|constellation/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|dod/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "GSAT",
    endpoint: "/api/press-intelligence?ticker=GSAT",
    accent: "orange",
    color: "#FB923C",
    colorDim: "rgba(251,146,60,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "globalstar"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|spectrum|band|constellation|apple/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|apple|qualcomm|government/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "VZ",
    endpoint: "/api/press-intelligence?ticker=VZ",
    accent: "rose",
    color: "#F472B6",
    colorDim: "rgba(244,114,182,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "verizon"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      "5G & Network": (h) => /5g|network|spectrum|fios|wireless|broadband|c-band|mmwave|lte/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|deal|alliance/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "T",
    endpoint: "/api/press-intelligence?ticker=T",
    accent: "sky",
    color: "#38BDF8",
    colorDim: "rgba(56,189,248,0.15)",
    sourceFilter: () => true,  // API pre-filters across 5 sources
    headlineFilter: () => true,  // API pre-filters for AT&T
    parseResponse: (json: any) => Array.isArray(json) ? json : [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      "5G & Network": (h) => /5g|network|spectrum|firstnet|fiber|wireless|broadband/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|deal|alliance/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "AMZLEO",
    endpoint: "/api/press-intelligence?ticker=AMZLEO",
    accent: "emerald",
    color: "#34D399",
    colorDim: "rgba(52,211,153,0.15)",
    sourceFilter: () => true,
    headlineFilter: () => true,
    parseResponse: (json: any) => json?.news || [],
    categories: {
      Satellite: (h) => /satellite|kuiper|leo|orbit|launch|space|constellation/i.test(h),
      Connectivity: (h) => /connect|broadband|internet|coverage|rural|wireless|network/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|carrier|telco|operator|government/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|hire|team/i.test(h),
    },
  },
  {
    ticker: "LYNK",
    endpoint: "/api/press-intelligence?ticker=LYNK",
    accent: "teal",
    color: "#2DD4BF",
    colorDim: "rgba(45,212,191,0.15)",
    sourceFilter: () => true,
    headlineFilter: () => true,
    parseResponse: (json: any) => json?.news || [],
    categories: {
      Satellite: (h) => /satellite|leo|orbit|launch|space|constellation|cell tower/i.test(h),
      Connectivity: (h) => /connect|broadband|coverage|direct.to.cell|d2d|cellular|network/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|carrier|telco|operator|government|mno/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|funding|raise/i.test(h),
      "Media & Opinion": (h) => /podcast|video|op.ed|interview|panel|keynote|conference/i.test(h),
    },
  },
  {
    ticker: "MSTR",
    endpoint: "/api/press-intelligence?ticker=MSTR",
    accent: "amber",
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for strategy/microstrategy
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury|hodl|acquisition/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|name change|rebrand/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "MARA",
    endpoint: "/api/press-intelligence?ticker=MARA",
    accent: "lime",
    color: "#84CC16",
    colorDim: "rgba(132,204,22,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for marathon/mara
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|energize/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "RIOT",
    endpoint: "/api/press-intelligence?ticker=RIOT",
    accent: "red",
    color: "#EF4444",
    colorDim: "rgba(239,68,68,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for riot
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "CLSK",
    endpoint: "/api/press-intelligence?ticker=CLSK",
    accent: "green",
    color: "#22C55E",
    colorDim: "rgba(34,197,94,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for cleanspark
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "FRMM",
    endpoint: "/api/press-intelligence?ticker=FRMM",
    accent: "purple",
    color: "#A855F7",
    colorDim: "rgba(168,85,247,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for forum/ethzilla
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Tokenization: (h) => /token|rwa|real.world|aviation|loan|portfolio|securit/i.test(h),
      Ethereum: (h) => /eth|ethereum|staking|crypto|digital asset|blockchain|treasury|validator/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|name change|rebrand|forum|ethzilla/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|warrant|stock|\$\d/i.test(h),
    },
  },
  {
    ticker: "COIN",
    endpoint: "/api/press-intelligence?ticker=COIN",
    accent: "blue",
    color: "#3B82F6",
    colorDim: "rgba(59,130,246,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for coinbase
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Exchange: (h) => /exchange|trading|listing|delist|custody|staking|base\b|layer\s*2/i.test(h),
      Regulatory: (h) => /sec|regulat|compliance|license|legal|lawsuit|settlement|approval/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|partnership/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|buyback|repurchase|debt|\$\d/i.test(h),
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
          const parse = cfg.parseResponse || ((j: any) => j?.results?.news?.[0]?.newsitem || []);
          const raw: any[] = parse(json);
          const filtered: NewsItem[] = raw
            .filter((item: any) => cfg.sourceFilter(item.source || "") && cfg.headlineFilter(item.headline || item.title || ""))
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
        const summary = (item.summary || (item as any).qmsummary || item.description || "").toLowerCase();
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

        {/* ── Filter Panel ── */}
        <div className="pi-filter-panel">
          <div className="pi-filter-group">
            <span className="pi-filter-group-label">Stock</span>
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
          </div>

          <div className="pi-divider" />

          <div className="pi-filter-group">
            <span className="pi-filter-group-label">Type</span>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="pi-cat-tab"
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {activeCategory === cat && cat !== "All" && (
                  <span className="pi-filter-count">{visibleItems.length}</span>
                )}
              </button>
            ))}
          </div>

          {(activeTicker !== "ALL" || activeCategory !== "All" || searchQuery) && (
            <button
              className="pi-filter-clear"
              onClick={() => { setActiveTicker("ALL"); setActiveCategory("All"); setSearchQuery(""); }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="pi-feed">
        {/* Result bar */}
        {!loading && (
          <div className="pi-result-bar">
            <span className="pi-result-count">
              <strong>{visibleItems.length}</strong> of {allItems.length} releases
              {activeTicker !== "ALL" && <> &middot; {activeTicker}</>}
              {activeCategory !== "All" && <> &middot; {activeCategory}</>}
              {searchQuery && <> &middot; &ldquo;{searchQuery}&rdquo;</>}
            </span>
          </div>
        )}

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
          const summary = item.summary || (item as any).qmsummary || item.description || "";
          const date = formatDate(item.datetime);
          const time = formatTime(item.datetime);
          const source = (item.source || "").split(" ").slice(0, 2).join(" ");
          const cfg = item._config;
          const permalink = (item as any).permalink || (item as any).storyurl || "";
          const link = permalink && permalink.startsWith("http")
            ? permalink
            : `https://feeds.issuerdirect.com/news-release.html?newsid=${item.newsid || item.id}&symbol=${cfg.ticker}`;

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
