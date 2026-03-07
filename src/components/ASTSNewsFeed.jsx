"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const HEADLINES_URL = "/api/asts-news";
const STORY_URL = "/api/asts-story";
const CONCURRENCY = 10;

// Same logic as the original issuerdirect news.js
const storyIsASTSOwnedPR = (storyText) => {
  const clean = storyText
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
  return (
    clean.includes("investors@ast-science.com") ||
    clean.includes("source ast spacemobile")
  );
};

// Concurrency helper — mirrors mapWithConcurrency from original JS
const mapWithConcurrency = (items, limit, mapper) => {
  let i = 0;
  const results = new Array(items.length);
  return new Promise((resolve) => {
    let active = 0;
    function next() {
      while (active < limit && i < items.length) {
        const idx = i++;
        active++;
        Promise.resolve(mapper(items[idx], idx))
          .then((val) => { results[idx] = val; })
          .catch(() => { results[idx] = true; }) // fail open: keep
          .finally(() => {
            active--;
            if (i >= items.length && active === 0) resolve(results);
            else next();
          });
      }
    }
    next();
  });
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const getSourceLabel = (source) => {
  if (source?.includes("Business Wire")) return "BW";
  if (source?.includes("PR Newswire")) return "PRN";
  if (source?.includes("GlobeNewswire")) return "GNW";
  if (source?.includes("ACCESS")) return "ACW";
  return "PR";
};

const truncate = (str, n) =>
  str && str.length > n ? str.slice(0, n).trimEnd() + "…" : str;

const stripHtml = (html) =>
  html ? html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim() : "";

export default function ASTSNewsFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verifyTotal, setVerifyTotal] = useState(0);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  // In-memory story cache (mirrors window.__astsStoryCache)
  const storyCache = useRef({});
  const TTL_MS = 5 * 60 * 1000;

  const fetchStoryAndCheck = useCallback(async (newsid) => {
    const now = Date.now();
    const cached = storyCache.current[newsid];
    if (cached && now - cached.ts < TTL_MS) return cached.keep;

    try {
      const res = await fetch(`${STORY_URL}?storyId=${newsid}`);
      if (!res.ok) throw new Error("story fetch failed");
      const data = await res.json();
      const qmtext = data?.qmcistory?.qmnews?.qmstory?.qmtext ?? "";
      const keep = storyIsASTSOwnedPR(qmtext);
      storyCache.current[newsid] = { keep, ts: now };
      return keep;
    } catch {
      storyCache.current[newsid] = { keep: true, ts: now };
      return true; // fail open
    }
  }, []);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setVerifying(false);
    setVerifyProgress(0);
    setItems([]);
    setError(null);

    try {
      // Step 1: fetch headlines
      const res = await fetch(HEADLINES_URL);
      if (!res.ok) throw new Error("Failed to fetch headlines");
      const data = await res.json();

      const raw = data?.results?.news?.flatMap((n) => n.newsitem) || [];
      setLoading(false);

      // Step 2: verify each story body — same logic as original issuerdirect JS
      setVerifying(true);
      setVerifyTotal(raw.length);
      let done = 0;

      const keepFlags = await mapWithConcurrency(raw, CONCURRENCY, async (item) => {
        const keep = await fetchStoryAndCheck(item.newsid);
        done++;
        setVerifyProgress(done);
        return keep;
      });

      const filtered = raw.filter((_, i) => keepFlags[i]);
      setItems(filtered);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message || "Unable to load feed.");
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  }, [fetchStoryAndCheck]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const categories = {
    all: items,
    earnings: items.filter(i => /(earnings|results|revenue|quarter|financial)/i.test(i.headline)),
    launches: items.filter(i => /(launch|bluebird|satellite|orbital)/i.test(i.headline)),
    partnerships: items.filter(i => /(partner|agreement|contract|collaboration|deal)/i.test(i.headline)),
    capital: items.filter(i => /(offering|notes|convertible|repurchase|pricing)/i.test(i.headline)),
  };

  const displayed = categories[filter] || items;
  const isWorking = loading || verifying;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0b",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#e8e0d4",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .news-card {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          padding: 20px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .news-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #c9a96e, #8b6914);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .news-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(201,169,110,0.2); transform: translateY(-1px); }
        .news-card:hover::before { opacity: 1; }
        .news-card.active { background: rgba(201,169,110,0.05); border-color: rgba(201,169,110,0.25); }
        .news-card.active::before { opacity: 1; }

        .filter-btn {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(232,224,212,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.15s;
          text-transform: uppercase;
        }
        .filter-btn:hover { border-color: rgba(201,169,110,0.4); color: #c9a96e; }
        .filter-btn.active { background: rgba(201,169,110,0.12); border-color: rgba(201,169,110,0.5); color: #c9a96e; }

        .source-badge {
          display: inline-block;
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(232,224,212,0.4);
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(201,169,110,0.3);
          background: rgba(201,169,110,0.08);
          color: #c9a96e;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .refresh-btn:hover { background: rgba(201,169,110,0.15); border-color: rgba(201,169,110,0.5); }
        .refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .open-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 7px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.3);
          color: #c9a96e;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.15s;
        }
        .open-link:hover { background: rgba(201,169,110,0.2); border-color: rgba(201,169,110,0.6); }

        .ticker-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #c9a96e;
          letter-spacing: 0.05em;
        }
        .pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

        .progress-bar-track {
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #8b6914, #c9a96e);
          border-radius: 2px;
          transition: width 0.15s ease;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.01)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#e8e0d4", letterSpacing: "-0.02em" }}>
              ABISON <span style={{ color: "#c9a96e" }}>Intelligence</span>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(232,224,212,0.3)", letterSpacing: "0.06em", marginTop: "1px" }}>
              PRESS RELEASE MONITOR
            </div>
          </div>
          <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.08)" }} />
          <div className="ticker-bar">
            <div className="pulse-dot" />
            ASTS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {lastUpdated && !isWorking && (
            <div style={{ fontSize: "11px", color: "rgba(232,224,212,0.3)" }}>
              Updated {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </div>
          )}
          {verifying && (
            <div style={{ fontSize: "11px", color: "rgba(201,169,110,0.6)" }}>
              Verifying {verifyProgress} / {verifyTotal}
            </div>
          )}
          <button className="refresh-btn" onClick={fetchNews} disabled={isWorking}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ animation: isWorking ? "spin 1s linear infinite" : "none" }}>
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            {loading ? "Loading…" : verifying ? "Verifying…" : "Refresh"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Progress bar during verification */}
        {verifying && verifyTotal > 0 && (
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${(verifyProgress / verifyTotal) * 100}%` }} />
          </div>
        )}

        {/* Stats */}
        {!isWorking && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
            {[
              { label: "Total Releases", value: items.length },
              { label: "This Year", value: items.filter(i => new Date(i.datetime).getFullYear() === new Date().getFullYear()).length },
              { label: "This Month", value: items.filter(i => { const d = new Date(i.datetime); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length },
              { label: "Latest", value: items.length > 0 ? formatDate(items[0].datetime) : "—" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                <div style={{ fontSize: "11px", color: "rgba(232,224,212,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>{stat.label}</div>
                <div style={{ fontSize: "22px", fontWeight: "300", color: "#e8e0d4", fontFamily: "'DM Serif Display', serif" }}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        {!isWorking && !error && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {Object.entries({ all: "All", earnings: "Earnings", launches: "Launches", partnerships: "Partnerships", capital: "Capital Markets" }).map(([key, label]) => (
              <button key={key} className={`filter-btn ${filter === key ? "active" : ""}`} onClick={() => { setFilter(key); setExpanded(null); }}>
                {label} <span style={{ marginLeft: "5px", opacity: 0.5 }}>{categories[key]?.length || 0}</span>
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", color: "#fca5a5", fontSize: "13px" }}>
            ⚠ {error}
            <div style={{ marginTop: "8px", fontSize: "12px", color: "rgba(252,165,165,0.6)" }}>
              Make sure <code>/api/asts-news.js</code> and <code>/api/asts-story.js</code> are deployed on Vercel.
            </div>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px 24px" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                  <div className="skeleton" style={{ width: "36px", height: "16px" }} />
                  <div className="skeleton" style={{ width: "80px", height: "16px" }} />
                </div>
                <div className="skeleton" style={{ width: `${70 + i * 4}%`, height: "18px", marginBottom: "8px" }} />
                <div className="skeleton" style={{ width: "90%", height: "14px" }} />
              </div>
            ))}
          </div>
        )}

        {/* Verifying placeholder */}
        {verifying && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "13px", color: "rgba(232,224,212,0.4)", marginBottom: "8px" }}>Verifying story content…</div>
            <div style={{ fontSize: "12px", color: "rgba(232,224,212,0.2)" }}>Checking {verifyTotal} articles against AST SpaceMobile source</div>
          </div>
        )}

        {/* News list */}
        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {!verifying && displayed.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(232,224,212,0.3)", fontSize: "14px" }}>No releases found.</div>
            )}
            {displayed.map((item) => {
              const isOpen = expanded === item.newsid;
              const articleUrl = `https://feeds.issuerdirect.com/news-release.html?newsid=${item.newsid}&symbol=ASTS`;
              return (
                <div key={item.newsid} className={`news-card ${isOpen ? "active" : ""}`} onClick={() => setExpanded(isOpen ? null : item.newsid)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span className="source-badge">{getSourceLabel(item.source)}</span>
                    <span style={{ fontSize: "12px", color: "rgba(232,224,212,0.35)" }}>{formatDate(item.datetime)}</span>
                    <span style={{ fontSize: "11px", color: "rgba(232,224,212,0.2)" }}>{formatTime(item.datetime)}</span>
                    <div style={{ marginLeft: "auto" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(232,224,212,0.2)" strokeWidth="2"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: "500", color: isOpen ? "#e8e0d4" : "rgba(232,224,212,0.85)", lineHeight: "1.45", letterSpacing: "-0.01em" }}>
                    {item.headline}
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                      <p style={{ fontSize: "13px", color: "rgba(232,224,212,0.55)", lineHeight: "1.7", marginBottom: "16px" }}>
                        {truncate(stripHtml(item.qmsummary), 400)}
                      </p>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }} onClick={e => e.stopPropagation()}>
                        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="open-link">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Open on issuerdirect
                        </a>
                        {item.permalink && (
                          <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="open-link"
                            style={{ background: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "rgba(232,224,212,0.4)" }}>
                            Source ↗
                          </a>
                        )}
                        <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(232,224,212,0.2)" }}>ID: {item.newsid}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!isWorking && !error && displayed.length > 0 && (
          <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(232,224,212,0.2)" }}>
            <span>Source: accesswire.com via QuoteMedia · feeds.issuerdirect.com</span>
            <span>ABISON Investment Research</span>
          </div>
        )}
      </div>
    </div>
  );
}
