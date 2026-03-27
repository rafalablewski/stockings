/**
 * SharedSourcesTab — DB-First Intelligence Feed
 *
 * ── Flow ──
 *
 * 1. On mount: load articles ONLY from database (GET /api/seen-articles).
 *    If nothing saved yet → empty state.
 * 2. "Fetch PRs" / "Fetch News" buttons → independently fetch from PR or news APIs.
 *    New articles (not already in DB) are saved with dismissed=false → NEW badge.
 * 3. NEW badge stays until user clicks it → sets dismissed=true in DB.
 * 4. NEW articles are visually separated from old articles.
 *
 * No session cache. No 48h staleness window. No auto-fetch on mount.
 *
 * @version 8.0.0
 */

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { VERDICT_COLORS, parseVerdict, stripVerdict } from './verdictUtils';
import { authFetch } from '@/lib/auth-fetch';
import { articleCacheKey, normalizeHeadline, deduplicateByHeadline } from '@/lib/sourceUtils';

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
  loadingPR: boolean;
  loadingNews: boolean;
  loaded: boolean;
  error: string | null;
  activeTab: 'pr' | 'news';
  pressReleases: ArticleItem[];
  news: ArticleItem[];
}

// ── PR source filter (must stay in sync with OFFICIAL_SOURCES in api/press-intelligence.js) ──
const PR_WIRE_SOURCES = [
  'pr newswire', 'business wire', 'globe newswire', 'globenewswire',
  'accesswire', 'canada newswire', 'newsfile', 'investor relations',
  'globenewswire rss', 'stock titan',
];
function isPRWireSource(source: string): boolean {
  const lower = source.toLowerCase();
  return PR_WIRE_SOURCES.some(s => lower.includes(s));
}

interface PressIntelItem {
  headline: string;
  datetime?: string;
  source?: string;
  _source?: string;
  permalink?: string;
  storyurl?: string;
}

