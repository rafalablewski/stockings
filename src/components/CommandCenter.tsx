/**
 * CommandCenter — Unified Stock Dashboard
 *
 * Aggregates news, press releases, and SEC EDGAR filings for all stocks
 * in one centralized view. Shares the same DB records as individual stock
 * pages so dismiss state syncs everywhere.
 *
 * @version 1.0.0
 */

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { stockList, stocks } from '@/lib/stocks';
import { articleCacheKey, normalizeHeadline } from '@/lib/sourceUtils';
import './stocks/stock-model-styles.css';

// ── Types ────────────────────────────────────────────────────────────────────

interface ArticleItem {
  headline: string;
  date: string;
  url: string;
  source?: string;
  type: 'pr' | 'news';
}

interface EdgarFiling {
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

interface DbArticleRecord {
  cacheKey: string;
  headline: string;
  date: string | null;
  url: string | null;
  source: string | null;
  articleType: string | null;
  dismissed: boolean;
  hidden: boolean;
}

interface DbFilingRecord {
  accessionNumber: string;
  form: string;
  filingDate: string | null;
  description: string | null;
  reportDate: string | null;
  fileUrl: string | null;
  status: string | null;
  dismissed: boolean;
  hidden: boolean;
}

interface StockFeedState {
  articles: ArticleItem[];
  filings: EdgarFiling[];
  loadingPR: boolean;
  loadingNews: boolean;
  loadingEdgar: boolean;
  loaded: boolean;
  error: string | null;
  fetchedAt: number | null;
}

type FilterType = 'all' | 'pr' | 'news' | 'edgar';
type TickerFilter = 'all' | string;

// ── Stock accent colors ──────────────────────────────────────────────────────
const STOCK_ACCENTS: Record<string, { color: string; dim: string; label: string }> = {
  ASTS: { color: 'var(--cyan)', dim: 'var(--cyan-dim)', label: 'cyan' },
  BMNR: { color: 'var(--violet)', dim: 'var(--violet-dim)', label: 'violet' },
  CRCL: { color: 'var(--mint)', dim: 'var(--mint-dim)', label: 'mint' },
};

// ── Badge colors ─────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  pr: { bg: 'var(--sky-dim)', text: 'var(--sky)' },
  news: { bg: 'var(--mint-dim)', text: 'var(--mint)' },
};

const OWNERSHIP_FILING_COLOR = { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' };

const EDGAR_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
  '10-Q': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
  '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
  'Form 4': OWNERSHIP_FILING_COLOR,
  'Form 3': OWNERSHIP_FILING_COLOR,
  'SC 13D': OWNERSHIP_FILING_COLOR,
  'SC 13D/A': OWNERSHIP_FILING_COLOR,
  'SC 13G': OWNERSHIP_FILING_COLOR,
  '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  'S-3': OWNERSHIP_FILING_COLOR,
  'DEF 14A': OWNERSHIP_FILING_COLOR,
};

const DEFAULT_EDGAR_COLOR = { bg: 'rgba(110,118,129,0.15)', text: 'var(--text3)' };

