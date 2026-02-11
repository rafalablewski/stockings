/**
 * SharedSourcesTab — Live Intelligence Feed
 *
 * Institutional-grade sources tab with per-company feed cards.
 * Uses the app's design system: surface layers, semantic colors,
 * Outfit + Space Mono typography, 16px card radii, accent-dim patterns.
 *
 * Accessibility: ARIA roles, keyboard nav, focus-visible rings,
 * screen reader labels, reduced-motion support.
 *
 * @version 6.0.0
 */

'use client';

import React, { useState, useCallback, useRef } from 'react';

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

// ── Status dot ──────────────────────────────────────────────────────────────
const StatusDot: React.FC<{ analyzed: boolean | null | undefined; showAnalysis?: boolean }> = ({ analyzed, showAnalysis }) => {
  if (!showAnalysis) return null;
  const color = analyzed === null || analyzed === undefined
    ? 'var(--text3)' : analyzed ? 'var(--mint)' : 'var(--coral)';
  const label = analyzed === null || analyzed === undefined
    ? 'Not checked' : analyzed ? 'In analysis' : 'Not in analysis';
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      style={{
        width: 7, height: 7, borderRadius: '50%', background: color,
        flexShrink: 0, marginTop: 6, opacity: analyzed === null ? 0.4 : 0.9,
        transition: 'opacity 0.2s, background 0.2s',
      }}
    />
  );
};

