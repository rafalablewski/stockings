// Stock Registry

export interface StockMeta {
  ticker: string;
  name: string;
  sector: string;
  description: string;
  /** Whether this stock has full research coverage (data files + analysis component) */
  hasResearch?: boolean;
}

export const stocks: Record<string, StockMeta> = {
  AFRM: {
    ticker: 'AFRM',
    name: 'Affirm',
    sector: 'Fintech',
    description: 'Buy-now-pay-later platform providing point-of-sale consumer financing',
  },
  AMT: {
    ticker: 'AMT',
    name: 'American Tower',
    sector: 'Infrastructure',
    description: 'Global real estate investment trust owning and operating wireless communications towers',
  },
  APLD: {
    ticker: 'APLD',
    name: 'Applied Digital',
    sector: 'Digital Assets',
    description: 'Next-generation digital infrastructure company providing HPC, AI cloud, and mining services',
  },
  ARBK: {
    ticker: 'ARBK',
    name: 'Argo Blockchain',
    sector: 'Digital Assets',
    description: 'UK-based Bitcoin mining company operating data centers in North America',
  },
  ASTS: {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    sector: 'Space Technology',
    description: 'Space-based cellular broadband network accessible by standard smartphones',
    hasResearch: true,
  },
  AXP: {
    ticker: 'AXP',
    name: 'American Express',
    sector: 'Fintech',
    description: 'Global financial services company known for charge cards, credit cards, and travel services',
  },
  BA: {
    ticker: 'BA',
    name: 'Boeing',
    sector: 'Aerospace & Defense',
    description: 'Global aerospace company manufacturing commercial jets, defense systems, and space vehicles',
  },
  BCE: {
    ticker: 'BCE',
    name: 'BCE Inc.',
    sector: 'Telecom',
    description: 'Canada\'s largest telecommunications company operating Bell wireless, internet, and media',
  },
  BITF: {
    ticker: 'BITF',
    name: 'Bitfarms',
    sector: 'Digital Assets',
    description: 'Global Bitcoin mining company operating environmentally-conscious data centers',
  },
  BKKT: {
    ticker: 'BKKT',
    name: 'Bakkt',
    sector: 'Digital Assets',
    description: 'Digital asset marketplace providing crypto custody, trading, and loyalty solutions',
  },
  BLK: {
    ticker: 'BLK',
    name: 'BlackRock',
    sector: 'Financial Services',
    description: 'World\'s largest asset manager, leading provider of ETFs and index investing',
  },
  BMNR: {
    ticker: 'BMNR',
    name: 'BitMine Immersion Technologies',
    sector: 'Digital Assets',
    description: 'ETH treasury company with immersion cooling and validator operations',
    hasResearch: true,
  },
  C: {
    ticker: 'C',
    name: 'Citigroup',
    sector: 'Financial Services',
    description: 'Global diversified financial services company serving consumers, corporations, and governments',
  },
  CAN: {
    ticker: 'CAN',
    name: 'Canaan',
    sector: 'Digital Assets',
    description: 'Chinese ASIC chip designer and manufacturer of Bitcoin mining hardware (Avalon series)',
  },
  CIFR: {
    ticker: 'CIFR',
    name: 'Cipher Mining',
    sector: 'Digital Assets',
    description: 'Bitcoin mining company focused on US-based sustainable data center operations',
  },
  CLSK: {
    ticker: 'CLSK',
    name: 'CleanSpark',
    sector: 'Digital Assets',
    description: 'Bitcoin mining company focused on low-carbon energy sources',
  },
  CME: {
    ticker: 'CME',
    name: 'CME Group',
    sector: 'Financial Services',
    description: 'World\'s largest financial derivatives exchange operating CME, CBOT, NYMEX, and COMEX',
  },
  COIN: {
    ticker: 'COIN',
    name: 'Coinbase Global',
    sector: 'Digital Assets',
    description: 'Largest US cryptocurrency exchange and digital asset platform',
  },
  CORZ: {
    ticker: 'CORZ',
    name: 'Core Scientific',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and AI/HPC hosting company operating large-scale data center infrastructure',
  },
  CRCL: {
    ticker: 'CRCL',
    name: 'Circle Internet Group',
    sector: 'Fintech',
    description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
    hasResearch: true,
  },
  ERIC: {
    ticker: 'ERIC',
    name: 'Ericsson',
    sector: 'Telecom Equipment',
    description: 'Swedish telecom equipment company providing 5G, cloud RAN, and managed network services',
  },
  FRMM: {
    ticker: 'FRMM',
    name: 'Forum Markets',
    sector: 'Digital Assets',
    description: 'Digital asset platform for tokenized real-world assets on Ethereum (formerly ETHZilla / ETHZ)',
  },
  GLXY: {
    ticker: 'GLXY',
    name: 'Galaxy Digital',
    sector: 'Digital Assets',
    description: 'Digital asset and blockchain financial services company',
  },
  GOOGL: {
    ticker: 'GOOGL',
    name: 'Alphabet',
    sector: 'Technology',
    description: 'Parent company of Google, operating search, cloud, YouTube, and Waymo autonomous vehicles',
  },
  HIVE: {
    ticker: 'HIVE',
    name: 'HIVE Digital',
    sector: 'Digital Assets',
    description: 'Digital asset mining company operating green-energy data centers for Bitcoin and HPC',
  },
  HOOD: {
    ticker: 'HOOD',
    name: 'Robinhood Markets',
    sector: 'Fintech',
    description: 'Commission-free trading platform for stocks, ETFs, options, and crypto',
  },
  HSBC: {
    ticker: 'HSBC',
    name: 'HSBC Holdings',
    sector: 'Financial Services',
    description: 'Global banking and financial services multinational headquartered in London',
  },
  HUT: {
    ticker: 'HUT',
    name: 'Hut 8',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and high-performance computing infrastructure company',
  },
  IBM: {
    ticker: 'IBM',
    name: 'IBM',
    sector: 'Technology',
    description: 'Enterprise technology company providing hybrid cloud, AI (watsonx), and consulting services',
  },
  ICE: {
    ticker: 'ICE',
    name: 'Intercontinental Exchange',
    sector: 'Financial Services',
    description: 'Operator of global exchanges and clearing houses including NYSE and ICE Futures',
  },
  IREN: {
    ticker: 'IREN',
    name: 'IREN',
    sector: 'Digital Assets',
    description: 'Next-generation data center business powering AI and Bitcoin mining',
  },
  LMT: {
    ticker: 'LMT',
    name: 'Lockheed Martin',
    sector: 'Aerospace & Defense',
    description: 'World\'s largest defense contractor producing F-35, missiles, and space systems',
  },
  LUNR: {
    ticker: 'LUNR',
    name: 'Intuitive Machines',
    sector: 'Space Technology',
    description: 'Space exploration company providing lunar landing, data transmission, and orbital services',
  },
  MA: {
    ticker: 'MA',
    name: 'Mastercard',
    sector: 'Fintech',
    description: 'Global payments technology company operating the world\'s second-largest card network',
  },
  MARA: {
    ticker: 'MARA',
    name: 'MARA Holdings',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and digital asset technology company',
  },
  MSTR: {
    ticker: 'MSTR',
    name: 'Strategy',
    sector: 'Digital Assets',
    description: 'Bitcoin treasury company (formerly MicroStrategy), largest corporate BTC holder',
  },
  NBIS: {
    ticker: 'NBIS',
    name: 'Nebius',
    sector: 'AI Infrastructure',
    description: 'AI infrastructure company providing cloud compute, data tools, and AI services',
  },
  NOK: {
    ticker: 'NOK',
    name: 'Nokia',
    sector: 'Telecom Equipment',
    description: 'Finnish telecom equipment maker providing 5G network infrastructure and IP licensing',
  },
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA',
    sector: 'Semiconductors',
    description: 'Leading GPU and AI chip designer powering data centers, gaming, and autonomous vehicles',
  },
  ORAN: {
    ticker: 'ORAN',
    name: 'Orange',
    sector: 'Telecom',
    description: 'French multinational telecommunications operator serving Europe, Africa, and the Middle East',
  },
  PL: {
    ticker: 'PL',
    name: 'Planet Labs',
    sector: 'Space & Satellite',
    description: 'Earth imaging company operating the largest constellation of Earth observation satellites',
  },
  PYPL: {
    ticker: 'PYPL',
    name: 'PayPal',
    sector: 'Fintech',
    description: 'Global digital payments platform operating PayPal, Venmo, and Braintree',
  },
  QCOM: {
    ticker: 'QCOM',
    name: 'Qualcomm',
    sector: 'Semiconductors',
    description: 'Leading designer of wireless technology and Snapdragon mobile processors',
  },
  RIOT: {
    ticker: 'RIOT',
    name: 'Riot Platforms',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and digital infrastructure company',
  },
  RKLB: {
    ticker: 'RKLB',
    name: 'Rocket Lab',
    sector: 'Space Technology',
    description: 'End-to-end space company providing launch services, spacecraft, and space systems',
  },
  RKUNF: {
    ticker: 'RKUNF',
    name: 'Rakuten Group',
    sector: 'Telecom',
    description: 'Japanese tech conglomerate operating mobile network, e-commerce, and fintech services',
  },
  SATS: {
    ticker: 'SATS',
    name: 'EchoStar',
    sector: 'Space Technology',
    description: 'Global satellite communications and technology company operating Hughes and DISH networks',
  },
  SEZL: {
    ticker: 'SEZL',
    name: 'Sezzle',
    sector: 'Fintech',
    description: 'Buy-now-pay-later platform enabling installment payment plans for online shoppers',
  },
  SOFI: {
    ticker: 'SOFI',
    name: 'SoFi Technologies',
    sector: 'Fintech',
    description: 'Digital personal finance company offering banking, lending, and investing services',
  },
  SQ: {
    ticker: 'SQ',
    name: 'Block',
    sector: 'Fintech',
    description: 'Financial technology company operating Square POS, Cash App, and Bitcoin services',
  },
  TMUS: {
    ticker: 'TMUS',
    name: 'T-Mobile US',
    sector: 'Telecom',
    description: 'Third-largest US wireless carrier with leading 5G mid-band spectrum deployment',
  },
  TU: {
    ticker: 'TU',
    name: 'Telus',
    sector: 'Telecom',
    description: 'Canadian telecommunications company providing wireless, internet, and digital health services',
  },
  UPST: {
    ticker: 'UPST',
    name: 'Upstart',
    sector: 'Fintech',
    description: 'AI-powered lending platform connecting consumers with bank partners',
  },
  V: {
    ticker: 'V',
    name: 'Visa',
    sector: 'Fintech',
    description: 'Global payments technology company operating the world\'s largest card network',
  },
  VOD: {
    ticker: 'VOD',
    name: 'Vodafone',
    sector: 'Telecom',
    description: 'Multinational telecommunications company operating networks across Europe and Africa',
  },
  VSAT: {
    ticker: 'VSAT',
    name: 'Viasat',
    sector: 'Space Technology',
    description: 'Global communications company providing satellite and wireless networking systems',
  },
};

