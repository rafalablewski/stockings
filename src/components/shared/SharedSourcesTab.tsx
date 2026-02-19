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

import React, { useState, useCallback, useRef, useEffect } from 'react';

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

// ── Session cache helpers (10-min TTL) ──────────────────────────────────────
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CachedFeed {
  pressReleases: ArticleItem[];
  news: ArticleItem[];
  fetchedAt: number; // Date.now()
}

function getCachedFeed(ticker: string): CachedFeed | null {
  try {
    const raw = sessionStorage.getItem(`sources_${ticker}`);
    if (!raw) return null;
    const parsed: CachedFeed = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(`sources_${ticker}`);
      return null;
    }
    return parsed;
  } catch { return null; }
}

function setCachedFeed(ticker: string, prs: ArticleItem[], news: ArticleItem[]) {
  try {
    const entry: CachedFeed = { pressReleases: prs, news, fetchedAt: Date.now() };
    sessionStorage.setItem(`sources_${ticker}`, JSON.stringify(entry));
  } catch { /* quota exceeded — ignore */ }
}

function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// ── Source type badge colors ─────────────────────────────────────────────────
const SOURCE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  pr:   { bg: 'var(--sky-dim)',  text: 'var(--sky)' },
  news: { bg: 'var(--mint-dim)', text: 'var(--mint)' },
};

