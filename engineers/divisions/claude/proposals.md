# Claude Division — Architecture Proposals

## Proposal Template

### [Date] — Proposal Title
**Problem**: What needs to be solved?
**Proposed Solution**: Architecture/approach recommendation.
**Alternatives Considered**: Other options and why they were rejected.
**Impact on Other Divisions**: How this affects Gemini and Cursor.
**Boss Approval Needed**: Yes/No

---

### 2026-03-15 — Dynamic Prompt Template Architecture

**Problem**: 27 workflows × N tickers = hardcoded prompt explosion. Adding a
stock requires manually writing 25+ variants. Adding a tab requires updating
50+ prompt strings. Nothing flows through automatically. Currently only ASTS
and BMNR have workflow variants — not even CRCL.

**Proposed Solution**: See plan file at `PLAN.md` (pending Boss approval).

**Alternatives Considered**:
- Keep manual variants, rely on Prompt Auditor to catch drift → rejected because
  drift detection after-the-fact doesn't scale to 15 stocks.
- Code-generate variants from a config file at build time → rejected because
  it creates a build dependency and the output is still static.

**Impact on Other Divisions**:
- Cursor: GenericResearch.tsx will import from tab-registry (minor change)
- Gemini: No direct impact — their research data files remain the same

**Boss Approval Needed**: Yes — this restructures workflows.ts from 4800 to ~2500 lines
