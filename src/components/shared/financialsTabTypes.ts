/**
 * Shared Financials Tab Types
 * Stock-agnostic config for SharedFinancialsTab (ASTS, BMNR, CRCL).
 *
 * Extensibility: Use extraBeforeChildren for stock-specific intro blocks (e.g. BMNR overview,
 * CRCL revenue story). Use extraAfterChildren for content between quarterly panel and milestones.
 * For new fields (e.g. segment breakdown, guidance table), add optional props here and render
 * them in SharedFinancialsTab or pass as ReactNode slots.
 */

import type { ReactNode } from 'react';

export interface SECFilingTypeInfo {
  date: string;
  description: string;
  color: string;
}

export interface FinancialsSECConfig {
  cik: string;
  ticker: string;
  exchange: string;
  firstFiling: { date: string; description: string };
  latestEvent: { date: string; description: string };
  lastPR: { date: string; title: string };
  filings: Record<string, SECFilingTypeInfo>;
}

export interface FinancialsMilestone {
  date: string;
  event: string;
}

export interface CFANoteItem {
  term: string;
  def: string;
}

export interface SharedFinancialsTabProps {
  ticker: string;
  sectionLabel: string;
  title: string;
  description: string;
  /** Optional: SEC filing metadata (for future SEC tracker block) */
  secFilingConfig?: FinancialsSECConfig;
  milestones: FinancialsMilestone[];
  cfaNotes: CFANoteItem[];
  cfaNotesTitle?: string;
  /** Optional content before the Quarterly Metrics section (e.g. BMNR overview, CRCL revenue story) */
  extraBeforeChildren?: ReactNode;
  /** Optional content after children (quarterly panel), before Key Milestones (e.g. stock-specific tables) */
  extraAfterChildren?: ReactNode;
  children: ReactNode;
}
