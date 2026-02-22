# ABISON Audit Registry

Unified index of all audit programs. Each audit has a unique ID, scope, and prompt.
When adding a new audit, register it here first.

---

## Audit Index

| ID | Name | Type | Scope | Status |
|---|---|---|---|---|
| `CCA-1.0` | Stockings Comprehensive Code Audit v1.0 | Code Quality | Full codebase (108 files) | Active |
| `DBV-CP` | Capital Section Parity Audit | Database Validation | Per-ticker capital data | Active |
| `DBV-XR` | Cross-Reference Integrity Audit | Database Validation | Per-ticker filing cross-refs | Active |
| `DBV-SC` | Sources Completeness Audit | Database Validation | Per-ticker source citations | Active |
| `DBV-DF` | Data Freshness Audit | Database Validation | Per-ticker staleness detection | Active |

---

## CCA-1.0 — Stockings Comprehensive Code Audit v1.0

**Date:** 2026-02-22
**Scope:** Full codebase — 108 files across Next.js 16 / TypeScript / Neon PostgreSQL / Drizzle ORM
**Methodology:** Automated static analysis + manual code review across 35 categories
**Findings:** 128 structured findings (see `src/data/audit-findings.ts`)
**Report:** `docs/COMPREHENSIVE_CODE_AUDIT.md`
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
