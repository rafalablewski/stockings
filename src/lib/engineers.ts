// ============================================================================
// AI ENGINEERS — Autonomous agent definitions
// ============================================================================
// Each "engineer" is a continuously-operating AI agent that monitors,
// analyses, and updates research data without manual prompt execution.
// Unlike workflows (which require a human to click "Run" and paste data),
// engineers run on schedules or in response to events.
// ============================================================================

export interface EngineerTask {
  id: string;
  name: string;
  role: string;                       // one-line role description (like a job title)
  description: string;                // what this engineer does autonomously
  capabilities: string[];             // bullet-point list of autonomous actions
  workflowIds: string[];              // workflow IDs this engineer orchestrates
  defaultIntervalMinutes: number;     // suggested schedule frequency
  triggerEvents: string[];            // events that can trigger this engineer
  requiresData: boolean;             // whether it needs external data (SEC, news, etc.)
  dataSource?: string;                // where it gets its data from autonomously
  category: 'research' | 'monitoring' | 'audit' | 'intelligence';
}

export const engineers: EngineerTask[] = [
  // ── RESEARCH ENGINEERS ──────────────────────────────────────────────────
  {
    id: 'thesis-engineer',
    name: 'Thesis Engineer',
    role: 'Senior Research Analyst',
    description: 'Continuously pressure-tests the investment thesis against new data. Runs bull/bear/base scenario analysis on a schedule, detects thesis drift, and auto-updates conviction scores when material changes occur.',
    capabilities: [
      'Run thesis review against current database state',
      'Detect changes in conviction scores over time',
      'Flag thesis drift when data contradicts assumptions',
      'Generate weekly thesis health reports',
      'Auto-update scorecard categories when new data lands',
    ],
    workflowIds: ['thesis-review', 'weekly-digest'],
    defaultIntervalMinutes: 360, // every 6 hours
    triggerEvents: ['filing-ingested', 'press-release-added', 'price-alert'],
    requiresData: false,
    category: 'research',
  },
  {
    id: 'capital-engineer',
    name: 'Capital Structure Engineer',
    role: 'Capital Markets Analyst',
    description: 'Monitors dilution waterfall, share count changes, warrant exercises, and capital structure evolution. Automatically recalculates NAV/share and flags significant dilution events.',
    capabilities: [
      'Track share count changes from new filings',
      'Recalculate dilution waterfall after capital events',
      'Flag warrant exercise windows approaching',
      'Monitor debt covenants and maturity schedules',
      'Update capital structure data files when changes detected',
    ],
    workflowIds: ['capital-dilution'],
    defaultIntervalMinutes: 720, // every 12 hours
    triggerEvents: ['filing-ingested', 'form-4-detected'],
    requiresData: false,
    category: 'research',
  },

  // ── MONITORING ENGINEERS ────────────────────────────────────────────────
  {
    id: 'filing-engineer',
    name: 'SEC Filing Engineer',
    role: 'Regulatory Filing Analyst',
    description: 'Watches EDGAR for new SEC filings (10-K, 10-Q, 8-K, Form 4, S-1). When a new filing appears, automatically fetches it, runs delta analysis against previous filings, and updates the database with extracted changes.',
    capabilities: [
      'Poll EDGAR API for new filings on covered tickers',
      'Download and parse new SEC filings automatically',
      'Run delta analysis comparing new vs. prior filings',
      'Extract key metrics, guidance changes, and risk factors',
      'Update database tables with new filing data',
      'Generate filing summary alerts',
    ],
    workflowIds: ['sec-filing-delta'],
    defaultIntervalMinutes: 60, // every hour
    triggerEvents: ['edgar-poll'],
    requiresData: true,
    dataSource: 'EDGAR API (SEC)',
    category: 'monitoring',
  },
  {
    id: 'press-engineer',
    name: 'Press Intelligence Engineer',
    role: 'Media & PR Analyst',
    description: 'Continuously monitors press releases and news sources. Classifies incoming articles, extracts competitor signals, and updates the intelligence database. Triggers downstream analysis when material news detected.',
    capabilities: [
      'Fetch latest press releases from news APIs',
      'Classify news by category and impact',
      'Extract competitor and partner signals',
      'Update press release archive automatically',
      'Trigger thesis review when material news detected',
      'Generate daily intelligence briefs',
    ],
    workflowIds: ['intelligence-classifier'],
    defaultIntervalMinutes: 30, // every 30 minutes
    triggerEvents: ['news-api-poll'],
    requiresData: true,
    dataSource: 'Press release APIs, RSS feeds',
    category: 'intelligence',
  },
  {
    id: 'insider-engineer',
    name: 'Insider Activity Engineer',
    role: 'Governance & Insider Analyst',
    description: 'Monitors Form 4 filings and institutional holdings changes (13F). Detects insider buying/selling patterns, flags unusual activity, and updates ownership tracking data.',
    capabilities: [
      'Poll EDGAR for Form 4 filings on covered tickers',
      'Track insider transaction patterns over time',
      'Monitor 13F filings for institutional position changes',
      'Flag unusual insider activity (cluster buying/selling)',
      'Update ownership data in the database',
    ],
    workflowIds: ['insider-activity', 'institutional-holdings'],
    defaultIntervalMinutes: 120, // every 2 hours
    triggerEvents: ['form-4-detected', '13f-filed'],
    requiresData: true,
    dataSource: 'EDGAR API (Form 4, 13F)',
    category: 'monitoring',
  },

  // ── INTELLIGENCE ENGINEERS ──────────────────────────────────────────────
  {
    id: 'catalyst-engineer',
    name: 'Catalyst Tracker Engineer',
    role: 'Event-Driven Analyst',
    description: 'Tracks upcoming catalysts and milestones. Monitors for catalyst completion or changes, updates timelines, and generates alerts when key dates approach or catalysts are confirmed/delayed.',
    capabilities: [
      'Track all upcoming catalysts across covered tickers',
      'Monitor news and filings for catalyst updates',
      'Flag approaching catalyst dates (T-7, T-3, T-1)',
      'Update catalyst status (active → completed/delayed)',
      'Recalculate impact assessments based on outcomes',
    ],
    workflowIds: ['weekly-digest'],
    defaultIntervalMinutes: 240, // every 4 hours
    triggerEvents: ['filing-ingested', 'press-release-added'],
    requiresData: false,
    category: 'intelligence',
  },
  {
    id: 'sentiment-engineer',
    name: 'Market Sentiment Engineer',
    role: 'Quantitative Sentiment Analyst',
    description: 'Aggregates market sentiment from analyst reports, social media signals, and price action. Maintains a running sentiment score and flags divergences between sentiment and fundamentals.',
    capabilities: [
      'Aggregate analyst price target changes',
      'Track sentiment trends across data sources',
      'Detect sentiment/fundamental divergences',
      'Generate sentiment shift alerts',
      'Update analyst coverage data',
    ],
    workflowIds: ['analyst-report'],
    defaultIntervalMinutes: 180, // every 3 hours
    triggerEvents: ['analyst-report-detected', 'price-alert'],
    requiresData: true,
    dataSource: 'Analyst reports, market data',
    category: 'intelligence',
  },

  // ── AUDIT ENGINEERS ─────────────────────────────────────────────────────
  {
    id: 'data-quality-engineer',
    name: 'Data Quality Engineer',
    role: 'Research Data QA',
    description: 'Continuously validates research database integrity. Checks for stale data, cross-reference mismatches, missing fields, and numerical inconsistencies. Runs audit workflows on a schedule and reports findings.',
    capabilities: [
      'Run data freshness checks across all tickers',
      'Validate cross-references between data files',
      'Check numerical consistency (e.g. shares outstanding matches capital table)',
      'Flag stale data that needs updating',
      'Generate data quality scorecards',
    ],
    workflowIds: ['capital-parity-audit', 'cross-ref-integrity', 'sources-completeness', 'data-freshness'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['data-updated', 'filing-ingested'],
    requiresData: false,
    category: 'audit',
  },
];

// Helper to get an engineer by ID
export function getEngineer(id: string): EngineerTask | undefined {
  return engineers.find(e => e.id === id);
}

// Helper to get engineers by category
export function getEngineersByCategory(category: EngineerTask['category']): EngineerTask[] {
  return engineers.filter(e => e.category === category);
}

// Helper to get engineers relevant to a specific ticker
export function getEngineersForTicker(_ticker: string): EngineerTask[] {
  // All engineers apply to all research tickers for now.
  // Future: filter by ticker-specific configuration.
  return engineers;
}
