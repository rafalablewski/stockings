/**
 * Institutional-Grade Code Audit Findings Registry
 *
 * Structured vulnerability and risk data extracted from the comprehensive
 * 35-category code audit performed 2026-02-22.
 *
 * Taxonomy follows OWASP, CWE, and CVSS v3.1 scoring conventions.
 * Each finding includes severity, CVSS score, affected assets,
 * remediation guidance with estimated effort, and compliance mapping.
 */

// ── Severity Taxonomy ────────────────────────────────────────────────────────

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type RemediationEffort = 'Immediate' | 'Short-term' | 'Medium-term' | 'Long-term';

export type FindingStatus = 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk';

export type ComplianceFramework =
  | 'OWASP-A01' | 'OWASP-A02' | 'OWASP-A03' | 'OWASP-A04' | 'OWASP-A05'
  | 'OWASP-A06' | 'OWASP-A07' | 'OWASP-A08' | 'OWASP-A09' | 'OWASP-A10'
  | 'GDPR' | 'CCPA' | 'SOC2' | 'WCAG-2.1-AA' | 'PCI-DSS' | 'ISO-27001';

// ── Finding Shape ────────────────────────────────────────────────────────────

export interface AuditFinding {
  /** Unique finding identifier (e.g., "SEC-001") */
  id: string;
  /** Human-readable title */
  title: string;
  /** Audit category (1–35) */
  category: string;
  /** Detailed description of the vulnerability or risk */
  description: string;
  /** Severity level */
  severity: Severity;
  /** CVSS v3.1 base score (0.0–10.0) */
  cvss: number;
  /** CWE identifier where applicable */
  cwe?: string;
  /** Affected file paths and line numbers */
  affectedAssets: string[];
  /** Potential business/technical impact */
  impact: string;
  /** Step-by-step remediation guidance */
  remediation: string;
  /** Estimated remediation effort */
  effort: RemediationEffort;
  /** Applicable compliance frameworks */
  compliance: ComplianceFramework[];
  /** Current status */
  status: FindingStatus;
}

// ── Audit Metadata ───────────────────────────────────────────────────────────

export const AUDIT_METADATA = {
  date: '2026-02-22',
  scope: 'Full codebase — 108 files',
  stack: 'Next.js 16 / TypeScript 5.9 / Neon PostgreSQL / Drizzle ORM',
  methodology: 'Automated static analysis + manual code review across 35 categories',
  auditor: 'Claude Deep-Analysis Engine',
  version: '1.0.0',
} as const;

// ── Findings ─────────────────────────────────────────────────────────────────

