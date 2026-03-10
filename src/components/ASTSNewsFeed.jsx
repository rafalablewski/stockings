"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./stocks/stock-model-styles.css";

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
      const res = await fetch("/api/press-intelligence?ticker=ASTS");
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
  const latest = items[0] ? formatDate(items[0].datetime) : "\u2014";
  return (
    <div className="sm-newsfeed-wrap">
      <div className="sm-newsfeed-header">
        <div className="sm-newsfeed-top-row">
          <div className="sm-newsfeed-title-group">
            <div className="sm-newsfeed-pulse-dot" />
            <span className="sm-newsfeed-title">Press Monitor</span>
            <span className="sm-newsfeed-ticker">ASTS</span>
          </div>
          <button className="sm-newsfeed-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
            <span className="sm-newsfeed-refresh-icon" data-spinning={refreshing ? "true" : undefined}>&#x27F3;</span>
            Refresh
          </button>
        </div>
        {!loading && !error && (
          <div className="sm-newsfeed-stats-row">
            <div className="sm-newsfeed-stat">
              <span className="sm-newsfeed-stat-val">{items.length}</span>
              <span className="sm-newsfeed-stat-label">Total Releases</span>
            </div>
            <div className="sm-newsfeed-stat">
              <span className="sm-newsfeed-stat-val">{thisYear}</span>
              <span className="sm-newsfeed-stat-label">This Year</span>
            </div>
            <div className="sm-newsfeed-stat">
              <span className="sm-newsfeed-stat-val">{thisMonth}</span>
              <span className="sm-newsfeed-stat-label">This Month</span>
            </div>
            <div className="sm-newsfeed-stat">
              <span className="sm-newsfeed-stat-val-latest">{latest}</span>
              <span className="sm-newsfeed-stat-label">Latest</span>
            </div>
          </div>
        )}
        <div className="sm-newsfeed-tabs">
          {Object.keys(CATEGORIES).map((tab) => (
            <button key={tab} className="sm-newsfeed-tab" data-active={activeTab === tab ? "true" : undefined} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="sm-newsfeed-list">
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="sm-newsfeed-skeleton" data-index={i} />
        ))}
        {error && (
          <div className="sm-newsfeed-empty">
            <div className="sm-newsfeed-error">&#x26A0; {error}</div>
            <div>Check your /api/press-intelligence?ticker=ASTS proxy</div>
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div className="sm-newsfeed-empty">No releases in this category</div>
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
              className="sm-newsfeed-card"
              data-expanded={expanded ? "true" : undefined}
              onClick={() => setExpandedId(expanded ? null : id)}
            >
              <div className="sm-newsfeed-card-inner">
                <div className="sm-newsfeed-card-top">
                  <div className="sm-newsfeed-headline">{headline}</div>
                  <div className="sm-newsfeed-date">{date}</div>
                </div>
                {expanded && (
                  <>
                    {summary && <div className="sm-newsfeed-summary">{summary}</div>}
                    <div className="sm-newsfeed-link-row">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-newsfeed-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        &#x2197; Full Release
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {lastUpdated && (
          <div className="sm-newsfeed-ts">
            Updated {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
