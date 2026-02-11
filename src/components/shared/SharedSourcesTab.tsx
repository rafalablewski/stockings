/**
 * SharedSourcesTab - Unified Sources Tab with Press Releases + News + Competitor Cards
 *
 * Shared component for all stocks. Features:
 * - Three sub-tabs: Press Releases, Latest News, Competitors
 * - Press Releases + Latest News: 5 articles each with AI analysis check
 * - Competitors: Individual expandable card per company, each with own
 *   Press Releases (5) + Latest News (5), loaded on demand
 *
 * @version 4.0.0
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

interface CompetitorData {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  activeTab: 'pr' | 'news';
  pressReleases: ArticleItem[];
  news: ArticleItem[];
}

type SubTab = 'press-releases' | 'news' | 'competitors';

// ── Individual Competitor Card ──────────────────────────────────────────────
const CompetitorCard: React.FC<{
  competitor: Competitor;
  data: CompetitorData;
  expanded: boolean;
  onToggle: () => void;
  onLoad: () => void;
  onTabChange: (tab: 'pr' | 'news') => void;
}> = ({ competitor, data, expanded, onToggle, onLoad, onTabChange }) => {
  const prCount = data.pressReleases.length;
  const newsCount = data.news.length;

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--stroke)',
      borderRadius: 10,
      overflow: 'hidden',
      transition: 'all 0.2s',
    }}>
      {/* Card header - always visible */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          cursor: 'pointer',
          userSelect: 'none',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{
            fontSize: 10,
            color: 'var(--text3)',
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}>
            ▶
          </span>
          <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {competitor.name}
          </span>
          <a
            href={competitor.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 11, color: 'var(--text3)', textDecoration: 'none', flexShrink: 0 }}
          >
            ↗
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {data.loaded && (
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{
                fontSize: 10,
                padding: '1px 6px',
                borderRadius: 4,
                background: prCount > 0 ? 'rgba(59,130,246,0.12)' : 'var(--bg3)',
                color: prCount > 0 ? '#3b82f6' : 'var(--text3)',
              }}>
                {prCount} PR
              </span>
              <span style={{
                fontSize: 10,
                padding: '1px 6px',
                borderRadius: 4,
                background: newsCount > 0 ? 'rgba(34,197,94,0.12)' : 'var(--bg3)',
                color: newsCount > 0 ? '#22c55e' : 'var(--text3)',
              }}>
                {newsCount} News
              </span>
            </div>
          )}
          {data.loading && (
            <span style={{
              fontSize: 10,
              color: 'var(--text3)',
              display: 'inline-block',
              animation: 'spin 1s linear infinite',
            }}>
              ↻
            </span>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--stroke)' }}>
          {/* Load / reload controls */}
          {!data.loaded && !data.loading && (
            <button
              onClick={(e) => { e.stopPropagation(); onLoad(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                margin: '12px 0 4px',
                padding: '6px 14px',
                fontSize: 12,
                color: 'var(--accent)',
                background: 'var(--bg1)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              ↻ Load feeds for {competitor.name}
            </button>
          )}

          {data.error && (
            <div style={{ fontSize: 11, color: '#ef4444', margin: '8px 0', padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: 6 }}>
              {data.error}
            </div>
          )}

          {data.loading && (
            <div style={{ fontSize: 12, color: 'var(--text3)', padding: '12px 0', textAlign: 'center' }}>
              Fetching press releases &amp; news...
            </div>
          )}

          {data.loaded && (
            <>
              {/* Mini tab switcher */}
              <div style={{ display: 'flex', gap: 2, margin: '10px 0 8px' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); onTabChange('pr'); }}
                  style={{
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: data.activeTab === 'pr' ? 600 : 400,
                    color: data.activeTab === 'pr' ? '#3b82f6' : 'var(--text3)',
                    background: data.activeTab === 'pr' ? 'rgba(59,130,246,0.08)' : 'transparent',
                    border: data.activeTab === 'pr' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  Press Releases ({prCount})
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onTabChange('news'); }}
                  style={{
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: data.activeTab === 'news' ? 600 : 400,
                    color: data.activeTab === 'news' ? '#22c55e' : 'var(--text3)',
                    background: data.activeTab === 'news' ? 'rgba(34,197,94,0.08)' : 'transparent',
                    border: data.activeTab === 'news' ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  Latest News ({newsCount})
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onLoad(); }}
                  style={{
                    marginLeft: 'auto',
                    padding: '4px 8px',
                    fontSize: 10,
                    color: 'var(--text3)',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  ↻
                </button>
              </div>

              {/* Articles list */}
              {data.activeTab === 'pr' && (
                prCount === 0
                  ? <div style={{ fontSize: 11, color: 'var(--text3)', padding: '4px 0' }}>No press releases found from wire services.</div>
                  : <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {data.pressReleases.map((a, i) => (
                        <li key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                          <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', lineHeight: 1.4 }}>
                            {a.headline} <span style={{ color: 'var(--text3)', fontSize: 10 }}>↗</span>
                          </a>
                          <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                            {a.date}{a.source ? ` · ${a.source}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
              )}
              {data.activeTab === 'news' && (
                newsCount === 0
                  ? <div style={{ fontSize: 11, color: 'var(--text3)', padding: '4px 0' }}>No recent news found.</div>
                  : <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {data.news.map((a, i) => (
                        <li key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                          <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', lineHeight: 1.4 }}>
                            {a.headline} <span style={{ color: 'var(--text3)', fontSize: 10 }}>↗</span>
                          </a>
                          <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                            {a.date}{a.source ? ` · ${a.source}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────
const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources, competitorLabel, competitors }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('press-releases');
  const [pressReleases, setPressReleases] = useState<ArticleItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<ArticleItem[]>([]);
  const [prLoading, setPrLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [aiChecking, setAiChecking] = useState(false);
  const [prError, setPrError] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // Competitor card states
  const [competitorStates, setCompetitorStates] = useState<Record<string, CompetitorData>>({});
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [loadingAll, setLoadingAll] = useState(false);

  // AI check
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
      if (!res.ok) throw new Error(`AI check failed: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return articles.map((article, i) => ({
        ...article,
        analyzed: data.results?.[i]?.analyzed ?? null,
      }));
    } catch (err) {
      console.error('[SharedSourcesTab] AI check error:', err);
      return articles.map(a => ({ ...a, analyzed: null }));
    }
  }, [ticker]);

  // Refresh own press releases + news
  const handleRefresh = useCallback(async () => {
    setPrLoading(true);
    setNewsLoading(true);
    setPrError(null);
    setNewsError(null);
    setAiError(null);

    let prArticles: ArticleItem[] = [];
    let newsItems: ArticleItem[] = [];

    const [prResult, newsResult] = await Promise.allSettled([
      fetch(`/api/press-releases/${ticker}`).then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch press releases');
        const data = await res.json();
        return (data.releases || []).slice(0, 5).map((r: { date: string; headline: string; url: string; source?: string; items?: string }) => ({
          headline: r.headline, date: r.date, url: r.url, source: r.source, items: r.items, analyzed: null as boolean | null,
        }));
      }),
      fetch(`/api/news/${ticker}`).then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        return (data.articles || []).slice(0, 5).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
        }));
      }),
    ]);

    if (prResult.status === 'fulfilled') prArticles = prResult.value;
    else setPrError('Could not fetch press releases');
    if (newsResult.status === 'fulfilled') newsItems = newsResult.value;
    else setNewsError('Could not fetch from Google News');

    setPrLoading(false);
    setNewsLoading(false);
    setPressReleases(prArticles);
    setNewsArticles(newsItems);

    const allArticles = [...prArticles, ...newsItems];
    if (allArticles.length > 0) {
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(allArticles);
        setPressReleases(checked.slice(0, prArticles.length));
        setNewsArticles(checked.slice(prArticles.length));
      } catch (err) {
        setAiError(err instanceof Error ? err.message : 'AI check failed');
      } finally {
        setAiChecking(false);
      }
    }

    setLastFetched(new Date().toLocaleTimeString());
  }, [ticker, checkAnalyzed]);

  // Load a single competitor
  const loadCompetitor = useCallback(async (name: string) => {
    setCompetitorStates(prev => ({
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

      setCompetitorStates(prev => ({
        ...prev,
        [name]: {
          ...(prev[name] || {}),
          loading: false,
          loaded: true,
          error: null,
          activeTab: prev[name]?.activeTab || 'pr',
          pressReleases: prs,
          news,
        },
      }));
    } catch {
      setCompetitorStates(prev => ({
        ...prev,
        [name]: {
          ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }),
          loading: false,
          loaded: false,
          error: `Could not fetch feeds for ${name}`,
        },
      }));
    }
  }, []);

  // Load all competitors
  const loadAllCompetitors = useCallback(async () => {
    if (!competitors?.length) return;
    setLoadingAll(true);
    // Expand all
    setExpandedCards(new Set(competitors.map(c => c.name)));
    // Fire all in parallel
    await Promise.allSettled(competitors.map(c => loadCompetitor(c.name)));
    setLoadingAll(false);
  }, [competitors, loadCompetitor]);

  const toggleExpanded = (name: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const setCompetitorTab = (name: string, tab: 'pr' | 'news') => {
    setCompetitorStates(prev => ({
      ...prev,
      [name]: { ...(prev[name] || { loading: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab },
    }));
  };

  const isLoading = prLoading || newsLoading || aiChecking;
  const hasCompetitors = competitors && competitors.length > 0;

  const renderArticle = (article: ArticleItem, i: number) => {
    const statusIcon = article.analyzed === null
      ? <span style={{ fontSize: 13, color: 'var(--text3)', flexShrink: 0, marginTop: 2 }}>?</span>
      : article.analyzed
        ? <span style={{ fontSize: 15, color: '#22c55e', flexShrink: 0, marginTop: 1 }}>✓</span>
        : <span style={{ fontSize: 15, color: '#ef4444', flexShrink: 0, marginTop: 1 }}>✗</span>;

    const statusText = article.analyzed === null ? 'Not checked'
      : article.analyzed ? 'In analysis' : 'Not in analysis';

    return (
      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        {statusIcon}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
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

  const compTabLabel = competitorLabel || 'Competitors';
  const loadedCount = competitors?.filter(c => competitorStates[c.name]?.loaded).length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Sources</h2>
      <div className="highlight">
        <h3>Live Sources & Research</h3>
        <p style={{ fontSize: 13, color: 'var(--text2)' }}>
          Live article feeds for {companyName} ({ticker}). Press releases sourced from the company IR page, PR Newswire, Business Wire &amp; GlobeNewswire. Latest News pulls all recent coverage.
          {hasCompetitors && <> {compTabLabel} tracks {competitors.length} key peers with dedicated feeds per company.</>}
          {' '}AI-powered analysis status check included.
        </p>
      </div>

      {/* Live feeds card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setActiveSubTab('press-releases')} style={subTabStyle('press-releases')}>
              Press Releases
            </button>
            <button onClick={() => setActiveSubTab('news')} style={subTabStyle('news')}>
              Latest News
            </button>
            {hasCompetitors && (
              <button onClick={() => setActiveSubTab('competitors')} style={subTabStyle('competitors')}>
                {compTabLabel}
                {loadedCount > 0 && (
                  <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.6 }}>
                    ({loadedCount}/{competitors.length})
                  </span>
                )}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {lastFetched && (
              <span style={{ fontSize: 10, color: 'var(--text3)' }}>{lastFetched}</span>
            )}
            {activeSubTab !== 'competitors' && (
              <button onClick={handleRefresh} disabled={isLoading}
                style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6,
                  color: 'var(--text2)', fontSize: 11, padding: '4px 10px',
                  cursor: isLoading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                  opacity: isLoading ? 0.6 : 1,
                }}>
                <span style={{ display: 'inline-block', animation: isLoading ? 'spin 1s linear infinite' : 'none' }}>↻</span>
                {prLoading || newsLoading ? 'Fetching...' : aiChecking ? 'AI Checking...' : 'Refresh'}
              </button>
            )}
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

        {/* Competitors sub-tab */}
        {activeSubTab === 'competitors' && hasCompetitors && (
          <div>
            {/* Load All / Refresh All bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 10, padding: '8px 12px',
              background: 'var(--bg1)', borderRadius: 8, border: '1px solid var(--stroke)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>
                {loadedCount === 0
                  ? `${competitors.length} competitors — click Load All or expand individually`
                  : `${loadedCount} of ${competitors.length} loaded`}
              </span>
              <button
                onClick={loadAllCompetitors}
                disabled={loadingAll}
                style={{
                  padding: '5px 12px', fontSize: 11, fontWeight: 600,
                  color: loadingAll ? 'var(--text3)' : 'var(--accent)',
                  background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6,
                  cursor: loadingAll ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  opacity: loadingAll ? 0.6 : 1,
                }}
              >
                <span style={{ display: 'inline-block', animation: loadingAll ? 'spin 1s linear infinite' : 'none' }}>↻</span>
                {loadingAll ? 'Loading...' : loadedCount > 0 ? 'Refresh All' : 'Load All'}
              </button>
            </div>

            {/* Individual competitor cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {competitors.map(comp => {
                const data: CompetitorData = competitorStates[comp.name] || {
                  loading: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
                };
                return (
                  <CompetitorCard
                    key={comp.name}
                    competitor={comp}
                    data={data}
                    expanded={expandedCards.has(comp.name)}
                    onToggle={() => toggleExpanded(comp.name)}
                    onLoad={() => loadCompetitor(comp.name)}
                    onTabChange={(tab) => setCompetitorTab(comp.name, tab)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

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
