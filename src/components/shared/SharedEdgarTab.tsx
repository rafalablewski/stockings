/**
 * SharedEdgarTab — DB-First SEC EDGAR Filing Monitor
 *
 * ── Flow ──
 *
 * 1. On mount: load filings ONLY from database (GET /api/seen-filings).
 *    If nothing saved yet → empty state.
 * 2. "Fetch Filings" button → fetches fresh filings from SEC EDGAR API.
 *    New filings (not already in DB) are saved with dismissed=false → NEW badge.
 * 3. NEW badge stays until user clicks it → sets dismissed=true in DB.
 * 4. All filing metadata (status, cross-refs, form, date, etc.) persisted to DB.
 *
 * No session cache. No auto-fetch on mount.
 *
 * @version 4.0.0
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { VERDICT_COLORS, parseVerdict, stripVerdict } from './verdictUtils';
import { authFetch } from '@/lib/auth-fetch';
import {
  normalizeDate,
  normalizeAccession,
  mergeLocalFilings,
  mergeCrossRefs,
} from './edgarMergeHelpers';
export type { LocalFiling } from './edgarMergeHelpers';
import type { LocalFiling } from './edgarMergeHelpers';

export interface EdgarTabProps {
  ticker: string;
  companyName: string;
  localFilings: LocalFiling[];
  cik: string;
  typeColors: Record<string, { bg: string; text: string }>;
  /** Cross-reference index: maps accession number OR "FORM|YYYY-MM-DD" to data captured in other files */
  crossRefIndex?: Record<string, { source: string; data: string }[]>;
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

// (Session caches removed — filings and analyses are loaded from DB only)

/** DB record shape for per-filing status display */
interface DbFilingRecord {
  accessionNumber: string;
  form: string;
  filingDate: string | null;
  description: string | null;
  reportDate: string | null;
  fileUrl: string | null;
  status: string | null;
  crossRefs: { source: string; data: string }[] | null;
  dismissed: boolean;
  hidden: boolean;
}

function formatTimeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

// ── Date helpers ────────────────────────────────────────────────────────────
// normalizeDate — imported from ./edgarMergeHelpers

function formatEdgarDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Maximum days between EDGAR filing date and local entry date for legacy (non-accession) matching */
const MAX_LEGACY_MATCH_DAYS = 14;

/** Absolute day difference between two ISO date strings */
function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T12:00:00Z');
  const db = new Date(b + 'T12:00:00Z');
  return Math.round(Math.abs(da.getTime() - db.getTime()) / 86400000);
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
 * Form aliases for matching: SEC EDGAR press releases (PRNEWS) accompany 8-K
 * filings and should match against 8-K entries in sec-filings.ts / cross-refs.
 */
const FORM_MATCH_ALIASES: Record<string, string> = { PRNEWS: '8K' };

/** Normalize form for matching, applying aliases (PRNEWS → 8K, etc.) */
const normalizeFormForMatch = (f: string) => {
  const norm = normalizeForm(f.toUpperCase().trim());
  return FORM_MATCH_ALIASES[norm] || norm;
};

// normalizeAccession — imported from ./edgarMergeHelpers

/**
 * Look up cross-refs by accession number first, then by form|date (legacy).
 * Accession-number keys have no pipe; form|date keys contain a pipe separator.
 * Legacy fallback uses exact date matching (±1 day tolerance for timezone drift)
 * to prevent cross-refs from bleeding between nearby filings of the same type.
 */
function lookupCrossRefs(
  accessionNumber: string,
  form: string,
  isoDate: string,
  index?: Record<string, { source: string; data: string }[]>,
): { source: string; data: string }[] | undefined {
  if (!index) return undefined;

  // Primary: exact accession number lookup
  const accNorm = normalizeAccession(accessionNumber);
  if (index[accessionNumber]) return index[accessionNumber];
  if (index[accNorm]) return index[accNorm];

  // Fallback: exact or near-exact date match among form|date keys of same form type.
  // Use tight tolerance (<=1 day) to prevent cross-refs bleeding between weekly filings
  // (e.g. BMNR weekly 8-K ETH updates). The 14-day window is for local filing matching
  // only — cross-ref keys must match their specific filing date.
  const lookupNorm = normalizeFormForMatch(form);
  for (const [key, value] of Object.entries(index)) {
    const pipeIdx = key.indexOf('|');
    if (pipeIdx === -1) continue;
    const keyForm = key.slice(0, pipeIdx);
    const keyDate = key.slice(pipeIdx + 1);
    if (normalizeFormForMatch(keyForm) !== lookupNorm) continue;
    if (daysBetween(isoDate, keyDate) <= 1) return value;
  }
  return undefined;
}

/**
 * Match EDGAR filings against local database.
 *
 * Primary matching: accession number (exact, unique per filing).
 * Legacy fallback: form type + closest-date match (within MAX_LEGACY_MATCH_DAYS)
 * for entries without accession numbers. Uses nearest-date instead of a rigid
 * day window so matching works regardless of when data files are updated.
 * The fallback only matches against local entries that lack accession numbers
 * to prevent double-matching entries that should be matched by accession number.
 */
