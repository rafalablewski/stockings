# 50 Rules for the Rewrite — Lessons From This Codebase

Based on a full audit of the current app (7k+ LOC in API routes, 10k+ in shared components, 16 DB tables, 48 `'use client'` files, 536 useState/useEffect calls, 2 tests, 134 console.logs, 16 `as any` casts).

---

## Architecture & Project Structure

**1. Define clear module boundaries from day one.**
Your current `src/data/` has per-ticker directories with duplicate file structures (asts/, bmnr/, crcl/ each with ~14 identical files). This hardcodes tickers into the filesystem. Design a generic data layer that takes ticker as a parameter.

**2. Never store business data in TypeScript files.**
You have a dual data source problem — data lives in both `.ts` files (src/data/) AND database tables, synced via a seeding route. Pick one source of truth. The database should be it.

**3. Cap file length at 300 lines. No exceptions.**
`StockChart.tsx` is 2,334 lines. `SharedEdgarTab.tsx` is 2,040. `SharedSourcesTab.tsx` is 1,995. `workflow/apply/route.ts` is 918. These are unmaintainable. Split by responsibility.

**4. One API route = one responsibility.**
`check-analyzed/route.ts` (467 lines) does analysis caching, keyword matching, AI semantic matching, dollar-amount guards, deduplication, and billing error detection. That's 6 jobs in one file.

**5. Establish a consistent folder convention before writing code.**
Decide on feature-based (`/features/edgar/`) vs layer-based (`/api/`, `/components/`, `/lib/`) and stick to it. Your current mix creates confusion.

**6. No page should import more than 5-7 direct dependencies.**
If a page component is wiring together 15+ things, you're missing an abstraction layer.

**7. Separate "plumbing" from "porcelain."**
API routes should be thin controllers that call service functions. Your routes contain raw SQL, business logic, caching, error handling, and response formatting all mixed together.

---

## Data Layer & Database

**8. Use a migration system from the start.**
Your `db/setup/route.ts` (428 lines) does DDL via raw SQL and full re-seeds. Use Drizzle Kit migrations properly — `drizzle-kit generate` and `drizzle-kit migrate`.

**9. Validate ALL incoming data at the boundary.**
Only competitor news has Zod validation. Every API route accepting JSON should validate with Zod schemas. No request body should reach business logic unvalidated.

**10. Create a shared query layer — never call `db.select()` directly in routes.**
Define repository functions (`getFilingsByTicker()`, `upsertSeenArticle()`) in a data access layer. Routes call those functions, not the ORM directly.

**11. Don't use `ALTER TABLE IF NOT EXISTS` in application code.**
Your `seen-articles` route evolves the schema at runtime. Schema changes belong in migrations, run at deploy time, not at request time.

**12. Add pagination to every list endpoint from day one.**
Your `GET /api/seen-articles` returns all rows for a ticker. This won't scale. Always accept `limit` and `offset` (or cursor) params.

**13. Define indexes based on your query patterns, not guesses.**
Review every WHERE clause and ensure a matching index exists. Document which queries use which indexes.

**14. Never use `as any` to shove data into an insert.**
Your `db/setup/route.ts` has 9 `as any` casts during seeding. Create proper mapper functions that produce the exact insert type.

**15. Use transactions for multi-table writes.**
If you're inserting into multiple tables in one request, wrap them in a transaction. Partial inserts corrupt state.

**16. Unbounded in-memory caches will eventually OOM.**
Your analysis cache is a `Map` keyed by ticker with no eviction. Use an LRU cache with a max size, or move caching to the database/Redis.

---

## Component Design

**17. Default to server components. Only add `'use client'` when you need interactivity.**
48 client components with 536 useState/useEffect calls suggests most of the app runs on the client. Rethink what actually needs client-side state.

**18. Extract data fetching from UI components.**
Components like `SharedSourcesTab.tsx` (1,995 lines) mix fetch calls, state management, UI rendering, and business logic. Separate these concerns.

**19. Use React Server Components for data loading.**
Instead of `useEffect` → `fetch` → `setState` → loading spinner, load data in server components and pass it down. Eliminates waterfalls and loading states.

**20. No component should manage more than 3-4 pieces of state.**
If a component has 8+ useState hooks, it needs to be decomposed or the state needs to be lifted into a proper state management solution.

**21. Create a component library with atomic building blocks.**
Before building features, build: Button, Card, Input, Select, Modal, Table, Badge, Tabs. Then compose features from these.

**22. Never duplicate components.**
You have `src/components/PinGate.tsx` AND `src/components/shared/PinGate.tsx`. One source of truth per concept.

**23. Separate "smart" containers from "dumb" presentational components.**
A `<FilingsTable data={filings} />` component should only render. A `<FilingsContainer ticker="ASTS" />` should fetch and pass data.

---

## State Management

