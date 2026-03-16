# Claude Division — Architecture Proposals

## Proposal Template

### [Date] — Proposal Title
**Problem**: What needs to be solved?
**Proposed Solution**: Architecture/approach recommendation.
**Alternatives Considered**: Other options and why they were rejected.
**Impact on Other Divisions**: How this affects Gemini and Cursor.
**Boss Approval Needed**: Yes/No

---

### 2026-03-16 — Test Coverage Analysis & Improvement Plan

**Problem**: The codebase has minimal test coverage — only 2 test files with 10 passing tests covering 2 utility modules out of 30+ source files. No vitest config, no npm test script, no coverage thresholds. Critical business logic (data transformations, AI orchestration, SEC filing resolution) runs without any automated verification.

**Current State**:
- **Test files**: 2 (`SharedEdgarTab.test.ts`, `SharedSourcesTab.test.ts`)
- **Test cases**: 10 passing
- **Modules tested**: `edgarMergeHelpers.ts` (merge logic), `sourceUtils.ts` (deduplication)
- **Framework**: Vitest 4.0.18 installed but no config file or npm script
- **Coverage**: Not configured or measured

**Proposed Improvements** (ordered by ROI):

#### Priority 1 — Infrastructure (prerequisite for everything else)
1. **Add `vitest.config.ts`** with path aliases matching tsconfig
2. **Add `"test"` script** to package.json (`vitest --run`)
3. **Enable coverage reporting** with minimum thresholds for new code

#### Priority 2 — High-Value Pure Function Tests (easy wins, excellent ROI)
4. **`src/lib/seed-helpers.ts`** — 10 pure mapper functions (`mapSecFilings`, `mapCrossRefs`, `mapCatalysts`, `mapPartnerNews`, etc.) that transform data source objects into DB rows. These are the most testable functions in the codebase: no I/O, no mocking needed, and bugs here silently corrupt database state.
   - Test: all mapper functions with representative inputs
   - Test: `mapImpactToVerdict()` branch coverage (positive/negative/neutral/fallback)
   - Test: edge cases — missing fields, null coercion, empty arrays

5. **`src/components/shared/edgarMergeHelpers.ts`** (expand existing) — `normalizeDate()` and `normalizeAccession()` are tested indirectly but deserve direct tests:
   - Test: date formats actually used in the codebase (ISO, "Month DD, YYYY", date ranges)
   - Test: accession number edge cases (already stripped, malformed)

6. **`src/lib/ai-gate.ts`** — Trivial 16-line middleware but guards AI feature access. 3 test cases covers it completely (header true/false/missing).

#### Priority 3 — Async Logic with Mocking (medium effort, high value)
7. **`src/lib/cik-map.ts`** — `resolveCik()` has static lookup + dynamic SEC API fallback with promise deduplication and caching. Bugs here break all EDGAR functionality silently.
   - Test: static map lookup (no fetch)
   - Test: dynamic fallback (mock fetch)
   - Test: cache deduplication (concurrent calls share one fetch)
   - Test: error handling (fetch failure → graceful degradation)

8. **`src/data/schemas/bmnr.ts`** (and future ticker schemas) — Validate schema integrity:
   - Test: all schema entries have required fields (fieldName, type, example)
   - Test: insert anchors reference valid patterns

#### Priority 4 — Integration Tests (high effort, strategic value)
9. **`src/lib/engineer-engine.ts`** — The autonomous agent orchestrator is the riskiest untested code (272 LOC, DB + Claude API + workflow resolution). Needs:
   - Mock DB layer and Claude API
   - Test: schedule checking logic
   - Test: multi-workflow sequential execution
   - Test: error state transitions (queued → running → failed)
   - Test: prompt template resolution with date injection

10. **API route tests** — Key routes like `/api/edgar/[ticker]`, `/api/seen-filings`, `/api/analysis-cache` have query logic worth testing with a mock DB.

#### Not Recommended for Testing
- `src/lib/schema.ts` — Declarative Drizzle schema, validated at migration time
- `src/lib/types.ts` — Pure TypeScript types, enforced by compiler
- `src/data/shared/types.ts` — Interface definitions only
- `src/lib/stocks.ts` — Static config data, low risk
- `src/lib/constants.ts` — Magic number declarations, low risk

**Alternatives Considered**:
- Full E2E testing with Playwright — rejected as overkill for current stage; unit/integration tests provide better ROI first
- Snapshot testing for data files — considered but brittle; schema validation tests are more maintainable

**Impact on Other Divisions**:
- Cursor: No impact (tests are backend-focused)
- Gemini: No impact (data schemas tested won't change interfaces)
- Shared: Adding vitest config and npm script benefits all divisions

**Boss Approval Needed**: Yes — to set coverage thresholds and prioritize which tiers to implement first
