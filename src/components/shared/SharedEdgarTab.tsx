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

/** Normalize accession number by stripping dashes for comparison */
const normalizeAccession = (a: string) => a.replace(/-/g, '');

/**
 * Look up cross-refs by accession number first, then by form|date (legacy).
 * Accession-number keys have no pipe; form|date keys contain a pipe separator.
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

  // Fallback: legacy form|date keys (±1 day for filing date variance)
  const lookupNorm = normalizeForm(form.toUpperCase().trim());
  const neighbors = getDateNeighbors(isoDate);
  for (const [key, value] of Object.entries(index)) {
    const pipeIdx = key.indexOf('|');
    if (pipeIdx === -1) continue;
    const keyForm = key.slice(0, pipeIdx);
    const keyDate = key.slice(pipeIdx + 1);
    if (neighbors.includes(keyDate) && normalizeForm(keyForm.toUpperCase().trim()) === lookupNorm) {
      return value;
    }
  }
  return undefined;
}

/**
 * Match EDGAR filings against local database.
 *
 * Primary matching: accession number (exact, unique per filing).
 * Legacy fallback: form type + date (±1 day) for entries without accession numbers.
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
    const edgarForm = ef.form.toUpperCase().trim();

    // Tier 1a: exact accession number match
    let match = accessionMap.get(edgarAccNorm);

    // Tier 1b: legacy form+date fallback (only entries without accession numbers)
    if (!match) {
      const neighbors = new Set(getDateNeighbors(edgarDate));
      match = legacyFilings.find(lf => {
        const localDate = normalizeDate(lf.date);
        if (!neighbors.has(localDate)) return false;
        return normalizeForm(edgarForm) === normalizeForm(lf.type.toUpperCase().trim());
      });
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
  tracked:   { color: 'var(--mint)',  label: 'IN DB',     title: 'Tracked in database', desc: 'Indexed in sec-filings.ts — matched by accession number or form+date' },
  data_only: { color: 'var(--gold)',  label: 'DATA ONLY', title: 'Data captured but filing not indexed in sec-filings.ts', desc: 'Data captured in other files (capital, timeline, etc.) but not indexed in sec-filings.ts' },
  new:       { color: 'var(--coral)', label: 'UNTRACKED', title: 'Not in database', desc: 'Not tracked — no index entry, no cross-reference data' },
};

// ── Verdict helpers ─────────────────────────────────────────────────────────
// Verdict types and utilities imported from './verdictUtils'

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

// ── Shared action button base style (matches SharedAIAgentsTab) ──────────────
const actionBtnBase: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  padding: "4px 10px",
  borderRadius: 4,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border)",
  cursor: "pointer",
  transition: "all 0.15s",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
};

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
  const style: React.CSSProperties = {
    fontSize: 9, fontWeight: 500, fontFamily: 'inherit',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    padding: '2px 6px', borderRadius: 4,
    color: active ? 'var(--accent)' : isAccent ? 'rgba(130,200,130,0.5)' : 'var(--text3)',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${active ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : isAccent ? 'rgba(130,200,130,0.15)' : 'var(--border)'}`,
    cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.15s', outline: 'none', textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 4,
    opacity: loading ? 0.5 : 1,
  };
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" title={title} style={style}>{label}</a>;
  }
  return <button onClick={onClick} disabled={loading} title={title} style={style}>{loading ? '...' : label}</button>;
};

// ── Analysis panel ──────────────────────────────────────────────────────────
const AnalysisPanel: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
  <div style={{ margin: '6px 0 2px 19px', paddingTop: 16, marginTop: 8, borderTop: '1px solid var(--border)' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '2.5px',
          color: 'var(--text3)',
        }}
      >
        Analysis Result
      </span>
      <button
        onClick={handleCopy}
        title="Copy analysis text"
        style={{
          background: copied ? 'color-mix(in srgb, var(--mint) 15%, transparent)' : 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: '3px 10px',
          fontSize: 11,
          color: copied ? 'var(--mint)' : 'var(--text3)',
          cursor: 'pointer',
          transition: 'all 0.15s',
          fontFamily: 'inherit',
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
    <div style={{ maxHeight: 600, overflowY: 'auto' }}>
      <pre
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-mono, monospace)',
          color: 'var(--text2)',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
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
  dbRecord?: DbFilingRecord | null;
  persistedAnalysis?: string | null;
  onDismissNew?: () => void;
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ r, typeColors, ticker, isGenuinelyNew, isDismissed, dbRecord, persistedAnalysis, onDismissNew, onRecheck, recheckLoading }) => {
  const accession = r.filing.accessionNumber;
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(persistedAnalysis || null);

  useEffect(() => {
    if (!analysis && persistedAnalysis) setAnalysis(persistedAnalysis);
  }, [persistedAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps

  // DB tooltip: live data fetched from database on hover
  const [dbTooltip, setDbTooltip] = useState<{ status: string; form: string; description: string; filingDate: string; crossRefs: string; fresh: string } | null>(null);
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
              status: rec.status === 'tracked' ? 'TRACKED' : rec.status === 'data_only' ? 'DATA ONLY' : rec.status === 'new' ? 'UNTRACKED' : rec.status?.toUpperCase() || '—',
              form: rec.form || '—',
              description: rec.description || '—',
              filingDate: rec.filingDate || '—',
              crossRefs: xrefs ? `${Array.isArray(xrefs) ? xrefs.length : 0} refs` : 'none',
              fresh: rec.dismissed ? 'OLD' : 'NEW',
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

  const resetWorkflowState = () => {
    setCopied(false);
    setApplyStep("idle");
    setApplyError("");
    setPatchPreview(null);
    setCommitStatus("idle");
    setCommitMessage("");
  };

  const isErrorAnalysis = (text: string | null) => !!text && (text.startsWith('Error:') || text === 'No analysis returned.' || text === 'AI analysis failed');

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
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', borderRadius: 10,
          transition: 'background 0.15s',
          cursor: analysis ? 'pointer' : undefined,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Chevron (visible when analysis exists) */}
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
              flexShrink: 0,
            }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        )}
        {/* Status dot — always visible */}
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
          minWidth: 64, textAlign: 'center',
          background: colors.bg, color: colors.text, whiteSpace: 'nowrap',
        }}>
          {formDisplay}
        </span>
        {/* Description */}
        <span style={{ fontSize: 13, color: 'var(--text)', flex: 1, minWidth: 0, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {r.filing.primaryDocDescription || r.filing.form}
        </span>
        {/* Verdict badge inline (compact, shown in header when collapsed) */}
        {analysis && !expanded && (() => {
          const verdict = parseVerdict(analysis);
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
        {/* DB status button — hover fetches live data from database */}
        {(() => {
          const dbColor = !dbRecord ? 'var(--text3)' : (dbRecord.filingDate != null && dbRecord.fileUrl != null && dbRecord.status != null) ? 'var(--mint)' : 'var(--gold)';
          const dbOpacity = !dbRecord ? 0.25 : 0.8;
          return (
            <span style={{ position: 'relative', flexShrink: 0 }} onMouseEnter={handleDbHoverEnter} onMouseLeave={handleDbHoverLeave}>
              <button
                type="button"
                aria-label="Show database record"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontSize: 8, fontFamily: 'Space Mono, monospace', color: dbColor, opacity: dbOpacity,
                  padding: '1px 4px', borderRadius: 3,
                  border: `1px solid color-mix(in srgb, ${dbColor} 20%, transparent)`,
                  background: 'transparent', cursor: 'pointer', outline: 'none',
                  transition: 'all 0.15s',
                }}
                onFocus={handleDbHoverEnter}
                onBlur={handleDbHoverLeave}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: dbColor }} />
                DB
              </button>
              {/* Tooltip — shows live DB data */}
              {dbTooltipVisible && (
                <div ref={dbTooltipRef} style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 6, zIndex: 100,
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '10px 14px', minWidth: 280, maxWidth: 380,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text)',
                  lineHeight: 1.8, pointerEvents: 'none',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text3)', marginBottom: 6, paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
                    Saved in seen_filings DB?
                  </div>
                  {dbTooltipLoading ? (
                    <div style={{ color: 'var(--text3)', fontStyle: 'italic' }}>Fetching from database...</div>
                  ) : dbTooltip ? (
                    <>
                      <div><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>status:</span> <span style={{ color: dbTooltip.status === 'TRACKED' ? 'var(--mint)' : dbTooltip.status === 'UNTRACKED' ? 'var(--coral)' : dbTooltip.status === 'DATA ONLY' ? 'var(--gold)' : 'var(--text3)', fontWeight: 600 }}>{dbTooltip.status}</span></div>
                      <div><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>form:</span> {dbTooltip.form}</div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>desc:</span> {dbTooltip.description}</div>
                      <div><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>filed:</span> {dbTooltip.filingDate}</div>
                      <div><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>cross-refs:</span> {dbTooltip.crossRefs}</div>
                      <div><span style={{ color: 'var(--text3)', minWidth: 80, display: 'inline-block' }}>fresh:</span> <span style={{ color: dbTooltip.fresh === 'NEW' ? 'var(--sky)' : 'var(--text3)', fontWeight: 600 }}>{dbTooltip.fresh}</span></div>
                    </>
                  ) : (
                    <div style={{ color: 'var(--coral)', fontWeight: 600 }}>NOT IN DATABASE</div>
                  )}
                </div>
              )}
            </span>
          );
        })()}
        {/* NEW badge — bright if unacknowledged, dim if acknowledged */}
        {isGenuinelyNew && !isDismissed && (
          <button
            onClick={(e) => { e.stopPropagation(); onDismissNew?.(); }}
            title="Click to acknowledge"
            style={{
              fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              padding: '1px 5px', borderRadius: 3, flexShrink: 0,
              color: 'var(--sky)', background: 'var(--sky-dim)',
              border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)',
              cursor: 'pointer', transition: 'all 0.15s', outline: 'none',
              fontFamily: 'inherit',
            }}
          >
            NEW
          </button>
        )}
        {isGenuinelyNew && isDismissed && (
          <span style={{
            fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '1px 5px', borderRadius: 3, flexShrink: 0,
            color: 'var(--sky)', opacity: 0.3,
            border: '1px solid color-mix(in srgb, var(--sky) 10%, transparent)',
          }}>
            SEEN
          </span>
        )}
        {/* Action buttons — stop propagation so clicks don't toggle expand */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          <a
            href={r.filing.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open filing on SEC EDGAR"
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
          <AnalysisPanel text={stripVerdict(analysis)} />
          {/* ── Database Action Toolbar ── */}
          {!analyzing && (
          <div style={{ margin: '8px 0 2px 7px' }}>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                {/* 1. Export PDF */}
                <button type="button" onClick={handleExportPDF} style={{ ...actionBtnBase, color: 'var(--text3)' }}>
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
                  style={{
                    ...actionBtnBase,
                    color: copied ? 'var(--mint)' : 'var(--text3)',
                    borderColor: copied ? 'rgba(130,200,130,0.15)' : undefined,
                  }}
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  {copied ? 'Copied' : 'Copy Markdown'}
                </button>

                {/* 3. Preview Changes / Applied indicator */}
                {applyStep === 'applied' ? (
                  <span style={{ ...actionBtnBase, color: 'var(--mint)', borderColor: 'rgba(130,200,130,0.15)', cursor: 'default' }}>
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
                    style={{
                      ...actionBtnBase,
                      color: applyStep === 'previewing'
                        ? 'var(--text3)'
                        : applyStep === 'error'
                          ? 'var(--coral)'
                          : 'rgba(130,200,130,0.5)',
                      borderColor: applyStep === 'error'
                        ? 'color-mix(in srgb, var(--coral) 25%, transparent)'
                        : 'rgba(130,200,130,0.15)',
                      opacity: applyStep === 'previewing' ? 0.6 : 1,
                      cursor: applyStep === 'previewing' || applyStep === 'previewed' || applyStep === 'applying' ? 'not-allowed' : 'pointer',
                    }}
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
                  style={{
                    ...actionBtnBase,
                    color: commitStatus === 'done'
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
                    cursor: commitStatus === 'committing' || commitStatus === 'done' || applyStep !== 'applied' ? 'not-allowed' : 'pointer',
                  }}
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
                  <span style={{ fontSize: 10, color: 'var(--text3)', marginLeft: 4 }}>
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
                <div
                  style={{
                    marginTop: 16,
                    borderRadius: 8,
                    border: '1px solid rgba(234,179,8,0.2)',
                    background: 'rgba(234,179,8,0.03)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(234,179,8,0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(234,179,8,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Patch Preview
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--text3)', marginLeft: 12 }}>
                        {patchPreview.summary}
                      </span>
                    </div>
                  </div>

                  {/* Per-file diffs */}
                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {patchPreview.previews?.map((p: { file: string; action: string; valid: boolean; detail: string; diff: string; linesAdded: number }, i: number) => (
                      <div key={i} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined, padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
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
                          <pre
                            style={{
                              fontSize: 10,
                              fontFamily: 'var(--font-mono, monospace)',
                              lineHeight: 1.6,
                              whiteSpace: 'pre-wrap',
                              margin: 0,
                              color: 'var(--text3)',
                              maxHeight: 200,
                              overflowY: 'auto',
                            }}
                          >
                            {p.diff.split('\n').map((line: string, li: number) => (
                              <span
                                key={li}
                                style={{
                                  display: 'block',
                                  color: line.startsWith('+') && !line.startsWith('+++')
                                    ? 'rgba(130,200,130,0.7)'
                                    : line.startsWith('-') && !line.startsWith('---')
                                      ? 'rgba(255,100,100,0.5)'
                                      : line.startsWith('@@')
                                        ? 'rgba(130,170,255,0.5)'
                                        : undefined,
                                  background: line.startsWith('+') && !line.startsWith('+++')
                                    ? 'rgba(130,200,130,0.04)'
                                    : line.startsWith('-') && !line.startsWith('---')
                                      ? 'rgba(255,100,100,0.04)'
                                      : undefined,
                                }}
                              >
                                {line}
                              </span>
                            ))}
                          </pre>
                        ) : !p.valid ? (
                          <span style={{ fontSize: 10, color: 'var(--coral)', opacity: 0.7 }}>{p.detail}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  {/* Warning + action buttons */}
                  <div
                    style={{
                      padding: '12px 16px',
                      borderTop: '1px solid rgba(234,179,8,0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 9, color: 'rgba(234,179,8,0.5)', fontWeight: 500, letterSpacing: '0.05em' }}>
                      Review carefully — these changes will be written to the database
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={handleCancelPreview}
                        style={{
                          ...actionBtnBase,
                          color: 'var(--text3)',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmApply}
                        disabled={!patchPreview.validCount}
                        style={{
                          ...actionBtnBase,
                          color: patchPreview.validCount ? 'rgba(234,179,8,0.8)' : 'var(--text3)',
                          borderColor: patchPreview.validCount ? 'rgba(234,179,8,0.3)' : undefined,
                          fontWeight: 600,
                          cursor: patchPreview.validCount ? 'pointer' : 'not-allowed',
                          opacity: patchPreview.validCount ? 1 : 0.4,
                        }}
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
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(234,179,8,0.5)', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)' }}>
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
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ year, results, typeColors, ticker, defaultOpen, newAccessions, dbRecords, persistedAnalyses, onDismissNew, onRecheck, recheckLoading }) => {
  const [open, setOpen] = useState(defaultOpen);
  const trackedInYear = results.filter(r => r.status === 'tracked').length;

  const renderRow = (r: MatchResult, i: number) => {
    const dbRec = dbRecords.get(r.filing.accessionNumber);
    return (
      <FilingRow key={r.filing.accessionNumber || `${year}-${i}`} r={r} typeColors={typeColors} ticker={ticker} isGenuinelyNew={newAccessions.has(r.filing.accessionNumber)} isDismissed={dbRec?.dismissed ?? false} dbRecord={dbRec || null} persistedAnalysis={persistedAnalyses[r.filing.accessionNumber] || null} onDismissNew={() => onDismissNew?.(r.filing.accessionNumber)} onRecheck={onRecheck} recheckLoading={recheckLoading} />
    );
  };

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
          {results.map(renderRow)}
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
  onRecheck?: () => void;
  recheckLoading?: boolean;
}> = ({ results, typeColors, filter, ticker, newAccessions, dbRecords, persistedAnalyses, onDismissNew, onRecheck, recheckLoading }) => {
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
          newAccessions={newAccessions}
          dbRecords={dbRecords}
          persistedAnalyses={persistedAnalyses}
          onDismissNew={onDismissNew}
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
    style={{
      fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '3px 8px', borderRadius: 4,
      color: active ? 'var(--accent)' : 'var(--text3)',
      background: active ? 'color-mix(in srgb, var(--accent) 8%, rgba(255,255,255,0.04))' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${active ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : 'var(--border)'}`,
      cursor: 'pointer', transition: 'all 0.15s',
      outline: 'none', fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}
  >
    {label}
    {count !== undefined && (
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, opacity: active ? 0.8 : 0.35 }}>{count}</span>
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

  const edgarBrowseUrl = `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-header</div>
      {/* Hero — matches Sources tab */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>SEC Filings</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>EDGAR<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>
          SEC EDGAR filings for {companyName}. Loaded from database on mount — click <b>Fetch Filings</b> to check SEC for new ones, or <b>AI</b> to analyze.
        </p>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#edgar-status</div>
      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', marginTop: 8,
        borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)',
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
                      newCount > 0 ? `${newCount} untracked` : '',
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
              fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '5px 14px', borderRadius: 4,
              color: 'var(--text3)', background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
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
            style={{
              fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '5px 14px', borderRadius: 4,
              color: loading ? 'var(--text3)' : 'rgba(130,200,130,0.5)',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${loading ? 'var(--border)' : 'rgba(130,200,130,0.15)'}`,
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.15s', outline: 'none',
              opacity: loading ? 0.5 : 1,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}>
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
              style={{
                fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '5px 14px', borderRadius: 4,
                color: recheckLoading ? 'var(--text3)' : 'rgba(130,180,220,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${recheckLoading ? 'var(--border)' : 'rgba(130,180,220,0.15)'}`,
                cursor: recheckLoading ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s', outline: 'none',
                opacity: recheckLoading ? 0.5 : 1,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ animation: recheckLoading ? 'spin 1s linear infinite' : 'none' }}>
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
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 24, padding: '16px 4px 12px',
            fontSize: 10, color: 'var(--text3)', letterSpacing: '0.3px', flexWrap: 'wrap',
          }}
        >
          {(['tracked', 'data_only', 'new'] as FilingStatus[]).map(status => (
            <span key={status} title={STATUS_CONFIG[status].desc} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, maxWidth: 260 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_CONFIG[status].color, opacity: 0.9, marginTop: 3, flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontWeight: 500 }}>{status === 'tracked' ? 'In Database' : status === 'data_only' ? 'Data Only' : 'Untracked'}</span>
                <span style={{ fontSize: 9, opacity: 0.5, lineHeight: 1.4 }}>{STATUS_CONFIG[status].desc}</span>
              </span>
            </span>
          ))}
        </div>
      )}
      {/* Cross-ref criteria */}
      {loaded && (
        <div style={{
          fontSize: 9, color: 'var(--text3)', opacity: 0.4, padding: '0 4px 8px',
          fontFamily: 'Space Mono, monospace', lineHeight: 1.6,
        }}>
          Cross-refs checked: capital, timeline, financials, catalysts, company, quarterly-metrics
          {' \u00B7 '}matched by accession # or FORM|DATE key (\u00B11 day)
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
          <span style={{ fontSize: 12 }}>Loading from database...</span>
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

          {/* Filing list */}
          <FilingList results={results} typeColors={typeColors} filter={filter} ticker={ticker} newAccessions={newAccessions} dbRecords={dbRecords} persistedAnalyses={persistedAnalyses} onDismissNew={dismissNewFiling} onRecheck={recheckDB} recheckLoading={recheckLoading} />
        </>
      )}

      {/* ── Methodology ────────────────────────────────────────────────────── */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#edgar-methodology</div>
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
          aria-label="Toggle EDGAR Methodology"
          onKeyDown={(e) => e.key === 'Enter' && setMethodologyOpen(prev => !prev)}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Methodology</span>
          <span style={{ color: 'var(--text3)', fontSize: 18 }}>{methodologyOpen ? '\u2212' : '+'}</span>
        </div>
        {methodologyOpen && (
          <div style={{ padding: '24px 24px', fontSize: 13, color: 'var(--text2)' }}>
            {/* ── DB-FIRST ARCHITECTURE ────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>DB-First Architecture</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Page loads</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--sky-dim)', border: '1px solid var(--sky)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', textAlign: 'center', fontWeight: 600 }}>GET /api/seen-filings?ticker=X</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>ensureTable() &mdash; auto-creates seen_filings if missing</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Load saved filings from Neon PostgreSQL</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--mint)', fontWeight: 600 }}>Render from DB &mdash; no SEC API calls on mount</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text)' }}>Storage:</span> Neon PostgreSQL via Drizzle ORM &rarr; seen_filings table</div>
              <div><span style={{ color: 'var(--text)' }}>Self-healing:</span> ensureTable() creates table + indexes on first request</div>
              <div><span style={{ color: 'var(--text)' }}>Graceful fallback:</span> returns empty array if table cannot be created</div>
              <div><span style={{ color: 'var(--text)' }}>Upsert:</span> ON CONFLICT DO UPDATE &mdash; overwrites form, filingDate, description, reportDate, fileUrl, status, crossRefs</div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── FILING DATA PIPELINE ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Filing Data Pipeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '6px 14px', background: 'var(--sky-dim)', border: '1px solid var(--sky)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', textAlign: 'center', fontWeight: 600 }}>Fetch Filings</div>
              <div style={{ width: 2, height: 10, background: 'var(--sky)' }} />
              <div style={{ padding: '5px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>GET /api/edgar/[ticker]</div>
              <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', textAlign: 'center', lineHeight: 1.6 }}>SEC EDGAR submissions API<br />(CIK-based, paginated, 15s timeout)</div>
              <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
              <div style={{ padding: '5px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Match against sec_filings + filing_cross_refs</div>
              <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
              <div style={{ padding: '5px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>POST /api/seen-filings &mdash; upsert all with status + crossRefs</div>
              <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
              <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--mint)', fontWeight: 600 }}>New filings get NEW badge (dismissed=false)</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text)' }}>Save path:</span> POST /api/seen-filings &rarr; upsert with status, crossRefs, form, filingDate, description, reportDate, fileUrl</div>
              <div><span style={{ color: 'var(--text)' }}>Re-check DB:</span> re-reads sec_filings + filing_cross_refs from Postgres to pick up new patches</div>
              <div><span style={{ color: 'var(--text)' }}>Analysis:</span> POST /api/edgar/analyze &rarr; Claude Haiku (15K chars) &rarr; persisted to analysis_cache table</div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── THREE-TIER MATCHING ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Three-Tier Filing Matcher</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>SEC filing arrives (accessionNumber, form, filingDate)</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              {/* Tier 1a */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 1a: Accession number exact match</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>O(1) hash lookup, strip dashes</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Match &rarr; <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} /><span style={{ color: 'var(--mint)', fontWeight: 600 }}>TRACKED</span></span>
                </div>
              </div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No match</div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              {/* Tier 1b */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 1b: Legacy form+date fuzzy match</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>&plusmn;1 day tolerance, form type normalized</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Match &rarr; <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} /><span style={{ color: 'var(--mint)', fontWeight: 600 }}>TRACKED</span></span>
                </div>
              </div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No match</div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              {/* Tier 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>
                  <div>Tier 2: Cross-reference key lookup</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>accession or FORM|YYYY-MM-DD in cross-ref index</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Match &rarr; <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} /><span style={{ color: 'var(--gold)', fontWeight: 600 }}>DATA ONLY</span></span>
                </div>
              </div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No match</div>
              <div style={{ width: 2, height: 6, background: 'var(--border)' }} />
              {/* Result: Untracked */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--coral)', fontWeight: 600 }}>UNTRACKED</span>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── CROSS-REFERENCE SOURCES ──────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Cross-Reference Sources</div>
            <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.6, marginBottom: 12 }}>
              Each filing can carry one or more cross-refs &mdash; extracted data lines written to other parts of the research database. Displayed as dimmed <span style={{ opacity: 0.7 }}>{'// source → data'}</span> lines below each filing.
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 160px', padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', marginBottom: 4 }}>capital</div>
                <div style={{ fontSize: 9.5, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.7 }}>
                  Share offerings, debt issuances, insider transactions, institutional holdings, conversions
                </div>
              </div>
              <div style={{ flex: '1 1 160px', padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', marginBottom: 4 }}>timeline</div>
                <div style={{ fontSize: 9.5, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.7 }}>
                  Key company events, board changes, material agreements, launches
                </div>
              </div>
              <div style={{ flex: '1 1 160px', padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', marginBottom: 4 }}>financials</div>
                <div style={{ fontSize: 9.5, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.7 }}>
                  Quarterly results: revenue, cash, debt, operating metrics
                </div>
              </div>
              <div style={{ flex: '1 1 160px', padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', marginBottom: 4 }}>catalysts</div>
                <div style={{ fontSize: 9.5, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.7 }}>
                  Milestone completions, contract awards, product launches
                </div>
              </div>
              <div style={{ flex: '1 1 160px', padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', marginBottom: 4 }}>company</div>
                <div style={{ fontSize: 9.5, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.7 }}>
                  Company-level data updates (satellite counts, operational status)
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text)' }}>Storage:</span> filing_cross_refs table &mdash; keyed by ticker + filing_key (accession or FORM|DATE)</div>
              <div><span style={{ color: 'var(--text)' }}>Lookup:</span> accession number first, then FORM|YYYY-MM-DD &plusmn;1 day</div>
              <div><span style={{ color: 'var(--text)' }}>Display:</span> shown as <span style={{ opacity: 0.5 }}>{'// source → extracted data'}</span> lines below the filing row</div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── NEW FILING DETECTION ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>New Filing Detection</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '6px 14px', background: 'var(--sky-dim)', border: '1px solid var(--sky)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', textAlign: 'center' }}>Fetch Filings</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Compare accessionNumber against DB records</div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Already in DB?</div>
              <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>Yes</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>Upsert (update metadata + status)</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>No</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text)', textAlign: 'center' }}>Save to DB (dismissed=false)</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', fontWeight: 600 }}>NEW badge</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'Space Mono, monospace' }}>User clicks NEW</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ padding: '4px 10px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--sky)', fontWeight: 600, opacity: 0.3 }}>SEEN badge</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--text)' }}>On mount:</span> loads filings from DB only &mdash; no SEC API calls</div>
              <div><span style={{ color: 'var(--text)' }}>Fetch Filings:</span> fetches from SEC EDGAR, matches, saves all to DB</div>
              <div><span style={{ color: 'var(--text)' }}>NEW badge:</span> bright clickable badge &mdash; filing not yet acknowledged</div>
              <div><span style={{ color: 'var(--text)' }}>SEEN badge:</span> dimmed label after user clicks NEW &rarr; sets dismissed=true in DB</div>
              <div><span style={{ color: 'var(--text)' }}>Persistence:</span> both NEW and SEEN survive page reloads &amp; work cross-device</div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── DB STATUS INDICATORS ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>DB Status Indicators</div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 180px', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--mint)' }}>GREEN DB</span>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.8 }}>
                  Complete record: filingDate, fileUrl, and status all present in DB.
                </div>
              </div>
              <div style={{ flex: '1 1 180px', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--gold)' }}>GOLD DB</span>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.8 }}>
                  Partial record: filing saved to DB but missing some metadata fields.
                </div>
              </div>
              <div style={{ flex: '1 1 180px', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text3)', opacity: 0.3 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', opacity: 0.5 }}>GRAY DB</span>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.8 }}>
                  Not in seen_filings table. Click Fetch Filings to populate.
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── BUTTON DISTINCTION ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Button Distinction: Fetch Filings vs Re-check DB</div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 220px', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'rgba(130,200,130,0.7)', marginBottom: 6 }}>FETCH FILINGS</div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.8 }}>
                  Calls SEC EDGAR API. Fetches latest filings, matches against local DB,
                  saves all to seen_filings with full metadata. New filings get NEW badge.
                </div>
              </div>
              <div style={{ flex: '1 1 220px', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'rgba(130,180,220,0.7)', marginBottom: 6 }}>RE-CHECK DB</div>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 1.8 }}>
                  Re-reads sec_filings + filing_cross_refs from Postgres.
                  Picks up new tracked entries or cross-refs added by AI Agent patches.
                  Does not call SEC EDGAR API. Changes filing status dots.
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

            {/* ── PERSISTED DATA ──────────────────────── */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>What Gets Persisted to DB</div>
            <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'var(--text3)', lineHeight: 2.2 }}>
              <div><span style={{ color: 'var(--text)' }}>seen_filings:</span> accession_number, form, filing_date, description, report_date, file_url, status, cross_refs (JSON), dismissed</div>
              <div><span style={{ color: 'var(--text)' }}>analysis_cache:</span> ticker + &quot;edgar&quot; + accession_number &rarr; analysis text (successful only)</div>
              <div><span style={{ color: 'var(--text)' }}>sec_filings:</span> tracked filings from research database (populated by AI Agent / db/setup)</div>
              <div><span style={{ color: 'var(--text)' }}>filing_cross_refs:</span> cross-reference data linking filings to capital, timeline, financials, catalysts</div>
              <div style={{ marginTop: 4, color: 'var(--coral)', opacity: 0.7 }}>No sessionStorage. No in-memory caches. Everything in Postgres.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedEdgarTab;
