# AI Engineers & PMs — Prompt Analysis

**Date**: 2026-03-16
**Analyst**: Claude (Architecture & Backend Division)

---

## Organization Overview

The ABISON project uses a **6-division multi-AI engineering organization**. All divisions report to the Boss (human), with one exception: Doc-Reviewer reports to Bobman.

```
                          ┌─────────┐
                          │  BOSS   │
                          │ (Human) │
                          └────┬────┘
          ┌──────────┬────────┼────────┬──────────┐
          ▼          ▼        ▼        ▼          ▼
      ┌───────┐ ┌────────┐ ┌──────┐ ┌──────┐ ┌────────┐
      │Claude │ │Cursor  │ │Gemini│ │Maszka│ │Bobman  │
      │Backend│ │ML & AI │ │R & D │ │ UI   │ │  PM    │
      └───────┘ └────────┘ └──────┘ └──┬───┘ └───┬────┘
                                       │         │
                                  UX/UI Eng  ┌────────────┐
                                       ▲     │Doc-Reviewer│
                                       │     └────────────┘
                                       └──────────┘
                              (audit reports flow up)
```

---

## 1. Claude — Architecture & Backend Division

### Prompt Source
- **File**: `/CLAUDE.md` (root)
- **Loaded by**: Claude Code (Anthropic CLI)

### Prompt Summary
Defines Claude as the **Architecture & Backend Division Lead**. Responsible for system architecture, backend logic, API routes, database schema, migrations, refactoring, code review, and DevOps.

### Owned Territories
`src/app/api/`, `src/lib/`, `src/data/`, `scripts/`, `drizzle.config.ts`, `middleware.ts`, server components

### Key Behavioral Rules
- Run `npm run lint` and `npx tsc --noEmit` after changes
- No `any` types without justification
- Prefer server components
- Document architecture decisions in `proposals.md` before acting
- Never override other divisions' work — note conflicts in status report

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Read sprint directives |
| `engineers/board/decisions.md` | Board | Check Boss rulings |
| `engineers/divisions/claude/status.md` | Self | Update status |
| `engineers/divisions/claude/proposals.md` | Self | Post architecture proposals |
| `engineers/shared/conventions.md` | Shared | Follow standards |
| `.claude/plugins/code-review/review-rules.json` | Plugin | Code review guidelines |

### Connections to Other Engineers
- **Maszka**: Collaborate on shared components in `src/components/`
- **Cursor**: Peer; listed as ML & AI Systems (not Frontend, despite `.cursorrules` title)
- **Gemini**: Peer; no direct code dependency

### Active Proposals
1. **Dynamic Prompt Template Architecture** (2026-03-15) — pending Boss approval
2. **Documentation AI Agent** (2026-03-16) — APPROVED and implemented

---

## 2. Cursor — ML & AI Systems Division

### Prompt Source
- **File**: `/.cursorrules` (root)
- **Loaded by**: Cursor IDE

### Prompt Summary
Despite the file title saying "Frontend & UI Division Lead", the **conventions.md org chart** assigns Cursor to **ML & AI Systems** (ML models, AI features, data pipelines, execution engine, prompt templates). The `.cursorrules` prompt text itself describes Frontend/UI responsibilities.

### Discrepancy Alert
| Source | Role Assigned |
|---|---|
| `.cursorrules` prompt text | Frontend & UI Division Lead |
| `conventions.md` org chart | ML & AI Systems |
| `CLAUDE.md` peer reference | ML & AI Systems Division |

This is a **naming/role conflict**. The prompt was likely written before the org restructure that created Maszka as the true Frontend lead. The `.cursorrules` content still describes frontend work but the organizational structure has shifted Cursor to ML/AI.

### Owned Territories (per prompt)
`src/components/`, `src/app/**/page.tsx`, `src/app/**/layout.tsx`, client components, `public/` assets

### Owned Territories (per org chart)
ML models, AI features, data pipelines, execution engine, prompt templates

### Key Behavioral Rules
- Use Tailwind CSS for styling
- Semantic HTML, ARIA labels
- `"use client"` only when truly needed
- Small, composable components
- Do NOT modify API routes or database logic

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Read sprint directives |
| `engineers/board/decisions.md` | Board | Check Boss rulings |
| `engineers/divisions/cursor/status.md` | Self | Update status |
| `engineers/divisions/cursor/ui-specs.md` | Self | Post UI specs |
| `engineers/shared/conventions.md` | Shared | Follow standards |