export const AUDIT_FINDINGS: AuditFinding[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CRITICAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'SEC-001',
    title: 'No Authentication on Any API Endpoint',
    category: '5. Authentication & Authorization',
    description:
      'The application has zero authentication or authorization on all 15 API endpoints. Destructive endpoints including /api/db/setup (wipes entire database), /api/workflow/commit (executes git commits on the server), and /api/analysis-cache (arbitrary DB writes) are publicly accessible to any HTTP client. No session management, user accounts, API keys, or role-based access control exist anywhere in the codebase.',
    severity: 'CRITICAL',
    cvss: 9.8,
    cwe: 'CWE-306',
    affectedAssets: [
      'src/app/api/db/setup/route.ts',
      'src/app/api/workflow/commit/route.ts',
      'src/app/api/workflow/run/route.ts',
      'src/app/api/workflow/apply/route.ts',
      'src/app/api/analysis-cache/route.ts',
      'src/app/api/seen-articles/route.ts',
      'src/app/api/seen-filings/route.ts',
      'src/app/api/edgar/analyze/route.ts',
      'src/app/api/sources/analyze/route.ts',
    ],
    impact:
      'Complete system compromise. An attacker can: (1) wipe the entire production database, (2) execute git commits on the deployment server, (3) consume unlimited Anthropic API credits, (4) inject arbitrary data into the analysis cache, (5) exfiltrate all stored research data.',
    remediation:
      'IMMEDIATE: Add middleware-based authentication (src/middleware.ts) protecting all /api/* routes. Minimum viable: require a Bearer token from an ADMIN_API_KEY environment variable on all write endpoints. Recommended: integrate NextAuth.js or Clerk for session-based auth with role separation (admin vs. viewer). Add CSRF protection on all state-changing endpoints.',
    effort: 'Immediate',
    compliance: ['OWASP-A01', 'OWASP-A07', 'SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'SEC-002',
    title: 'Unauthenticated Database Wipe Endpoint',
    category: '4. Security Vulnerabilities',
    description:
      'POST /api/db/setup unconditionally deletes ALL rows from 5 core database tables (sec_filings, filing_cross_refs, timeline_events, catalysts, partner_news) and re-seeds from static data. There is no authentication, no confirmation, no backup-before-wipe, and no rate limiting. The /db-setup page provides a one-click UI trigger with no confirmation dialog. This endpoint is the single highest-risk attack surface in the application.',
    severity: 'CRITICAL',
    cvss: 9.1,
    cwe: 'CWE-306',
    affectedAssets: [
      'src/app/api/db/setup/route.ts:169-285',
      'src/app/db-setup/page.tsx',
    ],
    impact:
      'Total data loss of all accumulated analysis cache, seen articles/filings state, and research data. Recovery requires Neon PITR (if configured) or manual re-seeding, losing all user-generated annotations and analysis history.',
    remediation:
      'IMMEDIATE: (1) Add admin-only authentication to the POST handler. (2) Add a confirmation token requirement (e.g., body must include { confirm: "DELETE_ALL_DATA" }). (3) Add backup-before-wipe logic — export current data to a timestamped backup table or JSON before deletion. (4) Wrap the entire seed in a database transaction. (5) Add a confirmation dialog to the /db-setup page UI.',
    effort: 'Immediate',
    compliance: ['OWASP-A01', 'OWASP-A05', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'QA-001',
    title: 'Zero Test Coverage Across Entire Codebase',
    category: '11. Testing Coverage',
    description:
      'The project contains zero automated tests — no unit tests, no integration tests, no end-to-end tests. No test runner (Jest, Vitest, Playwright, Cypress) is installed or configured. The only validation is a manually-triggered Zod schema check (npm run validate) that covers only competitor news data and is not integrated into the build pipeline. This means every code change carries unmitigated regression risk.',
    severity: 'CRITICAL',
    cvss: 8.0,
    cwe: 'CWE-1164',
    affectedAssets: ['Entire codebase — 108 files, 0 test files'],
    impact:
      'Any code change can introduce undetected regressions. Financial calculation errors could silently corrupt displayed data. API contract changes break clients with no safety net. Refactoring is extremely risky.',
    remediation:
      'SHORT-TERM: (1) Install Vitest and configure with TypeScript support. (2) Write unit tests for highest-risk logic: stem(), localMatch(), extractKeywords(), financial calculation utilities (safeDivide, clamp, safeNumber). (3) Write integration tests for critical API routes: /api/analysis-cache, /api/check-analyzed, /api/seen-articles. (4) Integrate "npm run validate" into the build script. MEDIUM-TERM: Add Playwright for E2E testing of stock page loading and EDGAR tab interactions.',
    effort: 'Short-term',
    compliance: ['SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'OWASP-001',
    title: 'OWASP A01 — Broken Access Control (System-Wide)',
    category: '34. Compliance with Industry Standards',
    description:
      'Per OWASP Top 10 2021 A01:2021, the application fails all access control requirements. Every API endpoint is publicly accessible. There is no enforcement of least privilege, no deny-by-default policy, no access control on API routes, and no mechanism to distinguish between authenticated and unauthenticated requests. This is the single most impactful category in the OWASP Top 10.',
    severity: 'CRITICAL',
    cvss: 9.8,
    cwe: 'CWE-284',
    affectedAssets: ['All 15 API route handlers', 'src/middleware.ts (missing)'],
    impact:
      'An attacker with network access can perform any action in the system — read all data, modify all data, delete all data, execute server-side operations, and consume paid API resources.',
    remediation:
      'Implement a defense-in-depth access control strategy: (1) Add Next.js middleware (src/middleware.ts) that validates authentication on every /api/* request. (2) Implement role-based access: read-only for anonymous, write for authenticated, admin for destructive operations. (3) Log all access control failures. (4) Conduct penetration testing after implementation.',
    effort: 'Immediate',
    compliance: ['OWASP-A01', 'OWASP-A07', 'SOC2', 'ISO-27001', 'PCI-DSS'],
    status: 'Open',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HIGH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'SEC-003',
    title: 'Unauthenticated Git Commit Execution',
    category: '4. Security Vulnerabilities',
    description:
      'POST /api/workflow/commit executes execFileSync("git", ["commit", ...]) on the server, allowing any HTTP client to create git commits in the production deployment working directory. While execFileSync prevents shell injection and the SAFE_PATH_PATTERN restricts staged files, the endpoint itself has no authentication. An attacker could stage and commit arbitrary changes to data files matching the pattern.',
    severity: 'HIGH',
    cvss: 8.1,
    cwe: 'CWE-78',
    affectedAssets: ['src/app/api/workflow/commit/route.ts'],
    impact:
      'Server-side code integrity compromised. Attacker can modify data files within src/data/[ticker]/*.ts, potentially injecting malicious data that gets displayed to users or altering financial analysis data.',
    remediation:
      'Add admin-only authentication to this endpoint. Require both a valid session and an explicit "commit" permission. Consider moving git operations to a separate, more restricted process.',
    effort: 'Immediate',
    compliance: ['OWASP-A01', 'OWASP-A08'],
    status: 'Open',
  },
  {
    id: 'SEC-004',
    title: 'Server-Side Request Forgery (SSRF) via Analyze Endpoints',
    category: '19. Input Validation',
    description:
      'Both POST /api/edgar/analyze and POST /api/sources/analyze accept a user-supplied "url" field in the request body and fetch it server-side using fetch(url). No URL validation, allowlisting, or network-level restriction is applied. An attacker can supply internal network addresses (e.g., http://169.254.169.254/latest/meta-data/ for AWS instance metadata, http://localhost:5432 for internal services) to probe the cloud infrastructure.',
    severity: 'HIGH',
    cvss: 7.5,
    cwe: 'CWE-918',
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:24',
      'src/app/api/sources/analyze/route.ts:24',
    ],
    impact:
      'Cloud metadata exfiltration (AWS/GCP/Azure credentials), internal service discovery, potential lateral movement within the cloud VPC. On Vercel, the blast radius is limited but not zero.',
    remediation:
      'Implement URL allowlisting: only permit fetching from known domains (sec.gov, *.sec.gov, prnewswire.com, businesswire.com, globenewswire.com, etc.). Reject any URL with private/reserved IP ranges (10.x, 172.16-31.x, 192.168.x, 169.254.x, localhost, 127.0.0.1). Validate URL scheme is https only.',
    effort: 'Short-term',
    compliance: ['OWASP-A10', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'CICD-001',
    title: 'No CI/CD Pipeline or Automated Quality Gates',
    category: '22. Build & Deployment Processes',
    description:
      'No continuous integration or continuous deployment pipeline exists. No GitHub Actions, no Vercel deployment configuration with build checks, no automated linting, no type-checking, no data validation in the build process. The npm run validate script (Zod schema checks) is not wired into npm run build. Code is deployed with zero automated quality assurance.',
    severity: 'HIGH',
    cvss: 7.0,
    affectedAssets: [
      '.github/workflows/ (missing)',
      'package.json:6-13',
    ],
    impact:
      'Broken code can be deployed to production undetected. Type errors, lint violations, and invalid data can ship without any automated check. No audit trail of build/deploy events.',
    remediation:
      'Create .github/workflows/ci.yml with: (1) npm ci, (2) npm run lint, (3) npx tsc --noEmit, (4) npm run validate, (5) npm run build. Configure Vercel to require passing CI checks before deployment. Add npm run validate to the build script: "build": "npm run validate && next build".',
    effort: 'Short-term',
    compliance: ['SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'DATA-001',
    title: 'No Database Backup or Recovery Strategy',
    category: '27. Backup & Recovery Mechanisms',
    description:
      'No backup strategy exists for the Neon PostgreSQL database. The /api/db/setup endpoint can wipe all data with a single POST. There is no backup-before-wipe logic, no soft-delete mechanism, no data export functionality, and no documented recovery procedure. The seed operation is not wrapped in a transaction, so a crash mid-seed leaves the database in a partially populated state.',
    severity: 'HIGH',
    cvss: 7.5,
    affectedAssets: [
      'src/app/api/db/setup/route.ts',
      'Neon PostgreSQL instance',
    ],
    impact:
      'Irrecoverable data loss. All accumulated analysis cache, seen articles/filings state, and user-generated annotations would be lost. Recovery time is undefined.',
    remediation:
      '(1) Enable Neon Point-in-Time Recovery (PITR). (2) Add a pre-wipe backup step that exports current data to a backup table with timestamp. (3) Wrap seed operations in a database transaction. (4) Add a data export API endpoint. (5) Document the recovery procedure.',
    effort: 'Short-term',
    compliance: ['SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'MAINT-001',
    title: 'Monolithic 2000+ Line Stock Components',
    category: '9. Code Maintainability',
    description:
      'ASTS.tsx, BMNR.tsx, and CRCL.tsx are each 2000+ line monolithic client components containing inline styles, hardcoded financial data, complex business logic, and all tab content in a single file. Each file disables eslint-disable @typescript-eslint/no-explicit-any for the entire file. These components violate Single Responsibility Principle and are virtually untestable.',
    severity: 'HIGH',
    cvss: 6.0,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
    ],
    impact:
      'Extreme maintenance burden. Any change risks cascading regressions. Code review is impractical on 2000+ line components. New developer onboarding is severely hampered. Performance suffers from monolithic client-side bundle.',
    remediation:
      'Decompose each stock component into tab-level sub-components: InvestmentTab, EdgarTab, SourcesTab, WallStreetTab, AIAgentsTab. Extract shared financial calculation logic to utility modules. Remove file-wide eslint-disable directives and fix underlying type issues.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DUP-001',
    title: 'Duplicated Seed Logic Across CLI Script and API Route',
    category: '30. Code Duplication',
    description:
      'The entire database seeding logic is implemented twice: once in scripts/seed-database.ts (CLI) and once in src/app/api/db/setup/route.ts (API). Both files import the same data, call the same mapper functions, and execute the same delete-then-insert sequence. Additionally, the API route contains 127 lines of raw SQL DDL that duplicates the Drizzle schema defined in src/lib/schema.ts.',
    severity: 'HIGH',
    cvss: 5.5,
    affectedAssets: [
      'scripts/seed-database.ts',
      'src/app/api/db/setup/route.ts',
      'src/lib/schema.ts',
    ],
    impact:
      'Schema drift between the raw SQL DDL and Drizzle schema definitions. Changes to one are not automatically reflected in the other. Bug fixes must be applied in two places. The raw SQL splitting approach (split on ";") is fragile and will break on semicolons in string literals.',
    remediation:
      'Extract a shared seedAll(db) function into src/lib/seed.ts. Both the CLI script and API route should call this single function. Replace raw SQL DDL with Drizzle migrations (drizzle-kit generate + drizzle-kit migrate). Delete the CREATE_TABLES_SQL constant entirely.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'NET-001',
    title: 'Missing Security Headers',
    category: '18. Network Security',
    description:
      'next.config.ts defines no custom HTTP headers. The application is missing all standard security headers: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security, Referrer-Policy, and Permissions-Policy. This leaves the application vulnerable to clickjacking, MIME-type sniffing, and reduces defense-in-depth.',
    severity: 'MEDIUM',
    cvss: 5.3,
    cwe: 'CWE-693',
    affectedAssets: ['next.config.ts'],
    impact:
      'Clickjacking attacks possible (no X-Frame-Options). MIME sniffing attacks in older browsers (no X-Content-Type-Options). Reduced transport security (no HSTS). Referrer leakage to third-party domains.',
    remediation:
      'Add security headers in next.config.ts via the headers() async function: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin, Strict-Transport-Security: max-age=63072000; includeSubDomains, Permissions-Policy: camera=(), microphone=(), geolocation=(). Add a Content-Security-Policy in report-only mode first.',
    effort: 'Short-term',
    compliance: ['OWASP-A05', 'SOC2', 'PCI-DSS'],
    status: 'Open',
  },
  {
    id: 'NET-002',
    title: 'No Rate Limiting on Any Endpoint',
    category: '18. Network Security',
    description:
      'No rate limiting middleware exists. All 15 API endpoints can be called at unlimited frequency. The AI-powered endpoints (/api/edgar/analyze, /api/sources/analyze, /api/workflow/run, /api/check-analyzed) forward requests to the paid Anthropic API with no throttling.',
    severity: 'MEDIUM',
    cvss: 5.9,
    cwe: 'CWE-770',
    affectedAssets: ['src/middleware.ts (missing)', 'All API routes'],
    impact:
      'Denial of service via request flooding. Unlimited Anthropic API credit consumption. Database overload from unbounded write operations.',
    remediation:
      'Add rate limiting middleware using @upstash/ratelimit with Vercel KV, or implement a simple in-memory sliding window limiter. Apply tiered limits: 100 req/min for reads, 20 req/min for writes, 5 req/min for AI-powered endpoints.',
    effort: 'Short-term',
    compliance: ['OWASP-A04', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'SEC-005',
    title: 'Anthropic API Key Exposure Risk via Inconsistent Access Pattern',
    category: '4. Security Vulnerabilities',
    description:
      'ANTHROPIC_API_KEY is accessed two different ways across the codebase: via bracket notation (process.env as Record<string, string>)["ANTHROPIC_API_KEY"] in edgar/analyze and workflow/run (correct — prevents Next.js build-time inlining), and via direct access process.env.ANTHROPIC_API_KEY in sources/analyze (risky — Next.js may inline this into client bundles during build).',
    severity: 'MEDIUM',
    cvss: 6.5,
    cwe: 'CWE-200',
    affectedAssets: [
      'src/app/api/sources/analyze/route.ts:12',
      'src/app/api/edgar/analyze/route.ts:12',
      'src/app/api/workflow/run/route.ts:6',
      'src/app/api/check-analyzed/route.ts:193',
    ],
    impact:
      'If the API key is inlined into a client bundle, it becomes publicly visible in browser DevTools, allowing anyone to make API calls billed to the application owner.',
    remediation:
      'Standardize all env var access to bracket notation: (process.env as Record<string, string | undefined>)["ANTHROPIC_API_KEY"]. Alternatively, configure serverRuntimeConfig in next.config.ts to ensure these variables are never bundled client-side.',
    effort: 'Immediate',
    compliance: ['OWASP-A02', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'PERF-001',
    title: 'Uncached Multi-Table Query on Every Check-Analyzed Request',
    category: '7. Performance Bottlenecks',
    description:
      'getAnalysisData() in /api/check-analyzed queries 4 database tables (timeline_events, sec_filings, catalysts, partner_news) in parallel via Promise.all on every POST request. There is no caching layer. For tickers with hundreds of database entries, this generates 4 concurrent HTTP round-trips to Neon on every request.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:128-188'],
    impact:
      'Elevated latency (200-800ms per request depending on data volume). Unnecessary database load. Poor user experience when checking article analysis status.',
    remediation:
      'Add an in-memory cache (Map with TTL) or Vercel KV cache for getAnalysisData() results. A 60-second TTL is sufficient since research data changes infrequently. Consider denormalizing frequently-queried data into a single analysis_summary table.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'A11Y-001',
    title: 'WCAG 2.1 AA Contrast Ratio Failures',
    category: '14. Accessibility Compliance',
    description:
      'The application uses extremely low-opacity text throughout the UI: text-white/25 (contrast ~1.5:1), text-white/20 (~1.3:1), text-white/15 (~1.2:1). WCAG 2.1 AA requires minimum 4.5:1 for normal text and 3:1 for large text. Nearly all secondary text in the application fails these requirements. The homepage section headers (text-white/25) and body text (text-white/40, ~2.5:1) are both non-compliant.',
    severity: 'MEDIUM',
    cvss: 4.0,
    cwe: 'CWE-1263',
    affectedAssets: [
      'src/app/page.tsx',
      'src/app/stocks/page.tsx',
      'src/app/layout.tsx',
      'src/components/PromptCard.tsx',
    ],
    impact:
      'Users with low vision, color blindness, or those using screens in bright environments cannot read the interface. Potential legal liability under ADA and EU accessibility directives.',
    remediation:
      'Audit all text-white/* opacity values. Minimum recommendations: section headers text-white/60 (large text, 3:1 threshold), body text text-white/70 (normal text, 4.5:1 threshold), interactive elements text-white/80. Use a contrast checker tool to verify against #000000 background.',
    effort: 'Short-term',
    compliance: ['WCAG-2.1-AA'],
    status: 'Open',
  },
  {
    id: 'A11Y-002',
    title: 'Non-Keyboard-Accessible Interactive Elements',
    category: '14. Accessibility Compliance',
    description:
      'PromptCard uses a clickable <div onClick> as the primary interactive element with no tabIndex, no role="button", and no onKeyDown handler. Screen readers cannot discover or activate this element. Variant selectors use <span role="button"> but lack tabIndex={0} and keyboard event handlers. The LivePrice refresh button SVG has no aria-label.',
    severity: 'MEDIUM',
    cvss: 4.0,
    cwe: 'CWE-1263',
    affectedAssets: [
      'src/components/PromptCard.tsx:27-29',
      'src/components/PromptCard.tsx:48-55',
      'src/components/shared/LivePrice.tsx:118-136',
    ],
    impact:
      'Keyboard-only users and screen reader users cannot interact with prompt cards or variant selectors. This affects an estimated 8-15% of users who rely on assistive technology.',
    remediation:
      'Replace clickable <div> with <button> elements or add role="button", tabIndex={0}, and onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}. Add aria-label="Refresh price" to the LivePrice button. Implement ARIA tablist/tab/tabpanel roles for stock page tab navigation.',
    effort: 'Short-term',
    compliance: ['WCAG-2.1-AA'],
    status: 'Open',
  },
  {
    id: 'MON-001',
    title: 'No Error Monitoring, APM, or Alerting',
    category: '28. Monitoring & Analytics',
    description:
      'The application has no monitoring infrastructure. No Sentry (error tracking), no Datadog/New Relic (APM), no Vercel Analytics, no custom alerting. The only logging mechanism is console.error which produces ephemeral, unstructured logs in Vercel with no correlation IDs, no severity levels, and no alerting integration.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['All API routes', 'All client components'],
    impact:
      'Production errors go undetected. There is no way to know if APIs are failing, if database connections are dropping, or if AI analysis quality has degraded. No performance baseline exists for regression detection.',
    remediation:
      'Install @sentry/nextjs for error tracking with source maps. Add Vercel Analytics or Vercel Speed Insights for performance monitoring. Implement structured logging with Pino (server-side) including correlation IDs. Set up alerting rules for error rate > 1% and P95 latency > 2s.',
    effort: 'Short-term',
    compliance: ['SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'INP-001',
    title: 'Unbounded Text Storage in Analysis Cache',
    category: '19. Input Validation',
    description:
      'POST /api/analysis-cache stores the "text" field from the request body directly in the database with no length validation. The analysisText column is defined as TEXT (unlimited length in PostgreSQL). An attacker can store arbitrarily large strings, consuming database storage and potentially causing out-of-memory errors during query.',
    severity: 'MEDIUM',
    cvss: 5.3,
    cwe: 'CWE-770',
    affectedAssets: ['src/app/api/analysis-cache/route.ts:57-99'],
    impact:
      'Database storage exhaustion. Potential denial of service via large-payload writes. Neon charges based on storage usage.',
    remediation:
      'Add input length validation: reject text fields exceeding 100KB (generous limit for analysis summaries). Add request body size limits via Next.js config. Consider adding a TOAST compression strategy at the PostgreSQL level.',
    effort: 'Short-term',
    compliance: ['OWASP-A03'],
    status: 'Open',
  },
  {
    id: 'INP-002',
    title: 'Unvalidated Prompt Injection via Workflow Run',
    category: '19. Input Validation',
    description:
      'POST /api/workflow/run accepts arbitrary "prompt" and "data" fields from the request body and forwards them directly to the Anthropic API with no length limits, no content filtering, and no cost controls. An attacker can craft prompts that consume maximum tokens (16384 output) or abuse the AI for unintended purposes.',
    severity: 'MEDIUM',
    cvss: 5.9,
    cwe: 'CWE-20',
    affectedAssets: ['src/app/api/workflow/run/route.ts:16-47'],
    impact:
      'Unlimited Anthropic API credit consumption. Potential prompt injection to extract system-level information. Abuse of AI capabilities for purposes unrelated to stock analysis.',
    remediation:
      'Add authentication (blocks unauthorized use). Add prompt length limits (e.g., 50,000 characters). Add per-user/per-IP rate limiting for AI endpoints. Consider a per-day spending cap with tracking.',
    effort: 'Short-term',
    compliance: ['OWASP-A03', 'OWASP-A04'],
    status: 'Open',
  },
  {
    id: 'PRIV-001',
    title: 'GDPR Risk: Google Fonts Loaded from External CDN',
    category: '6. Data Privacy Compliance',
    description:
      'globals.css imports Google Fonts from fonts.googleapis.com, which transmits user IP addresses to Google servers on every page load. German courts (LG München, Case 3 O 17493/20) have ruled this constitutes unlawful personal data transfer under GDPR Article 6. No cookie consent banner or privacy policy exists.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['src/app/globals.css:1'],
    impact:
      'GDPR non-compliance. Potential fines up to 4% of annual global turnover. Legal liability in EU jurisdictions. User trust erosion.',
    remediation:
      'Replace the Google Fonts @import with next/font (built into Next.js), which self-hosts fonts automatically. Remove the external CSS import from globals.css. This is a one-line change with significant compliance benefit.',
    effort: 'Short-term',
    compliance: ['GDPR'],
    status: 'Open',
  },
  {
    id: 'ERR-001',
    title: 'Internal Error Details Leaked in API Responses',
    category: '8. Error Handling & Logging',
    description:
      'Multiple API routes expose internal error details to clients. seen-articles returns { _ensureTableError: String(error) } with HTTP 200. seen-articles and seen-filings return { detail: String(error) } in 500 responses, which can include stack traces, database connection strings, and internal file paths.',
    severity: 'MEDIUM',
    cvss: 5.3,
    cwe: 'CWE-209',
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:90',
      'src/app/api/seen-articles/route.ts:136',
      'src/app/api/seen-filings/route.ts:100',
      'src/app/api/seen-filings/route.ts:147',
    ],
    impact:
      'Information disclosure: attackers gain knowledge of internal architecture, database structure, and technology stack. Stack traces may reveal file paths and library versions useful for targeted exploitation.',
    remediation:
      'Remove all detail and _ensureTableError fields from production API responses. Log detailed errors server-side only. Return generic error messages to clients: { error: "Internal server error" }. Consider a NODE_ENV check to only include details in development.',
    effort: 'Short-term',
    compliance: ['OWASP-A09', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'SCALE-001',
    title: 'No Application-Level Caching Layer',
    category: '26. Scalability Architecture',
    description:
      'No caching infrastructure exists between the application and its data sources. Every database query and external API call is re-executed on each request. The only caching is Next.js revalidate on external fetch calls (5-15 minutes). There is no Redis, Vercel KV, or in-memory cache for frequently accessed database data.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['All API routes', 'src/lib/db.ts'],
    impact:
      'Unnecessary database load and latency. External API rate limits are hit sooner than necessary. Poor scalability under concurrent users.',
    remediation:
      'Add Vercel KV or Upstash Redis for: (1) getAnalysisData() results (60s TTL), (2) EDGAR filing list per ticker (15min TTL), (3) news/press release results (10min TTL). Alternatively, use unstable_cache from Next.js for server-side data caching.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DUP-002',
    title: 'RSS Parsing and HTML Utilities Duplicated Across 3+ Files',
    category: '30. Code Duplication',
    description:
      'decodeHTMLEntities() is copy-pasted identically in 3 files (news, press-releases, competitor-feed). RSS XML parsing regex logic is duplicated across the same 3 files with minor variations. HTML-to-text stripping (8 chained regex replacements) is duplicated in edgar/analyze and sources/analyze.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: [
      'src/app/api/news/[symbol]/route.ts:101-108',
      'src/app/api/press-releases/[symbol]/route.ts:21-29',
      'src/app/api/competitor-feed/[company]/route.ts:44-52',
      'src/app/api/edgar/analyze/route.ts:30-42',
      'src/app/api/sources/analyze/route.ts:32-43',
    ],
    impact:
      'Bug fixes and improvements must be applied in multiple places. Inconsistencies between copies can cause subtle behavioral differences. Increased maintenance burden.',
    remediation:
      'Create src/lib/rss.ts with shared parseRSS() and decodeHTMLEntities(). Create src/lib/html-to-text.ts for the HTML stripping logic. Update all consumers to import from shared modules.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CONC-001',
    title: 'Non-Transactional Seed Operation Risks Partial State',
    category: '32. Threading & Concurrency',
    description:
      'The database seed operation in /api/db/setup and scripts/seed-database.ts performs DELETE ALL → INSERT ALL across 5 tables without wrapping in a transaction. If the process crashes, times out, or encounters an error mid-seed, the database is left in a partially populated state with some tables empty and others populated.',
    severity: 'MEDIUM',
    cvss: 5.5,
    affectedAssets: [
      'src/app/api/db/setup/route.ts:196-264',
      'scripts/seed-database.ts:72-182',
    ],
    impact:
      'Data inconsistency. A crashed seed leaves the database in an undefined state where some tickers have data and others do not. Recovery requires re-running the seed, which may fail again.',
    remediation:
      'Wrap the entire seed operation (delete + insert) in a database transaction using Drizzle\'s db.transaction(). If any step fails, the entire operation rolls back to the previous consistent state.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-001',
    title: 'Missing CRCL CIK Mapping Breaks EDGAR Integration',
    category: '1. Hardcoded Data',
    description:
      'CIK_MAP in the EDGAR API route only contains mappings for ASTS and BMNR. CRCL (Circle Internet Group) is completely missing. Any attempt to fetch EDGAR filings for CRCL will return a 400 error "No CIK mapping for ticker: CRCL". This is a functional defect, not just a hardcoding concern.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['src/app/api/edgar/[ticker]/route.ts:6-9'],
    impact:
      'EDGAR filing integration is non-functional for one of the three tracked stocks. Users cannot access SEC filings for CRCL through the application.',
    remediation:
      'Add CRCL\'s CIK number to the CIK_MAP. Circle Internet Group\'s CIK is 0001876042. Better: move CIK mappings into src/lib/stocks.ts as part of the StockMeta interface so all per-stock metadata is centralized.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LOW
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'DOC-001',
    title: 'README Contains Only Next.js Boilerplate',
    category: '23. Documentation Quality',
    description:
      'README.md is the default Next.js starter template with no project-specific content. No architecture overview, no setup instructions, no environment variable documentation, no API reference, no deployment guide.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['README.md'],
    impact:
      'New developers cannot onboard without oral knowledge transfer. No documentation exists for the 15 API endpoints. Deployment procedure is undocumented.',
    remediation:
      'Replace the boilerplate README with: project overview, architecture diagram, local development setup, environment variables (all of them), API endpoint reference, deployment instructions, and contribution guidelines.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'LIC-001',
    title: 'No LICENSE File in Repository',
    category: '24. Licensing & Intellectual Property',
    description:
      'The repository has no LICENSE file. Under copyright law, this means the code is "all rights reserved" by default — no one has permission to use, modify, or distribute it, even if the repository is public.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['LICENSE (missing)'],
    impact:
      'Legal ambiguity for any collaborator or contributor. If the repository is public on GitHub, others technically cannot use or fork the code.',
    remediation:
      'Add a LICENSE file. For open-source: MIT or Apache-2.0. For proprietary: add a clear "All Rights Reserved" notice with company name.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CONF-001',
    title: 'Undocumented Environment Variables',
    category: '21. Configuration Management',
    description:
      '.env.example documents only DATABASE_URL. Three additional environment variables are used in code but not documented: ANTHROPIC_API_KEY (required for AI features), DISABLE_AI_MATCHING (optional), MAX_PROMPT_TOKENS (optional, defaults to 40000).',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['.env.example'],
    impact:
      'Developers waste time discovering required environment variables by reading code. AI features silently degrade without ANTHROPIC_API_KEY with no clear indication of what is missing.',
    remediation:
      'Update .env.example to document all variables with descriptions and example values.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'I18N-001',
    title: 'Hardcoded Currency Symbols and Locale-Insensitive Formatting',
    category: '15. Internationalization & Localization',
    description:
      'Currency symbols ($) are hardcoded in LivePrice.tsx. Number formatting uses .toFixed(2) instead of Intl.NumberFormat. Date formatting is inconsistent (toLocaleTimeString, toISOString, manual parsing). Google News RSS is hardcoded to US locale (hl=en-US&gl=US).',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/components/shared/LivePrice.tsx:117,168',
      'src/app/api/news/[symbol]/route.ts:24',
    ],
    impact:
      'Non-US users see incorrectly formatted numbers and dates. International news coverage is excluded.',
    remediation:
      'Use Intl.NumberFormat for all currency displays. Use Intl.DateTimeFormat or date-fns for date formatting. Consider parameterizing the news locale.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'STYLE-001',
    title: 'Fragile !important Mobile Overrides on Inline Styles',
    category: '16. Mobile Responsiveness',
    description:
      'globals.css uses CSS attribute selectors with !important to override inline styles on mobile: [style*="grid-template-columns: repeat(7"] { grid-template-columns: 1fr 1fr !important }. This depends on exact string matching of React inline style output, which is extremely fragile and will break if component code changes the style format.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/globals.css:92-131'],
    impact:
      'Mobile layouts can silently break when component inline styles change. The !important usage makes debugging CSS specificity issues difficult.',
    remediation:
      'Replace inline style overrides with proper responsive design using Tailwind breakpoints (md:grid-cols-2 lg:grid-cols-4) within the components themselves. Remove all !important overrides.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'VENDOR-001',
    title: 'Undocumented Yahoo Finance API Usage',
    category: '29. Third-Party Integrations',
    description:
      'The stock price API uses the undocumented Yahoo Finance endpoint query1.finance.yahoo.com with a spoofed browser User-Agent. This endpoint has no SLA, no official documentation, and Yahoo has historically blocked automated access without notice. The application\'s ToS compliance is uncertain.',
    severity: 'LOW',
    cvss: 3.0,
    affectedAssets: ['src/app/api/stock/[symbol]/route.ts:24-31'],
    impact:
      'Stock price functionality can break at any time without warning. Potential ToS violation. No fallback data source.',
    remediation:
      'Evaluate official financial data APIs with SLAs: Polygon.io (free tier), Finnhub (free tier), Alpha Vantage (free tier). Implement a fallback provider pattern so that if the primary source fails, a secondary source is queried.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL FINDINGS — FULL 35-CATEGORY COVERAGE
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Category 1: Hardcoded Data (1.2–1.7) ────────────────────────────────
  {
    id: 'HARD-002',
    title: 'Hardcoded IR (Investor Relations) URLs Per Ticker',
    category: '1. Hardcoded Data',
    description:
      'IR_URLS map is hardcoded per ticker in the press-releases route. Adding a new stock requires code changes in multiple files rather than a single configuration update.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/press-releases/[symbol]/route.ts:7-11'],
    impact:
      'Adding new stock coverage requires modifying source code in multiple locations. Maintenance burden grows linearly.',
    remediation:
      'Move IR URLs into src/lib/stocks.ts as part of the StockMeta interface so all per-stock metadata is centralized.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-003',
    title: 'Hardcoded SEC User-Agent Email',
    category: '1. Hardcoded Data',
    description:
      'SEC_HEADERS contains a hardcoded email address research@stockings.dev. SEC requires a valid contact email — if this domain becomes inactive, SEC could block all EDGAR requests.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/edgar/[ticker]/route.ts:29-32'],
    impact:
      'If the hardcoded email domain becomes invalid, SEC may block all EDGAR API requests, breaking the filing integration entirely.',
    remediation:
      'Move the SEC contact email to an environment variable (SEC_CONTACT_EMAIL) so it can be updated without code changes.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-004',
    title: 'Spoofed Browser User-Agent for Yahoo Finance',
    category: '1. Hardcoded Data',
    description:
      'The Yahoo Finance API route uses a hardcoded, spoofed browser User-Agent string to bypass bot detection. If Yahoo tightens detection, stock price functionality breaks silently.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/stock/[symbol]/route.ts:28'],
    impact:
      'Stock price API calls could be blocked without warning if Yahoo detects non-browser User-Agent patterns.',
    remediation:
      'Move to an official financial data API with proper authentication rather than spoofing browser headers.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-005',
    title: 'Hardcoded Risk-Free Rate Constant',
    category: '1. Hardcoded Data',
    description:
      'RISK_FREE_RATE = 0.04 is hardcoded in src/lib/constants.ts. In a changing interest-rate environment this becomes stale and impacts all DCF/valuation calculations.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/lib/constants.ts:27'],
    impact:
      'Valuation models use an outdated risk-free rate, potentially producing incorrect DCF calculations and misleading investment analysis.',
    remediation:
      'Make RISK_FREE_RATE configurable via environment variable or fetch from a treasury rate API (e.g., FRED API).',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-006',
    title: 'Hardcoded Competitor Search Configurations',
    category: '1. Hardcoded Data',
    description:
      'SEARCH_CONFIG in competitor-feed route hardcodes ~18 company search queries. Maintenance burden grows linearly with coverage.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/api/competitor-feed/[company]/route.ts:14-36'],
    impact:
      'Adding or modifying competitor tracking requires source code changes rather than configuration updates.',
    remediation:
      'Move search configurations into a data file or the centralized stock registry in src/lib/stocks.ts.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'HARD-007',
    title: 'Claude Model IDs Hardcoded in Multiple Files',
    category: '1. Hardcoded Data',
    description:
      'Claude model identifiers (claude-haiku-4-5-20251001, claude-sonnet-4-5-20250929) are hardcoded in edgar/analyze, sources/analyze, and check-analyzed routes. Model version upgrades require touching every file.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:94',
      'src/app/api/sources/analyze/route.ts:94',
      'src/app/api/check-analyzed/route.ts:302',
    ],
    impact:
      'Model upgrades require multi-file changes with risk of inconsistency. Easy to miss one file and run different models in different endpoints.',
    remediation:
      'Extract model IDs to environment variables (AI_MODEL_HAIKU, AI_MODEL_SONNET) or a single constants file.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 2: Database / API Connections (2.1–2.4) ────────────────────
  {
    id: 'DB-001',
    title: 'Proxy-Based DB Initialization Obscures Stack Traces',
    category: '2. Database / API Connections',
    description:
      'The db export uses a Proxy object that delegates every property access to getDb(). While clever for lazy initialization, stack traces do not clearly show the origin of database calls and TypeScript loses full type inference on the proxy.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: ['src/lib/db.ts:24-28'],
    impact:
      'Debugging database-related errors is harder due to obscured stack traces. TypeScript cannot fully infer types through the Proxy layer.',
    remediation:
      'Consider a simpler lazy initialization pattern (e.g., a getter function) or initialize the DB connection eagerly with proper error handling.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DB-002',
    title: 'No Connection Timeout or Retry Logic for Neon',
    category: '2. Database / API Connections',
    description:
      'No retry logic exists for the Neon serverless database connection. While Neon uses HTTP-based queries (stateless), there is no timeout or retry for transient failures.',
    severity: 'LOW',
    cvss: 2.5,
    affectedAssets: ['src/lib/db.ts'],
    impact:
      'Transient Neon connection failures cause immediate API errors with no recovery attempt. Users experience intermittent failures.',
    remediation:
      'Add retry logic with exponential backoff for transient Neon connection failures in critical API routes. Set connection timeouts.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DB-003',
    title: 'Cold-Start DDL Execution on Every Serverless Init',
    category: '2. Database / API Connections',
    description:
      'Module-level tableVerified = false in seen-articles and seen-filings routes causes DDL (CREATE TABLE IF NOT EXISTS) to run on every serverless cold start, adding latency. Drizzle migrations would be more robust.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:32-63',
      'src/app/api/seen-filings/route.ts:42-74',
    ],
    impact:
      'Added latency on cold starts. Runtime DDL is fragile compared to migration-based schema management.',
    remediation:
      'Use Drizzle migrations (drizzle-kit generate + drizzle-kit migrate) instead of runtime DDL. Remove ensureTable() pattern entirely.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DB-004',
    title: 'Fragile Raw SQL Splitting in DB Setup Route',
    category: '2. Database / API Connections',
    description:
      'Raw SQL in db/setup route is split on ";" and executed via Object.assign([stmt], { raw: [stmt] }) to fake tagged template literals for the Neon driver. Semicolons inside string literals or comments would break parsing.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['src/app/api/db/setup/route.ts:188-192'],
    impact:
      'Schema modifications containing semicolons in default values or comments cause silent failures or partial DDL execution.',
    remediation:
      'Replace raw SQL with proper Drizzle migrations. Use drizzle-kit generate to create migration files and drizzle-kit migrate to apply them.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 3: TypeScript Best Practices (3.1–3.5) ─────────────────────
  {
    id: 'TS-001',
    title: 'File-Wide eslint-disable in 2000+ Line Components',
    category: '3. TypeScript Best Practices',
    description:
      'ASTS.tsx, BMNR.tsx, and CRCL.tsx each have a file-wide eslint-disable @typescript-eslint/no-explicit-any directive, suppressing all type safety for the entire 2000+ line component.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx:1',
      'src/components/stocks/BMNR.tsx:1',
      'src/components/stocks/CRCL.tsx:1',
    ],
    impact:
      'Type errors are silently suppressed across ~6000+ lines of code. Refactoring is dangerous as TypeScript cannot catch type mismatches.',
    remediation:
      'Remove file-wide eslint-disable directives. Fix underlying type issues by adding proper TypeScript interfaces for financial data, API responses, and component props.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'TS-002',
    title: 'Unsafe "as any" Casts on Database Insert Operations',
    category: '3. TypeScript Best Practices',
    description:
      'Multiple as any casts on db.insert(table).values(batch as any) indicate a type mismatch between mapper output and Drizzle schema insert types.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/app/api/db/setup/route.ts:217',
      'scripts/seed-database.ts:62',
    ],
    impact:
      'Type mismatches between data mappers and database schema go undetected. Schema changes could silently break seed operations.',
    remediation:
      'Type the mapper functions to return the exact Drizzle insert type (e.g., typeof schema.secFilings.$inferInsert). Remove all as any casts.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'TS-003',
    title: 'Undocumented process.env Access Workaround',
    category: '3. TypeScript Best Practices',
    description:
      'process.env is cast to Record<string, string | undefined> as a workaround to prevent Next.js build-time inlining. This pattern is undocumented and relies on internal Next.js behavior.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/edgar/analyze/route.ts:12'],
    impact:
      'If Next.js changes its env var inlining behavior, this workaround may break silently or become unnecessary.',
    remediation:
      'Use serverRuntimeConfig in next.config.ts or the env field to properly declare runtime-only environment variables.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'TS-004',
    title: 'Broken Custom Stemmer Implementation',
    category: '3. TypeScript Best Practices',
    description:
      'The stem() function uses a sequential chain of regex replacements that produces incorrect stems in many cases (e.g., "press" → "pres" if /(ss)$/ fails to match before /s$/).',
    severity: 'LOW',
    cvss: 2.5,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:40'],
    impact:
      'Incorrect stemming reduces accuracy of the local keyword matching algorithm, causing articles to be unnecessarily sent to the paid AI matching endpoint.',
    remediation:
      'Replace the custom stemmer with a well-tested stemming library like "natural" or "stemmer" from npm.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'TS-005',
    title: 'Missing "as const" on Exported Data Arrays',
    category: '3. TypeScript Best Practices',
    description:
      'Numerous exported data arrays lack "as const" assertions, causing TypeScript to widen literal types to their base types (string instead of specific string literals).',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['Various data files in src/data/'],
    impact:
      'Downstream consumers lose literal type inference. Type narrowing and exhaustive checks are not available.',
    remediation:
      'Add "as const" to all exported static data arrays and objects where literal types are meaningful.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 4: Security Vulnerabilities (4.5) ──────────────────────────
  {
    id: 'SEC-006',
    title: 'Unhandled JSON.parse on Database Data',
    category: '4. Security Vulnerabilities',
    description:
      'JSON.parse(row.crossRefs) in seen-filings route operates on data from the database without try-catch. Corrupted data throws an unhandled exception that crashes the request handler.',
    severity: 'LOW',
    cvss: 2.5,
    affectedAssets: ['src/app/api/seen-filings/route.ts:133'],
    impact:
      'Corrupted database data causes 500 errors for all users viewing the affected ticker. No graceful degradation.',
    remediation:
      'Wrap JSON.parse calls in try-catch with a graceful fallback (return empty array on parse failure).',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 5: Authentication & Authorization (5.2–5.3) ────────────────
  {
    id: 'AUTH-001',
    title: 'No Session Management or User Accounts',
    category: '5. Authentication & Authorization',
    description:
      'No session management, user accounts, or role-based access control exists. The app assumes a single trusted user with direct access. There is no mechanism to distinguish between different users or permission levels.',
    severity: 'HIGH',
    cvss: 7.0,
    affectedAssets: ['Entire application — no auth infrastructure'],
    impact:
      'Multi-user deployment is impossible. All users have identical (maximum) privileges. No audit trail of who performed what action.',
    remediation:
      'Integrate NextAuth.js or Clerk for session-based authentication with role separation (admin vs. viewer). Add user identification to all write operations for audit trail.',
    effort: 'Short-term',
    compliance: ['OWASP-A07', 'SOC2', 'ISO-27001'],
    status: 'Open',
  },
  {
    id: 'AUTH-002',
    title: 'No CSRF Protection on POST Endpoints',
    category: '5. Authentication & Authorization',
    description:
      'No CSRF protection exists on any POST endpoint. If authentication is added later without CSRF tokens, all state-changing endpoints would be vulnerable to cross-site request forgery.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['All POST API routes'],
    impact:
      'When authentication is added, attackers could trick authenticated users into performing unintended actions via malicious websites.',
    remediation:
      'Add CSRF protection when implementing authentication: use SameSite cookie attributes and token-based verification (double-submit cookie pattern).',
    effort: 'Short-term',
    compliance: ['OWASP-A01'],
    status: 'Open',
  },

  // ── Category 6: Data Privacy Compliance (6.1, 6.3) ──────────────────────
  {
    id: 'PRIV-002',
    title: 'No Privacy Policy or Terms of Service',
    category: '6. Data Privacy Compliance',
    description:
      'No privacy policy or terms of service are displayed anywhere in the application. The footer says "Not financial advice" but contains no data privacy disclosures.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/layout.tsx (footer)'],
    impact:
      'GDPR non-compliance for EU users. No legal basis documented for data processing. User trust concerns.',
    remediation:
      'Add a privacy policy page documenting what data is collected, how it is used, and how users can exercise their rights. Add link to footer.',
    effort: 'Medium-term',
    compliance: ['GDPR', 'CCPA'],
    status: 'Open',
  },
  {
    id: 'PRIV-003',
    title: 'No Data Retention Policy for Behavioral Data',
    category: '6. Data Privacy Compliance',
    description:
      'Article reading history (seen-articles) and filing reading history (seen-filings) are stored per ticker with no retention policy. If the app becomes multi-user, this becomes user behavioral data subject to GDPR/CCPA.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/app/api/seen-articles/route.ts',
      'src/app/api/seen-filings/route.ts',
    ],
    impact:
      'Accumulated behavioral data with no cleanup schedule. Storage grows indefinitely. No mechanism for users to request data deletion.',
    remediation:
      'Implement data retention policies with automatic cleanup of records older than a configurable threshold (e.g., 90 days). Add a data deletion API.',
    effort: 'Medium-term',
    compliance: ['GDPR', 'CCPA'],
    status: 'Open',
  },

  // ── Category 7: Performance Bottlenecks (7.2–7.6) ──────────────────────
  {
    id: 'PERF-002',
    title: 'Sequential SEC Filing Page Fetches',
    category: '7. Performance Bottlenecks',
    description:
      'Older SEC filing pages are fetched via Promise.allSettled on every request. For companies with many filing pages, this can add seconds of latency. The 15-minute revalidate helps but is insufficient for first-hit performance.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: ['src/app/api/edgar/[ticker]/route.ts:119-136'],
    impact:
      'First-hit latency for EDGAR filings can be 3-8 seconds for companies with many filing pages. Poor user experience on initial load.',
    remediation:
      'Pre-compute and cache EDGAR filing page results in the database rather than fetching from SEC on every request. Use background job to refresh periodically.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'PERF-003',
    title: 'Inefficient HTML-to-Text via Chained Regex',
    category: '7. Performance Bottlenecks',
    description:
      'HTML-to-text conversion in analyze endpoints uses 8 chained regex replacements on potentially large documents (up to 15KB). Each regex runs sequentially over the entire string.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:30-42',
      'src/app/api/sources/analyze/route.ts:32-43',
    ],
    impact:
      'Unnecessary CPU usage on large documents. Multiple full-string passes instead of a single-pass parser.',
    remediation:
      'Replace chained regex with a streaming HTML parser or a library like "html-to-text" for single-pass extraction.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'PERF-004',
    title: 'Monolithic Client-Side Bundle for Stock Components',
    category: '7. Performance Bottlenecks',
    description:
      'Stock components (ASTS, BMNR, CRCL) are ~2000+ line monolithic client components. Even with ssr: false and dynamic imports, the browser must parse and execute the entire bundle at once. No code-splitting within components.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
    ],
    impact:
      'Large JavaScript bundle increases Time to Interactive (TTI). Users on slower devices experience delayed interactivity.',
    remediation:
      'Split each stock component into lazy-loaded tab sub-components. Only load the active tab\'s code on demand.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'PERF-005',
    title: 'Rough Token Estimation Heuristic',
    category: '7. Performance Bottlenecks',
    description:
      'Token estimation uses Math.ceil(prompt.length / 4) which is a rough heuristic. For prompts near the MAX_PROMPT_TOKENS limit, this could either waste API budget or incorrectly fall back to local matching.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:283'],
    impact:
      'Inaccurate token counting near the limit causes either wasted AI API credits or unnecessary fallback to less accurate local matching.',
    remediation:
      'Use a proper tokenizer library (e.g., tiktoken or @anthropic-ai/tokenizer) for accurate token counting.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'PERF-006',
    title: 'Render-Blocking External Google Fonts Import',
    category: '7. Performance Bottlenecks',
    description:
      'External Google Fonts @import in globals.css blocks rendering until the font CSS is downloaded from fonts.googleapis.com. This adds a round-trip to an external CDN before any content is displayed.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/globals.css:1'],
    impact:
      'Increased First Contentful Paint (FCP) time due to render-blocking external CSS. Worse on slow connections.',
    remediation:
      'Replace with next/font (built into Next.js) which self-hosts fonts and eliminates the external request. Also resolves GDPR concern (PRIV-001).',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 8: Error Handling & Logging (8.1, 8.3–8.5) ────────────────
  {
    id: 'ERR-002',
    title: 'Console.error-Only Logging in Production',
    category: '8. Error Handling & Logging',
    description:
      'All API routes use console.error exclusively for logging. In production (Vercel), these produce ephemeral, unstructured logs with no correlation IDs, no severity levels, and no alerting integration.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['All API routes'],
    impact:
      'Production errors are difficult to trace. No correlation between related log entries. No ability to set up alerts based on log severity.',
    remediation:
      'Integrate a structured logging library (e.g., Pino) with log levels, correlation IDs, and JSON output for machine parsing.',
    effort: 'Short-term',
    compliance: ['SOC2', 'OWASP-A09'],
    status: 'Open',
  },
  {
    id: 'ERR-003',
    title: 'Error Message Embedded in AI Prompt When Fetch Fails',
    category: '8. Error Handling & Logging',
    description:
      'When SEC document fetch fails in edgar/analyze, the error message is embedded directly in the AI prompt: docText = "[Could not fetch document: ...]". The AI model then "analyzes" this error message, producing confusing output.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/edgar/analyze/route.ts:48-49'],
    impact:
      'Users see AI-generated analysis of an error message instead of a clear failure notification.',
    remediation:
      'When document fetch fails, skip AI analysis entirely and return a clear error to the client: { error: "Could not fetch SEC document" }.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'ERR-004',
    title: 'Silent SSE Stream Parsing Failures',
    category: '8. Error Handling & Logging',
    description:
      'Unparseable SSE lines in the workflow run streaming handler are silently dropped. No logging or error reporting for malformed events from the Anthropic API.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/api/workflow/run/route.ts:93-95'],
    impact:
      'Malformed SSE events are silently lost. If the Anthropic API changes its streaming format, the application silently degrades.',
    remediation:
      'Log unparseable SSE lines at warning level. Consider counting dropped lines and including a warning in the response.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'ERR-005',
    title: 'Silent Fallback on AI JSON Parse Failure',
    category: '8. Error Handling & Logging',
    description:
      'When Claude\'s JSON response in check-analyzed cannot be parsed, the handler falls back to an empty array with no indication to the caller that AI matching failed.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:321-326'],
    impact:
      'AI matching failures are invisible to the user. Articles that should have been matched by AI appear as unmatched with no explanation.',
    remediation:
      'Log the parse failure with the raw AI response. Include a flag in the API response indicating whether AI matching was used successfully.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 9: Code Maintainability (9.2–9.5) ─────────────────────────
  {
    id: 'MAINT-002',
    title: 'Duplicated SQL DDL in API Route',
    category: '9. Code Maintainability',
    description:
      '127 lines of raw SQL DDL in db/setup route duplicates the Drizzle schema defined in src/lib/schema.ts. Schema changes must be applied in two places or they drift apart.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: [
      'src/app/api/db/setup/route.ts:39-165',
      'src/lib/schema.ts',
    ],
    impact:
      'Schema drift between raw SQL and Drizzle definitions. A change to one is easily forgotten in the other, causing data integrity issues.',
    remediation:
      'Replace raw SQL DDL with Drizzle migrations (drizzle-kit generate + drizzle-kit migrate). Delete the CREATE_TABLES_SQL constant.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MAINT-003',
    title: 'Dead prompts Export Still in Codebase',
    category: '9. Code Maintainability',
    description:
      'The prompts array in src/data/prompts.ts is empty ([]) with a comment "All prompts have been migrated to workflows." This dead export was previously imported and rendered on the home page, producing an empty section.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['src/data/prompts.ts'],
    impact:
      'Dead code increases codebase noise. Developers may waste time understanding or maintaining unused exports.',
    remediation:
      'Delete src/data/prompts.ts entirely or remove the empty prompts export if other exports in the file are still used.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MAINT-004',
    title: 'Global CSS Injection from Component',
    category: '9. Code Maintainability',
    description:
      'LivePrice.tsx uses <style jsx global> for a single @keyframes spin animation. This injects global CSS from a component, which can conflict with other styles.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/components/shared/LivePrice.tsx:183-188'],
    impact:
      'Global style injection from a component is unpredictable — multiple instances could create duplicate keyframe definitions.',
    remediation:
      'Use Tailwind\'s built-in animate-spin utility class instead of injecting custom global keyframes.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MAINT-005',
    title: 'Inconsistent Inline Styles vs Tailwind in Shared Components',
    category: '9. Code Maintainability',
    description:
      'SharedEdgarTab and SharedSourcesTab use extensive inline style={{}} objects rather than Tailwind classes, creating an inconsistent styling approach within the same project.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: [
      'src/components/shared/SharedEdgarTab.tsx',
      'src/components/shared/SharedSourcesTab.tsx',
    ],
    impact:
      'Mixed styling approaches make it harder to maintain a consistent design system. Theming changes require updating both Tailwind and inline styles.',
    remediation:
      'Standardize on Tailwind classes for all components. Convert inline style objects to equivalent Tailwind utility classes.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 10: Dependency Management (10.1–10.4) ──────────────────────
  {
    id: 'DEP-001',
    title: 'No Lock File Integrity Verification',
    category: '10. Dependency Management',
    description:
      'All dependencies use caret ranges (^) which is normal, but there is no CI pipeline to run npm ci (which verifies package-lock.json integrity). Dependencies could drift between environments.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['package.json', 'package-lock.json'],
    impact:
      'Different environments may install different dependency versions. Subtle bugs from version differences are hard to diagnose.',
    remediation:
      'Add npm ci to the CI pipeline (once CI exists per CICD-001). This ensures package-lock.json integrity on every build.',
    effort: 'Short-term',
    compliance: ['SOC2'],
    status: 'Open',
  },
  {
    id: 'DEP-002',
    title: 'dotenv Listed as Production Dependency',
    category: '10. Dependency Management',
    description:
      'dotenv is listed as a production dependency but is only needed for scripts (seed, validate) and drizzle.config.ts. Next.js handles .env files natively at runtime.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['package.json'],
    impact:
      'Slightly larger production bundle. Misleading dependency classification.',
    remediation:
      'Move dotenv from dependencies to devDependencies.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DEP-003',
    title: '@types/node Version Mismatch',
    category: '10. Dependency Management',
    description:
      '@types/node is pinned to ^20 but the project uses Next.js 16 which targets Node 22+. This could cause type definition mismatches for newer Node.js APIs.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['package.json'],
    impact:
      'TypeScript may not recognize Node 22+ APIs or may have incorrect type definitions for changed APIs.',
    remediation:
      'Update @types/node to ^22 to match the target Node.js runtime version.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DEP-004',
    title: 'No Automated Security Audit Tooling',
    category: '10. Dependency Management',
    description:
      'No dependency security audit tooling is configured. No npm audit, no Snyk, no Dependabot, no Renovate. Vulnerable dependency versions can persist indefinitely.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['package.json', '.github/ (missing)'],
    impact:
      'Known vulnerabilities in dependencies go undetected. No automated alerts when CVEs are published for installed packages.',
    remediation:
      'Add npm audit to the CI pipeline. Configure Dependabot or Renovate for automated dependency update PRs.',
    effort: 'Short-term',
    compliance: ['SOC2', 'ISO-27001'],
    status: 'Open',
  },

  // ── Category 11: Testing Coverage (11.2) ────────────────────────────────
  {
    id: 'QA-002',
    title: 'Data Validation Not Integrated Into Build',
    category: '11. Testing Coverage',
    description:
      'The only validation is a Zod schema check on competitor news data (npm run validate), run manually. It is not integrated into the build pipeline or any CI process.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['scripts/validate-data.ts', 'package.json:6-13'],
    impact:
      'Invalid data can be deployed to production without detection. Data schema violations are only caught if a developer remembers to run validate manually.',
    remediation:
      'Integrate npm run validate into the build script: "build": "npm run validate && next build". Add to CI pipeline.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 12: Styling Consistency (12.1–12.4) ────────────────────────
  {
    id: 'CSS-001',
    title: 'Mixed Styling Approaches Across Codebase',
    category: '12. Styling Consistency',
    description:
      'Four different styling approaches are used: Tailwind utility classes (pages, layout), inline style={{}} objects (shared components, stock components), CSS custom properties (globals.css), and <style jsx global> (LivePrice). This fragmentation makes theming changes error-prone.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/app/globals.css',
      'src/components/shared/SharedEdgarTab.tsx',
      'src/components/shared/LivePrice.tsx',
      'src/components/stocks/ASTS.tsx',
    ],
    impact:
      'Theming changes require updating four different styling systems. Inconsistent visual behavior. New developers must learn multiple styling conventions.',
    remediation:
      'Establish a single styling standard: either all Tailwind or all CSS variables with utility classes. Migrate inline styles to Tailwind.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CSS-002',
    title: 'Missing Tailwind Preflight (CSS Reset)',
    category: '12. Styling Consistency',
    description:
      'Tailwind is imported WITHOUT preflight — only @import "tailwindcss/theme" and "tailwindcss/utilities" but not "tailwindcss/preflight". Browser default styles (margins on headings, list bullets, etc.) are NOT reset.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/globals.css:3-5'],
    impact:
      'Inconsistencies between browsers due to varying default styles. Headings, paragraphs, and lists may render differently across Chrome, Firefox, and Safari.',
    remediation:
      'Add @import "tailwindcss/preflight" or a custom CSS reset for cross-browser consistency.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CSS-003',
    title: 'Manual Re-implementations of Tailwind Utilities',
    category: '12. Styling Consistency',
    description:
      'globals.css contains manual re-implementations of Tailwind space-y-* and gap-* utilities scoped to .stock-model-app. These will drift from Tailwind\'s actual values if the design system changes.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/globals.css:78-84'],
    impact:
      'Duplicate definitions that can diverge from Tailwind\'s design tokens. Maintenance confusion.',
    remediation:
      'Remove manual Tailwind reimplementations and use actual Tailwind utility classes in components instead.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CSS-004',
    title: 'DB Setup Page Uses Entirely Inline Styles',
    category: '12. Styling Consistency',
    description:
      'The DB setup page (/db-setup) uses entirely inline styles with no Tailwind classes, visually inconsistent with the rest of the application.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['src/app/db-setup/page.tsx:24-53'],
    impact:
      'Visual inconsistency. The page looks different from the rest of the app.',
    remediation:
      'Convert inline styles to Tailwind classes to match the rest of the application styling.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 13: UI/UX Design Flaws (13.1–13.4) ────────────────────────
  {
    id: 'UX-001',
    title: 'Empty "Prompts" Section Renders on Home Page',
    category: '13. UI/UX Design Flaws',
    description:
      'The "Prompts" section renders from an empty array (prompts: Prompt[] = []), producing a section header with no content below it on the home page.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['src/app/page.tsx:92-98', 'src/data/prompts.ts'],
    impact:
      'Users see an empty section on the home page. Confusing and unprofessional appearance.',
    remediation:
      'Remove or conditionally hide the Prompts section when the array is empty.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'UX-002',
    title: 'No Server-Side Rendering or SEO for Stock Pages',
    category: '13. UI/UX Design Flaws',
    description:
      'Stock pages use client-side routing (useParams) with ssr: false dynamic imports. No SEO, no server-side rendering, and a loading spinner on every page visit — even for returning users.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/stocks/[ticker]/page.tsx:53-68'],
    impact:
      'Search engines cannot index stock pages. Users always see a loading spinner on initial visit. No social media preview cards.',
    remediation:
      'Consider server components or ISR (Incremental Static Regeneration) for stock pages to improve SEO and initial load time.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'UX-003',
    title: 'Publicly Accessible DB Setup Page Without Confirmation',
    category: '13. UI/UX Design Flaws',
    description:
      'The database setup page at /db-setup is publicly accessible with a single "Run Setup" button that wipes and reseeds the entire database. No confirmation dialog, no authentication.',
    severity: 'MEDIUM',
    cvss: 5.0,
    affectedAssets: ['src/app/db-setup/page.tsx'],
    impact:
      'Accidental or malicious clicks immediately destroy all production data. No "are you sure?" safeguard.',
    remediation:
      'Add a confirmation dialog ("This will delete all data. Are you sure?"). Add authentication. Consider removing the page entirely and using CLI-only seeding.',
    effort: 'Short-term',
    compliance: ['OWASP-A01'],
    status: 'Open',
  },
  {
    id: 'UX-004',
    title: 'Hardcoded Dollar Sign in Price Display',
    category: '13. UI/UX Design Flaws',
    description:
      'Price display uses a dollar sign prefix ($) hardcoded in JSX. This won\'t work for non-USD markets or international users.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['src/components/shared/LivePrice.tsx:117'],
    impact:
      'Non-US users or non-USD securities display incorrect currency symbols.',
    remediation:
      'Use Intl.NumberFormat with currency option instead of hardcoded "$" prefix.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 14: Accessibility Compliance (14.4–14.6) ───────────────────
  {
    id: 'A11Y-003',
    title: 'Missing aria-label on Icon Buttons',
    category: '14. Accessibility Compliance',
    description:
      'The LivePrice refresh button has a title attribute but no aria-label. The SVG icon inside has no accessible text. Screen readers announce the button with no meaningful label.',
    severity: 'MEDIUM',
    cvss: 3.5,
    cwe: 'CWE-1263',
    affectedAssets: ['src/components/shared/LivePrice.tsx:118-136'],
    impact:
      'Screen reader users cannot understand the purpose of icon-only buttons. Violates WCAG 2.1 SC 1.1.1 (Non-text Content).',
    remediation:
      'Add aria-label="Refresh price" to the button element. Add role="img" and aria-hidden="true" to decorative SVGs.',
    effort: 'Immediate',
    compliance: ['WCAG-2.1-AA'],
    status: 'Open',
  },
  {
    id: 'A11Y-004',
    title: 'No ARIA Tab Roles for Stock Page Navigation',
    category: '14. Accessibility Compliance',
    description:
      'Navigation between tabs and sections in stock components relies on custom JavaScript without ARIA roles (tablist, tab, tabpanel). Screen readers cannot announce the tab structure.',
    severity: 'MEDIUM',
    cvss: 3.5,
    cwe: 'CWE-1263',
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
    ],
    impact:
      'Screen reader users cannot navigate stock page tabs. Keyboard users cannot use arrow keys to switch tabs as expected.',
    remediation:
      'Implement ARIA tablist/tab/tabpanel roles. Add aria-selected state. Support arrow key navigation between tabs per WAI-ARIA Authoring Practices.',
    effort: 'Short-term',
    compliance: ['WCAG-2.1-AA'],
    status: 'Open',
  },
  {
    id: 'A11Y-005',
    title: 'Custom Scrollbar Removes Visible Scroll Indicator',
    category: '14. Accessibility Compliance',
    description:
      'Custom scrollbar styling in globals.css removes the native scrollbar appearance. This can confuse users who rely on visible scroll indicators to understand page content length.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/globals.css:68-71'],
    impact:
      'Users may not realize content is scrollable. Reduced discoverability of below-fold content.',
    remediation:
      'Ensure custom scrollbars remain visible enough to indicate scrollable content. Consider keeping the track visible.',
    effort: 'Short-term',
    compliance: ['WCAG-2.1-AA'],
    status: 'Open',
  },

  // ── Category 15: Internationalization & Localization (15.1, 15.4) ───────
  {
    id: 'I18N-002',
    title: 'No i18n Framework Configured',
    category: '15. Internationalization & Localization',
    description:
      'All UI text is hardcoded in English. No internationalization framework (next-intl, react-intl) is configured. Translating the app would require manually extracting all strings.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['Entire UI layer'],
    impact:
      'The application cannot serve non-English-speaking users without a complete rewrite of all UI text handling.',
    remediation:
      'If international expansion is planned, adopt next-intl for i18n. Extract all hardcoded strings to translation files.',
    effort: 'Long-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'I18N-003',
    title: 'Inconsistent Date Formatting',
    category: '15. Internationalization & Localization',
    description:
      'Dates are displayed using toLocaleTimeString() and toISOString() inconsistently across the codebase. No standardized date formatting library or convention.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['Various components and API routes'],
    impact:
      'Dates may display differently across components. Locale-specific date formatting is inconsistent.',
    remediation:
      'Use Intl.DateTimeFormat or a library like date-fns for consistent date formatting throughout the application.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 16: Mobile Responsiveness (16.4, 16.2–16.3 Good) ──────────
  {
    id: 'MOB-001',
    title: 'Financial Data Tables Break on Mobile',
    category: '16. Mobile Responsiveness',
    description:
      'Financial data tables with many columns use inline gridTemplateColumns with fixed column counts (e.g., repeat(7, 1fr)). On mobile, the CSS override forces these to 2 columns, but the data meaning may be lost when the layout changes dramatically.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
    ],
    impact:
      'Financial data tables become difficult to read on mobile. Column headers and data may misalign when forced from 7 columns to 2.',
    remediation:
      'Redesign financial tables for mobile with a card-based layout instead of forcing grid column changes. Test on iPhone SE and Pixel 5 sizes.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MOB-002',
    title: 'Viewport Meta Properly Configured',
    category: '16. Mobile Responsiveness',
    description:
      'Viewport meta is properly set with width: device-width, initialScale: 1, and maximumScale: 5. This correctly enables responsive behavior and allows user zoom.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/app/layout.tsx:10-14'],
    impact: 'Positive: Proper viewport configuration for mobile devices.',
    remediation: 'No action needed. This is correctly implemented.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },
  {
    id: 'MOB-003',
    title: 'Touch-Friendly Button Sizes Enforced',
    category: '16. Mobile Responsiveness',
    description:
      'Touch-friendly minimum button sizes (44px) are enforced on mobile via CSS, meeting Apple HIG and WCAG guidelines for touch targets.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/app/globals.css:108-112'],
    impact: 'Positive: Proper touch target sizing for mobile usability.',
    remediation: 'No action needed. This is correctly implemented.',
    effort: 'Immediate',
    compliance: ['WCAG-2.1-AA'],
    status: 'Resolved',
  },

  // ── Category 17: Browser Compatibility (17.1–17.3) ──────────────────────
  {
    id: 'COMPAT-001',
    title: 'AbortSignal.timeout() Requires Modern Browsers',
    category: '17. Browser Compatibility',
    description:
      'AbortSignal.timeout() is used for Yahoo Finance API requests. This API requires Node 18+ and modern browsers — not available in older Safari versions (< 16.4).',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/stock/[symbol]/route.ts:31'],
    impact:
      'Server-side only (Node.js), so browser compatibility is not directly affected. However, if this pattern is used client-side in the future, it would fail on older Safari.',
    remediation:
      'Low priority — this runs server-side only. If ever used client-side, add a polyfill or use AbortController with setTimeout instead.',
    effort: 'Short-term',
    compliance: [],
    status: 'Accepted Risk',
  },
  {
    id: 'COMPAT-002',
    title: 'WebKit-Only Scrollbar Styling',
    category: '17. Browser Compatibility',
    description:
      '::-webkit-scrollbar styling only works in Chromium-based browsers. Firefox uses scrollbar-width and scrollbar-color properties instead. Firefox users see the default scrollbar.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/globals.css:68-71'],
    impact:
      'Visual inconsistency between Chromium and Firefox browsers. Firefox shows default system scrollbar instead of the custom dark theme scrollbar.',
    remediation:
      'Add Firefox scrollbar styling: scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'COMPAT-003',
    title: 'Styled-JSX Dependency for Keyframe Animation',
    category: '17. Browser Compatibility',
    description:
      '<style jsx global> in LivePrice.tsx is a Next.js-specific feature (styled-jsx). If the project ever migrates away from Next.js, this CSS injection method would break.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['src/components/shared/LivePrice.tsx:183-188'],
    impact:
      'Framework lock-in for a single CSS animation. Migration to other React frameworks would require rewriting this pattern.',
    remediation:
      'Replace with Tailwind\'s animate-spin utility or move the keyframe to globals.css for framework independence.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 18: Network Security (18.2–18.3) ──────────────────────────
  {
    id: 'NET-003',
    title: 'No Explicit CORS Configuration',
    category: '18. Network Security',
    description:
      'No CORS configuration exists. Default Next.js behavior allows same-origin requests only, but there are no explicit Access-Control-* headers. If the API is consumed by other origins, this will need configuration.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['next.config.ts', 'All API routes'],
    impact:
      'Cross-origin API consumption is blocked by default. If the API needs to serve other frontends or mobile apps, CORS headers must be added.',
    remediation:
      'Add explicit CORS headers if cross-origin access is needed. If not, document that the API is same-origin only.',
    effort: 'Short-term',
    compliance: [],
    status: 'Accepted Risk',
  },
  {
    id: 'NET-004',
    title: 'SSE Streaming Response Missing nosniff Header',
    category: '18. Network Security',
    description:
      'The SSE streaming response in workflow/run does not set X-Content-Type-Options: nosniff, which could allow MIME type sniffing attacks in older browsers.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/workflow/run/route.ts:107-113'],
    impact:
      'MIME type sniffing in older browsers could misinterpret the SSE stream content type.',
    remediation:
      'Add X-Content-Type-Options: nosniff header to the SSE streaming response. This is also addressed globally by NET-001.',
    effort: 'Immediate',
    compliance: ['OWASP-A05'],
    status: 'Open',
  },

  // ── Category 19: Input Validation (19.3, 19.5) ─────────────────────────
  {
    id: 'INP-003',
    title: 'Minimal Validation on Stored Article Data',
    category: '19. Input Validation',
    description:
      'Article data from the request body in seen-articles is stored with minimal validation — only cacheKey and headline are required. Fields like url, source, and date accept any string without format validation.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/app/api/seen-articles/route.ts:163-174'],
    impact:
      'Malformed or malicious data can be stored in the database. No protection against storing invalid URLs or dates.',
    remediation:
      'Add Zod schema validation for incoming article data. Validate URL format, date format, and string lengths.',
    effort: 'Short-term',
    compliance: ['OWASP-A03'],
    status: 'Open',
  },
  {
    id: 'INP-004',
    title: 'Unvalidated Yahoo Finance Interval Parameter',
    category: '19. Input Validation',
    description:
      'The interval query parameter is passed directly to Yahoo Finance API without validation against a known list of valid intervals (1d, 1wk, 1mo, etc.).',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/api/stock/[symbol]/route.ts:13'],
    impact:
      'Invalid interval values are forwarded to Yahoo Finance, causing opaque 400 errors. No input sanitization at the boundary.',
    remediation:
      'Validate the interval parameter against known valid values: ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"].',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 20: Output Encoding (20.1–20.3) ───────────────────────────
  {
    id: 'ENC-001',
    title: 'Incomplete HTML Entity Decoding in RSS Parser',
    category: '20. Output Encoding',
    description:
      'decodeHTMLEntities() only handles 6 named entities (&amp;, &lt;, &gt;, &quot;, &#039;, &apos;). RSS feeds may contain numeric HTML entities (e.g., &#8217; for curly quotes) that are not decoded.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: [
      'src/app/api/news/[symbol]/route.ts:101-108',
      'src/app/api/press-releases/[symbol]/route.ts:21-29',
      'src/app/api/competitor-feed/[company]/route.ts:44-52',
    ],
    impact:
      'Some RSS feed content displays raw HTML entities instead of proper characters. Minor display issue only — React auto-escaping prevents XSS.',
    remediation:
      'Extend decodeHTMLEntities to handle numeric entities (&#NNN; and &#xHHH;) or use a library like "he" for comprehensive decoding.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'ENC-002',
    title: 'Error Details Exposed in API Responses',
    category: '20. Output Encoding',
    description:
      'Error responses include detail: String(error) which can expose stack traces, database connection strings, and internal file paths. This overlaps with ERR-001 but is specifically an output encoding concern.',
    severity: 'LOW',
    cvss: 2.5,
    cwe: 'CWE-209',
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:136',
      'src/app/api/seen-filings/route.ts:147',
    ],
    impact:
      'Information disclosure through error detail leakage. Attackers gain knowledge of internal architecture.',
    remediation:
      'Sanitize error output: return generic messages to clients, log detailed errors server-side only.',
    effort: 'Short-term',
    compliance: ['OWASP-A09'],
    status: 'Open',
  },
  {
    id: 'ENC-003',
    title: 'React JSX Auto-Escaping Provides Strong XSS Protection',
    category: '20. Output Encoding',
    description:
      'React\'s JSX automatically escapes interpolated values, providing strong XSS protection for all rendered content. No dangerouslySetInnerHTML usage was found anywhere in the codebase.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['All React components'],
    impact: 'Positive: Strong default XSS protection through React auto-escaping.',
    remediation: 'No action needed. This is correctly implemented.',
    effort: 'Immediate',
    compliance: ['OWASP-A03'],
    status: 'Resolved',
  },

  // ── Category 21: Configuration Management (21.2) ────────────────────────
  {
    id: 'CONF-002',
    title: 'Undocumented MAX_PROMPT_TOKENS Default',
    category: '21. Configuration Management',
    description:
      'MAX_PROMPT_TOKENS defaults to 40000 if not set in environment variables. This is a reasonable default but is completely undocumented — developers have no way to know this limit exists without reading the source code.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:195'],
    impact:
      'Developers may unknowingly hit the default limit and not understand why AI matching behavior changes.',
    remediation:
      'Document MAX_PROMPT_TOKENS in .env.example with its default value and purpose.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },

  // ── Category 22: Build & Deployment Processes (22.2–22.4) ──────────────
  {
    id: 'CICD-002',
    title: 'Data Validation Not Chained Into Build Script',
    category: '22. Build & Deployment Processes',
    description:
      'npm run validate is a standalone script not part of npm run build. Data validation is entirely manual and easy to forget before deployment.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: ['package.json:6-13'],
    impact:
      'Invalid data files can be deployed to production without detection. Schema violations only caught if a developer remembers to run validate.',
    remediation:
      'Chain validation into the build script: "build": "npm run validate && next build".',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CICD-003',
    title: 'tsx Not in devDependencies',
    category: '22. Build & Deployment Processes',
    description:
      'npm run seed uses npx tsx which downloads tsx on every invocation if not installed. tsx should be in devDependencies for reliable script execution.',
    severity: 'LOW',
    cvss: 1.0,
    affectedAssets: ['package.json:12'],
    impact:
      'Slower script execution due to repeated downloads. CI environments without network access would fail.',
    remediation:
      'Add tsx to devDependencies: npm install -D tsx.',
    effort: 'Immediate',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CICD-004',
    title: 'No Containerization or Deployment Documentation',
    category: '22. Build & Deployment Processes',
    description:
      'No Dockerfile exists for containerized deployment. The app is assumed to deploy on Vercel, but no deployment documentation or configuration exists.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['Dockerfile (missing)', 'README.md'],
    impact:
      'Cannot deploy to non-Vercel environments without reverse-engineering the setup. No documented deployment procedure.',
    remediation:
      'Add a Dockerfile for containerized deployment and document the Vercel deployment procedure in the README.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 23: Documentation Quality (23.4) ──────────────────────────
  {
    id: 'DOC-002',
    title: 'API Routes Have Good JSDoc Comments',
    category: '23. Documentation Quality',
    description:
      'API routes have helpful JSDoc comments explaining endpoints, request/response formats, and behavior. Stock components include extensive maintenance protocol documentation with update procedures and changelogs.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: [
      'src/app/api/ (all routes)',
      'src/components/stocks/ASTS.tsx:1-100',
    ],
    impact: 'Positive: Good inline documentation aids developer understanding.',
    remediation: 'No action needed. This is well-implemented.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },

  // ── Category 24: Licensing & Intellectual Property (24.2–24.3) ─────────
  {
    id: 'LIC-002',
    title: 'Yahoo Finance Terms of Service Compliance Concern',
    category: '24. Licensing & Intellectual Property',
    description:
      'Yahoo Finance API is used without an official API key via the undocumented query1.finance.yahoo.com endpoint. Yahoo\'s Terms of Service may prohibit automated scraping via this endpoint.',
    severity: 'LOW',
    cvss: 2.5,
    affectedAssets: ['src/app/api/stock/[symbol]/route.ts'],
    impact:
      'Potential ToS violation. Yahoo could block access or pursue legal action. No SLA guarantees on data availability or accuracy.',
    remediation:
      'Evaluate official financial data APIs with SLAs: Polygon.io, Finnhub, or Alpha Vantage. All offer free tiers.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'LIC-003',
    title: 'All Dependencies Have Permissive Licenses',
    category: '24. Licensing & Intellectual Property',
    description:
      'All npm dependencies have permissive licenses (MIT, ISC, Apache-2.0). No copyleft (GPL) dependencies detected. No license compliance issues.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['package.json (all dependencies)'],
    impact: 'Positive: No licensing conflicts or copyleft obligations.',
    remediation: 'No action needed. Continue monitoring on dependency updates.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },

  // ── Category 25: Environmental Impact (25.1–25.3) ──────────────────────
  {
    id: 'ENV-001',
    title: 'Hybrid AI Matching Reduces Unnecessary API Calls',
    category: '25. Environmental Impact',
    description:
      'The AI-matching pipeline in check-analyzed runs local keyword matching first, only sending unmatched articles to Claude for AI analysis. This reduces unnecessary AI API calls significantly. The Neon serverless database scales to zero when idle.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: [
      'src/app/api/check-analyzed/route.ts',
      'src/lib/db.ts',
    ],
    impact: 'Positive: Energy-efficient design through local-first processing and serverless architecture.',
    remediation: 'No action needed. Consider batching multiple ticker requests to further reduce API overhead.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },

  // ── Category 26: Scalability Architecture (26.1–26.3) ──────────────────
  {
    id: 'SCALE-002',
    title: 'Adding a New Stock Requires 6+ File Changes',
    category: '26. Scalability Architecture',
    description:
      'Adding a new stock requires changes in 6+ files: stocks.ts, CIK_MAP, IR_URLS, a new component in components/stocks/, new data files in data/, and updating stockComponents in the route page. No plugin or config-driven architecture.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: [
      'src/lib/stocks.ts',
      'src/app/api/edgar/[ticker]/route.ts',
      'src/app/api/press-releases/[symbol]/route.ts',
      'src/app/stocks/[ticker]/page.tsx',
    ],
    impact:
      'High friction for adding new stock coverage. Error-prone process with many manual steps. Easy to miss one file.',
    remediation:
      'Create a stock registration system where adding a new stock only requires creating data files and adding an entry to a central config.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'SCALE-003',
    title: 'No Read-Replica Support for DB',
    category: '26. Scalability Architecture',
    description:
      'Single database connection instance (Neon HTTP). Neon handles concurrency via HTTP pooling, but there is no read-replica support or optimization for read-heavy workloads.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: ['src/lib/db.ts'],
    impact:
      'All reads and writes compete on a single database endpoint. Under high concurrency, read performance degrades.',
    remediation:
      'If needed, configure a Neon read replica for query-heavy endpoints. For current scale, this is acceptable.',
    effort: 'Long-term',
    compliance: [],
    status: 'Accepted Risk',
  },
  {
    id: 'SCALE-004',
    title: 'Full Wipe-and-Reseed Does Not Scale',
    category: '26. Scalability Architecture',
    description:
      'The seed operation deletes all data and re-inserts everything. For a production system with growing data, this becomes increasingly slow and risky.',
    severity: 'MEDIUM',
    cvss: 3.5,
    affectedAssets: [
      'src/app/api/db/setup/route.ts',
      'scripts/seed-database.ts',
    ],
    impact:
      'Seed time grows linearly with data volume. Downtime during reseed increases. Risk of data loss during the delete-insert gap.',
    remediation:
      'Support incremental upsert operations instead of full wipe-and-reseed. Use INSERT ... ON CONFLICT DO UPDATE for idempotent seeding.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 27: Backup & Recovery (27.3) ──────────────────────────────
  {
    id: 'DATA-002',
    title: 'No Data Export Functionality',
    category: '27. Backup & Recovery Mechanisms',
    description:
      'No data export functionality exists. Users cannot export their analysis cache, seen articles/filings, or other accumulated state for backup or migration purposes.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: ['No export API endpoint exists'],
    impact:
      'Users cannot back up their research data. Migration to another system is impossible without direct database access.',
    remediation:
      'Add a data export API endpoint that returns all user data as JSON. Consider adding CSV export for financial data tables.',
    effort: 'Short-term',
    compliance: ['GDPR'],
    status: 'Open',
  },

  // ── Category 28: Monitoring & Analytics (28.2–28.3) ────────────────────
  {
    id: 'MON-002',
    title: 'No User Analytics or Usage Tracking',
    category: '28. Monitoring & Analytics',
    description:
      'No user analytics exists. No way to understand which stocks are most viewed, which features are used, or where users drop off. No engagement metrics.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['Entire application'],
    impact:
      'Product decisions are made without data. Cannot identify underused features or popular content.',
    remediation:
      'Add Vercel Analytics or a privacy-respecting alternative (Plausible, Umami) for basic usage insights.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MON-003',
    title: 'No API Request Timing or Performance Metrics',
    category: '28. Monitoring & Analytics',
    description:
      'No request timing or performance metrics are recorded for API routes. The only logging is console.error for failures. No P50/P95/P99 latency tracking.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['All API routes'],
    impact:
      'Performance regressions go undetected. No baseline for SLA commitments. Cannot identify slow endpoints.',
    remediation:
      'Add basic API request logging middleware with timing metrics. Consider Vercel Speed Insights for automated performance monitoring.',
    effort: 'Short-term',
    compliance: ['SOC2'],
    status: 'Open',
  },

  // ── Category 29: Third-Party Integrations (29.2–29.4) ──────────────────
  {
    id: 'VENDOR-002',
    title: 'No Anthropic API Key Rotation or Usage Tracking',
    category: '29. Third-Party Integrations',
    description:
      'No API key rotation mechanism for Anthropic. If the key is compromised, every endpoint using Claude breaks simultaneously. No usage tracking or budget limits configured.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts',
      'src/app/api/sources/analyze/route.ts',
      'src/app/api/workflow/run/route.ts',
      'src/app/api/check-analyzed/route.ts',
    ],
    impact:
      'Single point of failure for all AI features. Compromised key means unlimited API credit consumption. No spend visibility.',
    remediation:
      'Add Anthropic API usage tracking and budget alerts. Implement key rotation capability with zero-downtime switchover.',
    effort: 'Short-term',
    compliance: ['SOC2'],
    status: 'Open',
  },
  {
    id: 'VENDOR-003',
    title: 'Google News RSS Is Undocumented and Fragile',
    category: '29. Third-Party Integrations',
    description:
      'Google News RSS is an informal/undocumented feed. Google could discontinue or change it at any time. No fallback news source is configured.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/app/api/news/[symbol]/route.ts',
      'src/app/api/competitor-feed/[company]/route.ts',
    ],
    impact:
      'News functionality could break without warning if Google changes or removes the RSS feed.',
    remediation:
      'Add fallback news sources or graceful degradation. Consider official news APIs (NewsAPI, Bing News) as alternatives.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'VENDOR-004',
    title: 'SEC EDGAR Integration Properly Implemented',
    category: '29. Third-Party Integrations',
    description:
      'SEC EDGAR API integration properly implements SEC rate limiting guidelines with a valid User-Agent. Uses revalidate to avoid excessive requests. Follows SEC Fair Access policy.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/app/api/edgar/[ticker]/route.ts'],
    impact: 'Positive: Compliant and well-implemented SEC API integration.',
    remediation: 'No action needed. This is correctly implemented.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },

  // ── Category 30: Code Duplication (30.3–30.4) ──────────────────────────
  {
    id: 'DUP-003',
    title: 'HTML-to-Text Logic Duplicated in Analyze Endpoints',
    category: '30. Code Duplication',
    description:
      'HTML-to-text stripping logic (8 chained regex replacements) is duplicated in both edgar/analyze and sources/analyze routes.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:30-42',
      'src/app/api/sources/analyze/route.ts:32-43',
    ],
    impact:
      'Bug fixes to HTML stripping must be applied in both files. Inconsistencies between copies can cause different analysis quality.',
    remediation:
      'Create src/lib/html-to-text.ts with a shared stripHtml() function. Update both analyze routes to import from the shared module.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'DUP-004',
    title: 'ensureTable() Pattern Duplicated in Two Routes',
    category: '30. Code Duplication',
    description:
      'The ensureTable() pattern with tableVerified flag and isTableMissing() helper is duplicated between seen-articles and seen-filings routes.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:32-69',
      'src/app/api/seen-filings/route.ts:42-80',
    ],
    impact:
      'Bug fixes to table verification must be applied in both files. Inconsistent behavior between the two routes possible.',
    remediation:
      'Create src/lib/ensure-table.ts with a shared ensureTable() utility. Use Drizzle migrations instead to eliminate the pattern entirely.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },

  // ── Category 31: Memory Management (31.1–31.4) ─────────────────────────
  {
    id: 'MEM-001',
    title: 'Short-Lived Object Allocation in Keyword Extraction',
    category: '31. Memory Management',
    description:
      'extractKeywords() creates a Set from split/filter/map operations on every call. For batch processing of many articles, this creates many short-lived objects that increase GC pressure.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: ['src/app/api/check-analyzed/route.ts:40-48'],
    impact:
      'Increased garbage collection overhead during batch article processing. Acceptable for current scale.',
    remediation:
      'Consider memoizing keyword extraction results per article. Low priority unless processing volume increases significantly.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Accepted Risk',
  },
  {
    id: 'MEM-002',
    title: 'Full HTML Document Loaded Before Truncation',
    category: '31. Memory Management',
    description:
      'Large HTML documents (potentially megabytes) are loaded entirely into memory via res.text() before being truncated to 15KB. The initial allocation is wasteful for very large documents.',
    severity: 'LOW',
    cvss: 2.0,
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:28-42',
      'src/app/api/sources/analyze/route.ts:30-43',
    ],
    impact:
      'Unnecessary memory spikes when fetching large SEC filings. Could cause issues under high concurrency.',
    remediation:
      'Check Content-Length header before reading body. For large documents, use streaming with a size limit or fetch with ArrayBuffer and manual truncation.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MEM-003',
    title: 'Large Client Component State in Memory',
    category: '31. Memory Management',
    description:
      'The 2000+ line stock components hold significant state in memory. React\'s reconciliation on these large component trees may cause GC pressure during re-renders.',
    severity: 'LOW',
    cvss: 1.5,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
    ],
    impact:
      'Potential janky re-renders on lower-end devices due to large virtual DOM trees. Users may experience UI lag.',
    remediation:
      'Decompose into smaller sub-components so React can selectively re-render. Use React.memo() for expensive subtrees.',
    effort: 'Medium-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'MEM-004',
    title: 'Module-Level State Safe in Serverless Context',
    category: '31. Memory Management',
    description:
      'Module-level let tableVerified = false persists across requests in non-serverless environments. In serverless (Vercel), each invocation starts fresh, making this harmless.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:32',
      'src/app/api/seen-filings/route.ts:42',
    ],
    impact: 'Positive: No memory leak risk in the target serverless deployment environment.',
    remediation: 'No action needed for Vercel deployment. Document the assumption for non-serverless environments.',
    effort: 'Immediate',
    compliance: [],
    status: 'Accepted Risk',
  },

  // ── Category 32: Threading & Concurrency (32.1–32.2) ───────────────────
  {
    id: 'CONC-002',
    title: 'tableVerified Race Condition in Multi-Instance Deploy',
    category: '32. Threading & Concurrency',
    description:
      'The tableVerified flag is a module-level boolean. In multi-instance deployment, race conditions could cause multiple instances to simultaneously run CREATE TABLE IF NOT EXISTS. The IF NOT EXISTS clause prevents data loss, but the DDL overhead is unnecessary.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/app/api/seen-articles/route.ts:32',
      'src/app/api/seen-filings/route.ts:42',
    ],
    impact:
      'Unnecessary concurrent DDL execution on cold starts in multi-instance environments. No data corruption risk due to IF NOT EXISTS.',
    remediation:
      'Use proper Drizzle migrations instead of runtime DDL to eliminate the race condition entirely.',
    effort: 'Short-term',
    compliance: [],
    status: 'Open',
  },
  {
    id: 'CONC-003',
    title: 'DB Singleton Safe Due to Node.js Single-Thread Model',
    category: '32. Threading & Concurrency',
    description:
      'The _db singleton in db.ts is not thread-safe in theory, but Node.js is single-threaded so this is safe in practice. If the app ever uses worker threads, this would need a mutex.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/lib/db.ts:7-21'],
    impact: 'Positive: Safe under Node.js single-threaded execution model.',
    remediation: 'No action needed. Document the single-thread assumption.',
    effort: 'Immediate',
    compliance: [],
    status: 'Accepted Risk',
  },

  // ── Category 33: File Handling Security (33.1–33.4) ────────────────────
  {
    id: 'FILE-001',
    title: 'Excellent File Handling Security in Workflow/Commit',
    category: '33. File Handling Security',
    description:
      'The workflow/commit endpoint has multiple layers of defense: TICKER_PATTERN (/^[a-z]{2,10}$/) prevents path traversal, SAFE_PATH_PATTERN restricts staged files to src/data/[ticker]/*.ts, execFileSync prevents shell injection, and sanitizeCommitMsg() strips dangerous characters with a 200-char cap. No file upload endpoints exist, eliminating a common attack vector.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: [
      'src/app/api/workflow/commit/route.ts:16-17',
      'src/app/api/workflow/commit/route.ts:18-20',
      'src/app/api/workflow/commit/route.ts:27-32',
    ],
    impact: 'Positive: Defense-in-depth file handling with multiple validation layers.',
    remediation: 'No action needed. File handling security is well-implemented.',
    effort: 'Immediate',
    compliance: ['OWASP-A03'],
    status: 'Resolved',
  },

  // ── Category 34: Compliance with Industry Standards (34.3–34.6) ────────
  {
    id: 'COMP-001',
    title: 'OWASP A10 — Server-Side Request Forgery (SSRF)',
    category: '34. Compliance with Industry Standards',
    description:
      'Per OWASP Top 10 2021 A10:2021, user-supplied URLs are fetched server-side without validation in analyze endpoints. See SEC-004 for details.',
    severity: 'MEDIUM',
    cvss: 5.5,
    cwe: 'CWE-918',
    affectedAssets: [
      'src/app/api/edgar/analyze/route.ts:24',
      'src/app/api/sources/analyze/route.ts:24',
    ],
    impact:
      'Cloud metadata exfiltration, internal service discovery, potential lateral movement within cloud VPC.',
    remediation:
      'Implement URL allowlisting per SEC-004. Validate URL scheme is HTTPS only. Reject private/reserved IP ranges.',
    effort: 'Short-term',
    compliance: ['OWASP-A10'],
    status: 'Open',
  },
  {
    id: 'COMP-002',
    title: 'OWASP A05 — Security Misconfiguration (Headers)',
    category: '34. Compliance with Industry Standards',
    description:
      'Per OWASP Top 10 2021 A05:2021, the application is missing all standard security headers. See NET-001 for details.',
    severity: 'MEDIUM',
    cvss: 5.3,
    cwe: 'CWE-693',
    affectedAssets: ['next.config.ts'],
    impact:
      'Clickjacking, MIME sniffing, referrer leakage, and reduced transport security due to missing security headers.',
    remediation:
      'Add security headers via next.config.ts headers() function per NET-001 recommendations.',
    effort: 'Short-term',
    compliance: ['OWASP-A05'],
    status: 'Open',
  },
  {
    id: 'COMP-003',
    title: 'OWASP A09 — Security Logging & Monitoring Failures',
    category: '34. Compliance with Industry Standards',
    description:
      'Per OWASP Top 10 2021 A09:2021, the application has insufficient logging infrastructure. See MON-001 and ERR-002 for details.',
    severity: 'MEDIUM',
    cvss: 4.0,
    affectedAssets: ['All API routes'],
    impact:
      'Security events go undetected. No audit trail for forensic analysis after an incident.',
    remediation:
      'Implement structured logging per ERR-002. Add Sentry for error tracking per MON-001. Log access control failures.',
    effort: 'Short-term',
    compliance: ['OWASP-A09', 'SOC2'],
    status: 'Open',
  },
  {
    id: 'COMP-004',
    title: 'SOC 2 — Not Applicable but Would Fail All Criteria',
    category: '34. Compliance with Industry Standards',
    description:
      'SOC 2 compliance is not applicable for a personal research tool. However, if evaluation were required, the application would fail all five trust service criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['Entire application'],
    impact: 'Informational: SOC 2 not required for current use case.',
    remediation: 'No action needed unless the tool transitions to a commercial SaaS product.',
    effort: 'Long-term',
    compliance: ['SOC2'],
    status: 'Accepted Risk',
  },

  // ── Category 35: Overall Architectural Soundness (35.1–35.7) ───────────
  {
    id: 'ARCH-001',
    title: 'Next.js App Router Conventions Well-Followed',
    category: '35. Overall Architectural Soundness',
    description:
      'The application follows Next.js App Router conventions well: server components for pages, client components for interactivity, API routes for backend logic. Good separation of concerns at the route level. RESTful conventions followed with consistent JSON error responses.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/app/', 'src/components/', 'src/app/api/'],
    impact: 'Positive: Clean architectural patterns aligned with framework conventions.',
    remediation: 'No action needed. Framework conventions are properly followed.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },
  {
    id: 'ARCH-002',
    title: 'Clean Data Layer Separation',
    category: '35. Overall Architectural Soundness',
    description:
      'Clean separation between layers: src/lib/schema.ts (DB schema), src/data/* (static data), src/lib/seed-helpers.ts (mappers). The Drizzle ORM integration is solid. Database schema is well-normalized with appropriate indexes.',
    severity: 'INFO',
    cvss: 0.0,
    affectedAssets: ['src/lib/schema.ts', 'src/data/', 'src/lib/seed-helpers.ts'],
    impact: 'Positive: Well-organized data layer with clear responsibilities.',
    remediation: 'No action needed. Data layer architecture is well-designed.',
    effort: 'Immediate',
    compliance: [],
    status: 'Resolved',
  },
  {
    id: 'ARCH-003',
    title: 'SOLID Principles — Partial Adherence',
    category: '35. Overall Architectural Soundness',
    description:
      'Single Responsibility: violated by monolithic stock components (see MAINT-001). Open/Closed: adding a new stock requires modifying multiple files (see SCALE-002). Liskov: N/A. Interface Segregation: good — TypeScript interfaces are focused. Dependency Inversion: partial — direct DB imports in routes instead of injected services.',
    severity: 'MEDIUM',
    cvss: 3.0,
    affectedAssets: [
      'src/components/stocks/ASTS.tsx',
      'src/components/stocks/BMNR.tsx',
      'src/components/stocks/CRCL.tsx',
      'src/lib/stocks.ts',
    ],
    impact:
      'Architecture is maintainable at current scale but will become a bottleneck as the application grows. SRP and OCP violations increase maintenance burden.',
    remediation:
      'Break monolithic components per MAINT-001. Create a stock registration system per SCALE-002. Consider a service layer between API routes and the database for testability.',
    effort: 'Long-term',
    compliance: [],
    status: 'Open',
  },
];

