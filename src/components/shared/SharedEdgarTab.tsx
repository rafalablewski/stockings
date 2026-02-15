/**
 * SharedEdgarTab — SEC EDGAR Filing Monitor
 *
 * Fetches the latest filings from SEC EDGAR and compares them
 * against the local database to highlight which filings have been
 * tracked and which are new. Per-filing actions: open in new tab
 * or analyze with AI.
 *
 * @version 2.0.0
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';

export interface EdgarTabProps {
  ticker: string;
  companyName: string;
  localFilings: LocalFiling[];
  cik: string;
  typeColors: Record<string, { bg: string; text: string }>;
}

export interface LocalFiling {
  date: string;
  type: string;
  description: string;
  period: string;
  color?: string;
}

interface EdgarFiling {
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

interface MatchResult {
  filing: EdgarFiling;
  inDatabase: boolean;
  matchedLocal?: LocalFiling;
}

// ── Session cache (15-min TTL) ──────────────────────────────────────────────
const CACHE_TTL_MS = 15 * 60 * 1000;

interface CachedEdgar { filings: EdgarFiling[]; fetchedAt: number; }

function getCachedEdgar(ticker: string): CachedEdgar | null {
  try {
    const raw = sessionStorage.getItem(`edgar_${ticker}`);
    if (!raw) return null;
    const parsed: CachedEdgar = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) { sessionStorage.removeItem(`edgar_${ticker}`); return null; }
    return parsed;
  } catch { return null; }
}

function setCachedEdgar(ticker: string, filings: EdgarFiling[]) {
  try { sessionStorage.setItem(`edgar_${ticker}`, JSON.stringify({ filings, fetchedAt: Date.now() })); } catch { /* quota */ }
}

function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

// ── Date helpers ────────────────────────────────────────────────────────────
function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return dateStr;
}

function formatEdgarDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Filing matcher ──────────────────────────────────────────────────────────
function matchFilings(edgarFilings: EdgarFiling[], localFilings: LocalFiling[]): MatchResult[] {
  return edgarFilings.map(ef => {
    const edgarDate = normalizeDate(ef.filingDate);
    const edgarForm = ef.form.toUpperCase().trim();
    const match = localFilings.find(lf => {
      const localDate = normalizeDate(lf.date);
      const localForm = lf.type.toUpperCase().trim();
      const d1 = new Date(edgarDate);
      const d2 = new Date(localDate);
      const dayDiff = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff > 1) return false;
      const norm = (f: string) => f.replace(/[/\s-]/g, '');
      return norm(edgarForm) === norm(localForm);
    });
    return { filing: ef, inDatabase: !!match, matchedLocal: match };
  });
}

// ── Tiny action button ──────────────────────────────────────────────────────
const ActionBtn: React.FC<{
  label: string;
  title: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  loading?: boolean;
  variant?: 'default' | 'accent';
}> = ({ label, title, onClick, href, active, loading, variant = 'default' }) => {
  const style: React.CSSProperties = {
    padding: '3px 10px', fontSize: 10, fontWeight: 500, fontFamily: 'inherit',
    color: active ? 'var(--accent)' : variant === 'accent' ? 'var(--accent)' : 'var(--text3)',
    background: active ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
    border: '1px solid',
    borderColor: active ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : 'color-mix(in srgb, var(--border) 70%, transparent)',
    borderRadius: 6, cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.15s', outline: 'none', textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 4,
    opacity: loading ? 0.6 : 1,
  };
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" title={title} style={style}>{label}</a>;
  }
  return <button onClick={onClick} disabled={loading} title={title} style={style}>{loading ? 'Analyzing...' : label}</button>;
};

