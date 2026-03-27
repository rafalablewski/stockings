'use client';

/**
 * SharedSecFilingsSection — Redesigned SEC Filings for Timeline Tab
 *
 * Description-first card layout with KPI summary strip and cross-reference
 * source dots. Matches the "Jony Ive x Tesla" golden standard from
 * Overview and Capital tabs.
 *
 * Replaces the inline sm-fin-table-* grid in ASTS, BMNR, CRCL Timeline tabs.
 * Visual-only redesign — all data, filtering, and pagination logic preserved.
 *
 * @version 1.0.0
 * @created 2026-02-26
 */

import React, { useState, useMemo } from 'react';
import type { SECFiling, SECMeta } from './timelineTypes';
import { UpdateIndicators } from './UpdateIndicators';

// ── Props ────────────────────────────────────────────────────────────────────

export interface SharedSecFilingsSectionProps {
  filings: SECFiling[];
  secMeta: SECMeta;
  typeColors: Record<string, { bg?: string; text: string }>;
  filterTypes: string[];
  /** Cross-reference index: maps "FORM|YYYY-MM-DD" to data captured in other files */
  crossRefIndex?: Record<string, { source: string; data: string }[]>;
  /** Number of filings to show before "Show More" (default 15) */
  initialVisibleCount?: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

/** Map badge text color to a known color token for data-badge-color attribute */
const badgeColorName = (textColor: string): string => {
  const map: Record<string, string> = {
    '#60a5fa': 'blue',
    'var(--violet)': 'violet',
    'var(--gold)': 'gold',
    '#4ade80': 'green',
    '#fb923c': 'orange',
    'var(--cyan)': 'cyan',
    'var(--sky)': 'sky',
  };
  return map[textColor] || 'blue';
};

/** All categorized form types — used by 'Other' filter for exclusion */
const STANDARD_FILING_TYPES = new Set([
  '10-K', '10-K/A', 'ARS', '10-Q', '10-Q/A', '8-K', '8-K/A',
  'S-1', 'S-3', 'S-3ASR', 'S-8', '424B4', '424B5', '424B7', 'FWP',
  'Form 3', 'Form 4', 'Form 4/A', 'Form 5', 'Form 144',
  'DEF 14A', 'DEFA14A', 'DEFR14A', 'PRE 14A', 'DEF 14C', 'PRE 14C',
  'SC 13D', 'SC 13D/A', 'SC 13G', 'SC 13G/A', 'CORRESP', 'RW',
]);

/** Generic filter matchers covering ASTS, BMNR, CRCL filter types */
const FILTER_MATCHERS: Record<string, (type: string) => boolean> = {
  'All': () => true,
  '10-K': t => t === '10-K' || t === '10-K/A' || t === 'ARS',
  '10-Q': t => t === '10-Q' || t === '10-Q/A',
  '8-K': t => t === '8-K' || t === '8-K/A',
  'S-1/S-3': t => ['S-1', 'S-3', 'S-3ASR', 'S-8'].includes(t),
  '424B5': t => t === '424B5',
  '424B': t => t === '424B4' || t === '424B5' || t === '424B7' || t === 'FWP',
  'Form 4': t => ['Form 3', 'Form 4', 'Form 4/A', 'Form 5', 'Form 144'].includes(t),
  'Proxy': t => ['DEF 14A', 'DEFA14A', 'DEFR14A', 'PRE 14A', 'DEF 14C', 'PRE 14C'].includes(t),
  'SC 13D/G': t => ['SC 13D', 'SC 13D/A', 'SC 13G', 'SC 13G/A'].includes(t),
  'CORRESP': t => t === 'CORRESP' || t === 'RW',
  'Other': t => !STANDARD_FILING_TYPES.has(t),
};

// ── Date normalization (from SharedEdgarTab) ─────────────────────────────────

function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const rangeMatch = dateStr.match(/^(\w+ \d+)-\d+, (\d{4})$/);
  if (rangeMatch) {
    const d = new Date(`${rangeMatch[1]}, ${rangeMatch[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return dateStr;
}

// ── Cross-ref lookup ─────────────────────────────────────────────────────────

function lookupFilingCrossRefs(
  filing: SECFiling,
  crossRefIndex?: Record<string, { source: string; data: string }[]>,
): { source: string; data: string }[] | undefined {
  if (!crossRefIndex) return undefined;
  const isoDate = normalizeDate(filing.date);
  const key = `${filing.type}|${isoDate}`;
  return crossRefIndex[key];
}

// ── KPI Summary ──────────────────────────────────────────────────────────────

const KPISummary: React.FC<{
  total: number;
  annual: number;
  quarterly: number;
  current: number;
}> = ({ total, annual, quarterly, current }) => (
  <div className="sm-model-grid sm-sec-kpi-grid" data-cols="4">
    <div className="sm-grid-cell-center">
      <div className="sm-micro-label">Tracked</div>
      <div className="sm-mono-lg sm-text">{total}</div>
      <div className="sm-micro-label sm-micro-label-dim">filings</div>
    </div>
    <div className="sm-grid-cell-center">
      <div className="sm-micro-label">Annual</div>
      <div className="sm-mono-lg sm-sky">{annual}</div>
      <div className="sm-micro-label sm-micro-label-dim">10-K</div>
    </div>
    <div className="sm-grid-cell-center">
      <div className="sm-micro-label">Quarterly</div>
      <div className="sm-mono-lg sm-violet">{quarterly}</div>
      <div className="sm-micro-label sm-micro-label-dim">10-Q</div>
    </div>
    <div className="sm-grid-cell-center">
      <div className="sm-micro-label">Current + Other</div>
      <div className="sm-mono-lg sm-gold">{current}</div>
      <div className="sm-micro-label sm-micro-label-dim">8-K, S-3, 424B5&hellip;</div>
    </div>
  </div>
);

// ── Cross-Ref Source Dots ────────────────────────────────────────────────────

const CrossRefDots: React.FC<{
  refs?: { source: string; data: string }[];
}> = ({ refs }) => {
  if (!refs || refs.length === 0) return null;
  const sources = [...new Set(refs.map(r => r.source))];
  return (
    <span className="sm-sec-sources">
      {sources.map(src => (
        <span key={src} className="sm-sec-source-tag" data-source={src}>
          <span className="sm-sec-source-dot" />
          {src}
        </span>
      ))}
    </span>
  );
};

// ── Filing Card ──────────────────────────────────────────────────────────────

const FilingCard: React.FC<{
  filing: SECFiling;
  typeColors: Record<string, { bg?: string; text: string }>;
  crossRefs?: { source: string; data: string }[];
}> = ({ filing, typeColors, crossRefs }) => {
  const colors = typeColors[filing.type] || { bg: 'var(--surface2)', text: 'var(--text3)' };
  const displayType = /^\d+$/.test(filing.type) ? `Form ${filing.type}` : filing.type;

  return (
    <div className="sm-sec-card">
      <div className="sm-sec-card-top">
        <span
          className="sm-sec-badge"
          data-badge-color={badgeColorName(colors.text)}
        >
          {displayType}
        </span>
        <span className="sm-sec-desc">{filing.description}</span>
      </div>
      <div className="sm-sec-separator" />
      <div className="sm-sec-meta">
        <span className="sm-sec-date">{filing.date}</span>
        {filing.period && filing.period !== '—' && (
          <>
            <span className="sm-sec-dot-sep">&middot;</span>
            <span className="sm-sec-period">{filing.period}</span>
          </>
        )}
        <CrossRefDots refs={crossRefs} />
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────

export const SharedSecFilingsSection: React.FC<SharedSecFilingsSectionProps> = ({
  filings,
  secMeta,
  typeColors,
  filterTypes,
  crossRefIndex,
  initialVisibleCount = 5,
}) => {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Filter logic
  const filteredFilings = useMemo(() => {
    const matcher = FILTER_MATCHERS[filter];
    if (!matcher || filter === 'All') return filings;
    return filings.filter(f => matcher(f.type));
  }, [filings, filter]);

  // KPI counts (from all filings, not filtered)
  const kpi = useMemo(() => {
    let annual = 0, quarterly = 0;
    for (const f of filings) {
      if (f.type === '10-K' || f.type === '10-K/A' || f.type === 'ARS') annual++;
      else if (f.type === '10-Q' || f.type === '10-Q/A') quarterly++;
    }
    return {
      total: filings.length,
      annual,
      quarterly,
      current: filings.length - annual - quarterly,
    };
  }, [filings]);

  // Filter counts per filter type
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ft of filterTypes) {
      const matcher = FILTER_MATCHERS[ft];
      counts[ft] = matcher ? (ft === 'All' ? filings.length : filings.filter(f => matcher(f.type)).length) : 0;
    }
    return counts;
  }, [filings, filterTypes]);

  // Pagination
  const displayed = showAll ? filteredFilings : filteredFilings.slice(0, initialVisibleCount);
  const hiddenCount = filteredFilings.length - initialVisibleCount;

  return (
    <>
      <div className="sm-card sm-sec-tracker-card">
        <div className="sm-card-header sm-sec-tracker-header">
          <div>
            <span className="sm-section-label">SEC filings<UpdateIndicators sources="SEC" /></span>
            <p className="sm-sec-tracker-sub">
              Filter by form type; cross-reference dots show data captured in other research files.
            </p>
          </div>
        </div>
        <div className="sm-card-body sm-flex-col sm-card-body-gap-16">

          {/* KPI Summary Strip */}
          <KPISummary
            total={kpi.total}
            annual={kpi.annual}
            quarterly={kpi.quarterly}
            current={kpi.current}
          />

          {/* Filter Pills */}
          <div className="sm-flex-wrap">
            {filterTypes.map(type => (
              <button
                type="button"
                key={type}
                onClick={() => { setFilter(type); setShowAll(false); }}
                className="sm-action-btn"
                data-active={filter === type}
              >
                {type}
                <span className="sm-sec-pill-count">{filterCounts[type]}</span>
              </button>
            ))}
          </div>

          {/* Filing Cards */}
          <div className="sm-sec-list">
            {displayed.map((filing, idx) => (
              <FilingCard
                key={`${filing.date}-${filing.type}-${filing.description}`}
                filing={filing}
                typeColors={typeColors}
                crossRefs={lookupFilingCrossRefs(filing, crossRefIndex)}
              />
            ))}
          </div>

          {/* Show More / Less */}
          {filteredFilings.length > initialVisibleCount && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="sm-expand-btn"
              aria-expanded={showAll}
            >
              {showAll ? '▲ Show Less' : `▼ Show ${hiddenCount} More Filings`}
            </button>
          )}

          {/* Footer — metadata + last PR */}
          <div className="sm-sec-footer">
            <div className="sm-sec-footer-meta">
              <span>
                <span className="sm-text3">CIK:</span>
                <span className="sm-mono-sm sm-text2 sm-sec-meta-ml">{secMeta.cik}</span>
              </span>
              <span>
                <span className="sm-text3">Ticker:</span>
                <span className="sm-fw-600 sm-sec-ticker-accent">{secMeta.ticker}</span>
              </span>
              <span>
                <span className="sm-text3">Exchange:</span>
                <span className="sm-text2 sm-sec-exchange-ml">{secMeta.exchange}</span>
              </span>
            </div>
            <div className="sm-sec-footer-pr">
              <span className="sm-sec-pr-dot">●</span>
              <span>Last PR Processed: {secMeta.lastPR.date} — {secMeta.lastPR.title}<UpdateIndicators sources="PR" /></span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SharedSecFilingsSection;
