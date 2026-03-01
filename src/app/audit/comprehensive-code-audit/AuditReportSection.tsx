'use client';

import { useState, useMemo, useRef } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface ParsedSection {
  id: string;
  number: string;
  title: string;
  body: string;             // raw markdown body (below the ## heading)
  issues: ParsedIssue[];
  recommendations: string[];
  goodFindings: string[];
}

interface ParsedIssue {
  ref: string;       // e.g. "1.1", "4.1"
  location: string;  // code location
  severity: string;  // "Critical" | "High" | "Medium" | "Low" | "Good" | "Info" | "Praise"
  description: string;
}

interface VibeBombCheck {
  number: number;
  title: string;
  verdict: 'GUILTY' | 'NOT GUILTY' | 'PARTIAL';
  severity?: string;
  body: string;
  crossRefs?: string;
}

interface FinancialCategory {
  name: string;
  score: string;
  weight: string;
  weighted: string;
}

// ── Severity Colors ──────────────────────────────────────────────────────────

const SEV: Record<string, { color: string; bg: string; border: string }> = {
  critical: { color: '#FF4D4F', bg: 'rgba(255,77,79,0.08)', border: 'rgba(255,77,79,0.25)' },
  high:     { color: '#FF7B72', bg: 'rgba(255,123,114,0.08)', border: 'rgba(255,123,114,0.2)' },
  medium:   { color: '#D29922', bg: 'rgba(210,153,34,0.08)', border: 'rgba(210,153,34,0.2)' },
  low:      { color: '#8B949E', bg: 'rgba(139,148,158,0.08)', border: 'rgba(139,148,158,0.2)' },
  info:     { color: '#79C0FF', bg: 'rgba(121,192,255,0.08)', border: 'rgba(121,192,255,0.2)' },
  good:     { color: '#7EE787', bg: 'rgba(126,231,135,0.06)', border: 'rgba(126,231,135,0.15)' },
  praise:   { color: '#7EE787', bg: 'rgba(126,231,135,0.06)', border: 'rgba(126,231,135,0.15)' },
  cosmetic: { color: '#8B949E', bg: 'rgba(139,148,158,0.06)', border: 'rgba(139,148,158,0.15)' },
};

const VERDICT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'GUILTY':     { color: '#FF4D4F', bg: 'rgba(255,77,79,0.08)', border: 'rgba(255,77,79,0.2)' },
  'NOT GUILTY': { color: '#7EE787', bg: 'rgba(126,231,135,0.06)', border: 'rgba(126,231,135,0.15)' },
  'PARTIAL':    { color: '#D29922', bg: 'rgba(210,153,34,0.08)', border: 'rgba(210,153,34,0.2)' },
};

function getSev(s: string) {
  const k = s.replace(/\*\*/g, '').trim().toLowerCase();
  return SEV[k] || SEV.info;
}

// ── Parsers ──────────────────────────────────────────────────────────────────

