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
  autoReviewBy?: string;          // PM id whose AI model auto-reviews decisions before chainsTo fires
  /** Plain-English summary of the full pipeline this engineer starts (shown in Operations tab). */
  pipelineDescription?: string;
  /** Plain-English "explain like I'm 10" description of what this individual engineer does (shown in PMs tab). */
  humanDescription?: string;
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
    chainsTo: 'data-quality-engineer',
    decisionsFor: 'claude',
    decisionCategory: 'thesis-review',
    pipelineDescription: 'Every 6 hours (or when new filings/press releases land), the Thesis Engineer pressure-tests our bull/bear/base investment thesis against the latest database. Its scorecard updates and conviction changes go to the Claude PM Decision Dashboard for human approval. Once approved, the Data Quality Engineer automatically runs to validate the data the thesis was built on — checking for stale numbers, cross-reference mismatches, and missing fields.',
    humanDescription: 'This engineer is like the person who constantly asks "do we still believe in this company?" It takes our investment thesis — the reasons we think a stock is a good bet — and checks it against the latest data. If a new filing contradicts our assumptions, or if good news strengthens them, it updates the confidence scores and flags anything that changed. It reads from our own research database, not the internet.',
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
    humanDescription: 'This engineer keeps track of how many shares a company has and how that number changes over time. When companies issue new shares, exercise warrants, or take on debt, it affects how much each share is worth. This engineer reads SEC filings from our database, recalculates the math, and flags big changes — like "they just diluted shareholders by 15%." Think of it as the accountant who tracks every slice of the company pie.',
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
    humanDescription: 'This engineer goes to the SEC\'s EDGAR website — the public filing system where every public company must post official documents — and checks if any of our tracked companies filed something new. It looks for financial reports (10-K, 10-Q), big announcements (8-K), insider trades (Form 4), and more. When it finds something, it downloads the document, compares it to what we already have, and pulls out the key changes. The results get passed down the pipeline for deeper analysis.',
    chainsTo: 'db-ingestor-engineer',
    decisionsFor: 'gemini',
    decisionCategory: 'sec-filing-review',
    notifyPm: 'gemini',
    autoReviewBy: 'gemini',
    pipelineDescription: 'Where do we look? The SEC\'s EDGAR website — that\'s where every public company is required to post official documents like financial reports (10-K, 10-Q), big announcements (8-K), and insider stock trades (Form 4). What happens? When you start this pipeline, it goes to EDGAR and checks if any of our tracked companies posted something new. If it finds a new filing, it downloads it, reads through it, and compares it to what we already have — pulling out the important numbers, changes in guidance, and risk factors. What\'s the result? The pipeline builds a database update with all the new information, scores how important each finding is, and sends it to a manager for approval. Nothing gets saved until a human says "yes, this looks right." Think of it like a research assistant who goes to the library, finds new reports about your companies, highlights the important parts, and asks you before filing anything away.',
  },
  {
    id: 'db-ingestor-engineer',
    name: 'SEC DB Ingestor',
    role: 'SEC Filing Analysis & Ingestion Specialist',
    description: 'The most comprehensive SEC filing analysis and ingestion agent. An intel-classifier derivative specialized for SEC filings — performs 7-phase deep analysis: materiality triage, exhaustive form-type extraction (8-K items, Form 4 exercise economics & insider patterns, 10-Q/10-K financial deltas, dilution math), cross-filing correlation, database conflict detection, structured patch generation with description quality enforcement, mandatory pre-write gate, and executive summary with thesis impact assessment. Patches route to PM Decision Dashboard for approval.',
    capabilities: [
      'Deep form-type-specific extraction (8-K, 10-Q, 10-K, Form 4, SC 13G, 424B5, S-3, DEF 14A)',
      'Materiality scoring (Critical/High/Medium/Low) with thesis impact assessment',
      'Cross-filing correlation: temporal clustering, insider pattern detection, capital structure chain tracking',
      'Database conflict detection: duplication, contradiction, stale data, partial incorporation',
      'Generate PatchOp-compatible database update operations with metadata counter updates',
      'Mandatory pre-write gate with per-filing and global checklists',
      'Route patches through PM approval pipeline',
    ],
    workflowIds: ['sec-db-ingest'],
    defaultIntervalMinutes: 0, // triggered only via chain from filing-engineer
    triggerEvents: ['filing-scan-completed'],
    requiresData: false,
    category: 'monitoring',
    humanDescription: 'This is the heavy lifter of the SEC pipeline. After the Filing Engineer finds a new document, this engineer does the deep read. It goes through the filing in 7 phases — deciding how important it is, extracting every relevant number and fact based on the form type, checking if it conflicts with what we already have in the database, and building a structured update. Nothing gets saved automatically — it packages everything into a neat "patch" and sends it to a manager who has to approve it first. Think of it as the analyst who reads the full 200-page report and writes a summary with specific database changes.',
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
    humanDescription: 'This engineer reads the news. It pulls press releases and articles from news APIs and RSS feeds, then sorts them — is this about our company? A competitor? A partner? How important is it? If something big comes in (like a major contract win or a lawsuit), it saves it to our intelligence database and can trigger other engineers to re-evaluate the thesis. Think of it as the person who reads every headline and highlights the ones that actually matter to our investments.',
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
    humanDescription: 'This engineer watches what company insiders — CEOs, board members, big investors — are doing with their own shares. It checks EDGAR for Form 4 filings (insider buys and sells) and 13F filings (what big funds are holding). If the CEO suddenly buys a lot of stock, or a major fund quietly sells its entire position, this engineer spots it and flags the pattern. It\'s like keeping an eye on what the people who know the company best are actually doing with their money.',
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
    humanDescription: 'This engineer keeps a calendar of important upcoming events — FDA decisions, earnings dates, contract deadlines, product launches. It reads our database and news to check if any of these events got confirmed, delayed, or completed. When a big date is approaching, it sends alerts. If something got pushed back, it updates the timeline. Think of it as the person with the whiteboard full of sticky notes who moves them around as plans change.',
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
    humanDescription: 'This engineer measures "the mood" around a stock. It reads analyst reports and price target changes and tracks whether the general feeling is getting more positive or negative. Most importantly, it looks for disagreements — if everyone is bullish but the actual financials are weak (or vice versa), it flags that gap. It gets its data from analyst reports and market data feeds. Think of it as the person who takes the room\'s temperature and says "everyone\'s excited, but the numbers don\'t support it."',
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
    humanDescription: 'This engineer is the quality inspector. It looks at our entire research database and checks: is anything out of date? Do the numbers in one table match the numbers in another? Are there empty fields that should be filled? It runs checks like "the shares outstanding in the capital table should match the latest 10-Q" and flags anything that doesn\'t add up. It only reads our own database — no external sources. Think of it as the librarian who checks every shelf to make sure no book is misplaced or missing pages.',
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
    humanDescription: 'This engineer listens to earnings calls — the quarterly phone calls where company management discusses financial results and answers analyst questions. It reads the transcript, pulls out guidance changes ("we expect revenue of $X next quarter"), picks up on management tone, and compares the numbers to previous quarters and peer companies. It gets its data from earnings transcripts and SEC filings. Think of it as the person who sits through every earnings call, takes detailed notes, and highlights what\'s different from last time.',
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
    humanDescription: 'This engineer tracks the legal and regulatory side of things — patent filings, government agency decisions (FCC, SEC, NTIA), and what companies say at industry conferences. If a company gets a new patent approved, or a regulator delays a key decision, this engineer catches it and updates the catalyst timeline. It pulls from patent databases, government filings, and conference transcripts. Think of it as the person who reads the government gazette and patent office bulletins so you don\'t have to.',
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
    humanDescription: 'This is the "ask me anything" engineer. When you have a question that doesn\'t fit neatly into one of the other engineers\' specialties — like "explain this filing in plain English" or "how does Company X\'s capital structure compare to Y?" — this is the one that handles it. It reads from our research database and your input, connects the dots across different data sources, and gives you a straight answer. Think of it as the generalist on the team who can pull from everyone else\'s work to answer your specific question.',
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
    humanDescription: 'This engineer reads every set of instructions our AI engineers follow and compares them to the actual app. If a developer added a new page or renamed a tab but nobody updated the AI\'s instructions, this engineer catches the mismatch and writes a report of everything that\'s out of sync. It reads from the prompt database and the live codebase — no external data needed. Think of it as the proofreader who checks if the recipe book still matches what\'s actually in the kitchen.',
    chainsTo: 'prompt-remediation-engineer',
    notifyPm: 'bobman',
    pipelineDescription: 'Where do we look? Two places — the prompt database (all the instructions our AI engineers follow) and the live codebase (the actual app with its tabs, pages, API routes, and components). What happens? The pipeline reads every AI prompt and compares it against what the app really has. If someone added a new page or renamed a feature but forgot to update the AI\'s instructions, it catches the mismatch. Then it writes specific text fixes for each outdated instruction. What\'s the result? A list of patches — small targeted edits to the prompt templates — that get sent to a manager for approval. No instructions change until a human signs off. Think of it like a teacher checking if the textbook still matches what\'s actually being taught in class, then writing correction slips for each outdated page.',
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
    humanDescription: 'This engineer is the fixer that works after the Prompt Auditor. Once the auditor finds mismatches between AI instructions and the actual codebase, this engineer writes the specific text edits to bring them back in sync. It focuses on the most critical problems first and packages each fix as a small, safe edit. The fixes go to a manager for approval — nothing changes automatically. Think of it as the copy editor who takes the proofreader\'s notes and writes the actual corrections.',
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
    humanDescription: 'This engineer is the security guard. It scans our entire codebase looking for vulnerabilities — things like exposed passwords, unsafe API endpoints, risky third-party packages, and common attack vectors (the OWASP top 10). It scores each finding by severity and maps it to known vulnerability categories. Everything it checks comes from our own code and dependency list — no external data needed. Think of it as the locksmith who tests every door and window in the building and reports which ones don\'t lock properly.',
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
    humanDescription: 'This engineer checks how fast the app runs. It looks at how big the code bundle is (what gets downloaded to your browser), how efficiently components render on screen, and whether data is being loaded and cached smartly. It reads from our codebase only — no external sources. It produces a scorecard that ranks each issue by impact so we fix the biggest slowdowns first. Think of it as the mechanic who puts the car on the dyno and tells you exactly where you\'re losing horsepower.',
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
    humanDescription: 'This engineer makes sure we haven\'t missed anything from SEC filings and that our financial models use the right numbers. It checks: did we capture all the risk factors from the latest 10-K? Do the inputs in our model actually match what the filing says? Are our assumptions consistent across different calculations? It reads from our database and SEC filing data — no external APIs. Think of it as the auditor who double-checks every number in the spreadsheet against the original source documents.',
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
    humanDescription: 'This engineer reads through recent code changes (git diffs) and checks if the documentation, style guides, and theme files still match what the code actually does. If someone built a new component but didn\'t document it, or the style guide says one thing but the code does another, it writes up a report of everything that needs fixing. It reads from the codebase and existing docs — no external data. Think of it as the editor who re-reads the whole manual after every update and marks up what\'s outdated.',
    notifyPm: 'bobman',
    chainsTo: 'ux-ui-engineer',
    pipelineDescription: 'Where do we look? The recent code changes (git diffs) across all divisions, plus the existing documentation, style guides, and theme files in the codebase. What happens? The pipeline reviews what changed in the code and checks if the docs still match. If someone built a new component but didn\'t document it, or if the style guide says "use blue buttons" but the code now uses green, it flags the gap. Then it hands those findings to a UI specialist who either implements the fixes or proposes an alternative. What\'s the result? Updated documentation, changelogs, and style guide corrections — but nothing changes until a manager reviews and approves. Think of it like an editor who re-reads the instruction manual after every product update and says "page 12 still shows the old button layout."',
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
    humanDescription: 'This engineer takes the documentation findings from the Doc Reviewer and actually implements the fixes — updating style guides, adjusting theme documentation, and fixing component styling docs. If it disagrees with a suggested change, it proposes an alternative approach instead. All changes go to a manager for final approval. It reads from doc-review reports and the codebase. Think of it as the designer who receives the editor\'s notes and either makes the changes or says "actually, here\'s a better way to handle this."',
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