// ── Computed Statistics ──────────────────────────────────────────────────────

export function getAuditStats() {
  const total = AUDIT_FINDINGS.length;
  const bySeverity = {
    CRITICAL: AUDIT_FINDINGS.filter(f => f.severity === 'CRITICAL').length,
    HIGH: AUDIT_FINDINGS.filter(f => f.severity === 'HIGH').length,
    MEDIUM: AUDIT_FINDINGS.filter(f => f.severity === 'MEDIUM').length,
    LOW: AUDIT_FINDINGS.filter(f => f.severity === 'LOW').length,
    INFO: AUDIT_FINDINGS.filter(f => f.severity === 'INFO').length,
  };
  const byStatus = {
    Open: AUDIT_FINDINGS.filter(f => f.status === 'Open').length,
    'In Progress': AUDIT_FINDINGS.filter(f => f.status === 'In Progress').length,
    Resolved: AUDIT_FINDINGS.filter(f => f.status === 'Resolved').length,
    'Accepted Risk': AUDIT_FINDINGS.filter(f => f.status === 'Accepted Risk').length,
  };
  const avgCvss = AUDIT_FINDINGS.reduce((sum, f) => sum + f.cvss, 0) / total;
  const maxCvss = Math.max(...AUDIT_FINDINGS.map(f => f.cvss));
  const uniqueCwe = new Set(AUDIT_FINDINGS.filter(f => f.cwe).map(f => f.cwe)).size;
  const uniqueCompliance = new Set(AUDIT_FINDINGS.flatMap(f => f.compliance)).size;

  return { total, bySeverity, byStatus, avgCvss, maxCvss, uniqueCwe, uniqueCompliance };
}
