/**
 * CRCL (CIRCLE) - DATA EXPORTS
 * ================================================
 *
 * Central export file for all CRCL data.
 * Import from this file to get all stock data.
 *
 * USAGE:
 * import { MARKET, QUARTERLY_DATA, TIMELINE, ... } from '@/data/crcl';
 *
 * Or import specific modules:
 * import { TIMELINE } from '@/data/crcl/timeline';
 *
 * AI AGENT INSTRUCTIONS — BARREL EXPORT RULE:
 * When you add a NEW exported constant, array, function, or type to ANY
 * data file in this directory, you MUST also add it to this barrel file.
 * Exports not listed here are INVISIBLE to the UI. This is a mandatory
 * step — not optional. Run: bash scripts/check-barrel-exports.sh
 */

// Company & Market Data
export {
  CRCL_METADATA,
  COMPANY_INFO,
  MARKET,
  USDC_DATA,
  MODEL_METADATA,
  DATA_FRESHNESS,
} from './company';

// Financial Data
export {
  FINANCIALS_METADATA,
  QUARTERLY_DATA,
  SEC_FILINGS,
  SEC_META,
  getLatestQuarter,
  getYoYGrowth,
  getTTMTotal,
} from './financials';

export type { CRCLQuarterlyData } from './financials';

// Timeline & History
export {
  TIMELINE_METADATA,
  TIMELINE,
  getEventsByCategory,
  getCategories,
  getEventsByYear,
  getPositiveEvents,
} from './timeline';

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
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
} from './capital';

// Historical
export {
  HISTORICAL_METADATA,
  HISTORICAL_PRICES,
} from './historical';

// Press Releases
export {
  PRESS_RELEASES_METADATA,
  PRESS_RELEASES,
} from './press-releases';

// Quarterly Metrics
export {
  QUARTERLY_METRICS_METADATA,
  CRCL_QUARTERLY_DATA,
  CRCL_MARKET_CAP_DATA,
} from './quarterly-metrics';

// SEC Filings
export {
  SEC_METADATA,
  CRCL_SEC_META,
  CRCL_SEC_FILINGS,
  CRCL_SEC_TYPE_COLORS,
  CRCL_SEC_FILTER_TYPES,
  CRCL_FILING_CROSS_REFS,
} from './sec-filings';

// USDC (stock-specific)
export {
  USDC_METADATA,
  USDC_CIRCULATION,
  USDC_RESERVES,
  USDC_MARKET_SHARE,
} from './usdc';

// Analyst Coverage
export { CRCL_ANALYST_COVERAGE } from './analyst-coverage';

// Competitor Intelligence
export {
  CRCL_COMPETITOR_PROFILES,
  CRCL_COMPETITOR_NEWS,
} from './competitor-news';

export type { CRCLCompetitorProfile } from './competitor-news';

// Investment
export {
  CRCL_INVESTMENT_CURRENT,
  CRCL_INVESTMENT_ARCHIVE,
} from './investment';

// Re-export types for convenience
export type {
  DataMetadata,
  TimelineEntry,
  SECFiling,
  Catalyst,
  CompletedMilestone,
} from '../shared/types';
