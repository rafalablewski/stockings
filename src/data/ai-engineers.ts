// ═══════════════════════════════════════════════════════════════════════════
// AI ENGINEERS — Agent/workflow graph data for the Palantir-style dashboard
// ═══════════════════════════════════════════════════════════════════════════

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'standby' | 'disabled';
  phase: string;                // e.g. "Pre + Post", "Post", "On-demand"
  matchers: string[];           // tool triggers or input types
  description: string;
  category: 'hook' | 'workflow' | 'pipeline';
  color: string;                // CSS color token name
  connections: string[];        // IDs of connected agents/resources
  files: string[];              // files this agent reads or modifies
  prompts: string[];            // prompt categories or templates used
  metrics: {
    runsPerDay?: number;
    avgLatencyMs?: number;
    lastRun?: string;
    findings?: number;
  };
}

export interface ResourceNode {
  id: string;
  name: string;
  type: 'file' | 'api' | 'database' | 'prompt' | 'config';
  path?: string;
  description: string;
  color: string;
  connectedAgents: string[];
}

export interface Connection {
  from: string;
  to: string;
  type: 'reads' | 'writes' | 'triggers' | 'uses-prompt' | 'feeds';
  label?: string;
}

// ── Agent nodes ─────────────────────────────────────────────────────────────

