// ============================================================================
// STOCK CONTEXT REGISTRY — Per-ticker metadata for prompt template resolution
// ============================================================================
// Single source of truth for everything a workflow prompt needs to know about
// a stock. When Initiate Research creates a new stock, it adds an entry here.
// The prompt placeholder resolver reads from this registry to fill
// {{COMPANY_NAME}}, {{SPECIALIST_DOMAIN}}, {{KEY_INSIDERS}}, etc.
//
// ADDING A NEW STOCK:
//   1. Click "Initiate New Research" (auto-creates a starter entry), OR
//   2. Manually add an entry below with at minimum: ticker, companyName,
//      exchange, sector, description, specialistDomain.
//   3. Fill in keyInsiders, competitors, stockSpecificMetrics as research
//      coverage deepens.
// ============================================================================

export interface Insider {
  name: string;
  title: string;
  notes: string;
}

export interface Competitor {
  name: string;
  ticker?: string;
  relevance: string;
}

export interface StockContext {
  ticker: string;
  companyName: string;
  exchange: string;
  sector: string;
  description: string;
  specialistDomain: string;
  fiscalYearEnd?: string;
  shareStructureNotes?: string;
  keyInsiders: Insider[];
  competitors: Competitor[];
  stockSpecificMetrics: string[];
}

// ── ASTS ────────────────────────────────────────────────────────────────────

export const astsContext: StockContext = {
  ticker: 'ASTS',
  companyName: 'AST SpaceMobile',
  exchange: 'NASDAQ',
  sector: 'Space Technology',
  description: 'Space-based cellular broadband network accessible by standard smartphones',
  specialistDomain: 'satellite-enabled direct-to-device (D2D) cellular broadband and LEO constellations',
  shareStructureNotes: '3-class share structure: Class A (trading, 1 vote), Class B (insider, 1 vote), Class C (founder, 10x super-voting). Multiple convertible tranches (4.25%, 2.375%, 2.00%, 2.25% Notes). Active ATM program.',
  keyInsiders: [
    { name: 'Abel Avellan', title: 'Founder, Chairman & CEO', notes: 'Holds ~78.2M Class C shares (10x voting power). Class C → Class A conversion is a major signal.' },
    { name: 'Scott Wisniewski', title: 'CFO', notes: 'Watch for direct market transactions. Assess financial conservatism tone in earnings calls.' },
  ],
  competitors: [
    { name: 'Starlink Direct-to-Cell', ticker: 'SPACEX', relevance: 'Primary D2C competitor. T-Mobile partnership. Starlink V3 constellation expansion.' },
    { name: 'Amazon Kuiper', relevance: 'LEO constellation competitor. Massive capital backing.' },
    { name: 'Lynk Global', relevance: 'D2D competitor, narrowband focus.' },
    { name: 'Skylo', relevance: 'NTN competitor, narrowband IoT focus.' },
    { name: 'Globalstar', ticker: 'GSAT', relevance: 'Satellite communications, Apple partnership for emergency SOS.' },
    { name: 'Iridium', ticker: 'IRDM', relevance: 'LEO satellite operator, established constellation.' },
    { name: 'Viasat/Inmarsat', ticker: 'VSAT', relevance: 'GEO/LEO satellite broadband.' },
    { name: 'OneWeb/Eutelsat', relevance: 'LEO constellation, enterprise focus.' },
    { name: 'Telesat', relevance: 'LEO constellation, enterprise/government focus.' },
    { name: 'Omnispace', relevance: 'Hybrid NTN solution.' },
  ],
  stockSpecificMetrics: [
    'Launch cadence (Block 2, Block 3 timelines)',
    'Satellite performance data (throughput, coverage, unfurling status)',
    'Manufacturing updates (production rate, supplier commentary)',
    'Ground gateway buildout progress',
    'Constellation build-out status (on-track/behind/ahead)',
    'MNO pipeline (MoU → Definitive conversions)',
    'Subscriber reach changes (total addressable market)',
    'Revenue share / prepayment terms per partner',
    'FCC/NTIA spectrum updates',
    '3GPP / standards body progress',
    'International spectrum positions by country',
    'Government/defense contract pipeline (DoD, GSA)',
    'ARPU assumptions',
    'Capex per satellite',
    'Burn rate / runway commentary',
    'Dilution overhang (fully diluted vs. basic)',
  ],
};

// ── BMNR ────────────────────────────────────────────────────────────────────

