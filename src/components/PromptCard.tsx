"use client";

import { useState } from "react";

interface PromptCardProps {
  name: string;
  content: string;
}

export function PromptCard({ name, content }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-[13px] font-mono font-medium text-white tracking-wide">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span
            onClick={handleCopy}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/[0.04]">
          <pre className="mt-4 text-[12px] text-white/30 leading-relaxed whitespace-pre-wrap font-sans">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
