/**
 * SharedWallStreetTab - Unified Wall Street Coverage Tab
 *
 * Shared component for ASTS, BMNR, CRCL Wall Street tabs.
 * Displays analyst coverage, consensus metrics, and research reports.
 *
 * @version 1.0.0
 * @created 2026-01-31
 */

import React, { useState } from 'react';
import type { SharedWallStreetTabProps, AnalystCoverage, AnalystReport } from './wallStreetTypes';

// Update indicator component (inline for portability)
const UpdateIndicators = ({ sources }: { sources: string | string[] }) => {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  const config: Record<string, { tooltip: string; color: string }> = {
    PR: { tooltip: 'Updated from Press Releases', color: '#f97316' },
    SEC: { tooltip: 'Updated from SEC Filings', color: '#3b82f6' },
    WS: { tooltip: 'Updated from Wall Street Research', color: '#8b5cf6' },
  };
  return (
    <span style={{ display: 'inline-flex', gap: 4, marginLeft: 8 }}>
      {sourceArray.map((source) => {
        const c = config[source];
        return c ? (
          <span
            key={source}
            title={c.tooltip}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: c.color,
              display: 'inline-block',
            }}
          />
        ) : null;
      })}
    </span>
  );
};

// Helper functions
const getRatingColor = (rating: string, normalized?: 'bullish' | 'neutral' | 'bearish') => {
  if (normalized) {
    switch (normalized) {
      case 'bullish': return 'var(--mint)';
      case 'neutral': return 'var(--gold)';
      case 'bearish': return 'var(--coral)';
    }
  }
  switch (rating) {
    case 'Strong Buy': case 'Buy': case 'Overweight': return 'var(--mint)';
    case 'Hold': case 'Neutral': case 'Market Perform': case 'Sector Perform': case 'Perform': return 'var(--gold)';
    case 'Underperform': case 'Underweight': case 'Sector Underperform': case 'Sell': return 'var(--coral)';
    default: return 'var(--text2)';
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'Initiation': return 'var(--violet)';
    case 'Upgrade': case 'PT Raise': return 'var(--mint)';
    case 'Downgrade': case 'PT Cut': case 'Double Downgrade': return 'var(--coral)';
    case 'Reiterate': case 'Maintained': case 'Update': return 'var(--text3)';
    case 'Drop': return 'var(--coral)';
    default: return 'var(--text3)';
  }
};

