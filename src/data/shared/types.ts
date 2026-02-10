/**
 * SHARED TYPE DEFINITIONS
 * ================================================
 *
 * Common TypeScript interfaces used across all stock data files.
 * These types ensure consistency when AI agents update data.
 *
 * USAGE:
 * - Import types in data files: import { Partner, ShareClass, ... } from '../shared/types'
 * - All array data should use these interfaces for type safety
 */

// ============================================================================
// METADATA TYPES
// ============================================================================

/**
 * Data freshness metadata - include in every data file
 * AI AGENT: Update lastUpdated and nextExpectedUpdate when modifying data
 */
export interface DataMetadata {
  /** ISO date string of last update (YYYY-MM-DD) */
  lastUpdated: string;
  /** Primary source document (e.g., "Q3 2025 10-Q", "Nov 2025 13D/A") */
  source: string;
  /** When to expect next update (e.g., "Q4 2025 10-K (~March 2026)") */
  nextExpectedUpdate: string;
  /** Optional notes about the data */
  notes?: string;
}

/**
 * Market data that needs frequent updates
 * AI AGENT: Update price data daily or after significant moves
 */
export interface MarketData {
  /** Current stock price - UPDATE REGULARLY */
  price: number;
  /** Date of price (YYYY-MM-DD) */
  priceAsOf: string;
  /** Shares outstanding in millions */
  sharesOutstanding: number;
  /** Market cap in millions (calculated: price × shares) */
  marketCap: number;
  /** 52-week high */
  high52?: number;
  /** 52-week low */
  low52?: number;
}

// ============================================================================
// CAPITAL STRUCTURE TYPES
// ============================================================================

/**
 * Share class definition
 * AI AGENT: Update from 10-Q/10-K balance sheet or proxy filings
 */
export interface ShareClass {
  /** Class type (e.g., "Class A", "Class B", "Class C", "Common") */
  classType: string;
  /** Number of shares in millions */
  shares: number;
  /** Description of the share class */
  description: string;
  /** Voting rights (e.g., "1 vote per share", "10 votes per share") */
  votingRights: string;
  /** Conversion terms if applicable */
  conversion?: string;
}

/**
 * Major shareholder entry
 * AI AGENT: Update from 13D/A, 13G, 13F filings, or proxy statements
 */
export interface MajorShareholder {
  /** Shareholder name */
  name: string;
  /** Role (e.g., "Founder & CEO", "Strategic Partner", "Institutional") */
  role: string;
  /** Number of shares in millions */
  shares: number;
  /** Share class held (e.g., "Class A", "Class C") */
  shareClass: string;
  /** Ownership percentage as string (e.g., "21.2%") */
  pct: string;
  /** Voting power percentage as string (for super-voting shares) */
  votingPct: string;
  /** Additional notes about the holder */
  notes?: string;
}

/**
 * Equity offering/capital raise event
 * AI AGENT: Add new entries when company announces capital raises
 */
export interface EquityOffering {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Event description (e.g., "Jan 2025 Convertible") */
  event: string;
  /** Type of offering (e.g., "IPO", "Follow-on", "Convertible", "ATM", "PIPE") */
  type: string;
  /** Amount raised in millions USD */
  amount: number;
  /** Price per share (null for ATM programs) */
  price: number | null;
  /** Number of shares issued in millions */
  shares: number | null;
  /** Additional notes */
  notes?: string;
}

// ============================================================================
// PARTNER & RELATIONSHIP TYPES
// ============================================================================

/**
 * Partner/MNO relationship (used by ASTS)
 * AI AGENT: Update from press releases and 10-Q partnership disclosures
 */
export interface Partner {
  /** Partner name */
  name: string;
  /** Geographic region */
  region: string;
  /** Subscriber reach in millions */
  subs: number;
  /** Agreement status (e.g., "Definitive", "MOU", "LOI") */
  status: string;
  /** Prepayment amount in millions USD */
  prepay: number;
  /** Spectrum band if applicable */
  spectrum?: string;
  /** Additional notes */
  notes?: string;
}

/**
 * Partner news entry for tracking MNO partner activities
 * AI AGENT: Add from partner press releases that impact ASTS ecosystem
 */
