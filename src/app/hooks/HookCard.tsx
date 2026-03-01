'use client';

import { useState, useCallback, useEffect } from 'react';

interface HookCardProps {
  plugin: {
    id: string;
    name: string;
    version: string;
    phase: string;
    matchers: string[];
    description: string;
    config: { key: string; value: string }[];
    script: string;
  };
}

function PhaseBadge({ phase }: { phase: string }) {
  const colors = phase.includes("Pre")
    ? "bg-sky-500/10 text-sky-400/70 border-sky-500/20"
    : "bg-emerald-500/10 text-emerald-400/70 border-emerald-500/20";

  return (
    <span
      className={`text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded border ${colors}`}
    >
      {phase}
    </span>
  );
}

function MatcherPill({ matcher }: { matcher: string }) {
  return (
    <span className="text-[10px] font-mono text-white/20 px-1.5 py-0.5 rounded bg-white/[0.03]">
      {matcher}
    </span>
  );
}

export default function HookCard({ plugin }: HookCardProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = useCallback(() => {
    navigator.clipboard.writeText(plugin.script);
    setCopiedPrompt(true);
  }, [plugin.script]);

  useEffect(() => {
    if (copiedPrompt) {
      const timerId = setTimeout(() => setCopiedPrompt(false), 2000);
      return () => clearTimeout(timerId);
    }
  }, [copiedPrompt]);

  return (
    <div
      id={plugin.id}
      className="relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] scroll-mt-20"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[14px] font-medium text-white tracking-wide">
            {plugin.name}
          </span>
          <PhaseBadge phase={plugin.phase} />
          <span className="text-[10px] font-mono text-white/15">
            v{plugin.version}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            Turned off
          </span>
        </div>
      </div>
      <p className="text-[12px] text-white/35 leading-relaxed mb-4">
        {plugin.description}
      </p>

      {/* Matchers */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/20 mr-1">
          Triggers
        </span>
        {plugin.matchers.map((m) => (
          <MatcherPill key={m} matcher={m} />
        ))}
      </div>

      {/* View / Copy prompt */}
      <div className="sm-flex sm-gap-6 sm-mb-16">
        <button type="button" onClick={() => setShowPrompt(!showPrompt)} className="sm-ed-action-btn-sm sm-ml-auto">
          {showPrompt ? "Hide prompt" : "View prompt"}
        </button>
        <button
          type="button"
          onClick={handleCopyPrompt}
          className="sm-ed-action-btn-sm"
          data-state={copiedPrompt ? "success" : undefined}
        >
          {copiedPrompt ? "Copied!" : "Copy prompt"}
        </button>
      </div>

      {showPrompt && (
        <div className="sm-scrollbox-short sm-mb-16 sm-rounded-8 sm-bg-surface2 sm-p-16" style={{ borderLeft: "2px solid var(--border)" }}>
          <pre className="sm-subtle-sm" style={{ fontFamily: "var(--font-mono, monospace)", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
            {plugin.script}
          </pre>
        </div>
      )}

      {/* Config */}
      <div className="bg-white/[0.015] rounded-lg border border-white/[0.04] p-4">
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/20 block mb-2">
          Configuration
        </span>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
          {plugin.config.map((c) => (
            <div key={c.key} className="flex items-center justify-between">
              <span className="text-[11px] text-white/30 font-mono">
                {c.key}
              </span>
              <span className="text-[11px] text-white/50 font-mono">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
