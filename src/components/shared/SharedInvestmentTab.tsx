/**
 * SharedInvestmentTab - Unified Investment Analysis Tab
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Investment tabs.
 * Gold-standard styling: glass-border lists (sm-inv-glass-*), sm-card,
 * sm-toggle-header, sm-card-body. Data via current + archive props;
 * stock-specific extras via render props.
 *
 * ZERO inline styles. Only CSS custom property pass-throughs are used
 * via style (--inv-accent, --cols, --kpi-color, --dot-bg).
 *
 * @version 3.0.0
 * @created 2026-01-31
 * @updated 2026-02-27 — Zero inline styles; all styling via CSS classes
 */

import React, { useState } from 'react';
import type { SharedInvestmentTabProps } from './investmentTypes';
import type { UpdateSource } from './stockModelTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

// Helper: get archive verdict sentiment for data attribute
const getVerdictSentiment = (verdict: string): string => {
  if (verdict === 'STRONG BUY' || verdict === 'BUY') return 'positive';
  if (verdict === 'CONSTRUCTIVE') return 'constructive';
  return 'neutral';
};

// Helper: get severity border color
const getSeverityColor = (severity: string): string => {
  if (severity === 'Critical') return 'var(--coral)';
  if (severity === 'High') return 'var(--gold)';
  return 'var(--sky)';
};

// Helper: position sizing color
const getPositionColor = (key: string): string => {
  if (key === 'aggressive') return 'var(--mint)';
  if (key === 'growth') return 'var(--sky)';
  if (key === 'balanced') return 'var(--gold)';
  return 'var(--coral)';
};

