/**
 * SharedSourcesTab - Unified Sources Tab with Press Releases + News + Competitor News
 *
 * Shared component for all stocks. Features:
 * - Three sub-tabs: Press Releases, Latest News, Competitor News
 * - Refresh button fetches 5 latest articles per tab
 * - AI-powered check marks articles already in analysis
 *
 * Press Releases aggregates from: PR Newswire, Business Wire, GlobeNewswire, company IR
 * Latest News shows all recent coverage via Google News
 * Competitor News shows latest from key competitors/peers
 *
 * @version 3.0.0
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
  competitorLabel?: string; // e.g. "D2D Competitors", "BTC Treasury Peers"
}

interface ArticleItem {
  headline: string;
  date: string;
  url: string;
  source?: string;
  items?: string;
  analyzed?: boolean | null; // null = not checked yet
}

type SubTab = 'press-releases' | 'news' | 'competitors';

const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources, competitorLabel }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('press-releases');
  const [pressReleases, setPressReleases] = useState<ArticleItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<ArticleItem[]>([]);
  const [competitorArticles, setCompetitorArticles] = useState<ArticleItem[]>([]);
  const [prLoading, setPrLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [aiChecking, setAiChecking] = useState(false);
  const [prError, setPrError] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [compError, setCompError] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // AI check: send articles to backend for analysis comparison
  const checkAnalyzed = useCallback(async (articles: ArticleItem[]): Promise<ArticleItem[]> => {
    if (articles.length === 0) return articles;
    console.log('[checkAnalyzed] Starting fetch for', articles.length, 'articles, ticker:', ticker);
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          articles: articles.map(a => ({ headline: a.headline, date: a.date })),
        }),
      });
      if (!res.ok) throw new Error(`AI check failed: ${res.status}`);
      const data = await res.json();
      if (data.error) {
        console.warn('[checkAnalyzed] Server error:', data.error);
        throw new Error(data.error);
      }
      return articles.map((article, i) => ({
        ...article,
        analyzed: data.results?.[i]?.analyzed ?? null,
      }));
    } catch (err) {
      console.error('[SharedSourcesTab] AI check error:', err);
      return articles.map(a => ({ ...a, analyzed: null }));
    }
  }, [ticker]);

  // Combined refresh: fetch all three sources, then run AI check
  const handleRefresh = useCallback(async () => {
    setPrLoading(true);
    setNewsLoading(true);
    setCompLoading(true);
    setPrError(null);
    setNewsError(null);
    setCompError(null);
    setAiError(null);

    // Fetch all three in parallel
    let prArticles: ArticleItem[] = [];
    let newsItems: ArticleItem[] = [];
    let compItems: ArticleItem[] = [];

    const [prResult, newsResult, compResult] = await Promise.allSettled([
      fetch(`/api/press-releases/${ticker}`).then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch press releases');
        const data = await res.json();
        return (data.releases || []).slice(0, 5).map((r: { date: string; headline: string; url: string; source?: string; items?: string }) => ({
          headline: r.headline,
          date: r.date,
          url: r.url,
          source: r.source,
          items: r.items,
          analyzed: null as boolean | null,
        }));
      }),
      fetch(`/api/news/${ticker}`).then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        return (data.articles || []).slice(0, 5).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title,
          date: a.date,
          url: a.url,
          source: a.source,
          analyzed: null as boolean | null,
        }));
      }),
      fetch(`/api/competitor-news/${ticker}`).then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch competitor news');
        const data = await res.json();
        return (data.articles || []).slice(0, 5).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title,
          date: a.date,
          url: a.url,
          source: a.source,
          analyzed: null as boolean | null,
        }));
      }),
    ]);

    if (prResult.status === 'fulfilled') {
      prArticles = prResult.value;
    } else {
      setPrError('Could not fetch press releases');
    }
    if (newsResult.status === 'fulfilled') {
      newsItems = newsResult.value;
    } else {
      setNewsError('Could not fetch from Google News');
    }
    if (compResult.status === 'fulfilled') {
      compItems = compResult.value;
    } else {
      setCompError('Could not fetch competitor news');
    }

    setPrLoading(false);
    setNewsLoading(false);
    setCompLoading(false);

    // Show articles immediately while AI checks
    setPressReleases(prArticles);
    setNewsArticles(newsItems);
    setCompetitorArticles(compItems);

    // Run AI analysis check on press releases + news (not competitors)
    const ownArticles = [...prArticles, ...newsItems];
    if (ownArticles.length > 0) {
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(ownArticles);
        const checkedPr = checked.slice(0, prArticles.length);
        const checkedNews = checked.slice(prArticles.length);
        setPressReleases(checkedPr);
        setNewsArticles(checkedNews);
      } catch (err) {
        console.error('[handleRefresh] checkAnalyzed error:', err);
        setAiError(err instanceof Error ? err.message : 'AI check failed');
      } finally {
        setAiChecking(false);
      }
    }

    setLastFetched(new Date().toLocaleTimeString());
  }, [ticker, checkAnalyzed]);

  const isLoading = prLoading || newsLoading || compLoading || aiChecking;

  const renderArticle = (article: ArticleItem, i: number, showStatus = true) => {
    const statusIcon = !showStatus
      ? null
      : article.analyzed === null
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
            {showStatus && (
              <>
                {' · '}
                <span style={{ color: article.analyzed === true ? '#22c55e' : article.analyzed === false ? '#ef4444' : 'var(--text3)' }}>
                  {statusText}
                </span>
              </>
            )}
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

  const compTabLabel = competitorLabel || 'Competitor News';

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Sources</h2>
      <div className="highlight">
        <h3>Live Sources & Research</h3>
        <p style={{ fontSize: 13, color: 'var(--text2)' }}>
          Live article feeds for {companyName} ({ticker}). Press releases sourced from the company IR page, PR Newswire, Business Wire &amp; GlobeNewswire. Latest News pulls all recent coverage. {compTabLabel} tracks key peers. AI-powered analysis status check included.
        </p>
      </div>

      {/* Live feeds card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setActiveSubTab('press-releases')} style={subTabStyle('press-releases')}>
              Press Releases
            </button>
            <button onClick={() => setActiveSubTab('news')} style={subTabStyle('news')}>
              Latest News
            </button>
            <button onClick={() => setActiveSubTab('competitors')} style={subTabStyle('competitors')}>
              {compTabLabel}
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
              {prLoading || newsLoading || compLoading ? 'Fetching...' : aiChecking ? 'AI Checking...' : 'Refresh'}
            </button>
          </div>
        </div>

        {aiError && (
          <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8, padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: 6 }}>
            AI Check: {aiError}
          </div>
        )}

        {/* Press Releases sub-tab */}
        {activeSubTab === 'press-releases' && (
          <div>
            {prError && <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8 }}>{prError}</div>}
            {pressReleases.length === 0 && !prLoading && (
              <div style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 0' }}>
                Click Refresh to fetch latest press releases for {ticker} from PR Newswire, Business Wire, GlobeNewswire, and IR.
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
                Click Refresh to fetch all latest news for {companyName} ({ticker}).
              </div>
            )}
            {newsArticles.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {newsArticles.map((article, i) => renderArticle(article, i))}
              </ul>
            )}
          </div>
        )}

        {/* Competitor News sub-tab */}
        {activeSubTab === 'competitors' && (
          <div>
            {compError && <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8 }}>{compError}</div>}
            {competitorArticles.length === 0 && !compLoading && (
              <div style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 0' }}>
                Click Refresh to fetch latest competitor &amp; peer news.
              </div>
            )}
            {competitorArticles.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {competitorArticles.map((article, i) => renderArticle(article, i, false))}
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