function getEdgarColor(form: string) {
  return EDGAR_COLORS[form] || DEFAULT_EDGAR_COLOR;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function formatEdgarDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const INITIAL_FEED_STATE: StockFeedState = {
  articles: [],
  filings: [],
  loadingPR: false,
  loadingNews: false,
  loadingEdgar: false,
  loaded: false,
  error: null,
  fetchedAt: null,
};

// ── Main component ───────────────────────────────────────────────────────────

export default function CommandCenter() {
  const [feeds, setFeeds] = useState<Record<string, StockFeedState>>(() => {
    const init: Record<string, StockFeedState> = {};
    for (const s of stockList) init[s.ticker] = { ...INITIAL_FEED_STATE };
    return init;
  });

  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [tickerFilter, setTickerFilter] = useState<TickerFilter>('all');
  const [expanded, setExpanded] = useState(true);

  // DB state
  const dbArticlesRef = useRef<Map<string, DbArticleRecord>>(new Map());
  const [dbArticles, setDbArticles] = useState<Map<string, DbArticleRecord>>(new Map());
  const dbFilingsRef = useRef<Map<string, DbFilingRecord>>(new Map());
  const [dbFilings, setDbFilings] = useState<Map<string, DbFilingRecord>>(new Map());
  const [newArticleKeys, setNewArticleKeys] = useState<Set<string>>(new Set());
  const [newFilingKeys, setNewFilingKeys] = useState<Set<string>>(new Set());

  // DB key helpers (prefix with ticker to avoid collisions across stocks)
  const artKey = (ticker: string, article: { url?: string; headline?: string }) =>
    `${ticker}:${articleCacheKey(article)}`;
  const filKey = (ticker: string, accession: string) =>
    `${ticker}:${accession}`;

  // ── Load DB records on mount ─────────────────────────────────────────────
  useEffect(() => {
    const loadDb = async () => {
      const fetches = stockList.flatMap(s => [
        fetch(`/api/seen-articles?ticker=${s.ticker}`)
          .then(r => r.ok ? r.json() : { articles: [] })
          .then(data => {
            for (const rec of (data.articles || [])) {
              const key = `${s.ticker}:${rec.cacheKey}`;
              dbArticlesRef.current.set(key, rec);
            }
          })
          .catch(() => {}),
        fetch(`/api/seen-filings?ticker=${s.ticker}`)
          .then(r => r.ok ? r.json() : { filings: [] })
          .then(data => {
            for (const rec of (data.filings || [])) {
              const key = `${s.ticker}:${rec.accessionNumber}`;
              dbFilingsRef.current.set(key, rec);
            }
          })
          .catch(() => {}),
      ]);
      await Promise.allSettled(fetches);
      setDbArticles(new Map(dbArticlesRef.current));
      setDbFilings(new Map(dbFilingsRef.current));

      // Hydrate feeds from DB records + track all known items (single pass)
      // All DB items go into new*Keys — the dismissed flag on DB records
      // separately tracks seen/unseen for the "seen" filter.
      const feedUpdates: Record<string, Partial<StockFeedState>> = {};
      const newArtKeys = new Set<string>();
      const newFilKeys = new Set<string>();

      for (const s of stockList) {
        const articles: ArticleItem[] = [];
        for (const [key, rec] of dbArticlesRef.current.entries()) {
          if (key.startsWith(`${s.ticker}:`)) {
            articles.push({
              headline: rec.headline,
              date: rec.date || '',
              url: rec.url || '',
              source: rec.source || undefined,
              type: (rec.articleType === 'pr' ? 'pr' : 'news') as 'pr' | 'news',
            });
            newArtKeys.add(key);
          }
        }
        if (articles.length > 0) {
          feedUpdates[s.ticker] = { articles, loaded: true };
        }
        for (const [key, rec] of dbFilingsRef.current.entries()) {
          if (key.startsWith(`${s.ticker}:`)) {
            newFilKeys.add(key);
          }
        }
      }

      if (newArtKeys.size > 0) setNewArticleKeys(newArtKeys);
      if (newFilKeys.size > 0) setNewFilingKeys(newFilKeys);

      if (Object.keys(feedUpdates).length > 0) {
        setFeeds(prev => {
          const next = { ...prev };
          for (const [ticker, updates] of Object.entries(feedUpdates)) {
            next[ticker] = { ...next[ticker], ...updates };
          }
          return next;
        });
      }
    };
    loadDb();
  }, []);
  // ── Scan All ─────────────────────────────────────────────────────────────
  const scanAll = useCallback(async () => {
    setScanning(true);

    const fetchStock = async (ticker: string) => {
      // Mark loading
      setFeeds(prev => ({
        ...prev,
        [ticker]: { ...prev[ticker], loadingPR: true, loadingNews: true, loadingEdgar: true, error: null },
      }));

      const results: { prs: ArticleItem[]; news: ArticleItem[]; filings: EdgarFiling[] } = {
        prs: [], news: [], filings: [],
      };

      // Fetch PRs
      try {
        const res = await fetch(`/api/press-releases/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.prs = (d.releases || []).slice(0, 15).map((r: { date: string; headline: string; url: string; source?: string }) => ({
            headline: r.headline, date: r.date, url: r.url, source: r.source, type: 'pr' as const,
          }));
        }
      } catch (err) {
        console.error(`[CommandCenter] PR fetch error for ${ticker}:`, err);
      }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingPR: false } }));

      // Fetch News
      try {
        const res = await fetch(`/api/news/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.news = (d.articles || []).slice(0, 10).map((a: { title: string; date: string; url: string; source: string }) => ({
            headline: a.title, date: a.date, url: a.url, source: a.source, type: 'news' as const,
          }));
        }
      } catch (err) {
        console.error(`[CommandCenter] News fetch error for ${ticker}:`, err);
      }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingNews: false } }));

      // Fetch EDGAR
      try {
        const res = await fetch(`/api/edgar/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.filings = (d.filings || []).slice(0, 15);
        } else {
          console.error(`[CommandCenter] EDGAR fetch failed for ${ticker}: ${res.status}`);
        }
      } catch (err) {
        console.error(`[CommandCenter] EDGAR fetch error for ${ticker}:`, err);
      }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingEdgar: false } }));

      // Remove news whose headline matches a PR
      const prHeadlines = new Set(results.prs.map(a => normalizeHeadline(a.headline)));
      const dedupedNews = results.news.filter(a => !prHeadlines.has(normalizeHeadline(a.headline)));
      const finalArticles = [...results.prs, ...dedupedNews];

      // Save articles to DB + detect new
      const newArtKeys = new Set<string>();
      if (finalArticles.length > 0) {
        const toSave = finalArticles.map(a => ({
          cacheKey: articleCacheKey(a),
          headline: a.headline,
          date: a.date,
          url: a.url,
          source: a.source,
          articleType: a.type,
        }));

        for (const a of finalArticles) {
          const key = artKey(ticker, a);
          if (!dbArticlesRef.current.has(key)) newArtKeys.add(key);
        }

        try {
          await fetch('/api/seen-articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, articles: toSave }),
          });
          // Update local DB records
          for (const a of toSave) {
            const key = `${ticker}:${a.cacheKey}`;
            const existing = dbArticlesRef.current.get(key);
            dbArticlesRef.current.set(key, {
              cacheKey: a.cacheKey,
              headline: a.headline,
              date: a.date || null,
              url: a.url || null,
              source: a.source || null,
              articleType: a.articleType || null,
              dismissed: newArtKeys.has(key) ? false : (existing?.dismissed ?? false),
              hidden: existing?.hidden ?? false,
            });
          }
        } catch { /* best-effort */ }
      }

      // Save filings to DB + detect new
      const newFilKeys = new Set<string>();
      if (results.filings.length > 0) {
        const toSave = results.filings.map(f => ({
          accessionNumber: f.accessionNumber,
          form: f.form,
          filingDate: f.filingDate,
          description: f.primaryDocDescription,
          reportDate: f.reportDate,
          fileUrl: f.fileUrl,
          status: 'new',
        }));

        for (const f of results.filings) {
          const key = filKey(ticker, f.accessionNumber);
          if (!dbFilingsRef.current.has(key)) newFilKeys.add(key);
        }

        try {
          await fetch('/api/seen-filings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, filings: toSave }),
          });
          for (const f of toSave) {
            const key = `${ticker}:${f.accessionNumber}`;
            const existing = dbFilingsRef.current.get(key);
            dbFilingsRef.current.set(key, {
              accessionNumber: f.accessionNumber,
              form: f.form,
              filingDate: f.filingDate || null,
              description: f.description || null,
              reportDate: f.reportDate || null,
              fileUrl: f.fileUrl || null,
              status: f.status || null,
              dismissed: newFilKeys.has(key) ? false : (existing?.dismissed ?? false),
              hidden: existing?.hidden ?? false,
            });
          }
        } catch { /* best-effort */ }
      }

      // Merge with existing articles (keep DB-loaded ones that aren't in fresh set)
      setFeeds(prev => {
        const existing = prev[ticker];
        const existingKeys = new Set(finalArticles.map(a => articleCacheKey(a)));
        const keptArticles = existing.articles.filter(a => !existingKeys.has(articleCacheKey(a)));
        return {
          ...prev,
          [ticker]: {
            ...existing,
            articles: [...finalArticles, ...keptArticles],
            filings: results.filings.length > 0 ? results.filings : existing.filings,
            loaded: true,
            fetchedAt: Date.now(),
          },
        };
      });

      // Update new keys
      if (newArtKeys.size > 0) {
        setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newArtKeys) next.add(k); return next; });
      }
      if (newFilKeys.size > 0) {
        setNewFilingKeys(prev => { const next = new Set(prev); for (const k of newFilKeys) next.add(k); return next; });
      }

      setDbArticles(new Map(dbArticlesRef.current));
      setDbFilings(new Map(dbFilingsRef.current));
    };

    // Fetch all stocks in parallel
    await Promise.allSettled(stockList.map(s => fetchStock(s.ticker)));
    setScanning(false);
  }, []);
  // ── Dismiss handlers ─────────────────────────────────────────────────────
  const dismissArticle = useCallback((ticker: string, article: ArticleItem) => {
    const key = artKey(ticker, article);
    const rec = dbArticlesRef.current.get(key);
    if (rec) {
      dbArticlesRef.current.set(key, { ...rec, dismissed: true });
      setDbArticles(new Map(dbArticlesRef.current));
    }
    // Persist to DB
    fetch('/api/seen-articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticker,
        articles: [{ cacheKey: articleCacheKey(article), headline: article.headline, date: article.date, url: article.url, source: article.source, articleType: article.type }],
        dismiss: true,
      }),
    }).catch(err => console.error('[CommandCenter] dismiss error:', err));
  }, []);
  const dismissFiling = useCallback((ticker: string, filing: EdgarFiling) => {
    const key = filKey(ticker, filing.accessionNumber);
    const rec = dbFilingsRef.current.get(key);
    if (rec) {
      dbFilingsRef.current.set(key, { ...rec, dismissed: true });
      setDbFilings(new Map(dbFilingsRef.current));
    }
    fetch('/api/seen-filings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticker,
        filings: [{
          accessionNumber: filing.accessionNumber,
          form: filing.form,
          filingDate: filing.filingDate,
          description: filing.primaryDocDescription,
          reportDate: filing.reportDate,
          fileUrl: filing.fileUrl,
          status: 'tracked',
        }],
        dismiss: true,
      }),
    }).catch(err => console.error('[CommandCenter] dismiss filing error:', err));
  }, []);
  // ── Computed values ──────────────────────────────────────────────────────
  const newUndismissedCount = (() => {
    let count = 0;
    for (const key of newArticleKeys) {
      if (!dbArticles.get(key)?.dismissed) count++;
    }
    for (const key of newFilingKeys) {
      if (!dbFilings.get(key)?.dismissed) count++;
    }
    return count;
  })();

  const visibleTickers = tickerFilter === 'all'
    ? stockList.map(s => s.ticker)
    : [tickerFilter];

  const anyLoading = Object.values(feeds).some(f => f.loadingPR || f.loadingNews || f.loadingEdgar);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="stock-model-app" style={{ padding: 0 }}>
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        border: '1px solid var(--border)',
        borderRadius: 16,
        background: 'var(--surface)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.03) 0%, rgba(167,139,250,0.03) 50%, rgba(126,231,135,0.03) 100%)',
        }}>
          <div className="sm-flex-between">
            <div className="sm-flex sm-gap-12">
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: 'var(--text3)', display: 'flex', alignItems: 'center',
                }}
                title={expanded ? 'Collapse dashboard' : 'Expand dashboard'}
              >
                <svg
                  width={14} height={14} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="sm-section-label" style={{ marginBottom: 0, letterSpacing: '2.5px' }}>
                Command Center
              </span>
              {newUndismissedCount > 0 && (
                <span style={{
                  fontSize: 9, fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  padding: '2px 8px', borderRadius: 99,
                  background: 'rgba(255,123,114,0.15)', color: 'var(--coral)',
                  letterSpacing: '0.5px',
                }}>
                  {newUndismissedCount} NEW
                </span>
              )}
            </div>
            <button
              onClick={scanAll}
              disabled={scanning}
              className="sm-ed-action-btn"
              data-variant="mint"
              data-state={scanning ? 'loading' : undefined}
              style={{ padding: '6px 16px', fontSize: 11, fontWeight: 600 }}
            >
              <svg
                width="11" height="11" viewBox="0 0 16 16" fill="none"
                style={{ animation: scanning ? 'spin 1s linear infinite' : 'none' }}
              >
                <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {scanning ? 'Scanning...' : 'Scan All'}
            </button>
          </div>

          {expanded && (
            <>
              {/* Filter bar */}
              <div className="sm-flex sm-gap-6" style={{ marginTop: 14 }}>
                {(['all', 'pr', 'news', 'edgar'] as FilterType[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '3px 10px', borderRadius: 99, border: 'none', cursor: 'pointer',
                      fontSize: 10, fontFamily: "'Space Mono', monospace", fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                      background: filter === f ? 'rgba(240,246,252,0.1)' : 'transparent',
                      color: filter === f ? 'var(--text)' : 'var(--text3)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {f}
                  </button>
                ))}
                <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 4px' }} />
                {['all', ...stockList.map(s => s.ticker)].map(t => (
                  <button
                    key={t}
                    onClick={() => setTickerFilter(t)}
                    style={{
                      padding: '3px 10px', borderRadius: 99, border: 'none', cursor: 'pointer',
                      fontSize: 10, fontFamily: "'Space Mono', monospace", fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                      background: tickerFilter === t ? 'rgba(240,246,252,0.1)' : 'transparent',
                      color: tickerFilter === t ? 'var(--text)' : 'var(--text3)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t === 'all' ? 'ALL' : t}
                  </button>
                ))}
              </div>

              {/* Status bar */}
              <div className="sm-flex sm-gap-16" style={{ marginTop: 12 }}>
                {stockList.map(s => {
                  const feed = feeds[s.ticker];
                  const isLoading = feed.loadingPR || feed.loadingNews || feed.loadingEdgar;
                  const accent = STOCK_ACCENTS[s.ticker];
                  const stockNewCount = (() => {
                    let c = 0;
                    for (const key of newArticleKeys) {
                      if (key.startsWith(`${s.ticker}:`) && !dbArticles.get(key)?.dismissed) c++;
                    }
                    for (const key of newFilingKeys) {
                      if (key.startsWith(`${s.ticker}:`) && !dbFilings.get(key)?.dismissed) c++;
                    }
                    return c;
                  })();
                  return (
                    <div key={s.ticker} className="sm-flex sm-gap-6" style={{ fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
                      <span
                        style={{
                          width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                          background: isLoading ? 'var(--gold)' : feed.loaded ? accent.color : 'var(--text3)',
                          boxShadow: isLoading ? '0 0 6px var(--gold-dim)' : feed.loaded ? `0 0 6px ${accent.dim}` : 'none',
                          animation: isLoading ? 'pulse 1.5s ease-in-out infinite' : 'none',
                        }}
                      />
                      <span style={{ color: accent.color, fontWeight: 600 }}>{s.ticker}</span>
                      {stockNewCount > 0 && (
                        <span style={{ color: 'var(--coral)', fontSize: 9 }}>{stockNewCount}</span>
                      )}
                      {feed.fetchedAt && !isLoading && (
                        <span style={{ color: 'var(--text3)', opacity: 0.6 }}>{formatTimeAgo(feed.fetchedAt)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Feed body */}
        {expanded && (
          <div style={{ padding: '8px 0' }}>
            {/* Empty state */}
            {!anyLoading && !Object.values(feeds).some(f => f.loaded) && (
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>
                  No data loaded yet.
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', opacity: 0.6 }}>
                  Click <strong style={{ color: 'var(--mint)' }}>Scan All</strong> to fetch news, press releases, and SEC filings for all stocks.
                </div>
              </div>
            )}

            {/* Per-stock sections */}
            {visibleTickers.map(ticker => {
              const feed = feeds[ticker];
              const accent = STOCK_ACCENTS[ticker];
              const stock = stocks[ticker];
              if (!stock) return null;

              // Filter articles
              const articles = feed.articles.filter(a => {
                if (filter === 'pr') return a.type === 'pr';
                if (filter === 'news') return a.type === 'news';
                if (filter === 'edgar') return false;
                return true;
              });

              // Filter filings
              const filings = filter === 'pr' || filter === 'news'
                ? []
                : feed.filings;

              const isLoading = feed.loadingPR || feed.loadingNews || feed.loadingEdgar;

              if (!feed.loaded && !isLoading) return null;
              if (articles.length === 0 && filings.length === 0 && !isLoading) return null;

              // Sort articles by date descending
              const sortedArticles = [...articles]
                .filter(a => {
                  const key = artKey(ticker, a);
                  return !dbArticles.get(key)?.hidden;
                })
                .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
                .slice(0, 10);

              // Sort filings by date descending
              const sortedFilings = [...filings]
                .filter(f => {
                  const key = filKey(ticker, f.accessionNumber);
                  return !dbFilings.get(key)?.hidden;
                })
                .sort((a, b) => (b.filingDate || '').localeCompare(a.filingDate || ''))
                .slice(0, 8);

              return (
                <div
                  key={ticker}
                  style={{
                    margin: '8px 12px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid ${accent.color}`,
                    background: 'var(--bg)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Stock header */}
                  <div className="sm-flex-between" style={{
                    padding: '10px 16px',
                    background: `linear-gradient(90deg, ${accent.dim} 0%, transparent 100%)`,
                  }}>
                    <div className="sm-flex sm-gap-8">
                      <span style={{
                        fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700,
                        color: accent.color,
                      }}>
                        {ticker}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                        {stock.name}
                      </span>
                    </div>
                    <div className="sm-flex sm-gap-8">
                      {isLoading && (
                        <svg
                          width="12" height="12" viewBox="0 0 16 16" fill="none"
                          style={{ animation: 'spin 1s linear infinite' }}
                        >
                          <path d="M14 8A6 6 0 1 1 8 2" stroke={accent.color} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {feed.fetchedAt && !isLoading && (
                        <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: 'var(--text3)', opacity: 0.6 }}>
                          {formatTimeAgo(feed.fetchedAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Articles */}
                  {sortedArticles.map(article => {
                    const key = artKey(ticker, article);
                    const isNew = newArticleKeys.has(key);
                    const isDismissed = dbArticles.get(key)?.dismissed ?? false;
                    const tc = TYPE_COLORS[article.type];

                    return (
                      <div
                        key={key}
                        className="sm-ed-filing-row"
                        style={{ padding: '6px 16px' }}
                      >
                        <div className="sm-ed-row-main">
                          {/* Type badge */}
                          <span className="sm-ed-form-badge" style={{
                            width: 44, fontSize: 9,
                            '--badge-bg': tc.bg, '--badge-text': tc.text,
                          } as React.CSSProperties}>
                            {article.type === 'pr' ? 'PR' : 'NEWS'}
                          </span>
                          {/* NEW/SEEN badge */}
                          <span className="sm-ed-badge-slot">
                            {isNew && !isDismissed && (
                              <button
                                onClick={() => dismissArticle(ticker, article)}
                                title="Click to acknowledge"
                                className="sm-ed-new-badge"
                              >
                                NEW
                              </button>
                            )}
                            {isNew && isDismissed && (
                              <span className="sm-ed-seen-badge">SEEN</span>
                            )}
                          </span>
                          {/* Headline */}
                          <span className="sm-ed-desc" style={{ fontSize: 12 }}>
                            {article.headline}
                          </span>
                        </div>
                        <div className="sm-ed-row-meta">
                          {article.source && (
                            <span className="sm-text3" style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", textTransform: 'uppercase' }}>
                              {article.source}
                            </span>
                          )}
                          {article.date && (
                            <span className="sm-text3 sm-shrink-0" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10 }}>
                              {article.date}
                            </span>
                          )}
                          <a
                            href={/^https?:\/\//.test(article.url) ? article.url : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open article"
                            className="sm-ed-action-btn-sm"
                          >
                            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {/* Filings */}
                  {sortedFilings.map(filing => {
                    const key = filKey(ticker, filing.accessionNumber);
                    const isNew = newFilingKeys.has(key);
                    const isDismissed = dbFilings.get(key)?.dismissed ?? false;
                    const ec = getEdgarColor(filing.form);

                    return (
                      <div
                        key={key}
                        className="sm-ed-filing-row"
                        style={{ padding: '6px 16px' }}
                      >
                        <div className="sm-ed-row-main">
                          {/* Form badge */}
                          <span className="sm-ed-form-badge" style={{
                            width: 56, fontSize: 9,
                            '--badge-bg': ec.bg, '--badge-text': ec.text,
                          } as React.CSSProperties}>
                            {filing.form}
                          </span>
                          {/* NEW/SEEN badge */}
                          <span className="sm-ed-badge-slot">
                            {isNew && !isDismissed && (
                              <button
                                onClick={() => dismissFiling(ticker, filing)}
                                title="Click to acknowledge"
                                className="sm-ed-new-badge"
                              >
                                NEW
                              </button>
                            )}
                            {isNew && isDismissed && (
                              <span className="sm-ed-seen-badge">SEEN</span>
                            )}
                          </span>
                          {/* Description */}
                          <span className="sm-ed-desc" style={{ fontSize: 12 }}>
                            {filing.primaryDocDescription || filing.form}
                          </span>
                        </div>
                        <div className="sm-ed-row-meta">
                          {filing.filingDate && (
                            <span className="sm-text3 sm-shrink-0" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10 }}>
                              {formatEdgarDate(filing.filingDate)}
                            </span>
                          )}
                          {filing.fileUrl && /^https?:\/\//.test(filing.fileUrl) && (
                            <a
                              href={filing.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open filing on SEC"
                              className="sm-ed-action-btn-sm"
                            >
                              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Loading indicator */}
                  {isLoading && articles.length === 0 && filings.length === 0 && (
                    <div className="sm-flex sm-gap-8" style={{ padding: '16px', justifyContent: 'center', color: 'var(--text3)', fontSize: 11 }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      Scanning...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
