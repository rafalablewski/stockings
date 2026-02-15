/**
 * SharedEdgarTab — SEC EDGAR Filing Monitor
 *
 * Fetches the latest filings from SEC EDGAR and compares them
 * against the local database to highlight which filings have been
 * tracked and which are new. Per-filing actions: open in new tab
 * or analyze with AI.
 *
 * v3.0.0 — 3-tier matching (IN DB / DATA ONLY / NEW) + cross-ref display
 *
 * @version 3.0.0
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';

export interface EdgarTabProps {
  ticker: string;
  companyName: string;
  localFilings: LocalFiling[];
  cik: string;
  typeColors: Record<string, { bg: string; text: string }>;
  /** Cross-reference index: maps "FORM|YYYY-MM-DD" to data captured in other files */
  crossRefIndex?: Record<string, { source: string; data: string }[]>;
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

type FilingStatus = 'tracked' | 'data_only' | 'new';

interface MatchResult {
  filing: EdgarFiling;
  status: FilingStatus;
  matchedLocal?: LocalFiling;
  crossRefs?: { source: string; data: string }[];
}

// ── Constants ────────────────────────────────────────────────────────────────
const STATUS_RING_CIRCUMFERENCE = 2 * Math.PI * 12; // r=12 SVG circle

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

/** Get ±1 day ISO dates for fuzzy cross-ref lookup */
function getDateNeighbors(isoDate: string): string[] {
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return [isoDate];
  const prev = new Date(d); prev.setDate(prev.getDate() - 1);
  const next = new Date(d); next.setDate(next.getDate() + 1);
  return [
    prev.toISOString().slice(0, 10),
    isoDate,
    next.toISOString().slice(0, 10),
  ];
}

// ── Filing matcher ──────────────────────────────────────────────────────────
/**
 * Normalize form type for comparison. EDGAR returns bare types ("4", "3",
 * "144") while the local DB uses prefixed names ("Form 4", "Form 3",
 * "Form 144"). EDGAR also uses "SCHEDULE 13D/A" while DB uses "SC 13D/A".
 * This strips "FORM" prefix, normalizes "SCHEDULE" → "SC", and removes
 * slashes, spaces, and hyphens so both sides reduce to the same canonical form.
 */
const normalizeForm = (f: string) =>
  f.replace(/[/\s-]/g, '').replace(/^FORM/i, '').replace(/^SCHEDULE/i, 'SC');

/**
 * Date tolerance by form type. Ownership filings (Form 4, Form 3, Form 144,
 * SC 13D, SC 13G) use the transaction date in the local DB but the filing
 * date on EDGAR. SEC requires Form 4 within 2 business days → up to 4
 * calendar days gap. SC 13D/G can lag even more.
 */
const OWNERSHIP_FORMS = new Set(['4', '3', '5', '144', '144A', 'SC13D', 'SC13DA', 'SC13G', 'SC13GA']);
function getDateTolerance(form: string): number {
  return OWNERSHIP_FORMS.has(normalizeForm(form.toUpperCase())) ? 5 : 1;
}

/** Get date neighbors within ±N days for fuzzy lookup */
function getDateRange(isoDate: string, days: number): string[] {
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return [isoDate];
  const result: string[] = [];
  for (let offset = -days; offset <= days; offset++) {
    const nd = new Date(d);
    nd.setDate(nd.getDate() + offset);
    result.push(nd.toISOString().slice(0, 10));
  }
  return result;
}

/**
 * Look up cross-refs for a given form + date (with form-specific tolerance).
 * Iterates over index keys and normalizes both the EDGAR form and the index
 * key's form so "4" matches "Form 4", "SCHEDULE 13D/A" matches "SC 13D/A", etc.
 */
function lookupCrossRefs(
  form: string,
  isoDate: string,
  index?: Record<string, { source: string; data: string }[]>,
): { source: string; data: string }[] | undefined {
  if (!index) return undefined;
  const lookupNorm = normalizeForm(form.toUpperCase().trim());
  const tolerance = getDateTolerance(form.toUpperCase().trim());
  const validDates = new Set(getDateRange(isoDate, tolerance));

  for (const [key, value] of Object.entries(index)) {
    const pipeIdx = key.indexOf('|');
    if (pipeIdx === -1) continue;
    const keyForm = key.slice(0, pipeIdx);
    const keyDate = key.slice(pipeIdx + 1);
    if (validDates.has(keyDate) && normalizeForm(keyForm.toUpperCase().trim()) === lookupNorm) {
      return value;
    }
  }
  return undefined;
}