export const agents: AgentNode[] = [
  {
    id: 'code-review',
    name: 'Code Review',
    role: 'Quality Gate',
    status: 'disabled',
    phase: 'Pre + Post',
    matchers: ['Edit', 'Write', 'NotebookEdit'],
    description: 'Automated code review enforcing quality standards through pre/post edit hooks, lint checks, and configurable review rules.',
    category: 'hook',
    color: 'cyan',
    connections: ['code-simplifier', 'agent-impact', 'claude-md', 'prompt-review'],
    files: ['.claude/plugins/code-review/review-hook.sh', 'src/**/*.ts', 'src/**/*.tsx'],
    prompts: ['lint-check', 'type-check', 'security-scan', 'style-enforcement'],
    metrics: { runsPerDay: 0, avgLatencyMs: 1200, findings: 0 },
  },
  {
    id: 'claude-md',
    name: 'CLAUDE.md Mgmt',
    role: 'Config Guardian',
    status: 'disabled',
    phase: 'Post',
    matchers: ['Edit', 'Write'],
    description: 'Validates CLAUDE.md structure, enforces consistent formatting, and warns when project conventions change.',
    category: 'hook',
    color: 'violet',
    connections: ['code-review', 'agent-impact', 'config-claude-md'],
    files: ['.claude/plugins/claude-md-management/md-hook.sh', 'CLAUDE.md'],
    prompts: ['structure-validation', 'convention-drift-detection'],
    metrics: { runsPerDay: 0, avgLatencyMs: 800, findings: 0 },
  },
  {
    id: 'code-simplifier',
    name: 'Code Simplifier',
    role: 'Complexity Reducer',
    status: 'disabled',
    phase: 'Post',
    matchers: ['Edit', 'Write', 'NotebookEdit'],
    description: 'Detects overly complex code patterns — long functions, deep nesting, excessive parameters, and complex conditionals.',
    category: 'hook',
    color: 'mint',
    connections: ['code-review', 'prompt-simplify'],
    files: ['.claude/plugins/code-simplifier/simplifier-hook.sh', 'src/**/*.ts', 'src/**/*.tsx'],
    prompts: ['complexity-analysis', 'refactor-suggestions'],
    metrics: { runsPerDay: 0, avgLatencyMs: 950, findings: 0 },
  },
  {
    id: 'agent-impact',
    name: 'Agent Impact Detector',
    role: 'Blast Radius Analyzer',
    status: 'disabled',
    phase: 'Post',
    matchers: ['Edit', 'Write', 'NotebookEdit'],
    description: 'Warns when file edits impact AI agent behavior — detects changes to agent config, instructions, plugin hooks, prompt data, and MCP servers.',
    category: 'hook',
    color: 'coral',
    connections: ['code-review', 'claude-md', 'methodology-sync', 'config-settings'],
    files: ['.claude/plugins/agent-impact-detector/impact-hook.sh', '.claude/**/*', 'src/data/workflows.ts'],
    prompts: ['impact-assessment', 'config-change-detection'],
    metrics: { runsPerDay: 0, avgLatencyMs: 600, findings: 0 },
  },
  {
    id: 'methodology-sync',
    name: 'Methodology Sync',
    role: 'Pipeline Watcher',
    status: 'disabled',
    phase: 'Post',
    matchers: ['Edit', 'Write', 'NotebookEdit'],
    description: 'Detects when Sources or EDGAR pipeline code changes and reminds you to review the corresponding methodology section.',
    category: 'hook',
    color: 'sky',
    connections: ['agent-impact', 'earnings-call', 'code-audit', 'api-edgar', 'api-sources'],
    files: ['src/app/api/edgar/**/*', 'src/app/api/sources/**/*', 'src/data/**/*'],
    prompts: ['pipeline-drift-check', 'methodology-validation'],
    metrics: { runsPerDay: 0, avgLatencyMs: 500, findings: 0 },
  },
  {
    id: 'earnings-call',
    name: 'Earnings Call Analyzer',
    role: 'Transcript Intelligence',
    status: 'active',
    phase: 'On-demand',
    matchers: ['User-submitted transcript'],
    description: 'Analyzes earnings call transcripts. Extracts guidance changes, constellation updates, partner pipeline, management tone, Q&A intelligence, and capital structure implications.',
    category: 'workflow',
    color: 'gold',
    connections: ['methodology-sync', 'api-research', 'prompt-earnings'],
    files: ['src/data/workflows.ts', 'src/app/api/workflow/run/route.ts'],
    prompts: ['guidance-extraction', 'partner-pipeline', 'management-tone', 'qa-intelligence', 'capital-structure'],
    metrics: { runsPerDay: 2, avgLatencyMs: 45000, lastRun: '2026-03-12', findings: 18 },
  },
  {
    id: 'code-audit',
    name: 'Code Audit v1.0',
    role: '35-Category Security Auditor',
    status: 'active',
    phase: 'On-demand',
    matchers: ['Manual trigger'],
    description: 'Comprehensive 35-category code audit covering security, performance, accessibility, compliance, and architecture.',
    category: 'workflow',
    color: 'coral',
    connections: ['code-review', 'agent-impact', 'methodology-sync', 'prompt-audit'],
    files: ['src/data/workflows.ts', 'src/app/audit/comprehensive-code-audit/page.tsx', 'src/components/AuditDashboard.tsx'],
    prompts: ['hardcoded-secrets', 'db-api-security', 'typescript-best-practices', 'xss-csrf-injection', 'auth-authz', 'data-privacy', 'performance', 'error-handling', 'accessibility', 'owasp-top10'],
    metrics: { runsPerDay: 1, avgLatencyMs: 120000, lastRun: '2026-03-11', findings: 47 },
  },
  {
    id: 'prompt-auditor',
    name: 'Prompt Auditor',
    role: 'Prompt-to-Codebase Sync',
    status: 'active',
    phase: 'Daily',
    matchers: ['Scheduled', 'Code deploy', 'Workflow update'],
    description: 'Scans all workflow and engineer prompts against the live codebase to detect drift — new tabs, routes, or data sources not reflected in prompts, and stale references to removed features. Reports to Bobman.',
    category: 'workflow',
    color: 'violet',
    connections: ['methodology-sync', 'agent-impact', 'prompt-audit-resource', 'api-workflow'],
    files: ['src/data/workflows.ts', 'src/lib/engineers.ts', 'src/app/**/page.tsx', 'src/app/api/**/route.ts'],
    prompts: ['codebase-inventory', 'prompt-inventory', 'drift-detection', 'coverage-scoring'],
    metrics: { runsPerDay: 1, avgLatencyMs: 90000, findings: 0 },
  },
  {
    id: 'press-intel',
    name: 'Press Intelligence',
    role: 'News & Filing Monitor',
    status: 'active',
    phase: 'Continuous',
    matchers: ['RSS feeds', 'SEC EDGAR', 'Press releases'],
    description: 'Bloomberg-style unified press feed with real-time monitoring of news, SEC filings, and press releases across all portfolio tickers.',
    category: 'pipeline',
    color: 'mint',
    connections: ['methodology-sync', 'earnings-call', 'api-edgar', 'api-news', 'api-press'],
    files: ['src/app/press-intelligence/page.tsx', 'src/app/api/news/[symbol]/route.ts', 'src/app/api/press-releases/[symbol]/route.ts'],
    prompts: ['article-classification', 'sentiment-analysis', 'filing-extraction'],
    metrics: { runsPerDay: 48, avgLatencyMs: 3200, lastRun: '2026-03-13', findings: 12 },
  },
];

// ── Resource nodes ──────────────────────────────────────────────────────────

