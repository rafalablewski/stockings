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
 * ── Article Freshness Tracking ──
 *
 * Articles are tracked via the `seen_articles` DB table (POST/GET /api/seen-articles).
 * Each article is identified by a cache key derived from its URL.
 *
 * On mount:
 *   1. Hydrate seenArticleKeysRef from DB (GET /api/seen-articles?ticker=X)
 *   2. Restore main + competitor feeds from sessionStorage (10-min TTL)
 *   3. Diff cached articles against seen keys → genuinely new → NEW badge
 *   4. Save any unseen articles to DB (POST /api/seen-articles)
 *
 * On fresh fetch (loadMainCard / loadCompetitor):
 *   - Compare fetched articles against seenArticleKeysRef
 *   - New articles get added to newArticleKeys Set → NEW badge rendered
 *   - Articles are saved to DB + sessionStorage for next reload
 *
 * NEW badge is auto-dismissed when:
 *   - User clicks the dismiss (×) button → removes key from newArticleKeys
 *   - Article is analyzed by AI → badge hidden (analyzed === true)
 *
 * Session cache:
 *   - Main feed:       sessionStorage key `sources_v{VERSION}_{ticker}`
 *   - Competitor feeds: sessionStorage key `sources_comp_v{VERSION}_{name}`
 *   - Both use 10-minute TTL; after expiry, articles are re-fetched from API
 *
 * @version 7.0.0
 */

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { VERDICT_COLORS, parseVerdict, stripVerdict } from './verdictUtils';

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

// Cache key version — increment to bust stale session caches
const CACHE_VERSION = 2;

function getCachedFeed(ticker: string): CachedFeed | null {
  try {
    const raw = sessionStorage.getItem(`sources_v${CACHE_VERSION}_${ticker}`);
    if (!raw) return null;
    const parsed: CachedFeed = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(`sources_v${CACHE_VERSION}_${ticker}`);
      return null;
    }
    return parsed;
  } catch { return null; }
}

function setCachedFeed(ticker: string, prs: ArticleItem[], news: ArticleItem[]) {
  try {
    const entry: CachedFeed = { pressReleases: prs, news, fetchedAt: Date.now() };
    sessionStorage.setItem(`sources_v${CACHE_VERSION}_${ticker}`, JSON.stringify(entry));
  } catch { /* quota exceeded — ignore */ }
}

function getCachedCompFeed(name: string): CachedFeed | null {
  try {
    const raw = sessionStorage.getItem(`sources_comp_v${CACHE_VERSION}_${name}`);
    if (!raw) return null;
    const parsed: CachedFeed = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(`sources_comp_v${CACHE_VERSION}_${name}`);
      return null;
    }
    return parsed;
  } catch { return null; }
}

