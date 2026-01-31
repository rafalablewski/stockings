/**
 * Shared Capital Structure Types
 * Unified schema for ASTS, BMNR, CRCL Capital Structure data
 */

export interface ShareClass {
  class: string;
  authorized: number;  // in shares (not millions)
  outstanding: number; // in shares (not millions)
  votes: string | number;
  description: string;
  status?: 'active' | 'converted' | 'reserved';
}

export interface MajorShareholder {
  name: string;
  shares?: number;
  classA?: number;
  classB?: number;
  percent?: number;
  pctVoting?: number;
  type: 'Insider' | 'Strategic' | 'Institutional' | 'Founder';
  role?: string;
  shareClass?: string;
  votingPct?: number;
  notes?: string;
  source?: string;
}

export interface EquityOffering {
  date: string;
  type: string;
  event?: string;
  amount?: number;
  shares?: number;
  price?: number;
  grossProceeds?: number;
  status?: 'active' | 'exhausted' | 'completed' | 'converted';
  underwriters?: string;
}

export interface Warrant {
  date?: string;
  type: string;
  shares: number;
  exercisePrice?: number;
  strike?: number;
  fairValue?: number;
  volatility?: number;
  expiry?: string;
  status?: string;
  source?: string;
}

export interface EquityPlan {
  plan: string;
  reserved: number;
  description: string;
}

export interface EquityAwards {
  options: {
    classA: number;
    classB: number;
    weightedAvgPrice: number;
  };
  rsus: {
    classA: number;
    classB: number;
  };
}

export interface DilutionHistoryEntry {
  quarter: string;
  classA: number;
  implied: number;
  fullyDiluted: number;
  event: string;
}

export interface SBCHistoryEntry {
  quarter: string;
  sbc: number;
  engineering: number;
  gAndA: number;
}

export interface PreferredStock {
  series: string;
  year: number;
  shares: number;
  liquidation: number;
  pricePerShare: number;
}

export interface CapitalNavItem {
  id: string;
  value: string;
  label: string;
  sub: string;
}

export interface SharedCapitalTabProps {
  ticker: string;
  currentShares: number;
  currentStockPrice: number;
  shareClasses: ShareClass[];
  majorShareholders: MajorShareholder[];
  equityOfferings: EquityOffering[];
  warrants?: Warrant[];
  equityPlans?: EquityPlan[];
  equityAwards?: EquityAwards;
  dilutionHistory?: DilutionHistoryEntry[];
  sbcHistory?: SBCHistoryEntry[];
  preferredStock?: PreferredStock[];
  totalBasicShares?: number;
  fullyDilutedShares?: number;
  totalVotingShares?: number;
  highlightTitle: string;
  highlightDescription: string;
  accentColor?: 'sky' | 'violet' | 'mint';
  navItems: CapitalNavItem[];
  cfaItems: { term: string; def: string }[];
}
