import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import HookCard from "./HookCard";
import '../abison-pages.css';

export const metadata: Metadata = {
  title: "Agent Hooks | ABISON",
  description:
    "Installed Claude Code plugin hooks — code review, simplification, CLAUDE.md management, and agent impact detection",
};

const plugins = [
  {
    id: "code-review",
    name: "Code Review",
    version: "1.0.0",
    phase: "Pre + Post",
    matchers: ["Edit", "Write", "NotebookEdit"],
    description:
      "Automated code review enforcing quality standards through pre/post edit hooks, lint checks, and configurable review rules.",
    config: [
      { key: "enableLintCheck", value: "true" },
      { key: "enableTypeCheck", value: "true" },
      { key: "enableSecurityScan", value: "true" },
      { key: "enableStyleEnforcement", value: "true" },
      { key: "autoFixOnSave", value: "false" },
      { key: "blockOnError", value: "false" },
    ],
    scriptFile: "review-hook.sh",
  },
  {
    id: "claude-md-management",
    name: "CLAUDE.md Management",
    version: "1.0.0",
    phase: "Post",
    matchers: ["Edit", "Write"],
    description:
      "Validates CLAUDE.md structure, enforces consistent formatting, and warns when project conventions change without updating CLAUDE.md.",
    config: [
      { key: "validateStructure", value: "true" },
      { key: "enforceRequiredSections", value: "true" },
      { key: "warnOnConventionDrift", value: "true" },
    ],
    scriptFile: "md-hook.sh",
  },
  {
    id: "code-simplifier",
    name: "Code Simplifier",
    version: "1.0.0",
    phase: "Post",
    matchers: ["Edit", "Write", "NotebookEdit"],
    description:
      "Detects overly complex code patterns after edits — long functions, deep nesting, excessive parameters, and complex conditionals.",
    config: [
      { key: "maxFunctionLines", value: "50" },
      { key: "maxNestingDepth", value: "4" },
      { key: "maxParameters", value: "5" },
      { key: "maxConditionClauses", value: "3" },
    ],
    scriptFile: "simplifier-hook.sh",
  },
  {
    id: "agent-impact-detector",
    name: "Agent Impact Detector",
    version: "1.0.0",
    phase: "Post",
    matchers: ["Edit", "Write", "NotebookEdit"],
    description:
      "Warns when file edits impact AI agent behavior — detects changes to agent config, instructions, plugin hooks, prompt data, and MCP servers.",
    config: [
      { key: "Agent Config", value: "HIGH" },
      { key: "Agent Instructions", value: "HIGH" },
      { key: "Plugin Scripts", value: "HIGH" },
      { key: "Plugin Config", value: "MEDIUM" },
      { key: "Prompt Data", value: "MEDIUM" },
      { key: "MCP Config", value: "HIGH" },
    ],
    scriptFile: "impact-hook.sh",
  },
  {
    id: "methodology-sync-checker",
    name: "Methodology Sync Checker",
    version: "1.0.0",
    phase: "Post",
    matchers: ["Edit", "Write", "NotebookEdit"],
    description:
      "Detects when Sources or EDGAR pipeline code changes and reminds you to review the corresponding methodology section for accuracy. Watches API routes, shared tab components, data files, and the DB schema.",
    config: [
      { key: "Sources Pipeline", value: "6 watch paths" },
      { key: "EDGAR Pipeline", value: "3 watch paths" },
      { key: "Data globs", value: "sec-filings, press-releases" },
      { key: "Schema files", value: "schema.ts (both)" },
    ],
    scriptFile: "sync-hook.sh",
  },
];

function readScript(pluginId: string, scriptFile: string): string {
  try {
    const scriptPath = path.join(process.cwd(), ".claude", "plugins", pluginId, scriptFile);
    return fs.readFileSync(scriptPath, "utf-8");
  } catch {
    return "";
  }
}

export default function HooksPage() {
  const pluginsWithScripts = plugins.map(({ scriptFile, ...plugin }) => ({
    ...plugin,
    script: readScript(plugin.id, scriptFile),
  }));

  const preCount = plugins.filter((p) => p.phase.includes("Pre")).length;
  const postCount = plugins.filter((p) => p.phase.includes("Post")).length;

  return (
    <div className="ab-app">
      <div className="ab-header">
        <div className="ab-subtitle">Platform / Hooks</div>
        <div className="ab-title">Agent Hooks</div>
        <div className="ab-desc">
          Installed Claude Code plugin hooks that run automatically during
          editing sessions. Each hook fires on specific tool calls and
          enforces quality, safety, or structural rules.
        </div>
        <div className="ab-warning">All hooks are currently turned off in .claude/settings.json.</div>

        <div className="ab-kpi-strip">
          <div className="ab-kpi">
            <div className="ab-kpi-value">{plugins.length}</div>
            <div className="ab-kpi-label">Plugins</div>
          </div>
          <div className="ab-kpi">
            <div className="ab-kpi-value">{preCount}</div>
            <div className="ab-kpi-label">Pre-hooks</div>
          </div>
          <div className="ab-kpi">
            <div className="ab-kpi-value">{postCount}</div>
            <div className="ab-kpi-label">Post-hooks</div>
          </div>
        </div>
      </div>

      <div className="ab-feed">
        {pluginsWithScripts.map((plugin) => (
          <HookCard key={plugin.id} plugin={plugin} />
        ))}

        <div className="ab-footnote">
          Hook configuration lives in .claude/plugins — edit plugin.json to customise thresholds and rules.
        </div>
      </div>
    </div>
  );
}