// ── Article list ────────────────────────────────────────────────────────────
const ArticleList: React.FC<{
  articles: ArticleItem[];
  empty: string;
  showAnalysis?: boolean;
}> = ({ articles, empty, showAnalysis }) => {
  if (articles.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text3)', padding: '16px 0 8px', lineHeight: 1.6 }}>
        {empty}
      </div>
    );
  }
  return (
    <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {articles.map((a, i) => (
        <li
          key={i}
          role="listitem"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 12px', borderRadius: 10,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <StatusDot analyzed={a.analyzed} showAnalysis={showAnalysis} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13, color: 'var(--text)', textDecoration: 'none', lineHeight: 1.5,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
              onFocus={e => (e.currentTarget.style.color = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.color = 'var(--text)')}
            >
              {a.headline}
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {a.date && (
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)', letterSpacing: '-0.2px' }}>
                  {a.date}
                </span>
              )}
              {a.source && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{a.source}</span>
                </>
              )}
              {a.items && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{a.items}</span>
                </>
              )}
              {showAnalysis && a.analyzed !== null && a.analyzed !== undefined && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                  <span style={{
                    fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
                    color: a.analyzed ? 'var(--mint)' : 'var(--coral)',
                  }}>
                    {a.analyzed ? 'Tracked' : 'New'}
                  </span>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// ── Feed tab button ─────────────────────────────────────────────────────────
const FeedTab: React.FC<{
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  color: string;
}> = ({ active, label, count, onClick, color }) => (
  <button
    role="tab"
    aria-selected={active}
    onClick={onClick}
    style={{
      padding: '8px 16px',
      fontSize: 12,
      fontWeight: active ? 600 : 400,
      color: active ? color : 'var(--text3)',
      background: active ? `color-mix(in srgb, ${color} 10%, transparent)` : 'transparent',
      border: active ? `1px solid color-mix(in srgb, ${color} 20%, transparent)` : '1px solid transparent',
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'all 0.2s',
      outline: 'none',
      letterSpacing: active ? '0px' : '0px',
    }}
  >
    {label}
    <span style={{
      fontFamily: 'Space Mono, monospace', fontSize: 11, marginLeft: 6,
      opacity: active ? 1 : 0.6,
    }}>
      {count}
    </span>
  </button>
);

// ── Company feed card ───────────────────────────────────────────────────────
const CompanyFeedCard: React.FC<{
  label: string;
  url?: string;
  data: CardData;
  showAnalysis?: boolean;
  aiChecking?: boolean;
  isPrimary?: boolean;
  onLoad: () => void;
  onTabChange: (tab: 'pr' | 'news') => void;
}> = ({ label, url, data, showAnalysis, aiChecking, isPrimary, onLoad, onTabChange }) => {
  const prCount = data.pressReleases.length;
  const newsCount = data.news.length;
  const isActive = data.loading || (aiChecking ?? false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <article
      aria-label={`${label} news feed`}
      style={{
        background: 'var(--surface)',
        border: isPrimary
          ? '1px solid color-mix(in srgb, var(--accent) 25%, transparent)'
          : '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: data.loaded ? '1px solid var(--border)' : 'none',
        background: isPrimary ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {/* Status indicator */}
          {data.loaded && (
            <span
              aria-hidden="true"
              style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: isActive
                  ? 'var(--gold)'
                  : 'var(--mint)',
                boxShadow: isActive
                  ? '0 0 8px var(--gold-dim)'
                  : '0 0 8px var(--mint-dim)',
                transition: 'all 0.3s',
              }}
            />
          )}
          <h3 style={{
            margin: 0, fontSize: isPrimary ? 15 : 14, fontWeight: 700,
            color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {label}
          </h3>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${label} website`}
              style={{
                fontSize: 10, color: 'var(--text3)', textDecoration: 'none', flexShrink: 0,
                padding: '2px 6px', borderRadius: 4,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
            >
              ↗
            </a>
          )}
          {/* Counts when loaded */}
          {data.loaded && !isActive && (
            <div aria-label={`${prCount} press releases, ${newsCount} news articles`} style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
              <span style={{
                fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 7px',
                borderRadius: 5, background: 'var(--sky-dim)', color: 'var(--sky)',
              }}>
                {prCount}
              </span>
              <span style={{
                fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 7px',
                borderRadius: 5, background: 'var(--mint-dim)', color: 'var(--mint)',
              }}>
                {newsCount}
              </span>
            </div>
          )}
        </div>
        <button
          ref={buttonRef}
          onClick={onLoad}
          disabled={isActive}
          aria-label={data.loaded ? `Refresh ${label} feeds` : `Load ${label} feeds`}
          style={{
            padding: '7px 14px', fontSize: 11, fontWeight: 500,
            color: isActive ? 'var(--text3)' : 'var(--text2)',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            cursor: isActive ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            opacity: isActive ? 0.5 : 1,
            transition: 'all 0.2s',
            outline: 'none',
          }}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = isActive ? 'var(--text3)' : 'var(--text2)'; }}
        >
          <svg
            width="12" height="12" viewBox="0 0 16 16" fill="none"
            style={{ animation: isActive ? 'spin 1s linear infinite' : 'none', transition: 'transform 0.2s' }}
          >
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {data.loading ? 'Fetching' : aiChecking ? 'Analyzing' : data.loaded ? 'Refresh' : 'Load'}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: data.loaded || data.loading || data.error ? '16px 20px 20px' : '16px 20px' }}>
        {data.error && (
          <div role="alert" style={{
            fontSize: 12, color: 'var(--coral)', marginBottom: 12,
            padding: '10px 14px', background: 'var(--coral-dim)', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {data.error}
          </div>
        )}

        {!data.loaded && !data.loading && !data.error && (
          <div style={{
            fontSize: 13, color: 'var(--text3)', lineHeight: 1.6,
            padding: '4px 0 4px',
          }}>
            Press <strong style={{ color: 'var(--text2)', fontWeight: 500 }}>Load</strong> to fetch latest wire releases and news coverage.
          </div>
        )}

        {data.loading && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '20px 0', color: 'var(--text3)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12 }}>Fetching press releases & news...</span>
          </div>
        )}

        {data.loaded && (
          <>
            {/* Tab switcher */}
            <div role="tablist" aria-label="Feed type" style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
              <FeedTab
                active={data.activeTab === 'pr'}
                label="Press Releases"
                count={prCount}
                onClick={() => onTabChange('pr')}
                color="var(--sky)"
              />
              <FeedTab
                active={data.activeTab === 'news'}
                label="Latest News"
                count={newsCount}
                onClick={() => onTabChange('news')}
                color="var(--mint)"
              />
            </div>

            <div role="tabpanel">
              {data.activeTab === 'pr' && (
                <ArticleList articles={data.pressReleases} empty="No press releases found from wire services." showAnalysis={showAnalysis} />
              )}
              {data.activeTab === 'news' && (
                <ArticleList articles={data.news} empty="No recent news coverage found." showAnalysis={showAnalysis} />
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources, competitorLabel, competitors }) => {
  const [mainCard, setMainCard] = useState<CardData>({
    loading: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
  });
  const [aiChecking, setAiChecking] = useState(false);
  const [compCards, setCompCards] = useState<Record<string, CardData>>({});
  const [compAiChecking, setCompAiChecking] = useState<Record<string, boolean>>({});
  const [loadingAll, setLoadingAll] = useState(false);

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
    const error = (prResult.status === 'rejected' && newsResult.status === 'rejected') ? 'Could not fetch feeds' : null;

    setMainCard(prev => ({ ...prev, loading: false, loaded: true, error, pressReleases: prs, news }));

    const all = [...prs, ...news];
    if (all.length > 0) {
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(all);
        setMainCard(prev => ({ ...prev, pressReleases: checked.slice(0, prs.length), news: checked.slice(prs.length) }));
      } catch { /* handled */ } finally { setAiChecking(false); }
    }
  }, [ticker, checkAnalyzed]);

  const loadCompetitor = useCallback(async (name: string) => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: true, loaded: false, error: null } }));
    try {
      const res = await fetch(`/api/competitor-feed/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const prs: ArticleItem[] = (data.pressReleases || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      const news: ArticleItem[] = (data.news || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      setCompCards(prev => ({ ...prev, [name]: { loading: false, loaded: true, error: null, activeTab: prev[name]?.activeTab || 'pr', pressReleases: prs, news } }));
      const all = [...prs, ...news];
      if (all.length > 0) {
        setCompAiChecking(prev => ({ ...prev, [name]: true }));
        try {
          const checked = await checkAnalyzed(all);
          setCompCards(prev => ({ ...prev, [name]: { ...prev[name], pressReleases: checked.slice(0, prs.length), news: checked.slice(prs.length) } }));
        } catch { /* handled */ } finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
      }
    } catch {
      setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: false, loaded: false, error: 'Could not fetch feeds' } }));
    }
  }, [checkAnalyzed]);

  const loadAll = useCallback(async () => {
    setLoadingAll(true);
    const promises: Promise<unknown>[] = [];
    if (!mainCard.loaded && !mainCard.loading) promises.push(loadMainCard());
    if (competitors?.length) { for (const c of competitors) promises.push(loadCompetitor(c.name)); }
    await Promise.allSettled(promises);
    setLoadingAll(false);
  }, [mainCard.loaded, mainCard.loading, loadMainCard, competitors, loadCompetitor]);

  const setCompTab = (name: string, tab: 'pr' | 'news') => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { loading: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab } }));
  };

  const totalCompanies = 1 + (competitors?.length || 0);
  const loadedCount = (mainCard.loaded ? 1 : 0) + (competitors?.filter(c => compCards[c.name]?.loaded).length || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sources-header</div>
      <h2 className="section-head">Sources</h2>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#live-feeds</div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--surface3)" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--accent)" strokeWidth="2.5"
              strokeDasharray={`${(loadedCount / totalCompanies) * 62.8} 62.8`}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
              style={{ transition: 'stroke-dasharray 0.4s ease' }}
            />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              {loadedCount === 0 ? 'Intelligence Feeds' : `${loadedCount} of ${totalCompanies} loaded`}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {totalCompanies} {totalCompanies === 1 ? 'company' : 'companies'} monitored
            </span>
          </div>
        </div>
        <button
          onClick={loadAll}
          disabled={loadingAll}
          aria-label={loadedCount > 0 ? 'Refresh all feeds' : 'Load all feeds'}
          style={{
            padding: '8px 18px', fontSize: 12, fontWeight: 600,
            color: loadingAll ? 'var(--text3)' : 'var(--bg)',
            background: loadingAll ? 'var(--surface2)' : 'var(--accent)',
            border: 'none', borderRadius: 8,
            cursor: loadingAll ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
            transition: 'all 0.2s',
            outline: 'none',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ animation: loadingAll ? 'spin 1s linear infinite' : 'none' }}>
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loadingAll ? 'Loading...' : loadedCount > 0 ? 'Refresh All' : 'Load All'}
        </button>
      </div>

      {(mainCard.loaded || loadedCount > 0) && (
        <div
          role="note"
          aria-label="Analysis status legend"
          style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', opacity: 0.9 }} />
            Tracked in analysis
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)', opacity: 0.9 }} />
            New / not tracked
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
            Pending check
          </span>
        </div>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#main-feed</div>
      <CompanyFeedCard
        label={`${companyName} (${ticker})`}
        data={mainCard}
        showAnalysis
        aiChecking={aiChecking}
        isPrimary
        onLoad={loadMainCard}
        onTabChange={(tab) => setMainCard(prev => ({ ...prev, activeTab: tab }))}
      />

      {competitors && competitors.length > 0 && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitors</div>
          <h3 className="card-title">{competitorLabel || 'Competitors'}</h3>
          {competitors.map(comp => {
            const data: CardData = compCards[comp.name] || {
              loading: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
            };
            return (
              <CompanyFeedCard
                key={comp.name}
                label={comp.name}
                url={comp.url}
                data={data}
                showAnalysis
                aiChecking={compAiChecking[comp.name] || false}
                onLoad={() => loadCompetitor(comp.name)}
                onTabChange={(tab) => setCompTab(comp.name, tab)}
              />
            );
          })}
        </>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#research-sources</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1.2px', whiteSpace: 'nowrap' }}>Research Sources</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)', minWidth: 40 }} />
      </div>
      <div className="g2">
        {researchSources.map(group => (
          <div key={group.category} className="card" style={{ padding: '20px 24px' }}>
            <div style={{
              fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '1px', color: 'var(--text3)', marginBottom: 12,
            }}>
              {group.category}
            </div>
            <nav aria-label={`${group.category} links`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.sources.map(s => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13, color: 'var(--text2)', textDecoration: 'none',
                    padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                >
                  {s.name}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
                    <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedSourcesTab;
