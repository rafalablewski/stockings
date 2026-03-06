// Stock Registry

export interface StockMeta {
  ticker: string;
  name: string;
  sector: string;
  description: string;
  accent: string;   // CSS color token name: 'cyan', 'violet', 'mint', etc.
  cik?: string;     // SEC CIK number (zero-padded). Undefined = no EDGAR coverage.
}

export const stocks: Record<string, StockMeta> = {
  ASTS: {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    sector: 'Space Technology',
    description: 'Space-based cellular broadband network accessible by standard smartphones',
    accent: 'cyan',
    cik: '0001780312',
  },
  BMNR: {
    ticker: 'BMNR',
    name: 'BitMine Immersion Technologies',
    sector: 'Digital Assets',
    description: 'ETH treasury company with immersion cooling and validator operations',
    accent: 'violet',
    cik: '0001829311',
  },
  CRCL: {
    ticker: 'CRCL',
    name: 'Circle Internet Group',
    sector: 'Fintech',
    description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
    accent: 'mint',
    cik: '0001876042',
  },
};

export const stockList = Object.values(stocks);
export const tickers = Object.keys(stocks);
/** Lowercase ticker set — single source of truth for API route validation */
export const VALID_TICKERS = new Set(Object.keys(stocks).map(t => t.toLowerCase()));
