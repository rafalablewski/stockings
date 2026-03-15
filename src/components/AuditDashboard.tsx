'use client';

import { useState, useMemo, useRef, useCallback, useEffect, lazy, Suspense } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import {
  AUDIT_FINDINGS,
  AUDIT_METADATA,
  getAuditStats,
  type AuditFinding,
  type Severity,
} from '@/data/audit-findings';
import { workflows } from '@/data/workflows';
import '@/components/stocks/stock-model-styles.css';

const AuditReportSection = lazy(() => import('@/app/audit/comprehensive-code-audit/AuditReportSection'));

// ── Re-check Types ───────────────────────────────────────────────────────────

type CheckVerdict = 'passed' | 'failed';

interface CheckResult {
  verdict: CheckVerdict;
  summary: string;
  timestamp: number;
}

// ── Severity Config ──────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<Severity, { color: string; bg: string; border: string; label: string }> = {
  CRITICAL: { color: '#FF4D4F', bg: 'rgba(255,77,79,0.08)', border: 'rgba(255,77,79,0.25)', label: 'CRITICAL' },
  HIGH:     { color: '#FF7B72', bg: 'rgba(255,123,114,0.08)', border: 'rgba(255,123,114,0.2)', label: 'HIGH' },
  MEDIUM:   { color: '#D29922', bg: 'rgba(210,153,34,0.08)', border: 'rgba(210,153,34,0.2)', label: 'MEDIUM' },
  LOW:      { color: '#8B949E', bg: 'rgba(139,148,158,0.08)', border: 'rgba(139,148,158,0.2)', label: 'LOW' },
  INFO:     { color: '#79C0FF', bg: 'rgba(121,192,255,0.08)', border: 'rgba(121,192,255,0.2)', label: 'INFO' },
};

const EFFORT_COLORS: Record<string, string> = {
  'Immediate': '#FF4D4F',
  'Short-term': '#D29922',
  'Medium-term': '#79C0FF',
  'Long-term': '#8B949E',
};

// ── Sub-Components ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = SEVERITY_CONFIG[severity];
  return (
    <span
      className="aud-severity-badge"
      style={{ '--aud-sev-color': cfg.color, '--aud-sev-bg': cfg.bg, '--aud-sev-border': cfg.border } as React.CSSProperties}
    >
      {cfg.label}
    </span>
  );
}

function CvssBadge({ score }: { score: number }) {
  let color = '#8B949E';
  if (score >= 9.0) color = '#FF4D4F';
  else if (score >= 7.0) color = '#FF7B72';
  else if (score >= 4.0) color = '#D29922';

  return (
    <span className="aud-cvss" style={{ '--aud-cvss-color': color } as React.CSSProperties}>
      {score.toFixed(1)}
    </span>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="aud-stat-box">
      <div className="aud-stat-value" style={accent ? { '--aud-accent': accent } as React.CSSProperties : undefined}>
        {value}
      </div>
      <div className="aud-stat-label">{label}</div>
    </div>
  );
}

