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

// Re-export types for convenience
export type {
  DataMetadata,
  TimelineEntry,
  SECFiling,
  Catalyst,
  CompletedMilestone,
} from '../shared/types';
