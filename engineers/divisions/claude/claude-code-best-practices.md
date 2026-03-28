# Claude Code Best Practices

Extracted from [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)

---

## Core Claude Code Features & Their Locations

| Feature | Location | Purpose |
|---------|----------|---------|
| **Subagents** | `.claude/agents/<name>.md` | Autonomous actors in isolated contexts with custom tools, permissions, model, memory, and persistent identity |
| **Commands** | `.claude/commands/<name>.md` | User-invoked prompt templates for workflow orchestration; knowledge injected into existing context |
| **Skills** | `.claude/skills/<name>/SKILL.md` | Configurable, preloadable, auto-discoverable with context forking and progressive disclosure |
| **Hooks** | `.claude/hooks/` | User-defined handlers (scripts, HTTP, prompts, agents) running outside agentic loop on specific events |
| **MCP Servers** | `.claude/settings.json`, `.mcp.json` | Model Context Protocol connections to external tools, databases, and APIs |
| **Plugins** | distributable packages | Bundles of skills, subagents, hooks, and MCP servers |
| **Settings** | `.claude/settings.json` | Hierarchical config: permissions, model config, output styles, sandboxing, keybindings, fast mode |
| **Memory** | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/` | Persistent context via CLAUDE.md files and `@path` imports; auto memory and rules organization |
| **Checkpointing** | automatic git-based | Tracks file edits with rewind (`Esc Esc` or `/rewind`) and targeted summarization |

---

## Orchestration Pattern: Command -> Agent -> Skill (C->A->S)

- **Commands** invoke agents with task specifications
- **Agents** orchestrate skills for execution
- **Skills** handle focused, reusable logic
- Convergent workflow pattern: **Research -> Plan -> Execute -> Review -> Ship**

---

## Prompting Best Practices

1. **Don't micromanage** - Challenge Claude instead: "grill me on these changes and don't make a PR until I pass your test" or "prove to me this works" and have Claude diff between main and your branch
2. **Let Claude reconsider** - After a mediocre fix: "knowing everything you know now, scrap this and implement the elegant solution"
3. **Trust autonomy** - Claude fixes most bugs by itself; paste the bug, say "fix", don't micromanage how

---

## Planning & Specs Best Practices

1. **Always start with plan mode** - Use `/plan` before implementation
2. **Let Claude interview you** - Start with a minimal spec and ask Claude to interview you using `AskUserQuestion` tool, then execute the spec in a new session
3. **Phase-wise gated plans** - Make plans with multiple tests per phase (unit, automation, integration)
4. **Cross-review plans** - Spin up a second Claude to review the plan as a staff engineer, or use cross-model review
5. **Detailed specs reduce iterations** - The more detail upfront, the fewer iteration cycles needed
6. **Capture requirements first** - Use specs to capture requirements before any implementation begins

---

## Agent Design Best Practices

- Design agents with **single responsibility**
- Provide clear **context and success criteria**
- Use **agent teams** for parallel work on the same codebase
- Each agent should have **isolated permissions and tools**
- Define **persistent identity** for long-running agents
- Test agent behavior before production use

---

## Commands Best Practices

- Keep commands focused on a **single workflow step**
- Use **templates** for consistent execution
- Provide clear **parameter documentation**
- Support both **interactive and non-interactive** modes
- Leverage for **orchestrating multiple skills/agents**

---

## Skills Best Practices

- Design skills as **reusable, composable units**
- Implement **progressive disclosure** of capabilities
- Support **context forking** for variant behaviors
- Document **success/failure patterns** clearly
- **Version skills** for compatibility management

---

## Hooks Best Practices

- Run handlers **outside the agentic loop** for safety
- Support script, HTTP, prompt, and agent handlers
- Trigger on **specific, well-defined events**
- Implement **idempotency** for reliability
- **Log all hook executions** for debugging

---

## Memory / CLAUDE.md Best Practices

- Use `CLAUDE.md` for **persistent project context**
- Organize rules in `.claude/rules/` directory
- Leverage **`@path` imports** for modular memory
- **Update memory** as the project evolves
- Use **hierarchical rules** organization

---

## Git / PR Best Practices

- Use **git worktrees** for parallel agent work
- Implement **automated PR reviews** with agents
- Enable **checkpointing** for file edit tracking
- Support **rewind** functionality for edits (`/rewind`)
- Integrate with **GitHub Actions** for CI/CD
- Leverage **code review agents** for quality gates

---

## Debugging Best Practices

- Use `/rewind` to reverse changes
- Enable **session logs** for reasoning analysis
- Implement **targeted summarization** of changes
- Monitor agent decision-making with logs
- **Test plans before full execution**
- Use **checkpoints to isolate** problem areas

---

## Daily Workflow Recommendations

1. Start sessions with `/plan` mode
2. Use appropriate permission mode (`auto` for safe operations)
3. Leverage agent teams for parallel work
4. Implement checkpointing for all sessions
5. Use skills for reusable logic across projects
6. Monitor context usage via status line
7. Review agent decisions before approval
8. Test critical changes before shipping
9. Use commands for workflow consistency
10. Maintain project memory in `CLAUDE.md`

---

## Configuration Best Practices

- Store settings in `.claude/settings.json` hierarchically
- Define permissions clearly per agent/skill
- Configure appropriate sandboxing for security
- Set up keybindings for frequently used commands
- Enable fast mode for rapid iteration
- Configure status line for useful visibility

---

## Notable Workflow Frameworks (by community adoption)

| Framework | Key Idea |
|-----------|----------|
| **Superpowers** | TDD-first, Iron Laws, whole-plan review |
| **Everything Claude Code** | Instinct scoring, AgentShield, multi-language rules |
| **Spec Kit** | Spec-driven development, constitution, 22+ tools |
| **gstack** | Role personas, parallel sprints |
| **Get Shit Done** | Fresh 200K contexts, wave execution, XML plans |
| **BMAD-METHOD** | Full SDLC, agent personas, 22+ platforms |
| **OpenSpec** | Delta specs, brownfield support, artifact DAG |
| **Compound Engineering** | Compound learning, plugin marketplace |
| **HumanLayer** | RPI, context engineering, 300k+ LOC proven |

---

## Hot / Beta Features Worth Exploring

- **Auto Mode** (`--permission-mode auto`) - Background safety classifier replaces manual permission prompts
- **Channels** (`--channels`) - Push events from Telegram, Discord, or webhooks into running sessions
- **Slack Integration** (`@Claude`) - Route coding tasks to Claude Code web sessions
- **Chrome** (`--chrome`) - Browser automation, testing, debugging with console
- **Scheduled Tasks** (`/loop`, `/schedule`) - Recurring local or cloud-based agent tasks
- **Voice Dictation** (`/voice`) - Push-to-talk speech input, 20 languages
- **Agent Teams** - Multiple agents working in parallel with shared task coordination
- **Remote Control** (`/remote-control`) - Continue local sessions from any device
- **Git Worktrees** - Isolated branches for parallel development per agent
