import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import HookCard from "./HookCard";

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
      { key: "Data globs", value: "research-sources, sec-filings" },
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

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
            Agent Hooks
          </h1>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-2xl">
            Installed Claude Code plugin hooks that run automatically during
            editing sessions. Each hook fires on specific tool calls and
            enforces quality, safety, or structural rules.
          </p>
          <p className="text-[12px] text-amber-400/80 mt-2">
            All hooks are currently turned off in .claude/settings.json.
          </p>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/[0.06]">
          <div>
            <span className="text-[22px] font-light text-white">
              {plugins.length}
            </span>
            <span className="text-[11px] text-white/30 ml-2 uppercase tracking-[0.15em]">
              Plugins (all turned off)
            </span>
          </div>
          <div className="w-px h-6 bg-white/[0.08]" />
          <div>
            <span className="text-[22px] font-light text-white">
              {plugins.filter((p) => p.phase.includes("Pre")).length}
            </span>
            <span className="text-[11px] text-white/30 ml-2 uppercase tracking-[0.15em]">
              Pre-hooks
            </span>
          </div>
          <div className="w-px h-6 bg-white/[0.08]" />
          <div>
            <span className="text-[22px] font-light text-white">
              {plugins.filter((p) => p.phase.includes("Post")).length}
            </span>
            <span className="text-[11px] text-white/30 ml-2 uppercase tracking-[0.15em]">
              Post-hooks
            </span>
          </div>
        </div>

        {/* Plugin cards */}
        <div className="grid gap-4">
          {pluginsWithScripts.map((plugin) => (
            <HookCard key={plugin.id} plugin={plugin} />
          ))}
        </div>

        <p className="text-[11px] text-white/15 mt-6">
          Hook configuration lives in .claude/plugins — edit plugin.json to
          customise thresholds and rules.
        </p>
      </div>
    </div>
  );
}