function matchFilings(
  edgarFilings: EdgarFiling[],
  localFilings: LocalFiling[],
  crossRefIndex?: Record<string, { source: string; data: string }[]>,
): MatchResult[] {
  // Build accession number → LocalFiling map for O(1) exact matching
  const accessionMap = new Map<string, LocalFiling>();
  const legacyFilings: LocalFiling[] = [];
  for (const lf of localFilings) {
    if (lf.accessionNumber) {
      accessionMap.set(normalizeAccession(lf.accessionNumber), lf);
    } else {
      legacyFilings.push(lf);
    }
  }

  // ── Tier 1b: greedy closest-first 1-to-1 legacy matching ──────────────
  // Build all candidate (EDGAR index, legacy index, distance) pairs for
  // filings that don't have accession numbers, then greedily assign the
  // closest pairs first. This prevents multiple EDGAR filings (e.g. weekly
  // 8-K ETH updates) from all matching the same sec-filings.ts entry.
  type Candidate = { ei: number; li: number; days: number };
  const candidates: Candidate[] = [];
  const accessionMatched = new Set<number>(); // EDGAR indices matched by accession

  for (let ei = 0; ei < edgarFilings.length; ei++) {
    const ef = edgarFilings[ei];
    const edgarAccNorm = normalizeAccession(ef.accessionNumber);
    if (accessionMap.has(edgarAccNorm)) {
      accessionMatched.add(ei);
      continue;
    }
    const edgarDate = normalizeDate(ef.filingDate);
    const edgarForm = normalizeFormForMatch(ef.form);
    for (let li = 0; li < legacyFilings.length; li++) {
      if (normalizeFormForMatch(legacyFilings[li].type) !== edgarForm) continue;
      const days = daysBetween(edgarDate, normalizeDate(legacyFilings[li].date));
      if (days <= MAX_LEGACY_MATCH_DAYS) {
        candidates.push({ ei, li, days });
      }
    }
  }

  // Sort by distance ascending — closest pairs assigned first
  candidates.sort((a, b) => a.days - b.days);

  const legacyMatch = new Map<number, LocalFiling>(); // EDGAR index → matched legacy filing
  const usedLegacy = new Set<number>(); // legacy indices already claimed

  for (const { ei, li, } of candidates) {
    if (legacyMatch.has(ei) || usedLegacy.has(li)) continue;
    legacyMatch.set(ei, legacyFilings[li]);
    usedLegacy.add(li);
  }

  // ── Assemble results ──────────────────────────────────────────────────
  return edgarFilings.map((ef, ei) => {
    const edgarAccNorm = normalizeAccession(ef.accessionNumber);
    const edgarDate = normalizeDate(ef.filingDate);

    // Tier 1a: exact accession number match
    let match = accessionMap.get(edgarAccNorm);

    // Tier 1b: pre-computed 1-to-1 legacy match
    if (!match) {
      match = legacyMatch.get(ei);
    }

    // Look up cross-refs regardless of match status
    const crossRefs = lookupCrossRefs(ef.accessionNumber, ef.form, edgarDate, crossRefIndex);

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

// ── Merge helpers ──────────────────────────────────────────────────────────
// mergeLocalFilings, mergeCrossRefs — imported from ./edgarMergeHelpers

// ── Status helpers ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<FilingStatus, { color: string; label: string; title: string; desc: string }> = {
  tracked:   { color: 'var(--mint)',  label: 'IN DB',     title: 'Tracked in database', desc: 'Indexed in sec-filings.ts — matched by accession number or closest form+date (within 14 days)' },
  data_only: { color: 'var(--gold)',  label: 'DATA ONLY', title: 'Data captured but filing not indexed in sec-filings.ts', desc: 'Data captured in other files (capital, timeline, etc.) but not indexed in sec-filings.ts' },
  new:       { color: 'var(--coral)', label: 'UNTRACKED', title: 'Not in database', desc: 'Not tracked — no index entry, no cross-reference data' },
};

// ── Verdict helpers ─────────────────────────────────────────────────────────
// Verdict types and utilities imported from './verdictUtils'

// ── Cross-ref display ───────────────────────────────────────────────────────
const CrossRefLines: React.FC<{ refs: { source: string; data: string }[] }> = ({ refs }) => (
  <div className="sm-ed-crossref">
    {refs.map((ref, i) => (
      <div key={i} className="sm-ed-crossref-line">
        <span className="sm-opacity-70">{'// '}</span>
        <span className="sm-opacity-70">{ref.source}</span>
        <span className="sm-opacity-50">{' \u2192 '}</span>
        {ref.data}
      </div>
    ))}
  </div>
);

// ── Tiny action button (Ive×Tesla style) ────────────────────────────────────
const ActionBtn: React.FC<{
  label: string;
  title: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  loading?: boolean;
  variant?: 'default' | 'accent';
}> = ({ label, title, onClick, href, active, loading, variant = 'default' }) => {
  const dataAttrs: Record<string, string | undefined> = {
    'data-active': active ? 'true' : undefined,
    'data-variant': !active && variant === 'accent' ? 'accent' : undefined,
    'data-loading': loading ? 'true' : undefined,
  };
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="sm-ed-action-btn-sm" {...dataAttrs}>{label}</a>;
  }
  return <button onClick={onClick} disabled={loading} title={title} className="sm-ed-action-btn-sm" {...dataAttrs}>{loading ? '...' : label}</button>;
};

// ── Analysis panel ──────────────────────────────────────────────────────────
const AiDisabledBanner: React.FC<{ message: string }> = ({ message }) => (
  <div className="sm-ed-analysis">
    <div className="sm-ed-ai-banner">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      {message}
    </div>
  </div>
);

const AnalysisPanel: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  if (text.includes('AI features are disabled')) {
    return <AiDisabledBanner message={text} />;
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
  <div className="sm-ed-analysis">
    <div className="sm-flex-between sm-mb-12">
      <span className="sm-micro-label">
        Analysis Result
      </span>
      <button
        onClick={handleCopy}
        title="Copy analysis text"
        className="sm-ed-copy-btn"
        data-copied={copied ? 'true' : undefined}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
    <div className="sm-scrollbox-tall">
      <pre className="sm-ed-analysis-pre">
        {text}
      </pre>
    </div>
  </div>
  );
};

// ── Display name normalization ───────────────────────────────────────────────
/** Map EDGAR's raw form names to consistent short display names */
function displayFormName(raw: string): string {
  const upper = raw.toUpperCase().trim();
  // Bare numbers → "Form N"
  if (/^\d+$/.test(upper)) return `Form ${raw}`;
  // "SCHEDULE 13D/A" → "SC 13D/A", etc.
  if (upper.startsWith('SCHEDULE')) return raw.replace(/^SCHEDULE\s*/i, 'SC ');
  return raw;
}

