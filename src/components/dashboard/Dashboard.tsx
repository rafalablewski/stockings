/**
 * Dashboard — Bloomberg-style unified intelligence feed
 *
 * Aggregates news, press releases, and SEC EDGAR filings for all stocks
 * in a dense, terminal-style layout grouped by date. Shares the same DB
 * records as individual stock pages so dismiss state syncs everywhere.
 */

'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { stockList, stocks } from '@/lib/stocks';
import { articleCacheKey, normalizeHeadline } from '@/lib/sourceUtils';
import '../stocks/stock-model-styles.css';
import './dashboard.css';

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

// Unified feed item for the chronological view
interface FeedItem {
  ticker: string;
  headline: string;
  date: string;
  url: string;
  source?: string;
  itemType: 'pr' | 'news' | 'filing';
  // filing-specific
  form?: string;
  accessionNumber?: string;
  fileUrl?: string;
  primaryDocDescription?: string;
}

type FilterType = 'all' | 'new' | 'pr' | 'news' | 'edgar';

// ── Constants ────────────────────────────────────────────────────────────────

const STOCK_ACCENTS: Record<string, { color: string; dim: string }> = {
  ASTS: { color: 'var(--cyan)', dim: 'var(--cyan-dim)' },
  BMNR: { color: 'var(--violet)', dim: 'var(--violet-dim)' },
  CRCL: { color: 'var(--mint)', dim: 'var(--mint-dim)' },
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  pr: { bg: 'var(--sky-dim)', text: 'var(--sky)' },
  news: { bg: 'var(--mint-dim)', text: 'var(--mint)' },
};

const EDGAR_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
  '10-Q': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
  '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
  'Form 4': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'Form 3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'SC 13D': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'SC 13D/A': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'SC 13G': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'DEF 14A': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
};

