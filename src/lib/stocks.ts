// Stock Registry - Metadata for all analyzed stocks
// Add new stocks here as you expand your coverage

export interface StockMeta {
  ticker: string;
  name: string;
  sector: string;
  description: string;
  color: string; // Tailwind color class
  icon: string; // Emoji or icon identifier
}

export const stocks: Record<string, StockMeta> = {
  ASTS: {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    sector: 'Space Technology',
    description: 'Building the first space-based cellular broadband network accessible by standard smartphones',
    color: 'from-blue-500 to-cyan-500',
    icon: '🛰️',
  },
  BMNR: {
    ticker: 'BMNR',
    name: 'BitMine Immersion Technologies',
    sector: 'Cryptocurrency / Mining',
    description: 'ETH treasury company with immersion cooling technology and validator operations',
    color: 'from-orange-500 to-amber-500',
    icon: '⛏️',
  },
  CRCL: {
    ticker: 'CRCL',
    name: 'Circle Internet Group',
    sector: 'Fintech / Stablecoins',
    description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
    color: 'from-emerald-500 to-teal-500',
    icon: '💵',
  },
};

export const stockList = Object.values(stocks);
export const tickers = Object.keys(stocks);
