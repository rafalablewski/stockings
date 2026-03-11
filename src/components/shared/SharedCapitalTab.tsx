'use client';

/**
 * SharedCapitalTab - Thin Layout Shell for Capital Structure Tabs
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Capital tabs.
 * Owns only the hero header and CFA notes. All stock-specific content
 * (share classes, shareholders, dilution, etc.) is injected via children.
 *
 * @version 1.0.0
 * @created 2026-03-11
 */

import React from 'react';
import type { SharedCapitalTabShellProps } from './capitalTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

export const SharedCapitalTab: React.FC<SharedCapitalTabShellProps> = ({
  sectionLabel,
  description,
  sources = 'SEC',
  children,
  cfaItems,
}) => {
  return (
    <div className="sm-flex-col sm-flex-col-gap-16">
      {/* ── Hero ── */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}<UpdateIndicators sources={sources} /></div>
        <h2>Capital Structure<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>

      {/* ── All stock-specific content ── */}
      {children}

      {/* ── CFA Notes ── */}
      {cfaItems && cfaItems.length > 0 && (
        <CFANotes title="CFA Level III — Capital Structure" items={cfaItems} />
      )}
    </div>
  );
};

export default SharedCapitalTab;