function setCachedCompFeed(name: string, prs: ArticleItem[], news: ArticleItem[]) {
  try {
    const entry: CachedFeed = { pressReleases: prs, news, fetchedAt: Date.now() };
    sessionStorage.setItem(`sources_comp_v${CACHE_VERSION}_${name}`, JSON.stringify(entry));
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

/** Only articles published within the last 48 hours can be labeled NEW */
const NEW_STALENESS_MS = 48 * 60 * 60 * 1000;
function isRecentEnoughForNew(article: ArticleItem): boolean {
  if (!article.date) return true; // no date → assume recent
  const parsed = new Date(article.date).getTime();
  if (isNaN(parsed)) return true; // unparseable → assume recent
  return (Date.now() - parsed) < NEW_STALENESS_MS;
}

// ── Per-article tracked-status overrides (survives refresh within session) ──
// When a per-article re-check confirms an article is tracked, store the override
// so that loadMainCard carry-over and promote logic can pick it up.
const trackedOverrides = new Map<string, boolean>();

function getTrackedOverride(article: ArticleItem): boolean | undefined {
  return trackedOverrides.get(articleCacheKey(article));
}

function setTrackedOverride(article: ArticleItem, value: boolean) {
  trackedOverrides.set(articleCacheKey(article), value);
}

// Verdict types and utilities imported from './verdictUtils'

// ── Article row (EDGAR filing-row style) ────────────────────────────────────
const SourceArticleRow: React.FC<{
  article: ArticleItem;
  type: 'pr' | 'news';
  showAnalysis?: boolean;
  ticker: string;
  isGenuinelyNew?: boolean;
  persistedAnalysis?: string | null;
  onDismissNew?: () => void;
}> = ({ article, type, showAnalysis, ticker, isGenuinelyNew, persistedAnalysis, onDismissNew }) => {
  const cacheKey = articleCacheKey(article);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(() => getSourceAnalysisCache(ticker, cacheKey) || persistedAnalysis || null);

  // Hydrate from persistent storage when it becomes available after async fetch
  useEffect(() => {
    if (!aiAnalysis && persistedAnalysis) {
      setAiAnalysis(persistedAnalysis);
      setSourceAnalysisCache(ticker, cacheKey, persistedAnalysis);
    }
  }, [persistedAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps
  const [analyzing, setAnalyzing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [recheckLoading, setRecheckLoading] = useState(false);
  const [localAnalyzed, setLocalAnalyzed] = useState<boolean | null>(article.analyzed ?? null);

  // Sync with parent prop. Promote-only: once tracked, never demote.
  // DB is append-only so a tracked article should stay tracked.
  useEffect(() => {
    const parentVal = article.analyzed ?? null;
    setLocalAnalyzed(prev => (prev === true && parentVal !== true) ? true : parentVal);
  }, [article.analyzed]);

  const handleRecheck = async () => {
    // Already tracked — DB is append-only, skip the API call entirely
    if (localAnalyzed === true) return;

    setRecheckLoading(true);
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: [{ headline: article.headline, date: article.date }] }),
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.results?.[0]?.analyzed ?? null;
        setLocalAnalyzed(result);
        if (result === true) setTrackedOverride(article, true);
      }
    } catch { /* best-effort */ }
    finally { setRecheckLoading(false); }
  };

  const statusColor = localAnalyzed === null || localAnalyzed === undefined
    ? 'var(--text3)' : localAnalyzed ? 'var(--mint)' : 'var(--coral)';
  const statusLabel = localAnalyzed === null || localAnalyzed === undefined
    ? '' : localAnalyzed ? 'TRACKED' : 'UNTRACKED';
  const statusTitle = localAnalyzed === null || localAnalyzed === undefined
    ? 'Not checked' : localAnalyzed ? 'In analysis' : 'Not in analysis';
  const tc = SOURCE_TYPE_COLORS[type];

  const isErrorAnalysis = (text: string | null) => !!text && (text.startsWith('Error:') || text === 'No analysis returned.' || text === 'AI analysis failed');

  const handleAnalyze = async () => {
    const isError = isErrorAnalysis(aiAnalysis);
    if (aiAnalysis && !isError) {
      setAiAnalysis(null); removeSourceAnalysisCache(ticker, cacheKey); setExpanded(false);
      // Also remove from persistent storage (fire-and-forget)
      fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'sources', key: cacheKey, text: null }) }).catch(() => {});
      return;
    }
    // If previous result was an error, clear it before retrying
    if (isError) {
      setAiAnalysis(null); removeSourceAnalysisCache(ticker, cacheKey);
    }
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
      const failed = isErrorAnalysis(text);
      setAiAnalysis(text);
      setSourceAnalysisCache(ticker, cacheKey, text);
      // Only persist successful analyses to Postgres (don't save error strings)
      if (!failed) {
        fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'sources', key: cacheKey, text }) }).catch(() => {});
      }
    } catch (err) {
      const errText = `Error: ${(err as Error).message}`;
      setAiAnalysis(errText);
      setSourceAnalysisCache(ticker, cacheKey, errText);
      // Don't persist errors to Postgres
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
              opacity: localAnalyzed === null || localAnalyzed === undefined ? 0.4 : 0.9,
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
          const verdict = parseVerdict(aiAnalysis);
          if (!verdict) return null;
          const vc = VERDICT_COLORS[verdict.level];
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
        {/* NEW badge — clickable: dismisses the article as "seen" */}
        {isGenuinelyNew && !aiAnalysis && (
          <button
            onClick={(e) => { e.stopPropagation(); onDismissNew?.(); }}
            title="Mark as seen"
            style={{
              fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              padding: '1px 5px', borderRadius: 3, flexShrink: 0,
              color: 'var(--sky)', background: 'var(--sky-dim)',
              border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)',
              cursor: 'pointer', outline: 'none', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--sky) 20%, transparent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--sky-dim)'; }}
          >
            NEW
          </button>
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
          {showAnalysis && (
            <button
              onClick={handleRecheck}
              disabled={recheckLoading}
              title="Re-check if this article is in the database"
              style={{
                fontSize: 9, fontWeight: 500, fontFamily: 'inherit',
                padding: '2px 5px', borderRadius: 4,
                color: recheckLoading ? 'var(--text3)' : 'rgba(130,180,220,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${recheckLoading ? 'var(--border)' : 'rgba(130,180,220,0.15)'}`,
                cursor: recheckLoading ? 'wait' : 'pointer',
                transition: 'all 0.15s', outline: 'none',
                display: 'inline-flex', alignItems: 'center',
                opacity: recheckLoading ? 0.5 : 1,
              }}
            >
              <svg width={11} height={11} viewBox="0 0 16 16" fill="none" style={{ animation: recheckLoading ? 'spin 0.8s linear infinite' : 'none' }}>
                <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Expanded body — analysis content */}
      {aiAnalysis && expanded && (
        <div style={{ padding: '0 12px 12px' }}>
          {/* Verdict badge */}
          {(() => {
            const verdict = parseVerdict(aiAnalysis);
            if (!verdict) return null;
            const vc = VERDICT_COLORS[verdict.level];
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
                {stripVerdict(aiAnalysis)}
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
  newArticleKeys: Set<string>;
  persistedSourceAnalyses: Record<string, string>;
  onDismissNew?: (cacheKey: string) => void;
}> = ({ pressReleases, news, showAnalysis, ticker, newArticleKeys, persistedSourceAnalyses, onDismissNew }) => {
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

  // Split into genuinely-new articles (top) vs everything else (bottom)
  const newEntries = displayed.filter(a => newArticleKeys.has(articleCacheKey(a)) && a.analyzed !== true);
  const oldEntries = displayed.filter(a => !(newArticleKeys.has(articleCacheKey(a)) && a.analyzed !== true));
  const hasNewAndOld = newEntries.length > 0 && oldEntries.length > 0;

  const renderRow = (a: typeof combined[number], i: number) => {
    const key = articleCacheKey(a);
    return (
      <SourceArticleRow key={`${a._type}-${i}`} article={a} type={a._type} showAnalysis={showAnalysis} ticker={ticker} isGenuinelyNew={newArticleKeys.has(key)} persistedAnalysis={persistedSourceAnalyses[key] || null} onDismissNew={() => onDismissNew?.(key)} />
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {newEntries.map(renderRow)}
      {hasNewAndOld && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 12px', margin: '2px 0',
        }}>
          <span style={{ flex: 1, height: 1, background: 'color-mix(in srgb, var(--border) 40%, transparent)' }} />
        </div>
      )}
      {oldEntries.map(renderRow)}
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
  newArticleKeys: Set<string>;
  persistedSourceAnalyses: Record<string, string>;
  onLoad: () => void;
  onRecheck?: () => void;
  onSimulateNew?: () => void;
  onTabChange?: (tab: 'pr' | 'news') => void;
  onDismissNew?: (cacheKey: string) => void;
}> = ({ label, url, data, showAnalysis, aiChecking, isPrimary, fetchedAt, ticker, newArticleKeys, persistedSourceAnalyses, onLoad, onRecheck, onSimulateNew, onDismissNew }) => {
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
        <div style={{ display: 'flex', gap: 6 }}>
          {/* Refresh — fetch new articles */}
          <button
            ref={buttonRef}
            onClick={onLoad}
            disabled={data.loading}
            aria-label={data.loaded ? `Refresh ${label} feeds` : `Load ${label} feeds`}
            title="Fetch new articles"
            style={{
              fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '5px 14px', borderRadius: 4,
              color: data.loading ? 'var(--text3)' : 'rgba(130,200,130,0.5)',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${data.loading ? 'var(--border)' : 'rgba(130,200,130,0.15)'}`,
              cursor: data.loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              opacity: data.loading ? 0.5 : 1,
              transition: 'all 0.15s', outline: 'none',
            }}
          >
            <svg
              width="10" height="10" viewBox="0 0 16 16" fill="none"
              style={{ animation: data.loading ? 'spin 1s linear infinite' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {data.loading ? 'Fetching' : data.loaded ? 'Refresh' : 'Load'}
          </button>
          {/* Simulate New — dev-only: pretend some untracked articles just appeared */}
          {data.loaded && onSimulateNew && (
            <button
              onClick={onSimulateNew}
              title="DEV: Simulate new articles appearing (picks up to 3 untracked articles)"
              style={{
                fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '5px 14px', borderRadius: 4,
                color: 'rgba(200,170,100,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,170,100,0.15)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s', outline: 'none',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Simulate New
            </button>
          )}
          {/* Re-check — check if articles have been added to database */}
          {data.loaded && onRecheck && (
            <button
              onClick={onRecheck}
              disabled={aiChecking ?? false}
              aria-label={`Re-check ${label} against database`}
              title="Re-check if articles have been added to database"
              style={{
                fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '5px 14px', borderRadius: 4,
                color: aiChecking ? 'var(--text3)' : 'rgba(130,180,220,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${aiChecking ? 'var(--border)' : 'rgba(130,180,220,0.15)'}`,
                cursor: aiChecking ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                opacity: aiChecking ? 0.5 : 1,
                transition: 'all 0.15s', outline: 'none',
              }}
            >
              <svg
                width="10" height="10" viewBox="0 0 16 16" fill="none"
                style={{ animation: aiChecking ? 'spin 1s linear infinite' : 'none' }}
              >
                <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {aiChecking ? 'Checking...' : 'Re-check DB'}
            </button>
          )}
        </div>
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

        {isPrimary && !data.loaded && !data.loading && !data.error && (
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
          <SourceArticleList pressReleases={data.pressReleases} news={data.news} showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} />
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
  const [matchMethod, setMatchMethod] = useState<'ai' | 'local' | 'hybrid' | null>(null);
  const [forceLocal, setForceLocal] = useState(false);

  // Track genuinely new articles: persisted via DB so NEW badges survive page reloads.
  // seenArticleKeysRef holds all cache keys previously stored in the seen_articles table.
  const seenArticleKeysRef = useRef<Set<string>>(new Set());
  const [newArticleKeys, setNewArticleKeys] = useState<Set<string>>(new Set());

  // Track whether the initial auto-recheck has fired (prevents double-checking)
  const initialRecheckDone = useRef(false);
  const compRecheckDone = useRef<Set<string>>(new Set());

  // Persistent analysis cache (survives page reloads — loaded from disk)
  const [persistedSourceAnalyses, setPersistedSourceAnalyses] = useState<Record<string, string>>({});

  const checkAnalyzed = useCallback(async (articles: ArticleItem[]): Promise<ArticleItem[]> => {
    if (articles.length === 0) return articles;
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: articles.map(a => ({ headline: a.headline, date: a.date })), forceLocal }),
      });
      if (!res.ok) throw new Error(`AI check failed: ${res.status}`);
      const data = await res.json();
      if (!data.results) throw new Error(data.error || 'No results returned');
      if (data.method) setMatchMethod(data.method);
      const trackedCount = data.results.filter((r: { analyzed: boolean }) => r.analyzed === true).length;
      console.log(`[SharedSourcesTab] check-analyzed: ${trackedCount}/${data.results.length} tracked (method: ${data.method}, dbEntries: ${data.dbEntries ?? '?'}${data.reason ? ', reason: ' + data.reason : ''})`);
      return articles.map((article, i) => ({ ...article, analyzed: data.results?.[i]?.analyzed ?? null }));
    } catch (err) {
      console.error('[SharedSourcesTab] AI check error:', err);
      return articles.map(a => ({ ...a, analyzed: null }));
    }
  }, [ticker, forceLocal]);

  // Fetch new articles from news/PR APIs
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

    // Track genuinely new articles: compare against DB-persisted seen keys
    const all = [...prs, ...news];
    const currentKeys = new Set(all.map(a => articleCacheKey(a)));

    // Identify articles we haven't seen before (not in the DB) AND recent enough
    const fresh = new Set<string>();
    for (const a of all) {
      const key = articleCacheKey(a);
      if (!seenArticleKeysRef.current.has(key) && isRecentEnoughForNew(a)) fresh.add(key);
    }
    // Merge: replace main-feed keys but preserve competitor NEW keys
    setNewArticleKeys(prev => {
      const next = new Set<string>();
      // Keep competitor keys that aren't in the current main feed
      for (const k of prev) {
        if (!currentKeys.has(k)) next.add(k);
      }
      // Add main feed fresh keys
      for (const k of fresh) next.add(k);
      return next;
    });

    // Persist all current articles as "seen" in the DB.
    // Await so the data is saved before the user can refresh.
    const newToSave = all
      .filter(a => !seenArticleKeysRef.current.has(articleCacheKey(a)))
      .map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date }));
    if (newToSave.length > 0) {
      console.log(`[seen-articles] saving ${newToSave.length} articles...`);
      try {
        const saveRes = await fetch('/api/seen-articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, articles: newToSave }),
        });
        const saveBody = await saveRes.json().catch(() => ({}));
        if (saveRes.ok) {
          console.log('[seen-articles] save OK:', saveBody);
        } else {
          console.error('[seen-articles] save failed:', saveRes.status, saveBody);
        }
      } catch (err) {
        console.error('[seen-articles] save error:', err);
      }
    }
    // Update local ref so within-session refreshes also work
    for (const key of currentKeys) {
      seenArticleKeysRef.current.add(key);
    }

    // Carry over analyzed status from previous state + per-article recheck overrides,
    // so dots don't flash to red while the check runs.
    setMainCard(prev => {
      const prevStatus = new Map<string, boolean | null>();
      for (const a of [...prev.pressReleases, ...prev.news]) {
        const key = `${a.headline}|${a.date}`;
        if (a.analyzed != null) prevStatus.set(key, a.analyzed);
      }
      // Apply per-article recheck overrides (from small re-check button)
      const resolveStatus = (a: ArticleItem): boolean | null => {
        const override = getTrackedOverride(a);
        if (override === true) return true;
        return prevStatus.get(`${a.headline}|${a.date}`) ?? null;
      };
      return {
        ...prev, loading: false, loaded: true, error,
        pressReleases: prs.map(a => ({ ...a, analyzed: resolveStatus(a) })),
        news: news.map(a => ({ ...a, analyzed: resolveStatus(a) })),
      };
    });
    const now = Date.now();
    setLastFetchedAt(now);

    // Re-check analyzed status for the fresh articles
    const allArticles = [...prs, ...news];
    // Prevent auto-recheck useEffect from firing a duplicate check
    initialRecheckDone.current = true;
    if (allArticles.length > 0) {
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(allArticles);
        const checkedPrs = checked.slice(0, prs.length);
        const checkedNews = checked.slice(prs.length);
        // Merge: only promote (never demote) compared to carried-over status
        setMainCard(prev => ({
          ...prev,
          pressReleases: checkedPrs.map((a, i) => ({
            ...a,
            analyzed: (a.analyzed === true || prev.pressReleases[i]?.analyzed === true) ? true : a.analyzed,
          })),
          news: checkedNews.map((a, i) => ({
            ...a,
            analyzed: (a.analyzed === true || prev.news[i]?.analyzed === true) ? true : a.analyzed,
          })),
        }));
        // Update session cache WITH correct analyzed status (not null)
        setCachedFeed(ticker, checkedPrs, checkedNews);
      } catch {
        // On check failure, still cache articles (with carried-over status)
        setCachedFeed(ticker, prs, news);
      }
      finally { setAiChecking(false); }
    } else {
      setCachedFeed(ticker, prs, news);
    }
  }, [ticker, checkAnalyzed]);

  // Re-check whether current articles have been added to the database.
  // Only promotes articles (untracked→tracked), never demotes (tracked→untracked).
  // The DB is append-only, so a previously-tracked article should stay tracked.
  // This prevents AI non-determinism from flipping green dots to red on re-check.
  const recheckMainCard = useCallback(async () => {
    setAiChecking(true);
    try {
      const all = [...mainCard.pressReleases, ...mainCard.news];
      if (all.length === 0) return;
      const checked = await checkAnalyzed(all);
      setMainCard(prev => {
        const prLen = prev.pressReleases.length;
        return {
          ...prev,
          pressReleases: checked.slice(0, prLen).map((article, i) => ({
            ...article,
            analyzed: (article.analyzed === true || prev.pressReleases[i]?.analyzed === true) ? true : article.analyzed,
          })),
          news: checked.slice(prLen).map((article, i) => ({
            ...article,
            analyzed: (article.analyzed === true || prev.news[i]?.analyzed === true) ? true : article.analyzed,
          })),
        };
      });
    } catch { /* handled */ }
    finally { setAiChecking(false); }
  }, [mainCard.pressReleases, mainCard.news, checkAnalyzed]);

  const recheckCompetitor = useCallback(async (name: string) => {
    const card = compCards[name];
    if (!card || (!card.pressReleases.length && !card.news.length)) return;
    setCompAiChecking(prev => ({ ...prev, [name]: true }));
    try {
      const all = [...card.pressReleases, ...card.news];
      const checked = await checkAnalyzed(all);
      const prLen = card.pressReleases.length;
      const checkedPrs = checked.slice(0, prLen).map((article, i) => ({
        ...article,
        analyzed: (article.analyzed === true || card.pressReleases[i]?.analyzed === true) ? true : article.analyzed,
      }));
      const checkedNews = checked.slice(prLen).map((article, i) => ({
        ...article,
        analyzed: (article.analyzed === true || card.news[i]?.analyzed === true) ? true : article.analyzed,
      }));
      setCompCards(prev => ({ ...prev, [name]: { ...prev[name], pressReleases: checkedPrs, news: checkedNews } }));
      // Update session cache with fresh analyzed status
      setCachedCompFeed(name, checkedPrs, checkedNews);
    } catch { /* handled */ }
    finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
  }, [compCards, checkAnalyzed]);

  const loadCompetitor = useCallback(async (name: string) => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: true, loaded: false, error: null } }));
    try {
      const res = await fetch(`/api/competitor-feed/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const prs: ArticleItem[] = (data.pressReleases || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      const news: ArticleItem[] = (data.news || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      setCompCards(prev => ({ ...prev, [name]: { loading: false, loaded: true, error: null, activeTab: prev[name]?.activeTab || 'pr', pressReleases: prs, news } }));

      // Track new articles: compare against seen keys + save to DB
      const all = [...prs, ...news];
      const newCompToSave = all
        .filter(a => !seenArticleKeysRef.current.has(articleCacheKey(a)))
        .map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date }));
      if (newCompToSave.length > 0) {
        // Mark new competitor articles in the shared newArticleKeys set (only recent ones)
        const recentCompKeys = all
          .filter(a => !seenArticleKeysRef.current.has(articleCacheKey(a)) && isRecentEnoughForNew(a))
          .map(a => articleCacheKey(a));
        if (recentCompKeys.length > 0) {
          setNewArticleKeys(prev => {
            const next = new Set(prev);
            for (const k of recentCompKeys) next.add(k);
            return next;
          });
        }
        // Save to DB
        try {
          await fetch('/api/seen-articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, articles: newCompToSave }),
          });
        } catch { /* best-effort */ }
        for (const a of all) seenArticleKeysRef.current.add(articleCacheKey(a));
      }

      // Check analyzed status, then cache WITH correct analyzed state
      // Mark as rechecked so auto-recheck useEffect doesn't duplicate
      compRecheckDone.current.add(name);
      if (all.length > 0) {
        setCompAiChecking(prev => ({ ...prev, [name]: true }));
        try {
          const checked = await checkAnalyzed(all);
          const checkedPrs = checked.slice(0, prs.length);
          const checkedNews = checked.slice(prs.length);
          setCompCards(prev => ({ ...prev, [name]: { ...prev[name], pressReleases: checkedPrs, news: checkedNews } }));
          // Session-cache WITH analyzed status so dots survive reload
          setCachedCompFeed(name, checkedPrs, checkedNews);
        } catch {
          // On check failure, still cache articles (with null status)
          setCachedCompFeed(name, prs, news);
        } finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
      } else {
        setCachedCompFeed(name, prs, news);
      }
    } catch {
      setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [] }), loading: false, loaded: false, error: 'Could not fetch feeds' } }));
    }
  }, [ticker, checkAnalyzed]);

  const loadAll = useCallback(async () => {
    setLoadingAll(true);
    const promises: Promise<unknown>[] = [];
    if (!mainCard.loaded && !mainCard.loading) promises.push(loadMainCard());
    if (competitors?.length) { for (const c of competitors) promises.push(loadCompetitor(c.name)); }
    await Promise.allSettled(promises);
    setLoadingAll(false);
  }, [mainCard.loaded, mainCard.loading, loadMainCard, competitors, loadCompetitor]);

  // Auto-load on mount: first hydrate seen keys from DB, then load articles
  useEffect(() => {
    let cancelled = false;

    async function init() {
      // 1. Fetch seen article keys from DB
      try {
        const res = await fetch(`/api/seen-articles?ticker=${ticker}`);
        if (res.ok) {
          const data = await res.json();
          const keys: string[] = data.keys || [];
          seenArticleKeysRef.current = new Set(keys);
          console.log(`[seen-articles] hydrated ${keys.length} keys from DB`);
        } else {
          const body = await res.json().catch(() => ({}));
          console.error('[seen-articles] hydrate failed:', res.status, body.error || '');
        }
      } catch (err) { console.error('[seen-articles] hydrate error:', err); }

      if (cancelled) return;

      // 2. Load articles (from cache or fetch)
      const cached = getCachedFeed(ticker);
      if (cached) {
        // Restore from session cache — compare against DB-persisted seen keys
        const allCached = [...cached.pressReleases, ...cached.news];
        const fresh = new Set<string>();
        for (const a of allCached) {
          const key = articleCacheKey(a);
          if (!seenArticleKeysRef.current.has(key) && isRecentEnoughForNew(a)) fresh.add(key);
        }
        setNewArticleKeys(fresh);

        // Save unseen articles to DB (same logic as loadMainCard)
        const newToSave = allCached
          .filter(a => !seenArticleKeysRef.current.has(articleCacheKey(a)))
          .map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date }));
        if (newToSave.length > 0) {
          console.log(`[seen-articles] saving ${newToSave.length} cached articles...`);
          try {
            const saveRes = await fetch('/api/seen-articles', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ticker, articles: newToSave }),
            });
            const saveBody = await saveRes.json().catch(() => ({}));
            if (saveRes.ok) {
              console.log('[seen-articles] save OK:', saveBody);
            } else {
              console.error('[seen-articles] save failed:', saveRes.status, saveBody);
            }
          } catch (err) {
            console.error('[seen-articles] save error:', err);
          }
          for (const a of allCached) {
            seenArticleKeysRef.current.add(articleCacheKey(a));
          }
        }

        setMainCard(prev => ({
          ...prev, loaded: true, loading: false,
          pressReleases: cached.pressReleases, news: cached.news,
        }));
        setLastFetchedAt(cached.fetchedAt);
      } else {
        loadMainCard();
      }

      // 3. Restore competitor feeds from session cache
      if (competitors?.length) {
        for (const comp of competitors) {
          if (cancelled) return;
          const compCached = getCachedCompFeed(comp.name);
          if (compCached) {
            // Identify new competitor articles (only recent ones get NEW badge)
            const allComp = [...compCached.pressReleases, ...compCached.news];
            const compFresh: string[] = [];
            for (const a of allComp) {
              const key = articleCacheKey(a);
              if (!seenArticleKeysRef.current.has(key) && isRecentEnoughForNew(a)) compFresh.push(key);
            }
            if (compFresh.length > 0) {
              setNewArticleKeys(prev => {
                const next = new Set(prev);
                for (const k of compFresh) next.add(k);
                return next;
              });
              // Save unseen competitor articles to DB
              const compToSave = allComp
                .filter(a => !seenArticleKeysRef.current.has(articleCacheKey(a)))
                .map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date }));
              try {
                await fetch('/api/seen-articles', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ticker, articles: compToSave }),
                });
              } catch { /* best-effort */ }
              for (const a of allComp) seenArticleKeysRef.current.add(articleCacheKey(a));
            }
            setCompCards(prev => ({
              ...prev,
              [comp.name]: {
                loading: false, loaded: true, error: null,
                activeTab: prev[comp.name]?.activeTab || 'pr',
                pressReleases: compCached.pressReleases, news: compCached.news,
              },
            }));
          }
        }
      }
    }

    init();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  // Auto re-check database status after articles are loaded (cache-loaded articles only;
  // loadMainCard already sets initialRecheckDone.current = true to prevent double-checking)
  useEffect(() => {
    if (mainCard.loaded && !initialRecheckDone.current && (mainCard.pressReleases.length > 0 || mainCard.news.length > 0)) {
      initialRecheckDone.current = true;
      recheckMainCard();
    }
  }, [mainCard.loaded, mainCard.pressReleases.length, mainCard.news.length, recheckMainCard]);

  // Auto re-check competitor status after cache restore (mirrors main card logic above).
  // loadCompetitor already marks compRecheckDone to prevent double-checking.
  useEffect(() => {
    if (!competitors?.length) return;
    for (const comp of competitors) {
      const card = compCards[comp.name];
      if (card?.loaded && !compRecheckDone.current.has(comp.name) &&
          (card.pressReleases.length > 0 || card.news.length > 0)) {
        compRecheckDone.current.add(comp.name);
        recheckCompetitor(comp.name);
      }
    }
  }, [competitors, compCards, recheckCompetitor]);

  // Hydrate persisted source analyses from disk on mount
  useEffect(() => {
    fetch(`/api/analysis-cache?ticker=${ticker}`)
      .then(res => res.ok ? res.json() : { sources: {} })
      .then(data => {
        const sourcesCache: Record<string, string> = {};
        for (const [key, entry] of Object.entries(data.sources || {})) {
          sourcesCache[key] = (entry as { text: string }).text;
        }
        setPersistedSourceAnalyses(sourcesCache);
      })
      .catch(() => {}); // best-effort
  }, [ticker]);

  // Dismiss a single NEW article: remove from newArticleKeys + persist to DB
  const dismissNewArticle = useCallback((cacheKey: string) => {
    setNewArticleKeys(prev => {
      const next = new Set(prev);
      next.delete(cacheKey);
      return next;
    });
    seenArticleKeysRef.current.add(cacheKey);
    // Persist dismiss to DB so it survives page refresh
    const allArticles = [...mainCard.pressReleases, ...mainCard.news];
    const article = allArticles.find(a => articleCacheKey(a) === cacheKey);
    if (article) {
      fetch('/api/seen-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          articles: [{ cacheKey, headline: article.headline, date: article.date }],
          dismiss: true,
        }),
      }).then(res => {
        if (!res.ok) console.error('[seen-articles] dismiss failed:', res.status);
      }).catch(err => console.error('[seen-articles] dismiss error:', err));
    }
  }, [ticker, mainCard.pressReleases, mainCard.news]);

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

      {/* AI / Local toggle */}
      {(mainCard.loaded || loadedCount > 0) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 12px' }}>
          <button
            onClick={() => setForceLocal(prev => !prev)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--border)', background: 'var(--surface2)',
              cursor: 'pointer', fontSize: 10, fontFamily: 'Space Mono, monospace',
              color: forceLocal ? 'var(--gold)' : 'var(--sky)',
            }}
          >
            <span style={{
              width: 24, height: 12, borderRadius: 6, position: 'relative',
              background: forceLocal ? 'var(--gold-dim)' : 'var(--sky-dim)',
              border: `1px solid ${forceLocal ? 'var(--gold)' : 'var(--sky)'}`,
              transition: 'background 0.2s',
            }}>
              <span style={{
                position: 'absolute', top: 1, width: 8, height: 8, borderRadius: '50%',
                background: forceLocal ? 'var(--gold)' : 'var(--sky)',
                left: forceLocal ? 13 : 1,
                transition: 'left 0.2s',
              }} />
            </span>
            {forceLocal ? 'Local only' : 'AI + Local'}
          </button>
          {matchMethod && (
            <span style={{
              fontSize: 10, fontFamily: 'Space Mono, monospace',
              padding: '2px 8px', borderRadius: 5,
              background: matchMethod === 'local' ? 'var(--gold-dim)' : 'var(--sky-dim)',
              color: matchMethod === 'local' ? 'var(--gold)' : 'var(--sky)',
            }}>
              {matchMethod === 'ai' ? 'AI' : matchMethod === 'hybrid' ? 'hybrid' : 'local'}
            </span>
          )}
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
          newArticleKeys={newArticleKeys}
          persistedSourceAnalyses={persistedSourceAnalyses}
          onLoad={loadMainCard}
          onRecheck={recheckMainCard}
          onSimulateNew={() => {
            const all = [...mainCard.pressReleases, ...mainCard.news];
            const untracked = all.filter(a => a.analyzed !== true).slice(0, 3);
            if (untracked.length === 0) return;
            setNewArticleKeys(new Set(untracked.map(a => articleCacheKey(a))));
          }}
          onTabChange={(tab) => setMainCard(prev => ({ ...prev, activeTab: tab }))}
          onDismissNew={dismissNewArticle}
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
                  newArticleKeys={newArticleKeys}
                  persistedSourceAnalyses={persistedSourceAnalyses}
                  onLoad={() => loadCompetitor(comp.name)}
                  onRecheck={() => recheckCompetitor(comp.name)}
                  onTabChange={(tab) => setCompTab(comp.name, tab)}
                  onDismissNew={dismissNewArticle}
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
              <div>Queries Neon PostgreSQL via Drizzle ORM — 4 tables in parallel.</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: 'var(--text3)' }}>Tables:</span> timeline_events, sec_filings, catalysts, partner_news
              </div>
              <div>
                <span style={{ color: 'var(--text3)' }}>Headline fields:</span> event, description, headline
              </div>
              <div>
                <span style={{ color: 'var(--text3)' }}>Detail fields:</span> details, period, category, summary
              </div>
              <div>
                <span style={{ color: 'var(--text3)' }}>Dedup:</span> normalized headline (first 80 chars)
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── LOCAL MATCHING FLOW ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Local Matching</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Node: Extract */}
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Extract keywords (stop words removed, stemmed, &gt;2 chars)</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Stemming note */}
              <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', textAlign: 'center', marginBottom: 4 }}>Stemmer: -s, -ed, -ing, -tion, -ment, -ies, -ly, -er, -or</div>
              <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', textAlign: 'center', marginBottom: 4 }}>Overlap: max(article→DB, DB→article) — bidirectional</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Tier 1 row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 1: Headline only</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>&le;30 days: &ge;40%, &ge;3 kw</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>&gt;30 days: &ge;60%, &ge;3 kw</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>short: &ge;60%, &ge;2 kw, &le;30d</div>
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
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>&le;30 days: &ge;50%, &ge;3 kw</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>&gt;30 days: &ge;70%, &ge;3 kw</div>
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
              <div style={{ marginTop: 8, padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', fontStyle: 'italic', textAlign: 'center' }}>Date proximity guard: recurring reports<br />require higher overlap when dates are &gt;30 days apart</div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── NEW ARTICLE DETECTION ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>New Article Detection</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Node: Article arrives */}
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Article fetched / restored from cache</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Node: Cache key */}
              <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', textAlign: 'center' }}>Cache key = URL (alphanum, first 60 chars)</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Node: In DB? */}
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Key in seen_articles DB?</div>
              <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
                {/* Yes branch */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>Yes</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>No badge</div>
                </div>
                {/* No branch */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Published &le; 48h ago?</div>
                  <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>Yes</div>
                      <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                      <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', fontWeight: 600 }}>NEW badge</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                      <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                      <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>No badge (stale)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text3)' }}>Persistence:</span> seen_articles table (Neon) — survives sessions</div>
              <div><span style={{ color: 'var(--text3)' }}>Session cache:</span> sessionStorage — 10 min TTL, avoids re-fetch on tab switch</div>
              <div><span style={{ color: 'var(--text3)' }}>Staleness guard:</span> articles &gt;48h old never get NEW badge</div>
              <div><span style={{ color: 'var(--text3)' }}>Dismiss:</span> click NEW badge to mark dismissed in DB</div>
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
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)' }}>Controls</span>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace' }}>UI toggle</span>
                  <span style={{ margin: '0 8px', color: 'var(--text3)' }}>|</span>
                  <code style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', padding: '1px 5px', borderRadius: 4, background: 'var(--surface2)' }}>DISABLE_AI_MATCHING=true</code>
                  <span style={{ margin: '0 8px', color: 'var(--text3)' }}>|</span>
                  <code style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', padding: '1px 5px', borderRadius: 4, background: 'var(--surface2)' }}>MAX_PROMPT_TOKENS=40000</code>
                </div>
              </div>
            </div>
            {matchMethod && (
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)' }}>Active</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, padding: '2px 8px', borderRadius: 5, background: matchMethod === 'local' ? 'var(--gold-dim)' : 'var(--sky-dim)', color: matchMethod === 'local' ? 'var(--gold)' : 'var(--sky)' }}>{matchMethod === 'ai' ? 'AI semantic matching' : matchMethod === 'hybrid' ? 'hybrid (local + AI)' : 'local keyword matching'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedSourcesTab;
