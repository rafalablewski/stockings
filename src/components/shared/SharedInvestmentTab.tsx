/**
 * SharedInvestmentTab - Unified Investment Analysis Tab
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Investment tabs.
 * Gold-standard styling: sm-card, sm-toggle-header, sm-card-body, sm-model-grid
 * (matches Overview, Model, Capital tabs). Data passed via current + archive props.
 *
 * @version 1.2.0
 * @created 2026-01-31
 * @updated 2026-02-26 — Gold-standard alignment; stock-agentic data props
 */

import React, { useState } from 'react';
import type { SharedInvestmentTabProps } from './investmentTypes';

// Update indicator component (inline for portability)
const UpdateIndicators = ({ sources }: { sources: string | string[] }) => {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  const config: Record<string, { tooltip: string; color: string }> = {
    PR: { tooltip: 'Updated from Press Releases', color: '#f97316' },
    SEC: { tooltip: 'Updated from SEC Filings', color: '#3b82f6' },
    WS: { tooltip: 'Wall Street', color: '#8b5cf6' },
  };
  return (
    <span className="sm-update-dots">
      {sourceArray.map((source) => {
        const c = config[source];
        return c ? (
          <span key={source} title={c.tooltip} className="sm-update-dot" style={{ '--dot-bg': c.color } as React.CSSProperties} />
        ) : null;
      })}
    </span>
  );
};

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
  sources?: string | string[];
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="sm-card">
    <div
      className="sm-toggle-header"
      style={{ borderBottom: isOpen ? '1px solid var(--border)' : 'none' }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`Toggle ${title}`}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      <span className="sm-section-label">{title}{sources && <UpdateIndicators sources={sources} />}</span>
      <span className="sm-text3" style={{ fontSize: 18 }}>{isOpen ? '−' : '+'}</span>
    </div>
    {isOpen && <div className="sm-card-body">{children}</div>}
  </div>
);