// ── Per-article analysis cache (survives tab switches) ─────────────────────
function getSourceAnalysisCache(ticker: string, articleKey: string): string | null {
  try {
    const raw = sessionStorage.getItem(`source_analysis_${ticker}_${articleKey}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setSourceAnalysisCache(ticker: string, articleKey: string, text: string) {
  try { sessionStorage.setItem(`source_analysis_${ticker}_${articleKey}`, JSON.stringify(text)); } catch { /* quota */ }
}

function removeSourceAnalysisCache(ticker: string, articleKey: string) {
  try { sessionStorage.removeItem(`source_analysis_${ticker}_${articleKey}`); } catch { /* ignore */ }
}

/** Generate a stable cache key for an article */
function articleCacheKey(article: ArticleItem): string {
  return (article.url || article.headline || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 60);
}

// ── Verdict helpers (shared with EDGAR) ──────────────────────────────────────
type SourceVerdictLevel = 'Critical' | 'Important' | 'Low' | 'Already Incorporated';

const SOURCE_VERDICT_COLORS: Record<SourceVerdictLevel, { color: string; bg: string }> = {
  'Critical':             { color: 'var(--coral)', bg: 'var(--coral-dim)' },
  'Important':            { color: 'var(--gold)',  bg: 'var(--gold-dim)' },
  'Low':                  { color: 'var(--text3)', bg: 'rgba(255,255,255,0.04)' },
  'Already Incorporated': { color: 'var(--mint)',  bg: 'var(--mint-dim)' },
};

function parseSourceVerdict(text: string): { level: SourceVerdictLevel; explanation: string } | null {
  const match = text.match(/\[VERDICT:\s*(Critical|Important|Low|Already Incorporated)\]\s*[—\-–]\s*(.+)/i);
  if (!match) return null;
  const raw = match[1].trim();
  const level = (raw.charAt(0).toUpperCase() + raw.slice(1)) as SourceVerdictLevel;
  if (!(level in SOURCE_VERDICT_COLORS)) return null;
  return { level, explanation: match[2].trim() };
}

function stripSourceVerdict(text: string): string {
  return text.replace(/\n?\[VERDICT:.*$/im, '').trim();
}

// ── Article row (EDGAR filing-row style) ────────────────────────────────────
const SourceArticleRow: React.FC<{
  article: ArticleItem;
  type: 'pr' | 'news';
  showAnalysis?: boolean;
  ticker: string;
}> = ({ article, type, showAnalysis, ticker }) => {
  const cacheKey = articleCacheKey(article);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(() => getSourceAnalysisCache(ticker, cacheKey));
  const [analyzing, setAnalyzing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const statusColor = article.analyzed === null || article.analyzed === undefined
    ? 'var(--text3)' : article.analyzed ? 'var(--mint)' : 'var(--coral)';
  const statusLabel = article.analyzed === null || article.analyzed === undefined
    ? '' : article.analyzed ? 'TRACKED' : 'UNTRACKED';
  const statusTitle = article.analyzed === null || article.analyzed === undefined
    ? 'Not checked' : article.analyzed ? 'In analysis' : 'Not in analysis';
  const tc = SOURCE_TYPE_COLORS[type];

  const handleAnalyze = async () => {
    if (aiAnalysis) { setAiAnalysis(null); removeSourceAnalysisCache(ticker, cacheKey); setExpanded(false); return; }
    setAnalyzing(true);
    setExpanded(true);
    try {
      const res = await fetch('/api/sources/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: article.url,
          headline: article.headline,
          source: article.source,
          date: article.date,
          ticker,
        }),
      });
      const data = await res.json();
      const text = data.analysis || data.error || 'No analysis returned.';
      setAiAnalysis(text);
      setSourceAnalysisCache(ticker, cacheKey, text);
    } catch (err) {
      const errText = `Error: ${(err as Error).message}`;
      setAiAnalysis(errText);
      setSourceAnalysisCache(ticker, cacheKey, errText);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Header row — clickable expand/collapse when analysis exists */}
      <div
        role={aiAnalysis ? 'button' : undefined}
        tabIndex={aiAnalysis ? 0 : undefined}
        aria-expanded={aiAnalysis ? expanded : undefined}
        onClick={aiAnalysis ? () => setExpanded(!expanded) : undefined}
        onKeyDown={aiAnalysis ? (e) => { if (e.key === 'Enter') setExpanded(!expanded); } : undefined}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', borderRadius: 10,
          transition: 'background 0.15s',
          cursor: aiAnalysis ? 'pointer' : undefined,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Chevron (visible when analysis exists) */}
        {aiAnalysis && (
          <svg
            width={12} height={12} viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
            style={{
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        )}
        {/* Status dot */}
        {showAnalysis && (
          <span
            title={statusTitle}
            style={{
              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
              background: statusColor,
              opacity: article.analyzed === null || article.analyzed === undefined ? 0.4 : 0.9,
              transition: 'opacity 0.2s, background 0.2s',
            }}
          />
        )}
        {/* Source type badge */}
        <span style={{
          fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 600,
          padding: '2px 8px', borderRadius: 5, flexShrink: 0,
          minWidth: 48, textAlign: 'center',
          background: tc.bg, color: tc.text, whiteSpace: 'nowrap',
        }}>
          {type === 'pr' ? 'PR' : 'NEWS'}
        </span>
        {/* Headline */}
        <span style={{ fontSize: 13, color: 'var(--text)', flex: 1, minWidth: 0, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {article.headline}
        </span>
        {/* Verdict badge inline (compact, shown in header when collapsed) */}
        {aiAnalysis && !expanded && (() => {
          const verdict = parseSourceVerdict(aiAnalysis);
          if (!verdict) return null;
          const vc = SOURCE_VERDICT_COLORS[verdict.level];
          return (
            <span style={{
              fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
              padding: '2px 6px', borderRadius: 3, flexShrink: 0,
              color: vc.color, background: vc.bg,
              border: `1px solid color-mix(in srgb, ${vc.color} 20%, transparent)`,
            }}>
              {verdict.level}
            </span>
          );
        })()}
        {/* Source name */}
        {article.source && (
          <span style={{ fontSize: 11, color: 'var(--text3)', flexShrink: 0, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {article.source}
          </span>
        )}
        {/* Date */}
        {article.date && (
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)', flexShrink: 0, letterSpacing: '-0.2px' }}>
            {article.date}
          </span>
        )}
        {/* Status label */}
        {showAnalysis && statusLabel && (
          <span style={{
            fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
            color: statusColor, flexShrink: 0, whiteSpace: 'nowrap',
          }}>
            {statusLabel}
          </span>
        )}
        {/* NEW badge — shown until article is AI-analyzed */}
        {!aiAnalysis && (
          <span style={{
            fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '1px 5px', borderRadius: 3, flexShrink: 0,
            color: 'var(--sky)', background: 'var(--sky-dim)',
            border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)',
          }}>
            NEW
          </span>
        )}
        {/* Action buttons — stop propagation so clicks don't toggle expand */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open article"
            style={{
              fontSize: 9, fontWeight: 500, fontFamily: 'inherit',
              padding: '2px 5px', borderRadius: 4,
              color: 'var(--text3)', background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              cursor: 'pointer', transition: 'all 0.15s', outline: 'none', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
            }}
          >
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
            </svg>
          </a>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            title={aiAnalysis ? 'Close AI analysis' : 'Analyze with AI'}
            style={{
              fontSize: 9, fontWeight: 500, fontFamily: 'inherit',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '2px 6px', borderRadius: 4,
              color: aiAnalysis ? 'var(--accent)' : 'rgba(130,200,130,0.5)',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${aiAnalysis ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : 'rgba(130,200,130,0.15)'}`,
              cursor: analyzing ? 'wait' : 'pointer',
              transition: 'all 0.15s', outline: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              opacity: analyzing ? 0.5 : 1,
            }}
          >
            {analyzing ? '...' : 'AI'}
          </button>
        </div>
      </div>

      {/* Expanded body — analysis content */}
      {aiAnalysis && expanded && (
        <div style={{ padding: '0 12px 12px' }}>
          {/* Verdict badge */}
          {(() => {
            const verdict = parseSourceVerdict(aiAnalysis);
            if (!verdict) return null;
            const vc = SOURCE_VERDICT_COLORS[verdict.level];
            return (
              <div style={{
                margin: '12px 0 0 7px', display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '3px 8px', borderRadius: 4,
                color: vc.color, background: vc.bg,
                border: `1px solid color-mix(in srgb, ${vc.color} 20%, transparent)`,
              }}>
                {verdict.level}
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, opacity: 0.7, fontSize: 10 }}>
                  {verdict.explanation}
                </span>
              </div>
            );
          })()}
          {/* Analysis panel */}
          <div style={{ margin: '6px 0 2px 19px', paddingTop: 16, marginTop: 8, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text3)' }}>
                Analysis Result
              </span>
            </div>
            <div style={{ maxHeight: 600, overflowY: 'auto' }}>
              <pre style={{
                fontSize: 12, fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--text2)', lineHeight: 1.8,
                whiteSpace: 'pre-wrap', margin: 0,
              }}>
                {stripSourceVerdict(aiAnalysis)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Combined article list (merges PR + News, sorted by date) ────────────────
const ARTICLE_INITIAL_COUNT = 10;

const SourceArticleList: React.FC<{
  pressReleases: ArticleItem[];
  news: ArticleItem[];
  showAnalysis?: boolean;
  ticker: string;
}> = ({ pressReleases, news, showAnalysis, ticker }) => {
  const [showAll, setShowAll] = useState(false);

  const combined = [
    ...pressReleases.map(a => ({ ...a, _type: 'pr' as const })),
    ...news.map(a => ({ ...a, _type: 'news' as const })),
  ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  if (combined.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text3)', padding: '16px 12px', lineHeight: 1.6 }}>
        No articles found. Click Load to fetch feeds.
      </div>
    );
  }

  const displayed = showAll ? combined : combined.slice(0, ARTICLE_INITIAL_COUNT);
  const hiddenCount = combined.length - ARTICLE_INITIAL_COUNT;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {displayed.map((a, i) => (
        <SourceArticleRow key={`${a._type}-${i}`} article={a} type={a._type} showAnalysis={showAnalysis} ticker={ticker} />
      ))}
      {hiddenCount > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 12, paddingBottom: 8 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '3px 10px', borderRadius: 4,
              border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)',
              color: 'var(--text3)', cursor: 'pointer',
              transition: 'all 0.15s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            {showAll ? 'Show Less' : `Show ${hiddenCount} More`}
          </button>
        </div>
      )}
    </div>
  );
};