### Connections to Other Engineers
- **Claude**: Backend dependency for new API endpoints
- **Gemini**: Peer
- **Maszka**: Overlap — both claim frontend ownership (conflict)

---

## 3. Gemini — Research & Data Division

### Prompt Source
- **File**: `/.gemini/styleguide.md`
- **Loaded by**: Gemini (Google AI)
- **Supplementary**: `engineers/onboarding/gemini-onboarding.md` (comprehensive onboarding brief)

### Prompt Summary
Research & Data Division Lead. Responsible for research, analysis, documentation, testing, benchmarking, and best-practice recommendations. **Cannot modify production code** — must propose changes for owning divisions to implement.

### Owned Territories
`engineers/divisions/gemini/`, documentation, research outputs, test files, `audit/`

### Key Behavioral Rules
- Cite sources, provide evidence
- Compare 2-3 alternatives before recommending
- Include trade-offs and risks
- Provide actionable, specific recommendations
- Do NOT directly modify production source code

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Read sprint directives |
| `engineers/board/decisions.md` | Board | Check Boss rulings |
| `engineers/divisions/gemini/status.md` | Self | Update status |
| `engineers/divisions/gemini/research.md` | Self | Post findings |
| `engineers/shared/conventions.md` | Shared | Follow standards |

### Connections to Other Engineers
- **Claude**: Recommends backend changes for Claude to implement
- **Cursor**: Recommends frontend/ML changes for Cursor to implement
- **Maszka**: No direct mention, but research may affect UI

### Unique Resources
- **Onboarding doc** (`engineers/onboarding/gemini-onboarding.md`): Most detailed onboarding of any engineer — includes full tech stack, room API usage, division identities, commit conventions
- **Room API access**: Can communicate via `/api/room` with channels `#general`, `#backend`, `#frontend`, `#research`, `#ml`, `#planning`

---

## 4. Maszka — Frontend & UI Division

### Prompt Source
- **File**: `engineers/divisions/maszka/CLAUDE.md`
- **Loaded by**: Claude Code (running as Maszka persona)

### Prompt Summary
Frontend & UI Division Lead with **approval authority** over documentation and styling changes. Manages two sub-engineers: Performance Engineer and UX/UI Engineer.

### Owned Territories
`src/components/`, `src/app/` pages, theme files, design tokens, style documentation, UX guidelines

### Key Behavioral Rules
- Final approve/reject authority on doc-reviewer proposals
- Manage Performance Engineer and UX/UI Engineer
- Ensure visual consistency
- Own theme configuration and design tokens

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Read sprint directives |
| `engineers/divisions/maszka/status.md` | Self | Update status |
| `engineers/divisions/doc-reviewer/proposals.md` | Doc-Reviewer | Review incoming proposals |
| `engineers/shared/conventions.md` | Shared | Follow standards |

### Connections to Other Engineers
- **Claude**: Collaborate on shared components
- **Cursor**: Collaborate on ML/AI pipeline UI
- **Doc-Reviewer**: Receives proposals via UX/UI Engineer; has approve/reject authority
- **Bobman**: Indirect — Doc-Reviewer reports to Bobman but proposals route to Maszka

### Unique Position
Only engineer with **managerial authority** over other engineers/roles (UX/UI Engineer, Performance Engineer). Only engineer with **approval/rejection power** in the org.

---

## 5. Bobman — ML & AI Project Management Division

