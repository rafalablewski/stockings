/**
 * Shared Investment Tab Types
 * Unified schema for ASTS, BMNR, CRCL Investment Tab data
 */

export interface ScorecardItem {
  category: string;
  rating: string;
  color: string;
  detail: string;
}

export interface ExecutiveSummary {
  headline: string;
  thesis: string;
  bottomLine: string;
  whatsNew: string[];
}

export interface GrowthDriver {
  driver: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  color: string;
}

export interface MoatSource {
  source: string;
  strength: 'Strong' | 'Building' | 'Weak';
  detail: string;
  color: string;
}

export interface MoatThreat {
  threat: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  detail: string;
  color: string;
}

export interface Risk {
  risk: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low' | 'Low-Medium';
  impact: 'Severe' | 'High' | 'Moderate' | 'Low';
  detail: string;
  mitigation: string;
}

export interface Perspective {
  title: string;
  assessment: string;
  color: string;
  summary: string;
  ecosystemView: string;
  recommendation: string;
}

export interface PositionSize {
  range: string;
  description: string;
}

export interface PriceTarget {
  period: string;
  range: string;
  outlook: string;
  detail: string;
}

export interface Catalyst {
  event: string;
  timing: string;
  impact: string;
  color: string;
}

export interface AccumulationZone {
  zone: string;
  action: string;
  color: string;
}

export interface EcosystemHealthMetric {
  metric: string;
  value: string;
  signal: string;
  weight: string;
  color: string;
}

export interface EcosystemHealth {
  overallGrade: string;
  overallColor: string;
  metrics: EcosystemHealthMetric[];
  summary: string;
}

export interface InvestmentCurrent {
  date: string;
  source: string;
  verdict: string;
  verdictColor: string;
  tagline: string;
  scorecard: ScorecardItem[];
  executiveSummary: ExecutiveSummary;
  growthDrivers: GrowthDriver[];
  moatSources: MoatSource[];
  moatThreats: MoatThreat[];
  risks: Risk[];
  perspectives: {
    cfa: Perspective;
    hedgeFund: Perspective;
    cio: Perspective;
    technicalAnalyst: Perspective;
  };
  positionSizing: {
    aggressive: PositionSize;
    growth: PositionSize;
    balanced: PositionSize;
    conservative: PositionSize;
  };
  // Optional company-specific fields
  priceTargets?: PriceTarget[];
  catalysts?: Catalyst[];
  accumulation?: AccumulationZone[];
  ecosystemHealth?: EcosystemHealth;
}

export interface ArchiveEntry {
  date: string;
  source?: string;
  filing?: string;
  verdict: string;
  verdictColor?: string;
  headline?: string;
  summary: string;
  keyDevelopments?: string[];
  whyItMatters?: string;
  lookingAhead?: string;
  fullAnalysis?: {
    context: string;
    keyHighlights: string[];
    verdict: string;
    scorecard: number;
    risks: string;
    strategy: string;
  };
}

export interface SharedInvestmentTabProps {
  current: InvestmentCurrent;
  archive: ArchiveEntry[];
  ticker: string;
  // Optional render props for company-specific sections
  renderHeaderMetrics?: () => React.ReactNode;
  renderEcosystemHealth?: () => React.ReactNode;
  renderCatalysts?: () => React.ReactNode;
  renderAccumulation?: () => React.ReactNode;
}