export const stockList = Object.values(stocks);
export const tickers = Object.keys(stocks);
/** Only stocks with full research coverage (data files + analysis) */
export const researchStocks = stockList.filter(s => s.hasResearch);
/** Lowercase ticker set — single source of truth for API route validation */
export const VALID_TICKERS = new Set(Object.keys(stocks).map(t => t.toLowerCase()));

/**
 * Intelligence tickers — single source of truth for Press Intelligence
 * and SEC Intelligence. Alphabetical order.
 *
 * When adding a new stock to intelligence coverage, add it here ONCE.
 * Both Press Intelligence and SEC Intelligence pages import this list.
 */
export const INTELLIGENCE_TICKERS = [
  'AFRM', 'AMT', 'AMZLEO', 'APLD', 'ARBK', 'ASTS', 'AXP',
  'BA', 'BCE', 'BITF', 'BKKT', 'BLK', 'BMNR',
  'C', 'CAN', 'CIFR', 'CLSK', 'CME', 'COIN', 'CORZ', 'CRCL',
  'ERIC',
  'FRMM',
  'GLXY', 'GOOGL', 'GSAT',
  'HIVE', 'HOOD', 'HSBC', 'HUT',
  'IBM', 'ICE', 'IRDM', 'IREN',
  'LMT', 'LUNR',
  'MA', 'MARA', 'MSTR',
  'NBIS', 'NOK', 'NVDA',
  'ORAN',
  'PL', 'PYPL',
  'QCOM',
  'RIOT', 'RKLB', 'RKUNF',
  'SATS', 'SEZL', 'SOFI', 'SQ',
  'T', 'TMUS', 'TU',
  'UPST',
  'V', 'VOD', 'VSAT', 'VZ',
] as const;

export type IntelligenceTicker = typeof INTELLIGENCE_TICKERS[number];