// ── Analysis panel ──────────────────────────────────────────────────────────
const AnalysisPanel: React.FC<{ text: string; onClose: () => void }> = ({ text, onClose }) => (
  <div style={{
    margin: '6px 0 2px 19px', padding: '10px 14px',
    background: 'color-mix(in srgb, var(--accent) 5%, var(--surface))',
    border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
    borderRadius: 10, fontSize: 12, color: 'var(--text2)', lineHeight: 1.65,
    position: 'relative',
  }}>
    <button
      onClick={onClose}
      title="Close analysis"
      style={{
        position: 'absolute', top: 6, right: 8,
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: 'var(--text3)', fontSize: 14, lineHeight: 1, padding: '2px 4px',
      }}
    >
      x
    </button>
    <div style={{ whiteSpace: 'pre-wrap', paddingRight: 20 }}>{text}</div>
  </div>
);

// ── Filing row ──────────────────────────────────────────────────────────────
const FilingRow: React.FC<{
  r: MatchResult;
  typeColors: Record<string, { bg: string; text: string }>;
  ticker: string;
}> = ({ r, typeColors, ticker }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const colors = typeColors[r.filing.form] || { bg: 'var(--surface2)', text: 'var(--text3)' };

  const handleAnalyze = async () => {
    if (analysis) { setAnalysis(null); return; } // toggle off
    setAnalyzing(true);
    try {
      const res = await fetch('/api/edgar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: r.filing.fileUrl,
          form: r.filing.form,
          description: r.filing.primaryDocDescription,
          filingDate: r.filing.filingDate,
          ticker,
        }),
      });
      const data = await res.json();
      setAnalysis(data.analysis || data.error || 'No analysis returned.');
    } catch (err) {
      setAnalysis(`Error: ${(err as Error).message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 8px', borderRadius: 8,
          transition: 'background 0.12s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Status dot */}
        <span
          title={r.inDatabase ? 'In database' : 'Not in database'}
          style={{
            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
            background: r.inDatabase ? 'var(--mint)' : 'var(--coral)',
            opacity: 0.9,
          }}
        />
        {/* Form badge */}
        <span style={{
          fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 600,
          padding: '1px 7px', borderRadius: 4, flexShrink: 0,
          background: colors.bg, color: colors.text, whiteSpace: 'nowrap',
        }}>
          {r.filing.form}
        </span>
        {/* Description */}
        <span style={{ fontSize: 12, color: 'var(--text)', flex: 1, minWidth: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {r.filing.primaryDocDescription || r.filing.form}
        </span>
        {/* Date */}
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)', flexShrink: 0 }}>
          {formatEdgarDate(r.filing.filingDate)}
        </span>
        {/* Status label */}
        <span style={{
          fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px',
          color: r.inDatabase ? 'var(--mint)' : 'var(--coral)', flexShrink: 0, width: 28,
        }}>
          {r.inDatabase ? 'IN DB' : 'NEW'}
        </span>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <ActionBtn label="Open" title="Open filing on SEC EDGAR" href={r.filing.fileUrl} />
          <ActionBtn
            label={analysis ? 'AI' : 'AI'}
            title={analysis ? 'Close AI analysis' : 'Analyze with AI'}
            onClick={handleAnalyze}
            loading={analyzing}
            active={!!analysis}
            variant="accent"
          />
        </div>
      </div>
      {analysis && <AnalysisPanel text={analysis} onClose={() => setAnalysis(null)} />}
    </div>
  );
};

// ── Filing list ─────────────────────────────────────────────────────────────
const INITIAL_COUNT = 20;

const FilingList: React.FC<{
  results: MatchResult[];
  typeColors: Record<string, { bg: string; text: string }>;
  filter: string;
  ticker: string;
}> = ({ results, typeColors, filter, ticker }) => {
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === 'All'
    ? results
    : filter === 'New Only'
      ? results.filter(r => !r.inDatabase)
      : results.filter(r => {
          const form = r.filing.form.toUpperCase();
          if (filter === 'S-1/S-3') return form === 'S-1' || form === 'S-3' || form === 'S-8';
          return form === filter;
        });

  if (filtered.length === 0) {
    return (
      <div style={{ fontSize: 12, color: 'var(--text3)', padding: '16px 0', textAlign: 'center' }}>
        No filings match this filter.
      </div>
    );
  }

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - INITIAL_COUNT;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {displayed.map((r, i) => (
        <FilingRow key={r.filing.accessionNumber || i} r={r} typeColors={typeColors} ticker={ticker} />
      ))}
      {hiddenCount > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '5px 14px', borderRadius: 99, border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text3)', cursor: 'pointer',
              fontSize: 10, fontWeight: 500, transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            {showAll ? '\u25B2 Show Less' : `\u25BC ${hiddenCount} More`}
          </button>
        </div>
      )}
    </div>
  );
};

// ── Filter pill ─────────────────────────────────────────────────────────────
const FilterPill: React.FC<{
  label: string; active: boolean; count?: number; onClick: () => void;
}> = ({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '3px 10px', fontSize: 10, fontWeight: active ? 600 : 400,
      color: active ? 'var(--accent)' : 'var(--text3)',
      background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
      border: '1px solid',
      borderColor: active ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : 'var(--border)',
      borderRadius: 99, cursor: 'pointer', transition: 'all 0.2s',
      outline: 'none', fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}
  >
    {label}
    {count !== undefined && (
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, opacity: active ? 1 : 0.5 }}>{count}</span>
    )}
  </button>
);

// ── Main component ──────────────────────────────────────────────────────────
const SharedEdgarTab: React.FC<EdgarTabProps> = ({ ticker, companyName, localFilings, cik, typeColors }) => {
  const [edgarFilings, setEdgarFilings] = useState<EdgarFiling[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  const [showLocalDb, setShowLocalDb] = useState(false);

  const results = matchFilings(edgarFilings, localFilings);
  const newCount = results.filter(r => !r.inDatabase).length;
  const trackedCount = results.filter(r => r.inDatabase).length;

  const formTypes: string[] = Array.from(new Set(edgarFilings.map(f => f.form)));
  const commonForms = ['10-K', '10-Q', '8-K', '424B5', 'S-1/S-3'];
  const filterOptions = ['All', 'New Only', ...commonForms.filter(f =>
    f === 'S-1/S-3'
      ? formTypes.some((ft: string) => ['S-1', 'S-3', 'S-8'].includes(ft.toUpperCase()))
      : formTypes.some((ft: string) => ft.toUpperCase() === f)
  )];

  const fetchFilings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/edgar/${ticker}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch (${res.status})`);
      }
      const data = await res.json();
      const filings: EdgarFiling[] = data.filings || [];
      setEdgarFilings(filings);
      setLoaded(true);
      const now = Date.now();
      setFetchedAt(now);
      setCachedEdgar(ticker, filings);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    const cached = getCachedEdgar(ticker);
    if (cached) {
      setEdgarFilings(cached.filings);
      setLoaded(true);
      setFetchedAt(cached.fetchedAt);
    } else {
      fetchFilings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  const edgarBrowseUrl = `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header — compact */}
      <div style={{ padding: '24px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>EDGAR<span style={{ color: 'var(--accent)' }}>.</span></h2>
          <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 400 }}>
            {companyName} &middot; CIK {cik}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
          Live SEC filings vs local database. Click <b>AI</b> on any filing to analyze.
        </p>
      </div>

      {/* Status bar — compact */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', marginTop: 6,
        background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {loaded && (
            <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2.5" />
              <circle cx="14" cy="14" r="12" fill="none" stroke="var(--mint)" strokeWidth="2.5"
                strokeDasharray={`${results.length > 0 ? (trackedCount / results.length) * 75.4 : 0} 75.4`}
                strokeLinecap="round" transform="rotate(-90 14 14)"
                style={{ transition: 'stroke-dasharray 0.4s ease' }}
              />
            </svg>
          )}
          <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>
            {!loaded ? 'Loading...' : `${trackedCount}/${results.length} tracked`}
          </span>
          {loaded && newCount > 0 && (
            <span style={{
              fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '1px 6px',
              borderRadius: 4, background: 'var(--coral-dim)', color: 'var(--coral)',
            }}>
              {newCount} new
            </span>
          )}
          {loaded && !loading && fetchedAt && (
            <span style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'Space Mono, monospace' }}>
              {formatTimeAgo(fetchedAt)}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <a
            href={edgarBrowseUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '5px 12px', fontSize: 10, fontWeight: 500,
              color: 'var(--text3)', background: 'transparent',
              border: '1px solid var(--border)', borderRadius: 99,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            EDGAR
          </a>
          <button
            onClick={fetchFilings}
            disabled={loading}
            style={{
              padding: '5px 16px', fontSize: 10, fontWeight: 600,
              color: loading ? 'var(--text3)' : 'var(--bg)',
              background: loading ? 'var(--surface2)' : 'var(--accent)',
              border: 'none', borderRadius: 99,
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.2s', outline: 'none',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {loading ? 'Fetching...' : loaded ? 'Refresh' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" style={{
          fontSize: 11, color: 'var(--coral)', marginTop: 6,
          padding: '8px 12px', background: 'var(--coral-dim)', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && !loaded && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '24px 0', color: 'var(--text3)',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 11 }}>Fetching from SEC EDGAR...</span>
        </div>
      )}

      {/* Filings */}
      {loaded && (
        <>
          {/* Legend + filters */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0 6px', flexWrap: 'wrap', gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {filterOptions.map(f => {
                let count: number | undefined;
                if (f === 'All') count = results.length;
                else if (f === 'New Only') count = newCount;
                else if (f === 'S-1/S-3') count = results.filter(r => ['S-1', 'S-3', 'S-8'].includes(r.filing.form.toUpperCase())).length;
                else count = results.filter(r => r.filing.form.toUpperCase() === f).length;
                return <FilterPill key={f} label={f} active={filter === f} count={count} onClick={() => setFilter(f)} />;
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 9, color: 'var(--text3)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--mint)', opacity: 0.9 }} />
                In DB
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--coral)', opacity: 0.9 }} />
                New
              </span>
            </div>
          </div>

          {/* Filing list card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12, padding: '6px 8px',
          }}>
            <FilingList results={results} typeColors={typeColors} filter={filter} ticker={ticker} />
          </div>

          {/* Local DB — collapsible */}
          <button
            onClick={() => setShowLocalDb(!showLocalDb)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 0 4px', background: 'transparent', border: 'none',
              cursor: 'pointer', outline: 'none', width: '100%',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Local Database
            </span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--text3)' }}>
              {localFilings.length} entries {showLocalDb ? '\u25B2' : '\u25BC'}
            </span>
          </button>
          {showLocalDb && (
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '8px 12px',
            }}>
              {localFilings.map((lf, i) => {
                const c = typeColors[lf.type] || { bg: 'var(--surface2)', text: 'var(--text3)' };
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '4px 4px',
                    fontSize: 11, borderBottom: i < localFilings.length - 1 ? '1px solid color-mix(in srgb, var(--border) 30%, transparent)' : 'none',
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)', flexShrink: 0, width: 85 }}>
                      {lf.date}
                    </span>
                    <span style={{
                      fontSize: 9, fontFamily: 'Space Mono, monospace', fontWeight: 600,
                      padding: '1px 5px', borderRadius: 3, flexShrink: 0,
                      background: c.bg, color: c.text,
                    }}>
                      {lf.type}
                    </span>
                    <span style={{ color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lf.description}
                    </span>
                    {lf.period !== '\u2014' && (
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--text3)', opacity: 0.6, flexShrink: 0 }}>
                        {lf.period}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SharedEdgarTab;
