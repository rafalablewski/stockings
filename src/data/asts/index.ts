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
export {
  COMPETITORS_METADATA,
  COMPETITOR_NEWS,
} from './competitors';

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

// Re-export types for convenience
export type {
  Partner,
  PartnerNewsEntry,
  CompetitorNewsEntry,
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
} from '../shared/types';
