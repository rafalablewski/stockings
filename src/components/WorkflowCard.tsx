"use client";

import { useState, useRef, useCallback } from "react";

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
  const [activeVariant, setActiveVariant] = useState(0);
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const variant = variants[activeVariant];

  const handleRun = useCallback(async () => {
    if (!userData.trim()) return;

    setRunning(true);
    setResult("");
    setError("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/workflow/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: variant.prompt,
          context: variant.context,
          data: userData,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setError(err.error || `Error ${res.status}`);
        setRunning(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setError("No response stream");
        setRunning(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") continue;
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                setResult((prev) => prev + data.text);
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setRunning(false);
    }
  }, [userData, variant]);

  const handleStop = () => {
    abortRef.current?.abort();
    setRunning(false);
  };

  const handleCopyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative block rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 overflow-hidden">
      {/* Header - always visible */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] font-mono font-medium text-white tracking-wide">
                {name}
              </span>
            </div>
            <p className="text-[12px] text-white/25 leading-relaxed">
              {description}
            </p>
          </div>

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

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="pt-2 border-t border-white/[0.04]">
            {/* Company selector */}
            {variants.length > 1 && (
              <div className="flex items-center gap-1 mb-4">
                {variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => {
                      setActiveVariant(i);
                      setResult("");
                      setError("");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-medium transition-all ${
                      i === activeVariant
                        ? "bg-white/[0.08] text-white/70 border border-white/[0.12]"
                        : "text-white/20 hover:text-white/40 hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            {/* Context modules badges */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-[10px] text-white/15 mr-1">Context:</span>
              {variant.contextModules.map((mod) => (
                <span
                  key={mod}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400/40 capitalize"
                >
                  {mod}
                </span>
              ))}
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="ml-auto text-[10px] text-white/20 hover:text-white/40 transition-colors"
              >
                {showPrompt ? "Hide prompt" : "View prompt"}
              </button>
            </div>

            {/* Prompt preview (collapsible) */}
            {showPrompt && (
              <div className="mb-4 rounded-lg bg-white/[0.02] border-l-2 border-white/[0.06] p-4 overflow-x-auto max-h-64 overflow-y-auto">
                <pre className="text-[11px] font-mono text-white/30 leading-[1.7] whitespace-pre-wrap">
                  {variant.prompt}
                </pre>
              </div>
            )}

            {/* Data input textarea */}
            <div className="relative">
              <textarea
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder="Paste your data here — earnings call transcript, SEC filing, Form 4 filings, news articles..."
                className="w-full h-48 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-white/[0.15] focus:bg-white/[0.04] text-[12px] font-mono text-white/60 placeholder:text-white/15 p-4 resize-y outline-none transition-all leading-relaxed"
                disabled={running}
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-white/15">
                {userData.length > 0 ? `${(userData.length / 1000).toFixed(1)}k chars` : ""}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {!running ? (
                <button
                  onClick={handleRun}
                  disabled={!userData.trim()}
                  className={`px-5 py-2 rounded-lg text-[12px] font-medium transition-all ${
                    userData.trim()
                      ? "bg-white/[0.08] hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/[0.1]"
                      : "bg-white/[0.03] text-white/15 border border-white/[0.04] cursor-not-allowed"
                  }`}
                >
                  Run Analysis
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="px-5 py-2 rounded-lg text-[12px] font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400/70 border border-red-500/20 transition-all"
                >
                  Stop
                </button>
              )}

              {running && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                  <span className="text-[11px] text-white/30">Analyzing...</span>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-[12px] text-red-400/70">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                  <span className="text-[10px] uppercase tracking-wider text-white/25">
                    Analysis Result
                  </span>
                  <button
                    onClick={handleCopyResult}
                    className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="p-4 max-h-[600px] overflow-y-auto">
                  <pre className="text-[12px] font-mono text-white/50 leading-[1.8] whitespace-pre-wrap">
                    {result}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