export interface PartnerNewsEntry {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Partner company name (must match PARTNERS array) */
  partner: string;
  /** News category (e.g., "IoT", "Expansion", "Technology", "Partnership", "Financial") */
  category: string;
  /** Headline/title of the news */
  headline: string;
  /** Detailed summary of the news */
  summary: string;
  /** Relevance to ASTS (how this news impacts ASTS thesis) */
  astsRelevance: string;
  /** Impact assessment: "Bullish", "Bearish", "Neutral" */
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  /** Source of the news (publication name) */
  source: string;
  /** URL to the original source article (optional) */
  url?: string;
}

/**
 * Competitor news entry for tracking ASTS competitor activities
 * AI AGENT: Add from competitor press releases, product announcements, and industry news
 */
export interface CompetitorNewsEntry {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Competitor company name */
  competitor: string;
  /** News category (e.g., "Launch", "Technology", "Partnership", "Financial", "Regulatory", "Product") */
  category: string;
  /** Headline/title of the news */
  headline: string;
  /** Detailed summary of the news */
  summary: string;
  /** Competitive implications for ASTS */
  astsImplication: string;
  /** Impact assessment for ASTS: "Bullish" (good for ASTS), "Bearish" (bad for ASTS), "Neutral" */
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  /** Source publication name */
  source: string;
  /** URL to the original source article (optional) */
  url?: string;
}

/**
 * Ethereum adoption timeline entry for BMNR
 * AI AGENT: Add from press releases, protocol announcements, and enterprise news
 */
export interface EthereumAdoptionEntry {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Category: "Institutional", "Enterprise", "Protocol", "Government", "DeFi" */
  category: string;
  /** Company or organization name */
  company: string;
  /** Event title/headline */
  title: string;
  /** Detailed summary of the announcement */
  summary: string;
  /** Broader significance for Ethereum ecosystem */
  significance: string;
  /** Implications for BMNR investment thesis */
  bmnrImplication: string;
  /** Impact assessment: "Bullish", "Bearish", "Neutral" */
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  /** Source publication name */
  source: string;
  /** URL to the original source article (optional) */
  url?: string;
}

/**
 * Comparable company for peer analysis
 * AI AGENT: Update prices periodically, holdings from earnings reports
 */
export interface Comparable {
  /** Company name or ticker */
  name: string;
  /** Primary crypto asset (e.g., "BTC", "ETH") */
  crypto: string;
  /** Holdings amount or description */
  holdings: number | string;
  /** Shares outstanding */
  shares: number;
  /** Current stock price */
  price: number;
  /** Yield percentage if applicable */
  yield: number;
}

// ============================================================================
// PRESS RELEASE TYPES
// ============================================================================

/**
 * Company press release entry for tracking in Sources tab
 * AI AGENT: Add from company IR page / PR Newswire / Business Wire
 * - Set tracked: true when the content has been integrated into relevant tabs
 *   (partner news, competitor news, timeline, catalysts, financials, etc.)
 * - Set tracked: false for new releases not yet reflected in the database
 */
export interface PressRelease {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Press release headline */
  headline: string;
  /** URL to the original press release */
  url: string;
  /** Whether this PR's content has been added to the database (partner news, competitor news, timeline, etc.) */
  tracked: boolean;
  /** Company identifier — omit for the main stock, set for competitors (e.g., 'oq-technology', 'iridium') */
  company?: string;
}

// ============================================================================
// CATALYST & TIMELINE TYPES
// ============================================================================

/**
 * Upcoming catalyst event
 * AI AGENT: Update timeline as events approach or complete
 */
export interface Catalyst {
  /** Event description */
  event: string;
  /** Expected timeline (e.g., "Q1 2026", "2026", "Late 2026") */
  timeline: string;
  /** Impact level: "Critical", "High", "Medium", "Low" */
  impact: 'Critical' | 'High' | 'Medium' | 'Low' | 'Unknown';
  /** Category for filtering (optional) */
  category?: string;
}

/**
 * Completed milestone
 * AI AGENT: Move items from catalysts to milestones when completed
 */
export interface CompletedMilestone {
  /** Event description */
  event: string;
  /** Completion date (can be specific or approximate) */
  date: string;
  /** Category (optional) */
  category?: string;
}