const DEFAULT_EDGAR_COLOR = { bg: 'rgba(110,118,129,0.15)', text: 'var(--text3)' };

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function formatDateLabel(dateStr: string): string {
  if (!dateStr) return 'Unknown Date';
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDayOfWeek(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { weekday: 'long' });
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

export default function Dashboard() {
  const [feeds, setFeeds] = useState<Record<string, StockFeedState>>(() => {
    const init: Record<string, StockFeedState> = {};
    for (const s of stockList) init[s.ticker] = { ...INITIAL_FEED_STATE };
    return init;
  });

  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeTickers, setActiveTickers] = useState<Set<string>>(
    () => new Set(stockList.map(s => s.ticker))
  );

  // DB state
  const dbArticlesRef = useRef<Map<string, DbArticleRecord>>(new Map());
  const [dbArticles, setDbArticles] = useState<Map<string, DbArticleRecord>>(new Map());
  const dbFilingsRef = useRef<Map<string, DbFilingRecord>>(new Map());
  const [dbFilings, setDbFilings] = useState<Map<string, DbFilingRecord>>(new Map());
  const [newArticleKeys, setNewArticleKeys] = useState<Set<string>>(new Set());
  const [newFilingKeys, setNewFilingKeys] = useState<Set<string>>(new Set());

  // DB key helpers
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

      // Hydrate feeds from DB records
      const feedUpdates: Record<string, Partial<StockFeedState>> = {};
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
          }
        }
        if (articles.length > 0) {
          feedUpdates[s.ticker] = { articles, loaded: true };
        }
        for (const [key, rec] of dbArticlesRef.current.entries()) {
          if (key.startsWith(`${s.ticker}:`) && !rec.dismissed) {
            setNewArticleKeys(prev => { const next = new Set(prev); next.add(key); return next; });
          }
        }
        for (const [key, rec] of dbFilingsRef.current.entries()) {
          if (key.startsWith(`${s.ticker}:`) && !rec.dismissed) {
            setNewFilingKeys(prev => { const next = new Set(prev); next.add(key); return next; });
          }
        }
      }
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
      setFeeds(prev => ({
        ...prev,
        [ticker]: { ...prev[ticker], loadingPR: true, loadingNews: true, loadingEdgar: true, error: null },
      }));

      const results: { prs: ArticleItem[]; news: ArticleItem[]; filings: EdgarFiling[] } = {
        prs: [], news: [], filings: [],
      };

      try {
        const res = await fetch(`/api/press-releases/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.prs = (d.releases || []).slice(0, 15).map((r: { date: string; headline: string; url: string; source?: string }) => ({
            headline: r.headline, date: r.date, url: r.url, source: r.source, type: 'pr' as const,
          }));
        }
      } catch { /* continue */ }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingPR: false } }));

      try {
        const res = await fetch(`/api/news/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.news = (d.articles || []).slice(0, 10).map((a: { title: string; date: string; url: string; source: string }) => ({
            headline: a.title, date: a.date, url: a.url, source: a.source, type: 'news' as const,
          }));
        }
      } catch { /* continue */ }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingNews: false } }));

      try {
        const res = await fetch(`/api/edgar/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          results.filings = (d.filings || []).slice(0, 15);
        }
      } catch { /* continue */ }
      setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], loadingEdgar: false } }));

      // Deduplicate news against PRs
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

      // Merge with existing
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

      if (newArtKeys.size > 0) {
        setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newArtKeys) next.add(k); return next; });
      }
      if (newFilKeys.size > 0) {
        setNewFilingKeys(prev => { const next = new Set(prev); for (const k of newFilKeys) next.add(k); return next; });
      }

      setDbArticles(new Map(dbArticlesRef.current));
      setDbFilings(new Map(dbFilingsRef.current));
    };

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
    fetch('/api/seen-articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticker,
        articles: [{ cacheKey: articleCacheKey(article), headline: article.headline, date: article.date, url: article.url, source: article.source, articleType: article.type }],
        dismiss: true,
      }),
    }).catch(err => console.error('[Dashboard] dismiss error:', err));
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
    }).catch(err => console.error('[Dashboard] dismiss filing error:', err));
  }, []);

  // ── Computed: Unified feed ────────────────────────────────────────────────
  const unifiedFeed = useMemo(() => {
    const items: FeedItem[] = [];

    for (const s of stockList) {
      if (!activeTickers.has(s.ticker)) continue;
      const feed = feeds[s.ticker];

      // Articles
      for (const a of feed.articles) {
        const key = artKey(s.ticker, a);
        if (dbArticles.get(key)?.hidden) continue;
        items.push({
          ticker: s.ticker,
          headline: a.headline,
          date: a.date,
          url: a.url,
          source: a.source,
          itemType: a.type,
        });
      }

      // Filings
      for (const f of feed.filings) {
        const key = filKey(s.ticker, f.accessionNumber);
        if (dbFilings.get(key)?.hidden) continue;
        items.push({
          ticker: s.ticker,
          headline: f.primaryDocDescription || f.form,
          date: f.filingDate,
          url: f.fileUrl,
          source: 'sec.gov',
          itemType: 'filing',
          form: f.form,
          accessionNumber: f.accessionNumber,
          fileUrl: f.fileUrl,
          primaryDocDescription: f.primaryDocDescription,
        });
      }
    }

    // Sort by date desc
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    // Apply type filter
    return items.filter(item => {
      if (filter === 'pr') return item.itemType === 'pr';
      if (filter === 'news') return item.itemType === 'news';
      if (filter === 'edgar') return item.itemType === 'filing';
      if (filter === 'new') {
        const key = item.itemType === 'filing'
          ? filKey(item.ticker, item.accessionNumber!)
          : artKey(item.ticker, item);
        const isNew = item.itemType === 'filing'
          ? newFilingKeys.has(key)
          : newArticleKeys.has(key);
        const isDismissed = item.itemType === 'filing'
          ? dbFilings.get(key)?.dismissed ?? false
          : dbArticles.get(key)?.dismissed ?? false;
        return isNew && !isDismissed;
      }
      return true;
    });
  }, [feeds, activeTickers, filter, dbArticles, dbFilings, newArticleKeys, newFilingKeys]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const map = new Map<string, FeedItem[]>();
    for (const item of unifiedFeed) {
      const dateKey = item.date || 'unknown';
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(item);
    }
    return map;
  }, [unifiedFeed]);

  // ── Computed: Per-stock stats ──────────────────────────────────────────────
  const perStockStats = useMemo(() => {
    const stats: Record<string, { prCount: number; newsCount: number; edgarCount: number; newCount: number }> = {};
    for (const s of stockList) {
      const feed = feeds[s.ticker];
      let newCount = 0;
      for (const key of newArticleKeys) {
        if (key.startsWith(`${s.ticker}:`) && !dbArticles.get(key)?.dismissed) newCount++;
      }
      for (const key of newFilingKeys) {
        if (key.startsWith(`${s.ticker}:`) && !dbFilings.get(key)?.dismissed) newCount++;
      }
      stats[s.ticker] = {
        prCount: feed.articles.filter(a => a.type === 'pr').length,
        newsCount: feed.articles.filter(a => a.type === 'news').length,
        edgarCount: feed.filings.length,
        newCount,
      };
    }
    return stats;
  }, [feeds, newArticleKeys, newFilingKeys, dbArticles, dbFilings]);

  const totalNewCount = useMemo(() =>
    Object.values(perStockStats).reduce((sum, s) => sum + s.newCount, 0),
    [perStockStats],
  );

  const anyLoading = Object.values(feeds).some(f => f.loadingPR || f.loadingNews || f.loadingEdgar);
  const anyLoaded = Object.values(feeds).some(f => f.loaded);

  // ── Toggle ticker ─────────────────────────────────────────────────────────
  const toggleTicker = useCallback((ticker: string) => {
    setActiveTickers(prev => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        // Don't allow deactivating all
        if (next.size <= 1) return prev;
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', background: 'var(--bg)' }}>
      {/* Zone A: Toolbar */}
      <div className="db-toolbar">
        <div className="db-toolbar-left">
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const,
            color: 'var(--text3)',
          }}>
            Intel Feed
          </span>
        </div>

        <div className="db-toolbar-center">
          {/* NEW filter */}
          <button
            className="db-filter-pill"
            data-active={filter === 'new'}
            data-filter="new"
            onClick={() => setFilter(filter === 'new' ? 'all' : 'new')}
          >
            NEW{totalNewCount > 0 ? ` ${totalNewCount}` : ''}
          </button>

          <span className="db-filter-sep" />

          {/* Type filters */}
          {(['all', 'pr', 'news', 'edgar'] as const).map(f => (
            <button
              key={f}
              className="db-filter-pill"
              data-active={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}

          <span className="db-filter-sep" />

          {/* Ticker toggles */}
          {stockList.map(s => (
            <button
              key={s.ticker}
              className="db-ticker-pill"
              data-ticker={s.ticker}
              data-active={activeTickers.has(s.ticker)}
              onClick={() => toggleTicker(s.ticker)}
            >
              {s.ticker}
            </button>
          ))}
        </div>

        <div className="db-toolbar-right">
          <button
            onClick={scanAll}
            disabled={scanning}
            className="db-scan-btn"
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
      </div>

      {/* Zone B: Stats Strip */}
      <div className="db-stats-grid">
        {stockList.map(s => {
          const feed = feeds[s.ticker];
          const accent = STOCK_ACCENTS[s.ticker];
          const stat = perStockStats[s.ticker];
          const isLoading = feed.loadingPR || feed.loadingNews || feed.loadingEdgar;
          const isActive = activeTickers.has(s.ticker);

          return (
            <div
              key={s.ticker}
              className="db-stat-cell"
              data-active={isActive}
              onClick={() => toggleTicker(s.ticker)}
            >
              <div className="db-stat-cell-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    className="db-status-dot"
                    data-state={isLoading ? 'loading' : feed.loaded ? 'loaded' : 'idle'}
                    style={{ color: accent.color, background: isLoading ? undefined : feed.loaded ? accent.color : undefined }}
                  />
                  <span className="db-stat-ticker" style={{ color: accent.color }}>
                    {s.ticker}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                    {stocks[s.ticker]?.name}
                  </span>
                </div>
                {stat.newCount > 0 && (
                  <span
                    className="db-stat-new-count"
                    style={{ background: 'rgba(255,123,114,0.15)', color: 'var(--coral)' }}
                  >
                    {stat.newCount} new
                  </span>
                )}
              </div>
              <div className="db-stat-breakdown">
                <span className="db-stat-item">PR: <span>{stat.prCount}</span></span>
                <span className="db-stat-item">News: <span>{stat.newsCount}</span></span>
                <span className="db-stat-item">
                  Edgar: <span>{s.ticker === 'CRCL' ? '—' : stat.edgarCount}</span>
                </span>
              </div>
              {feed.fetchedAt && !isLoading && (
                <span className="db-stat-time">Scanned {formatTimeAgo(feed.fetchedAt)}</span>
              )}
              {isLoading && (
                <span className="db-stat-time" style={{ color: 'var(--gold)' }}>Scanning...</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Zone C: Feed */}
      <div className="db-feed">
        {/* Empty state */}
        {!anyLoading && !anyLoaded && (
          <div className="db-empty">
            <div className="db-empty-title">No data loaded</div>
            <div className="db-empty-desc">
              Click <strong style={{ color: 'var(--mint)' }}>Scan All</strong> to fetch news,
              press releases, and SEC filings across all coverage.
            </div>
          </div>
        )}

        {/* Empty filter result */}
        {anyLoaded && unifiedFeed.length === 0 && (
          <div className="db-empty">
            <div className="db-empty-title">No items match filter</div>
            <div className="db-empty-desc">
              Try adjusting your filters or scanning for new data.
            </div>
          </div>
        )}

        {/* Date-grouped feed */}
        {Array.from(groupedByDate.entries()).map(([dateKey, items]) => (
          <div key={dateKey}>
            {/* Date separator */}
            <div className="db-date-sep">
              <span className="db-date-sep-label">{formatDateLabel(dateKey)}</span>
              <span className="db-date-sep-line" />
              <span className="db-date-sep-day">{formatDayOfWeek(dateKey)}</span>
            </div>

            {/* Items for this date */}
            {items.map((item, idx) => {
              const isFiling = item.itemType === 'filing';
              const key = isFiling
                ? filKey(item.ticker, item.accessionNumber!)
                : artKey(item.ticker, item);

              const isNew = isFiling
                ? newFilingKeys.has(key)
                : newArticleKeys.has(key);
              const isDismissed = isFiling
                ? dbFilings.get(key)?.dismissed ?? false
                : dbArticles.get(key)?.dismissed ?? false;

              const typeColor = isFiling
                ? (EDGAR_COLORS[item.form!] || DEFAULT_EDGAR_COLOR)
                : TYPE_COLORS[item.itemType];

              const typeLabel = isFiling ? item.form! : item.itemType === 'pr' ? 'PR' : 'NEWS';

              return (
                <div key={`${key}-${idx}`} className="db-feed-row">
                  <div className="db-feed-row-badges">
                    {/* Ticker pill */}
                    <span
                      className="db-ticker-pill"
                      data-ticker={item.ticker}
                      data-active="true"
                      style={{ cursor: 'default', fontSize: 8, padding: '2px 6px' }}
                    >
                      {item.ticker}
                    </span>

                    {/* Type badge */}
                    <span
                      className="sm-ed-form-badge"
                      style={{
                        width: isFiling ? 52 : 40,
                        fontSize: 9,
                        '--badge-bg': typeColor.bg,
                        '--badge-text': typeColor.text,
                      } as React.CSSProperties}
                    >
                      {typeLabel}
                    </span>

                    {/* NEW / SEEN badge */}
                    <span className="sm-ed-badge-slot">
                      {isNew && !isDismissed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isFiling) {
                              dismissFiling(item.ticker, {
                                accessionNumber: item.accessionNumber!,
                                form: item.form!,
                                filingDate: item.date,
                                primaryDocDescription: item.primaryDocDescription || '',
                                reportDate: '',
                                fileUrl: item.fileUrl || '',
                              });
                            } else {
                              dismissArticle(item.ticker, {
                                headline: item.headline,
                                date: item.date,
                                url: item.url,
                                source: item.source,
                                type: item.itemType as 'pr' | 'news',
                              });
                            }
                          }}
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
                  </div>

                  {/* Headline */}
                  <span className="db-feed-row-headline">
                    {item.headline}
                  </span>

                  {/* Meta */}
                  <div className="db-feed-row-meta">
                    {item.source && (
                      <span className="db-feed-row-source">{item.source}</span>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open"
                        className="db-feed-row-link"
                        onClick={e => e.stopPropagation()}
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
          </div>
        ))}

        {/* Loading indicator */}
        {anyLoading && !anyLoaded && (
          <div className="db-empty">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div className="db-empty-title">Scanning all stocks...</div>
          </div>
        )}
      </div>
    </div>
  );
}
