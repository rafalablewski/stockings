/**
 * SharedEdgarTab — SEC EDGAR Filing Monitor
 *
 * Fetches the latest filings from SEC EDGAR and compares them
 * against the local database to highlight which filings have been
 * tracked and which are new.
 *
 * Matches the app's design system: surface layers, semantic colors,
 * Outfit + Space Mono typography, 16px card radii, accent-dim patterns.
 *
 * @version 1.0.0
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';

export interface EdgarTabProps {
  ticker: string;
  companyName: string;
  /** Local SEC filings from the database (TypeScript data files) */
  localFilings: LocalFiling[];
  /** CIK number (zero-padded) */
  cik: string;
  /** Color map for filing types */
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

interface CachedEdgar {
  filings: EdgarFiling[];
  fetchedAt: number;
}

function getCachedEdgar(ticker: string): CachedEdgar | null {
  try {
    const raw = sessionStorage.getItem(`edgar_${ticker}`);
    if (!raw) return null;
    const parsed: CachedEdgar = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(`edgar_${ticker}`);
      return null;
    }
    return parsed;
  } catch { return null; }
}

function setCachedEdgar(ticker: string, filings: EdgarFiling[]) {
  try {
    sessionStorage.setItem(`edgar_${ticker}`, JSON.stringify({ filings, fetchedAt: Date.now() }));
  } catch { /* quota exceeded */ }
}

function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// ── Date normalization ──────────────────────────────────────────────────────
// Local filings use "Feb 11, 2026" format; EDGAR uses "2026-02-11"
function normalizeDate(dateStr: string): string {
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // Try parsing "Mon DD, YYYY"
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
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

    // Find a matching local filing by date + form type
    const match = localFilings.find(lf => {
      const localDate = normalizeDate(lf.date);
      const localForm = lf.type.toUpperCase().trim();

      // Date must match (allow 1-day tolerance for timezone differences)
      const d1 = new Date(edgarDate);
      const d2 = new Date(localDate);
      const dayDiff = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff > 1) return false;

      // Form type must match (normalize common variants)
      const normalizeForm = (f: string) => f.replace(/\//g, '').replace(/\s+/g, '').replace(/-/g, '');
      return normalizeForm(edgarForm) === normalizeForm(localForm);
    });

    return {
      filing: ef,
      inDatabase: !!match,
      matchedLocal: match,
    };
  });
}

// ── Status dot ──────────────────────────────────────────────────────────────
const StatusDot: React.FC<{ inDatabase: boolean }> = ({ inDatabase }) => (
  <span
    role="img"
    aria-label={inDatabase ? 'In database' : 'Not in database'}
    title={inDatabase ? 'In database' : 'Not in database'}
    style={{
      width: 7, height: 7, borderRadius: '50%',
      background: inDatabase ? 'var(--mint)' : 'var(--coral)',
      flexShrink: 0, marginTop: 6, opacity: 0.9,
      transition: 'opacity 0.2s, background 0.2s',
    }}
  />
);

// ── Filing type badge ───────────────────────────────────────────────────────
const FormBadge: React.FC<{
  form: string;
  typeColors: Record<string, { bg: string; text: string }>;
}> = ({ form, typeColors }) => {
  const colors = typeColors[form] || { bg: 'var(--surface2)', text: 'var(--text3)' };
  return (
    <span style={{
      fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 600,
      padding: '2px 8px', borderRadius: 5,
      background: colors.bg, color: colors.text,
      whiteSpace: 'nowrap',
    }}>
      {form}
    </span>
  );
};

// ── Filing list ─────────────────────────────────────────────────────────────
const INITIAL_COUNT = 15;