function parseCCA10Sections(md: string): ParsedSection[] {
  // Split on ## N. Title  (only top-level numbered sections 1-35)
  const sectionRegex = /^## (\d{1,2})\. (.+)$/gm;
  const matches: { idx: number; num: string; title: string }[] = [];
  let m;
  while ((m = sectionRegex.exec(md)) !== null) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 35) {
      matches.push({ idx: m.index, num: m[1], title: m[2] });
    }
  }

  return matches.map((sec, i) => {
    const end = i + 1 < matches.length ? matches[i + 1].idx : md.indexOf('\n## Executive Summary');
    const body = md.slice(sec.idx, end > sec.idx ? end : undefined);

    // Parse issues from markdown tables
    const issues: ParsedIssue[] = [];
    const tableRowRe = /^\| (\d+\.\d+) \| (.+?) \| (.+?) \| (.+?) \|$/gm;
    let row;
    while ((row = tableRowRe.exec(body)) !== null) {
      issues.push({
        ref: row[1].trim(),
        location: row[2].trim().replace(/`/g, ''),
        severity: row[3].replace(/\*\*/g, '').trim(),
        description: row[4].trim(),
      });
    }

    // Parse recommendations
    const recSection = body.match(/### Recommendations\n([\s\S]*?)(?=\n---|\n## |$)/);
    const recommendations: string[] = [];
    if (recSection) {
      const lines = recSection[1].split('\n').filter(l => l.startsWith('- '));
      for (const l of lines) recommendations.push(l.replace(/^- /, '').trim());
    }

    const goodFindings = issues.filter(x => x.severity.toLowerCase() === 'good' || x.severity.toLowerCase() === 'praise').map(x => x.description);

    return {
      id: `cca-${sec.num}`,
      number: sec.num,
      title: sec.title,
      body,
      issues: issues.filter(x => x.severity.toLowerCase() !== 'good' && x.severity.toLowerCase() !== 'praise'),
      recommendations,
      goodFindings,
    };
  });
}

function parseVibeBomb(md: string): VibeBombCheck[] {
  const appendixStart = md.indexOf('## Appendix A');
  if (appendixStart === -1) return [];
  const appendixEnd = md.indexOf('\n## Appendix B', appendixStart);
  const section = md.slice(appendixStart, appendixEnd > appendixStart ? appendixEnd : undefined);

  const checks: VibeBombCheck[] = [];
  const checkRegex = /### (\d+)\. (.+?)\n\n\*\*Verdict: (GUILTY|NOT GUILTY|PARTIAL)\*\*/g;
  let match;
  while ((match = checkRegex.exec(section)) !== null) {
    const num = parseInt(match[1], 10);
    const endIdx = section.indexOf(`### ${num + 1}.`, match.index + 1);
    const bodyEnd = endIdx > -1 ? endIdx : section.indexOf('### Vibe-Code Bomb Scorecard', match.index + 1);
    const body = section.slice(match.index + match[0].length, bodyEnd > -1 ? bodyEnd : undefined).trim();

    // Extract severity if present
    const sevMatch = body.match(/Severity: (CRITICAL|HIGH|MEDIUM|LOW|INFO)/i);
    const crossRefMatch = body.match(/\*\*Cross-refs?:\*\* (.+?)$/m);

    checks.push({
      number: num,
      title: match[2].trim(),
      verdict: match[3] as VibeBombCheck['verdict'],
      severity: sevMatch ? sevMatch[1] : undefined,
      body: body.split('\n').filter(l => !l.startsWith('**New finding') && !l.startsWith('**Cross-ref')).join('\n').trim(),
      crossRefs: crossRefMatch ? crossRefMatch[1] : undefined,
    });
  }
  return checks;
}

function parseExecSummary(md: string): { critical: string[][]; high: string[][]; doneWell: string[] } {
  const start = md.indexOf('## Executive Summary');
  if (start === -1) return { critical: [], high: [], doneWell: [] };
  const end = md.indexOf('\n## Appendix A', start);
  const section = md.slice(start, end > start ? end : undefined);

  const parseTable = (header: string): string[][] => {
    const idx = section.indexOf(header);
    if (idx === -1) return [];
    const block = section.slice(idx);
    const rows: string[][] = [];
    const rowRe = /^\| (\w+) \| \*\*(.+?)\*\* \| (.+?) \|$/gm;
    let m;
    while ((m = rowRe.exec(block)) !== null) {
      rows.push([m[1], m[2], m[3]]);
    }
    return rows;
  };

  const doneWell: string[] = [];
  const dwIdx = section.indexOf("### What's Done Well");
  if (dwIdx > -1) {
    const dwBlock = section.slice(dwIdx, section.indexOf('### Recommended', dwIdx));
    const lines = dwBlock.split('\n').filter(l => l.startsWith('- **'));
    for (const l of lines) {
      const m2 = l.match(/- \*\*(.+?)\*\*[:\s]*(.+)/);
      if (m2) doneWell.push(`${m2[1]}: ${m2[2]}`);
    }
  }

  return {
    critical: parseTable('### Critical Issues'),
    high: parseTable('### High-Severity Issues'),
    doneWell,
  };
}

function parseFinancialScorecard(md: string): FinancialCategory[] {
  const start = md.indexOf('## Appendix B');
  if (start === -1) return [];
  const block = md.slice(start, start + 2000);
  const rows: FinancialCategory[] = [];
  const rowRe = /^\| (.+?) \| (\d+\.?\d*\/10) \| (\d+%) \| (\d+\.\d+) \|$/gm;
  let m;
  while ((m = rowRe.exec(block)) !== null) {
    if (!m[1].includes('TOTAL')) {
      rows.push({ name: m[1].trim(), score: m[2], weight: m[3], weighted: m[4] });
    }
  }
  return rows;
}

// ── Sub-Components ───────────────────────────────────────────────────────────

function SevBadge({ severity }: { severity: string }) {
  const s = getSev(severity);
  const label = severity.replace(/\*\*/g, '').trim();
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace',
      letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 3,
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function VerdictBadge({ verdict }: { verdict: string }) {
  const v = VERDICT_STYLE[verdict] || VERDICT_STYLE['PARTIAL'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono, monospace',
      letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 4,
      color: v.color, background: v.bg, border: `1px solid ${v.border}`,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {verdict}
    </span>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div style={{
      padding: '16px 20px', background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, minWidth: 0,
    }}>
      <div style={{
        fontSize: 24, fontWeight: 700, fontFamily: 'Space Mono, monospace',
        color: accent || '#F0F6FC', lineHeight: 1.2,
      }}>{value}</div>
      <div style={{
        fontSize: 10, fontWeight: 500, textTransform: 'uppercase',
        letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginTop: 6,
      }}>{label}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', marginBottom: 8,
    }}>{children}</div>
  );
}

function CodeRef({ text }: { text: string }) {
  return (
    <code style={{
      fontSize: 10, fontFamily: 'Space Mono, monospace',
      padding: '2px 8px', borderRadius: 3,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
      color: 'rgba(255,255,255,0.5)', wordBreak: 'break-all',
    }}>{text}</code>
  );
}

function IssueRow({ issue, expanded, onToggle }: { issue: ParsedIssue; expanded: boolean; onToggle: () => void }) {
  const s = getSev(issue.severity);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div
        role="button" tabIndex={0}
        onClick={onToggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        style={{
          display: 'grid',
          gridTemplateColumns: '52px 72px 1fr 32px',
          alignItems: 'center', gap: 12,
          padding: '12px 16px',
          background: expanded ? 'rgba(255,255,255,0.02)' : 'transparent',
          borderLeft: `3px solid ${s.color}`,
          cursor: 'pointer', transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
          {issue.ref}
        </span>
        <SevBadge severity={issue.severity} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.description.slice(0, 120)}{issue.description.length > 120 ? '...' : ''}
        </span>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'rgba(255,255,255,0.25)', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
      {expanded && (
        <div style={{ padding: '0 16px 16px 71px', background: 'rgba(255,255,255,0.015)' }}>
          <SectionLabel>Location</SectionLabel>
          <div style={{ marginBottom: 12 }}><CodeRef text={issue.location} /></div>
          <SectionLabel>Description</SectionLabel>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
            {issue.description}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Collapsible Section ──────────────────────────────────────────────────────

function CollapsibleSection({ title, count, severity, defaultOpen, children }: {
  title: string; count?: number; severity?: string; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div style={{
      marginBottom: 12,
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.01)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 18px', background: 'none', border: 'none',
          cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.01em' }}>
          {title}
        </span>
        {count !== undefined && (
          <span style={{
            fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 700,
            padding: '2px 8px', borderRadius: 10,
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)',
          }}>{count}</span>
        )}
        {severity && <SevBadge severity={severity} />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Tabs Component ───────────────────────────────────────────────────────────

type TabKey = 'cca10' | 'exec' | 'vibe' | 'financial' | 'formula' | 'registry';

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: 'cca10',     label: 'CCA-1.0 (35 Categories)' },
  { key: 'exec',      label: 'Executive Summary' },
  { key: 'vibe',      label: 'Vibe-Code Bomb' },
  { key: 'financial', label: 'Financial & UX' },
  { key: 'formula',   label: 'Formula & Math' },
  { key: 'registry',  label: 'Audit Programs' },
];

// ── Main Component ───────────────────────────────────────────────────────────

export default function AuditReportSection({ content, initialTab }: { content: string; initialTab?: string }) {
  const [tab, setTab] = useState<TabKey>((initialTab as TabKey) || 'cca10');
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  // Sync tab from parent when initialTab changes
  const prevInitialTab = useRef(initialTab);
  if (initialTab && initialTab !== prevInitialTab.current) {
    prevInitialTab.current = initialTab;
    if (initialTab !== tab) setTab(initialTab as TabKey);
  }

  const sections = useMemo(() => parseCCA10Sections(content), [content]);
  const vibeChecks = useMemo(() => parseVibeBomb(content), [content]);
  const execSummary = useMemo(() => parseExecSummary(content), [content]);
  const financialScores = useMemo(() => parseFinancialScorecard(content), [content]);

  const toggleIssue = (key: string) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  // Aggregate stats
  const totalIssues = sections.reduce((acc, s) => acc + s.issues.length, 0);
  const bySev = sections.reduce((acc, s) => {
    for (const iss of s.issues) {
      const k = iss.severity.toLowerCase();
      acc[k] = (acc[k] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const vibeGuilty = vibeChecks.filter(c => c.verdict === 'GUILTY').length;
  const vibePartial = vibeChecks.filter(c => c.verdict === 'PARTIAL').length;
  const vibeNotGuilty = vibeChecks.filter(c => c.verdict === 'NOT GUILTY').length;

  const embedded = !!initialTab;

  return (
    <div>
      {/* ── Stat Cards (standalone mode only) ──────────────────────────── */}
      {!embedded && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          <StatBox label="CCA-1.0 Categories" value={35} accent="#79C0FF" />
          <StatBox label="Issues Found" value={totalIssues} accent={bySev.critical ? '#FF4D4F' : '#D29922'} />
          <StatBox label="Critical" value={bySev.critical || 0} accent="#FF4D4F" />
          <StatBox label="High" value={bySev.high || 0} accent="#FF7B72" />
          <StatBox label="Vibe Score" value={`${vibeGuilty + vibePartial * 0.5}/${vibeChecks.length}`} accent="#D29922" />
          <StatBox label="Financial" value="7.8/10" accent="#7EE787" />
        </div>
      )}

      {/* ── Severity Bar (standalone mode only) ────────────────────────── */}
      {!embedded && totalIssues > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
            {(['critical', 'high', 'medium', 'low', 'info'] as const).filter(s => bySev[s]).map(s => (
              <div key={s} style={{ width: `${((bySev[s] || 0) / totalIssues) * 100}%`, background: SEV[s].color, transition: 'width 0.3s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            {(['critical', 'high', 'medium', 'low', 'info'] as const).filter(s => bySev[s]).map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: SEV[s].color }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace' }}>
                  {s.toUpperCase()}: {bySev[s]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab Navigation (standalone mode only) ──────────────────────── */}
      {!embedded && (
        <div style={{
          display: 'flex', gap: 0, marginBottom: 24,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto',
        }}>
          {TAB_LABELS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '10px 16px',
                fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                background: 'none', border: 'none',
                borderBottom: tab === t.key ? '2px solid rgba(121,192,255,0.7)' : '2px solid transparent',
                color: tab === t.key ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
              }}
            >{t.label}</button>
          ))}
        </div>
      )}

      {/* ── CCA-1.0 Tab ────────────────────────────────────────────────── */}
      {tab === 'cca10' && (
        <div>
          {sections.map(sec => (
            <CollapsibleSection
              key={sec.id}
              title={`${sec.number}. ${sec.title}`}
              count={sec.issues.length}
              severity={sec.issues.length > 0
                ? sec.issues.reduce((worst, iss) => {
                    const order = ['critical','high','medium','low','info'];
                    const a = order.indexOf(worst.toLowerCase());
                    const b = order.indexOf(iss.severity.toLowerCase());
                    return b < a ? iss.severity : worst;
                  }, 'info')
                : undefined}
            >
              {/* Issues list */}
              {sec.issues.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  {sec.issues.map(iss => (
                    <IssueRow
                      key={iss.ref}
                      issue={iss}
                      expanded={expandedIssues.has(iss.ref)}
                      onToggle={() => toggleIssue(iss.ref)}
                    />
                  ))}
                </div>
              )}

              {/* Good findings */}
              {sec.goodFindings.length > 0 && (
                <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <SectionLabel>What&apos;s Done Well</SectionLabel>
                  {sec.goodFindings.map((g, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                      fontSize: 12, lineHeight: 1.7, color: 'rgba(126,231,135,0.7)',
                      marginBottom: 4,
                    }}>
                      <span style={{ color: 'rgba(126,231,135,0.4)', flexShrink: 0 }}>✓</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendations */}
              {sec.recommendations.length > 0 && (
                <div style={{
                  padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.04)',
                  background: 'rgba(121,192,255,0.02)',
                }}>
                  <SectionLabel>Recommendations</SectionLabel>
                  {sec.recommendations.map((r, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                      fontSize: 12, lineHeight: 1.7, color: 'rgba(121,192,255,0.7)',
                      marginBottom: 4,
                    }}>
                      <span style={{ color: 'rgba(121,192,255,0.3)', flexShrink: 0 }}>→</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleSection>
          ))}
        </div>
      )}

      {/* ── Executive Summary Tab ──────────────────────────────────────── */}
      {tab === 'exec' && (
        <div>
          {/* Critical Issues */}
          {execSummary.critical.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <SectionLabel>Critical Issues — Require Immediate Attention</SectionLabel>
              <div style={{
                border: '1px solid rgba(255,77,79,0.2)',
                borderRadius: 10, overflow: 'hidden',
              }}>
                {execSummary.critical.map((row, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr',
                    gap: 12, padding: '14px 18px',
                    borderBottom: i < execSummary.critical.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    borderLeft: '3px solid #FF4D4F',
                    background: 'rgba(255,77,79,0.04)',
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 600, color: '#FF4D4F' }}>{row[0]}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>{row[1]}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{row[2]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High Issues */}
          {execSummary.high.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <SectionLabel>High-Severity Issues</SectionLabel>
              <div style={{
                border: '1px solid rgba(255,123,114,0.15)',
                borderRadius: 10, overflow: 'hidden',
              }}>
                {execSummary.high.map((row, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr',
                    gap: 12, padding: '14px 18px',
                    borderBottom: i < execSummary.high.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    borderLeft: '3px solid #FF7B72',
                    background: 'rgba(255,123,114,0.03)',
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 600, color: '#FF7B72' }}>{row[0]}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>{row[1]}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{row[2]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Done Well */}
          {execSummary.doneWell.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <SectionLabel>What&apos;s Done Well</SectionLabel>
              <div style={{
                padding: '16px 20px',
                background: 'rgba(126,231,135,0.03)',
                border: '1px solid rgba(126,231,135,0.12)',
                borderRadius: 10,
              }}>
                {execSummary.doneWell.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, alignItems: 'flex-start',
                    fontSize: 12, lineHeight: 1.7, color: 'rgba(126,231,135,0.8)',
                    marginBottom: i < execSummary.doneWell.length - 1 ? 8 : 0,
                  }}>
                    <span style={{ color: 'rgba(126,231,135,0.4)', flexShrink: 0, fontFamily: 'Space Mono, monospace' }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Priority Order */}
          <SectionLabel>Recommended Priority Order</SectionLabel>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            {[
              'Add authentication to all write endpoints',
              'Add URL validation to prevent SSRF',
              'Set up CI/CD with lint → type-check → build',
              'Add basic test coverage for critical routes',
              'Add security headers via next.config.ts',
              'Deduplicate code (RSS, HTML, seed, ensureTable)',
              'Break up monolithic components',
              'Add monitoring (Sentry + Vercel Analytics)',
              'Update README with proper documentation',
              'Add rate limiting middleware',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 18px',
                borderBottom: i < 9 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{
                  fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 700,
                  color: i < 2 ? '#FF4D4F' : i < 4 ? '#FF7B72' : i < 6 ? '#D29922' : '#8B949E',
                  width: 24, textAlign: 'right', flexShrink: 0,
                }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Vibe-Code Bomb Tab ─────────────────────────────────────────── */}
      {tab === 'vibe' && (
        <div>
          {/* Summary bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
            <StatBox label="Guilty" value={vibeGuilty} accent="#FF4D4F" />
            <StatBox label="Partial" value={vibePartial} accent="#D29922" />
            <StatBox label="Not Guilty" value={vibeNotGuilty} accent="#7EE787" />
            <StatBox label="Bomb Score" value={`${(vibeGuilty + vibePartial * 0.5).toFixed(1)}/${vibeChecks.length}`} accent="#FF7B72" />
          </div>

          {/* Checks */}
          {vibeChecks.map(check => (
            <CollapsibleSection
              key={check.number}
              title={`${check.number}. ${check.title}`}
              severity={check.severity}
            >
              <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <VerdictBadge verdict={check.verdict} />
                  {check.severity && <SevBadge severity={check.severity} />}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>
                  {check.body.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ marginBottom: 6 }}>
                      {line.startsWith('- ') ? (
                        <span style={{ display: 'flex', gap: 6 }}>
                          <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>•</span>
                          <span>{line.slice(2)}</span>
                        </span>
                      ) : line}
                    </p>
                  ))}
                </div>
                {check.crossRefs && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{
                      fontSize: 10, fontFamily: 'Space Mono, monospace',
                      color: 'rgba(121,192,255,0.5)',
                    }}>Cross-refs: {check.crossRefs}</span>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          ))}

          {/* Scorecard */}
          <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
            <SectionLabel>Scorecard Summary</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: '#FF4D4F', fontWeight: 700 }}>GUILTY</span>: {vibeGuilty} / {vibeChecks.length} ({Math.round(vibeGuilty / vibeChecks.length * 100)}%)
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: '#D29922', fontWeight: 700 }}>PARTIAL</span>: {vibePartial} / {vibeChecks.length} ({Math.round(vibePartial / vibeChecks.length * 100)}%)
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: '#7EE787', fontWeight: 700 }}>NOT GUILTY</span>: {vibeNotGuilty} / {vibeChecks.length} ({Math.round(vibeNotGuilty / vibeChecks.length * 100)}%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Financial & UX Tab ─────────────────────────────────────────── */}
      {tab === 'financial' && (
        <div>
          {/* Score card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: '3px solid rgba(126,231,135,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(126,231,135,0.04)',
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: '#7EE787' }}>7.8</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Overall Score: 7.8 / 10</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Financial Model & UX Audit — Feb 13, 2026</div>
            </div>
          </div>

          {/* Category scores */}
          {financialScores.length > 0 && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, overflow: 'hidden', marginBottom: 24,
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px',
                gap: 8, padding: '10px 18px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                {['Category', 'Score', 'Weight', 'Weighted'].map(h => (
                  <span key={h} style={{
                    fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)',
                  }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {financialScores.map((cat, i) => {
                const score = parseFloat(cat.score);
                const scoreColor = score >= 8.5 ? '#7EE787' : score >= 7 ? '#D29922' : '#FF7B72';
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px',
                    gap: 8, padding: '12px 18px',
                    borderBottom: i < financialScores.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{cat.name}</span>
                    <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', fontWeight: 700, color: scoreColor }}>{cat.score}</span>
                    <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.35)' }}>{cat.weight}</span>
                    <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.5)' }}>{cat.weighted}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Top 5 Urgent Fixes */}
          <SectionLabel>Top 5 Most Urgent Fixes</SectionLabel>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            {[
              { sev: 'Critical', text: 'Remove @ts-nocheck from all three model files — disables type checking on 14,000+ lines of financial code' },
              { sev: 'High', text: 'Update CRCL data to February 2026 — 44 days stale while ASTS/BMNR are current' },
              { sev: 'High', text: 'Fix CRCL RLDC margin field inconsistency — rldcMargin: 39 vs computed 46.9%' },
              { sev: 'High', text: 'Fix ATR off-by-one bug in StockChart.tsx — biases initial ATR calculation' },
              { sev: 'High', text: 'Cap CRCL "Moon" scenario — $2,850B USDC strains credibility' },
            ].map((fix, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 18px',
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                borderLeft: `3px solid ${getSev(fix.sev).color}`,
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', width: 20, flexShrink: 0 }}>{i + 1}</span>
                <SevBadge severity={fix.sev} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{fix.text}</span>
              </div>
            ))}
          </div>

          {/* Top 3 Done Well */}
          <div style={{ marginTop: 24 }}>
            <SectionLabel>Top 3 Things Done Well</SectionLabel>
            <div style={{ padding: '16px 20px', background: 'rgba(126,231,135,0.03)', border: '1px solid rgba(126,231,135,0.12)', borderRadius: 10 }}>
              {[
                'Unified Model Maintenance Protocol — exceptional AI agent instructions, update checklists, and archival rules across all 3 stock models',
                'Financial Model Architecture — mathematically sound DCF with Gordon Growth, PV discounting, risk adjustments. BMNR Monte Carlo uses genuine GBM with Ito\'s lemma and Cholesky decomposition',
                'Visual Design System — unified stock-model-styles.ts with accent parameterization, 5 responsive breakpoints, 44px touch targets, reduced-motion support. Bloomberg/Seeking Alpha-tier polish',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                  fontSize: 12, lineHeight: 1.7, color: 'rgba(126,231,135,0.8)',
                  marginBottom: i < 2 ? 10 : 0,
                }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'rgba(126,231,135,0.5)', flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Formula & Math Tab ─────────────────────────────────────────── */}
      {tab === 'formula' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
            <StatBox label="Critical" value={2} accent="#FF4D4F" />
            <StatBox label="Moderate" value={4} accent="#D29922" />
            <StatBox label="Code Quality" value={3} accent="#79C0FF" />
            <StatBox label="Verified ✓" value={5} accent="#7EE787" />
          </div>

          <SectionLabel>Status: All Findings Resolved</SectionLabel>

          {/* Critical issues */}
          <CollapsibleSection title="Critical Issues" count={2} severity="Critical" defaultOpen>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {[
                { ref: 'F1', title: 'RSI Calculation Bug', loc: 'StockChart.tsx:137-140', desc: 'RSI smoothed average recalculates simple average instead of using exponential smoothing. Breaks Wilder\'s smoothing chain.', status: 'FIXED' },
                { ref: 'F2', title: 'BMNR Terminal Staking Revenue', loc: 'BMNR.tsx:1400', desc: 'Uses currentETH instead of terminalETH for terminal year staking revenue projections. Underestimates terminal cash flows.', status: 'FIXED' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '14px 18px',
                  borderBottom: i < 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  borderLeft: '3px solid #FF4D4F',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{item.ref}</span>
                    <SevBadge severity="Critical" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{item.title}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, fontFamily: 'Space Mono, monospace',
                      padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase',
                      color: '#7EE787', background: 'rgba(126,231,135,0.08)',
                      border: '1px solid rgba(126,231,135,0.25)',
                    }}>{item.status}</span>
                  </div>
                  <div style={{ marginBottom: 6 }}><CodeRef text={item.loc} /></div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Verified Correct */}
          <CollapsibleSection title="Verified Correct Implementations" count={5} severity="Good">
            <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {[
                { name: 'Gordon Growth Model (Terminal Value)', formula: 'TV = FCF / (r - g)', loc: 'ASTS.tsx, CRCL.tsx' },
                { name: 'Present Value Discounting', formula: 'PV = FV / (1 + r)^n', loc: 'Multiple files' },
                { name: 'Dilution Calculations', formula: 'shares × (1 + rate)^years', loc: 'BMNR, ASTS, CRCL' },
                { name: 'Bollinger Bands', formula: 'Middle ± (stdDev × σ)', loc: 'StockChart.tsx:154-183' },
                { name: 'VWAP', formula: 'Σ(TP × Vol) / Σ(Vol)', loc: 'StockChart.tsx:186-200' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr 200px 160px',
                  gap: 12, padding: '8px 0',
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ fontSize: 12, color: 'rgba(126,231,135,0.8)', fontWeight: 500 }}>{item.name}</span>
                  <code style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.4)' }}>{item.formula}</code>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{item.loc}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Status summary */}
          <div style={{ marginTop: 16, padding: '16px 20px', background: 'rgba(126,231,135,0.03)', border: '1px solid rgba(126,231,135,0.12)', borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, fontFamily: 'Space Mono, monospace',
                padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em',
                color: '#7EE787', background: 'rgba(126,231,135,0.08)', border: '1px solid rgba(126,231,135,0.25)',
              }}>All Resolved</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              2 critical issues fixed (RSI calculation, BMNR terminal revenue). 4 moderate issues fixed (log-normal comments, risk factor docs, magic numbers, unit conversions). 3 code quality items verified.
            </div>
          </div>
        </div>
      )}

      {/* ── Audit Programs Tab ─────────────────────────────────────────── */}
      {tab === 'registry' && (
        <div>
          <SectionLabel>Audit Program Index</SectionLabel>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10, overflow: 'hidden', marginBottom: 24,
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 120px 1fr 80px',
              gap: 8, padding: '10px 18px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {['ID', 'Name', 'Type', 'Scope', 'Status'].map(h => (
                <span key={h} style={{
                  fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)',
                }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {[
              { id: 'CCA-1.0', name: 'Comprehensive Code Audit v1.0', type: 'Code Quality', scope: 'Full codebase (108 files)', status: 'Active' },
              { id: 'CCA-1.1', name: 'Vibe-Code Bomb 27-Point Audit', type: 'Ops Maturity', scope: '27-point checklist', status: 'Active' },
              { id: 'DBV-CP', name: 'Capital Section Parity', type: 'DB Validation', scope: 'Per-ticker capital data', status: 'Active' },
              { id: 'DBV-XR', name: 'Cross-Reference Integrity', type: 'DB Validation', scope: 'Filing cross-refs', status: 'Active' },
              { id: 'DBV-SC', name: 'Sources Completeness', type: 'DB Validation', scope: 'Source citations', status: 'Active' },
              { id: 'DBV-DF', name: 'Data Freshness', type: 'DB Validation', scope: 'Staleness detection', status: 'Active' },
            ].map((audit, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 120px 1fr 80px',
                gap: 8, padding: '12px 18px',
                borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <code style={{
                  fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 600,
                  color: 'rgba(121,192,255,0.7)',
                }}>{audit.id}</code>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{audit.name}</span>
                <span style={{
                  fontSize: 10, fontFamily: 'Space Mono, monospace',
                  color: audit.type === 'Code Quality' ? 'rgba(167,139,250,0.7)' : audit.type.startsWith('DB') ? 'rgba(210,153,34,0.7)' : 'rgba(255,255,255,0.4)',
                }}>{audit.type}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{audit.scope}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, fontFamily: 'Space Mono, monospace',
                  padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase',
                  color: '#7EE787', background: 'rgba(126,231,135,0.08)',
                  border: '1px solid rgba(126,231,135,0.25)', alignSelf: 'center',
                }}>{audit.status}</span>
              </div>
            ))}
          </div>

          {/* Adding a new audit instructions */}
          <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
            <SectionLabel>Adding a New Audit</SectionLabel>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
              {[
                'Assign an ID following the convention: CCA-{version}, DBV-{code}, SEC-{code}, PERF-{code}',
                'Add to the index table in audit/AUDIT.md',
                'Add the full prompt in a new section',
                'If it\'s an AI workflow: add to src/data/workflows.ts with category: \'audit\'',
                'If it produces structured findings: add to src/data/audit-findings.ts',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'rgba(121,192,255,0.5)', flexShrink: 0 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div style={{ marginTop: 40, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>
          Source: <span style={{ fontFamily: 'Space Mono, monospace' }}>audit/AUDIT.md</span> — Audits conducted Feb-Mar 2026.
          Platform: Next.js 16 / TypeScript / Neon PostgreSQL / Drizzle ORM.
        </p>
      </div>
    </div>
  );
}
