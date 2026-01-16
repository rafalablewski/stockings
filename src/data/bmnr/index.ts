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
} from './company';

// Capital Structure
export {
  CAPITAL_METADATA,
  SHARE_CLASSES,
  WARRANTS,
  EQUITY_OFFERINGS,
  MAJOR_SHAREHOLDERS,
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

// Re-export types for convenience
export type {
  DataMetadata,
  StockDefaults,
  HistoricalPrices,
  Comparable,
  DilutionTranche,
} from '../shared/types';