**24. Use URL state for anything the user should be able to bookmark or share.**
Tab selection, filters, sort orders, and search queries should be in the URL (searchParams), not useState.

**25. Use server state libraries (React Query / SWR) instead of manual fetch + useState.**
Your components manually manage loading/error/data states. A server state library gives you caching, revalidation, deduplication, and optimistic updates for free.

**26. Minimize client-side state.**
Ask for every `useState`: can this be derived? Can this be a server component? Can this live in the URL? Only what's left should be `useState`.

**27. Never store derived state.**
If you can compute it from other state, compute it. Don't `useState` it and try to keep it in sync.

---

## API Design

**28. Design your API as a contract first.**
Define request/response types with Zod before writing implementation. Export these types for both server and client to share.

**29. Use consistent error response format across all routes.**
Define one error shape: `{ error: string, code?: string, details?: unknown }`. Every route returns this on failure.

**30. Use proper HTTP methods and status codes.**
GET for reads, POST for creates, PATCH for updates, DELETE for deletes. Return 201 for created, 204 for no-content, 400 for bad input, 404 for not found.

**31. Never let API routes leak implementation details.**
Internal error messages, stack traces, and database column names should never appear in API responses.

**32. Version your API from the start if you expect breaking changes.**
Even a simple `/api/v1/` prefix saves you from painful migrations later.

---

## Type Safety

**33. Zero `as any` policy.**
16 occurrences today. Every `as any` is a future runtime error. If the types don't match, fix the types — don't cast.

**34. Define types from the database schema, not alongside it.**
Use `typeof schema.secFilings.$inferInsert` and `$inferSelect` consistently. Don't maintain parallel type definitions in `types.ts` that can drift from the actual schema.

**35. Use discriminated unions for variant data.**
Your `partner_news` table has an `entry_type` field that discriminates between 'partner_news', 'competitor_news', 'ethereum_adoption'. Model this as a TypeScript discriminated union.

**36. Make impossible states unrepresentable.**
If a catalyst can be either "upcoming" (with a timeline) or "completed" (with a completion date), use a union type — not optional fields on both.

---

## Testing

**37. Write tests from day one. No test debt.**
2 test files in the entire project. Before you write a feature, write the test. At minimum: one test per API route, one test per critical business logic function.

**38. Test business logic in isolation, not through API routes.**
Extract your keyword matching, deduplication, date parsing, and dollar-amount guards into pure functions. Test those directly.

**39. Set up CI that runs lint + typecheck + tests on every push.**
If it's not in CI, it won't be maintained. `npm run lint && npx tsc --noEmit && npm test` should gate every merge.

**40. Add integration tests for critical flows.**
"Add a filing → mark it seen → verify it shows as seen" should be an automated test, not manual verification.

---

## Error Handling & Observability

**41. Replace console.log with structured logging.**
134 console.log/error calls with no consistent format. Use a logger with levels (debug/info/warn/error), timestamps, and context (ticker, route, requestId).

**42. Handle errors at the boundary, not everywhere.**
Use error boundaries for React components and a global error handler for API routes. Individual functions should throw, not try/catch and swallow.

**43. Never swallow errors silently.**
`catch (e) {}` or `catch (e) { console.log(e) }` hides bugs. Either handle the error meaningfully or let it propagate.

**44. Add request tracing.**
Generate a request ID at the middleware level, pass it through to all logs. When something fails in production, you can trace the full request path.

---

## Security

**45. Move from PIN auth to a real auth system.**
PIN-based auth with constant-time comparison is fine for a personal tool, but for a rewrite, consider NextAuth/Auth.js with proper sessions, CSRF protection, and role-based access.

**46. Validate and sanitize all user inputs.**
Your `workflow/apply` route does path traversal and code injection checks. Good — but this should be systemic (middleware-level), not per-route.

**47. Never store secrets in code or data files.**
Environment variables only, validated at startup. If `DATABASE_URL` or `AUTH_PIN` is missing, fail fast with a clear error.

---

## Performance & DX

**48. Set a bundle budget and measure it.**
Track client JS bundle size. Set a budget (e.g., 200KB gzipped). If a component pushes you over, that's a signal to refactor.

**49. Use code splitting and lazy loading for heavy features.**
2,334-line `StockChart.tsx` should not be in the initial bundle. Dynamic import it. Same for any tab content the user might never open.

**50. Delete dead code aggressively.**
If you're rewriting, don't carry forward "just in case" code. Every line in the new codebase should earn its place. If you're not sure it's used, delete it and see what breaks (your tests from Rule #37 will catch it).

---

## TL;DR Priority Order

If you only do 10 of these, do: **9** (validate inputs), **37** (write tests), **3** (small files), **8** (use migrations), **1** (module boundaries), **17** (server components), **10** (query layer), **25** (server state library), **33** (zero `as any`), **41** (structured logging).
