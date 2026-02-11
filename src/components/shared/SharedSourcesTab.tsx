/**
 * SharedSourcesTab — flat list of company feed cards
 *
 * Every company (the stock itself + each competitor) gets an identical card:
 *   ┌─ Company Name ──────────────────── [↻ Load] ┐
 *   │ [Press Releases (N)] [Latest News (N)]       │
 *   │  • headline ...                               │
 *   └──────────────────────────────────────────────┘
 *
 * Main stock uses /api/press-releases + /api/news.
 * Competitors use /api/competitor-feed/[company].
 * AI analysis check runs only on the main stock card.
 *
 * @version 5.0.0
 */

'use client';

import React, { useState, useCallback } from 'react';

export interface SourceGroup {
  category: string;
  sources: { name: string; url: string }[];
}

export interface Competitor {
  name: string;
  url: string;
}

interface SharedSourcesTabProps {
  ticker: string;
  companyName: string;
  researchSources: SourceGroup[];
  competitorLabel?: string;
  competitors?: Competitor[];
}

interface ArticleItem {
  headline: string;
  date: string;
  url: string;
  source?: string;
  items?: string;
  analyzed?: boolean | null;
}

interface CardData {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  activeTab: 'pr' | 'news';
  pressReleases: ArticleItem[];
  news: ArticleItem[];
}