function SeverityBar({ bySeverity }: { bySeverity: Record<Severity, number> }) {
  const total = Object.values(bySeverity).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const segments: { severity: Severity; count: number; pct: number }[] = (
    ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'] as Severity[]
  )
    .filter(s => bySeverity[s] > 0)
    .map(s => ({ severity: s, count: bySeverity[s], pct: (bySeverity[s] / total) * 100 }));

  return (
    <div className="aud-sev-bar-wrap">
      <div className="aud-sev-bar-track">
        {segments.map(seg => (
          <div
            key={seg.severity}
            className="aud-sev-bar-seg"
            style={{ width: `${seg.pct}%`, background: SEVERITY_CONFIG[seg.severity].color }}
          />
        ))}
      </div>
      <div className="aud-sev-bar-legend">
        {segments.map(seg => (
          <div key={seg.severity} className="aud-sev-bar-item">
            <div className="aud-sev-bar-dot" style={{ background: SEVERITY_CONFIG[seg.severity].color }} />
            <span className="aud-sev-bar-label">
              {seg.severity}: {seg.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FindingRow({
  finding,
  expanded,
  onToggle,
  checkResult,
  isChecking,
  onRecheck,
  saveFailed,
}: {
  finding: AuditFinding;
  expanded: boolean;
  onToggle: () => void;
  checkResult?: CheckResult;
  isChecking: boolean;
  onRecheck: () => void;
  saveFailed?: boolean;
}) {
  const cfg = SEVERITY_CONFIG[finding.severity];

  return (
    <div className="aud-finding-border">
      {/* Header Row — uses div instead of button to avoid invalid nested
           interactive content (the Check / re-check buttons live inside). */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        aria-expanded={expanded}
        className="aud-finding-row"
        data-expanded={expanded}
        style={{ '--aud-sev-color': cfg.color } as React.CSSProperties}
      >
        <span className="aud-finding-id">{finding.id}</span>
        <SeverityBadge severity={finding.severity} />
        <span className="aud-finding-title">{finding.title}</span>
        <span className="aud-finding-cvss">
          CVSS <CvssBadge score={finding.cvss} />
        </span>
        <span
          className="aud-finding-effort"
          style={{ '--aud-effort-color': EFFORT_COLORS[finding.effort] || '#8B949E' } as React.CSSProperties}
        >
          {finding.effort}
        </span>

        {/* Status Cell */}
        <span className="aud-status-cell" onClick={e => e.stopPropagation()}>
          {isChecking ? (
            <span className="aud-status-checking">
              <span className="aud-status-pulse" />
              <span className="aud-status-checking-text">Checking</span>
            </span>
          ) : checkResult ? (
            <span className="aud-status-checking">
              <span className="aud-verdict-badge" data-verdict={checkResult.verdict}>
                {checkResult.verdict}
              </span>
              {saveFailed && (
                <span className="aud-save-failed" title="Result was not saved to database — it will be lost on refresh">
                  unsaved
                </span>
              )}
              <button onClick={onRecheck} title="Re-check this finding" className="aud-recheck-btn">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>
            </span>
          ) : (
            <button onClick={onRecheck} className="aud-check-btn">
              Check
            </button>
          )}
        </span>

        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="aud-chevron" data-expanded={expanded}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="aud-detail-panel">
          {/* Description */}
          <div className="aud-detail-section">
            <div className="aud-detail-heading">Description</div>
            <div className="aud-detail-text">{finding.description}</div>
          </div>

          {/* Impact */}
          <div className="aud-detail-section">
            <div className="aud-detail-heading">Impact Assessment</div>
            <div
              className="aud-detail-box aud-detail-box-severity"
              style={{ '--aud-sev-color': cfg.color, '--aud-sev-bg': cfg.bg, '--aud-sev-border': cfg.border } as React.CSSProperties}
            >
              {finding.impact}
            </div>
          </div>

          {/* Affected Assets */}
          <div className="aud-detail-section">
            <div className="aud-detail-heading">Affected Assets</div>
            <div className="aud-asset-list">
              {finding.affectedAssets.map(asset => (
                <code key={asset} className="aud-asset-tag">{asset}</code>
              ))}
            </div>
          </div>

          {/* Remediation */}
          <div className="aud-detail-section">
            <div className="aud-detail-heading">Remediation Guidance</div>
            <div className="aud-detail-box aud-detail-box-pass">{finding.remediation}</div>
          </div>

          {/* Verification Result */}
          {checkResult && (
            <div className="aud-detail-section">
              <div className="aud-detail-heading">Verification Result</div>
              <div
                className="aud-detail-box aud-detail-box-verdict"
                style={{
                  '--aud-verdict-color': checkResult.verdict === 'passed' ? 'rgba(126,231,135,0.85)' : 'rgba(255,77,79,0.85)',
                  '--aud-verdict-bg': checkResult.verdict === 'passed' ? 'rgba(126,231,135,0.04)' : 'rgba(255,77,79,0.04)',
                  '--aud-verdict-border': checkResult.verdict === 'passed' ? 'rgba(126,231,135,0.12)' : 'rgba(255,77,79,0.12)',
                } as React.CSSProperties}
              >
                <div className="aud-verdict-header">
                  <span className="aud-verdict-label">{checkResult.verdict}</span>
                  <span className="aud-verdict-ts">{new Date(checkResult.timestamp).toLocaleTimeString()}</span>
                </div>
                {checkResult.summary}
              </div>
            </div>
          )}

          {/* Metadata Row */}
          <div className="aud-meta-row">
            {finding.cwe && <span className="aud-meta-cwe">{finding.cwe}</span>}
            <span className="aud-meta-category">{finding.category}</span>
            {finding.compliance.length > 0 && (
              <div className="aud-compliance-list">
                {finding.compliance.map(c => (
                  <span key={c} className="aud-compliance-tag">{c}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Re-check Prompt Builder ──────────────────────────────────────────────────

function buildRecheckPrompt(finding: AuditFinding): string {
  return `You are a senior security engineer performing a targeted re-check of a single audit finding.

FINDING TO VERIFY:
- ID: ${finding.id}
- Title: ${finding.title}
- Severity: ${finding.severity}
- CVSS: ${finding.cvss}
- Category: ${finding.category}
${finding.cwe ? `- CWE: ${finding.cwe}` : ''}

DESCRIPTION:
${finding.description}

AFFECTED ASSETS:
${finding.affectedAssets.map(a => `  - ${a}`).join('\n')}

EXPECTED REMEDIATION:
${finding.remediation}

IMPACT IF UNRESOLVED:
${finding.impact}

────────────────────────────────────────
INSTRUCTIONS:
Analyze whether this specific issue has been resolved in the current codebase. Check the affected files and verify whether the remediation has been applied.

Your response MUST start with exactly one of these two lines:
VERDICT: PASSED
VERDICT: FAILED

Then provide a 1-3 sentence explanation of what you found. Be specific — cite file paths if relevant.`;
}

// ── Main Component ───────────────────────────────────────────────────────────

type FilterSeverity = 'ALL' | Severity;

export default function AuditDashboard({ auditMd }: { auditMd?: string } = {}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<FilterSeverity>('ALL');
  const [activeView, setActiveView] = useState<string>('findings');
  const stats = useMemo(() => getAuditStats(), []);

  // ── Per-finding re-check state ──
  const [checkResults, setCheckResults] = useState<Record<string, CheckResult>>({});
  const [checkingIds, setCheckingIds] = useState<Set<string>>(new Set());
  const checkAbortRefs = useRef<Record<string, AbortController>>({});
  const [saveFailedIds, setSaveFailedIds] = useState<Set<string>>(new Set());

  // ── Load persisted check results on mount ──
  useEffect(() => {
    fetch('/api/audit-checks', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then(res => {
        if (!res.ok) {
          console.warn(`[audit-checks] Load returned HTTP ${res.status}`);
          return null;
        }
        return res.json();
      })
      .then((data: Record<string, { verdict: string; summary: string; updatedAt: number }> | null) => {
        if (!data) return;
        const loaded: Record<string, CheckResult> = {};
        for (const [findingId, row] of Object.entries(data)) {
          if (row.verdict && row.summary) {
            loaded[findingId] = {
              verdict: row.verdict as CheckVerdict,
              summary: row.summary,
              timestamp: row.updatedAt,
            };
          }
        }
        setCheckResults(prev => ({ ...loaded, ...prev }));
      })
      .catch((err) => {
        console.warn('[audit-checks] Failed to load saved checks:', err);
      });
  }, []);

  // ── Check All state ──
  const [checkAllRunning, setCheckAllRunning] = useState(false);
  const [checkAllProgress, setCheckAllProgress] = useState<{ current: number; total: number } | null>(null);
  const checkAllAbortRef = useRef(false);

  // ── Re-run state ──
  const [rerunResult, setRerunResult] = useState('');
  const [rerunRunning, setRerunRunning] = useState(false);
  const [rerunError, setRerunError] = useState('');
  const [rerunExpanded, setRerunExpanded] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const codeAuditPrompt = useMemo(() => {
    const wf = workflows.find(w => w.id === 'code-audit');
    return wf?.promptTemplate ?? wf?.variants[0]?.prompt ?? '';
  }, []);

  const handleRerun = useCallback(async () => {
    if (!codeAuditPrompt) return;
    setRerunRunning(true);
    setRerunResult('');
    setRerunError('');
    setRerunExpanded(true);

    abortRef.current = new AbortController();

    try {
      const res = await authFetch('/api/workflow/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: codeAuditPrompt }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        setRerunError(err.error || `Error ${res.status}`);
        setRerunRunning(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setRerunError('No response stream');
        setRerunRunning(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') continue;
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                setRerunResult(prev => prev + data.text);
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setRerunError(err.message);
      }
    } finally {
      setRerunRunning(false);
    }
  }, [codeAuditPrompt]);

  const handleRerunStop = () => {
    abortRef.current?.abort();
    setRerunRunning(false);
  };

  // ── Per-finding re-check ──
  const handleRecheck = useCallback(async (finding: AuditFinding) => {
    const id = finding.id;

    // Abort any existing check for this finding
    checkAbortRefs.current[id]?.abort();
    const controller = new AbortController();
    checkAbortRefs.current[id] = controller;

    setCheckingIds(prev => new Set(prev).add(id));

    let verdict: CheckVerdict = 'failed';
    let summary = '(no details)';

    try {
      const res = await authFetch('/api/workflow/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildRecheckPrompt(finding) }),
        signal: controller.signal,
      });

      if (!res.ok) {
        summary = `API error ${res.status}`;
      } else {
        const reader = res.body?.getReader();
        if (!reader) {
          summary = 'No response stream';
        } else {
          const decoder = new TextDecoder();
          let buffer = '';
          let fullText = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                  const data = JSON.parse(jsonStr);
                  if (data.text) fullText += data.text;
                } catch {
                  // skip
                }
              }
            }
          }

          // Parse verdict from response
          const trimmed = fullText.trim();
          const firstLine = trimmed.split('\n')[0]?.toUpperCase() ?? '';
          verdict = firstLine.includes('PASSED') ? 'passed' : 'failed';
          summary = trimmed.split('\n').slice(1).join(' ').trim() || trimmed || '(no details)';
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User cancelled — skip save, just clean up
        setCheckingIds(prev => { const next = new Set(prev); next.delete(id); return next; });
        delete checkAbortRefs.current[id];
        return;
      }
      summary = err instanceof Error ? err.message : 'Unknown error';
    }

    // Single save path — always update UI state and persist to DB
    setCheckResults(prev => ({
      ...prev,
      [id]: { verdict, summary, timestamp: Date.now() },
    }));

    try {
      const saveRes = await authFetch('/api/audit-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ findingId: id, verdict, summary }),
      });
      if (!saveRes.ok) {
        console.error(`[audit-check] Save failed for ${id}: HTTP ${saveRes.status}`);
        setSaveFailedIds(prev => new Set(prev).add(id));
      } else {
        setSaveFailedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
      }
    } catch (saveErr) {
      console.error(`[audit-check] Save error for ${id}:`, saveErr);
      setSaveFailedIds(prev => new Set(prev).add(id));
    }

    setCheckingIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    delete checkAbortRefs.current[id];
  }, []);

  const filteredFindings = useMemo(() => {
    if (filterSeverity === 'ALL') return AUDIT_FINDINGS;
    return AUDIT_FINDINGS.filter(f => f.severity === filterSeverity);
  }, [filterSeverity]);

  // ── Check All callbacks ──
  const handleCheckAll = useCallback(async () => {
    setCheckAllRunning(true);
    checkAllAbortRef.current = false;
    const findings = filteredFindings;
    setCheckAllProgress({ current: 0, total: findings.length });

    for (let i = 0; i < findings.length; i++) {
      if (checkAllAbortRef.current) break;
      setCheckAllProgress({ current: i + 1, total: findings.length });
      await handleRecheck(findings[i]);
      if (checkAllAbortRef.current) break;
    }

    setCheckAllRunning(false);
    setCheckAllProgress(null);
  }, [filteredFindings, handleRecheck]);

  const handleCheckAllStop = useCallback(() => {
    checkAllAbortRef.current = true;
    Object.values(checkAbortRefs.current).forEach(c => c.abort());
    setCheckAllRunning(false);
    setCheckAllProgress(null);
  }, []);

  const severityFilters: FilterSeverity[] = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="aud-header">
        <div className="aud-header-row">
          <h2 className="aud-title">Security &amp; Risk Audit</h2>
          <span className="aud-critical-badge" data-has-critical={stats.bySeverity.CRITICAL > 0}>
            {stats.bySeverity.CRITICAL > 0 ? `${stats.bySeverity.CRITICAL} Critical` : 'No Critical'}
          </span>

          {/* Action buttons */}
          <div className="aud-actions">
            {/* Check All button */}
            {!checkAllRunning ? (
              <button onClick={handleCheckAll} disabled={checkAllRunning} className="aud-action-btn" data-variant="info">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Check All
              </button>
            ) : (
              <button onClick={handleCheckAllStop} className="aud-action-btn" data-variant="danger">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={6} y={6} width={12} height={12} />
                </svg>
                {checkAllProgress ? `${checkAllProgress.current}/${checkAllProgress.total}` : 'Stop'}
              </button>
            )}

            {/* Re-run Audit button */}
            {!rerunRunning ? (
              <button onClick={handleRerun} className="aud-action-btn" data-variant="info">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Re-run Audit
              </button>
            ) : (
              <button onClick={handleRerunStop} className="aud-action-btn" data-variant="danger">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={6} y={6} width={12} height={12} />
                </svg>
                Stop
              </button>
            )}
          </div>
        </div>
        <p className="aud-subtitle">
          Institutional-grade vulnerability assessment across 35 audit categories.
          CVSS v3.1 scoring. OWASP / CWE / GDPR / SOC 2 compliance mapping.
        </p>
      </div>

      {/* ── Audit Metadata ─────────────────────────────────────────────── */}
      <div className="aud-metadata-bar">
        <span>Date: <strong className="aud-metadata-val">{AUDIT_METADATA.date}</strong></span>
        <span>Scope: <strong className="aud-metadata-val">{AUDIT_METADATA.scope}</strong></span>
        <span>Stack: <strong className="aud-metadata-val">{AUDIT_METADATA.stack}</strong></span>
        <span>Version: <strong className="aud-metadata-val">{AUDIT_METADATA.version}</strong></span>
      </div>

      {/* ── Score Summary ──────────────────────────────────────────────── */}
      <div className="aud-score-grid">
        <StatBox label="Total Findings" value={stats.total} />
        <StatBox label="Critical" value={stats.bySeverity.CRITICAL} accent="#FF4D4F" />
        <StatBox label="High" value={stats.bySeverity.HIGH} accent="#FF7B72" />
        <StatBox label="Medium" value={stats.bySeverity.MEDIUM} accent="#D29922" />
        <StatBox label="Max CVSS" value={stats.maxCvss.toFixed(1)} accent="#FF4D4F" />
        <StatBox label="Avg CVSS" value={stats.avgCvss.toFixed(1)} accent="#D29922" />
      </div>

      {/* ── Severity Distribution Bar ──────────────────────────────────── */}
      <SeverityBar bySeverity={stats.bySeverity} />

      {/* ── View Tabs ──────────────────────────────────────────────────── */}
      {auditMd && (
        <div className="aud-tabs">
          {[
            { key: 'findings', label: 'Findings & Categories' },
            { key: 'exec', label: 'Executive Summary' },
            { key: 'vibe', label: 'Vibe-Code Bomb' },
            { key: 'financial', label: 'Financial & UX' },
            { key: 'formula', label: 'Formula & Math' },
            { key: 'registry', label: 'Audit Programs' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveView(t.key)}
              className="aud-tab"
              data-active={activeView === t.key}
            >{t.label}</button>
          ))}
        </div>
      )}

      {/* ── Report Tabs (non-findings views) ───────────────────────────── */}
      {auditMd && activeView !== 'findings' && (
        <div style={{ marginTop: 24 }}>
          <Suspense fallback={<div className="aud-loading">Loading report…</div>}>
            <AuditReportSection content={auditMd} initialTab={activeView} />
          </Suspense>
        </div>
      )}

      {/* ── Findings View ──────────────────────────────────────────────── */}
      {(activeView === 'findings' || !auditMd) && <>

      {/* ── Filter Controls ────────────────────────────────────────────── */}
      <div className="aud-filter-row">
        <span className="aud-filter-label">Filter</span>
        {severityFilters.map(sev => {
          const isActive = filterSeverity === sev;
          const cfg = sev === 'ALL' ? null : SEVERITY_CONFIG[sev];
          return (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className="aud-filter-btn"
              data-active={isActive}
              style={cfg ? { '--aud-sev-border': cfg.border, '--aud-sev-bg': cfg.bg, '--aud-sev-color': cfg.color } as React.CSSProperties : undefined}
            >
              {sev === 'ALL' ? `All (${stats.total})` : `${sev} (${stats.bySeverity[sev]})`}
            </button>
          );
        })}
      </div>

      {/* ── Findings Table ─────────────────────────────────────────────── */}
      <div className="aud-table">
        {/* Table Header */}
        <div className="aud-table-header">
          <span>ID</span>
          <span>Severity</span>
          <span>Finding</span>
          <span>CVSS</span>
          <span>Effort</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Finding Rows */}
        {filteredFindings.map(finding => (
          <FindingRow
            key={finding.id}
            finding={finding}
            expanded={expandedId === finding.id}
            onToggle={() => setExpandedId(expandedId === finding.id ? null : finding.id)}
            checkResult={checkResults[finding.id]}
            isChecking={checkingIds.has(finding.id)}
            onRecheck={() => handleRecheck(finding)}
            saveFailed={saveFailedIds.has(finding.id)}
          />
        ))}
      </div>

      {/* ── Compliance Coverage ─────────────────────────────────────────── */}
      <div className="aud-section">
        <div className="aud-section-heading">Compliance Framework Coverage</div>
        <div className="aud-tag-list">
          {Array.from(new Set(AUDIT_FINDINGS.flatMap(f => f.compliance))).sort().map(fw => {
            const count = AUDIT_FINDINGS.filter(f => f.compliance.includes(fw)).length;
            return <span key={fw} className="aud-tag">{fw} ({count})</span>;
          })}
        </div>
      </div>

      {/* ── Remediation Priority Matrix ─────────────────────────────────── */}
      <div className="aud-section">
        <div className="aud-section-heading">Remediation Priority Matrix</div>
        <div className="aud-priority-grid">
          {(['Immediate', 'Short-term', 'Medium-term', 'Long-term'] as const).map(effort => {
            const findings = AUDIT_FINDINGS.filter(f => f.effort === effort);
            const color = EFFORT_COLORS[effort];
            return (
              <div key={effort} className="aud-priority-card" style={{ '--aud-effort-color': color } as React.CSSProperties}>
                <div className="aud-priority-effort">{effort}</div>
                <div className="aud-priority-count">{findings.length}</div>
                <div className="aud-priority-items">
                  {findings.slice(0, 4).map(f => (
                    <div key={f.id} className="aud-priority-item">
                      <span className="aud-priority-item-id">{f.id}</span>
                      {f.title}
                    </div>
                  ))}
                  {findings.length > 4 && (
                    <div className="aud-priority-more">+{findings.length - 4} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Methodology Footer ──────────────────────────────────────────── */}
      <div className="aud-methodology">
        <strong>Methodology:</strong>{' '}
        This audit covers 35 independent analysis categories including security, performance,
        accessibility, compliance, architecture, and operational readiness. Findings are scored
        using CVSS v3.1 base metrics and mapped to OWASP Top 10 2021, CWE, GDPR, SOC 2, and
        WCAG 2.1 AA standards. Severity levels follow NIST guidelines: Critical (CVSS 9.0–10.0),
        High (7.0–8.9), Medium (4.0–6.9), Low (0.1–3.9). Remediation effort estimates assume
        a single engineer with codebase familiarity.
      </div>

      {/* ── Re-run Results ────────────────────────────────────────────── */}
      {(rerunResult || rerunRunning || rerunError) && (
        <div className="aud-rerun-wrap">
          <button
            onClick={() => setRerunExpanded(!rerunExpanded)}
            className="aud-rerun-header"
            data-expanded={rerunExpanded}
          >
            <div className="aud-rerun-title-row">
              <span className="aud-rerun-title">Re-run Results</span>
              {rerunRunning && (
                <span className="aud-rerun-status">
                  <span className="aud-rerun-pulse" />
                  <span className="aud-rerun-analyzing">Analyzing...</span>
                </span>
              )}
              {!rerunRunning && rerunResult && (
                <span className="aud-rerun-complete">Complete</span>
              )}
            </div>
            <svg
              width={14} height={14} viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.25)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              className="aud-chevron" data-expanded={rerunExpanded}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {rerunExpanded && (
            <div className="aud-rerun-body">
              {rerunError && (
                <div className="aud-rerun-error">
                  <span className="aud-rerun-error-text">{rerunError}</span>
                </div>
              )}
              {rerunResult && (
                <div className="aud-rerun-output">
                  <pre className="aud-rerun-pre">{rerunResult}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      </>}
    </div>
  );
}
