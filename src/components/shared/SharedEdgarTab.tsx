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

export interface EdgarTabProps {
  ticker: string;
  companyName: string;
  localFilings: LocalFiling[];
  cik: string;
  typeColors: Record<string, { bg: string; text: string }>;
  /** Cross-reference index: maps accession number OR "FORM|YYYY-MM-DD" to data captured in other files */
  crossRefIndex?: Record<string, { source: string; data: string }[]>;
}

export interface LocalFiling {
  date: string;
  type: string;
  description: string;
  period: string;
  color?: string;
  /** SEC accession number — the authoritative unique identifier for exact matching */
  accessionNumber?: string;
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
function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // Handle date ranges like "Sep 3-15, 2025" or "Mar 17-18, 2025" — use start date
  const rangeMatch = dateStr.match(/^(\w+ \d+)-\d+, (\d{4})$/);
  if (rangeMatch) {
    const d = new Date(`${rangeMatch[1]}, ${rangeMatch[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
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

/** Normalize accession number by stripping dashes for comparison */
const normalizeAccession = (a: string) => a.replace(/-/g, '');

/**
 * Look up cross-refs by accession number first, then by form|date (legacy).
 * Accession-number keys have no pipe; form|date keys contain a pipe separator.
 * Legacy fallback uses closest-date matching (within MAX_LEGACY_MATCH_DAYS)
 * instead of a fixed ±N day window, so it works regardless of when data is entered.
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

  // Fallback: closest-date match among form|date keys of the same form type
  const lookupNorm = normalizeFormForMatch(form);
  let bestValue: { source: string; data: string }[] | undefined;
  let bestDays = Infinity;
  for (const [key, value] of Object.entries(index)) {
    const pipeIdx = key.indexOf('|');
    if (pipeIdx === -1) continue;
    const keyForm = key.slice(0, pipeIdx);
    const keyDate = key.slice(pipeIdx + 1);
    if (normalizeFormForMatch(keyForm) !== lookupNorm) continue;
    const days = daysBetween(isoDate, keyDate);
    if (days < bestDays) {
      bestDays = days;
      bestValue = value;
    }
  }
  if (bestValue && bestDays <= MAX_LEGACY_MATCH_DAYS) {
    return bestValue;
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

  return edgarFilings.map(ef => {
    const edgarAccNorm = normalizeAccession(ef.accessionNumber);
    const edgarDate = normalizeDate(ef.filingDate);
    const edgarForm = normalizeFormForMatch(ef.form);

    // Tier 1a: exact accession number match
    let match = accessionMap.get(edgarAccNorm);

    // Tier 1b: closest-date match among legacy entries of the same form type
    if (!match) {
      let bestDays = Infinity;
      for (const lf of legacyFilings) {
        if (normalizeFormForMatch(lf.type) !== edgarForm) continue;
        const days = daysBetween(edgarDate, normalizeDate(lf.date));
        if (days < bestDays) {
          bestDays = days;
          match = lf;
        }
      }
      if (bestDays > MAX_LEGACY_MATCH_DAYS) match = undefined;
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
  const isAccent = variant === 'accent' || active;
  const dynamicStyle: React.CSSProperties = {
    '--ed-btn-color': active ? 'var(--accent)' : isAccent ? 'rgba(130,200,130,0.5)' : undefined,
    borderColor: active ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : isAccent ? 'rgba(130,200,130,0.15)' : undefined,
    cursor: loading ? 'wait' : undefined,
    opacity: loading ? 0.5 : 1,
  } as React.CSSProperties;
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="sm-ed-action-btn-sm" style={dynamicStyle}>{label}</a>;
  }
  return <button onClick={onClick} disabled={loading} title={title} className="sm-ed-action-btn-sm" style={dynamicStyle}>{loading ? '...' : label}</button>;
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
  const [applyStep, setApplyStep] = useState<"idle" | "previewing" | "previewed" | "applying" | "applied" | "error">("idle");
  const [applyError, setApplyError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patchPreview, setPatchPreview] = useState<any>(null);
  const [commitStatus, setCommitStatus] = useState<"idle" | "committing" | "done" | "error">("idle");
  const [commitMessage, setCommitMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  const formDisplay = displayFormName(r.filing.form);
  const colors = typeColors[r.filing.form] || typeColors[formDisplay] || { bg: 'var(--surface2)', text: 'var(--text3)' };
  const statusCfg = STATUS_CONFIG[r.status];

  // Hidden filings: collapsed single-line with low opacity and unhide button
  if (isHidden) {
    return (
      <div className="sm-ed-hidden-row">
        <div className="sm-flex sm-gap-8 sm-p-3-12 sm-rounded-6">
          <span className="sm-ed-form-badge sm-text-9 sm-p-1-6 sm-rounded-4" style={{
            width: 'auto',
            '--badge-bg': colors.bg, '--badge-text': colors.text,
          } as React.CSSProperties}>
            {formDisplay}
          </span>
          <span className="sm-subtle-sm" style={{
            flex: 1, minWidth: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            textDecoration: 'line-through',
          }}>
            {r.filing.primaryDocDescription || r.filing.form}
          </span>
          {r.filing.filingDate && (
            <span className="sm-subtle-sm sm-shrink-0" style={{ fontFamily: 'Space Mono, monospace', fontSize: 10 }}>
              {formatEdgarDate(r.filing.filingDate)}
            </span>
          )}
          <span className="sm-text3 sm-shrink-0" style={{ fontSize: 8, fontFamily: 'Space Mono, monospace', textTransform: 'uppercase' }}>hidden</span>
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
    setApplyStep("idle");
    setApplyError("");
    setPatchPreview(null);
    setCommitStatus("idle");
    setCommitMessage("");
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

  const handlePreview = async () => {
    if (!analysis) return;
    setApplyStep("previewing");
    setApplyError("");
    setPatchPreview(null);
    try {
      const res = await fetch("/api/workflow/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: "edgar-filing-analyzer", analysis, dryRun: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApplyStep("error");
        setApplyError(data.error || "Preview failed");
        return;
      }
      setPatchPreview(data);
      setApplyStep(data.patchCount === 0 ? "idle" : "previewed");
      if (data.patchCount === 0) setApplyError(data.summary || "No changes to apply");
    } catch (err) {
      setApplyStep("error");
      setApplyError((err as Error).message);
    }
  };

  const handleConfirmApply = async () => {
    if (!patchPreview?.patches?.length) return;
    setApplyStep("applying");
    setApplyError("");
    try {
      const res = await fetch("/api/workflow/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: "edgar-filing-analyzer", dryRun: false, patches: patchPreview.patches }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApplyStep("error");
        setApplyError(data.error || "Apply failed");
        return;
      }
      setApplyStep("applied");
      setPatchPreview((prev: typeof patchPreview) => ({ ...prev, applySummary: data.summary }));
    } catch (err) {
      setApplyStep("error");
      setApplyError((err as Error).message);
    }
  };

  const handleCancelPreview = () => {
    setApplyStep("idle");
    setPatchPreview(null);
    setApplyError("");
  };

  const handleCommit = async () => {
    if (!analysis) return;
    setCommitStatus("committing");
    setCommitMessage("");
    try {
      const res = await fetch("/api/workflow/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: "edgar-filing-analyzer", analysis }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommitStatus("error");
        setCommitMessage(data.error || "Commit failed");
        return;
      }
      setCommitStatus("done");
      setCommitMessage(data.message || "Committed");
    } catch (err) {
      setCommitStatus("error");
      setCommitMessage((err as Error).message);
    }
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
              style={{
                transition: 'transform 0.2s',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
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
              <span style={{ position: 'relative' }} className="sm-shrink-0">
                <button
                  type="button"
                  aria-label="Show database record"
                  className="sm-ed-db-btn"
                  style={{ '--db-color': dbColor, '--db-opacity': dbOpacity } as React.CSSProperties}
                  onFocus={handleDbHoverEnter}
                  onBlur={handleDbHoverLeave}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: dbColor }} />
                  DB
                </button>
                {/* Tooltip — shows live DB data */}
                {dbTooltipVisible && (
                  <div ref={dbTooltipRef} className="sm-ed-db-tooltip">
                    <div className="sm-micro-label" style={{ marginBottom: 6, paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
                      Saved in seen_filings DB?
                    </div>
                    {dbTooltipLoading ? (
                      <div className="sm-text3" style={{ fontStyle: 'italic' }}>Fetching from database...</div>
                    ) : dbTooltip ? (
                      <>
                        <div><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>status:</span> <span style={{ color: statusCfg.color }} className="sm-fw-600">{dbTooltip.status}</span></div>
                        <div><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>form:</span> {dbTooltip.form}</div>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>desc:</span> {dbTooltip.description}</div>
                        <div><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>filed:</span> {dbTooltip.filingDate}</div>
                        <div><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>cross-refs:</span> {dbTooltip.crossRefs ? [...new Set(dbTooltip.crossRefs.map(r => r.source))].join(', ') : 'none'}</div>
                        <div><span className="sm-text3" style={{ minWidth: 80, display: 'inline-block' }}>seen:</span> <span className="sm-fw-600" style={{ color: dbTooltip.seen === 'NO' ? 'var(--sky)' : 'var(--text3)' }}>{dbTooltip.seen}</span></div>
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
                style={{
                  '--ed-btn-color': recheckLoading ? 'var(--text3)' : 'rgba(130,180,220,0.5)',
                  borderColor: recheckLoading ? 'var(--border)' : 'rgba(130,180,220,0.15)',
                  cursor: recheckLoading ? 'wait' : undefined,
                  opacity: recheckLoading ? 0.5 : 1,
                } as React.CSSProperties}
              >
                <svg width={11} height={11} viewBox="0 0 16 16" fill="none" style={{ animation: recheckLoading ? 'spin 0.8s linear infinite' : 'none' }}>
                  <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M13 11l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <button
              onClick={() => onToggleHide?.()}
              title="Hide filing"
              className="sm-ed-action-btn-sm"
              style={{ opacity: 0.5 }}
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
        <div style={{ padding: '0 12px 12px' }}>
          {/* Verdict badge */}
          {(() => {
            const verdict = parseVerdict(analysis);
            if (!verdict) return null;
            const vc = VERDICT_COLORS[verdict.level];
            return (
              <div className="sm-ed-verdict-badge sm-inline-flex sm-rounded-4" style={{
                margin: '12px 0 0 7px',
                fontSize: 9, letterSpacing: '0.08em', padding: '3px 8px',
                '--verdict-color': vc.color, '--verdict-bg': vc.bg,
              } as React.CSSProperties}>
                {verdict.level}
                <span className="sm-fw-400" style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.7, fontSize: 10 }}>
                  {verdict.explanation}
                </span>
              </div>
            );
          })()}
          <AnalysisPanel text={stripVerdict(analysis)} />
          {/* ── Database Action Toolbar ── */}
          {!analyzing && (
          <div style={{ margin: '8px 0 2px 7px' }}>
            <div className="sm-mt-8 sm-border-t" style={{ paddingTop: 8 }}>
              <div className="sm-flex-wrap" style={{ alignItems: 'center' }}>
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
                  data-state={copied ? 'success' : undefined}
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  {copied ? 'Copied' : 'Copy Markdown'}
                </button>

                {/* 3. Preview Changes / Applied indicator */}
                {applyStep === 'applied' ? (
                  <span className="sm-ed-action-btn" data-state="success">
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Applied
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handlePreview}
                    disabled={applyStep === 'previewing' || applyStep === 'previewed' || applyStep === 'applying'}
                    className="sm-ed-action-btn"
                    style={{
                      '--ed-btn-color': applyStep === 'previewing'
                        ? 'var(--text3)'
                        : applyStep === 'error'
                          ? 'var(--coral)'
                          : 'rgba(130,200,130,0.5)',
                      borderColor: applyStep === 'error'
                        ? 'color-mix(in srgb, var(--coral) 25%, transparent)'
                        : 'rgba(130,200,130,0.15)',
                      opacity: applyStep === 'previewing' ? 0.6 : 1,
                    } as React.CSSProperties}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                    {applyStep === 'previewing'
                      ? 'Extracting patches...'
                      : applyStep === 'error'
                        ? 'Retry Preview'
                        : 'Preview Changes'}
                  </button>
                )}

                {/* 4. Create Commit */}
                <button
                  type="button"
                  onClick={handleCommit}
                  disabled={commitStatus === 'committing' || commitStatus === 'done' || applyStep !== 'applied'}
                  className="sm-ed-action-btn"
                  style={{
                    '--ed-btn-color': commitStatus === 'done'
                      ? 'var(--mint)'
                      : commitStatus === 'error'
                        ? 'var(--coral)'
                        : applyStep !== 'applied'
                          ? 'var(--text3)'
                          : 'rgba(168,130,230,0.5)',
                    borderColor: commitStatus === 'done'
                      ? 'rgba(130,200,130,0.15)'
                      : applyStep !== 'applied'
                        ? undefined
                        : 'rgba(168,130,230,0.15)',
                    opacity: applyStep !== 'applied' ? 0.3 : commitStatus === 'committing' ? 0.6 : 1,
                  } as React.CSSProperties}
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx={12} cy={12} r={4} />
                    <line x1={1.05} y1={12} x2={7} y2={12} />
                    <line x1={17.01} y1={12} x2={22.96} y2={12} />
                  </svg>
                  {commitStatus === 'committing'
                    ? 'Committing...'
                    : commitStatus === 'done'
                      ? 'Committed'
                      : 'Create Commit'}
                </button>

                {/* Status messages */}
                {applyError && (
                  <span style={{ fontSize: 10, color: applyStep === 'error' ? 'var(--coral)' : 'var(--text3)', marginLeft: 4 }}>
                    {applyError}
                  </span>
                )}
                {patchPreview?.applySummary && applyStep === 'applied' && (
                  <span className="sm-text3" style={{ fontSize: 10, marginLeft: 4 }}>
                    {patchPreview.applySummary}
                  </span>
                )}
                {commitMessage && (
                  <span style={{ fontSize: 10, color: commitStatus === 'error' ? 'var(--coral)' : 'var(--text3)', marginLeft: 4 }}>
                    {commitMessage}
                  </span>
                )}
              </div>

              {/* ── Diff Preview Panel ── */}
              {applyStep === 'previewed' && patchPreview && (
                <div className="sm-ed-diff-panel">

                  {/* Header */}
                  <div
                    className="sm-flex-between"
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(234,179,8,0.1)',
                    }}
                  >
                    <div>
                      <span className="sm-fw-600" style={{ fontSize: 11, color: 'rgba(234,179,8,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Patch Preview
                      </span>
                      <span className="sm-text3" style={{ fontSize: 10, marginLeft: 12 }}>
                        {patchPreview.summary}
                      </span>
                    </div>
                  </div>

                  {/* Per-file diffs */}
                  <div className="sm-scrollbox-med">
                    {patchPreview.previews?.map((p: { file: string; action: string; valid: boolean; detail: string; diff: string; linesAdded: number }, i: number) => (
                      <div key={i} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined, padding: '10px 16px' }}>
                        <div className="sm-flex" style={{ marginBottom: 6 }}>
                          <span
                            style={{
                              fontSize: 10,
                              fontFamily: 'var(--font-mono, monospace)',
                              color: p.valid ? 'var(--text2)' : 'var(--coral)',
                              fontWeight: 500,
                            }}
                          >
                            {p.file}
                          </span>
                          <span
                            style={{
                              fontSize: 8,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              padding: '1px 5px',
                              borderRadius: 3,
                              background: p.valid ? 'rgba(130,200,130,0.1)' : 'rgba(255,100,100,0.1)',
                              color: p.valid ? 'rgba(130,200,130,0.6)' : 'var(--coral)',
                              border: `1px solid ${p.valid ? 'rgba(130,200,130,0.15)' : 'rgba(255,100,100,0.15)'}`,
                            }}
                          >
                            {p.action} {p.valid ? `+${p.linesAdded}` : 'rejected'}
                          </span>
                        </div>
                        {p.valid && p.diff ? (
                          <pre className="sm-ed-diff-pre">
                            {p.diff.split('\n').map((line: string, li: number) => (
                              <span
                                key={li}
                                className={
                                  line.startsWith('+') && !line.startsWith('+++')
                                    ? 'sm-ed-diff-add'
                                    : line.startsWith('-') && !line.startsWith('---')
                                      ? 'sm-ed-diff-del'
                                      : line.startsWith('@@')
                                        ? 'sm-ed-diff-hunk'
                                        : undefined
                                }
                              >
                                {line}
                              </span>
                            ))}
                          </pre>
                        ) : !p.valid ? (
                          <span className="sm-coral" style={{ fontSize: 10, opacity: 0.7 }}>{p.detail}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  {/* Warning + action buttons */}
                  <div
                    className="sm-flex-between"
                    style={{
                      padding: '12px 16px',
                      borderTop: '1px solid rgba(234,179,8,0.1)',
                    }}
                  >
                    <span className="sm-fw-500" style={{ fontSize: 9, color: 'rgba(234,179,8,0.5)', letterSpacing: '0.05em' }}>
                      Review carefully — these changes will be written to the database
                    </span>
                    <div className="sm-flex sm-gap-8">
                      <button
                        type="button"
                        onClick={handleCancelPreview}
                        className="sm-ed-action-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmApply}
                        disabled={!patchPreview.validCount}
                        className="sm-ed-action-btn"
                        style={{
                          '--ed-btn-color': patchPreview.validCount ? 'rgba(234,179,8,0.8)' : 'var(--text3)',
                          borderColor: patchPreview.validCount ? 'rgba(234,179,8,0.3)' : undefined,
                          fontWeight: 600,
                          opacity: patchPreview.validCount ? 1 : 0.4,
                        } as React.CSSProperties}
                      >
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Confirm &amp; Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Applying spinner */}
              {applyStep === 'applying' && (
                <div className="sm-flex sm-mt-12">
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(234,179,8,0.5)', animation: 'pulse 2s infinite' }} />
                  <span className="sm-text3 sm-fw-500" style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Writing patches to database...
                  </span>
                </div>
              )}
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
        <span className="sm-mono-md sm-text sm-fw-700" style={{ letterSpacing: '-0.5px' }}>
          {year}
        </span>
        <span style={{ flex: 1, height: 1, background: 'color-mix(in srgb, var(--border) 50%, transparent)' }} />
        <span className="sm-mono-sm sm-text3 sm-flex sm-gap-8" style={{ fontSize: 10 }}>
          <span className="sm-mint">{trackedInYear}</span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{visible.length}{hidden.length > 0 ? ` + ${hidden.length} hidden` : ''}</span>
          <span style={{ fontSize: 9, opacity: 0.5 }}>{open ? '\u25B2' : '\u25BC'}</span>
        </span>
      </button>
      {open && (
        <div className="sm-flex-col">
          {displayed.map(renderRow)}
          {/* Load more / collapse for hidden filings */}
          {remainingHidden > 0 && !showAllHidden && (
            <button onClick={() => setShowAllHidden(true)} className="sm-show-more-btn">
              + {remainingHidden} more hidden
            </button>
          )}
          {showAllHidden && hidden.length > HIDDEN_PREVIEW && (
            <button onClick={() => setShowAllHidden(false)} className="sm-show-more-btn">
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
      <div className="sm-text3 sm-text-center" style={{ fontSize: 13, padding: '24px 0', lineHeight: 1.6 }}>
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
    data-active={active ? 'true' : undefined}
  >
    {label}
    {count !== undefined && (
      <span className="sm-pill-count">{count}</span>
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

  // Refreshed local data (read from disk, bypassing bundler cache)
  const [refreshedLocalFilings, setRefreshedLocalFilings] = useState<LocalFiling[] | null>(null);
  const [refreshedCrossRefs, setRefreshedCrossRefs] = useState<Record<string, { source: string; data: string }[]> | null>(null);

  // DB records map: accessionNumber → DB row. Source of truth for DB status and NEW detection.
  const dbRecordsRef = useRef<Map<string, DbFilingRecord>>(new Map());
  const [dbRecords, setDbRecords] = useState<Map<string, DbFilingRecord>>(new Map());

  // NEW badge: filings with dismissed=false in the DB
  const [newAccessions, setNewAccessions] = useState<Set<string>>(new Set());

  // Persistent analysis cache (survives page reloads — loaded from Postgres)
  const [persistedAnalyses, setPersistedAnalyses] = useState<Record<string, string>>({});

  const effectiveLocalFilings = refreshedLocalFilings ?? localFilings;
  const effectiveCrossRefs = refreshedCrossRefs ?? crossRefIndex;

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
      const res = await fetch(`/api/edgar/${ticker}`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch (${res.status})`);
      }
      const data = await res.json();
      const filings: EdgarFiling[] = data.filings || [];

