'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import {
  AUDIT_FINDINGS,
  AUDIT_METADATA,
  getAuditStats,
  type AuditFinding,
  type Severity,
} from '@/data/audit-findings';
import { workflows } from '@/data/workflows';

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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: 'Space Mono, monospace',
        letterSpacing: '0.08em',
        padding: '2px 8px',
        borderRadius: 3,
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        textTransform: 'uppercase',
      }}
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
    <span
      style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: 11,
        fontWeight: 700,
        color,
      }}
    >
      {score.toFixed(1)}
    </span>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div
      style={{
        padding: '16px 20px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          fontFamily: 'Space Mono, monospace',
          color: accent || '#F0F6FC',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
          marginTop: 6,
        }}
      >
        {label}
      </div>
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
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          display: 'flex',
          height: 6,
          borderRadius: 3,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {segments.map(seg => (
          <div
            key={seg.severity}
            style={{
              width: `${seg.pct}%`,
              background: SEVERITY_CONFIG[seg.severity].color,
              transition: 'width 0.3s',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
        {segments.map(seg => (
          <div key={seg.severity} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: SEVERITY_CONFIG[seg.severity].color,
              }}
            />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace' }}>
              {seg.severity}: {seg.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FindingRow({ finding, expanded, onToggle }: { finding: AuditFinding; expanded: boolean; onToggle: () => void }) {
  const cfg = SEVERITY_CONFIG[finding.severity];

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Header Row */}
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '72px 72px 1fr 100px 80px 32px',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: expanded ? 'rgba(255,255,255,0.02)' : 'transparent',
          border: 'none',
          borderLeft: `3px solid ${cfg.color}`,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.15s',
          color: 'inherit',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
          {finding.id}
        </span>
        <SeverityBadge severity={finding.severity} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {finding.title}
        </span>
        <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.3)' }}>
          CVSS <CvssBadge score={finding.cvss} />
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: EFFORT_COLORS[finding.effort] || '#8B949E',
          }}
        >
          {finding.effort}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: 'rgba(255,255,255,0.25)',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div
          style={{
            padding: '0 16px 20px 89px',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>
              Description
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
              {finding.description}
            </div>
          </div>

          {/* Impact */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>
              Impact Assessment
            </div>
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: cfg.color,
                padding: '10px 14px',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: 6,
              }}
            >
              {finding.impact}
            </div>
          </div>

          {/* Affected Assets */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>
              Affected Assets
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {finding.affectedAssets.map(asset => (
                <code
                  key={asset}
                  style={{
                    fontSize: 10,
                    fontFamily: 'Space Mono, monospace',
                    padding: '2px 8px',
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {asset}
                </code>
              ))}
            </div>
          </div>

          {/* Remediation */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>
              Remediation Guidance
            </div>
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: 'rgba(126,231,135,0.85)',
                padding: '10px 14px',
                background: 'rgba(126,231,135,0.04)',
                border: '1px solid rgba(126,231,135,0.12)',
                borderRadius: 6,
              }}
            >
              {finding.remediation}
            </div>
          </div>

          {/* Metadata Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {finding.cwe && (
              <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.35)' }}>
                {finding.cwe}
              </span>
            )}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
              {finding.category}
            </span>
            {finding.compliance.length > 0 && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {finding.compliance.map(c => (
                  <span
                    key={c}
                    style={{
                      fontSize: 9,
                      fontFamily: 'Space Mono, monospace',
                      padding: '1px 6px',
                      borderRadius: 2,
                      background: 'rgba(121,192,255,0.08)',
                      border: '1px solid rgba(121,192,255,0.15)',
                      color: 'rgba(121,192,255,0.7)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

type FilterSeverity = 'ALL' | Severity;

export default function AuditDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<FilterSeverity>('ALL');
  const stats = useMemo(() => getAuditStats(), []);

  // ── Re-run state ──
  const [rerunResult, setRerunResult] = useState('');
  const [rerunRunning, setRerunRunning] = useState(false);
  const [rerunError, setRerunError] = useState('');
  const [rerunExpanded, setRerunExpanded] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const codeAuditPrompt = useMemo(() => {
    const wf = workflows.find(w => w.id === 'code-audit');
    return wf?.variants[0]?.prompt ?? '';
  }, []);

  const handleRerun = useCallback(async () => {
    if (!codeAuditPrompt) return;
    setRerunRunning(true);
    setRerunResult('');
    setRerunError('');
    setRerunExpanded(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/workflow/run', {
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

  const filteredFindings = useMemo(() => {
    if (filterSeverity === 'ALL') return AUDIT_FINDINGS;
    return AUDIT_FINDINGS.filter(f => f.severity === filterSeverity);
  }, [filterSeverity]);

  const severityFilters: FilterSeverity[] = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#F0F6FC',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Security &amp; Risk Audit
          </h2>
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '3px 8px',
              borderRadius: 3,
              background: stats.bySeverity.CRITICAL > 0 ? 'rgba(255,77,79,0.12)' : 'rgba(126,231,135,0.12)',
              color: stats.bySeverity.CRITICAL > 0 ? '#FF4D4F' : '#7EE787',
              border: `1px solid ${stats.bySeverity.CRITICAL > 0 ? 'rgba(255,77,79,0.25)' : 'rgba(126,231,135,0.25)'}`,
            }}
          >
            {stats.bySeverity.CRITICAL > 0 ? `${stats.bySeverity.CRITICAL} Critical` : 'No Critical'}
          </span>

          {/* Re-run button */}
          {!rerunRunning ? (
            <button
              onClick={handleRerun}
              style={{
                marginLeft: 'auto',
                fontSize: 9,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 12px',
                borderRadius: 4,
                background: 'rgba(121,192,255,0.06)',
                border: '1px solid rgba(121,192,255,0.2)',
                color: 'rgba(121,192,255,0.8)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Re-run Audit
            </button>
          ) : (
            <button
              onClick={handleRerunStop}
              style={{
                marginLeft: 'auto',
                fontSize: 9,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 12px',
                borderRadius: 4,
                background: 'rgba(255,77,79,0.06)',
                border: '1px solid rgba(255,77,79,0.2)',
                color: 'rgba(255,77,79,0.8)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x={6} y={6} width={12} height={12} />
              </svg>
              Stop
            </button>
          )}
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6 }}>
          Institutional-grade vulnerability assessment across 35 audit categories.
          CVSS v3.1 scoring. OWASP / CWE / GDPR / SOC 2 compliance mapping.
        </p>
      </div>

      {/* ── Audit Metadata ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 8,
          marginBottom: 24,
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'Space Mono, monospace',
        }}
      >
        <span>Date: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{AUDIT_METADATA.date}</strong></span>
        <span>Scope: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{AUDIT_METADATA.scope}</strong></span>
        <span>Stack: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{AUDIT_METADATA.stack}</strong></span>
        <span>Version: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{AUDIT_METADATA.version}</strong></span>
      </div>

      {/* ── Score Summary ──────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 10,
          marginBottom: 24,
        }}
      >
        <StatBox label="Total Findings" value={stats.total} />
        <StatBox label="Critical" value={stats.bySeverity.CRITICAL} accent="#FF4D4F" />
        <StatBox label="High" value={stats.bySeverity.HIGH} accent="#FF7B72" />
        <StatBox label="Medium" value={stats.bySeverity.MEDIUM} accent="#D29922" />
        <StatBox label="Max CVSS" value={stats.maxCvss.toFixed(1)} accent="#FF4D4F" />
        <StatBox label="Avg CVSS" value={stats.avgCvss.toFixed(1)} accent="#D29922" />
      </div>

      {/* ── Severity Distribution Bar ──────────────────────────────────── */}
      <SeverityBar bySeverity={stats.bySeverity} />

      {/* ── Filter Controls ────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 28,
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginRight: 8 }}>
          Filter
        </span>
        {severityFilters.map(sev => {
          const isActive = filterSeverity === sev;
          const cfg = sev === 'ALL' ? null : SEVERITY_CONFIG[sev];
          return (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              style={{
                fontSize: 10,
                fontWeight: 600,
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.06em',
                padding: '4px 10px',
                borderRadius: 4,
                border: `1px solid ${isActive ? (cfg?.border || 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.06)'}`,
                background: isActive ? (cfg?.bg || 'rgba(255,255,255,0.06)') : 'transparent',
                color: isActive ? (cfg?.color || 'rgba(255,255,255,0.7)') : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textTransform: 'uppercase',
              }}
            >
              {sev === 'ALL' ? `All (${stats.total})` : `${sev} (${stats.bySeverity[sev]})`}
            </button>
          );
        })}
      </div>

      {/* ── Findings Table ─────────────────────────────────────────────── */}
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '72px 72px 1fr 100px 80px 32px',
            gap: 12,
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <span>ID</span>
          <span>Severity</span>
          <span>Finding</span>
          <span>CVSS</span>
          <span>Effort</span>
          <span></span>
        </div>

        {/* Finding Rows */}
        {filteredFindings.map(finding => (
          <FindingRow
            key={finding.id}
            finding={finding}
            expanded={expandedId === finding.id}
            onToggle={() => setExpandedId(expandedId === finding.id ? null : finding.id)}
          />
        ))}
      </div>

      {/* ── Compliance Coverage ─────────────────────────────────────────── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
          Compliance Framework Coverage
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {Array.from(new Set(AUDIT_FINDINGS.flatMap(f => f.compliance))).sort().map(fw => {
            const count = AUDIT_FINDINGS.filter(f => f.compliance.includes(fw)).length;
            return (
              <span
                key={fw}
                style={{
                  fontSize: 10,
                  fontFamily: 'Space Mono, monospace',
                  padding: '4px 10px',
                  borderRadius: 4,
                  background: 'rgba(121,192,255,0.06)',
                  border: '1px solid rgba(121,192,255,0.12)',
                  color: 'rgba(121,192,255,0.65)',
                }}
              >
                {fw} ({count})
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Remediation Priority Matrix ─────────────────────────────────── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
          Remediation Priority Matrix
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
          }}
        >
          {(['Immediate', 'Short-term', 'Medium-term', 'Long-term'] as const).map(effort => {
            const findings = AUDIT_FINDINGS.filter(f => f.effort === effort);
            const color = EFFORT_COLORS[effort];
            return (
              <div
                key={effort}
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  borderTop: `2px solid ${color}`,
                }}
              >
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color, marginBottom: 8 }}>
                  {effort}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>
                  {findings.length}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {findings.slice(0, 4).map(f => (
                    <div key={f.id} style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.5)', marginRight: 6 }}>{f.id}</span>
                      {f.title}
                    </div>
                  ))}
                  {findings.length > 4 && (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                      +{findings.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Methodology Footer ──────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 32,
          padding: '16px 18px',
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: 8,
          fontSize: 11,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Methodology:</strong>{' '}
        This audit covers 35 independent analysis categories including security, performance,
        accessibility, compliance, architecture, and operational readiness. Findings are scored
        using CVSS v3.1 base metrics and mapped to OWASP Top 10 2021, CWE, GDPR, SOC 2, and
        WCAG 2.1 AA standards. Severity levels follow NIST guidelines: Critical (CVSS 9.0–10.0),
        High (7.0–8.9), Medium (4.0–6.9), Low (0.1–3.9). Remediation effort estimates assume
        a single engineer with codebase familiarity.
      </div>

      {/* ── Re-run Results ────────────────────────────────────────────── */}
      {(rerunResult || rerunRunning || rerunError) && (
        <div style={{ marginTop: 32 }}>
          <button
            onClick={() => setRerunExpanded(!rerunExpanded)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: 'rgba(121,192,255,0.03)',
              border: '1px solid rgba(121,192,255,0.12)',
              borderRadius: rerunExpanded ? '8px 8px 0 0' : 8,
              cursor: 'pointer',
              color: 'inherit',
              fontFamily: 'inherit',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(121,192,255,0.7)' }}>
                Re-run Results
              </span>
              {rerunRunning && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(121,192,255,0.6)', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Analyzing...</span>
                </span>
              )}
              {!rerunRunning && rerunResult && (
                <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(126,231,135,0.5)' }}>Complete</span>
              )}
            </div>
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: rerunExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {rerunExpanded && (
            <div
              style={{
                border: '1px solid rgba(121,192,255,0.12)',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                background: 'rgba(255,255,255,0.01)',
              }}
            >
              {rerunError && (
                <div style={{ padding: '12px 18px' }}>
                  <span style={{ fontSize: 11, color: '#FF4D4F' }}>{rerunError}</span>
                </div>
              )}
              {rerunResult && (
                <div style={{ maxHeight: 600, overflowY: 'auto', padding: '16px 18px' }}>
                  <pre
                    style={{
                      fontSize: 12,
                      fontFamily: 'Space Mono, monospace',
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                    }}
                  >
                    {rerunResult}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