export const SharedInvestmentTab: React.FC<SharedInvestmentTabProps> = ({
  current,
  archive,
  ticker,
  renderHeaderMetrics,
  renderEcosystemHealth,
  renderCatalysts,
  renderAccumulation,
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
        'perspectives',
        'position',
        'catalysts',
        'accumulation',
        'price-targets',
        'archive',
      ])
    );
  const collapseAll = () => setInvestmentSections(new Set(['summary']));

  return (
    <div className="sm-flex-col sm-flex-col-gap-16">
      {/* Tab Hero — gold-standard */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Due Diligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2>Investment Analysis<span className="sm-accent">.</span></h2>
        <p>Multi-perspective due diligence with 8-category scorecard, growth drivers, competitive moat, risk matrix, and historical archive.</p>
      </div>

      {/* Controls */}
      <div className="sm-flex sm-items-center sm-gap-12" style={{ justifyContent: 'flex-end' }}>
        <button onClick={expandAll} className="sm-action-btn">Expand All</button>
        <button onClick={collapseAll} className="sm-action-btn">Collapse All</button>
      </div>
      <div className="sm-flex sm-items-center sm-gap-16 sm-text-11" style={{ justifyContent: 'flex-end', color: 'var(--text3)' }}>
        <span>Data as of: <strong className="sm-text2">{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong className="sm-text2">{current.source}</strong></span>
      </div>

      {/* Rating Header Card — gold-standard sm-card + accent border */}
      <div className="sm-divider">
        <span className="sm-param-label">Current Assessment</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-card" style={{ borderLeft: `4px solid var(--${current.verdictColor})` } as React.CSSProperties}>
        <div className="sm-card-body">
          <div className="sm-flex-between sm-flex-wrap sm-gap-16 sm-items-start">
            <div>
              <div className="sm-flex sm-gap-12 sm-mb-12">
                <span className="sm-fw-700" style={{ background: `var(--${current.verdictColor})`, color: 'var(--bg)', padding: '8px 20px', borderRadius: 99, fontSize: 18 }}>{current.verdict}</span>
                <span className="sm-fw-600" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)', padding: '6px 12px', borderRadius: 99, fontSize: 12 }}>{ticker}</span>
              </div>
              <div className="sm-text-13 sm-text2 sm-mb-8">{current.tagline}</div>
              <div className="sm-text-11">Last Updated: {current.date} • Trigger: {current.source}</div>
            </div>
            {renderHeaderMetrics ? renderHeaderMetrics() : null}
          </div>
        </div>
      </div>

      {/* Section: Ratings & Scoring */}
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
            <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-flex-between sm-items-center">
              <div>
                <div className="sm-text-13t sm-fw-600">{item.category}</div>
                <div className="sm-text-11">{item.detail}</div>
              </div>
              <div className="sm-mono-lg" style={{ fontSize: 20, color: item.color }}>{item.rating}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {renderEcosystemHealth && renderEcosystemHealth()}

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
        <div className="sm-card-body sm-rounded-12 sm-mb-12" style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
          <div className="sm-fw-600 sm-mint">What&apos;s New ({current.source})</div>
          <ul className="sm-text-13 sm-text2" style={{ margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="sm-body sm-text2 sm-lh-18">
          <p className="sm-mb-12"><strong className="sm-text">Headline:</strong> {current.executiveSummary.headline}</p>
          <p className="sm-mb-12 sm-pre-line"><strong className="sm-text">Thesis:</strong> {current.executiveSummary.thesis}</p>
          <p className="sm-italic" style={{ color: 'var(--accent)' }}>&quot;{current.executiveSummary.bottomLine}&quot;</p>
        </div>
      </CollapsibleSection>

      <div className="sm-divider">
        <span className="sm-param-label">Growth Drivers</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="growth"
        title="Growth Drivers"
        sources="PR"
        isOpen={investmentSections.has('growth')}
        onToggle={() => toggleSection('growth')}
      >
        <div className="sm-flex-col sm-gap-8">
          {current.growthDrivers.map((d, i) => (
            <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-flex-between sm-items-center">
              <div style={{ flex: 1 }}>
                <div className="sm-text-13t sm-fw-600">{d.driver}</div>
                <div className="sm-subtle">{d.description}</div>
              </div>
              <span className="sm-fw-600" style={{ color: d.color, fontSize: 12, marginLeft: 16 }}>{d.impact}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <div className="sm-divider">
        <span className="sm-param-label">Competitive Moat</span>
        <span className="sm-divider-line" />
      </div>
      <CollapsibleSection
        id="moat"
        title="Competitive Moat"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('moat')}
        onToggle={() => toggleSection('moat')}
      >
        <div className="sm-grid-2-lg">
          <div className="sm-flex-col sm-gap-8">
            <span className="sm-section-label sm-mint sm-inline-block">Moat Sources</span>
            {current.moatSources.map((m, i) => (
              <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-flex-between sm-items-center">
                <div>
                  <div className="sm-text-13t sm-fw-600">{m.source}</div>
                  <div className="sm-text-11">{m.detail}</div>
                </div>
                <span className="sm-fw-600" style={{ color: m.color, fontSize: 12 }}>{m.strength}</span>
              </div>
            ))}
          </div>
          <div className="sm-flex-col sm-gap-8">
            <span className="sm-section-label sm-coral sm-inline-block">Competitive Threats</span>
            {current.moatThreats.map((t, i) => (
              <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-flex-between sm-items-center">
                <div>
                  <div className="sm-text-13t sm-fw-600">{t.threat}</div>
                  <div className="sm-text-11">{t.detail}</div>
                </div>
                <span className="sm-fw-600" style={{ color: t.color, fontSize: 12 }}>{t.risk}</span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

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
        <div className="sm-flex-col sm-gap-8">
          {current.risks.map((r, i) => (
            <div
              key={i}
              className="sm-card-body sm-bg-surface2 sm-rounded-12"
              style={{ borderLeft: `3px solid ${getSeverityColor(r.severity)}` }}
            >
              <div className="sm-flex-between">
                <span className="sm-text sm-fw-600">{r.risk}</span>
                <div className="sm-flex sm-gap-8">
                  <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: r.severity === 'Critical' ? 'color-mix(in srgb, var(--coral) 20%, transparent)' : r.severity === 'High' ? 'color-mix(in srgb, var(--gold) 20%, transparent)' : 'color-mix(in srgb, var(--sky) 20%, transparent)', color: r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)' }}>{r.severity}</span>
                  <span className="sm-text-11" style={{ padding: '2px 8px', borderRadius: 99, background: 'var(--surface)', color: 'var(--text3)' }}>{r.likelihood} likelihood</span>
                </div>
              </div>
              <div className="sm-text-13 sm-mt-8">{r.detail}</div>
              <div className="sm-subtle sm-mt-8"><strong className="sm-mint">Mitigation:</strong> {r.mitigation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Catalysts (BMNR-specific, rendered via prop) */}
      {renderCatalysts && (
        <CollapsibleSection
          id="catalysts"
          title="Catalysts"
          sources="PR"
          isOpen={investmentSections.has('catalysts')}
          onToggle={() => toggleSection('catalysts')}
        >
          {renderCatalysts()}
        </CollapsibleSection>
      )}

      <CollapsibleSection
        id="perspectives"
        title="Four Perspectives"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('perspectives')}
        onToggle={() => toggleSection('perspectives')}
      >
        <div className="sm-grid-2-lg">
          {Object.entries(current.perspectives).map(([key, p]) => (
            <div key={key} className="sm-card-body sm-bg-surface2 sm-rounded-12" style={{ borderLeft: `3px solid ${p.color}` }}>
              <div className="sm-text sm-fw-600 sm-mb-8">{p.title}</div>
              <span className="sm-fw-600" style={{ background: p.color, color: 'var(--bg)', padding: '4px 12px', borderRadius: 99, fontSize: 11 }}>{p.assessment}</span>
              <div className="sm-text-13 sm-mt-12">{p.summary}</div>
              <div className="sm-subtle sm-mt-8"><strong>Ecosystem:</strong> {p.ecosystemView}</div>
              <div className="sm-text-11 sm-mt-8"><strong>Recommendation:</strong> {p.recommendation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        id="position"
        title="Position Sizing"
        isOpen={investmentSections.has('position')}
        onToggle={() => toggleSection('position')}
      >
        <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
          {Object.entries(current.positionSizing).map(([key, size]) => (
            <div key={key} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-text-center">
              <div className="sm-micro-text sm-capitalize">{key}</div>
              <div className="sm-mono-lg sm-mint">{size.range}</div>
              <div className="sm-text-11">{size.description}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Accumulation Zones (BMNR-specific, rendered via prop) */}
      {renderAccumulation && (
        <CollapsibleSection
          id="accumulation"
          title="Accumulation Zones"
          isOpen={investmentSections.has('accumulation')}
          onToggle={() => toggleSection('accumulation')}
        >
          {renderAccumulation()}
        </CollapsibleSection>
      )}

      {current.priceTargets && current.priceTargets.length > 0 && (
        <CollapsibleSection
          id="price-targets"
          title="Price Targets"
          isOpen={investmentSections.has('price-targets')}
          onToggle={() => toggleSection('price-targets')}
        >
          <div className="sm-flex-col sm-gap-8">
            {current.priceTargets.map((pt, i) => (
              <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12 sm-flex-between sm-items-center">
                <div>
                  <div className="sm-text sm-fw-600">{pt.period}</div>
                  <div className="sm-subtle">{pt.detail}</div>
                </div>
                <div className="sm-text-right">
                  <div className="sm-mono-lg sm-mint">{pt.range}</div>
                  <div className="sm-text-11 sm-sky">{pt.outlook}</div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      <CollapsibleSection
        id="archive"
        title={`Analysis Archive (${archive.length} entries)`}
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('archive')}
        onToggle={() => toggleSection('archive')}
      >
        <div className="sm-flex-col sm-gap-8">
          {archive.map((entry, i) => (
            <div key={i} className="sm-card sm-bg-surface2 sm-rounded-12 sm-overflow-hidden">
              <div
                onClick={() => setExpandedArchive(expandedArchive === entry.date ? null : entry.date)}
                className="sm-flex-between sm-card-body sm-pointer"
              >
                <div className="sm-flex sm-gap-12">
                  <span className="sm-mono-sm sm-text3">{entry.date}</span>
                  <span className="sm-fw-600" style={{ fontSize: 12 }} data-sentiment={getVerdictSentiment(entry.verdict)}>{entry.verdict}</span>
                  <span className="sm-text-13 sm-text">{entry.headline || entry.source}</span>
                </div>
                <span className="sm-text3" style={{ fontSize: 18 }}>{expandedArchive === entry.date ? '−' : '+'}</span>
              </div>
              {expandedArchive === entry.date && (
                <div className="sm-card-body sm-border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="sm-text-13">{entry.summary}</div>
                  {entry.keyDevelopments && (
                    <ul className="sm-text-13 sm-mt-12" style={{ paddingLeft: 16, lineHeight: 1.7 }}>
                      {entry.keyDevelopments.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {entry.fullAnalysis && (
                    <div className="sm-mt-12">
                      <div className="sm-text-11 sm-mb-8">{entry.fullAnalysis.context}</div>
                      <ul className="sm-text-13" style={{ paddingLeft: 16 }}>
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
    </div>
  );
};

export default SharedInvestmentTab;