// ── Reusable article list ───────────────────────────────────────────────────
const ArticleList: React.FC<{
  articles: ArticleItem[];
  empty: string;
  showAnalysis?: boolean;
}> = ({ articles, empty, showAnalysis }) => {
  if (articles.length === 0) {
    return <div style={{ fontSize: 12, color: 'var(--text3)', padding: '6px 0' }}>{empty}</div>;
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {articles.map((a, i) => {
        const statusIcon = !showAnalysis ? null
          : a.analyzed === null
            ? <span style={{ fontSize: 12, color: 'var(--text3)', flexShrink: 0, marginTop: 2 }}>?</span>
            : a.analyzed
              ? <span style={{ fontSize: 14, color: '#22c55e', flexShrink: 0, marginTop: 1 }}>✓</span>
              : <span style={{ fontSize: 14, color: '#ef4444', flexShrink: 0, marginTop: 1 }}>✗</span>;
        const statusText = !showAnalysis ? null
          : a.analyzed === null ? 'Not checked'
          : a.analyzed ? 'In analysis' : 'Not in analysis';
        return (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            {statusIcon}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <a href={a.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', lineHeight: 1.4 }}>
                {a.headline} <span style={{ color: 'var(--text3)', fontSize: 10 }}>↗</span>
              </a>
              <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                {a.date}
                {a.source ? ` · ${a.source}` : ''}
                {a.items ? ` · ${a.items}` : ''}
                {showAnalysis && statusText && (
                  <>
                    {' · '}
                    <span style={{ color: a.analyzed === true ? '#22c55e' : a.analyzed === false ? '#ef4444' : 'var(--text3)' }}>
                      {statusText}
                    </span>
                  </>
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// ── Single company card ─────────────────────────────────────────────────────
const CompanyFeedCard: React.FC<{
  label: string;
  url?: string;
  data: CardData;
  showAnalysis?: boolean;
  aiChecking?: boolean;
  onLoad: () => void;
  onTabChange: (tab: 'pr' | 'news') => void;
}> = ({ label, url, data, showAnalysis, aiChecking, onLoad, onTabChange }) => {
  const prCount = data.pressReleases.length;
  const newsCount = data.news.length;
  const isActive = data.loading || (aiChecking ?? false);

  const tabBtn = (tab: 'pr' | 'news', text: string, count: number, color: string, bgAlpha: string) => (
    <button
      onClick={() => onTabChange(tab)}
      style={{
        padding: '5px 12px',
        fontSize: 11,
        fontWeight: data.activeTab === tab ? 600 : 400,
        color: data.activeTab === tab ? color : 'var(--text3)',
        background: data.activeTab === tab ? bgAlpha : 'transparent',
        border: data.activeTab === tab ? `1px solid ${color}33` : '1px solid transparent',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {text} ({count})
    </button>
  );

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderBottom: '1px solid var(--stroke)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {label}
          </span>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: 'var(--text3)', textDecoration: 'none', flexShrink: 0 }}>↗</a>
          )}
        </div>
        <button
          onClick={onLoad}
          disabled={isActive}
          style={{
            padding: '4px 10px', fontSize: 11,
            color: isActive ? 'var(--text3)' : 'var(--accent)',
            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6,
            cursor: isActive ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            opacity: isActive ? 0.6 : 1,
          }}
        >
          <span style={{ display: 'inline-block', animation: isActive ? 'spin 1s linear infinite' : 'none' }}>↻</span>
          {data.loading ? 'Fetching...' : (aiChecking ? 'Checking...' : data.loaded ? 'Refresh' : 'Load')}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px 14px' }}>
        {data.error && (
          <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 8, padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: 6 }}>
            {data.error}
          </div>
        )}

        {!data.loaded && !data.loading && (
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>
            Click Load to fetch latest press releases &amp; news.
          </div>
        )}

        {data.loading && (
          <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', padding: '8px 0' }}>
            Fetching press releases &amp; news...
          </div>
        )}

        {data.loaded && (
          <>
            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
              {tabBtn('pr', 'Press Releases', prCount, '#3b82f6', 'rgba(59,130,246,0.08)')}
              {tabBtn('news', 'Latest News', newsCount, '#22c55e', 'rgba(34,197,94,0.08)')}
            </div>

            {data.activeTab === 'pr' && (
              <ArticleList articles={data.pressReleases} empty="No press releases found." showAnalysis={showAnalysis} />
            )}
            {data.activeTab === 'news' && (
              <ArticleList articles={data.news} empty="No recent news found." showAnalysis={showAnalysis} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources, competitorLabel, competitors }) => {
  // Main stock card state
  const [mainCard, setMainCard] = useState<CardData>({
    loading: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
  });
  const [aiChecking, setAiChecking] = useState(false);

  // Competitor card states
  const [compCards, setCompCards] = useState<Record<string, CardData>>({});
  const [loadingAll, setLoadingAll] = useState(false);

  // AI check for main stock only
  const checkAnalyzed = useCallback(async (articles: ArticleItem[]): Promise<ArticleItem[]> => {
    if (articles.length === 0) return articles;
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: articles.map(a => ({ headline: a.headline, date: a.date })) }),
      });
      if (!res.ok) throw new Error(`AI check failed: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return articles.map((article, i) => ({ ...article, analyzed: data.results?.[i]?.analyzed ?? null }));
    } catch (err) {
      console.error('[SharedSourcesTab] AI check error:', err);
      return articles.map(a => ({ ...a, analyzed: null }));
    }
  }, [ticker]);

  // Load main stock card
  const loadMainCard = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loading: true, error: null }));

    let prs: ArticleItem[] = [];
    let news: ArticleItem[] = [];

    const [prResult, newsResult] = await Promise.allSettled([
      fetch(`/api/press-releases/${ticker}`).then(async res => {
        if (!res.ok) throw new Error('Failed');
        const d = await res.json();
        return (d.releases || []).slice(0, 5).map((r: { date: string; headline: string; url: string; source?: string; items?: string }) => ({
          headline: r.headline, date: r.date, url: r.url, source: r.source, items: r.items, analyzed: null as boolean | null,
        }));
      }),
      fetch(`/api/news/${ticker}`).then(async res => {
        if (!res.ok) throw new Error('Failed');
        const d = await res.json();
        return (d.articles || []).slice(0, 5).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
        }));
      }),
    ]);

    if (prResult.status === 'fulfilled') prs = prResult.value;
    if (newsResult.status === 'fulfilled') news = newsResult.value;
    const error = (prResult.status === 'rejected' && newsResult.status === 'rejected')
      ? 'Could not fetch feeds' : null;

    setMainCard(prev => ({
      ...prev, loading: false, loaded: true, error,
      pressReleases: prs, news,
    }));

    // AI analysis check
    const all = [...prs, ...news];
    if (all.length > 0) {
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(all);
        setMainCard(prev => ({
          ...prev,
          pressReleases: checked.slice(0, prs.length),
          news: checked.slice(prs.length),
        }));
      } catch { /* already handled */ } finally {
        setAiChecking(false);
      }
    }
  }, [ticker, checkAnalyzed]);

  // Load a single competitor
  const loadCompetitor = useCallback(async (name: string) => {
    setCompCards(prev => ({
      ...prev,
      [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: true, loaded: false, error: null },
    }));

    try {
      const res = await fetch(`/api/competitor-feed/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      const prs: ArticleItem[] = (data.pressReleases || []).map((a: { title: string; date: string; url: string; source: string }) => ({
        headline: a.title, date: a.date, url: a.url, source: a.source,
      }));
      const news: ArticleItem[] = (data.news || []).map((a: { title: string; date: string; url: string; source: string }) => ({
        headline: a.title, date: a.date, url: a.url, source: a.source,
      }));

      setCompCards(prev => ({
        ...prev,
        [name]: { loading: false, loaded: true, error: null, activeTab: prev[name]?.activeTab || 'pr', pressReleases: prs, news },
      }));
    } catch {
      setCompCards(prev => ({
        ...prev,
        [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: false, loaded: false, error: `Could not fetch feeds` },
      }));
    }
  }, []);

  // Load everything
  const loadAll = useCallback(async () => {
    setLoadingAll(true);
    const promises: Promise<unknown>[] = [];
    if (!mainCard.loaded && !mainCard.loading) promises.push(loadMainCard());
    if (competitors?.length) {
      for (const c of competitors) {
        promises.push(loadCompetitor(c.name));
      }
    }
    await Promise.allSettled(promises);
    setLoadingAll(false);
  }, [mainCard.loaded, mainCard.loading, loadMainCard, competitors, loadCompetitor]);

  const setCompTab = (name: string, tab: 'pr' | 'news') => {
    setCompCards(prev => ({
      ...prev,
      [name]: { ...(prev[name] || { loading: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab },
    }));
  };

  const totalCompanies = 1 + (competitors?.length || 0);
  const loadedCount = (mainCard.loaded ? 1 : 0) + (competitors?.filter(c => compCards[c.name]?.loaded).length || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Sources</h2>

      {/* Load All bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', marginBottom: 8,
        background: 'var(--bg2)', borderRadius: 8, border: '1px solid var(--stroke)',
      }}>
        <span style={{ fontSize: 12, color: 'var(--text2)' }}>
          {loadedCount === 0
            ? `${totalCompanies} companies — load individually or all at once`
            : `${loadedCount} of ${totalCompanies} loaded`}
        </span>
        <button
          onClick={loadAll}
          disabled={loadingAll}
          style={{
            padding: '5px 14px', fontSize: 11, fontWeight: 600,
            color: loadingAll ? 'var(--text3)' : 'var(--accent)',
            background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 6,
            cursor: loadingAll ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
            opacity: loadingAll ? 0.6 : 1,
          }}
        >
          <span style={{ display: 'inline-block', animation: loadingAll ? 'spin 1s linear infinite' : 'none' }}>↻</span>
          {loadingAll ? 'Loading all...' : loadedCount > 0 ? 'Refresh All' : 'Load All'}
        </button>
      </div>

      {/* Main stock card */}
      <CompanyFeedCard
        label={`${companyName} (${ticker})`}
        data={mainCard}
        showAnalysis
        aiChecking={aiChecking}
        onLoad={loadMainCard}
        onTabChange={(tab) => setMainCard(prev => ({ ...prev, activeTab: tab }))}
      />

      {/* Competitor section label */}
      {competitors && competitors.length > 0 && (
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1,
          padding: '12px 4px 4px',
        }}>
          {competitorLabel || 'Competitors'}
        </div>
      )}

      {/* Competitor cards */}
      {competitors?.map(comp => {
        const data: CardData = compCards[comp.name] || {
          loading: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
        };
        return (
          <CompanyFeedCard
            key={comp.name}
            label={comp.name}
            url={comp.url}
            data={data}
            onLoad={() => loadCompetitor(comp.name)}
            onTabChange={(tab) => setCompTab(comp.name, tab)}
          />
        );
      })}

      {/* Static research sources */}
      {researchSources.map(group => (
        <div key={group.category} className="card">
          <div className="card-title">{group.category}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {group.sources.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
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
