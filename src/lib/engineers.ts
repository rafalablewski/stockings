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
  category: 'research' | 'monitoring' | 'audit' | 'intelligence' | 'documentation';
  chainsTo?: string;              // engineer ID to auto-trigger after successful completion
  notifyPm?: string;              // PM sender name to notify in the Room on completion
  decisionsFor?: string;          // PM id to create decision items for on completion
  decisionCategory?: string;      // PM decision category (default: 'prompt-patch')
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
    workflowIds: ['capital-structure'],
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
    workflowIds: ['sec-filing-delta', 'sec-filing-scan'],
    defaultIntervalMinutes: 60, // every hour
    triggerEvents: ['edgar-poll'],
    requiresData: true,
    dataSource: 'EDGAR API (SEC)',
    category: 'monitoring',
    chainsTo: 'db-ingestor-engineer',
  },
  {
    id: 'db-ingestor-engineer',
    name: 'SEC DB Ingestor',
    role: 'Filing-to-Database Ingestion Specialist',
    description: 'Receives SEC filing scanner output from the Filing Engineer, identifies up to 5 untracked filings, and generates structured database patch operations. Patches route to the PM Decision Dashboard for human approval before applying to data files.',
    capabilities: [
      'Parse filing scanner output for untracked filings',
      'Generate PatchOp-compatible database update operations',
      'Follow filing-templates.ts format for correct entry structure',
      'Verify data staleness against current date and existing DB entries',
      'Route patches through PM approval pipeline',
    ],
    workflowIds: ['sec-db-ingest'],
    defaultIntervalMinutes: 0, // triggered only via chain from filing-engineer
    triggerEvents: ['filing-scan-completed'],
    requiresData: false,
    category: 'monitoring',
    decisionsFor: 'claude',
    decisionCategory: 'data-patch',
    notifyPm: 'claude',
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
    workflowIds: ['intel-classifier'],
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
    workflowIds: ['analyst-report', 'social-sentiment'],
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
    workflowIds: ['capital-parity', 'crossref-integrity', 'sources-completeness', 'data-freshness'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['data-updated', 'filing-ingested'],
    requiresData: false,
    category: 'audit',
  },

  // ── ADDITIONAL RESEARCH ENGINEERS ─────────────────────────────────────
  {
    id: 'earnings-engineer',
    name: 'Earnings Engineer',
    role: 'Earnings & Financials Analyst',
    description: 'Processes earnings call transcripts, validates earnings data quality, and benchmarks against peer comparables. Extracts guidance changes, management tone, Q&A intelligence, and maps findings to the research database.',
    capabilities: [
      'Parse earnings call transcripts for guidance and tone',
      'Validate earnings data accuracy and GAAP consistency',
      'Benchmark financial metrics against peer comparables',
      'Flag quarter-over-quarter anomalies and trend breaks',
      'Update earnings database with extracted findings',
    ],
    workflowIds: ['earnings-call', 'earnings-quality', 'peer-comparables'],
    defaultIntervalMinutes: 720, // every 12 hours
    triggerEvents: ['earnings-released', 'filing-ingested'],
    requiresData: true,
    dataSource: 'Earnings call transcripts, SEC filings',
    category: 'research',
  },

  // ── ADDITIONAL INTELLIGENCE ENGINEERS ─────────────────────────────────
  {
    id: 'regulatory-engineer',
    name: 'Regulatory & IP Engineer',
    role: 'Regulatory & Patent Analyst',
    description: 'Monitors regulatory actions, patent filings, and conference disclosures. Extracts rulings, IP claims, strategy updates, and competitive implications. Adjusts catalyst timelines based on government decisions.',
    capabilities: [
      'Analyze patent applications and IP filings',
      'Track FCC, NTIA, and SEC regulatory actions',
      'Extract strategy updates from conference transcripts',
      'Identify competitive implications of new IP grants',
      'Update catalyst timelines from regulatory decisions',
    ],
    workflowIds: ['patent-ip', 'conference-notes', 'regulatory-tracker'],
    defaultIntervalMinutes: 360, // every 6 hours
    triggerEvents: ['filing-ingested', 'press-release-added', 'regulatory-action'],
    requiresData: true,
    dataSource: 'Patent databases, FCC/NTIA filings, conference transcripts',
    category: 'intelligence',
  },
  {
    id: 'ask-agent-engineer',
    name: 'General Intelligence Agent',
    role: 'Cross-Domain Research Assistant',
    description: 'General-purpose intelligence layer for ad hoc queries that fall outside structured agent workflows. Handles capital structure math, filing explanations, cross-tab lookups, and ambiguous content triage.',
    capabilities: [
      'Answer freeform research questions from the database',
      'Triage ambiguous content to the correct workflow',
      'Perform cross-tab lookups and data reconciliation',
      'Explain complex filings and capital structure math',
      'Fall back gracefully when structured agents don\'t fit',
    ],
    workflowIds: ['ask-agent'],
    defaultIntervalMinutes: 0, // on-demand only
    triggerEvents: ['user-query'],
    requiresData: true,
    dataSource: 'User input, research database',
    category: 'intelligence',
  },

  // ── BOBMAN'S TEAM ─────────────────────────────────────────────────────
  {
    id: 'prompt-auditor',
    name: 'Prompt Auditor',
    role: 'Prompt-to-Codebase Sync Analyst',
    description: 'Analyses every prompt in the workflow/prompt database and cross-references it against the live codebase to detect drift. When new features, tabs, data sources, API routes, or UI components are added but the corresponding AI engineer prompts are not updated, the Prompt Auditor flags the gap so engineers never operate on stale instructions. Reports to Bobman.',
    capabilities: [
      'Scan all workflow prompts and engineer prompt templates for referenced features',
      'Inventory live codebase tabs, pages, API routes, data sources, and components',
      'Diff prompt references against actual codebase to find missing or outdated entries',
      'Flag prompts that reference removed or renamed features',
      'Generate a prompt-drift report with specific remediation suggestions',
      'Detect newly added tabs or routes that no prompt currently covers',
    ],
    workflowIds: ['prompt-audit'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['code-deployed', 'workflow-updated', 'engineer-config-changed'],
    requiresData: false,
    category: 'audit',
    chainsTo: 'prompt-remediation-engineer',
    notifyPm: 'bobman',
  },
  {
    id: 'prompt-remediation-engineer',
    name: 'Prompt Remediation Engineer',
    role: 'Prompt Template Maintenance Specialist',
    description: 'Receives drift findings from the Prompt Auditor and generates structured remediation patches for workflow prompt templates. Focuses on CRITICAL and HIGH severity drift, producing safe text edits that keep prompts aligned with the live codebase. Reports to Maszka.',
    capabilities: [
      'Parse prompt-audit drift reports and extract actionable findings',
      'Generate anchor-based patch operations for workflow promptTemplates',
      'Prioritize CRITICAL and HIGH severity drift items',
      'Flag findings requiring human intervention (new workflows, structural changes)',
    ],
    workflowIds: ['prompt-remediation'],
    defaultIntervalMinutes: 0, // triggered only via chain, never scheduled
    triggerEvents: ['prompt-audit-completed'],
    requiresData: false,
    category: 'audit',
    decisionsFor: 'maszka',
  },

  // ── ADDITIONAL AUDIT ENGINEERS ────────────────────────────────────────
  {
    id: 'code-security-engineer',
    name: 'Code Security Engineer',
    role: 'Application Security Analyst',
    description: 'Runs comprehensive code audits covering security vulnerabilities, dependency supply chain risks, API endpoint security, and secrets exposure. Outputs CVSS-scored findings with CWE/OWASP mapping and prioritized remediation.',
    capabilities: [
      'Run 35-category institutional-grade code audits',
      'Scan dependencies for known CVEs and supply chain risks',
      'Audit API endpoints for auth, validation, and CORS issues',
      'Detect hardcoded secrets and credential exposure',
      'Generate risk-ranked remediation plans',
    ],
    workflowIds: ['code-audit', 'dependency-vulnerability', 'api-endpoint-security', 'secrets-exposure'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['code-deployed', 'dependency-updated'],
    requiresData: false,
    category: 'audit',
  },
  {
    id: 'performance-engineer',
    name: 'Performance Engineer',
    role: 'Platform Performance Analyst',
    description: 'Analyzes bundle size, component render efficiency, data-loading patterns, and caching strategy. Identifies client-side bottlenecks and outputs a weighted performance scorecard with optimization steps.',
    capabilities: [
      'Audit bundle size and tree-shaking effectiveness',
      'Profile component render paths for inefficiencies',
      'Evaluate data-fetching and caching strategies',
      'Identify client-side performance bottlenecks',
      'Generate weighted performance scorecards',
    ],
    workflowIds: ['performance-audit'],
    defaultIntervalMinutes: 2880, // every 2 days
    triggerEvents: ['code-deployed'],
    requiresData: false,
    category: 'audit',
  },
  {
    id: 'disclosure-engineer',
    name: 'Disclosure & Model Integrity Engineer',
    role: 'Research Integrity Analyst',
    description: 'Validates that SEC disclosures are fully captured in the database and that financial model inputs are consistent with source data. Checks calculation formulas, assumption coherence, and disclosure coverage.',
    capabilities: [
      'Map SEC filings to database coverage gaps',
      'Validate risk factor and guidance capture',
      'Cross-check model inputs against source data',
      'Test assumption consistency across model modules',
      'Flag model outputs that diverge from inputs',
    ],
    workflowIds: ['disclosure-completeness', 'model-consistency'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['filing-ingested', 'data-updated'],
    requiresData: false,
    category: 'audit',
  },

  // ── DOCUMENTATION ENGINEERS ──────────────────────────────────────────────
  {
    id: 'doc-reviewer-engineer',
    name: 'Documentation Engineer',
    role: 'Documentation & Style Guide Reviewer',
    description: 'Reviews recent code changes across all divisions and identifies documentation gaps. Creates styling guidelines reports, audits style guides and theme docs for accuracy, and maintains changelogs. Audit output goes straight to the UX/UI Engineer for implementation.',
    capabilities: [
      'Review code diffs and identify documentation gaps',
      'Create and update style guides and theme documentation',
      'Maintain changelogs and internal engineering logs',
      'Audit documentation freshness and flag stale content',
      'Generate styling guidelines reports for Maszka review',
      'Cross-reference docs against live codebase for accuracy',
    ],
    workflowIds: ['doc-review'],
    defaultIntervalMinutes: 1440, // daily
    triggerEvents: ['code-deployed', 'workflow-updated', 'data-updated'],
    requiresData: false,
    category: 'documentation',
    notifyPm: 'bobman',
    chainsTo: 'ux-ui-engineer',
  },

  // ── MASZKA'S TEAM ──────────────────────────────────────────────────────
  {
    id: 'ux-ui-engineer',
    name: 'UX/UI Engineer',
    role: 'UX/UI Implementation Specialist',
    description: 'Receives documentation and styling audit reports from the Doc Reviewer. Implements proposed changes or creates counter-proposals for theme, style, and UI guide updates. Reports to Maszka for final approval or rejection.',
    capabilities: [
      'Receive and parse doc-review audit reports',
      'Implement approved style guide and theme changes',
      'Propose alternative UX/UI approaches when audit suggestions need refinement',
      'Update component styling and design token documentation',
      'Submit implementation patches for Maszka approval via Decision Dashboard',
    ],
    workflowIds: ['ux-ui-implementation'],
    defaultIntervalMinutes: 0, // triggered only via chain from doc-reviewer
    triggerEvents: ['doc-review-completed'],
    requiresData: false,
    category: 'documentation',
    decisionsFor: 'maszka',
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
