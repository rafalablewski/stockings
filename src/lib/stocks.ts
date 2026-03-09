// Stock Registry

export interface StockMeta {
  ticker: string;
  name: string;
  sector: string;
  description: string;
}

export const stocks: Record<string, StockMeta> = {
  ASTS: {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    sector: 'Space Technology',
    description: 'Space-based cellular broadband network accessible by standard smartphones',
  },
  BMNR: {
    ticker: 'BMNR',
    name: 'BitMine Immersion Technologies',
    sector: 'Digital Assets',
    description: 'ETH treasury company with immersion cooling and validator operations',
  },
  CRCL: {
    ticker: 'CRCL',
    name: 'Circle Internet Group',
    sector: 'Fintech',
    description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
  },
  MSTR: {
    ticker: 'MSTR',
    name: 'Strategy',
    sector: 'Digital Assets',
    description: 'Bitcoin treasury company (formerly MicroStrategy), largest corporate BTC holder',
  },
  MARA: {
    ticker: 'MARA',
    name: 'MARA Holdings',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and digital asset technology company',
  },
  RIOT: {
    ticker: 'RIOT',
    name: 'Riot Platforms',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and digital infrastructure company',
  },
  CLSK: {
    ticker: 'CLSK',
    name: 'CleanSpark',
    sector: 'Digital Assets',
    description: 'Bitcoin mining company focused on low-carbon energy sources',
  },
  FRMM: {
    ticker: 'FRMM',
    name: 'Forum Markets',
    sector: 'Digital Assets',
    description: 'Digital asset platform for tokenized real-world assets on Ethereum (formerly ETHZilla / ETHZ)',
  },
  COIN: {
    ticker: 'COIN',
    name: 'Coinbase Global',
    sector: 'Digital Assets',
    description: 'Largest US cryptocurrency exchange and digital asset platform',
  },
  VSAT: {
    ticker: 'VSAT',
    name: 'Viasat',
    sector: 'Space Technology',
    description: 'Global communications company providing satellite and wireless networking systems',
  },
  RKLB: {
    ticker: 'RKLB',
    name: 'Rocket Lab',
    sector: 'Space Technology',
    description: 'End-to-end space company providing launch services, spacecraft, and space systems',
  },
};

export const stockList = Object.values(stocks);
export const tickers = Object.keys(stocks);
/** Lowercase ticker set — single source of truth for API route validation */
export const VALID_TICKERS = new Set(Object.keys(stocks).map(t => t.toLowerCase()));
