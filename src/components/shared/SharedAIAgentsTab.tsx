"use client";

import React, { useState, useRef, useCallback } from "react";
import { workflows } from "@/data/workflows";

interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  prompt: string;
  requiresUserData: boolean;
  category?: 'audit';
}

interface SharedAIAgentsTabProps {
  ticker: string;
}

// Shared small action button style
const actionBtnBase: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  padding: "4px 10px",
  borderRadius: 4,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border)",
  cursor: "pointer",
  transition: "all 0.15s",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
};

// Individual agent runner — manages its own expand/run/result state
function AgentRunner({ workflow, ticker }: { workflow: AgentWorkflow; ticker: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [applyStatus, setApplyStatus] = useState<"idle" | "applying" | "done" | "error">("idle");
  const [applyMessage, setApplyMessage] = useState("");
  const [commitStatus, setCommitStatus] = useState<"idle" | "committing" | "done" | "error">("idle");
  const [commitMessage, setCommitMessage] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const canRun = !workflow.requiresUserData || userData.trim().length > 0;

  const handleRun = useCallback(async () => {
    if (workflow.requiresUserData && !userData.trim()) return;

    setRunning(true);
    setResult("");
    setError("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/workflow/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: workflow.prompt,
          data: userData || undefined,
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
  }, [userData, workflow]);

  const handleStop = () => {
    abortRef.current?.abort();
    setRunning(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>${workflow.name} — ${ticker.toUpperCase()}</title>
<style>
  body { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px; line-height: 1.8; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 24px; }
  pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; }
  .meta { font-size: 9px; color: #888; margin-bottom: 16px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>${workflow.name}</h1>
<div class="meta">${ticker.toUpperCase()} — ${new Date().toISOString().split("T")[0]} — ABISON Research</div>
<pre>${result.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
  };

  const handleApplyToDb = async () => {
    setApplyStatus("applying");
    setApplyMessage("");
    try {
      const res = await fetch("/api/workflow/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: workflow.id, analysis: result }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApplyStatus("error");
        setApplyMessage(data.error || "Apply failed");
        return;
      }
      setApplyStatus("done");
      setApplyMessage(data.summary || `Applied ${data.patchCount ?? 0} patches`);
    } catch (err) {
      setApplyStatus("error");
      setApplyMessage((err as Error).message);
    }
  };

  const handleCommit = async () => {
    setCommitStatus("committing");
    setCommitMessage("");
    try {
      const res = await fetch("/api/workflow/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: workflow.id, analysis: result }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommitStatus("error");
        setCommitMessage(data.error || "Commit failed");
        return;
      }
      setCommitStatus("done");
      setCommitMessage(data.message || "Committed");
    } catch (err) {
      setCommitStatus("error");
      setCommitMessage((err as Error).message);
    }
  };

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        style={{
          width: "100%",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          background: "none",
          border: "none",
          textAlign: "left",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 13,
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {workflow.name}
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2px 6px",
                borderRadius: 4,
                background: "rgba(255,255,255,0.04)",
                color: workflow.category === 'audit'
                  ? "rgba(234,179,8,0.5)"
                  : workflow.requiresUserData
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(130,200,130,0.5)",
                border: `1px solid ${
                  workflow.category === 'audit'
                    ? "rgba(234,179,8,0.15)"
                    : workflow.requiresUserData
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(130,200,130,0.15)"
                }`,
              }}
            >
              {workflow.category === 'audit' ? "Audit" : workflow.requiresUserData ? "Paste data" : "Database"}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>
            {workflow.description}
          </div>
        </div>
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.2s",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            marginTop: 4,
            flexShrink: 0,
          }}
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
          {/* View prompt toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              paddingTop: 16,
              marginBottom: 16,
            }}
          >
            <button
              type="button"
              onClick={() => setShowPrompt(!showPrompt)}
              style={{
                marginLeft: "auto",
                fontSize: 9,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2px 6px",
                borderRadius: 4,
                background: "rgba(255,255,255,0.04)",
                color: "var(--text3)",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {showPrompt ? "Hide prompt" : "View prompt"}
            </button>
          </div>

          {/* Read-only prompt display */}
          {showPrompt && (
            <div
              style={{
                marginBottom: 16,
                borderRadius: 8,
                background: "var(--surface2)",
                borderLeft: "2px solid var(--border)",
                padding: 16,
                maxHeight: 256,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <pre
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono, monospace)",
                  color: "var(--text3)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {workflow.prompt}
              </pre>
            </div>
          )}

          {/* Textarea — only for workflows that need user-pasted data */}
          {workflow.requiresUserData && (
            <div style={{ position: "relative", marginBottom: 16 }}>
              <textarea
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder="Paste your data here — earnings call transcript, SEC filing, Form 4 filings, news articles..."
                disabled={running}
                aria-label={`Data input for ${workflow.name}`}
                style={{
                  width: "100%",
                  height: 192,
                  borderRadius: 8,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text2)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono, monospace)",
                  padding: 16,
                  resize: "vertical",
                  outline: "none",
                  lineHeight: 1.6,
                }}
              />
              {userData.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "var(--text3)",
                  }}
                >
                  {(userData.length / 1000).toFixed(1)}k chars
                </div>
              )}
            </div>
          )}

          {/* Run / Stop */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!running ? (
              <button
                type="button"
                disabled={!canRun}
                onClick={handleRun}
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: canRun ? "rgba(130,200,130,0.5)" : "var(--text3)",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${canRun ? "rgba(130,200,130,0.15)" : "var(--border)"}`,
                  borderRadius: 4,
                  padding: "5px 14px",
                  cursor: canRun ? "pointer" : "not-allowed",
                  transition: "all 0.15s",
                  opacity: canRun ? 1 : 0.4,
                }}
              >
                Run Analysis
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStop}
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--coral)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid color-mix(in srgb, var(--coral) 25%, transparent)",
                  borderRadius: 4,
                  padding: "5px 14px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Stop
              </button>
            )}
            {running && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--text3)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text3)" }}>Analyzing...</span>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ paddingTop: 8 }}>
              <p style={{ fontSize: 11, color: "var(--coral)", margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div ref={resultRef} style={{ paddingTop: 16, marginTop: 16, borderTop: "1px solid var(--border)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "2.5px",
                    color: "var(--text3)",
                  }}
                >
                  Analysis Result
                </span>
              </div>
              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                <pre
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono, monospace)",
                    color: "var(--text2)",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    margin: 0,
                  }}
                >
                  {result}
                </pre>
              </div>

              {/* ── Action Toolbar ── */}
              {!running && (
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  {/* 1. Export PDF */}
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    style={{ ...actionBtnBase, color: "var(--text3)" }}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Export PDF
                  </button>

                  {/* 2. Copy Markdown */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      ...actionBtnBase,
                      color: copied ? "var(--mint)" : "var(--text3)",
                      borderColor: copied ? "rgba(130,200,130,0.15)" : undefined,
                    }}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    {copied ? "Copied" : "Copy Markdown"}
                  </button>

                  {/* 3. Apply to Database */}
                  <button
                    type="button"
                    onClick={handleApplyToDb}
                    disabled={applyStatus === "applying" || applyStatus === "done"}
                    style={{
                      ...actionBtnBase,
                      color: applyStatus === "done"
                        ? "var(--mint)"
                        : applyStatus === "error"
                          ? "var(--coral)"
                          : applyStatus === "applying"
                            ? "var(--text3)"
                            : "rgba(130,200,130,0.5)",
                      borderColor: applyStatus === "done"
                        ? "rgba(130,200,130,0.15)"
                        : applyStatus === "error"
                          ? "color-mix(in srgb, var(--coral) 25%, transparent)"
                          : applyStatus === "applying"
                            ? undefined
                            : "rgba(130,200,130,0.15)",
                      opacity: applyStatus === "applying" ? 0.6 : 1,
                      cursor: applyStatus === "applying" || applyStatus === "done" ? "not-allowed" : "pointer",
                    }}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    {applyStatus === "applying"
                      ? "Applying..."
                      : applyStatus === "done"
                        ? "Applied"
                        : applyStatus === "error"
                          ? "Retry Apply"
                          : "Apply to Database"}
                  </button>

                  {/* 4. Create Commit */}
                  <button
                    type="button"
                    onClick={handleCommit}
                    disabled={commitStatus === "committing" || commitStatus === "done" || applyStatus !== "done"}
                    style={{
                      ...actionBtnBase,
                      color: commitStatus === "done"
                        ? "var(--mint)"
                        : commitStatus === "error"
                          ? "var(--coral)"
                          : applyStatus !== "done"
                            ? "var(--text3)"
                            : "rgba(168,130,230,0.5)",
                      borderColor: commitStatus === "done"
                        ? "rgba(130,200,130,0.15)"
                        : applyStatus !== "done"
                          ? undefined
                          : "rgba(168,130,230,0.15)",
                      opacity: applyStatus !== "done" ? 0.3 : commitStatus === "committing" ? 0.6 : 1,
                      cursor: commitStatus === "committing" || commitStatus === "done" || applyStatus !== "done" ? "not-allowed" : "pointer",
                    }}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={12} cy={12} r={4} />
                      <line x1={1.05} y1={12} x2={7} y2={12} />
                      <line x1={17.01} y1={12} x2={22.96} y2={12} />
                    </svg>
                    {commitStatus === "committing"
                      ? "Committing..."
                      : commitStatus === "done"
                        ? "Committed"
                        : "Create Commit"}
                  </button>

                  {/* Status messages */}
                  {applyMessage && (
                    <span style={{ fontSize: 10, color: applyStatus === "error" ? "var(--coral)" : "var(--text3)", marginLeft: 4 }}>
                      {applyMessage}
                    </span>
                  )}
                  {commitMessage && (
                    <span style={{ fontSize: 10, color: commitStatus === "error" ? "var(--coral)" : "var(--text3)", marginLeft: 4 }}>
                      {commitMessage}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Section header for agent categories — Ive×Tesla divider style
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "32px 0 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "var(--text3)",
        }}
      >
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

export const SharedAIAgentsTab: React.FC<SharedAIAgentsTabProps> = ({ ticker }) => {
  const tickerLower = ticker.toLowerCase();

  const availableWorkflows: AgentWorkflow[] = workflows
    .map((w) => {
      const variant = w.variants.find((v) => v.ticker === tickerLower);
      if (!variant) return null;
      return {
        id: w.id,
        name: w.name,
        description: w.description,
        prompt: variant.prompt,
        requiresUserData: w.requiresUserData,
        ...(w.category ? { category: w.category } : {}),
      } as AgentWorkflow;
    })
    .filter((w): w is AgentWorkflow => w !== null);

  if (availableWorkflows.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
        No AI agents available for {ticker.toUpperCase()} yet.
      </div>
    );
  }

  const dbAgents = availableWorkflows.filter((w) => !w.requiresUserData && w.category !== 'audit');
  const dataAgents = availableWorkflows.filter((w) => w.requiresUserData && w.id !== "ask-agent");
  const auditAgents = availableWorkflows.filter((w) => w.category === 'audit');
  const askAgent = availableWorkflows.find((w) => w.id === "ask-agent");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 10, color: "var(--text3)", opacity: 0.5, fontFamily: "monospace" }}>#ai-agents-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: "48px 0 32px", borderBottom: "1px solid color-mix(in srgb, var(--border) 40%, transparent)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>AI Analysis</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: "var(--text)", lineHeight: 1.15, margin: 0, letterSpacing: "-0.5px" }}>AI Agents<span style={{ color: "var(--accent)" }}>.</span></h2>
        <p style={{ fontSize: 15, color: "var(--text3)", maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Run analysis agents against the database or paste raw data for instant AI-driven research. Each agent streams results in real time.</p>
      </div>

      {/* Database-driven agents — one-click run */}
      {dbAgents.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", opacity: 0.5, fontFamily: "monospace" }}>#db-agents</div>
          <SectionLabel>Database analysis — run directly</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dbAgents.map((wf) => (
              <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />
            ))}
          </div>
        </div>
      )}

      {/* Data-input agents — require pasted content */}
      {dataAgents.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", opacity: 0.5, fontFamily: "monospace" }}>#data-agents</div>
          <SectionLabel>Data input — paste &amp; analyze</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dataAgents.map((wf) => (
              <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />
            ))}
          </div>
        </div>
      )}

      {/* Audit agents — database validation */}
      {auditAgents.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", opacity: 0.5, fontFamily: "monospace" }}>#audit-agents</div>
          <SectionLabel>Audit — database validation</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {auditAgents.map((wf) => (
              <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />
            ))}
          </div>
        </div>
      )}

      {/* Ask Agent — general-purpose query layer */}
      {askAgent && (
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", opacity: 0.5, fontFamily: "monospace" }}>#ask-agent</div>
          <SectionLabel>Ask Agent — general-purpose query</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <AgentRunner workflow={askAgent} ticker={tickerLower} />
          </div>
        </div>
      )}
    </div>
  );
};