      // Identify genuinely new filings (not in DB yet) → mark as NEW
      const newKeys = new Set<string>();
      for (const f of filings) {
        if (!dbRecordsRef.current.has(f.accessionNumber)) newKeys.add(f.accessionNumber);
      }

      setEdgarFilings(filings);
      setLoaded(true);
      setFetchedAt(Date.now());

      // Mark new filings
      if (newKeys.size > 0) {
        setNewAccessions(prev => {
          const next = new Set(prev);
          for (const k of newKeys) next.add(k);
          return next;
        });
      }

      // Match filings against local DB to determine status
      const matched = matchFilings(filings, effectiveLocalFilings, effectiveCrossRefs);

      // Save ALL fetched filings to DB with full metadata (upsert fixes legacy data)
      const allToSave = matched.map(m => ({
        accessionNumber: m.filing.accessionNumber,
        form: m.filing.form,
        filingDate: m.filing.filingDate,
        description: m.filing.primaryDocDescription,
        reportDate: m.filing.reportDate,
        fileUrl: m.filing.fileUrl,
        status: m.status,
        crossRefs: m.crossRefs || null,
      }));

      if (allToSave.length > 0) {
        console.log(`[edgar-fetch] saving ${allToSave.length} filings to DB (${newKeys.size} NEW)...`);
        try {
          const saveRes = await fetch('/api/seen-filings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, filings: allToSave }),
          });
          const saveBody = await saveRes.json().catch(() => ({}));
          if (saveRes.ok) {
            console.log('[edgar-fetch] save OK:', saveBody);
            // Update local DB records
            for (const m of matched) {
              const rec: DbFilingRecord = {
                accessionNumber: m.filing.accessionNumber,
                form: m.filing.form,
                filingDate: m.filing.filingDate,
                description: m.filing.primaryDocDescription,
                reportDate: m.filing.reportDate,
                fileUrl: m.filing.fileUrl,
                status: m.status,
                crossRefs: m.crossRefs || null,
                dismissed: newKeys.has(m.filing.accessionNumber) ? false : (dbRecordsRef.current.get(m.filing.accessionNumber)?.dismissed ?? true),
                hidden: dbRecordsRef.current.get(m.filing.accessionNumber)?.hidden ?? false,
              };
              dbRecordsRef.current.set(m.filing.accessionNumber, rec);
            }
            setDbRecords(new Map(dbRecordsRef.current));
          } else {
            console.error('[edgar-fetch] save FAILED:', saveRes.status, saveBody);
          }
        } catch (err) {
          console.error('[edgar-fetch] save error:', err);
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
          <div className="sm-flex-col">
            <span className="sm-text sm-fw-600" style={{ fontSize: 13 }}>
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
            className="sm-ed-action-btn"
            style={{ padding: '5px 14px', gap: 6 }}
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
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
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
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
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
            <span key={status} title={STATUS_CONFIG[status].desc} className="sm-flex sm-gap-6" style={{ alignItems: 'flex-start', maxWidth: 260 }}>
              <span className="sm-shrink-0" style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_CONFIG[status].color, opacity: 0.9, marginTop: 3 }} />
              <span className="sm-flex-col" style={{ gap: 1 }}>
                <span className="sm-fw-500">{status === 'tracked' ? 'In Database' : status === 'data_only' ? 'Data Only' : 'Untracked'}</span>
                <span style={{ fontSize: 9, opacity: 0.5, lineHeight: 1.4 }}>{STATUS_CONFIG[status].desc}</span>
              </span>
            </span>
          ))}
        </div>
      )}
      {/* Cross-ref criteria */}
      {loaded && (
        <div className="sm-text3" style={{
          fontSize: 9, opacity: 0.4, padding: '0 4px 8px',
          fontFamily: 'Space Mono, monospace', lineHeight: 1.6,
        }}>
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="sm-subtle">Loading from database...</span>
        </div>
      )}

      {/* Filings */}
      {loaded && (
        <>
          {/* Filter pills */}
          <div className="sm-flex sm-gap-6" style={{ padding: '8px 0 16px', flexWrap: 'wrap' }}>
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
          <span className="sm-section-label" style={{ marginBottom: 0 }}>Methodology</span>
          <span className="sm-text3" style={{ fontSize: 18 }}>{methodologyOpen ? '\u2212' : '+'}</span>
        </div>
        {methodologyOpen && (
          <div className="sm-ws-panel-body sm-body-sm">
            {/* ── DB-FIRST ARCHITECTURE ────────────────────── */}
            <div className="sm-ed-method-label">DB-First Architecture</div>
            <div className="sm-flex-col" style={{ alignItems: 'center' }}>
              <div className="sm-ed-flowbox">Page loads</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-ed-flowbox-accent">GET /api/seen-filings?ticker=X</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-ed-flowbox">ensureTable() &mdash; auto-creates seen_filings if missing</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-ed-flowbox">Load saved filings from Neon PostgreSQL</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-mono-sm sm-mint sm-fw-600" style={{ padding: '4px 10px', fontSize: 10 }}>Render from DB &mdash; no SEC API calls on mount</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_filings table</div>
              <div><span className="sm-text">Self-healing:</span> ensureTable() creates table + indexes on first request</div>
              <div><span className="sm-text">Graceful fallback:</span> returns empty array if table cannot be created</div>
              <div><span className="sm-text">Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites form, filingDate, description, reportDate, fileUrl, status, crossRefs</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── FILING DATA PIPELINE ──────────────────────── */}
            <div className="sm-ed-method-label">Filing Data Pipeline</div>
            <div className="sm-flex-col" style={{ alignItems: 'center' }}>
              <div className="sm-ed-flowbox-accent">Fetch Filings</div>
              <div style={{ width: 2, height: 10, background: 'var(--sky)' }} />
              <div className="sm-ed-flowbox" style={{ padding: '5px 12px', fontSize: 10 }}>GET /api/edgar/[ticker]</div>
              <div className="sm-ed-vline" style={{ height: 8 }} />
              <div className="sm-mono-sm sm-text3 sm-text-center" style={{ fontSize: 9, lineHeight: 1.6 }}>SEC EDGAR submissions API<br />(CIK-based, paginated, 15s timeout)</div>
              <div className="sm-ed-vline" style={{ height: 8 }} />
              <div className="sm-ed-flowbox" style={{ padding: '5px 12px', fontSize: 10 }}>Match against sec_filings + filing_cross_refs</div>
              <div className="sm-ed-vline" style={{ height: 8 }} />
              <div className="sm-ed-flowbox" style={{ padding: '5px 12px', fontSize: 10 }}>POST /api/seen-filings &mdash; upsert all with status + crossRefs</div>
              <div className="sm-ed-vline" style={{ height: 8 }} />
              <div className="sm-mono-sm sm-mint sm-fw-600" style={{ padding: '4px 10px', fontSize: 10 }}>New filings get NEW badge (dismissed=false)</div>
            </div>
            <div className="sm-ed-method-text sm-mt-12">
              <div><span className="sm-text">Save path:</span> POST /api/seen-filings &rarr; upsert with status, crossRefs, form, filingDate, description, reportDate, fileUrl</div>
              <div><span className="sm-text">Re-check DB:</span> re-reads sec_filings + filing_cross_refs from Postgres to pick up new patches</div>
              <div><span className="sm-text">Analysis:</span> POST /api/edgar/analyze &rarr; Claude Haiku (15K chars) &rarr; persisted to analysis_cache table</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── THREE-TIER MATCHING ──────────────────────── */}
            <div className="sm-ed-method-label">Three-Tier Filing Matcher</div>
            <div className="sm-flex-col" style={{ alignItems: 'center' }}>
              <div className="sm-ed-flowbox">SEC filing arrives (accessionNumber, form, filingDate)</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              {/* Tier 1a */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 1a: Accession number exact match</div>
                  <div className="sm-micro-text" style={{ marginTop: 2, letterSpacing: 'normal', textTransform: 'none', fontWeight: 400 }}>O(1) hash lookup, strip dashes</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6" style={{ fontSize: 10 }}>
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)' }} /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>No match</div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              {/* Tier 1b */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 1b: Closest form+date match</div>
                  <div className="sm-micro-text" style={{ marginTop: 2, letterSpacing: 'normal', textTransform: 'none', fontWeight: 400 }}>nearest date within 14 days, form type normalized (PRNEWS &rarr; 8-K)</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6" style={{ fontSize: 10 }}>
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)' }} /><span className="sm-mint sm-fw-600">TRACKED</span></span>
                </div>
              </div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>No match</div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              {/* Tier 2 */}
              <div className="sm-flex sm-gap-16">
                <div className="sm-ed-flowbox">
                  <div>Tier 2: Cross-reference key lookup</div>
                  <div className="sm-micro-text" style={{ marginTop: 2, letterSpacing: 'normal', textTransform: 'none', fontWeight: 400 }}>accession or FORM|YYYY-MM-DD in cross-ref index (with aliases)</div>
                </div>
                <div className="sm-mono-sm sm-text3 sm-flex sm-gap-6" style={{ fontSize: 10 }}>
                  Match &rarr; <span className="sm-inline-flex sm-gap-4"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} /><span className="sm-gold sm-fw-600">DATA ONLY</span></span>
                </div>
              </div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>No match</div>
              <div className="sm-ed-vline" style={{ height: 6 }} />
              {/* Result: Untracked */}
              <div className="sm-inline-flex sm-gap-4">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' }} />
                <span className="sm-mono-sm sm-coral sm-fw-600" style={{ fontSize: 11 }}>UNTRACKED</span>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── CROSS-REFERENCE SOURCES ──────────────────── */}
            <div className="sm-ed-method-label">Cross-Reference Sources</div>
            <div className="sm-mono-sm sm-text3 sm-mb-12" style={{ fontSize: 10, lineHeight: 1.6 }}>
              Each filing can carry one or more cross-refs &mdash; extracted data lines written to other parts of the research database. Displayed as dimmed <span style={{ opacity: 0.7 }}>{'// source → data'}</span> lines below each filing.
            </div>
            <div className="sm-flex-wrap sm-gap-12">
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700" style={{ fontSize: 10, marginBottom: 4 }}>capital</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 9.5, lineHeight: 1.7 }}>
                  Share offerings, debt issuances, insider transactions, institutional holdings, conversions
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700" style={{ fontSize: 10, marginBottom: 4 }}>timeline</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 9.5, lineHeight: 1.7 }}>
                  Key company events, board changes, material agreements, launches
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700" style={{ fontSize: 10, marginBottom: 4 }}>financials</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 9.5, lineHeight: 1.7 }}>
                  Quarterly results: revenue, cash, debt, operating metrics
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700" style={{ fontSize: 10, marginBottom: 4 }}>catalysts</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 9.5, lineHeight: 1.7 }}>
                  Milestone completions, contract awards, product launches
                </div>
              </div>
              <div className="sm-ed-info-card">
                <div className="sm-mono-sm sm-sky sm-fw-700" style={{ fontSize: 10, marginBottom: 4 }}>company</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 9.5, lineHeight: 1.7 }}>
                  Company-level data updates (satellite counts, operational status)
                </div>
              </div>
            </div>
            <div className="sm-mono-sm sm-text3" style={{ marginTop: 10, fontSize: 10, lineHeight: 2 }}>
              <div><span className="sm-text">Storage:</span> filing_cross_refs table &mdash; keyed by ticker + filing_key (accession or FORM|DATE)</div>
              <div><span className="sm-text">Lookup:</span> accession number first, then closest FORM|YYYY-MM-DD (within 14 days, with aliases e.g. PRNEWS &rarr; 8-K)</div>
              <div><span className="sm-text">Display:</span> shown as <span style={{ opacity: 0.5 }}>{'// source → extracted data'}</span> lines below the filing row</div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── NEW FILING DETECTION ──────────────────────── */}
            <div className="sm-ed-method-label">New Filing Detection</div>
            <div className="sm-flex-col" style={{ alignItems: 'center' }}>
              <div className="sm-ed-flowbox-accent">Fetch Filings</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-ed-flowbox">Compare accessionNumber against DB records</div>
              <div className="sm-ed-vline" style={{ height: 12 }} />
              <div className="sm-ed-flowbox">Already in DB?</div>
              <div className="sm-flex sm-mt-8" style={{ gap: 32 }}>
                <div className="sm-flex-col" style={{ alignItems: 'center' }}>
                  <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>Yes</div>
                  <div className="sm-ed-vline" style={{ height: 8 }} />
                  <div className="sm-mono-sm sm-text3" style={{ fontSize: 10 }}>Upsert (update metadata + status)</div>
                </div>
                <div className="sm-flex-col" style={{ alignItems: 'center' }}>
                  <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>No</div>
                  <div className="sm-ed-vline" style={{ height: 8 }} />
                  <div className="sm-ed-flowbox">Save to DB (dismissed=false)</div>
                  <div className="sm-ed-vline" style={{ height: 8 }} />
                  <div className="sm-mono-sm sm-sky sm-fw-600" style={{ padding: '4px 10px', fontSize: 10 }}>NEW badge</div>
                  <div className="sm-ed-vline" style={{ height: 8 }} />
                  <div className="sm-mono-sm sm-text3" style={{ fontSize: 9 }}>User clicks NEW</div>
                  <div className="sm-ed-vline" style={{ height: 8 }} />
                  <div className="sm-mono-sm sm-sky sm-fw-600" style={{ padding: '4px 10px', fontSize: 10, opacity: 0.3 }}>SEEN badge</div>
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
            <div className="sm-flex-wrap" style={{ gap: 20 }}>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6" style={{ marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)' }} />
                  <span className="sm-mono-sm sm-mint sm-fw-700" style={{ fontSize: 10 }}>MINT DB</span>
                </div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Filing is in DB and current status is TRACKED (matched in sec-filings.ts).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6" style={{ marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                  <span className="sm-mono-sm sm-gold sm-fw-700" style={{ fontSize: 10 }}>GOLD DB</span>
                </div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Filing is in DB and current status is DATA ONLY (cross-refs exist but not in sec-filings.ts).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6" style={{ marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' }} />
                  <span className="sm-mono-sm sm-coral sm-fw-700" style={{ fontSize: 10 }}>CORAL DB</span>
                </div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Filing is in DB but current status is UNTRACKED (no index entry, no cross-refs).
                </div>
              </div>
              <div className="sm-ed-info-card-lg">
                <div className="sm-flex sm-gap-6" style={{ marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text3)', opacity: 0.3 }} />
                  <span className="sm-mono-sm sm-text3 sm-fw-700" style={{ fontSize: 10, opacity: 0.5 }}>GRAY DB</span>
                </div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Not in seen_filings table. Click Fetch Filings to populate.
                </div>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── BUTTON DISTINCTION ──────────────────────── */}
            <div className="sm-ed-method-label">Button Distinction: Fetch Filings vs Re-check DB</div>
            <div className="sm-flex-wrap" style={{ gap: 20 }}>
              <div className="sm-ed-info-card-xl">
                <div className="sm-mono-sm sm-fw-700" style={{ fontSize: 10, color: 'rgba(130,200,130,0.7)', marginBottom: 6 }}>FETCH FILINGS</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Calls SEC EDGAR API. Fetches latest filings, matches against local DB,
                  saves all to seen_filings with full metadata. New filings get NEW badge.
                </div>
              </div>
              <div className="sm-ed-info-card-xl">
                <div className="sm-mono-sm sm-fw-700" style={{ fontSize: 10, color: 'rgba(130,180,220,0.7)', marginBottom: 6 }}>RE-CHECK DB</div>
                <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 1.8 }}>
                  Re-reads sec_filings + filing_cross_refs from Postgres.
                  Picks up new tracked entries or cross-refs added by AI Agent patches.
                  Does not call SEC EDGAR API. Changes filing status dots.
                </div>
              </div>
            </div>

            <div className="sm-ed-hdivider" />

            {/* ── PERSISTED DATA ──────────────────────── */}
            <div className="sm-ed-method-label">What Gets Persisted to DB</div>
            <div className="sm-mono-sm sm-text3" style={{ fontSize: 10, lineHeight: 2.2 }}>
              <div><span className="sm-text">seen_filings:</span> accession_number, form, filing_date, description, report_date, file_url, status, cross_refs (JSON), dismissed</div>
              <div><span className="sm-text">analysis_cache:</span> ticker + &quot;edgar&quot; + accession_number &rarr; analysis text (successful only)</div>
              <div><span className="sm-text">sec_filings:</span> tracked filings from research database (populated by AI Agent / db/setup)</div>
              <div><span className="sm-text">filing_cross_refs:</span> cross-reference data linking filings to capital, timeline, financials, catalysts</div>
              <div className="sm-coral" style={{ marginTop: 4, opacity: 0.7 }}>No sessionStorage. No in-memory caches. Everything in Postgres.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedEdgarTab;
