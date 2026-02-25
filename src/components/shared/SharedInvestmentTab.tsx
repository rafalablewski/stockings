/**
 * SharedInvestmentTab - Unified Investment Analysis Tab
 *
 * Shared component for ASTS, BMNR, CRCL Investment tabs.
 * Uses unified 8-category scorecard framework and common data structures.
 * Uses sm-* CSS classes from stock-model-styles.ts for styling.
 *
 * @version 1.0.0
 * @created 2026-01-31
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
      className="sm-flex-between"
      style={{ cursor: 'pointer' }}
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
      <span className="sm-text3" style={{ fontSize: 18 }}>{isOpen ? '−' : '+'}</span>
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
    <>
      {/* Header Controls */}
      <div className="sm-flex-between sm-mb-16">
        <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text)', display: 'flex', alignItems: 'center', margin: 0 }}>
          Investment Analysis
          <UpdateIndicators sources={['PR', 'SEC']} />
        </h2>
        <div className="sm-flex sm-gap-12">
          <button onClick={expandAll} className="sm-action-btn">Expand All</button>
          <button onClick={collapseAll} className="sm-action-btn">Collapse All</button>
        </div>
      </div>

      {/* Data Refresh Indicator */}
      <div className="sm-subtle-sm sm-mb-16" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
        <span>Data as of: <strong className="sm-text2">{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong className="sm-text2">{current.source}</strong></span>
      </div>

      {/* Rating Header Card */}
      <div className="sm-panel" style={{ borderLeft: `4px solid var(--${current.verdictColor})`, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="sm-flex sm-gap-12 sm-mb-12">
              <span style={{ background: `var(--${current.verdictColor})`, color: 'var(--bg)', padding: '8px 24px', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>
                {current.verdict}
              </span>
              <span style={{ background: 'rgba(0,212,170,0.15)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                {ticker}
              </span>
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 16, marginBottom: 8 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {current.scorecard.map((item, i) => (
            <div key={i} className="sm-flex-between" style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.category}</div>
                <div className="sm-subtle-sm">{item.detail}</div>
              </div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: item.color }}>
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
        <div style={{ background: 'rgba(126,231,135,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(126,231,135,0.2)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>
            What's New ({current.source})
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14 }}>
          <p className="sm-mb-12">
            <strong className="sm-text">Headline:</strong> {current.executiveSummary.headline}
          </p>
          <p className="sm-mb-12" style={{ whiteSpace: 'pre-line' }}>
            <strong className="sm-text">Thesis:</strong> {current.executiveSummary.thesis}
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--cyan)', padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
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
            <div key={i} style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, borderLeft: `3px solid ${d.color}` }}>
              <div className="sm-flex-between sm-mb-8">
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{d.driver}</span>
                <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, color: d.color, fontWeight: 600 }} className="sm-tinted-bg" {...{ style: { fontSize: 11, padding: '4px 8px', borderRadius: 4, color: d.color, fontWeight: 600, background: `color-mix(in srgb, ${d.color} 15%, transparent)` } }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {/* Moat Sources */}
          <div>
            <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 13 }} className="sm-mb-12">Moat Sources</div>
            <div className="sm-flex-col sm-gap-8">
              {current.moatSources.map((m, i) => (
                <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
                  <div className="sm-flex-between">
                    <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{m.source}</span>
                    <span style={{ fontSize: 11, color: m.color }}>{m.strength}</span>
                  </div>
                  <div className="sm-subtle" style={{ marginTop: 4 }}>{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Moat Threats */}
          <div>
            <div style={{ fontWeight: 600, color: 'var(--coral)', fontSize: 13 }} className="sm-mb-12">Competitive Threats</div>
            <div className="sm-flex-col sm-gap-8">
              {current.moatThreats.map((t, i) => (
                <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
                  <div className="sm-flex-between">
                    <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{t.threat}</span>
                    <span style={{ fontSize: 11, color: t.color }}>{t.risk}</span>
                  </div>
                  <div className="sm-subtle" style={{ marginTop: 4 }}>{t.detail}</div>
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
              style={{
                background: 'var(--surface2)',
                padding: 16,
                borderRadius: 8,
                borderLeft: `3px solid ${r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)'}`,
              }}
            >
              <div className="sm-flex-between sm-mb-8">
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{r.risk}</span>
                <div className="sm-flex sm-gap-8">
                  <span style={{ fontSize: 10, padding: '3px 6px', borderRadius: 4, background: 'var(--surface)', color: 'var(--text3)' }}>{r.severity}</span>
                  <span style={{ fontSize: 10, padding: '3px 6px', borderRadius: 4, background: 'var(--surface)', color: 'var(--text3)' }}>P: {r.likelihood}</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {Object.entries(current.perspectives).map(([key, p]) => (
            <div key={key} style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, borderTop: `3px solid ${p.color}` }}>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: p.color, fontWeight: 600, marginBottom: 12, padding: '4px 8px', background: `color-mix(in srgb, ${p.color} 10%, transparent)`, borderRadius: 4, display: 'inline-block' }}>
                {p.assessment}
              </div>
              <div className="sm-body-sm sm-mb-12">{p.summary}</div>
              <div className="sm-subtle sm-mb-8"><strong>Ecosystem:</strong> {p.ecosystemView}</div>
              <div style={{ fontSize: 12, color: 'var(--mint)', padding: 8, background: 'rgba(0,212,170,0.1)', borderRadius: 4 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {Object.entries(current.positionSizing).map(([key, size]) => (
            <div key={key} className="sm-text-center" style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
              <div className="sm-subtle-sm" style={{ textTransform: 'capitalize' }}>{key}</div>
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
              <div key={i} className="sm-flex-between" style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{pt.period}</div>
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
        <div className="sm-flex-col sm-gap-8">
          {archive.map((entry, i) => (
            <div key={i} style={{ background: 'var(--surface2)', borderRadius: 8, overflow: 'hidden' }}>
              <div
                onClick={() => setExpandedArchive(expandedArchive === entry.date ? null : entry.date)}
                className="sm-flex-between"
                style={{ padding: 12, cursor: 'pointer' }}
              >
                <div className="sm-flex sm-gap-12">
                  <span className="sm-mono-sm sm-text3">{entry.date}</span>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600,
                    background: entry.verdict === 'STRONG BUY' || entry.verdict === 'BUY' ? 'rgba(0,212,170,0.15)' : entry.verdict === 'CONSTRUCTIVE' ? 'rgba(100,149,237,0.15)' : 'rgba(234,179,8,0.15)',
                    color: entry.verdict === 'STRONG BUY' || entry.verdict === 'BUY' ? 'var(--mint)' : entry.verdict === 'CONSTRUCTIVE' ? 'var(--sky)' : 'var(--gold)',
                  }}>
                    {entry.verdict}
                  </span>
                  <span className="sm-body-sm sm-text">{entry.headline || entry.source}</span>
                </div>
                <span className="sm-text3" style={{ fontSize: 14 }}>
                  {expandedArchive === entry.date ? '−' : '+'}
                </span>
              </div>
              {expandedArchive === entry.date && (
                <div style={{ padding: '0 12px 12px', borderTop: '1px solid var(--surface)' }}>
                  <div className="sm-body-sm sm-mt-12">{entry.summary}</div>
                  {entry.keyDevelopments && (
                    <ul style={{ margin: '8px 0', paddingLeft: 16, fontSize: 12, color: 'var(--text3)' }}>
                      {entry.keyDevelopments.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {entry.fullAnalysis && (
                    <div className="sm-mt-12">
                      <div className="sm-subtle sm-mb-8">{entry.fullAnalysis.context}</div>
                      <ul style={{ margin: '8px 0', paddingLeft: 16, fontSize: 12, color: 'var(--text3)' }}>
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
    </>
  );
};

export default SharedInvestmentTab;
