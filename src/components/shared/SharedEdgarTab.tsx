/**
 * SharedEdgarTab — SEC EDGAR Filing Monitor (v2)
 *
 * Fetches the latest filings from SEC EDGAR and compares them
 * against the local database to highlight which filings have been
 * tracked and which are new. Per-filing actions: open in new tab
 * or analyze with AI.
 *
 * v3.1.0 — Accession-number matching replaces form+date tolerance.
 *   Exact matching via SEC accession number (primary), with ±1 day form+date
 *   fallback only for legacy entries that lack accession numbers.
 *
 * @version 3.1.0
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';

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

// ── Per-filing analysis cache (survives tab switches) ─────────────────────
function getAnalysisCache(ticker: string, accession: string): string | null {
  try {
    const raw = sessionStorage.getItem(`edgar_analysis_${ticker}_${accession}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setAnalysisCache(ticker: string, accession: string, text: string) {
  try { sessionStorage.setItem(`edgar_analysis_${ticker}_${accession}`, JSON.stringify(text)); } catch { /* quota */ }
}

function removeAnalysisCache(ticker: string, accession: string) {
  try { sessionStorage.removeItem(`edgar_analysis_${ticker}_${accession}`); } catch { /* ignore */ }
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
type VerdictLevel = 'Critical' | 'Important' | 'Low' | 'Already Incorporated';

const VERDICT_COLORS: Record<VerdictLevel, { color: string; bg: string }> = {
  'Critical':             { color: 'var(--coral)', bg: 'var(--coral-dim)' },
  'Important':            { color: 'var(--gold)',  bg: 'var(--gold-dim)' },
  'Low':                  { color: 'var(--text3)', bg: 'rgba(255,255,255,0.04)' },
  'Already Incorporated': { color: 'var(--mint)',  bg: 'var(--mint-dim)' },
};

function parseVerdict(text: string): { level: VerdictLevel; explanation: string } | null {
  const match = text.match(/\[VERDICT:\s*(Critical|Important|Low|Already Incorporated)\]\s*[—\-–]\s*(.+)/i);
  if (!match) return null;
  // Normalize level: title-case each word to match VERDICT_COLORS keys
  const raw = match[1].trim();
  const level = raw.replace(/\b\w/g, c => c.toUpperCase()) as VerdictLevel;
  if (!(level in VERDICT_COLORS)) return null;
  return { level, explanation: match[2].trim() };
}

/** Strip the [VERDICT: ...] line from analysis text to avoid duplication */
function stripVerdict(text: string): string {
  return text.replace(/\n?\[VERDICT:.*$/im, '').trim();
}

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
const AnalysisPanel: React.FC<{ text: string }> = ({ text }) => (
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
}> = ({ r, typeColors, ticker, isGenuinelyNew }) => {
  const accession = r.filing.accessionNumber;
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(() => getAnalysisCache(ticker, accession));
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

  const handleAnalyze = async () => {
    if (analysis) { setAnalysis(null); removeAnalysisCache(ticker, accession); resetWorkflowState(); setExpanded(false); return; } // toggle off
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
      setAnalysis(text);
      setAnalysisCache(ticker, accession, text);
    } catch (err) {
      const errText = `Error: ${(err as Error).message}`;
      setAnalysis(errText);
      setAnalysisCache(ticker, accession, errText);
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
        {/* NEW badge — only for genuinely new filings that appeared after a refresh */}
        {isGenuinelyNew && !analysis && !(r.crossRefs && r.crossRefs.length > 0) && r.status === 'new' && (
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
  newAccessions: Set<string>;
}> = ({ year, results, typeColors, ticker, defaultOpen, newAccessions }) => {
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
            <FilingRow key={r.filing.accessionNumber || `${year}-${i}`} r={r} typeColors={typeColors} ticker={ticker} isGenuinelyNew={newAccessions.has(r.filing.accessionNumber)} />
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
  newAccessions: Set<string>;
}> = ({ results, typeColors, filter, ticker, newAccessions }) => {
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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  // Refreshed local data (read from disk, bypassing bundler cache)
  const [refreshedLocalFilings, setRefreshedLocalFilings] = useState<LocalFiling[] | null>(null);
  const [refreshedCrossRefs, setRefreshedCrossRefs] = useState<Record<string, { source: string; data: string }[]> | null>(null);

  // Track genuinely new filings: only those appearing after a refresh that weren't in the previous load
  const knownAccessionsRef = useRef<Set<string>>(new Set());
  const [newAccessions, setNewAccessions] = useState<Set<string>>(new Set());

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

  const fetchFilings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch live filings from SEC EDGAR
      const res = await fetch(`/api/edgar/${ticker}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch (${res.status})`);
      }
      const data = await res.json();
      const filings: EdgarFiling[] = data.filings || [];

      // Track genuinely new filings (only those not in previous load)
      const currentAccessions = new Set(filings.map(f => f.accessionNumber));
      if (knownAccessionsRef.current.size === 0) {
        // First load — everything is already known, nothing is "new"
        knownAccessionsRef.current = currentAccessions;
        setNewAccessions(new Set());
      } else {
        // Refresh — only filings not previously seen are genuinely new
        const fresh = new Set<string>();
        for (const acc of currentAccessions) {
          if (!knownAccessionsRef.current.has(acc)) fresh.add(acc);
        }
        knownAccessionsRef.current = currentAccessions;
        setNewAccessions(fresh);
      }

      setEdgarFilings(filings);
      setLoaded(true);
      const now = Date.now();
      setFetchedAt(now);
      setCachedEdgar(ticker, filings);

      // 2. Also refresh local DB from disk (picks up AI Agent patches)
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
      } catch { /* local refresh is best-effort */ }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    const cached = getCachedEdgar(ticker);
    if (cached) {
      // Cache restore — all cached filings are already known, none are "new"
      knownAccessionsRef.current = new Set(cached.filings.map(f => f.accessionNumber));
      setNewAccessions(new Set());
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
          <button
            onClick={fetchFilings}
            disabled={loading}
            aria-label={loaded ? 'Refresh EDGAR filings' : 'Fetch EDGAR filings'}
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
            {loading ? 'Fetching...' : loaded ? 'Refresh' : 'Fetch'}
          </button>
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

          {/* Filing list */}
          <FilingList results={results} typeColors={typeColors} filter={filter} ticker={ticker} newAccessions={newAccessions} />
        </>
      )}
    </div>
  );
};

export default SharedEdgarTab;
