/**
 * Shared Comps Tab Types
 * Unified schema for ASTS, BMNR, CRCL Comparable Analysis tabs.
 *
 * The shared component owns the layout shell (hero, CFA notes).
 * Stock-specific valuation tables, competitor profiles, and news feeds
 * stay in each stock file via render props.
 */

import type { ReactNode } from 'react';
import type { UpdateSource } from './stockModelTypes';

/** CFA note item */
export interface CompsCfaItem {
  term: string;
  def: string;
}

export interface SharedCompsTabProps {
  // -- Hero --
  sectionLabel: string;
  description: string;
  sources?: UpdateSource | UpdateSource[];

  // -- Render props for stock-specific sections --
  /** Stock-specific valuation comparables table (peer cards, charts, matrices) */
  renderValuationComps: () => ReactNode;
  /** Stock-specific competitor profile cards */
  renderCompetitorProfiles: () => ReactNode;
  /** Stock-specific news feed (each stock has different news format) */
  renderCompetitorNews: () => ReactNode;
  /** Optional extra content between profiles and CFA notes */
  renderExtra?: () => ReactNode;

  // -- CFA Notes --
  cfaItems?: CompsCfaItem[];
}
