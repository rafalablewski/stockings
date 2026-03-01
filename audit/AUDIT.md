# Stockings (ABISON) — Unified Audit Report

> Single source of truth for all audit findings, scores, and program definitions.

| Audit | Date | Scope | Status |
|-------|------|-------|--------|
| CCA-1.0 — 35-Category Code Audit | 2026-02-22 | 108 files, 132 structured findings | Active |
| CCA-1.1 — Operational Maturity Assessment | 2026-03-01 | 27-point operational maturity checklist | Active |
| CCA-1.2 — Gap Analysis (10 Missing Findings) | 2026-03-01 | Compound vulnerabilities, HTTP-layer gaps, operational blind spots | Active |
| Financial Model & UX Audit | 2026-02-13 | DCF, Monte Carlo, UI/UX, branding | Historical |
| Formula & Math Audit | 2026-02-13 | RSI, staking, risk factors, technicals | Historical (all fixed) |
| DBV-CP/XR/SC/DF — Database Validation | Ongoing | Per-ticker data quality | Active |

**Platform:** Next.js 16 / TypeScript / Neon PostgreSQL / Drizzle ORM

---

## Table of Contents

**Part I — CCA-1.0: 35-Category Code Audit (2026-02-22)**

1. [Hardcoded Data](#1-hardcoded-data)
2. [Database / API Connections](#2-database--api-connections)
3. [TypeScript Best Practices](#3-typescript-best-practices)
4. [Security Vulnerabilities](#4-security-vulnerabilities)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Data Privacy Compliance](#6-data-privacy-compliance)
7. [Performance Bottlenecks](#7-performance-bottlenecks)
8. [Error Handling & Logging](#8-error-handling--logging)
9. [Code Maintainability](#9-code-maintainability)
10. [Dependency Management](#10-dependency-management)
11. [Testing Coverage](#11-testing-coverage)
12. [Styling Consistency](#12-styling-consistency)
13. [UI/UX Design Flaws](#13-uiux-design-flaws)
14. [Accessibility Compliance](#14-accessibility-compliance)
15. [Internationalization & Localization](#15-internationalization--localization)
16. [Mobile Responsiveness](#16-mobile-responsiveness)
17. [Browser Compatibility](#17-browser-compatibility)
18. [Network Security](#18-network-security)
19. [Input Validation](#19-input-validation)
20. [Output Encoding](#20-output-encoding)
21. [Configuration Management](#21-configuration-management)
22. [Build & Deployment Processes](#22-build--deployment-processes)
23. [Documentation Quality](#23-documentation-quality)
24. [Licensing & Intellectual Property](#24-licensing--intellectual-property)
25. [Environmental Impact](#25-environmental-impact)
26. [Scalability Architecture](#26-scalability-architecture)
27. [Backup & Recovery Mechanisms](#27-backup--recovery-mechanisms)
28. [Monitoring & Analytics](#28-monitoring--analytics)
29. [Third-Party Integrations](#29-third-party-integrations)
30. [Code Duplication](#30-code-duplication)
31. [Memory Management](#31-memory-management)
32. [Threading & Concurrency](#32-threading--concurrency)
33. [File Handling Security](#33-file-handling-security)
34. [Compliance with Industry Standards](#34-compliance-with-industry-standards)
35. [Overall Architectural Soundness](#35-overall-architectural-soundness)

**Appendices**

- [Appendix A — Operational Maturity Assessment (CCA-1.1)](#appendix-a--cca-11-operational-maturity-assessment-27-point)
- [Appendix A-2 — Gap Analysis: 10 Missing Findings (CCA-1.2)](#appendix-a-2--gap-analysis-10-missing-findings-cca-12)
- [Appendix B — Financial Model & UX Audit (Feb 13)](#appendix-b--financial-model--ux-audit)
- [Appendix C — Formula & Math Audit (Feb 13)](#appendix-c--formula--math-audit)
- [Appendix D — Audit Program Registry & Prompts](#appendix-d--audit-program-registry--prompts)

---

## 1. Hardcoded Data

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 1.1 | `src/app/api/edgar/[ticker]/route.ts:6-9` | **Medium** | CIK numbers hardcoded in `CIK_MAP` with only ASTS and BMNR mapped. CRCL is missing entirely, so EDGAR API calls for CRCL will always fail with "No CIK mapping." |
| 1.2 | `src/app/api/press-releases/[symbol]/route.ts:7-11` | **Low** | `IR_URLS` map is hardcoded per ticker. Adding a new stock requires code changes in multiple files. |
| 1.3 | `src/app/api/edgar/[ticker]/route.ts:29-32` | **Low** | SEC User-Agent header (`SEC_HEADERS`) contains a hardcoded email `research@stockings.dev`. SEC requires a valid contact email — if this domain is not active, SEC could block requests. |
| 1.4 | `src/app/api/stock/[symbol]/route.ts:28` | **Low** | Spoofed browser User-Agent for Yahoo Finance API. If Yahoo tightens bot detection, this will silently break. |
| 1.5 | `src/lib/constants.ts:27` | **Low** | `RISK_FREE_RATE = 0.04` is hardcoded. In a changing interest-rate environment this becomes stale. Should be configurable or fetched from an API. |
| 1.6 | `src/app/api/competitor-feed/[company]/route.ts:14-36` | **Low** | `SEARCH_CONFIG` hardcodes ~18 company search queries. Maintenance burden grows linearly with coverage. |
| 1.7 | `src/app/api/edgar/analyze/route.ts:94`, `sources/analyze/route.ts:94`, `check-analyzed/route.ts:302` | **Low** | Claude model IDs (`claude-haiku-4-5-20251001`, `claude-sonnet-4-5-20250929`) are hardcoded in multiple files. Model version upgrades require touching every file. |

### Recommendations

- Extract CIK mappings, IR URLs, and search configs into a centralized data registry (e.g., extend `src/lib/stocks.ts` with per-stock metadata).
- Add the missing CRCL CIK number (`0001876042`) to the `CIK_MAP`.
- Move model IDs to an environment variable or a single constants file (e.g., `AI_MODEL_HAIKU`, `AI_MODEL_SONNET`).
- Consider fetching the risk-free rate from a treasury API or making it an env var.

---

## 2. Database / API Connections

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 2.1 | `src/lib/db.ts:24-28` | **Medium** | The `db` export uses a `Proxy` object that delegates every property access to `getDb()`. This is clever for lazy initialization but makes debugging harder — stack traces won't clearly show the origin. TypeScript also loses full type inference on the proxy. |
| 2.2 | `src/lib/db.ts` | **Low** | No connection pooling configuration. Neon serverless uses HTTP-based queries (stateless), so traditional pooling doesn't apply, but there's no connection timeout or retry logic for transient failures. |
| 2.3 | `src/app/api/seen-articles/route.ts:32-63` & `seen-filings/route.ts:42-74` | **Medium** | Module-level `let tableVerified = false` is used as a per-instance cache for DDL verification. In serverless environments, this flag resets on cold starts. The `ensureTable()` function runs raw DDL on every cold start, adding latency. Drizzle migrations would be more robust. |
| 2.4 | `src/app/api/db/setup/route.ts:188-192` | **Medium** | Raw SQL statements are split on `;` and executed via a workaround `Object.assign([stmt], { raw: [stmt] })` to fake tagged template literals for the Neon driver. This is fragile — any semicolons inside string literals or comments would break parsing. |
| 2.5 | `src/app/api/db/setup/route.ts:196-201` | **High** | `POST /api/db/setup` deletes ALL data from 5 tables unconditionally on every call. There is no authentication, confirmation, or protection against accidental invocation. A single POST wipes the production database. |

### Recommendations

- Protect `/api/db/setup` with an auth check or admin secret key at minimum.
- Replace raw SQL splitting with proper Drizzle migrations (`drizzle-kit generate` + `drizzle-kit migrate`).
- Add retry logic with exponential backoff for transient Neon connection failures in critical API routes.
- Consider adding a health-check endpoint that verifies DB connectivity.

---

## 3. TypeScript Best Practices

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 3.1 | `src/components/stocks/ASTS.tsx:1` | **Medium** | File-wide `eslint-disable @typescript-eslint/no-explicit-any` suppresses all type safety for the entire ~2000+ line component. Same pattern in BMNR.tsx and CRCL.tsx. |
| 3.2 | `src/app/api/db/setup/route.ts:217`, `scripts/seed-database.ts:62` | **Low** | Multiple `as any` casts on `db.insert(table).values(batch as any)` indicate a type mismatch between mapper output and schema insert types. The mappers should return properly typed rows. |
| 3.3 | `src/app/api/edgar/analyze/route.ts:12` | **Low** | `process.env` cast to `Record<string, string \| undefined>` is used as a workaround to prevent Next.js inlining. This is undocumented behavior — a more reliable approach is to use `process.env['ANTHROPIC_API_KEY']` directly or configure `serverRuntimeConfig`. |
| 3.4 | `src/app/api/check-analyzed/route.ts:40` | **Low** | The `stem()` function has a long chain of regex replacements applied sequentially. This is inefficient and produces incorrect stems in many cases (e.g., "press" → "pres" if the `/(ss)$/` rule fails to match before `/s$/`). Consider using a well-tested stemming library. |
| 3.5 | Various data files | **Low** | Numerous `as const` assertions are missing on exported data arrays, losing literal type inference for downstream consumers. |

### Recommendations

- Remove file-wide `eslint-disable` directives and fix the underlying type issues in stock components.
- Type the mapper functions to return the exact Drizzle insert type (e.g., `typeof schema.secFilings.$inferInsert`).
- Use `serverRuntimeConfig` or the `env` field in `next.config.ts` for runtime-only environment variables.
- Replace the custom stemmer with a proven library like `natural` or `stemmer`.

---

## 4. Security Vulnerabilities

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 4.1 | `src/app/api/db/setup/route.ts` | **Critical** | The database setup/seed endpoint is completely unauthenticated. Anyone who discovers the URL can wipe and reseed the entire database with a single POST request. |
| 4.2 | `src/app/api/workflow/commit/route.ts:2` | **High** | This endpoint executes `git commit` via `execFileSync` on the server. While `execFileSync` prevents shell injection, allowing arbitrary git commits from an unauthenticated HTTP request is dangerous — it modifies the server's working directory. |
| 4.3 | `src/app/api/sources/analyze/route.ts:12` | **Medium** | `ANTHROPIC_API_KEY` is accessed via `process.env.ANTHROPIC_API_KEY` directly (not bracket notation), which may cause Next.js to inline the value into client bundles if misconfigured. The `edgar/analyze` route correctly uses bracket notation, but `sources/analyze` does not — inconsistent. |
| 4.4 | `src/app/api/edgar/analyze/route.ts:24-42` & `sources/analyze/route.ts:24-43` | **Medium** | Server-Side Request Forgery (SSRF) risk: The `url` parameter from the request body is fetched without validation. An attacker could supply internal network URLs (e.g., `http://169.254.169.254/latest/meta-data/`) to probe cloud metadata endpoints. |
| 4.5 | `src/app/api/seen-filings/route.ts:133` | **Low** | `JSON.parse(row.crossRefs)` on data from the database. If corrupted data is stored, this will throw an unhandled exception. |

### Recommendations

- **Immediately** add authentication to `/api/db/setup` and `/api/workflow/commit`. At minimum, require a secret token via `Authorization` header.
- Validate that `url` parameters in analyze endpoints match an allowlist of domains (e.g., `sec.gov`, `prnewswire.com`, `businesswire.com`).
- Standardize env var access to bracket notation across all files to prevent build-time inlining.
- Wrap `JSON.parse` calls in try-catch with graceful fallback.

---

## 5. Authentication & Authorization

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 5.1 | All API routes | **Critical** | **No authentication or authorization exists anywhere in the application.** Every API endpoint — including destructive ones like `/api/db/setup` (wipes DB), `/api/workflow/commit` (git commits), and `/api/analysis-cache` (writes to DB) — is publicly accessible. |
| 5.2 | N/A | **High** | No session management, no user accounts, no role-based access control. The app assumes a single trusted user with direct access. |
| 5.3 | N/A | **Medium** | No CSRF protection on POST endpoints. While Next.js API routes don't use cookies by default, if auth is added later without CSRF tokens, the app would be vulnerable. |

### Recommendations

- Implement at minimum API key authentication for all write endpoints (POST/PUT/DELETE).
- For multi-user deployment, add NextAuth.js or Clerk for proper session management.
- Add CSRF protection (e.g., `SameSite` cookies + token-based verification) when authentication is implemented.
- Consider middleware-based auth (`src/middleware.ts`) to protect all `/api/*` routes uniformly.

---

## 6. Data Privacy Compliance

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 6.1 | N/A | **Low** | No privacy policy or terms of service are displayed. The footer says "Not financial advice" but contains no data privacy disclosures. |
| 6.2 | `src/app/globals.css:1` | **Low** | Google Fonts are loaded from `fonts.googleapis.com`, which sends user IP addresses to Google. Under GDPR, this requires consent in the EU (German courts have ruled this constitutes personal data transfer). |
| 6.3 | `src/app/api/seen-articles/route.ts` | **Low** | Article reading history is stored in the DB per ticker. If the app becomes multi-user, this becomes user behavioral data subject to GDPR/CCPA. No data retention policy exists. |

### Recommendations

- Self-host Google Fonts to avoid GDPR issues (use `next/font` built-in functionality).
- Add a privacy policy page if the app is publicly deployed.
- Implement data retention policies with automatic cleanup of old records.

---

## 7. Performance Bottlenecks

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 7.1 | `src/app/api/check-analyzed/route.ts:132-157` | **High** | `getAnalysisData()` queries 4 database tables in parallel on every POST request with no caching. For a ticker with hundreds of entries across tables, this generates 4 concurrent DB round-trips per request. |
| 7.2 | `src/app/api/edgar/[ticker]/route.ts:119-136` | **Medium** | Older SEC filing pages are fetched sequentially via `Promise.allSettled` on every request. For companies with many filing pages, this can add seconds of latency. The 15-minute `revalidate` helps but is insufficient for first-hit performance. |
| 7.3 | `src/app/api/edgar/analyze/route.ts:30-42` & `sources/analyze/route.ts:32-43` | **Medium** | HTML-to-text conversion uses 8 chained regex replacements on potentially large documents (up to 15KB). A streaming HTML parser would be more efficient. |
| 7.4 | `src/components/stocks/ASTS.tsx` (and BMNR, CRCL) | **Medium** | These are monolithic ~2000+ line client components. Even with `ssr: false` and dynamic imports, the browser must parse and execute the entire bundle at once. Code-splitting within the component is absent. |
| 7.5 | `src/app/api/check-analyzed/route.ts:283` | **Low** | Token estimation uses `Math.ceil(prompt.length / 4)` which is a rough heuristic. For prompts near the limit, this could either waste API budget or incorrectly fall back to local matching. |
| 7.6 | `src/app/globals.css:1` | **Low** | External Google Fonts import blocks rendering. Should use `next/font` for optimized font loading. |

### Recommendations

- Add in-memory or Redis caching for `getAnalysisData()` with a short TTL (e.g., 60s).
- Pre-compute and cache EDGAR filing page results in the DB rather than fetching from SEC on every request.
- Split monolithic stock components into lazy-loaded tab sub-components.
- Switch to `next/font` for font loading optimization.

---

## 8. Error Handling & Logging

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 8.1 | All API routes | **Medium** | Error logging uses `console.error` exclusively. In production (Vercel), these go to ephemeral logs with no structured format, no correlation IDs, and no alerting integration. |
| 8.2 | `src/app/api/seen-articles/route.ts:90` | **Medium** | On `ensureTable()` failure, the GET endpoint returns `{ articles: [], _ensureTableError: "..." }` with HTTP 200. This leaks internal error messages to the client and masks failures as success. |
| 8.3 | `src/app/api/edgar/analyze/route.ts:48-49` | **Low** | When SEC document fetch fails, the error message is embedded directly in the AI prompt: `docText = "[Could not fetch document: ...]"`. The AI model will then analyze this error message, producing confusing output. |
| 8.4 | `src/app/api/workflow/run/route.ts:93-95` | **Low** | Unparseable SSE lines are silently dropped in the streaming handler. No logging or error reporting for malformed events. |
| 8.5 | `src/app/api/check-analyzed/route.ts:321-326` | **Low** | When Claude's JSON response can't be parsed, it falls back to an empty array with no indication to the caller that AI matching failed. |

### Recommendations

- Integrate a structured logging library (e.g., Pino) with log levels and correlation IDs.
- Return proper error status codes (5xx) when `ensureTable()` fails instead of masking as 200.
- Remove `_ensureTableError` from public API responses — log it server-side only.
- When document fetch fails, skip AI analysis and return a clear error to the client.

---

## 9. Code Maintainability

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 9.1 | `src/components/stocks/ASTS.tsx`, `BMNR.tsx`, `CRCL.tsx` | **High** | Each stock component is 2000+ lines of monolithic JSX with inline styles, hardcoded financial data, and complex business logic all in one file. These are extremely difficult to maintain or test. |
| 9.2 | `src/app/api/db/setup/route.ts:39-165` | **Medium** | 127 lines of raw SQL DDL duplicated from `src/lib/schema.ts`. Schema changes must be applied in two places or they drift apart. |
| 9.3 | `src/data/prompts.ts` | **Low** | The `prompts` array is empty (`[]`) with a comment "All prompts have been migrated to workflows." This dead export is still imported and rendered on the home page, producing an empty section. |
| 9.4 | `src/components/shared/LivePrice.tsx:183-188` | **Low** | Uses `<style jsx global>` for a single `@keyframes spin` animation. This injects global CSS from a component, which is fragile and can conflict. Should use Tailwind's built-in `animate-spin`. |
| 9.5 | `src/components/shared/SharedEdgarTab.tsx`, `SharedSourcesTab.tsx` | **Low** | These components use extensive inline `style={{}}` objects rather than Tailwind classes, creating an inconsistent styling approach within the same project. |

### Recommendations

- Break each stock component into smaller sub-components per tab/section.
- Use Drizzle's migration system instead of raw SQL in the setup endpoint.
- Remove the dead `prompts` import and empty section from the home page, or remove `prompts.ts` entirely.
- Standardize styling: choose either Tailwind or inline styles, not both.

---

## 10. Dependency Management

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 10.1 | `package.json` | **Low** | All dependencies use caret ranges (`^`), which is normal, but there's no `package-lock.json` integrity verification in CI (no CI exists). |
| 10.2 | `package.json` | **Low** | `dotenv` is listed as a production dependency but is only needed for scripts (`seed`, `validate`) and `drizzle.config.ts`. Next.js handles `.env` files natively. Should be in `devDependencies`. |
| 10.3 | `package.json` | **Low** | `@types/node` is pinned to `^20` but the project uses Next.js 16 which targets Node 22+. This could cause type mismatches. |
| 10.4 | `package.json` | **Info** | No security audit tooling (e.g., `npm audit`, Snyk, Dependabot) is configured. |

### Recommendations

- Move `dotenv` to `devDependencies`.
- Update `@types/node` to match the target Node.js version.
- Add `npm audit` to the CI pipeline (once CI exists).
- Consider adding a Dependabot or Renovate config for automated dependency updates.

---

## 11. Testing Coverage

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 11.1 | Entire project | **High** | **There are zero tests in the entire codebase.** No unit tests, no integration tests, no end-to-end tests. No test runner is configured (no Jest, Vitest, Playwright, or Cypress). |
| 11.2 | `scripts/validate-data.ts` | **Low** | The only validation is a Zod schema check on competitor news data, run manually via `npm run validate`. This is not integrated into the build or any CI pipeline. |

### Recommendations

- Add Vitest or Jest for unit and integration testing.
- Priority test targets: API route handlers, database query logic, `localMatch()` algorithm, `stem()` function, data mappers.
- Add Playwright or Cypress for critical user flows (stock page loading, EDGAR tab interaction).
- Integrate `npm run validate` into the build process.

---

## 12. Styling Consistency

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 12.1 | Various components | **Medium** | Mixed styling approaches: Tailwind utility classes (pages, layout), inline `style={{}}` objects (shared components, stock components), CSS custom properties (globals.css), and `<style jsx global>` (LivePrice). This fragmentation makes theming changes error-prone. |
| 12.2 | `src/app/globals.css:3-5` | **Low** | Tailwind is imported WITHOUT preflight (`@import "tailwindcss/theme"` and `"tailwindcss/utilities"` but not `"tailwindcss/preflight"`). This means browser default styles (margins on headings, list bullets, etc.) are NOT reset — which may cause inconsistencies between browsers. |
| 12.3 | `src/app/globals.css:78-84` | **Low** | Manual re-implementations of Tailwind's `space-y-*` and `gap-*` utilities scoped to `.stock-model-app`. These will drift from Tailwind's actual values if the design system changes. |
| 12.4 | `src/app/db-setup/page.tsx:24-53` | **Low** | The DB setup page uses entirely inline styles with no Tailwind classes, visually inconsistent with the rest of the application. |

### Recommendations

- Establish a single styling standard: either all Tailwind or all CSS variables with utility classes.
- Consider adding Tailwind preflight or a custom reset for consistency.
- Remove manual Tailwind reimplementations in globals.css.

---

## 13. UI/UX Design Flaws

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 13.1 | `src/app/page.tsx:92-98` | **Low** | The "Prompts" section renders an empty array (`prompts: Prompt[] = []`), producing a section header with no content below it. |
| 13.2 | `src/app/stocks/[ticker]/page.tsx:53-68` | **Low** | The stock page uses client-side routing (`useParams`) with `ssr: false` dynamic imports. This means no SEO, no server-side rendering, and a loading spinner on every page visit — even for returning users. |
| 13.3 | `src/app/db-setup/page.tsx` | **Medium** | The database setup page is publicly accessible at `/db-setup` with a single "Run Setup" button that wipes and reseeds the entire database. No confirmation dialog, no authentication. |
| 13.4 | `src/components/shared/LivePrice.tsx:117` | **Low** | Price display uses a dollar sign prefix (`${displayPrice.toFixed(2)}`) hardcoded in JSX. This won't work for non-USD markets. |

### Recommendations

- Remove or hide the empty "Prompts" section on the home page.
- Add a confirmation dialog to the DB setup page ("This will delete all data. Are you sure?").
- Consider server components or ISR for stock pages to improve SEO and initial load time.

---

## 14. Accessibility Compliance

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 14.1 | `src/components/PromptCard.tsx:27-29` | **High** | The entire card is a clickable `<div>` with `onClick`. This is not keyboard accessible — no `tabIndex`, no `role="button"`, no `onKeyDown` handler. Screen readers cannot interact with it. |
| 14.2 | `src/components/PromptCard.tsx:48-55` | **Medium** | Variant selectors use `<span role="button">` which is better, but lack `tabIndex={0}` and `onKeyDown` handlers for keyboard activation. |
| 14.3 | `src/app/layout.tsx:62` | **Medium** | `<html lang="en">` is set, which is good. However, the entire UI uses very low-contrast text (e.g., `text-white/25`, `text-white/20`, `text-white/15`) that likely fails WCAG 2.1 AA contrast requirements (4.5:1 ratio). White at 25% opacity on black is approximately 1.5:1. |
| 14.4 | `src/components/shared/LivePrice.tsx:118-136` | **Medium** | The refresh button has a `title` attribute but no `aria-label`. The SVG icon inside has no accessible text. |
| 14.5 | All stock components | **Medium** | Navigation between tabs and sections likely relies on custom JavaScript without ARIA roles (`tablist`, `tab`, `tabpanel`). |
| 14.6 | `src/app/globals.css:68-71` | **Low** | Custom scrollbar styling removes the native scrollbar appearance, which can confuse users who rely on visible scroll indicators. |

### Recommendations

- Replace clickable `<div>` elements with `<button>` or add proper ARIA attributes + keyboard handlers.
- Audit all text colors against WCAG 2.1 AA standards — increase opacity of body text to at least `text-white/60` (approximate 3:1 for large text) or `text-white/80` (4.5:1 for normal text).
- Add `aria-label` to all icon buttons.
- Implement ARIA `tablist`/`tab`/`tabpanel` roles for stock page tabs.

---

## 15. Internationalization & Localization

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 15.1 | Entire project | **Low** | All text is hardcoded in English. No i18n framework (next-intl, react-intl) is configured. |
| 15.2 | `src/components/shared/LivePrice.tsx:117,168` | **Low** | Currency symbols (`$`) are hardcoded. Number formatting uses `.toFixed(2)` instead of `Intl.NumberFormat`, which won't respect locale-specific decimal separators or currency formatting. |
| 15.3 | `src/app/api/news/[symbol]/route.ts:24` | **Low** | Google News RSS is hardcoded to `hl=en-US&gl=US&ceid=US:en`. International users see only US-localized news. |
| 15.4 | Various date formatting | **Low** | Dates are displayed using `toLocaleTimeString()` and `toISOString()` inconsistently. No standardized date formatting library. |

### Recommendations

- Use `Intl.NumberFormat` for all currency and number displays.
- Use `Intl.DateTimeFormat` or a library like `date-fns` for consistent date formatting.
- If international expansion is planned, adopt `next-intl` for i18n.

---

## 16. Mobile Responsiveness

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 16.1 | `src/app/globals.css:92-131` | **Medium** | Mobile overrides use `!important` on inline style selectors like `[style*="grid-template-columns"]`. This is extremely fragile — it depends on exact style string matching and will break if components change their inline style format. |
| 16.2 | `src/app/layout.tsx:10-14` | **Good** | Viewport meta is properly set with `width: device-width`, `initialScale: 1`, and `maximumScale: 5`. This is correct. |
| 16.3 | `src/app/globals.css:108-112` | **Good** | Touch-friendly minimum button sizes (44px) are enforced on mobile, meeting Apple HIG and WCAG guidelines. |
| 16.4 | Stock components (ASTS, BMNR, CRCL) | **Medium** | Financial data tables with many columns use inline `gridTemplateColumns` with fixed column counts (e.g., `repeat(7, 1fr)`). On mobile, the CSS override forces these to 2 columns, but the data meaning may be lost when the table layout changes dramatically. |

### Recommendations

- Replace `!important` overrides with properly responsive component design using Tailwind breakpoints.
- Redesign financial tables for mobile with a card-based layout instead of forcing grid column changes.
- Test all stock pages on actual mobile devices (iPhone SE, Pixel 5 sizes).

---

## 17. Browser Compatibility

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 17.1 | `src/app/api/stock/[symbol]/route.ts:31` | **Low** | `AbortSignal.timeout()` is used, which requires Node 18+ and modern browsers. Not available in older Safari versions (< 16.4). |
| 17.2 | `src/app/globals.css:68-71` | **Low** | `::-webkit-scrollbar` styling only works in Chromium-based browsers. Firefox uses `scrollbar-width` and `scrollbar-color` instead. |
| 17.3 | `src/components/shared/LivePrice.tsx:183-188` | **Low** | `<style jsx global>` is a Next.js-specific feature (styled-jsx). If the project ever migrates away from Next.js, this would break. |

### Recommendations

- Add Firefox scrollbar styling (`scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent`).
- These are all low-severity given the modern browser baseline expected for a financial research tool.

---

## 18. Network Security

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 18.1 | `next.config.ts` | **Medium** | No security headers are configured. Missing: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`. |
| 18.2 | All API routes | **Medium** | No CORS configuration. The default Next.js behavior allows same-origin requests only, but there are no explicit `Access-Control-*` headers. If the API is consumed by other origins, this will need configuration. |
| 18.3 | `src/app/api/workflow/run/route.ts:107-113` | **Low** | The SSE streaming response doesn't set `X-Content-Type-Options: nosniff`, which could allow MIME type sniffing attacks in older browsers. |
| 18.4 | No `middleware.ts` | **Medium** | No middleware exists to enforce rate limiting. All endpoints can be hammered with unlimited requests. |

### Recommendations

- Add security headers via `next.config.ts` `headers()` function:
  ```js
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  ```
- Add rate limiting middleware (e.g., `@upstash/ratelimit` with Vercel KV).
- Consider a Content Security Policy (CSP) to prevent XSS.

---

## 19. Input Validation

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 19.1 | `src/app/api/edgar/analyze/route.ts:15` & `sources/analyze/route.ts:15` | **High** | Request body is parsed with `await request.json()` but the `url` field is not validated against an allowlist. Any URL — including internal network addresses — is fetched by the server (SSRF). |
| 19.2 | `src/app/api/analysis-cache/route.ts:57` | **Medium** | The `text` field in the POST body is stored directly in the database with no length limit. An attacker could store arbitrarily large strings, filling the database. |
| 19.3 | `src/app/api/seen-articles/route.ts:163-174` | **Low** | Article data from the request body is stored with minimal validation — only `cacheKey` and `headline` are required. Fields like `url`, `source`, `date` accept any string. |
| 19.4 | `src/app/api/workflow/run/route.ts:17` | **Medium** | The `prompt` and `data` fields from the request body are sent directly to the Claude API with no length limits or content filtering. This could be abused for prompt injection attacks or to consume excessive API credits. |
| 19.5 | `src/app/api/stock/[symbol]/route.ts:13` | **Low** | The `interval` query parameter is passed directly to Yahoo Finance without validation against a known list of valid intervals. |

### Recommendations

- Add URL allowlist validation for SSRF-prone endpoints (only allow `sec.gov`, known news domains).
- Add max length validation on all text fields stored in the database (e.g., 100KB limit for analysis text).
- Validate `interval` and `range` query params against known valid values.
- Add prompt length limits for the workflow run endpoint.

---

## 20. Output Encoding

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 20.1 | `src/app/api/news/[symbol]/route.ts:101-108` | **Low** | `decodeHTMLEntities()` only handles 6 named entities. RSS feeds may contain numeric HTML entities (e.g., `&#8217;` for curly quotes) that are not decoded — but this is display-only and React auto-escapes JSX output. |
| 20.2 | `src/app/api/seen-articles/route.ts:136` | **Low** | Error `detail: String(error)` exposes internal error details (including potential stack traces) in the API response. |
| 20.3 | React JSX | **Good** | React's JSX automatically escapes interpolated values, providing strong XSS protection for all rendered content. No `dangerouslySetInnerHTML` usage was found. |

### Recommendations

- Remove `detail: String(error)` from API error responses in production (use only in development).
- The React auto-escaping is sufficient for XSS prevention in rendered content. No critical issues.

---

## 21. Configuration Management

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 21.1 | `.env.example` | **Low** | Only `DATABASE_URL` is documented. `ANTHROPIC_API_KEY`, `DISABLE_AI_MATCHING`, and `MAX_PROMPT_TOKENS` are used in code but not listed in `.env.example`. |
| 21.2 | `src/app/api/check-analyzed/route.ts:195` | **Low** | `MAX_PROMPT_TOKENS` defaults to `40000` if not set. This is a reasonable default but is undocumented. |
| 21.3 | No `.env.local` in `.gitignore` | **Good** | `.gitignore` correctly excludes `.env*.local` files. |

### Recommendations

- Update `.env.example` to document all environment variables:
  ```
  DATABASE_URL=postgresql://...
  ANTHROPIC_API_KEY=sk-ant-...
  DISABLE_AI_MATCHING=false
  MAX_PROMPT_TOKENS=40000
  ```

---

## 22. Build & Deployment Processes

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 22.1 | Entire project | **High** | No CI/CD pipeline exists. No GitHub Actions, no Vercel deployment config, no automated testing, no linting in CI. |
| 22.2 | `package.json:6-13` | **Medium** | `npm run validate` is not part of the `build` script. Data validation is entirely manual and easy to forget. |
| 22.3 | `package.json:12` | **Low** | `npm run seed` uses `npx tsx` which downloads `tsx` on every invocation. Should be in `devDependencies`. |
| 22.4 | No Dockerfile | **Low** | No containerization support. The app is assumed to deploy on Vercel, but no deployment documentation exists. |

### Recommendations

- Add a GitHub Actions workflow for: lint → type-check → validate → build.
- Chain validation into the build script: `"build": "npm run validate && next build"`.
- Add `tsx` to `devDependencies`.

---

## 23. Documentation Quality

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 23.1 | `README.md` | **Medium** | The README is the default Next.js boilerplate. It contains no project-specific documentation — no architecture overview, no setup instructions, no API documentation. |
| 23.2 | API routes | **Good** | API routes have helpful JSDoc comments explaining endpoints, request/response formats, and behavior. |
| 23.3 | `src/components/stocks/ASTS.tsx:1-100` | **Good** | Extensive maintenance protocol documentation in comments, including update procedures and changelog. |
| 23.4 | `AUDIT_REPORT.md`, `COMPREHENSIVE_AUDIT.md`, `UI_UX_FIXES_SUMMARY.md` | **Low** | Previous audit reports exist in the repository root. These should be consolidated or moved to a `/docs` directory. |

### Recommendations

- Replace the boilerplate README with project-specific documentation including: setup, architecture, API reference, deployment.
- Move audit reports to a `/docs` directory.
- Add API documentation (OpenAPI/Swagger) for the 15 API routes.

---

## 24. Licensing & Intellectual Property

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 24.1 | Repository root | **Medium** | No `LICENSE` file exists. Without an explicit license, the code is "all rights reserved" by default, which limits collaboration and open-source contribution. |
| 24.2 | `package.json` | **Low** | All dependencies have permissive licenses (MIT, ISC, Apache-2.0). No copyleft (GPL) dependencies detected. |
| 24.3 | `src/app/api/stock/[symbol]/route.ts` | **Low** | Yahoo Finance API is used without an official API key. Yahoo's Terms of Service may prohibit scraping via the undocumented `query1.finance.yahoo.com` endpoint. |

### Recommendations

- Add a `LICENSE` file (MIT or Apache-2.0 for open source; proprietary notice for private use).
- Evaluate Yahoo Finance ToS compliance. Consider using an official financial data API (Alpha Vantage, Polygon.io, Finnhub).

---

## 25. Environmental Impact

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 25.1 | `src/app/api/check-analyzed/route.ts` | **Low** | The AI-matching pipeline sends potentially large prompts (up to `MAX_PROMPT_TOKENS=40000`) to Claude for every batch of unmatched articles. The local keyword matching is run first (good), reducing unnecessary AI calls. |
| 25.2 | `src/app/api/stock/[symbol]/route.ts:30` | **Good** | 5-minute revalidation cache reduces redundant Yahoo Finance API calls. |
| 25.3 | General | **Low** | Neon serverless PostgreSQL scales to zero when idle, which is energy-efficient. The serverless architecture in general is more environmentally friendly than always-on servers. |

### Recommendations

- The hybrid local-then-AI matching approach in `check-analyzed` is well-designed for efficiency.
- Consider batching multiple ticker analysis requests to reduce API call overhead.
- No significant environmental concerns.

---

## 26. Scalability Architecture

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 26.1 | `src/lib/stocks.ts` | **Medium** | Adding a new stock requires changes in 6+ files: `stocks.ts`, `CIK_MAP`, `IR_URLS`, a new component in `components/stocks/`, new data files in `data/`, and updating `stockComponents` in the route page. No plugin or config-driven architecture. |
| 26.2 | `src/lib/db.ts` | **Low** | Single database connection instance (Neon HTTP). Neon handles concurrency via HTTP connection pooling on their end, but there's no read-replica support or connection-level optimization for read-heavy workloads. |
| 26.3 | `src/app/api/db/setup/route.ts` | **Medium** | The seed operation deletes all data and re-inserts everything. For a production system with growing data, this becomes increasingly slow and risky. Should support incremental updates. |
| 26.4 | No caching layer | **Medium** | No application-level caching (Redis, Vercel KV, in-memory). Every database query and external API call is re-executed on each request (with only Next.js `revalidate` for external fetches). |

### Recommendations

- Create a stock registration system where adding a new stock only requires creating data files and adding an entry to a central config.
- Add a caching layer (Vercel KV or Upstash Redis) for frequently-accessed data.
- Support incremental data updates instead of full wipe-and-reseed.

---

## 27. Backup & Recovery Mechanisms

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 27.1 | Entire project | **High** | No backup strategy exists for the Neon database. The `/api/db/setup` endpoint can wipe all data, and there's no way to recover unless Neon's built-in point-in-time recovery (PITR) is configured. |
| 27.2 | `src/app/api/db/setup/route.ts` | **High** | No soft-delete or backup-before-wipe logic. The DELETE statements are unconditional. |
| 27.3 | N/A | **Medium** | No data export functionality. Users cannot export their analysis cache, seen articles/filings, or other accumulated state. |

### Recommendations

- Enable Neon's point-in-time recovery (PITR) feature.
- Add a backup step to the setup endpoint (export current data before wiping).
- Add a data export API endpoint.

---

## 28. Monitoring & Analytics

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 28.1 | Entire project | **Medium** | No monitoring integration. No Sentry for error tracking, no Datadog/New Relic for APM, no Vercel Analytics. |
| 28.2 | Entire project | **Low** | No user analytics. No way to understand which stocks are most viewed, which features are used, or where users drop off. |
| 28.3 | API routes | **Low** | No request timing or performance metrics are recorded. The only logging is `console.error` for failures. |

### Recommendations

- Add Sentry for error tracking (Next.js has a first-party `@sentry/nextjs` SDK).
- Add Vercel Analytics or a similar tool for performance monitoring.
- Add basic API request logging middleware with timing metrics.

---

## 29. Third-Party Integrations

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 29.1 | Yahoo Finance API (`stock/[symbol]/route.ts`) | **Medium** | Uses an undocumented Yahoo Finance API endpoint (`query1.finance.yahoo.com`). This endpoint has no SLA, no rate limit documentation, and can change or break without notice. Rate limit handling exists (429 detection) but no automatic backoff. |
| 29.2 | Anthropic Claude API (multiple routes) | **Medium** | No API key rotation mechanism. If the key is compromised, every endpoint using Claude breaks simultaneously. No usage tracking or budget limits. |
| 29.3 | SEC EDGAR API (`edgar/[ticker]/route.ts`) | **Good** | Properly implements SEC rate limiting guidelines with a valid User-Agent. Uses `revalidate` to avoid excessive requests. |
| 29.4 | Google News RSS (multiple routes) | **Low** | Google News RSS is an informal/undocumented feed. Google could discontinue or change it at any time. No fallback news source. |

### Recommendations

- Consider switching to an official financial data API with an SLA (Polygon.io, Finnhub, Alpha Vantage).
- Add Anthropic API usage tracking and budget alerts.
- Implement exponential backoff for all external API calls on 429/5xx responses.
- Add fallback news sources or graceful degradation.

---

## 30. Code Duplication

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 30.1 | `src/app/api/news/[symbol]/route.ts:101-108` & `press-releases/[symbol]/route.ts:21-29` & `competitor-feed/[company]/route.ts:44-52` | **Medium** | `decodeHTMLEntities()` is copy-pasted identically in 3 files. Should be extracted to a shared utility. |
| 30.2 | `src/app/api/news/[symbol]/route.ts:51-68` & `press-releases/[symbol]/route.ts:63-88` & `competitor-feed/[company]/route.ts:73-94` | **Medium** | RSS XML parsing logic (regex-based item extraction) is duplicated across 3 files with minor variations. Should be a shared `parseRSS()` utility. |
| 30.3 | `src/app/api/edgar/analyze/route.ts:30-42` & `sources/analyze/route.ts:32-43` | **Low** | HTML-to-text stripping logic is duplicated in both analyze endpoints. |
| 30.4 | `src/app/api/seen-articles/route.ts:32-69` & `seen-filings/route.ts:42-80` | **Medium** | The `ensureTable()` pattern with `tableVerified` flag and `isTableMissing()` helper is duplicated between these two files. Should be a shared utility. |
| 30.5 | `scripts/seed-database.ts` & `src/app/api/db/setup/route.ts` | **High** | The entire seed logic is duplicated — once as a CLI script and once as an API route. Both import the same data and call the same mappers. Should share a common `seedAll()` function. |

### Recommendations

- Create `src/lib/rss.ts` with shared `parseRSS()` and `decodeHTMLEntities()`.
- Create `src/lib/html-to-text.ts` for the HTML stripping logic.
- Create `src/lib/ensure-table.ts` for the shared table verification pattern.
- Refactor seed logic into `src/lib/seed.ts` used by both the script and API route.

---

## 31. Memory Management

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 31.1 | `src/app/api/check-analyzed/route.ts:40-48` | **Low** | `extractKeywords()` creates a Set from split/filter/map operations on every call. For batch processing of many articles, this creates many short-lived objects. Acceptable for current scale but could be memoized. |
| 31.2 | `src/app/api/edgar/analyze/route.ts:28-42` | **Low** | Large HTML documents (potentially megabytes) are loaded entirely into memory via `res.text()` before being truncated to 15KB. The truncation helps, but the initial allocation is wasteful. |
| 31.3 | `src/components/stocks/ASTS.tsx` (and BMNR, CRCL) | **Low** | These massive client components likely hold significant state in memory. React's reconciliation on these large component trees may cause GC pressure during re-renders. |
| 31.4 | `src/app/api/seen-articles/route.ts:32` & `seen-filings/route.ts:42` | **Low** | `let tableVerified = false` is module-level state that persists across requests in non-serverless environments. In serverless (Vercel), it's harmless as each invocation starts fresh. |

### Recommendations

- For HTML stripping, consider a streaming approach or fetch with a size limit (`Content-Length` check before reading body).
- Memory management is generally adequate for the current scale. No critical leaks detected.

---

## 32. Threading & Concurrency

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 32.1 | `src/app/api/seen-articles/route.ts:32` & `seen-filings/route.ts:42` | **Medium** | The `tableVerified` flag is a module-level boolean. In a multi-instance deployment, race conditions could cause multiple instances to simultaneously run `CREATE TABLE IF NOT EXISTS`. The `IF NOT EXISTS` clause prevents data loss, but the DDL overhead is unnecessary. |
| 32.2 | `src/lib/db.ts:7-21` | **Low** | The `_db` singleton is not thread-safe in theory, but Node.js is single-threaded so this is safe in practice. If the app ever uses worker threads, this would need a mutex. |
| 32.3 | `src/app/api/db/setup/route.ts:197-201` | **Medium** | The seed operation (DELETE all → INSERT all) is not wrapped in a transaction. If the process crashes mid-seed, the database could be left in a partially seeded state with missing data. |

### Recommendations

- Wrap the seed operation in a database transaction.
- Use proper Drizzle migrations instead of runtime DDL to eliminate the `tableVerified` race condition.

---

## 33. File Handling Security

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 33.1 | `src/app/api/workflow/commit/route.ts:16-17` | **Good** | Path traversal is properly prevented with `TICKER_PATTERN = /^[a-z]{2,10}$/` and `SAFE_PATH_PATTERN = /^src\/data\/[a-z]{2,10}\/[\w.-]+\.ts$/`. Only files matching these strict patterns can be committed. |
| 33.2 | `src/app/api/workflow/commit/route.ts:18-20` | **Good** | `execFileSync` is used instead of `exec`/`execSync`, which prevents shell injection as arguments are passed as an array. |
| 33.3 | `src/app/api/workflow/commit/route.ts:27-32` | **Good** | `sanitizeCommitMsg()` strips backticks, dollar signs, and backslashes, and limits to ASCII printable characters with a 200-char cap. |
| 33.4 | No file upload endpoints | **Good** | The application does not accept file uploads, eliminating a common attack vector. |

### Recommendations

- File handling security is well-implemented. The `workflow/commit` endpoint has multiple layers of defense. No issues found.

---

## 34. Compliance with Industry Standards

### Issues Found

| # | Location | Severity | Description |
|---|----------|----------|-------------|
| 34.1 | OWASP Top 10 — A01: Broken Access Control | **Critical** | All API endpoints are publicly accessible with no authentication (see Analysis #5). |
| 34.2 | OWASP Top 10 — A07: Identification/Auth Failures | **Critical** | No authentication mechanism exists (see Analysis #5). |
| 34.3 | OWASP Top 10 — A10: SSRF | **Medium** | User-supplied URLs are fetched server-side without validation (see Analysis #19). |
| 34.4 | OWASP Top 10 — A05: Security Misconfiguration | **Medium** | Missing security headers (see Analysis #18). |
| 34.5 | OWASP Top 10 — A09: Security Logging | **Medium** | Insufficient logging infrastructure (see Analysis #8). |
| 34.6 | SOC 2 | **Low** | Not applicable for a personal research tool, but would fail all SOC 2 trust service criteria if evaluation were required. |

### Recommendations

- Address OWASP A01 and A07 as the highest priority (add authentication).
- Address SSRF via URL allowlisting.
- Add security headers and structured logging.

---

## 35. Overall Architectural Soundness

### Issues Found

| # | Aspect | Assessment |
|---|--------|------------|
| 35.1 | **Pattern Adherence** | The app follows Next.js App Router conventions well. Server components for pages, client components for interactivity, API routes for backend logic. Good separation of concerns at the route level. |
| 35.2 | **Data Layer** | Clean separation: `src/lib/schema.ts` (DB schema), `src/data/*` (static data), `src/lib/seed-helpers.ts` (mappers). The Drizzle ORM integration is solid. |
| 35.3 | **Component Architecture** | Mixed. Shared components (`SharedEdgarTab`, `SharedSourcesTab`, etc.) are well-extracted. But the three stock components (ASTS, BMNR, CRCL) are monolithic and violate SRP. |
| 35.4 | **API Design** | RESTful conventions followed. GET for reads, POST for writes. Consistent JSON error responses. Good use of `Promise.allSettled` for parallel external calls with fallback. |
| 35.5 | **SOLID Principles** | **S** (Single Responsibility): Violated by monolithic stock components. **O** (Open/Closed): Adding a new stock requires modifying multiple files. **L** (Liskov): N/A. **I** (Interface Segregation): Good — TypeScript interfaces are focused. **D** (Dependency Inversion): Partial — direct DB imports in routes instead of injected services. |
| 35.6 | **Hybrid AI Architecture** | The local-keyword-matching → AI-fallback pattern in `check-analyzed` is thoughtful — it reduces cost and latency while maintaining accuracy. This is a well-designed architecture. |
| 35.7 | **Schema Design** | Database schema is well-normalized with appropriate indexes. The `partnerNews` table serves as a polymorphic table (via `entryType`) which is pragmatic for the current scale. |

### Recommendations

- Break monolithic stock components into smaller, composable pieces.
- Create a stock registration system to make adding new stocks declarative rather than imperative.
- Consider adding a service layer between API routes and the database for testability.

---

## Executive Summary

### Critical Issues (Require Immediate Attention)

| # | Issue | Impact |
|---|-------|--------|
| C1 | **No authentication on any API endpoint** | Anyone can wipe the database, commit code, or consume AI credits |
| C2 | **Unprotected `/api/db/setup` endpoint** | A single POST request deletes all production data |
| C3 | **Zero test coverage** | No safety net for regressions; high risk for any code change |

### High-Severity Issues

| # | Issue | Impact |
|---|-------|--------|
| H1 | Unprotected `/api/workflow/commit` allows arbitrary git commits | Server code integrity risk |
| H2 | No CI/CD pipeline | No automated quality gates |
| H3 | SSRF via unvalidated URLs in analyze endpoints | Internal network probing risk |
| H4 | No database backup strategy | Data loss risk |
| H5 | Duplicated seed logic across CLI script and API route | Maintenance burden, divergence risk |
| H6 | Monolithic 2000+ line stock components | Extremely difficult to maintain or test |

### Medium-Severity Issues (14 total)

Missing security headers, no rate limiting, fragile CSS overrides, inconsistent styling approach, no monitoring/alerting, no caching layer, hardcoded model IDs, exposed error details in API responses, unprotected DB seed endpoint, fragile raw SQL parsing, no transaction wrapping for seeds, module-level state race conditions, OWASP A05/A10 findings, inadequate WCAG contrast ratios.

### Low-Severity Issues (25+ total)

Hardcoded constants, missing i18n, empty prompts section, no license file, dead code, Firefox scrollbar styling, inconsistent env var documentation, and various minor code quality items.

### What's Done Well

- **SEC EDGAR integration**: Properly follows SEC API guidelines with appropriate User-Agent and rate limiting.
- **Hybrid AI matching**: The local-keyword → AI-fallback architecture is cost-effective and resilient.
- **File handling security**: The `workflow/commit` endpoint has excellent defense-in-depth (regex validation, `execFileSync`, commit message sanitization).
- **Database schema design**: Well-normalized with appropriate indexes and the Drizzle ORM integration is clean.
- **Graceful degradation**: API routes consistently handle missing API keys with fallback behavior rather than crashing.
- **Lazy DB initialization**: The Proxy-based lazy init prevents build failures when `DATABASE_URL` isn't available.
- **Data validation**: Zod schemas for competitor data, with a dedicated validation script.

### Recommended Priority Order

1. **Add authentication** to all write endpoints (especially `/api/db/setup` and `/api/workflow/commit`)
2. **Add URL validation** to analyze endpoints to prevent SSRF
3. **Set up CI/CD** with lint → type-check → build
4. **Add basic test coverage** for critical API routes and business logic
5. **Add security headers** via `next.config.ts`
6. **Deduplicate code** (RSS parsing, HTML stripping, seed logic, ensureTable)
7. **Break up monolithic components** into maintainable sub-components
8. **Add monitoring** (Sentry + Vercel Analytics)
9. **Update README** with proper documentation
10. **Add rate limiting** middleware

---

## Appendix A — CCA-1.1: Operational Maturity Assessment (27-Point)

**Date:** 2026-03-01
**Methodology:** A 27-point operational maturity checklist was evaluated against the codebase, covering secret management, observability, deployment practices, environment isolation, data protection, and access control. Each control was verified through static analysis and configuration review. Verdicts use the standard traffic-light system:

| Verdict | Meaning |
|---------|---------|
| **GUILTY** | The codebase exhibits this anti-pattern |
| **NOT GUILTY** | The codebase does NOT exhibit this anti-pattern |
| **PARTIAL** | Partially applies — some mitigations exist but gaps remain |

Cross-references to existing CCA-1.0 findings (e.g., `SEC-001`, `DOC-001`) are provided where applicable.

---

### 1. Credential Management — Hardcoded Secrets in Source

**Verdict: NOT GUILTY**

All API keys and secrets (`ANTHROPIC_API_KEY`, `DATABASE_URL`, `AUTH_PIN`) are loaded from environment variables at runtime. No actual credentials are hardcoded in source code or committed to git. The `.gitignore` properly excludes all `.env*` files. Only `.env.example` exists in the repo with placeholder values.

**Minor issue:** Inconsistent `process.env` access pattern — `sources/analyze` and `notes/generate` use direct `process.env.ANTHROPIC_API_KEY` which risks Next.js build-time inlining, while other routes use safe bracket notation. See existing finding **SEC-005** (CVSS 6.5).

---

### 2. Service Health Verification — Dedicated Health Endpoint

**Verdict: GUILTY**

No `/health`, `/healthz`, `/status`, or `/ping` endpoint exists. There is no way to programmatically verify that the application is running, that the database is connected, or that external dependencies (Anthropic API, Yahoo Finance, SEC EDGAR) are reachable. Monitoring tools and load balancers have no lightweight endpoint to probe.

**New finding: VIBE-001** | Severity: MEDIUM | CVSS: 4.0

---

### 3. Schema Governance — Versioned Database Migrations

**Verdict: GUILTY**

Drizzle ORM is installed and the schema is defined in `src/lib/schema.ts`, but **no migration directory exists** (`/drizzle/` and `/migrations/` are both empty or absent). Schema changes are pushed directly via `npm run db:push` (Drizzle push mode) which modifies the database without versioned migration files. Additionally, the `/api/db/setup` route contains 127 lines of raw SQL DDL that duplicates the Drizzle schema — changes in one are easily forgotten in the other.

**Cross-refs:** DB-003, DB-004, DUP-001, MAINT-002

---

### 4. Query Discipline — Explicit Column Selection

**Verdict: NOT GUILTY**

The application uses Drizzle ORM for all database queries. Drizzle's `.select()` generates SQL with explicit column names, not `SELECT *`. No raw `SELECT *` queries were found anywhere in the codebase. Query patterns are well-structured with proper `.where()` clauses.

---

### 5. Error Handling — Structured Logging and Recovery

**Verdict: GUILTY**

All API routes rely exclusively on `console.error()` for error logging. In production on Vercel, these produce ephemeral, unstructured logs with no correlation IDs, no severity levels, and no alerting integration. Multiple routes leak internal error details (`String(error)`) to clients including stack traces and database connection info. The `edgar/analyze` route embeds error messages directly into AI prompts when fetches fail, producing nonsensical "analysis" of error text.

**Cross-refs:** ERR-001 (CVSS 5.3), ERR-002 (CVSS 4.0), ERR-003, ERR-004, ERR-005

---

### 6. Rate Limiting — Throttling on Authentication and Write Endpoints

**Verdict: GUILTY**

Zero rate limiting exists on any endpoint. All 15+ API routes can be called at unlimited frequency. The AI-powered endpoints (`/api/edgar/analyze`, `/api/sources/analyze`, `/api/workflow/run`, `/api/check-analyzed`) forward requests to the paid Anthropic API with no throttling. The `/api/db/setup` endpoint can wipe the entire database with unlimited POST requests. A basic PIN-based auth middleware exists but only protects 2 of 15+ routes.

**Cross-refs:** NET-002 (CVSS 5.9), SEC-001, SEC-002

---

### 7. Temporal Consistency — Standardized Timezone Handling

**Verdict: PARTIAL**

Date handling is inconsistent across the codebase:
- API routes use `new Date().toISOString()` (UTC — correct) for some timestamps
- `Date.now()` (epoch ms — timezone-agnostic) used for backup filenames and cache timestamps
- `new Date(pubDate).toISOString().split('T')[0]` for date-only strings (correct)
- Client-side uses `toLocaleTimeString()` (local timezone, varies by browser/OS)
- No timezone library (moment, dayjs, luxon) is used
- No explicit UTC enforcement policy

No critical timezone bugs were found, but the lack of a standardized approach creates drift risk.

**Cross-refs:** I18N-001, I18N-003

---

### 8. Onboarding Documentation — Repository README Completeness

**Verdict: GUILTY**

`README.md` is the verbatim default Next.js `create-next-app` boilerplate. Zero project-specific content: no architecture overview, no setup instructions, no environment variable documentation, no API reference, no deployment guide. A new developer cannot onboard without oral knowledge transfer.

**Cross-ref:** DOC-001 (CVSS 2.0)

---

### 9. Environment Isolation — Staging Tier Existence

**Verdict: GUILTY**

No staging environment exists. A single `DATABASE_URL` environment variable is used with no environment-specific configuration. No `.env.staging`, no `NEXT_PUBLIC_API_URL` branching, no Vercel Preview environment documentation. The application has two implicit modes: "local dev" and "whatever Vercel does" — there is no documented or configured staging tier.

**New finding: VIBE-002** | Severity: MEDIUM | CVSS: 3.5

---

### 10. Component Architecture — Single Responsibility Adherence

**Verdict: GUILTY**

Three god components dominate the codebase:
- `BMNR.tsx` — **7,426 lines** (single React component)
- `ASTS.tsx` — **6,824 lines** (single React component)
- `CRCL.tsx` — **5,848 lines** (single React component)

Each contains all tabs, all financial calculations, all state management, all inline styles, and all rendering logic in a single monolithic file. Total: **20,098 lines** across 3 files. These are among the largest React components ever audited. Each disables eslint with file-wide `@typescript-eslint/no-explicit-any` suppression.

Additional large components: `StockChart.tsx` (2,339 lines), `SharedEdgarTab.tsx` (2,059 lines), `SharedSourcesTab.tsx` (1,903 lines).

**Cross-refs:** MAINT-001 (CVSS 6.0), TS-001 (CVSS 4.0), PERF-004 (CVSS 3.5)

---

### 11. Product Analytics — Usage Measurement and Telemetry

**Verdict: GUILTY**

Zero analytics integration. No Google Analytics, no Vercel Analytics, no Mixpanel, no PostHog, no Plausible, no Umami. No way to measure page views, feature usage, user engagement, or drop-off points. Product decisions are made without data.

**Cross-ref:** MON-002 (CVSS 1.5)

---

### 12. Technical Debt Management — Backlog Tracking and Remediation

**Verdict: PARTIAL**

No explicit `TODO`, `FIXME`, or `HACK` comments were found in application source code (only in audit/workflow template strings). However, the audit itself catalogues 128 findings — most with status "Open" — representing a significant backlog of known technical debt. The existence of a `PLAN.md` (605-line 10-phase refactoring plan) that has not been executed yet is further evidence of deferred cleanup.

---

### 13. Configuration Documentation — Environment Variable Registry

**Verdict: GUILTY**

`.env.example` documents only 2 of 5+ environment variables used in code:
- **Documented:** `DATABASE_URL`, `AUTH_PIN`
- **Undocumented:** `ANTHROPIC_API_KEY` (required for AI features), `DISABLE_AI_MATCHING` (optional), `MAX_PROMPT_TOKENS` (optional, defaults to 40000)

The README provides zero guidance on environment setup. Knowledge of required env vars requires reading source code.

**Cross-refs:** CONF-001, CONF-002

---

### 14. API Abstraction — Backend Proxy for Third-Party Services

**Verdict: NOT GUILTY**

All third-party API calls (Anthropic Claude, Yahoo Finance, SEC EDGAR, Google News RSS) are routed through backend API routes in `src/app/api/`. The frontend only communicates with its own `/api/*` endpoints. A shared `auth-fetch.ts` wrapper handles authenticated requests from client components. This is the correct architecture — no API keys are exposed to the browser.

---

### 15. Observability — Production Monitoring and Alerting Infrastructure

**Verdict: GUILTY**

Zero monitoring infrastructure. No Sentry (error tracking), no Datadog/New Relic (APM), no Vercel Analytics/Speed Insights, no custom alerting. No uptime monitoring. No P50/P95/P99 latency tracking. The only "monitoring" is ephemeral `console.error` output in Vercel logs (which auto-purge). Production errors are completely invisible.

**Cross-refs:** MON-001 (CVSS 4.0), MON-003 (CVSS 1.5), COMP-003

---

### 16. Log Persistence — Durable, Structured Log Aggregation

**Verdict: GUILTY**

All logging uses `console.log` / `console.error` / `console.warn`. On Vercel, these produce ephemeral, unstructured logs in the Functions tab that are not persistent, not searchable, and not alertable. No structured logging library (Pino, Winston), no correlation IDs, no log levels, no JSON formatting for machine parsing. Debugging production issues requires real-time log tailing.

**Cross-refs:** ERR-002 (CVSS 4.0), COMP-003

---

### 17. Data Protection — Backup Strategy and Restore Verification

**Verdict: GUILTY**

No backup strategy exists for the Neon PostgreSQL database. The only "backup" is Neon's managed PITR (Point-in-Time Recovery), but it has never been documented, configured, or tested. The `/api/db/setup` endpoint can wipe all 5 core tables with a single unauthenticated POST. The seed operation is not wrapped in a transaction — a crash mid-seed leaves the database in a partially populated state. No data export API exists. The file-level `.bak` files from `workflow/apply` are local-only and not database backups.

**Cross-refs:** DATA-001 (CVSS 7.5), DATA-002 (CVSS 3.0), CONC-001 (CVSS 5.5)

---

### 18. Release Control — Feature Flag Infrastructure

**Verdict: PARTIAL**

No formal feature flag system exists (no LaunchDarkly, Unleash, or even env-var flags). However, the codebase does NOT use the anti-pattern of commenting code in/out. There is a single runtime gate mechanism (`src/lib/ai-gate.ts`) that disables AI features via an `x-ai-disabled` header. This is not a feature flag system — it's a kill switch with no progressive rollout, targeting, or A/B testing capability.

**New finding: VIBE-003** | Severity: LOW | CVSS: 2.0

---

### 19. Deployment Pipeline — Automated Build and Release Process

**Verdict: GUILTY**

No CI/CD pipeline exists. No `.github/workflows/` directory, no GitHub Actions, no Jenkinsfile, no automated build/test/deploy. The application deploys to Vercel automatically on push (Vercel's default git integration), but with zero quality gates — no lint check, no type check, no data validation, no test suite. The `db:push` command runs from a developer's local machine. Database seeding is done via `npm run seed` locally.

**Cross-refs:** CICD-001 (CVSS 7.0), CICD-002, CICD-003, CICD-004

---

### 20. Input Validation — Server-Side Request Schema Enforcement

**Verdict: PARTIAL**

Input validation is minimal but not entirely absent:
- **Present:** Ticker validation against `VALID_TICKERS` enum, basic field existence checks, `SAFE_PATH_PATTERN` regex for git operations, commit message sanitization
- **Missing:** No Zod schemas on API request bodies (only on static data files), unbounded `TEXT` storage in analysis cache, unvalidated prompt length in workflow/run, unvalidated Yahoo Finance interval parameter, no URL allowlisting on analyze endpoints (SSRF risk)

The Zod validation library is installed but only used for offline data validation scripts, not for runtime API request validation.

**Cross-refs:** INP-001 (CVSS 5.3), INP-002 (CVSS 5.9), INP-003, INP-004, SEC-004 (CVSS 7.5)

---

### 21. Cross-Origin Policy — CORS Configuration Review

**Verdict: NOT GUILTY**

CORS is NOT set to `*`. No explicit CORS configuration exists — the application relies on Next.js default same-origin behavior, which blocks cross-origin requests. While the lack of explicit CORS headers is documented (NET-003), it defaults to the secure option (deny cross-origin) rather than the insecure wildcard.

**Cross-ref:** NET-003 (Accepted Risk)

---

### 22. Continuous Integration — Automated Quality Gates

**Verdict: GUILTY**

Zero CI/CD infrastructure. No GitHub Actions, no automated linting, no type-checking, no data validation in the build process. The `npm run validate` script (Zod schema checks) is not wired into `npm run build`. A pre-commit hook (`scripts/check-docs.sh`) exists for documentation freshness but does not run tests, lint, or type-check. Code is deployed with zero automated quality assurance.

**Cross-refs:** CICD-001 (CVSS 7.0), CICD-002, QA-001 (CVSS 8.0), QA-002

---

### 23. Secret Isolation — Per-Environment Credential Separation

**Verdict: PARTIAL**

There is no staging environment (see #9), so the question is moot in the narrow sense. However, there is no mechanism for API key rotation or environment-specific key management. A single `ANTHROPIC_API_KEY` is shared across all contexts where the app runs. No key rotation capability exists. If the key is compromised, every AI endpoint breaks simultaneously.

**Cross-ref:** VENDOR-002 (CVSS 4.0)

---

### 24. Knowledge Distribution — Bus Factor and Runbook Coverage

**Verdict: GUILTY**

The README is default boilerplate. Environment variables are undocumented. There is no architecture overview, no deployment guide, no API reference. The database setup procedure requires knowing about `/api/db/setup` or `npm run seed`. The 605-line `PLAN.md` references internal decisions without context. Knowledge of how to run, configure, and deploy the application exists only in the head of the original developer.

**Cross-refs:** DOC-001 (CVSS 2.0), CONF-001, CICD-004

---

### 25. Secret Exposure — Client-Side Credential Leakage Review

**Verdict: NOT GUILTY**

No API keys, JWT secrets, or credentials are present in client-side code. No `.env` files are committed to git (`.gitignore` blocks `.env*`). All secrets are loaded from server-side `process.env` at runtime. The `src/lib/auth-fetch.ts` wrapper only sends a PIN header (not API keys) from the client. Git history shows no prior credential commits. No JWT implementation exists in the codebase (authentication is PIN-based via middleware).

---

### 26. Data Access Control — Row-Level Security and API Authentication

**Verdict: PARTIAL**

The application uses Neon PostgreSQL (not Supabase/Firebase), so there is no public REST API endpoint like `/rest/v1/`. However, the Neon database has **no Row Level Security (RLS)** policies. More critically, all API routes that read/write the database have no authentication (only 2 routes are PIN-protected via middleware). The `/api/db/setup` endpoint can wipe the entire database with an unauthenticated POST. The `/api/analysis-cache` endpoint allows arbitrary writes. This is functionally equivalent to an exposed database — any HTTP client can read and write all data.

**Cross-refs:** SEC-001 (CVSS 9.8), SEC-002 (CVSS 9.1), OWASP-001 (CVSS 9.8)

---

### 27. Production Diagnostics — Logging Infrastructure Beyond Console Output

**Verdict: GUILTY**

This is a duplicate of #16, confirmed across the full codebase. The only logging mechanisms are `console.log()`, `console.error()`, and `console.warn()`. Zero structured logging libraries. Zero log persistence. Zero alerting. Zero request tracing. The `workflow/apply` route has the most logging (8+ console.log calls for debugging file operations) but even these are ephemeral on serverless.

**Cross-refs:** ERR-002 (CVSS 4.0), MON-001 (CVSS 4.0), COMP-003 (CVSS 4.0)

---

### Operational Maturity Scorecard

| # | Control | Verdict | Severity |
|---|---------|---------|----------|
| 1 | Credential management — hardcoded secrets | **PASS** | — |
| 2 | Service health verification endpoint | **FAIL** | Medium |
| 3 | Schema governance — versioned migrations | **FAIL** | Medium |
| 4 | Query discipline — explicit column selection | **PASS** | — |
| 5 | Error handling — structured logging and recovery | **FAIL** | High |
| 6 | Rate limiting on authentication and writes | **FAIL** | High |
| 7 | Temporal consistency — timezone standardization | **PARTIAL** | Low |
| 8 | Onboarding documentation — README completeness | **FAIL** | Low |
| 9 | Environment isolation — staging tier | **FAIL** | Medium |
| 10 | Component architecture — single responsibility | **FAIL** | High |
| 11 | Product analytics — usage telemetry | **FAIL** | Low |
| 12 | Technical debt management — backlog tracking | **PARTIAL** | Medium |
| 13 | Configuration documentation — env var registry | **FAIL** | Low |
| 14 | API abstraction — backend proxy for third parties | **PASS** | — |
| 15 | Observability — monitoring and alerting | **FAIL** | High |
| 16 | Log persistence — durable aggregation | **FAIL** | High |
| 17 | Data protection — backup and restore verification | **FAIL** | High |
| 18 | Release control — feature flag infrastructure | **PARTIAL** | Low |
| 19 | Deployment pipeline — automated build and release | **FAIL** | High |
| 20 | Input validation — server-side schema enforcement | **PARTIAL** | High |
| 21 | Cross-origin policy — CORS configuration | **PASS** | — |
| 22 | Continuous integration — automated quality gates | **FAIL** | Critical |
| 23 | Secret isolation — per-environment credentials | **PARTIAL** | Medium |
| 24 | Knowledge distribution — bus factor and runbooks | **FAIL** | Medium |
| 25 | Secret exposure — client-side credential leakage | **PASS** | — |
| 26 | Data access control — RLS and API authentication | **PARTIAL** | Critical |
| 27 | Production diagnostics — logging infrastructure | **FAIL** | High |

### Summary

| Verdict | Count |
|---------|-------|
| **FAIL** | 16 / 27 (59%) |
| **PARTIAL** | 6 / 27 (22%) |
| **PASS** | 5 / 27 (19%) |

**Operational Maturity Score: 19 / 27 controls deficient (70%)**

The application satisfies fundamental controls for secret management (#1, #25), API abstraction (#14), query discipline (#4), and cross-origin policy (#21). However, it fails decisively across operational maturity domains: no CI/CD pipeline, no production monitoring, no structured logging, no staging environment, no onboarding documentation, and monolithic component architecture. The security posture is mixed — credentials are properly externalized but the database is functionally exposed due to insufficient authentication coverage across API endpoints.

---

## Appendix A-2 — Gap Analysis: 10 Missing Findings (CCA-1.2)

**Date:** 2026-03-01
**Methodology:** Cross-referenced the full codebase against CCA-1.0 (35 categories) and CCA-1.1 (27-point vibe-code check) to identify compound vulnerabilities, HTTP-layer gaps, and operational blind spots not covered by either audit. Each finding is either net-new or a compound issue that connects two separately-documented findings into a higher-severity result.

---

### 1. PIN Authentication Is Brute-Forceable (Compound Vulnerability)

**Severity: High** | **CVSS: 7.5** | **New Finding: GAP-001**

The middleware (`src/middleware.ts:9-16`) uses constant-time comparison (good), but there is **no rate limiting or lockout** on PIN-protected routes or `/api/auth/verify-pin`. An attacker can brute-force the `x-auth-pin` header at unlimited speed. For a short numeric PIN, this is trivially crackable.

The audit notes "no rate limiting" (NET-002, CVSS 5.9) and "PIN-based auth" (5.2) separately, but never connects them: **the combination of a weak auth factor + zero rate limiting = no effective authentication on the 2 protected routes**.

| Factor | Status |
|--------|--------|
| Rate limiting on PIN attempts | **Missing** |
| Account lockout after N failures | **Missing** |
| Exponential backoff | **Missing** |
| PIN complexity requirements | **Unknown** (env var, no enforcement) |

**Cross-refs:** NET-002, SEC-001, AUTH-002

**Recommendations:**
- Add rate limiting middleware (e.g., `@upstash/ratelimit`) on all `/api/*` routes, with aggressive limits (5 req/min) on auth-related endpoints.
- Consider replacing the PIN with a proper auth token (JWT or session cookie) after initial PIN verification.
- Add an account lockout or exponential delay after 5 failed PIN attempts.

---

### 2. No Request Body Size Limits (Net-New)

**Severity: Medium** | **CVSS: 5.3** | **New Finding: GAP-002**

All 15 `request.json()` call sites across API routes accept arbitrarily large POST bodies. Next.js App Router in serverless mode has no built-in body size limit. A 500MB JSON payload could exhaust serverless function memory before any field-level validation runs.

| Route | `request.json()` call | Size check |
|-------|-----------------------|------------|
| `POST /api/analysis-cache` | `route.ts:57` | **None** |
| `POST /api/seen-articles` | `route.ts:151` | **None** |
| `POST /api/seen-filings` | `route.ts:163` | **None** |
| `POST /api/workflow/run` | `route.ts:20` | **None** |
| `POST /api/workflow/apply` | `route.ts:359` | **None** |
| `POST /api/workflow/commit` | `route.ts:37` | **None** |
| `POST /api/edgar/analyze` | `route.ts:19` | **None** |
| `POST /api/sources/analyze` | `route.ts:19` | **None** |
| `POST /api/check-analyzed` | `route.ts:268` | **None** |
| `POST /api/notes` | `route.ts:91` | **None** |
| `POST /api/notes/generate` | `route.ts:20` | **None** |
| `POST /api/audit-checks` | `route.ts:104` | **None** |
| `POST /api/edgar/refresh-local` | `route.ts:20` | **None** |
| `POST /api/auth/verify-pin` | `route.ts:26` | **None** |
| `PATCH /api/notes` | `route.ts:148` | **None** |

The existing finding INP-002 (unbounded `text` field in analysis-cache) covers the *storage* angle but not the *parsing/memory exhaustion* angle that affects every route.

**Recommendations:**
- Add a shared middleware or utility that checks `Content-Length` before parsing:
  ```typescript
  const MAX_BODY = 1_000_000; // 1MB
  const len = parseInt(request.headers.get('content-length') || '0', 10);
  if (len > MAX_BODY) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  ```
- Set per-route limits where appropriate (e.g., 10KB for `/api/auth/verify-pin`, 1MB for `/api/workflow/apply`).

---

### 3. No Content-Type Validation on POST Routes (Net-New)

**Severity: Low-Medium** | **CVSS: 3.5** | **New Finding: GAP-003**

None of the 15 POST endpoints validate that the incoming `Content-Type` is `application/json` before calling `request.json()`. If a request arrives with `Content-Type: text/plain` or `multipart/form-data`, `request.json()` will throw an unhandled exception that leaks error details in the response.

**Affected:** Every POST/PATCH route in `src/app/api/`.

**Recommendations:**
- Add shared validation in middleware or a utility:
  ```typescript
  const ct = request.headers.get('content-type');
  if (!ct?.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
  }
  ```

---

### 4. Unvalidated JSON.parse on Scraped External Content (Net-New)

**Severity: Medium** | **CVSS: 4.5** | **New Finding: GAP-004**

The existing finding 4.5 catches `JSON.parse(row.crossRefs)` on DB data, but several other `JSON.parse` calls operate on untrusted external content without try/catch:

| Location | Source of data | try/catch |
|----------|---------------|-----------|
| `press-releases/[symbol]/route.ts:149` | `JSON.parse(jsonMatch[1])` on scraped IR HTML | **No** |
| `workflow/run/route.ts:97` | `JSON.parse(jsonStr)` on Anthropic SSE stream | Yes |
| `workflow/apply/route.ts:556` | `JSON.parse(jsonStr)` on AI-generated content | Yes |
| `notes/generate/route.ts:83` | `JSON.parse(rawText.trim())` on Claude response | Yes |

The press-releases route is the critical gap — it parses JSON embedded in scraped investor relations pages. If an IR page changes format, this throws an unhandled exception that crashes the request and leaks error details.

**Cross-refs:** SEC-005, ERR-002

**Recommendations:**
- Wrap the `JSON.parse` in `press-releases/[symbol]/route.ts:149` in try/catch with a graceful fallback.
- Add a shared `safeParse()` utility for all external JSON parsing.

---

### 5. No robots.txt or Crawl Control (Net-New)

**Severity: Low** | **CVSS: 2.5** | **New Finding: GAP-005**

No `robots.txt`, no `sitemap.xml`, no metadata-based crawl directives exist. Search engines can discover and index all pages, including `/db-setup` — which has a "Run Setup" button that wipes the entire database with a single POST. Combined with the unauthenticated destructive endpoint (SEC-001), search engine indexing makes this page more discoverable to attackers.

**Recommendations:**
- Add `src/app/robots.ts` (Next.js metadata API):
  ```typescript
  export default function robots() {
    return {
      rules: { userAgent: '*', disallow: ['/api/', '/db-setup'] },
    };
  }
  ```
- Add `noindex` meta tag to `/db-setup` page as defense-in-depth.

---

### 6. No Subresource Integrity (SRI) for External Resources (Net-New)

**Severity: Low** | **CVSS: 2.0** | **New Finding: GAP-006**

Google Fonts are loaded via `@import` in `src/app/globals.css:1` from `fonts.googleapis.com`. The audit flags the GDPR angle (finding 6.2) but not the **supply chain risk**: if Google's CDN is compromised or DNS-hijacked, malicious CSS could be injected. No SRI hashes are used anywhere in the application.

The existing recommendation to switch to `next/font` (findings 7.6, 6.2) would also solve this issue, since `next/font` self-hosts font files.

**Cross-refs:** PRIV-002, PERF-006

**Recommendations:**
- Switch to `next/font` (already recommended — this adds a security rationale alongside the GDPR and performance rationales).

---

### 7. Source Maps Not Explicitly Disabled in Production (Net-New)

**Severity: Low** | **CVSS: 2.0** | **New Finding: GAP-007**

`next.config.ts` is essentially empty — `productionBrowserSourceMaps` is not set. Next.js defaults to not shipping *browser* source maps, but server-side source maps are generated. On Vercel, server source maps could aid attackers in understanding code paths if error stack traces are leaked (which they are — see ERR-002).

**Recommendations:**
- Explicitly disable in `next.config.ts`:
  ```typescript
  const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
  };
  ```
- While browser source maps are off by default, being explicit prevents accidental enablement.

---

### 8. No Idempotency on Write Endpoints (Net-New)

**Severity: Low** | **CVSS: 2.0** | **New Finding: GAP-008**

POST endpoints like `/api/analysis-cache`, `/api/seen-articles`, and `/api/seen-filings` have no idempotency protection. Network retries or double-clicks can create duplicate records. The analysis-cache route uses `onConflictDoUpdate` (good), but seen-articles and seen-filings use bulk inserts with `onConflictDoNothing` — meaning partial duplicates are silently dropped, which could mask data integrity issues.

The audit covers concurrency at the database/thread level (Category 32) but not at the HTTP request level.

**Recommendations:**
- Add idempotency keys (client-generated UUID in request header) for critical write endpoints.
- Or add client-side deduplication with debounced submit buttons.

---

### 9. db:push Runs Against Production Without Safeguards (Net-New)

**Severity: Medium** | **CVSS: 5.0** | **New Finding: GAP-009**

`package.json` exposes `"db:push": "npx drizzle-kit push"` which directly mutates the production schema when `DATABASE_URL` points to production. Drizzle's push mode can silently drop columns, alter types, or remove indexes on the live database with no migration file, no confirmation prompt, and no rollback capability.

The audit covers the *lack of migrations* (CCA-1.1 #3) but doesn't flag that `db:push` itself is an active footgun — it's not just a missing best practice, it's a one-command path to production data loss.

**Cross-refs:** CCA-1.1 #3, DB-003, DB-004

**Recommendations:**
- Replace `db:push` with `drizzle-kit generate` + `drizzle-kit migrate` for versioned migrations.
- If `db:push` is retained for development, add a guard script:
  ```bash
  if [[ "$DATABASE_URL" == *"neon.tech"* ]]; then
    echo "ERROR: db:push blocked against production. Use migrations."
    exit 1
  fi
  ```

---

### 10. No Graceful Shutdown / Request Draining (Info)

**Severity: Info** | **CVSS: N/A** | **New Finding: GAP-010**

Serverless (Vercel) handles request draining automatically, so this is a non-issue today. However, `PLAN.md` discusses a potential migration off Vercel. If the app moves to a long-running server (Docker, EC2, etc.), there is no `process.on('SIGTERM')` handler, no graceful shutdown logic, and no request draining. In-flight database writes or AI API calls would be abruptly terminated.

**Recommendations:**
- No action needed while on Vercel.
- If migrating to a long-running server, add a shutdown handler that finishes in-flight requests before exiting.

---

### Gap Analysis Scorecard

| # | Finding | Severity | Type | CVSS |
|---|---------|----------|------|------|
| GAP-001 | PIN brute-forceable (compound: NET-002 + AUTH-002) | **High** | Compound | 7.5 |
| GAP-002 | No request body size limits | **Medium** | Net-new | 5.3 |
| GAP-003 | No Content-Type validation on POST routes | **Low-Medium** | Net-new | 3.5 |
| GAP-004 | Unvalidated JSON.parse on scraped HTML | **Medium** | Net-new | 4.5 |
| GAP-005 | No robots.txt (destructive pages indexable) | **Low** | Net-new | 2.5 |
| GAP-006 | No SRI on external resources | **Low** | Net-new | 2.0 |
| GAP-007 | Source maps not explicitly disabled | **Low** | Net-new | 2.0 |
| GAP-008 | No idempotency on write endpoints | **Low** | Net-new | 2.0 |
| GAP-009 | db:push runs against production unsafely | **Medium** | Net-new | 5.0 |
| GAP-010 | No graceful shutdown (info — Vercel handles) | **Info** | Net-new | N/A |

### Summary

| Category | Count |
|----------|-------|
| **High** | 1 |
| **Medium** | 3 |
| **Low-Medium** | 1 |
| **Low** | 4 |
| **Info** | 1 |
| **Total** | **10** |

**Compound finding GAP-001 is the most critical**: it connects two separately-documented findings (weak auth factor + no rate limiting) into a vulnerability that neither finding addresses alone. The PIN-protected routes (`/api/edgar/analyze`, `/api/sources/analyze`) are effectively unprotected.

**Net-new findings GAP-002 and GAP-009 are the next priority**: body size limits protect against memory exhaustion across all POST routes, and `db:push` is a one-command path to production data loss.

---
---

# Appendices

---

## Appendix B — Financial Model & UX Audit

**Date:** February 13, 2026
**Scope:** Full-stack code review, financial model verification, UI/UX audit, consistency analysis
**Overall Score: 7.8 / 10**

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Consistency & Branding | 8.5/10 | 15% | 1.28 |
| Content & Writing | 8.0/10 | 10% | 0.80 |
| Financial Logic & Math | 8.5/10 | 25% | 2.13 |
| UI/UX & Architecture | 8.0/10 | 15% | 1.20 |
| Visual Design | 9.0/10 | 10% | 0.90 |
| Code Quality | 6.0/10 | 15% | 0.90 |
| Professional Polish | 7.5/10 | 10% | 0.75 |
| **TOTAL** | | **100%** | **7.96** |

## 1. OVERALL CONSISTENCY & BRANDING

### 1.1 Cross-Stock Structural Consistency

| Finding | Severity | Location |
|---------|----------|----------|
| All three models share identical Unified Model Maintenance Protocol header comments | **Praise** | ASTS.tsx:34-113, BMNR.tsx:62-141, CRCL.tsx:30-109 |
| Shared `stock-model-styles.ts` provides unified CSS with accent color variants (cyan/violet/mint) | **Praise** | stock-model-styles.ts:1-1690 |
| ASTS version is 2.1.0, BMNR is 2.5.0, CRCL is 1.1.0 -- inconsistent versioning scheme | **Low** | ASTS.tsx:23, BMNR.tsx:17, CRCL.tsx:18 |
| ASTS has 15+ tabs, BMNR has 15 tabs, CRCL has a different tab composition -- tab parity is not fully achieved | **Medium** | All three model files |
| Header comment style differs: ASTS uses `/** */` block, BMNR uses `/* */`, CRCL uses `//` style for the "MUST DO" banner | **Cosmetic** | ASTS.tsx:1-17, BMNR.tsx:1-60, CRCL.tsx:1-12 |

**Recommendation:** Synchronize version numbering across all three models (e.g., all 2.x.y). Ensure CRCL adopts the same `/** */` comment style for the "MUST DO" banner as ASTS and BMNR for visual consistency.

### 1.2 Terminology Consistency

| Finding | Severity | Location |
|---------|----------|----------|
| All three models use identical `UpdateSource` type (`'PR' | 'SEC' | 'WS' | 'MARKET'`) | **Praise** | ASTS.tsx:199, BMNR.tsx:249, CRCL.tsx:167 |
| All three define identical `RATING_NORMALIZATION` map for analyst ratings | **Praise** | ASTS.tsx:296-312, BMNR.tsx:343-358, CRCL.tsx:229-245 |
| Identical `LEGAL_DISCLAIMERS` text across all three models | **Praise** | ASTS.tsx:340-343, BMNR.tsx:393-396, CRCL.tsx:273-276 |
| "EV/EBITDA" terminology is consistent across models | **Praise** | Throughout |
| ASTS uses "bull case" / "bear case" while CRCL scenarios use "Bull" / "Bear" / "Moon" / "Worst" naming | **Low** | ASTS.tsx SCENARIO_PRESETS vs CRCL SCENARIO_SIMULATIONS |

### 1.3 Date/Number Formatting

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS data freshness: `'2026-02-12'` ISO format | **Praise** | src/data/asts/company.ts:31 |
| BMNR data freshness: `'2026-02-12'` ISO format | **Praise** | src/data/bmnr/company.ts:31 |
| CRCL data freshness: `'2025-12-31'` -- notably older than ASTS/BMNR | **Medium** | src/data/crcl/company.ts:29 |
| Currency formatting: ASTS uses `$2,780M` style in comments, `$96.92` for prices | **Praise** | src/data/asts/company.ts:79 |
| All three use millions (M) for shares, billions (B) for enterprise value | **Praise** | Throughout |
| CRCL stock price `$80.05` is dated Dec 31, 2025 -- 6+ weeks stale | **High** | src/data/crcl/company.ts:67 |

**Recommendation:** Update CRCL data to Feb 2026 to match ASTS and BMNR freshness. This stale data is a significant consistency gap.

---

## 2. CONTENT & WRITING QUALITY

### 2.1 Grammar, Spelling, Punctuation

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS.tsx line 152: "2025 Creative Professional Design (CRCL-Style UI/UX)" -- references another stock's style in ASTS file header | **Low** | ASTS.tsx:152 |
| BMNR.tsx line 235: "2025 Creative Professional Design (CRCL-Style UI/UX)" -- same cross-reference issue | **Low** | BMNR.tsx:235 |
| All disclaimer text is grammatically correct and professionally written | **Praise** | LEGAL_DISCLAIMERS across all files |
| AI Agent instruction blocks in data files are clear, well-structured, and actionable | **Praise** | All data/*.ts files |

### 2.2 Professional Tone & Balance

| Finding | Severity | Location |
|---------|----------|----------|
| BMNR changelog uses specific metrics: "4.285M ETH, $10.7B total, staking hits 2.897M (67.6%)" -- data-driven, not hyperbolic | **Praise** | BMNR.tsx:22 |
| CRCL "Moon" scenario projects USDC at $2,850B by 2035 and share price of $7,834 | **High** | CRCL.tsx:576-615 |
| CRCL "Moon" scenario assumes 53% stablecoin market share and $99.8B gross revenue by 2035 | **High** | CRCL.tsx:577 |
| ASTS "Moon" scenario uses 10% penetration rate -- aggressive but labeled as such | **Medium** | ASTS.tsx SCENARIO_PRESETS |
| All models include both bull AND bear cases with explicit risk catalysts | **Praise** | All three models |
| Footer disclaimer: "Not financial advice" is present | **Praise** | layout.tsx:49 |

**Recommendation:** The CRCL "Moon" scenario ($2,850B USDC, $7,834/share) strains credibility. Total stablecoin market was ~$220B in late 2025. Projecting $5,400B+ total market (2,850B / 53%) by 2035 would require stablecoins to exceed M2 money supply of several G7 nations. Consider capping at more defensible levels or adding explicit caveats about the extreme nature of this scenario.

### 2.3 Sourcing & Factual Accuracy

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS data explicitly cites "8-K Feb 11, 2026", "424B5", "DEF 14A" filings | **Praise** | ASTS.tsx:176-184 |
| BMNR data cites "CIK: 0001829311", "EIN: 84-3986354" -- SEC-verifiable | **Praise** | BMNR.tsx:39-44 |
| CRCL data cites "Q3 2025 10-Q (Nov 12, 2025)" | **Praise** | src/data/crcl/company.ts:30 |
| ASTS debt rate of 2.15% weighted average is documented with breakdown | **Praise** | src/data/asts/company.ts:82 |
| BMNR uses CESR rate of 3.11% for staking APY -- verifiable on-chain | **Praise** | BMNR.tsx model defaults |

---

## 3. FINANCIAL LOGIC, MATHEMATICS & CALCULATIONS

### 3.1 DCF Models (All Three Stocks)

#### ASTS DCF (Lines 3795-3896)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Terminal Subscribers | `partnerReach * (penetrationRate/100) * (1 - competitionDiscount/100)` | Correct: 3,200M * 3% * 80% = 76.8M subs | **Praise** |
| Terminal Gross Revenue | `terminalSubs * blendedARPU * 12 / 1000` | Correct: M * $/mo * 12 / 1000 = $B | **Praise** |
| Revenue Share | `terminalGrossRev * (revenueShare / 100)` | Correct | **Praise** |
| Terminal EBITDA | `terminalRev * (terminalMargin / 100)` | Correct | **Praise** |
| Terminal FCF | `terminalRev * ((terminalMargin - terminalCapex) / 100)` | Simplified -- ignores taxes, working capital | **Medium** |
| Gordon Growth TV | `terminalFCF / spread` where `spread = discount - growth` | Correct; protected with `spread > 0.01` | **Praise** |
| PV Discount | `terminalEV / (1 + r)^n` | Correct | **Praise** |
| Risk Factor | `(1 - reg/100) * (1 - tech/100) * (1 - comp/100)` | Assumes independent risks (documented) | **Medium** |
| Equity Value | `riskAdjustedEV - netDebtB` | Correct; properly handles net cash | **Praise** |
| Target Price | `(equityValue * 1000) / dilutedShares` | Correct unit conversion: $B*1000/M = $/share | **Praise** |

**Issue F3.1a -- FCF Simplification:**
In ASTS.tsx line ~3821: `const terminalFCF = terminalRev * ((terminalMargin - terminalCapex) / 100);`
This treats FCF as Revenue * (EBITDA margin% - CapEx%) which ignores taxes (~21% federal) and working capital. For a pre-revenue company this is acceptable as a rough model, but should be labeled clearly.

**Fix:** Add comment: `// Simplified: ignores taxes and working capital. For refined model, use: EBITDA * (1 - taxRate) + D&A * taxRate - CapEx - deltaWC`

#### BMNR DCF (Lines 4354-4405)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Compound ETH | `eth += eth * (APY/100)` per year | Correct annual compounding | **Praise** |
| Future ETH Price | `ethPrice * (1 + growth%)^y` | Correct CAGR formula | **Praise** |
| NAV per share | `(eth * futurePrice) / (shares * 1e6)` | Correct: ETH * $/ETH / total_shares | **Praise** |
| PV per share | `nav / (1 + discount%)^y` | Correct standard DCF | **Praise** |
| CF per share | `(yieldETH * price) * (payout%) / (shares * 1e6)` | Correct | **Praise** |
| Terminal Value | `finalNAV * terminalMultiple` | Correct terminal NAV approach | **Praise** |
| IRR | `(impliedValue / currentNAV)^(1/years) - 1` | Correct | **Praise** |

**Verdict:** BMNR DCF is mathematically sound. All unit conversions verified correct.

#### CRCL DCF (Lines 1373-1441)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Gross Revenue | `USDC_circ * (reserveYield / 100)` | Correct: $62.5B * 4% = $2.5B | **Praise** |
| Net Revenue | `grossRev * (1 - distributionCost/100)` | Correct | **Praise** |
| EBITDA | `netRev * (operatingMargin/100)` | Correct | **Praise** |
| FCF | `EBITDA * 0.85` (85% conversion) | Reasonable for asset-light business | **Praise** |
| Gordon Growth TV | `terminalFCF / (discount - growth)` | Correct; protected with `spread > 0.01` | **Praise** |
| Hardcoded net debt | `netDebt = 0.2` ($200M) | Should be configurable | **Medium** |
| Target Price | `(equityValue * 1000) / terminalShares` | Correct unit conversion | **Praise** |

**Issue F3.1b -- Hardcoded Debt/Cash in CRCL Monte Carlo:**
In CRCL.tsx line ~3280: `res.push(safe((pv + 1349 - 149) / MARKET.shares));`
The values 1349 and 149 are hardcoded magic numbers representing cash and debt adjustments in millions. These should be extracted to named constants or imported from `company.ts`.

### 3.2 Monte Carlo Simulations

#### ASTS Monte Carlo (Lines 4333-4475)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| Box-Muller | `sqrt(-2*ln(u)) * cos(2*pi*v)` | Standard algorithm, rejection for log(0) | **Praise** |
| Log-normal factor | `exp(-0.5*sigma^2 + sigma*Z)` | Correct: E[factor] = 1 (mean-preserving) | **Praise** |
| Operating leverage | -15% margin if revenue < $2B, -5% if < $4B | Economically sound | **Praise** |
| Multiple compression | -4x if revenue < $2B, -2x if < $4B, floor at 4x | Sound | **Praise** |
| Sharpe Ratio | `(avgReturn - riskFreeRate) / stdDev` | Correct | **Praise** |
| Sortino Ratio | Uses `negativeReturns.length` instead of `n` for denominator | Biases downside dev estimate | **Medium** |

**Issue F3.2a -- Sortino Ratio Denominator (ASTS):**
In ASTS.tsx line ~4443: `negativeReturns.reduce((...), 0) / negativeReturns.length`
Standard Sortino should use all returns but only square downside deviations. Current approach divides by the subset size, biasing the downside deviation upward.

**Fix:**
```typescript
const downsideVariance = returns.reduce((a, r) => a + (r < riskFreeRate ? Math.pow(r - riskFreeRate, 2) : 0), 0) / n;
```

#### BMNR Monte Carlo -- GBM (Lines 4715-4783)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| GBM Price | `price * exp((mu + yield - slash - op - 0.5*sigma^2)*dt + sigma*sqrt(dt)*z)` | Correct Ito's lemma correction | **Praise** |
| NAV Multiple Mean Reversion | `mult * exp(kappa*(mult-1)*dt + m_sigma*sqrt(dt)*z)` bounded [0.3, 2.5] | Correct log-normal mean reversion | **Praise** |
| Correlated normals | Uses Cholesky decomposition for (z1, z2) | Correct | **Praise** |
| VaR/CVaR | 5th percentile and average of bottom 5% | Correct | **Praise** |

**Verdict:** BMNR's GBM Monte Carlo is the most sophisticated of the three. Implementation is mathematically sound.

#### CRCL Monte Carlo (Lines 3251-3321)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| Box-Muller | `sqrt(-2*ln(u)) * cos(2*pi*v)` | Correct | **Praise** |
| Revenue growth | Normal distribution: `mean + z * std` where std = (max-min)/4 | Reasonable parametric assumption | **Praise** |
| Reserve rate | Uniform [3%, 5%] via `3 + Math.random() * 2` | Different distribution than growth -- should document why | **Low** |
| Terminal value | `rldcY * 1000 * multiple` | Correct | **Praise** |
| Sharpe/Sortino | Both implemented | Correct | **Praise** |

**Issue F3.2b -- Mixed Distribution Types (CRCL):**
Revenue growth uses normal distribution (Box-Muller), but the reserve rate uses uniform distribution (`3 + Math.random() * 2`). This mixing is not inherently wrong but should be documented.

### 3.3 Scenario Projection Verification (CRCL)

**BASE Scenario 2025:**
- USDC: $80B, Reserve Rate: 4.0%
- Expected Gross Revenue: 80 * 4% = $3.2B -- **MATCHES** field `grossRevenue: 3.2`
- Distribution Cost: $1.7B -- implies 53.1% distribution rate (field says `rldcMargin: 39`)
- Net Revenue: 3.2 - 1.7 = $1.5B -- **MATCHES** field `netRevenue: 1.5`
- RLDC Margin: 1.5/3.2 = 46.9% -- **DOES NOT MATCH** field `rldcMargin: 39`

**Issue F3.3a -- CRCL RLDC Margin Inconsistency:**
In CRCL.tsx BASE scenario 2025: `rldcMargin: 39` but `netRevenue / grossRevenue = 1.5/3.2 = 46.9%`. The `rldcMargin` field appears to represent something different (possibly RLDC as % of gross rev minus distribution only, or net income margin). This creates confusion for anyone reading the raw data.

**Severity: High** -- Financial metric definitions must be unambiguous in investor-facing content.

**BASE Scenario 2035 verification:**
- USDC: $680B, Rate: 3.0%
- Gross Revenue: 680 * 3% = $20.4B -- **MATCHES** `grossRevenue: 20.4`
- Distribution: $9.2B (45.1%) -- distribution cost improving from 53% to 45%
- Net Revenue: 20.4 - 9.2 = $11.2B -- **MATCHES** `netRevenue: 11.2`
- EBITDA: $4.20B -- `ebitda / netRevenue = 37.5%` -- reasonable operating margin
- Share Price: $882 -- `equityValue: 202, shares: ~229M, 202B*1000/229 = $882` -- **MATCHES**

### 3.4 Technical Indicator Calculations (StockChart.tsx)

| Indicator | Status | Notes |
|-----------|--------|-------|
| RSI (Wilder's smoothing) | **Fixed & Correct** | Uses `prevAvgGain/prevAvgLoss` state variables properly |
| SMA | **Correct** | Standard simple moving average |
| EMA | **Correct** | Standard exponential moving average with 2/(n+1) multiplier |
| Bollinger Bands | **Correct** | Population standard deviation (appropriate per Bollinger's definition) |
| VWAP | **Correct** | `sum(TP*Vol) / sum(Vol)` where TP = (H+L+C)/3 |
| MACD | **Mostly Correct** | Null-to-0 conversion at line 254 may distort early signal line |
| ATR | **Bug** | `slice(0, period + 1)` should be `slice(0, period)` -- off-by-one |

**Issue F3.4a -- ATR Off-by-One (StockChart.tsx:304):**
```typescript
const sum = trueRanges.slice(0, period + 1).reduce((a, b) => a + b, 0);
result.push(sum / (period + 1));
```
First ATR averages `period + 1` values instead of `period`. This biases the initial ATR.

**Fix:** `trueRanges.slice(0, period)` and divide by `period`.

**Issue F3.4b -- Bollinger Bands Loop Bug (StockChart.tsx:195-198):**
`continue` inside nested `for` loop breaks array alignment. If `closePrice` is null mid-way through the inner period loop, `upper.push(null)` and `lower.push(null)` are called, but the outer loop index advances, causing the Bollinger arrays to become longer than `data.length`.

**Severity: Medium** -- Produces incorrect output if any `close` value is null within the lookback window.

---

## 4. UI/UX & INFORMATION ARCHITECTURE

### 4.1 Navigation & Scannability

| Finding | Severity | Location |
|---------|----------|----------|
| Home page provides clear coverage grid with ticker, sector, and name | **Praise** | page.tsx:33-69 |
| Stock detail page uses dynamic imports with loading spinner | **Praise** | stocks/[ticker]/page.tsx:8-21 |
| Each stock model has sticky navigation tabs with scroll-on-mobile | **Praise** | stock-model-styles.ts:188-203 |
| Tab navigation uses left-border color coding: mint=tracking, accent=projection | **Praise** | stock-model-styles.ts:238-255 |
| No cross-stock comparison view -- users cannot view ASTS vs BMNR side-by-side | **Medium** | Architecture gap |

### 4.2 Readability

| Finding | Severity | Location |
|---------|----------|----------|
| Body font is system sans-serif fallback (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`) but stock models use Outfit | **Low** | globals.css:52 vs stock-model-styles.ts:60 |
| Line height set to 1.5 globally, 1.7 for detail text -- good readability | **Praise** | globals.css:53, stock-model-styles.ts:1277 |
| Table text uses Space Mono at 14px -- compact but readable | **Praise** | stock-model-styles.ts:561-563 |
| Mobile breakpoints at 768px, 480px, 360px provide smooth degradation | **Praise** | stock-model-styles.ts:753-1128 |

### 4.3 Data Presentation

| Finding | Severity | Location |
|---------|----------|----------|
| Table header styling: 11px uppercase with 1px letter-spacing | **Praise** | stock-model-styles.ts:549-555 |
| Chart implementation uses Recharts `ResponsiveContainer` | **Praise** | StockChart.tsx |
| Monte Carlo histogram uses custom CSS bars (.mc-chart) | **Praise** | stock-model-styles.ts:643-660 |
| Stats row uses horizontal scroll with fade masks on mobile | **Praise** | stock-model-styles.ts:800-813 |
| Touch targets enforce 44px minimum on touch devices | **Praise** | stock-model-styles.ts:726-733 |

### 4.4 Accessibility

| Finding | Severity | Location |
|---------|----------|----------|
| `html lang="en"` is set | **Praise** | layout.tsx:62 |
| No ARIA labels on interactive elements (tabs, sliders, buttons) | **Medium** | All model files |
| Color-only indicators (red/green for up/down) lack text alternatives | **Medium** | LivePrice.tsx:164 |
| `prefers-reduced-motion` media query properly disables animations | **Praise** | stock-model-styles.ts:1154-1163 |
| `prefers-color-scheme: dark` handled (already dark theme) | **Praise** | stock-model-styles.ts:1166-1171 |
| Viewport allows zooming up to 5x (`maximumScale: 5`) | **Praise** | layout.tsx:13 |
| Tab navigation hidden scrollbar may confuse screen readers | **Low** | stock-model-styles.ts:204 |

---

## 5. VISUAL DESIGN & STYLING

### 5.1 Color Palette

| Finding | Severity | Location |
|---------|----------|----------|
| Dark theme with professional finance palette: #05070A (bg), #0D1117 (surface) | **Praise** | stock-model-styles.ts:27-28 |
| Three accent colors properly differentiate stocks: Cyan (#22D3EE) ASTS, Violet (#A78BFA) BMNR, Mint (#7EE787) CRCL | **Praise** | stock-model-styles.ts:52-54 |
| Semantic colors for sentiment: Mint (positive), Coral (negative), Gold (warning) | **Praise** | stock-model-styles.ts:43-50 |
| `--text2` and `--text3` both map to `#8B949E` -- these should be different values for hierarchy | **Low** | stock-model-styles.ts:35-36 |

**Recommendation:** Differentiate `--text2` and `--text3`. Suggested: `--text2: #8B949E` (secondary text), `--text3: #6E7681` (tertiary/muted text).

### 5.2 Typography

| Finding | Severity | Location |
|---------|----------|----------|
| Heading font: Outfit (weights 300-800) -- modern, clean geometric sans | **Praise** | stock-model-styles.ts:22 |
| Monospace font: Space Mono for financial data -- excellent choice | **Praise** | stock-model-styles.ts:22 |
| Hero heading: 42px / 700 weight with gradient fill | **Praise** | stock-model-styles.ts:97-106 |
| Price display: 56px Space Mono / 700 weight | **Praise** | stock-model-styles.ts:133-139 |
| Card labels: 11px uppercase with 2.5px letter-spacing | **Praise** | stock-model-styles.ts:374-380 |
| Font loaded via Google Fonts `@import` in CSS string -- renders twice (globals.css AND stock-model-styles.ts) | **Low** | globals.css:1, stock-model-styles.ts:22 |

### 5.3 Spacing & Alignment

| Finding | Severity | Location |
|---------|----------|----------|
| Consistent 64px horizontal padding on desktop for hero, stats, nav, main | **Praise** | stock-model-styles.ts:70,156,192,342 |
| 4-tier responsive padding: 64px > 32px > 24px > 16px > 12px | **Praise** | stock-model-styles.ts:737-1128 |
| `margin-bottom: 0` used extensively -- relies on parent flex/grid gap | **Praise** | Throughout stock-model-styles.ts |
| Card border-radius: 16px consistently | **Praise** | stock-model-styles.ts:368 |
| Grid gaps: 24px for desktop, 12px for mobile | **Praise** | stock-model-styles.ts:383-386,797 |

### 5.4 Chart & Table Aesthetics

| Finding | Severity | Location |
|---------|----------|----------|
| Bar charts use gradient fill with hover brightness effect | **Praise** | stock-model-styles.ts:483-496 |
| Tables use rounded header corners and hover row highlight | **Praise** | stock-model-styles.ts:557-558,565-567 |
| Competitor cards use left-border threat indicators (coral/gold/mint) | **Praise** | stock-model-styles.ts:1454-1456 |
| Timeline items use expandable accordion with smooth transitions | **Praise** | stock-model-styles.ts:1174-1347 |

### 5.5 Responsiveness Issues

| Finding | Severity | Location |
|---------|----------|----------|
| Landscape mobile properly shows 2-column hero grid | **Praise** | stock-model-styles.ts:1131-1141 |
| Retina displays get 0.5px borders and 3px nav borders | **Praise** | stock-model-styles.ts:1144-1151 |
| Timeline hides date and category columns on small screens (< 600px) | **Praise** | stock-model-styles.ts:1340-1347 |
| `globals.css` uses `!important` overrides for grid columns on mobile -- fragile approach | **Low** | globals.css:97 |

---

## 6. CODE QUALITY & TECHNICAL SOUNDNESS

### 6.1 TypeScript & Type Safety

| Finding | Severity | Location |
|---------|----------|----------|
| All three model files use `// @ts-nocheck` at line 1 | **Critical** | ASTS.tsx:1, BMNR.tsx:1, CRCL.tsx:1 |
| Shared types in `data/shared/types.ts` are well-defined with JSDoc | **Praise** | data/shared/types.ts |
| `UpdateSource`, `StatProps`, `CardProps`, `RowProps` interfaces duplicated in all 3 files instead of shared | **Medium** | ASTS/BMNR/CRCL .tsx files |
| `safeDivide`, `safeNumber`, `clamp` utility functions duplicated in all 3 files | **Medium** | ASTS.tsx:412-421, BMNR.tsx:464-474, CRCL.tsx:344-354 |

**Issue C6.1a -- `@ts-nocheck` on All Model Files:**
The `// @ts-nocheck` directive disables ALL TypeScript checking on files totaling ~14,000+ lines of financial calculation code. This is the single highest-risk code quality issue in the entire codebase. Any typo in a formula, wrong variable name, or type mismatch will silently pass compilation.

**Severity: Critical**

**Recommendation:** Remove `@ts-nocheck` and fix type errors. At minimum, use `@ts-expect-error` on specific lines that need it rather than blanket suppression.

### 6.2 Component Architecture

| Finding | Severity | Location |
|---------|----------|----------|
| `FinancialModelErrorBoundary` class component duplicated in all 3 files | **Medium** | ASTS.tsx:349-405, BMNR.tsx:402-458, CRCL.tsx:282-338 |
| Error boundary button color differs: ASTS=#22D3EE (cyan), BMNR=#A78BFA (violet), CRCL=#34d399 (mint) -- intentional per accent | **Praise** | Respective files |
| CRCL error boundary uses `color-mix()` for background while ASTS/BMNR use `rgba()` | **Low** | CRCL.tsx:301 vs ASTS.tsx:368 |
| `React.memo` used on `Stat`, `Card`, `Row`, `Guide`, `Panel` components | **Praise** | ASTS.tsx:435-462 |
| Stock models use dynamic imports with `ssr: false` to avoid SSR issues | **Praise** | stocks/[ticker]/page.tsx:9-20 |
| ASTS model is 4,500+ lines in a single file | **High** | ASTS.tsx |

**Issue C6.2a -- Monolithic Model Files:**
Each stock model is a single massive file (ASTS: ~4,500 lines, BMNR: ~8,100 lines, CRCL: ~5,000 lines). This makes maintenance difficult and increases the likelihood of merge conflicts, stale code, and missed updates.

**Recommendation:** Consider splitting each model into sub-modules: `ASTSOverview.tsx`, `ASTSDcf.tsx`, `ASTSMonteCarlo.tsx`, etc. This would also allow selective `@ts-nocheck` removal.

### 6.3 CSS Architecture

| Finding | Severity | Location |
|---------|----------|----------|
| Unified `getStockModelCSS()` function generates CSS string with accent color injection | **Praise** | stock-model-styles.ts:21-1690 |
| CSS is injected via `<style>` tags (CSS-in-JS string) -- not ideal for performance | **Medium** | Each model file |
| `* { box-sizing: border-box; margin: 0; padding: 0; }` in model CSS overrides Tailwind's `:where()` selectors | **High** | stock-model-styles.ts:57 |
| `globals.css` has specificity workarounds with `.stock-model-app` prefix | **Praise** (workaround) | globals.css:79-87 |
| `:root` CSS variables are re-declared in both `globals.css` and the generated model CSS | **Low** | globals.css:7-35, stock-model-styles.ts:24-55 |

**Issue C6.3a -- Global Reset Conflicts:**
The `* { margin: 0; padding: 0; }` in `stock-model-styles.ts:57` conflicts with Tailwind CSS utilities. The `globals.css` file already contains workarounds (lines 79-87) to boost specificity for `.space-y-*` and `.gap-*` classes. This fragile arrangement will break as new Tailwind utilities are used.

**Recommendation:** Remove the global `*` reset from model CSS and rely on Tailwind's reset or apply resets only to `.stock-model-app` descendant selectors.

### 6.4 API Routes

| Finding | Severity | Location |
|---------|----------|----------|
| Yahoo Finance proxy at `/api/stock/[symbol]` with 5-minute caching | **Praise** | src/app/api/stock/[symbol]/route.ts |
| `encodeURIComponent(symbol)` used in LivePrice fetch | **Praise** | LivePrice.tsx:41 |
| No rate limiting on API routes | **Medium** | API routes |
| No input validation on symbol parameter | **Medium** | API routes |

### 6.5 Performance Concerns

| Finding | Severity | Location |
|---------|----------|----------|
| `useMemo` properly used for expensive calculations (DCF, Monte Carlo) | **Praise** | All model files |
| Monte Carlo capped at 10,000 simulations | **Praise** | CRCL.tsx:3263 |
| Max Drawdown uses O(n^2) `data.find()` inside loop | **Low** | StockChart.tsx:412 |
| Google Fonts loaded twice (globals.css AND model CSS) | **Low** | globals.css:1, stock-model-styles.ts:22 |

### 6.6 Duplicated Code

| Item | Duplicated In | Lines Each |
|------|---------------|------------|
| `UpdateSource` type | ASTS, BMNR, CRCL | ~1 |
| `StatProps`, `CardProps`, `RowProps`, `InputProps` | ASTS, BMNR, CRCL | ~30 |
| `FinancialModelErrorBoundary` class | ASTS, BMNR, CRCL | ~55 |
| `RATING_NORMALIZATION` map | ASTS, BMNR, CRCL | ~15 |
| `LEGAL_DISCLAIMERS` object | ASTS, BMNR, CRCL | ~4 |
| `safeDivide`, `safeNumber`, `clamp` utilities | ASTS, BMNR, CRCL | ~8 |
| `Stat`, `Card`, `Row`, `Panel`, `Guide` components | ASTS, BMNR, CRCL | ~80 |

**Total estimated duplicated code: ~580 lines x 3 = ~1,740 lines** that could be in shared modules.

**Severity: Medium** -- Not a functional issue but significantly impacts maintainability and consistency risk.

---

## 7. PROFESSIONAL POLISH & RED FLAGS

### 7.1 Institutional-Grade Assessment

| Aspect | Rating | Notes |
|--------|--------|-------|
| Data sourcing rigor | 9/10 | SEC filings, on-chain data, press releases all cited |
| Disclaimer coverage | 8/10 | "Not financial advice" present but could be more prominent |
| Model documentation | 9/10 | Exceptional AI agent instructions, changelog, maintenance protocol |
| Visual professionalism | 9/10 | Dark theme with Seeking Alpha/Bloomberg aesthetic |
| Mathematical rigor | 8/10 | Sound formulas with a few simplifications acknowledged |
| Code reliability | 6/10 | `@ts-nocheck` on all model files is a major concern |

### 7.2 Investor Misleading Risk

| Finding | Severity | Location |
|---------|----------|----------|
| CRCL "Moon" scenario: $7,834/share by 2035 (98x from current) | **High** | CRCL.tsx:615 |
| ASTS "Moon" scenario uses -2 deployment delay (ahead of schedule) and 10% penetration | **Medium** | ASTS.tsx SCENARIO_PRESETS |
| Disclaimer placement is in footer (small text) rather than at top of each analysis | **Medium** | layout.tsx:49 |
| Each model HAS a disclaimer banner component but placement varies | **Low** | stock-model-styles.ts:662-695 |
| Probability weights: CRCL Moon at 8%, Bull at 22% -- combined 30% for extreme upside | **Medium** | CRCL.tsx scenarios |
| All three models clearly label scenarios and include bear/worst cases | **Praise** | All models |

**Recommendation:** Add a prominent disclaimer banner at the TOP of each stock analysis page (before any financial data). The current footer placement is insufficient for investor protection. The `disclaimer-banner` CSS class already exists in stock-model-styles.ts but may not be used prominently.

### 7.3 Data Staleness

| Stock | Last Updated | Age (as of Feb 13, 2026) | Severity |
|-------|--------------|--------------------------|----------|
| ASTS | Feb 12, 2026 | 1 day | **Praise** |
| BMNR | Feb 12, 2026 | 1 day | **Praise** |
| CRCL | Dec 31, 2025 | 44 days | **High** |

CRCL's stale data means the stock price ($80.05), USDC circulation ($62.5B), and market metrics may be significantly outdated.

---

## 8. SCORING & SUMMARY

### Overall Score: 7.8 / 10

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Consistency & Branding | 8.5/10 | 15% | 1.28 |
| Content & Writing | 8.0/10 | 10% | 0.80 |
| Financial Logic & Math | 8.5/10 | 25% | 2.13 |
| UI/UX & Architecture | 8.0/10 | 15% | 1.20 |
| Visual Design | 9.0/10 | 10% | 0.90 |
| Code Quality | 6.0/10 | 15% | 0.90 |
| Professional Polish | 7.5/10 | 10% | 0.75 |
| **TOTAL** | | **100%** | **7.96** |

### TOP 5 MOST URGENT FIXES

1. **[Critical] Remove `@ts-nocheck` from all three model files** (ASTS.tsx:1, BMNR.tsx:1, CRCL.tsx:1). This single directive disables type checking on 14,000+ lines of financial calculation code. Any formula typo, wrong variable reference, or type mismatch is invisible. Fix type errors incrementally or use targeted `@ts-expect-error`.

2. **[High] Update CRCL data to February 2026** (src/data/crcl/company.ts, financials.ts). The CRCL model is 44 days stale while ASTS and BMNR were updated yesterday. Stock price, USDC circulation, and all market metrics need refreshing.

3. **[High] Fix CRCL RLDC margin field inconsistency** (CRCL.tsx BASE scenario 2025). `rldcMargin: 39` does not match computed `netRevenue/grossRevenue = 46.9%`. Clarify the metric definition or correct the values.

4. **[High] Fix ATR off-by-one bug** (StockChart.tsx:304). `trueRanges.slice(0, period + 1)` should be `trueRanges.slice(0, period)`. This biases the initial ATR calculation and affects all downstream technical analysis that depends on ATR.

5. **[High] Cap CRCL "Moon" scenario or add stronger caveats** (CRCL.tsx:576-615). $2,850B USDC and $7,834/share by 2035 implies a stablecoin market larger than global M2 supply growth. This undermines the model's credibility for sophisticated investors.

### TOP 3 THINGS DONE REALLY WELL

1. **Unified Model Maintenance Protocol** -- The shared header comment block across all three models (ASTS/BMNR/CRCL) with explicit AI agent instructions, update checklists, and archival rules is exceptional. The BMNR press release checklist (10 sections to update) is particularly thorough. This is better documentation than most institutional-grade codebases.

2. **Financial Model Architecture** -- The DCF implementations across all three stocks are mathematically sound with proper Gordon Growth Model, present value discounting, risk adjustments, and unit conversions. The BMNR Monte Carlo uses genuine Geometric Brownian Motion with Ito's lemma correction and correlated normal random variables. The code includes `safeDivide`, `safeNumber`, and `clamp` utilities to prevent NaN/Infinity in financial calculations.

3. **Visual Design System** -- The unified `stock-model-styles.ts` with accent color parameterization (cyan/violet/mint) creates a cohesive, professional aesthetic across all three stocks. The responsive design covers 5 breakpoints (1200px, 900px, 768px, 480px, 360px) plus landscape mode. Touch targets enforce 44px minimums. `prefers-reduced-motion` is respected. The dark theme with glass morphism effects and gradient overlays achieves a Bloomberg/Seeking Alpha tier of visual polish.

---

**End of Audit Report**
**Auditor:** Claude AI (Senior Full-Stack / Financial Analyst / UI/UX)
**Date:** February 13, 2026

---

## Appendix C — Formula & Math Audit

**Date:** February 13, 2026
**Scope:** Mathematics, Logic, Formulas, Code, Visual
**Status: All findings resolved.**


## 🔴 CRITICAL ISSUES

### 1. RSI Calculation Bug (StockChart.tsx:137-140)
**Location:** `src/components/shared/StockChart.tsx:137-140`

**Issue:** The RSI smoothed average calculation is incorrect. After the first period, it recalculates the simple average instead of using the exponential smoothing formula.

**Current Code:**
```typescript
} else {
  // Subsequent RSI uses smoothed average
  const prevAvgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
  const prevAvgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
  avgGain = (prevAvgGain * (period - 1) + gains[i]) / period;
  avgLoss = (prevAvgLoss * (period - 1) + losses[i]) / period;
}
```

**Problem:** Lines 137-138 recalculate simple averages instead of using the previous smoothed averages from `result[i-1]`. This breaks the exponential smoothing chain.

**Correct Formula:** RSI uses Wilder's smoothing:
- First period: Simple average
- Subsequent: `EMA = (Previous EMA × (period - 1) + Current Value) / period`

**Fix Required:** Store previous EMA values and use them directly.

---

### 2. BMNR Annual Staking Revenue Uses Wrong ETH Value (BMNR.tsx:1400)
**Location:** `src/components/stocks/BMNR.tsx:1400`

**Issue:** Annual staking revenue calculation uses `currentETH` instead of `terminalETH` for terminal year projections.

**Current Code:**
```typescript
const annualStakingRevenue = (currentETH * ethPrice * stakingYield / 100) / 1_000_000; // $M/year
```

**Problem:** This calculates revenue based on current holdings, but it's in the terminal value section. Should use `terminalETH` for consistency with terminal year projections.

**Impact:** Terminal year cash flow projections are underestimated if ETH holdings grow.

---

### 3. ASTS Monte Carlo Log-Normal Mean Calculation (ASTS.tsx:4364)
**Location:** `src/components/stocks/ASTS.tsx:4364`

**Issue:** The log-normal distribution mean adjustment comment says it ensures `E[X] = baseRev`, but the formula doesn't match.

**Current Code:**
```typescript
const sigma = revVol / 100;
const mu = -0.5 * sigma * sigma; // Adjustment so E[exp(μ + σZ)] = 1
const logNormalFactor = Math.exp(mu + sigma * randn());
const revenue = baseRev * revenueMultiplier * logNormalFactor;
```

**Analysis:** 
- For log-normal: `E[X] = exp(μ + σ²/2)`
- Current: `μ = -σ²/2`, so `E[exp(μ + σZ)] = exp(-σ²/2 + σ²/2) = 1` ✓
- But then: `E[baseRev × multiplier × factor] = baseRev × multiplier × 1 = baseRev × multiplier`

**Verdict:** The math is correct IF `revenueMultiplier` averages to 1. However, the comment is misleading - it should clarify that this ensures the factor has mean 1, not that revenue equals baseRev.

---

## ⚠️ MODERATE ISSUES

### 4. Division by Zero Protection Inconsistencies
**Locations:** Multiple files

**Issues Found:**
- `BMNR.tsx:786-811` - Good: Uses ternary checks (`totalShares > 0 ? ... : 0`)
- `ASTS.tsx:3830` - Good: Checks `spread > 0.01`
- `CRCL.tsx:1398` - Good: Checks `spread > 0.01`
- `LivePrice.tsx:112` - Good: Checks `previousClose && priceChange`

**Recommendation:** All division operations are properly protected. ✅

---

### 5. Percentage Calculation Consistency
**Location:** Multiple files

**Pattern Found:** Some calculations divide by 100, others multiply by 100 for percentages.

**Examples:**
- `BMNR.tsx:790`: `((currentStockPrice / currentNAV) - 1) * 100` ✓ Correct
- `BMNR.tsx:806`: `(annualDividend / currentStockPrice) * 100` ✓ Correct
- `LivePrice.tsx:112`: `(priceChange / previousClose) * 100` ✓ Correct

**Verdict:** All percentage calculations are consistent. ✅

---

### 6. Unit Conversion Clarity
**Location:** Multiple files

**Issues:**
- `BMNR.tsx:785`: `totalShares = currentShares * 1e6` - Converts M shares to shares
- `BMNR.tsx:1400`: Divides by `1_000_000` to convert $ to $M
- `ASTS.tsx:3856`: `netDebtB = (totalDebt - cashOnHand) / 1000` - Converts $M to $B
- `CRCL.tsx:1418`: `(equityValue * 1000) / terminalShares` - Converts $B to $M, then divides by M shares

**Verdict:** Unit conversions are correct but could benefit from clearer comments explaining the conversion chain.

---

### 7. Risk Factor Calculation Logic
**Location:** `ASTS.tsx:3845`, `CRCL.tsx:1405`, `BMNR.tsx` (implied)

**Formula:** `riskFactor = (1 - risk1/100) × (1 - risk2/100) × (1 - risk3/100)`

**Analysis:** This assumes risks are independent. If risks are correlated, this overestimates success probability.

**Example:** If regulatory risk = 20% and tech risk = 20%, factor = 0.8 × 0.8 = 0.64 (36% failure). But if they're correlated (e.g., regulatory delays cause tech delays), actual failure rate could be higher.

**Recommendation:** Add comment explaining independence assumption, or consider correlation adjustment.

---

## 📊 CODE QUALITY ISSUES

### 8. Magic Numbers
**Locations:** Multiple files

**Examples:**
- `BMNR.tsx:1400`: `1_000_000` - Should be `MILLION = 1_000_000` constant
- `ASTS.tsx:3830`: `0.01` threshold - Should be `MIN_SPREAD = 0.01` constant
- `ASTS.tsx:4364`: `-0.5` - Should be `LOG_NORMAL_ADJUSTMENT = -0.5` constant

**Recommendation:** Extract magic numbers to named constants for clarity.

---

### 9. Type Safety - Potential Null/Undefined Issues
**Location:** `StockChart.tsx`, various calculations

**Issues:**
- `StockChart.tsx:173`: Uses `middle[i]!` non-null assertion - Could fail if data is malformed
- Array access without bounds checking in some loops

**Recommendation:** Add defensive checks or use optional chaining where appropriate.

---

### 10. Error Handling in API Routes
**Location:** `src/app/api/stock/[symbol]/route.ts`

**Current:** Basic try-catch with generic error message

**Recommendation:** 
- Add specific error handling for:
  - Invalid symbols
  - Network timeouts
  - Malformed Yahoo Finance responses
  - Rate limiting

---

## 🎨 VISUAL/UI ISSUES

### 11. Chart Responsiveness
**Location:** `StockChart.tsx`

**Status:** Uses `ResponsiveContainer` from recharts ✅

**Recommendation:** Test on mobile devices to ensure charts render correctly.

---

### 12. Number Formatting Consistency
**Locations:** Multiple components

**Patterns Found:**
- `toFixed(0)` for prices
- `toFixed(1)` for percentages
- `toFixed(2)` for currency

**Verdict:** Generally consistent, but some variations exist. Consider standardizing:
- Prices: 2 decimals
- Percentages: 1 decimal
- Large numbers: 1-2 decimals with B/M suffixes

---

### 13. Color Coding for Positive/Negative Values
**Location:** `LivePrice.tsx:164`, various components

**Pattern:** Uses `var(--mint)` for positive, `var(--coral)` for negative

**Verdict:** Consistent across codebase ✅

---

## ✅ VERIFIED CORRECT IMPLEMENTATIONS

### 14. Gordon Growth Model (Terminal Value)
**Locations:** `ASTS.tsx:3824-3830`, `CRCL.tsx:1394-1398`

**Formula:** `TV = FCF / (r - g)`

**Verification:** ✅ Correct implementation with spread check

---

### 15. Present Value Discounting
**Locations:** Multiple files

**Formula:** `PV = FV / (1 + r)^n`

**Verification:** ✅ Correct implementation

---

### 16. Dilution Calculations
**Locations:** `BMNR.tsx:1408`, `ASTS.tsx:3867`, `CRCL.tsx:1416`

**Formula:** `terminalShares = currentShares × (1 + rate)^years`

**Verification:** ✅ Correct implementation

---

### 17. Bollinger Bands Calculation
**Location:** `StockChart.tsx:154-183`

**Formula:** 
- Middle = SMA
- Upper = Middle + (stdDev × σ)
- Lower = Middle - (stdDev × σ)

**Verification:** ✅ Correct implementation

---

### 18. VWAP Calculation
**Location:** `StockChart.tsx:186-200`

**Formula:** `VWAP = Σ(TP × Volume) / Σ(Volume)` where TP = (High + Low + Close)/3

**Verification:** ✅ Correct implementation

---

## 📋 SUMMARY

### Critical Issues: 2 ✅ ALL FIXED
1. ✅ RSI smoothed average calculation bug - FIXED
2. ✅ BMNR terminal staking revenue uses wrong ETH value - FIXED

### Moderate Issues: 4 ✅ ALL FIXED
3. ✅ Log-normal comment clarity - FIXED (improved comment explaining formula)
4. ✅ Risk factor independence assumption - FIXED (added comments explaining assumption)
5. ✅ Magic numbers - FIXED (extracted to `src/lib/constants.ts`)
6. ✅ Unit conversion comments - FIXED (added clear conversion explanations)

### Code Quality: 3 ✅ ALL FIXED
7. ✅ Type safety improvements - FIXED (added defensive null checks)
8. ✅ Error handling enhancements - FIXED (comprehensive API error handling)
9. ✅ Number formatting standardization - VERIFIED (already consistent)

### Visual: 0
All visual aspects are consistent and well-implemented.

---

## 🔧 RECOMMENDED FIXES PRIORITY

**High Priority:** ✅ ALL FIXED
1. ✅ Fix RSI calculation (affects technical analysis accuracy) - FIXED
2. ✅ Fix BMNR terminal revenue calculation (affects valuation accuracy) - FIXED

**Medium Priority:** ✅ ALL FIXED
3. ✅ Add constants for magic numbers - FIXED (created `src/lib/constants.ts`)
4. ✅ Enhance error handling in API routes - FIXED (added validation, timeouts, specific error messages)
5. ✅ Add correlation adjustment option for risk factors - FIXED (added comments explaining independence assumption)

**Low Priority:** ✅ ALL FIXED
6. ✅ Improve code comments for unit conversions - FIXED (added clear conversion comments)
7. ✅ Standardize number formatting - VERIFIED (already consistent: 2 decimals for prices/percentages)
8. ✅ Add defensive null checks - FIXED (added null checks in Bollinger Bands and API route)

---

## 📝 TESTING RECOMMENDATIONS

1. **Unit Tests:**
   - RSI calculation with known data
   - Terminal value calculations
   - Risk factor combinations

2. **Integration Tests:**
   - API route error handling
   - Chart rendering with edge cases (empty data, single point)

3. **Visual Regression:**
   - Chart rendering across screen sizes
   - Number formatting consistency

---

**End of Audit Report**

---

## Appendix D — Audit Program Registry & Prompts

Unified index of all audit programs. Each audit has a unique ID, scope, and prompt.
When adding a new audit, register it here first.

---

## Audit Index

| ID | Name | Type | Scope | Status |
|---|---|---|---|---|
| `CCA-1.0` | Stockings Comprehensive Code Audit v1.0 | Code Quality | Full codebase (108 files) | Active |
| `CCA-1.1` | Vibe-Code Bomb 27-Point Audit | Operational Maturity | Full codebase — 27-point checklist | Active |
| `DBV-CP` | Capital Section Parity Audit | Database Validation | Per-ticker capital data | Active |
| `DBV-XR` | Cross-Reference Integrity Audit | Database Validation | Per-ticker filing cross-refs | Active |
| `DBV-SC` | Sources Completeness Audit | Database Validation | Per-ticker source citations | Active |
| `DBV-DF` | Data Freshness Audit | Database Validation | Per-ticker staleness detection | Active |

---

## CCA-1.1 — Vibe-Code Bomb 27-Point Audit

**Date:** 2026-03-01
**Scope:** Full codebase — 27-point operational maturity checklist
**Methodology:** Systematic verification of each indicator against the codebase with traffic-light verdicts
**Findings:** 4 new structured findings (VIBE-001 through VIBE-004) + 16 GUILTY / 6 PARTIAL / 5 NOT GUILTY verdicts
**Report:** `audit/AUDIT.md` (Appendix A)
**Dashboard:** `/audit/comprehensive-code-audit`

### Prompt

```
Check the following 27 "vibe-coded app ticking bomb" indicators against the codebase.
For each, provide a GUILTY / NOT GUILTY / PARTIAL verdict with evidence, affected files,
cross-references to existing CCA-1.0 findings, and severity assessment.

1. API keys hardcoded "for now"
2. No /health endpoint
3. Schema changes in your head, not migrations
4. Every query is SELECT * and vibes
5. Error handling = console.log(e) and hope
6. No rate limit on auth or writes
7. UTC, local time, and "JS default" all mixed
8. README is empty or wrong
9. No staging env
10. One god component owns the whole screen
11. No analytics
12. "We'll clean this up after launch" every week
13. Env vars undocumented
14. Frontend talks directly to 5 different third-party APIs
15. No monitoring or alerts
16. Logs only in local terminal history
17. DB backups are "automatic" but never tested
18. Feature flags = commenting code in and out
19. Deploys from local machine
20. No input validation
21. CORS is set to *
22. CI is "I ran it once locally"
23. Same API token across staging, prod, and local
24. Only one person knows how to run or deploy
25. API keys / JWT secrets in client-side code or .env committed to git
26. Database exposed publicly with no RLS
27. Zero logging beyond console.log
```

---

## CCA-1.0 — Stockings Comprehensive Code Audit v1.0

**Date:** 2026-02-22
**Scope:** Full codebase — 108 files across Next.js 16 / TypeScript / Neon PostgreSQL / Drizzle ORM
**Methodology:** Automated static analysis + manual code review across 35 categories
**Findings:** 128 structured findings (see `src/data/audit-findings.ts`)
**Report:** `audit/AUDIT.md`
**Dashboard:** `/audit/comprehensive-code-audit`

### Prompt

```
Please conduct a comprehensive audit of the attached file, performing 35 independent analyses
across a wide range of categories. Focus on identifying potential issues, inefficiencies, risks,
and areas for improvement in the following aspects, among others:

1. Unnecessarily hardcoded data (e.g., constants, credentials, or configurations that should be externalized).
2. Database or API connections (e.g., insecure handling, lack of connection pooling, or improper error management).
3. Programming language-specific best practices (e.g., adherence to idioms, efficient use of features, or deprecated elements).
4. Security vulnerabilities (e.g., injection risks, cross-site scripting, or weak encryption).
5. Authentication and authorization issues (e.g., improper session management or role-based access control).
6. Data privacy compliance (e.g., alignment with GDPR, CCPA, or handling of sensitive information).
7. Performance bottlenecks (e.g., inefficient algorithms, resource leaks, or scalability concerns).
8. Error handling and logging (e.g., incomplete try-catch blocks or insufficient debug information).
9. Code maintainability (e.g., modularity, readability, or excessive complexity).
10. Dependency management (e.g., outdated libraries, version conflicts, or unlicensed components).
11. Testing coverage (e.g., unit tests, integration tests, or edge case handling).
12. Styling consistency (e.g., CSS/SCSS adherence to standards or redundant styles).
13. UI/UX design flaws (e.g., intuitive navigation, responsive layouts, or user flow inefficiencies).
14. Accessibility compliance (e.g., WCAG standards, ARIA attributes, or keyboard navigation).
15. Internationalization and localization (e.g., support for multiple languages or cultural adaptations).
16. Mobile responsiveness (e.g., viewport issues or touch-friendly elements).
17. Browser compatibility (e.g., cross-browser rendering differences).
18. Network security (e.g., HTTPS enforcement or CORS misconfigurations).
19. Input validation (e.g., sanitization of user inputs or file uploads).
20. Output encoding (e.g., prevention of XSS in rendered content).
21. Configuration management (e.g., environment-specific settings or secret handling).
22. Build and deployment processes (e.g., automation scripts or CI/CD integration).
23. Documentation quality (e.g., inline comments, README completeness, or API docs).
24. Licensing and intellectual property (e.g., open-source compliance or attribution requirements).
25. Environmental impact (e.g., energy-efficient code or sustainable practices).
26. Scalability architecture (e.g., horizontal scaling readiness or load balancing).
27. Backup and recovery mechanisms (e.g., data redundancy or disaster recovery plans).
28. Monitoring and analytics (e.g., integration with tools like Sentry or Google Analytics).
29. Third-party integrations (e.g., API rate limiting or vendor-specific security).
30. Code duplication (e.g., repeated logic that could be refactored).
31. Memory management (e.g., garbage collection issues or leaks).
32. Threading and concurrency (e.g., race conditions or deadlocks).
33. File handling security (e.g., path traversal vulnerabilities).
34. Compliance with industry standards (e.g., OWASP Top 10 or ISO norms).
35. Overall architectural soundness (e.g., adherence to design patterns like MVC or SOLID principles).

For each analysis, provide a detailed report including: the specific issue identified (if any),
its location in the file (e.g., line numbers or sections), severity level (low, medium, high,
critical), potential impact, and recommended remediation steps. If no issues are found in a
category, note that explicitly. Structure the final report clearly, using sections for each
analysis, and conclude with a summary of key findings and overall recommendations.
```

---

## DBV-CP — Capital Section Parity Audit

**Workflow ID:** `capital-parity` (in `src/data/workflows.ts`)
**Scope:** Per-ticker capital structure data
**Trigger:** Run when onboarding a new company or periodically to catch drift
**Variants:** ASTS, BMNR

### Prompt

```
You are a capital structure data quality auditor for an institutional investment database (ABISON)
covering {TICKER}. Your job is to audit the capital section for completeness, consistency, and
cross-reference coverage.

════════════════════════════════════════
SECTION 1: CAPITAL SECTION PARITY CHECKLIST
════════════════════════════════════════

Audit EACH of the 7 standard capital sections. For each, determine status and provide evidence:

┌────────────────────────────────────────────────────────────────────┐
│ #  Section              Status                Evidence / Notes    │
├────────────────────────────────────────────────────────────────────┤
│ 1  Structure            [IMPLEMENTED/TODO/N/A] [share classes,    │
│    (share classes,       with reason]          voting, authorized │
│    voting, authorized)                         vs outstanding]    │
│                                                                    │
│ 2  Shareholders         [IMPLEMENTED/TODO/N/A] [major holders,   │
│    (major holders,       with reason]          % ownership,      │
│    institutional, insider)                      13F/D/G dates]   │
│                                                                    │
│ 3  Offerings            [IMPLEMENTED/TODO/N/A] [equity offerings │
│    (equity, convertible, with reason]          history, ATM      │
│    ATM, shelf)                                 programs, shelf   │
│                                                capacity]          │
│                                                                    │
│ 4  Warrants & Plans     [IMPLEMENTED/TODO/N/A] [warrants, SBC,  │
│    (warrants, SBC,       with reason]          RSU grants,      │
│    options, RSUs)                               option pools]    │
│                                                                    │
│ 5  Dilution             [IMPLEMENTED/TODO/N/A] [dilution history │
│    (history, scenarios,  with reason]          waterfall,        │
│    waterfall)                                   FD calculations] │
│                                                                    │
│ 6  Liquidity            [IMPLEMENTED/TODO/N/A] [cash position,  │
│    (cash, runway,        with reason]          burn rate,        │
│    debt schedule)                               runway scenarios]│
│                                                                    │
│ 7  Insiders             [IMPLEMENTED/TODO/N/A] [Form 4 sales,   │
│    (Form 4 activity,     with reason]          purchases, RSU   │
│    sales, purchases)                            vestings, plans] │
└────────────────────────────────────────────────────────────────────┘

For each section:
- IMPLEMENTED = exports exist with substantive data (not placeholder/empty arrays)
- TODO = section is missing or has only skeleton/placeholder data — list specific data points needed
- N/A = section does not apply to this company — state why

════════════════════════════════════════
SECTION 2: CROSS-REFERENCE COVERAGE AUDIT
════════════════════════════════════════

For EVERY filing entry in the local database (sec-filings.ts) that has status "IN DB":
- Does it have corresponding cross-reference entries in {TICKER}_FILING_CROSS_REFS?
- If not, flag as: "MISSING CROSS-REF: [Form]|[Date] — no cross-ref entries"
- If yes, assess quality: does each cross-ref accurately describe data captured?

Coverage metrics:
- Total filings in database: X
- Filings WITH cross-refs: Y
- Filings WITHOUT cross-refs: Z
- Coverage rate: Y/X = XX%

════════════════════════════════════════
SECTION 3: STALENESS DETECTION
════════════════════════════════════════

Check metadata for each data file:
- CAPITAL_METADATA.lastUpdated — is it older than 30 days from current date?
- FINANCIALS_METADATA.lastUpdated — same check
- CATALYSTS_METADATA.lastUpdated — same check
- nextExpectedUpdate — is it in the past?

For each stale section:
  → "STALE: [section] last updated [date] — [X] days ago. Next expected: [date]. Action: check [filing type]."

════════════════════════════════════════
SECTION 4: DATA CONSISTENCY CHECKS
════════════════════════════════════════

Cross-validate:
1. Share counts: TOTAL_BASIC_SHARES = sum of SHARE_CLASSES shares? FD count consistent with dilution waterfall?
2. Offering totals: sum of EQUITY_OFFERINGS amounts vs. total raised in financial context
3. Shareholder percentages: do major shareholder % sum to a reasonable total? Any > 100%?
4. Convertible math: conversion price × rate = correct shares at conversion?
5. Timeline consistency: offering dates in EQUITY_OFFERINGS align with sec-filings.ts entries?

For each inconsistency:
  → "INCONSISTENCY: [description] — Expected: [X], Found: [Y]. Resolution: [action]."

════════════════════════════════════════
SECTION 5: PARITY REPORT
════════════════════════════════════════

PARITY SCORE: X/7 sections implemented
CROSS-REF COVERAGE: XX%
STALENESS: X stale sections
INCONSISTENCIES: X found

TODO LIST (prioritized by impact):
1. [HIGH] [description — specific data to add/fix]
2. [HIGH] [description]
3. [MEDIUM] [description]

SUGGESTED NEXT ACTIONS:
- Which SEC filings to review to fill gaps
- Which agents to run
- Specific data points to verify in next 10-Q/10-K

Rules: Report facts only. Do not hallucinate data values. Flag uncertainty explicitly.
```

---

## DBV-XR — Cross-Reference Integrity Audit

**Workflow ID:** `crossref-integrity` (in `src/data/workflows.ts`)
**Scope:** Per-ticker filing-to-cross-reference mappings
**Trigger:** Run after batch filing updates
**Variants:** ASTS, BMNR

### Prompt

```
You are a data integrity auditor for the ABISON investment database covering {TICKER}.
Your job is to audit the cross-reference system that links SEC filings to the data they
populated across the database.

════════════════════════════════════════
PHASE 1: FILING → CROSS-REF COVERAGE
════════════════════════════════════════

For EVERY entry in {TICKER}_SEC_FILINGS (sec-filings.ts):
1. Construct the expected cross-ref key: "[type]|[YYYY-MM-DD]"
2. Check if that key exists in {TICKER}_FILING_CROSS_REFS
3. Classify:
   - COVERED: Key exists with 1+ cross-ref entries
   - MISSING: Key does not exist — filing data was never cross-referenced
   - EXEMPT: Filing type unlikely to generate database updates (e.g., CORRESP, NT 10-K)

Output table:
| Filing Date | Type | Description (truncated) | Cross-Ref Status | # Refs |

Coverage metrics:
- Total filings: X
- Covered: Y (XX%)
- Missing: Z (list each)
- Exempt: W

════════════════════════════════════════
PHASE 2: ORPHAN CROSS-REF DETECTION
════════════════════════════════════════

For EVERY key in {TICKER}_FILING_CROSS_REFS:
1. Parse the key: "[type]|[YYYY-MM-DD]"
2. Check if a matching filing exists in {TICKER}_SEC_FILINGS
3. Flag orphans: cross-ref keys that point to filings NOT in the local database

Orphan list:
- "[key]" — no matching filing. Action: [add filing or remove cross-ref]

════════════════════════════════════════
PHASE 3: CROSS-REF QUALITY ASSESSMENT
════════════════════════════════════════

For each covered filing, assess cross-ref quality:
- Does the 'source' field match the correct database file?
- Is the 'data' field specific enough to locate the actual database entry?
- Are important data points from the filing captured?

Quality grades:
- COMPLETE: All material data points cross-referenced
- PARTIAL: Some data captured but material items missing
- SHALLOW: Cross-ref exists but is too vague to be useful

════════════════════════════════════════
PHASE 4: INTEGRITY REPORT
════════════════════════════════════════

COVERAGE: XX% (Y/X filings cross-referenced)
ORPHANS: X cross-ref keys with no matching filing
QUALITY: X complete, Y partial, Z shallow

PRIORITY FIXES:
1. [HIGH] Missing cross-refs for material filings: [list]
2. [MEDIUM] Orphan keys to resolve: [list]
3. [LOW] Shallow cross-refs to enrich: [list]

Rules: Report facts only. Do not hallucinate cross-ref entries or filing data.
```

---

## DBV-SC — Sources Completeness Audit

**Workflow ID:** `sources-completeness` (in `src/data/workflows.ts`)
**Scope:** Per-ticker source citation coverage
**Trigger:** Run after adding new entries to any tab
**Variants:** ASTS, BMNR

### Prompt

```
You are a source citation auditor for the ABISON investment database covering {TICKER}.
Your job is to verify that every material data entry across the database has proper source
documentation in the Sources tab.

════════════════════════════════════════
PHASE 1: SEC FILING SOURCE COVERAGE
════════════════════════════════════════

For EVERY filing in {TICKER}_SEC_FILINGS:
1. Check if the filing has a corresponding Sources tab entry (match by date + form type)
2. For filings WITH source entries: verify the URL is present and points to SEC EDGAR
3. For filings WITHOUT source entries: flag as MISSING

Filing source coverage:
| Filing Date | Type | In Sources Tab? | URL Present? | Status |

Metrics:
- Total filings: X
- With source entry: Y (XX%)
- Missing source entry: Z

════════════════════════════════════════
PHASE 2: DATABASE ENTRY SOURCE TRACING
════════════════════════════════════════

Scan ALL database tabs for entries that reference specific events or data points:
- Company/Core tab: press releases, earnings, leadership changes
- Partners/Ecosystem tab: MNO announcements, deals, trials
- Comps tab: competitor news with dates
- Catalysts tab: milestone events with dates

For each dated entry, check:
1. Does the Sources tab have a corresponding source with matching date?
2. If the entry references a URL or document — is it in Sources?
3. Flag entries with NO traceable source as: "UNSOURCED: [tab] — [entry] — [date]"

════════════════════════════════════════
PHASE 3: SOURCES TAB QUALITY CHECK
════════════════════════════════════════

For each Sources tab entry:
- Is the date format consistent (YYYY-MM-DD)?
- Is the source type classified (PR / SEC / Analyst / News / Other)?
- Is the URL present and well-formed?
- Is the 1-line description meaningful?

Quality flags:
- MISSING_URL: Source entry has no URL
- MISSING_TYPE: Source type not classified
- VAGUE_DESC: Description too generic
- DATE_FORMAT: Inconsistent date format

════════════════════════════════════════
PHASE 4: COMPLETENESS REPORT
════════════════════════════════════════

FILING SOURCE COVERAGE: XX%
UNSOURCED DATABASE ENTRIES: X
SOURCE QUALITY ISSUES: X

PRIORITY FIXES:
1. [HIGH] Material entries with no source: [list top 10]
2. [MEDIUM] Filings missing from Sources tab: [list]
3. [LOW] Quality issues to clean up: [count by type]

Rules: Report facts only. Do not fabricate URLs or source entries.
```

---

## DBV-DF — Data Freshness Audit

**Workflow ID:** `data-freshness` (in `src/data/workflows.ts`)
**Scope:** Per-ticker staleness detection across all tabs
**Trigger:** Run weekly or before earnings
**Variants:** ASTS, BMNR

### Prompt

```
You are a data freshness auditor for the ABISON investment database covering {TICKER}.
Your job is to detect stale, outdated, or missing data across all tabs and flag what
needs refreshing.

Current date: {CURRENT_DATE}.

════════════════════════════════════════
PHASE 1: METADATA STALENESS SCAN
════════════════════════════════════════

Check lastUpdated and nextExpectedUpdate in EVERY metadata export:
- CAPITAL_METADATA
- FINANCIALS_METADATA (or equivalent)
- CATALYSTS_METADATA
- SEC_META
- Any other *_METADATA exports

For each:
| Section | Last Updated | Days Ago | Next Expected | Status |

Status:
- CURRENT: Updated within expected window
- STALE: Past nextExpectedUpdate or > 30 days old
- CRITICAL: Past nextExpectedUpdate by > 14 days

════════════════════════════════════════
PHASE 2: QUARTERLY DATA GAPS
════════════════════════════════════════

Check for expected quarterly filings/data:
- 10-Q: Should have data for each quarter. Identify missing quarters.
- 10-K: Annual report. Is the latest fiscal year covered?
- Earnings: Are all recent earnings calls processed?

Expected quarterly cadence:
| Period | 10-Q/10-K Filed? | In Database? | Financials Tab? | Gap? |

Flag: "QUARTERLY GAP: [period] — [filing exists but not processed / not in DB / overdue]"

════════════════════════════════════════
PHASE 3: TAB-BY-TAB FRESHNESS AUDIT
════════════════════════════════════════

For each database tab, find the MOST RECENT entry date and assess:

Company/Core:
- Latest entry date, days since last update, expected refresh trigger, status

Partners/Ecosystem:
- Any partner with no updates in > 90 days? Flag stale partners.

Comps:
- Latest entry per competitor. Flag any with no update in > 60 days.

Catalysts:
- Past target dates not updated with actual results?
- Forward catalysts still valid or dates shifted?

Capital:
- Share count last updated. Pre/post latest offering?
- Cash position last updated. Pre/post latest quarter?

Sources:
- Latest source entry date. Gap between latest source and latest database entry?

════════════════════════════════════════
PHASE 4: FRESHNESS REPORT
════════════════════════════════════════

FRESHNESS HEATMAP:
| Tab | Last Updated | Staleness | Priority |

QUARTERLY GAPS: X missing periods
STALE METADATA: X sections past expected update
STALE COMPETITORS: X with no update > 60 days
STALE PARTNERS: X with no update > 90 days
PAST-DUE CATALYSTS: X not updated with results

REFRESH PRIORITY LIST:
1. [CRITICAL] [description — what to update and which filing/source to use]
2. [HIGH] [description]
3. [MEDIUM] [description]

SUGGESTED AGENT RUNS:
- "Run [agent name] to refresh [section] using [filing/source]"

Rules: Report facts only. Use actual dates from the database. Do not estimate or infer
dates not present in the data.
```

---

## Adding a New Audit

To register a new audit:

1. **Assign an ID** following the convention:
   - Code/infrastructure audits: `CCA-{version}` (Comprehensive Code Audit)
   - Database validation audits: `DBV-{2-letter code}`
   - Security-focused audits: `SEC-{2-letter code}`
   - Performance audits: `PERF-{2-letter code}`

2. **Add to the index table** at the top of this file

3. **Add the full prompt** in a new section below

4. **If it's an AI agent workflow:** Add the workflow to `src/data/workflows.ts` with `category: 'audit'`

5. **If it produces structured findings:** Add findings to `src/data/audit-findings.ts`
