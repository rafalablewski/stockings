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
  loadingPR: boolean;
  loadingNews: boolean;
  loaded: boolean;
  error: string | null;
  activeTab: 'pr' | 'news';
  pressReleases: ArticleItem[];
  news: ArticleItem[];
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

/** Generate a stable cache key for an article */
function articleCacheKey(article: ArticleItem): string {
  return (article.url || article.headline || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 60);
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
}

// ── Article row ─────────────────────────────────────────────────────────────
const SourceArticleRow: React.FC<{
  article: ArticleItem;
  type: 'pr' | 'news';
  showAnalysis?: boolean;
  ticker: string;
  isGenuinelyNew?: boolean;
  dbRecord?: DbRecord | null;
  persistedAnalysis?: string | null;
  onDismissNew?: () => void;
}> = ({ article, type, showAnalysis, ticker, isGenuinelyNew, dbRecord, persistedAnalysis, onDismissNew }) => {
  const cacheKey = articleCacheKey(article);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(persistedAnalysis || null);

  useEffect(() => {
    if (!aiAnalysis && persistedAnalysis) setAiAnalysis(persistedAnalysis);
  }, [persistedAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps
  const [analyzing, setAnalyzing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [recheckLoading, setRecheckLoading] = useState(false);
  const [localAnalyzed, setLocalAnalyzed] = useState<boolean | null>(article.analyzed ?? null);

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
        body: JSON.stringify({ ticker, articles: [{ headline: article.headline, date: article.date }] }),
      });
      if (res.ok) {
        const data = await res.json();
        setLocalAnalyzed(data.results?.[0]?.analyzed ?? null);
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

  // DB status: green = all fields saved, yellow = partial, gray = not in DB
  const dbColor = !dbRecord ? 'var(--text3)' : (dbRecord.date != null && dbRecord.url != null && dbRecord.source != null && dbRecord.articleType != null) ? 'var(--mint)' : 'var(--gold)';
  const dbOpacity = !dbRecord ? 0.25 : 0.8;
  const dbTitle = !dbRecord
    ? 'Not saved to DB'
    : `DB: ${dbRecord.articleType || '?'} | ${dbRecord.date || 'no date'} | ${dbRecord.source || 'no source'} | ${dbRecord.headline?.slice(0, 40)}${(dbRecord.headline?.length || 0) > 40 ? '...' : ''} | ${dbRecord.url ? 'has URL' : 'no URL'}`;

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
      if (!failed) {
        fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'sources', key: cacheKey, text }) }).catch(() => {});
      }
    } catch (err) {
      setAiAnalysis(`Error: ${(err as Error).message}`);
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
        {/* DB save status indicator */}
        <span
          title={dbTitle}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0,
            fontSize: 8, fontFamily: 'Space Mono, monospace', color: dbColor, opacity: dbOpacity,
            padding: '1px 4px', borderRadius: 3,
            border: `1px solid color-mix(in srgb, ${dbColor} 20%, transparent)`,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: dbColor }} />
          DB
        </span>
        {/* NEW badge — clickable: dismisses the article as "seen" */}
        {isGenuinelyNew && (
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

// ── Separate PR / News article lists (max 10 each) ─────────────────────────
const SECTION_MAX = 10;

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
}> = ({ articles, type, label, showAnalysis, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onDismissNew }) => {
  const sorted = [...articles].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const displayed = sorted.slice(0, SECTION_MAX);

  if (displayed.length === 0) return null;

  return (
    <div>
      <div style={{
        fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px',
        color: 'var(--text3)', padding: '8px 12px 4px', opacity: 0.7,
      }}>
        {label} ({displayed.length})
      </div>
      {displayed.map((a, i) => {
        const key = articleCacheKey(a);
        return (
          <SourceArticleRow key={`${type}-${i}`} article={a} type={type} showAnalysis={showAnalysis} ticker={ticker} isGenuinelyNew={newArticleKeys.has(key)} dbRecord={dbRecords.get(key) || null} persistedAnalysis={persistedSourceAnalyses[key] || null} onDismissNew={() => onDismissNew?.(key)} />
        );
      })}
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
}> = ({ pressReleases, news, showAnalysis, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onDismissNew }) => {
  if (pressReleases.length === 0 && news.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text3)', padding: '16px 12px', lineHeight: 1.6 }}>
        No articles yet. Click AI Fetch to search for articles.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <SourceArticleSection articles={pressReleases} type="pr" label="Press Releases" showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} />
      {pressReleases.length > 0 && news.length > 0 && (
        <div style={{ height: 1, background: 'color-mix(in srgb, var(--border) 40%, transparent)', margin: '4px 12px' }} />
      )}
      <SourceArticleSection articles={news} type="news" label="News" showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} />
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
}> = ({ label, url, data, showAnalysis, aiChecking, isPrimary, fetchedAt, ticker, newArticleKeys, dbRecords, persistedSourceAnalyses, onLoad, onLoadPR, onLoadNews, onRecheck, onDismissNew }) => {
  const prCount = Math.min(data.pressReleases.length, SECTION_MAX);
  const newsCount = Math.min(data.news.length, SECTION_MAX);
  const isActive = data.loading || data.loadingPR || data.loadingNews || (aiChecking ?? false);
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
          {/* Fetch PRs */}
          {onLoadPR ? (
            <button
              onClick={onLoadPR}
              disabled={data.loadingPR || data.loading}
              aria-label={`Fetch ${label} press releases`}
              title="Fetch press releases"
              style={{
                fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '5px 10px', borderRadius: 4,
                color: data.loadingPR ? 'var(--text3)' : 'var(--sky)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.loadingPR ? 'var(--border)' : 'color-mix(in srgb, var(--sky) 25%, transparent)'}`,
                cursor: data.loadingPR ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                opacity: data.loadingPR ? 0.5 : 0.6,
                transition: 'all 0.15s', outline: 'none',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: data.loadingPR ? 'spin 1s linear infinite' : 'none' }}>
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
              style={{
                fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '5px 10px', borderRadius: 4,
                color: data.loadingNews ? 'var(--text3)' : 'var(--mint)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.loadingNews ? 'var(--border)' : 'color-mix(in srgb, var(--mint) 25%, transparent)'}`,
                cursor: data.loadingNews ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                opacity: data.loadingNews ? 0.5 : 0.6,
                transition: 'all 0.15s', outline: 'none',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: data.loadingNews ? 'spin 1s linear infinite' : 'none' }}>
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
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: data.loading ? 'spin 1s linear infinite' : 'none', transition: 'transform 0.2s' }}>
                <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {data.loading ? 'Fetching...' : 'AI Fetch'}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12 }}>Loading from database...</span>
          </div>
        )}

        {(data.loading || data.loadingPR || data.loadingNews) && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '24px 0', color: 'var(--text3)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12 }}>
              {data.loading ? 'Fetching press releases & news...' : data.loadingPR ? 'Fetching press releases...' : 'Fetching news...'}
            </span>
          </div>
        )}

        {data.loaded && (
          <SourceArticleList pressReleases={data.pressReleases} news={data.news} showAnalysis={showAnalysis} ticker={ticker} newArticleKeys={newArticleKeys} dbRecords={dbRecords} persistedSourceAnalyses={persistedSourceAnalyses} onDismissNew={onDismissNew} />
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

  // Helper: save articles to DB and update local state
  const saveArticlesToDb = useCallback(async (articles: { cacheKey: string; headline: string; date: string; url: string; source?: string; articleType: string }[], newKeys: Set<string>) => {
    if (articles.length === 0) return;
    console.log(`[ai-fetch] saving ${articles.length} articles to DB (${newKeys.size} NEW)...`);
    try {
      const saveRes = await fetch('/api/seen-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, articles }),
      });
      const saveBody = await saveRes.json().catch(() => ({}));
      if (saveRes.ok) {
        console.log('[ai-fetch] save OK:', saveBody);
        for (const a of articles) {
          const rec: DbRecord = { cacheKey: a.cacheKey, headline: a.headline, date: a.date || null, url: a.url || null, source: a.source || null, articleType: a.articleType || null, dismissed: !newKeys.has(a.cacheKey) };
          dbRecordsRef.current.set(a.cacheKey, rec);
        }
        setDbRecords(new Map(dbRecordsRef.current));
      } else {
        console.error('[ai-fetch] save FAILED:', saveRes.status, saveBody);
      }
    } catch (err) {
      console.error('[ai-fetch] save error:', err);
    }
  }, [ticker]);

  // Fetch Press Releases only
  const loadPRsOnly = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loadingPR: true, error: null }));
    try {
      const res = await fetch(`/api/press-releases/${ticker}`);
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      const prs: ArticleItem[] = (d.releases || []).slice(0, 10).map((r: { date: string; headline: string; url: string; source?: string; items?: string }) => ({
        headline: r.headline, date: r.date, url: r.url, source: r.source, items: r.items, analyzed: null as boolean | null,
      }));

      const newKeys = new Set<string>();
      for (const a of prs) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) newKeys.add(key);
      }

      setMainCard(prev => ({ ...prev, loadingPR: false, loaded: true, pressReleases: prs }));
      setLastFetchedAt(Date.now());
      if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

      const toSave = prs.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'pr' }));
      await saveArticlesToDb(toSave, newKeys);

      if (prs.length > 0) {
        setAiChecking(true);
        try {
          const checked = await checkAnalyzed(prs);
          setMainCard(prev => ({ ...prev, pressReleases: checked }));
        } catch { /* handled */ }
        finally { setAiChecking(false); }
      }
    } catch {
      setMainCard(prev => ({ ...prev, loadingPR: false, error: 'Could not fetch press releases' }));
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

  // Fetch News only
  const loadNewsOnly = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loadingNews: true, error: null }));
    try {
      const res = await fetch(`/api/news/${ticker}`);
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      const news: ArticleItem[] = (d.articles || []).slice(0, 10).map((a: { title: string; date: string; url: string; source: string }) => ({
        headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null,
      }));

      const newKeys = new Set<string>();
      for (const a of news) {
        const key = articleCacheKey(a);
        if (!dbRecordsRef.current.has(key)) newKeys.add(key);
      }

      setMainCard(prev => ({ ...prev, loadingNews: false, loaded: true, news }));
      setLastFetchedAt(Date.now());
      if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

      const toSave = news.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'news' }));
      await saveArticlesToDb(toSave, newKeys);

      if (news.length > 0) {
        setAiChecking(true);
        try {
          const checked = await checkAnalyzed(news);
          setMainCard(prev => ({ ...prev, news: checked }));
        } catch { /* handled */ }
        finally { setAiChecking(false); }
      }
    } catch {
      setMainCard(prev => ({ ...prev, loadingNews: false, error: 'Could not fetch news' }));
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

  // AI Fetch: fetch both PRs and news in parallel
  const loadMainCard = useCallback(async () => {
    setMainCard(prev => ({ ...prev, loading: true, loadingPR: true, loadingNews: true, error: null }));
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

    const newKeys = new Set<string>();
    for (const a of [...prs, ...news]) {
      const key = articleCacheKey(a);
      if (!dbRecordsRef.current.has(key)) newKeys.add(key);
    }

    setMainCard(prev => ({
      ...prev, loading: false, loadingPR: false, loadingNews: false, loaded: true, error,
      pressReleases: prs, news,
    }));
    setLastFetchedAt(Date.now());
    if (newKeys.size > 0) setNewArticleKeys(prev => { const next = new Set(prev); for (const k of newKeys) next.add(k); return next; });

    const allToSave = [
      ...prs.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'pr' })),
      ...news.map(a => ({ cacheKey: articleCacheKey(a), headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: 'news' })),
    ];
    await saveArticlesToDb(allToSave, newKeys);

    const allArticles = [...prs, ...news];
    if (allArticles.length > 0) {
      initialRecheckDone.current = true;
      setAiChecking(true);
      try {
        const checked = await checkAnalyzed(allArticles);
        setMainCard(prev => ({
          ...prev,
          pressReleases: checked.slice(0, prs.length),
          news: checked.slice(prs.length),
        }));
      } catch { /* handled */ }
      finally { setAiChecking(false); }
    }
  }, [ticker, checkAnalyzed, saveArticlesToDb]);

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
    } catch { /* handled */ }
    finally { setCompAiChecking(prev => ({ ...prev, [name]: false })); }
  }, [compCards, checkAnalyzed]);

  const loadCompetitor = useCallback(async (name: string) => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { activeTab: 'pr' as const, pressReleases: [], news: [], loadingPR: false, loadingNews: false }), loading: true, loaded: false, error: null } }));
    try {
      const res = await fetch(`/api/competitor-feed/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const prs: ArticleItem[] = (data.pressReleases || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
      const news: ArticleItem[] = (data.news || []).map((a: { title: string; date: string; url: string; source: string }) => ({ headline: a.title, date: a.date, url: a.url, source: a.source, analyzed: null as boolean | null }));
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
        try {
          await fetch('/api/seen-articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, articles: allToSave }),
          });
          for (const a of allToSave) {
            const rec: DbRecord = { cacheKey: a.cacheKey, headline: a.headline, date: a.date, url: a.url, source: a.source, articleType: a.articleType, dismissed: !compNewKeys.has(a.cacheKey) };
            dbRecordsRef.current.set(a.cacheKey, rec);
          }
          setDbRecords(new Map(dbRecordsRef.current));
        } catch { /* best-effort */ }
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
  }, [ticker, checkAnalyzed]);

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
        const res = await fetch(`/api/seen-articles?ticker=${ticker}`);
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          console.error('[db-init] GET failed:', res.status, errBody);
          throw new Error(`HTTP ${res.status}: ${errBody.error || errBody.detail || 'unknown'}`);
        }
        const data = await res.json();
        const articles: { cacheKey: string; headline: string; date: string | null; url: string | null; source: string | null; articleType: string | null; dismissed: boolean }[] = data.articles || [];

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
          if (art.articleType === 'pr') prs.push(item);
          else news.push(item);

          records.set(art.cacheKey, art);
          if (!art.dismissed) newKeys.add(art.cacheKey);
        }

        dbRecordsRef.current = records;
        setDbRecords(new Map(records));
        setNewArticleKeys(newKeys);
        setMainCard({ loading: false, loadingPR: false, loadingNews: false, loaded: true, error: null, activeTab: 'pr', pressReleases: prs, news });
        console.log(`[db-init] loaded ${articles.length} articles from DB (${prs.length} PR, ${news.length} news, ${newKeys.size} NEW)`);

        // Run check-analyzed on DB articles
        const all = [...prs, ...news];
        if (all.length > 0) {
          initialRecheckDone.current = true;
          setAiChecking(true);
          try {
            const checked = await checkAnalyzed(all);
            if (!cancelled) {
              setMainCard(prev => ({
                ...prev,
                pressReleases: checked.slice(0, prs.length),
                news: checked.slice(prs.length),
              }));
            }
          } catch { /* handled */ }
          finally { if (!cancelled) setAiChecking(false); }
        }
      } catch (err) {
        console.error('[db-init] error:', err);
        if (!cancelled) {
          setMainCard({ loading: false, loadingPR: false, loadingNews: false, loaded: true, error: null, activeTab: 'pr', pressReleases: [], news: [] });
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

  // Dismiss a single NEW article: remove from newArticleKeys + persist to DB
  const dismissNewArticle = useCallback((cacheKey: string) => {
    setNewArticleKeys(prev => {
      const next = new Set(prev);
      next.delete(cacheKey);
      return next;
    });
    // Update local DB record
    const rec = dbRecordsRef.current.get(cacheKey);
    if (rec) {
      rec.dismissed = true;
      setDbRecords(new Map(dbRecordsRef.current));
    }
    // Persist dismiss to DB
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
      }).catch(err => console.error('[dismiss] error:', err));
    }
  }, [ticker, mainCard.pressReleases, mainCard.news]);

  const setCompTab = (name: string, tab: 'pr' | 'news') => {
    setCompCards(prev => ({ ...prev, [name]: { ...(prev[name] || { loading: false, loadingPR: false, loadingNews: false, loaded: false, error: null, pressReleases: [], news: [] }), activeTab: tab } }));
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
          aria-label="AI Fetch all feeds"
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
          {loadingAll ? 'Fetching...' : 'AI Fetch All'}
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
          dbRecords={dbRecords}
          persistedSourceAnalyses={persistedSourceAnalyses}
          onLoad={loadMainCard}
          onLoadPR={loadPRsOnly}
          onLoadNews={loadNewsOnly}
          onRecheck={recheckMainCard}
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
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>User clicks AI Fetch</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Fetch articles from news/PR APIs</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Already in DB?</div>
              <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>Yes</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>Skip (already displayed)</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Save to DB (dismissed=false)</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', fontWeight: 600 }}>NEW badge</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text3)' }}>On mount:</span> loads articles from DB only &mdash; no external API calls</div>
              <div><span style={{ color: 'var(--text3)' }}>AI Fetch:</span> searches external APIs, saves new articles to DB with NEW badge</div>
              <div><span style={{ color: 'var(--text3)' }}>NEW badge:</span> stays until user clicks it &rarr; sets dismissed=true in DB</div>
              <div><span style={{ color: 'var(--text3)' }}>Cross-device:</span> NEW badge persists across all devices until dismissed</div>
              <div><span style={{ color: 'var(--text3)' }}>No staleness guard:</span> all newly fetched articles get NEW regardless of age</div>
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
