'use client';

/**
 * SharedCompsTab - Unified Comparable Analysis Tab Shell
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Comps tabs.
 * Owns all layout chrome: hero header, CFA notes.
 *
 * Stock-specific content (valuation tables, competitor profiles, news feeds)
 * stays in each stock file and is injected via render props.
 *
 * @version 1.0.0
 * @created 2026-03-11
 */

import React from 'react';
import type { SharedCompsTabProps } from './compsTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

export const SharedCompsTab: React.FC<SharedCompsTabProps> = ({
  sectionLabel,
  description,
  sources,
  renderValuationComps,
  renderCompetitorProfiles,
  renderCompetitorNews,
  renderExtra,
  cfaItems,
}) => {
  return (
    <div className="sm-tab-stack">
      {/* -- Hero -- */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}<UpdateIndicators sources={sources} /></div>
        <h2>Comparable Analysis<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>

      {/* -- Stock-specific valuation comps -- */}
      {renderValuationComps()}

      {/* -- Stock-specific competitor profiles -- */}
      {renderCompetitorProfiles()}

      {/* -- Stock-specific competitor news -- */}
      {renderCompetitorNews()}

      {/* -- Optional extra -- */}
      {renderExtra?.()}

      {/* -- CFA Notes -- */}
      {cfaItems && cfaItems.length > 0 && (
        <CFANotes title="CFA Level III — Comparable Analysis" items={cfaItems} />
      )}
    </div>
  );
};

export default SharedCompsTab;
