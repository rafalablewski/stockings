"use client";

import { useState, useEffect, useRef, useCallback } from "react";
const GOLD = "#c9a96e";
const DARK = "#0a0a0b";
const CARD_BG = "#111113";
const BORDER = "rgba(201,169,110,0.15)";
// Only Business Wire releases are ASTS official press releases
const isASTSRelease = (item) => {
  const src = (item.source || "").toLowerCase();
  return src.includes("business wire");
};
const CATEGORIES = {
  All: () => true,
  Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d/i.test(h),
  Launches: (h) => /launch|bluebird|satellite|orbit|unfold/i.test(h),
  Partnerships: (h) => /partner|agreement|definitive|carrier|vodafone|verizon|at&t|telus|vi |stc/i.test(h),
  "Capital Markets": (h) => /notes|offering|convert|shares|capital|note repurchase|\$\d/i.test(h),
};
const formatDate = (str) => {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const isThisYear = (str) => new Date(str).getFullYear() === new Date().getFullYear();
const isThisMonth = (str) => {
  const d = new Date(str);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
};
export default function ASTSNewsFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const cacheRef = useRef({ data: null, ts: 0 });
  const TTL = 5 * 60 * 1000;
  const load = useCallback(async (force = false) => {
    if (!force && cacheRef.current.data && Date.now() - cacheRef.current.ts < TTL) {
      setItems(cacheRef.current.data);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/asts-news");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = (json?.results?.news?.[0]?.newsitem) || [];
      const filtered = raw.filter(isASTSRelease).sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      cacheRef.current = { data: filtered, ts: Date.now() };
      setItems(filtered);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);
  const handleRefresh = () => {
    setRefreshing(true);
    load(true);
  };
  const visible = items.filter((item) => {
    const h = item.headline || item.title || "";
    return CATEGORIES[activeTab](h);
  });
  const thisYear = items.filter((i) => isThisYear(i.datetime)).length;
  const thisMonth = items.filter((i) => isThisMonth(i.datetime)).length;
  const latest = items[0] ? formatDate(items[0].datetime) : "—";
  const styles = {
    wrap: {
      fontFamily: "'DM Sans', sans-serif",
      background: DARK,
      minHeight: "100vh",
      color: "#e8e0d4",
      padding: "0 0 60px",
    },
    header: {
      background: "linear-gradient(180deg, #0d0d0f 0%, rgba(13,13,15,0) 100%)",
      borderBottom: `1px solid ${BORDER}`,
      padding: "24px 28px 0",
      position: "sticky",
      top: 0,
      zIndex: 10,
      backdropFilter: "blur(12px)",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    titleGroup: { display: "flex", alignItems: "center", gap: 10 },
    pulse: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#4ade80",
      boxShadow: "0 0 0 0 rgba(74,222,128,0.4)",
      animation: "pulse 2s infinite",
    },
    title: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 20,
      fontWeight: 400,
      color: "#f5f0e8",
      letterSpacing: "0.01em",
    },
    ticker: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      color: GOLD,
      background: "rgba(201,169,110,0.1)",
      border: `1px solid ${BORDER}`,
      borderRadius: 4,
      padding: "3px 7px",
    },
    refreshBtn: {
      background: "transparent",
      border: `1px solid ${BORDER}`,
      borderRadius: 6,
      color: "#9a9080",
      cursor: "pointer",
      padding: "6px 12px",
      fontSize: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      transition: "all 0.2s",
    },
    statsRow: {
      display: "flex",
      gap: 24,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    stat: { display: "flex", flexDirection: "column", gap: 1 },
    statVal: { fontSize: 18, fontWeight: 600, color: GOLD, fontVariantNumeric: "tabular-nums" },
    statLabel: { fontSize: 10, letterSpacing: "0.1em", color: "#5a5248", textTransform: "uppercase" },
    tabs: { display: "flex", gap: 2, borderTop: `1px solid ${BORDER}`, paddingTop: 0 },
    tab: (active) => ({
      padding: "10px 16px",
      fontSize: 12,
      fontWeight: active ? 600 : 400,
      color: active ? GOLD : "#5a5248",
      background: "transparent",
      border: "none",
      borderBottom: active ? `2px solid ${GOLD}` : "2px solid transparent",
      cursor: "pointer",
      transition: "all 0.2s",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
    }),
    list: { padding: "16px 16px 0" },
    card: (expanded) => ({
      background: CARD_BG,
      border: `1px solid ${expanded ? "rgba(201,169,110,0.3)" : BORDER}`,
      borderRadius: 8,
      marginBottom: 8,
      overflow: "hidden",
      transition: "border-color 0.2s",
      cursor: "pointer",
    }),
    cardInner: { padding: "14px 16px" },
    cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
    headline: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 14,
      fontWeight: 400,
      color: "#f0ebe3",
      lineHeight: 1.4,
      flex: 1,
    },
    date: { fontSize: 11, color: "#5a5248", whiteSpace: "nowrap", marginTop: 2 },
    summary: {
      fontSize: 12,
      color: "#7a7068",
      lineHeight: 1.6,
      marginTop: 8,
      borderTop: `1px solid ${BORDER}`,
      paddingTop: 8,
    },
    linkRow: { display: "flex", gap: 12, marginTop: 10 },
    link: {
      fontSize: 11,
      color: GOLD,
      textDecoration: "none",
      letterSpacing: "0.05em",
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    empty: { textAlign: "center", color: "#3a3530", padding: "60px 0", fontSize: 13 },
    ts: { fontSize: 10, color: "#3a3530", textAlign: "center", marginTop: 16 },
    skeleton: {
      background: "linear-gradient(90deg, #111113 25%, #1a1a1d 50%, #111113 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      borderRadius: 6,
      height: 60,
      marginBottom: 8,
    },
  };
  return (
    <div style={styles.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)}
          50%{box-shadow:0 0 0 6px rgba(74,222,128,0)}
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes shimmer { to{background-position:-200% 0} }
        button:hover { opacity: 0.8; }
      `}</style>
      <div style={styles.header}>
        <div style={styles.topRow}>
          <div style={styles.titleGroup}>
            <div style={styles.pulse} />
            <span style={styles.title}>Press Monitor</span>
            <span style={styles.ticker}>ASTS</span>
          </div>
          <button style={styles.refreshBtn} onClick={handleRefresh} disabled={refreshing}>
            <span style={{ display: "inline-block", animation: refreshing ? "spin 0.8s linear infinite" : "none" }}>⟳</span>
            Refresh
          </button>
        </div>
        {!loading && !error && (
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statVal}>{items.length}</span>
              <span style={styles.statLabel}>Total Releases</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statVal}>{thisYear}</span>
              <span style={styles.statLabel}>This Year</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statVal}>{thisMonth}</span>
              <span style={styles.statLabel}>This Month</span>
            </div>
            <div style={styles.stat}>
              <span style={{ fontSize: 13, fontWeight: 600, color: GOLD, marginTop: 3 }}>{latest}</span>
              <span style={styles.statLabel}>Latest</span>
            </div>
          </div>
        )}
        <div style={styles.tabs}>
          {Object.keys(CATEGORIES).map((tab) => (
            <button key={tab} style={styles.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div style={styles.list}>
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ ...styles.skeleton, opacity: 1 - i * 0.1 }} />
        ))}
        {error && (
          <div style={styles.empty}>
            <div style={{ color: "#c96e6e", marginBottom: 8 }}>⚠ {error}</div>
            <div>Check your /api/asts-news proxy</div>
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div style={styles.empty}>No releases in this category</div>
        )}
        {!loading && !error && visible.map((item) => {
          const id = item.newsid || item.id;
          const expanded = expandedId === id;
          const headline = item.headline || item.title || "";
          const summary = item.summary || item.description || "";
          const date = formatDate(item.datetime);
          const link = `https://feeds.issuerdirect.com/news-release.html?newsid=${id}&symbol=ASTS`;
          return (
            <div
              key={id}
              style={styles.card(expanded)}
              onClick={() => setExpandedId(expanded ? null : id)}
            >
              <div style={styles.cardInner}>
                <div style={styles.cardTop}>
                  <div style={styles.headline}>{headline}</div>
                  <div style={styles.date}>{date}</div>
                </div>
                {expanded && (
                  <>
                    {summary && <div style={styles.summary}>{summary}</div>}
                    <div style={styles.linkRow}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗ Full Release
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {lastUpdated && (
          <div style={styles.ts}>
            Updated {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
