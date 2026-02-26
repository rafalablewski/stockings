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
        <div className="sm-card-body">
          <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
            {milestones.map((m, i) => (
              <div key={i} className="sm-card-body sm-bg-surface2 sm-rounded-12">
                <div className="sm-text-11">{m.date}</div>
                <div className="sm-text-13">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CFANotes title={cfaNotesTitle} items={cfaNotes} />
    </div>
  );
};

export default SharedFinancialsTab;