// Collapsible Section — gold-standard: sm-card + sm-toggle-header + sm-card-body
const CollapsibleSection = ({
  id,
  title,
  sources,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  sources?: UpdateSource | UpdateSource[];
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="sm-card">
    <div
      className="sm-toggle-header"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`Toggle ${title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle())}
    >
      <span className="sm-section-label">{title}{sources && <UpdateIndicators sources={sources} />}</span>
      <span className="sm-toggle-icon">{isOpen ? '−' : '+'}</span>
    </div>
    {isOpen && <div className="sm-card-body">{children}</div>}
  </div>
);

export const SharedInvestmentTab: React.FC<SharedInvestmentTabProps> = ({
  current,
  archive,
  ticker,
  renderHeaderMetrics,
  renderAfterScorecard,
  renderBeforeGrowthDrivers,
  renderGrowthDriversExtra,
  renderAfterGrowthDrivers,
  moatDurabilityNote,
  renderAfterRiskMatrix,
  renderStrategicAssessment,
  renderAccumulation,
  cfaNotes,
}) => {
  const [investmentSections, setInvestmentSections] = useState(new Set(['summary', 'scorecard']));
  const [expandedArchive, setExpandedArchive] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    const next = new Set(investmentSections);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setInvestmentSections(next);
  };

  const expandAll = () =>
    setInvestmentSections(
      new Set([
        'summary',
        'scorecard',
        'growth',
        'moat',
        'risks',
        'strategic-assessment',
        'position',
        'archive',
      ])
    );
  const collapseAll = () => setInvestmentSections(new Set(['summary']));

  return (
    <div className="sm-flex-col sm-flex-col-gap-16">
      {/* ── Tab Hero ── */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Due Diligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2>Investment Analysis<span className="sm-accent">.</span></h2>
        <p>Multi-perspective due diligence with 8-category scorecard, growth drivers, competitive moat, risk matrix, and historical archive.</p>
      </div>

      {/* Controls */}
      <div className="sm-flex sm-items-center sm-gap-12 sm-justify-end">
        <button onClick={expandAll} className="sm-action-btn">Expand All</button>
        <button onClick={collapseAll} className="sm-action-btn">Collapse All</button>
      </div>
      <div className="sm-flex sm-items-center sm-gap-16 sm-text-11 sm-text3 sm-justify-end">
        <span>Data as of: <strong className="sm-text2">{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong className="sm-text2">{current.source}</strong></span>
      </div>

      {/* ── Current Assessment ── */}
      <div className="sm-divider">
        <span className="sm-param-label">Current Assessment</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-card sm-inv-card-accent" style={{ '--inv-accent': `var(--${current.verdictColor})` } as React.CSSProperties}>
        <div className="sm-card-body">
          <div className="sm-flex-between sm-flex-wrap sm-gap-16 sm-items-start">
            <div>
              <div className="sm-flex sm-gap-12 sm-mb-12">
                <span className="sm-inv-verdict-badge" style={{ '--inv-accent': `var(--${current.verdictColor})` } as React.CSSProperties}>{current.verdict}</span>
                <span className="sm-inv-ticker-badge">{ticker}</span>
              </div>
              <div className="sm-text-13 sm-text2 sm-mb-8">{current.tagline}</div>
              <div className="sm-text-11">Last Updated: {current.date} • Trigger: {current.source}</div>
            </div>
            {renderHeaderMetrics?.()}
          </div>
        </div>
      </div>

      {/* ── Investment Scorecard ── */}
      <div className="sm-divider">
        <span className="sm-param-label">Ratings & Scoring</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="scorecard"
        title="Investment Scorecard"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('scorecard')}
        onToggle={() => toggleSection('scorecard')}
      >
        <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
          {current.scorecard.map((item, i) => (
            <div key={i} className="sm-kpi-cell" style={{ '--kpi-color': item.color } as React.CSSProperties}>
              <div className="sm-kpi-hero-md">{item.rating}</div>
              <div className="sm-kpi-label">{item.category}</div>
              <div className="sm-kpi-sub">{item.detail}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Slot: After Scorecard (BMNR: Ecosystem Health) */}
      {renderAfterScorecard?.()}

      {/* ── Investment Summary ── */}
      <div className="sm-divider">
        <span className="sm-param-label">Investment Thesis</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="summary"
        title="Investment Summary"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('summary')}
        onToggle={() => toggleSection('summary')}
      >
        <div className="sm-inv-whats-new">
          <div className="sm-fw-600 sm-mint">What&apos;s New ({current.source})</div>
          <ul className="sm-text-13 sm-text2 sm-inv-whats-new-list">
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="sm-body sm-text2 sm-lh-18">
          <p className="sm-mb-12"><strong className="sm-text">Headline:</strong> {current.executiveSummary.headline}</p>
          <p className="sm-mb-12 sm-pre-line"><strong className="sm-text">Thesis:</strong> {current.executiveSummary.thesis}</p>
          <p className="sm-italic sm-accent">&quot;{current.executiveSummary.bottomLine}&quot;</p>
        </div>
      </CollapsibleSection>

      {/* Slot: Before Growth Drivers (CRCL: Financial Health, Unit Economics) */}
      {renderBeforeGrowthDrivers?.()}

      {/* ── Growth Drivers — glass-border ── */}
      <CollapsibleSection
        id="growth"
        title="Growth Drivers"
        sources="PR"
        isOpen={investmentSections.has('growth')}
        onToggle={() => toggleSection('growth')}
      >
        <div className="sm-inv-glass-list">
          {current.growthDrivers.map((d, i) => (
            <div key={i} className="sm-inv-glass-item">
              <div className="sm-flex-1">
                <div className="sm-text-13t sm-fw-600">{d.driver}</div>
                <div className="sm-subtle">{d.description}</div>
              </div>
              <span className="sm-inv-impact-label" style={{ '--inv-accent': d.color } as React.CSSProperties}>{d.impact}</span>
            </div>
          ))}
        </div>
        {renderGrowthDriversExtra?.()}
      </CollapsibleSection>

      {/* Slot: After Growth Drivers (CRCL: Valuation Framework) */}
      {renderAfterGrowthDrivers?.()}

      {/* ── Competitive Moat — glass-border ── */}
      {(current.moatSources.length > 0 || current.moatThreats.length > 0) && (
        <>
          <CollapsibleSection
            id="moat"
            title="Competitive Moat"
            sources={['PR', 'SEC']}
            isOpen={investmentSections.has('moat')}
            onToggle={() => toggleSection('moat')}
          >
            <div className="sm-grid-2-lg">
              <div>
                <span className="sm-section-label sm-mint sm-inline-block sm-mb-8">Moat Sources</span>
                <div className="sm-inv-glass-list">
                  {current.moatSources.map((m, i) => (
                    <div key={i} className="sm-inv-glass-item">
                      <div>
                        <div className="sm-text-13t sm-fw-600">{m.source}</div>
                        <div className="sm-text-11">{m.detail}</div>
                      </div>
                      <span className="sm-inv-impact-label" style={{ '--inv-accent': m.color } as React.CSSProperties}>{m.strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="sm-section-label sm-coral sm-inline-block sm-mb-8">Competitive Threats</span>
                <div className="sm-inv-glass-list">
                  {current.moatThreats.map((t, i) => (
                    <div key={i} className="sm-inv-glass-item">
                      <div>
                        <div className="sm-text-13t sm-fw-600">{t.threat}</div>
                        <div className="sm-text-11">{t.detail}</div>
                      </div>
                      <span className="sm-inv-impact-label" style={{ '--inv-accent': t.color } as React.CSSProperties}>{t.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {moatDurabilityNote && (
              <div className="sm-note-panel sm-mt-16">
                <strong>Moat Durability:</strong> {moatDurabilityNote}
              </div>
            )}
          </CollapsibleSection>
        </>
      )}

      {/* ── Risk Matrix — glass-border with severity accent ── */}
      <div className="sm-divider">
        <span className="sm-param-label">Risk Assessment</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="risks"
        title="Risk Matrix"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('risks')}
        onToggle={() => toggleSection('risks')}
      >
        <div className="sm-inv-glass-list">
          {current.risks.map((r, i) => (
            <div key={i} className="sm-inv-glass-accent" style={{ '--inv-accent': getSeverityColor(r.severity) } as React.CSSProperties}>
              <div className="sm-flex-between">
                <span className="sm-text sm-fw-600">{r.risk}</span>
                <div className="sm-flex sm-gap-8">
                  <span className="sm-inv-severity" style={{ '--inv-accent': getSeverityColor(r.severity) } as React.CSSProperties}>{r.severity}</span>
                  <span className="sm-inv-likelihood">{r.likelihood} likelihood</span>
                </div>
              </div>
              <div className="sm-text-13 sm-mt-8">{r.detail}</div>
              <div className="sm-subtle sm-mt-8"><strong className="sm-mint">Mitigation:</strong> {r.mitigation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Slot: After Risk Matrix (CRCL: Rate Sensitivity Calculator) */}
      {renderAfterRiskMatrix?.()}

      {/* ── Risks & Strategic Assessment ── */}
      <CollapsibleSection
        id="strategic-assessment"
        title="Risks & Strategic Assessment"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('strategic-assessment')}
        onToggle={() => toggleSection('strategic-assessment')}
      >
        {renderStrategicAssessment ? renderStrategicAssessment() : (
          /* Fallback: render perspectives as glass-border 2x2 grid */
          <div className="sm-inv-perspectives-grid">
            {Object.entries(current.perspectives).map(([key, p]) => (
              <div key={key} className="sm-inv-perspective" style={{ '--inv-accent': p.color } as React.CSSProperties}>
                <div className="sm-text sm-fw-600 sm-mb-8">{p.title}</div>
                <span className="sm-inv-assess-badge" style={{ '--inv-accent': p.color } as React.CSSProperties}>{p.assessment}</span>
                <div className="sm-text-13 sm-mt-12">{p.summary}</div>
                <div className="sm-subtle sm-mt-8"><strong>Ecosystem:</strong> {p.ecosystemView}</div>
                <div className="sm-text-11 sm-mt-8"><strong>Recommendation:</strong> {p.recommendation}</div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* ── Position Sizing & Price Targets — glass-border ── */}
      <CollapsibleSection
        id="position"
        title="Position Sizing & Price Targets"
        sources="WS"
        isOpen={investmentSections.has('position')}
        onToggle={() => toggleSection('position')}
      >
        <div className="sm-grid-2-lg">
          <div>
            <span className="sm-section-label sm-text sm-inline-block sm-mb-8">Recommended Allocation</span>
            <div className="sm-inv-glass-list">
              {Object.entries(current.positionSizing).map(([key, size]) => (
                <div key={key} className="sm-inv-glass-item">
                  <span className="sm-text2 sm-capitalize">{key}</span>
                  <span className="sm-fw-500 sm-mono-sm sm-inv-impact-label" style={{ '--inv-accent': getPositionColor(key) } as React.CSSProperties}>{size.range}</span>
                </div>
              ))}
            </div>
          </div>
          {current.priceTargets && current.priceTargets.length > 0 && (
            <div>
              <span className="sm-section-label sm-text sm-inline-block sm-mb-8">Price Targets</span>
              <div className="sm-inv-glass-list">
                {current.priceTargets.map((pt, i) => (
                  <div key={i} className="sm-inv-glass-item">
                    <div>
                      <div className="sm-text sm-fw-600">{pt.period}</div>
                      <div className="sm-subtle">{pt.detail}</div>
                    </div>
                    <div className="sm-text-right">
                      <div className="sm-mono-sm sm-mint">{pt.range}</div>
                      <div className="sm-text-11 sm-sky">{pt.outlook}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {renderAccumulation?.()}
      </CollapsibleSection>

      {/* ── Analysis Archive ── */}
      <div className="sm-divider">
        <span className="sm-param-label">Historical Analysis</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="archive"
        title={`Analysis Archive (${archive.length} entries)`}
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('archive')}
        onToggle={() => toggleSection('archive')}
      >
        <div className="sm-inv-glass-list">
          {archive.map((entry, i) => (
            <div key={i} className="sm-bg-surface">
              <div
                onClick={() => setExpandedArchive(expandedArchive === entry.date ? null : entry.date)}
                className="sm-flex-between sm-pointer sm-inv-archive-row"
              >
                <div className="sm-flex sm-gap-12">
                  <span className="sm-mono-sm sm-text3">{entry.date}</span>
                  <span className="sm-fw-600 sm-text-12" data-sentiment={getVerdictSentiment(entry.verdict)}>{entry.verdict}</span>
                  <span className="sm-text-13 sm-text">{entry.headline || entry.source}</span>
                </div>
                <span className="sm-toggle-icon">{expandedArchive === entry.date ? '−' : '+'}</span>
              </div>
              {expandedArchive === entry.date && (
                <div className="sm-inv-archive-detail">
                  <div className="sm-flex-between sm-items-start">
                    <div className="sm-text-13 sm-pt-12 sm-flex-1">{entry.summary}</div>
                    <button className="sm-ai-gen-btn sm-mt-12" onClick={() => {}}>AI Summary</button>
                  </div>
                  {entry.keyDevelopments && (
                    <ul className="sm-text-13 sm-inv-dev-list">
                      {entry.keyDevelopments.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {entry.fullAnalysis && (
                    <div className="sm-mt-12">
                      <div className="sm-text-11 sm-mb-8">{entry.fullAnalysis.context}</div>
                      <ul className="sm-text-13 sm-pl-16">
                        {entry.fullAnalysis.keyHighlights.slice(0, 5).map((h, j) => (
                          <li key={j}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ── CFA Notes ── */}
      {cfaNotes && cfaNotes.length > 0 && (
        <CFANotes title="CFA Level III — Investment Analysis" items={cfaNotes} />
      )}
    </div>
  );
};

export default SharedInvestmentTab;
