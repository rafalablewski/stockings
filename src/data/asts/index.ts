/**
 * ASTS SPACEMOBILE - DATA EXPORTS
 * ================================================
 *
 * Central export file for all ASTS data.
 * Import from this file to get all stock data.
 *
 * USAGE:
 * import { DEFAULTS, PARTNERS, SHARE_CLASSES, ... } from '@/data/asts';
 *
 * Or import specific modules:
 * import { PARTNERS } from '@/data/asts/partners';
 *
 * AI AGENT INSTRUCTIONS — BARREL EXPORT RULE:
 * When you add a NEW exported constant, array, function, or type to ANY
 * data file in this directory, you MUST also add it to this barrel file.
 * Exports not listed here are INVISIBLE to the UI. This is a mandatory
 * step — not optional. Run: bash scripts/check-barrel-exports.sh
 */

// Company & Defaults
export {
  ASTS_METADATA,
  COMPANY_INFO,
  DEFAULTS,
  OPERATIONAL_METRICS,
  MODEL_ASSUMPTIONS,
  DATA_FRESHNESS,
} from './company';

// Partners & Revenue
export {
  PARTNERS_METADATA,
  PARTNERS,
  PARTNER_NEWS,
  REVENUE_SOURCES,
  getTotalPrepayments,
  getTotalSubscriberReach,
  getDefinitivePartners,
} from './partners';

// Competitor Intelligence
export { COMPS_TIMELINE } from './competitor-news';

// Press Releases
export {
  PRESS_RELEASES_METADATA,
  PRESS_RELEASES,
} from './press-releases';

// Catalysts & Milestones
export {
  CATALYSTS_METADATA,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  getCatalystsByImpact,
  getCatalystsByCategory,
  getCatalystCategories,
} from './catalysts';

// Capital Structure
export {
  CAPITAL_METADATA,
  SHARE_CLASSES,
  TOTAL_BASIC_SHARES,
  TOTAL_VOTING_SHARES,
  FULLY_DILUTED_SHARES,
  FEB_2026_RD_NET_DILUTION,
  FEB_2026_GREENSHOE,
  FEB_2026_RSU_VESTINGS,
  INSIDER_TRANSACTIONS,
  MAR_2026_INSIDER_ACTIVITY,
  DEC_2025_RSU_GRANTS,
  DEC_2025_INSIDER_SALES,
  DEC_2025_INSIDER_PURCHASES,
  AUG_2025_CEO_RSU_GRANT,
  AUG_SEP_2025_RSU_VESTINGS,
  AUG_SEP_2025_INSIDER_SALES,
  JAN_FEB_2025_GOVERNANCE,
  MAR_2025_INSIDER_SALES,
  MAR_2025_LIGADO_DEAL,
  MAR_2025_SHELF_REGISTRATION,
  APR_MAY_2025_INSIDER_PURCHASES,
  APR_2025_PROXY,
  JUN_2025_CERTIFICATE_AMENDMENT,
  MAY_JUN_2025_RSU_ACTIVITY,
  JUN_2025_INSIDER_PURCHASES,
  JUL_2025_CREDIT_FACILITY,
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
  DILUTION_HISTORY,
  SBC_HISTORY,
  CONVERTIBLE_NOTES,
  CASH_RUNWAY_SCENARIOS,
  LIQUIDITY_POSITION,
  DILUTION_SCENARIOS,
  getTotalRaised,
  getOfferingsByType,
  getTotalConvertDilution,
  getOutstandingNotes,
} from './capital';

// Financials
export {
  FINANCIALS_METADATA,
  QUARTERLY_DATA,
  getQuartersChronological,
  getLatestCompleteQuarter,
  getQoQChange,
} from './financials';

// Historical
export {
  HISTORICAL_METADATA,
  HISTORICAL_PRICES,
} from './historical';

// Analyst Coverage
export { ASTS_ANALYST_COVERAGE } from './analyst-coverage';

// SEC Filings
export {
  ASTS_SEC_FILINGS,
  ASTS_SEC_META,
  ASTS_SEC_TYPE_COLORS,
  ASTS_SEC_FILTER_TYPES,
  ASTS_FILING_CROSS_REFS,
} from './sec-filings';

// Quarterly Metrics
export { ASTS_QUARTERLY_DATA } from './quarterly-metrics';

// Investment
export {
  ASTS_INVESTMENT_CURRENT,
  ASTS_INVESTMENT_ARCHIVE,
} from './investment';

// Timeline
export { ASTS_TIMELINE_EVENTS } from './timeline';

// Re-export types for convenience
export type { CompetitorNewsEntry } from '../shared/competitor-schema';
export type {
  Partner,
  PartnerNewsEntry,
  PressRelease,
  ShareClass,
  MajorShareholder,
  EquityOffering,
  Catalyst,
  CompletedMilestone,
  QuarterlyFinancials,
  RevenueSource,
  DataMetadata,
  StockDefaults,
  ConvertibleNoteDetail,
  CashRunwayScenario,
  DilutionScenario,
  InsiderTransaction,
} from '../shared/types';
