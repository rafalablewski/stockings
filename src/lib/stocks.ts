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
  ASTS: {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    sector: 'Space Technology',
    description: 'Space-based cellular broadband network accessible by standard smartphones',
    hasResearch: true,
  },
  BMNR: {
    ticker: 'BMNR',
    name: 'BitMine Immersion Technologies',
    sector: 'Digital Assets',
    description: 'ETH treasury company with immersion cooling and validator operations',
    hasResearch: true,
  },
  CRCL: {
    ticker: 'CRCL',
    name: 'Circle Internet Group',
    sector: 'Fintech',
    description: 'Issuer of USDC, the leading regulated digital dollar stablecoin',
    hasResearch: true,
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
  SATS: {
    ticker: 'SATS',
    name: 'EchoStar',
    sector: 'Space Technology',
    description: 'Global satellite communications and technology company operating Hughes and DISH networks',
  },
  LUNR: {
    ticker: 'LUNR',
    name: 'Intuitive Machines',
    sector: 'Space Technology',
    description: 'Space exploration company providing lunar landing, data transmission, and orbital services',
  },
  HUT: {
    ticker: 'HUT',
    name: 'Hut 8',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and high-performance computing infrastructure company',
  },
  IREN: {
    ticker: 'IREN',
    name: 'IREN',
    sector: 'Digital Assets',
    description: 'Next-generation data center business powering AI and Bitcoin mining',
  },
  NBIS: {
    ticker: 'NBIS',
    name: 'Nebius',
    sector: 'AI Infrastructure',
    description: 'AI infrastructure company providing cloud compute, data tools, and AI services',
  },
  MA: {
    ticker: 'MA',
    name: 'Mastercard',
    sector: 'Fintech',
    description: 'Global payments technology company operating the world\'s second-largest card network',
  },
  V: {
    ticker: 'V',
    name: 'Visa',
    sector: 'Fintech',
    description: 'Global payments technology company operating the world\'s largest card network',
  },
  SOFI: {
    ticker: 'SOFI',
    name: 'SoFi Technologies',
    sector: 'Fintech',
    description: 'Digital personal finance company offering banking, lending, and investing services',
  },
  AXP: {
    ticker: 'AXP',
    name: 'American Express',
    sector: 'Fintech',
    description: 'Global financial services company known for charge cards, credit cards, and travel services',
  },
  AFRM: {
    ticker: 'AFRM',
    name: 'Affirm',
    sector: 'Fintech',
    description: 'Buy-now-pay-later platform providing point-of-sale consumer financing',
  },
  GLXY: {
    ticker: 'GLXY',
    name: 'Galaxy Digital',
    sector: 'Digital Assets',
    description: 'Digital asset and blockchain financial services company',
  },
  HOOD: {
    ticker: 'HOOD',
    name: 'Robinhood Markets',
    sector: 'Fintech',
    description: 'Commission-free trading platform for stocks, ETFs, options, and crypto',
  },
  BLK: {
    ticker: 'BLK',
    name: 'BlackRock',
    sector: 'Financial Services',
    description: 'World\'s largest asset manager, leading provider of ETFs and index investing',
  },
  HSBC: {
    ticker: 'HSBC',
    name: 'HSBC Holdings',
    sector: 'Financial Services',
    description: 'Global banking and financial services multinational headquartered in London',
  },
  C: {
    ticker: 'C',
    name: 'Citigroup',
    sector: 'Financial Services',
    description: 'Global diversified financial services company serving consumers, corporations, and governments',
  },
  VOD: {
    ticker: 'VOD',
    name: 'Vodafone',
    sector: 'Telecom',
    description: 'Multinational telecommunications company operating networks across Europe and Africa',
  },
  ORAN: {
    ticker: 'ORAN',
    name: 'Orange',
    sector: 'Telecom',
    description: 'French multinational telecommunications operator serving Europe, Africa, and the Middle East',
  },
  TU: {
    ticker: 'TU',
    name: 'Telus',
    sector: 'Telecom',
    description: 'Canadian telecommunications company providing wireless, internet, and digital health services',
  },
  BCE: {
    ticker: 'BCE',
    name: 'BCE Inc.',
    sector: 'Telecom',
    description: 'Canada\'s largest telecommunications company operating Bell wireless, internet, and media',
  },
  AMT: {
    ticker: 'AMT',
    name: 'American Tower',
    sector: 'Infrastructure',
    description: 'Global real estate investment trust owning and operating wireless communications towers',
  },
  RKUNF: {
    ticker: 'RKUNF',
    name: 'Rakuten Group',
    sector: 'Telecom',
    description: 'Japanese tech conglomerate operating mobile network, e-commerce, and fintech services',
  },
  GOOGL: {
    ticker: 'GOOGL',
    name: 'Alphabet',
    sector: 'Technology',
    description: 'Parent company of Google, operating search, cloud, YouTube, and Waymo autonomous vehicles',
  },
  SEZL: {
    ticker: 'SEZL',
    name: 'Sezzle',
    sector: 'Fintech',
    description: 'Buy-now-pay-later platform enabling installment payment plans for online shoppers',
  },
  SQ: {
    ticker: 'SQ',
    name: 'Block',
    sector: 'Fintech',
    description: 'Financial technology company operating Square POS, Cash App, and Bitcoin services',
  },
  PYPL: {
    ticker: 'PYPL',
    name: 'PayPal',
    sector: 'Fintech',
    description: 'Global digital payments platform operating PayPal, Venmo, and Braintree',
  },
  UPST: {
    ticker: 'UPST',
    name: 'Upstart',
    sector: 'Fintech',
    description: 'AI-powered lending platform connecting consumers with bank partners',
  },
  BITF: {
    ticker: 'BITF',
    name: 'Bitfarms',
    sector: 'Digital Assets',
    description: 'Global Bitcoin mining company operating environmentally-conscious data centers',
  },
  CME: {
    ticker: 'CME',
    name: 'CME Group',
    sector: 'Financial Services',
    description: 'World\'s largest financial derivatives exchange operating CME, CBOT, NYMEX, and COMEX',
  },
  ICE: {
    ticker: 'ICE',
    name: 'Intercontinental Exchange',
    sector: 'Financial Services',
    description: 'Operator of global exchanges and clearing houses including NYSE and ICE Futures',
  },
  PL: {
    ticker: 'PL',
    name: 'Planet Labs',
    sector: 'Space & Satellite',
    description: 'Earth imaging company operating the largest constellation of Earth observation satellites',
  },
  BA: {
    ticker: 'BA',
    name: 'Boeing',
    sector: 'Aerospace & Defense',
    description: 'Global aerospace company manufacturing commercial jets, defense systems, and space vehicles',
  },
  LMT: {
    ticker: 'LMT',
    name: 'Lockheed Martin',
    sector: 'Aerospace & Defense',
    description: 'World\'s largest defense contractor producing F-35, missiles, and space systems',
  },
  QCOM: {
    ticker: 'QCOM',
    name: 'Qualcomm',
    sector: 'Semiconductors',
    description: 'Leading designer of wireless technology and Snapdragon mobile processors',
  },
  NOK: {
    ticker: 'NOK',
    name: 'Nokia',
    sector: 'Telecom Equipment',
    description: 'Finnish telecom equipment maker providing 5G network infrastructure and IP licensing',
  },
  ERIC: {
    ticker: 'ERIC',
    name: 'Ericsson',
    sector: 'Telecom Equipment',
    description: 'Swedish telecom equipment company providing 5G, cloud RAN, and managed network services',
  },
  TMUS: {
    ticker: 'TMUS',
    name: 'T-Mobile US',
    sector: 'Telecom',
    description: 'Third-largest US wireless carrier with leading 5G mid-band spectrum deployment',
  },
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA',
    sector: 'Semiconductors',
    description: 'Leading GPU and AI chip designer powering data centers, gaming, and autonomous vehicles',
  },
  IBM: {
    ticker: 'IBM',
    name: 'IBM',
    sector: 'Technology',
    description: 'Enterprise technology company providing hybrid cloud, AI (watsonx), and consulting services',
  },
  CIFR: {
    ticker: 'CIFR',
    name: 'Cipher Mining',
    sector: 'Digital Assets',
    description: 'Bitcoin mining company focused on US-based sustainable data center operations',
  },
  HIVE: {
    ticker: 'HIVE',
    name: 'HIVE Digital',
    sector: 'Digital Assets',
    description: 'Digital asset mining company operating green-energy data centers for Bitcoin and HPC',
  },
  CORZ: {
    ticker: 'CORZ',
    name: 'Core Scientific',
    sector: 'Digital Assets',
    description: 'Bitcoin mining and AI/HPC hosting company operating large-scale data center infrastructure',
  },
  APLD: {
    ticker: 'APLD',
    name: 'Applied Digital',
    sector: 'Digital Assets',
    description: 'Next-generation digital infrastructure company providing HPC, AI cloud, and mining services',
  },
  CAN: {
    ticker: 'CAN',
    name: 'Canaan',
    sector: 'Digital Assets',
    description: 'Chinese ASIC chip designer and manufacturer of Bitcoin mining hardware (Avalon series)',
  },
  ARBK: {
    ticker: 'ARBK',
    name: 'Argo Blockchain',
    sector: 'Digital Assets',
    description: 'UK-based Bitcoin mining company operating data centers in North America',
  },
  BKKT: {
    ticker: 'BKKT',
    name: 'Bakkt',
    sector: 'Digital Assets',
    description: 'Digital asset marketplace providing crypto custody, trading, and loyalty solutions',
  },
};

export const stockList = Object.values(stocks);
export const tickers = Object.keys(stocks);
/** Only stocks with full research coverage (data files + analysis) */
export const researchStocks = stockList.filter(s => s.hasResearch);
/** Lowercase ticker set — single source of truth for API route validation */
export const VALID_TICKERS = new Set(Object.keys(stocks).map(t => t.toLowerCase()));
