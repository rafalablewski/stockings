/**
 * SharedSourcesTab - Unified Sources Tab with Press Releases + News
 *
 * Shared component for all stocks. Features:
 * - Two sub-tabs: SEC Press Releases and Google News
 * - Refresh button fetches 5 latest articles per tab
 * - AI-powered check marks articles already in analysis
 *
 * @version 1.0.0
 */

'use client';

import React, { useState, useCallback } from 'react';

export interface SourceGroup {
  category: string;
  sources: { name: string; url: string }[];
}

interface SharedSourcesTabProps {
  ticker: string;
  companyName: string;
  researchSources: SourceGroup[];
}

interface ArticleItem {
  headline: string;
  date: string;
  url: string;
  source?: string;
  items?: string;
  analyzed?: boolean | null; // null = not checked yet
}

type SubTab = 'press-releases' | 'news';

const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('press-releases');
  const [pressReleases, setPressReleases] = useState<ArticleItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<ArticleItem[]>([]);
  const [prLoading, setPrLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [aiChecking, setAiChecking] = useState(false);
  const [prError, setPrError] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // AI check: send articles to backend for analysis comparison
  const checkAnalyzed = useCallback(async (articles: ArticleItem[]): Promise<ArticleItem[]> => {
    if (articles.length === 0) return articles;
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          articles: articles.map(a => ({ headline: a.headline, date: a.date })),
        }),
      });
      if (!res.ok) throw new Error('AI check failed');
      const data = await res.json();
      return articles.map((article, i) => ({
        ...article,
        analyzed: data.results?.[i]?.analyzed ?? null,
      }));
    } catch {
      // If AI check fails, just return articles without analysis status
      return articles.map(a => ({ ...a, analyzed: null }));
    }
  }, [ticker]);

  // Fetch press releases from SEC
  const refreshPressReleases = useCallback(async () => {
    setPrLoading(true);
    setPrError(null);
    try {
      const res = await fetch(`/api/press-releases/${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch from SEC');
      const data = await res.json();
      const articles: ArticleItem[] = (data.releases || []).slice(0, 5).map((r: { date: string; headline: string; url: string; items?: string }) => ({
        headline: r.headline,
        date: r.date,
        url: r.url,
        items: r.items,
        analyzed: null,
      }));
      setPressReleases(articles);
      return articles;
    } catch {
      setPrError('Could not fetch from SEC EDGAR');
      return [];
    } finally {
      setPrLoading(false);
    }
  }, [ticker]);

  // Fetch news from Google News RSS
  const refreshNews = useCallback(async () => {
    setNewsLoading(true);
    setNewsError(null);
    try {
      const res = await fetch(`/api/news/${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      const articles: ArticleItem[] = (data.articles || []).slice(0, 5).map((a: { title: string; date: string; url: string; source: string }) => ({
        headline: a.title,
        date: a.date,
        url: a.url,
        source: a.source,
        analyzed: null,
      }));
      setNewsArticles(articles);
      return articles;
    } catch {
      setNewsError('Could not fetch from Google News');
      return [];
    } finally {
      setNewsLoading(false);
    }
  }, [ticker]);

  // Combined refresh: fetch both, then run AI check
  const handleRefresh = useCallback(async () => {
    const [prArticles, newsItems] = await Promise.all([
      refreshPressReleases(),
      refreshNews(),
    ]);

    // Run AI analysis check on all fetched articles
    setAiChecking(true);
    try {
      const allArticles = [...prArticles, ...newsItems];
      if (allArticles.length > 0) {
        const checked = await checkAnalyzed(allArticles);
        // Split results back into PR and news
        setPressReleases(checked.slice(0, prArticles.length));
        setNewsArticles(checked.slice(prArticles.length));
      }
    } finally {
      setAiChecking(false);
      setLastFetched(new Date().toLocaleTimeString());
    }
  }, [refreshPressReleases, refreshNews, checkAnalyzed]);

  const isLoading = prLoading || newsLoading || aiChecking;

  const renderArticle = (article: ArticleItem, i: number) => {
    const statusIcon = article.analyzed === null
      ? <span style={{ fontSize: 13, color: 'var(--text3)', flexShrink: 0, marginTop: 2 }}>?</span>
      : article.analyzed
        ? <span style={{ fontSize: 15, color: '#22c55e', flexShrink: 0, marginTop: 1 }}>✓</span>
        : <span style={{ fontSize: 15, color: '#ef4444', flexShrink: 0, marginTop: 1 }}>✗</span>;

    const statusText = article.analyzed === null
      ? 'Not checked'
      : article.analyzed
        ? 'In analysis'
        : 'Not in analysis';

    return (
      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        {statusIcon}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}
          >
            {article.headline} <span style={{ color: 'var(--text3)', fontSize: 11 }}>↗</span>
          </a>
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>
            {article.date}
            {article.source ? ` · ${article.source}` : ''}
            {article.items ? ` · ${article.items}` : ''}
            {' · '}
            <span style={{ color: article.analyzed === true ? '#22c55e' : article.analyzed === false ? '#ef4444' : 'var(--text3)' }}>
              {statusText}
            </span>
          </span>
        </div>
      </li>
    );
  };

  const subTabStyle = (tab: SubTab): React.CSSProperties => ({
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: activeSubTab === tab ? 600 : 400,
    color: activeSubTab === tab ? 'var(--accent)' : 'var(--text3)',
    background: activeSubTab === tab ? 'var(--bg2)' : 'transparent',
    border: activeSubTab === tab ? '1px solid var(--border)' : '1px solid transparent',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.15s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Sources</h2>
      <div className="highlight">
        <h3>Live Sources & Research</h3>
        <p style={{ fontSize: 13, color: 'var(--text2)' }}>
          Live article feeds for {companyName} ({ticker}). Refresh to pull latest press releases and news, with AI-powered analysis status check.
        </p>
      </div>

      {/* Live feeds card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setActiveSubTab('press-releases')} style={subTabStyle('press-releases')}>
              SEC Press Releases
            </button>
            <button onClick={() => setActiveSubTab('news')} style={subTabStyle('news')}>
              Google News
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {lastFetched && (
              <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                {lastFetched}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                color: 'var(--text2)',
                fontSize: 11,
                padding: '4px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <span style={{ display: 'inline-block', animation: isLoading ? 'spin 1s linear infinite' : 'none' }}>
                ↻
              </span>
              {prLoading || newsLoading ? 'Fetching...' : aiChecking ? 'AI Checking...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Press Releases sub-tab */}
        {activeSubTab === 'press-releases' && (
          <div>
            {prError && <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8 }}>{prError}</div>}
            {pressReleases.length === 0 && !prLoading && (
              <div style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 0' }}>
                Click Refresh to fetch latest SEC 8-K filings for {ticker}.
              </div>
            )}
            {pressReleases.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pressReleases.map((pr, i) => renderArticle(pr, i))}
              </ul>
            )}
          </div>
        )}

        {/* News sub-tab */}
        {activeSubTab === 'news' && (
          <div>
            {newsError && <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8 }}>{newsError}</div>}
            {newsArticles.length === 0 && !newsLoading && (
              <div style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 0' }}>
                Click Refresh to fetch latest Google News articles for {companyName}.
              </div>
            )}
            {newsArticles.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {newsArticles.map((article, i) => renderArticle(article, i))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Static research sources */}
      {researchSources.map(group => (
        <div key={group.category} className="card">
          <div className="card-title">{group.category}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {group.sources.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
                {s.name} <span style={{ color: 'var(--text3)', fontSize: 11 }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharedSourcesTab;