function matchFilings(
  edgarFilings: EdgarFiling[],
  localFilings: LocalFiling[],
  crossRefIndex?: Record<string, { source: string; data: string }[]>,
): MatchResult[] {
  return edgarFilings.map(ef => {
    const edgarDate = normalizeDate(ef.filingDate);
    const edgarForm = ef.form.toUpperCase().trim();
    const tolerance = getDateTolerance(edgarForm);

    // Tier 1: match against sec-filings.ts
    const match = localFilings.find(lf => {
      const localDate = normalizeDate(lf.date);
      const localForm = lf.type.toUpperCase().trim();
      const d1 = new Date(edgarDate);
      const d2 = new Date(localDate);
      const dayDiff = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff > tolerance) return false;
      return normalizeForm(edgarForm) === normalizeForm(localForm);
    });

    // Look up cross-refs regardless of match status
    const crossRefs = lookupCrossRefs(ef.form, edgarDate, crossRefIndex);

    if (match) {
      return { filing: ef, status: 'tracked' as FilingStatus, matchedLocal: match, crossRefs };
    }

    // Tier 2: no sec-filings.ts entry, but cross-ref data exists
    if (crossRefs && crossRefs.length > 0) {
      return { filing: ef, status: 'data_only' as FilingStatus, crossRefs };
    }

    // Tier 3: completely new
    return { filing: ef, status: 'new' as FilingStatus };
  });
}

// ── Status helpers ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<FilingStatus, { color: string; label: string; title: string }> = {
  tracked:   { color: 'var(--mint)',  label: 'IN DB',     title: 'Tracked in database' },
  data_only: { color: 'var(--gold)',  label: 'DATA ONLY', title: 'Data captured but filing not indexed in sec-filings.ts' },
  new:       { color: 'var(--coral)', label: 'NEW',       title: 'Not in database' },
};