export const resources: ResourceNode[] = [
  { id: 'api-edgar', name: 'EDGAR API', type: 'api', path: '/api/edgar', description: 'SEC EDGAR filing retrieval and analysis', color: 'sky', connectedAgents: ['methodology-sync', 'press-intel'] },
  { id: 'api-sources', name: 'Sources API', type: 'api', path: '/api/sources/analyze', description: 'Multi-source analysis pipeline', color: 'sky', connectedAgents: ['methodology-sync'] },
  { id: 'api-research', name: 'Research API', type: 'api', path: '/api/research/init', description: 'Research initialization and data loading', color: 'cyan', connectedAgents: ['earnings-call'] },
  { id: 'api-news', name: 'News API', type: 'api', path: '/api/news/[symbol]', description: 'Real-time news feed per ticker', color: 'mint', connectedAgents: ['press-intel'] },
  { id: 'api-press', name: 'Press Releases API', type: 'api', path: '/api/press-releases/[symbol]', description: 'Corporate press release monitoring', color: 'mint', connectedAgents: ['press-intel'] },
  { id: 'api-workflow', name: 'Workflow Engine', type: 'api', path: '/api/workflow/run', description: 'Workflow execution and orchestration', color: 'gold', connectedAgents: ['earnings-call', 'code-audit'] },
  { id: 'config-claude-md', name: 'CLAUDE.md', type: 'config', path: '/CLAUDE.md', description: 'Project conventions and agent instructions', color: 'violet', connectedAgents: ['claude-md', 'agent-impact'] },
  { id: 'config-settings', name: 'Settings', type: 'config', path: '/.claude/settings.json', description: 'Agent hook activation and configuration', color: 'violet', connectedAgents: ['agent-impact'] },
  { id: 'db-neon', name: 'Neon PostgreSQL', type: 'database', description: 'Serverless PostgreSQL — articles, filings, analysis cache', color: 'cyan', connectedAgents: ['press-intel', 'earnings-call'] },
  { id: 'prompt-review', name: 'Review Prompts', type: 'prompt', description: 'Lint, type, security, and style enforcement rules', color: 'cyan', connectedAgents: ['code-review'] },
  { id: 'prompt-simplify', name: 'Simplify Prompts', type: 'prompt', description: 'Complexity analysis and refactoring suggestion templates', color: 'mint', connectedAgents: ['code-simplifier'] },
  { id: 'prompt-earnings', name: 'Earnings Prompts', type: 'prompt', description: '7-section extraction framework for earnings calls', color: 'gold', connectedAgents: ['earnings-call'] },
  { id: 'prompt-audit', name: 'Audit Prompts', type: 'prompt', description: '35-category CVSS-scored security audit templates', color: 'coral', connectedAgents: ['code-audit'] },
  { id: 'prompt-audit-resource', name: 'Prompt Database', type: 'prompt', description: 'All workflow and engineer prompts — scanned for drift by Prompt Auditor', color: 'violet', connectedAgents: ['prompt-auditor'] },
];

// ── Connections ──────────────────────────────────────────────────────────────

export const connections: Connection[] = [
  // Hook chain
  { from: 'code-review', to: 'code-simplifier', type: 'triggers', label: 'post-edit' },
  { from: 'code-review', to: 'agent-impact', type: 'triggers', label: 'config change' },
  { from: 'agent-impact', to: 'claude-md', type: 'reads', label: 'convention check' },
  { from: 'agent-impact', to: 'methodology-sync', type: 'triggers', label: 'pipeline change' },

  // Workflow dependencies
  { from: 'earnings-call', to: 'api-workflow', type: 'uses-prompt' },
  { from: 'code-audit', to: 'api-workflow', type: 'uses-prompt' },
  { from: 'methodology-sync', to: 'api-edgar', type: 'reads' },
  { from: 'methodology-sync', to: 'api-sources', type: 'reads' },
  { from: 'press-intel', to: 'api-news', type: 'reads' },
  { from: 'press-intel', to: 'api-press', type: 'reads' },
  { from: 'press-intel', to: 'api-edgar', type: 'reads' },

  // Prompt usage
  { from: 'code-review', to: 'prompt-review', type: 'uses-prompt' },
  { from: 'code-simplifier', to: 'prompt-simplify', type: 'uses-prompt' },
  { from: 'earnings-call', to: 'prompt-earnings', type: 'uses-prompt' },
  { from: 'code-audit', to: 'prompt-audit', type: 'uses-prompt' },

  // Database
  { from: 'press-intel', to: 'db-neon', type: 'writes', label: 'articles, filings' },
  { from: 'earnings-call', to: 'db-neon', type: 'writes', label: 'analysis cache' },

  // Config
  { from: 'claude-md', to: 'config-claude-md', type: 'reads' },
  { from: 'agent-impact', to: 'config-settings', type: 'reads' },

  // Prompt Auditor
  { from: 'prompt-auditor', to: 'prompt-audit-resource', type: 'reads', label: 'scan all prompts' },
  { from: 'prompt-auditor', to: 'api-workflow', type: 'uses-prompt' },

  // Cross-feeds
  { from: 'press-intel', to: 'earnings-call', type: 'feeds', label: 'transcript links' },
  { from: 'methodology-sync', to: 'code-audit', type: 'feeds', label: 'drift alerts' },
];

// ── Stat summaries ──────────────────────────────────────────────────────────

export const dashboardStats = {
  totalAgents: agents.length,
  activeAgents: agents.filter(a => a.status === 'active').length,
  disabledAgents: agents.filter(a => a.status === 'disabled').length,
  totalConnections: connections.length,
  totalResources: resources.length,
  totalPrompts: agents.reduce((sum, a) => sum + a.prompts.length, 0),
  categories: {
    hooks: agents.filter(a => a.category === 'hook').length,
    workflows: agents.filter(a => a.category === 'workflow').length,
    pipelines: agents.filter(a => a.category === 'pipeline').length,
  },
};
