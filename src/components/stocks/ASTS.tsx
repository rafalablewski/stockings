/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║                        🚨 MUST DO - READ FIRST 🚨                             ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  BEFORE MAKING ANY CHANGES OR UPDATES TO THIS FILE:                           ║
 * ║                                                                               ║
 * ║  1. PROVIDE A BRIEF REPORT of what you plan to change                         ║
 * ║  2. LIST the specific sections/lines affected                                 ║
 * ║  3. EXPLAIN the reason for each change                                        ║
 * ║  4. ASK FOR CONFIRMATION: "Shall we proceed with these changes?"              ║
 * ║                                                                               ║
 * ║  DO NOT modify any code until explicit approval is received.                  ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  This ensures all modifications are intentional and properly reviewed.        ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║  ASTS (AST SpaceMobile) Financial Analysis Model                              ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 2.1.0                                                               ║
 * ║  Last Updated: January 12, 2026                                               ║
 * ║  Maintainer: Rafal (via Claude AI)                                            ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.1.0:                                                            ║
 * ║  - Consolidated InvestmentTab data into unified 'current' object              ║
 * ║  - Renamed expandedArchiveItem → expandedArchive for consistency              ║
 * ║  - Updated all JSX references to use current.xxx pattern                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║              UNIFIED MODEL MAINTENANCE PROTOCOL (ASTS/BMNR/CRCL)              ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  You are maintaining three identical-structure, continuously updated          ║
 * ║  financial analysis models for: ASTS, BMNR, CRCL                              ║
 * ║                                                                               ║
 * ║  The structure, sections, update process, archiving rules, and level of       ║
 * ║  detail MUST remain unified across all three models at all times.             ║
 * ║  Any improvement or addition applied to one model must eventually be          ║
 * ║  reflected in the others to maintain consistency.                             ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  CORE UPDATE PROCESS                                                          ║
 * ║  (Trigger after any new PR, SEC filing, earnings, analyst report, etc.)       ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  1. Review the new information thoroughly.                                    ║
 * ║                                                                               ║
 * ║  2. Update the following core sections as needed:                             ║
 * ║     - Financials (quarterly/annual metrics, balance sheet, cash flow)         ║
 * ║     - Timeline / Milestones (add new dated entries ONLY — never edit/delete)  ║
 * ║     - Investment Thesis / Key Drivers & Catalysts                             ║
 * ║     - Risks & Mitigants                                                       ║
 * ║     - Wall Street / Analyst Coverage (add reports, update PTs/ratings)        ║
 * ║     - Three Perspectives: CFA (fundamental), HF (catalyst), CIO (portfolio)   ║
 * ║     - Strategic Assessment / Predictions (base, bull, bear scenarios)         ║
 * ║     - Stock-specific metrics and focus areas                                  ║
 * ║                                                                               ║
 * ║  3. Archive the previous version:                                             ║
 * ║     - Add a new dated entry to the Analysis Archive / Historical Record       ║
 * ║     - Include the full prior state (scorecard, summary, drivers, risks, etc.) ║
 * ║     - Keep historical record generous and complete for audit trail            ║
 * ║     - NEVER delete, overwrite, or summarize away existing archive entries     ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  CRITICAL RULES (Apply Identically to ALL Three Models)                       ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  • Historical integrity is paramount: Never modify past timeline entries,     ║
 * ║    quarterly data, or prior archive versions.                                 ║
 * ║                                                                               ║
 * ║  • When updating, explicitly state what changed and cite the source           ║
 * ║    (e.g., "Updated convertible debt to $1.625B principal per Oct 2025 424B5") ║
 * ║                                                                               ║
 * ║  • Remain objective, data-driven, and balanced.                               ║
 * ║                                                                               ║
 * ║  • Ensure the structure, depth, and presentation remain unified across        ║
 * ║    ASTS, BMNR, and CRCL.                                                      ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  STOCK-SPECIFIC FOCUS AREAS (Always Check — Not Exhaustive)                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  ASTS: Satellite launches & constellation progress, on-orbit performance,     ║
 * ║        partnership milestones, spectrum/regulatory status, gateway revenue,   ║
 * ║        CapEx, launch cadence, runway.                                         ║
 * ║                                                                               ║
 * ║  BMNR: ETH treasury size & staking yield, total NAV (crypto + cash + ops),    ║
 * ║        share count/dilution, MAVAN validator rollout, mining/hosting revenue, ║
 * ║        immersion tech advantages.                                             ║
 * ║                                                                               ║
 * ║  CRCL: USDC/EURC circulation & market share, reserve income yield, platform   ║
 * ║        holdings %, reserve transparency, regulatory progress, partnerships.   ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  WALL STREET SECTION GUIDELINES (Identical Across Models)                     ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  • Store individual analyst reports with full detail (date, firm, analyst,    ║
 * ║    action, PT, rating, thesis, summary, assumptions, catalysts, risks,        ║
 * ║    estimates, methodology).                                                   ║
 * ║                                                                               ║
 * ║  • Normalize ratings: bullish (Strong Buy/Buy/Overweight),                    ║
 * ║    neutral (Hold/Perform), bearish (Underperform/Sell).                       ║
 * ║                                                                               ║
 * ║  • Track consensus PT, rating distribution, and recent revisions.             ║
 * ║                                                                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import './stock-model-styles.css';
import { SharedWallStreetTab, AnalystCoverage, useLiveStockPrice, UpdateIndicatorContext, UpdateIndicators, UpdateLegend, Stat, Card, Row, Input, Panel, Guide, CFANotes, FinancialModelErrorBoundary, DisclaimerBanner, SharedFinancialsTab, SharedTimelineTab } from '../shared';
import type { UpdateSource } from '../shared';
import SharedSourcesTab from '../shared/SharedSourcesTab';
import { SharedAIAgentsTab } from '../shared/SharedAIAgentsTab';
import type { SourceGroup, Competitor } from '../shared/SharedSourcesTab';
import SharedEdgarTab from '../shared/SharedEdgarTab';
import { SharedInvestmentTab } from '../shared/SharedInvestmentTab';
import type { InvestmentCurrent } from '../shared/investmentTypes';
import { SharedSecFilingsSection } from '../shared/SharedSecFilingsSection';
import StockNavigation, { TabPanel } from '../shared/StockNavigation';
import { useHashTab } from '@/hooks/useHashTab';
import { COMPS_TIMELINE } from '@/data/asts/comps-timeline';
import type { CompetitorNewsEntry } from '@/data/shared/competitor-schema';
const COMPETITOR_NEWS: CompetitorNewsEntry[] = COMPS_TIMELINE;
import { ASTS_SEC_FILINGS, ASTS_SEC_META, ASTS_SEC_TYPE_COLORS, ASTS_SEC_FILTER_TYPES, ASTS_FILING_CROSS_REFS } from '@/data/asts/sec-filings';
import { ASTS_QUARTERLY_DATA } from '@/data/asts/quarterly-metrics';
import { ASTS_ANALYST_COVERAGE } from '@/data/asts/analyst-coverage';
import { ASTS_TIMELINE_EVENTS } from '@/data/asts/timeline-events';
import StockChart from '../shared/StockChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ComposedChart, Cell, PieChart, Pie, Legend, ReferenceLine } from 'recharts';

// Data imports - All hardcoded data extracted to separate files for easy AI updates
import {
  DEFAULTS,
  PARTNERS,
  PARTNER_NEWS,
  REVENUE_SOURCES,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  SHARE_CLASSES,
  TOTAL_BASIC_SHARES,
  TOTAL_VOTING_SHARES,
  FULLY_DILUTED_SHARES,
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
  DILUTION_HISTORY,
  SBC_HISTORY,
  CONVERTIBLE_NOTES,
  CASH_RUNWAY_SCENARIOS,
  LIQUIDITY_POSITION,
  DILUTION_SCENARIOS,
  DATA_FRESHNESS,
  FEB_2026_RD_NET_DILUTION,
  FEB_2026_GREENSHOE,
  FEB_2026_RSU_VESTINGS,
  DEC_2025_RSU_GRANTS,
  DEC_2025_INSIDER_SALES,
  DEC_2025_INSIDER_PURCHASES,
  AUG_2025_CEO_RSU_GRANT,
  AUG_SEP_2025_RSU_VESTINGS,
  AUG_SEP_2025_INSIDER_SALES,
  APR_MAY_2025_INSIDER_PURCHASES,
  MAR_2025_INSIDER_SALES,
  MAR_2025_LIGADO_DEAL,
  MAR_2025_SHELF_REGISTRATION,
  JAN_FEB_2025_GOVERNANCE,
  JUN_2025_CERTIFICATE_AMENDMENT,
  MAY_JUN_2025_RSU_ACTIVITY,
  JUN_2025_INSIDER_PURCHASES,
  JUL_2025_CREDIT_FACILITY,
} from '@/data/asts';

// ============================================================================
// ASTS SPACEMOBILE FINANCIAL MODEL
// 2025 Creative Professional Design (CRCL-Style UI/UX)
// ============================================================================
// 
// INSTRUCTIONS FOR AI ASSISTANTS (Claude, GPT, etc.) AND HUMAN EDITORS:
//
// 1. HISTORICAL DATA INTEGRITY:
//    - NEVER modify or delete historical entries in the "timeline" array
//    - NEVER change past quarterly data in "quarterlyData" 
//    - If corrections needed, ADD new entries that reference/supersede old ones
//    - This preserves the audit trail of how the investment thesis evolved
//
// 2. UPDATING THE MODEL:
//    - New PRs/filings: ADD new timeline entries with date, don't edit old ones
//    - Stock price updates: Update currentStockPrice default and Q4 quarterlyData
//    - New quarters: ADD new entry to quarterlyData, don't modify past quarters
//    - Debt changes: Update totalDebt and add timeline entry explaining the change
//
// 3. SOURCES:
//    - SEC EDGAR: 10-K, 10-Q, 8-K, S-1/S-3 filings
//    - Company PRs: ast-science.com/news or businesswire
//    - Always cite sources in timeline entries
//
// 4. MODEL LAST UPDATED: February 12, 2026
//    - Timeline: 128+ entries (2019-2026)
//    - Latest PR processed: $1B Converts + RDs, Feb 11, 2026
//    - Latest filing processed: 8-K Feb 11, 2026 (FY 2025 preliminary)
//    - Debt update: $2,264M (8-K); pro forma ~$2,968M post-Feb 2026 raises
//    - SPAC SEC filings integrated: 10-K FY2019, 10-K FY2020, 10-K/A FY2020
//    - Added: Earnings call insights (Q1 FY2023 - Q3 FY2025)
//    - New: LAUNCH category (4 launches: BB6, BB1-5, BW3, BW1)
//    - New: Topic filters with AND logic (Tech, Commercial, Regulatory, 
//           Funding, Government, Manufacturing, Spectrum)
//    - Wall Street: Added BofA full history ($55→$80→$85→$100); Deutsche Bank Nov 2023, May 2022, Nov 2021; UBS Aug 2024, Aug 2025, Sep 2025
//
// ============================================================================

// ============================================================================
// TYPESCRIPT INTERFACES (H1)
// ============================================================================

// ============================================================================
// ANALYST COVERAGE INTERFACES
// ============================================================================

/** Individual analyst report/update entry */
// AnalystCoverage type imported from '../shared' (wallStreetTypes.ts)

// ============================================================================
// COMPETITOR NEWS TRACKING INTERFACES
// ============================================================================

// Competitor types derived from shared schema
type CompetitorId = CompetitorNewsEntry['competitor'];
type CompetitorNewsCategory = CompetitorNewsEntry['category'];

/** Competitor profile with capabilities */
interface CompetitorProfile {
  id: CompetitorId;
  name: string;
  description: string;
  technology: string;
  currentStatus: string;
  capabilities: {
    voice: boolean;
    text: boolean;
    data: boolean;
    video: boolean;
    unmodifiedPhones: boolean;
    globalCoverage: boolean;
  };
  keyMetrics?: {
    satellites?: number | string;
    coverage?: string;
    subscribers?: string;
    funding?: string;
  };
}

/** Rating normalization map */
const RATING_NORMALIZATION: Record<string, 'bullish' | 'neutral' | 'bearish'> = {
  // Bullish ratings
  'Strong Buy': 'bullish',
  'Buy': 'bullish',
  'Overweight': 'bullish',
  // Neutral ratings
  'Neutral': 'neutral',
  'Hold': 'neutral',
  'Market Perform': 'neutral',
  'Sector Perform': 'neutral',
  'Perform': 'neutral',
  // Bearish ratings
  'Underweight': 'bearish',
  'Sector Underperform': 'bearish',
  'Underperform': 'bearish',
  'Sell': 'bearish',
};

// ============================================================================
// NAMED CONSTANTS (N2) - Extracted Magic Numbers with Explanations
// ============================================================================

/** Discount rate for pre-revenue space company (15% = high risk premium) */
const DISCOUNT_RATE = 0.15;

/** Addressable subscriber base across MNO partners (3.2 billion) */
const ADDRESSABLE_SUBSCRIBERS_BILLIONS = 3.2;

/** Addressable subscribers in millions (for state/calculations) */
const PARTNER_REACH_MILLIONS = 3200;

/** Minimum discount rate for DCF calculations */
const MIN_DISCOUNT_RATE = 5;

/** Maximum realistic EV/EBITDA multiple for growth companies */
const MAX_EV_MULTIPLE = 16;

/** Distressed valuation multiplier (revenue × 2) */
const DISTRESSED_REVENUE_MULTIPLE = 2;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Safely clamp a value between min and max bounds */
const clamp = (value: number, min: number, max: number): number => 
  Math.max(min, Math.min(max, value));

/** Safe division that returns fallback instead of Infinity/NaN */
const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => 
  denominator !== 0 && isFinite(numerator / denominator) ? numerator / denominator : fallback;

/** Ensure a value is a finite number, otherwise return fallback */
const safeNumber = (value: number, fallback: number = 0): number => 
  isFinite(value) ? value : fallback;

// CSS imported from stock-model-styles.css (see import at top of file)

// UI components (Stat, Card, Row, Input, Panel, Guide, CFANotes) imported from '../shared'
// Update indicators (UpdateIndicatorContext, UpdateIndicators, UpdateLegend) imported from '../shared'

const ASTSAnalysis = () => {
  // === DATA FRESHNESS: Last updated Dec 30, 2025 ===
  // Update stock prices regularly - stale data affects all calculations
  const [currentShares, setCurrentShares] = useState(DEFAULTS.currentShares);  // From @/data/asts/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(DEFAULTS.currentStockPrice);  // From @/data/asts/company.ts
  const [cashOnHand, setCashOnHand] = useState(DEFAULTS.cashOnHand);  // From @/data/asts/company.ts
  const [quarterlyBurn, setQuarterlyBurn] = useState(DEFAULTS.quarterlyBurn);  // From @/data/asts/company.ts
  const [totalDebt, setTotalDebt] = useState(DEFAULTS.totalDebt);  // From @/data/asts/company.ts
  const [debtRate, setDebtRate] = useState(4.25);  // Q3 10-Q: Converts at 4.25%
  const [block1Sats, setBlock1Sats] = useState(6);  // BW3 + BB1-5 (Block 1)
  const [block2Sats, setBlock2Sats] = useState(1);  // BB6 launched Dec 23, 2025 (first Block 2)
  const [targetSats2026, setTargetSats2026] = useState(60);  // Per PRs: 45-60 range, using upper end
  const [launchFailureRate, setLaunchFailureRate] = useState(7);
  const [partnerReach, setPartnerReach] = useState(PARTNER_REACH_MILLIONS);  // 3.2B subs across 53+ MNOs
  const [penetrationRate, setPenetrationRate] = useState(3);
  const [blendedARPU, setBlendedARPU] = useState(18);
  const [revenueShare, setRevenueShare] = useState(50);
  const [govRevenue, setGovRevenue] = useState(100);
  const [contractedRevenue] = useState(1000);  // $1B+ contracted commercial revenue per Q3 earnings
  const [regulatoryRisk, setRegulatoryRisk] = useState(5);
  const [techRisk, setTechRisk] = useState(8);
  const [competitionRisk, setCompetitionRisk] = useState(10);

  // DCF Model Assumptions - NEW
  const [deploymentDelay, setDeploymentDelay] = useState(0); // Years behind/ahead of plan (-2 to +2)
  const [terminalMargin, setTerminalMargin] = useState(55); // Terminal EBITDA margin %
  const [terminalCapex, setTerminalCapex] = useState(10); // Terminal CapEx as % of revenue
  const [dilutionRate, setDilutionRate] = useState(5); // Annual dilution % from warrants/SBC
  const [competitionDiscount, setCompetitionDiscount] = useState(20); // % reduction for Starlink/T-Mobile
  const [discountRate, setDiscountRate] = useState(15); // WACC / hurdle rate
  const [terminalGrowth, setTerminalGrowth] = useState(3); // Perpetuity growth rate
  const [selectedScenario, setSelectedScenario] = useState<'bull' | 'base' | 'bear' | 'custom'>('base');

  // Update indicator visibility toggle
  const [showIndicators, setShowIndicators] = useState(true);

  // Chart refresh key - increment to trigger chart data refresh
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  // ASTS D2D competitors for live feeds
  const astsCompetitors: Competitor[] = [
    // D2D Competitors
    { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
    { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
    { name: 'Iridium Communications', url: 'https://www.iridium.com' },
    { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
    { name: 'Lynk Global', url: 'https://lynk.world' },
    { name: 'Viasat', url: 'https://www.viasat.com' },
    { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
    { name: 'SES', url: 'https://www.ses.com' },
    { name: 'OQ Technology', url: 'https://www.oqtec.space' },
    { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
    { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
    // Definitive Commercial Partners
    { name: 'AT&T', url: 'https://about.att.com/newsroom' },
    { name: 'Verizon', url: 'https://www.verizon.com/about/news' },
    { name: 'Vodafone Group', url: 'https://www.vodafone.com/news' },
    { name: 'stc Group', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
    // Other Key Partners (MOUs & Agreements)
    { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
    { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
    { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
    { name: 'Orange', url: 'https://www.orange.com/en/newsroom' },
    { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
    { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
    { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
    { name: 'Telstra', url: 'https://www.telstra.com.au/exchange/news' },
  ];

  // ASTS research sources for SharedSourcesTab
  const astsResearchSources: SourceGroup[] = [
    { category: 'Company / IR', sources: [
      { name: 'AST SpaceMobile Investor Relations', url: 'https://investors.ast-science.com' },
      { name: 'SEC EDGAR (ASTS Filings)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=ast+spacemobile&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
    ]},
    { category: 'Competitors / D2D Players', sources: [
      { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
      { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
      { name: 'Iridium Communications', url: 'https://www.iridium.com' },
      { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
      { name: 'Lynk Global', url: 'https://lynk.world' },
      { name: 'Viasat', url: 'https://www.viasat.com' },
      { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
      { name: 'SES', url: 'https://www.ses.com' },
      { name: 'OQ Technology', url: 'https://www.oqtec.space' },
      { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
      { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
    ]},
    { category: 'Definitive Commercial Partners', sources: [
      { name: 'AT&T Newsroom', url: 'https://about.att.com/newsroom' },
      { name: 'Verizon News', url: 'https://www.verizon.com/about/news' },
      { name: 'Vodafone Group News', url: 'https://www.vodafone.com/news' },
      { name: 'stc Group Media', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
    ]},
    { category: 'Other Key Partners (MOUs)', sources: [
      { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
      { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
      { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
      { name: 'Orange Newsroom', url: 'https://www.orange.com/en/newsroom' },
      { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
      { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
      { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
      { name: 'Telstra Exchange', url: 'https://www.telstra.com.au/exchange/news' },
    ]},
    { category: 'Satellite / Telecom Industry', sources: [
      { name: 'SpaceNews', url: 'https://spacenews.com' },
      { name: 'Via Satellite', url: 'https://www.viasatellite.com' },
      { name: 'SatellitePro ME', url: 'https://www.satelliteprome.com' },
      { name: 'SatNews', url: 'https://www.satnews.com' },
      { name: 'Advanced Television', url: 'https://advanced-television.com' },
      { name: 'New Electronics', url: 'https://www.newelectronics.co.uk' },
      { name: 'Light Reading', url: 'https://www.lightreading.com' },
    ]},
    { category: 'Research / Market Data', sources: [
      { name: 'GSMA Intelligence', url: 'https://www.gsmaintelligence.com' },
      { name: 'Kaleido Intelligence', url: 'https://www.kaleidointelligence.com' },
      { name: 'MEF (Mobile Ecosystem Forum)', url: 'https://mobileecosystemforum.com' },
    ]},
    { category: 'Regulatory', sources: [
      { name: 'FCC (Federal Communications Commission)', url: 'https://www.fcc.gov' },
    ]},
    { category: 'Financial / Analyst', sources: [
      { name: 'TipRanks', url: 'https://www.tipranks.com' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com' },
      { name: 'GuruFocus', url: 'https://www.gurufocus.com' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com' },
      { name: 'MarketBeat', url: 'https://www.marketbeat.com' },
      { name: 'Investing.com', url: 'https://www.investing.com' },
      { name: 'Benzinga', url: 'https://www.benzinga.com' },
      { name: 'Quiver Quant', url: 'https://www.quiverquant.com' },
    ]},
    { category: 'Press / News Wires', sources: [
      { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
      { name: 'Business Wire', url: 'https://www.businesswire.com' },
      { name: 'GlobeNewswire', url: 'https://www.globenewswire.com' },
    ]},
  ];

  // Live price refresh hook - gets price from chart's API response
  const { isLoading: priceLoading, lastUpdated: priceLastUpdated, refresh: refreshPrice } = useLiveStockPrice(
    'ASTS',
    DEFAULTS.currentStockPrice,
    { onPriceUpdate: (price) => setCurrentStockPrice(price) }
  );

  // Combined refresh handler - updates both price and chart
  const handleRefreshAll = useCallback(async () => {
    await refreshPrice();
    setChartRefreshKey(k => k + 1);
  }, [refreshPrice]);

  // Auto-fetch live price and chart on mount
  useEffect(() => {
    handleRefreshAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Use imported data from @/data/asts
  const partners = PARTNERS;
  const revenueSources = REVENUE_SOURCES;
  const upcomingCatalysts = UPCOMING_CATALYSTS;
  const completedMilestones = COMPLETED_MILESTONES;

  const calc = useMemo(() => {
    const marketCap = currentStockPrice * currentShares;
    const totalSats = block1Sats + block2Sats;
    const constellationProgress = (totalSats / targetSats2026) * 100;
    const cashRunwayQuarters = quarterlyBurn > 0 ? cashOnHand / quarterlyBurn : 0;
    const enterpriseValue = marketCap + totalDebt - cashOnHand;
    const potentialSubs = partnerReach * (penetrationRate / 100);
    const grossAnnualRev = potentialSubs * blendedARPU * 12;
    const astsAnnualRev = grossAnnualRev * (revenueShare / 100) + govRevenue;
    const evToRevFwd = astsAnnualRev > 0 ? enterpriseValue / astsAnnualRev : 0;
    const pricePerSub = potentialSubs > 0 ? marketCap / potentialSubs : 0;
    const totalPrepayments = partners.reduce((sum, p) => sum + p.prepay, 0);
    // Ensure all outputs are finite numbers
    const safe = (v: number) => (isFinite(v) ? v : 0);
    return { marketCap: safe(marketCap), totalSats, constellationProgress: safe(constellationProgress), cashRunwayQuarters: safe(cashRunwayQuarters), enterpriseValue: safe(enterpriseValue), potentialSubs: safe(potentialSubs), grossAnnualRev: safe(grossAnnualRev), astsAnnualRev: safe(astsAnnualRev), evToRevFwd: safe(evToRevFwd), pricePerSub: safe(pricePerSub), totalPrepayments };
  }, [currentShares, currentStockPrice, cashOnHand, quarterlyBurn, totalDebt, block1Sats, block2Sats, targetSats2026, partnerReach, penetrationRate, blendedARPU, revenueShare, govRevenue, partners]);

  // Tab types: 'tracking' = actual company data, 'projection' = user model inputs
  // Order: Overview first, then stock-specific projections (Partners first like BMNR Ethereum), common projections, then tracking
  // group: optional grouping for nested display (stock-specific tabs)
  const tabs: { id: string; label: string; type: 'tracking' | 'projection'; group?: string }[] = [
    { id: 'overview', label: 'Overview', type: 'tracking' },
    // Stock-specific projections (grouped under "ASTS Analysis") - Partners FIRST like BMNR Ethereum
    { id: 'partners', label: 'Partners', type: 'projection', group: 'ASTS Analysis' },
    { id: 'catalysts', label: 'Catalysts', type: 'projection', group: 'ASTS Analysis' },
    { id: 'constellation', label: 'Constellation', type: 'projection', group: 'ASTS Analysis' },
    { id: 'subscribers', label: 'Subscribers', type: 'projection', group: 'ASTS Analysis' },
    { id: 'revenue', label: 'Revenue', type: 'projection', group: 'ASTS Analysis' },
    { id: 'dilution', label: 'Dilution', type: 'projection', group: 'ASTS Analysis' },
    // Unified valuation model (combines Scenarios + DCF)
    { id: 'model', label: 'Model', type: 'projection' },
    // Other projections
    { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection' },
    { id: 'comps', label: 'Comps', type: 'projection' },
    // Tracking
    { id: 'capital', label: 'Capital', type: 'tracking' },
    { id: 'financials', label: 'Financials', type: 'tracking' },
    { id: 'timeline', label: 'Timeline', type: 'tracking' },
    { id: 'investment', label: 'Investment', type: 'tracking' },
    { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
    // AI hub (grouped under "AI")
    { id: 'ai-agents', label: 'AI Agents', type: 'tracking', group: 'AI' },
    { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
    { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
  ];

  const [activeTab, setActiveTab] = useHashTab(tabs.map(t => t.id));

  return (
    <UpdateIndicatorContext.Provider value={{ showIndicators, setShowIndicators }}>
      <div className="stock-model-app" data-accent="cyan">
        {/* ============================================================================
            LEGAL DISCLAIMER BANNER
            ============================================================================ */}
        <DisclaimerBanner />
        
        {/* ============================================================================
            HERO HEADER - CRCL-Style Premium Design
            ============================================================================ */}
        <header className="hero">
          <div className="hero-grid">
            <div className="brand-block">
              <h1>ASTS SpaceMobile</h1>
              <div className="ticker">NASDAQ: ASTS · Direct-to-Device Cellular</div>
              {/* H4: Data Freshness Timestamp */}
              <div className="sm-data-freshness">
                <span>📅</span>
                <span>Data as of: {DATA_FRESHNESS.dataAsOf}</span>
                <span className="sm-data-freshness-sep">|</span>
                <span>{DATA_FRESHNESS.priceNote}</span>
              </div>
              <p className="desc">
                First space-based cellular broadband for standard smartphones. 
                53+ MNO partnerships reaching {(partnerReach / 1000).toFixed(1)}B subscribers globally.
              </p>
            </div>
            <div className="price-block">
              <div className="price-big sm-flex">
                ${currentStockPrice.toFixed(2)}
                <button
                  onClick={handleRefreshAll}
                  disabled={priceLoading}
                  title={priceLastUpdated ? `Last updated: ${priceLastUpdated.toLocaleTimeString()}` : 'Click to refresh price & chart'}
                  className="sm-refresh-btn"
                  data-loading={priceLoading ? "true" : undefined}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm-text3"
                    data-spin={priceLoading ? "true" : undefined}
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 21h5v-5" />
                  </svg>
                </button>
              </div>
              <div className="price-badge up">
                🛰️ {calc.totalSats}/{targetSats2026} Satellites
              </div>
              {priceLastUpdated && (
                <div className="sm-text-10 sm-text3 sm-mt-4">
                  Updated: {priceLastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          <Stat label="Market Cap" value={`$${(calc.marketCap / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="Enterprise Value" value={`$${(calc.enterpriseValue / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="Constellation" value={`${calc.totalSats}/${targetSats2026}`} color="cyan" updateSource="PR" />
          <Stat label="Progress" value={`${calc.constellationProgress.toFixed(0)}%`} color="cyan" updateSource="PR" />
          <Stat label="Cash" value={`$${(cashOnHand / 1000).toFixed(1)}B`} color="mint" updateSource="SEC" />
          <Stat label="Runway" value={`${calc.cashRunwayQuarters.toFixed(1)}Q`} color="mint" updateSource="SEC" />
          <Stat label="Contracted Rev" value={`$${contractedRevenue}M+`} color="sky" updateSource="PR" />
        </div>

        {/* Navigation */}
        <StockNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} stockGroupName="ASTS Analysis" />
        
        {/* Main Content */}
        <main className="main">
          {/* Update Source Legend - Shows what each indicator color means */}
          <UpdateLegend />
          {activeTab === 'overview' && <TabPanel id="overview"><OverviewTab calc={calc} currentShares={currentShares} setCurrentShares={setCurrentShares} currentStockPrice={currentStockPrice} setCurrentStockPrice={setCurrentStockPrice} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} block1Sats={block1Sats} block2Sats={block2Sats} targetSats2026={targetSats2026} contractedRevenue={contractedRevenue} partnerReach={partnerReach} penetrationRate={penetrationRate} chartRefreshKey={chartRefreshKey} /></TabPanel>}
          {activeTab === 'catalysts' && <TabPanel id="catalysts"><CatalystsTab upcomingCatalysts={upcomingCatalysts} completedMilestones={completedMilestones} /></TabPanel>}
          {activeTab === 'constellation' && <TabPanel id="constellation"><ConstellationTab calc={calc} block1Sats={block1Sats} setBlock1Sats={setBlock1Sats} block2Sats={block2Sats} setBlock2Sats={setBlock2Sats} targetSats2026={targetSats2026} setTargetSats2026={setTargetSats2026} launchFailureRate={launchFailureRate} setLaunchFailureRate={setLaunchFailureRate} /></TabPanel>}
          {activeTab === 'subscribers' && <TabPanel id="subscribers"><SubscribersTab calc={calc} partnerReach={partnerReach} setPartnerReach={setPartnerReach} penetrationRate={penetrationRate} setPenetrationRate={setPenetrationRate} blendedARPU={blendedARPU} setBlendedARPU={setBlendedARPU} partners={partners} /></TabPanel>}
          {activeTab === 'revenue' && <TabPanel id="revenue"><RevenueTab calc={calc} revenueShare={revenueShare} setRevenueShare={setRevenueShare} govRevenue={govRevenue} setGovRevenue={setGovRevenue} revenueSources={revenueSources} contractedRevenue={contractedRevenue} /></TabPanel>}
          {activeTab === 'partners' && <TabPanel id="partners"><PartnersTab partners={partners} revenueShare={revenueShare} blendedARPU={blendedARPU} penetrationRate={penetrationRate} /></TabPanel>}
          {activeTab === 'dilution' && <TabPanel id="dilution"><ASTSDilutionTab calc={calc} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} debtRate={debtRate} setDebtRate={setDebtRate} currentShares={currentShares} currentStockPrice={currentStockPrice} /></TabPanel>}
          {activeTab === 'capital' && <TabPanel id="capital"><CapitalTab currentShares={currentShares} currentStockPrice={currentStockPrice} /></TabPanel>}
          {activeTab === 'model' && <TabPanel id="model"><ModelTab
            partnerReach={partnerReach} setPartnerReach={setPartnerReach}
            penetrationRate={penetrationRate} setPenetrationRate={setPenetrationRate}
            blendedARPU={blendedARPU} setBlendedARPU={setBlendedARPU}
            revenueShare={revenueShare} setRevenueShare={setRevenueShare}
            deploymentDelay={deploymentDelay} setDeploymentDelay={setDeploymentDelay}
            terminalMargin={terminalMargin} setTerminalMargin={setTerminalMargin}
            terminalCapex={terminalCapex} setTerminalCapex={setTerminalCapex}
            dilutionRate={dilutionRate} setDilutionRate={setDilutionRate}
            competitionDiscount={competitionDiscount} setCompetitionDiscount={setCompetitionDiscount}
            discountRate={discountRate} setDiscountRate={setDiscountRate}
            terminalGrowth={terminalGrowth} setTerminalGrowth={setTerminalGrowth}
            regulatoryRisk={regulatoryRisk} setRegulatoryRisk={setRegulatoryRisk}
            techRisk={techRisk} setTechRisk={setTechRisk}
            competitionRisk={competitionRisk} setCompetitionRisk={setCompetitionRisk}
            selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario}
            currentShares={currentShares} currentStockPrice={currentStockPrice}
            cashOnHand={cashOnHand} totalDebt={totalDebt}
          /></TabPanel>}
          {activeTab === 'monte-carlo' && <TabPanel id="monte-carlo"><MonteCarloTab currentShares={currentShares} currentStockPrice={currentStockPrice} totalDebt={totalDebt} cashOnHand={cashOnHand} /></TabPanel>}
          {activeTab === 'comps' && <TabPanel id="comps"><CompsTab calc={calc} currentStockPrice={currentStockPrice} /></TabPanel>}
          {activeTab === 'timeline' && <TabPanel id="timeline"><TimelineTab /></TabPanel>}
          {activeTab === 'financials' && <TabPanel id="financials"><FinancialsTab /></TabPanel>}
          {activeTab === 'investment' && <TabPanel id="investment"><InvestmentTab /></TabPanel>}
          {activeTab === 'wall-street' && <TabPanel id="wall-street"><WallStreetTab /></TabPanel>}
          {activeTab === 'ai-agents' && <TabPanel id="ai-agents"><SharedAIAgentsTab ticker="ASTS" /></TabPanel>}
          {activeTab === 'sources' && <TabPanel id="sources">
            <SharedSourcesTab ticker="ASTS" companyName="AST SpaceMobile" researchSources={astsResearchSources} competitorLabel="Competitors & Partners" competitors={astsCompetitors} />
          </TabPanel>}
          {activeTab === 'edgar' && <TabPanel id="edgar">
            <SharedEdgarTab ticker="ASTS" companyName="AST SpaceMobile" localFilings={ASTS_SEC_FILINGS} cik={ASTS_SEC_META.cik} typeColors={ASTS_SEC_TYPE_COLORS} crossRefIndex={ASTS_FILING_CROSS_REFS} />
          </TabPanel>}
        </main>
      </div>
    </UpdateIndicatorContext.Provider>
  );
};

// Overview Parameter Card - matches Model tab ParameterCard styling with custom input support
const OverviewParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  currentValue,
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  currentValue?: number;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v}`;
    if (format === '%') return `${v}%`;
    if (format === 'B') return v >= 1000 ? `${(v/1000).toFixed(1)}B` : `${v}`;
    if (format === 'M') return `${v}M`;
    return String(v);
  };

  const presetColors = [
    { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
  ];

  const handleCustomSubmit = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num)) {
      onChange(num);
      setCustomMode(false);
      setCustomInput('');
    }
  };

  return (
    <div className="sm-panel sm-mb-12">
      <div className="sm-panel-title sm-mb-12">{title}</div>
      <p className="sm-note-list">
        {explanation}
      </p>
      <div className="sm-param-grid-7">
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const isCurrent = currentValue !== undefined && opt === currentValue;
          const colors = presetColors[idx];
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              className="sm-param-btn"
              data-active={isActive ? "true" : undefined}
              style={isActive ? { borderColor: colors.border, background: colors.bg, color: colors.text } : undefined}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode ? (
          <div className="sm-custom-input-wrap">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              className="sm-custom-input-field"
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            className="sm-param-btn"
            data-active={isCustomValue ? "true" : undefined}
            style={isCustomValue ? { borderColor: 'var(--violet)', background: 'rgba(167,139,250,0.15)', color: 'var(--violet)' } : undefined}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div className="sm-subtle-sm sm-text-center sm-mt-4">
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

const OverviewTab = ({ calc, currentShares, setCurrentShares, currentStockPrice, setCurrentStockPrice, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, block1Sats, block2Sats, targetSats2026, contractedRevenue, partnerReach, penetrationRate, chartRefreshKey }) => {
  const [chartType, setChartType] = useState('constellation');

  // Chart data - HISTORICAL ONLY
  // BW3 launched Sep'22, BB1-5 launched Sep'24, BB6 launched Dec'25
  const constellationData = [
    { label: 'Q3\'22', value: 1, display: '1' },
    { label: 'Q3\'24', value: 6, display: '6' },
    { label: 'Q4\'24', value: 6, display: '6' },
    { label: 'Q1\'25', value: 6, display: '6' },
    { label: 'Q2\'25', value: 6, display: '6' },
    { label: 'Q4\'25', value: block1Sats + block2Sats, display: `${block1Sats + block2Sats}` },
  ];

  // Cash data from 10-Q/10-K filings (cashAndEquiv)
  const cashData = [
    { label: 'Q1\'24', value: 212, display: '$212M' },
    { label: 'Q2\'24', value: 288, display: '$288M' },
    { label: 'Q3\'24', value: 519, display: '$519M' },
    { label: 'Q4\'24', value: 568, display: '$568M' },
    { label: 'Q1\'25', value: 875, display: '$875M' },
    { label: 'Q2\'25', value: 939, display: '$939M' },
    { label: 'Q3\'25', value: 1220, display: '$1.2B' },
  ];

  const marketCapData = [
    { label: 'Q1\'24', value: 2.1, display: '$2.1B' },
    { label: 'Q2\'24', value: 3.5, display: '$3.5B' },
    { label: 'Q3\'24', value: 7.2, display: '$7.2B' },
    { label: 'Q4\'24', value: 8.8, display: '$8.8B' },
    { label: 'Q1\'25', value: 6.5, display: '$6.5B' },
    { label: 'Q2\'25', value: calc.marketCap / 1000, display: `$${(calc.marketCap / 1000).toFixed(1)}B` },
  ];

  const chartData = chartType === 'constellation' ? constellationData : chartType === 'cash' ? cashData : marketCapData;
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
  <div className="sm-flex-col">
    {/* Hero — Ive×Tesla */}
    <div className="sm-tab-hero">
      <div className="sm-section-label">Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
      <h2>Overview<span className="sm-accent">.</span></h2>
      <p><strong className="sm-text2 sm-fw-500">AST SpaceMobile:</strong> First space-based cellular broadband for standard smartphones. 53+ MNO partnerships (3.2B subs). BB6 launched Dec 24. $3.2B cash. $1B+ contracted revenue.</p>
    </div>

    <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
      <div className="sm-card-body sm-bg-surface">
        <div className="sm-flex sm-items-center sm-gap-8 sm-mb-12">
          <span className="sm-section-label sm-mint" style={{ fontSize: 13 }}>Bull Case</span>
          <UpdateIndicators sources="PR" />
        </div>
        {[
          'BB6 proving D2D technology works at scale',
          '53+ MNO partners with 3.2B addressable subscribers',
          '$1B+ contracted revenue locked in',
          'First-mover advantage in direct-to-phone satellite',
          'MDA SHIELD prime contractor + DoD/SDA contracts',
          'Regulatory moat — licensed spectrum agreements',
        ].map(item => (
          <div key={item} className="sm-case-item">
            <span className="sm-case-icon sm-mint">+</span>{item}
          </div>
        ))}
      </div>
      <div className="sm-card-body sm-bg-surface">
        <div className="sm-flex sm-items-center sm-gap-8 sm-mb-12">
          <span className="sm-section-label sm-coral" style={{ fontSize: 13 }}>Bear Case</span>
          <UpdateIndicators sources="PR" />
        </div>
        {[
          'Pre-revenue company, high execution risk',
          'Dilution risk — $3.2B raised, may need more',
          'Competition: Starlink/T-Mobile D2D partnership',
          'Satellite launch/technology failure risk',
          'Slow subscriber adoption by MNO partners',
          'MNO partnership revenue share negotiations',
        ].map(item => (
          <div key={item} className="sm-case-item">
            <span className="sm-case-icon sm-coral">-</span>{item}
          </div>
        ))}
      </div>
    </div>

    <div className="sm-card sm-mt-8">
      <div className="sm-card-header">
        <div className="sm-flex">
          <span className="sm-param-label">
            {chartType === 'constellation' ? 'Constellation Build-Out' : chartType === 'cash' ? 'Cash Position' : 'Market Cap'}
          </span>
          <UpdateIndicators sources="PR" />
        </div>
        <div className="sm-flex sm-gap-6">
          {[
            { id: 'constellation', label: 'Satellites' },
            { id: 'cash', label: 'Cash' },
            { id: 'marketcap', label: 'Mkt Cap' },
          ].map(btn => {
            const isActive = chartType === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setChartType(btn.id)}
                className="sm-pill-toggle"
                data-active={isActive || undefined}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="sm-bar-chart" style={{ height: 200 }}>
        {chartData.map((d, i) => (
          <div key={i} className="sm-bar-col">
            <div className="sm-bar-col-label">{d.display}</div>
            <div style={{ width: '100%', background: 'var(--accent)', borderRadius: '4px 4px 0 0', height: maxValue > 0 ? Math.round((d.value / maxValue) * 150) : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
            <div className="sm-bar-col-foot">{d.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="sm-card sm-mt-8">
      <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 120px 1fr' }}>
        {['Metric', 'Value', 'Description'].map(h => (
          <span key={h} className="sm-th" style={{ textAlign: h === 'Value' ? 'right' : 'left'}}>{h}</span>
        ))}
      </div>
      {[
        { metric: 'Market Cap', value: `$${(calc.marketCap / 1000).toFixed(2)}B`, desc: 'Equity value', color: 'var(--text)' },
        { metric: 'Enterprise Value', value: `$${(calc.enterpriseValue / 1000).toFixed(2)}B`, desc: 'MC + Debt - Cash', color: 'var(--text)' },
        { metric: 'Constellation', value: `${calc.totalSats}/${targetSats2026}`, desc: `${calc.constellationProgress.toFixed(0)}% complete`, color: 'var(--cyan)' },
        { metric: 'Cash Runway', value: `${calc.cashRunwayQuarters.toFixed(1)} quarters`, desc: `~${(calc.cashRunwayQuarters / 4).toFixed(1)} year runway`, color: calc.cashRunwayQuarters > 4 ? 'var(--mint)' : 'var(--gold)' },
      ].map((row, i, arr) => (
        <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', padding: '12px 24px', borderBottom: i < arr.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}>
          <span className="sm-text-13t">{row.metric}</span>
          <span className="sm-mono-val sm-text-right" data-weight="600" style={{ '--val-color': row.color } as React.CSSProperties}>{row.value}</span>
          <span className="sm-text-12 sm-text3" style={{ paddingLeft: 16 }}>{row.desc}</span>
        </div>
      ))}
    </div>
    <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
      {[
        { metric: 'Shares', value: `${currentShares}M`, sub: 'Outstanding', color: 'var(--text)' },
        { metric: 'Price', value: `$${currentStockPrice}`, sub: 'Current', color: 'var(--text)' },
        { metric: 'Mkt Cap', value: `$${(calc.marketCap / 1000).toFixed(2)}B`, sub: 'Equity', color: 'var(--accent)' },
        { metric: 'Debt', value: `$${totalDebt}M`, sub: 'Total debt', color: 'var(--text)' },
        { metric: 'Cash', value: `$${(cashOnHand / 1000).toFixed(2)}B`, sub: 'On hand', color: 'var(--text)' },
        { metric: 'MNO Partners', value: '53+', sub: 'Signed', color: 'var(--text)' },
        { metric: 'Reach', value: `${(partnerReach / 1000).toFixed(1)}B`, sub: 'Subscribers', color: 'var(--accent)' },
        { metric: `@ ${penetrationRate}%`, value: `${calc.potentialSubs.toFixed(0)}M`, sub: 'Potential subs', color: 'var(--text)' },
        { metric: '$/Sub', value: `$${calc.pricePerSub.toFixed(0)}`, sub: 'Price per sub', color: 'var(--text)' },
        { metric: 'Contracted', value: `$${contractedRevenue}M+`, sub: 'Revenue', color: 'var(--text)' },
        { metric: 'Block 1', value: `${block1Sats} in orbit`, sub: 'BW3+BB1-5', color: 'var(--text)' },
        { metric: 'Block 2', value: `${block2Sats} launched`, sub: 'BB6+', color: 'var(--accent)' },
        { metric: 'Constellation', value: `${block1Sats + block2Sats} sats`, sub: 'Total deployed', color: 'var(--text)' },
        { metric: 'Target', value: targetSats2026, sub: '2026 goal', color: 'var(--text)' },
        { metric: 'Next Launch', value: "BB7-13", sub: "Q1'26", color: 'var(--text)' },
      ].map(row => (
        <div key={row.metric} className="sm-grid-cell-center">
          <div className="sm-micro-text">{row.metric}</div>
          <div className="sm-mono-lg" style={{ color: row.color, margin: '6px 0 4px' }}>{row.value}</div>
          <div className="sm-text-11">{row.sub}</div>
        </div>
      ))}
    </div>
    <div className="sm-divider">
      <span className="sm-param-label">Parameters</span>
      <span className="sm-divider-line" />
    </div>
    <div className="sm-grid-2">
      <OverviewParameterCard
        title="Shares Outstanding (M)"
        explanation="Total diluted shares outstanding. Higher share count = lower per-share metrics. Increases with equity raises, stock comp, warrant exercises."
        options={[450, 400, 380, DEFAULTS.currentShares, 350, 330]}
        value={currentShares}
        onChange={setCurrentShares}
        format="M"
        currentValue={DEFAULTS.currentShares}
      />
      <OverviewParameterCard
        title="Stock Price ($)"
        explanation="Current market price per share. Determines market cap and valuation multiples. Compare to DCF intrinsic value for upside/downside."
        options={[40, 55, 65, DEFAULTS.currentStockPrice, 85, 100]}
        value={currentStockPrice}
        onChange={setCurrentStockPrice}
        format="$"
        currentValue={DEFAULTS.currentStockPrice}
      />
    </div>
    <div className="sm-grid-sep-3col sm-mt-12" style={{ gap: 12, background: 'transparent' }}>
      <OverviewParameterCard
        title="Cash ($M)"
        explanation="Cash & equivalents. Determines runway = Cash ÷ Burn. Critical for pre-revenue companies."
        options={[800, 1000, DEFAULTS.cashOnHand, 1500, 2000, 2500]}
        value={cashOnHand}
        onChange={setCashOnHand}
        format="B"
        currentValue={DEFAULTS.cashOnHand}
      />
      <OverviewParameterCard
        title="Burn ($M/Q)"
        explanation="Quarterly cash consumption. Lower burn extends runway and reduces dilution risk."
        options={[400, 350, DEFAULTS.quarterlyBurn, 250, 200, 150]}
        value={quarterlyBurn}
        onChange={setQuarterlyBurn}
        currentValue={DEFAULTS.quarterlyBurn}
      />
      <OverviewParameterCard
        title="Debt ($M)"
        explanation="Long-term debt obligations. Affects EV and adds financial risk. Lower is safer."
        options={[900, 800, DEFAULTS.totalDebt, 600, 500, 400]}
        value={totalDebt}
        onChange={setTotalDebt}
        currentValue={DEFAULTS.totalDebt}
      />
    </div>

    <div className="sm-divider">
      <span className="sm-param-label">Stock Chart</span>
      <span className="sm-divider-line" />
    </div>
    <StockChart symbol="ASTS" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

    <CFANotes title="CFA Level III — Space-Based Cellular" items={[
      { term: 'Market Cap', def: 'Stock price × shares outstanding. Current equity value assigned by market. Compare to DCF intrinsic value.' },
      { term: 'Enterprise Value (EV)', def: 'Market Cap + Total Debt - Cash. Represents total firm value to all capital providers. Used in EV/Revenue multiples.' },
      { term: 'Constellation Progress', def: 'Satellites deployed vs target. Key operational milestone. More satellites = more coverage capacity = higher revenue potential.' },
      { term: 'Cash Runway', def: 'Cash ÷ Quarterly Burn. Quarters of funding remaining at current spend rate. Critical for pre-revenue companies.' },
      { term: 'Price per Subscriber', def: 'Market Cap ÷ Potential Subscribers. Valuation metric for telecom. Lower = more attractive if execution succeeds.' },
      { term: 'MNO Partnerships', def: 'Mobile Network Operator agreements. 53+ partners with 3.2B combined subscribers. Revenue share model (typically 50/50).' },
    ]} />
  </div>
  );
};

const CatalystsTab = ({ upcomingCatalysts, completedMilestones }) => {
  const [showAllMilestones, setShowAllMilestones] = useState(false);
  // Group milestones by year
  const milestonesByYear = completedMilestones.reduce((acc, m) => {
    const year = m.date.match(/20\d{2}/)?.[0] || 'Other';
    if (!acc[year]) acc[year] = [];
    acc[year].push(m);
    return acc;
  }, {});
  const years = Object.keys(milestonesByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Event Horizon</div>
        <h2>Catalysts<span className="sm-gold">.</span></h2>
        <p>Binary events and inflection points that define AST SpaceMobile's trajectory. Near-term: BB7-13, FCC approval, US service launch.</p>
      </div>

      {/* Impact Summary — Glass cards */}
      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
        {[
          { level: 'Critical', count: upcomingCatalysts.filter(c => c.impact === 'Critical').length, color: '#ef4444', desc: 'Binary outcomes' },
          { level: 'High', count: upcomingCatalysts.filter(c => c.impact === 'High').length, color: 'var(--gold)', desc: 'Significant value' },
          { level: 'Medium', count: upcomingCatalysts.filter(c => c.impact === 'Medium').length, color: 'var(--sky)', desc: 'Incremental' },
          { level: 'Low', count: upcomingCatalysts.filter(c => c.impact === 'Low').length, color: 'var(--text3)', desc: 'Nice to have' },
        ].map(s => (
          <div key={s.level} className="sm-kpi-cell">
            <div className="sm-mono-2xl" style={{ color: s.color }}>{s.count}</div>
            <div className="sm-kpi-category" style={{ '--kpi-color': s.color } as React.CSSProperties}>{s.level}</div>
            <div className="sm-text-11 sm-mt-8 sm-mt-4">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Upcoming — Precision list */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section">
          <span className="sm-param-label">Upcoming Catalysts</span>
        </div>
        {upcomingCatalysts.map((c, i) => {
          const impactColor = c.impact === 'Critical' ? '#ef4444' : c.impact === 'High' ? 'var(--gold)' : c.impact === 'Medium' ? 'var(--sky)' : 'var(--text3)';
          const catColor = c.category === 'Constellation' ? 'var(--cyan)' : c.category === 'Regulatory' ? 'var(--violet)' : c.category === 'Commercial' ? 'var(--gold)' : c.category === 'Service' ? 'var(--mint)' : c.category === 'Defense' || c.category === 'Government' ? 'var(--coral)' : c.category === 'Financing' ? 'var(--sky)' : 'var(--text3)';
          return (
            <div key={i} className="sm-grid-row-lg" style={{ gridTemplateColumns: '100px 1fr auto auto', gap: 16 }}>
              <span className="sm-mono-sm sm-text3" style={{ fontSize: 11 }}>{c.timeline}</span>
              <span className="sm-text-13t">{c.event}</span>
              <span className="sm-badge-dynamic" style={{ '--badge-color': catColor } as React.CSSProperties}>{c.category}</span>
              <span className="sm-badge-dynamic" data-bold="true" style={{ '--badge-color': impactColor } as React.CSSProperties}>{c.impact}</span>
            </div>
          );
        })}
      </div>

      {/* Completed Milestones — Achievement log */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Completed Milestones</span>
          <span className="sm-mono-sm sm-mint">{completedMilestones.length} achieved</span>
        </div>
        {(showAllMilestones ? completedMilestones : completedMilestones.slice(0, 20)).map((m, i) => {
          const catColor = m.category === 'Constellation' ? 'var(--cyan)' : m.category === 'Regulatory' ? 'var(--violet)' : m.category === 'Commercial' ? 'var(--gold)' : m.category === 'Service' ? 'var(--mint)' : m.category === 'Capital' ? 'var(--sky)' : m.category === 'Defense' || m.category === 'Government' ? 'var(--coral)' : 'var(--text3)';
          return (
            <div key={i} className="sm-grid-row-lg" style={{ gridTemplateColumns: '110px 1fr auto', gap: 16 }}>
              <span className="sm-mono-sm sm-text3" style={{ fontSize: 11 }}>{m.date}</span>
              <span className="sm-text-13">{m.event}</span>
              <span className="sm-badge-dynamic" style={{ '--badge-color': catColor } as React.CSSProperties}>{m.category}</span>
            </div>
          );
        })}
        {completedMilestones.length > 20 && (
          <button
            onClick={() => setShowAllMilestones(!showAllMilestones)}
            className="sm-pill-toggle sm-w-full"
            style={{ padding: 8, background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            {showAllMilestones ? '\u25B2 Show Less' : `\u25BC Show ${completedMilestones.length - 20} More Milestones`}
          </button>
        )}
      </div>

      <CFANotes title="CFA Level III — Catalyst Analysis" items={[
        { term: 'Catalyst', def: 'Event that could materially impact stock price. Categorize by probability and magnitude of impact.' },
        { term: 'Critical vs High', def: 'Critical = binary outcome affecting thesis (FCC approval, launch success). High = meaningful but not thesis-breaking.' },
        { term: 'Timeline Risk', def: 'Delays are common in space. Build buffer into expectations. Track management\'s guidance accuracy over time.' },
        { term: 'De-risking', def: 'Each completed milestone reduces execution risk. Successful launches, regulatory approvals, commercial contracts all de-risk.' },
        { term: 'Event-Driven Trading', def: 'Catalysts create volatility. Position sizing should account for binary outcomes and IV expansion.' },
      ]} />
    </div>
  );
};

const ConstellationTab = ({ calc, block1Sats, setBlock1Sats, block2Sats, setBlock2Sats, targetSats2026, setTargetSats2026, launchFailureRate, setLaunchFailureRate }) => {
  // Updated schedule per Nov 21 & Dec 24 2025 PRs: 
  // - BW3 launched Sept 10, 2022 (prototype, 693 sq ft)
  // - BB1-5 launched Sept 12, 2024 (Block 1, 693 sq ft each)
  // - BB6 launched Dec 23, 2025 (first Block 2, ~2,400 sq ft)
  // - Target: 5 launches by end Q1 2026, then every 1-2 months to reach 45-60 by end 2026
  // - BB7 shipped to Cape Canaveral Nov 2025, BB8-25 in various stages
  const schedule = [
    { date: '2022 Q3', sats: 1, cum: 1, note: 'BW3' },
    { date: '2024 Q3', sats: 5, cum: 6, note: 'BB1-5' },
    { date: '2025 Q4', sats: 1, cum: 7, note: 'BB6' },
    { date: '2026 Q1', sats: 4, cum: 11, note: 'BB7-10' },
    { date: '2026 Q2', sats: 12, cum: 23, note: 'Est.' },
    { date: '2026 Q3', sats: 17, cum: 40, note: 'Est.' },
    { date: '2026 Q4', sats: 20, cum: 60, note: 'Target' },
  ];
  const coverage = [{ r: 'US Intermittent', n: 6 }, { r: 'US Continuous', n: 20 }, { r: 'US+Canada+Japan', n: 25 }, { r: 'Global (45-60)', n: 60 }].map(c => ({ ...c, pct: Math.min(100, (calc.totalSats / c.n) * 100) }));
  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Orbital Deployment</div>
        <h2>Constellation<span className="sm-cyan">.</span></h2>
        <p>Block 1 validated the technology. Block 2 scales it 10x. Target: 45-60 satellites by end 2026 via SpaceX, Blue Origin, and ISRO.</p>
      </div>

      {/* Deployment KPIs — Glass grid */}
      <div className="sm-model-grid" style={{ '--cols': 5 } as React.CSSProperties}>
        {[
          { label: 'Block 1', value: block1Sats, sub: 'BW3+BB1-5 (693 sq ft)', color: 'var(--cyan)' },
          { label: 'Block 2', value: block2Sats, sub: 'BB6+ (~2,400 sq ft)', color: 'var(--gold)' },
          { label: 'Total In Orbit', value: calc.totalSats, sub: 'Operational', color: 'var(--mint)' },
          { label: 'Target 2026', value: targetSats2026, sub: '45-60 range', color: 'var(--sky)' },
          { label: 'Progress', value: `${calc.constellationProgress.toFixed(0)}%`, sub: 'vs 2026 target', color: 'var(--violet)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-mono-xl" style={{ color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>
      
      {/* Satellite Generations — Side-by-side panels with accent bars */}
      <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
        <div className="sm-accent-panel" style={{ '--panel-accent': 'var(--cyan)' } as React.CSSProperties}>
          <div className="sm-accent-panel-title" style={{ '--panel-accent': 'var(--cyan)' } as React.CSSProperties}>Block 1: BW3 + BB1-5</div>
          {['Array size: 693 sq ft each', 'Launched: BW3 Sept 2022, BB1-5 Sept 2024', 'Status: All 6 operational in orbit', 'Purpose: Technology validation, early service'].map((item, i) => (
            <div key={i} className="sm-flex sm-items-center sm-gap-12" style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span className="sm-dot-4" style={{ '--dot-color': 'var(--cyan)' } as React.CSSProperties} />
              <span className="sm-text-13">{item}</span>
            </div>
          ))}
        </div>
        <div className="sm-accent-panel" style={{ '--panel-accent': 'var(--gold)' } as React.CSSProperties}>
          <div className="sm-accent-panel-title" style={{ '--panel-accent': 'var(--gold)' } as React.CSSProperties}>Block 2: BB6 onwards</div>
          {['Array size: ~2,400 sq ft (3.5x larger)', 'AST5000 ASIC: Custom silicon, 120 Mbps peak', 'Capacity: 10x improvement over Block 1', 'BB6 launched Dec 23, 2025 (ISRO)', 'BB7-25: In production, 6/month by Dec 2025'].map((item, i) => (
            <div key={i} className="sm-flex sm-items-center sm-gap-12" style={{ padding: '8px 0', borderBottom: i < 4 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span className="sm-dot-4" style={{ '--dot-color': 'var(--gold)' } as React.CSSProperties} />
              <span className="sm-text-13">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Launch Schedule — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section">
          <span className="sm-param-label">Launch Schedule</span>
        </div>
        <div className="sm-card-body">
          <ResponsiveContainer width="100%" height={200}><ComposedChart data={schedule}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="date" stroke="var(--text3)" fontSize={11} /><YAxis stroke="var(--text3)" /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} formatter={(v, name, props) => [name === 'sats' ? `${v} sats (${props.payload.note})` : `${v} cumulative`, name === 'sats' ? 'Launched' : 'Total']} /><Bar dataKey="sats" fill="var(--cyan)" radius={[4, 4, 0, 0]} /><Line dataKey="cum" stroke="var(--gold)" strokeWidth={2} /></ComposedChart></ResponsiveContainer>
          <div className="sm-chart-legend" style={{ gap: 16, flexWrap: 'wrap' }}>
            {['BW3 Sept 2022', 'BB1-5 Sept 2024', 'BB6 Dec 2025', 'BB7 ready'].map((m, i) => (
              <span key={i} className="sm-flex sm-gap-6">
                <span className="sm-dot-5" style={{ '--dot-color': i < 3 ? 'var(--mint)' : 'var(--gold)' } as React.CSSProperties} />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Milestones — Thin progress bars */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section">
          <span className="sm-param-label">Coverage Milestones</span>
        </div>
        <div className="sm-coverage-row">
          {coverage.map(c => (
            <div key={c.r}>
              <div className="sm-flex-between sm-mb-6">
                <span className="sm-text-13">{c.r}</span>
                <span className="sm-mono-val" data-weight="600" style={{ '--val-color': c.pct >= 100 ? 'var(--mint)' : 'var(--cyan)' } as React.CSSProperties}>{c.n} sats ({c.pct.toFixed(0)}%)</span>
              </div>
              <div role="progressbar" aria-label={`${c.r} coverage progress`} aria-valuenow={Math.round(c.pct)} aria-valuemin={0} aria-valuemax={100} className="sm-rounded-3 sm-overflow-hidden" style={{ height: 4, background: 'var(--surface3)' }}>
                <div style={{ height: '100%', width: `${Math.min(100, c.pct)}%`, borderRadius: 2, background: c.pct >= 100 ? 'var(--mint)' : 'var(--cyan)', transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div className="sm-divider">
        <span className="sm-param-label">Parameters</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-2">
        <OverviewParameterCard title="Block 1 (BW3+BB1-5)" explanation="Number of Block 1 satellites. More satellites = greater initial coverage and service validation." options={[2, 4, 6, 8, 10, 12]} value={block1Sats} onChange={setBlock1Sats} currentValue={6} />
        <OverviewParameterCard title="Block 2 (BB6+)" explanation="Number of next-gen Block 2 satellites. 3.5x larger arrays, 10x capacity. Drives commercial scale." options={[0, 1, 3, 5, 8, 12]} value={block2Sats} onChange={setBlock2Sats} currentValue={1} />
      </div>
      <div className="sm-grid-2 sm-mt-12">
        <OverviewParameterCard title="Target 2026" explanation="Target satellites in orbit by 2026. Higher target = faster network buildout and revenue ramp." options={[20, 30, 45, 60, 80, 100]} value={targetSats2026} onChange={setTargetSats2026} currentValue={60} />
        <OverviewParameterCard title="Failure %" explanation="Estimated satellite launch failure rate. Lower failure rate = more reliable deployment schedule." options={[20, 15, 10, 7, 3, 1]} value={launchFailureRate} onChange={setLaunchFailureRate} format="%" currentValue={7} />
      </div>
      
      <CFANotes title="CFA Level III — Constellation Economics" items={[
        { term: 'Block 1 vs Block 2', def: 'Block 1 (BW3+BB1-5): 693 sq ft arrays, technology validation. Block 2 (BB6+): 2,400 sq ft arrays, 3.5x larger, AST5000 chips, 10x capacity.' },
        { term: 'Coverage Thresholds', def: '6 sats = US intermittent, 20 = US continuous, 25 = US+Canada+Japan, 45-60 = global. More satellites = better service quality.' },
        { term: 'Launch Risk', def: 'Historical LEO failure ~7%. Cumulative risk increases with more launches. SpaceX reliability higher than average.' },
        { term: 'CapEx per Satellite', def: '$21-23M average per satellite (Q4 2025). Total constellation cost = CapEx per sat × target count. Compare to revenue capacity.' },
        { term: 'Manufacturing Rate', def: '6 satellites/month by Dec 2025. Bottleneck analysis: can production keep pace with launch cadence?' },
        { term: 'Coverage Economics', def: 'Each satellite adds incremental coverage. Diminishing returns after global coverage achieved. Monitor utilization vs capacity.' },
      ]} />
    </div>
  );
};

const SubscribersTab = ({ calc, partnerReach, setPartnerReach, penetrationRate, setPenetrationRate, blendedARPU, setBlendedARPU, partners }) => {
  const scenarios = [0.5, 1, 2, 3, 5, 7, 10].map(p => ({ p, subs: partnerReach * (p / 100), rev: partnerReach * (p / 100) * blendedARPU * 12 * 0.5 / 1000 }));
  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Adoption Analytics</div>
        <h2>Subscribers<span className="sm-cyan">.</span></h2>
        <p>3.2B addressable reach across 53+ MNO partners. Penetration rate is the single most important variable. 1% = 32M subscribers.</p>
      </div>

      {/* KPI Dashboard — Glass grid */}
      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
        {[
          { label: 'Total Reach', value: `${(partnerReach / 1000).toFixed(1)}B`, sub: '53+ MNOs', color: 'var(--sky)' },
          { label: 'Penetration', value: `${penetrationRate}%`, sub: 'Model assumption', color: 'var(--cyan)' },
          { label: 'Potential Subs', value: `${calc.potentialSubs.toFixed(0)}M`, sub: 'Reach x penetration', color: 'var(--mint)' },
          { label: 'Price / Sub', value: `$${calc.pricePerSub.toFixed(0)}`, sub: 'Market Cap / subs', color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-mono-xl" style={{ color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>
      {/* Breakdown — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Partner Breakdown</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-p0">
          {partners.map((p, i) => (
            <div key={p.name} className="sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px' }}>
              <span className="sm-text-13t">{p.name}</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--cyan)' } as React.CSSProperties}>{p.subs}M</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--text3)' } as React.CSSProperties}>{((p.subs / partnerReach) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sensitivity — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Penetration Sensitivity</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-p0">
          <div className="sm-grid-header" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr' }}>
            {['Pen%', 'Subs', 'Rev/yr', '$/Sub'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Pen%' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {scenarios.map((s, i) => (
            <div key={s.p} className="sm-grid-row" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr' }}>
              <span className="sm-mono-val" style={{ '--val-color': s.p === penetrationRate ? 'var(--cyan)' : 'var(--text)', fontWeight: s.p === penetrationRate ? 600 : 400 } as React.CSSProperties}>{s.p}%</span>
              <span className="sm-mono-right">{s.subs.toFixed(0)}M</span>
              <span className="sm-mono-right sm-mint">${s.rev.toFixed(1)}B</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--text3)' } as React.CSSProperties}>${(calc.marketCap / s.subs).toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div className="sm-divider">
        <span className="sm-param-label">Parameters</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-2">
        <OverviewParameterCard title="Reach (M)" explanation="Total addressable subscribers through MNO partner networks. Larger reach = bigger revenue opportunity." options={[1000, 2000, 3200, 4500, 6000, 8000]} value={partnerReach} onChange={setPartnerReach} format="B" currentValue={3200} />
        <OverviewParameterCard title="Penetration %" explanation="Subscriber penetration rate into addressable market. 1% of 3.2B = 32M paying subscribers." options={[0.5, 1, 2, 3, 5, 8]} value={penetrationRate} onChange={setPenetrationRate} format="%" currentValue={3} />
      </div>
      <div className="sm-grid-2 sm-mt-12">
        <OverviewParameterCard title="ARPU ($)" explanation="Average revenue per user per month. Higher ARPU = more revenue per subscriber. Blended across markets." options={[5, 10, 15, 18, 25, 35]} value={blendedARPU} onChange={setBlendedARPU} format="$" currentValue={18} />
      </div>
      
      <CFANotes title="CFA Level III — Subscriber Economics" items={[
        { term: 'Total Addressable Market (TAM)', def: '3.2B subscribers across 53+ MNO partners. But TAM ≠ revenue — penetration rate is the key variable.' },
        { term: 'Penetration Rate', def: 'Percentage of partner subscribers who adopt ASTS service. 1% = 32M subs. Historical satellite adoption suggests 1-5% realistic.' },
        { term: 'ARPU (Average Revenue Per User)', def: 'Monthly revenue per subscriber. Blended across markets. Developed markets higher (~$25), emerging lower (~$10).' },
        { term: 'Price per Subscriber', def: 'Market Cap ÷ Potential Subs. Valuation metric. Compare to traditional telco acquisitions ($300-500/sub).' },
        { term: 'Revenue Share', def: 'Typically 50/50 with MNO partners. ASTS provides space infrastructure, MNOs provide spectrum and distribution.' },
        { term: 'Sensitivity Analysis', def: 'Test different penetration scenarios. Small changes in penetration dramatically impact revenue and valuation.' },
      ]} />
    </div>
  );
};

const RevenueTab = ({ calc, revenueShare, setRevenueShare, govRevenue, setGovRevenue, revenueSources, contractedRevenue }) => {
  const ramp = [{ year: '2025', commercial: 0, gov: 0.05, gateway: 0.015 }, { year: '2026', commercial: 0.3, gov: 0.15, gateway: 0.05 }, { year: '2027', commercial: 1.5, gov: 0.25, gateway: 0.08 }, { year: '2028', commercial: 4.0, gov: 0.35, gateway: 0.1 }, { year: '2029', commercial: 7.0, gov: 0.45, gateway: 0.1 }, { year: '2030', commercial: 11.0, gov: 0.5, gateway: 0.1 }];
  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Financial Engine</div>
        <h2>Revenue<span className="sm-mint">.</span></h2>
        <p>MNO 50/50 revenue share, Gateway services, Government contracts, and spectrum. $1B+ contracted across the partnership ecosystem.</p>
      </div>

      {/* Revenue KPIs — Glass grid */}
      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
        {[
          { label: 'Gross Revenue', value: `$${(calc.grossAnnualRev / 1000).toFixed(1)}B`, color: 'var(--cyan)' },
          { label: 'Revenue Share', value: `${revenueShare}%`, color: 'var(--sky)' },
          { label: 'Contracted', value: `$${contractedRevenue}M+`, color: 'var(--violet)' },
          { label: 'ASTS Revenue', value: `$${(calc.astsAnnualRev / 1000).toFixed(1)}B`, color: 'var(--mint)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-kpi-hero" style={{ '--kpi-color': kpi.color, marginTop: 8 } as React.CSSProperties}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Revenue Sources — Glass panel precision list */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Revenue Sources</span>
          <UpdateIndicators sources={['PR', 'SEC', 'WS']} />
        </div>
        <div className="sm-p0">
          {revenueSources.map((r, i) => (
            <div key={i} className="sm-grid-row-lg sm-flex-between">
              <div className="sm-flex sm-gap-12">
                <span className="sm-dot-4" style={{ '--dot-color': r.status.includes('Active') ? 'var(--mint)' : 'var(--text3)' } as React.CSSProperties} />
                <span className="sm-text-13t sm-fw-500">{r.source}</span>
                <span className="sm-subtle">{r.description}</span>
              </div>
              <span className="sm-badge-dynamic" style={{ '--badge-color': r.status.includes('Active') ? 'var(--mint)' : 'var(--text3)' } as React.CSSProperties}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Ramp — Glass panel chart */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Revenue Ramp Projection</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-card-body">
          <ResponsiveContainer width="100%" height={220}><AreaChart data={ramp}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="year" stroke="var(--text3)" fontSize={11} /><YAxis stroke="var(--text3)" tickFormatter={v => `$${v}B`} fontSize={11} /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} /><Legend wrapperStyle={{ fontSize: 11 }} /><Area type="monotone" dataKey="commercial" stackId="1" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.5} /><Area type="monotone" dataKey="gov" stackId="1" stroke="var(--gold)" fill="var(--gold)" fillOpacity={0.5} /><Area type="monotone" dataKey="gateway" stackId="1" stroke="var(--violet)" fill="var(--violet)" fillOpacity={0.5} /></AreaChart></ResponsiveContainer>
          <div className="sm-chart-legend">
            {[{ label: 'Commercial', color: 'var(--cyan)' }, { label: 'Government', color: 'var(--gold)' }, { label: 'Gateway', color: 'var(--violet)' }].map(l => (
              <span key={l.label} className="sm-chart-legend-item">
                <span className="sm-legend-swatch" style={{ '--swatch-color': l.color } as React.CSSProperties} />{l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div className="sm-divider">
        <span className="sm-param-label">Parameters</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-2">
        <OverviewParameterCard title="Revenue Share %" explanation="ASTS revenue share from MNO partnerships. Higher share = more revenue retained per subscriber." options={[20, 30, 40, 50, 60, 70]} value={revenueShare} onChange={setRevenueShare} format="%" currentValue={50} />
        <OverviewParameterCard title="Gov Revenue ($M/yr)" explanation="Annual government contract revenue from SDA, DIU, and FirstNet. Diversifies revenue beyond commercial." options={[0, 25, 50, 100, 200, 400]} value={govRevenue} onChange={setGovRevenue} format="$" currentValue={100} />
      </div>

      <CFANotes title="CFA Level III — Revenue Model" items={[
        { term: 'Revenue Share Model', def: 'ASTS typically splits commercial revenue 50/50 with MNO partners. ASTS provides satellite capacity, MNOs provide spectrum and customers.' },
        { term: 'Contracted Revenue', def: '$1B+ in binding commercial commitments. Provides revenue visibility but timing depends on constellation deployment.' },
        { term: 'Gateway Revenue', def: 'Revenue from ground station equipment and services. $14.7M in Q3 2025. More predictable than subscriber-based revenue.' },
        { term: 'Government Contracts', def: 'SDA ($43M), DIU (up to $20M), FirstNet testing. Provides diversification and validation of technology.' },
        { term: 'Revenue Ramp', def: 'S-curve expected: slow 2025-2026 during deployment, accelerating 2027+ as coverage expands and MNOs activate.' },
        { term: 'Gross vs Net', def: 'Gross = total platform revenue. Net to ASTS = gross × revenue share %. Model at ASTS level for earnings.' },
      ]} />
    </div>
  );
};

// ENHANCED PARTNERS TAB - Institutional grade with full spectrum, contracts, and financial details
const PartnersTab = ({ partners, revenueShare, blendedARPU, penetrationRate }) => {
  // State for expandable partner news (matching BMNR adoption-events pattern)
  const [expandedPartnerNews, setExpandedPartnerNews] = useState<Set<number>>(new Set());
  // Filters for partner news timeline (matching BMNR adoption-timeline pattern)
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [partnerFilter, setPartnerFilter] = useState('All');

  // Extract unique categories and partners from PARTNER_NEWS for filters
  const categories = ['All', ...Array.from(new Set(PARTNER_NEWS.map(n => n.category)))];
  const partnerNames = ['All', ...Array.from(new Set(PARTNER_NEWS.map(n => n.partner)))];

  // Filter partner news by category and partner
  const filteredPartnerNews = PARTNER_NEWS.filter(n => {
    const categoryMatch = categoryFilter === 'All' || n.category === categoryFilter;
    const partnerMatch = partnerFilter === 'All' || n.partner === partnerFilter;
    return categoryMatch && partnerMatch;
  });

  // Definitive Commercial Agreements (binding contracts with prepayments/commitments)
  const definitiveAgreements = [
    { 
      partner: 'AT&T', 
      region: 'United States', 
      subs: 200, 
      status: 'Definitive',
      signDate: '2024',
      term: 'Multi-year',
      spectrum: '850 MHz (shared)',
      spectrumType: 'Low-band',
      prepayment: 20,
      prepayStatus: 'Received',
      revenueCommitment: 'Included in $1B+',
      notes: 'First VoLTE call completed. Gateway installations underway.',
      keyMilestones: ['First 2G call Apr 2023', 'First 5G call 2023', 'VoLTE calls 2025']
    },
    { 
      partner: 'Verizon', 
      region: 'United States', 
      subs: 145, 
      status: 'Definitive',
      signDate: 'Oct 2025',
      term: 'Multi-year',
      spectrum: '850 MHz (shared)',
      spectrumType: 'Low-band',
      prepayment: 100,
      prepayStatus: 'Committed (May 2024)',
      revenueCommitment: 'Included in $1B+',
      notes: 'Extends May 2024 $100M commitment. RCS messaging demonstrated.',
      keyMilestones: ['$100M commitment May 2024', 'Definitive agreement Oct 2025', 'VoLTE + RCS demos 2025']
    },
    { 
      partner: 'Vodafone Group', 
      region: 'Europe/Africa', 
      subs: 500, 
      status: 'Definitive',
      signDate: 'Dec 2024',
      term: 'Through 2034',
      spectrum: '2GHz MSS',
      spectrumType: 'Mid-band',
      prepayment: 25,
      prepayStatus: 'Received',
      revenueCommitment: 'Included in $1B+',
      notes: 'SatCo JV for EU. 21/27 EU member states MOUs signed.',
      keyMilestones: ['Original investor 2020', '2034 extension Dec 2024', 'SatCo JV 2025']
    },
    { 
      partner: 'stc Group', 
      region: 'Saudi Arabia/MENA', 
      subs: 80, 
      status: 'Definitive',
      signDate: 'Oct 2025',
      term: '10 years',
      spectrum: 'TBD (local)',
      spectrumType: 'Local MNO',
      prepayment: 175,
      prepayStatus: 'Due by YE 2025',
      revenueCommitment: 'Significant long-term',
      notes: '3 gateways in Saudi. NOC in Riyadh. First MENA deal.',
      keyMilestones: ['MOU early 2023', '$175M prepay announced Oct 2025', 'Q4 2026 service target']
    },
  ];

  // Other Key Partners (MOUs, non-definitive)
  const otherPartners = [
    { partner: 'Vodafone Idea', region: 'India', subs: 250, status: 'Definitive', spectrum: 'TBD', notes: 'June 2025 agreement' },
    { partner: 'Rakuten', region: 'Japan', subs: 5, status: 'Definitive', spectrum: 'LTE', notes: 'Investor. Video calls completed.' },
    { partner: 'Bell Canada', region: 'Canada', subs: 23, status: 'Definitive', spectrum: 'TBD', notes: 'First Canadian VoLTE call 2025' },
    { partner: 'Orange', region: 'Europe/Africa', subs: 220, status: 'MOU', spectrum: 'TBD', notes: 'MoU Mar 2022. Testing in Africa post-BW3. 220M+ mobile customers. Note: Orange launched competing SMS D2D with Skylo (Dec 2025)' },
    { partner: 'Telefonica', region: 'Europe/LatAm', subs: 380, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'TIM', region: 'Italy/Brazil', subs: 100, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'MTN', region: 'Africa', subs: 280, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'Telstra', region: 'Australia', subs: 20, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'Others (35+)', region: 'Global', subs: 1100, status: 'Various', spectrum: 'Various', notes: '50+ total MNO agreements' },
  ];

  // ASTS-Owned Spectrum Holdings
  const ownedSpectrum = [
    {
      name: 'Ligado L-Band',
      band: '1525-1559 MHz',
      size: '40 MHz',
      coverage: 'US + Canada',
      term: '80+ years',
      cost: '$550M + $80M/yr',
      status: 'Closed Oct 2025',
      type: 'MSS Mid-band',
      notes: 'Largest available nationwide spectrum block in US'
    },
    {
      name: 'Additional L-Band',
      band: '1670-1675 MHz',
      size: '5 MHz',
      coverage: 'United States',
      term: '80+ years',
      cost: 'Included above',
      status: 'Closed',
      type: 'Mid-band',
      notes: 'Part of Ligado transaction'
    },
    {
      name: 'EllioSat S-Band',
      band: '1980-2010 / 2170-2200 MHz',
      size: '60 MHz',
      coverage: 'Global (ITU priority)',
      term: 'Ongoing',
      cost: '$64.5M ($26M + $38.5M deferred)',
      status: 'Closed Sept 2025',
      type: 'S-band MSS',
      notes: 'ITU priority rights. Some analyst skepticism on usability.'
    },
  ];

  // Partner Spectrum (shared)
  const partnerSpectrum = [
    { partner: 'AT&T', band: '850 MHz', type: 'Low-band', coverage: 'US nationwide', notes: 'Premium low-band, superior penetration' },
    { partner: 'Verizon', band: '850 MHz', type: 'Low-band', coverage: 'US nationwide', notes: 'Combined with AT&T for ~100% US geo coverage' },
    { partner: 'Vodafone', band: '2GHz MSS', type: 'Mid-band', coverage: 'Europe/Africa', notes: 'Through SatCo JV' },
    { partner: 'Various MNOs', band: '700-2600 MHz', type: 'Low/Mid', coverage: 'Global', notes: '1,150 MHz tunable across 50+ partners' },
  ];

  // Government Contracts
  const govContracts = [
    { agency: 'MDA SHIELD (Golden Dome)', value: 'IDIQ', status: 'Prime Contractor', notes: 'Awarded Jan 16, 2026 - enables future task orders' },
    { agency: 'Space Development Agency (SDA)', value: '$43M', status: 'Active', notes: 'Satellite communications' },
    { agency: 'Defense Innovation Unit (DIU)', value: 'Up to $20M', status: 'Active', notes: 'Via prime contractor' },
    { agency: 'FirstNet (Band 14)', value: 'Testing', status: 'Authorized Apr 2025', notes: 'First responder communications' },
  ];

  const totalPrepay = definitiveAgreements.reduce((s, p) => s + p.prepayment, 0);
  const totalDefinitiveSubs = definitiveAgreements.reduce((s, p) => s + p.subs, 0);
  const totalOtherSubs = otherPartners.reduce((s, p) => s + p.subs, 0);

  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Strategic Ecosystem</div>
        <h2>Partners<span className="sm-mint">.</span></h2>
        <p>50+ MNO agreements covering 3.2B subscribers. $1B+ contracted. 50/50 revenue share. ~80 MHz US spectrum owned/controlled plus 60 MHz S-band global ITU priority.</p>
      </div>

      {/* KPI Dashboard — Glass grid */}
      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
        {[
          { label: 'Contracted', value: '$1B+', sub: 'Hard commitments', color: 'var(--mint)' },
          { label: 'Prepayments', value: `$${totalPrepay}M`, sub: 'Cash received/due', color: 'var(--cyan)' },
          { label: 'MNO Partners', value: '50+', sub: 'Global agreements', color: 'var(--violet)' },
          { label: 'Addressable', value: '3.2B', sub: 'Total subscribers', color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-mono-xl" style={{ color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Stats — Side-by-side panels */}
      <div className="sm-grid-sep-3col sm-rounded-16 sm-overflow-hidden sm-mt-16">
        <div className="sm-card-body sm-bg-surface">
          {[{ l: 'Definitive Partners', v: '4' }, { l: 'Definitive Subs', v: `${totalDefinitiveSubs}M` }, { l: 'Revenue Share', v: '50/50' }].map(r => (
            <div key={r.l} className="sm-kv-row">
              <span className="sm-subtle">{r.l}</span>
              <span className="sm-mono-sm sm-text">{r.v}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-body sm-bg-surface">
          {[{ l: 'US Spectrum', v: '45 MHz', c: 'var(--mint)' }, { l: 'Global Tunable', v: '1,150 MHz', c: 'var(--cyan)' }, { l: 'S-band ITU', v: '60 MHz', c: 'var(--text)' }].map(r => (
            <div key={r.l} className="sm-kv-row">
              <span className="sm-subtle">{r.l}</span>
              <span className="sm-mono-val" style={{ '--val-color': r.c } as React.CSSProperties}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="sm-accent-note" style={{ '--panel-accent': 'var(--mint)' } as React.CSSProperties}>
          <div className="sm-accent-note-title">Why This Matters</div>
          <div className="sm-accent-note-text">More MNO partners → More spectrum → Larger TAM → Revenue share acceleration</div>
        </div>
      </div>

      {/* Definitive Agreements — Glass panel precision list */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Definitive Commercial Agreements</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-overflow-x">
          <div className="sm-grid-header" style={{ gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', minWidth: 700 }}>
            {['Partner', 'Region', 'Subs', 'Spectrum', 'Term', 'Prepay', 'Status'].map(h => (
              <span key={h} className="sm-micro-label">{h}</span>
            ))}
          </div>
          {definitiveAgreements.map((p, i) => (
            <div key={p.partner} style={{ display: 'grid', gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', alignItems: 'center', padding: '16px 24px', borderBottom: i < definitiveAgreements.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', minWidth: 700 }}>
              <span className="sm-text-13t sm-fw-500">{p.partner}</span>
              <span className="sm-text-12">{p.region}</span>
              <span className="sm-mono-val" style={{ '--val-color': 'var(--cyan)' } as React.CSSProperties}>{p.subs}M</span>
              <span className="sm-status-badge" style={{ '--badge-color': 'var(--sky)' } as React.CSSProperties}>{p.spectrum}</span>
              <span className="sm-subtle">{p.term}</span>
              <span className="sm-mono-val" data-weight="600" style={{ '--val-color': 'var(--mint)' } as React.CSSProperties}>${p.prepayment}M</span>
              <span className="sm-text-11">{p.prepayStatus}</span>
            </div>
          ))}
          <div className="sm-grid-row-lg" style={{ gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', borderTop: '1px solid var(--border)', minWidth: 700, borderBottom: 'none' }}>
            <span className="sm-text-12 sm-fw-600 sm-text" style={{ gridColumn: 'span 2' }}>Total Definitive</span>
            <span className="sm-mono-val sm-fw-700" style={{ '--val-color': 'var(--cyan)' } as React.CSSProperties}>{totalDefinitiveSubs}M</span>
            <span /><span />
            <span className="sm-mono-val sm-fw-700" style={{ '--val-color': 'var(--mint)' } as React.CSSProperties}>${totalPrepay}M</span>
            <span />
          </div>
        </div>
      </div>

      {/* Partner Details — Accent-bar panels */}
      <div className="sm-model-grid" style={{ '--cols': 2, marginTop: 8 } as React.CSSProperties}>
        {definitiveAgreements.map(p => (
          <div key={p.partner} className="sm-card-body sm-bg-surface">
            <div className="sm-flex-between sm-items-center sm-mb-16">
              <span className="sm-fw-600 sm-text" style={{ fontSize: 14 }}>{p.partner}</span>
              <UpdateIndicators sources="PR" />
            </div>
            {[
              { l: 'Signed', v: p.signDate },
              { l: 'Term', v: p.term },
              { l: 'Spectrum', v: `${p.spectrum} (${p.spectrumType})` },
              { l: 'Prepayment', v: `$${p.prepayment}M — ${p.prepayStatus}`, hl: true },
              { l: 'Revenue', v: p.revenueCommitment },
            ].map(row => (
              <div key={row.l} className="sm-kv-row">
                <span className="sm-subtle">{row.l}</span>
                <span style={{ fontFamily: row.hl ? "'Space Mono', monospace" : 'inherit', fontSize: 12, color: row.hl ? 'var(--mint)' : 'var(--text2)', fontWeight: row.hl ? 600 : 400 }}>{row.v}</span>
              </div>
            ))}
            <div className="sm-inline-note">{p.notes}</div>
          </div>
        ))}
      </div>

      {/* Spectrum Holdings — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">ASTS-Owned Spectrum</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-p0">
          {ownedSpectrum.map((s, i) => (
            <div key={s.name} style={{ padding: '16px 24px', borderBottom: i < ownedSpectrum.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', borderLeft: '3px solid var(--cyan)', transition: 'background 0.15s' }}>
              <div className="sm-flex-between sm-items-center sm-mb-8">
                <span className="sm-text-13t sm-fw-600">{s.name}</span>
                <span className="sm-status-badge" style={{ '--badge-color': 'var(--mint)' } as React.CSSProperties}>{s.status}</span>
              </div>
              <div className="sm-detail-grid-4">
                {[{ l: 'Band', v: s.band }, { l: 'Size', v: s.size }, { l: 'Coverage', v: s.coverage }, { l: 'Cost', v: s.cost }].map(d => (
                  <div key={d.l}>
                    <div className="sm-detail-label">{d.l}</div>
                    <div className="sm-detail-value">{d.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          Total owned: 45 MHz L-band (US/Canada) + 60 MHz S-band (global ITU priority). $80M/yr ongoing L-band payments.
        </div>
      </div>

      {/* Partner Spectrum — Glass grid */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Partner Spectrum (Shared)</span>
          <UpdateIndicators sources="PR" />
        </div>
        <div className="sm-grid-sep-2col">
          {partnerSpectrum.map(s => (
            <div key={s.partner} className="sm-card-body sm-cell-surface">
              <div className="sm-flex-between sm-items-center sm-mb-6">
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cyan)' }}>{s.partner}</span>
                <span className="sm-status-badge" style={{ '--badge-color': 'var(--sky)' } as React.CSSProperties}>{s.band}</span>
              </div>
              <div className="sm-text-11">{s.type} · {s.coverage}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', opacity: 0.7, marginTop: 2 }}>{s.notes}</div>
            </div>
          ))}
        </div>
        <div className="sm-info-bar" style={{ borderLeft: '3px solid var(--cyan)' }}>
          <strong className="sm-cyan">Key:</strong> AT&T + Verizon 850 MHz = ~100% US geographic coverage. Platform tunable across 1,150 MHz globally.
        </div>
      </div>

      {/* Government Contracts — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Government Contracts</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div className="sm-p0">
          {govContracts.map((g, i) => (
            <div key={g.agency} className="sm-grid-row-lg" style={{ gridTemplateColumns: '1fr 100px 120px 1fr' }}>
              <span className="sm-text-13t sm-fw-500">{g.agency}</span>
              <span className="sm-mono-val" data-weight="600" style={{ '--val-color': 'var(--mint)' } as React.CSSProperties}>{g.value}</span>
              <span className="sm-status-badge" style={{ '--badge-color': 'var(--sky)' } as React.CSSProperties}>{g.status}</span>
              <span className="sm-subtle">{g.notes}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          Total disclosed: $63M+ (plus SHIELD IDIQ). MDA prime contractor status enables future task orders.
        </div>
      </div>

      {/* Other Partners — Glass panel */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Other Key Partners (MOUs & Agreements)</span>
          <UpdateIndicators sources="PR" />
        </div>
        <div className="sm-p0">
          <div className="sm-grid-header" style={{ gridTemplateColumns: '130px 140px 80px 100px 1fr' }}>
            {['Partner', 'Region', 'Subs', 'Status', 'Notes'].map(h => (
              <span key={h} className="sm-micro-label">{h}</span>
            ))}
          </div>
          {otherPartners.map((p, i) => (
            <div key={p.partner} className="sm-grid-row" style={{ gridTemplateColumns: '130px 140px 80px 100px 1fr' }}>
              <span className="sm-text-13t sm-fw-500">{p.partner}</span>
              <span className="sm-text-12">{p.region}</span>
              <span className="sm-mono-val" style={{ '--val-color': 'var(--cyan)' } as React.CSSProperties}>{p.subs}M</span>
              <span className="sm-status-badge" style={{ '--badge-color': p.status === 'Definitive' ? 'var(--mint)' : 'var(--gold)' } as React.CSSProperties}>{p.status}</span>
              <span className="sm-text-11">{p.notes}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Commitments — Glass grid */}
      <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
        {[
          { value: '$1B+', label: 'Total Contracted Revenue', sub: 'Hard commitments, not soft MOUs', color: 'var(--mint)' },
          { value: `$${totalPrepay}M`, label: 'Total Prepayments', sub: 'stc $175M due YE 2025', color: 'var(--cyan)' },
          { value: '50/50', label: 'Revenue Share Model', sub: 'MNOs handle billing/support', color: 'var(--violet)' },
        ].map(c => (
          <div key={c.label} className="sm-kpi-cell">
            <div className="sm-mono-xl" style={{ color: c.color }}>{c.value}</div>
            <div className="sm-text-12 sm-text2 sm-mt-4">{c.label}</div>
            <div className="sm-text-11 sm-text3 sm-mt-2">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Partner Ecosystem Timeline — matches BMNR Ecosystem Intelligence layout */}
      <div className="sm-divider">
        <span className="sm-param-label">Partner Ecosystem</span>
        <span className="sm-divider-line" />
      </div>

      {/* Partner Filter */}
      <div className="sm-panel sm-mt-8 sm-p-24 sm-rounded-16">
        <p className="sm-text2 sm-lh-16 sm-fs-13 sm-bmnr-mb-4-reset">Track news about <strong>ASTS MNO partners</strong> — IoT expansion, connected vehicles, 5G rollouts, coverage expansion</p>
        <p className="sm-subtle-sm sm-italic sm-bmnr-mb-16-reset">Partner-level news affecting commercial deployment and revenue</p>
        <div className="sm-flex-between sm-mb-8">
          <span className="sm-section-label">Filter by Partner</span>
          {partnerFilter !== 'All' && (
            <button
              onClick={() => setPartnerFilter('All')}
              className="sm-bmnr-clear-btn"
              aria-label="Clear partner filter"
            >
              Clear
            </button>
          )}
        </div>
        <div className="sm-flex-wrap sm-gap-6">
          {partnerNames.map(partner => {
            const isSelected = partnerFilter === partner;
            const count = PARTNER_NEWS.filter(n => n.partner === partner).length;
            return (
              <button
                key={partner}
                onClick={() => setPartnerFilter(partner)}
                className="sm-filter-pill"
                data-active={isSelected}
                style={{ '--pill-accent': 'var(--cyan)' } as React.CSSProperties}
                aria-label={`Filter by ${partner}`}
              >
                {partner} ({partner === 'All' ? PARTNER_NEWS.length : count})
              </button>
            );
          })}
        </div>
        {partnerFilter !== 'All' && (
          <div className="sm-mono-sm sm-text3 sm-mt-8 sm-fs-11">
            {partnerFilter} → {filteredPartnerNews.length} results
          </div>
        )}
      </div>

      {/* Category pills row with Expand All button */}
      <div className="sm-flex-between sm-items-center sm-mt-8">
        <div className="sm-flex-wrap sm-gap-6">
          {categories.map(cat => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="sm-filter-pill"
                data-active={isActive}
                style={{ '--pill-accent': 'var(--violet)' } as React.CSSProperties}
                aria-label={`Filter by category: ${cat}`}
              >
                {cat === 'All' ? `All (${PARTNER_NEWS.length})` : `${cat} (${PARTNER_NEWS.filter(n => n.category === cat).length})`}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (expandedPartnerNews.size === filteredPartnerNews.length) {
              setExpandedPartnerNews(new Set());
            } else {
              setExpandedPartnerNews(new Set(filteredPartnerNews.map((_, i) => i)));
            }
          }}
          className="sm-filter-pill sm-nowrap"
          aria-label={expandedPartnerNews.size === filteredPartnerNews.length ? 'Collapse all partner news' : 'Expand all partner news'}
        >
          {expandedPartnerNews.size === filteredPartnerNews.length ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      {/* Partner News Events */}
      <div className="sm-card sm-mt-8">
        {filteredPartnerNews.length > 0 ? (
          filteredPartnerNews.map((news, i) => {
            const isExpanded = expandedPartnerNews.has(i);
            const accentColor = news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)';
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${news.headline} — ${news.impact} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                className="sm-bmnr-news-row"
                style={{ '--news-accent': accentColor, borderBottom: i < filteredPartnerNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' } as React.CSSProperties}
                onClick={() => {
                  const next = new Set(expandedPartnerNews);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpandedPartnerNews(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const next = new Set(expandedPartnerNews);
                    if (isExpanded) next.delete(i);
                    else next.add(i);
                    setExpandedPartnerNews(next);
                  }
                }}
              >
                <div className="sm-flex-between sm-items-start">
                  <div className="sm-flex-1">
                    <div className="sm-flex-wrap sm-gap-6 sm-mb-4">
                      <span className="sm-mono-sm sm-text3 sm-fs-10">{news.date}</span>
                      <span className="sm-micro-badge sm-bmnr-cat-badge" data-type="category">{news.category}</span>
                      <span className="sm-micro-badge sm-bmnr-cat-badge" data-type="company">{news.partner}</span>
                    </div>
                    <div className="sm-text sm-fw-600 sm-lh-14 sm-fs-13">{news.headline}</div>
                  </div>
                  <span className="sm-bmnr-impact-val" style={{ color: accentColor }}>
                    {news.impact === 'Bullish' ? '+' : news.impact === 'Bearish' ? '-' : '~'} {news.impact}
                  </span>
                </div>
                {isExpanded && (
                  <div className="sm-bmnr-news-detail">
                    <div className="sm-text-13 sm-lh-16">{news.summary}</div>

                    {news.astsRelevance && (
                      <div className="sm-bmnr-insight-card" style={{ '--insight-color': 'var(--mint)' } as React.CSSProperties}>
                        <div className="sm-micro-label sm-mint sm-mb-4 sm-ls-1">ASTS Relevance</div>
                        <div className="sm-subtle sm-text2 sm-lh-15">{news.astsRelevance}</div>
                      </div>
                    )}

                    <div className="sm-bmnr-source-text">Source: {news.source}</div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="sm-empty-state">No partner news matching filters</div>
        )}
      </div>

      <CFANotes title="CFA Level III — Partnership Analysis" items={[
        { term: 'Definitive vs MoU', def: 'Definitive = binding commercial agreement with financial terms. MoU = memorandum of understanding, non-binding intent.' },
        { term: 'Prepayment Commitments', def: 'Cash paid upfront against future services. De-risks revenue, shows partner conviction. AT&T: $20M+.' },
        { term: 'Spectrum Access', def: 'MNO spectrum enables ASTS satellites to transmit. 1,150+ MHz tunable across partners. Critical regulatory moat.' },
        { term: 'Exclusivity Terms', def: 'Exclusive vs non-exclusive territories. Exclusivity limits TAM but locks in partners. Monitor contract terms.' },
        { term: 'Revenue Share Economics', def: 'Typically 50/50 split. ASTS provides space infrastructure, MNO provides spectrum, distribution, billing.' },
        { term: 'Partner Concentration', def: 'Top 5 partners represent ~50% of addressable subs. Diversification reduces single-partner risk.' },
      ]} />
    </div>
  );
};

// COMPETITOR INTELLIGENCE TAB - Track competitor activities in satellite D2D space
const CompetitorsTab = () => {
  // State for expandable competitor news
  const [expandedCompetitorNews, setExpandedCompetitorNews] = useState<Set<number>>(new Set());
  // Filters for competitor news timeline
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [competitorFilter, setCompetitorFilter] = useState('All');

  // Extract unique categories and competitors from COMPETITOR_NEWS for filters
  const categories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const competitorNames = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.competitor)))];

  // Filter competitor news by category and competitor, sort by date (newest first)
  const filteredCompetitorNews = COMPETITOR_NEWS.filter(n => {
    const categoryMatch = categoryFilter === 'All' || n.category === categoryFilter;
    const competitorMatch = competitorFilter === 'All' || n.competitor === competitorFilter;
    return categoryMatch && competitorMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Key competitors overview
  const keyCompetitors = [
    {
      name: 'SpaceX Starlink',
      type: 'LEO Broadband + D2D',
      status: 'Operational',
      focus: 'Terminal-based broadband, D2D partnership with T-Mobile',
      threat: 'High',
      notes: 'Largest LEO constellation. D2D beta with T-Mobile for texts/calls. Not full broadband D2D yet.'
    },
    {
      name: 'Amazon Leo',
      type: 'LEO Broadband',
      status: '212 Satellites (Jan 2026)',
      focus: 'Terminal-based broadband (Leo Nano/Pro/Ultra terminals)',
      threat: 'Medium',
      notes: 'Rebranded from Project Kuiper Nov 2025. 7 missions in 2025, enterprise preview live. Not D2D - different market.'
    },
    {
      name: 'Lynk Global',
      type: 'D2D (Text/IoT)',
      status: 'Limited Service',
      focus: 'Text messaging and IoT to unmodified phones',
      threat: 'Low',
      notes: 'Text-only. No voice/data. Limited satellite count. More complementary than competitive.'
    },
    {
      name: 'Apple/Globalstar',
      type: 'Emergency SOS',
      status: 'Operational',
      focus: 'Emergency messaging for iPhone only',
      threat: 'Low',
      notes: 'iPhone-only. Emergency texts only. Not commercial service. Different use case.'
    },
  ];

  return (
    <div className="tab-content">
      <style>{`
        .competitor-card {
          background: var(--bg2);
          border: 1px solid var(--stroke);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .threat-high { border-left: 3px solid var(--red); }
        .threat-medium { border-left: 3px solid var(--gold); }
        .threat-low { border-left: 3px solid var(--mint); }
        .competitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .competitor-name {
          font-weight: 600;
          font-size: 14px;
          color: var(--text1);
        }
        .competitor-type {
          font-size: 11px;
          color: var(--text3);
          padding: 2px 8px;
          background: var(--bg3);
          border-radius: 4px;
        }
        .competitor-detail {
          font-size: 12px;
          color: var(--text2);
          margin-bottom: 4px;
        }
        .competitor-notes {
          font-size: 11px;
          color: var(--text3);
          font-style: italic;
        }
        .news-entry {
          background: var(--bg2);
          border: 1px solid var(--stroke);
          border-radius: 8px;
          margin-bottom: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .news-entry:hover {
          border-color: var(--text3);
        }
        .news-header {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .news-title {
          font-size: 13px;
          color: var(--text1);
          font-weight: 500;
          flex: 1;
        }
        .news-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }
        .news-date {
          font-size: 11px;
          color: var(--text3);
        }
        .news-impact {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }
        .impact-bullish { background: rgba(16, 185, 129, 0.2); color: var(--mint); }
        .impact-bearish { background: rgba(239, 68, 68, 0.2); color: var(--red); }
        .impact-neutral { background: rgba(148, 163, 184, 0.2); color: var(--text3); }
        .news-body {
          padding: 0 16px 16px 16px;
          border-top: 1px solid var(--stroke);
        }
        .news-summary {
          font-size: 12px;
          color: var(--text2);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .news-implication {
          font-size: 12px;
          color: var(--sky);
          padding: 8px 12px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .news-source {
          font-size: 11px;
          color: var(--text3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .news-source a {
          color: var(--sky);
          text-decoration: none;
        }
        .news-source a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Key Competitors Overview */}
      <div className="sm-divider"><span className="sm-param-label">Key Competitors</span><span className="sm-divider-line" /></div>
      <div className="sm-grid-sep-2col sm-mb-16" style={{ gap: 12, background: 'transparent' }}>
        {keyCompetitors.map((comp, i) => (
          <div key={i} className={`competitor-card threat-${comp.threat.toLowerCase()}`}>
            <div className="competitor-header">
              <span className="competitor-name">{comp.name}</span>
              <span className="competitor-type">{comp.type}</span>
            </div>
            <div className="competitor-detail"><strong>Status:</strong> {comp.status}</div>
            <div className="competitor-detail"><strong>Focus:</strong> {comp.focus}</div>
            <div className="competitor-detail"><strong>Threat Level:</strong> <span style={{ color: comp.threat === 'High' ? 'var(--red)' : comp.threat === 'Medium' ? 'var(--gold)' : 'var(--mint)' }}>{comp.threat}</span></div>
            <div className="competitor-notes">{comp.notes}</div>
          </div>
        ))}
      </div>

      {/* Competitor News Timeline */}
      <div className="sm-flex-between sm-items-center" style={{ padding: '32px 0 16px' }}><span className="sm-param-label">Competitor Intelligence ({filteredCompetitorNews.length} events)</span></div>

      {/* Competitor Filter */}
      <div className="sm-mb-12">
        <span style={{ fontSize: 11, color: 'var(--text3)', marginRight: 8 }}>Filter by Competitor:</span>
        <div className="sm-flex-wrap sm-gap-6">
          {competitorNames.map(comp => {
            const isSelected = competitorFilter === comp;
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp).length;
            return (
              <button
                key={comp}
                onClick={() => setCompetitorFilter(comp)}
                className="sm-pill-toggle" data-active={isSelected || undefined}
              >
                {comp} ({comp === 'All' ? COMPETITOR_NEWS.length : count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="sm-flex-wrap sm-gap-6 sm-items-center sm-mb-16">
        {categories.map(cat => {
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="sm-pill-toggle" data-active={isActive || undefined}
            >
              {cat === 'All' ? `All (${COMPETITOR_NEWS.length})` : `${cat} (${COMPETITOR_NEWS.filter(n => n.category === cat).length})`}
            </button>
          );
        })}
        <button
          className="sm-pill-toggle sm-bg-surface2"
          onClick={() => {
            if (expandedCompetitorNews.size === filteredCompetitorNews.length) {
              setExpandedCompetitorNews(new Set());
            } else {
              setExpandedCompetitorNews(new Set(filteredCompetitorNews.map((_, i) => i)));
            }
          }}
        >
          {expandedCompetitorNews.size === filteredCompetitorNews.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Entries */}
      {filteredCompetitorNews.map((news, i) => {
        const isExpanded = expandedCompetitorNews.has(i);
        return (
          <div key={i} className="news-entry" style={{ borderLeft: `3px solid ${news.implication === 'positive' ? 'var(--mint)' : news.implication === 'negative' ? 'var(--red)' : 'var(--text3)'}` }}>
            <div
              className="news-header"
              onClick={() => {
                const newExpanded = new Set(expandedCompetitorNews);
                if (isExpanded) {
                  newExpanded.delete(i);
                } else {
                  newExpanded.add(i);
                }
                setExpandedCompetitorNews(newExpanded);
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>
                  <span className="sm-gold">{news.competitor}</span> • {news.category}
                </div>
                <div className="news-title">{news.headline}</div>
              </div>
              <div className="news-meta">
                <span className="news-date">{news.date}</span>
                <span className={`news-impact impact-${news.implication}`}>
                  {news.implication === 'positive' ? '↑ Good for ASTS' : news.implication === 'negative' ? '↓ Risk for ASTS' : '— Neutral'}
                </span>
                <span className="sm-text3">{isExpanded ? '▼' : '▶'}</span>
              </div>
            </div>
            {isExpanded && (
              <div className="news-body">
                <div className="news-summary">{news.details.map((d, j) => <div key={j}>{d}</div>)}</div>
                {news.thesisComparison && (
                  <div className="news-implication">
                    <strong>ASTS Implication:</strong> {news.thesisComparison}
                  </div>
                )}
                <div className="news-source">
                  <span>Source: {news.source}</span>
                  {news.sourceUrl && (
                    <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer">View Original →</a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {filteredCompetitorNews.length === 0 && (
        <div className="sm-empty-state" style={{ padding: 48 }}>
          No competitor news matching current filters
        </div>
      )}

      {/* Competitive Moat Summary */}
      <div className="sm-divider"><span className="sm-param-label">ASTS Competitive Advantages</span><span className="sm-divider-line" /></div>
      <div className="competitor-card" style={{ borderLeft: '3px solid var(--mint)' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="competitor-detail"><strong>🛰️ True D2D Broadband:</strong> Only solution offering full mobile broadband (voice, data, video) to unmodified smartphones. Starlink D2D is text/voice only.</div>
          <div className="competitor-detail"><strong>📡 MNO Partnerships:</strong> 50+ carrier agreements covering 3.2B+ subscribers. Deep integration vs. Starlink's single T-Mobile deal.</div>
          <div className="competitor-detail"><strong>📶 Spectrum Access:</strong> 1,150+ MHz tunable across partners + owned L-band/S-band. Regulatory moat vs. new entrants.</div>
          <div className="competitor-detail"><strong>🎯 First Mover:</strong> First to demonstrate 5G broadband from space to standard phones. Technology lead of 2+ years.</div>
          <div className="competitor-detail"><strong>🏛️ Government Contracts:</strong> SDA, DIU, MDA SHIELD contracts validate defense use case. Additional revenue stream.</div>
        </div>
      </div>
    </div>
  );
};

// DILUTION & SHARE COUNT TAB - Dedicated dilution tracking (replaces standalone Cash Runway tab)
// Cash/liquidity content now lives in Capital tab's 'liquidity' view
const HYPOTHETICAL_RAISE_AMOUNTS = [250, 500, 750, 1000];

const ASTSDilutionTab = ({ calc, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, debtRate, setDebtRate, currentShares, currentStockPrice }) => {
  const dilution = HYPOTHETICAL_RAISE_AMOUNTS.map(r => ({ r, new: r / currentStockPrice, dil: (r / currentStockPrice) / (currentShares + r / currentStockPrice) * 100, runway: (cashOnHand + r) / quarterlyBurn }));

  return (
    <div className="sm-flex-col">
      {/* Hero */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">Projection Tool</div>
        <h2>Future Dilution<span className="sm-violet">.</span></h2>
        <p>Model the dilution impact of hypothetical equity raises at the current stock price. Adjust cash position and burn rate to see extended runway from potential raises.</p>
      </div>

      {/* Dilution Impact at Different Prices */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Hypothetical Raise Dilution</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div className="sm-p0">
          <div className="sm-grid-header" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {['Raise Amount', 'New Shares', 'Dilution', 'Ext. Runway'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Raise Amount' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {dilution.map((d, i) => (
            <div key={d.r} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: i < dilution.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}>
              <span className="sm-mono-sm sm-text">${d.r}M</span>
              <span className="sm-mono-right">{d.new.toFixed(1)}M</span>
              <span className="sm-mono-right sm-coral">{d.dil.toFixed(1)}%</span>
              <span className="sm-mono-right sm-mint">{d.runway.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          At current price ${currentStockPrice.toFixed(2)}/share. Company states fully funded for 100+ satellites.
        </div>
      </div>

      {/* Parameters */}
      <div className="sm-divider">
        <span className="sm-param-label">Parameters</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-2">
        <OverviewParameterCard title="Cash Position ($M)" explanation="Total cash and equivalents per 8-K. Pro forma post-Feb raises: ~$3,760M." options={[1500, 2000, 2500, 2780, 3500, 3760]} value={cashOnHand} onChange={setCashOnHand} format="$" currentValue={2780} />
        <OverviewParameterCard title="Quarterly Burn ($M)" explanation="Quarterly cash consumption (CapEx + OpEx). Driven by satellite production ramp." options={[500, 400, 350, 300, 200, 150]} value={quarterlyBurn} onChange={setQuarterlyBurn} format="$" currentValue={300} />
      </div>

      <CFANotes title="CFA Level III — Dilution Projections" items={[
        { term: 'Dilution at Different Prices', def: 'At higher stock prices, fewer shares needed to raise same amount. $500M raise at $100/share = 5M shares (1.3% dilution) vs at $50 = 10M shares (2.6%).' },
        { term: 'Runway Extension', def: 'Each raise extends runway proportionally. $500M at $300M/Q burn = +1.7Q. Consider probability-weighted scenarios for modeling.' },
        { term: 'Price Impact', def: 'Large equity raises can depress stock price, creating a feedback loop that increases dilution. Smaller, staged raises via ATM programs minimize this effect.' },
      ]} />
    </div>
  );
};

// CAPITAL TAB - Share structure, offerings, dilution
const CapitalTab = ({ currentShares, currentStockPrice }) => {
  const [capitalView, setCapitalView] = useState('structure');

  // Use imported data from @/data/asts
  const shareClasses = SHARE_CLASSES;
  const totalBasic = TOTAL_BASIC_SHARES;
  const fullyDiluted = FULLY_DILUTED_SHARES;
  const majorShareholders = MAJOR_SHAREHOLDERS;
  const equityOfferings = EQUITY_OFFERINGS;
  const dilutionHistory = DILUTION_HISTORY;
  const sbcHistory = SBC_HISTORY;
  const sbc2025YTD = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.sbc, 0);
  const sbc2025Eng = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.engineering, 0);
  const sbc2025GA = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.gAndA, 0);
  const sbcFY2024 = sbcHistory.filter(h => h.quarter.includes('2024')).reduce((s, h) => s + h.sbc, 0);
  const convertibleNotes = CONVERTIBLE_NOTES;
  const dilutionScenarios = DILUTION_SCENARIOS;
  const totalConvertDilution = convertibleNotes.reduce((sum, n) => sum + n.maxSharesOnConversion, 0);
  const dilutionRef = HYPOTHETICAL_RAISE_AMOUNTS.map(r => ({ r, new: r / currentStockPrice, dil: (r / currentStockPrice) / (currentShares + r / currentStockPrice) * 100, runway: (LIQUIDITY_POSITION.cashAndEquiv + r) / LIQUIDITY_POSITION.quarterlyBurn }));

  const marketCap = currentShares * currentStockPrice;
  const totalVotingShares = TOTAL_VOTING_SHARES;

  return (
    <div className="sm-flex-col">
      <div className="sm-tab-hero">
        <div className="sm-section-label">Financial Position<UpdateIndicators sources="SEC" /></div>
        <h2>Capital Structure<span className="sm-accent">.</span></h2>
        <p>Three-class voting structure with founder control via Class C super-voting shares. ~$5B+ total raised since SPAC. Class A grew from 5.75M (SPAC) to ~290M (Feb 2026). Fully funded for 100+ satellites.</p>
      </div>

      {/* Summary Cards */}
      <div className="sm-divider">
        <span className="sm-param-label">Key Metrics</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-card">
        <div className="sm-card-section">
          <span className="sm-param-label">Key Metrics</span>
        </div>
        <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
          {[
            { label: 'Class A Shares', value: `${shareClasses[0].shares}M`, color: 'var(--sky)' },
            { label: 'Fully Diluted', value: `${fullyDiluted}M`, color: 'var(--violet)' },
            { label: 'Basic Mkt Cap', value: `$${(marketCap / 1000).toFixed(1)}B`, color: 'var(--mint)' },
            { label: 'FD Mkt Cap', value: `$${(fullyDiluted * currentStockPrice / 1000).toFixed(1)}B`, color: 'var(--gold)' },
          ].map(kpi => (
            <div key={kpi.label} className="sm-kpi-cell">
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
        <div className="sm-grid-sep-2col">
          <div className="sm-card-body sm-cell-surface">
            {[
              { label: 'Stock Price', value: `$${currentStockPrice}`, color: 'var(--text)' },
              { label: 'Dilution', value: `+${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(1)}%`, color: 'var(--coral)' },
              { label: 'Class B Shares', value: `${shareClasses[1]?.shares || 0}M`, color: 'var(--text)' },
            ].map(row => (
              <div key={row.label} className="sm-kv-row">
                <span className="sm-subtle">{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="sm-card-body sm-cell-surface">
            {[
              { label: 'Class C Shares', value: `${shareClasses[2]?.shares || 0}M`, color: 'var(--text)' },
              { label: 'Total Basic', value: `${totalBasic}M`, color: 'var(--text)' },
              { label: 'Source', value: 'SEC', color: 'var(--text3)' },
            ].map(row => (
              <div key={row.label} className="sm-kv-row">
                <span className="sm-subtle">{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sm-highlight-bar" style={{ '--bar-accent-1': 'var(--mint)', '--bar-accent-2': 'var(--violet)' } as React.CSSProperties}>
          <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Multi-Class Structure</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4 }}>
            Three share classes with different voting rights. Significant dilution from warrants, RSUs, and convertible instruments.
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="sm-divider">
        <span className="sm-param-label">Navigation</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-cap-nav" style={{ '--cap-cols': 7 } as React.CSSProperties}>
        {[
          { id: 'structure', value: `${shareClasses.length}`, label: 'Share Classes', sub: 'Class A, B, C' },
          { id: 'shareholders', value: `${majorShareholders.length}`, label: 'Major Holders', sub: 'Strategic + founder' },
          { id: 'offerings', value: `${equityOfferings.length}`, label: 'Capital Events', sub: 'IPO to converts' },
          { id: 'incentives', value: `${sbcHistory.length}`, label: 'SBC Quarters', sub: 'Compensation data' },
          { id: 'dilution', value: `${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(0)}%`, label: 'Total Dilution', sub: `${fullyDiluted}M FD shares` },
          { id: 'liquidity', value: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, label: 'Liquidity', sub: `~${(LIQUIDITY_POSITION.cashAndEquiv / 300).toFixed(0)}Q runway` },
          { id: 'insiders', value: `${FEB_2026_RSU_VESTINGS.length + DEC_2025_INSIDER_SALES.length + AUG_SEP_2025_INSIDER_SALES.length}`, label: 'Insider Activity', sub: 'Form 4 filings' },
        ].map(nav => (
          <div
            key={nav.id}
            className="sm-cap-nav-item"
            data-active={capitalView === nav.id ? 'true' : undefined}
            onClick={() => setCapitalView(nav.id)}
          >
            <div className="sm-cap-nav-value">{nav.value}</div>
            <div className="sm-cap-nav-label">{nav.label}</div>
            <div className="sm-cap-nav-sub">{nav.sub}</div>
          </div>
        ))}
      </div>
      
      {/* Share Structure View */}
      {capitalView === 'structure' && (
      <>
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Share Class Structure</span>
        </div>
        <div className="sm-cap-table-scroll">
          <div style={{ minWidth: 520 }}>
            {/* Header */}
            <div className="sm-cap-table-header" style={{ gridTemplateColumns: '1fr 100px 100px 120px 1fr' }}>
              {['Class', 'Shares (M)', '% of Basic', 'Voting', 'Description'].map((h, idx) => (
                <span key={h} className="sm-cap-th" data-align={[1, 2].includes(idx) ? 'right' : undefined}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {shareClasses.map((sc, i) => (
              <div key={i} className="sm-cap-table-row" style={{ gridTemplateColumns: '1fr 100px 100px 120px 1fr' }}>
                <span className="sm-cap-td-label">{sc.classType}</span>
                <span className="sm-cap-td" data-align="right" data-highlight>{sc.shares}</span>
                <span className="sm-cap-td" data-align="right">{(sc.shares / totalBasic * 100).toFixed(1)}%</span>
                <span className="sm-cap-td">{sc.votingRights}</span>
                <span className="sm-cap-td">{sc.description}</span>
              </div>
            ))}
            {/* Total Basic */}
            <div className="sm-cap-table-total" style={{ gridTemplateColumns: '1fr 100px 100px 120px 1fr' }}>
              <span className="sm-cap-td-label">Total Basic</span>
              <span className="sm-cap-td" data-align="right">{totalBasic.toFixed(1)}</span>
              <span className="sm-cap-td" data-align="right">100%</span>
              <span className="sm-cap-td"></span>
              <span className="sm-cap-td"></span>
            </div>
            {/* FD Row */}
            <div className="sm-cap-table-row" style={{ gridTemplateColumns: '1fr 100px 100px 120px 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <span className="sm-cap-td-label">Fully Diluted</span>
              <span className="sm-cap-td" data-align="right" data-highlight>{fullyDiluted.toFixed(1)}</span>
              <span className="sm-cap-td" data-align="right">{(fullyDiluted / totalBasic * 100).toFixed(1)}%</span>
              <span className="sm-cap-td" style={{ gridColumn: 'span 2', color: 'var(--text3)', fontWeight: 400 }}>+{(fullyDiluted - totalBasic).toFixed(1)}M from converts, options, RSUs</span>
            </div>
          </div>
        </div>
        <div className="sm-card-body">
          <div style={{ fontSize: 13, color: 'var(--text3)' }}>
            Multi-class structure with 10x super-voting Class C shares. NASDAQ: ASTS.
          </div>
        </div>
      </div>

      {/* Voting Power Analysis */}
      <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
        <div className="sm-card-body sm-bg-surface">
          <div className="sm-param-label sm-mb-16">Economic Ownership</div>
          {[
            { l: 'Class A (Public)', v: `${(shareClasses[0].shares / totalBasic * 100).toFixed(1)}%`, color: 'var(--sky)' },
            { l: 'Class B (Insiders)', v: `${(11.2 / totalBasic * 100).toFixed(1)}%`, color: 'var(--violet)' },
            { l: 'Class C (Abel Avellan)', v: `${(78.2 / totalBasic * 100).toFixed(1)}%`, color: 'var(--gold)' },
          ].map(r => (
            <div key={r.l} className="sm-kv-row-lg">
              <span className="sm-subtle">{r.l}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.color, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-body sm-bg-surface">
          <div className="sm-param-label sm-mb-16">Voting Power (C = 10x)</div>
          {[
            { l: 'Class A (Public)', v: `${(shareClasses[0].shares / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--sky)' },
            { l: 'Class B (Insiders)', v: `${(11.2 / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--violet)' },
            { l: 'Class C (Abel Avellan)', v: `${(78.2 * 10 / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--gold)', hl: true },
          ].map(r => (
            <div key={r.l} className="sm-kv-row-lg">
              <span style={{ fontSize: 12, color: r.hl ? 'var(--text)' : 'var(--text3)', fontWeight: r.hl ? 600 : 400 }}>{r.l}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.color, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sm-note-panel">
        <strong className="sm-gold">Note:</strong> Abel Avellan maintains ~73% voting control despite ~22% economic ownership via Class C super-voting shares.
      </div>
      </>
      )}

      {/* Major Shareholders View */}
      {capitalView === 'shareholders' && (
      <>
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Major Shareholders (Known from SEC Filings)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-cap-table-scroll">
        <div style={{ minWidth: 620 }}>
          <div className="sm-cap-table-header" style={{ gridTemplateColumns: '1fr 100px 90px 80px 80px 80px 1fr' }}>
            <span className="sm-cap-th">Shareholder</span>
            <span className="sm-cap-th">Role</span>
            <span className="sm-cap-th" data-align="right">Shares (M)</span>
            <span className="sm-cap-th">Class</span>
            <span className="sm-cap-th" data-align="right">% Own</span>
            <span className="sm-cap-th" data-align="right">% Vote</span>
            <span className="sm-cap-th">Notes</span>
          </div>
          {majorShareholders.map((sh, i) => (
            <div key={i} className="sm-cap-table-row" style={{ gridTemplateColumns: '1fr 100px 90px 80px 80px 80px 1fr' }}>
              <span className="sm-cap-td-label">{sh.name}</span>
              <span className="sm-cap-td">{sh.role}</span>
              <span className="sm-cap-td" data-align="right">{typeof sh.shares === 'number' ? sh.shares.toFixed(1) : sh.shares}</span>
              <span className="sm-cap-td">{sh.shareClass}</span>
              <span className="sm-cap-td" data-align="right">{sh.pct}%</span>
              <span className="sm-cap-td" data-align="right">{sh.votingPct}%</span>
              <span className="sm-cap-td">{sh.notes}</span>
            </div>
          ))}
        </div>
        </div>
        <div className="sm-card-body">
        <div className="sm-text-13 sm-text3">
          Data from 13F (institutional) and DEF 14A (insiders). Strategic shares based on converts and PIPE disclosures.
        </div>
        </div>
      </div>
      </>
      )}

      {/* Equity Offerings View */}
      {capitalView === 'offerings' && (
      <>
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Equity Offerings Timeline<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-cap-table-scroll">
        <div style={{ minWidth: 560 }}>
          <div className="sm-cap-table-header" style={{ gridTemplateColumns: '100px 1fr 100px 100px 80px 90px' }}>
            <span className="sm-cap-th">Date</span>
            <span className="sm-cap-th">Event</span>
            <span className="sm-cap-th">Type</span>
            <span className="sm-cap-th" data-align="right">Amount</span>
            <span className="sm-cap-th" data-align="right">Price</span>
            <span className="sm-cap-th" data-align="right">Shares (M)</span>
          </div>
          {equityOfferings.map((offering, i) => (
            <div key={i} className="sm-cap-table-row" style={{ gridTemplateColumns: '100px 1fr 100px 100px 80px 90px' }}>
              <span className="sm-cap-td-label">{offering.date}</span>
              <span className="sm-cap-td" style={{ fontWeight: 500 }}>{offering.event}</span>
              <span className="sm-cap-td">{offering.type}</span>
              <span className="sm-cap-td" data-align="right">${offering.amount}M</span>
              <span className="sm-cap-td" data-align="right">{offering.price ? `$${offering.price.toFixed(2)}` : '\u2014'}</span>
              <span className="sm-cap-td" data-align="right">{offering.shares ? offering.shares.toFixed(1) : '\u2014'}</span>
            </div>
          ))}
          <div className="sm-cap-table-total" style={{ gridTemplateColumns: '100px 1fr 100px 100px 80px 90px' }}>
            <span className="sm-cap-td-label" style={{ gridColumn: 'span 3' }}>Total Capital Raised (2019-2026)</span>
            <span className="sm-cap-td" data-align="right">~$6.3B</span>
            <span className="sm-cap-td" style={{ gridColumn: 'span 2' }}></span>
          </div>
        </div>
        </div>
        <div className="sm-card-body">
        <div className="sm-text-13 sm-text3">
          Equity + Convertibles + ATM + Registered Directs. Feb 2026: $1B converts + ~$614M RDs. Fully funded for 100+ satellites.
        </div>
        </div>
      </div>
      </>
      )}

      {/* SBC View */}
      {capitalView === 'incentives' && (
      <>
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Stock-Based Compensation (SBC)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-card-body">
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 100px 100px', padding: 0 }}>
            <span className="sm-table-header">Quarter</span>
            <span className="sm-table-header sm-text-right">Total SBC</span>
            <span className="sm-table-header sm-text-right">Engineering</span>
            <span className="sm-table-header sm-text-right">G&A</span>
          </div>
          {sbcHistory.map((row, i) => (
            <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px', padding: '12px 16px', borderBottom: i < sbcHistory.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span className="sm-text-13t">{row.quarter}</span>
              <span className="sm-mono-right">${row.sbc.toFixed(1)}M</span>
              <span className="sm-mono-right">${row.engineering.toFixed(1)}M</span>
              <span className="sm-mono-right">${row.gAndA.toFixed(1)}M</span>
            </div>
          ))}
        </div>

        {/* SBC Chart */}
        <div style={{ height: 192 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...sbcHistory].reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`$${Number(v).toFixed(1)}M`]} />
              <Bar dataKey="engineering" stackId="a" fill="var(--violet)" name="Engineering" />
              <Bar dataKey="gAndA" stackId="a" fill="var(--sky)" name="G&A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="sm-grid-2-lg">
          <div className="sm-stat-card">
            <div className="sm-subtle">2025 YTD SBC</div>
            <div className="sm-stat-card-value" style={{ '--stat-color': 'var(--violet)' } as React.CSSProperties}>${sbc2025YTD.toFixed(1)}M</div>
            <div className="sm-subtle">Q1-Q3 2025</div>
          </div>
          <div className="sm-stat-card">
            <div className="sm-subtle">FY2024 Total SBC</div>
            <div className="sm-stat-card-value" style={{ '--stat-color': 'var(--violet)' } as React.CSSProperties}>${sbcFY2024.toFixed(1)}M</div>
            <div className="sm-subtle">Full year</div>
          </div>
        </div>

        <div className="sm-text-13 sm-text3">
          SBC consists of RSUs and stock options. Included in GAAP OpEx but excluded from Adjusted OpEx.
        </div>
        </div>
      </div>
      </>
      )}

      {/* Dilution Analysis View */}
      {capitalView === 'dilution' && (
      <>
      {/* Dilution KPIs */}
      <div className="sm-model-grid" style={{ '--cols': 5 } as React.CSSProperties}>
        {[
          { label: 'Basic Shares', value: `${totalBasic.toFixed(0)}M`, sub: 'A + B + C', color: 'var(--sky)' },
          { label: 'Fully Diluted', value: `${fullyDiluted}M`, sub: `+${(fullyDiluted - totalBasic).toFixed(0)}M potential`, color: 'var(--violet)' },
          { label: 'Dilution Gap', value: `${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(1)}%`, sub: 'FD vs Basic', color: 'var(--coral)' },
          { label: 'Convert Dilution', value: `${totalConvertDilution.toFixed(1)}M`, sub: `${convertibleNotes.length} note series`, color: 'var(--gold)' },
          { label: 'ATM Remaining', value: `~$${LIQUIDITY_POSITION.atmRemaining}M`, sub: 'Shelf capacity', color: 'var(--mint)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-kpi-hero" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Convertible Notes Detail */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Outstanding Convertible Notes</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div className="sm-callout" style={{ '--callout-color': 'var(--violet)' } as React.CSSProperties}>
          <strong className="sm-violet">Dilution Risk:</strong> Converts only dilute if stock price exceeds conversion price. Company may repurchase for cash instead. Total potential: +{totalConvertDilution.toFixed(1)}M shares.
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 100px 80px 100px 80px' }}>
            {['Note', 'Outstanding', 'Conv. Price', 'Rate', 'Max Shares', 'Status'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Note' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {convertibleNotes.map((note, i) => (
            <div key={note.name} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 100px 80px 100px 80px' }}>
              <span className="sm-text-12 sm-text">{note.name}</span>
              <span className="sm-mono-right">${note.outstandingPrincipal}M</span>
              <span className="sm-mono-right">${note.conversionPrice.toFixed(2)}</span>
              <span className="sm-mono-right">{note.couponRate}%</span>
              <span className="sm-mono-right sm-coral">+{note.maxSharesOnConversion.toFixed(1)}M</span>
              <span style={{ fontSize: 11, color: note.status === 'outstanding' ? 'var(--mint)' : 'var(--gold)', textAlign: 'right' }}>{note.status === 'partially-repurchased' ? 'partial' : note.status}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px 100px 80px', padding: '12px 24px', background: 'var(--accent-dim)' }}>
            <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--text2)', textAlign: 'right', fontWeight: 600 }}>${convertibleNotes.reduce((s, n) => s + n.outstandingPrincipal, 0).toFixed(1)}M</span>
            <span></span><span></span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--coral)', textAlign: 'right', fontWeight: 600 }}>+{totalConvertDilution.toFixed(1)}M</span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Fully Diluted Share Count Scenarios */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Fully Diluted Scenarios</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 1fr 120px 100px 100px' }}>
            {['Scenario', 'Source', 'New Shares', 'FD Total', 'Dilution'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Scenario' || h === 'Source' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {dilutionScenarios.map((s, i) => (
            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px 100px', padding: '12px 24px', borderBottom: i < dilutionScenarios.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', background: s.type === 'stress' ? 'color-mix(in srgb, var(--coral) 3%, transparent)' : 'transparent', transition: 'background 0.15s' }}>
              <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: s.type === 'current' ? 600 : 400 }}>{s.label}</span>
              <span className="sm-text-11">{s.source}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: s.newShares > 0 ? 'var(--coral)' : 'var(--text2)', textAlign: 'right' }}>{s.newShares > 0 ? `+${s.newShares.toFixed(1)}M` : '—'}</span>
              <span className="sm-mono-right">{s.resultingFD.toFixed(1)}M</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: s.dilutionPct > 0 ? 'var(--coral)' : 'var(--mint)', textAlign: 'right' }}>{s.dilutionPct > 0 ? `${s.dilutionPct.toFixed(1)}%` : '—'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hypothetical Raise Dilution (reference) */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Hypothetical Raise Dilution</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div className="sm-p0">
          <div className="sm-grid-header" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {['Raise Amount', 'New Shares', 'Dilution', 'Ext. Runway'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Raise Amount' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {dilutionRef.map((d, i) => (
            <div key={d.r} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: i < dilutionRef.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}>
              <span className="sm-mono-sm sm-text">${d.r}M</span>
              <span className="sm-mono-right">{d.new.toFixed(1)}M</span>
              <span className="sm-mono-right sm-coral">{d.dil.toFixed(1)}%</span>
              <span className="sm-mono-right sm-mint">{d.runway.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          At current price ${currentStockPrice.toFixed(2)}/share using ${LIQUIDITY_POSITION.cashAndEquiv}M cash, ${LIQUIDITY_POSITION.quarterlyBurn}M/Q burn.
        </div>
      </div>

      {/* Share Count Evolution */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Share Count Evolution (2019-2026)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div className="sm-card-body">
          <div>
            <div className="sm-grid-header" style={{ gridTemplateColumns: '100px 100px 100px 120px 1fr' }}>
              <span className="sm-table-header">Quarter</span>
              <span className="sm-table-header sm-text-right">Class A (M)</span>
              <span className="sm-table-header sm-text-right">Implied (M)</span>
              <span className="sm-table-header sm-text-right">Fully Diluted (M)</span>
              <span className="sm-table-header">Key Event</span>
            </div>
            {dilutionHistory.map((row, i) => (
              <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '100px 100px 100px 120px 1fr', padding: '12px 16px', borderBottom: i < dilutionHistory.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
                <span className="sm-text-13t">{row.quarter}</span>
                <span className="sm-mono-right">{row.classA.toFixed(1)}</span>
                <span className="sm-mono-right">{row.implied.toFixed(1)}</span>
                <span className="sm-mono-right">{row.fullyDiluted.toFixed(1)}</span>
                <span className="sm-text-13">{row.event}</span>
              </div>
            ))}
          </div>
          <div className="sm-mt-16" style={{ height: 256 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...dilutionHistory].reverse()}>
                <defs>
                  <linearGradient id="classAGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--sky)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--sky)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="fdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`${Number(v).toFixed(1)}M shares`]} />
                <Area type="monotone" dataKey="fullyDiluted" stroke="var(--gold)" fill="url(#fdGrad)" name="Fully Diluted" />
                <Area type="monotone" dataKey="classA" stroke="var(--sky)" fill="url(#classAGrad)" name="Class A" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="sm-flex sm-gap-16 sm-text-12">
            <div className="sm-flex">
              <div className="sm-legend-swatch-sq" style={{ '--swatch-color': 'var(--sky)' } as React.CSSProperties}></div>
              <span className="sm-text2">Class A (Public)</span>
            </div>
            <div className="sm-flex">
              <div className="sm-legend-swatch-sq" style={{ '--swatch-color': 'var(--gold)' } as React.CSSProperties}></div>
              <span className="sm-text2">Fully Diluted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Equity / SBC */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section">
          <span className="sm-param-label">Employee Equity Plans / SBC</span>
        </div>
        <div className="sm-grid-sep-2col">
          <div className="sm-card-body sm-bg-surface">
            <div className="sm-subtle">2025 YTD SBC (Q1-Q3)</div>
            <div className="sm-kpi-hero" style={{ '--kpi-color': 'var(--violet)', marginTop: 4 } as React.CSSProperties}>${sbc2025YTD.toFixed(1)}M</div>
            <div className="sm-text-11 sm-mt-8 sm-mt-4">Engineering ${sbc2025Eng.toFixed(1)}M + G&A ${sbc2025GA.toFixed(1)}M</div>
          </div>
          <div className="sm-card-body sm-bg-surface">
            <div className="sm-subtle">FY2024 Total SBC</div>
            <div className="sm-kpi-hero" style={{ '--kpi-color': 'var(--violet)', marginTop: 4 } as React.CSSProperties}>${sbcFY2024.toFixed(1)}M</div>
            <div className="sm-text-11 sm-mt-8 sm-mt-4">Full year from 10-K</div>
          </div>
        </div>
        <div className="sm-card-footer">
          SBC consists of RSUs and stock options. Included in GAAP OpEx but excluded from Adjusted OpEx. Creates future dilution when vested.
        </div>
      </div>
      </>
      )}

      {/* Liquidity / Cash Runway View (consolidated from former standalone tab) */}
      {capitalView === 'liquidity' && (
      <>
      {/* Treasury Dashboard KPIs */}
      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
        {[
          { label: 'Cash (8-K)', value: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, sub: 'Dec 31, 2025', color: 'var(--mint)' },
          { label: 'Pro Forma Cash', value: `$${(LIQUIDITY_POSITION.cashProForma / 1000).toFixed(1)}B`, sub: 'Post-Feb 2026', color: 'var(--sky)' },
          { label: 'Quarterly Burn', value: `$${LIQUIDITY_POSITION.quarterlyBurn}M`, sub: 'CapEx + OpEx', color: 'var(--coral)' },
          { label: 'Runway (8-K)', value: `${(LIQUIDITY_POSITION.cashAndEquiv / LIQUIDITY_POSITION.quarterlyBurn).toFixed(1)}Q`, sub: `~${(LIQUIDITY_POSITION.cashAndEquiv / LIQUIDITY_POSITION.quarterlyBurn / 4).toFixed(1)} years`, color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-kpi-hero" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Cash Runway Scenarios */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Forward-Looking Runway Scenarios</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px' }}>
            {['Scenario', 'Cash', 'Burn/Q', 'Rev/Q', 'Runway'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Scenario' ? 'left' : 'right'}}>{h}</span>
            ))}
          </div>
          {CASH_RUNWAY_SCENARIOS.map((s, i) => (
            <div key={s.label} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 100px 100px 100px' }}>
              <span className="sm-text-12 sm-text">{s.label}</span>
              <span className="sm-mono-right">${(s.startingCash / 1000).toFixed(1)}B</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--coral)' } as React.CSSProperties}>${s.quarterlyBurn}M</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--mint)' } as React.CSSProperties}>${s.quarterlyRevenue}M</span>
              <span className="sm-mono-val sm-text-right" style={{ '--val-color': 'var(--gold)' } as React.CSSProperties}>{s.runwayQuarters.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          Rev/Q includes projected service revenue as burn offset. Runway extends significantly once commercial service begins generating recurring revenue.
        </div>
      </div>

      {/* Debt Outstanding */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section">
          <span className="sm-param-label">Debt Outstanding (Pro Forma Feb 2026)</span>
        </div>
        {(() => {
          const noteColors = ['var(--cyan)', 'var(--mint)', 'var(--coral)', 'var(--sky)'];
          const debtItems = [
            ...convertibleNotes
              .filter(n => n.outstandingPrincipal >= 100)
              .sort((a, b) => b.outstandingPrincipal - a.outstandingPrincipal)
              .map((n, i) => ({
                value: `$${n.outstandingPrincipal.toLocaleString()}M`,
                label: `${n.couponRate.toFixed(2)}% (${n.maturityDate.slice(0, 4)})`,
                sub: n.notes.split('.')[0],
                color: noteColors[i] || 'var(--sky)',
              })),
            { value: `$${LIQUIDITY_POSITION.ubsLoan}M`, label: 'UBS + Secured', sub: 'Ligado related', color: 'var(--violet)' },
          ];
          const totalDebt = convertibleNotes.reduce((s, n) => s + n.outstandingPrincipal, 0) + LIQUIDITY_POSITION.ubsLoan;
          return (
            <>
            <div className="sm-grid-sep" style={{ '--cols': debtItems.length } as React.CSSProperties}>
              {debtItems.map(d => (
                <div key={d.label} className="sm-grid-cell-center">
                  <div className="sm-mono-lg sm-fw-700" style={{ color: d.color }}>{d.value}</div>
                  <div className="sm-micro-text sm-mt-4">{d.label}</div>
                  <div className="sm-micro-text sm-opacity-60">{d.sub}</div>
                </div>
              ))}
            </div>
            <div className="sm-card-footer">
              Total pro forma debt: ~${totalDebt.toLocaleString()}M. Sound Point ${LIQUIDITY_POSITION.soundPointFacility}M facility available for Ligado closing.
            </div>
            </>
          );
        })()}
      </div>

      {/* Position Summary */}
      <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
        <div className="sm-card-body sm-bg-surface">
          <div className="sm-param-label sm-mb-16">Cash Position</div>
          {[
            { l: 'Cash & Equivalents', v: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, hl: true },
            { l: 'Pro Forma Cash', v: `$${(LIQUIDITY_POSITION.cashProForma / 1000).toFixed(1)}B` },
            { l: 'Total Debt', v: `$${(LIQUIDITY_POSITION.totalDebtProForma / 1000).toFixed(1)}B` },
            { l: 'ATM Remaining', v: `$${LIQUIDITY_POSITION.atmRemaining}M` },
          ].map(r => (
            <div key={r.l} className="sm-kv-row-lg">
              <span className="sm-subtle">{r.l}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.hl ? 'var(--mint)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-body sm-bg-surface">
          <div className="sm-param-label sm-mb-16">Debt Facilities</div>
          {[
            { l: 'Sound Point Facility', v: `$${LIQUIDITY_POSITION.soundPointFacility}M`, hl: true },
            { l: 'UBS Loan', v: `$${LIQUIDITY_POSITION.ubsLoan}M` },
            { l: 'Quarterly Burn', v: `$${LIQUIDITY_POSITION.quarterlyBurn}M` },
            { l: 'Blended Rate', v: '~2.15%' },
          ].map(r => (
            <div key={r.l} className="sm-kv-row-lg">
              <span className="sm-subtle">{r.l}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.hl ? 'var(--violet)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Capital Activity */}
      <div className="sm-card sm-mt-8">
        <div className="sm-highlight-bar" style={{ '--bar-accent-1': 'var(--mint)', '--bar-accent-2': 'var(--sky)', padding: '24px', borderTop: 'none' } as React.CSSProperties}>
          <div className="sm-section-label sm-mint" style={{ fontSize: 13 }}>Feb 2026 Capital Activity</div>
          <div className="sm-text-12 sm-lh-16">
            $1B 2.25% converts issued. $46.5M of 4.25% and $250M of 2.375% repurchased. ~$614M registered directs. Net new cash ~$980M.
          </div>
        </div>
      </div>
      </>
      )}

      {/* Insider Activity View */}
      {capitalView === 'insiders' && (
      <>
      {/* Feb 2026 RD Net Dilution + Greenshoe Summary */}
      <div className="sm-model-grid" style={{ '--cols': 5 } as React.CSSProperties}>
        {[
          { label: 'RD Shares Issued', value: `${FEB_2026_RD_NET_DILUTION.sharesIssued}M`, sub: 'Feb 2026 RDs', color: 'var(--coral)' },
          { label: 'Conversion Avoided', value: `${FEB_2026_RD_NET_DILUTION.conversionAvoided}M`, sub: 'Notes repurchased', color: 'var(--mint)' },
          { label: 'Net Incremental', value: `${FEB_2026_RD_NET_DILUTION.netIncremental}M`, sub: `${FEB_2026_RD_NET_DILUTION.netDilutionPct}% dilution`, color: 'var(--gold)' },
          { label: 'Interest Saved', value: `$${FEB_2026_RD_NET_DILUTION.annualInterestSaved}M/yr`, sub: 'Annual savings', color: 'var(--sky)' },
          { label: 'Greenshoe', value: FEB_2026_GREENSHOE.exercised === null ? 'Pending' : FEB_2026_GREENSHOE.exercised ? 'Exercised' : 'Expired', sub: `$${FEB_2026_GREENSHOE.amount}M by ${FEB_2026_GREENSHOE.deadline.slice(5)}`, color: FEB_2026_GREENSHOE.exercised === null ? 'var(--gold)' : (FEB_2026_GREENSHOE.exercised ? 'var(--mint)' : 'var(--coral)') },
        ].map(kpi => (
          <div key={kpi.label} className="sm-kpi-cell">
            <div className="sm-micro-text">{kpi.label}</div>
            <div className="sm-kpi-hero-md" style={{ '--kpi-color': kpi.color, margin: '8px 0 4px' } as React.CSSProperties}>{kpi.value}</div>
            <div className="sm-text-11">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* CEO RSU Grants */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">RSU Grants (Form 4)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        {/* CEO Aug 2025 Grant */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--gold) 3%, transparent)' }}>
          <div className="sm-flex-between">
            <div>
              <span className="sm-text-13t sm-fw-600">{AUG_2025_CEO_RSU_GRANT.name}</span>
              <span className="sm-text-11 sm-text3 sm-ml-4" style={{ marginLeft: 8 }}>{AUG_2025_CEO_RSU_GRANT.role}</span>
            </div>
            <span className="sm-mono-sm sm-text3" style={{ fontSize: 11 }}>{AUG_2025_CEO_RSU_GRANT.date}</span>
          </div>
          <div className="sm-flex sm-gap-24 sm-mt-8">
            <div><span className="sm-text-11">Units: </span><span className="sm-mono-val" style={{ '--val-color': 'var(--gold)' } as React.CSSProperties}>{(AUG_2025_CEO_RSU_GRANT.units / 1000).toFixed(0)}K</span></div>
            <div><span className="sm-text-11">Vesting: </span><span className="sm-text-12">{AUG_2025_CEO_RSU_GRANT.vestingSchedule} from {AUG_2025_CEO_RSU_GRANT.vestingStart}</span></div>
          </div>
          <div className="sm-text-11 sm-mt-8 sm-mt-4">{AUG_2025_CEO_RSU_GRANT.holdingsNote}</div>
        </div>
        {/* Dec 2025 C-Suite Grants */}
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 120px 100px 120px 1fr' }}>
            {['Executive', 'Role', 'RSUs', 'Vesting Start', 'Notes'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'RSUs' ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {DEC_2025_RSU_GRANTS.map((g, i) => (
            <div key={g.name} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 120px 100px 120px 1fr' }}>
              <span className="sm-text-13t">{g.name}</span>
              <span className="sm-text-12">{g.role}</span>
              <span className="sm-mono-right sm-violet">{(g.units / 1000).toFixed(0)}K</span>
              <span className="sm-text-12">{g.vestingStart}</span>
              <span className="sm-text-11">{g.holdingsNote}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feb 2026 RSU Vestings */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">RSU Vestings &amp; Tax Withholding (Feb 2026)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 90px 90px 90px 100px' }}>
            {['Executive', 'Date', 'Vested', 'Tax W/H', 'Net', 'Tax Value'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: ['Vested', 'Tax W/H', 'Net', 'Tax Value'].includes(h) ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {FEB_2026_RSU_VESTINGS.map((v, i) => (
            <div key={i} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 90px 90px 90px 100px' }}>
              <span className="sm-text-13t">{v.name} <span className="sm-text-11">({v.role})</span></span>
              <span className="sm-text-12">{v.date.slice(5)}</span>
              <span className="sm-mono-right">{(v.unitsVested / 1000).toFixed(1)}K</span>
              <span className="sm-mono-right sm-coral">{v.taxWithheld}</span>
              <span className="sm-mono-right sm-mint">{(v.netAcquired / 1000).toFixed(1)}K</span>
              <span className="sm-mono-right">${(v.taxValue / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aug-Sep 2025 RSU Vestings */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">RSU Vestings &amp; Tax Withholding (Aug-Sep 2025)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 90px 90px 90px 100px' }}>
            {['Executive', 'Date', 'Vested', 'Tax W/H', 'Net', 'Tax Value'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: ['Vested', 'Tax W/H', 'Net', 'Tax Value'].includes(h) ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {AUG_SEP_2025_RSU_VESTINGS.map((v, i) => (
            <div key={i} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 90px 90px 90px 100px' }}>
              <span className="sm-text-13t">{v.name} <span className="sm-text-11">({v.role})</span></span>
              <span className="sm-text-12">{v.date.slice(5)}</span>
              <span className="sm-mono-right">{(v.unitsVested / 1000).toFixed(0)}K</span>
              <span className="sm-mono-right sm-coral">{(v.taxWithheld / 1000).toFixed(0)}K</span>
              <span className="sm-mono-right sm-mint">{(v.netAcquired / 1000).toFixed(0)}K</span>
              <span className="sm-mono-right">${(v.taxValue / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insider Sales */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Insider Sales (Form 4)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        {(() => {
          const totalSales = DEC_2025_INSIDER_SALES.reduce((sum, s) => sum + s.proceeds, 0);
          const amtSale = DEC_2025_INSIDER_SALES.find(s => s.name === 'American Tower Corp')?.proceeds || 0;
          const individualSales = totalSales - amtSale;
          return (
            <div className="sm-callout" style={{ '--callout-color': 'var(--coral)' } as React.CSSProperties}>
              <strong className="sm-coral">Dec 2025:</strong> Total sales ~${(totalSales / 1e6).toFixed(1)}M (American Tower ${(amtSale / 1e6).toFixed(1)}M block trade + individual sales ${(individualSales / 1e6).toFixed(1)}M). Most under Rule 10b5-1 plans.
            </div>
          );
        })()}
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px 80px' }}>
            {['Insider', 'Date', 'Shares', 'Price', 'Proceeds', '10b5-1'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: ['Shares', 'Price', 'Proceeds'].includes(h) ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {/* Dec 2025 Sales */}
          <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--coral)', background: 'color-mix(in srgb, var(--coral) 5%, transparent)' }}>December 2025</div>
          {DEC_2025_INSIDER_SALES.map((s, i) => (
            <div key={`dec-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px 80px' }}>
              <span className="sm-text-13t">{s.name} <span className="sm-text-11">({s.role})</span></span>
              <span className="sm-text-12">{s.date.slice(5)}</span>
              <span className="sm-mono-right">{(s.shares / 1000).toFixed(0)}K</span>
              <span className="sm-mono-right">${s.price.toFixed(2)}</span>
              <span className="sm-mono-right sm-coral">${(s.proceeds / 1e6).toFixed(1)}M</span>
              <span style={{ fontSize: 11, color: s.plan10b5_1 ? 'var(--mint)' : 'var(--text3)' }}>{s.plan10b5_1 ? 'Yes' : 'No'}</span>
            </div>
          ))}
          {/* Aug-Sep 2025 Sales */}
          <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--coral)', background: 'color-mix(in srgb, var(--coral) 5%, transparent)' }}>August-September 2025</div>
          {AUG_SEP_2025_INSIDER_SALES.map((s, i) => (
            <div key={`aug-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px 80px' }}>
              <span className="sm-text-13t">{s.name} <span className="sm-text-11">({s.role})</span></span>
              <span className="sm-text-12">{s.date.slice(5)}</span>
              <span className="sm-mono-right">{(s.shares / 1000).toFixed(0)}K</span>
              <span className="sm-mono-right">${s.avgPrice.toFixed(2)}</span>
              <span className="sm-mono-right sm-coral">${(s.proceeds / 1e6).toFixed(1)}M</span>
              <span style={{ fontSize: 11, color: s.plan10b5_1 ? 'var(--mint)' : 'var(--text3)' }}>{s.plan10b5_1 ? 'Yes' : 'No'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insider Purchases */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Insider Purchases (Form 4)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px' }}>
            {['Insider', 'Date', 'Shares', 'Price', 'Account'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: ['Shares', 'Price'].includes(h) ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {DEC_2025_INSIDER_PURCHASES.map((p, i) => (
            <div key={i} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px' }}>
              <span className="sm-text-13t">{p.name} <span className="sm-text-11">({p.role})</span></span>
              <span className="sm-text-12">{p.date.slice(5)}</span>
              <span className="sm-mono-right sm-mint">{p.shares}</span>
              <span className="sm-mono-right">${p.price.toFixed(2)}</span>
              <span className="sm-text-12">{p.account}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          Director Larson accumulated {DEC_2025_INSIDER_PURCHASES.reduce((s, p) => s + p.shares, 0).toLocaleString()} shares via IRA under 10b5-1 plan (adopted Sep 8, 2025). Post-purchase holdings: {DEC_2025_INSIDER_PURCHASES[DEC_2025_INSIDER_PURCHASES.length - 1].postPurchaseHoldings.toLocaleString()} shares.
        </div>
        {/* June 2025 Insider Purchases */}
        <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--mint)', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', borderTop: '1px solid var(--border)' }}>June 2025 — Insider Buys at $25 Dip</div>
        <div>
          {JUN_2025_INSIDER_PURCHASES.map((p, i) => (
            <div key={`jun-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px' }}>
              <span className="sm-text-13t">{p.name} <span className="sm-text-11">({p.role})</span></span>
              <span className="sm-text-12">{p.date.slice(5)}</span>
              <span className="sm-mono-right sm-mint">{p.shares.toLocaleString()}</span>
              <span className="sm-mono-right">${p.price.toFixed(2)}</span>
              <span className="sm-text-12">{p.account}</span>
            </div>
          ))}
        </div>
        {/* April-May 2025 Insider Purchases */}
        <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--mint)', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', borderTop: '1px solid var(--border)' }}>Apr–May 2025 — Insider Buys at $25 Dip</div>
        <div>
          {APR_MAY_2025_INSIDER_PURCHASES.map((p, i) => (
            <div key={`apr-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 80px 80px 100px' }}>
              <span className="sm-text-13t">{p.name} <span className="sm-text-11">({p.role})</span></span>
              <span className="sm-text-12">{p.date.slice(5)}</span>
              <span className="sm-mono-right sm-mint">{p.shares.toLocaleString()}</span>
              <span className="sm-mono-right">${p.price.toFixed(2)}</span>
              <span className="sm-text-12">{p.account}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          Cisneros (1K each) + Johnson (500) at $25 dip. Multiple duplicate Form 4 filings corrected via amendments.
        </div>
      </div>

      {/* March 2025 Insider Sales */}
      <div className="sm-card sm-mt-8">
        <div className="sm-flex-between sm-items-center" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <span className="sm-param-label">March 2025 — RSU Vesting Sales & Withholdings</span>
          <span className="sm-mono-sm" style={{ color: 'var(--rose)' }}>~111K shares / $3.4M</span>
        </div>
        <div className="sm-grid-header sm-th" style={{ gridTemplateColumns: '1fr 90px 80px 80px 90px 70px', padding: '8px 24px' }}>
          <span>Name</span><span>Date</span><span className="sm-text-right">Shares</span><span className="sm-text-right">Price</span><span className="sm-text-right">Proceeds</span><span>Type</span>
        </div>
        <div>
          {MAR_2025_INSIDER_SALES.map((s, i) => (
            <div key={`mar-sale-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 90px 80px 80px 90px 70px' }}>
              <span className="sm-text-13t">{s.name} <span className="sm-text-11">({s.role})</span></span>
              <span className="sm-text-12">{s.date.slice(5)}</span>
              <span className="sm-mono-right" style={{ color: 'var(--rose)' }}>{s.shares.toLocaleString()}</span>
              <span className="sm-mono-right">${s.price.toFixed(2)}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: s.proceeds > 0 ? 'var(--rose)' : 'var(--text3)', textAlign: 'right' }}>{s.proceeds > 0 ? `$${(s.proceeds / 1000).toFixed(0)}K` : '—'}</span>
              <span style={{ fontSize: 10, color: s.type === 'sale' ? 'var(--rose)' : 'var(--gold)', background: s.type === 'sale' ? 'color-mix(in srgb, var(--rose) 15%, transparent)' : 'color-mix(in srgb, var(--gold) 15%, transparent)', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', fontWeight: 600 }}>{s.type === 'withholding' ? 'W/H' : 'Sale'}</span>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          All RSU vesting-related. Stock peaked $35.49 (Mar 6) after +18% Q4 pop, fell to $22.74 EOM. Routine compensation liquidity.
        </div>
      </div>

      {/* Ligado Deal */}
      <div className="sm-card sm-mt-8">
        <div className="sm-highlight-bar" style={{ '--bar-accent-1': 'var(--gold)', '--bar-accent-2': 'var(--violet)', padding: '24px', borderTop: 'none' } as React.CSSProperties}>
          <div className="sm-section-label sm-gold" style={{ fontSize: 13 }}>Mar 2025 Ligado Material Agreement</div>
          <div className="sm-detail-grid-4 sm-mt-12" style={{ gap: 16 }}>
            {[
              { label: 'Initial Investment', value: `$${MAR_2025_LIGADO_DEAL.initialInvestment}M`, color: 'var(--gold)' },
              { label: 'Total Consideration', value: `$${MAR_2025_LIGADO_DEAL.totalConsideration}M`, color: 'var(--sky)' },
              { label: 'Spectrum', value: `${MAR_2025_LIGADO_DEAL.spectrumMHz} MHz`, color: 'var(--mint)' },
              { label: 'Warrant Dilution', value: `${MAR_2025_LIGADO_DEAL.dilutionPct}%`, color: 'var(--rose)' },
            ].map(item => (
              <div key={item.label}>
                <div className="sm-micro-text">{item.label}</div>
                <div className="sm-mono-lg sm-fw-600" style={{ color: item.color, marginTop: 4 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="sm-grid-sep-2col sm-mt-16" style={{ gap: 16, background: 'transparent' }}>
            <div className="sm-text-12 sm-lh-16">
              <span className="sm-detail-label">Bands:</span> {MAR_2025_LIGADO_DEAL.spectrumBands}
            </div>
            <div className="sm-text-12 sm-lh-16">
              <span className="sm-detail-label">Annual Lease:</span> ${MAR_2025_LIGADO_DEAL.annualLease}M/yr + revenue share
            </div>
          </div>
          <div className="sm-text-11 sm-text3 sm-mt-12" style={{ lineHeight: 1.5 }}>
            {MAR_2025_LIGADO_DEAL.notes}
          </div>
        </div>
      </div>

      {/* S-3ASR Shelf Registration */}
      <div className="sm-card sm-mt-8">
        <div className="sm-flex-between sm-items-center" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <span className="sm-param-label">S-3ASR Shelf Registration (Mar 17, 2025)</span>
          <span className="sm-mono-sm sm-gold">~{(MAR_2025_SHELF_REGISTRATION.dilutionPct)}% Dilution Potential</span>
        </div>
        <div className="sm-grid-sep-3col">
          {[
            { label: 'Total Shares', value: `${(MAR_2025_SHELF_REGISTRATION.totalShares / 1e6).toFixed(1)}M`, color: 'var(--gold)' },
            { label: 'Aggregate Value', value: `$${(MAR_2025_SHELF_REGISTRATION.aggregateValue / 1e9).toFixed(1)}B`, color: 'var(--sky)' },
            { label: 'Fee Calc Price', value: `$${MAR_2025_SHELF_REGISTRATION.pricePerShare}`, color: 'var(--text2)' },
          ].map(item => (
            <div key={item.label} className="sm-cell-surface-center"  >
              <div className="sm-micro-text">{item.label}</div>
              <div className="sm-mono-lg sm-fw-600" style={{ color: item.color, marginTop: 4 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          {MAR_2025_SHELF_REGISTRATION.notes}
        </div>
      </div>

      {/* Jan-Feb 2025 Governance */}
      <div className="sm-card sm-mt-8">
        <div className="sm-flex-between sm-items-center" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <span className="sm-param-label">Jan–Feb 2025 Governance & Grants</span>
          <span className="sm-mono-sm sm-sky">Board + AT&T + RSU</span>
        </div>
        {/* Board Changes */}
        <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--sky)', background: 'color-mix(in srgb, var(--sky) 5%, transparent)' }}>Board Appointments</div>
        {JAN_FEB_2025_GOVERNANCE.boardChanges.map((bc, i) => (
          <div key={`bc-${i}`} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 130px 1fr' }}>
            <span className="sm-text-13t">{bc.name} <span className="sm-text-11">({bc.role})</span></span>
            <span className="sm-text-12">{bc.date.slice(5)}</span>
            <span className="sm-text-12">{bc.event}</span>
          </div>
        ))}
        {/* Stockholders' Amendment */}
        <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--mint)', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', borderTop: '1px solid var(--border)' }}>Stockholders&apos; Agreement (Feb 7)</div>
        <div className="hover-row" style={{ padding: '12px 24px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
          <span className="sm-text-12">{JAN_FEB_2025_GOVERNANCE.stockholdersAmendment.description}. {JAN_FEB_2025_GOVERNANCE.stockholdersAmendment.attDesigneeRights}.</span>
        </div>
        {/* Bernal RSU */}
        <div className="sm-th" style={{ padding: '8px 24px', letterSpacing: '1px', color: 'var(--violet)', background: 'color-mix(in srgb, var(--violet) 5%, transparent)', borderTop: '1px solid var(--border)' }}>RSU Grant (Feb 27)</div>
        <div className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 100px' }}>
          <span className="sm-text-13t">Maya Bernal <span className="sm-text-11">(CAO)</span></span>
          <span className="sm-mono-val" style={{ '--val-color': 'var(--violet)' } as React.CSSProperties}>{JAN_FEB_2025_GOVERNANCE.bernalRsuGrant.shares.toLocaleString()} RSUs</span>
          <span className="sm-text-12">Vest {JAN_FEB_2025_GOVERNANCE.bernalRsuGrant.vestingDate.slice(5)}</span>
        </div>
        <div className="sm-card-footer">
          Avellan 13D/A (Jan 27): 25% ownership stable (78.16M shares, Amend. 12). Annual meeting notice Jan 31 (later moved to Jun 6).
        </div>
      </div>

      {/* Credit Facility */}
      <div className="sm-card sm-mt-8">
        <div className="sm-highlight-bar" style={{ '--bar-accent-1': 'var(--sky)', '--bar-accent-2': 'var(--mint)', padding: '24px', borderTop: 'none' } as React.CSSProperties}>
          <div className="sm-section-label sm-sky" style={{ fontSize: 13 }}>Jul 2025 UBS Credit Facility</div>
          <div className="sm-detail-grid-4 sm-mt-12" style={{ gap: 16 }}>
            {[
              { label: 'Amount', value: `$${JUL_2025_CREDIT_FACILITY.amount}M`, color: 'var(--sky)' },
              { label: 'Expandable To', value: `$${JUL_2025_CREDIT_FACILITY.expandableTo}M`, color: 'var(--mint)' },
              { label: 'Rate', value: JUL_2025_CREDIT_FACILITY.rate, color: 'var(--text)' },
              { label: 'Maturity', value: JUL_2025_CREDIT_FACILITY.maturity, color: 'var(--text)' },
            ].map(item => (
              <div key={item.label}>
                <div className="sm-micro-text">{item.label}</div>
                <div className="sm-mono-lg sm-fw-600" style={{ color: item.color, marginTop: 4 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="sm-text-12 sm-text2 sm-mt-8" style={{ lineHeight: 1.6 }}>
            {JUL_2025_CREDIT_FACILITY.notes}
          </div>
        </div>
      </div>

      {/* Certificate Amendment */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">Certificate Amendment (Jun 6, 2025)</span>
          <span className="sm-mono-sm sm-gold">+100M Authorized</span>
        </div>
        <div className="sm-grid-sep-3col">
          {[
            { label: 'Class A', prev: JUN_2025_CERTIFICATE_AMENDMENT.classA.previous, now: JUN_2025_CERTIFICATE_AMENDMENT.classA.new, change: JUN_2025_CERTIFICATE_AMENDMENT.classA.change },
            { label: 'Class B', prev: JUN_2025_CERTIFICATE_AMENDMENT.classB.previous, now: JUN_2025_CERTIFICATE_AMENDMENT.classB.new, change: JUN_2025_CERTIFICATE_AMENDMENT.classB.change },
            { label: 'Class C', prev: JUN_2025_CERTIFICATE_AMENDMENT.classC.previous, now: JUN_2025_CERTIFICATE_AMENDMENT.classC.new, change: JUN_2025_CERTIFICATE_AMENDMENT.classC.change },
          ].map(c => (
            <div key={c.label} className="sm-cell-surface-center"  >
              <div className="sm-micro-text">{c.label}</div>
              <div className="sm-mono-lg sm-fw-600" style={{ color: c.change > 0 ? 'var(--gold)' : 'var(--text2)', margin: '4px 0' }}>{c.now}M</div>
              <div style={{ fontSize: 11, color: c.change > 0 ? 'var(--gold)' : 'var(--text3)' }}>{c.change > 0 ? `+${c.change}M` : 'No change'}</div>
            </div>
          ))}
        </div>
        <div className="sm-card-footer">
          {JUN_2025_CERTIFICATE_AMENDMENT.notes}
        </div>
      </div>

      {/* May-Jun RSU Activity */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-header">
          <span className="sm-param-label">May-Jun 2025 RSU &amp; Option Activity</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div className="sm-grid-header" style={{ gridTemplateColumns: '1fr 100px 100px 90px 1fr' }}>
            {['Executive', 'Date', 'Type', 'Units', 'Notes'].map(h => (
              <span key={h} className="sm-th" style={{ textAlign: h === 'Units' ? 'right' : 'left'}}>{h}</span>
            ))}
          </div>
          {MAY_JUN_2025_RSU_ACTIVITY.map((a, i) => (
            <div key={i} className="hover-row sm-grid-row" style={{ gridTemplateColumns: '1fr 100px 100px 90px 1fr' }}>
              <span className="sm-text-13t">{a.name} <span className="sm-text-11">({a.role})</span></span>
              <span className="sm-text-12">{a.date.slice(5)}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: a.type === 'RSU Grant' ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : a.type === 'RSU Vesting' ? 'color-mix(in srgb, var(--mint) 15%, transparent)' : 'color-mix(in srgb, var(--sky) 15%, transparent)', color: a.type === 'RSU Grant' ? 'var(--violet)' : a.type === 'RSU Vesting' ? 'var(--mint)' : 'var(--sky)' }}>{a.type}</span>
              <span className="sm-mono-right">{(a.units / 1000).toFixed(0)}K</span>
              <span className="sm-text-11">{a.note}</span>
            </div>
          ))}
        </div>
      </div>
      </>
      )}

      <CFANotes title="CFA Level III — Capital Structure" items={[
        { term: 'Dual/Multi-Class Shares', def: 'Multiple share classes with different voting rights. Class C (10x votes) allows founder to maintain control despite minority economic ownership. Common in tech/growth companies.' },
        { term: 'Fully Diluted Shares', def: 'Total shares if all options, RSUs, warrants, and convertible securities are exercised. Always higher than basic shares outstanding. Use FD for conservative valuation.' },
        { term: 'ATM (At-The-Market) Programs', def: 'Shelf offerings allowing companies to sell shares directly into the open market at prevailing prices. Less dilutive than block offerings but can create selling pressure.' },
        { term: 'SBC (Stock-Based Compensation)', def: 'Non-cash expense for employee equity compensation (options, RSUs). Reduces reported earnings but doesn\'t affect cash flow. Creates future dilution when vested.' },
        { term: 'Cash Runway', def: 'Cash ÷ Quarterly Burn = Quarters of funding. Pre-revenue companies need sufficient runway to reach profitability. ASTS fully funded for 100+ satellites.' },
        { term: 'Convertible Debt', def: 'Hybrid instruments that can convert to equity above a strike price. May not dilute if repurchased for cash. Track conversion prices vs current stock price.' },
      ]} />
    </div>
  );
};

// SCENARIO PRESETS
// 6 Scenario Presets from Worst to Moon
// Sources: ASTS investor presentations, analyst reports, management guidance
const SCENARIO_PRESETS = {
  worst: {
    label: 'Worst',
    desc: 'Tech fails, Starlink dominates, massive dilution, regulatory issues',
    icon: '💀',
    color: '#dc2626',
    penetrationRate: 0.5,
    blendedARPU: 8,
    deploymentDelay: 4,
    terminalMargin: 25,
    terminalCapex: 25,
    dilutionRate: 15,
    competitionDiscount: 75,
    discountRate: 25,
    terminalGrowth: 1,
    regulatoryRisk: 30,
    techRisk: 35,
    competitionRisk: 40,
  },
  bear: {
    label: 'Bear',
    desc: 'Significant delays, Starlink captures majority, pricing pressure',
    icon: '🐻',
    color: '#f97316',
    penetrationRate: 1,
    blendedARPU: 12,
    deploymentDelay: 2,
    terminalMargin: 40,
    terminalCapex: 18,
    dilutionRate: 10,
    competitionDiscount: 50,
    discountRate: 20,
    terminalGrowth: 2,
    regulatoryRisk: 15,
    techRisk: 20,
    competitionRisk: 25,
  },
  base: {
    label: 'Base',
    desc: 'Consensus analyst view with moderate competition adjustment',
    icon: '📊',
    color: '#eab308',
    penetrationRate: 2,
    blendedARPU: 15,
    deploymentDelay: 1,
    terminalMargin: 50,
    terminalCapex: 12,
    dilutionRate: 6,
    competitionDiscount: 30,
    discountRate: 16,
    terminalGrowth: 2.5,
    regulatoryRisk: 8,
    techRisk: 12,
    competitionRisk: 15,
  },
  mgmt: {
    label: 'Mgmt',
    desc: 'Management guidance: 5B TAM, 50/50 revenue share, 85%+ EBITDA margin',
    icon: '📈',
    color: '#22c55e',
    penetrationRate: 3,
    blendedARPU: 18,
    deploymentDelay: 0,
    terminalMargin: 60,
    terminalCapex: 10,
    dilutionRate: 4,
    competitionDiscount: 20,
    discountRate: 14,
    terminalGrowth: 3,
    regulatoryRisk: 5,
    techRisk: 8,
    competitionRisk: 10,
  },
  bull: {
    label: 'Bull',
    desc: 'Faster deployment, premium ARPU, limited competition impact',
    icon: '🐂',
    color: '#06b6d4',
    penetrationRate: 5,
    blendedARPU: 22,
    deploymentDelay: -1,
    terminalMargin: 70,
    terminalCapex: 8,
    dilutionRate: 3,
    competitionDiscount: 12,
    discountRate: 12,
    terminalGrowth: 3.5,
    regulatoryRisk: 3,
    techRisk: 5,
    competitionRisk: 5,
  },
  moon: {
    label: 'Moon',
    desc: 'Category winner: 10%+ penetration, premium pricing, minimal competition',
    icon: '🚀',
    color: '#a855f7',
    penetrationRate: 10,
    blendedARPU: 30,
    deploymentDelay: -2,
    terminalMargin: 80,
    terminalCapex: 5,
    dilutionRate: 2,
    competitionDiscount: 5,
    discountRate: 10,
    terminalGrowth: 4,
    regulatoryRisk: 2,
    techRisk: 2,
    competitionRisk: 3,
  },
};

// Parameter card with 8 options and comprehensive explanation
const ParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  inverse = false, // true = lower values are bullish (risk, capex, dilution)
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  inverse?: boolean;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v}`;
    if (format === '%') return `${v}%`;
    if (format === 'yr') return v === 0 ? 'On-time' : v > 0 ? `+${v}yr` : `${v}yr`;
    if (format === 'M') return `${(v/1000).toFixed(1)}B`;
    if (format === 'x') return `${v}x`;
    return String(v);
  };

  // 6 colors for 6 preset positions: red → orange → yellow → lime → green → emerald
  const presetColors = [
    { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
  ];

  // Colors map directly to position: idx 0 = red (bearish), idx 5 = green (bullish)
  // Options arrays are always ordered from bearish to bullish scenarios
  // (for inverse params like risk/dilution, HIGH values come first since they're bearish)
  const getButtonColor = (idx: number) => {
    return presetColors[idx];
  };

  const handleCustomSubmit = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num)) {
      onChange(num);
      setCustomMode(false);
      setCustomInput('');
    }
  };

  return (
    <div className="sm-panel sm-mb-12">
      <div className="sm-panel-title sm-mb-12">{title}</div>
      <p className="sm-note-list">
        {explanation}
      </p>
      <div className="sm-param-grid-7">
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const colors = getButtonColor(idx);
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              className="sm-param-btn"
              data-active={isActive ? "true" : undefined}
              style={isActive ? { borderColor: colors.border, background: colors.bg, color: colors.text } : undefined}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode ? (
          <div className="sm-custom-input-wrap">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              className="sm-custom-input-field"
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            className="sm-param-btn"
            data-active={isCustomValue ? "true" : undefined}
            style={isCustomValue ? { borderColor: 'var(--violet)', background: 'rgba(167,139,250,0.15)', color: 'var(--violet)' } : undefined}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div className="sm-subtle-sm sm-text-center">
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

// MODEL TAB - Assumptions configuration
const ModelTab = ({
  partnerReach, setPartnerReach,
  penetrationRate, setPenetrationRate,
  blendedARPU, setBlendedARPU,
  revenueShare, setRevenueShare,
  deploymentDelay, setDeploymentDelay,
  terminalMargin, setTerminalMargin,
  terminalCapex, setTerminalCapex,
  dilutionRate, setDilutionRate,
  competitionDiscount, setCompetitionDiscount,
  discountRate, setDiscountRate,
  terminalGrowth, setTerminalGrowth,
  regulatoryRisk, setRegulatoryRisk,
  techRisk, setTechRisk,
  competitionRisk, setCompetitionRisk,
  selectedScenario, setSelectedScenario,
  currentShares, currentStockPrice, cashOnHand, totalDebt,
}) => {

  type ScenarioKey = 'worst' | 'bear' | 'base' | 'mgmt' | 'bull' | 'moon';

  const applyScenario = (scenario: ScenarioKey) => {
    const p = SCENARIO_PRESETS[scenario];
    setPenetrationRate(p.penetrationRate);
    setBlendedARPU(p.blendedARPU);
    setDeploymentDelay(p.deploymentDelay);
    setTerminalMargin(p.terminalMargin);
    setTerminalCapex(p.terminalCapex);
    setDilutionRate(p.dilutionRate);
    setCompetitionDiscount(p.competitionDiscount);
    setDiscountRate(p.discountRate);
    setTerminalGrowth(p.terminalGrowth);
    setRegulatoryRisk(p.regulatoryRisk);
    setTechRisk(p.techRisk);
    setCompetitionRisk(p.competitionRisk);
    setSelectedScenario(scenario);
  };

  // Get current scenario info (use preset data or custom)
  const currentPreset = SCENARIO_PRESETS[selectedScenario as ScenarioKey];
  const scenario = currentPreset
    ? { name: currentPreset.label, color: currentPreset.color, icon: currentPreset.icon }
    : { name: 'Custom', color: '#a855f7', icon: '⚙️' };

  // ============================================================================
  // DCF CALCULATION - Step by step with proper formulas
  // ============================================================================

  // STEP 1: Calculate Terminal Year Subscribers (2030)
  // Formula: Partner Reach × Penetration Rate × (1 - Competition Loss)
  const terminalSubs = partnerReach * (penetrationRate / 100) * (1 - competitionDiscount / 100);
  // Units: M subscribers

  // STEP 2: Calculate Terminal Year Gross Revenue
  // Formula: Subscribers × ARPU × 12 months
  const terminalGrossRev = terminalSubs * blendedARPU * 12 / 1000;
  // Units: $B (divided by 1000 to convert M×$ to B)

  // STEP 3: Calculate ASTS's Share of Revenue
  // Formula: Gross Revenue × Revenue Share %
  const terminalRev = terminalGrossRev * (revenueShare / 100);
  // Units: $B

  // STEP 4: Calculate Terminal EBITDA
  // Formula: Revenue × EBITDA Margin %
  const terminalEBITDA = terminalRev * (terminalMargin / 100);
  // Units: $B

  // STEP 5: Calculate Terminal Free Cash Flow
  // Formula: Revenue × (EBITDA Margin - CapEx %)
  // This is a simplification: FCF ≈ EBITDA - CapEx (ignoring taxes, working capital)
  const terminalFCF = terminalRev * ((terminalMargin - terminalCapex) / 100);
  // Units: $B

  // STEP 6: Calculate Terminal Enterprise Value using Gordon Growth Model
  // Formula: TV = FCF × (1 + g) / (r - g)  [perpetuity formula]
  // Simplified: TV = FCF / (r - g) when FCF is already terminal year
  const discountRateDecimal = discountRate / 100;
  const terminalGrowthDecimal = terminalGrowth / 100;
  const spread = discountRateDecimal - terminalGrowthDecimal;
  // Gordon Growth Model requires positive spread to avoid division by zero
  // MIN_SPREAD_FOR_GORDON_GROWTH = 0.01 (1%) threshold prevents invalid calculations
  const terminalEV = spread > 0.01 ? terminalFCF / spread : 0;
  // Units: $B
  // Note: This is the Enterprise Value AT 2030, not today

  // STEP 7: Discount Terminal Value back to Present
  // Formula: PV = FV / (1 + r)^n
  const yearsToTerminal = 5 + deploymentDelay;
  const discountYears = Math.max(yearsToTerminal, 1);
  const discountFactor = Math.pow(1 + discountRateDecimal, discountYears);
  const presentValueEV = terminalEV / discountFactor;
  // Units: $B (today's value)

  // STEP 8: Calculate Risk Factor (probability of success)
  // Formula: (1 - Risk1) × (1 - Risk2) × (1 - Risk3)
  // This represents probability that none of the risks materialize
  // 
  // ASSUMPTION: Risks are independent. If risks are correlated (e.g., regulatory delays
  // cause tech delays), this formula overestimates success probability. For correlated
  // risks, consider: riskFactor = 1 - max(risk1, risk2, risk3) or a correlation matrix.
  const riskFactor = (1 - regulatoryRisk/100) * (1 - techRisk/100) * (1 - competitionRisk/100);
  // Range: 0 to 1

  // STEP 9: Apply Risk Factor to get Probability-Weighted EV
  // Formula: PV × Probability of Success
  const riskAdjustedEV = presentValueEV * riskFactor;
  // Units: $B (risk-adjusted present value)

  // STEP 10: Calculate Net Debt
  // Formula: Total Debt - Cash
  // Positive = net debt (reduces equity), Negative = net cash (increases equity)
  // Convert from $M to $B: divide by THOUSAND (1000)
  const netDebtB = (totalDebt - cashOnHand) / 1000;
  // Units: $B

  // STEP 11: Calculate Equity Value
  // Formula: Enterprise Value - Net Debt
  // If net cash (negative net debt), this adds to equity value
  const equityValue = riskAdjustedEV - netDebtB;
  // Units: $B

  // STEP 12: Calculate Diluted Shares Outstanding at Terminal Year
  // Formula: Current Shares × (1 + Dilution Rate)^Years
  const finalDilutedShares = currentShares * Math.pow(1 + dilutionRate / 100, Math.max(discountYears, 1));
  // Units: M shares

  // STEP 13: Calculate Target Stock Price
  // Formula: Equity Value / Diluted Shares
  // Convert $B to $M: multiply by THOUSAND (1000), then divide by M shares = $/share
  const targetStockPrice = equityValue > 0 && finalDilutedShares > 0
    ? (equityValue * 1000) / finalDilutedShares // Units: $B × 1000 ÷ M shares = $/share
    : 0;
  // Units: $/share

  // STEP 14: Calculate Implied Upside/Downside
  // Formula: (Target Price - Current Price) / Current Price × 100
  const impliedUpside = currentStockPrice > 0
    ? ((targetStockPrice - currentStockPrice) / currentStockPrice) * 100
    : 0;
  // Units: %

  // STEP 15: Calculate Valuation Multiples (at Terminal Year 2030)
  // These use TERMINAL EV (before discounting) for proper comparison
  const terminalEVperRev = terminalRev > 0 ? terminalEV / terminalRev : 0;
  const terminalEVperEBITDA = terminalEBITDA > 0 ? terminalEV / terminalEBITDA : 0;
  const terminalFCFyield = terminalEV > 0 ? (terminalFCF / terminalEV) * 100 : 0;

  return (
    <div className="sm-flex-col">
      {/* Hero — Ive×Tesla */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">DCF Valuation<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2>Model<span className="sm-accent">.</span></h2>
        <p>Configure assumptions and scenario presets. All changes flow directly to DCF projections and terminal value calculation.</p>
      </div>

      {/* ASSUMPTIONS SECTION */}
      <>
          <div className="sm-model-grid" style={{ '--cols': 6, marginTop: 8 } as React.CSSProperties}>
            {(['worst', 'bear', 'base', 'mgmt', 'bull', 'moon'] as const).map(s => {
              const preset = SCENARIO_PRESETS[s];
              const isActive = selectedScenario === s;
              return (
                <div
                  key={s}
                  onClick={() => applyScenario(s)}
                  style={{
                    padding: '16px 8px',
                    background: isActive ? `${preset.color}15` : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'center',
                    borderBottom: isActive ? `2px solid ${preset.color}` : '2px solid transparent',
                  }}
                >
                  <div className="sm-micro-text">{preset.label}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: isActive ? preset.color : 'var(--text)', margin: '4px 0 2px' }}>
                    {preset.penetrationRate}%
                  </div>
                  <div className="sm-micro-text" style={{ letterSpacing: 'normal', textTransform: 'none', fontWeight: 400 }}>
                    ${preset.blendedARPU}/mo
                  </div>
                </div>
              );
            })}
          </div>
          {selectedScenario === 'custom' && (
            <div style={{ padding: '8px 12px', background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 8, fontSize: 11, color: 'var(--violet)', marginTop: 8 }}>
              Custom scenario — parameters modified from preset
            </div>
          )}

          {/* SUBSCRIBER & REVENUE PARAMETERS */}
          <div className="sm-divider">
            <span className="sm-param-label">Subscriber & Revenue Model</span>
            <span className="sm-divider-line" />
          </div>

          <div className="sm-grid-2">
            <ParameterCard
              title="Penetration Rate (%)"
              explanation="Percentage of partner MNO subscribers who adopt ASTS service. Management targets 3-5%. Analyst estimates range 1-10%. Higher penetration = more subscribers = more revenue. Depends on pricing, network quality, and Starlink competition."
              options={[0.5, 1, 2, 3, 5, 10]}
              value={penetrationRate}
              onChange={v => { setPenetrationRate(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Blended ARPU ($/month)"
              explanation="Average Revenue Per User per month. Blended across regions: US ~$25, LatAm ~$15, Africa/Asia ~$5-10. Management guidance: $15-20 blended. Some analysts model $2-4 for emerging markets only."
              options={[8, 12, 15, 18, 22, 30]}
              value={blendedARPU}
              onChange={v => { setBlendedARPU(v); setSelectedScenario('custom'); }}
              format="$"
            />
          </div>

          <div className="sm-grid-2 sm-mt-12">
            <ParameterCard
              title="Revenue Share (%)"
              explanation="ASTS's share of gross subscriber revenue. Standard MNO deals: 50/50. Some partners may negotiate 60/40 in their favor. Higher share = more revenue flows to ASTS. Could vary by region."
              options={[30, 40, 50, 52, 55, 60]}
              value={revenueShare}
              onChange={v => { setRevenueShare(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Competition Discount (%)"
              explanation="Revenue reduction due to Starlink and competitors. 0% = ASTS monopoly. 75% = competitors capture most of market. Key risk: Starlink Direct-to-Cell has massive satellite fleet advantage."
              options={[75, 50, 30, 20, 12, 5]}
              value={competitionDiscount}
              onChange={v => { setCompetitionDiscount(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          {/* OPERATING PARAMETERS */}
          <div className="sm-divider">
            <span className="sm-param-label">Operating Assumptions</span>
            <span className="sm-divider-line" />
          </div>

          <div className="sm-grid-2">
            <ParameterCard
              title="Terminal EBITDA Margin (%)"
              explanation="Operating margin at scale. Satellite businesses typically achieve 50-70% EBITDA margins. ASTS management targets 85%+. Lower margins possible if pricing pressure or higher opex. 25-30% if competition is brutal."
              options={[25, 40, 50, 60, 70, 80]}
              value={terminalMargin}
              onChange={v => { setTerminalMargin(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Maintenance CapEx (% Rev)"
              explanation="Ongoing capital expenditure for satellite replacement (7-10yr lifespan). 5-10% for efficient operators, 15-25% if constellation needs frequent replacement. Lower = more free cash flow."
              options={[25, 18, 12, 10, 8, 5]}
              value={terminalCapex}
              onChange={v => { setTerminalCapex(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          <div className="sm-grid-2 sm-mt-12">
            <ParameterCard
              title="Annual Dilution (%)"
              explanation="Share count increase from stock comp, warrants, and equity raises. ASTS is capital-intensive. 2-4% = well-funded. 10-15% = ongoing raises needed. High dilution erodes per-share value."
              options={[15, 10, 6, 4, 3, 2]}
              value={dilutionRate}
              onChange={v => { setDilutionRate(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Deployment Delay (Years)"
              explanation="Schedule variance from plan. Negative = ahead of schedule. +4yr = major delays, funding issues. Delays = later revenue, more cash burn, potential dilution. ASTS now has $3.2B cash runway."
              options={[4, 2, 1, 0, -1, -2]}
              value={deploymentDelay}
              onChange={v => { setDeploymentDelay(v); setSelectedScenario('custom'); }}
              format="yr"
              inverse
            />
          </div>

          {/* VALUATION PARAMETERS */}
          <div className="sm-divider">
            <span className="sm-param-label">Valuation Parameters</span>
            <span className="sm-divider-line" />
          </div>

          <div className="sm-grid-2">
            <ParameterCard
              title="Discount Rate / WACC (%)"
              explanation="Required return for discounting future cash flows. 10% = blue chip. 15-20% = high-growth tech. 25%+ = speculative pre-revenue. Lower rates justified as execution de-risks."
              options={[25, 20, 16, 14, 12, 10]}
              value={discountRate}
              onChange={v => { setDiscountRate(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Terminal Growth Rate (%)"
              explanation="Perpetual growth rate for Gordon Growth Model. Should not exceed long-term GDP (~3%). 1% = conservative. 4-5% = aggressive (justified by emerging market connectivity growth)."
              options={[1, 2, 2.5, 3, 3.5, 4]}
              value={terminalGrowth}
              onChange={v => { setTerminalGrowth(v); setSelectedScenario('custom'); }}
              format="%"
            />
          </div>

          {/* RISK PARAMETERS */}
          <div className="sm-divider">
            <span className="sm-param-label">Risk Probability Factors</span>
            <span className="sm-divider-line" />
            <span className="sm-mono-sm sm-text3" style={{ fontSize: 11 }}>{(riskFactor * 100).toFixed(0)}% success</span>
          </div>

          <div className="sm-grid-sep-3col" style={{ gap: 12, background: 'transparent' }}>
            <ParameterCard
              title="Regulatory Risk (%)"
              explanation="Probability of adverse regulatory action. ASTS has FCC approval but needs country-by-country clearance. 2-5% = most approvals done. 20-30% = major regulatory uncertainty remains."
              options={[30, 15, 8, 5, 3, 2]}
              value={regulatoryRisk}
              onChange={v => { setRegulatoryRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Technology Risk (%)"
              explanation="Probability of technology failure. Decreases with each successful satellite and commercial service proof. 2-5% = proven tech. 25-35% = significant unknowns remain."
              options={[35, 20, 12, 8, 5, 2]}
              value={techRisk}
              onChange={v => { setTechRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Competition Risk (%)"
              explanation="Probability competitors capture majority of market or drive pricing to unprofitable levels. Different from Competition Discount - this is binary 'existential threat' probability."
              options={[40, 25, 15, 10, 5, 3]}
              value={competitionRisk}
              onChange={v => { setCompetitionRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          {/* DCF VALUATION OUTPUT */}
          <div className="sm-divider">
            <span className="sm-param-label">DCF Output — 2030 Terminal Year</span>
            <span className="sm-divider-line" />
          </div>

          {/* Primary Output — Hero KPIs */}
          <div className="sm-grid-sep-2col sm-rounded-16 sm-overflow-hidden" style={{ background: 'color-mix(in srgb, var(--accent) 30%, var(--border))' }}>
            <div className="sm-text-center" style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', padding: '24px 16px' }}>
              <div className="sm-th" style={{ color: 'var(--accent)' }}>Target Price</div>
              <div className="sm-mono-2xl sm-accent" style={{ margin: '6px 0 4px' }}>{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(0)}` : 'N/A'}</div>
              <div className="sm-text-11">vs ${currentStockPrice} current</div>
            </div>
            <div className="sm-text-center" style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', padding: '24px 16px' }}>
              <div className="sm-th" style={{ color: 'var(--accent)' }}>Implied Upside</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: impliedUpside > 50 ? 'var(--mint)' : impliedUpside > 0 ? 'var(--gold)' : 'var(--coral)', margin: '6px 0 4px' }}>{targetStockPrice > 0 ? `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` : 'N/A'}</div>
              <div className="sm-text-11">{impliedUpside > 100 ? 'Strong Buy' : impliedUpside > 25 ? 'Buy' : impliedUpside > 0 ? 'Hold' : 'Sell'}</div>
            </div>
          </div>

          {/* Valuation Metrics Grid */}
          <div className="sm-model-grid" style={{ '--cols': 4, marginTop: 12 } as React.CSSProperties}>
            {[
              { label: 'PV Enterprise Value', value: `$${riskAdjustedEV.toFixed(1)}B`, sub: `${(riskFactor * 100).toFixed(0)}% prob`, color: 'var(--text)' },
              { label: 'Equity Value', value: `$${equityValue.toFixed(1)}B`, sub: netDebtB < 0 ? `+$${Math.abs(netDebtB).toFixed(2)}B cash` : `-$${netDebtB.toFixed(2)}B debt`, color: 'var(--text)' },
              { label: '2030 Subscribers', value: `${terminalSubs.toFixed(0)}M`, sub: `${penetrationRate}% penetration`, color: 'var(--text)' },
              { label: '2030 Revenue', value: `$${terminalRev.toFixed(2)}B`, sub: `${revenueShare}% share`, color: 'var(--accent)' },
              { label: '2030 EBITDA', value: `$${terminalEBITDA.toFixed(2)}B`, sub: `${terminalMargin}% margin`, color: 'var(--text)' },
              { label: '2030 FCF', value: `$${terminalFCF.toFixed(2)}B`, sub: `${terminalMargin - terminalCapex}% FCF margin`, color: 'var(--text)' },
              { label: 'EV/Revenue', value: `${terminalEVperRev.toFixed(1)}x`, sub: '2030 terminal', color: 'var(--text)' },
              { label: 'EV/EBITDA', value: `${terminalEVperEBITDA.toFixed(1)}x`, sub: '2030 terminal', color: 'var(--text)' },
              { label: 'FCF Yield', value: `${terminalFCFyield.toFixed(1)}%`, sub: 'FCF / EV', color: 'var(--text)' },
              { label: 'Diluted Shares', value: `${finalDilutedShares.toFixed(0)}M`, sub: `${dilutionRate}%/yr × ${discountYears}yr`, color: 'var(--text)' },
              { label: 'Terminal EV', value: `$${terminalEV.toFixed(1)}B`, sub: 'Before discounting', color: 'var(--text)' },
              { label: 'Discount Factor', value: `${discountFactor.toFixed(3)}x`, sub: `${discountRate}% × ${discountYears}yr`, color: 'var(--text)' },
            ].map(kpi => (
              <div key={kpi.label} className="sm-grid-cell-center">
                <div className="sm-micro-text">{kpi.label}</div>
                <div className="sm-mono-lg" style={{ color: kpi.color, margin: '6px 0 4px' }}>{kpi.value}</div>
                <div className="sm-text-11">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* CALCULATION METHODOLOGY */}
          <div className="sm-divider">
            <span className="sm-param-label">Methodology</span>
            <span className="sm-divider-line" />
          </div>
          <div className="sm-card">
            <div className="sm-card-section">
              <div className="sm-fw-600 sm-text sm-mb-6" style={{ fontSize: 16 }}>DCF Valuation — Gordon Growth Model</div>
              <p className="sm-text3" style={{ fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                Terminal value approach with Gordon Growth Model, discounted to present value and adjusted for execution risk.
                Terminal year: {2025 + discountYears} ({discountYears} years).
              </p>
            </div>
            <div className="sm-card-body">
              <div className="sm-grid-sep-2col" style={{ gap: 16, background: 'transparent' }}>
                {[
                  { step: '1-5', title: 'Terminal Year Metrics', color: 'var(--accent)', items: [
                    { label: 'Subscribers', formula: `${(partnerReach/1000).toFixed(1)}B × ${penetrationRate}% × (1 - ${competitionDiscount}%)`, result: `${terminalSubs.toFixed(0)}M` },
                    { label: 'Gross Revenue', formula: `${terminalSubs.toFixed(0)}M × $${blendedARPU} × 12`, result: `$${terminalGrossRev.toFixed(2)}B` },
                    { label: 'ASTS Revenue', formula: `$${terminalGrossRev.toFixed(2)}B × ${revenueShare}%`, result: `$${terminalRev.toFixed(2)}B` },
                    { label: 'EBITDA', formula: `$${terminalRev.toFixed(2)}B × ${terminalMargin}%`, result: `$${terminalEBITDA.toFixed(2)}B` },
                    { label: 'FCF', formula: `$${terminalRev.toFixed(2)}B × ${terminalMargin - terminalCapex}%`, result: `$${terminalFCF.toFixed(2)}B` },
                  ]},
                  { step: '6-7', title: 'Terminal Value & Discounting', color: 'var(--sky)', items: [
                    { label: 'Gordon Growth TV', formula: `FCF ÷ (r - g) = $${terminalFCF.toFixed(2)}B ÷ ${(spread * 100).toFixed(1)}%`, result: `$${terminalEV.toFixed(1)}B` },
                    { label: 'Present Value', formula: `$${terminalEV.toFixed(1)}B ÷ (1 + ${discountRate}%)^${discountYears}`, result: `$${presentValueEV.toFixed(1)}B` },
                  ]},
                  { step: '8-9', title: 'Risk Adjustment', color: 'var(--gold)', items: [
                    { label: 'Risk Factor', formula: `(1-${regulatoryRisk}%) × (1-${techRisk}%) × (1-${competitionRisk}%)`, result: `${(riskFactor * 100).toFixed(1)}%` },
                    { label: 'Risk-Adj EV', formula: `$${presentValueEV.toFixed(1)}B × ${(riskFactor * 100).toFixed(1)}%`, result: `$${riskAdjustedEV.toFixed(1)}B` },
                  ]},
                  { step: '10-14', title: 'Equity Value & Target Price', color: 'var(--mint)', items: [
                    { label: 'Net Debt', formula: `$${(totalDebt/1000).toFixed(2)}B - $${(cashOnHand/1000).toFixed(2)}B`, result: `$${netDebtB.toFixed(2)}B` },
                    { label: 'Equity Value', formula: `$${riskAdjustedEV.toFixed(1)}B - $${netDebtB.toFixed(2)}B`, result: `$${equityValue.toFixed(1)}B` },
                    { label: 'Diluted Shares', formula: `${currentShares}M × (1+${dilutionRate}%)^${discountYears}`, result: `${finalDilutedShares.toFixed(0)}M` },
                    { label: 'Target Price', formula: `$${equityValue.toFixed(1)}B ÷ ${finalDilutedShares.toFixed(0)}M`, result: `$${targetStockPrice.toFixed(2)}` },
                  ]},
                ].map((section, si) => (
                  <div key={si} className="sm-rounded-12 sm-overflow-hidden sm-bg-surface2">
                    <div className="sm-flex sm-items-center sm-gap-8" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                      <span className="sm-fw-700" style={{ background: section.color, color: 'var(--bg)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: "'Space Mono', monospace" }}>Step {section.step}</span>
                      <span className="sm-text-12 sm-fw-600 sm-text">{section.title}</span>
                    </div>
                    <div className="sm-flex-col sm-gap-8" style={{ padding: '12px 16px' }}>
                      {section.items.map((item, ii) => (
                        <div key={ii} className="sm-flex-between" style={{ alignItems: 'baseline', gap: 8 }}>
                          <div className="sm-min-w-0" style={{ flex: 1 }}>
                            <div className="sm-text-11 sm-fw-600 sm-text2">{item.label}</div>
                            <div className="sm-micro-text" style={{ fontFamily: "'Space Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.formula}</div>
                          </div>
                          <div className="sm-fw-700 sm-shrink-0" style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: section.color }}>{item.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm-rounded-12 sm-mt-16" style={{ padding: 16, background: 'color-mix(in srgb, var(--accent) 6%, transparent)', fontSize: 12, color: 'var(--text3)', lineHeight: 1.7, border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <div className="sm-text2 sm-fw-600 sm-mb-4">Key Assumptions</div>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  <li>Terminal year: {2025 + discountYears} ({discountYears} years out)</li>
                  <li>FCF margin = EBITDA margin - CapEx (simplified, ignores taxes/WC)</li>
                  <li>Risk factors are multiplicative (independent events)</li>
                  <li>Gordon Growth assumes perpetual {terminalGrowth}% growth after terminal year</li>
                </ul>
              </div>
            </div>
          </div>
        </>
    </div>
  );
};

// MONTE CARLO - Mathematically correct with detailed explanations
const MonteCarloTab = ({ currentShares, currentStockPrice, totalDebt, cashOnHand }) => {
  const [sims, setSims] = useState(2000);
  const [years, setYears] = useState(5);
  const [runKey, setRunKey] = useState(0);
  const [baseRev, setBaseRev] = useState(5.5);
  const [revVol, setRevVol] = useState(35);
  const [margin, setMargin] = useState(45);
  const [mult, setMult] = useState(10);
  const [launchRisk, setLaunchRisk] = useState(15);
  const [regRisk, setRegRisk] = useState(10);
  const [discountRate, setDiscountRate] = useState(15);
  const [activePreset, setActivePreset] = useState('base');

  // ============================================================================
  // HORIZON-ADJUSTED PRESETS
  // Revenue scales with time: 3Y = early ramp, 5Y = anchor (2030), 7Y = mature
  // Margins lower in early years (pre-scale), risks higher in early years
  // Based on: Analyst consensus ($254M 2026, $882M 2027, $1B+ 2028, $5-8B 2030)
  // ============================================================================
  const horizonConfig = {
    3: { revMult: 0.33, marginAdj: -15, riskAdj: 10, multAdj: -1, volAdj: 10, label: '2028' },
    5: { revMult: 1.00, marginAdj: 0, riskAdj: 0, multAdj: 0, volAdj: 0, label: '2030' },
    7: { revMult: 1.50, marginAdj: 5, riskAdj: -5, multAdj: 1, volAdj: -5, label: '2032' },
  };
  const hc = horizonConfig[years] || horizonConfig[5];

  // 2030 ANCHOR VALUES (5-year horizon = base case)
  const anchor = {
    bear:  { baseRev: 2.5, margin: 25, mult: 8, revVol: 45, launchRisk: 25, regRisk: 20 },
    base:  { baseRev: 5.5, margin: 45, mult: 10, revVol: 35, launchRisk: 15, regRisk: 10 },
    mgmt:  { baseRev: 8.0, margin: 52, mult: 12, revVol: 30, launchRisk: 10, regRisk: 8 },
    bull:  { baseRev: 12.0, margin: 58, mult: 14, revVol: 25, launchRisk: 8, regRisk: 5 },
  };

  // Scale anchor values based on horizon
  const scalePreset = (a) => ({
    baseRev: Math.round(a.baseRev * hc.revMult * 10) / 10,
    margin: Math.max(-15, Math.min(65, a.margin + hc.marginAdj)),
    mult: Math.max(4, Math.min(18, a.mult + hc.multAdj)),
    revVol: Math.max(20, Math.min(60, a.revVol + hc.volAdj)),
    launchRisk: Math.max(3, Math.min(40, a.launchRisk + hc.riskAdj)),
    regRisk: Math.max(2, Math.min(30, a.regRisk + hc.riskAdj)),
  });

  const presets = {
    bear: { 
      ...scalePreset(anchor.bear),
      label: '🐻 Bear', color: '#f97316',
      desc: `Major delays, 1% penetration. ${hc.label}: $${scalePreset(anchor.bear).baseRev}B revenue.`
    },
    base: { 
      ...scalePreset(anchor.base),
      label: '📊 Base', color: '#eab308',
      desc: `Plan execution, 2.5% penetration. ${hc.label}: $${scalePreset(anchor.base).baseRev}B revenue.`
    },
    mgmt: { 
      ...scalePreset(anchor.mgmt),
      label: '🎯 Mgmt', color: '#22c55e',
      desc: `Management targets, 3.5% penetration. ${hc.label}: $${scalePreset(anchor.mgmt).baseRev}B revenue.`
    },
    bull: { 
      ...scalePreset(anchor.bull),
      label: '🐂 Bull', color: '#06b6d4',
      desc: `Outperformance, 5% penetration. ${hc.label}: $${scalePreset(anchor.bull).baseRev}B revenue.`
    },
    custom: { 
      baseRev: baseRev, margin: margin, mult: mult, revVol: revVol, launchRisk: launchRisk, regRisk: regRisk, 
      label: '⚙️ Custom', color: '#8b5cf6',
      desc: 'Your custom parameters. Adjust inputs below to model specific assumptions.'
    },
  };

  const loadPreset = (key) => {
    if (key === 'custom') {
      setActivePreset('custom');
      return;
    }
    const p = presets[key];
    setBaseRev(p.baseRev);
    setMargin(p.margin);
    setMult(p.mult);
    setRevVol(p.revVol);
    setLaunchRisk(p.launchRisk);
    setRegRisk(p.regRisk);
    setActivePreset(key);
    setRunKey(k => k + 1);
  };

  // Auto-reload preset when horizon changes (unless on Custom)
  React.useEffect(() => {
    if (activePreset !== 'custom') {
      const p = presets[activePreset];
      setBaseRev(p.baseRev);
      setMargin(p.margin);
      setMult(p.mult);
      setRevVol(p.revVol);
      setLaunchRisk(p.launchRisk);
      setRegRisk(p.regRisk);
      setRunKey(k => k + 1);
    }
  }, [years]);

  // Wrapper functions to auto-switch to Custom when user manually adjusts parameters
  const updateParam = (setter) => (value) => {
    setter(value);
    if (activePreset !== 'custom') setActivePreset('custom');
  };

  const sim = useMemo(() => {
    // Cap simulations for performance: MAX_MONTE_CARLO_SIMULATIONS = 10,000
    const n = Math.min(sims, 10000);
    const netCash = cashOnHand - totalDebt; // Net cash position
    
    // Box-Muller transform for standard normal distribution
    // Returns Z ~ N(0,1)
    const randn = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    
    const fairValues = [];
    const revenueOutcomes = [];
    
    for (let i = 0; i < n; i++) {
      // STEP 1: Apply binary risk events (Bernoulli trials)
      // These are discrete "jump" risks that either happen or don't
      let revenueMultiplier = 1.0;
      
      // Launch risk: Major constellation failure (e.g., multiple launch failures, satellite malfunctions)
      // If triggered, assume 40% of expected revenue is lost
      if (Math.random() < launchRisk / 100) {
        revenueMultiplier *= 0.6;
      }
      
      // Regulatory risk: FCC delays, spectrum issues, international approval problems
      // If triggered, assume 30% revenue impact from delayed/limited service
      if (Math.random() < regRisk / 100) {
        revenueMultiplier *= 0.7;
      }
      
      // STEP 2: Apply log-normal distribution for revenue uncertainty
      // Log-normal distribution ensures: (a) revenue stays positive, (b) realistic right-skew
      // X = exp(μ + σZ) where Z ~ N(0,1)
      // We set μ = -σ²/2 so that E[exp(μ + σZ)] = 1 (mean of log-normal factor is 1)
      // This means: E[baseRev × multiplier × factor] = baseRev × multiplier × 1
      // Note: The multiplier accounts for binary risk events, so final revenue may differ from baseRev
      const sigma = revVol / 100;
      const mu = -0.5 * sigma * sigma; // LOG_NORMAL_ADJUSTMENT = -0.5 ensures E[exp(μ + σZ)] = 1
      const logNormalFactor = Math.exp(mu + sigma * randn());
      
      // Final revenue outcome: base revenue × risk multiplier × log-normal volatility factor
      const revenue = baseRev * revenueMultiplier * logNormalFactor;
      revenueOutcomes.push(revenue);
      
      // STEP 3: Calculate EBITDA with operating deleverage
      // In bad scenarios, fixed costs hurt margins more (operating leverage works against you)
      let marginAdjustment = 0;
      if (revenue < 2) marginAdjustment = -15; // Severe underperformance
      else if (revenue < 4) marginAdjustment = -5; // Modest underperformance
      
      const effectiveMargin = Math.max(0, margin + marginAdjustment);
      const ebitda = revenue * (effectiveMargin / 100);
      
      // STEP 4: Calculate EV with multiple compression
      // Distressed companies trade at lower multiples
      let multipleAdjustment = 0;
      if (revenue < 2) multipleAdjustment = -4;
      else if (revenue < 4) multipleAdjustment = -2;
      
      const effectiveMultiple = Math.max(4, mult + multipleAdjustment);
      const enterpriseValue = ebitda * effectiveMultiple; // In $B
      
      // STEP 5: Convert to equity value
      // Equity = EV - Net Debt (or + Net Cash)
      const equityValue = enterpriseValue * 1000 + netCash; // Convert to $M
      
      // STEP 6: Discount to present value
      // This is a forward-looking model, so we discount the terminal value
      const presentValue = equityValue / Math.pow(1 + discountRate / 100, years);
      
      // STEP 7: Calculate fair value per share
      const fairValue = Math.max(0, presentValue / currentShares);
      fairValues.push(fairValue);
    }
    
    // STATISTICS
    const sorted = [...fairValues].sort((a, b) => a - b);
    const percentile = (p) => sorted[Math.floor(n * p)];
    const mean = fairValues.reduce((a, b) => a + b, 0) / n;
    
    // Win probability: % of simulations where fair value > current price
    const winProbability = (fairValues.filter(v => v > currentStockPrice).length / n) * 100;
    
    // Value at Risk (VaR): The 5th percentile loss
    const var5 = ((percentile(0.05) - currentStockPrice) / currentStockPrice) * 100;
    
    // Conditional VaR (CVaR/Expected Shortfall): Average loss in worst 5%
    const tail5 = sorted.slice(0, Math.floor(n * 0.05));
    const cvar5 = tail5.length > 0 
      ? ((tail5.reduce((a, b) => a + b, 0) / tail5.length - currentStockPrice) / currentStockPrice) * 100 
      : var5;
    
    // Annualized returns for Sharpe/Sortino
    const riskFreeRate = 0.04; // RISK_FREE_RATE = 4% annual (standard risk-free rate assumption)
    const returns = fairValues.map(fv => {
      const totalReturn = fv / currentStockPrice;
      return Math.pow(totalReturn, 1 / years) - 1; // Annualized return
    });
    const avgReturn = returns.reduce((a, b) => a + b, 0) / n;
    const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / (n - 1);
    const stdDev = Math.sqrt(variance);
    
    // Sharpe Ratio: (Return - RiskFree) / StdDev
    const sharpe = stdDev > 0 ? (avgReturn - riskFreeRate) / stdDev : 0;
    
    // Sortino Ratio: Uses only downside deviation
    // Sortino Ratio: downside deviation uses ALL observations but only squares below-target returns
    const downsideVariance = returns.reduce((a, r) => a + (r < riskFreeRate ? Math.pow(r - riskFreeRate, 2) : 0), 0) / n;
    const downsideDev = Math.sqrt(downsideVariance);
    const sortino = downsideDev > 0 ? (avgReturn - riskFreeRate) / downsideDev : 0;
    
    // Histogram for visualization
    const min = sorted[0], max = sorted[n - 1];
    const buckets = 20;
    const bucketSize = (max - min) / buckets;
    const histogram = Array.from({ length: buckets }, (_, i) => {
      const start = min + i * bucketSize;
      const end = start + bucketSize;
      const count = fairValues.filter(f => f >= start && f < end).length;
      return { price: start + bucketSize / 2, pct: (count / n) * 100 };
    });
    
    // Revenue statistics for sanity check
    const sortedRev = [...revenueOutcomes].sort((a, b) => a - b);
    const revStats = {
      p5: sortedRev[Math.floor(n * 0.05)],
      p50: sortedRev[Math.floor(n * 0.50)],
      p95: sortedRev[Math.floor(n * 0.95)],
      mean: revenueOutcomes.reduce((a, b) => a + b, 0) / n
    };
    
    return {
      p5: percentile(0.05), p10: percentile(0.10), p25: percentile(0.25),
      p50: percentile(0.50), p75: percentile(0.75), p90: percentile(0.90), p95: percentile(0.95),
      mean, winProbability, var5, cvar5, sharpe, sortino, histogram, revStats, n
    };
  }, [sims, years, baseRev, revVol, margin, mult, launchRisk, regRisk, discountRate, currentShares, currentStockPrice, totalDebt, cashOnHand, runKey]);

  // Parameter definitions for the guide
  const parameterGuide = [
    { param: 'Base Rev ($B)', value: baseRev, desc: 'Expected 2030 revenue from DCF/Scenarios base case. This is the "center" of the simulation. Source: Management guidance, analyst estimates, or DCF model.' },
    { param: 'Rev Volatility (%)', value: revVol, desc: 'Standard deviation of log-normal distribution. 35% means ~68% of outcomes fall between 0.7x and 1.4x base revenue. Higher = wider range of outcomes.' },
    { param: 'EBITDA Margin (%)', value: margin, desc: 'Terminal EBITDA margin at scale. Satellite/telecom typically 40-60%. Compressed in bad scenarios due to operating leverage (fixed costs hurt when revenue is low).' },
    { param: 'EV/EBITDA Multiple', value: mult, desc: 'Valuation multiple applied to terminal EBITDA. Growth companies: 10-15x, mature telcos: 6-8x. Compressed in distressed scenarios.' },
    { param: 'Launch Risk (%)', value: launchRisk, desc: 'Probability of major constellation failure (multiple launch failures, satellite malfunctions). If triggered, reduces revenue by 40%. Historical LEO failure ~7%, but cumulative risk across many launches is higher.' },
    { param: 'Regulatory Risk (%)', value: regRisk, desc: 'Probability of significant regulatory setback (FCC denial, spectrum issues, international delays). If triggered, reduces revenue by 30%.' },
    { param: 'Discount Rate (%)', value: discountRate, desc: 'Rate used to discount future equity value to today. Should match your required return for this risk level. Pre-revenue space: 12-18% typical.' },
  ];

  return (
    <div className="sm-flex-col">
      <div className="sm-tab-hero">
        <div className="sm-section-label">Revenue-Based Valuation Simulation<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2>Monte Carlo<span className="sm-accent">.</span></h2>
        <p>
          Runs {sim.n.toLocaleString()} simulations over {years} years with binary risk events (launch failure, regulatory)
          and log-normal revenue distribution. Terminal value discounted to present.
        </p>
      </div>

      {/* Scenario Presets */}
      <div>
        <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
          {Object.entries(presets).filter(([key]) => key !== 'mgmt').map(([key, p]) => {
            const isActive = activePreset === key;
            return (
              <div
                key={key}
                onClick={() => loadPreset(key)}
                style={{
                  padding: '16px 8px',
                  background: isActive ? `${p.color}15` : 'var(--surface)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'center',
                  borderBottom: isActive ? `2px solid ${p.color}` : '2px solid transparent',
                }}
              >
                <div className="sm-micro-text">{p.label}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: isActive ? p.color : 'var(--text)', margin: '4px 0 2px' }}>
                  ${p.baseRev}B
                </div>
                <div className="sm-micro-text" style={{ letterSpacing: 'normal', textTransform: 'none', fontWeight: 400 }}>
                  {p.margin}% margin
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizon & Simulation Controls */}
      <div>
        <div className="sm-grid-2">
          <div className="sm-card">
            <div className="sm-card-section"><span className="sm-section-label">TIME HORIZON</span></div>
            <div className="sm-card-body">
            <div className="sm-flex sm-gap-8" style={{ alignItems: 'initial' }}>
              {[3, 5, 7].map(yr => (
                <button
                  key={yr}
                  onClick={() => setYears(yr)}
                  className="sm-mc-horizon-btn"
                  data-active={years === yr ? "true" : undefined}
                >
                  {yr}Y
                </button>
              ))}
            </div>
            </div>
          </div>
          <div className="sm-card">
            <div className="sm-card-section"><span className="sm-section-label">SIMULATIONS</span></div>
            <div className="sm-card-body">
            <div className="sm-flex sm-gap-8" style={{ alignItems: 'initial' }}>
              {[1000, 2000, 5000].map(simCount => (
                <button
                  key={simCount}
                  onClick={() => setSims(simCount)}
                  className="sm-mc-sim-btn"
                  data-active={sims === simCount ? "true" : undefined}
                >
                  {simCount.toLocaleString()}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parameters - Model Tab Style */}
      <div>
        <div className="sm-divider">
          <span className="sm-param-label">Revenue Model</span>
          <span className="sm-divider-line" />
        </div>
        <div className="sm-grid-2">
          <ParameterCard
            title="Base Revenue ($B)"
            explanation="Expected terminal year revenue. Source: DCF model or analyst estimates."
            options={[1.5, 2.5, 4.0, 5.5, 8.0, 12.0]}
            value={baseRev}
            onChange={updateParam(setBaseRev)}
            format="$"
          />
          <ParameterCard
            title="Revenue Volatility (%)"
            explanation="Log-normal std dev. 35% = outcomes range 0.7x-1.4x base revenue."
            options={[50, 45, 40, 35, 30, 25]}
            value={revVol}
            onChange={updateParam(setRevVol)}
            format="%"
          />
        </div>

        <div className="sm-divider">
          <span className="sm-param-label">Operating Model</span>
          <span className="sm-divider-line" />
        </div>
        <div className="sm-grid-2">
          <ParameterCard
            title="EBITDA Margin (%)"
            explanation="Terminal margin at scale. Satellite/telecom: 40-60%. Operating leverage applies."
            options={[25, 35, 40, 45, 52, 58]}
            value={margin}
            onChange={updateParam(setMargin)}
            format="%"
          />
          <ParameterCard
            title="EV/EBITDA Multiple"
            explanation="Terminal valuation multiple. Growth: 10-15x, Mature telcos: 6-8x."
            options={[6, 8, 10, 12, 14, 16]}
            value={mult}
            onChange={updateParam(setMult)}
            format="x"
          />
        </div>

        <div className="sm-divider">
          <span className="sm-param-label">Risk Factors</span>
          <span className="sm-divider-line" />
        </div>
        <div className="sm-grid-sep-3col" style={{ gap: 12, background: 'transparent' }}>
          <ParameterCard
            title="Launch Risk (%)"
            explanation="Prob. of constellation failure. If triggered: -40% revenue."
            options={[30, 25, 20, 15, 10, 5]}
            value={launchRisk}
            onChange={updateParam(setLaunchRisk)}
            format="%"
          />
          <ParameterCard
            title="Regulatory Risk (%)"
            explanation="Prob. of FCC/spectrum issues. If triggered: -30% revenue."
            options={[25, 20, 15, 10, 8, 5]}
            value={regRisk}
            onChange={updateParam(setRegRisk)}
            format="%"
          />
          <ParameterCard
            title="Discount Rate (%)"
            explanation="Required return / WACC. Pre-revenue space: 12-18%."
            options={[20, 18, 16, 15, 13, 11]}
            value={discountRate}
            onChange={(v) => setDiscountRate(v)}
            format="%"
          />
        </div>

        {/* Run Button */}
        <button onClick={() => setRunKey(k => k + 1)} className="sm-run-btn">🎲 Run Simulation</button>
      </div>

      {/* Percentile Distribution */}
      <div>
        <div className="sm-card sm-mt-8">
          <div className="sm-table-header" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            <span className="sm-text-left">Percentile</span>
            <span className="sm-text-right">Price Target</span>
            <span className="sm-text-right">vs Current</span>
            <span className="sm-text-right">Implied Return</span>
          </div>
          {[
            { label: 'P5 (Bear Case)', value: sim.p5 },
            { label: 'P25', value: sim.p25 },
            { label: 'P50 (Median)', value: sim.p50, highlight: true },
            { label: 'P75', value: sim.p75 },
            { label: 'P95 (Bull Case)', value: sim.p95 },
          ].map((row, i) => {
            const pctChange = ((row.value / currentStockPrice - 1) * 100);
            return (
              <div key={i} className="sm-table-row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', background: row.highlight ? 'var(--accent-dim)' : 'transparent' }}>
                <span style={{ fontWeight: row.highlight ? 600 : 400, color: row.highlight ? 'var(--accent)' : 'var(--text2)' }}>{row.label}</span>
                <span style={{ textAlign: 'right', fontFamily: "'Space Mono', monospace", fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent)' : 'var(--text)' }}>${row.value.toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: "'Space Mono', monospace", color: 'var(--text2)' }}>${(row.value - currentStockPrice).toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: "'Space Mono', monospace", fontWeight: 500, color: pctChange >= 0 ? 'var(--mint)' : 'var(--red)' }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Metrics */}
      <div>
        <div className="sm-card sm-mt-8">
          <div className="sm-table-header" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <span className="sm-text-left">Risk Metric</span>
            <span className="sm-text-right">Value</span>
            <span className="sm-text-left">Interpretation</span>
          </div>
          {[
            { label: 'Win Probability', value: <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600, color: sim.winProbability > 50 ? 'var(--mint)' : 'var(--red)' }}>{sim.winProbability.toFixed(1)}%</span>, interp: 'Prob. of exceeding current price' },
            { label: 'Expected Value', value: <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>${sim.mean.toFixed(2)}</span>, interp: 'Mean simulated fair value' },
            { label: 'Sharpe Ratio', value: <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600, color: sim.sharpe > 1 ? 'var(--mint)' : sim.sharpe > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sharpe.toFixed(2)}</span>, interp: sim.sharpe > 1 ? 'Excellent risk-adj return' : sim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return' },
            { label: 'Sortino Ratio', value: <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600, color: sim.sortino > 1 ? 'var(--mint)' : sim.sortino > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sortino.toFixed(2)}</span>, interp: 'Downside-adjusted return' },
            { label: 'VaR (5%)', value: <span className="sm-fw-600" style={{ fontFamily: "'Space Mono', monospace", color: 'var(--red)' }}>{sim.var5.toFixed(1)}%</span>, interp: '95% confidence floor' },
            { label: 'CVaR (5%)', value: <span className="sm-fw-600" style={{ fontFamily: "'Space Mono', monospace", color: 'var(--red)' }}>{sim.cvar5.toFixed(1)}%</span>, interp: 'Expected tail loss' },
          ].map((row, i) => (
            <div key={i} className="sm-table-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <span className="sm-text2">{row.label}</span>
              <span className="sm-text-right">{row.value}</span>
              <span className="sm-text3">{row.interp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Chart */}
      <div>
        <div className="sm-card">
          <div className="sm-card-section"><span className="sm-section-label">FAIR VALUE DISTRIBUTION</span></div>
          <div className="sm-card-body">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sim.histogram}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="price" stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} />
              <YAxis stroke="var(--text3)" tickFormatter={v => `${v.toFixed(1)}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}
                formatter={(v) => [`${Number(v).toFixed(2)}%`, 'Probability']}
                labelFormatter={(v) => `$${Number(v).toFixed(0)}`}
              />
              <Bar dataKey="pct" fill="var(--accent)" radius={[2, 2, 0, 0]} />
              <ReferenceLine x={currentStockPrice} stroke="#fff" strokeDasharray="5 5" />
            </BarChart>
          </ResponsiveContainer>
          <div className="sm-flex-between" style={{ fontSize: 11, color: 'var(--text3)' }}>
            <span>White line = current price (${currentStockPrice})</span>
            <span>Simulations: {sim.n.toLocaleString()}</span>
          </div>
          </div>
        </div>
      </div>

      {/* CFA Notes */}
      <div>
      <CFANotes title="CFA Level III — Monte Carlo Simulation" items={[
          { term: 'Monte Carlo Method', def: 'Run thousands of random simulations with input volatility. Distribution of outcomes shows probability-weighted fair values.' },
          { term: 'Revenue Volatility', def: 'Standard deviation of revenue growth assumptions. Higher volatility = wider distribution of outcomes.' },
          { term: 'Binary Risk Events', def: 'Launch failure, regulatory rejection. Model as probability of total loss in affected scenarios.' },
          { term: 'Percentile Interpretation', def: 'P5 = 5% chance of being below this. P50 = median. P95 = 5% chance of exceeding.' },
          { term: 'VaR (Value at Risk)', def: 'The loss level that won\'t be exceeded with 95% confidence. Shows downside risk.' },
          { term: 'Expected Value', def: 'Probability-weighted average of all outcomes. Compare to current price for buy/sell signal.' },
        ]} />
      </div>
    </div>
  );
};

// SEC FILING TRACKER - Shared component for Pivots and Financials tabs
const SECFilingTracker = () => {
  // SEC Filing metadata - update as new filings are processed
  const filingData = {
    // Company identifiers
    cik: '0001780312',
    ticker: 'ASTS',
    exchange: 'NASDAQ',
    
    // Key dates
    firstFiling: 'April 6, 2021',
    firstFilingNote: 'SPAC Close / 8-K',
    latestEvent: 'SDA $30M HALO Europa Contract',
    latestEventDate: 'Feb 23, 2026',

    // [PR_CHECKLIST_FILING_DATA] - MANDATORY: Update lastPressRelease, lastPressReleaseTitle,
    // latestEvent, latestEventDate, and filings['8-K'] with every ASTS PR!
    // See src/data/shared/types.ts for the full universal checklist.
    lastPressRelease: 'February 23, 2026',
    lastPressReleaseTitle: 'SDA $30M HALO Europa Prime Contract',
    
    // Latest filings by type
    filings: {
      '10-K': { date: 'March 3, 2025', description: 'FY 2024', color: 'blue' },
      '10-Q': { date: 'Nov 10, 2025', description: 'Q3 2025', color: 'purple' },
      '8-K': { date: 'Feb 23, 2026', description: 'RD Settlements + Notes Repurchases', color: 'yellow' },
      'S-3': { date: 'Oct 2025', description: 'Shelf Registration', color: 'green' },
      '424B5': { date: 'Oct 2025', description: '$1.15B Converts', color: 'orange' },
      'DEF 14A': { date: '—', description: 'Proxy (Annual)', color: 'cyan' },
    }
  };

  const colorStyles: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: 'var(--sky)' },
    purple: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', text: 'var(--violet)' },
    yellow: { bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)', text: 'var(--gold)' },
    green: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: 'var(--mint)' },
    orange: { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.3)', text: 'var(--gold)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)', text: 'var(--cyan)' },
  };

  return (
    <div className="sm-card">
      <div className="sm-card-header">
        <span className="sm-section-label">SEC Filing Tracker</span>
      </div>
      <div className="sm-card-body">
        <div className="sm-grid-2-lg">
          <div className="sm-flex-col-gap">
            <div className="sm-micro-text">Filing History</div>
            <div className="sm-flex-col sm-gap-8">
              <div className="sm-flex-between sm-items-center sm-card-body sm-bg-surface2 sm-rounded-6">
                <span className="sm-text-13 sm-text3">First SEC Filing</span>
                <div className="sm-text-right">
                  <span className="sm-text-13 sm-cyan">{filingData.firstFiling}</span>
                  <div className="sm-text-11">{filingData.firstFilingNote}</div>
                </div>
              </div>
              <div className="sm-flex-between sm-items-center sm-card-body sm-bg-surface2 sm-rounded-6">
                <span className="sm-text-13 sm-text3">Latest Event</span>
                <div className="sm-text-right">
                  <span className="sm-text-13 sm-gold">{filingData.latestEvent}</span>
                  <div className="sm-text-11">{filingData.latestEventDate}</div>
                </div>
              </div>
              <div className="sm-flex-between sm-items-center sm-card-body sm-rounded-6" style={{ background: 'color-mix(in srgb, var(--mint) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--mint) 30%, transparent)' }}>
                <span className="sm-text-13 sm-text3">Last PR Processed</span>
                <div className="sm-text-right">
                  <span className="sm-text-13 sm-mint">{filingData.lastPressRelease}</span>
                  <div className="sm-text-11">{filingData.lastPressReleaseTitle}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm-flex-col-gap">
            <div className="sm-micro-text">Latest Filings by Type</div>
            <div className="sm-grid-2" style={{ fontSize: 13 }}>
              {Object.entries(filingData.filings).map(([type, info]) => {
                const style = colorStyles[info.color] || colorStyles.cyan;
                return (
                  <div key={type} className="sm-card-body sm-rounded-6" style={{ border: `1px solid ${style.border}`, background: style.bg }}>
                    <div className="sm-fw-600" style={{ color: style.text }}>{type}</div>
                    <div className="sm-text3">{info.date}</div>
                    <div className="sm-text-11">{info.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sm-text-11 sm-pt-12">
          CIK: {filingData.cik} | {filingData.exchange}: {filingData.ticker} | Update dates as new filings are processed
        </div>
      </div>
    </div>
  );
};

// QUARTERLY METRICS PANEL - Historical data toggle extracted from 10-K filings
const QuarterlyMetricsPanel = () => {
  // Historical quarterly data from 10-K and 10-Q filings (source: SEC EDGAR)
  const quarterlyData = ASTS_QUARTERLY_DATA;

  const quarters = Object.keys(quarterlyData);
  
  // State for OpEx breakdown quarter selector
  const [opExQuarter, setOpExQuarter] = useState('Q3 2025');
  
  // Get quarters that have OpEx breakdown data
  const opExQuarters = quarters.filter(q => quarterlyData[q].opExEngineering);
  
  const metrics = [
    { label: 'Cash & Equiv.*', key: 'cashAndEquiv', tooltipKey: 'cashOnly', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: v => v === null ? undefined : 'var(--mint)', unit: '$M' },
    { label: 'Total Debt*', key: 'totalDebt', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: () => undefined, unit: '$M' },
    { label: 'Revenue', key: 'revenue', format: v => v === null ? '—' : v === 0 ? '$0' : `$${v.toFixed(1)}M`, color: v => v === null ? undefined : 'var(--mint)', unit: '$M' },
    { label: 'OpEx', key: 'opEx', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: v => v === null ? undefined : 'var(--coral)', unit: '$M' },
    { label: 'Net Income', key: 'netLoss', format: v => v === null ? '—' : v >= 0 ? `$${v.toFixed(0)}M` : `-$${Math.abs(v).toFixed(0)}M`, color: v => v === null ? undefined : v >= 0 ? 'var(--mint)' : 'var(--coral)', unit: '$M' },
    { label: 'Stock Price', key: 'stockPrice', format: v => v === null ? '—' : v === 0 ? 'Private' : `$${v.toFixed(2)}`, color: () => undefined, unit: '$' },
    { label: 'Shares (A)', key: 'sharesOutstanding', format: v => v === null ? '—' : v === 0 ? 'Private' : `${v.toFixed(0)}M`, color: v => v === null || v === 0 ? undefined : 'var(--gold)', unit: 'M' },
    { label: 'Satellites', key: 'satellites', format: v => v === null ? '—' : v, color: v => v === null ? undefined : 'var(--cyan)', unit: '' },
    { label: 'Employees*', key: 'employees', format: v => v === null ? '—' : v === 0 ? '—' : v.toLocaleString(), color: () => undefined, unit: '' },
    { label: 'Agreements', key: 'definitiveAgreements', format: v => v === null ? '—' : v, color: () => undefined, unit: '' },
    { label: 'MOUs', key: 'mous', format: v => v === null ? '—' : v, color: () => undefined, unit: '' },
  ];
  
  const getValue = (data, metric) => {
    if (metric.calc) return metric.calc(data);
    return data[metric.key];
  };
  
  // Filter quarters to show (2021-2025, excluding SPAC and pre-2021)
  const displayQuarters = quarters.filter(q => !q.includes('NPA') && !q.includes('2020') && !q.includes('2019'));
  
  // Compute summary stats dynamically from data
  const summaryStats = useMemo(() => {
    const allQuarters = Object.values(quarterlyData);
    const withCash = allQuarters.filter(q => q.cashAndEquiv !== null);
    const withShares = allQuarters.filter(q => q.sharesOutstanding !== null && q.sharesOutstanding > 0);
    const withSatellites = allQuarters.filter(q => q.satellites !== null && q.satellites !== undefined);
    
    // Get first and last valid values (reversed because data is newest-first)
    const firstCash = withCash.length > 0 ? withCash[withCash.length - 1].cashAndEquiv : null;
    const lastCash = withCash.length > 0 ? withCash[0].cashAndEquiv : null;
    const firstShares = withShares.length > 0 ? withShares[withShares.length - 1].sharesOutstanding : null;
    const lastShares = withShares.length > 0 ? withShares[0].sharesOutstanding : null;
    const firstSats = withSatellites.length > 0 ? withSatellites[withSatellites.length - 1].satellites : null;
    const lastSats = withSatellites.length > 0 ? withSatellites[0].satellites : null;
    
    return {
      quarterCount: displayQuarters.length,
      firstQuarter: displayQuarters[displayQuarters.length - 1],
      lastQuarter: displayQuarters[0],
      cashRange: { first: firstCash, last: lastCash },
      sharesRange: { first: firstShares, last: lastShares },
      satellitesRange: { first: firstSats, last: lastSats },
    };
  }, [quarterlyData, displayQuarters]);

  return (
    <>
      {/* #quarterly-metrics */}
      <div className="sm-card">
      <div className="sm-card-header">
        <span className="sm-section-label">Key Metrics Evolution<UpdateIndicators sources="SEC" /></span>
      </div>
      <div className="sm-card-body">
      {/* Dynamic Summary Badges */}
      <div className="sm-flex-wrap">
        <span className="sm-news-tag" style={{ '--tag-color': 'var(--cyan)' } as React.CSSProperties}>
          {summaryStats.quarterCount} quarters of data ({summaryStats.firstQuarter} - {summaryStats.lastQuarter})
        </span>
        <span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>
          Cash: {summaryStats.cashRange.first !== null ? `$${summaryStats.cashRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.cashRange.last !== null ? `$${summaryStats.cashRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span className="sm-news-tag" style={{ '--tag-color': 'var(--gold)' } as React.CSSProperties}>
          Shares: {summaryStats.sharesRange.first !== null ? `${summaryStats.sharesRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.sharesRange.last !== null ? `${summaryStats.sharesRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span className="sm-news-tag" style={{ '--tag-color': 'var(--violet)' } as React.CSSProperties}>
          Satellites: {summaryStats.satellitesRange.first ?? 'N/A'} → {summaryStats.satellitesRange.last ?? 'N/A'}
        </span>
      </div>

      {/* All Quarters Table */}
      <div className="sm-overflow-x sm-scroll-hint">
        <div style={{ minWidth: `${130 + displayQuarters.length * 90}px` }}>
          {/* Header row */}
          <div className="sm-fin-table-header" style={{ gridTemplateColumns: `minmax(130px, 1fr) ${displayQuarters.map(() => '90px').join(' ')}` }}>
            <span className="sm-fin-th" data-sticky="">Metric</span>
            {displayQuarters.map((q, idx) => (
              <span key={q} className="sm-fin-th" data-latest={idx === 0 ? '' : undefined} style={{ textAlign: 'right' }}>
                {q.replace('Q', '').replace(' ', "'")}
              </span>
            ))}
          </div>
          {/* Data rows */}
          {metrics.map((metric, mi) => (
            <div key={metric.label} className="sm-fin-table-row" style={{ gridTemplateColumns: `minmax(130px, 1fr) ${displayQuarters.map(() => '90px').join(' ')}`, borderBottom: mi < metrics.length - 1 ? undefined : 'none' }}>
              <span className="sm-fin-td-label">
                {metric.label}
              </span>
              {displayQuarters.map(q => {
                const data = quarterlyData[q];
                const val = getValue(data, metric);
                const tooltip = metric.tooltipKey && data[metric.tooltipKey] !== undefined
                  ? `Cash only: $${data[metric.tooltipKey].toFixed(1)}M`
                  : null;
                const cellColor = metric.color ? metric.color(val) : undefined;
                const isLatestQuarter = q === displayQuarters[0];
                return (
                  <span
                    key={q}
                    className="sm-fin-td"
                    title={tooltip ?? undefined}
                    data-latest={isLatestQuarter ? '' : undefined}
                    style={cellColor ? { color: cellColor } : undefined}
                  >
                    {metric.format(val)}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footnote */}
      <div className="sm-note-panel sm-text-11">
        <p>* Cash & Equiv. includes restricted cash (~$0.7-20M depending on quarter). Other reports might exclude restricted cash, which explains small differences between our values and theirs.</p>
        <p>* Total Debt shows Long-Term Debt only (balance sheet line item). Other sources may report "Total Debt" which includes current portion, accrued interest, and finance leases—explaining differences of $3-45M. Notable: Q3 2024 shows $156M here vs $201M elsewhere because the $48.5M Atlas Credit Facility was classified as current (due within 12 months) and repaid in Q4 2024.</p>
        <p>* Employees estimates from PRs/filings. Data from SEC filings (10-K, 10-Q).</p>
      </div>
      </div>
      </div>

      {/* Key Notes from Filing - Matching BMNR style */}
      <div>
        <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Latest Quarter Summary (Q3 2025)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-card-body">
        <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">Filing Source</div>
            <div className="sm-kpi-sub">{quarterlyData['Q3 2025'].filing}</div>
          </div>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">Satellites in Orbit</div>
            <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--cyan)' } as React.CSSProperties}>{quarterlyData['Q3 2025'].satellites}</div>
            <div className="sm-kpi-sub">BW3 + BB1-5</div>
          </div>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">MNO Partnerships</div>
            <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--mint)' } as React.CSSProperties}>{quarterlyData['Q3 2025'].definitiveAgreements}</div>
            <div className="sm-kpi-sub">definitive, {quarterlyData['Q3 2025'].mous}+ MOUs/LOIs</div>
          </div>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">Contracted Revenue</div>
            <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--mint)' } as React.CSSProperties}>${quarterlyData['Q3 2025'].contractedRevenue}M+</div>
            <div className="sm-kpi-sub">committed</div>
          </div>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">Spectrum Position</div>
            <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--sky)' } as React.CSSProperties}>{quarterlyData['Q3 2025'].spectrumOwned} MHz</div>
            <div className="sm-kpi-sub">owned | {quarterlyData['Q3 2025'].spectrumUS}+ MHz US</div>
          </div>
          <div className="sm-kpi-cell">
            <div className="sm-kpi-label">Headcount</div>
            <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--text)' } as React.CSSProperties}>{quarterlyData['Q3 2025'].employees ? quarterlyData['Q3 2025'].employees.toLocaleString() : '—'}</div>
            <div className="sm-kpi-sub">employees</div>
          </div>
        </div>
        </div>
      </div>
      </div>

      <div className="sm-note-panel sm-text-11">
        Data sourced from SEC filings (10-K, 10-K/A, 10-Q). Latest filing: Q3 2025 10-Q (Nov 10, 2025).
      </div>

      {/* Historical Trend Charts */}
      {/* ROW 1: Cash Position & OpEx */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-cyan">Cash Position Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).filter(q => q.cashAndEquiv !== null).reverse().map(q => ({
              label: q.label,
              value: q.cashAndEquiv,
              display: `$${q.cashAndEquiv}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <>
                <div className="sm-card-body sm-overflow-x sm-scroll-hint" style={{ paddingBottom: 0 }}>
                  <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>
                        <div style={{ width: '100%', background: 'var(--mint)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                        <div className="sm-micro-text sm-text-center" style={{ marginTop: 6, whiteSpace: 'nowrap' }}>{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm-text-11" style={{ padding: '0 24px 24px' }}>Major raises: $462M SPAC (Apr'21), $210M equity (Jan'24), $500M ATM (Aug'25). Includes restricted cash.</div>
              </>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-violet">Quarterly Burn Rate (OpEx)<UpdateIndicators sources="SEC" /></span>
          </div>
          <div className="sm-card-body">
          {(() => {
            const data = Object.values(quarterlyData).filter(q => q.opEx !== null).reverse().map(q => ({
              label: q.label,
              value: q.opEx,
              display: `$${q.opEx}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-overflow-x sm-scroll-hint">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                  {data.map((d, i) => (
                    <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                      <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>
                      <div style={{ width: '100%', background: 'var(--violet)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                      <div className="sm-micro-text sm-text-center" style={{ marginTop: 6, whiteSpace: 'nowrap' }}>{d.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          {/* OpEx Breakdown with quarter selector */}
          {opExQuarters.length > 0 && (
            <div className="sm-border-t sm-pt-12">
              <div className="sm-flex-between">
                <span className="sm-text-11">OpEx Breakdown</span>
                <select
                  value={opExQuarter}
                  onChange={(e) => setOpExQuarter(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 99, padding: '2px 8px', fontSize: 11, color: 'var(--text1)' }}
                >
                  {opExQuarters.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              {quarterlyData[opExQuarter]?.opExEngineering && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 11 }}>
                    <div className="sm-flex-between">
                      <span className="sm-text3">Engineering:</span>
                      <span className="sm-violet">${quarterlyData[opExQuarter].opExEngineering}M</span>
                    </div>
                    <div className="sm-flex-between">
                      <span className="sm-text3">G&A:</span>
                      <span className="sm-violet">${quarterlyData[opExQuarter].opExGandA}M</span>
                    </div>
                    <div className="sm-flex-between">
                      <span className="sm-text3">R&D:</span>
                      <span className="sm-violet">${quarterlyData[opExQuarter].opExRandD}M</span>
                    </div>
                    {quarterlyData[opExQuarter].opExDandA && (
                      <div className="sm-flex-between">
                        <span className="sm-text3">D&A:</span>
                        <span className="sm-violet">${quarterlyData[opExQuarter].opExDandA}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExSBC && (
                      <div className="sm-flex-between">
                        <span className="sm-text3">Stock-Based Comp:</span>
                        <span className="sm-violet">${quarterlyData[opExQuarter].opExSBC}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExCostOfRev && (
                      <div className="sm-flex-between">
                        <span className="sm-text3">Cost of Revenue:</span>
                        <span className="sm-violet">${quarterlyData[opExQuarter].opExCostOfRev}M</span>
                      </div>
                    )}
                  </div>
                  <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 500 }}>
                      <span className="sm-text2">Total OpEx (GAAP):</span>
                      <span className="sm-violet">${quarterlyData[opExQuarter].opEx}M</span>
                    </div>
                    {quarterlyData[opExQuarter].adjOpEx && (
                      <div className="sm-flex-between sm-text-11">
                        <span className="sm-text3">Adj. OpEx (ex D&A, SBC):</span>
                        <span className="sm-cyan">${quarterlyData[opExQuarter].adjOpEx}M</span>
                      </div>
                    )}
                    {(quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal) && (
                      <div className="sm-flex-between sm-text-11">
                        <span className="sm-text3">CapEx:</span>
                        <span className="sm-gold">${quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal}M</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </div>

      {/* ROW 2: Share Count & Market Cap */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-gold">Share Count (Outstanding / Implied / Fully Diluted)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0).map(d => ({
              label: d.label,
              value: d.sharesOutstanding,
              display: `${d.sharesOutstanding}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <>
                <div className="sm-card-body sm-overflow-x sm-scroll-hint" style={{ paddingBottom: 0 }}>
                  <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>
                        <div style={{ width: '100%', background: 'var(--coral)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                        <div className="sm-micro-text sm-text-center" style={{ marginTop: 6, whiteSpace: 'nowrap' }}>{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm-text-11" style={{ padding: '0 24px 24px' }}>Class B (founders) + Class C (strategic partners) convert to Class A over time. Dilution from ATM, converts, RSUs.</div>
              </>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-sky">Market Cap Evolution ($M)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0 && d.stockPrice > 0).map(d => ({
              label: d.label,
              value: d.sharesOutstanding * d.stockPrice,
              display: (d.sharesOutstanding * d.stockPrice) >= 1000 ? `$${((d.sharesOutstanding * d.stockPrice) / 1000).toFixed(1)}B` : `$${(d.sharesOutstanding * d.stockPrice).toFixed(0)}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <>
                <div className="sm-card-body sm-overflow-x sm-scroll-hint" style={{ paddingBottom: 0 }}>
                  <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>
                        <div style={{ width: '100%', background: 'var(--sky)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                        <div className="sm-micro-text sm-text-center" style={{ marginTop: 6, whiteSpace: 'nowrap' }}>{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm-text-11" style={{ padding: '0 24px 24px' }}>Price × shares. Rally post Block 1 launch (Sep'24). Peak ~$78 (Oct'25). Implied includes Class B/C.</div>
              </>
            );
          })()}
        </div>
      </div>

      {/* ROW 3: Company-Specific (Satellites) */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-cyan">Satellites Deployed<UpdateIndicators sources="PR" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().map(d => ({
              label: d.label,
              value: d.satellites,
              display: `${d.satellites}`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <>
                <div className="sm-card-body sm-overflow-x sm-scroll-hint" style={{ paddingBottom: 0 }}>
                  <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>
                        <div style={{ width: '100%', background: 'var(--cyan)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                        <div className="sm-micro-text sm-text-center" style={{ marginTop: 6, whiteSpace: 'nowrap' }}>{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm-text-11" style={{ padding: '0 24px 24px' }}>BW3 (test, Sep'22) → BB1-5 (Block 1, Sep'24) → BB6 (Block 2, Dec'25). Target: 168 sats for global coverage.</div>
              </>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-flex sm-mint">Net Income/(Loss)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).filter(q => q.netLoss !== null).reverse().map(q => ({
              label: q.label,
              value: q.netLoss,
              display: q.netLoss >= 0 ? `$${q.netLoss}M` : `($${Math.abs(q.netLoss)}M)`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const hasPositive = data.some(d => d.value >= 0);
            const hasNegative = data.some(d => d.value < 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-card-body sm-overflow-x sm-scroll-hint">
                <div style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {hasPositive && (
                  <div className="sm-fin-chart" style={{ height: hasNegative ? '50%' : undefined }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        {d.value >= 0 && <div className="sm-mono-sm sm-fw-600 sm-text sm-mb-6" style={{ whiteSpace: 'nowrap' }}>{d.display}</div>}
                        <div style={{ width: '100%', background: d.value >= 0 ? 'var(--mint)' : 'transparent', borderRadius: '4px 4px 0 0', height: d.value >= 0 && maxVal > 0 ? `${Math.round((d.value / maxVal) * 72)}%` : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: overflow ? 4 : 12, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                  {data.map((d, i) => (
                    <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined} style={{ textAlign: 'center', fontSize: 10, color: 'var(--text3)', padding: '4px 0' }}>{d.label}</div>
                  ))}
                </div>
                {hasNegative && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: overflow ? 4 : 12, height: hasPositive ? 110 : 220 }}>
                    {data.map((d, i) => (
                      <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                        <div style={{ width: '100%', background: d.value < 0 ? 'var(--coral)' : 'transparent', borderRadius: '0 0 4px 4px', height: d.value < 0 && maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value < 0 ? 2 : 0, transition: 'height 0.3s' }} />
                        {d.value < 0 && <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace", color: 'var(--text)', marginTop: 6, whiteSpace: 'nowrap' }}>{d.display}</div>}
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
};

// TIMELINE TAB - Historical log of assumption changes, guidance updates, and company events
const TimelineTab = () => {
  const [showAllPR, setShowAllPR] = useState(false);

  // [PR_CHECKLIST_RECENT_PRESS_RELEASES] - MANDATORY: Add new PR at top!
  const pressReleases = [
    { date: 'Feb 23, 2026', category: 'Government', color: 'var(--gold)', title: 'SDA $30M HALO Europa Prime Contract — AST SpaceMobile USA Defense Subsidiary' },
    { date: 'Feb 19, 2026', category: 'Event', color: 'var(--text3)', title: 'Q4 2025 Quarterly Business Update Scheduled for March 2, 2026' },
    { date: 'Jan 22, 2026', category: 'Launch', color: 'var(--mint)', title: 'BlueBird 7 Launch Timing — Late Feb on New Glenn' },
    { date: 'Jan 16, 2026', category: 'Government', color: 'var(--gold)', title: 'MDA SHIELD Prime Contract Award — Golden Dome Program' },
    { date: 'Dec 24, 2025', category: 'Launch', color: 'var(--mint)', title: 'BlueBird 6 Successfully Deployed — First Block 2 Satellite in Orbit' },
    { date: 'Nov 2025', category: 'Earnings', color: 'var(--gold)', title: 'Q3 2025 Results: $1.22B Cash, 6 Satellites Operational' },
    { date: 'Oct 2025', category: 'Partnership', color: 'var(--cyan)', title: 'Verizon Definitive Agreement — $100M+ Commitment' },
  ];
  const displayedPR = showAllPR ? pressReleases : pressReleases.slice(0, 5);
  const hiddenPRCount = pressReleases.length - 5;

  const secFilterTypes = ASTS_SEC_FILTER_TYPES;

  // ============================================================================
  // CRITICAL RULE FOR AI ASSISTANTS AND FUTURE EDITORS:
  // ============================================================================
  // NEVER modify or delete historical timeline entries once added!
  // 
  // This is a permanent audit trail. If information becomes outdated or incorrect:
  //   1. DO NOT edit the original entry
  //   2. ADD a new entry with the correction, referencing the old one
  //   3. Use "supersedes" field to link corrections: supersedes: '2025-01-15 entry title'
  //   4. Mark corrected entries with: corrected: true, correctedBy: 'YYYY-MM-DD entry'
  //
  // Example of correction:
  //   Original (DO NOT DELETE): { date: '2025-01-15', title: 'Target 20 sats by Q2', ... }
  //   Correction (ADD NEW):     { date: '2025-03-01', title: 'Target revised to 45 sats', 
  //                               supersedes: '2025-01-15 Target 20 sats by Q2', ... }
  //
  // This preserves the historical record of how guidance/data evolved over time,
  // which is essential for understanding thesis development and management credibility.
  //
  // Data Sources: SEC EDGAR (10-K, 10-Q, 8-K, S-1), Press Releases, Earnings Calls
  // Last comprehensive PR review: February 2026 (PRs from 2020-2026 added)
  // ============================================================================
  
  // Timeline log - chronological record of ACTUAL COMPANY changes (not model creation notes)
  // Categories: GUIDANCE (mgmt projections), DATA (SEC filings, actuals), EVENT (catalysts/news), LAUNCH (orbital launches)
  const timelineEvents = ASTS_TIMELINE_EVENTS;

  // Category definitions - CRCL unified style (Title Case, no emojis)
  const categoryColors = {
    'Partnership': { bg: 'bg-orange-900/30', border: 'border-orange-700', text: 'text-orange-400', label: 'Partnership' },
    'Corporate': { bg: 'bg-slate-800/50', border: 'border-slate-600', text: 'text-slate-300', label: 'Corporate' },
    'Product': { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400', label: 'Product' },
    'Regulatory': { bg: 'bg-pink-900/30', border: 'border-pink-700', text: 'text-pink-400', label: 'Regulatory' },
    'SEC Filing': { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400', label: 'SEC Filing' },
    'Capital': { bg: 'bg-emerald-900/30', border: 'border-emerald-700', text: 'text-emerald-400', label: 'Capital' },
    'Earnings': { bg: 'bg-teal-900/30', border: 'border-teal-700', text: 'text-teal-400', label: 'Earnings' },
    'Guidance': { bg: 'bg-purple-900/30', border: 'border-purple-700', text: 'text-purple-400', label: 'Guidance' },
  };

  // Topic tags for multi-select filtering (AND logic)
  const topicTags = {
    TECH: { label: 'Tech', color: 'bg-cyan-600' },
    COMMERCIAL: { label: 'Commercial', color: 'bg-orange-600' },
    REGULATORY: { label: 'Regulatory', color: 'bg-pink-600' },
    FUNDING: { label: 'Funding', color: 'bg-emerald-600' },
    GOVERNMENT: { label: 'Government', color: 'bg-red-600' },
    MANUFACTURING: { label: 'Manufacturing', color: 'bg-indigo-600' },
    SPECTRUM: { label: 'Spectrum', color: 'bg-violet-600' },
  };

  const [expanded, setExpanded] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Toggle topic selection (for AND logic multi-select)
  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  // Auto-detect topics from entry content
  const detectTopics = (entry) => {
    const topics = [];
    const text = `${entry.title} ${entry.summary} ${entry.details?.join(' ') || ''}`.toLowerCase();
    
    // TECH: ASIC, processing, bandwidth, antenna, array, phased, autonomous, VoLTE, 5G, broadband
    if (/asic|processing|bandwidth|antenna|array|phased|autonomous|volte|5g|broadband|micron|capacity/.test(text)) topics.push('TECH');
    
    // COMMERCIAL: MNO names, agreement, partnership, prepayment, revenue share
    if (/at&t|verizon|vodafone|rakuten|stc|bell|mno|agreement|partnership|prepay|commercial|definitive/.test(text)) topics.push('COMMERCIAL');
    
    // REGULATORY: FCC, ITU, STA, license, authorization, spectrum (filing context)
    if (/fcc|itu|sta\b|license|authorization|regulatory|filing|approval/.test(text)) topics.push('REGULATORY');
    
    // FUNDING: convertible, equity, ATM, offering, cash, debt, financing, warrant
    if (/convert|equity|atm|offering|cash|debt|financ|warrant|proceeds|raised/.test(text)) topics.push('FUNDING');
    
    // GOVERNMENT: DoD, SDA, government, contract, military, defense, HALO, pLEO, FirstNet
    if (/dod|sda|government|contract|military|defense|halo|pleo|firstnet|golden dome/.test(text)) topics.push('GOVERNMENT');
    
    // MANUFACTURING: production, facility, manufacturing, employees, vertical integration
    if (/production|facility|manufactur|employee|vertical|factory|assembly|texas|midland|barcelona/.test(text)) topics.push('MANUFACTURING');
    
    // SPECTRUM: L-band, S-band, MHz, spectrum (ownership context), Ligado
    if (/l-band|s-band|mhz|spectrum|ligado|elliosat/.test(text)) topics.push('SPECTRUM');
    
    return topics;
  };

  const filteredEntries = (filterCategory === 'ALL' 
    ? timelineEvents 
    : timelineEvents.filter(p => p.category === filterCategory))
    .filter(p => {
      // If no topics selected, show all
      if (selectedTopics.length === 0) return true;
      // AND logic: entry must match ALL selected topics
      const entryTopics = detectTopics(p);
      return selectedTopics.every(t => entryTopics.includes(t));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first

  return (
    <SharedTimelineTab
      sectionLabel="Corporate Events"
      title="Timeline"
      description="SEC filings, press releases, upcoming events, and key corporate milestones. Chronological record of all official communications and regulatory submissions."
      sources="PR"
    >
      {/* SEC Filings — Redesigned card layout with KPI strip + cross-ref dots */}
      <SharedSecFilingsSection
        filings={ASTS_SEC_FILINGS}
        secMeta={ASTS_SEC_META}
        typeColors={ASTS_SEC_TYPE_COLORS}
        filterTypes={secFilterTypes}
        crossRefIndex={ASTS_FILING_CROSS_REFS}
        initialVisibleCount={5}
      />

      {/* Upcoming Events + Recent Press Releases */}
      <div className="sm-divider">
        <span className="sm-param-label">Events & Press Releases</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-2-lg">
        <div>
          <div className="sm-card">
            <div className="sm-card-header">
              <span className="sm-section-label">Upcoming Events<UpdateIndicators sources="PR" /></span>
            </div>
            <div className="sm-card-body">
              <div className="sm-tl-event-list">
                <div className="sm-tl-event-item">
                  <div>
                    <div className="sm-text sm-fw-600">Q4 2025 Earnings</div>
                    <div className="sm-subtle">10-K Annual Report</div>
                  </div>
                  <div className="sm-text-right">
                    <div className="sm-mono-sm sm-cyan">~Mar 2026</div>
                    <div className="sm-tl-event-sub">Est.</div>
                  </div>
                </div>
                <div className="sm-tl-event-item">
                  <div>
                    <div className="sm-text sm-fw-600">BB7-BB11 Launches</div>
                    <div className="sm-subtle">Block 2 constellation expansion</div>
                  </div>
                  <div className="sm-text-right">
                    <div className="sm-mono-sm sm-mint">Q1 2026</div>
                    <div className="sm-tl-event-sub">45-60 sats by EOY</div>
                  </div>
                </div>
                <div className="sm-tl-event-item">
                  <div>
                    <div className="sm-text sm-fw-600">Commercial Service Launch</div>
                    <div className="sm-subtle">Initial revenue generation</div>
                  </div>
                  <div className="sm-text-right">
                    <div className="sm-mono-sm sm-gold">H1 2026</div>
                    <div className="sm-tl-event-sub">Post-constellation</div>
                  </div>
                </div>
                <div className="sm-tl-event-item">
                  <div>
                    <div className="sm-text sm-fw-600">Convertible Notes Maturity</div>
                    <div className="sm-subtle">$698M converts @ 4.25%</div>
                  </div>
                  <div className="sm-text-right">
                    <div className="sm-mono-sm sm-sky">2028-2030</div>
                    <div className="sm-tl-event-sub">Per 10-Q</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sm-card">
            <div className="sm-card-header">
              <span className="sm-section-label">Recent Press Releases<UpdateIndicators sources="PR" /></span>
            </div>
            <div className="sm-card-body">
              <div className="sm-tl-pr-list">
                {displayedPR.map((pr, i) => (
                  <div key={i} className="sm-tl-pr-item-v2">
                    <div className="sm-tl-pr-meta">
                      <span className="sm-tl-pr-date">{pr.date}</span>
                      <span className="sm-tl-pr-cat" style={{ color: pr.color }}>{pr.category}</span>
                    </div>
                    <div className="sm-tl-pr-title">{pr.title}</div>
                  </div>
                ))}
              </div>
              {hiddenPRCount > 0 && (
                <div style={{ textAlign: 'center', paddingTop: 16 }}>
                  <button
                    onClick={() => setShowAllPR(!showAllPR)}
                    className="sm-expand-btn"
                    aria-expanded={showAllPR}
                  >
                    {showAllPR ? '▲ Show Less' : `▼ Show ${hiddenPRCount} More`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline — matches Ecosystem Intelligence layout */}
      <div className="sm-divider">
        <span className="sm-param-label">Event Timeline</span>
        <span className="sm-divider-line" />
      </div>

      {/* Topic Filter */}
      <div className="sm-panel sm-mt-8 sm-p-24 sm-rounded-16">
        <p className="sm-text2 sm-lh-16 sm-fs-13 sm-bmnr-mb-4-reset">Track <strong>key events</strong> for AST SpaceMobile — partnerships, launches, regulatory milestones, capital raises, earnings, and guidance updates</p>
        <p className="sm-subtle-sm sm-italic sm-bmnr-mb-16-reset">Company-level catalysts and developments in chronological order</p>
        <div className="sm-flex-between sm-mb-8">
          <span className="sm-section-label">Filter by Topic</span>
          {selectedTopics.length > 0 && (
            <button
              onClick={() => setSelectedTopics([])}
              className="sm-bmnr-clear-btn"
              aria-label="Clear topic filter"
            >
              Clear ({selectedTopics.length})
            </button>
          )}
        </div>
        <div className="sm-flex-wrap sm-gap-6">
          {Object.entries(topicTags).map(([topic, topicStyle]) => {
            const isSelected = selectedTopics.includes(topic);
            const count = timelineEvents.filter(p => detectTopics(p).includes(topic)).length;
            return (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className="sm-filter-pill"
                data-active={isSelected}
                style={{ '--pill-accent': 'var(--cyan)' } as React.CSSProperties}
                aria-label={`Filter by ${topicStyle.label}`}
              >
                {topicStyle.label} ({count})
              </button>
            );
          })}
        </div>
        {selectedTopics.length > 0 && (
          <div className="sm-mono-sm sm-text3 sm-mt-8 sm-fs-11">
            {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEntries.length} results
          </div>
        )}
      </div>

      {/* Category pills row with Expand All button */}
      <div className="sm-flex-between sm-items-center sm-mt-8">
        <div className="sm-flex-wrap sm-gap-6">
          {['ALL', ...Object.keys(categoryColors)].map(cat => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="sm-filter-pill"
                data-active={isActive}
                style={{ '--pill-accent': 'var(--violet)' } as React.CSSProperties}
                aria-label={`Filter by category: ${cat}`}
              >
                {cat === 'ALL' ? `All (${timelineEvents.length})` : `${(categoryColors as Record<string, { label: string }>)[cat]?.label || cat} (${timelineEvents.filter(p => p.category === cat).length})`}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (expanded.size === filteredEntries.length) {
              setExpanded(new Set());
            } else {
              setExpanded(new Set(filteredEntries.map((_, i) => i)));
            }
          }}
          className="sm-filter-pill sm-nowrap"
          aria-label={expanded.size === filteredEntries.length ? 'Collapse all events' : 'Expand all events'}
        >
          {expanded.size === filteredEntries.length ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      {/* Timeline Events */}
      <div className="sm-card sm-mt-8">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, i) => {
            const isExpanded = expanded.has(i);
            const accentColor = entry.impact === 'Positive' ? 'var(--mint)' : entry.impact === 'Negative' ? 'var(--coral)' : 'var(--sky)';
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${entry.title} — ${entry.impact} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                className="sm-bmnr-news-row"
                style={{ '--news-accent': accentColor, borderBottom: i < filteredEntries.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' } as React.CSSProperties}
                onClick={() => {
                  const next = new Set(expanded);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpanded(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const next = new Set(expanded);
                    if (isExpanded) next.delete(i);
                    else next.add(i);
                    setExpanded(next);
                  }
                }}
              >
                <div className="sm-flex-between sm-items-start">
                  <div className="sm-flex-1">
                    <div className="sm-flex-wrap sm-gap-6 sm-mb-4">
                      <span className="sm-mono-sm sm-text3 sm-fs-10">{entry.date}</span>
                      <span className="sm-micro-badge sm-bmnr-cat-badge" data-type="category">{entry.category}</span>
                    </div>
                    <div className="sm-text sm-fw-600 sm-lh-14 sm-fs-13">{entry.title}</div>
                  </div>
                  <span className="sm-bmnr-impact-val" style={{ color: accentColor }}>
                    {entry.impact === 'Positive' ? '+' : entry.impact === 'Negative' ? '-' : '~'} {entry.impact === 'Positive' ? 'Bullish' : entry.impact === 'Negative' ? 'Bearish' : 'Neutral'}
                  </span>
                </div>
                {isExpanded && (
                  <div className="sm-bmnr-news-detail">
                    <div className="sm-text-13 sm-lh-16">{entry.summary}</div>

                    {entry.details && entry.details.length > 0 && (
                      <div className="sm-bmnr-insight-card" style={{ '--insight-color': 'var(--cyan)' } as React.CSSProperties}>
                        <div className="sm-micro-label sm-cyan sm-mb-4 sm-ls-1">Key Details</div>
                        <ul className="sm-subtle sm-text2 sm-lh-15" style={{ paddingLeft: 16, margin: 0 }}>
                          {entry.details.map((detail, j) => (
                            <li key={j} style={{ marginBottom: 2 }}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.prevValue && (
                      <div className="sm-bmnr-insight-card" style={{ '--insight-color': 'var(--mint)', marginTop: 8 } as React.CSSProperties}>
                        <div className="sm-micro-label sm-mint sm-mb-4 sm-ls-1">Change Indicator</div>
                        <div className="sm-subtle sm-text2 sm-lh-15">
                          <span style={{ textDecoration: 'line-through', color: 'var(--coral)' }}>{entry.prevValue}</span>
                          <span style={{ margin: '0 8px', color: 'var(--text3)' }}>→</span>
                          <span style={{ color: 'var(--mint)' }}>{entry.newValue}</span>
                        </div>
                      </div>
                    )}

                    <div className="sm-bmnr-source-text">Source: {entry.sources.join(', ')}</div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="sm-empty-state">No events matching filters</div>
        )}
      </div>

      {/* How to Use - Unified styling */}
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">How to Use This Log</span>
        </div>
        <div className="sm-card-body">
        <div className="sm-tl-explain-grid">
          <div>
            <h4 className="sm-cyan sm-fw-500 sm-mb-8">Categories Explained</h4>
            <ul className="sm-flex-col sm-text2" style={{ gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><span className="sm-gold">Partnership:</span> Commercial agreements, MNO deals, government contracts</li>
              <li><span className="sm-mint">Product:</span> Satellite launches, tech milestones, deployments</li>
              <li><span style={{ color: 'var(--pink)' }}>Regulatory:</span> FCC approvals, spectrum licenses, authorizations</li>
              <li><span style={{ color: 'var(--green)' }}>Capital:</span> Equity offerings, convertible notes, financing</li>
              <li><span className="sm-violet">Guidance:</span> Management projections, targets, timelines</li>
              <li><span className="sm-cyan">Earnings:</span> Quarterly results, SEC filings, business updates</li>
            </ul>
          </div>
          <div>
            <h4 className="sm-cyan sm-fw-500 sm-mb-8">Updating This Log</h4>
            <ul className="sm-flex-col sm-text2" style={{ gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li>• Add new entries chronologically at the top</li>
              <li>• Include sources for traceability</li>
              <li>• Note prev → new values for comparisons</li>
              <li>• Tag impact: Positive/Negative/Neutral/Mixed</li>
            </ul>
          </div>
        </div>
        </div>
      </div>

      <CFANotes title="CFA Level III — SEC Filings" items={[
        { term: '10-K / 10-Q', def: 'Annual (10-K) and quarterly (10-Q) reports. 10-K is audited and comprehensive; 10-Q is unaudited. Both contain financial statements, MD&A, risk factors.' },
        { term: '8-K', def: 'Current report for material events (earnings, leadership changes, acquisitions). Filed within 4 business days. Often the first signal of important developments.' },
        { term: 'S-1 / S-3', def: 'Registration statements for securities offerings. S-1 for IPOs (requires full disclosure); S-3 for seasoned issuers (shelf registration for future offerings).' },
        { term: 'DEF 14A / DEFA14A', def: 'Proxy statements for shareholder meetings. DEF 14A is the definitive proxy; DEFA14A is additional solicitation material. Contains executive compensation, board nominees, shareholder proposals.' },
      ]} />
    </SharedTimelineTab>
  );
};

const CompsTab = ({ calc, currentStockPrice }) => {
  const [competitorFilter, setCompetitorFilter] = useState<CompetitorId | 'all'>('all');
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('All');

  // ═══════════════════════════════════════════════════════════════════════════
  // VALUATION COMPARABLES - Market metrics comparison
  // ═══════════════════════════════════════════════════════════════════════════
  const [selectedCompCategory, setSelectedCompCategory] = useState<string>('all');

  const comps = [
    { name: 'ASTS SpaceMobile', ticker: 'ASTS', category: 'd2d', mc: calc.marketCap, evRev: calc.evToRevFwd, pSub: calc.pricePerSub, subs: calc.potentialSubs, highlight: true },
    { name: 'Starlink', ticker: 'Private', category: 'd2c', mc: 175000, evRev: 17, pSub: 43750, subs: 4 },
    { name: 'Iridium', ticker: 'IRDM', category: 'satcom', mc: 6500, evRev: 3.5, pSub: 3095, subs: 2.1 },
    { name: 'Globalstar', ticker: 'GSAT', category: 'satcom', mc: 3500, evRev: 4.2, pSub: 2333, subs: 1.5 },
    { name: 'Verizon', ticker: 'VZ', category: 'telco', mc: 175000, evRev: 1.3, pSub: 1520, subs: 115 },
    { name: 'T-Mobile', ticker: 'TMUS', category: 'telco', mc: 280000, evRev: 3.4, pSub: 2240, subs: 125 },
    { name: 'AT&T', ticker: 'T', category: 'telco', mc: 165000, evRev: 1.3, pSub: 1500, subs: 110 },
  ];

  const compCategories = [
    { key: 'all', label: 'All Peers' },
    { key: 'd2d', label: 'D2D Satellite' },
    { key: 'd2c', label: 'D2C Satellite' },
    { key: 'satcom', label: 'SatCom' },
    { key: 'telco', label: 'Terrestrial Telco' },
  ];

  const filteredComps = selectedCompCategory === 'all'
    ? comps
    : comps.filter(c => c.category === selectedCompCategory || c.highlight);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR PROFILES - D2D/Satellite competitors to track
  // Update capabilities and status as new information emerges
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_PROFILES: CompetitorProfile[] = [
    {
      id: 'starlink-tmobile',
      name: 'Starlink / T-Mobile',
      description: 'SpaceX Direct-to-Cell - SMS commercial in US + Europe (Ukraine), voice/data roadmap',
      technology: '650+ D2C satellites, 2.7x2.3m phased arrays, custom silicon, LTE/4G protocols',
      currentStatus: 'SMS live (US beta, Ukraine commercial Nov 2025), 8+ MNO partners, voice/data coming',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: '650+ D2C', coverage: 'US + Europe (Ukraine first)', subscribers: 'Kyivstar 22.5M eligible', funding: 'SpaceX vertical integration' }
    },
    {
      id: 'lynk',
      name: 'Lynk Global (+ Omnispace)',
      description: 'D2D provider merging with Omnispace (Oct 2025), SES as major shareholder',
      technology: 'Small sats + Omnispace 60 MHz S-band spectrum, multi-spectrum platform',
      currentStatus: 'Merger pending, FCC US license (Apr 2025), 50+ MNO partners, 50+ countries',
      capabilities: { voice: true, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: 15, coverage: 'S-band: 1B+ people (Americas/Europe/Africa/Asia)', subscribers: 'B2B via MNOs', funding: 'SES-backed post-merger' }
    },
    {
      id: 'apple-globalstar',
      name: 'Apple / Globalstar',
      description: 'Emergency SOS service on iPhone 14+, expanding to messaging',
      technology: 'Globalstar constellation with Apple-designed modem',
      currentStatus: 'Emergency SOS live, expanding features',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 24, coverage: 'Global (emergency)', subscribers: 'All iPhone 14+ users', funding: '$450M from Apple' }
    },
    {
      id: 'skylo',
      name: 'Skylo Technologies',
      description: 'NB-NTN via GEO satellites - powers Google Pixel + Verizon satellite SOS/SMS',
      technology: '3GPP NB-NTN on existing GEO sats, licensed MSS L-band spectrum, cloud-native vRAN',
      currentStatus: 'Pixel 9/10 satellite SOS, Pixel Watch 4 (first smartwatch), Verizon SMS live',
      capabilities: { voice: false, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: true },
      keyMetrics: { satellites: 'GEO partners', coverage: 'US, Canada, EU, Australia', subscribers: 'Pixel 9/10 + Verizon users', funding: '$116M raised' }
    },
    {
      id: 'iridium',
      name: 'Iridium',
      description: 'Legacy sat phone provider + NTN Direct (3GPP NB-IoT) for D2D/IoT',
      technology: '66-sat LEO constellation, L-band MSS spectrum, NB-IoT NTN via software update',
      currentStatus: 'Sat phones live, NTN Direct (Project Stardust) testing 2025, service 2026',
      capabilities: { voice: true, text: true, data: true, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 66, coverage: 'Truly global (incl. poles)', subscribers: '2.2M (1.7M IoT)', funding: 'Public (IRDM)' }
    },
    {
      id: 'amazon-leo',
      name: 'Amazon Leo',
      description: 'Amazon\'s LEO satellite broadband (fka Project Kuiper) - terminal-based, NOT D2D',
      technology: 'LEO constellation with Leo Nano/Pro/Ultra terminals (100Mbps-1Gbps)',
      currentStatus: '212 satellites launched (Jan 2026), enterprise preview live',
      capabilities: { voice: false, text: false, data: true, video: false, unmodifiedPhones: false, globalCoverage: false },
      keyMetrics: { satellites: 212, coverage: 'Building to 3,232', subscribers: 'Enterprise preview', funding: '$10B committed' }
    },
    {
      id: 'echostar',
      name: 'EchoStar / Hughes',
      description: 'D2D LEO constellation via MDA AURORA - broadband NTN to 5G NTN devices, 2029 service',
      technology: 'MDA AURORA software-defined LEO sats, 2GHz S-band/AWS-4 spectrum, Open RAN 5G, 3GPP NTN',
      currentStatus: 'Contract signed Aug 2025, satellites 2028, commercial service 2029',
      capabilities: { voice: true, text: true, data: true, video: true, unmodifiedPhones: true, globalCoverage: true },
      keyMetrics: { satellites: '200 initial (scalable to 1000s)', coverage: 'US + global (2GHz spectrum)', subscribers: 'Pre-launch', funding: '$5B LEO project, $18B total NTN since 2012' }
    },
    {
      id: 'oq-technology',
      name: 'OQ Technology',
      description: 'European LEO 5G NTN operator for NB-IoT and D2D — Luxembourg-based (founded 2016 by Omar Qaise, ex-SES), sovereign EU positioning',
      technology: '10 LEO 6U cubesats, 60 MHz MSS S-band + upper C-band + IMT band, 3GPP NTN NB-IoT/D2D, in-house RAN stack + 5G core',
      currentStatus: '10 sats in orbit, IoT commercial (20+ MNO roaming), D2D emergency broadcast Nov 2025, 5NETSAT mission Aug 2025, D2D messaging targeting 2026, 30 new sats planned by end 2026',
      capabilities: { voice: false, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: '10 (30 more by end 2026, 100 target in 2-3 yrs)', coverage: 'Global IoT + expanding D2D, licensed in AU/LU/DE/SA/NG/RW', subscribers: '20+ MNO roaming (DT, KPN, Telefónica, Transatel, Emnify)', funding: '€13M Series A (Aramco) + LSSD convertible (SES) + €17.5M EIC; Series B targeting €35-40M' }
    }
  ];

  // Competitor news timeline — imported from @/data/asts/comps-timeline.ts
  // Add new entries there, not here.

  // Filter news by competitor, sort by date (newest first)
  const filteredNews = React.useMemo(() =>
    (competitorFilter === 'all'
      ? [...COMPETITOR_NEWS]
      : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [competitorFilter]
  );

  // Compute news categories and filtered news by category
  const newsCategories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const filteredCompNews = filteredNews.filter(n => newsCategoryFilter === 'All' || n.category === newsCategoryFilter);

  // Get competitor display name
  const getCompetitorName = (id: CompetitorId): string => {
    if (id === 'other') return 'Miscellaneous';
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };


  // Implication styling - using design tokens
  const getImplicationStyle = (impl: CompetitorNewsEntry['implication']) => {
    switch (impl) {
      case 'positive': return { bg: 'var(--mint-dim)', color: 'var(--mint)', label: '✓ Good for ASTS' };
      case 'negative': return { bg: 'var(--coral-dim)', color: 'var(--coral)', label: '⚠ Threat to ASTS' };
      default: return { bg: 'var(--surface3)', color: 'var(--text3)', label: '○ Neutral' };
    }
  };

  // Category styling - using design tokens
  const getCategoryStyle = (cat: CompetitorNewsCategory) => {
    const styles: Record<CompetitorNewsCategory, { bg: string; color: string }> = {
      'Launch': { bg: 'var(--mint-dim)', color: 'var(--mint)' },
      'Partnership': { bg: 'var(--sky-dim)', color: 'var(--sky)' },
      'Technology': { bg: 'var(--violet-dim)', color: 'var(--violet)' },
      'Regulatory': { bg: 'var(--gold-dim)', color: 'var(--gold)' },
      'Financial': { bg: 'var(--cyan-dim)', color: 'var(--cyan)' },
      'Coverage': { bg: 'var(--coral-dim)', color: 'var(--coral)' },
      'Product': { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    };
    return styles[cat] || { bg: 'var(--surface3)', color: 'var(--text3)' };
  };

  // Key competitors with threat levels for colored borders
  const keyCompetitors = [
    {
      name: 'SpaceX Starlink',
      type: 'LEO Broadband + D2D',
      status: 'Operational',
      focus: 'Terminal-based broadband, D2D partnership with T-Mobile',
      threat: 'High',
      notes: 'Largest LEO constellation. D2D beta with T-Mobile for texts/calls. Not full broadband D2D yet.'
    },
    {
      name: 'Amazon Leo',
      type: 'LEO Broadband',
      status: '212 Satellites (Jan 2026)',
      focus: 'Terminal-based broadband (Leo Nano/Pro/Ultra terminals)',
      threat: 'Medium',
      notes: 'Rebranded from Project Kuiper Nov 2025. 7 missions in 2025, enterprise preview live. Not D2D - different market.'
    },
    {
      name: 'Lynk Global',
      type: 'D2D (Text/IoT)',
      status: 'Limited Service',
      focus: 'Text messaging and IoT to unmodified phones',
      threat: 'Low',
      notes: 'Text-only. No voice/data. Limited satellite count. More complementary than competitive.'
    },
    {
      name: 'Apple/Globalstar',
      type: 'Emergency SOS',
      status: 'Operational',
      focus: 'Emergency messaging for iPhone only',
      threat: 'Low',
      notes: 'iPhone-only. Emergency texts only. Not commercial service. Different use case.'
    },
  ];

  // Map keyCompetitors to comps entries by partial name match
  const keyCompMap: Record<string, typeof keyCompetitors[0]> = {
    'Starlink': keyCompetitors[0],     // SpaceX Starlink
    'Globalstar': keyCompetitors[3],   // Apple/Globalstar
  };

  // Map COMPETITOR_PROFILES to comps entries
  const profileMap: Record<string, typeof COMPETITOR_PROFILES[0]> = {};
  COMPETITOR_PROFILES.forEach(p => {
    if (p.id === 'starlink-tmobile') profileMap['Starlink'] = p;
    else if (p.id === 'apple-globalstar') profileMap['Globalstar'] = p;
    else if (p.id === 'iridium') profileMap['Iridium'] = p;
  });

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = { d2d: 'D2D Satellite', d2c: 'D2C Satellite', satcom: 'SatCom', telco: 'Telco' };
    return labels[cat] || cat;
  };

  // keyCompetitors entries not in comps (Amazon Leo, Lynk Global)
  const extraCompetitors = keyCompetitors.filter(kc => {
    const nameMap: Record<string, boolean> = { 'SpaceX Starlink': true, 'Apple/Globalstar': true };
    return !nameMap[kc.name];
  });

  const extraProfileMap: Record<string, typeof COMPETITOR_PROFILES[0]> = {};
  COMPETITOR_PROFILES.forEach(p => {
    if (p.id === 'amazon-leo') extraProfileMap['Amazon Leo'] = p;
    else if (p.id === 'lynk') extraProfileMap['Lynk Global'] = p;
  });

  return (
    <div className="sm-flex-col">
      <div className="sm-tab-hero">
        <div className="sm-section-label">Comparables & Competitor Intelligence<UpdateIndicators sources={['PR', 'WS']} /></div>
        <h2>Comparables & Competitor Intelligence<span className="sm-accent">.</span></h2>
        <p>Unified view: valuation metrics, qualitative assessment, and D2D capabilities per company. No direct comps — Starlink ~$175B private, D2C model. Telcos 1-3x rev, mature.</p>
      </div>

      {/* Peer Group Selector */}
      <div className="sm-flex-wrap">
        {compCategories.map(cat => (
          <button
            key={cat.key}
            className="sm-cmp-filter-btn"
            data-active={selectedCompCategory === cat.key ? 'true' : undefined}
            onClick={() => setSelectedCompCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="sm-cmp-peer-grid">
        {filteredComps.map((c) => {
          const qual = keyCompMap[c.name];
          const profile = profileMap[c.name];
          const threatLevel = qual ? qual.threat.toLowerCase() : '';
          return (
            <div key={c.ticker} className="sm-cmp-peer-card" data-threat={threatLevel || undefined} data-self={c.highlight ? 'true' : undefined}>
              <div className="sm-cmp-card-header">
                <div>
                  <div className="sm-cmp-card-name">{c.name}</div>
                  <div className="sm-cmp-card-ticker">{c.ticker} · {getCategoryLabel(c.category)}</div>
                </div>
                <div className="sm-cmp-badge-row">
                  {qual && <span className="sm-cmp-badge" data-level={threatLevel}>{qual.threat}</span>}
                  <span className="sm-cmp-badge">{getCategoryLabel(c.category)}</span>
                </div>
              </div>
              <div className="sm-cmp-metrics-grid">
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">${(c.mc / 1000).toFixed(0)}B</div><div className="sm-cmp-metric-label">Mkt Cap</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">{c.evRev.toFixed(1)}x</div><div className="sm-cmp-metric-label">EV/Rev</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">${c.pSub.toLocaleString()}</div><div className="sm-cmp-metric-label">$/Sub</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">{c.subs.toFixed(0)}M</div><div className="sm-cmp-metric-label">Subs</div></div>
              </div>
              {c.highlight && (
                <div className="sm-cmp-cap-row">
                  <span className="sm-cmp-cap-tag" data-enabled="true">✓ Voice</span>
                  <span className="sm-cmp-cap-tag" data-enabled="true">✓ Text</span>
                  <span className="sm-cmp-cap-tag" data-enabled="true">✓ Data</span>
                  <span className="sm-cmp-cap-tag" data-enabled="true">✓ Video</span>
                  <span className="sm-cmp-cap-tag" data-enabled="true">✓ Unmod.</span>
                  <span className="sm-cmp-cap-tag">Building Global</span>
                </div>
              )}
              {!c.highlight && profile && (
                <div className="sm-cmp-cap-row">
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.voice ? 'true' : undefined}>{profile.capabilities.voice ? '✓' : '✗'} Voice</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.text ? 'true' : undefined}>{profile.capabilities.text ? '✓' : '✗'} Text</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.data ? 'true' : undefined}>{profile.capabilities.data ? '✓' : '✗'} Data</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.video ? 'true' : undefined}>{profile.capabilities.video ? '✓' : '✗'} Video</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.unmodifiedPhones ? 'true' : undefined}>{profile.capabilities.unmodifiedPhones ? '✓' : '✗'} Unmod.</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.globalCoverage ? 'true' : undefined}>{profile.capabilities.globalCoverage ? '✓' : '✗'} Global</span>
                </div>
              )}
              {qual && (
                <>
                  <div className="sm-subtle sm-text2 sm-mb-4" style={{ lineHeight: 1.5 }}><strong>Focus:</strong> {qual.focus}</div>
                  <div className="sm-subtle-sm sm-mt-8 sm-border-t" style={{ fontStyle: 'italic', paddingTop: 8, lineHeight: 1.5 }}>{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {/* Extra competitors not in comps (Amazon Leo, Lynk Global) - show when 'all' selected */}
        {selectedCompCategory === 'all' && extraCompetitors.map((kc, i) => {
          const profile = extraProfileMap[kc.name];
          const extraThreat = kc.threat.toLowerCase();
          return (
            <div key={`extra-${i}`} className="sm-cmp-peer-card" data-threat={extraThreat || undefined}>
              <div className="sm-cmp-card-header">
                <div>
                  <div className="sm-cmp-card-name">{kc.name}</div>
                  <div className="sm-cmp-card-ticker">{kc.type}</div>
                </div>
                <div className="sm-cmp-badge-row">
                  <span className="sm-cmp-badge" data-level={extraThreat}>{kc.threat}</span>
                </div>
              </div>
              {profile && (
                <div className="sm-cmp-cap-row">
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.voice ? 'true' : undefined}>{profile.capabilities.voice ? '✓' : '✗'} Voice</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.text ? 'true' : undefined}>{profile.capabilities.text ? '✓' : '✗'} Text</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.data ? 'true' : undefined}>{profile.capabilities.data ? '✓' : '✗'} Data</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.video ? 'true' : undefined}>{profile.capabilities.video ? '✓' : '✗'} Video</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.unmodifiedPhones ? 'true' : undefined}>{profile.capabilities.unmodifiedPhones ? '✓' : '✗'} Unmod.</span>
                  <span className="sm-cmp-cap-tag" data-enabled={profile.capabilities.globalCoverage ? 'true' : undefined}>{profile.capabilities.globalCoverage ? '✓' : '✗'} Global</span>
                </div>
              )}
              <div className="sm-subtle sm-text2 sm-mb-4" style={{ lineHeight: 1.5 }}><strong>Focus:</strong> {kc.focus}</div>
              <div className="sm-subtle-sm sm-mt-8 sm-border-t" style={{ fontStyle: 'italic', paddingTop: 8, lineHeight: 1.5 }}>{kc.notes}</div>
            </div>
          );
        })}
      </div>

      <div className="sm-divider">
        <span className="sm-param-label">Peer Valuation — EV/Revenue & $/Subscriber</span>
        <span className="sm-divider-line" />
      </div>
      <div className="sm-grid-sep-2col" style={{ gap: 16, background: 'transparent' }}>
        <div className="sm-card">
          <div className="sm-card-section" style={{ padding: '16px 20px' }}>
            <div className="sm-section-label sm-flex">EV/Rev Comparison</div>
          </div>
          <div style={{ padding: '24px 24px 16px', minHeight: 280 }}>
            <ResponsiveContainer width="100%" height={Math.max(280, Math.min(filteredComps.length * 44, 500))}>
              <BarChart data={filteredComps} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="var(--text3)" 
                  tick={{ fill: 'var(--text2)', fontSize: 11, fontWeight: 500 }} 
                  axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }} 
                  tickLine={{ stroke: 'var(--border)' }}
                  tickFormatter={(v) => `${v.toFixed(1)}x`}
                />
                <YAxis 
                  dataKey="ticker" 
                  type="category" 
                  stroke="var(--text3)" 
                  width={80} 
                  tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, padding: '8px 12px' }} 
                  labelStyle={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}
                  formatter={(value: number) => [`${value.toFixed(2)}x`, 'EV/Rev']}
                />
                <Bar dataKey="evRev" fill="var(--accent)" radius={[0, 6, 6, 0]} barSize={28}>
                  {filteredComps.map((e, i) => (<Cell key={i} fill={e.highlight ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 35%, transparent)'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="sm-card">
          <div className="sm-card-section" style={{ padding: '16px 20px' }}>
            <div className="sm-section-label sm-flex">$/Subscriber Comparison</div>
          </div>
          <div style={{ padding: '24px 24px 16px', minHeight: 280 }}>
            <ResponsiveContainer width="100%" height={Math.max(280, Math.min(filteredComps.length * 44, 500))}>
              <BarChart data={filteredComps} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="var(--text3)" 
                  tick={{ fill: 'var(--text2)', fontSize: 11, fontWeight: 500 }} 
                  tickFormatter={v => `$${(v/1000).toFixed(0)}k`} 
                  axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }} 
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  dataKey="ticker" 
                  type="category" 
                  stroke="var(--text3)" 
                  width={80} 
                  tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, padding: '8px 12px' }} 
                  labelStyle={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}
                  formatter={(v: number) => [`$${(v/1000).toFixed(1)}k`, '$/Subscriber']}
                />
                <Bar dataKey="pSub" fill="var(--violet)" radius={[0, 6, 6, 0]} barSize={28}>
                  {filteredComps.map((e, i) => (<Cell key={i} fill={e.highlight ? 'var(--violet)' : 'color-mix(in srgb, var(--violet) 35%, transparent)'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Valuation Matrices */}
      <div className="sm-divider">
        <span className="sm-param-label">Analytical Framework — Valuation</span>
        <span className="sm-divider-line" />
      </div>

      {/* Valuation Methodology Matrix */}
      <div className="sm-card sm-mt-8">
        <div className="sm-card-section" style={{ padding: '16px 20px' }}>
          <div className="sm-param-label sm-flex sm-gap-8">Implied Valuation Matrix<UpdateIndicators sources="WS" /></div>
          <p className="sm-text-13 sm-text3" style={{ margin: '4px 0 0' }}>ASTS value under different peer multiples and methodologies (current: ${(calc.marketCap / 1000).toFixed(1)}B)</p>
        </div>
        <div className="sm-cmp-table-scroll">
          <div style={{ minWidth: 560 }}>
            <div className="sm-cmp-table-header" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
              {['Method', 'Peer Basis', 'Multiple/Metric', 'Implied Value', 'Premium/(Discount)'].map((label, idx) => (
                <span key={label} className="sm-cmp-th" data-align={idx >= 2 ? 'right' : undefined}>{label}</span>
              ))}
            </div>
            {[
              { method: '$/Subscriber', basis: 'Starlink', metric: '$43,750/sub', implied: calc.potentialSubs * 43750, premium: ((calc.potentialSubs * 43750) / calc.marketCap - 1) * 100 },
              { method: '$/Subscriber', basis: 'T-Mobile', metric: '$2,240/sub', implied: calc.potentialSubs * 2240, premium: ((calc.potentialSubs * 2240) / calc.marketCap - 1) * 100 },
              { method: '$/Subscriber', basis: 'Verizon', metric: '$1,520/sub', implied: calc.potentialSubs * 1520, premium: ((calc.potentialSubs * 1520) / calc.marketCap - 1) * 100 },
              { method: 'EV/Rev (Fwd)', basis: 'Starlink', metric: '17x', implied: calc.fwdRevenue * 17, premium: ((calc.fwdRevenue * 17) / calc.marketCap - 1) * 100 },
              { method: 'EV/Rev (Fwd)', basis: 'High-Growth SaaS', metric: '10x', implied: calc.fwdRevenue * 10, premium: ((calc.fwdRevenue * 10) / calc.marketCap - 1) * 100 },
              { method: 'EV/Rev (Fwd)', basis: 'Telco Avg', metric: '2x', implied: calc.fwdRevenue * 2, premium: ((calc.fwdRevenue * 2) / calc.marketCap - 1) * 100 },
            ].map((v, i) => (
              <div key={i} className="sm-cmp-table-row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                <span className="sm-cmp-td-label">{v.method}</span>
                <span className="sm-cmp-td">{v.basis}</span>
                <span className="sm-cmp-td" data-align="right">{v.metric}</span>
                <span className="sm-cmp-td sm-mint" data-align="right">${(v.implied / 1000).toFixed(1)}B</span>
                <span className="sm-cmp-td" data-align="right" style={{ color: v.premium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {v.premium >= 0 ? '+' : ''}{v.premium.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm-grid-2">
        {/* SOTP Valuation */}
        <div>
          <div className="sm-card sm-mt-8">
          <div className="sm-card-section" style={{ padding: '16px 20px' }}>
            <div className="sm-param-label sm-flex sm-gap-8">Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
            <p className="sm-text-13 sm-text3" style={{ margin: '4px 0 0' }}>Value each business segment separately</p>
          </div>
          <div className="sm-cmp-table-scroll">
            <div style={{ minWidth: 440 }}>
              <div className="sm-cmp-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                {['Segment', 'Metric', 'Multiple', 'Value'].map((label, idx) => (
                  <span key={label} className="sm-cmp-th" data-align={idx > 0 ? 'right' : undefined}>{label}</span>
                ))}
              </div>
              {[
                { segment: 'US Commercial', basis: 'AT&T/VZ partnership', metric: `${(calc.potentialSubs * 0.4).toFixed(0)}M subs`, multiple: '$2,000/sub', value: calc.potentialSubs * 0.4 * 2000 },
                { segment: 'International', basis: 'Global MNO deals', metric: `${(calc.potentialSubs * 0.4).toFixed(0)}M subs`, multiple: '$1,500/sub', value: calc.potentialSubs * 0.4 * 1500 },
                { segment: 'Government/Defense', basis: 'DoD contracts', metric: 'Option value', multiple: '—', value: 2000 },
                { segment: 'Maritime/Aviation', basis: 'Niche verticals', metric: 'Option value', multiple: '—', value: 1000 },
                { segment: 'Spectrum Assets', basis: 'Licensed spectrum', metric: 'Strategic value', multiple: '—', value: 3000 },
              ].map((s, i) => (
                <div key={i} className="sm-cmp-table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                  <span className="sm-cmp-td-label"><div>{s.segment}</div><div className="sm-text-11">{s.basis}</div></span>
                  <span className="sm-cmp-td" data-align="right">{s.metric}</span>
                  <span className="sm-cmp-td" data-align="right">{s.multiple}</span>
                  <span className="sm-cmp-td sm-mint" data-align="right">${(s.value / 1000).toFixed(1)}B</span>
                </div>
              ))}
              <div className="sm-cmp-table-total" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                <span className="sm-cmp-td-label" style={{ gridColumn: '1 / 4' }}>SOTP Total</span>
                <span className="sm-cmp-td sm-mint" data-align="right">${((calc.potentialSubs * 0.4 * 2000 + calc.potentialSubs * 0.4 * 1500 + 6000) / 1000).toFixed(1)}B</span>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Risk-Adjusted Scenarios */}
        <div>
          <div className="sm-card sm-mt-8">
            <div className="sm-card-section" style={{ padding: '16px 20px' }}>
              <div className="sm-param-label sm-flex sm-gap-8">Risk-Adjusted Scenarios<UpdateIndicators sources={['WS']} /></div>
              <p className="sm-text-13 sm-text3" style={{ margin: '4px 0 0' }}>Probability-weighted valuation outcomes</p>
            </div>
          <div className="sm-cmp-table-scroll">
            <div style={{ minWidth: 420 }}>
              <div className="sm-cmp-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                {['Scenario', 'Prob.', 'Value', 'Weighted'].map((label, idx) => (
                  <span key={label} className="sm-cmp-th" data-align={idx > 0 ? 'right' : undefined}>{label}</span>
                ))}
              </div>
              {[
                { scenario: 'Bull Case', desc: 'Full constellation, global coverage', prob: 25, value: calc.marketCap * 3 },
                { scenario: 'Base Case', desc: 'Partial success, US + select intl', prob: 45, value: calc.marketCap * 1.5 },
                { scenario: 'Bear Case', desc: 'Delays, limited commercial traction', prob: 20, value: calc.marketCap * 0.5 },
                { scenario: 'Failure', desc: 'Technology or funding issues', prob: 10, value: calc.marketCap * 0.1 },
              ].map((s, i) => (
                <div key={i} className="sm-cmp-table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                  <span className="sm-cmp-td-label"><div>{s.scenario}</div><div className="sm-text-11">{s.desc}</div></span>
                  <span className="sm-cmp-td" data-align="right">{s.prob}%</span>
                  <span className="sm-cmp-td" data-align="right">${(s.value / 1000).toFixed(1)}B</span>
                  <span className="sm-cmp-td sm-mint" data-align="right">${(s.value * s.prob / 100 / 1000).toFixed(1)}B</span>
                </div>
              ))}
              <div className="sm-cmp-table-total" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                <span className="sm-cmp-td-label" style={{ gridColumn: '1 / 4' }}>Expected Value</span>
                <span className="sm-cmp-td sm-mint" data-align="right">${((calc.marketCap * 3 * 0.25 + calc.marketCap * 1.5 * 0.45 + calc.marketCap * 0.5 * 0.20 + calc.marketCap * 0.1 * 0.10) / 1000).toFixed(1)}B</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Competitor News Intelligence Section */}
      <div className="sm-divider">
        <span className="sm-param-label">Competitive Intelligence — Competitor News</span>
        <span className="sm-divider-line" />
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px', marginTop: 8 }}>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>Track developments across D2D satellite and terrestrial competitors impacting ASTS SpaceMobile's market position.</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '0 0 16px' }}>Filter by competitor to focus on specific threat vectors.</p>
        <div className="sm-flex-between sm-items-center sm-mb-8">
          <span className="sm-section-label">Filter by Competitor</span>
          {competitorFilter !== 'all' && <button onClick={() => setCompetitorFilter('all')} style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--coral) 15%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Clear</button>}
        </div>
        <div className="sm-flex-wrap sm-gap-6">
          {(() => { const isActive = competitorFilter === 'all'; return (
          <button
            onClick={() => setCompetitorFilter('all')}
            style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            All ({COMPETITOR_NEWS.length})
          </button>
          ); })()}
          {COMPETITOR_PROFILES.map(comp => {
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp.id).length;
            if (count === 0) return null;
            const isActive = competitorFilter === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setCompetitorFilter(comp.id)}
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {comp.name.split('/')[0].trim()} ({count})
              </button>
            );
          })}
          {COMPETITOR_NEWS.filter(n => n.competitor === 'other').length > 0 && (() => { const isActive = competitorFilter === 'other'; return (
            <button
              onClick={() => setCompetitorFilter('other')}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Miscellaneous ({COMPETITOR_NEWS.filter(n => n.competitor === 'other').length})
            </button>
          ); })()}
        </div>
        {competitorFilter !== 'all' && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: "'Space Mono', monospace" }}>{getCompetitorName(competitorFilter)} &rarr; {filteredNews.length} results</div>}
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div className="sm-flex-wrap sm-gap-6">
          {newsCategories.map(cat => {
            const isActive = newsCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setNewsCategoryFilter(cat)}
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--sky)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--sky) 15%, transparent)' : 'transparent', color: isActive ? 'var(--sky)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => { if (expandedNews.size > 0) { setExpandedNews(new Set()); } else { setExpandedNews(new Set(filteredCompNews.map((_, i) => i))); } }}
          style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--violet) 15%, transparent)', color: 'var(--violet)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
        >
          {expandedNews.size > 0 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Timeline - Flat list */}
      <div className="sm-card sm-mt-8">
        {filteredCompNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <p className="sm-text3">No competitor news matching current filters.</p>
          </div>
        ) : (
          filteredCompNews.map((news, i) => {
            const isExpanded = expandedNews.has(i);
            const accentColor = news.implication === 'positive' ? 'var(--mint)' : news.implication === 'negative' ? 'var(--coral)' : 'var(--sky)';
            const impLabel = news.implication === 'positive' ? 'Favorable' : news.implication === 'negative' ? 'Threat' : 'Neutral';
            const competitorName = getCompetitorName(news.competitor);
            return (
              <div key={i} role="button" tabIndex={0}
                style={{ padding: '16px 24px', cursor: 'pointer', borderLeft: `3px solid ${accentColor}`, borderBottom: i < filteredCompNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onClick={() => { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); } }}
              >
                <div className="sm-flex-between sm-items-start">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 12%, transparent)', color: 'var(--violet)' }}>{news.category}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--sky) 12%, transparent)', color: 'var(--sky)' }}>{competitorName}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13, lineHeight: 1.4 }}>{news.headline}</div>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: accentColor, marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.implication === 'positive' ? '+' : news.implication === 'negative' ? '-' : '~'} {impLabel}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 16, marginTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div className="sm-text-13 sm-lh-16">
                      {news.details.map((d, j) => <div key={j} className="sm-flex sm-gap-8" style={{ alignItems: 'initial' }}><span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>{d}</div>)}
                    </div>
                    {news.thesisComparison && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--mint)', marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 4 }}>ASTS Comparison</div>
                        <div className="sm-text-12 sm-text2" style={{ lineHeight: 1.5 }}>{news.thesisComparison}</div>
                      </div>
                    )}
                    {news.source && <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono', monospace", marginTop: 8 }}>Source: {news.sourceUrl ? <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="sm-accent">{news.source} ↗</a> : news.source}</div>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Competitor Profiles (Collapsible) */}
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
        <div className="sm-section-label sm-mb-12">Competitor Profiles</div>
        <div className="sm-flex-col sm-gap-16">
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div className="sm-flex-between sm-items-start">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{comp.name}</div>
                  <div className="sm-text-13">{comp.description}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                <div>
                  <div className="sm-micro-text">Technology</div>
                  <div className="sm-text-12">{comp.technology}</div>
                </div>
                <div>
                  <div className="sm-micro-text">Status</div>
                  <div className="sm-text-12">{comp.currentStatus}</div>
                </div>
                {comp.keyMetrics?.coverage && (
                  <div>
                    <div className="sm-micro-text">Coverage</div>
                    <div className="sm-text-12">{comp.keyMetrics.coverage}</div>
                  </div>
                )}
                {comp.keyMetrics?.funding && (
                  <div>
                    <div className="sm-micro-text">Funding</div>
                    <div className="sm-text-12">{comp.keyMetrics.funding}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CFANotes title="CFA Level III — Competitive Analysis" items={[
        { term: 'No Direct Comps', def: 'ASTS is unique — space-based D2C cellular. Starlink (D2C satellite) and telcos (terrestrial) are imperfect proxies.' },
        { term: 'Competitive Moat', def: 'Track competitor progress to assess durability of ASTS technology lead. 4+ year head start but competitors catching up.' },
        { term: 'Capability Gap', def: 'ASTS offers voice/text/data/video. Competitors mostly text-only. Gap may narrow over time.' },
        { term: 'News Sentiment', def: 'Positive = validates market, neutral = expected progress, negative = direct competitive threat.' },
        { term: 'Market Expansion', def: 'Competitor activity can grow the overall D2D market, benefiting all players including ASTS.' },
        { term: 'Partnership Watch', def: 'Monitor competitor MNO deals. Exclusive deals can lock out markets; non-exclusive validates demand.' },
      ]} />
    </div>
  );
};

// FINANCIALS TAB - Standalone tab for historical quarterly metrics
// ============================================================================
// INVESTMENT TAB - Visual Investment Analysis
// Updated after each PR/SEC filing - MUST MAINTAIN ARCHIVE
// ============================================================================
//
// ⚠️  UPDATE CHECKLIST AFTER EACH PR/SEC FILING:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. current.date, current.source - Change date and filing reference
// 2. executiveSummary - Update headline, thesis, bottomLine, whatsNew[]
// 3. scorecard - Re-evaluate all 8 unified categories (A-F grades)
//    Categories: Financial Strength, Profitability, Growth, Valuation,
//                Competitive Position, Execution, Regulatory/External, Capital Structure
// 4. growthDrivers - Update impact levels and descriptions
// 5. moatSources/moatThreats - Adjust strength/risk if competitive position changed
// 6. risks - Re-evaluate severity, likelihood, impact
// 7. perspectives - Update CFA/HedgeFund/CIO assessments and recommendations
// 8. archive - ADD NEW ENTRY AT TOP with unified schema:
//    { date, trigger, verdict, priorVerdict, headline, rationale,
//      keyDevelopments[], forwardView }
// 9. Rating Header - Update verdict badge, price target, key metrics
//
// NEVER DELETE ARCHIVE ENTRIES - This is the historical record!
// ============================================================================
const InvestmentTab = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // CURRENT ASSESSMENT - UPDATE THIS OBJECT AFTER EACH FILING
  // All current investment data consolidated here (unified with BMNR/CRCL)
  // ═══════════════════════════════════════════════════════════════════════════
  const current: InvestmentCurrent = {
    date: '2025-11-10',
    source: 'Q3 2025 10-Q',
    verdict: 'CONSTRUCTIVE',
    verdictColor: 'mint',
    tagline: "Technology Proven. Now It's About Execution.",
    
    // Investment Scorecard — Unified 8-category framework (matches BMNR/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A-', color: 'var(--mint)', detail: '$760M cash, runway to profitability secured' },
      { category: 'Profitability', rating: 'C+', color: 'var(--gold)', detail: 'Pre-revenue; $50-75M H2 guidance, path to FCF by 2026' },
      { category: 'Growth', rating: 'A', color: 'var(--mint)', detail: '$1B+ contracted revenue, 6 MNOs signed, 50+ pipeline' },
      { category: 'Valuation', rating: 'B', color: 'var(--sky)', detail: 'Pre-revenue multiple; execution-dependent upside' },
      { category: 'Competitive Position', rating: 'A', color: 'var(--mint)', detail: '3,000+ patents, licensed spectrum, 4yr lead, 95% vertical' },
      { category: 'Execution', rating: 'A-', color: 'var(--mint)', detail: 'Block 1 operational, ASIC proven, 6 sats/month target' },
      { category: 'Regulatory/External', rating: 'B', color: 'var(--sky)', detail: 'FCC approved, international pending, aviation concerns' },
      { category: 'Capital Structure', rating: 'B-', color: 'var(--gold)', detail: '$707M converts outstanding, potential future dilution' },
    ],
    
    // Executive Summary — Unified schema (matches BMNR/CRCL)
    executiveSummary: {
      headline: "Technology Proven. Now It's About Execution.",
      thesis: "ASTS has crossed the Rubicon. The technology works. Block 1 satellites are beaming real broadband to real phones. The only question now: can they build and launch fast enough?",
      bottomLine: "This is no longer a science experiment. It's an industrial scaling challenge—and they're winning.",
      whatsNew: [
        '$1B+ contracted revenue milestone reached',
        'BB6 launched successfully with fleet operational',
        'Verizon definitive agreement signed',
        'Vodafone SatCo JV announced for European expansion'
      ],
    },
    
    // Growth Drivers
    growthDrivers: [
      { driver: 'Constellation Buildout', impact: 'Critical', description: 'Manufacturing 6 satellites per month. 40+ in production. Each launch expands coverage and revenue potential.', color: 'var(--mint)' },
      { driver: 'MNO Partnerships', impact: 'High', description: 'Six carriers signed. Fifty more in pipeline. Every new deal multiplies the addressable market.', color: 'var(--mint)' },
      { driver: 'Geographic Expansion', impact: 'High', description: 'US coverage first. Europe, India, Middle East following. 5 billion people without reliable coverage waiting.', color: 'var(--sky)' },
      { driver: 'Government Contracts', impact: 'High', description: 'MDA SHIELD prime contractor (Jan 2026). Multiple DoD/SDA/DIU contracts. Defense sees strategic value in dual-use LEO constellation.', color: 'var(--mint)' },
    ],
    
    // Competitive Moat
    moatSources: [
      { source: 'Spectrum Holdings', strength: 'Strong', detail: 'More licensed spectrum than any competitor. L-Band and S-Band secured.', color: 'var(--mint)' },
      { source: 'Patent Portfolio', strength: 'Strong', detail: '3,000+ patents protecting core technology. Defensible IP position.', color: 'var(--mint)' },
      { source: 'Manufacturing Scale', strength: 'Strong', detail: '95% vertical integration, 6 sats/month capacity. Hard to replicate.', color: 'var(--mint)' },
      { source: 'Technology Lead', strength: 'Strong', detail: 'Custom ASIC, 4+ year head start. Proven at commercial scale.', color: 'var(--mint)' },
      { source: 'Carrier Relationships', strength: 'Building', detail: 'Exclusive deals with major MNOs. Network effects growing.', color: 'var(--sky)' },
    ],
    moatThreats: [
      { threat: 'Starlink/T-Mobile', risk: 'High', detail: 'Expanding beyond messaging. Musk has resources and execution ability.', color: 'var(--coral)' },
      { threat: 'Lynk Global', risk: 'Medium', detail: 'Pursuing similar D2D approach. Less capitalized but moving fast.', color: 'var(--gold)' },
      { threat: 'Apple/Globalstar', risk: 'Medium', detail: 'Emergency SOS expanding. Could evolve to broader services.', color: 'var(--gold)' },
      { threat: 'Skylo', risk: 'Low', detail: 'NB-IoT focused, different market segment.', color: 'var(--mint)' },
    ],
    
    // Risk Matrix
    risks: [
      { risk: 'Launch Failure', severity: 'Critical', likelihood: 'Low', impact: 'Severe', detail: 'A single catastrophic launch failure could delay the entire constellation by 6-12 months and destroy hundreds of millions in hardware. SpaceX has a good track record, but space is unforgiving.', mitigation: 'Multiple launch providers (SpaceX, ISRO), insurance coverage, phased deployment.' },
      { risk: 'Revenue Disappointment', severity: 'High', likelihood: 'Medium', impact: 'Severe', detail: 'If H2 2025 revenue comes in below $50M guidance, or MNO integrations take longer than expected, the stock could face significant multiple compression. Market has priced in execution.', mitigation: 'Diversified MNO base, government contracts provide floor.' },
      { risk: 'Manufacturing Bottleneck', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Scaling from 1 satellite to 6/month is hard. Supply chain issues, quality problems, or workforce constraints could slow the buildout and delay continuous coverage.', mitigation: '95% vertical integration, Texas facility expansion, redundant suppliers.' },
      { risk: 'Dilution Pressure', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: '$707M in converts will eventually convert or need refinancing. While no near-term equity raise is expected, future growth initiatives could require additional capital.', mitigation: 'Strong cash position ($760M), path to cash flow positive.' },
      { risk: 'Competitive Response', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: 'Starlink/T-Mobile will expand beyond messaging. Other players (Lynk, Skylo) are pursuing D2D. Technology lead doesn\'t guarantee market lead.', mitigation: 'Spectrum moat, patent portfolio, first-mover MNO relationships.' },
      { risk: 'Regulatory Delays', severity: 'Medium', likelihood: 'Low-Medium', impact: 'Moderate', detail: 'FCC approvals, international spectrum coordination, and aviation interference concerns could slow geographic expansion and limit addressable markets.', mitigation: 'Proactive engagement with regulators, experienced spectrum team.' },
    ],
    
    // Three Perspectives — Unified schema (matches BMNR/CRCL)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'CONSTRUCTIVE WITH VOLATILITY',
        color: 'var(--sky)',
        summary: 'Pre-revenue technology company transitioning to commercial operations. Strong balance sheet ($760M cash) and de-risked technology, but valuation assumes significant execution. Best suited for growth-oriented portfolios with 2-3 year horizon. High volatility expected.',
        ecosystemView: 'LEO satellite connectivity market inflecting. 5B people lack reliable mobile coverage. MNO economics favor wholesale spectrum leasing over CAPEX. Government/defense spending on space communications accelerating. First-mover with working technology creates optionality.',
        recommendation: 'Allocate 2-4% of growth portfolio. Rebalance on 30%+ moves.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Asymmetric setup: technology proven, binary execution risk remains. Event calendar stacked with launches, MNO announcements, and revenue recognition. Stock trades on sentiment — volatile but predictable patterns around catalysts.',
        ecosystemView: 'Starlink/T-Mobile partnership validates D2D market. Apple Emergency SOS adoption proves consumer demand. MNO consolidation trends favor infrastructure partners. ASTS spectrum holdings are strategic assets in capacity-constrained environment.',
        recommendation: 'Size 4-6% of book. Add on pullbacks to 50-day MA. Trim on 30%+ rips.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'SATELLITE POSITION',
        color: 'var(--violet)',
        summary: 'This is venture-style risk in a public equity wrapper. The market opportunity is massive (5B people), the technology works, and the team has executed through near-death experiences. Multi-bagger potential if thesis plays out, but size accordingly.',
        ecosystemView: 'Telecom infrastructure is a multi-decade investment theme. ASTS addresses fundamental gap in global coverage. Strategic investors (AT&T, Verizon, Vodafone, Google) validate market opportunity. Defense applications provide revenue diversification and strategic importance.',
        recommendation: '3-5% max portfolio weight. Hold for 2-3 year thesis.',
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        assessment: 'BULLISH — BREAKOUT WATCH',
        color: 'var(--sky)',
        summary: 'Classic catalyst-driven momentum stock. Price gaps on launch news create defined support/resistance zones. Currently consolidating above 50-day SMA with declining volatility — textbook bull flag formation. RSI reset from overbought provides fresh runway. Volume accumulation patterns evident on weekly timeframe.',
        ecosystemView: 'ASTS trades on sentiment cycles tied to satellite launch calendar. Key technical levels: $25-30 support zone (prior breakout), $40-45 resistance (prior highs). MACD bullish crossover on weekly chart. Relative strength vs NASDAQ positive. Watch for volume surge above 20M shares as breakout confirmation signal.',
        recommendation: 'Accumulate on pullbacks to 50-day SMA. Add on breakout above $45 with volume. Stop loss: close below $25.',
      },
    },
    
    // Position Sizing
    positionSizing: {
      aggressive: { range: '4-6%', description: 'High-conviction growth portfolios' },
      growth: { range: '2-4%', description: 'Growth-oriented with tech exposure' },
      balanced: { range: '1-2%', description: 'Diversified portfolios seeking asymmetry' },
      conservative: { range: '0-1%', description: 'Risk-averse (speculative allocation only)' },
    },
    
    // Price Targets
    priceTargets: [
      { period: '0-6 months', range: '$50-100', outlook: 'Volatile', detail: 'Swings ±20% on launch news, revenue updates, MNO announcements' },
      { period: '6-18 months', range: '$100-150', outlook: 'Bullish', detail: '25-satellite threshold, cash flow positive milestone, continuous US coverage' },
      { period: '18-36 months', range: '$150-250+', outlook: 'Very Bullish', detail: 'Global coverage, billion-dollar revenue run rate, potential M&A' },
    ],
  };
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // [PR_CHECKLIST_ARCHIVE] - MANDATORY for 10-Q and 10-K: Add new full analysis at TOP!
  // ARCHIVE - NEVER DELETE! ADD NEW ENTRIES AT TOP AFTER EACH FILING
  // This is the permanent historical record of investment thesis evolution
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const archive = [
    // ⬇️ ADD NEW ENTRIES HERE (most recent first) ⬇️
    { 
      date: '2025-11-10', 
      filing: 'Q3 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Inflection Point Reached',
      summary: 'Technology validated, commercial traction accelerating. The thesis has shifted from "will it work?" to "how fast can they scale?"',
      keyDevelopments: ['$1B+ contracted revenue milestone', 'BB6 launched successfully', 'Verizon definitive agreement signed', 'Vodafone SatCo JV announced'],
      whyItMatters: 'This quarter marks the transition from development company to commercial operator. Every major technology risk has been retired.',
      lookingAhead: 'Focus shifts entirely to execution: manufacturing cadence, launch reliability, and MNO integration timelines.',
    },
    { 
      date: '2025-08-11', 
      filing: 'Q2 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Strategic Groundwork Complete',
      summary: 'Spectrum secured, partnerships expanding. The company has assembled all the pieces needed for commercial success.',
      keyDevelopments: ['L-Band court approval ($550M spectrum asset)', '60 MHz S-Band acquisition closed', 'Vi India partnership announced', '8 government contracts total'],
      whyItMatters: 'Spectrum ownership creates an unassailable competitive moat. No other D2D player has comparable licensed spectrum holdings.',
      lookingAhead: 'H2 2025 revenue guidance of $50-75M becomes the key metric to watch. First real commercial revenue incoming.',
    },
    { 
      date: '2025-05-12', 
      filing: 'Q1 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Block 1 Proving Technology at Scale',
      summary: 'Revenue guidance set for the first time. The company is confident enough to give numbers.',
      keyDevelopments: ['H2 2025 revenue guidance: $50-75M', 'DIU contract expanded to $20M', '5 launches contracted for 2025', 'EXIM/IFC pipeline over $500M'],
      whyItMatters: 'First meaningful revenue guidance signals commercial readiness. Government contracts provide validation and diversification.',
      lookingAhead: 'Block 2 manufacturing ramp becomes critical. Need to hit 6 satellites/month sustained production.',
    },
    { 
      date: '2025-03-03', 
      filing: 'FY2024 10-K', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Transformational Year Complete',
      summary: 'Technology works. Upgrade from Neutral. The question is no longer IF but WHEN.',
      keyDevelopments: ['Block 1 fully operational', '$43M SDA government contract', 'ASIC validated at 10 GHz', 'Vodafone definitive signed', '$1B+ raised in 2024'],
      whyItMatters: 'Block 1 success proves the core technology at commercial scale. This de-risks the entire investment thesis.',
      lookingAhead: 'Constellation buildout is now a manufacturing and logistics challenge, not a technology challenge.',
    },
    { 
      date: '2024-11-14', 
      filing: 'Q3 2024 10-Q', 
      verdict: 'NEUTRAL → CONSTRUCTIVE', 
      headline: 'Block 1 Launch De-risks Thesis',
      summary: 'Six satellites in orbit, technology working as designed. The binary bet has paid off.',
      keyDevelopments: ['Block 1 launched September 12', 'Warrant redemption completed ($154M)', 'pLEO program expanded 14x to $13B', 'ISRO added as third launch provider'],
      whyItMatters: 'Successful launch eliminates the largest risk factor. Stock can now be valued on commercial potential, not just technology hope.',
      lookingAhead: 'Capital raise needed in 2025 to fund full constellation. Watch for terms and dilution.',
    },
    { 
      date: '2024-08-14', 
      filing: 'Q2 2024 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'Pre-Launch Tension',
      summary: 'Binary outcome ahead. Success means re-rate; failure means existential crisis.',
      keyDevelopments: ['AT&T definitive agreement signed', 'Verizon $100M commitment', 'FCC license granted', 'ASIC tape-out complete'],
      whyItMatters: 'All regulatory and partnership pieces in place. Everything rides on the September launch.',
      lookingAhead: 'This is the last chance to position before the binary event. Risk management critical.',
    },
    { 
      date: '2024-04-01', 
      filing: 'FY2023 10-K', 
      verdict: 'CAUTIOUS → NEUTRAL', 
      headline: 'Survived Near-Death Experience',
      summary: 'Capital secured just in time. The company lives to fight another day.',
      keyDevelopments: ['$100M equity raise at $3.10', '$110M strategic converts', '95% vertical integration achieved', 'BW3 proved 5G capability'],
      whyItMatters: 'The cash crisis is resolved. Management executed when the company was on the brink.',
      lookingAhead: 'Block 1 launch in 2024 becomes the singular focus. Technology must prove out at scale.',
    },
    { 
      date: '2023-11-14', 
      filing: 'Q3 2023 10-Q', 
      verdict: 'CAUTIOUS', 
      headline: 'Technology Works, Cash Critical',
      summary: 'BW3 proves 5G at 14 Mbps, but liquidity crisis looms. A race against time.',
      keyDevelopments: ['5G call achieved (14 Mbps)', 'Atlas debt closed ($48.5M)', 'Stock collapsed from $15 to $3', 'Only 3-4 quarters of runway'],
      whyItMatters: 'Technology validation is real, but the company may not survive to commercialize it without emergency capital.',
      lookingAhead: 'Must raise capital in Q1 2024 or face bankruptcy. Position for financing, not fundamentals.',
    },
    { 
      date: '2023-08-14', 
      filing: 'Q2 2023 10-Q', 
      verdict: 'CAUTIOUS', 
      headline: '4G Validated, Balance Sheet Stressed',
      summary: 'Technology milestones hit but cash burn unsustainable. Storm clouds gathering.',
      keyDevelopments: ['4G/LTE achieved (10+ Mbps)', '$59M equity raise completed', 'Atlas debt announced', '$176M cash, $48M/quarter burn'],
      whyItMatters: 'The technology works, but financial engineering required to survive. Debt signals desperation.',
      lookingAhead: 'Downgrade to Cautious. The next 12 months will determine survival.',
    },
    { 
      date: '2023-05-15', 
      filing: 'Q1 2023 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'Historic Voice Call Proves Concept',
      summary: 'First-ever D2D voice call from space. The technology is real.',
      keyDevelopments: ['First voice call April 25', 'Constellation reduced to ~90 satellites', 'BW3 operational', '$206M cash adequate near-term'],
      whyItMatters: 'Voice call proves the fundamental technology works. Constellation reduction is positive for economics.',
      lookingAhead: 'Need to secure Block 1 funding. Watch cash burn closely.',
    },
    { 
      date: '2023-03-01', 
      filing: 'FY2022 10-K', 
      verdict: 'NEUTRAL', 
      headline: 'BW3 Deployed, Testing Begins',
      summary: 'First full-scale test satellite in orbit. The experiment begins.',
      keyDevelopments: ['BW3 antenna deployed November 14', 'NanoAvionics sold for focus', '$75M equity raise completed', '$301M cash position'],
      whyItMatters: 'BW3 is the proving ground. Results over the next year will validate or invalidate the entire thesis.',
      lookingAhead: 'Maintain Neutral until test results prove commercial viability.',
    },
    { 
      date: '2022-11-14', 
      filing: 'Q3 2022 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'BW3 Launched. Pure Speculation.',
      summary: 'Satellite in orbit. Everything that follows is unprecedented.',
      keyDevelopments: ['BW3 launched September 10', 'Antenna deployment sequence begun', 'Nano sold for strategic focus', 'Pure technology speculation'],
      whyItMatters: 'This is ground zero. No one has done what ASTS is attempting. Success is not guaranteed.',
      lookingAhead: 'Wait for test results before increasing position. High risk, high uncertainty.',
    },
  ];

  return (
    <SharedInvestmentTab
      current={current}
      archive={archive}
      ticker="ASTS"
      renderHeaderMetrics={() => (
        <div className="sm-flex sm-gap-24 sm-flex-wrap">
          <div className="sm-text-center">
            <div className="sm-text-11">Price Target</div>
            <div className="sm-mono-lg sm-fw-700 sm-mint">$100-150</div>
            <div className="sm-micro-text sm-micro-text-normal">12-month</div>
          </div>
          <div className="sm-text-center">
            <div className="sm-text-11">Risk/Reward</div>
            <div className="sm-mono-lg sm-fw-700 sm-sky">3:1</div>
            <div className="sm-micro-text sm-micro-text-normal">Asymmetric</div>
          </div>
          <div className="sm-text-center">
            <div className="sm-text-11">Cash Position</div>
            <div className="sm-mono-lg sm-fw-700 sm-violet">$760M</div>
            <div className="sm-text-11 sm-mint">Runway secured</div>
          </div>
        </div>
      )}
      moatDurabilityNote="A- (Strong). Spectrum + patents + manufacturing scale create defensible position. 4+ year technology lead is substantial. Key risk is well-funded competitors (Starlink) accelerating D2D efforts."
      renderStrategicAssessment={() => (
        <>
          {/* Section Header */}
          <div className="sm-subtle sm-italic">
            Multi-perspective risk evaluation and strategic decision framework for space-based cellular infrastructure
          </div>

          {/* Part 1: Multi-Perspective Risk Evaluation */}
          <div className="sm-inv-section-sub"><span className="sm-section-label sm-text">Risk Evaluation — Four Perspectives</span></div>

          {/* CFA Level III Perspective */}
          <div className="sm-callout" style={{ '--callout-color': 'var(--cyan)' } as React.CSSProperties}>
            <div className="sm-flex">
              <span className="sm-news-tag" style={{ '--tag-color': 'var(--cyan)' } as React.CSSProperties}>CFA LEVEL III</span>
              <span className="sm-subtle">Portfolio Construction & Factor Analysis</span>
            </div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong>Factor Exposures:</strong> ASTS exhibits high beta (~1.8-2.2) to growth/momentum factors with significant idiosyncratic risk from execution milestones. Low correlation to traditional telcos (~0.2) and satellite peers (~0.4). This is a binary outcome investment — success yields 5-10x, failure yields 80%+ loss. Standard MPT optimization doesn&apos;t apply; treat as venture-like allocation within public markets sleeve.
              </p>
              <p>
                <strong>Liquidity Analysis:</strong> Average daily volume ~$100-200M provides excellent liquidity for most institutional positions. Options market active with reasonable spreads. Convertible bonds provide additional hedging/exposure vehicles. Short interest ~15% creates squeeze potential but also overhang. Position sizing up to 3-5% of portfolio feasible without market impact.
              </p>
              <p>
                <strong>Governance & ESG:</strong> Founder Abel Avellan controls ~73% voting via Class C shares — concentration risk but also alignment. Board includes telecom veterans. ESG profile positive: enabling connectivity for underserved populations, reducing need for physical infrastructure. Space debris concerns manageable with LEO orbit decay. Spectrum rights secured through MNO partnerships — regulatory moat.
              </p>
            </div>
          </div>

          {/* Hedge Fund Manager Perspective */}
          <div className="sm-callout" style={{ '--callout-color': 'var(--gold)' } as React.CSSProperties}>
            <div className="sm-flex">
              <span className="sm-news-tag" style={{ '--tag-color': 'var(--gold)' } as React.CSSProperties}>HEDGE FUND</span>
              <span className="sm-subtle">Alpha Generation & Event Catalysts</span>
            </div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong>Event Calendar Alpha:</strong> ASTS is a catalyst machine — launches, FCC approvals, MNO activations, revenue recognition events provide defined trading opportunities. Strategy: size up 2-3 weeks before known catalysts, trim 50% into strength on positive outcomes, add on &quot;sell the news&quot; weakness if thesis intact. Each successful launch de-risks the next.
              </p>
              <p>
                <strong>Short Squeeze Dynamics:</strong> ~15% short interest with high conviction longs creates squeeze potential on positive catalysts. Days to cover ~3-4. Monitor borrow rates for squeeze signals. Historical pattern: 20-40% moves on successful launches. Position accordingly — don&apos;t short this name, and size longs to benefit from squeezes.
              </p>
              <p>
                <strong>Convertible Arbitrage:</strong> $1.625B in converts outstanding at various strikes ($80-$180+). As stock approaches conversion prices, arbitrage flows create support. Monitor convert pricing vs equity for relative value opportunities. Converts provide downside cushion narrative but also overhang concerns — net neutral to slightly positive for equity.
              </p>
            </div>
          </div>

          {/* CIO/CIS Institutional Perspective */}
          <div className="sm-callout" style={{ '--callout-color': 'var(--sky)' } as React.CSSProperties}>
            <div className="sm-flex">
              <span className="sm-news-tag" style={{ '--tag-color': 'var(--sky)' } as React.CSSProperties}>CIO / CIS</span>
              <span className="sm-subtle">Strategic Allocation & Fiduciary Considerations</span>
            </div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong>Strategic Thesis:</strong> ASTS represents &quot;infrastructure for the next billion connected users&quot; — a thematic play on global connectivity megatrend. Unlike Starlink (D2C, new devices), ASTS works with existing phones via MNO partnerships. This is picks-and-shovels for mobile connectivity expansion. The 50/50 revenue share model means MNOs are incentivized to push adoption.
              </p>
              <p>
                <strong>Portfolio Fit:</strong> Classify as &quot;thematic/disruptive innovation&quot; allocation, not traditional telecom. Appropriate for growth portfolios with 5-10 year horizons. Do not benchmark against telco index — this is a pre-revenue infrastructure buildout. Comparable to early-stage cloud or fiber investments. Size as venture-like position (1-3% max) given binary risk profile.
              </p>
              <p>
                <strong>Fiduciary Narrative:</strong> If questioned by stakeholders: &quot;We own the infrastructure layer enabling mobile operators to extend coverage without building towers — backed by AT&T, Verizon, Vodafone partnerships and $1B+ in contracted revenue.&quot; The blue-chip MNO partnerships provide institutional credibility. Comparable thesis to early investments in cell tower REITs.
              </p>
            </div>
          </div>

          {/* Technical Analyst Perspective */}
          <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
            <div className="sm-flex">
              <span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>TECHNICAL ANALYST</span>
              <span className="sm-subtle">Chart Patterns & Price Action</span>
            </div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong>Trend Structure:</strong> Classic catalyst-driven momentum stock. Price gaps on launch news create defined support/resistance zones. Currently consolidating above 50-day SMA with declining volatility — textbook bull flag formation. RSI reset from overbought provides fresh runway for next leg up.
              </p>
              <p>
                <strong>Key Levels:</strong> Support zone at $25-30 (prior breakout level, high volume node). Resistance at $40-45 (prior swing highs). MACD bullish crossover on weekly chart. Volume accumulation patterns evident — institutional buying on dips. Watch for breakout above $45 with volume &gt;20M shares as confirmation signal.
              </p>
              <p>
                <strong>Catalyst Trading:</strong> Satellite launch dates provide predictable volatility windows. Build position 2-3 weeks before scheduled launches. Take partial profits into strength post-launch. Use RSI divergence to identify exhaustion after catalyst-driven rallies. Relative strength vs NASDAQ positive — outperforming growth cohort.
              </p>
              <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                <strong className="sm-mint">Technical Outlook:</strong> {current.perspectives.technicalAnalyst.ecosystemView}
              </div>
            </div>
          </div>

          {/* Part 2: Key Strategic Questions */}
          <div className="sm-inv-section-sub"><span className="sm-section-label sm-text">Key Strategic Questions</span></div>

          {/* Would I Buy Now? */}
          <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
            <div className="sm-flex-between">
              <span className="sm-text sm-fw-600 sm-body-lg">Would I Buy Now?</span>
              <span className="sm-news-tag-lg" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>YES — HIGH CONVICTION</span>
            </div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong>The Case:</strong> Constellation deployment is accelerating (6 sats/month production), commercial service imminent in 2026, $1B+ contracted revenue provides visibility, and MNO partnerships de-risk go-to-market. The technology works (BW3 proved it). Valuation at ~$300/potential subscriber is cheap vs telco M&amp;A comps ($500+). Risk/reward is asymmetric to the upside.
              </p>
              <p>
                <strong>The Hesitation:</strong> Still pre-revenue with $300M+ annual burn. Execution risk on 40+ satellite launches. FCC/regulatory uncertainty in some markets. Starlink competition narrative (though different model). Stock has run significantly — buying at highs feels uncomfortable.
              </p>
              <p>
                <strong>The Verdict:</strong> Yes, initiate or add to position. The de-risking from successful launches justifies higher prices. Use pullbacks on &quot;sell the news&quot; events to add. This is a 3-5 year hold — don&apos;t trade around short-term volatility. Size appropriately for binary outcome profile (1-3% of portfolio).
              </p>
            </div>
          </div>

          {/* What Can I Expect? */}
          <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
            <div className="sm-text sm-fw-600 sm-body-lg">What Can I Expect?</div>
            <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
              <div className="sm-callout" style={{ '--callout-color': 'var(--gold)' } as React.CSSProperties}>
                <div className="sm-fw-600 sm-gold sm-text-13">Short-Term (0-6 months)</div>
                <div className="sm-text-13 sm-lh-16">
                  Catalyst-rich period: BB7-13 launches, US commercial service initiation, Q4 earnings. Expect 30-50% swings around events. Successful launches = 10-20% pops, then consolidation. Trading range likely $20-45 depending on execution. Volatility is your friend if sized correctly.
                </div>
              </div>
              <div className="sm-callout" style={{ '--callout-color': 'var(--sky)' } as React.CSSProperties}>
                <div className="sm-fw-600 sm-sky sm-text-13">Mid-Term (6-18 months)</div>
                <div className="sm-text-13 sm-lh-16">
                  Revenue recognition begins — first real P&amp;L validation. If penetration tracks to 1%+, narrative shifts from &quot;will it work?&quot; to &quot;how big can it get?&quot; Multiple expansion potential. Target range: $50-100 if execution continues. This is where the thesis gets proven or broken.
                </div>
              </div>
              <div className="sm-callout" style={{ '--callout-color': 'var(--cyan)' } as React.CSSProperties}>
                <div className="sm-fw-600 sm-cyan sm-text-13">Long-Term (3-5 years)</div>
                <div className="sm-text-13 sm-lh-16">
                  At scale (2%+ penetration, 60M+ subs), ASTS could generate $5-10B revenue at 50%+ EBITDA margins. At telco multiples (8-12x EBITDA), that&apos;s $40-120B EV vs ~$12B today. 3-10x return potential. But crypto-like volatility along the way — expect multiple 40%+ drawdowns.
                </div>
              </div>
            </div>
          </div>

          {/* What's My Strategy? */}
          <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
            <div className="sm-text sm-fw-600 sm-body-lg">What&apos;s My Strategy?</div>
            <div className="sm-body sm-lh-18">
              <p>
                <strong className="sm-cyan">Position Sizing:</strong> 2-4% for aggressive growth portfolios, 1-2% for balanced growth, avoid for conservative/income. This is a high-conviction, high-volatility position. Size so you can hold through 50% drawdowns without losing sleep. Never bet the farm on binary outcomes.
              </p>
              <p>
                <strong className="sm-sky">Entry Approach:</strong> Accumulate on pullbacks, especially &quot;sell the news&quot; events after successful launches. Add on 15-20% dips from local highs. Don&apos;t chase parabolic moves. Use 4-8 week DCA for new positions. Options strategies (selling puts, bull call spreads) can enhance entry.
              </p>
              <p>
                <strong className="sm-gold">Exit Strategy:</strong> Trim 20% at 2x, another 20% at 3x, let 60% ride as &quot;house money.&quot; Full exit triggers: (1) launch failure pattern (2+ consecutive), (2) major MNO partnership cancellation, (3) competitive moat erosion, (4) management credibility issues. Take profits into strength, not weakness.
              </p>
              <p>
                <strong className="sm-coral">Risk Management:</strong> No hard stop-losses — volatility will trigger them inappropriately. Instead, thesis-based exits: reassess on any launch failure, regulatory setback, or competitive threat. Maintain conviction through normal volatility. If thesis breaks, exit regardless of price. Time stops: if no commercial traction by end of 2026, reassess entire position.
              </p>
            </div>
          </div>
        </>
      )}
      cfaNotes={[
        { term: 'Multi-Perspective Analysis', def: 'Evaluating investments through different lenses (CFA fundamentals, hedge fund catalysts, institutional risk). Each perspective reveals blind spots the others miss.' },
        { term: 'Conviction Score', def: 'Aggregate rating combining fundamental analysis, technical positioning, catalyst proximity, and risk/reward asymmetry. Higher scores indicate stronger investment thesis.' },
        { term: 'Position Sizing', def: 'Determining allocation size based on conviction, volatility, correlation to existing holdings, and maximum drawdown tolerance. Higher conviction allows larger positions.' },
        { term: 'Catalyst Calendar', def: 'Timeline of upcoming events that could move the stock (earnings, FDA decisions, product launches). Catalysts create asymmetric risk/reward opportunities.' },
      ]}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// WALL STREET TAB - Analyst Coverage & Research Archive
// Track sell-side analyst ratings, price targets, and estimate revisions
// ═══════════════════════════════════════════════════════════════════════════════
const WallStreetTab = () => {
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null);
  const [expandedReportIdx, setExpandedReportIdx] = useState<string | null>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // ANALYST COVERAGE DATA - Grouped by Firm
  // Add new reports at the TOP of each firm's reports array (newest first)
  // NEVER delete historical reports - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  
  const ANALYST_COVERAGE = ASTS_ANALYST_COVERAGE;

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="ASTS" />
      {/* CFA Notes */}
      <CFANotes title="CFA Level III — Sell-Side Research" items={[
        { term: 'Price Target (PT)', def: 'Analyst\'s 12-month fair value estimate. Compare to current price for implied upside/downside. PTs cluster around consensus — outliers may have differentiated views or different assumptions.' },
        { term: 'Ratings Scale', def: 'Strong Buy (>20% upside), Buy/Overweight (10-20%), Hold/Neutral (±10%), Underperform/Underweight (-10-20%), Sell (>20% downside). Distribution skews bullish due to banking relationships.' },
        { term: 'Full Reports vs Updates', def: 'Full reports include thesis, methodology, estimates, and detailed analysis. Updates are quick PT/rating changes without full analysis — often react to news or earnings.' },
        { term: 'Consensus vs Variant', def: 'When your view differs from consensus, understand why. Variant perception + catalyst = alpha opportunity. But: "the market can stay irrational longer than you can stay solvent."' },
        { term: 'Conflicts of Interest', def: 'Investment banks have relationships with covered companies. Be aware of potential conflicts. Independent research may offer less conflicted views.' },
      ]} />
    </>
  );
};

const FinancialsTab = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // UNIFIED FINANCIALS TAB - Canonical structure shared across all models
  // Only data and labels differ between ASTS, BMNR, and CRCL
  // ═══════════════════════════════════════════════════════════════════════════
  
  // === COMPANY-SPECIFIC CONFIGURATION ===
  const config = {
    highlightTitle: 'Historical Quarterly Metrics',
    highlightText: 'Track ASTS\'s financial evolution from pre-SPAC private company through commercial constellation deployment. All data sourced from SEC filings (10-K, 10-K/A, 10-Q). Compare any two quarters to see growth and changes.',
    secFiling: {
      cik: '0001780312',
      ticker: 'ASTS',
      exchange: 'NASDAQ',
      firstFiling: { date: 'April 6, 2021', description: 'SPAC Close / 8-K' },
      latestEvent: { date: 'Dec 24, 2025', description: 'BB6 Launch' },
      lastPR: { date: 'December 24, 2025', title: 'BB6 Successful Orbital Launch' },
      filings: {
        '10-K': { date: 'March 3, 2025', description: 'FY 2024', color: 'blue' },
        '10-Q': { date: 'Nov 10, 2025', description: 'Q3 2025', color: 'purple' },
        '8-K': { date: 'Dec 24, 2025', description: 'BB6 Launch', color: 'yellow' },
        'S-3': { date: 'Oct 2025', description: 'Shelf Registration', color: 'green' },
        '424B5': { date: 'Oct 2025', description: '$1.15B Converts', color: 'orange' },
        'DEF 14A': { date: '—', description: 'Proxy (Annual)', color: 'cyan' },
      }
    },
    badge4Label: 'Satellites',
    chartATitle: 'Satellites Deployed',
    chartAColor: 'cyan',
    chartAKey: 'satellites',
    milestones: [
      { date: 'April 2021', event: 'SPAC Close: $462M' },
      { date: 'Dec 2022', event: 'Equity: $68.6M @ $5.50' },
      { date: 'Aug 2023', event: 'Atlas Debt: $48.5M' },
      { date: 'Jan 2024', event: 'Equity: $107.7M @ $3.10' },
      { date: 'Jan 2025', event: 'Converts: $460M @ 4.25%' },
      { date: 'Oct 2025', event: 'Converts: $1B+ @ 2%' },
      { date: 'Oct 2025', event: 'Ligado Spectrum: $550M' },
      { date: 'YE 2025', event: 'stc Prepay: $175M' },
    ],
    cfaNotes: [
      { term: 'SEC Filing Types', def: '10-K (annual audited), 10-Q (quarterly reviewed), 8-K (material events). 10-K/A is amended annual filing.' },
      { term: 'Pre-Revenue Stage', def: 'ASTS currently pre-commercial revenue. Track CapEx spend, cash burn, and milestones toward first commercial service.' },
      { term: 'Quarter-over-Quarter', def: 'Compare sequential quarters to see operational progress. YoY comparisons less meaningful for rapidly evolving pre-revenue companies.' },
      { term: 'Cash Flow Focus', def: 'For pre-revenue: watch cash burn rate, runway, and capital raise timing. Operating cash flow negative until commercial operations.' },
      { term: 'CapEx Intensity', def: 'Satellite manufacturing and launch costs. Track per-satellite cost trends ($21-23M current guidance).' },
      { term: 'Gateway Revenue', def: 'Current revenue stream from ground station equipment. Bridge revenue until commercial satellite services launch.' },
    ],
  };

  return (
    <SharedFinancialsTab
      ticker="ASTS"
      sectionLabel="Quarterly Data"
      title="Financials"
      description="Quarterly financial statements, key metrics, and trend analysis. Pre-revenue stage with focus on cash position, burn rate, and path to commercial service."
      secFilingConfig={config.secFiling}
      milestones={config.milestones}
      cfaNotes={config.cfaNotes}
      cfaNotesTitle="CFA Level III — Financial Analysis"
    >
      <QuarterlyMetricsPanel />
    </SharedFinancialsTab>
  );
};

// Wrap main component with Error Boundary for graceful error handling (C3)
const ASTSWithErrorBoundary = () => (
  <FinancialModelErrorBoundary>
    <ASTSAnalysis />
  </FinancialModelErrorBoundary>
);

export default ASTSWithErrorBoundary;