// ── Cross-ref display ───────────────────────────────────────────────────────
const CrossRefLines: React.FC<{ refs: { source: string; data: string }[] }> = ({ refs }) => (
  <div style={{
    margin: '0 0 4px 19px', padding: '4px 0',
  }}>
    {refs.map((ref, i) => (
      <div key={i} style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: 10.5,
        lineHeight: 1.7,
        color: 'var(--text3)',
        opacity: 0.45,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        <span style={{ opacity: 0.7 }}>{'// '}</span>
        <span style={{ color: 'var(--text3)', opacity: 0.7 }}>{ref.source}</span>
        <span style={{ opacity: 0.5 }}>{' \u2192 '}</span>
        {ref.data}
      </div>
    ))}
  </div>
);

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
  const statusCfg = STATUS_CONFIG[r.status];

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
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', borderRadius: 10,
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Status dot */}
        <span
          title={statusCfg.title}
          style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            background: statusCfg.color,
            opacity: 0.9, transition: 'opacity 0.2s, background 0.2s',
          }}
        />
        {/* Form badge */}
        <span style={{
          fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 600,
          padding: '2px 8px', borderRadius: 5, flexShrink: 0,
          background: colors.bg, color: colors.text, whiteSpace: 'nowrap',
        }}>
          {r.filing.form}
        </span>
        {/* Description */}
        <span style={{ fontSize: 13, color: 'var(--text)', flex: 1, minWidth: 0, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {r.filing.primaryDocDescription || r.filing.form}
        </span>
        {/* Date */}
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)', flexShrink: 0, letterSpacing: '-0.2px' }}>
          {formatEdgarDate(r.filing.filingDate)}
        </span>
        {/* Status label */}
        <span style={{
          fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
          color: statusCfg.color, flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          {statusCfg.label}
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
      {/* Cross-reference data (comment-like) */}
      {r.crossRefs && r.crossRefs.length > 0 && <CrossRefLines refs={r.crossRefs} />}
      {analysis && <AnalysisPanel text={analysis} onClose={() => setAnalysis(null)} />}
    </div>
  );
};

// ── Form type categories for filtering ──────────────────────────────────────
const FORM_CATEGORIES: { label: string; match: (form: string) => boolean }[] = [
  { label: '10-K',       match: f => /^10K/i.test(normalizeForm(f)) },
  { label: '10-Q',       match: f => /^10Q/i.test(normalizeForm(f)) },
  { label: '8-K',        match: f => /^8K/i.test(normalizeForm(f)) },
  { label: 'Ownership',  match: f => { const n = normalizeForm(f.toUpperCase()); return ['4','3','5'].includes(n) || n.startsWith('SC13') || n === '144'; } },
  { label: 'Prospectus', match: f => { const n = normalizeForm(f.toUpperCase()); return /^424/.test(n) || /^S[138]/.test(n) || n === 'FWP'; } },
  { label: 'Proxy',      match: f => { const n = normalizeForm(f.toUpperCase()); return n.includes('14A') || n.includes('14C'); } },
];

function getFormCategory(form: string): string {
  for (const cat of FORM_CATEGORIES) {
    if (cat.match(form)) return cat.label;
  }
  return 'Other';
}

/** Extract year from ISO date string */
function getFilingYear(isoDate: string): string {
  return isoDate?.slice(0, 4) || 'Unknown';
}

// ── Year section (collapsible) ──────────────────────────────────────────────
const YearSection: React.FC<{
  year: string;
  results: MatchResult[];
  typeColors: Record<string, { bg: string; text: string }>;
  ticker: string;
  defaultOpen: boolean;
}> = ({ year, results, typeColors, ticker, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const trackedInYear = results.filter(r => r.status === 'tracked').length;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          padding: '12px 12px 8px', background: 'transparent', border: 'none',
          cursor: 'pointer', outline: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Space Mono, monospace', fontSize: 14, fontWeight: 700,
          color: 'var(--text)', letterSpacing: '-0.5px',
        }}>
          {year}
        </span>
        <span style={{ flex: 1, height: 1, background: 'color-mix(in srgb, var(--border) 50%, transparent)' }} />
        <span style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--mint)' }}>{trackedInYear}</span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{results.length}</span>
          <span style={{ fontSize: 9, opacity: 0.5 }}>{open ? '\u25B2' : '\u25BC'}</span>
        </span>
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {results.map((r, i) => (
            <FilingRow key={r.filing.accessionNumber || `${year}-${i}`} r={r} typeColors={typeColors} ticker={ticker} />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Filing list (grouped by year) ───────────────────────────────────────────
function applyFilter(results: MatchResult[], filter: string): MatchResult[] {
  if (filter === 'All') return results;
  if (filter === 'New Only') return results.filter(r => r.status === 'new');
  if (filter === 'Data Only') return results.filter(r => r.status === 'data_only');
  const category = FORM_CATEGORIES.find(c => c.label === filter);
  if (category) return results.filter(r => category.match(r.filing.form));
  if (filter === 'Other') return results.filter(r => getFormCategory(r.filing.form) === 'Other');
  return results;
}

const FilingList: React.FC<{
  results: MatchResult[];
  typeColors: Record<string, { bg: string; text: string }>;
  filter: string;
  ticker: string;
}> = ({ results, typeColors, filter, ticker }) => {
  const filtered = applyFilter(results, filter);

  if (filtered.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text3)', padding: '24px 0', lineHeight: 1.6, textAlign: 'center' }}>
        No filings match this filter.
      </div>
    );
  }

  // Group by year
  const yearGroups: { year: string; items: MatchResult[] }[] = [];
  const yearMap = new Map<string, MatchResult[]>();
  for (const r of filtered) {
    const year = getFilingYear(r.filing.filingDate);
    if (!yearMap.has(year)) { yearMap.set(year, []); yearGroups.push({ year, items: yearMap.get(year)! }); }
    yearMap.get(year)!.push(r);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {yearGroups.map((g, i) => (
        <YearSection
          key={g.year}
          year={g.year}
          results={g.items}
          typeColors={typeColors}
          ticker={ticker}
          defaultOpen={i === 0}
        />
      ))}
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
      padding: '4px 12px', fontSize: 11, fontWeight: active ? 600 : 400,
      color: active ? 'var(--accent)' : 'var(--text3)',
      background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
      border: '1px solid',
      borderColor: active ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : 'var(--border)',
      borderRadius: 99, cursor: 'pointer', transition: 'all 0.25s',
      outline: 'none', fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}
  >
    {label}
    {count !== undefined && (
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, opacity: active ? 1 : 0.5 }}>{count}</span>
    )}
  </button>
);