const FilingList: React.FC<{
  results: MatchResult[];
  typeColors: Record<string, { bg: string; text: string }>;
  filter: string;
}> = ({ results, typeColors, filter }) => {
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
      <div style={{ fontSize: 13, color: 'var(--text3)', padding: '24px 0', lineHeight: 1.6, textAlign: 'center' }}>
        No filings match this filter.
      </div>
    );
  }

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - INITIAL_COUNT;

  return (
    <div>
      <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {displayed.map((r, i) => (
          <li
            key={r.filing.accessionNumber || i}
            role="listitem"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '10px 12px', borderRadius: 10,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <StatusDot inDatabase={r.inDatabase} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <FormBadge form={r.filing.form} typeColors={typeColors} />
                <a
                  href={r.filing.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13, color: 'var(--text)', textDecoration: 'none', lineHeight: 1.5,
                    transition: 'color 0.15s', flex: 1, minWidth: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                >
                  {r.filing.primaryDocDescription || r.filing.form}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)', letterSpacing: '-0.2px' }}>
                  {formatEdgarDate(r.filing.filingDate)}
                </span>
                {r.filing.reportDate && r.filing.reportDate !== r.filing.filingDate && (
                  <>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                      Period: {formatEdgarDate(r.filing.reportDate)}
                    </span>
                  </>
                )}
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                <span style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
                  color: r.inDatabase ? 'var(--mint)' : 'var(--coral)',
                }}>
                  {r.inDatabase ? 'In Database' : 'New'}
                </span>
                {r.matchedLocal && (
                  <>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text3)', opacity: 0.4 }} />
                    <span style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.7 }}>
                      {r.matchedLocal.description}
                    </span>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 12 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '6px 16px', borderRadius: 99, border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text3)', cursor: 'pointer',
              fontSize: 11, fontWeight: 500, transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            {showAll ? '\u25B2 Show Less' : `\u25BC Show ${hiddenCount} More`}
          </button>
        </div>
      )}
    </div>
  );
};

