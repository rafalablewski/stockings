'use client';

/**
 * SharedFinancialsTab - Unified Financials Tab
 *
 * Stock-agnostic: receives sectionLabel, title, description, secFilingConfig,
 * milestones, cfaNotes. Renders hero, SEC Filing Tracker, children (quarterly
 * section), milestones card, CFA notes. Gold-standard styling (sm-card, sm-divider).
 *
 * @version 1.0.0
 * @created 2026-02-26
 */

import React from 'react';
import type { SharedFinancialsTabProps } from './financialsTabTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

export const SharedFinancialsTab: React.FC<SharedFinancialsTabProps> = ({
  ticker: _ticker,
  sectionLabel,
  title,
  description,
  secFilingConfig: _secFilingConfig,
  milestones,
  cfaNotes,
  cfaNotesTitle = 'CFA Level III — Financial Analysis',
  extraBeforeChildren,
  extraAfterChildren,
  children,
}) => {
  return (
    <div className="sm-flex-col sm-flex-col-gap-16">
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}<UpdateIndicators sources="SEC" /></div>
        <h2>{title}<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>

      {extraBeforeChildren}
      <div className="sm-divider">
        <span className="sm-param-label">Quarterly Metrics</span>
        <span className="sm-divider-line" />
      </div>
      {children}
      {extraAfterChildren}

      <div className="sm-divider">
        <span className="sm-param-label">Key Financial Milestones</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label sm-flex sm-gold">Key Financial Milestones<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-card-body" style={{ padding: 0 }}>
          <div className="sm-overflow-x sm-scroll-hint">
            <div style={{ minWidth: 400 }}>
              <div className="sm-fin-table-header" style={{ gridTemplateColumns: '130px 1fr' }}>
                <span className="sm-fin-th" data-sticky="">Date</span>
                <span className="sm-fin-th">Event</span>
              </div>
              {milestones.map((m, i) => (
                <div key={i} className="sm-fin-table-row" style={{ gridTemplateColumns: '130px 1fr' }}>
                  <span className="sm-fin-td-label">
                    <span className="sm-news-tag" style={{ '--tag-color': i === milestones.length - 1 ? 'var(--gold)' : 'var(--accent)' } as React.CSSProperties}>{m.date}</span>
                  </span>
                  <span className="sm-fin-td" style={{ textAlign: 'left', fontFamily: 'inherit' }}>{m.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm-note-panel sm-text-11" style={{ margin: '12px 16px 16px' }}>
          Milestones sourced from SEC filings, press releases, and company announcements. Most recent event highlighted.
        </div>
      </div>

      <CFANotes title={cfaNotesTitle} items={cfaNotes} />
    </div>
  );
};

export default SharedFinancialsTab;
