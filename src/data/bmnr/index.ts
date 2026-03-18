/**
 * BMNR (BITMINE) - DATA EXPORTS
 * ================================================
 *
 * Central export file for all BMNR data.
 * Import from this file to get all stock data.
 *
 * USAGE:
 * import { DEFAULTS, ETH_HOLDINGS, SHARE_CLASSES, ... } from '@/data/bmnr';
 *
 * Or import specific modules:
 * import { HISTORICAL_ETH } from '@/data/bmnr/historical';
 *
 * AI AGENT INSTRUCTIONS — BARREL EXPORT RULE:
 * When you add a NEW exported constant, array, function, or type to ANY
 * data file in this directory, you MUST also add it to this barrel file.
 * Exports not listed here are INVISIBLE to the UI. This is a mandatory
 * step — not optional. Run: bash scripts/check-barrel-exports.sh
 */

// Company & Defaults
export {
  BMNR_METADATA,
  COMPANY_INFO,
  DEFAULTS,
  ETH_HOLDINGS,
  STAKING_PARAMS,
  DIVIDEND_DATA,
  DATA_FRESHNESS,
  OTHER_HOLDINGS,
} from './company';

// Capital Structure
export {
  CAPITAL_METADATA,
  SHARE_CLASSES,
  WARRANTS,
  EQUITY_OFFERINGS,
  MAJOR_SHAREHOLDERS,
  INSIDER_SALES,
  INSIDER_SALES_SUMMARY,
  INSIDER_GRANTS,
  EARLY_SHAREHOLDERS_2021,
  EARLY_OFFERINGS,
  SHARE_COUNT_HISTORY,
  LIQUIDITY_POSITION,
  CASH_RUNWAY_SCENARIOS,
  ETH_LIQUIDITY_FACTORS,
  STAKING_RATIO,
  STAKING_APY,
  getFDShares,
  getTotalFD,
  getDilutionPercent,
} from './capital';

// Historical Data & Comparables
export {
  HISTORICAL_METADATA,
  HISTORICAL_ETH,
  COMPARABLES,
  DEFAULT_TRANCHES,
  getHistoricalETHPrice,
  getAnnualReturn,
  getAvailableYears,
} from './historical';

// Catalysts & Milestones
export {
  CATALYSTS_METADATA,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  getCatalystsByImpact,
  getCatalystsByCategory,
  getCatalystCategories,
} from './catalysts';

// Financials
export {
  FINANCIALS_METADATA,
  QUARTERLY_DATA,
  getQuartersChronological,
  getLatestCompleteQuarter,
} from './financials';

// Press Releases
export {
  PRESS_RELEASES_METADATA,
  PRESS_RELEASES,
} from './press-releases';

// Analyst Coverage
export { BMNR_ANALYST_COVERAGE } from './analyst-coverage';

// Competitor Intelligence
export { BMNR_COMPETITOR_NEWS } from './competitor-news';

// SEC Filings
export {
  BMNR_SEC_FILINGS,
  BMNR_SEC_META,
  BMNR_SEC_TYPE_COLORS,
  BMNR_SEC_FILTER_TYPES,
  BMNR_FILING_CROSS_REFS,
} from './sec-filings';

// Quarterly Metrics
export {
  BMNR_QUARTERLY_DATA,
  BMNR_MARKET_CAP_DATA,
} from './quarterly-metrics';

// Investment
export {
  BMNR_INVESTMENT_CURRENT,
  BMNR_INVESTMENT_ARCHIVE,
} from './investment';

// Timeline
export { BMNR_TIMELINE_EVENTS } from './timeline';

// Purchase History
export {
  BMNR_PURCHASE_HISTORY,
  PURCHASE_HISTORY_METADATA,
} from './purchase-history';

// Ethereum Adoption
export { BMNR_ADOPTION_TIMELINE } from './ethereum-adoption';

// Re-export types for convenience
export type {
  DataMetadata,
  StockDefaults,
  HistoricalPrices,
  Comparable,
  DilutionTranche,
  Catalyst,
  CompletedMilestone,
  CashRunwayScenario,
} from '../shared/types';

export type { PurchaseRecord } from './purchase-history';
