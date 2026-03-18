# Shared Conventions — All Divisions

These conventions apply to all AI divisions equally. When in doubt, follow these defaults. The Boss can override any convention via `engineers/board/decisions.md`.

## Code Standards
- **Language**: TypeScript (strict mode)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Linting**: ESLint — run `npm run lint` before submitting work
- **Type Safety**: `npx tsc --noEmit` must pass — no `any` types without justification

## File Naming
- Components: `PascalCase.tsx` (e.g., `UserCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- API routes: `route.ts` inside `app/api/` directories
- Pages: `page.tsx` inside route directories

## Organization Chart
| Division | Lead | Responsibilities | Reports To |
|---|---|---|---|
| Architecture & Backend | Claude | APIs, server logic, database, infrastructure | Boss |
| ML & AI Systems | Cursor | ML models, AI features, data pipelines, execution engine, prompt templates | Boss |
| Research & Data | Gemini | Research, analysis, documentation, testing | Boss |
| Frontend & UI | Maszka | Components, styling, client interactivity, performance, approves doc/styling proposals | Boss |
| Controlling & Audit PM | Bobman | Quality control, prompt-codebase sync, documentation audits, task coordination | Boss |
| Documentation | Doc-Reviewer | Style guides, theme docs, changelogs, doc audits, guidelines reports | Bobman |

### Approval Chain — Documentation & Styling
```
Doc-Reviewer (audit report) → UX/UI Engineer (implements/proposes) → Maszka (approves/rejects)
```

## Git & Workflow
- Each division works on its own tasks from `engineers/board/current-sprint.md`
- Update your division's `status.md` after completing work
- Do NOT modify another division's files without Boss approval
- Commit messages: `[division] description` (e.g., `[claude] add user API route`)

## Cross-Division Communication
- Need something from another division? Document it in your division's workspace
- Conflicts between divisions are escalated to the Boss via status reports
- Shared interfaces (types, APIs) go in `src/lib/types.ts` — coordinate changes

## Image Sources
- Use Unsplash or picsum.photos for placeholder images
- Do NOT use Pexels (403 errors)

## Data File Rules
- **Barrel Export Rule**: Every exported constant, function, array, or type in `src/data/{ticker}/*.ts` MUST be re-exported from that ticker's `src/data/{ticker}/index.ts` barrel file. Exports not in the barrel are invisible to the UI. This is the #1 cause of "data exists but doesn't show" bugs.
- **Validation**: Run `bash scripts/check-barrel-exports.sh` after ANY data file changes. Also covered by `npx tsx scripts/validate-data.ts`.
- **New data files**: When creating a new `.ts` file in a ticker's data directory, add a corresponding import/export block to that ticker's `index.ts`.

## Quality Checklist
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `bash scripts/check-barrel-exports.sh` passes (if data files changed)
- [ ] Changes are responsive (mobile + desktop)
- [ ] No hardcoded secrets or credentials
- [ ] Status report updated