// ── Main component ──────────────────────────────────────────────────────────
const SharedEdgarTab: React.FC<EdgarTabProps> = ({ ticker, companyName, localFilings, cik, typeColors, crossRefIndex }) => {
  const [edgarFilings, setEdgarFilings] = useState<EdgarFiling[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  const results = useMemo(
    () => matchFilings(edgarFilings, localFilings, crossRefIndex),
    [edgarFilings, localFilings, crossRefIndex],
  );
  const trackedCount = results.filter(r => r.status === 'tracked').length;
  const dataOnlyCount = results.filter(r => r.status === 'data_only').length;
  const newCount = results.filter(r => r.status === 'new').length;

  // Build dynamic filter options from actual form types present
  const filterOptions = useMemo(() => {
    const opts: string[] = ['All', 'New Only'];
    if (dataOnlyCount > 0) opts.push('Data Only');
    for (const cat of FORM_CATEGORIES) {
      if (results.some(r => cat.match(r.filing.form))) opts.push(cat.label);
    }
    if (results.some(r => getFormCategory(r.filing.form) === 'Other')) opts.push('Other');
    return opts;
  }, [results, dataOnlyCount]);

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
  }, [ticker, fetchFilings]);

  const edgarBrowseUrl = `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-header</div>
      {/* Hero — matches Sources tab */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>SEC Filings</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>EDGAR<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>
          Live SEC EDGAR filings for {companyName} compared against the local database. Click <b>AI</b> on any filing to analyze.
        </p>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-status</div>
      {/* Status bar — matches Sources tab */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', marginTop: 8,
        background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Progress ring */}
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2" />
            {loaded && (
              <>
                {/* Tracked arc (mint) */}
                <circle cx="14" cy="14" r="12" fill="none" stroke="var(--mint)" strokeWidth="2"
                  strokeDasharray={`${results.length > 0 ? (trackedCount / results.length) * STATUS_RING_CIRCUMFERENCE : 0} ${STATUS_RING_CIRCUMFERENCE}`}
                  strokeLinecap="round" transform="rotate(-90 14 14)"
                  style={{ transition: 'stroke-dasharray 0.4s ease' }}
                />
                {/* Data-only arc (gold), offset after tracked */}
                {dataOnlyCount > 0 && (
                  <circle cx="14" cy="14" r="12" fill="none" stroke="var(--gold)" strokeWidth="2"
                    strokeDasharray={`${(dataOnlyCount / results.length) * STATUS_RING_CIRCUMFERENCE} ${STATUS_RING_CIRCUMFERENCE}`}
                    strokeLinecap="round"
                    transform={`rotate(${-90 + (trackedCount / results.length) * 360} 14 14)`}
                    style={{ transition: 'stroke-dasharray 0.4s ease' }}
                  />
                )}
              </>
            )}
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              {!loaded ? 'EDGAR Monitor' : `${trackedCount} of ${results.length} in database`}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {!loaded
                ? `CIK ${cik}`
                : newCount > 0 || dataOnlyCount > 0
                  ? [
                      newCount > 0 ? `${newCount} new` : '',
                      dataOnlyCount > 0 ? `${dataOnlyCount} data only` : '',
                    ].filter(Boolean).join(', ')
                  : 'All filings tracked'
              }
            </span>
          </div>
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

      {/* Legend — 3 tiers */}
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
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', opacity: 0.9 }} />
            Data Only
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
              const count = applyFilter(results, f).length;
              return <FilterPill key={f} label={f} active={filter === f} count={count} onClick={() => setFilter(f)} />;
            })}
          </div>

          {/* Filing list card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16, padding: '8px 12px',
          }}>
            <FilingList results={results} typeColors={typeColors} filter={filter} ticker={ticker} />
          </div>
        </>
      )}
    </div>
  );
};

export default SharedEdgarTab;