export const SharedWallStreetTab: React.FC<SharedWallStreetTabProps> = ({ coverage, ticker }) => {
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null);
  const [expandedReportIdx, setExpandedReportIdx] = useState<string | null>(null);

  // Get latest report from each firm for consensus calculations
  const latestByFirm = coverage.map(cov => ({
    firm: cov.firm,
    analyst: cov.analyst,
    priceTarget: cov.currentPT,
    rating: cov.currentRating,
    ratingNormalized: cov.currentRatingNormalized,
    latestDate: cov.reports[0]?.date || ''
  }));

  // Calculate consensus metrics from current ratings only
  const firmsWithPT = latestByFirm.filter(f => f.priceTarget !== null);
  const avgPT = firmsWithPT.length > 0
    ? firmsWithPT.reduce((sum, f) => sum + (f.priceTarget || 0), 0) / firmsWithPT.length
    : null;
  const highPT = firmsWithPT.length > 0 ? Math.max(...firmsWithPT.map(f => f.priceTarget || 0)) : null;
  const lowPT = firmsWithPT.length > 0 ? Math.min(...firmsWithPT.map(f => f.priceTarget || 0)) : null;
  const medianPT = firmsWithPT.length > 0 ? (() => {
    const sorted = [...firmsWithPT].map(f => f.priceTarget || 0).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  })() : null;

  // Rating counts by normalized category
  const ratingCounts = {
    bullish: latestByFirm.filter(f => f.ratingNormalized === 'bullish').length,
    neutral: latestByFirm.filter(f => f.ratingNormalized === 'neutral').length,
    bearish: latestByFirm.filter(f => f.ratingNormalized === 'bearish').length,
  };
  const totalAnalysts = coverage.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#wall-street-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Analyst Research<UpdateIndicators sources="WS" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Wall Street Coverage<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Consensus price targets, analyst ratings, and detailed research reports from covering firms. Track rating changes and methodology over time.</p>
      </div>

      {/* Consensus Snapshot */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#wall-street-consensus</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Consensus Snapshot<UpdateIndicators sources="WS" /></span>
        </div>
        <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Price Target Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              {[
                { label: 'AVG PT', value: avgPT ? `$${avgPT.toFixed(0)}` : '—', color: 'var(--violet)' },
                { label: 'MEDIAN PT', value: medianPT ? `$${medianPT.toFixed(0)}` : '—', color: 'var(--sky)' },
                { label: 'HIGH PT', value: highPT ? `$${highPT}` : '—', color: 'var(--mint)' },
                { label: 'ANALYSTS', value: `${totalAnalysts}`, color: 'var(--text)' },
              ].map(kpi => (
                <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
                </div>
              ))}
            </div>
            {lowPT && highPT && (
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
                Range: <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--coral)' }}>${lowPT}</span> — <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--mint)' }}>${highPT}</span>
              </div>
            )}
          </div>

          {/* Ratings Distribution */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>RATINGS DISTRIBUTION</div>
            {totalAnalysts > 0 ? (
              <>
                <div style={{ display: 'flex', height: 24, borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
                  {ratingCounts.bullish > 0 && (
                    <div style={{ width: `${(ratingCounts.bullish / totalAnalysts) * 100}%`, background: 'var(--mint)' }} />
                  )}
                  {ratingCounts.neutral > 0 && (
                    <div style={{ width: `${(ratingCounts.neutral / totalAnalysts) * 100}%`, background: 'var(--gold)' }} />
                  )}
                  {ratingCounts.bearish > 0 && (
                    <div style={{ width: `${(ratingCounts.bearish / totalAnalysts) * 100}%`, background: 'var(--coral)' }} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                  <span style={{ color: 'var(--mint)' }}>● Buy/OW: {ratingCounts.bullish}</span>
                  <span style={{ color: 'var(--gold)' }}>● Hold/Neutral: {ratingCounts.neutral}</span>
                  <span style={{ color: 'var(--coral)' }}>● Sell/UW: {ratingCounts.bearish}</span>
                </div>
              </>
            ) : (
              <div style={{ color: 'var(--text3)', fontSize: 13 }}>No analyst coverage data yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Coverage by Firm - Grouped Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#wall-street-coverage</div>
      <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Coverage by Firm</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>{totalAnalysts} Analyst{totalAnalysts !== 1 ? 's' : ''} Covering<UpdateIndicators sources="WS" /></span>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {coverage.map((cov) => {
            const isExpanded = expandedFirm === cov.firm;
            const fullReportCount = cov.reports.filter(r => r.isFullReport).length;
            const updateCount = cov.reports.filter(r => !r.isFullReport).length;

            return (
              <div
                key={cov.firm}
                style={{
                  background: 'var(--surface)',
                  border: isExpanded ? '1px solid var(--violet)' : '1px solid var(--border)',
                  borderRadius: 16,
                  overflow: 'hidden'
                }}
              >
                {/* Firm Header - Always Visible */}
                <div
                  onClick={() => setExpandedFirm(isExpanded ? null : cov.firm)}
                  style={{
                    padding: '20px 28px',
                    borderBottom: isExpanded ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15, lineHeight: 1.2 }}>{cov.firm}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 12 }}>{cov.analyst} · Since {cov.coverageSince}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Current Rating Badge */}
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: 99,
                      background: `${getRatingColor(cov.currentRating, cov.currentRatingNormalized)}22`,
                      border: `1px solid ${getRatingColor(cov.currentRating, cov.currentRatingNormalized)}44`,
                    }}>
                      <span style={{ color: getRatingColor(cov.currentRating, cov.currentRatingNormalized), fontWeight: 600, fontSize: 11 }}>
                        {cov.currentRating.toUpperCase()}
                      </span>
                    </div>

                    {/* Current PT */}
                    <div style={{ fontFamily: 'Space Mono, monospace', textAlign: 'right', minWidth: 60 }}>
                      <span style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>
                        {cov.currentPT ? `$${cov.currentPT}` : '—'}
                      </span>
                    </div>

                    {/* Report counts */}
                    <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                      <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 15%, transparent)', color: 'var(--violet)' }}>
                        {fullReportCount} Report{fullReportCount !== 1 ? 's' : ''}
                      </span>
                      {updateCount > 0 && (
                        <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--border) 60%, transparent)', color: 'var(--text3)' }}>
                          {updateCount} Update{updateCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Expand indicator */}
                    <span style={{ color: 'var(--text3)', fontSize: 12 }}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid Summary */}
                {!isExpanded && (
                  <div style={{ padding: '0 28px 16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 6, padding: 10, background: 'var(--surface2)', borderRadius: 10 }}>
                      <div style={{ textAlign: 'center', padding: '4px 0' }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{cov.currentPT ? `$${cov.currentPT}` : '\u2014'}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Price Target</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '4px 0' }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: getRatingColor(cov.currentRating, cov.currentRatingNormalized), lineHeight: 1.2 }}>{cov.currentRating}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Rating</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '4px 0' }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{cov.reports.length}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Reports</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '4px 0' }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{cov.coverageSince}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Since</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Firm Notes */}
                {cov.notes && (
                  <div style={{ padding: '0 28px 16px' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>
                      {cov.notes}
                    </div>
                  </div>
                )}

                {/* Expanded History */}
                {isExpanded && (
                  <div style={{ padding: '24px 28px', background: 'var(--surface)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12 }}>
                      COVERAGE HISTORY ({cov.reports.length} entr{cov.reports.length !== 1 ? 'ies' : 'y'})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {cov.reports.map((report, idx) => {
                        const reportKey = `${cov.firm}-${idx}`;
                        const isReportExpanded = expandedReportIdx === reportKey;

                        return (
                          <div
                            key={idx}
                            style={{
                              padding: '12px 16px',
                              background: report.isFullReport ? 'var(--surface2)' : 'transparent',
                              borderRadius: 8,
                              borderLeft: (report.isFullReport && (report.reportSummary || report.assumptions)) ? '3px solid var(--violet)' : '3px solid transparent',
                              transition: 'background 0.15s',
                              cursor: (report.isFullReport && (report.reportSummary || report.assumptions || report.estimates)) ? 'pointer' : 'default'
                            }}
                            onMouseEnter={ev => { if (!report.isFullReport) ev.currentTarget.style.background = 'var(--surface2)'; }}
                            onMouseLeave={ev => { if (!report.isFullReport) ev.currentTarget.style.background = 'transparent'; }}
                          >
                            {/* Report Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ color: 'var(--text3)', fontSize: 12, minWidth: 90 }}>
                                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span style={{
                                  color: getActionColor(report.action),
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: '2px 8px',
                                  background: `${getActionColor(report.action)}22`,
                                  borderRadius: 99
                                }}>
                                  {report.action}
                                </span>
                                <span style={{ color: getRatingColor(report.rating, report.ratingNormalized), fontSize: 12, fontWeight: 500 }}>
                                  {report.rating}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--text)', fontSize: 14 }}>
                                  {report.priceTarget ? `$${report.priceTarget}` : '—'}
                                  {report.previousTarget && (
                                    <span style={{ color: 'var(--text3)', fontSize: 11 }}> ← ${report.previousTarget}</span>
                                  )}
                                </span>
                                {report.source && (
                                  <a
                                    href={report.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: 10, color: 'var(--violet)', textDecoration: 'none' }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {report.source}
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Report Title if exists */}
                            {report.reportTitle && (
                              <div style={{ color: 'var(--text2)', fontSize: 12, fontStyle: 'italic', marginBottom: 8 }}>
                                "{report.reportTitle}"
                              </div>
                            )}

                            {/* Full report content (expandable) */}
                            {report.isFullReport && report.thesis && (
                              <>
                                <div style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
                                  {report.thesis}
                                </div>

                                {(report.reportSummary || report.assumptions || report.estimates) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedReportIdx(isReportExpanded ? null : reportKey);
                                    }}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: 'var(--violet)',
                                      fontSize: 11,
                                      cursor: 'pointer',
                                      padding: '4px 0'
                                    }}
                                  >
                                    {isReportExpanded ? '▼ Less details' : '▶ Full report details'}
                                  </button>
                                )}

                                {isReportExpanded && (
                                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', marginTop: 8 }}>
                                    {report.reportSummary && (
                                      <div style={{
                                        background: 'var(--surface)',
                                        padding: 12,
                                        borderRadius: 8,
                                        fontSize: 12,
                                        color: 'var(--text2)',
                                        lineHeight: 1.6,
                                        whiteSpace: 'pre-wrap',
                                        marginBottom: 12
                                      }}>
                                        {report.reportSummary.split('\n\n').map((paragraph, pIdx) => {
                                          const headerMatch = paragraph.match(/^\*\*(.+?)\*\*/);
                                          if (headerMatch) {
                                            const header = headerMatch[1];
                                            const rest = paragraph.replace(/^\*\*.+?\*\*\s*/, '');
                                            return (
                                              <div key={pIdx} style={{ marginBottom: 12 }}>
                                                <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: 11 }}>{header}</div>
                                                <div>{rest}</div>
                                              </div>
                                            );
                                          }
                                          return <div key={pIdx} style={{ marginBottom: 8 }}>{paragraph}</div>;
                                        })}
                                      </div>
                                    )}

                                    {report.assumptions && report.assumptions.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6 }}>KEY ASSUMPTIONS</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                          {report.assumptions.map((a, i) => (
                                            <span key={i} style={{ padding: '3px 8px', background: 'var(--surface)', borderRadius: 99, fontSize: 11, color: 'var(--text2)' }}>
                                              {a.label}: <span style={{ color: 'var(--violet)' }}>{a.value}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {report.catalysts && report.catalysts.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--mint)', marginBottom: 6 }}>CATALYSTS</div>
                                        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 11 }}>
                                          {report.catalysts.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                      </div>
                                    )}

                                    {report.risks && report.risks.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--coral)', marginBottom: 6 }}>RISKS</div>
                                        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 11 }}>
                                          {report.risks.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                      </div>
                                    )}

                                    {report.estimates && report.estimates.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--sky)', marginBottom: 6 }}>ESTIMATES</div>
                                        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                                          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5, 80px)', borderBottom: '1px solid var(--border)' }}>
                                            {['Metric', 'FY24', 'FY25', 'FY26', 'FY27', 'FY28'].map(h => (
                                              <span key={h} style={{ padding: '10px 12px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: h === 'Metric' ? 'left' : 'right' }}>{h}</span>
                                            ))}
                                          </div>
                                          {report.estimates.map((e, i) => (
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5, 80px)', borderBottom: i < report.estimates.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                                              onMouseEnter={ev => (ev.currentTarget.style.background = 'var(--surface2)')}
                                              onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}>
                                              <span style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text)' }}>{e.metric}</span>
                                              <span style={{ padding: '10px 12px', fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{e.fy24 || '—'}</span>
                                              <span style={{ padding: '10px 12px', fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{e.fy25 || '—'}</span>
                                              <span style={{ padding: '10px 12px', fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{e.fy26 || '—'}</span>
                                              <span style={{ padding: '10px 12px', fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{e.fy27 || '—'}</span>
                                              <span style={{ padding: '10px 12px', fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{e.fy28 || '—'}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {report.methodology && (
                                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>
                                        <span>Methodology: </span>
                                        <span style={{ color: 'var(--text2)' }}>{report.methodology}</span>
                                      </div>
                                    )}

                                    {report.fullNotes && (
                                      <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>
                                        {(() => {
                                          const lines = report.fullNotes.split('\n');
                                          const blocks: { type: 'text' | 'table'; content: string; rows?: string[][] }[] = [];
                                          let i = 0;
                                          while (i < lines.length) {
                                            const line = lines[i];
                                            if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                                              const tableRows: string[][] = [];
                                              while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                                                const cells = lines[i].trim().split('|').filter(c => c.trim() !== '').map(c => c.trim());
                                                tableRows.push(cells);
                                                i++;
                                              }
                                              blocks.push({ type: 'table', content: '', rows: tableRows });
                                            } else {
                                              blocks.push({ type: 'text', content: line });
                                              i++;
                                            }
                                          }
                                          return blocks.map((block, bIdx) => {
                                            if (block.type === 'table' && block.rows && block.rows.length > 0) {
                                              const headers = block.rows[0];
                                              const dataRows = block.rows.slice(1);
                                              const colCount = headers.length;
                                              const cols = colCount <= 2 ? '1fr 120px' : `1fr ${Array(colCount - 1).fill('100px').join(' ')}`;
                                              return (
                                                <div key={bIdx} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 8 }}>
                                                  <div style={{ display: 'grid', gridTemplateColumns: cols, borderBottom: '1px solid var(--border)' }}>
                                                    {headers.map((h, hIdx) => (
                                                      <span key={hIdx} style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: hIdx === 0 ? 'left' : 'right' }}>{h}</span>
                                                    ))}
                                                  </div>
                                                  {dataRows.map((row, rIdx) => (
                                                    <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: cols, borderBottom: rIdx < dataRows.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                                                      onMouseEnter={ev => (ev.currentTarget.style.background = 'var(--surface2)')}
                                                      onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}>
                                                      {row.map((cell, cIdx) => (
                                                        <span key={cIdx} style={{ padding: '8px 12px', fontSize: 12, fontFamily: cIdx > 0 ? "'Space Mono', monospace" : 'inherit', color: cIdx > 0 ? 'var(--text2)' : 'var(--text)', textAlign: cIdx === 0 ? 'left' : 'right' }}>{cell}</span>
                                                      ))}
                                                    </div>
                                                  ))}
                                                </div>
                                              );
                                            }
                                            if (block.content.trim() === '') return null;
                                            const isHeader = block.content.trim().endsWith(':') && block.content.trim() === block.content.trim().toUpperCase();
                                            if (isHeader) {
                                              return <div key={bIdx} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginTop: bIdx > 0 ? 12 : 0, marginBottom: 4 }}>{block.content.replace(/:$/, '')}</div>;
                                            }
                                            return <div key={bIdx} style={{ color: 'var(--text3)', fontSize: 11 }}>{block.content}</div>;
                                          });
                                        })()}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CFA Notes */}
      <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', opacity: 0.75 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>📚</span>
          <h4 style={{ margin: 0, fontSize: 11, fontWeight: 500, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CFA Level III — Sell-Side Research</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, lineHeight: 1.5, color: 'var(--text3)' }}>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text2)' }}>Consensus Price Target:</strong> Average of all covering analysts' PTs. Useful as a reference point but not a forecast — PTs are backward-looking and often anchored to current price. Median PT is more robust to outliers.</p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text2)' }}>Initiation vs Reiterate:</strong> Initiations carry more weight — the analyst performed full due diligence. Reiterations often just update the model after earnings. Watch for rating changes (upgrades/downgrades) as stronger signals.</p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text2)' }}>Buy/Hold/Sell Distribution:</strong> Sell-side has structural bullish bias (~50% Buy, ~45% Hold, ~5% Sell industry-wide). A "Hold" often means "Sell" in practice. Heavy Buy consensus can indicate crowding risk.</p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text2)' }}>Price Target Methodology:</strong> Most analysts use DCF, comparable multiples, or sum-of-parts. Understanding the methodology reveals which assumptions drive the PT — useful for assessing whether you agree with inputs.</p>
        </div>
      </div>
    </div>
  );
};

export default SharedWallStreetTab;
