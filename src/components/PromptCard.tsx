"use client";

import { useState } from "react";
import type { PromptVariant } from "@/data/prompts";

interface PromptCardProps {
  name: string;
  variants: PromptVariant[];
}

export function PromptCard({ name, variants }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);

  const content = variants[activeVariant].content;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
      {/* Header — clickable to expand/collapse */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="group relative p-6 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center justify-between gap-6">
          <span className="text-[13px] font-mono font-medium text-white tracking-wide">
            {name}
          </span>

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
      </div>

      {/* Tabs — always visible when there are multiple variants */}
      {variants.length > 1 && (
        <div className="px-6 pb-4">
          <div className="inline-flex rounded-lg bg-white/[0.03] p-0.5">
            {variants.map((variant, i) => (
              <button
                key={variant.label}
                onClick={() => setActiveVariant(i)}
                className={`relative px-4 py-1.5 rounded-md text-[11px] font-mono tracking-wide transition-all duration-200 ${
                  i === activeVariant
                    ? "bg-white/[0.08] text-white/80 shadow-sm"
                    : "text-white/25 hover:text-white/45"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-white/[0.04]">
            <div className="rounded-lg bg-white/[0.02] border-l-2 border-white/[0.06] p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-white/40 leading-[1.7] whitespace-pre-wrap">
                {content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