### Prompt Source
- **No dedicated prompt file found** (no `.bobman` config, no `CLAUDE.md` in bobman's directory)
- Defined only via references in `conventions.md` and other engineers' prompts

### Prompt Summary (inferred)
Sprint planning, task coordination, prompt-codebase sync. Acts as PM for the ML/AI pipeline. **Direct supervisor of Doc-Reviewer**.

### Owned Territories
`engineers/divisions/bobman/` (proposals, status, tasklists)

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Listed as division with tasks |
| `engineers/divisions/bobman/status.md` | Self | Status reporting |
| `engineers/divisions/bobman/proposals.md` | Self | ML/AI proposals |
| `engineers/divisions/bobman/tasklists.md` | Self | PM task lists |

### Connections to Other Engineers
- **Doc-Reviewer**: Direct report; receives status updates
- **Maszka**: Indirect — Doc-Reviewer's proposals go to Maszka for approval
- **All divisions**: Task coordination role

### Missing Resources
- **No prompt file**: Unlike every other engineer, Bobman has no system prompt (`.cursorrules`, `.gemini/`, or `CLAUDE.md`)
- **No onboarding doc**: Unlike Gemini, no onboarding brief exists
- **Tasklist template**: Has template but no active task lists

---

## 6. Doc-Reviewer — Documentation Engineer

### Prompt Source
- **File**: `engineers/divisions/doc-reviewer/CLAUDE.md`
- **Loaded by**: Claude Code (running as Doc-Reviewer persona)

### Prompt Summary
Reviews code changes for documentation impact. Creates styling guidelines, theme reports, and audit reports. **Only engineer that doesn't report directly to Boss** — reports to Bobman.

### Owned Territories
Documentation files, style guides, theme docs, changelogs, usage guides

### Key Behavioral Rules
- Can read all division code and status reports
- Cannot modify source code
- Cannot override other divisions or merge own changes
- Every report must reference specific files/commits

### Cross-References
| Reference | Target | Purpose |
|---|---|---|
| `engineers/board/current-sprint.md` | Board | Read sprint directives |
| `engineers/divisions/doc-reviewer/status.md` | Self | Report to Bobman |
| `engineers/divisions/doc-reviewer/proposals.md` | Self | Submit doc changes |
| `engineers/shared/conventions.md` | Shared | Follow standards |

### Connections to Other Engineers
- **Bobman**: Reports to (supervisor)
- **Maszka**: Final approver of all proposals
- **UX/UI Engineer** (under Maszka): Direct recipient of audit reports

### Approval Chain
```
Doc-Reviewer (audit) → UX/UI Engineer (implement) → Maszka (approve/reject)
```

---

## Cross-Cutting Analysis

### Shared Resources (All Engineers)
| Resource | Path | Purpose |
|---|---|---|
| Sprint Board | `engineers/board/current-sprint.md` | Task assignments |
| Decision Log | `engineers/board/decisions.md` | Boss rulings |
| Conventions | `engineers/shared/conventions.md` | Universal standards |
| Room API | `/api/room` | Real-time chat (6 channels) |

### Prompt Delivery Mechanisms
| Engineer | Prompt File | Loading Mechanism |
|---|---|---|
| Claude | `/CLAUDE.md` | Claude Code CLI |
| Cursor | `/.cursorrules` | Cursor IDE |
| Gemini | `/.gemini/styleguide.md` | Google Gemini |
| Maszka | `engineers/divisions/maszka/CLAUDE.md` | Claude Code CLI (persona) |
| Doc-Reviewer | `engineers/divisions/doc-reviewer/CLAUDE.md` | Claude Code CLI (persona) |
| Bobman | **(none found)** | Unknown / manual |

### Territory Conflicts
| Territory | Claimed By | Status |
|---|---|---|
| `src/components/` | Cursor (via `.cursorrules`) AND Maszka (via CLAUDE.md) | **Conflict** — Maszka is the intended owner per org chart |
| `src/app/**/page.tsx` | Cursor (via `.cursorrules`) AND Maszka (via CLAUDE.md) | **Conflict** — same issue |
| Frontend/UI role | Cursor prompt says "Frontend & UI" but org chart says "ML & AI Systems" | **Role mismatch** |

### Reporting Hierarchy
| Engineer | Reports To | Has Direct Reports |
|---|---|---|
| Claude | Boss | None |
| Cursor | Boss | None |
| Gemini | Boss | None |
| Maszka | Boss | UX/UI Engineer, Performance Engineer |
| Bobman | Boss | Doc-Reviewer |
| Doc-Reviewer | Bobman | None |

### Issues Found

1. **Cursor's `.cursorrules` is stale** — Describes Frontend/UI role but org chart assigns ML/AI Systems. Should be rewritten to match actual responsibilities.

2. **Bobman has no system prompt** — Every other engineer has a prompt file defining their role. Bobman is only defined through references in other files. Needs a dedicated prompt.

3. **Territory overlap** — `src/components/` and page files are claimed by both Cursor's prompt and Maszka's prompt. The org restructure created Maszka for frontend but didn't update Cursor's prompt.

4. **Gemini has the richest onboarding** — Full tech stack, Room API details, division identities. Other engineers lack equivalent onboarding docs, which could lead to inconsistent understanding of the project.

5. **Doc-Reviewer approval chain is documented 3 times** — In doc-reviewer's CLAUDE.md, Maszka's CLAUDE.md, and conventions.md. Good for clarity but creates maintenance burden if the chain changes.

6. **No active sprint** — All divisions are "Idle" with empty sprint board. The organization infrastructure is built but not yet activated.
