/**
 * BMNR Research Sources & Competitors
 * Extracted from BMNR.tsx for reuse in Dashboard and stock detail page.
 */

import type { SourceGroup, Competitor } from '@/components/shared/SharedSourcesTab';

export const BMNR_COMPETITOR_LABEL = 'Crypto Treasury Peers';

export const BMNR_COMPETITORS: Competitor[] = [
  { name: 'Strategy (MSTR)', url: 'https://www.strategy.com/investor-relations' },
  { name: 'Coinbase Blog', url: 'https://www.coinbase.com/blog' },
  { name: 'Coinbase IR', url: 'https://investor.coinbase.com' },
  { name: 'Marathon Digital (MARA)', url: 'https://ir.mara.com' },
  { name: 'Riot Platforms (RIOT)', url: 'https://www.riotplatforms.com' },
  { name: 'CleanSpark (CLSK)', url: 'https://www.cleanspark.com' },
  { name: 'ETHZilla (ETHZ)', url: 'https://ir.ethzilla.com' },
];

export const BMNR_RESEARCH_SOURCES: SourceGroup[] = [
  { category: 'Company / IR', sources: [
    { name: 'BMNR Investor Relations (PRNewswire)', url: 'https://www.prnewswire.com' },
    { name: 'SEC EDGAR (BMNR Filings)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=vinanz&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
  ]},
  { category: 'Crypto Treasury Competitors', sources: [
    { name: 'Strategy (MSTR) Investor Relations', url: 'https://www.strategy.com/investor-relations' },
    { name: 'Coinbase Blog', url: 'https://www.coinbase.com/blog' },
    { name: 'Coinbase Investor Relations', url: 'https://investor.coinbase.com' },
    { name: 'Marathon Digital (MARA)', url: 'https://ir.mara.com' },
    { name: 'Riot Platforms (RIOT)', url: 'https://www.riotplatforms.com' },
    { name: 'CleanSpark (CLSK)', url: 'https://www.cleanspark.com' },
    { name: 'ETHZilla (ETHZ) IR', url: 'https://ir.ethzilla.com' },
  ]},
  { category: 'Ethereum Protocol / Foundation', sources: [
    { name: 'Ethereum Foundation Blog', url: 'https://blog.ethereum.org' },
    { name: 'Vitalik Buterin Blog', url: 'https://vitalik.eth.limo' },
    { name: 'ENS Domains Blog', url: 'https://ens.domains/blog' },
    { name: 'Base Blog', url: 'https://base.org/blog' },
    { name: 'Etherscan', url: 'https://etherscan.io' },
    { name: 'Dune Analytics', url: 'https://dune.com' },
    { name: 'L2Beat', url: 'https://l2beat.com' },
  ]},
  { category: 'Institutional / TradFi', sources: [
    { name: 'BlackRock', url: 'https://www.blackrock.com' },
    { name: 'Fidelity Digital Assets', url: 'https://www.fidelitydigitalassets.com' },
    { name: 'Franklin Templeton', url: 'https://www.franklintempleton.com' },
    { name: 'State Street', url: 'https://www.statestreet.com' },
    { name: 'WisdomTree', url: 'https://www.wisdomtree.com' },
    { name: 'JPMorgan / Kinexys', url: 'https://www.jpmorgan.com' },
    { name: 'Goldman Sachs', url: 'https://www.goldmansachs.com' },
    { name: 'Standard Chartered', url: 'https://www.sc.com' },
    { name: 'Deutsche Bank', url: 'https://www.db.com' },
    { name: 'HSBC', url: 'https://www.hsbc.com' },
    { name: 'Citi', url: 'https://www.citigroup.com' },
  ]},
  { category: 'Regulatory', sources: [
    { name: 'SEC (Securities & Exchange Commission)', url: 'https://www.sec.gov' },
    { name: 'CFTC', url: 'https://www.cftc.gov' },
    { name: 'US Senate Banking Committee', url: 'https://www.banking.senate.gov' },
    { name: 'ESMA (EU Securities & Markets)', url: 'https://www.esma.europa.eu' },
    { name: 'UK FCA', url: 'https://www.fca.org.uk' },
  ]},
  { category: 'Crypto News / Data', sources: [
    { name: 'CoinDesk', url: 'https://www.coindesk.com' },
    { name: 'The Block', url: 'https://www.theblock.co' },
    { name: 'CryptoSlate', url: 'https://cryptoslate.com' },
    { name: 'Decrypt', url: 'https://decrypt.co' },
    { name: 'Bitcoin.com', url: 'https://news.bitcoin.com' },
    { name: 'CoinGecko', url: 'https://www.coingecko.com' },
    { name: 'CoinShares', url: 'https://coinshares.com' },
    { name: 'Ledger Insights', url: 'https://www.ledgerinsights.com' },
  ]},
  { category: 'Financial / Analyst', sources: [
    { name: 'Cantor Fitzgerald', url: 'https://www.cantor.com' },
    { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
    { name: 'CNBC', url: 'https://www.cnbc.com' },
  ]},
  { category: 'Press / News Wires', sources: [
    { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
    { name: 'Business Wire', url: 'https://www.businesswire.com' },
    { name: 'ACCESS Newswire', url: 'https://www.accessnewswire.com' },
    { name: 'GlobeNewswire', url: 'https://www.globenewswire.com' },
  ]},
];
