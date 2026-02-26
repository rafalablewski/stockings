/**
 * SharedInvestmentTab - Unified Investment Analysis Tab
 *
 * Shared component for ASTS, BMNR, CRCL Investment tabs.
 * Uses unified 8-category scorecard framework and common data structures.
 * Uses sm-* / sm-inv-* CSS classes from stock-model-styles.ts for styling.
 *
 * @version 1.1.0
 * @created 2026-01-31
 * @updated 2026-02-25 — Replaced all inline styles with CSS classes
 */

import React, { useState } from 'react';
import type { SharedInvestmentTabProps, ArchiveEntry } from './investmentTypes';

// Update indicator component (inline for portability)
const UpdateIndicators = ({ sources }: { sources: string | string[] }) => {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  const config: Record<string, { tooltip: string; color: string }> = {
    PR: { tooltip: 'Updated from Press Releases', color: '#f97316' },
    SEC: { tooltip: 'Updated from SEC Filings', color: '#3b82f6' },
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

// Collapsible Section Component
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
  <div className="sm-panel">
    <div
      onClick={onToggle}
      className="sm-flex-between sm-pointer"
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`Toggle ${title}`}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      <div className="sm-panel-title">
        {title}
        {sources && <UpdateIndicators sources={sources} />}
      </div>
      <span className="sm-inv-toggle-icon">{isOpen ? '−' : '+'}</span>
    </div>
    {isOpen && <div className="sm-mt-16">{children}</div>}
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
        'archive',
      ])
    );
  const collapseAll = () => setInvestmentSections(new Set(['summary']));

  return (
    <div className="sm-flex-col-gap-16">
      {/* Tab Hero — Unified pattern */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2>Investment Analysis<span className="sm-accent">.</span></h2>
        <p>Unified 8-category scorecard framework with growth drivers, competitive moat analysis, risk matrix, and multi-perspective assessment.</p>
      </div>

      {/* Controls */}
      <div className="sm-flex-between">
        <div className="sm-subtle-sm sm-flex sm-gap-16 sm-justify-end">
          <span>Data as of: <strong className="sm-text2">{current.date}</strong></span>
          <span>•</span>
          <span>Source: <strong className="sm-text2">{current.source}</strong></span>
        </div>
        <div className="sm-flex sm-gap-12">
          <button onClick={expandAll} className="sm-action-btn">Expand All</button>
          <button onClick={collapseAll} className="sm-action-btn">Collapse All</button>
        </div>
      </div>

      {/* Rating Header Card */}
      <div className="sm-panel sm-inv-panel-bordered" style={{ '--panel-border-color': `var(--${current.verdictColor})` } as React.CSSProperties}>
        <div className="sm-flex-between sm-flex-wrap sm-gap-16 sm-items-start">
          <div>
            <div className="sm-flex sm-gap-12 sm-mb-12">
              <span className="sm-inv-verdict-badge" style={{ '--badge-bg': `var(--${current.verdictColor})` } as React.CSSProperties}>
                {current.verdict}
              </span>
              <span className="sm-inv-ticker-badge">
                {ticker}
              </span>
            </div>
            <div className="sm-text sm-fw-600 sm-text-16 sm-mb-8">
              {current.tagline}
            </div>
            <div className="sm-subtle-sm">
              Last Updated: {current.date} • Trigger: {current.source}
            </div>
          </div>
          {/* Company-specific header metrics */}
          {renderHeaderMetrics ? renderHeaderMetrics() : null}
        </div>
      </div>

      {/* Investment Scorecard */}
      <CollapsibleSection
        id="scorecard"
        title="Investment Scorecard"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('scorecard')}
        onToggle={() => toggleSection('scorecard')}
      >
        <div className="sm-inv-scorecard-grid">
          {current.scorecard.map((item, i) => (
            <div key={i} className="sm-inv-scorecard-item">
              <div>
                <div className="sm-text-13t sm-fw-600">{item.category}</div>
                <div className="sm-subtle-sm">{item.detail}</div>
              </div>
              <div className="sm-inv-scorecard-rating" style={{ '--rating-color': item.color } as React.CSSProperties}>
                {item.rating}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Ecosystem Health (BMNR-specific, rendered via prop) */}
      {renderEcosystemHealth && renderEcosystemHealth()}

      {/* Executive Summary */}
      <CollapsibleSection
        id="summary"
        title="Executive Summary"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('summary')}
        onToggle={() => toggleSection('summary')}
      >
        <div className="sm-inv-whats-new">
          <div className="sm-mint sm-fw-600 sm-mb-8">
            What's New ({current.source})
          </div>
          <ul className="sm-inv-whats-new-list">
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="sm-body sm-text2 sm-lh-18">
          <p className="sm-mb-12">
            <strong className="sm-text">Headline:</strong> {current.executiveSummary.headline}
          </p>
          <p className="sm-mb-12 sm-pre-line">
            <strong className="sm-text">Thesis:</strong> {current.executiveSummary.thesis}
          </p>
          <p className="sm-inv-bottom-line">
            "{current.executiveSummary.bottomLine}"
          </p>
        </div>
      </CollapsibleSection>

      {/* Growth Drivers */}
      <CollapsibleSection
        id="growth"
        title="Growth Drivers"
        sources="PR"
        isOpen={investmentSections.has('growth')}
        onToggle={() => toggleSection('growth')}
      >
        <div className="sm-flex-col sm-gap-12">
          {current.growthDrivers.map((d, i) => (
            <div key={i} className="sm-inv-driver-card" style={{ '--driver-color': d.color } as React.CSSProperties}>
              <div className="sm-flex-between sm-mb-8">
                <span className="sm-text sm-fw-600 sm-text-14">{d.driver}</span>
                <span className="sm-inv-impact-badge" style={{ '--impact-color': d.color } as React.CSSProperties}>
                  {d.impact}
                </span>
              </div>
              <div className="sm-body-sm">{d.description}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Competitive Moat */}
      <CollapsibleSection
        id="moat"
        title="Competitive Moat"
        sources="PR"
        isOpen={investmentSections.has('moat')}
        onToggle={() => toggleSection('moat')}
      >
        <div className="sm-grid-2col-responsive sm-mb-16">
          {/* Moat Sources */}
          <div>
            <div className="sm-mb-12 sm-mint sm-fw-600 sm-text-13">Moat Sources</div>
            <div className="sm-flex-col sm-gap-12">
              {current.moatSources.map((m, i) => (
                <div key={i} className="sm-inv-moat-card">
                  <div className="sm-flex-between">
                    <span className="sm-text-13t sm-fw-600">{m.source}</span>
                    <span className="sm-inv-moat-strength" style={{ '--strength-color': m.color } as React.CSSProperties}>{m.strength}</span>
                  </div>
                  <div className="sm-subtle sm-mt-8">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Moat Threats */}
          <div>
            <div className="sm-mb-12 sm-coral sm-fw-600 sm-text-13">Competitive Threats</div>
            <div className="sm-flex-col sm-gap-12">
              {current.moatThreats.map((t, i) => (
                <div key={i} className="sm-inv-moat-card">
                  <div className="sm-flex-between">
                    <span className="sm-text-13t sm-fw-600">{t.threat}</span>
                    <span className="sm-inv-moat-strength" style={{ '--strength-color': t.color } as React.CSSProperties}>{t.risk}</span>
                  </div>
                  <div className="sm-subtle sm-mt-8">{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Risk Matrix */}
      <CollapsibleSection
        id="risks"
        title="Risk Matrix"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('risks')}
        onToggle={() => toggleSection('risks')}
      >
        <div className="sm-flex-col sm-gap-12">
          {current.risks.map((r, i) => (
            <div
              key={i}
              className="sm-inv-risk-card"
              style={{ '--severity-color': getSeverityColor(r.severity) } as React.CSSProperties}
            >
              <div className="sm-flex-between sm-mb-8">
                <span className="sm-text sm-fw-600 sm-text-14">{r.risk}</span>
                <div className="sm-flex sm-gap-8">
                  <span className="sm-inv-severity-badge">{r.severity}</span>
                  <span className="sm-inv-severity-badge">P: {r.likelihood}</span>
                </div>
              </div>
              <div className="sm-body-sm sm-mb-8">{r.detail}</div>
              <div className="sm-subtle sm-mint"><strong>Mitigation:</strong> {r.mitigation}</div>
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

      {/* Four Perspectives */}
      <CollapsibleSection
        id="perspectives"
        title="Four Perspectives"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('perspectives')}
        onToggle={() => toggleSection('perspectives')}
      >
        <div className="sm-grid-3col-responsive">
          {Object.entries(current.perspectives).map(([key, p]) => (
            <div key={key} className="sm-inv-perspective-card" style={{ '--perspective-color': p.color } as React.CSSProperties}>
              <div className="sm-text sm-fw-600 sm-text-14 sm-mb-8">{p.title}</div>
              <div className="sm-inv-assessment-badge" style={{ '--assess-color': p.color } as React.CSSProperties}>
                {p.assessment}
              </div>
              <div className="sm-body-sm sm-mb-12">{p.summary}</div>
              <div className="sm-subtle sm-mb-8"><strong>Ecosystem:</strong> {p.ecosystemView}</div>
              <div className="sm-inv-recommendation">
                <strong>Recommendation:</strong> {p.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Position Sizing */}
      <CollapsibleSection
        id="position"
        title="Position Sizing"
        isOpen={investmentSections.has('position')}
        onToggle={() => toggleSection('position')}
      >
        <div className="sm-grid-4col-responsive">
          {Object.entries(current.positionSizing).map(([key, size]) => (
            <div key={key} className="sm-text-center sm-bg-surface2 sm-rounded-8 sm-p-12">
              <div className="sm-subtle-sm sm-capitalize">{key}</div>
              <div className="sm-mono-lg sm-mint">{size.range}</div>
              <div className="sm-subtle-sm">{size.description}</div>
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

      {/* Price Targets (ASTS-specific) */}
      {current.priceTargets && current.priceTargets.length > 0 && (
        <CollapsibleSection
          id="price-targets"
          title="Price Targets"
          isOpen={investmentSections.has('price-targets')}
          onToggle={() => toggleSection('price-targets')}
        >
          <div className="sm-flex-col sm-gap-12">
            {current.priceTargets.map((pt, i) => (
              <div key={i} className="sm-flex-between sm-bg-surface2 sm-rounded-8 sm-p-16">
                <div>
                  <div className="sm-text sm-fw-600 sm-text-14">{pt.period}</div>
                  <div className="sm-subtle">{pt.detail}</div>
                </div>
                <div className="sm-text-right">
                  <div className="sm-mono-lg sm-mint">{pt.range}</div>
                  <div className="sm-subtle-sm sm-sky">{pt.outlook}</div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Archive */}
      <CollapsibleSection
        id="archive"
        title={`Historical Archive (${archive.length} entries)`}
        isOpen={investmentSections.has('archive')}
        onToggle={() => toggleSection('archive')}
      >
        <div className="sm-flex-col sm-gap-12">
          {archive.map((entry, i) => (
            <div key={i} className="sm-bg-surface2 sm-rounded-8 sm-overflow-hidden">
              <div
                onClick={() => setExpandedArchive(expandedArchive === entry.date ? null : entry.date)}
                className="sm-flex-between sm-p-12 sm-pointer"
              >
                <div className="sm-flex sm-gap-12">
                  <span className="sm-mono-sm sm-text3">{entry.date}</span>
                  <span className="sm-inv-archive-verdict" data-sentiment={getVerdictSentiment(entry.verdict)}>
                    {entry.verdict}
                  </span>
                  <span className="sm-body-sm sm-text">{entry.headline || entry.source}</span>
                </div>
                <span className="sm-inv-toggle-icon sm-text-14">
                  {expandedArchive === entry.date ? '−' : '+'}
                </span>
              </div>
              {expandedArchive === entry.date && (
                <div className="sm-inv-archive-detail">
                  <div className="sm-body-sm sm-mt-12">{entry.summary}</div>
                  {entry.keyDevelopments && (
                    <ul className="sm-inv-archive-list">
                      {entry.keyDevelopments.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {entry.fullAnalysis && (
                    <div className="sm-mt-12">
                      <div className="sm-subtle sm-mb-8">{entry.fullAnalysis.context}</div>
                      <ul className="sm-inv-archive-list">
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
