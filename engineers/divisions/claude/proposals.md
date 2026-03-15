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

---

### 2026-03-16 — Documentation AI Agent

**Problem**: No dedicated agent reviews code changes for documentation impact. Theme guides, style guides, logs, and internal docs drift out of sync as engineers ship features. Nobody owns doc hygiene.

**Proposed Solution**: Create a new AI engineer (e.g. `doc-reviewer`) responsible for:
- Reviewing recent code changes and identifying documentation gaps
- Updating style guides, theme docs, and component usage guides
- Maintaining changelogs and internal engineering logs
- Ensuring README/guide accuracy after refactors
- Auditing doc freshness and flagging stale content

The agent would run on a schedule (or be triggered post-merge), read recent diffs, cross-reference existing docs, and produce patches or new doc content submitted through the Decision Queue for PM approval.

**Alternatives Considered**:
- Add doc checks to existing engineers → rejected because it dilutes their primary responsibilities and docs always become the lowest priority side-task
- Manual doc reviews → rejected because they don't scale and are consistently skipped

**Impact on Other Divisions**:
- Cursor: May receive doc update suggestions for component-level guides
- Gemini: May receive suggestions for research methodology docs
- All divisions benefit from having their output documented automatically

**Boss Approval Needed**: Yes — new agent definition, workflow, and scheduling
