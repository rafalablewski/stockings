/**
 * Stock Dashboard Data Registry
 *
 * Consolidates per-stock props needed by SharedSourcesTab + SharedEdgarTab.
 * Falls back to empty defaults for stocks without data files.
 */

import type { SourceGroup, Competitor } from '@/components/shared/SharedSourcesTab';
import type { LocalFiling } from '@/components/shared/SharedEdgarTab';

import { ASTS_RESEARCH_SOURCES, ASTS_COMPETITORS, ASTS_COMPETITOR_LABEL } from '@/data/asts/sources';
import { ASTS_SEC_FILINGS, ASTS_SEC_TYPE_COLORS, ASTS_FILING_CROSS_REFS } from '@/data/asts/sec-filings';

import { BMNR_RESEARCH_SOURCES, BMNR_COMPETITORS, BMNR_COMPETITOR_LABEL } from '@/data/bmnr/sources';
import { BMNR_SEC_FILINGS, BMNR_SEC_TYPE_COLORS, BMNR_FILING_CROSS_REFS } from '@/data/bmnr/sec-filings';

import { CRCL_RESEARCH_SOURCES, CRCL_COMPETITORS, CRCL_COMPETITOR_LABEL } from '@/data/crcl/research-sources';

export interface StockDashboardData {
  researchSources: SourceGroup[];
  competitors: Competitor[];
  competitorLabel: string;
  localFilings: LocalFiling[];
  typeColors: Record<string, { bg: string; text: string }>;
  crossRefIndex: Record<string, { source: string; data: string }[]>;
}

const EMPTY_DEFAULTS: StockDashboardData = {
  researchSources: [],
  competitors: [],
  competitorLabel: 'Competitors',
  localFilings: [],
  typeColors: {},
  crossRefIndex: {},
};

const registry: Record<string, StockDashboardData> = {
  ASTS: {
    researchSources: ASTS_RESEARCH_SOURCES,
    competitors: ASTS_COMPETITORS,
    competitorLabel: ASTS_COMPETITOR_LABEL,
    localFilings: ASTS_SEC_FILINGS as LocalFiling[],
    typeColors: ASTS_SEC_TYPE_COLORS,
    crossRefIndex: ASTS_FILING_CROSS_REFS,
  },
  BMNR: {
    researchSources: BMNR_RESEARCH_SOURCES,
    competitors: BMNR_COMPETITORS,
    competitorLabel: BMNR_COMPETITOR_LABEL,
    localFilings: BMNR_SEC_FILINGS as LocalFiling[],
    typeColors: BMNR_SEC_TYPE_COLORS,
    crossRefIndex: BMNR_FILING_CROSS_REFS,
  },
  CRCL: {
    researchSources: CRCL_RESEARCH_SOURCES,
    competitors: CRCL_COMPETITORS,
    competitorLabel: CRCL_COMPETITOR_LABEL,
    localFilings: [],
    typeColors: {},
    crossRefIndex: {},
  },
};

/** Get dashboard data for a ticker, with empty defaults for unknown stocks. */
export function getStockDashboardData(ticker: string): StockDashboardData {
  return registry[ticker] || EMPTY_DEFAULTS;
}
