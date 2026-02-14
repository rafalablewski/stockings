"use client";

import React, { useState, useRef, useCallback } from "react";
import { workflows } from "@/data/workflows";
import { getWorkflowContext } from "@/lib/workflow-context";

interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  prompt: string;
  context: string;
  contextModules: string[];
  requiresUserData: boolean;
}

interface SharedAIAgentsTabProps {
  ticker: string;
}

// Individual agent runner — manages its own expand/run/result state
function AgentRunner({ workflow }: { workflow: AgentWorkflow }) {
  const [expanded, setExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
          context: workflow.context,
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
                background: workflow.requiresUserData
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.04)",
                color: workflow.requiresUserData
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(130,200,130,0.5)",
                border: `1px solid ${workflow.requiresUserData ? "rgba(255,255,255,0.06)" : "rgba(130,200,130,0.15)"}`,
              }}
            >
              {workflow.requiresUserData ? "Paste data" : "Database"}
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
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {/* Context modules + view prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              paddingTop: 12,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>Context:</span>
            {workflow.contextModules.map((mod, i) => (
              <span key={mod} style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "capitalize" }}>
                {mod}{i < workflow.contextModules.length - 1 ? "," : ""}
              </span>
            ))}
            <button
              type="button"
              onClick={() => setShowPrompt(!showPrompt)}
              style={{
                marginLeft: "auto",
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {showPrompt ? "Hide prompt" : "View prompt"}
            </button>
          </div>

          {/* Read-only prompt display */}
          {showPrompt && (
            <div
              style={{
                marginBottom: 12,
                borderRadius: 8,
                background: "rgba(255,255,255,0.02)",
                borderLeft: "2px solid rgba(255,255,255,0.06)",
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
                  color: "rgba(255,255,255,0.3)",
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
            <div style={{ position: "relative", marginBottom: 12 }}>
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
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
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
                    fontSize: 10,
                    color: "rgba(255,255,255,0.15)",
                  }}
                >
                  {(userData.length / 1000).toFixed(1)}k chars
                </div>
              )}
            </div>
          )}

          {/* Run / Stop */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!running ? (
              <button
                type="button"
                disabled={!canRun}
                onClick={handleRun}
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono, monospace)",
                  color: canRun ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.1)",
                  background: canRun ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${canRun ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: canRun ? "pointer" : "not-allowed",
                  transition: "all 0.15s",
                }}
              >
                Run Analysis
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStop}
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono, monospace)",
                  color: "rgba(255,100,100,0.7)",
                  background: "rgba(255,100,100,0.06)",
                  border: "1px solid rgba(255,100,100,0.15)",
                  borderRadius: 8,
                  padding: "8px 16px",
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
                    background: "rgba(255,255,255,0.2)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Analyzing...</span>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ paddingTop: 8 }}>
              <p style={{ fontSize: 12, color: "rgba(255,100,100,0.5)", margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div style={{ paddingTop: 12, marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
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
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.15)",
                  }}
                >
                  Analysis Result
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                <pre
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono, monospace)",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    margin: 0,
                  }}
                >
                  {result}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Section header for agent categories
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.15)",
        marginBottom: 8,
        paddingLeft: 2,
      }}
    >
      {children}
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
        context: getWorkflowContext(tickerLower, variant.contextModules),
        contextModules: variant.contextModules as string[],
        requiresUserData: w.requiresUserData,
      };
    })
    .filter((w): w is AgentWorkflow => w !== null);

  if (availableWorkflows.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
        No AI agents available for {ticker.toUpperCase()} yet.
      </div>
    );
  }

  const dbAgents = availableWorkflows.filter((w) => !w.requiresUserData);
  const dataAgents = availableWorkflows.filter((w) => w.requiresUserData);

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.2)",
            marginBottom: 8,
          }}
        >
          AI Agents
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          Run analysis agents. Some run directly from the database, others accept pasted data.
        </div>
      </div>

      {/* Database-driven agents — one-click run */}
      {dbAgents.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Database analysis — run directly</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dbAgents.map((wf) => (
              <AgentRunner key={wf.id} workflow={wf} />
            ))}
          </div>
        </div>
      )}

      {/* Data-input agents — require pasted content */}
      {dataAgents.length > 0 && (
        <div>
          <SectionLabel>Data input — paste &amp; analyze</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dataAgents.map((wf) => (
              <AgentRunner key={wf.id} workflow={wf} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
