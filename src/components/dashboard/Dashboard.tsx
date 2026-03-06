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

type FilterType = 'all' | 'new' | 'seen' | 'pr' | 'news' | 'edgar';

// ── Constants ────────────────────────────────────────────────────────────────

const ACCENT_CYCLE = ['cyan', 'violet', 'mint', 'sky', 'gold', 'coral'];

function getStockAccent(ticker: string, index: number): { color: string; dim: string } {
  const accentName = stocks[ticker]?.accent || ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  return { color: `var(--${accentName})`, dim: `var(--${accentName}-dim)` };
}

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
        const filings: EdgarFiling[] = [];
        for (const [key, rec] of dbFilingsRef.current.entries()) {
          if (key.startsWith(`${s.ticker}:`)) {
            if (!rec.hidden) {
              filings.push({
                accessionNumber: rec.accessionNumber,
                filingDate: rec.filingDate || '',
                form: rec.form,
                primaryDocDescription: rec.description || rec.form,
                reportDate: rec.reportDate || '',
                fileUrl: rec.fileUrl || '',
              });
            }
            newFilKeys.add(key);
          }
        }
        if (articles.length > 0 || filings.length > 0) {
          feedUpdates[s.ticker] = {
            ...(articles.length > 0 ? { articles } : {}),
            ...(filings.length > 0 ? { filings } : {}),
            loaded: true,
          };
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

  // ── Per-source scan ──────────────────────────────────────────────────────
  // Tracks which cells are refreshing (keys like "ASTS:pr", "BMNR:edgar")
  const [scanningCells, setScanningCells] = useState<Set<string>>(new Set());

  const scanSource = useCallback(async (ticker: string, source: 'pr' | 'news' | 'edgar') => {
    const cellKey = `${ticker}:${source}`;
    setScanningCells(prev => { const n = new Set(prev); n.add(cellKey); return n; });

    const loadingFlag = source === 'pr' ? 'loadingPR' : source === 'news' ? 'loadingNews' : 'loadingEdgar';
    setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], [loadingFlag]: true, error: null } }));

    let fetchedPRs: ArticleItem[] = [];
    let fetchedNews: ArticleItem[] = [];
    let fetchedFilings: EdgarFiling[] = [];

    try {
      if (source === 'pr') {
        const res = await fetch(`/api/press-releases/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          fetchedPRs = (d.releases || []).slice(0, 15).map((r: { date: string; headline: string; url: string; source?: string }) => ({
            headline: r.headline, date: r.date, url: r.url, source: r.source, type: 'pr' as const,
          }));
        }
      } else if (source === 'news') {
        const res = await fetch(`/api/news/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          fetchedNews = (d.articles || []).slice(0, 10).map((a: { title: string; date: string; url: string; source: string }) => ({
            headline: a.title, date: a.date, url: a.url, source: a.source, type: 'news' as const,
          }));
        }
      } else {
        const res = await fetch(`/api/edgar/${ticker}`);
        if (res.ok) {
          const d = await res.json();
          fetchedFilings = (d.filings || []).slice(0, 15);
        } else {
          console.error(`[Dashboard] EDGAR fetch failed for ${ticker}: ${res.status}`);
        }
      }
    } catch (err) {
      console.error(`[Dashboard] scanSource(${ticker}, ${source}) error:`, err);
    }

    setFeeds(prev => ({ ...prev, [ticker]: { ...prev[ticker], [loadingFlag]: false } }));

    // Process articles (PR or news)
    if (source === 'pr' || source === 'news') {
      let articles: ArticleItem[];
      if (source === 'news') {
        // Dedup news against existing PRs in feed
        const existingPRs = feeds[ticker]?.articles.filter(a => a.type === 'pr') || [];
        const prHeadlines = new Set(existingPRs.map(a => normalizeHeadline(a.headline)));
        articles = fetchedNews.filter(a => !prHeadlines.has(normalizeHeadline(a.headline)));
      } else {
        articles = fetchedPRs;
      }

      const newArtKeys = new Set<string>();
      if (articles.length > 0) {
        const toSave = articles.map(a => ({
          cacheKey: articleCacheKey(a), headline: a.headline, date: a.date,
          url: a.url, source: a.source, articleType: a.type,
        }));
        for (const a of articles) {
          const key = artKey(ticker, a);
          if (!dbArticlesRef.current.has(key)) newArtKeys.add(key);
        }
        try {
          await fetch('/api/seen-articles', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, articles: toSave }),
          });
          for (const a of toSave) {
            const key = `${ticker}:${a.cacheKey}`;
            const existing = dbArticlesRef.current.get(key);
            dbArticlesRef.current.set(key, {
              cacheKey: a.cacheKey, headline: a.headline, date: a.date || null,
              url: a.url || null, source: a.source || null, articleType: a.articleType || null,
              dismissed: newArtKeys.has(key) ? false : (existing?.dismissed ?? false),
              hidden: existing?.hidden ?? false,
            });
          }
        } catch { /* best-effort */ }
      }

      setFeeds(prev => {
        const existing = prev[ticker];
        const fetchedKeys = new Set(articles.map(a => articleCacheKey(a)));
        // Keep articles of the other type + non-overlapping articles of same type
        const kept = existing.articles.filter(a =>
          a.type !== source || !fetchedKeys.has(articleCacheKey(a))
        );
        return {
          ...prev,
          [ticker]: { ...existing, articles: [...articles, ...kept], loaded: true, fetchedAt: Date.now() },
        };
      });

      if (newArtKeys.size > 0) {
        setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newArtKeys) next.add(k); return next; });
      }
    }

    // Process filings (edgar)
    if (source === 'edgar' && fetchedFilings.length > 0) {
      const newFilKeys = new Set<string>();
      const toSave = fetchedFilings.map(f => ({
        accessionNumber: f.accessionNumber, form: f.form, filingDate: f.filingDate,
        description: f.primaryDocDescription, reportDate: f.reportDate, fileUrl: f.fileUrl, status: 'new',
      }));
      for (const f of fetchedFilings) {
        const key = filKey(ticker, f.accessionNumber);
        if (!dbFilingsRef.current.has(key)) newFilKeys.add(key);
      }
      try {
        await fetch('/api/seen-filings', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, filings: toSave }),
        });
        for (const f of toSave) {
          const key = `${ticker}:${f.accessionNumber}`;
          const existing = dbFilingsRef.current.get(key);
          dbFilingsRef.current.set(key, {
            accessionNumber: f.accessionNumber, form: f.form,
            filingDate: f.filingDate || null, description: f.description || null,
            reportDate: f.reportDate || null, fileUrl: f.fileUrl || null,
            status: f.status || null,
            dismissed: newFilKeys.has(key) ? false : (existing?.dismissed ?? false),
            hidden: existing?.hidden ?? false,
          });
        }
      } catch { /* best-effort */ }

      setFeeds(prev => ({
        ...prev,
        [ticker]: { ...prev[ticker], filings: fetchedFilings, loaded: true, fetchedAt: Date.now() },
      }));

      if (newFilKeys.size > 0) {
        setNewFilingKeys(prev => { const next = new Set(prev); for (const k of newFilKeys) next.add(k); return next; });
      }
    }

    setDbArticles(new Map(dbArticlesRef.current));
    setDbFilings(new Map(dbFilingsRef.current));
    setScanningCells(prev => { const n = new Set(prev); n.delete(cellKey); return n; });
  }, [feeds]);

  // ── Scan All — wraps scanSource for all stocks × all sources ────────────
  const scanAll = useCallback(async () => {
    setScanning(true);
    const tasks: Promise<void>[] = [];
    for (const s of stockList) {
      tasks.push(scanSource(s.ticker, 'pr'));
      tasks.push(scanSource(s.ticker, 'news'));
      if (stocks[s.ticker]?.cik) tasks.push(scanSource(s.ticker, 'edgar'));
    }
    await Promise.allSettled(tasks);
    setScanning(false);
  }, [scanSource]);

  // ── Dismiss handlers ─────────────────────────────────────────────────────
  // These write to the same seen_articles / seen_filings DB tables that
  // SharedSourcesTab and SharedEdgarTab read from. Dismiss state syncs
  // across all views on next DB load (page navigation or manual refresh).
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
      if (filter === 'new' || filter === 'seen') {
        const key = item.itemType === 'filing'
          ? filKey(item.ticker, item.accessionNumber!)
          : artKey(item.ticker, item);
        const isNew = item.itemType === 'filing'
          ? newFilingKeys.has(key)
          : newArticleKeys.has(key);
        const isDismissed = item.itemType === 'filing'
          ? dbFilings.get(key)?.dismissed ?? false
          : dbArticles.get(key)?.dismissed ?? false;
        return filter === 'new' ? (isNew && !isDismissed) : (isNew && isDismissed);
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

  // NEW badge count scoped to the active type filter
  const filteredNewCount = useMemo(() => {
    if (filter === 'all' || filter === 'new' || filter === 'seen') return totalNewCount;
    let count = 0;
    for (const s of stockList) {
      if (!activeTickers.has(s.ticker)) continue;
      const feed = feeds[s.ticker];
      if (filter === 'pr' || filter === 'news') {
        for (const a of feed.articles) {
          if (a.type !== filter) continue;
          const key = artKey(s.ticker, a);
          if (newArticleKeys.has(key) && !dbArticles.get(key)?.dismissed) count++;
        }
      }
      if (filter === 'edgar') {
        for (const f of feed.filings) {
          const key = filKey(s.ticker, f.accessionNumber);
          if (newFilingKeys.has(key) && !dbFilings.get(key)?.dismissed) count++;
        }
      }
    }
    return count;
  }, [filter, feeds, activeTickers, totalNewCount, newArticleKeys, newFilingKeys, dbArticles, dbFilings]);

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
            NEW{filteredNewCount > 0 ? ` ${filteredNewCount}` : ''}
          </button>

          <span className="db-filter-sep" />

          {/* Type filters */}
          {(['all', 'pr', 'news', 'edgar', 'seen'] as const).map(f => (
            <button
              key={f}
              className="db-filter-pill"
              data-active={filter === f}
              data-filter={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}

          <span className="db-filter-sep" />

          {/* Ticker toggles */}
          {stockList.map((s, idx) => {
            const a = getStockAccent(s.ticker, idx);
            return (
              <button
                key={s.ticker}
                className="db-ticker-pill"
                data-active={activeTickers.has(s.ticker)}
                style={{ '--pill-color': a.color, '--pill-dim': a.dim } as React.CSSProperties}
                onClick={() => toggleTicker(s.ticker)}
              >
                {s.ticker}
              </button>
            );
          })}
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
      <div className="db-stats-grid" style={{ '--stock-count': stockList.length } as React.CSSProperties}>
        {stockList.map((s, idx) => {
          const feed = feeds[s.ticker];
          const accent = getStockAccent(s.ticker, idx);
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
                <span className="db-stat-item">
                  PR: <span>{stat.prCount}</span>
                  <button
                    className="db-stat-refresh-btn"
                    title={`Refresh PRs for ${s.ticker}`}
                    disabled={scanningCells.has(`${s.ticker}:pr`)}
                    onClick={(e) => { e.stopPropagation(); scanSource(s.ticker, 'pr'); }}
                  >
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"
                      style={{ animation: scanningCells.has(`${s.ticker}:pr`) ? 'spin 1s linear infinite' : 'none' }}>
                      <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </span>
                <span className="db-stat-item">
                  News: <span>{stat.newsCount}</span>
                  <button
                    className="db-stat-refresh-btn"
                    title={`Refresh news for ${s.ticker}`}
                    disabled={scanningCells.has(`${s.ticker}:news`)}
                    onClick={(e) => { e.stopPropagation(); scanSource(s.ticker, 'news'); }}
                  >
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"
                      style={{ animation: scanningCells.has(`${s.ticker}:news`) ? 'spin 1s linear infinite' : 'none' }}>
                      <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </span>
                <span className="db-stat-item">
                  Edgar: <span>{stocks[s.ticker]?.cik ? stat.edgarCount : '—'}</span>
                  {stocks[s.ticker]?.cik && (
                    <button
                      className="db-stat-refresh-btn"
                      title={`Refresh EDGAR for ${s.ticker}`}
                      disabled={scanningCells.has(`${s.ticker}:edgar`)}
                      onClick={(e) => { e.stopPropagation(); scanSource(s.ticker, 'edgar'); }}
                    >
                      <svg width="9" height="9" viewBox="0 0 16 16" fill="none"
                        style={{ animation: scanningCells.has(`${s.ticker}:edgar`) ? 'spin 1s linear infinite' : 'none' }}>
                        <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
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
                      data-active="true"
                      style={{
                        cursor: 'default', fontSize: 8, padding: '2px 6px',
                        '--pill-color': getStockAccent(item.ticker, stockList.findIndex(s => s.ticker === item.ticker)).color,
                        '--pill-dim': getStockAccent(item.ticker, stockList.findIndex(s => s.ticker === item.ticker)).dim,
                      } as React.CSSProperties}
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
                    {item.url && /^https?:\/\//.test(item.url) && (
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
