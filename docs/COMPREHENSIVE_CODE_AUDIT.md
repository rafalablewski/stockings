# Comprehensive Code Audit Report — Stockings (ABISON)

**Date:** 2026-02-22
**Scope:** Full codebase — 108 files across Next.js 16 / TypeScript / Neon PostgreSQL / Drizzle ORM
**Auditor:** Automated deep-analysis (Claude)

---

## Table of Contents

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