/**
 * Timeline event with full details
 * AI AGENT: Add from press releases, SEC filings, and earnings calls
 */
export interface TimelineEntry {
  /** Date string (YYYY-MM-DD or YYYY-MM or YYYY) */
  date: string;
  /** Category for filtering */
  category: string;
  /** Event headline */
  event: string;
  /** Impact description */
  impact: string;
  /** Source document (publication name) */
  source: string;
  /** Verdict/sentiment */
  verdict: 'positive' | 'negative' | 'neutral' | 'mixed';
  /** Detailed description */
  details: string;
  /** URL to the original source article (optional) */
  url?: string;
}

// ============================================================================
// FINANCIAL DATA TYPES
// ============================================================================

/**
 * Quarterly financial data
 * AI AGENT: Update from 10-Q/10-K filings
 */
export interface QuarterlyFinancials {
  /** Quarter label (e.g., "Q3 2025", "Q4'24") */
  quarter: string;
  /** Filing source (e.g., "10-Q (Nov 10, 2025)") */
  filing?: string;
  /** Cash and equivalents in millions */
  cashAndEquiv: number | null;
  /** Total debt in millions */
  totalDebt: number | null;
  /** Revenue in millions */
  revenue: number | null;
  /** Operating expenses in millions */
  opEx: number | null;
  /** Net income/loss in millions */
  netIncome: number | null;
  /** Shares outstanding in millions */
  sharesOutstanding: number | null;
  /** Stock price at quarter end */
  stockPrice?: number;
  /** Employee count */
  employees?: number | null;
  /** Additional quarterly notes */
  note?: string;
  /** Allow additional dynamic fields */
  [key: string]: string | number | null | undefined;
}

/**
 * SEC filing entry
 * AI AGENT: Add new entries when filings are made
 */
export interface SECFiling {
  /** Filing date */
  date: string;
  /** Filing type (e.g., "10-Q", "10-K", "8-K", "S-1") */
  type: string;
  /** Filing description */
  description: string;
  /** Period covered (e.g., "Q3 2025", "FY 2024") */
  period: string;
  /** Color coding for display (optional) */
  color?: string;
}

/**
 * Revenue source/stream
 * AI AGENT: Update status and descriptions from earnings calls
 */
export interface RevenueSource {
  /** Source name */
  source: string;
  /** Description of the revenue stream */
  description: string;
  /** Status (e.g., "Active", "Post-2026", "Future") */
  status: string;
}

// ============================================================================
// PROJECTION & SCENARIO TYPES
// ============================================================================

/**
 * Dilution tranche for scenario modeling
 * Used in projection tabs for future capital raises
 */
export interface DilutionTranche {
  /** Unique identifier */
  id: number;
  /** Years from now */
  year: number;
  /** Shares issued in millions */
  sharesM: number;
  /** Assumed ETH/stock price at issuance */
  ethPrice?: number;
  /** Whether this tranche is enabled in the model */
  enabled: boolean;
}

/**
 * Historical price data by year
 * Used for backtesting and historical analysis
 */
export interface HistoricalPrices {
  [year: number]: number[];
}

// ============================================================================
// STOCK-SPECIFIC CONFIG TYPES
// ============================================================================

/**
 * Initial state values for a stock model
 * AI AGENT: Update these from latest filings/prices
 */
export interface StockDefaults {
  /** Current stock price */
  currentStockPrice: number;
  /** Price as of date */
  priceAsOf: string;
  /** Shares outstanding in millions */
  currentShares: number;
  /** Cash on hand in millions */
  cashOnHand: number;
  /** Quarterly burn rate in millions */
  quarterlyBurn?: number;
  /** Total debt in millions */
  totalDebt: number;
  /** Debt interest rate (%) */
  debtRate?: number;
}

// ============================================================================
// TAB CATEGORY TYPE (for Phase 2)
// ============================================================================

/**
 * Tab categorization for UI
 * projection = user can input assumptions
 * tracking = displays actual company data
 */
export type TabCategory = 'projection' | 'tracking';

export interface TabDefinition {
  id: string;
  label: string;
  category: TabCategory;
  description?: string;
}
