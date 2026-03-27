'use client';

/**
 * SharedModelTab - Unified Valuation Model Tab Shell
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Model tabs.
 * Owns the thinnest possible layout chrome: hero header and CFA notes.
 * All stock-specific content (presets, parameter cards, valuation logic,
 * methodology sections) is passed as children.
 *
 * @version 1.0.0
 * @created 2026-03-11
 */

import React from 'react';
import type { SharedModelTabProps } from './modelTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

export const SharedModelTab: React.FC<SharedModelTabProps> = ({
  sectionLabel,
  description,
  sources = ['PR', 'SEC'],
  children,
  cfaItems,
}) => {
  return (
    <div className="sm-tab-stack">
      {/* ── Hero ── */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}<UpdateIndicators sources={sources} /></div>
        <h2>Valuation Model<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>

      {/* ── All stock-specific content ── */}
      {children}

      {/* ── CFA Notes ── */}
      {cfaItems && cfaItems.length > 0 && (
        <CFANotes title="CFA Level III — Valuation Model" items={cfaItems} />
      )}
    </div>
  );
};

export default SharedModelTab;