// ── Company feed card ───────────────────────────────────────────────────────
const CompanyFeedCard: React.FC<{
  label: string;
  url?: string;
  data: CardData;
  showAnalysis?: boolean;
  aiChecking?: boolean;
  isPrimary?: boolean;
  fetchedAt?: number | null;
  ticker: string;
  onLoad: () => void;
  onTabChange?: (tab: 'pr' | 'news') => void;
}> = ({ label, url, data, showAnalysis, aiChecking, isPrimary, fetchedAt, ticker, onLoad }) => {
  const prCount = data.pressReleases.length;
  const newsCount = data.news.length;
  const isActive = data.loading || (aiChecking ?? false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <article
      aria-label={`${label} news feed`}
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: data.loaded ? '1px solid var(--border)' : 'none',
        background: isPrimary ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
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
          {/* Freshness indicator */}
          {data.loaded && !isActive && fetchedAt && (
            <span style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.6, fontFamily: 'Space Mono, monospace', marginLeft: 4 }}>
              {formatTimeAgo(fetchedAt)}
            </span>
          )}
        </div>
        <button
          ref={buttonRef}
          onClick={onLoad}
          disabled={isActive}
          aria-label={data.loaded ? `Refresh ${label} feeds` : `Load ${label} feeds`}
          style={{
            fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '5px 14px', borderRadius: 4,
            color: isActive ? 'var(--text3)' : 'rgba(130,200,130,0.5)',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${isActive ? 'var(--border)' : 'rgba(130,200,130,0.15)'}`,
            cursor: isActive ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            opacity: isActive ? 0.5 : 1,
            transition: 'all 0.15s', outline: 'none',
          }}
        >
          <svg
            width="10" height="10" viewBox="0 0 16 16" fill="none"
            style={{ animation: isActive ? 'spin 1s linear infinite' : 'none', transition: 'transform 0.2s' }}
          >
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {data.loading ? 'Fetching' : aiChecking ? 'Analyzing' : data.loaded ? 'Refresh' : 'Load'}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: data.loaded || data.loading || data.error ? '16px 20px 20px' : '16px 20px' }}>
        {data.error && (
          <div role="alert" style={{
            fontSize: 12, color: 'var(--coral)', marginBottom: 12,
            padding: '12px 16px', background: 'var(--coral-dim)', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {data.error}
          </div>
        )}

        {!data.loaded && !data.loading && !data.error && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '24px 0', color: 'var(--text3)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12 }}>Loading feeds...</span>
          </div>
        )}

        {data.loading && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '24px 0', color: 'var(--text3)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12 }}>Fetching press releases & news...</span>
          </div>
        )}

        {data.loaded && (
          <SourceArticleList pressReleases={data.pressReleases} news={data.news} showAnalysis={showAnalysis} ticker={ticker} />
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
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [matchMethod, setMatchMethod] = useState<'ai' | 'local' | null>(null);

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
      if (!data.results) throw new Error(data.error || 'No results returned');
      if (data.method) setMatchMethod(data.method);
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
        return (d.releases || []).slice(0, 10).map((r: { date: string; headline: string; url: string; source?: string; items?: string }) => ({
          headline: r.headline, date: r.date, url: r.url, source: r.source, items: r.items, analyzed: null as boolean | null,
        }));
      }),
      fetch(`/api/news/${ticker}`).then(async res => {
        if (!res.ok) throw new Error('Failed');
        const d = await res.json();
        return (d.articles || []).slice(0, 10).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
        }));
      }),
    ]);

    if (prResult.status === 'fulfilled') prs = prResult.value;
    if (newsResult.status === 'fulfilled') news = newsResult.value;
    const error = (prResult.status === 'rejected' && newsResult.status === 'rejected') ? 'Could not fetch feeds' : null;

    setMainCard(prev => ({ ...prev, loading: false, loaded: true, error, pressReleases: prs, news }));
    const now = Date.now();
    setLastFetchedAt(now);
    setCachedFeed(ticker, prs, news);

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

  // Auto-load on mount: use sessionStorage cache if fresh, otherwise fetch
  useEffect(() => {
    const cached = getCachedFeed(ticker);
    if (cached) {
      setMainCard(prev => ({
        ...prev, loaded: true, loading: false,
        pressReleases: cached.pressReleases, news: cached.news,
      }));
      setLastFetchedAt(cached.fetchedAt);
      // Run AI analysis on cached articles (cache stores pre-analysis data)
      const all = [...cached.pressReleases, ...cached.news];
      if (all.length > 0) {
        setAiChecking(true);
        checkAnalyzed(all).then(checked => {
          setMainCard(prev => ({
            ...prev,
            pressReleases: checked.slice(0, cached.pressReleases.length),
            news: checked.slice(cached.pressReleases.length),
          }));
        }).catch(() => { /* handled */ }).finally(() => setAiChecking(false));
      }
    } else {
      loadMainCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  const setCompTab = (name: string, tab: 'pr' | 'news') => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { loading: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab } }));
  };

  const totalCompanies = 1 + (competitors?.length || 0);
  const loadedCount = (mainCard.loaded ? 1 : 0) + (competitors?.filter(c => compCards[c.name]?.loaded).length || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sources-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Intelligence</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Sources<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Live press releases, news coverage, and competitor intelligence for {companyName}.</p>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#live-feeds</div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', marginTop: 8,
        borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Progress ring */}
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2" />
            <circle cx="14" cy="14" r="12" fill="none" stroke="var(--accent)" strokeWidth="2"
              strokeDasharray={`${(loadedCount / totalCompanies) * 75.4} 75.4`}
              strokeLinecap="round"
              transform="rotate(-90 14 14)"
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
            fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '5px 14px', borderRadius: 4,
            color: loadingAll ? 'var(--text3)' : 'rgba(130,200,130,0.5)',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${loadingAll ? 'var(--border)' : 'rgba(130,200,130,0.15)'}`,
            cursor: loadingAll ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s', outline: 'none',
            opacity: loadingAll ? 0.5 : 1,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: loadingAll ? 'spin 1s linear infinite' : 'none' }}>
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loadingAll ? 'Loading...' : loadedCount > 0 ? 'Refresh All' : 'Load All'}
        </button>
      </div>

      {/* Legend — 3 tiers with descriptions */}
      {(mainCard.loaded || loadedCount > 0) && (
        <div
          role="note"
          aria-label="Analysis status legend"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 24, padding: '16px 4px 12px',
            fontSize: 10, color: 'var(--text3)', letterSpacing: '0.3px', flexWrap: 'wrap',
          }}
        >
          {([
            { label: 'Tracked', color: 'var(--mint)', opacity: 0.9, desc: 'Article matched in database — found in research notes or tracked data files' },
            { label: 'Untracked', color: 'var(--coral)', opacity: 0.9, desc: 'Article not found in database — potentially new information to review' },
            { label: 'Pending', color: 'var(--text3)', opacity: 0.4, desc: 'Status not yet checked — load feeds and run analysis to classify' },
          ] as const).map(s => (
            <span key={s.label} title={s.desc} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, maxWidth: 260 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, opacity: s.opacity, marginTop: 3, flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 9, opacity: 0.5, lineHeight: 1.4 }}>{s.desc}</span>
              </span>
            </span>
          ))}
        </div>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#main-feed</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CompanyFeedCard
          label={`${companyName} (${ticker})`}
          data={mainCard}
          showAnalysis
          aiChecking={aiChecking}
          isPrimary
          fetchedAt={lastFetchedAt}
          ticker={ticker}
          onLoad={loadMainCard}
          onTabChange={(tab) => setMainCard(prev => ({ ...prev, activeTab: tab }))}
        />
      </div>

      {competitors && competitors.length > 0 && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitors</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '32px 0 16px',
          }}>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '1.2px',
            }}>
              {competitorLabel || 'Competitors'}
            </span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)',
            }}>
              {competitors.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                  ticker={ticker}
                  onLoad={() => loadCompetitor(comp.name)}
                  onTabChange={(tab) => setCompTab(comp.name, tab)}
                />
              );
            })}
          </div>
        </>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#research-sources</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--text3)',
          textTransform: 'uppercase', letterSpacing: '1.2px',
        }}>
          Research Sources
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {researchSources.map(group => (
          <div key={group.category} style={{
            background: 'var(--surface)',
            padding: '24px 24px',
          }}>
            <div style={{
              fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '1.5px', color: 'var(--text3)', marginBottom: 16,
            }}>
              {group.category}
            </div>
            <nav aria-label={`${group.category} links`} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.sources.map(s => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13, color: 'var(--text2)', textDecoration: 'none',
                    padding: '6px 8px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--surface2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {s.name}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                    <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* ── Methodology ────────────────────────────────────────────────────── */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#sources-methodology</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div
          onClick={() => setMethodologyOpen(prev => !prev)}
          style={{
            padding: '24px 24px',
            borderBottom: methodologyOpen ? '1px solid var(--border)' : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          }}
          role="button"
          tabIndex={0}
          aria-expanded={methodologyOpen}
          aria-label="Toggle Sources Methodology"
          onKeyDown={(e) => e.key === 'Enter' && setMethodologyOpen(prev => !prev)}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Methodology</span>
          <span style={{ color: 'var(--text3)', fontSize: 18 }}>{methodologyOpen ? '\u2212' : '+'}</span>
        </div>
        {methodologyOpen && (
          <div style={{ padding: '24px 24px', fontSize: 13, color: 'var(--text2)' }}>
            {/* ── ROUTING FLOW ─────────────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Routing</div>
            <div style={{ display: 'flex', gap: 24 }}>
              {/* Left column: vertical flow */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180 }}>
                {/* Node: Article */}
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Article arrives</div>
                <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
                {/* Node: API Key? */}
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>API key?</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>Yes</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                {/* Node: AI Disabled? */}
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>AI disabled?</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                {/* Node: Token limit? */}
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Prompt &gt; limit?</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                {/* Node: Claude AI */}
                <div style={{ padding: '6px 14px', background: 'var(--sky-dim)', border: '1px solid var(--sky)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', textAlign: 'center', fontWeight: 600 }}>Claude AI</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>OK</div>
                <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
                {/* Result */}
                <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', fontWeight: 600 }}>AI Result</div>
              </div>
              {/* Right column: fallback labels */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, paddingTop: 28 }}>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6, height: 28 }}>
                  <span style={{ color: 'var(--coral)', fontSize: 11 }}>&larr;</span> No
                </div>
                <div style={{ height: 22 }} />
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6, height: 28 }}>
                  <span style={{ color: 'var(--coral)', fontSize: 11 }}>&larr;</span> Yes
                </div>
                <div style={{ height: 22 }} />
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6, height: 28 }}>
                  <span style={{ color: 'var(--coral)', fontSize: 11 }}>&larr;</span> Yes
                </div>
                <div style={{ height: 22 }} />
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6, height: 28 }}>
                  <span style={{ color: 'var(--coral)', fontSize: 11 }}>&larr;</span> Fail
                </div>
                <div style={{ marginTop: 4, padding: '6px 14px', background: 'var(--gold-dim)', border: '1px solid var(--gold)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--gold)', textAlign: 'center', fontWeight: 600 }}>Local Matching</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── DATA EXTRACTION ─────────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Data Extraction</div>
            <div style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', lineHeight: 2 }}>
              <div>Reads all <code style={{ padding: '1px 5px', borderRadius: 4, background: 'var(--surface2)' }}>.ts</code> files per ticker from disk (bypasses bundler cache).</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: 'var(--text3)' }}>Date fields:</span> date, timeline
              </div>
              <div>
                <span style={{ color: 'var(--text3)' }}>Headline fields:</span> headline, title, event, description
              </div>
              <div>
                <span style={{ color: 'var(--text3)' }}>Detail fields:</span> summary, notes, details, significance, thesisComparison, astsRelevance, astsImplication, astsComparison, bmnrImplication, bmnrComparison, crclComparison
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── LOCAL MATCHING FLOW ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Local Matching</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Node: Extract */}
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Extract keywords (stop words removed, &gt;2 chars)</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Tier 1 row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 1: Headline only</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>&le;5 days: &ge;50%, &ge;3 kw</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>&gt;5 days: &ge;75%, &ge;3 kw</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Match &rarr; <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} /><span style={{ color: 'var(--mint)', fontWeight: 600 }}>TRACKED</span></span>
                </div>
              </div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No match</div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              {/* Tier 2 row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 2: Headline + detail</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>&le;5 days: &ge;65%, &ge;4 kw</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>&gt;5 days: &ge;85%, &ge;4 kw</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Match &rarr; <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} /><span style={{ color: 'var(--mint)', fontWeight: 600 }}>TRACKED</span></span>
                </div>
              </div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No match</div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              {/* Result: UNTRACKED */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--coral)', fontWeight: 600 }}>UNTRACKED</span>
              </div>
              {/* Date proximity note */}
              <div style={{ marginTop: 8, padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', fontStyle: 'italic', textAlign: 'center' }}>Date proximity guard: recurring weekly reports<br />require higher overlap when dates are &gt;5 days apart</div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── Legend & config ──────────────────────────── */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 11, lineHeight: 2 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)' }}>Status</span>
                <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} /> Tracked</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)', display: 'inline-block' }} /> Untracked</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text3)', display: 'inline-block' }} /> Pending</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)' }}>Kill Switch</span>
                <div style={{ marginTop: 4 }}>
                  <code style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', padding: '1px 5px', borderRadius: 4, background: 'var(--surface2)' }}>DISABLE_AI_MATCHING=true</code>
                  <span style={{ margin: '0 8px', color: 'var(--text3)' }}>|</span>
                  <code style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', padding: '1px 5px', borderRadius: 4, background: 'var(--surface2)' }}>MAX_PROMPT_TOKENS=40000</code>
                </div>
              </div>
            </div>
            {matchMethod && (
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)' }}>Active</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, padding: '2px 8px', borderRadius: 5, background: matchMethod === 'ai' ? 'var(--sky-dim)' : 'var(--gold-dim)', color: matchMethod === 'ai' ? 'var(--sky)' : 'var(--gold)' }}>{matchMethod === 'ai' ? 'AI semantic matching' : 'local keyword matching'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedSourcesTab;