// ── Filing row ──────────────────────────────────────────────────────────────
const FilingRow: React.FC<{
  r: MatchResult;
  typeColors: Record<string, { bg: string; text: string }>;
  ticker: string;
  isGenuinelyNew?: boolean;
  isDismissed?: boolean;
  isHidden?: boolean;
  dbRecord?: DbFilingRecord | null;
  persistedAnalysis?: string | null;
  onDismissNew?: () => void;
  onToggleHide?: () => void;
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ r, typeColors, ticker, isGenuinelyNew, isDismissed, isHidden, dbRecord, persistedAnalysis, onDismissNew, onToggleHide, onRecheck, recheckLoading }) => {
  const accession = r.filing.accessionNumber;
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(persistedAnalysis || null);

  useEffect(() => {
    if (!analysis && persistedAnalysis) setAnalysis(persistedAnalysis);
  }, [persistedAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps

  // DB tooltip: live data fetched from database on hover
  const [dbTooltip, setDbTooltip] = useState<{ status: string; form: string; description: string; filingDate: string; crossRefs: { source: string; data: string }[] | null; seen: string } | null>(null);
  const [dbTooltipLoading, setDbTooltipLoading] = useState(false);
  const [dbTooltipVisible, setDbTooltipVisible] = useState(false);
  const dbHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => () => { if (dbHoverTimer.current) clearTimeout(dbHoverTimer.current); }, []);

  const handleDbHoverEnter = () => {
    if (dbHoverTimer.current) clearTimeout(dbHoverTimer.current);
    dbHoverTimer.current = setTimeout(async () => {
      setDbTooltipVisible(true);
      setDbTooltipLoading(true);
      try {
        const res = await fetch(`/api/seen-filings?ticker=${encodeURIComponent(ticker)}&accessionNumber=${encodeURIComponent(accession)}`);
        if (res.ok) {
          const data = await res.json();
          const rec = data.filings?.[0];
          if (rec) {
            const xrefs = rec.crossRefs;
            setDbTooltip({
              status: STATUS_CONFIG[r.status].label,
              form: rec.form || '—',
              description: rec.description || '—',
              filingDate: rec.filingDate || '—',
              crossRefs: xrefs && Array.isArray(xrefs) && xrefs.length > 0 ? xrefs : null,
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

  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expanded, setExpanded] = useState(false);

  const formDisplay = displayFormName(r.filing.form);
  const colors = typeColors[r.filing.form] || typeColors[formDisplay] || { bg: 'var(--surface2)', text: 'var(--text3)' };
  const statusCfg = STATUS_CONFIG[r.status];

  // Hidden filings: collapsed single-line with low opacity and unhide button
  if (isHidden) {
    return (
      <div className="sm-ed-hidden-row">
        <div className="sm-flex sm-gap-8 sm-ed-hidden-row-pad">
          <span className="sm-ed-form-badge sm-ed-form-badge-auto" style={{
            '--badge-bg': colors.bg, '--badge-text': colors.text,
          } as React.CSSProperties}>
            {formDisplay}
          </span>
          <span className="sm-subtle-sm sm-ed-hidden-desc">
            {r.filing.primaryDocDescription || r.filing.form}
          </span>
          {r.filing.filingDate && (
            <span className="sm-subtle-sm sm-shrink-0 sm-ed-hidden-date">
              {formatEdgarDate(r.filing.filingDate)}
            </span>
          )}
          <span className="sm-text3 sm-shrink-0 sm-ed-hidden-label">hidden</span>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="sm-shrink-0" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onToggleHide?.()}
              title="Unhide filing"
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

  const resetWorkflowState = () => {
    setCopied(false);
  };

  const isErrorAnalysis = (text: string | null) => !!text && (text.startsWith('Error:') || text === 'No analysis returned.' || text.includes('AI analysis failed') || text.includes('AI features are disabled'));

  const handleAnalyze = async () => {
    const isError = isErrorAnalysis(analysis);
    if (analysis && !isError) {
      setAnalysis(null); resetWorkflowState(); setExpanded(false);
      fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'edgar', key: accession, text: null }) }).catch(() => {});
      return;
    }
    if (isError) { setAnalysis(null); resetWorkflowState(); }
    setAnalyzing(true);
    setExpanded(true);
    try {
      const res = await authFetch('/api/edgar/analyze', {
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
      const text = data.analysis || data.error || 'No analysis returned.';
      const failed = isErrorAnalysis(text);
      setAnalysis(text);
      if (!failed) {
        fetch('/api/analysis-cache', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker, type: 'edgar', key: accession, text }) }).catch(() => {});
      }
    } catch (err) {
      setAnalysis(`Error: ${(err as Error).message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (!analysis) return;
    await navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!analysis) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const safeForm = esc(displayFormName(r.filing.form));
    const safeDesc = esc(r.filing.primaryDocDescription || r.filing.form);
    const safeTicker = esc(ticker.toUpperCase());
    const safeResult = esc(analysis);
    printWindow.document.write(`<!DOCTYPE html><html><head><title>${safeForm} — ${safeTicker}</title>
<style>
  body { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px; line-height: 1.8; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 24px; }
  pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; }
  .meta { font-size: 9px; color: #888; margin-bottom: 16px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>${safeForm}: ${safeDesc}</h1>
<div class="meta">${safeTicker} — ${esc(r.filing.filingDate)} — ABISON Research</div>
<pre>${safeResult}</pre>
</body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
  };


  return (
    <div>
      {/* Header — clickable expand/collapse when analysis exists */}
      <div
        role={analysis ? 'button' : undefined}
        tabIndex={analysis ? 0 : undefined}
        aria-expanded={analysis ? expanded : undefined}
        onClick={analysis ? () => setExpanded(!expanded) : undefined}
        onKeyDown={analysis ? (e) => { if (e.key === 'Enter') setExpanded(!expanded); } : undefined}
        className={`sm-ed-filing-row${analysis ? ' sm-pointer' : ''}`}
      >
        {/* Main row: chevron + status + badge + headline */}
        <div className="sm-ed-row-main">
          {/* Chevron (fixed-width slot so rows align whether analysis exists or not) */}
          <span className="sm-ed-chevron-slot">
          {analysis && (
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="sm-ed-chevron"
              data-expanded={expanded ? 'true' : 'false'}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          )}
          </span>
          {/* Status dot — always visible */}
          <span
            title={statusCfg.title}
            className="sm-ed-status-dot"
            style={{ '--dot-color': statusCfg.color } as React.CSSProperties}
          />
          {/* Form badge — fixed width so columns align across rows */}
          <span className="sm-ed-form-badge" style={{
            '--badge-bg': colors.bg, '--badge-text': colors.text,
          } as React.CSSProperties}>
            {formDisplay}
          </span>
          {/* NEW / SEEN badge — fixed-width slot so description column aligns */}
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
          {/* Description */}
          <span className="sm-ed-desc">
            {r.filing.primaryDocDescription || r.filing.form}
          </span>
        </div>
        {/* Meta row: verdict + date + status + DB + actions */}
        <div className="sm-ed-row-meta">
          {/* Verdict badge inline (compact, shown in header when collapsed) */}
          {analysis && !expanded && (() => {
            const verdict = parseVerdict(analysis);
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
          {/* Date */}
          <span className="sm-ed-date">
            {formatEdgarDate(r.filing.filingDate)}
          </span>
          {/* Status label */}
          <span className="sm-ed-status-label" style={{ '--status-color': statusCfg.color } as React.CSSProperties}>
            {statusCfg.label}
          </span>
          {/* DB status button — hover fetches live data from database */}
          {(() => {
            const dbColor = !dbRecord ? 'var(--text3)' : STATUS_CONFIG[r.status].color;
            const dbOpacity = !dbRecord ? 0.25 : 0.8;
            return (
              <span className="sm-shrink-0 sm-relative">
                <button
                  type="button"
                  aria-label="Show database record"
                  className="sm-ed-db-btn"
                  style={{ '--db-color': dbColor, '--db-opacity': dbOpacity } as React.CSSProperties}
                  onFocus={handleDbHoverEnter}
                  onBlur={handleDbHoverLeave}
                >
                  <span className="sm-ed-color-dot-sm" style={{ '--dot-color': dbColor } as React.CSSProperties} />
                  DB
                </button>
                {/* Tooltip — shows live DB data */}
                {dbTooltipVisible && (
                  <div ref={dbTooltipRef} className="sm-ed-db-tooltip">
                    <div className="sm-micro-label sm-ed-db-tooltip-header">
                      Saved in seen_filings DB?
                    </div>
                    {dbTooltipLoading ? (
                      <div className="sm-text3 sm-italic">Fetching from database...</div>
                    ) : dbTooltip ? (
                      <>
                        <div><span className="sm-text3 sm-ed-db-field-label-80">status:</span> <span style={{ color: statusCfg.color }} className="sm-fw-600">{dbTooltip.status}</span></div>
                        <div><span className="sm-text3 sm-ed-db-field-label-80">form:</span> {dbTooltip.form}</div>
                        <div className="sm-truncate-row"><span className="sm-text3 sm-ed-db-field-label-80">desc:</span> {dbTooltip.description}</div>
                        <div><span className="sm-text3 sm-ed-db-field-label-80">filed:</span> {dbTooltip.filingDate}</div>
                        <div><span className="sm-text3 sm-ed-db-field-label-80">cross-refs:</span> {dbTooltip.crossRefs ? [...new Set(dbTooltip.crossRefs.map(r => r.source))].join(', ') : 'none'}</div>
                        <div><span className="sm-text3 sm-ed-db-field-label-80">seen:</span> <span className="sm-fw-600 sm-ed-db-seen" data-seen={dbTooltip.seen}>{dbTooltip.seen}</span></div>
                      </>
                    ) : (
                      <div className="sm-coral sm-fw-600">NOT IN DATABASE</div>
                    )}
                  </div>
                )}
              </span>
            );
          })()}
          {/* Action buttons — stop propagation so clicks don't toggle expand */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="sm-flex sm-gap-4 sm-shrink-0" onClick={e => e.stopPropagation()}>
            <a
              href={r.filing.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open filing on SEC EDGAR"
              className="sm-ed-action-btn-sm"
            >
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
              </svg>
            </a>
            <ActionBtn
              label="AI"
              title={analysis ? 'Close AI analysis' : 'Analyze with AI'}
              onClick={handleAnalyze}
              loading={analyzing}
              active={!!analysis}
              variant="accent"
            />
            {onRecheck && (
              <button
                onClick={onRecheck}
                disabled={recheckLoading}
                title="Re-check if this filing is in the local database"
                className="sm-ed-action-btn-sm"
                data-recheck={recheckLoading ? 'loading' : 'idle'}
              >
                <svg width={11} height={11} viewBox="0 0 16 16" fill="none" className="sm-spin-fast" data-spinning={recheckLoading ? 'true' : 'false'}>
                  <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <button
              onClick={() => onToggleHide?.()}
              title="Hide filing"
              className="sm-ed-action-btn-sm"
              data-hide-btn="true"
            >
              <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/>
                <line x1="2" y1="14" x2="14" y2="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-reference data (comment-like) — always visible regardless of expand/collapse */}
      {r.crossRefs && r.crossRefs.length > 0 && <CrossRefLines refs={r.crossRefs} />}

      {/* Expanded body — analysis content */}
      {analysis && expanded && (
        <div className="sm-ed-expanded-body">
          {/* Verdict badge */}
          {(() => {
            const verdict = parseVerdict(analysis);
            if (!verdict) return null;
            const vc = VERDICT_COLORS[verdict.level];
            return (
              <div className="sm-ed-verdict-badge sm-ed-verdict-badge-expanded" style={{
                '--verdict-color': vc.color, '--verdict-bg': vc.bg,
              } as React.CSSProperties}>
                {verdict.level}
                <span className="sm-ed-verdict-explanation">
                  {verdict.explanation}
                </span>
              </div>
            );
          })()}
          <AnalysisPanel text={stripVerdict(analysis)} />
          {/* ── Database Action Toolbar ── */}
          {!analyzing && (
          <div className="sm-ed-toolbar">
            <div className="sm-mt-8 sm-border-t sm-pt-8">
              <div className="sm-flex-wrap sm-items-center">
                {/* 1. Export PDF */}
                <button type="button" onClick={handleExportPDF} className="sm-ed-action-btn">
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Export PDF
                </button>

                {/* 2. Copy Markdown */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="sm-ed-action-btn"
                  data-copied={copied ? 'true' : undefined}
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  {copied ? 'Copied' : 'Copy Markdown'}
                </button>

              </div>

            </div>
          </div>
          )}
        </div>
      )}

    </div>
  );
};

// ── Form type categories for filtering ──────────────────────────────────────
const FORM_CATEGORIES: { label: string; match: (form: string) => boolean }[] = [
  { label: '10-K',       match: f => /^10K/i.test(normalizeForm(f)) },
  { label: '10-Q',       match: f => /^10Q/i.test(normalizeForm(f)) },
  { label: '8-K',        match: f => /^8K/i.test(normalizeForm(f)) },
  { label: 'Ownership',  match: f => { const n = normalizeForm(f.toUpperCase()); return /^[345](A?)$/.test(n) || n.startsWith('SC13') || n === '144' || n === '144A'; } },
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
const HIDDEN_PREVIEW = 3;

const YearSection: React.FC<{
  year: string;
  results: MatchResult[];
  typeColors: Record<string, { bg: string; text: string }>;
  ticker: string;
  defaultOpen: boolean;
  newAccessions: Set<string>;
  dbRecords: Map<string, DbFilingRecord>;
  persistedAnalyses: Record<string, string>;
  onDismissNew?: (accession: string) => void;
  onToggleHide?: (accession: string) => void;
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ year, results, typeColors, ticker, defaultOpen, newAccessions, dbRecords, persistedAnalyses, onDismissNew, onToggleHide, onRecheck, recheckLoading }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [showAllHidden, setShowAllHidden] = useState(false);

  // Sort hidden to bottom, then by date descending
  const sorted = [...results].sort((a, b) => {
    const aHidden = dbRecords.get(a.filing.accessionNumber)?.hidden ? 1 : 0;
    const bHidden = dbRecords.get(b.filing.accessionNumber)?.hidden ? 1 : 0;
    if (aHidden !== bHidden) return aHidden - bHidden;
    return (b.filing.filingDate || '').localeCompare(a.filing.filingDate || '');
  });
  const visible = sorted.filter(r => !dbRecords.get(r.filing.accessionNumber)?.hidden);
  const hidden = sorted.filter(r => dbRecords.get(r.filing.accessionNumber)?.hidden);
  const displayedHidden = showAllHidden ? hidden : hidden.slice(0, HIDDEN_PREVIEW);
  const displayed = [...visible, ...displayedHidden];
  const remainingHidden = hidden.length - HIDDEN_PREVIEW;

  const trackedInYear = visible.filter(r => r.status === 'tracked').length;

  const renderRow = (r: MatchResult, i: number) => {
    const dbRec = dbRecords.get(r.filing.accessionNumber);
    return (
      <FilingRow key={r.filing.accessionNumber || `${year}-${i}`} r={r} typeColors={typeColors} ticker={ticker} isGenuinelyNew={newAccessions.has(r.filing.accessionNumber)} isDismissed={dbRec?.dismissed ?? false} isHidden={dbRec?.hidden ?? false} dbRecord={dbRec || null} persistedAnalysis={persistedAnalyses[r.filing.accessionNumber] || null} onDismissNew={() => onDismissNew?.(r.filing.accessionNumber)} onToggleHide={() => onToggleHide?.(r.filing.accessionNumber)} onRecheck={onRecheck} recheckLoading={recheckLoading} />
    );
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="sm-ed-year-btn"
      >
        <span className="sm-mono-md sm-text sm-fw-700 sm-ls-neg05">
          {year}
        </span>
        <span className="sm-ed-year-divider" />
        <span className="sm-mono-sm sm-text3 sm-flex sm-gap-8 sm-text-10">
          <span className="sm-mint">{trackedInYear}</span>
          <span className="sm-opacity-50">/</span>
          <span>{visible.length}{hidden.length > 0 ? ` + ${hidden.length} hidden` : ''}</span>
          <span className="sm-text-9 sm-opacity-50">{open ? '\u25B2' : '\u25BC'}</span>
        </span>
      </button>
      {open && (
        <div className="sm-flex-col">
          {displayed.map(renderRow)}
          {/* Load more / collapse for hidden filings */}
          {remainingHidden > 0 && !showAllHidden && (
            <button
              onClick={() => setShowAllHidden(true)}
              className="sm-mono-sm sm-text3 sm-w-full sm-pointer sm-transition-fast sm-ed-hidden-toggle"
            >
              + {remainingHidden} more hidden
            </button>
          )}
          {showAllHidden && hidden.length > HIDDEN_PREVIEW && (
            <button
              onClick={() => setShowAllHidden(false)}
              className="sm-mono-sm sm-text3 sm-w-full sm-pointer sm-transition-fast sm-ed-hidden-toggle"
            >
              collapse hidden
            </button>
          )}
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
  newAccessions: Set<string>;
  dbRecords: Map<string, DbFilingRecord>;
  persistedAnalyses: Record<string, string>;
  onDismissNew?: (accession: string) => void;
  onToggleHide?: (accession: string) => void;
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ results, typeColors, filter, ticker, newAccessions, dbRecords, persistedAnalyses, onDismissNew, onToggleHide, onRecheck, recheckLoading }) => {
  const filtered = applyFilter(results, filter);

  if (filtered.length === 0) {
    return (
      <div className="sm-text3 sm-text-center sm-ed-empty-msg">
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
    <div className="sm-flex-col">
      {yearGroups.map((g, i) => (
        <YearSection
          key={g.year}
          year={g.year}
          results={g.items}
          typeColors={typeColors}
          ticker={ticker}
          defaultOpen={i === 0}
          newAccessions={newAccessions}
          dbRecords={dbRecords}
          persistedAnalyses={persistedAnalyses}
          onDismissNew={onDismissNew}
          onToggleHide={onToggleHide}
          onRecheck={onRecheck}
          recheckLoading={recheckLoading}
        />
      ))}
    </div>
  );
};

// ── Filter pill (Ive×Tesla style) ────────────────────────────────────────────
const FilterPill: React.FC<{
  label: string; active: boolean; count?: number; onClick: () => void;
}> = ({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    className="sm-ed-filter-pill"
    style={{
      '--pill-color': active ? 'var(--accent)' : undefined,
      '--pill-bg': active ? 'color-mix(in srgb, var(--accent) 8%, rgba(255,255,255,0.04))' : undefined,
      '--pill-border': active ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : undefined,
    } as React.CSSProperties}
  >
    {label}
    {count !== undefined && (
      <span className="sm-ed-pill-count" data-active={active ? 'true' : 'false'}>{count}</span>
    )}
  </button>
);

// ── Main component ──────────────────────────────────────────────────────────
const SharedEdgarTab: React.FC<EdgarTabProps> = ({ ticker, companyName, localFilings, cik, typeColors, crossRefIndex }) => {
  const [edgarFilings, setEdgarFilings] = useState<EdgarFiling[]>([]);
  const [loading, setLoading] = useState(false);
  const [recheckLoading, setRecheckLoading] = useState(false);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  // Supplementary DB data (merged with static props — DB adds runtime AI-agent patches)
  const [refreshedLocalFilings, setRefreshedLocalFilings] = useState<LocalFiling[] | null>(null);
  const [refreshedCrossRefs, setRefreshedCrossRefs] = useState<Record<string, { source: string; data: string }[]> | null>(null);

  // DB records map: accessionNumber → DB row. Source of truth for DB status and NEW detection.
  const dbRecordsRef = useRef<Map<string, DbFilingRecord>>(new Map());
  const [dbRecords, setDbRecords] = useState<Map<string, DbFilingRecord>>(new Map());

  // NEW badge: filings with dismissed=false in the DB
  const [newAccessions, setNewAccessions] = useState<Set<string>>(new Set());

  // Persistent analysis cache (survives page reloads — loaded from Postgres)
  const [persistedAnalyses, setPersistedAnalyses] = useState<Record<string, string>>({});

  // Merge: props (static imports) are the primary baseline; DB adds supplementary entries.
  // This ensures code edits to sec-filings.ts are reflected without requiring a DB re-seed.
  const effectiveLocalFilings = useMemo(() => {
    if (!refreshedLocalFilings) return localFilings;
    return mergeLocalFilings(localFilings, refreshedLocalFilings);
  }, [localFilings, refreshedLocalFilings]);
  const effectiveCrossRefs = useMemo(() => {
    if (!refreshedCrossRefs) return crossRefIndex;
    return mergeCrossRefs(crossRefIndex, refreshedCrossRefs);
  }, [crossRefIndex, refreshedCrossRefs]);

  const results = useMemo(
    () => matchFilings(edgarFilings, effectiveLocalFilings, effectiveCrossRefs),
    [edgarFilings, effectiveLocalFilings, effectiveCrossRefs],
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

  // Fetch live filings from SEC EDGAR, compare with DB, save new ones
  const fetchFilings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Trigger SEC Intelligence to fetch from EDGAR and persist to DB
      const refreshRes = await fetch(
        `/api/sec-intelligence?mode=refresh&ticker=${encodeURIComponent(ticker)}&limit=200`,
        { signal: AbortSignal.timeout(30000) },
      );
      if (!refreshRes.ok) {
        const errData = await refreshRes.json().catch(() => ({}));
        throw new Error(errData.error || `SEC Intelligence refresh failed (${refreshRes.status})`);
      }

      // Step 2: Reload full DB state (includes filings persisted by SEC Intelligence)
      const dbRes = await fetch(`/api/seen-filings?ticker=${encodeURIComponent(ticker)}`);
      if (!dbRes.ok) throw new Error(`Failed to reload from DB (${dbRes.status})`);
      const dbData = await dbRes.json();
      const dbFilings: DbFilingRecord[] = dbData.filings || [];

      // Map DB records to EdgarFiling format for matchFilings
      const filings: EdgarFiling[] = dbFilings.map(f => ({
        accessionNumber: f.accessionNumber,
        filingDate: f.filingDate || '',
        form: f.form,
        primaryDocDescription: f.description || '',
        reportDate: f.reportDate || '',
        fileUrl: f.fileUrl || '',
      }));

      // Identify genuinely new filings (not dismissed in DB) → mark as NEW
      const newKeys = new Set<string>();
      const records = new Map<string, DbFilingRecord>();
      for (const f of dbFilings) {
        records.set(f.accessionNumber, f);
        if (!f.dismissed) newKeys.add(f.accessionNumber);
      }

      // Sort newest-first
      filings.sort((a, b) => (b.filingDate || '').localeCompare(a.filingDate || ''));

      setEdgarFilings(filings);
      setLoaded(true);
      setFetchedAt(Date.now());
      setNewAccessions(newKeys);

      // Update DB records ref
      dbRecordsRef.current = records;
      setDbRecords(new Map(records));

      // Step 3: Run matchFilings for status/crossRef enrichment (preserves Edgar tab data)
      const matched = matchFilings(filings, effectiveLocalFilings, effectiveCrossRefs);

      // Save enrichment (status + crossRefs) back to DB
      const toEnrich = matched
        .filter(m => m.status === 'tracked' || m.status === 'data_only')
        .map(m => ({
          accessionNumber: m.filing.accessionNumber,
          form: m.filing.form,
          filingDate: m.filing.filingDate,
          description: m.filing.primaryDocDescription,
          reportDate: m.filing.reportDate,
          fileUrl: m.filing.fileUrl,
          status: m.status,
          crossRefs: m.crossRefs || null,
        }));

      if (toEnrich.length > 0) {
        console.log(`[edgar-fetch] enriching ${toEnrich.length} filings with status/crossRefs...`);
        try {
          const saveRes = await fetch('/api/seen-filings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, filings: toEnrich }),
          });
          const saveBody = await saveRes.json().catch(() => ({}));
          if (saveRes.ok) {
            console.log('[edgar-fetch] enrichment save OK:', saveBody);
            // Update local DB records with enrichment
            for (const m of matched) {
              const existing = dbRecordsRef.current.get(m.filing.accessionNumber);
              if (existing) {
                existing.status = m.status;
                existing.crossRefs = m.crossRefs || existing.crossRefs;
              }
            }
            setDbRecords(new Map(dbRecordsRef.current));
          } else {
            console.error('[edgar-fetch] enrichment save FAILED:', saveRes.status, saveBody);
          }
        } catch (err) {
          console.error('[edgar-fetch] enrichment save error:', err);
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [ticker, effectiveLocalFilings, effectiveCrossRefs]);

  // Re-check local database from disk (picks up AI Agent patches / new cross-refs)
  const recheckDB = useCallback(async () => {
    setRecheckLoading(true);
    try {
      const localRes = await fetch('/api/edgar/refresh-local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker }),
      });
      if (localRes.ok) {
        const localData = await localRes.json();
        setRefreshedLocalFilings(localData.localFilings);
        setRefreshedCrossRefs(localData.crossRefIndex);
      }
    } catch { /* best-effort */ }
    finally { setRecheckLoading(false); }
  }, [ticker]);

  // DB-first init: load filings from database on mount (no SEC API call)
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch(`/api/seen-filings?ticker=${ticker}`);
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          console.error('[db-init] GET seen-filings failed:', res.status, errBody);
          throw new Error(`HTTP ${res.status}: ${errBody.error || 'unknown'}`);
        }
        const data = await res.json();
        const filings: DbFilingRecord[] = data.filings || [];

        if (cancelled) return;

        const edgarFromDb: EdgarFiling[] = [];
        const newKeys = new Set<string>();
        const records = new Map<string, DbFilingRecord>();

        for (const f of filings) {
          edgarFromDb.push({
            accessionNumber: f.accessionNumber,
            filingDate: f.filingDate || '',
            form: f.form,
            primaryDocDescription: f.description || '',
            reportDate: f.reportDate || '',
            fileUrl: f.fileUrl || '',
          });
          records.set(f.accessionNumber, f);
          newKeys.add(f.accessionNumber);
        }

        // Sort newest-first (by filingDate descending)
        edgarFromDb.sort((a, b) => (b.filingDate || '').localeCompare(a.filingDate || ''));

        dbRecordsRef.current = records;
        setDbRecords(new Map(records));
        setNewAccessions(newKeys);
        setEdgarFilings(edgarFromDb);
        setLoaded(edgarFromDb.length > 0);
        console.log(`[db-init] loaded ${filings.length} filings from DB (${newKeys.size} NEW)`);
      } catch (err) {
        console.error('[db-init] error:', err);
        if (!cancelled) {
          // Empty state — user can click Fetch Filings
          setLoaded(false);
        }
      }
    }

    init();
    // Always re-check local DB on mount (picks up patches applied while away)
    recheckDB();
    return () => { cancelled = true; };
  }, [ticker, recheckDB]);

  // Hydrate persisted analyses from disk on mount
  useEffect(() => {
    fetch(`/api/analysis-cache?ticker=${ticker}`)
      .then(res => res.ok ? res.json() : { edgar: {} })
      .then(data => {
        const edgarCache: Record<string, string> = {};
        for (const [key, entry] of Object.entries(data.edgar || {})) {
          edgarCache[key] = (entry as { text: string }).text;
        }
        setPersistedAnalyses(edgarCache);
      })
      .catch(() => {}); // best-effort
  }, [ticker]);

  // Acknowledge a NEW filing (click on NEW badge) — dims badge but keeps it visible
  const dismissNewFiling = useCallback((accession: string) => {
    // Update local DB record to dismissed (dims the badge from NEW to SEEN)
    const rec = dbRecordsRef.current.get(accession);
    if (rec) {
      dbRecordsRef.current.set(accession, { ...rec, dismissed: true });
      setDbRecords(new Map(dbRecordsRef.current));
    }
    // Persist dismiss to DB
    const filing = edgarFilings.find(f => f.accessionNumber === accession);
    if (filing) {
      fetch('/api/seen-filings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          filings: [{
            accessionNumber: accession,
            form: filing.form,
            filingDate: filing.filingDate,
            description: filing.primaryDocDescription,
          }],
          dismiss: true,
        }),
      }).catch(err => console.error('[dismiss] error:', err));
    }
  }, [ticker, edgarFilings]);

  // Toggle hide/unhide for a filing — persists to DB
  const toggleHideFiling = useCallback((accession: string) => {
    const rec = dbRecordsRef.current.get(accession);
    const newHidden = !(rec?.hidden ?? false);

    // Update local state
    if (rec) {
      dbRecordsRef.current.set(accession, { ...rec, hidden: newHidden });
    } else {
      // Filing not in DB records yet — create a minimal record
      const filing = edgarFilings.find(f => f.accessionNumber === accession);
      if (filing) {
        dbRecordsRef.current.set(accession, {
          accessionNumber: accession,
          form: filing.form,
          filingDate: filing.filingDate,
          description: filing.primaryDocDescription,
          reportDate: filing.reportDate || null,
          fileUrl: filing.fileUrl,
          status: null,
          crossRefs: null,
          dismissed: false,
          hidden: newHidden,
        });
      }
    }
    setDbRecords(new Map(dbRecordsRef.current));

    // Persist to DB
    const filing = edgarFilings.find(f => f.accessionNumber === accession);
    if (filing) {
      fetch('/api/seen-filings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          filings: [{
            accessionNumber: accession,
            form: filing.form,
            filingDate: filing.filingDate,
            description: filing.primaryDocDescription,
          }],
          hide: newHidden,
        }),
      }).catch(err => console.error('[hide] error:', err));
    }
  }, [ticker, edgarFilings]);

  const edgarBrowseUrl = `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`;

  return (
    <div className="sm-flex-col">
      {/* Hero — matches Sources tab */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">SEC Filings</div>
        <h2>EDGAR<span className="sm-accent">.</span></h2>
        <p>
          SEC EDGAR filings for {companyName}. Loaded from database on mount — click <b>Fetch Filings</b> to check SEC for new ones, or <b>AI</b> to analyze.
        </p>
      </div>

      {/* Status bar */}
      <div className="sm-ed-status-bar">
        <div className="sm-flex sm-gap-16">
          {/* Progress ring */}
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="none" stroke="color-mix(in srgb, var(--border) 60%, transparent)" strokeWidth="2" />
            {loaded && (
              <>
                {/* Tracked arc (mint) */}
                <circle cx="14" cy="14" r="12" fill="none" stroke="var(--mint)" strokeWidth="2"
                  strokeDasharray={`${results.length > 0 ? (trackedCount / results.length) * STATUS_RING_CIRCUMFERENCE : 0} ${STATUS_RING_CIRCUMFERENCE}`}
                  strokeLinecap="round" transform="rotate(-90 14 14)"
                  className="sm-ed-arc-transition"
                />
                {/* Data-only arc (gold), offset after tracked */}
                {dataOnlyCount > 0 && (
                  <circle cx="14" cy="14" r="12" fill="none" stroke="var(--gold)" strokeWidth="2"
                    strokeDasharray={`${(dataOnlyCount / results.length) * STATUS_RING_CIRCUMFERENCE} ${STATUS_RING_CIRCUMFERENCE}`}
                    strokeLinecap="round"
                    transform={`rotate(${-90 + (trackedCount / results.length) * 360} 14 14)`}
                    className="sm-ed-arc-transition"
                  />
                )}
              </>
            )}
          </svg>
          <div className="sm-flex-col">
            <span className="sm-text sm-fw-600 sm-ed-status-title">
              {!loaded ? 'EDGAR Monitor' : `${trackedCount} of ${results.length} in database`}
            </span>
            <span className="sm-text-11">
              {!loaded
                ? `CIK ${cik}`
                : newCount > 0 || dataOnlyCount > 0
                  ? [
                      newCount > 0 ? `${newCount} untracked` : '',
                      dataOnlyCount > 0 ? `${dataOnlyCount} data only` : '',
                    ].filter(Boolean).join(', ')
                  : 'All filings tracked'
              }
            </span>
          </div>
        </div>
        <div className="sm-flex">
          <a
            href={edgarBrowseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm-ed-action-btn sm-p-5-14 sm-gap-6"
          >
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="sm-shrink-0">
              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SEC EDGAR
          </a>
          {/* Fetch Filings — fetch from SEC EDGAR */}
          <button
            onClick={fetchFilings}
            disabled={loading}
            aria-label="Fetch EDGAR filings"
            title="Fetch filings from SEC EDGAR"
            className="sm-ed-action-btn sm-p-5-14 sm-gap-6"
            data-variant="mint"
            data-state={loading ? 'loading' : undefined}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="sm-spin-fast" data-spinning={loading ? 'true' : 'false'}>
              <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 0L10 2L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {loading ? 'Fetching...' : 'Fetch Filings'}
          </button>
          {/* Re-check — re-read local database from disk */}
          {loaded && (
            <button
              onClick={recheckDB}
              disabled={recheckLoading}
              aria-label="Re-check local database"
              title="Re-check if filings have been added to local database"
              className="sm-ed-action-btn sm-p-5-14 sm-gap-6"
              data-variant="blue"
              data-state={recheckLoading ? 'loading' : undefined}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="sm-spin-fast" data-spinning={recheckLoading ? 'true' : 'false'}>
                <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {recheckLoading ? 'Checking...' : 'Re-check DB'}
            </button>
          )}
        </div>
      </div>

      {/* Legend — 3 tiers with descriptions */}
      {loaded && (
        <div
          role="note"
          aria-label="Filing status legend"
          className="sm-ed-legend"
        >
          {(['tracked', 'data_only', 'new'] as FilingStatus[]).map(status => (
            <span key={status} title={STATUS_CONFIG[status].desc} className="sm-flex sm-gap-6 sm-ed-legend-item">
              <span className="sm-shrink-0 sm-ed-legend-dot sm-ed-legend-dot-var" style={{ '--dot-color': STATUS_CONFIG[status].color } as React.CSSProperties} />
              <span className="sm-flex-col sm-gap-1">
                <span className="sm-fw-500">{status === 'tracked' ? 'In Database' : status === 'data_only' ? 'Data Only' : 'Untracked'}</span>
                <span className="sm-ed-legend-desc">{STATUS_CONFIG[status].desc}</span>
              </span>
            </span>
          ))}
        </div>
      )}
      {/* Cross-ref criteria */}
      {loaded && (
        <div className="sm-text3 sm-ed-crossref-note">
          Cross-refs checked: capital, timeline, financials, catalysts, company, quarterly-metrics
          {' \u00B7 '}matched by accession # or closest FORM|DATE key (within 14 days)
        </div>
      )}

      {/* Error */}
      {error && (
        <div role="alert" className="sm-ed-error">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && !loaded && (
        <div className="sm-ed-loading">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="sm-spin-fast" data-spinning="true">
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="sm-subtle">Loading from database...</span>
        </div>
      )}

      {/* Filings */}
      {loaded && (
        <>
          {/* Filter pills */}
          <div className="sm-flex sm-gap-6 sm-ed-filter-wrap">
            {filterOptions.map(f => {
              const count = applyFilter(results, f).length;
              return <FilterPill key={f} label={f} active={filter === f} count={count} onClick={() => setFilter(f)} />;
            })}
          </div>

          {/* Filing list */}
          <FilingList results={results} typeColors={typeColors} filter={filter} ticker={ticker} newAccessions={newAccessions} dbRecords={dbRecords} persistedAnalyses={persistedAnalyses} onDismissNew={dismissNewFiling} onToggleHide={toggleHideFiling} onRecheck={recheckDB} recheckLoading={recheckLoading} />
        </>
      )}

      {/* ── Methodology ────────────────────────────────────────────────────── */}
      <div className="sm-ws-panel sm-mt-8">
        <div
          onClick={() => setMethodologyOpen(prev => !prev)}
          className="sm-ws-panel-header sm-pointer"
          data-open={methodologyOpen ? 'true' : 'false'}
          role="button"
          tabIndex={0}
          aria-expanded={methodologyOpen}
          aria-label="Toggle EDGAR Methodology"
          onKeyDown={(e) => e.key === 'Enter' && setMethodologyOpen(prev => !prev)}
        >
          <span className="sm-section-label sm-mb-0">Methodology</span>
          <span className="sm-text3 sm-method-toggle-icon">{methodologyOpen ? '\u2212' : '+'}</span>
        </div>
        {methodologyOpen && (
          <div className="sm-ws-panel-body sm-body-sm">
            {/* ── DB-FIRST ARCHITECTURE ────────────────────── */}
            <div className="sm-ed-method-label">DB-First Architecture</div>
            <div className="sm-flex-col sm-ed-method-flowcol">
              <div className="sm-ed-flowbox">Page loads</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox-accent">GET /api/seen-filings?ticker=X</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">ensureTable() &mdash; auto-creates seen_filings if missing</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Load saved filings from Neon PostgreSQL</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-mono-sm sm-mint sm-fw-600 sm-ed-method-highlight">Render from DB &mdash; no SEC API calls on mount</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_filings table</div>
              <div><span className="sm-text">Self-healing:</span> ensureTable() creates table + indexes on first request</div>
              <div><span className="sm-text">Graceful fallback:</span> returns empty array if table cannot be created</div>
              <div><span className="sm-text">Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites form, filingDate, description, reportDate, fileUrl; preserves dismissed, hidden, status, crossRefs</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── FILING DATA PIPELINE ──────────────────────── */}
            <div className="sm-ed-method-label">Filing Data Pipeline</div>
            <div className="sm-flex-col sm-ed-method-flowcol">
              <div className="sm-ed-flowbox-accent">Fetch Filings</div>
              <div className="sm-ed-connector" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">GET /api/sec-intelligence?mode=refresh&amp;ticker=X</div>
              <div className="sm-ed-vline sm-ed-vline-8" />
              <div className="sm-mono-sm sm-text3 sm-text-center sm-ed-method-note-sm">Routes through SEC Intelligence API &rarr; SEC EDGAR<br />(CIK via shared cik-map.ts, 30s timeout)</div>
              <div className="sm-ed-vline sm-ed-vline-8" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">SEC Intelligence persists to seen_filings (preserves status, crossRefs, dismissed, hidden)</div>
              <div className="sm-ed-vline sm-ed-vline-8" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">Reload from DB &rarr; GET /api/seen-filings?ticker=X</div>
              <div className="sm-ed-vline sm-ed-vline-8" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">matchFilings() enrichment &rarr; POST /api/seen-filings (status + crossRefs only)</div>
              <div className="sm-ed-vline sm-ed-vline-8" />
              <div className="sm-mono-sm sm-mint sm-fw-600 sm-ed-method-highlight">New filings get NEW badge (dismissed=false in DB)</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Unified fetch:</span> SEC EDGAR is only hit via /api/sec-intelligence &mdash; same path as SEC Intelligence page, no duplicate API calls</div>
              <div><span className="sm-text">CIK source:</span> shared src/lib/cik-map.ts with dynamic fallback from SEC company_tickers.json</div>
              <div><span className="sm-text">Enrichment:</span> matchFilings() runs locally after DB reload &mdash; only saves status + crossRefs for tracked/data_only filings</div>
              <div><span className="sm-text">Re-check DB:</span> re-reads sec_filings + filing_cross_refs from Postgres to pick up new patches</div>
              <div><span className="sm-text">Analysis:</span> POST /api/edgar/analyze &rarr; Claude Haiku (15K chars) &rarr; persisted to analysis_cache table</div>
              <div><span className="sm-text">Cross-refs:</span> auto-generated by ensureCrossRefPatches() if AI omits them &mdash; derived from sibling data-file patches</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── THREE-TIER MATCHING ──────────────────────── */}
            <div className="sm-ed-method-label">Three-Tier Filing Matcher</div>
            <div className="sm-flex-col sm-ed-method-flowcol">
              <div className="sm-ed-flowbox">SEC filing arrives (accessionNumber, form, filingDate)</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              {/* Tier 1a */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 1a: Accession number exact match</div>
                  <div className="sm-micro-text sm-ed-method-micro">O(1) hash lookup, strip dashes</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6 sm-ed-method-tier-result">
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--mint)' } as React.CSSProperties} /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              <div className="sm-mono-sm sm-text3 sm-text-9">No match</div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              {/* Tier 1b */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 1b: Closest form+date match</div>
                  <div className="sm-micro-text sm-ed-method-micro">nearest date within 14 days, form type normalized (PRNEWS &rarr; 8-K)</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6 sm-ed-method-tier-result">
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--mint)' } as React.CSSProperties} /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              <div className="sm-mono-sm sm-text3 sm-text-9">No match</div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              {/* Tier 2 */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 2: Cross-reference key lookup</div>
                  <div className="sm-micro-text sm-ed-method-micro">accession or FORM|YYYY-MM-DD in cross-ref index (with aliases)</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6 sm-ed-method-tier-result">
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--gold)' } as React.CSSProperties} /><span className="sm-gold sm-fw-600">DATA ONLY</span></span>
                </div>
              </div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              <div className="sm-mono-sm sm-text3 sm-text-9">No match</div>
              <div className="sm-ed-vline sm-ed-vline-6" />
              {/* Result: Untracked */}
              <div className="sm-inline-flex sm-gap-4">
                <span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--coral)' } as React.CSSProperties} />
                <span className="sm-mono-sm sm-coral sm-fw-600 sm-ed-method-result">UNTRACKED</span>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── CROSS-REFERENCE SOURCES ──────────────────── */}
            <div className="sm-ed-method-label">Cross-Reference Sources</div>
            <div className="sm-mono-sm sm-text3 sm-mb-12 sm-ed-crossref-info">
              Each filing can carry one or more cross-refs &mdash; extracted data lines written to other parts of the research database. Displayed as dimmed <span className="sm-opacity-70">{'// source → data'}</span> lines below each filing.
            </div>
            <div className="sm-flex-wrap sm-gap-12">
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700 sm-ed-card-title">capital</div>
                <div className="sm-mono-sm sm-text3 sm-ed-card-body">
                  Share offerings, debt issuances, insider transactions, institutional holdings, conversions
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700 sm-ed-card-title">timeline</div>
                <div className="sm-mono-sm sm-text3 sm-ed-card-body">
                  Key company events, board changes, material agreements, launches
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700 sm-ed-card-title">financials</div>
                <div className="sm-mono-sm sm-text3 sm-ed-card-body">
                  Quarterly results: revenue, cash, debt, operating metrics
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700 sm-ed-card-title">catalysts</div>
                <div className="sm-mono-sm sm-text3 sm-ed-card-body">
                  Milestone completions, contract awards, product launches
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700 sm-ed-card-title">company</div>
                <div className="sm-mono-sm sm-text3 sm-ed-card-body">
                  Company-level data updates (satellite counts, operational status)
                </div>
              </div>
            </div>
            <div className="sm-mono-sm sm-text3 sm-ed-crossref-footer">
              <div><span className="sm-text">Storage:</span> filing_cross_refs table &mdash; keyed by ticker + filing_key (accession or FORM|DATE)</div>
              <div><span className="sm-text">Lookup:</span> accession number first, then closest FORM|YYYY-MM-DD (within 14 days, with aliases e.g. PRNEWS &rarr; 8-K)</div>
              <div><span className="sm-text">Display:</span> shown as <span className="sm-opacity-50">{'// source → extracted data'}</span> lines below the filing row</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── AUTO CROSS-REF GENERATION ──────────────────── */}
            <div className="sm-ed-method-label">Auto Cross-Ref Generation</div>
            <div className="sm-mono-sm sm-text3 sm-mb-12 sm-ed-crossref-info">
              Cross-refs are generated <span className="sm-text">automatically</span> when the AI Agent adds a new filing. Two-layer enforcement ensures no filing entry is created without a matching cross-ref.
            </div>
            <div className="sm-flex-col sm-ed-method-flowcol">
              <div className="sm-ed-flowbox-accent">AI Agent generates patches</div>
              <div className="sm-ed-vline sm-ed-vline-10" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">Layer 1: Prompt enforcement</div>
              <div className="sm-mono-sm sm-text3 sm-text-center sm-ed-method-note-sm sm-ed-method-note-narrow">MANDATORY rule in extraction prompt &mdash; Claude must produce FILING_CROSS_REFS patch for every new sec-filings.ts entry</div>
              <div className="sm-ed-vline sm-ed-vline-10" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">Layer 2: Post-AI safety net</div>
              <div className="sm-mono-sm sm-text3 sm-text-center sm-ed-method-note-sm sm-ed-method-note-narrow">ensureCrossRefPatches() scans patches after Claude responds &mdash; detects filing inserts missing a cross-ref and auto-generates one from sibling patches</div>
              <div className="sm-ed-vline sm-ed-vline-10" />
              <div className="sm-ed-flowbox sm-ed-flowbox-sm">Cross-ref key: FORM_TYPE|YYYY-MM-DD</div>
              <div className="sm-ed-vline sm-ed-vline-10" />
              <div className="sm-mono-sm sm-mint sm-fw-600 sm-ed-method-highlight">Cross-ref appears in preview &amp; gets applied with patches</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Source derivation:</span> capital.ts &rarr; capital, financials.ts &rarr; financials, timeline.ts &rarr; timeline, catalysts.ts &rarr; catalysts, company.ts &rarr; company</div>
              <div><span className="sm-text">Summary extraction:</span> description/event/title fields from sibling patches, or first 120 chars cleaned up</div>
              <div><span className="sm-text">Dedup:</span> skips if Claude already generated the cross-ref, or if key exists in file</div>
              <div><span className="sm-text">Stock-agnostic:</span> derives paths and anchors from ticker &mdash; works for any stock with FILING_CROSS_REFS</div>
              <div><span className="sm-text">Preview tag:</span> auto-generated patches marked as <span className="sm-opacity-70">[auto-generated cross-ref]</span> in diff view</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── NEW FILING DETECTION ──────────────────────── */}
            <div className="sm-ed-method-label">New Filing Detection</div>
            <div className="sm-flex-col sm-ed-method-flowcol">
              <div className="sm-ed-flowbox-accent">Fetch Filings</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Compare accessionNumber against DB records</div>
              <div className="sm-ed-vline sm-ed-vline-12" />
              <div className="sm-ed-flowbox">Already in DB?</div>
              <div className="sm-flex sm-mt-8 sm-ed-method-branch">
                <div className="sm-flex-col sm-ed-method-branch-col">
                  <div className="sm-mono-sm sm-text3 sm-text-9">Yes</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-mono-sm sm-text3 sm-text-10">Upsert (update metadata + status)</div>
                </div>
                <div className="sm-flex-col sm-ed-method-branch-col">
                  <div className="sm-mono-sm sm-text3 sm-text-9">No</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-ed-flowbox">Save to DB (dismissed=false)</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-mono-sm sm-sky sm-fw-600 sm-ed-method-highlight">NEW badge</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-mono-sm sm-text3 sm-text-9">User clicks NEW</div>
                  <div className="sm-ed-vline sm-ed-vline-8" />
                  <div className="sm-mono-sm sm-sky sm-fw-600 sm-ed-method-highlight sm-opacity-30">SEEN badge</div>
                </div>
              </div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">On mount:</span> loads filings from DB only &mdash; no SEC API calls</div>
              <div><span className="sm-text">Fetch Filings:</span> fetches from SEC EDGAR, matches, saves all to DB</div>
              <div><span className="sm-text">NEW badge:</span> bright clickable badge &mdash; filing not yet acknowledged</div>
              <div><span className="sm-text">SEEN badge:</span> dimmed label after user clicks NEW &rarr; sets dismissed=true in DB</div>
              <div><span className="sm-text">Persistence:</span> both NEW and SEEN survive page reloads &amp; work cross-device</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── DB STATUS INDICATORS ──────────────────────── */}
            <div className="sm-ed-method-label">DB Status Indicators</div>
            <div className="sm-flex-wrap sm-gap-20">
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6 sm-ed-db-status-header">
                  <span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--mint)' } as React.CSSProperties} />
                  <span className="sm-mono-sm sm-mint sm-fw-700 sm-text-10">MINT DB</span>
                </div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Filing is in DB and current status is TRACKED (matched in sec-filings.ts).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6 sm-ed-db-status-header">
                  <span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--gold)' } as React.CSSProperties} />
                  <span className="sm-mono-sm sm-gold sm-fw-700 sm-text-10">GOLD DB</span>
                </div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Filing is in DB and current status is DATA ONLY (cross-refs exist but not in sec-filings.ts).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6 sm-ed-db-status-header">
                  <span className="sm-ed-color-dot" style={{ '--dot-color': 'var(--coral)' } as React.CSSProperties} />
                  <span className="sm-mono-sm sm-coral sm-fw-700 sm-text-10">CORAL DB</span>
                </div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Filing is in DB but current status is UNTRACKED (no index entry, no cross-refs).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6 sm-ed-db-status-header">
                  <span className="sm-ed-color-dot sm-opacity-30" style={{ '--dot-color': 'var(--text3)' } as React.CSSProperties} />
                  <span className="sm-mono-sm sm-text3 sm-fw-700 sm-text-10 sm-opacity-50">GRAY DB</span>
                </div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Not in seen_filings table. Click Fetch Filings to populate.
                </div>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── BUTTON DISTINCTION ──────────────────────── */}
            <div className="sm-ed-method-label">Button Distinction: Fetch Filings vs Re-check DB</div>
            <div className="sm-flex-wrap sm-gap-20">
              <div className="sm-ed-info-card-xl">
                <div className="sm-mono-sm sm-fw-700 sm-ed-info-card-title sm-ed-title-mint">FETCH FILINGS</div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Calls SEC EDGAR API. Fetches latest filings, matches against local DB,
                  saves all to seen_filings with full metadata. New filings get NEW badge.
                </div>
              </div>
              <div className="sm-ed-info-card-xl">
                <div className="sm-mono-sm sm-fw-700 sm-ed-info-card-title sm-ed-title-sky">RE-CHECK DB</div>
                <div className="sm-mono-sm sm-text3 sm-ed-info-card-body">
                  Re-reads sec_filings + filing_cross_refs from Postgres.
                  Picks up new tracked entries or cross-refs added by AI Agent patches.
                  Does not call SEC EDGAR API. Changes filing status dots.
                </div>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── PERSISTED DATA ──────────────────────── */}
            <div className="sm-ed-method-label">What Gets Persisted to DB</div>
            <div className="sm-mono-sm sm-text3 sm-ed-persisted-text">
              <div><span className="sm-text">seen_filings:</span> accession_number, form, filing_date, description, report_date, file_url, status, cross_refs (JSON), dismissed</div>
              <div><span className="sm-text">analysis_cache:</span> ticker + &quot;edgar&quot; + accession_number &rarr; analysis text (successful only)</div>
              <div><span className="sm-text">sec_filings:</span> tracked filings from research database (populated by AI Agent / db/setup)</div>
              <div><span className="sm-text">filing_cross_refs:</span> cross-reference data linking filings to capital, timeline, financials, catalysts</div>
              <div className="sm-coral sm-ed-persisted-note">No sessionStorage. No in-memory caches. Everything in Postgres.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedEdgarTab;
