/**
 * Shared Components Index
 *
 * Unified components used across ASTS, BMNR, CRCL financial models.
 */

// Investment Tab
export * from './investmentTypes';
export { SharedInvestmentTab } from './SharedInvestmentTab';

// Financials Tab (stock-agnostic)
export * from './financialsTabTypes';
export { SharedFinancialsTab } from './SharedFinancialsTab';

// Timeline Tab (stock-agnostic)
export { SharedTimelineTab } from './SharedTimelineTab';

// Wall Street Tab
export * from './wallStreetTypes';
export { SharedWallStreetTab } from './SharedWallStreetTab';

// AI Agents Tab
export { SharedAIAgentsTab } from './SharedAIAgentsTab';

// Capital Structure Types
export * from './capitalTypes';

// Timeline/SEC Filings Types
export * from './timelineTypes';

// Live Price Hook and Component
export { useLiveStockPrice, LivePriceDisplay } from './LivePrice';

// Shared Model Utilities (types, constants, helpers)
export * from './modelUtils';

// Stock Model Types (UpdateSource, StatProps, CardProps, RowProps, etc.)
export * from './stockModelTypes';

// Update Indicators (data source freshness dots)
export { UpdateIndicatorContext, UpdateIndicators, UpdateLegend } from './UpdateIndicators';

// UI Primitives (Stat, Card, Row, Input, Panel, Guide, CFANotes)
export { Stat, Card, Row, Input, Panel, Guide, CFANotes } from './StockModelUI';

// Error Boundary
export { FinancialModelErrorBoundary } from './FinancialModelErrorBoundary';

// Legal Disclaimer Banner
export { LEGAL_DISCLAIMERS, DisclaimerBanner } from './DisclaimerBanner';

// Tab Navigation
export { default as StockNavigation, TabPanel } from './StockNavigation';
export type { Tab } from './StockNavigation';
