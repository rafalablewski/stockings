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
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>
        Wall Street Coverage
        <UpdateIndicators sources="WS" />
      </h2>

      {/* Consensus Snapshot */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#wall-street-consensus</div>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
          Consensus Snapshot
          <UpdateIndicators sources="WS" />
        </div>
        <div className="g2">
          {/* Price Target Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>AVG PT</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--violet)', fontFamily: 'Space Mono' }}>
                  {avgPT ? `$${avgPT.toFixed(0)}` : '—'}
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>MEDIAN PT</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--sky)', fontFamily: 'Space Mono' }}>
                  {medianPT ? `$${medianPT.toFixed(0)}` : '—'}
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>HIGH / LOW</div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Space Mono' }}>
                  <span style={{ color: 'var(--mint)' }}>{highPT ? `$${highPT}` : '—'}</span>
                  <span style={{ color: 'var(--text3)' }}> / </span>
                  <span style={{ color: 'var(--coral)' }}>{lowPT ? `$${lowPT}` : '—'}</span>
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>ANALYSTS</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontFamily: 'Space Mono' }}>
                  {totalAnalysts}
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Distribution */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>RATINGS DISTRIBUTION</div>
            {totalAnalysts > 0 ? (
              <>
                <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
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
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
          Coverage by Firm ({totalAnalysts} Analyst{totalAnalysts !== 1 ? 's' : ''})
          <UpdateIndicators sources="WS" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {coverage.map((cov) => {
            const isExpanded = expandedFirm === cov.firm;
            const fullReportCount = cov.reports.filter(r => r.isFullReport).length;
            const updateCount = cov.reports.filter(r => !r.isFullReport).length;

            return (
              <div
                key={cov.firm}
                style={{
                  background: 'var(--surface2)',
                  borderRadius: 8,
                  border: isExpanded ? '1px solid var(--violet)' : '1px solid var(--border)',
                  overflow: 'hidden'
                }}
              >
                {/* Firm Header - Always Visible */}
                <div
                  onClick={() => setExpandedFirm(isExpanded ? null : cov.firm)}
                  style={{
                    padding: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>{cov.firm}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 12 }}>{cov.analyst} · Since {cov.coverageSince}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Current Rating Badge */}
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      background: `${getRatingColor(cov.currentRating, cov.currentRatingNormalized)}22`,
                      border: `1px solid ${getRatingColor(cov.currentRating, cov.currentRatingNormalized)}44`,
                    }}>
                      <span style={{ color: getRatingColor(cov.currentRating, cov.currentRatingNormalized), fontWeight: 600, fontSize: 12 }}>
                        {cov.currentRating.toUpperCase()}
                      </span>
                    </div>

                    {/* Current PT */}
                    <div style={{ fontFamily: 'Space Mono', textAlign: 'right', minWidth: 60 }}>
                      <span style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>
                        {cov.currentPT ? `$${cov.currentPT}` : '—'}
                      </span>
                    </div>

                    {/* Report counts */}
                    <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                      <span style={{ padding: '2px 6px', background: 'var(--violet)', color: 'white', borderRadius: 4 }}>
                        {fullReportCount} Report{fullReportCount !== 1 ? 's' : ''}
                      </span>
                      {updateCount > 0 && (
                        <span style={{ padding: '2px 6px', background: 'var(--surface3)', color: 'var(--text3)', borderRadius: 4 }}>
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

                {/* Expanded History */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--border)', padding: 16, background: 'var(--surface)' }}>
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
                              padding: 12,
                              background: report.isFullReport ? 'var(--surface2)' : 'var(--surface)',
                              borderRadius: 6,
                              borderLeft: (report.isFullReport && (report.reportSummary || report.assumptions)) ? '3px solid var(--violet)' : 'none'
                            }}
                          >
                            {/* Report Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ color: 'var(--text3)', fontSize: 12, minWidth: 90 }}>
                                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span style={{
                                  color: getActionColor(report.action),
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: '2px 8px',
                                  background: `${getActionColor(report.action)}22`,
                                  borderRadius: 4
                                }}>
                                  {report.action}
                                </span>
                                <span style={{ color: getRatingColor(report.rating, report.ratingNormalized), fontSize: 12, fontWeight: 500 }}>
                                  {report.rating}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontFamily: 'Space Mono', color: 'var(--text)', fontSize: 14 }}>
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
                                        borderRadius: 6,
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
                                            <span key={i} style={{ padding: '3px 8px', background: 'var(--surface)', borderRadius: 4, fontSize: 11, color: 'var(--text2)' }}>
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
                                        <table className="tbl">
                                          <thead>
                                            <tr>
                                              <th>Metric</th>
                                              <th className="r">FY24</th>
                                              <th className="r">FY25</th>
                                              <th className="r">FY26</th>
                                              <th className="r">FY27</th>
                                              <th className="r">FY28</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {report.estimates.map((e, i) => (
                                              <tr key={i}>
                                                <td>{e.metric}</td>
                                                <td className="r">{e.fy24 || '—'}</td>
                                                <td className="r">{e.fy25 || '—'}</td>
                                                <td className="r">{e.fy26 || '—'}</td>
                                                <td className="r">{e.fy27 || '—'}</td>
                                                <td className="r">{e.fy28 || '—'}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}

                                    {report.methodology && (
                                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>
                                        <span>Methodology: </span>
                                        <span style={{ color: 'var(--text2)' }}>{report.methodology}</span>
                                      </div>
                                    )}

                                    {report.fullNotes && (
                                      <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                                        {report.fullNotes}
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
    </div>
  );
};

export default SharedWallStreetTab;
