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
