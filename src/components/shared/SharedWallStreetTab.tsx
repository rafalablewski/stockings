/**
 * SharedWallStreetTab - Unified Wall Street Coverage Tab
 *
 * Shared component for ASTS, BMNR, CRCL Wall Street tabs.
 * Displays analyst coverage, consensus metrics, and research reports.
 * Uses sm-ws-* CSS classes from stock-model-styles.ts for styling.
 *
 * @version 1.1.0
 * @created 2026-01-31
 * @updated 2026-02-25 — Replaced all inline styles with CSS classes
 */

import React, { useState } from 'react';
import type { SharedWallStreetTabProps, AnalystCoverage, AnalystReport } from './wallStreetTypes';
import { UpdateIndicators } from './UpdateIndicators';

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
    <div className="sm-flex-col">
      <div className="sm-tab-hero">
        <div className="sm-section-label">Analyst Research<UpdateIndicators sources="WS" /></div>
        <h2>Wall Street Coverage<span className="sm-accent">.</span></h2>
        <p>Consensus price targets, analyst ratings, and detailed research reports from covering firms. Track rating changes and methodology over time.</p>
      </div>

      {/* Consensus Snapshot */}
      <div className="sm-ws-panel">
        <div className="sm-ws-panel-header">
          <span className="sm-section-label sm-m-0">Consensus Snapshot<UpdateIndicators sources="WS" /></span>
        </div>
        <div className="sm-ws-panel-body sm-ws-grid-2col">
          {/* Price Target Summary */}
          <div className="sm-flex-col sm-gap-16">
            <div className="sm-ws-kpi-grid sm-ws-kpi-4col">
              {[
                { label: 'AVG PT', value: avgPT ? `$${avgPT.toFixed(0)}` : '—', color: 'var(--violet)' },
                { label: 'MEDIAN PT', value: medianPT ? `$${medianPT.toFixed(0)}` : '—', color: 'var(--sky)' },
                { label: 'HIGH PT', value: highPT ? `$${highPT}` : '—', color: 'var(--mint)' },
                { label: 'ANALYSTS', value: `${totalAnalysts}`, color: 'var(--text)' },
              ].map(kpi => (
                <div key={kpi.label} className="sm-kpi-cell">
                  <div className="sm-kpi-label">{kpi.label}</div>
                  <div className="sm-kpi-value sm-text-24" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>{kpi.value}</div>
                </div>
              ))}
            </div>
            {lowPT && highPT && (
              <div className="sm-ws-range sm-mt-8">
                Range: <span className="sm-mono sm-coral sm-fw-400">${lowPT}</span> — <span className="sm-mono sm-mint sm-fw-400">${highPT}</span>
              </div>
            )}
          </div>

          {/* Ratings Distribution */}
          <div>
            <div className="sm-subtle-sm sm-mb-8">RATINGS DISTRIBUTION</div>
            {totalAnalysts > 0 ? (
              <>
                <div className="sm-ws-rating-bar sm-mb-8">
                  {ratingCounts.bullish > 0 && (
                    <div style={{ width: `${(ratingCounts.bullish / totalAnalysts) * 100}%` }} data-sentiment="positive" />
                  )}
                  {ratingCounts.neutral > 0 && (
                    <div style={{ width: `${(ratingCounts.neutral / totalAnalysts) * 100}%` }} data-sentiment="neutral" />
                  )}
                  {ratingCounts.bearish > 0 && (
                    <div style={{ width: `${(ratingCounts.bearish / totalAnalysts) * 100}%` }} data-sentiment="negative" />
                  )}
                </div>
                <div className="sm-flex sm-gap-16 sm-text-12">
                  <span className="sm-mint">● Buy/OW: {ratingCounts.bullish}</span>
                  <span className="sm-gold">● Hold/Neutral: {ratingCounts.neutral}</span>
                  <span className="sm-coral">● Sell/UW: {ratingCounts.bearish}</span>
                </div>
              </>
            ) : (
              <div className="sm-body-sm sm-text3">No analyst coverage data yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Coverage by Firm - Grouped Cards */}
      <div className="sm-divider">
        <span className="sm-section-label sm-m-0">Coverage by Firm</span>
      </div>
      <div className="sm-ws-panel">
        <div className="sm-ws-panel-header">
          <span className="sm-section-label sm-m-0">{totalAnalysts} Analyst{totalAnalysts !== 1 ? 's' : ''} Covering<UpdateIndicators sources="WS" /></span>
        </div>
        <div className="sm-ws-panel-body sm-flex-col sm-gap-12">
          {coverage.map((cov) => {
            const isExpanded = expandedFirm === cov.firm;
            const fullReportCount = cov.reports.filter(r => r.isFullReport).length;
            const updateCount = cov.reports.filter(r => !r.isFullReport).length;

            return (
              <div key={cov.firm} className="sm-ws-panel" data-active={isExpanded ? 'true' : undefined}>
                {/* Firm Header - Always Visible */}
                <div
                  onClick={() => setExpandedFirm(isExpanded ? null : cov.firm)}
                  className="sm-ws-firm-header"
                  data-open={isExpanded ? 'true' : 'false'}
                >
                  <div className="sm-flex sm-gap-16">
                    <div>
                      <div className="sm-ws-firm-name">{cov.firm}</div>
                      <div className="sm-subtle">{cov.analyst} · Since {cov.coverageSince} · {cov.reports.length} report{cov.reports.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="sm-ws-firm-meta">
                    {/* Current Rating Badge */}
                    <div className="sm-ws-rating-badge" style={{ '--badge-color': getRatingColor(cov.currentRating, cov.currentRatingNormalized) } as React.CSSProperties}>
                      <span>{cov.currentRating.toUpperCase()}</span>
                    </div>

                    {/* Current PT */}
                    <div className="sm-ws-pt">
                      <span className="sm-text sm-text-16 sm-fw-600">
                        {cov.currentPT ? `$${cov.currentPT}` : '—'}
                      </span>
                    </div>

                    {/* Expand indicator */}
                    <span className="sm-subtle">{isExpanded ? '▼' : '▶'}</span>
                  </div>
                </div>

                {/* Firm Notes */}
                {cov.notes && (
                  <div className="sm-ws-notes-wrap">
                    <div className="sm-ws-firm-notes">{cov.notes}</div>
                  </div>
                )}

                {/* Expanded History */}
                {isExpanded && (
                  <div className="sm-ws-panel-body">
                    <div className="sm-subtle-sm sm-mb-12">
                      COVERAGE HISTORY ({cov.reports.length} entr{cov.reports.length !== 1 ? 'ies' : 'y'})
                    </div>
                    <div className="sm-flex-col sm-gap-8">
                      {cov.reports.map((report, idx) => {
                        const reportKey = `${cov.firm}-${idx}`;
                        const isReportExpanded = expandedReportIdx === reportKey;
                        const isExpandable = report.isFullReport && (report.reportSummary || report.assumptions || report.estimates);

                        return (
                          <div
                            key={idx}
                            className="sm-ws-report"
                            data-full={report.isFullReport && (report.reportSummary || report.assumptions) ? 'true' : undefined}
                            data-expandable={isExpandable ? 'true' : 'false'}
                          >
                            {/* Report Header */}
                            <div className="sm-flex-between sm-mb-8">
                              <div className="sm-flex sm-gap-12">
                                <span className="sm-subtle sm-ws-date-cell">
                                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="sm-badge" style={{ '--badge-color': getActionColor(report.action) } as React.CSSProperties}>
                                  {report.action}
                                </span>
                                <span className="sm-text-12 sm-fw-500 sm-ws-kpi-dynamic" style={{ '--kpi-color': getRatingColor(report.rating, report.ratingNormalized) } as React.CSSProperties}>
                                  {report.rating}
                                </span>
                              </div>
                              <div className="sm-flex sm-gap-12">
                                <span className="sm-mono-md sm-text">
                                  {report.priceTarget ? `$${report.priceTarget}` : '—'}
                                  {report.previousTarget && (
                                    <span className="sm-subtle-sm"> ← ${report.previousTarget}</span>
                                  )}
                                </span>
                                {report.source && (
                                  <a
                                    href={report.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sm-ws-source-link"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {report.source}
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Report Title if exists */}
                            {report.reportTitle && (
                              <div className="sm-ws-report-title sm-mb-8">
                                "{report.reportTitle}"
                              </div>
                            )}

                            {/* Full report content (expandable) */}
                            {report.isFullReport && report.thesis && (
                              <>
                                <div className="sm-body-sm sm-mb-8">
                                  {report.thesis}
                                </div>

                                <div className="sm-flex sm-gap-8 sm-items-center">
                                  {(report.reportSummary || report.assumptions || report.estimates) && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedReportIdx(isReportExpanded ? null : reportKey);
                                      }}
                                      className="sm-ws-detail-btn"
                                    >
                                      {isReportExpanded ? '▼ Less details' : '▶ Full report details'}
                                    </button>
                                  )}
                                  <button className="sm-ai-gen-btn" onClick={() => { /* TODO: Implement AI Summary generation */ }}>AI Summary</button>
                                </div>

                                {isReportExpanded && (
                                  <div className="sm-ws-details">
                                    {report.reportSummary && (
                                      <div className="sm-ws-summary sm-mb-12">
                                        {report.reportSummary.split('\n\n').map((paragraph, pIdx) => {
                                          const headerMatch = paragraph.match(/^\*\*(.+?)\*\*/);
                                          if (headerMatch) {
                                            const header = headerMatch[1];
                                            const rest = paragraph.replace(/^\*\*.+?\*\*\s*/, '');
                                            return (
                                              <div key={pIdx} className="sm-mb-12">
                                                <div className="sm-text sm-fw-600 sm-text-11">{header}</div>
                                                <div>{rest}</div>
                                              </div>
                                            );
                                          }
                                          return <div key={pIdx} className="sm-mb-8">{paragraph}</div>;
                                        })}
                                      </div>
                                    )}

                                    {report.assumptions && report.assumptions.length > 0 && (
                                      <div className="sm-mb-12">
                                        <div className="sm-ws-section-label sm-text3">KEY ASSUMPTIONS</div>
                                        <div className="sm-flex-wrap sm-gap-6">
                                          {report.assumptions.map((a, i) => (
                                            <span key={i} className="sm-ws-assumption">
                                              {a.label}: <span className="sm-violet">{a.value}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {report.catalysts && report.catalysts.length > 0 && (
                                      <div className="sm-mb-12">
                                        <div className="sm-ws-section-label sm-mint">CATALYSTS</div>
                                        <ul className="sm-ws-list">
                                          {report.catalysts.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                      </div>
                                    )}

                                    {report.risks && report.risks.length > 0 && (
                                      <div className="sm-mb-12">
                                        <div className="sm-ws-section-label sm-coral">RISKS</div>
                                        <ul className="sm-ws-list">
                                          {report.risks.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                      </div>
                                    )}

                                    {report.estimates && report.estimates.length > 0 && (
                                      <div className="sm-mb-12">
                                        <div className="sm-ws-section-label sm-sky">ESTIMATES</div>
                                        <div className="sm-ws-table">
                                          <div className="sm-ws-estimate-header sm-ws-est-cols">
                                            {['Metric', 'FY24', 'FY25', 'FY26', 'FY27', 'FY28'].map(h => (
                                              <span key={h} className="sm-ws-th" data-align={h === 'Metric' ? undefined : 'right'}>{h}</span>
                                            ))}
                                          </div>
                                          {report.estimates.map((e, i) => (
                                            <div key={i} className="sm-ws-estimate-grid sm-ws-est-cols">
                                              <span className="sm-ws-estimate-cell">{e.metric}</span>
                                              <span className="sm-ws-estimate-cell" data-align="right">{e.fy24 || '—'}</span>
                                              <span className="sm-ws-estimate-cell" data-align="right">{e.fy25 || '—'}</span>
                                              <span className="sm-ws-estimate-cell" data-align="right">{e.fy26 || '—'}</span>
                                              <span className="sm-ws-estimate-cell" data-align="right">{e.fy27 || '—'}</span>
                                              <span className="sm-ws-estimate-cell" data-align="right">{e.fy28 || '—'}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {report.methodology && (
                                      <div className="sm-subtle-sm sm-mb-8">
                                        <span>Methodology: </span>
                                        <span className="sm-text2">{report.methodology}</span>
                                      </div>
                                    )}

                                    {report.fullNotes && (
                                      <div className="sm-subtle-sm sm-lh-15">
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
                                                <div key={bIdx} className="sm-ws-table sm-mb-8">
                                                  <div className="sm-ws-estimate-header sm-ws-dynamic-grid" style={{ '--ws-cols': cols } as React.CSSProperties}>
                                                    {headers.map((h, hIdx) => (
                                                      <span key={hIdx} className="sm-ws-th" data-align={hIdx === 0 ? undefined : 'right'}>{h}</span>
                                                    ))}
                                                  </div>
                                                  {dataRows.map((row, rIdx) => (
                                                    <div key={rIdx} className="sm-ws-estimate-grid sm-ws-dynamic-grid" style={{ '--ws-cols': cols } as React.CSSProperties}>
                                                      {row.map((cell, cIdx) => (
                                                        <span key={cIdx} className="sm-ws-estimate-cell" data-align={cIdx === 0 ? undefined : 'right'}>{cell}</span>
                                                      ))}
                                                    </div>
                                                  ))}
                                                </div>
                                              );
                                            }
                                            if (block.content.trim() === '') return null;
                                            const isHeader = block.content.trim().endsWith(':') && block.content.trim() === block.content.trim().toUpperCase();
                                            if (isHeader) {
                                              return <div key={bIdx} className="sm-ws-block-header-spaced">{block.content.replace(/:$/, '')}</div>;
                                            }
                                            return <div key={bIdx} className="sm-text3 sm-subtle-sm">{block.content}</div>;
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
      <div className="sm-cfa-notes">
        <div className="sm-flex sm-gap-6">
          <span className="sm-subtle sm-opacity-70">📚</span>
          <h4 className="sm-cfa-title">CFA Level III — Sell-Side Research</h4>
        </div>
        <div className="sm-cfa-list">
          <p><strong>Consensus Price Target:</strong> Average of all covering analysts' PTs. Useful as a reference point but not a forecast — PTs are backward-looking and often anchored to current price. Median PT is more robust to outliers.</p>
          <p><strong>Initiation vs Reiterate:</strong> Initiations carry more weight — the analyst performed full due diligence. Reiterations often just update the model after earnings. Watch for rating changes (upgrades/downgrades) as stronger signals.</p>
          <p><strong>Buy/Hold/Sell Distribution:</strong> Sell-side has structural bullish bias (~50% Buy, ~45% Hold, ~5% Sell industry-wide). A "Hold" often means "Sell" in practice. Heavy Buy consensus can indicate crowding risk.</p>
          <p><strong>Price Target Methodology:</strong> Most analysts use DCF, comparable multiples, or sum-of-parts. Understanding the methodology reveals which assumptions drive the PT — useful for assessing whether you agree with inputs.</p>
        </div>
      </div>
    </div>
  );
};

export default SharedWallStreetTab;