// ── Filter pill ─────────────────────────────────────────────────────────────
const FilterPill: React.FC<{
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}> = ({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px', fontSize: 11, fontWeight: active ? 600 : 400,
      color: active ? 'var(--accent)' : 'var(--text3)',
      background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
      border: '1px solid',
      borderColor: active ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : 'var(--border)',
      borderRadius: 99, cursor: 'pointer', transition: 'all 0.25s',
      outline: 'none', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 6,
    }}
  >
    {label}
    {count !== undefined && (
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, opacity: active ? 1 : 0.5 }}>
        {count}
      </span>
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

  const results = matchFilings(edgarFilings, localFilings);
  const newCount = results.filter(r => !r.inDatabase).length;
  const trackedCount = results.filter(r => r.inDatabase).length;

  // Collect unique form types for filter pills
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

  // Auto-load on mount: use cache if fresh, otherwise fetch
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

  const edgarUrl = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=&dateb=&owner=include&count=40`;
  const edgarBrowseUrl = `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-header</div>
      {/* Hero */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>SEC Filings</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>EDGAR<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>
          Live SEC EDGAR filings for {companyName} compared against the local database.
        </p>
      </div>

      {/* Status bar */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-status</div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', marginTop: 8,
        background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Status ring */}
          {loaded && (
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2" />
              <circle cx="14" cy="14" r="12" fill="none" stroke="var(--mint)" strokeWidth="2"
                strokeDasharray={`${results.length > 0 ? (trackedCount / results.length) * 75.4 : 0} 75.4`}
                strokeLinecap="round"
                transform="rotate(-90 14 14)"
                style={{ transition: 'stroke-dasharray 0.4s ease' }}
              />
            </svg>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              {!loaded ? 'EDGAR Monitor' : `${trackedCount} of ${results.length} in database`}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {!loaded ? `CIK ${cik}` : newCount > 0 ? `${newCount} new filing${newCount !== 1 ? 's' : ''} to review` : 'All filings tracked'}
            </span>
          </div>
          {/* Counts */}
          {loaded && (
            <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
              <span style={{
                fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 7px',
                borderRadius: 5, background: 'var(--mint-dim)', color: 'var(--mint)',
              }}>
                {trackedCount}
              </span>
              {newCount > 0 && (
                <span style={{
                  fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 7px',
                  borderRadius: 5, background: 'var(--coral-dim)', color: 'var(--coral)',
                }}>
                  {newCount}
                </span>
              )}
            </div>
          )}
          {/* Freshness */}
          {loaded && !loading && fetchedAt && (
            <span style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.6, fontFamily: 'Space Mono, monospace', marginLeft: 4 }}>
              {formatTimeAgo(fetchedAt)}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={edgarBrowseUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px', fontSize: 11, fontWeight: 500,
              color: 'var(--text3)', background: 'transparent',
              border: '1px solid var(--border)', borderRadius: 99,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            EDGAR
          </a>
          <button
            onClick={fetchFilings}
            disabled={loading}
            aria-label={loaded ? 'Refresh EDGAR filings' : 'Fetch EDGAR filings'}
            style={{
              padding: '8px 24px', fontSize: 11, fontWeight: 600, letterSpacing: '0.3px',
              color: loading ? 'var(--text3)' : 'var(--bg)',
              background: loading ? 'var(--surface2)' : 'var(--accent)',
              border: 'none', borderRadius: 99,
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              transition: 'all 0.25s', outline: 'none',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {loading ? 'Fetching...' : loaded ? 'Refresh' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* Legend */}
      {loaded && (
        <div
          role="note"
          aria-label="Filing status legend"
          style={{
            display: 'flex', alignItems: 'center', gap: 24, padding: '16px 4px 12px',
            fontSize: 10, color: 'var(--text3)', letterSpacing: '0.3px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--mint)', opacity: 0.9 }} />
            In Database
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--coral)', opacity: 0.9 }} />
            New
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div role="alert" style={{
          fontSize: 12, color: 'var(--coral)', marginTop: 12,
          padding: '12px 16px', background: 'var(--coral-dim)', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && !loaded && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          padding: '48px 0', color: 'var(--text3)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12 }}>Fetching from SEC EDGAR...</span>
        </div>
      )}

      {/* Filings */}
      {loaded && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-filings</div>
          {/* Filter pills */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0 16px',
            flexWrap: 'wrap',
          }}>
            {filterOptions.map(f => {
              let count: number | undefined;
              if (f === 'All') count = results.length;
              else if (f === 'New Only') count = newCount;
              else if (f === 'S-1/S-3') count = results.filter(r => ['S-1', 'S-3', 'S-8'].includes(r.filing.form.toUpperCase())).length;
              else count = results.filter(r => r.filing.form.toUpperCase() === f).length;
              return (
                <FilterPill
                  key={f}
                  label={f}
                  active={filter === f}
                  count={count}
                  onClick={() => setFilter(f)}
                />
              );
            })}
          </div>

          {/* Filing card */}
          <article style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {/* Card header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--accent) 4%, transparent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: loading ? 'var(--gold)' : 'var(--mint)',
                    boxShadow: loading ? '0 0 8px var(--gold-dim)' : '0 0 8px var(--mint-dim)',
                    transition: 'all 0.3s',
                  }}
                />
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                  {companyName} ({ticker})
                </h3>
                <span style={{
                  fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 8px',
                  borderRadius: 5, background: 'var(--surface2)', color: 'var(--text3)',
                }}>
                  CIK {cik}
                </span>
              </div>
              <a
                href={edgarUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all filings on SEC EDGAR"
                style={{
                  fontSize: 10, color: 'var(--text3)', textDecoration: 'none', padding: '2px 6px', borderRadius: 4,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                View all on EDGAR ↗
              </a>
            </div>

            {/* Filings list */}
            <div style={{ padding: '12px 16px 20px' }}>
              <FilingList results={results} typeColors={typeColors} filter={filter} />
            </div>
          </article>

          {/* Local database summary */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#local-database</div>
          <div style={{ padding: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--text3)',
              textTransform: 'uppercase', letterSpacing: '1.2px',
            }}>
              Local Database
            </span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>
              {localFilings.length} entries
            </span>
          </div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '16px 20px',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '6px 12px',
              fontSize: 12,
            }}>
              {localFilings.slice(0, 10).map((lf, i) => {
                const colors = typeColors[lf.type] || { bg: 'var(--surface2)', text: 'var(--text3)' };
                return (
                  <React.Fragment key={i}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)',
                      padding: '4px 0',
                    }}>
                      {lf.date}
                    </span>
                    <span style={{ color: 'var(--text)', padding: '4px 0', lineHeight: 1.5 }}>
                      <span style={{
                        fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 600,
                        padding: '1px 6px', borderRadius: 4, marginRight: 8,
                        background: colors.bg, color: colors.text,
                      }}>
                        {lf.type}
                      </span>
                      {lf.description}
                    </span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)',
                      padding: '4px 0', opacity: 0.6,
                    }}>
                      {lf.period !== '—' ? lf.period : ''}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
            {localFilings.length > 10 && (
              <div style={{ textAlign: 'center', paddingTop: 12, fontSize: 11, color: 'var(--text3)' }}>
                + {localFilings.length - 10} more entries in local database
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedEdgarTab;
