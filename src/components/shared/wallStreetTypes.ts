/**
 * Shared Wall Street Tab Types
 * Unified schema for ASTS, BMNR, CRCL Wall Street Coverage data
 */

export interface AnalystReportAssumption {
  label: string;
  value: string;
}

export interface AnalystReportEstimate {
  metric: string;
  fy24?: string;
  fy25?: string;
  fy26?: string;
  fy27?: string;
  fy28?: string;
  fy29?: string;
  fy30?: string;
}

export interface AnalystReport {
  date: string;
  action: 'Initiation' | 'PT Raise' | 'PT Cut' | 'Upgrade' | 'Downgrade' | 'Double Downgrade' | 'Reiterate' | 'Maintained' | 'Update' | 'Drop';
  priceTarget: number | null;
  previousTarget?: number | null;
  rating: string;
  ratingNormalized: 'bullish' | 'neutral' | 'bearish';
  reportTitle?: string;
  source?: string;
  sourceUrl?: string;
  isFullReport: boolean;
  thesis?: string;
  reportSummary?: string;
  assumptions?: AnalystReportAssumption[];
  catalysts?: string[];
  risks?: string[];
  estimates?: AnalystReportEstimate[];
  methodology?: string;
  fullNotes?: string;
}

export interface AnalystCoverage {
  firm: string;
  analyst: string;
  coverageSince: string;
  currentPT: number | null;
  currentRating: string;
  currentRatingNormalized: 'bullish' | 'neutral' | 'bearish';
  reports: AnalystReport[];
  notes?: string;
}

export interface SharedWallStreetTabProps {
  coverage: AnalystCoverage[];
  ticker: string;
}
