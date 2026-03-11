/**
 * Shared Model Tab Types
 * Unified schema for ASTS, BMNR, CRCL valuation model tabs.
 *
 * The Model tab is the MOST divergent across stocks — each has completely
 * different parameters, presets, and valuation logic. So the shared component
 * is the THINNEST possible shell: hero header + CFA notes. Everything else
 * is passed as children.
 */

import type { ReactNode } from 'react';
import type { UpdateSource } from './stockModelTypes';

/** CFA note item */
export interface ModelCfaItem {
  term: string;
  def: string;
}

export interface SharedModelTabProps {
  // ── Hero ──
  sectionLabel: string;
  description: string;
  sources?: UpdateSource | UpdateSource[];

  // ── Children (ALL stock-specific content: presets, parameters, valuation summary, etc.) ──
  children: ReactNode;

  // ── CFA Notes (optional) ──
  cfaItems?: ModelCfaItem[];
}
