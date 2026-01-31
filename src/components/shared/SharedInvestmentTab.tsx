/**
 * SharedInvestmentTab - Unified Investment Analysis Tab
 *
 * Shared component for ASTS, BMNR, CRCL Investment tabs.
 * Uses unified 8-category scorecard framework and common data structures.
 *
 * @version 1.0.0
 * @created 2026-01-31
 */

import React, { useState } from 'react';
import type { SharedInvestmentTabProps, ArchiveEntry } from './investmentTypes';

// Update indicator component (inline for portability)
const UpdateIndicators = ({ sources }: { sources: string | string[] }) => {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  const config: Record<string, { tooltip: string; className: string }> = {
    PR: { tooltip: 'Updated from Press Releases', className: 'update-dot update-dot-pr' },
    SEC: { tooltip: 'Updated from SEC Filings', className: 'update-dot update-dot-sec' },
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
              background: source === 'PR' ? '#f97316' : '#3b82f6',
              display: 'inline-block',
            }}
          />
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
  <div className="card">
    <div
      onClick={onToggle}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`Toggle ${title}`}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
        {title}
        {sources && <UpdateIndicators sources={sources} />}
      </div>
      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{isOpen ? '−' : '+'}</span>
    </div>
    {isOpen && <div style={{ marginTop: 16 }}>{children}</div>}
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #investment-header
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="section-head" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
          Investment Analysis
          <UpdateIndicators sources={['PR', 'SEC']} />
        </h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={expandAll} className="pill" style={{ fontSize: 11 }}>
            ⊞ Expand All
          </button>
          <button onClick={collapseAll} className="pill" style={{ fontSize: 11 }}>
            ⊟ Collapse All
          </button>
        </div>
      </div>

      {/* Data Refresh Indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 16,
          fontSize: 11,
          color: 'var(--text3)',
          marginBottom: 16,
        }}
      >
        <span>
          Data as of: <strong style={{ color: 'var(--text2)' }}>{current.date}</strong>
        </span>
        <span>•</span>
        <span>
          Source: <strong style={{ color: 'var(--text2)' }}>{current.source}</strong>
        </span>
      </div>

      {/* Rating Header Card */}
      <div className="card" style={{ borderLeft: `4px solid var(--${current.verdictColor})`, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span
                style={{
                  background: `var(--${current.verdictColor})`,
                  color: 'var(--bg)',
                  padding: '8px 20px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {current.verdict}
              </span>
              <span
                style={{
                  background: 'rgba(0,212,170,0.15)',
                  color: 'var(--mint)',
                  padding: '6px 12px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {ticker}
              </span>
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 16, marginBottom: 8 }}>
              {current.tagline}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>
              Last Updated: {current.date} • Trigger: {current.source}
            </div>
          </div>
          {/* Company-specific header metrics */}
          {renderHeaderMetrics ? renderHeaderMetrics() : null}
        </div>
      </div>

      {/* Investment Scorecard */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #investment-scorecard
      </div>
      <CollapsibleSection
        id="scorecard"
        title="Investment Scorecard"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('scorecard')}
        onToggle={() => toggleSection('scorecard')}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {current.scorecard.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface2)',
                padding: 12,
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.category}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{item.detail}</div>
              </div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: item.color }}>
                {item.rating}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Ecosystem Health (BMNR-specific, rendered via prop) */}
      {renderEcosystemHealth && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
            #ecosystem-health
          </div>
          {renderEcosystemHealth()}
        </>
      )}

      {/* Executive Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #investment-summary
      </div>
      <CollapsibleSection
        id="summary"
        title="Executive Summary"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('summary')}
        onToggle={() => toggleSection('summary')}
      >
        <div
          style={{
            background: 'rgba(126,231,135,0.05)',
            padding: 12,
            borderRadius: 8,
            border: '1px solid rgba(126,231,135,0.2)',
            marginBottom: 16,
          }}
        >
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
          <p style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--text)' }}>Headline:</strong> {current.executiveSummary.headline}
          </p>
          <p style={{ marginBottom: 12, whiteSpace: 'pre-line' }}>
            <strong style={{ color: 'var(--text)' }}>Thesis:</strong> {current.executiveSummary.thesis}
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--cyan)', padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
            "{current.executiveSummary.bottomLine}"
          </p>
        </div>
      </CollapsibleSection>

      {/* Growth Drivers */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #growth-drivers
      </div>
      <CollapsibleSection
        id="growth"
        title="Growth Drivers"
        sources="PR"
        isOpen={investmentSections.has('growth')}
        onToggle={() => toggleSection('growth')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.growthDrivers.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface2)',
                padding: 16,
                borderRadius: 8,
                borderLeft: `3px solid ${d.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{d.driver}</span>
                <span
                  style={{
                    fontSize: 11,
                    padding: '4px 8px',
                    borderRadius: 4,
                    background: d.color.replace('var(--', 'rgba(').replace(')', ', 0.15)'),
                    color: d.color,
                    fontWeight: 600,
                  }}
                >
                  {d.impact}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{d.description}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Competitive Moat */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#moat</div>
      <CollapsibleSection
        id="moat"
        title="Competitive Moat"
        sources="PR"
        isOpen={investmentSections.has('moat')}
        onToggle={() => toggleSection('moat')}
      >
        <div className="g2" style={{ marginBottom: 16 }}>
          {/* Moat Sources */}
          <div>
            <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 13, marginBottom: 12 }}>
              Moat Sources
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {current.moatSources.map((m, i) => (
                <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{m.source}</span>
                    <span style={{ fontSize: 11, color: m.color }}>{m.strength}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Moat Threats */}
          <div>
            <div style={{ fontWeight: 600, color: 'var(--coral)', fontSize: 13, marginBottom: 12 }}>
              Competitive Threats
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {current.moatThreats.map((t, i) => (
                <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{t.threat}</span>
                    <span style={{ fontSize: 11, color: t.color }}>{t.risk}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Risk Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#risks</div>
      <CollapsibleSection
        id="risks"
        title="Risk Matrix"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('risks')}
        onToggle={() => toggleSection('risks')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.risks.map((r, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface2)',
                padding: 16,
                borderRadius: 8,
                borderLeft: `3px solid ${
                  r.severity === 'Critical'
                    ? 'var(--coral)'
                    : r.severity === 'High'
                    ? 'var(--gold)'
                    : 'var(--sky)'
                }`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{r.risk}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '3px 6px',
                      borderRadius: 4,
                      background: 'var(--surface)',
                      color: 'var(--text3)',
                    }}
                  >
                    {r.severity}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '3px 6px',
                      borderRadius: 4,
                      background: 'var(--surface)',
                      color: 'var(--text3)',
                    }}
                  >
                    P: {r.likelihood}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>{r.detail}</div>
              <div style={{ fontSize: 12, color: 'var(--mint)' }}>
                <strong>Mitigation:</strong> {r.mitigation}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Catalysts (BMNR-specific, rendered via prop) */}
      {renderCatalysts && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
            #catalysts
          </div>
          <CollapsibleSection
            id="catalysts"
            title="Catalysts"
            sources="PR"
            isOpen={investmentSections.has('catalysts')}
            onToggle={() => toggleSection('catalysts')}
          >
            {renderCatalysts()}
          </CollapsibleSection>
        </>
      )}

      {/* Three Perspectives */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #perspectives
      </div>
      <CollapsibleSection
        id="perspectives"
        title="Three Perspectives"
        sources={['PR', 'SEC']}
        isOpen={investmentSections.has('perspectives')}
        onToggle={() => toggleSection('perspectives')}
      >
        <div className="g3">
          {Object.entries(current.perspectives).map(([key, p]) => (
            <div
              key={key}
              style={{
                background: 'var(--surface2)',
                padding: 16,
                borderRadius: 8,
                borderTop: `3px solid ${p.color}`,
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14, marginBottom: 4 }}>
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: p.color,
                  fontWeight: 600,
                  marginBottom: 12,
                  padding: '4px 8px',
                  background: p.color.replace('var(--', 'rgba(').replace(')', ', 0.1)'),
                  borderRadius: 4,
                  display: 'inline-block',
                }}
              >
                {p.assessment}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>{p.summary}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>
                <strong>Ecosystem:</strong> {p.ecosystemView}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--mint)',
                  padding: 8,
                  background: 'rgba(0,212,170,0.1)',
                  borderRadius: 4,
                }}
              >
                <strong>Recommendation:</strong> {p.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Position Sizing */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
        #position-sizing
      </div>
      <CollapsibleSection
        id="position"
        title="Position Sizing"
        isOpen={investmentSections.has('position')}
        onToggle={() => toggleSection('position')}
      >
        <div className="g4">
          {Object.entries(current.positionSizing).map(([key, size]) => (
            <div
              key={key}
              style={{
                background: 'var(--surface2)',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'capitalize' }}>{key}</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>
                {size.range}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{size.description}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Accumulation Zones (BMNR-specific, rendered via prop) */}
      {renderAccumulation && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
            #accumulation
          </div>
          <CollapsibleSection
            id="accumulation"
            title="Accumulation Zones"
            isOpen={investmentSections.has('accumulation')}
            onToggle={() => toggleSection('accumulation')}
          >
            {renderAccumulation()}
          </CollapsibleSection>
        </>
      )}

      {/* Price Targets (ASTS-specific) */}
      {current.priceTargets && current.priceTargets.length > 0 && (
        <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>
            #price-targets
          </div>
          <CollapsibleSection
            id="price-targets"
            title="Price Targets"
            isOpen={investmentSections.has('price-targets')}
            onToggle={() => toggleSection('price-targets')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {current.priceTargets.map((pt, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface2)',
                    padding: 16,
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{pt.period}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{pt.detail}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, color: 'var(--mint)', fontWeight: 700 }}>
                      {pt.range}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--sky)' }}>{pt.outlook}</div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}

      {/* Archive */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#archive</div>
      <CollapsibleSection
        id="archive"
        title={`Historical Archive (${archive.length} entries)`}
        isOpen={investmentSections.has('archive')}
        onToggle={() => toggleSection('archive')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {archive.map((entry, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface2)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setExpandedArchive(expandedArchive === entry.date ? null : entry.date)}
                style={{
                  padding: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'Space Mono' }}>{entry.date}</span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 4,
                      background:
                        entry.verdict === 'STRONG BUY' || entry.verdict === 'BUY'
                          ? 'rgba(0,212,170,0.15)'
                          : entry.verdict === 'CONSTRUCTIVE'
                          ? 'rgba(100,149,237,0.15)'
                          : 'rgba(234,179,8,0.15)',
                      color:
                        entry.verdict === 'STRONG BUY' || entry.verdict === 'BUY'
                          ? 'var(--mint)'
                          : entry.verdict === 'CONSTRUCTIVE'
                          ? 'var(--sky)'
                          : 'var(--gold)',
                      fontWeight: 600,
                    }}
                  >
                    {entry.verdict}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text)' }}>{entry.headline || entry.source}</span>
                </div>
                <span style={{ color: 'var(--text3)', fontSize: 14 }}>
                  {expandedArchive === entry.date ? '−' : '+'}
                </span>
              </div>
              {expandedArchive === entry.date && (
                <div style={{ padding: '0 12px 12px', borderTop: '1px solid var(--surface)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 12 }}>{entry.summary}</div>
                  {entry.keyDevelopments && (
                    <ul style={{ margin: '8px 0', paddingLeft: 16, fontSize: 12, color: 'var(--text3)' }}>
                      {entry.keyDevelopments.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {entry.fullAnalysis && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>
                        {entry.fullAnalysis.context}
                      </div>
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
