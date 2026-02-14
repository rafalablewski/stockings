"use client";

import { useState } from "react";

interface WorkflowVariant {
  label: string;
  prompt: string;
  context: string;
  contextModules: string[];
}

interface WorkflowCardProps {
  name: string;
  description: string;
  variants: WorkflowVariant[];
}

export function WorkflowCard({ name, description, variants }: WorkflowCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);

  const variant = variants[activeVariant];

  const getClipboardContent = () => {
    const separator = '\n\n════════════════════════════════════════════════════════════\nCURRENT DATABASE CONTEXT\nAuto-injected from ABISON database\n════════════════════════════════════════════════════════════\n\n';
    const footer = '\n\n════════════════════════════════════════════════════════════\nYOUR CONTENT BELOW\n════════════════════════════════════════════════════════════\n\n';
    return variant.prompt + separator + variant.context + footer;
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(getClipboardContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="group relative block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[13px] font-mono font-medium text-white tracking-wide">
              {name}
            </span>
          </div>
          {variants.length > 1 && (
            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
              {variants.map((v, i) => (
                <span key={v.label} className="flex items-center">
                  {i > 0 && (
                    <span className="text-[10px] text-white/10 mx-2">&middot;</span>
                  )}
                  <span
                    role="button"
                    onClick={() => setActiveVariant(i)}
                    className={`text-[11px] uppercase tracking-wider cursor-pointer transition-colors ${
                      i === activeVariant
                        ? "text-white/50"
                        : "text-white/15 hover:text-white/30"
                    }`}
                  >
                    {v.label}
                  </span>
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-[12px] text-white/25 leading-relaxed">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {variant.contextModules.map((mod) => (
              <span
                key={mod}
                className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/20 capitalize"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            onClick={handleCopy}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
            <svg
              className={`w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-all duration-200 ${expanded ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="relative mt-4 pt-4 border-t border-white/[0.04]">
          <div className="rounded-lg bg-white/[0.02] border-l-2 border-white/[0.06] p-4 overflow-x-auto">
            <pre className="text-[11px] font-mono text-white/40 leading-[1.7] whitespace-pre-wrap">
              {variant.prompt}
            </pre>
          </div>
          <div className="mt-3 rounded-lg bg-white/[0.02] border-l-2 border-emerald-500/20 p-4 overflow-x-auto">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400/40 mb-2">
              Auto-injected context
            </div>
            <pre className="text-[11px] font-mono text-white/30 leading-[1.7] whitespace-pre-wrap">
              {variant.context}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