/** Fetch PRs by calling /api/press-intelligence directly (avoids server-to-server issues) */
async function fetchPRsFromPressIntelligence(ticker: string, max: number): Promise<ArticleItem[]> {
  const res = await fetch(`/api/press-intelligence?ticker=${encodeURIComponent(ticker)}`);
  if (!res.ok) throw new Error(`Press intelligence returned ${res.status}`);
  const data = await res.json();
  const items: PressIntelItem[] = Array.isArray(data) ? data : (data.news || []);
  // Filter to official wire sources only
  const prItems = items.filter(item => isPRWireSource(item.source || item._source || ''));
  // Sort newest first
  prItems.sort((a, b) => (b.datetime || '').localeCompare(a.datetime || ''));
  return prItems.slice(0, max).map(item => ({
    headline: item.headline,
    date: item.datetime ? item.datetime.split('T')[0] : '',
    url: item.permalink || item.storyurl || '',
    source: item.source || item._source || '',
    analyzed: null as boolean | null,
  }));
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

/** Merge fresh articles with existing, preserving existing ones not in the fresh set */
function mergeArticles(fresh: ArticleItem[], existing: ArticleItem[]): ArticleItem[] {
  const freshKeys = new Set(fresh.map(articleCacheKey));
  return [...fresh, ...existing.filter(a => !freshKeys.has(articleCacheKey(a)))];
}

/** DB record shape for per-article status display */
interface DbRecord {
  cacheKey: string;
  headline: string;
  date: string | null;
  url: string | null;
  source: string | null;
  articleType: string | null;
  dismissed: boolean;
  hidden: boolean;
}

// ── Article row ─────────────────────────────────────────────────────────────
const SourceArticleRow: React.FC<{
  article: ArticleItem;
  type: 'pr' | 'news';
  showAnalysis?: boolean;
  ticker: string;
  isGenuinelyNew?: boolean;
  isDismissed?: boolean;
  isHidden?: boolean;
  dbRecord?: DbRecord | null;
  persistedAnalysis?: string | null;
  onDismissNew?: () => void;
  onToggleHide?: () => void;
}> = ({ article, type, showAnalysis, ticker, isGenuinelyNew, isDismissed, isHidden, dbRecord, persistedAnalysis, onDismissNew, onToggleHide }) => {
  const cacheKey = articleCacheKey(article);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(persistedAnalysis || null);

  useEffect(() => {
    if (!aiAnalysis && persistedAnalysis) setAiAnalysis(persistedAnalysis);
  }, [persistedAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps
  const [analyzing, setAnalyzing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [recheckLoading, setRecheckLoading] = useState(false);
  const [localAnalyzed, setLocalAnalyzed] = useState<boolean | null>(article.analyzed ?? null);
  // DB tooltip: live data fetched from database on hover
  const [dbTooltip, setDbTooltip] = useState<{ status: string; category: string; heading: string; source: string; date: string; seen: string } | null>(null);
  const [dbTooltipLoading, setDbTooltipLoading] = useState(false);
  const [dbTooltipVisible, setDbTooltipVisible] = useState(false);
  const dbHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbTooltipRef = useRef<HTMLDivElement | null>(null);

  // Cleanup hover timer on unmount to prevent memory leak
  useEffect(() => () => { if (dbHoverTimer.current) clearTimeout(dbHoverTimer.current); }, []);

  useEffect(() => {
    const parentVal = article.analyzed ?? null;
    setLocalAnalyzed(prev => (prev === true && parentVal !== true) ? true : parentVal);
  }, [article.analyzed]);

  const handleRecheck = async () => {
    if (localAnalyzed === true) return;
    setRecheckLoading(true);
    try {
      const res = await fetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: [{ headline: article.headline, date: article.date }], bustCache: true }),
      });
      if (res.ok) {
        const data = await res.json();
        setLocalAnalyzed(data.results?.[0]?.analyzed ?? null);
      }
    } catch { /* best-effort */ }
    finally { setRecheckLoading(false); }
  };

  // Fetch live DB record on hover (always re-fetches for fresh data)
  const handleDbHoverEnter = () => {
    if (dbHoverTimer.current) clearTimeout(dbHoverTimer.current);
    dbHoverTimer.current = setTimeout(async () => {
      setDbTooltipVisible(true);
      setDbTooltipLoading(true);
      try {
        const res = await fetch(`/api/seen-articles?ticker=${encodeURIComponent(ticker)}&cacheKey=${encodeURIComponent(cacheKey)}`);
        if (res.ok) {
          const data = await res.json();
          const rec = data.articles?.[0];
          if (rec) {
            setDbTooltip({
              status: localAnalyzed === true ? 'TRACKED' : localAnalyzed === false ? 'UNTRACKED' : 'PENDING',
              category: rec.articleType === 'pr' ? 'PRESS RELEASE' : rec.articleType === 'news' ? 'NEWS' : rec.articleType || '—',
              heading: rec.headline || '—',
              source: rec.source || '—',
              date: rec.date || '—',
              seen: rec.dismissed ? 'YES' : 'NO',
            });
          } else {
            setDbTooltip(null);
          }
        }
      } catch { /* best-effort */ }
      finally { setDbTooltipLoading(false); }
    }, 200);
  };
  const handleDbHoverLeave = () => {
    if (dbHoverTimer.current) { clearTimeout(dbHoverTimer.current); dbHoverTimer.current = null; }
    setDbTooltipVisible(false);
  };

  const statusColor = localAnalyzed === null || localAnalyzed === undefined
    ? 'var(--text3)' : localAnalyzed ? 'var(--mint)' : 'var(--coral)';
  const statusLabel = localAnalyzed === null || localAnalyzed === undefined
    ? '' : localAnalyzed ? 'TRACKED' : 'UNTRACKED';
  const statusTitle = localAnalyzed === null || localAnalyzed === undefined
    ? 'Not checked' : localAnalyzed ? 'In analysis' : 'Not in analysis';
  const tc = SOURCE_TYPE_COLORS[type];

  const isErrorAnalysis = (text: string | null) => !!text && (text.startsWith('Error:') || text === 'No analysis returned.' || text.includes('AI analysis failed') || text.includes('AI features are disabled'));

  // DB status: green = all fields saved, yellow = partial, gray = not in DB
  const dbColor = !dbRecord ? 'var(--text3)' : (dbRecord.date != null && dbRecord.url != null && dbRecord.source != null && dbRecord.articleType != null) ? 'var(--mint)' : 'var(--gold)';
  const dbOpacity = !dbRecord ? 0.25 : 0.8;

  const handleAnalyze = async () => {
    const isError = isErrorAnalysis(aiAnalysis);
    if (aiAnalysis && !isError) {
      setAiAnalysis(null); setExpanded(false);
      fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'sources', key: cacheKey, text: null }) }).catch(() => {});
      return;
    }
    if (isError) setAiAnalysis(null);
    setAnalyzing(true);
    setExpanded(true);
    try {
      const res = await authFetch('/api/sources/analyze', {
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
      if (!failed) {
        fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'sources', key: cacheKey, text }) }).catch(() => {});
      }
    } catch (err) {
      setAiAnalysis(`Error: ${(err as Error).message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  // Hidden articles: collapsed single-line with low opacity and unhide button
  if (isHidden) {
    return (
      <div className="sm-ed-hidden-row">
        <div className="sm-flex sm-src-hidden-inner">
          <span className="sm-shrink-0 sm-src-type-badge-sm" style={{
            background: tc.bg, color: tc.text,
          }}>
            {type === 'pr' ? 'PR' : 'NEWS'}
          </span>
          <span className="sm-subtle-sm sm-src-headline-hidden">
            {article.headline}
          </span>
          {article.date && (
            <span className="sm-text3 sm-shrink-0 sm-src-date-hidden">
              {article.date}
            </span>
          )}
          <span className="sm-text3 sm-shrink-0 sm-src-hidden-label">hidden</span>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="sm-shrink-0" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onToggleHide?.()}
              title="Unhide article"
              className="sm-ed-action-btn-sm"
            >
              <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                <circle cx="8" cy="8" r="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header row — clickable expand/collapse when analysis exists */}
      <div
        role={aiAnalysis ? 'button' : undefined}
        tabIndex={aiAnalysis ? 0 : undefined}
        aria-expanded={aiAnalysis ? expanded : undefined}
        onClick={aiAnalysis ? () => setExpanded(!expanded) : undefined}
        onKeyDown={aiAnalysis ? (e) => { if (e.key === 'Enter') setExpanded(!expanded); } : undefined}
        className="sm-ed-filing-row"
        style={{ cursor: aiAnalysis ? 'pointer' : undefined }}
      >
        {/* Main row: chevron + status + badge + headline */}
        <div className="sm-ed-row-main">
          {/* Chevron (fixed-width slot so rows align whether analysis exists or not) */}
          <span className="sm-ed-chevron-slot">
          {aiAnalysis && (
            <svg
              width={12} height={12} viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
              style={{
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          )}
          </span>
          {/* Status dot */}
          {showAnalysis && (
            <span
              title={statusTitle}
              className="sm-ed-status-dot"
              style={{
                '--dot-color': statusColor,
                opacity: localAnalyzed === null || localAnalyzed === undefined ? 0.4 : 0.9,
              } as React.CSSProperties}
            />
          )}
          {/* Source type badge — fixed width so columns align */}
          <span className="sm-ed-form-badge sm-src-badge-w48" style={{
            '--badge-bg': tc.bg, '--badge-text': tc.text,
          } as React.CSSProperties}>
            {type === 'pr' ? 'PR' : 'NEWS'}
          </span>
          {/* NEW / SEEN badge — fixed-width slot so headline column aligns */}
          <span className="sm-ed-badge-slot">
            {isGenuinelyNew && !isDismissed && (
              <button
                onClick={(e) => { e.stopPropagation(); onDismissNew?.(); }}
                title="Click to acknowledge"
                className="sm-ed-new-badge"
              >
                NEW
              </button>
            )}
            {isGenuinelyNew && isDismissed && (
              <span className="sm-ed-seen-badge">
                SEEN
              </span>
            )}
          </span>
          {/* Headline */}
          <span className="sm-ed-desc">
            {article.headline}
          </span>
        </div>
        {/* Meta row: verdict + source + date + status + DB + actions */}
        <div className="sm-ed-row-meta">
          {/* Verdict badge inline (compact, shown in header when collapsed) */}
          {aiAnalysis && !expanded && (() => {
            const verdict = parseVerdict(aiAnalysis);
            if (!verdict) return null;
            const vc = VERDICT_COLORS[verdict.level];
            return (
              <span className="sm-ed-verdict-badge" style={{
                '--verdict-color': vc.color, '--verdict-bg': vc.bg,
              } as React.CSSProperties}>
                {verdict.level}
              </span>
            );
          })()}
          {/* Source name */}
          <span className="sm-ed-source-name">
            {article.source || ''}
          </span>
          {/* Date */}
          <span className="sm-ed-date">
            {article.date || ''}
          </span>
          {/* Status label */}
          <span className="sm-ed-status-label" style={{
            '--status-color': showAnalysis && statusLabel ? statusColor : 'transparent',
          } as React.CSSProperties}>
            {showAnalysis && statusLabel ? statusLabel : '\u00A0'}
          </span>
          {/* DB status button — hover fetches live data from database */}
          <span className="sm-shrink-0 sm-relative">
            <button
              type="button"
              aria-label="Show database record"
              className="sm-ed-db-btn"
              style={{
                '--db-color': dbColor,
                '--db-opacity': dbOpacity,
              } as React.CSSProperties}
              onFocus={handleDbHoverEnter}
              onBlur={handleDbHoverLeave}
            >
              <span className="sm-src-db-dot" style={{ background: dbColor }} />
              DB
            </button>
            {/* Tooltip — shows live DB data */}
            {dbTooltipVisible && (
              <div ref={dbTooltipRef} className="sm-ed-db-tooltip sm-db-tooltip-responsive">
                {/* Header — explains what this tooltip checks */}
                <div className="sm-text3 sm-src-tooltip-header">
                  Saved in seen_articles DB?
                </div>
                {dbTooltipLoading ? (
                  <div className="sm-text3 sm-italic">Fetching from database...</div>
                ) : dbTooltip ? (
                  <>
                    <div><span className="sm-text3 sm-src-tooltip-label">status:</span> <span style={{ color: dbTooltip.status === 'TRACKED' ? 'var(--mint)' : dbTooltip.status === 'UNTRACKED' ? 'var(--coral)' : 'var(--text3)', fontWeight: 600 }}>{dbTooltip.status}</span></div>
                    <div><span className="sm-text3 sm-src-tooltip-label">category:</span> <span style={{ color: dbTooltip.category === 'PRESS RELEASE' ? 'var(--sky)' : dbTooltip.category === 'NEWS' ? 'var(--mint)' : 'var(--text3)' }}>{dbTooltip.category}</span></div>
                    <div className="sm-truncate-row"><span className="sm-text3 sm-src-tooltip-label">heading:</span> {dbTooltip.heading}</div>
                    <div><span className="sm-text3 sm-src-tooltip-label">source:</span> {dbTooltip.source}</div>
                    <div><span className="sm-text3 sm-src-tooltip-label">date:</span> {dbTooltip.date}</div>
                    <div><span className="sm-text3 sm-src-tooltip-label">seen:</span> <span style={{ color: dbTooltip.seen === 'NO' ? 'var(--sky)' : 'var(--text3)', fontWeight: 600 }}>{dbTooltip.seen}</span></div>
                  </>
                ) : (
                  <div className="sm-coral sm-fw-600">NOT IN DATABASE</div>
                )}
              </div>
            )}
          </span>
          {/* Action buttons — stop propagation so clicks don't toggle expand */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="sm-flex sm-gap-4 sm-shrink-0" onClick={e => e.stopPropagation()}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open article"
              className="sm-ed-action-btn-sm"
            >
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
              </svg>
            </a>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              title={aiAnalysis ? 'Close AI analysis' : 'Analyze with AI'}
              className="sm-ed-action-btn-sm"
              data-active={aiAnalysis ? 'true' : undefined}
              data-variant={!aiAnalysis ? 'mint' : undefined}
              data-loading={analyzing ? 'true' : undefined}
            >
              {analyzing ? '...' : 'AI'}
            </button>
            {showAnalysis && (
              <button
                onClick={handleRecheck}
                disabled={recheckLoading}
                title="Re-check tracked/untracked status"
                className="sm-ed-action-btn-sm"
                data-variant="blue"
                data-loading={recheckLoading ? 'true' : undefined}
              >
                <svg width={11} height={11} viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <button
              onClick={() => onToggleHide?.()}
              title="Hide article"
              className="sm-ed-action-btn-sm"
              data-muted=""
            >
              <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                <line x1="2" y1="14" x2="14" y2="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded body — analysis content */}
      {aiAnalysis && expanded && (
        <div className="sm-src-analysis-body">
          {/* Verdict badge */}
          {(() => {
            const verdict = parseVerdict(aiAnalysis);
            if (!verdict) return null;
            const vc = VERDICT_COLORS[verdict.level];
            return (
              <div className="sm-ed-verdict-badge sm-src-verdict-expanded" style={{
                '--verdict-color': vc.color, '--verdict-bg': vc.bg,
              } as React.CSSProperties}>
                {verdict.level}
                <span className="sm-src-verdict-explanation">
                  {verdict.explanation}
                </span>
              </div>
            );
          })()}
          {/* Analysis panel */}
          <div className="sm-ed-analysis">
            <div className="sm-flex-between sm-mb-12">
              <span className="sm-section-label sm-section-label-no-mb">
                Analysis Result
              </span>
            </div>
            <div className="sm-scrollbox-tall">
              {aiAnalysis.includes('AI features are disabled') ? (
                <div className="sm-ed-ai-banner">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  {aiAnalysis}
                </div>
              ) : (
                <pre className="sm-ed-analysis-pre">
                  {stripVerdict(aiAnalysis)}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Separate PR / News article lists (max 10 each) ─────────────────────────
const SECTION_MAX = 10;
const HIDDEN_PREVIEW = 5;

const SourceArticleSection: React.FC<{
  articles: ArticleItem[];
  type: 'pr' | 'news';
  label: string;
  showAnalysis?: boolean;
  ticker: string;
  newArticleKeys: Set<string>;
  dbRecords: Map<string, DbRecord>;
  persistedSourceAnalyses: Record<string, string>;
  onDismissNew?: (cacheKey: string) => void;
  onToggleHide?: (cacheKey: string) => void;
}> = ({ articles, type, label, showAnalysis, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onDismissNew, onToggleHide }) => {
  const [showAllHidden, setShowAllHidden] = useState(false);
  const sorted = [...articles].sort((a, b) => {
    // Sort hidden articles to the bottom, then by date descending
    const aHidden = dbRecords.get(articleCacheKey(a))?.hidden ? 1 : 0;
    const bHidden = dbRecords.get(articleCacheKey(b))?.hidden ? 1 : 0;
    if (aHidden !== bHidden) return aHidden - bHidden;
    return (b.date || '').localeCompare(a.date || '');
  });
  // Split visible/hidden so hidden articles don't count toward SECTION_MAX
  const visible = sorted.filter(a => !dbRecords.get(articleCacheKey(a))?.hidden);
  const hidden = sorted.filter(a => dbRecords.get(articleCacheKey(a))?.hidden);
  const displayedHidden = showAllHidden ? hidden : hidden.slice(0, HIDDEN_PREVIEW);
  const displayed = [...visible.slice(0, SECTION_MAX), ...displayedHidden];
  const visibleCount = Math.min(visible.length, SECTION_MAX);
  const remainingHidden = hidden.length - HIDDEN_PREVIEW;

  if (articles.length > 0 && visible.length === 0) {
    console.warn(`[SourceArticleSection] "${label}": ${articles.length} items loaded but 0 visible (all hidden in dbRecords). dbRecords.size=${dbRecords.size}. Sample key: ${articleCacheKey(articles[0])} → hidden=${dbRecords.get(articleCacheKey(articles[0]))?.hidden}`);
  }

  if (displayed.length === 0) return null;

  return (
    <div>
      <div className="sm-micro-label sm-src-section-label">
        {label} ({visibleCount}{hidden.length > 0 ? ` + ${hidden.length} hidden` : ''})
      </div>
      {visible.length === 0 && articles.length > 0 && (
        <div className="sm-text3 sm-src-all-hidden-msg">
          All {articles.length} items are in the hidden list. Expand below or unhide to see them.
        </div>
      )}
      {displayed.map((a) => {
        const key = articleCacheKey(a);
        return (
          <SourceArticleRow key={key} article={a} type={type} showAnalysis={showAnalysis} ticker={ticker} isGenuinelyNew={newArticleKeys.has(key)} isDismissed={dbRecords.get(key)?.dismissed ?? false} isHidden={dbRecords.get(key)?.hidden ?? false} dbRecord={dbRecords.get(key) || null} persistedAnalysis={persistedSourceAnalyses[key] || null} onDismissNew={() => onDismissNew?.(key)} onToggleHide={() => onToggleHide?.(key)} />
        );
      })}
      {/* Load more / collapse for hidden articles */}
      {remainingHidden > 0 && !showAllHidden && (
        <button
          onClick={() => setShowAllHidden(true)}
          className="sm-ed-hidden-row sm-text3 sm-pointer sm-w-full sm-src-hidden-toggle"
        >
          + {remainingHidden} more hidden
        </button>
      )}
      {showAllHidden && hidden.length > HIDDEN_PREVIEW && (
        <button
          onClick={() => setShowAllHidden(false)}
          className="sm-ed-hidden-row sm-text3 sm-pointer sm-w-full sm-src-hidden-toggle"
        >
          collapse hidden
        </button>
      )}
    </div>
  );
};

const SourceArticleList: React.FC<{
  pressReleases: ArticleItem[];
  news: ArticleItem[];
  showAnalysis?: boolean;
  ticker: string;
  newArticleKeys: Set<string>;
  dbRecords: Map<string, DbRecord>;
  persistedSourceAnalyses: Record<string, string>;
  onDismissNew?: (cacheKey: string) => void;
  onToggleHide?: (cacheKey: string) => void;
}> = ({ pressReleases, news, showAnalysis, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onDismissNew, onToggleHide }) => {
  // Deduplicate within each section and across sections (PRs take priority)
  const dedupedPRs = deduplicateByHeadline(pressReleases);
  const prHeadlines = new Set(dedupedPRs.map(a => normalizeHeadline(a.headline)));
  const dedupedNews = deduplicateByHeadline(news).filter(a => !prHeadlines.has(normalizeHeadline(a.headline)));

  // Debug: understand why list appears empty even when db-init logs show PRs
  console.log(
    `[SourceArticleList] render for ${ticker}: rawPR=${pressReleases.length}, dedupedPR=${dedupedPRs.length}, rawNews=${news.length}, dedupedNews=${dedupedNews.length}, dbRecords.size=${dbRecords.size}`
  );

  if (dedupedPRs.length === 0 && dedupedNews.length === 0) {
    return (
      <div className="sm-body-sm sm-text3 sm-src-empty-msg">
        No articles yet. Click AI Fetch to search for articles.
      </div>
    );
  }

  return (
    <div className="sm-flex-col sm-gap-4">
      <SourceArticleSection articles={dedupedPRs} type="pr" label="Press Releases" showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} onToggleHide={onToggleHide} />
      {dedupedPRs.length > 0 && dedupedNews.length > 0 && (
        <div className="sm-src-section-divider" />
      )}
      <SourceArticleSection articles={dedupedNews} type="news" label="News" showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} onToggleHide={onToggleHide} />
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
  dbRecords: Map<string, DbRecord>;
  persistedSourceAnalyses: Record<string, string>;
  onLoad: () => void;
  onLoadPR?: () => void;
  onLoadNews?: () => void;
  onRecheck?: () => void;
  onTabChange?: (tab: 'pr' | 'news') => void;
  onDismissNew?: (cacheKey: string) => void;
  onToggleHide?: (cacheKey: string) => void;
}> = ({ label, url, data, showAnalysis, aiChecking, isPrimary, fetchedAt, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onLoad, onLoadPR, onLoadNews, onRecheck, onDismissNew, onToggleHide }) => {
  const isActive = data.loading || data.loadingPR || data.loadingNews || (aiChecking ?? false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (isPrimary) {
    console.log(
      `[CompanyFeedCard] primary render: loaded=${data.loaded}, loading=${data.loading}, loadingPR=${data.loadingPR}, loadingNews=${data.loadingNews}, pr=${data.pressReleases.length}, news=${data.news.length}, dbRecords.size=${dbRecords.size}`
    );
  }

  return (
    <article
      aria-label={`${label} news feed`}
      className="sm-tab-card sm-src-card-no-pad"
    >
      {/* Header */}
      <div className="sm-flex-between sm-src-card-header" style={{
        borderBottom: data.loaded ? '1px solid var(--border)' : 'none',
        background: isPrimary ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'transparent',
      }}>
        <div className="sm-flex sm-gap-12 sm-min-w-0">
          {/* Status indicator */}
          {data.loaded && (
            <span
              aria-hidden="true"
              className="sm-shrink-0 sm-src-status-indicator"
              style={{
                background: isActive ? 'var(--gold)' : 'var(--mint)',
                boxShadow: isActive ? '0 0 8px var(--gold-dim)' : '0 0 8px var(--mint-dim)',
              }}
            />
          )}
          <h3 className="sm-text sm-overflow-hidden sm-src-card-heading" data-primary={isPrimary ? 'true' : 'false'}>
            {label}
          </h3>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${label} website`}
              className="sm-subtle-sm sm-shrink-0 sm-src-ext-link"
            >
              ↗
            </a>
          )}
          {/* Freshness indicator */}
          {data.loaded && !isActive && fetchedAt && (
            <span className="sm-text3 sm-src-freshness">
              {formatTimeAgo(fetchedAt)}
            </span>
          )}
        </div>
        <div className="sm-flex sm-gap-6">
          {/* Fetch PRs */}
          {onLoadPR ? (
            <button
              onClick={onLoadPR}
              disabled={data.loadingPR || data.loading}
              aria-label={`Fetch ${label} press releases`}
              title="Fetch press releases"
              className="sm-ed-action-btn"
              data-variant="sky"
              data-state={data.loadingPR ? 'loading' : undefined}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {data.loadingPR ? 'PRs...' : 'Fetch PRs'}
            </button>
          ) : null}
          {/* Fetch News */}
          {onLoadNews ? (
            <button
              onClick={onLoadNews}
              disabled={data.loadingNews || data.loading}
              aria-label={`Fetch ${label} news`}
              title="Fetch news articles"
              className="sm-ed-action-btn"
              data-variant="mint"
              data-state={data.loadingNews ? 'loading' : undefined}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {data.loadingNews ? 'News...' : 'Fetch News'}
            </button>
          ) : (
            /* Fallback single button for competitor cards that don't have separate loaders */
            <button
              ref={buttonRef}
              onClick={onLoad}
              disabled={data.loading}
              aria-label={`AI Fetch ${label} feeds`}
              title="Search for new articles via AI"
              className="sm-ed-action-btn sm-p-5-14"
              data-variant="mint"
              data-state={data.loading ? 'loading' : undefined}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className={data.loading ? 'sm-src-spin' : undefined}>
                <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {data.loading ? 'Fetching...' : 'AI Fetch'}
            </button>
          )}
          {/* Re-check — checks tracked/untracked status only (via /api/check-analyzed, NOT seen_articles) */}
          {data.loaded && onRecheck && (
            <button
              onClick={onRecheck}
              disabled={aiChecking ?? false}
              aria-label={`Re-check ${label} tracked/untracked status`}
              title="Re-check tracked/untracked status for all articles (does NOT query seen_articles DB)"
              className="sm-ed-action-btn sm-p-5-14"
              data-variant="blue"
              data-state={aiChecking ? 'loading' : undefined}
            >
              <svg
                width="10" height="10" viewBox="0 0 16 16" fill="none"
                className={aiChecking ? 'sm-src-spin' : undefined}
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
      <div className="sm-src-card-body" data-loaded={data.loaded || data.loading || data.error ? 'true' : undefined}>
        {data.error && (
          <div role="alert" className="sm-ed-error">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {data.error}
          </div>
        )}

        {isPrimary && !data.loaded && !data.loading && !data.error && (
          <div className="sm-ed-loading sm-src-loading-pad">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="sm-src-loading-text">Loading from database...</span>
          </div>
        )}

        {(data.loading || data.loadingPR || data.loadingNews) && (
          <div className="sm-ed-loading sm-src-loading-pad">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="sm-src-spin">
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="sm-src-loading-text">
              {data.loading ? 'Fetching press releases & news...' : data.loadingPR ? 'Fetching press releases...' : 'Fetching news...'}
            </span>
          </div>
        )}

        {data.loaded && (
          <SourceArticleList pressReleases={data.pressReleases} news={data.news} showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} onToggleHide={onToggleHide} />
        )}
      </div>
    </article>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const SharedSourcesTab: React.FC<SharedSourcesTabProps> = ({ ticker, companyName, researchSources, competitorLabel, competitors }) => {
  const [mainCard, setMainCard] = useState<CardData>({
    loading: false, loadingPR: false, loadingNews: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
  });
  const [aiChecking, setAiChecking] = useState(false);
  const [compCards, setCompCards] = useState<Record<string, CardData>>({});
  const [compAiChecking, setCompAiChecking] = useState<Record<string, boolean>>({});
  const [loadingAll, setLoadingAll] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [matchMethod, setMatchMethod] = useState<'ai' | 'local' | 'hybrid' | null>(null);
  const [forceLocal, setForceLocal] = useState(false);

  // DB records map: cacheKey → DB row. Source of truth for DB status and NEW detection.
  const dbRecordsRef = useRef<Map<string, DbRecord>>(new Map());
  const [dbRecords, setDbRecords] = useState<Map<string, DbRecord>>(new Map());

  // NEW badge: articles with dismissed=false in the DB + articles not in DB when AI Fetch runs
  const [newArticleKeys, setNewArticleKeys] = useState<Set<string>>(new Set());

  // Track whether the initial auto-recheck has fired (prevents double-checking)
  const initialRecheckDone = useRef(false);
  const compRecheckDone = useRef<Set<string>>(new Set());

  // Persistent analysis cache (survives page reloads — loaded from Postgres)
  const [persistedSourceAnalyses, setPersistedSourceAnalyses] = useState<Record<string, string>>({});

  const checkAnalyzed = useCallback(async (articles: ArticleItem[], opts?: { bustCache?: boolean }): Promise<ArticleItem[]> => {
    if (articles.length === 0) return articles;
    try {
      const res = await authFetch('/api/check-analyzed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: articles.map(a => ({ headline: a.headline, date: a.date })), forceLocal, ...(opts?.bustCache && { bustCache: true }) }),
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

  // Helper: save articles to DB and update local state. Throws if save fails so callers can surface error.
  const saveArticlesToDb = useCallback(async (articles: { cacheKey: string; headline: string; date: string; url: string; source?: string; articleType: string }[], newKeys: Set<string>) => {
    if (articles.length === 0) return;
    console.log(`[ai-fetch] saving ${articles.length} articles to DB (${newKeys.size} NEW)...`);
    const saveRes = await fetch('/api/seen-articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, articles }),
    });
    const saveBody = await saveRes.json().catch(() => ({}));
    if (!saveRes.ok) {
      console.error('[ai-fetch] save FAILED:', saveRes.status, saveBody);
      throw new Error(saveBody?.error || `Save failed: ${saveRes.status}`);
    }
    console.log('[ai-fetch] save OK:', saveBody);
    if (saveBody.filtered === 0 && articles.length > 0) {
      console.warn('[ai-fetch] WARNING: all articles filtered out during save — check cacheKey/headline values', articles.slice(0, 2));
    }
    for (const a of articles) {
      const existingRec = dbRecordsRef.current.get(a.cacheKey);
      const rec: DbRecord = { cacheKey: a.cacheKey, headline: a.headline, date: a.date || null, url: a.url || null, source: a.source || null, articleType: a.articleType || null, dismissed: newKeys.has(a.cacheKey) ? false : (existingRec?.dismissed ?? false), hidden: false };
      dbRecordsRef.current.set(a.cacheKey, rec);
    }
    setDbRecords(new Map(dbRecordsRef.current));
  }, [ticker]);

  // Fetch Press Releases only (from press-intelligence)
  const loadPRsOnly = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loadingPR: true, error: null }));
    try {
      const prs = await fetchPRsFromPressIntelligence(ticker, SECTION_MAX);

      const newKeys = new Set<string>();
      for (const a of prs) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) newKeys.add(key);
      }

      const toSave = prs.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'pr' }));
      await saveArticlesToDb(toSave, newKeys);

      setMainCard(prev => ({
        ...prev, loadingPR: false, loaded: true,
        pressReleases: mergeArticles(prs, prev.pressReleases),
      }));
      setLastFetchedAt(Date.now());
      if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

      if (prs.length > 0) {
        setAiChecking(true);
        try {
          const checked = await checkAnalyzed(prs);
          setMainCard(prev => ({ ...prev, pressReleases: mergeArticles(checked, prev.pressReleases) }));
        } catch { /* handled */ }
        finally { setAiChecking(false); }
      }
    } catch (err) {
      setMainCard(prev => ({ ...prev, loadingPR: false, error: err instanceof Error ? err.message : 'Could not fetch or save press releases' }));
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

  // Fetch News only
  const loadNewsOnly = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loadingNews: true, error: null }));
    try {
      const res = await fetch(`/api/news/${ticker}`);
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      const news: ArticleItem[] = (d.articles || []).slice(0, SECTION_MAX).map((a: { title: string; date: string; url: string; source: string }) => ({
        headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
      }));

      const newKeys = new Set<string>();
      for (const a of news) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) newKeys.add(key);
      }

      const toSave = news.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'news' }));
      await saveArticlesToDb(toSave, newKeys);

      setMainCard(prev => ({
        ...prev, loadingNews: false, loaded: true,
        news: mergeArticles(news, prev.news),
      }));
      setLastFetchedAt(Date.now());
      if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

      if (news.length > 0) {
        setAiChecking(true);
        try {
          const checked = await checkAnalyzed(news);
          setMainCard(prev => ({ ...prev, news: mergeArticles(checked, prev.news) }));
        } catch { /* handled */ }
        finally { setAiChecking(false); }
      }
    } catch (err) {
      setMainCard(prev => ({ ...prev, loadingNews: false, error: err instanceof Error ? err.message : 'Could not fetch or save news' }));
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

  // AI Fetch: fetch both PRs and news in parallel
  const loadMainCard = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loading: true, loadingPR: true, loadingNews: true, error: null }));
    let prs: ArticleItem[] = [];
    let news: ArticleItem[] = [];

    const [prResult, newsResult] = await Promise.allSettled([
      fetchPRsFromPressIntelligence(ticker, SECTION_MAX),
      fetch(`/api/news/${ticker}`).then(async res => {
        if (!res.ok) throw new Error('Failed');
        const d = await res.json();
        return (d.articles || []).slice(0, SECTION_MAX).map((a: { title: string; date: string; url: string; source: string }) => ({
          headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
        }));
      }),
    ]);

    if (prResult.status === 'fulfilled') prs = prResult.value;
    if (newsResult.status === 'fulfilled') news = newsResult.value;
    let fetchError: string | null = (prResult.status === 'rejected' && newsResult.status === 'rejected') ? 'Could not fetch feeds' : null;

    try {
      const newKeys = new Set<string>();
      for (const a of [...prs, ...news]) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) newKeys.add(key);
      }

      const allToSave = [
        ...prs.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'pr' })),
        ...news.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'news' })),
      ];
      if (allToSave.length > 0) await saveArticlesToDb(allToSave, newKeys);

      setMainCard(prev => ({
        ...prev, loading: false, loadingPR: false, loadingNews: false, loaded: true, error: fetchError,
        pressReleases: mergeArticles(prs, prev.pressReleases),
        news: mergeArticles(news, prev.news),
      }));
      setLastFetchedAt(Date.now());
      if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

      const allArticles = [...prs, ...news];
      if (allArticles.length > 0) {
        initialRecheckDone.current = true;
        setAiChecking(true);
        try {
          const checked = await checkAnalyzed(allArticles);
          setMainCard(prev => ({
            ...prev,
            pressReleases: mergeArticles(checked.slice(0, prs.length), prev.pressReleases),
            news: mergeArticles(checked.slice(prs.length), prev.news),
          }));
        } catch { /* handled */ }
        finally { setAiChecking(false); }
      }
    } catch (err) {
      setMainCard(prev => ({
        ...prev, loading: false, loadingPR: false, loadingNews: false,
        error: err instanceof Error ? err.message : (fetchError ?? 'Could not save to database'),
      }));
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

  // Re-check whether current articles have been added to the database.
  // Only promotes articles (untracked→tracked), never demotes (tracked→untracked).
  // The DB is append-only, so a previously-tracked article should stay tracked.
  // This prevents AI non-determinism from flipping green dots to red on re-check.
  // Step 1: Reseed PostgreSQL from .ts source files so newly added entries are queryable.
  // Step 2: Bust the check-analyzed in-memory cache, then re-run matching.
  const recheckMainCard = useCallback(async () => {
    setAiChecking(true);
    try {
      // Reseed PostgreSQL from .ts data files before re-checking.
      // This ensures entries added via git commits (not workflow/apply) are reflected.
      try {
        await authFetch('/api/db/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      } catch (e) {
        console.warn('[recheckMainCard] db/setup reseed failed, continuing with existing data:', e);
      }
      const all = [...mainCard.pressReleases, ...mainCard.news];
      if (all.length === 0) return;
      const checked = await checkAnalyzed(all, { bustCache: true });
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
    } catch { /* handled */ }
    finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
  }, [compCards, checkAnalyzed]);

  const loadCompetitor = useCallback(async (name: string) => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [], loadingPR: false, loadingNews: false }), loading: true, loaded: false, error: null } }));
    try {
      const res = await fetch(`/api/competitor-feed/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const prs: ArticleItem[] = (data.pressReleases || []).slice(0, SECTION_MAX).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      const news: ArticleItem[] = (data.news || []).slice(0, SECTION_MAX).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      setCompCards(prev => ({ ...prev, [name]: { loading: false, loadingPR: false, loadingNews: false, loaded: true, error: null, activeTab: prev[name]?.activeTab || 'pr', pressReleases: prs, news } }));

      // Save all competitor articles to DB
      const all = [...prs, ...news];
      const compNewKeys = new Set<string>();
      for (const a of all) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) compNewKeys.add(key);
      }
      if (compNewKeys.size > 0) {
        setNewArticleKeys(prev => {
          const next = new Set(prev);
          for (const k of compNewKeys) next.add(k);
          return next;
        });
      }
      const allToSave = all.map(a => ({
        cacheKey: articleCacheKey(a),
        headline: a.headline,
        date: a.date,
        url: a.url,
        source: a.source,
        articleType: prs.includes(a) ? 'pr' : 'news',
      }));
      if (allToSave.length > 0) {
        await saveArticlesToDb(allToSave, compNewKeys);
      }

      // Check analyzed status
      compRecheckDone.current.add(name);
      if (all.length > 0) {
        setCompAiChecking(prev => ({ ...prev, [name]: true }));
        try {
          const checked = await checkAnalyzed(all);
          const checkedPrs = checked.slice(0, prs.length);
          const checkedNews = checked.slice(prs.length);
          setCompCards(prev => ({ ...prev, [name]: { ...prev[name], pressReleases: checkedPrs, news: checkedNews } }));
        } catch { /* handled */ }
        finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
      }
    } catch {
      setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [], loadingPR: false, loadingNews: false }), loading: false, loaded: false, error: 'Could not fetch feeds' } }));
    }
  }, [checkAnalyzed, saveArticlesToDb]);

  const loadAll = useCallback(async () => {
    setLoadingAll(true);
    const promises: Promise<unknown>[] = [loadMainCard()];
    if (competitors?.length) { for (const c of competitors) promises.push(loadCompetitor(c.name)); }
    await Promise.allSettled(promises);
    setLoadingAll(false);
  }, [loadMainCard, competitors, loadCompetitor]);

  // DB-first init: load articles from database on mount (no external API calls)
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch(`/api/seen-articles?ticker=${encodeURIComponent(ticker)}&_=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          console.error('[db-init] GET failed:', res.status, errBody);
          throw new Error(`HTTP ${res.status}: ${errBody.error || errBody.detail || 'unknown'}`);
        }
        const data = await res.json();
        const articles: { cacheKey: string; headline: string; date: string | null; url: string | null; source: string | null; articleType: string | null; dismissed: boolean; hidden: boolean }[] = data.articles || [];

        if (articles.length === 0 && !cancelled) {
          console.warn('[db-init] GET /api/seen-articles returned 0 articles. Response:', data._debug ?? data.error ?? data);
        }

        if (cancelled) return;

        const prs: ArticleItem[] = [];
        const news: ArticleItem[] = [];
        const newKeys = new Set<string>();
        const records = new Map<string, DbRecord>();

        for (const art of articles) {
          const item: ArticleItem = {
            headline: art.headline,
            date: art.date || '',
            url: art.url || '',
            source: art.source || undefined,
            analyzed: null,
          };
          const isPr = (art.articleType ?? '').toLowerCase() === 'pr';
          if (isPr) prs.push(item);
          else news.push(item);

          // Index by the key that articleCacheKey() will produce for this item —
          // this is what the rendering code uses for dbRecords lookups.
          // If the DB-stored cacheKey differs (legacy rows, URL changes), also
          // keep an entry under the DB key so toggleHide can find it.
          const computedKey = articleCacheKey(item);
          records.set(computedKey, art);
          if (art.cacheKey !== computedKey) {
            records.set(art.cacheKey, art);
          }
          newKeys.add(computedKey);
        }

        // Propagate hidden state across headline duplicates: if ANY cache key
        // for a headline is hidden, ALL variants should be treated as hidden.
        // This prevents a fresh-fetch duplicate (different URL/cache key) from
        // "unhiding" an article the user explicitly hid.
        const hiddenHeadlines = new Set<string>();
        for (const [, rec] of records) {
          if (rec.hidden) hiddenHeadlines.add(normalizeHeadline(rec.headline));
        }
        if (hiddenHeadlines.size > 0) {
          for (const [key, rec] of records) {
            if (!rec.hidden && hiddenHeadlines.has(normalizeHeadline(rec.headline))) {
              records.set(key, { ...rec, hidden: true });
            }
          }
        }

        // ── DB-first PR hydration ───────────────────────────────────────
        // Always merge press_releases DB into seen_articles so PRs survive
        // page reloads without requiring the user to click "Fetch PRs".
        if (!cancelled) {
          try {
            const piPrs = await fetchPRsFromPressIntelligence(ticker, SECTION_MAX);
            if (piPrs.length > 0) {
              const existingPrKeys = new Set(prs.map(articleCacheKey));
              const newFromPI: ArticleItem[] = [];
              for (const pr of piPrs) {
                const key = articleCacheKey(pr);
                if (!existingPrKeys.has(key)) {
                  newFromPI.push(pr);
                  prs.push(pr);
                  const rec: DbRecord = { cacheKey: key, headline: pr.headline, date: pr.date || null, url: pr.url || null, source: pr.source || null, articleType: 'pr', dismissed: false, hidden: false };
                  records.set(key, rec);
                  newKeys.add(key);
                }
              }
              // Persist any new PRs to seen_articles so they survive future reloads
              if (newFromPI.length > 0) {
                const toSave = newFromPI.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'pr' }));
                fetch('/api/seen-articles', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ticker, articles: toSave }),
                }).then(r => r.json()).then(body => {
                  console.log(`[db-init] auto-saved ${newFromPI.length} PRs from press-intelligence to seen_articles:`, body);
                  if (body.filtered === 0 && toSave.length > 0) {
                    console.warn('[db-init] WARNING: all PRs were filtered out during save — check cacheKey/headline values', toSave.slice(0, 2));
                  }
                }).catch(err => console.error('[db-init] auto-save PRs failed:', err));
              }
              console.log(`[db-init] press-intelligence hydration: ${piPrs.length} total, ${newFromPI.length} new (not in seen_articles)`);
            }
          } catch (err) {
            console.warn('[db-init] press-intelligence hydration failed (non-fatal):', err);
          }
        }

        dbRecordsRef.current = records;

        // Deduplicate by normalized headline (DB may accumulate entries with different cache keys for the same article)
        const dedupedPrs = deduplicateByHeadline(prs);
        const prHeadlines = new Set(dedupedPrs.map(a => normalizeHeadline(a.headline)));
        const dedupedNews = deduplicateByHeadline(news).filter(a => !prHeadlines.has(normalizeHeadline(a.headline)));
        const prHiddenCount = dedupedPrs.filter(a => records.get(articleCacheKey(a))?.hidden).length;
        console.log(`[db-init] loaded ${articles.length} articles from DB (${dedupedPrs.length} PR, ${dedupedNews.length} news after dedup, ${newKeys.size} NEW); PRs with hidden=true: ${prHiddenCount}`);

        // Run check-analyzed on DB articles, then show everything in one render
        const all = [...dedupedPrs, ...dedupedNews];
        let finalPrs = dedupedPrs;
        let finalNews = dedupedNews;
        if (all.length > 0) {
          initialRecheckDone.current = true;
          try {
            const checked = await checkAnalyzed(all);
            finalPrs = checked.slice(0, dedupedPrs.length);
            finalNews = checked.slice(dedupedPrs.length);
          } catch { /* show articles with analyzed: null as fallback */ }
        }
        // Apply all state in one synchronous flush so we never render with mainCard filled but dbRecords stale (avoids list disappearing after refresh)
        if (!cancelled) {
          flushSync(() => {
            setDbRecords(new Map(records));
            setNewArticleKeys(newKeys);
            setMainCard(prev => ({
              ...prev,
              loading: false,
              loadingPR: false,
              loadingNews: false,
              loaded: true,
              error: null,
              activeTab: 'pr',
              pressReleases: mergeArticles(finalPrs, prev.pressReleases),
              news: mergeArticles(finalNews, prev.news),
            }));
          });
          console.log(`[db-init] set state: ${finalPrs.length} PRs, ${finalNews.length} news`);
        }
      } catch (err) {
        console.error('[db-init] error:', err);
        if (!cancelled) {
          setMainCard(prev => ({
            ...prev,
            loading: false,
            loadingPR: false,
            loadingNews: false,
            loaded: true,
            error: null,
            activeTab: 'pr',
          }));
        }
      }
    }

    init();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  // Auto re-check database status after DB-loaded articles
  useEffect(() => {
    if (mainCard.loaded && !initialRecheckDone.current && (mainCard.pressReleases.length > 0 || mainCard.news.length > 0)) {
      initialRecheckDone.current = true;
      recheckMainCard();
    }
  }, [mainCard.loaded, mainCard.pressReleases.length, mainCard.news.length, recheckMainCard]);

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

  // Dismiss a single NEW article: mark as dismissed (keep in newArticleKeys so SEEN badge shows)
  const dismissNewArticle = useCallback((cacheKey: string) => {
    // Update local DB record (immutable — create new object)
    const rec = dbRecordsRef.current.get(cacheKey);
    if (rec) {
      dbRecordsRef.current.set(cacheKey, { ...rec, dismissed: true });
      setDbRecords(new Map(dbRecordsRef.current));
    }
    // Persist dismiss to DB (include all fields so record is complete even on first save)
    const prArticle = mainCard.pressReleases.find(a => articleCacheKey(a) === cacheKey);
    const newsArticle = !prArticle ? mainCard.news.find(a => articleCacheKey(a) === cacheKey) : null;
    const article = prArticle || newsArticle;
    if (article) {
      fetch('/api/seen-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          articles: [{ cacheKey, headline: article.headline, date: article.date, url: article.url, source: article.source, articleType: prArticle ? 'pr' : 'news' }],
          dismiss: true,
        }),
      }).catch(err => console.error('[dismiss] error:', err));
    }
  }, [ticker, mainCard.pressReleases, mainCard.news]);

  // Toggle hide/unhide for an article: propagate across ALL cache key
  // variants sharing the same normalized headline, then persist to DB.
  const toggleHideArticle = useCallback((cacheKey: string) => {
    const rec = dbRecordsRef.current.get(cacheKey);
    const newHidden = !(rec?.hidden ?? false);

    // Find the article to get its headline
    const prArticle = mainCard.pressReleases.find(a => articleCacheKey(a) === cacheKey);
    const newsArticle = !prArticle ? mainCard.news.find(a => articleCacheKey(a) === cacheKey) : null;
    const article = prArticle || newsArticle;
    const headline = rec?.headline || article?.headline || '';
    const nh = normalizeHeadline(headline);

    // Propagate to ALL cache keys with the same normalized headline
    const affectedKeys: { cacheKey: string; headline: string; date: string; url: string; source?: string; articleType: string }[] = [];
    const seenDbKeys = new Set<string>();
    for (const [k, r] of dbRecordsRef.current) {
      if (normalizeHeadline(r.headline) === nh) {
        dbRecordsRef.current.set(k, { ...r, hidden: newHidden });
        // Use the record's stored cacheKey (DB key) for API interactions,
        // deduplicating in case the Map has entries under both DB and computed keys.
        if (!seenDbKeys.has(r.cacheKey)) {
          seenDbKeys.add(r.cacheKey);
          affectedKeys.push({ cacheKey: r.cacheKey, headline: r.headline, date: r.date || '', url: r.url || '', source: r.source || undefined, articleType: r.articleType || 'pr' });
        }
      }
    }
    // Also cover the clicked key if it wasn't in records yet
    if (!dbRecordsRef.current.has(cacheKey) && article) {
      dbRecordsRef.current.set(cacheKey, { cacheKey, headline: article.headline, date: article.date || null, url: article.url || null, source: article.source || null, articleType: prArticle ? 'pr' : 'news', dismissed: false, hidden: newHidden });
      affectedKeys.push({ cacheKey, headline: article.headline, date: article.date || '', url: article.url || '', source: article.source, articleType: prArticle ? 'pr' : 'news' });
    }
    setDbRecords(new Map(dbRecordsRef.current));

    // Persist all affected keys to DB
    if (affectedKeys.length > 0) {
      fetch('/api/seen-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles: affectedKeys, hide: newHidden }),
      }).catch(err => console.error('[hide] error:', err));
    }
  }, [ticker, mainCard.pressReleases, mainCard.news]);

  const setCompTab = (name: string, tab: 'pr' | 'news') => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { loading: false, loadingPR: false, loadingNews: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab } }));
  };

  const totalCompanies = 1 + (competitors?.length || 0);
  const loadedCount = (mainCard.loaded ? 1 : 0) + (competitors?.filter(c => compCards[c.name]?.loaded).length || 0);

  return (
    <div className="sm-tab-stack">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Intelligence</div>
        <h2>Sources<span className="sm-accent">.</span></h2>
        <p>Live press releases, news coverage, and competitor intelligence for {companyName}.</p>
      </div>

      <div className="sm-ed-status-bar">
        <div className="sm-flex sm-gap-16">
          {/* Progress ring */}
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2" />
            <circle cx="14" cy="14" r="12" fill="none" stroke="var(--accent)" strokeWidth="2"
              strokeDasharray={`${(loadedCount / totalCompanies) * 75.4} 75.4`}
              strokeLinecap="round"
              transform="rotate(-90 14 14)"
            />
          </svg>
          <div className="sm-flex-col">
            <span className="sm-text sm-src-status-title">
              {loadedCount === 0 ? 'Intelligence Feeds' : `${loadedCount} of ${totalCompanies} loaded`}
            </span>
            <span className="sm-subtle-sm">
              {totalCompanies} {totalCompanies === 1 ? 'company' : 'companies'} monitored
            </span>
          </div>
        </div>
        <button
          onClick={loadAll}
          disabled={loadingAll}
          aria-label="AI Fetch all feeds"
          className="sm-ed-action-btn sm-p-5-14"
          data-variant="mint"
          data-state={loadingAll ? 'loading' : undefined}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loadingAll ? 'Fetching...' : 'AI Fetch All'}
        </button>
      </div>

      {/* Legend — 3 tiers with descriptions */}
      {(mainCard.loaded || loadedCount > 0) && (
        <div
          role="note"
          aria-label="Analysis status legend"
          className="sm-ed-legend"
        >
          {([
            { label: 'Tracked', color: 'var(--mint)', opacity: 0.9, desc: 'Article matched in database — found in research notes or tracked data files' },
            { label: 'Untracked', color: 'var(--coral)', opacity: 0.9, desc: 'Article not found in database — potentially new information to review' },
            { label: 'Pending', color: 'var(--text3)', opacity: 0.4, desc: 'Status not yet checked — load feeds and run analysis to classify' },
          ] as const).map(s => (
            <span key={s.label} title={s.desc} className="sm-src-legend-item">
              <span className="sm-shrink-0 sm-src-legend-dot" style={{ background: s.color, opacity: s.opacity }} />
              <span className="sm-flex-col sm-gap-1">
                <span className="sm-fw-500">{s.label}</span>
                <span className="sm-src-legend-desc">{s.desc}</span>
              </span>
            </span>
          ))}
        </div>
      )}

      {/* AI / Local toggle */}
      {(mainCard.loaded || loadedCount > 0) && (
        <div className="sm-flex sm-src-toggle-row">
          <button
            onClick={() => setForceLocal(prev => !prev)}
            className="sm-border sm-bg-surface2 sm-pointer sm-src-toggle-btn"
            style={{ color: forceLocal ? 'var(--gold)' : 'var(--sky)' }}
          >
            <span className="sm-src-toggle-track" style={{
              background: forceLocal ? 'var(--gold-dim)' : 'var(--sky-dim)',
              border: `1px solid ${forceLocal ? 'var(--gold)' : 'var(--sky)'}`,
            }}>
              <span className="sm-src-toggle-knob" style={{
                background: forceLocal ? 'var(--gold)' : 'var(--sky)',
                left: forceLocal ? 13 : 1,
              }} />
            </span>
            {forceLocal ? 'Local only' : 'AI + Local'}
          </button>
          {matchMethod && (
            <span className="sm-src-match-badge" style={{
              background: matchMethod === 'local' ? 'var(--gold-dim)' : 'var(--sky-dim)',
              color: matchMethod === 'local' ? 'var(--gold)' : 'var(--sky)',
            }}>
              {matchMethod === 'ai' ? 'AI' : matchMethod === 'hybrid' ? 'hybrid' : 'local'}
            </span>
          )}
        </div>
      )}

      <div className="sm-flex-col sm-gap-8">
        <CompanyFeedCard
          label={`${companyName} (${ticker})`}
          data={mainCard}
          showAnalysis
          aiChecking={aiChecking}
          isPrimary
          fetchedAt={lastFetchedAt}
          ticker={ticker}
          newArticleKeys={newArticleKeys}
          dbRecords={dbRecords}
          persistedSourceAnalyses={persistedSourceAnalyses}
          onLoad={loadMainCard}
          onLoadPR={loadPRsOnly}
          onLoadNews={loadNewsOnly}
          onRecheck={recheckMainCard}
          onTabChange={(tab) => setMainCard(prev => ({ ...prev, activeTab: tab }))}
          onDismissNew={dismissNewArticle}
          onToggleHide={toggleHideArticle}
        />
      </div>

      {competitors && competitors.length > 0 && (
        <>
          <div className="sm-divider">
            <span className="sm-card-label">
              {competitorLabel || 'Competitors'}
            </span>
            <span className="sm-mono-sm sm-text3">
              {competitors.length}
            </span>
          </div>

          <div className="sm-flex-col sm-gap-8">
            {competitors.map(comp => {
              const data: CardData = compCards[comp.name] || {
                loading: false, loadingPR: false, loadingNews: false, loaded: false, error: null, activeTab: 'pr', pressReleases: [], news: [],
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
                  dbRecords={dbRecords}
                  persistedSourceAnalyses={persistedSourceAnalyses}
                  onLoad={() => loadCompetitor(comp.name)}
                  onRecheck={() => recheckCompetitor(comp.name)}
                  onTabChange={(tab) => setCompTab(comp.name, tab)}
                  onDismissNew={dismissNewArticle}
                  onToggleHide={toggleHideArticle}
                />
              );
            })}
          </div>
        </>
      )}

      <div className="sm-divider">
        <span className="sm-card-label">
          Research Sources
        </span>
      </div>

      <div className="sm-grid-sep" style={{ '--cols': 2 } as React.CSSProperties}>
        {researchSources.map(group => (
          <div key={group.category} className="sm-grid-cell">
            <div className="sm-micro-label sm-mb-16 sm-src-research-ls">
              {group.category}
            </div>
            <nav aria-label={`${group.category} links`} className="sm-flex-col sm-gap-2">
              {group.sources.map(s => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-body-sm sm-ed-filing-row sm-src-research-link"
                >
                  {s.name}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="sm-shrink-0 sm-opacity-30">
                    <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* ── Methodology ────────────────────────────────────────────────────── */}
      <div className="sm-ws-panel">
        <div
          onClick={() => setMethodologyOpen(prev => !prev)}
          className="sm-ws-panel-header sm-pointer"
          data-open={methodologyOpen ? 'true' : 'false'}
          role="button"
          tabIndex={0}
          aria-expanded={methodologyOpen}
          aria-label="Toggle Sources Methodology"
          onKeyDown={(e) => e.key === 'Enter' && setMethodologyOpen(prev => !prev)}
        >
          <span className="sm-section-label sm-section-label-no-mb">Methodology</span>
          <span className="sm-text3 sm-src-method-toggle">{methodologyOpen ? '\u2212' : '+'}</span>
        </div>
        {methodologyOpen && (
          <div className="sm-ws-panel-body sm-body-sm">
            {/* ── DB-FIRST ARCHITECTURE ────────────────────── */}
            <div className="sm-ed-method-label">DB-First Architecture</div>
            <div className="sm-flex-col sm-src-flow-center">
              <div className="sm-ed-flowbox">Page loads</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox-accent">GET /api/seen-articles?ticker=X</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">ensureTable() &mdash; auto-creates seen_articles if missing</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Load saved articles from Neon PostgreSQL</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-mint sm-src-pipeline-label">Render from DB &mdash; no upstream API calls on mount</div>
            </div>
            <div className="sm-flex-col sm-src-flow-center sm-mt-12">
              <div className="sm-ed-flowbox">After seen_articles loaded</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox-accent">GET /api/press-intelligence?ticker=X (mode=db)</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Merge PRs not already in seen_articles &rarr; auto-save new ones</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-mint sm-src-pipeline-label">PRs always survive page reloads (hydrated from press_releases)</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_articles table</div>
              <div><span className="sm-text">Self-healing:</span> ensureTable() creates table + indexes on first request</div>
              <div><span className="sm-text">Graceful fallback:</span> returns empty array if table cannot be created; press-intelligence hydration is non-fatal</div>
              <div><span className="sm-text">PR hydration:</span> on init, fetches press_releases (mode=db) and auto-persists new PRs to seen_articles &mdash; stock-agnostic, uses ticker prop</div>
              <div><span className="sm-text">Merge on init:</span> DB load merges with existing state so Fetch PRs result is not overwritten</div>
              <div><span className="sm-text">Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites url, source, headline, date, articleType; save-from-fetch also sets hidden=false so fetched articles show in the main list</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── TWO DATA PIPELINES ──────────────────────── */}
            <div className="sm-ed-method-label">Data Pipelines: Press Releases vs News</div>
            <div className="sm-flex-wrap sm-gap-24">
              <div className="sm-flex-col sm-src-pipe-col sm-src-flow-center">
                <div className="sm-ed-flowbox-accent">Fetch PRs</div>
                <div className="sm-src-vpipe sm-src-vpipe-sky" />
                <div className="sm-ed-flowbox sm-src-flowbox-sm">GET /api/press-intelligence?ticker=</div>
                <div className="sm-ed-vline sm-ed-vline-8" />
                <div className="sm-text3 sm-text-center sm-src-method-desc">IR pages (with fallback for JS-rendered pages, e.g. ASTS) + direct Business Wire (newsroom, cheerio). Returns up to 15; dedup by title.</div>
                <div className="sm-ed-vline sm-ed-vline-8" />
                <div className="sm-sky sm-src-pipeline-label">articleType: &quot;pr&quot;</div>
              </div>
              <div className="sm-flex-col sm-src-pipe-col sm-src-flow-center">
                <div className="sm-ed-flowbox-accent sm-ed-flowbox-accent-mint">Fetch News</div>
                <div className="sm-src-vpipe sm-src-vpipe-mint" />
                <div className="sm-ed-flowbox sm-src-flowbox-sm">GET /api/news/[ticker]</div>
                <div className="sm-ed-vline sm-ed-vline-8" />
                <div className="sm-text3 sm-text-center sm-src-method-desc">Press Intelligence (multi-source aggregator)<br />QuoteMedia, GlobeNewsWire, Stock Titan, IR pages</div>
                <div className="sm-ed-vline sm-ed-vline-8" />
                <div className="sm-mint sm-src-pipeline-label">articleType: &quot;news&quot;</div>
              </div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Independent:</span> each button fetches, saves, and checks independently</div>
              <div><span className="sm-text">Display cap:</span> 10 articles per type (SECTION_MAX); API may return up to 15</div>
              <div><span className="sm-text">Save path:</span> POST /api/seen-articles &rarr; upsert with articleType; hidden=false so fetched articles stay visible</div>
              <div><span className="sm-text">AI Fetch All:</span> fires both pipelines in parallel via Promise.allSettled</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── ANALYSIS ROUTING FLOW ──────────────────────── */}
            <div className="sm-ed-method-label">Analysis Routing</div>
            <div className="sm-flex sm-gap-24">
              {/* Left column: vertical flow */}
              <div className="sm-flex-col sm-src-flow-center sm-src-min-w-180">
                {/* Node: Article */}
                <div className="sm-ed-flowbox">Article arrives</div>
                <div className="sm-ed-vline sm-ed-vline-12" />
                {/* Node: API Key? */}
                <div className="sm-ed-flowbox">API key?</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                <div className="sm-mono-sm sm-text3 sm-src-flow-yn">Yes</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                {/* Node: AI Disabled? */}
                <div className="sm-ed-flowbox">AI disabled?</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                <div className="sm-mono-sm sm-text3 sm-src-flow-yn">No</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                {/* Node: Token limit? */}
                <div className="sm-ed-flowbox">Prompt &gt; limit?</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                <div className="sm-mono-sm sm-text3 sm-src-flow-yn">No</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                {/* Node: Claude AI */}
                <div className="sm-ed-flowbox-accent">Claude AI</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                <div className="sm-mono-sm sm-text3 sm-src-flow-yn">OK</div>
                <div className="sm-ed-vline sm-ed-vline-6" />
                {/* Result */}
                <div className="sm-sky sm-src-pipeline-label">AI Result</div>
              </div>
              {/* Right column: fallback labels */}
              <div className="sm-flex-col sm-src-routing-right">
                <div className="sm-flex sm-text3 sm-src-routing-label sm-src-routing-label-height">
                  <span className="sm-coral sm-src-routing-arrow">&larr;</span> No
                </div>
                <div className="sm-src-spacer-22" />
                <div className="sm-flex sm-text3 sm-src-routing-label sm-src-routing-label-height">
                  <span className="sm-coral sm-src-routing-arrow">&larr;</span> Yes
                </div>
                <div className="sm-src-spacer-22" />
                <div className="sm-flex sm-text3 sm-src-routing-label sm-src-routing-label-height">
                  <span className="sm-coral sm-src-routing-arrow">&larr;</span> Yes
                </div>
                <div className="sm-src-spacer-22" />
                <div className="sm-flex sm-text3 sm-src-routing-label sm-src-routing-label-height">
                  <span className="sm-coral sm-src-routing-arrow">&larr;</span> Fail
                </div>
                <div className="sm-ed-flowbox-accent sm-ed-flowbox-accent-gold sm-mt-4">Local Matching</div>
              </div>
            </div>

            {/* Divider */}
            <div className="sm-ed-hdivider" />

            {/* ── DATA EXTRACTION ─────────────────────────── */}
            <div className="sm-ed-method-label">Data Extraction</div>
            <div className="sm-text2 sm-src-data-extract">
              <div>Queries Neon PostgreSQL via Drizzle ORM — 4 tables in parallel.</div>
              <div className="sm-mt-4">
                <span className="sm-text3">Tables:</span> timeline_events, sec_filings, catalysts, partner_news
              </div>
              <div>
                <span className="sm-text3">Headline fields:</span> event, description, headline
              </div>
              <div>
                <span className="sm-text3">Detail fields:</span> details, period, category, summary
              </div>
              <div>
                <span className="sm-text3">Dedup:</span> normalized headline (first 120 chars)
              </div>
              <div>
                <span className="sm-text3">Reseed triggers:</span> workflow/apply &rarr; auto after patches; RE-CHECK DB &rarr; reseeds before matching; both keep Postgres in sync with .ts files
              </div>
              <div>
                <span className="sm-text3">Cache bust:</span> RE-CHECK DB clears 5-min in-memory analysis cache so reseeded data is immediately queryable
              </div>
            </div>

            {/* Divider */}
            <div className="sm-ed-hdivider" />

            {/* ── LOCAL MATCHING FLOW ──────────────────────── */}
            <div className="sm-ed-method-label">Local Matching</div>
            <div className="sm-flex-col sm-src-flow-center">
              {/* Node: Extract */}
              <div className="sm-ed-flowbox">Extract keywords (stop words removed, stemmed, &gt;2 chars)</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              {/* Stemming note */}
              <div className="sm-text3 sm-text-center sm-src-stemmer-note">Normalize: Q1-Q4 &rarr; quarter, FY &rarr; fiscal year</div>
              <div className="sm-text3 sm-text-center sm-src-stemmer-note">Stemmer: -s, -ed, -ing, -tion, -ment, -ies, -ly, -er, -or</div>
              <div className="sm-text3 sm-text-center sm-src-stemmer-note">Overlap: max(article→DB, DB→article) — bidirectional</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              {/* Dollar-amount guard */}
              <div className="sm-text sm-bg-surface2 sm-text-center sm-rounded-8 sm-src-guard-box">
                <div className="sm-gold sm-src-guard-title">Dollar-amount guard</div>
                <div className="sm-micro-text sm-src-guard-note">Article has $ figure? &rarr; DB entry must also have $</div>
                <div className="sm-micro-text sm-src-guard-note-cont">Both have $? &rarr; numbers must overlap ($30M &ne; $50M)</div>
                <div className="sm-micro-text sm-src-guard-note-cont">Recurring series (same template, different values)? &rarr; only match when key figures match and date within 3 days</div>
                <div className="sm-text3 sm-src-guard-footer">Prevents matching different awards/contracts or different weekly/quarterly updates</div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              {/* Tier 1 row */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 1: Headline only</div>
                  <div className="sm-micro-text sm-micro-text-sub sm-mt-2">&le;30 days: &ge;40%, &ge;3 kw</div>
                  <div className="sm-micro-text sm-micro-text-sub">&gt;30 days: &ge;60%, &ge;3 kw</div>
                  <div className="sm-micro-text sm-micro-text-sub">short: &ge;60%, &ge;2 kw, &le;30d</div>
                </div>
                <div className="sm-flex sm-text3 sm-src-tier-match">
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-mint" /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              <div className="sm-mono-sm sm-text3 sm-src-flow-yn">No match</div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              {/* Tier 2 row */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 2: Headline + detail</div>
                  <div className="sm-micro-text sm-micro-text-sub sm-mt-2">&le;30 days: &ge;50%, &ge;3 kw</div>
                  <div className="sm-micro-text sm-micro-text-sub">&gt;30 days: &ge;70%, &ge;3 kw</div>
                </div>
                <div className="sm-flex sm-text3 sm-src-tier-match">
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-mint" /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              <div className="sm-mono-sm sm-text3 sm-src-flow-yn">No match</div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              {/* Result: UNTRACKED */}
              <div className="sm-inline-flex sm-gap-4">
                <span className="sm-src-dot-6 sm-src-dot-6-coral" />
                <span className="sm-coral sm-src-tracked-label">UNTRACKED</span>
              </div>
              {/* Guard notes */}
              <div className="sm-text3 sm-mt-8 sm-text-center sm-src-guard-notes">Dates: ISO (YYYY-MM-DD) and common formats parsed first so same-day/same-week comparison is correct.<br />Date proximity: Tier 1/2 require higher overlap when dates are &gt;30 days apart.<br />Dollar-amount: $30M &ne; $50M; recurring series (e.g. weekly holdings) only match when key figures and date (within 3 days) align.</div>
            </div>

            {/* Divider */}
            <div className="sm-ed-hdivider" />

            {/* ── NEW ARTICLE DETECTION ──────────────────────── */}
            <div className="sm-ed-method-label">New Article Detection</div>
            <div className="sm-flex-col sm-src-flow-center">
              <div className="sm-flex sm-gap-16">
                <div className="sm-sky sm-text-center sm-rounded-8 sm-src-detect-badge sm-src-detect-badge-sky">Fetch PRs</div>
                <div className="sm-text3 sm-src-detect-or">or</div>
                <div className="sm-ed-flowbox-accent sm-ed-flowbox-accent-mint sm-src-fetch-news-badge">Fetch News</div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Compare cacheKey against DB records</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Already in DB?</div>
              <div className="sm-flex sm-mt-8 sm-src-gap-32">
                <div className="sm-flex-col sm-src-flow-center">
                  <div className="sm-mono-sm sm-text3 sm-src-flow-yn">Yes</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-text3 sm-src-upsert-label">Upsert (update metadata)</div>
                </div>
                <div className="sm-flex-col sm-src-flow-center">
                  <div className="sm-mono-sm sm-text3 sm-src-flow-yn">No</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-ed-flowbox">Save to DB (dismissed=false)</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-sky sm-src-pipeline-label">NEW badge</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-mono-sm sm-text3 sm-src-flow-yn">User clicks NEW</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-sky sm-src-pipeline-label sm-opacity-30">SEEN badge</div>
                </div>
              </div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">On mount:</span> loads seen_articles from DB, then hydrates PRs from press_releases (mode=db) &mdash; new PRs auto-saved to seen_articles</div>
              <div><span className="sm-text">Fetch PRs / Fetch News:</span> independent buttons, each searches its own API; saved articles marked visible (hidden=false) so they show in the main list</div>
              <div><span className="sm-text">AI Fetch All:</span> fires both pipelines in parallel</div>
              <div><span className="sm-text">NEW badge:</span> bright clickable badge &mdash; article not yet acknowledged</div>
              <div><span className="sm-text">SEEN badge:</span> dimmed label after user clicks NEW &rarr; sets dismissed=true in DB</div>
              <div><span className="sm-text">Persistence:</span> both NEW and SEEN survive page reloads &amp; work cross-device</div>
            </div>

            {/* Divider */}
            <div className="sm-ed-hdivider" />

            {/* ── HOW TO TEST PERSISTENCE ─────────────────────── */}
            <div className="sm-ed-method-label">How to test: do PRs survive refresh?</div>
            <div className="sm-ed-method-text">
              <div>1. Open DevTools → Console. Click <strong>Fetch PRs</strong> and wait for the list to appear.</div>
              <div>2. In Console, confirm no error. Refresh the page (F5).</div>
              <div>3. If the list is empty: in Console look for <code>[db-init] GET /api/seen-articles returned 0 articles</code>. The logged response shows whether the API returned data or an error.</div>
              <div>4. Or open a new tab and go to <code>/api/seen-articles?ticker=ASTS&debug=1</code> (same origin). Check <code>_debug.rowCount</code> and <code>articles.length</code> — if both are 0 after a successful Fetch PRs, the write is not persisting (check DATABASE_URL and server logs).</div>
            </div>

            <div className="sm-ed-method-label">How to check UI logic when the list disappears after refresh</div>
            <div className="sm-ed-method-text">
              <div>1. After refresh, in Console look for <code>[db-init] loaded N articles ... (X PR, Y news ...); PRs with hidden=true: Z</code>. If X &gt; 0 but Z = X, all PRs are marked hidden in the DB — they will show under “+ N hidden” (expand to see).</div>
              <div>2. Look for <code>[db-init] set state: X PRs, Y news</code>. If X &gt; 0, PRs are in state; if the list is still empty, the next log explains why.</div>
              <div>3. If you see <code>[SourceArticleSection] "Press Releases": N items loaded but 0 visible (all hidden in dbRecords)</code>, then <code>dbRecords</code> has <code>hidden: true</code> for those items (key mismatch or DB state). Check the sample key and <code>dbRecords.size</code> in that log.</div>
              <div>4. If you see “All N items are in the hidden list” in the UI, those items are loaded but hidden; expand the hidden section or unhide to see them.</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── BUTTON DISTINCTION ────────────────────────── */}
            <div className="sm-ed-method-label">Button Distinction: RE-CHECK DB vs DB</div>
            <div className="sm-flex-wrap sm-gap-20">
              <div className="sm-ed-info-card-xl">
                <div className="sm-src-btn-label sm-src-btn-label-blue">RE-CHECK DB</div>
                <div className="sm-mono-sm sm-text3 sm-src-method-bottom">
                  <div><span className="sm-text">Purpose:</span> reseeds Postgres from .ts files, then checks tracked / untracked</div>
                  <div><span className="sm-text">API:</span> POST /api/db/setup &rarr; POST /api/check-analyzed (bustCache)</div>
                  <div><span className="sm-text">Checks:</span> timeline_events, sec_filings, catalysts, partner_news</div>
                  <div><span className="sm-text">Does NOT:</span> query seen_articles table</div>
                </div>
              </div>
              <div className="sm-ed-info-card-xl">
                <div className="sm-mint sm-src-btn-label">DB (per article)</div>
                <div className="sm-mono-sm sm-text3 sm-src-method-bottom">
                  <div><span className="sm-text">Purpose:</span> is this article saved in the database?</div>
                  <div><span className="sm-text">API:</span> GET /api/seen-articles?cacheKey=X</div>
                  <div><span className="sm-text">Shows:</span> status, category, heading, source, date, seen</div>
                  <div><span className="sm-text">Trigger:</span> hover &rarr; fetches live from Neon PostgreSQL</div>
                </div>
              </div>
            </div>
            <div className="sm-text3 sm-mt-10 sm-src-method-bottom">
              <div className="sm-flex sm-gap-16">
                <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-mint" /> In DB (all fields)</span>
                <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-gold" /> In DB (partial data)</span>
                <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-text3 sm-opacity-40" /> Not in DB</span>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── Legend & config ──────────────────────────── */}
            <div className="sm-flex-wrap sm-src-config-section">
              <div>
                <span className="sm-micro-text sm-src-config-label">Analysis Status</span>
                <div className="sm-flex sm-gap-16 sm-mt-4">
                  <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-mint" /> Tracked</span>
                  <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-coral" /> Untracked</span>
                  <span className="sm-inline-flex sm-gap-4"><span className="sm-src-dot-6 sm-src-dot-6-text3" /> Pending</span>
                </div>
              </div>
              <div>
                <span className="sm-micro-text sm-src-config-label">Controls</span>
                <div className="sm-mt-4">
                  <span className="sm-src-config-code">UI toggle</span>
                  <span className="sm-text3 sm-src-config-sep">|</span>
                  <code className="sm-bg-surface2 sm-rounded-4 sm-src-config-code">DISABLE_AI_MATCHING=true</code>
                  <span className="sm-text3 sm-src-config-sep">|</span>
                  <code className="sm-bg-surface2 sm-rounded-4 sm-src-config-code">MAX_PROMPT_TOKENS=40000</code>
                </div>
              </div>
            </div>
            {matchMethod && (
              <div className="sm-flex sm-mt-12 sm-gap-8">
                <span className="sm-micro-text sm-src-config-label">Active</span>
                <span className="sm-src-match-badge" style={{ background: matchMethod === 'local' ? 'var(--gold-dim)' : 'var(--sky-dim)', color: matchMethod === 'local' ? 'var(--gold)' : 'var(--sky)' }}>{matchMethod === 'ai' ? 'AI semantic matching' : matchMethod === 'hybrid' ? 'hybrid (local + AI)' : 'local keyword matching'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedSourcesTab;