export const bmnrContext: StockContext = {
  ticker: 'BMNR',
  companyName: 'BitMine Immersion Technologies',
  exchange: 'NYSE American',
  sector: 'Digital Assets',
  description: 'ETH treasury company with immersion cooling and validator operations',
  specialistDomain: 'digital asset treasuries, blockchain infrastructure, and ETH/BTC ecosystem plays',
  fiscalYearEnd: 'September 30',
  shareStructureNotes: 'Aggressive ATM equity issuance to fund ETH treasury accumulation. Pre-funded warrants, advisor warrants. Pending vote to increase authorized shares to 50B.',
  keyInsiders: [
    { name: 'Tom Lee', title: 'Chairman of the Board', notes: 'High-profile investor. Watch for personal purchases — Chairman conviction is a powerful signal.' },
    { name: 'Bill Miller III', title: 'Board Member', notes: 'Value investor, early backer. Recently reconstituted board.' },
  ],
  competitors: [
    { name: 'Strategy Inc.', ticker: 'MSTR', relevance: 'Largest corporate BTC holder. Adding ETH exposure. Core treasury comp.' },
    { name: 'ETHZilla', ticker: 'FRMM', relevance: 'Direct ETH treasury competitor. Competitive pressure on market positioning.' },
    { name: 'Marathon Digital', ticker: 'MARA', relevance: 'BTC mining, transitioning to broader digital asset strategy.' },
    { name: 'Riot Platforms', ticker: 'RIOT', relevance: 'BTC mining competitor.' },
    { name: 'Coinbase', ticker: 'COIN', relevance: 'Exchange and staking platform. Infrastructure comparison.' },
    { name: 'CleanSpark', ticker: 'CLSK', relevance: 'BTC mining competitor.' },
    { name: 'Hut 8', ticker: 'HUT', relevance: 'BTC mining and HPC infrastructure.' },
    { name: 'Kraken', relevance: 'Exchange. Custody and staking services.' },
  ],
  stockSpecificMetrics: [
    'ETH holdings count (total, staked, unstaked)',
    'BTC holdings and disposition plans',
    'Unrealized gain/loss on crypto holdings',
    'ETH accumulation pace (weekly/monthly run rate)',
    'Staking deployment progress (% of holdings staked)',
    'Staking yield (APR)',
    'Validator network (MAVAN) status and scale',
    'NAV per share',
    'Premium/Discount to NAV',
    'Dilution-to-NAV accretion ratio',
    'ATM program utilization (shares sold, proceeds, remaining capacity)',
    'Revenue by source (advisory, hosting, mining, staking)',
    'Mining wind-down progress',
    'Treasury strategy commentary changes (accumulation language, staking approach)',
    'DeFi / restaking strategy updates',
    'Authorized share count vs. planned ATM',
  ],
};

// ── CRCL ────────────────────────────────────────────────────────────────────

export const crclContext: StockContext = {
  ticker: 'CRCL',
  companyName: 'Circle Internet Group',
  exchange: 'NYSE',
  sector: 'Fintech',
  description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
  specialistDomain: 'stablecoin infrastructure, digital dollar ecosystems, and regulated fintech payments',
  fiscalYearEnd: 'December 31',
  shareStructureNotes: 'Class A and Class B shares (229.9M outstanding). IPO June 2025 at $31/share. Founder-led with Class B voting control through 2030. Zero debt, $1.15B cash.',
  keyInsiders: [
    { name: 'Jeremy Allaire', title: 'Founder & CEO', notes: 'Serial entrepreneur, former Macromedia CTO. Controls voting through Class B shares.' },
    { name: 'Sean Neville', title: 'Co-Founder', notes: 'Technical co-founder.' },
    { name: 'Adam Selipsky', title: 'Board Member', notes: 'Former AWS CEO. Appointed July 2025. Scaled cloud to $100B+ ARR.' },
  ],
  competitors: [
    { name: 'Tether (USDT)', relevance: '65% stablecoin market share (~$140B+). Offshore operations, regulatory lag vs. Circle.' },
    { name: 'PayPal USD (PYUSD)', relevance: '~$1B AUM. Distribution advantage via PayPal ecosystem but limited adoption.' },
    { name: 'Bank Stablecoins', relevance: 'JPM Coin, emerging bank-issued stablecoins. TradFi distribution advantage.' },
    { name: 'USDe (Ethena)', relevance: 'Synthetic dollar using delta-neutral derivatives.' },
    { name: 'USDG (Global Dollar)', relevance: 'Multi-chain stablecoin alternative.' },
  ],
  stockSpecificMetrics: [
    'USDC circulation ($B)',
    'USDC market share (% of total stablecoin market)',
    'USDC YoY growth rate',
    'Reserve composition and yield',
    'Reserve yield sensitivity (impact per 100bps rate change)',
    'Revenue per $10B USDC circulation',
    'RLDC margin (after Coinbase distribution cost)',
    'Coinbase revenue share drag (%)',
    'EURC (euro stablecoin) adoption and MiCA compliance',
    'Cross-Chain Transfer Protocol (CCTP) volume',
    'Circle Mint API institutional adoption',
    'Rule of 40 score (growth + margin)',
    'OCC bank charter status',
  ],
};

// ── REGISTRY ────────────────────────────────────────────────────────────────

export const stockContextRegistry: Record<string, StockContext> = {
  ASTS: astsContext,
  BMNR: bmnrContext,
  CRCL: crclContext,
};

/**
 * Get stock context by ticker (case-insensitive).
 * Returns undefined for unknown tickers.
 */
export function getStockContext(ticker: string): StockContext | undefined {
  return stockContextRegistry[ticker.toUpperCase()];
}

/**
 * Create a minimal starter context for a newly initiated stock.
 * Used by /api/research/init to auto-scaffold a registry entry.
 */
export function createStarterContext(
  ticker: string,
  name: string,
  sector: string,
  description: string,
): StockContext {
  return {
    ticker: ticker.toUpperCase(),
    companyName: name,
    exchange: 'TBD',
    sector,
    description,
    specialistDomain: `${sector.toLowerCase()} analysis and research`,
    keyInsiders: [],
    competitors: [],
    stockSpecificMetrics: [],
  };
}
