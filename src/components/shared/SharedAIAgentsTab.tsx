"use client";

import React, { useState, useRef, useCallback } from "react";
import { workflows } from "@/data/workflows";
import { authFetch } from "@/lib/auth-fetch";


interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  prompt: string;
  requiresUserData: boolean;
  category?: 'audit';
  auditType?: 'code' | 'data';
}

interface SharedAIAgentsTabProps {
  ticker: string;
}

// Individual agent runner — manages its own expand/run/result state
function AgentRunner({ workflow, ticker }: { workflow: AgentWorkflow; ticker: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [applyStep, setApplyStep] = useState<"idle" | "previewing" | "previewed" | "applying" | "applied" | "error">("idle");
  const [applyError, setApplyError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patchPreview, setPatchPreview] = useState<any>(null);
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
      const res = await authFetch("/api/workflow/run", {
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
    // Escape all user-influenced strings to prevent XSS
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const safeName = esc(workflow.name);
    const safeTicker = esc(ticker.toUpperCase());
    const safeResult = esc(result);
    printWindow.document.write(`<!DOCTYPE html><html><head><title>${safeName} — ${safeTicker}</title>
<style>
  body { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px; line-height: 1.8; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 24px; }
  pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; }
  .meta { font-size: 9px; color: #888; margin-bottom: 16px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>${safeName}</h1>
<div class="meta">${safeTicker} — ${new Date().toISOString().split("T")[0]} — ABISON Research</div>
<pre>${safeResult}</pre>
</body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
  };

  const handlePreview = async () => {
    setApplyStep("previewing");
    setApplyError("");
    setPatchPreview(null);
    try {
      const res = await authFetch("/api/workflow/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: workflow.id, analysis: result, dryRun: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApplyStep("error");
        setApplyError(data.error || "Preview failed");
        return;
      }
      setPatchPreview(data);
      setApplyStep(data.patchCount === 0 ? "idle" : "previewed");
      if (data.patchCount === 0) setApplyError(data.summary || "No changes to apply");
    } catch (err) {
      setApplyStep("error");
      setApplyError((err as Error).message);
    }
  };

  const handleConfirmApply = async () => {
    if (!patchPreview?.patches?.length) return;
    setApplyStep("applying");
    setApplyError("");
    try {
      const res = await authFetch("/api/workflow/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, agentId: workflow.id, dryRun: false, patches: patchPreview.patches }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApplyStep("error");
        setApplyError(data.error || "Apply failed");
        return;
      }
      setApplyStep("applied");
      setPatchPreview((prev: typeof patchPreview) => ({ ...prev, applySummary: data.summary }));
    } catch (err) {
      setApplyStep("error");
      setApplyError((err as Error).message);
    }
  };

  const handleCancelPreview = () => {
    setApplyStep("idle");
    setPatchPreview(null);
    setApplyError("");
  };

  const handleCommit = async () => {
    setCommitStatus("committing");
    setCommitMessage("");
    try {
      const res = await authFetch("/api/workflow/commit", {
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
    <div className="sm-rounded-12 sm-overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.2s" }}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="sm-w-full sm-pointer sm-gap-16 sm-flex sm-items-start sm-text-left sm-justify-between"
        style={{ padding: "16px 20px", background: "none", border: "none" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sm-flex sm-gap-8" style={{ marginBottom: 4 }}>
            <span className="sm-fw-500" style={{ fontSize: 13, fontFamily: "var(--font-mono, monospace)", color: "rgba(255,255,255,0.85)" }}>
              {workflow.name}
            </span>
            <span className="sm-ed-action-btn-sm" style={{
              color: workflow.auditType === 'code' ? "rgba(168,130,230,0.5)" : workflow.auditType === 'data' ? "rgba(234,179,8,0.5)" : workflow.requiresUserData ? "rgba(255,255,255,0.2)" : "rgba(130,200,130,0.5)",
              borderColor: workflow.auditType === 'code' ? "rgba(168,130,230,0.15)" : workflow.auditType === 'data' ? "rgba(234,179,8,0.15)" : workflow.requiresUserData ? "rgba(255,255,255,0.06)" : "rgba(130,200,130,0.15)",
            }}>
              {workflow.auditType === 'code' ? "Code Audit" : workflow.auditType === 'data' ? "Data Audit" : workflow.requiresUserData ? "Paste data" : "Database"}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>
            {workflow.description}
          </div>
        </div>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="sm-shrink-0" style={{ transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", marginTop: 4 }}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="sm-border-t" style={{ padding: "0 20px 20px" }}>
          {/* View prompt toggle */}
          <div className="sm-flex sm-gap-6 sm-mb-16" style={{ paddingTop: 16 }}>
            <button type="button" onClick={() => setShowPrompt(!showPrompt)} className="sm-ed-action-btn-sm" style={{ marginLeft: "auto" }}>
              {showPrompt ? "Hide prompt" : "View prompt"}
            </button>
            <button
              type="button"
              onClick={async () => { await navigator.clipboard.writeText(workflow.prompt); setCopiedPrompt(true); setTimeout(() => setCopiedPrompt(false), 2000); }}
              className="sm-ed-action-btn-sm"
              data-state={copiedPrompt ? "success" : undefined}
            >
              {copiedPrompt ? "Copied!" : "Copy prompt"}
            </button>
          </div>

          {/* Read-only prompt display */}
          {showPrompt && (
            <div className="sm-scrollbox-short sm-mb-16 sm-rounded-8 sm-bg-surface2 sm-p-16" style={{ borderLeft: "2px solid var(--border)" }}>
              <pre className="sm-subtle-sm" style={{ fontFamily: "var(--font-mono, monospace)", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
                {workflow.prompt}
              </pre>
            </div>
          )}

          {/* Textarea — only for workflows that need user-pasted data */}
          {workflow.requiresUserData && (
            <div className="sm-mb-16" style={{ position: "relative" }}>
              <textarea
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder="Paste your data here — earnings call transcript, SEC filing, Form 4 filings, news articles..."
                disabled={running}
                aria-label={`Data input for ${workflow.name}`}
                className="sm-agent-textarea"
                style={{ resize: "vertical" }}
              />
              {userData.length > 0 && (
                <div className="sm-text3 sm-fw-500" style={{ position: "absolute", bottom: 12, right: 12, fontSize: 9, letterSpacing: "0.08em" }}>
                  {(userData.length / 1000).toFixed(1)}k chars
                </div>
              )}
            </div>
          )}

          {/* Run / Stop */}
          <div className="sm-flex" style={{ gap: 10 }}>
            {!running ? (
              <button
                type="button"
                disabled={!canRun}
                onClick={handleRun}
                className="sm-ed-action-btn sm-p-5-14"
                data-variant="mint"
                data-state={canRun ? undefined : "disabled"}
              >
                Run Analysis
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStop}
                className="sm-ed-action-btn sm-p-5-14"
                data-variant="coral"
              >
                Stop
              </button>
            )}
            {running && (
              <div className="sm-flex sm-gap-8">
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text3)", animation: "pulse 2s infinite" }} />
                <span className="sm-text3 sm-uppercase sm-fw-500" style={{ fontSize: 9, letterSpacing: "0.08em" }}>Analyzing...</span>
              </div>
            )}
          </div>

          {/* Error / AI-disabled info */}
          {error && (
            <div style={{ paddingTop: 8 }}>
              {error.includes('AI features are disabled') ? (
                <div className="sm-ed-ai-banner" style={{ fontSize: 11 }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  {error}
                </div>
              ) : (
                <p className="sm-coral" style={{ fontSize: 11, margin: 0 }}>{error}</p>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <div ref={resultRef} className="sm-ed-analysis">
              <div className="sm-flex-between sm-mb-12">
                <span className="sm-section-label" style={{ marginBottom: 0 }}>Analysis Result</span>
              </div>
              <div className="sm-scrollbox-tall">
                <pre className="sm-ed-analysis-pre">{result}</pre>
              </div>

              {/* ── Action Toolbar ── */}
              {!running && (
                <div className="sm-mt-16 sm-border-t" style={{ paddingTop: 16 }}>
                  {/* Button row */}
                  <div className="sm-flex-wrap">
                    {/* 1. Export PDF */}
                    <button type="button" onClick={handleExportPDF} className="sm-ed-action-btn">
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      Export PDF
                    </button>

                    {/* 2. Copy Markdown */}
                    <button type="button" onClick={handleCopy} className="sm-ed-action-btn" style={{ '--ed-btn-color': copied ? "var(--mint)" : undefined, borderColor: copied ? "rgba(130,200,130,0.15)" : undefined } as React.CSSProperties}>
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      {copied ? "Copied" : "Copy Markdown"}
                    </button>

                    {/* 3. Preview Changes / Applied indicator */}
                    {applyStep === "applied" ? (
                      <span className="sm-ed-action-btn" style={{ '--ed-btn-color': "var(--mint)", borderColor: "rgba(130,200,130,0.15)", cursor: "default" } as React.CSSProperties}>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Applied
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePreview}
                        disabled={applyStep === "previewing" || applyStep === "previewed" || applyStep === "applying"}
                        className="sm-ed-action-btn"
                        style={{
                          '--ed-btn-color': applyStep === "previewing" ? "var(--text3)" : applyStep === "error" ? "var(--coral)" : "rgba(130,200,130,0.5)",
                          borderColor: applyStep === "error" ? "color-mix(in srgb, var(--coral) 25%, transparent)" : "rgba(130,200,130,0.15)",
                          opacity: applyStep === "previewing" ? 0.6 : 1,
                          cursor: applyStep === "previewing" || applyStep === "previewed" || applyStep === "applying" ? "not-allowed" : "pointer",
                        } as React.CSSProperties}
                      >
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        {applyStep === "previewing" ? "Extracting patches..." : applyStep === "error" ? "Retry Preview" : "Preview Changes"}
                      </button>
                    )}

                    {/* 4. Create Commit */}
                    <button
                      type="button"
                      onClick={handleCommit}
                      disabled={commitStatus === "committing" || commitStatus === "done" || applyStep !== "applied"}
                      className="sm-ed-action-btn"
                      style={{
                        '--ed-btn-color': commitStatus === "done" ? "var(--mint)" : commitStatus === "error" ? "var(--coral)" : applyStep !== "applied" ? "var(--text3)" : "rgba(168,130,230,0.5)",
                        borderColor: commitStatus === "done" ? "rgba(130,200,130,0.15)" : applyStep !== "applied" ? undefined : "rgba(168,130,230,0.15)",
                        opacity: applyStep !== "applied" ? 0.3 : commitStatus === "committing" ? 0.6 : 1,
                        cursor: commitStatus === "committing" || commitStatus === "done" || applyStep !== "applied" ? "not-allowed" : "pointer",
                      } as React.CSSProperties}
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={12} cy={12} r={4} />
                        <line x1={1.05} y1={12} x2={7} y2={12} />
                        <line x1={17.01} y1={12} x2={22.96} y2={12} />
                      </svg>
                      {commitStatus === "committing" ? "Committing..." : commitStatus === "done" ? "Committed" : "Create Commit"}
                    </button>

                    {/* Status messages */}
                    {applyError && (
                      <span style={{ fontSize: 10, color: applyStep === "error" ? "var(--coral)" : "var(--text3)", marginLeft: 4 }}>{applyError}</span>
                    )}
                    {patchPreview?.applySummary && applyStep === "applied" && (
                      <span className="sm-text3" style={{ fontSize: 10, marginLeft: 4 }}>{patchPreview.applySummary}</span>
                    )}
                    {commitMessage && (
                      <span style={{ fontSize: 10, color: commitStatus === "error" ? "var(--coral)" : "var(--text3)", marginLeft: 4 }}>{commitMessage}</span>
                    )}
                  </div>

                  {/* ── Diff Preview Panel ── */}
                  {applyStep === "previewed" && patchPreview && (
                    <div className="sm-ed-diff-panel">
                      {/* Header */}
                      <div className="sm-flex-between" style={{ padding: "12px 16px", borderBottom: "1px solid rgba(234,179,8,0.1)" }}>
                        <div>
                          <span className="sm-fw-600 sm-uppercase" style={{ fontSize: 11, color: "rgba(234,179,8,0.7)", letterSpacing: "1px" }}>Patch Preview</span>
                          <span className="sm-text3" style={{ fontSize: 10, marginLeft: 12 }}>{patchPreview.summary}</span>
                        </div>
                      </div>

                      {/* Per-file diffs */}
                      <div className="sm-scrollbox-med">
                        {patchPreview.previews?.map((p: { file: string; action: string; valid: boolean; detail: string; diff: string; linesAdded: number }, i: number) => (
                          <div key={i} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined, padding: "10px 16px" }}>
                            <div className="sm-flex sm-gap-8 sm-mb-8" style={{ marginBottom: 6 }}>
                              <span className="sm-fw-500" style={{ fontSize: 10, fontFamily: "var(--font-mono, monospace)", color: p.valid ? "var(--text2)" : "var(--coral)" }}>{p.file}</span>
                              <span className="sm-uppercase" style={{ fontSize: 8, letterSpacing: "0.05em", padding: "1px 5px", borderRadius: 3, background: p.valid ? "rgba(130,200,130,0.1)" : "rgba(255,100,100,0.1)", color: p.valid ? "rgba(130,200,130,0.6)" : "var(--coral)", border: `1px solid ${p.valid ? "rgba(130,200,130,0.15)" : "rgba(255,100,100,0.15)"}` }}>
                                {p.action} {p.valid ? `+${p.linesAdded}` : "rejected"}
                              </span>
                            </div>
                            {p.valid && p.diff ? (
                              <pre className="sm-ed-diff-pre">
                                {p.diff.split("\n").map((line: string, li: number) => (
                                  <span
                                    key={li}
                                    className={line.startsWith("+") && !line.startsWith("+++") ? "sm-ed-diff-add" : line.startsWith("-") && !line.startsWith("---") ? "sm-ed-diff-del" : line.startsWith("@@") ? "sm-ed-diff-hunk" : undefined}
                                    style={!line.startsWith("+") && !line.startsWith("-") && !line.startsWith("@@") ? { display: "block" } : undefined}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </pre>
                            ) : !p.valid ? (
                              <span className="sm-coral" style={{ fontSize: 10, opacity: 0.7 }}>{p.detail}</span>
                            ) : null}
                          </div>
                        ))}
                      </div>

                      {/* Warning + action buttons */}
                      <div className="sm-flex-between" style={{ padding: "12px 16px", borderTop: "1px solid rgba(234,179,8,0.1)" }}>
                        <span className="sm-fw-500" style={{ fontSize: 9, color: "rgba(234,179,8,0.5)", letterSpacing: "0.05em" }}>
                          Review carefully — these changes will be written to the database
                        </span>
                        <div className="sm-flex sm-gap-8">
                          <button type="button" onClick={handleCancelPreview} className="sm-ed-action-btn">Cancel</button>
                          <button
                            type="button"
                            onClick={handleConfirmApply}
                            disabled={!patchPreview.validCount}
                            className="sm-ed-action-btn sm-fw-600"
                            style={{
                              '--ed-btn-color': patchPreview.validCount ? "rgba(234,179,8,0.8)" : "var(--text3)",
                              borderColor: patchPreview.validCount ? "rgba(234,179,8,0.3)" : undefined,
                              cursor: patchPreview.validCount ? "pointer" : "not-allowed",
                              opacity: patchPreview.validCount ? 1 : 0.4,
                            } as React.CSSProperties}
                          >
                            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            Confirm &amp; Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Applying spinner */}
                  {applyStep === "applying" && (
                    <div className="sm-flex sm-gap-8 sm-mt-12">
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(234,179,8,0.5)", animation: "pulse 2s infinite" }} />
                      <span className="sm-text3 sm-uppercase sm-fw-500" style={{ fontSize: 9, letterSpacing: "0.08em" }}>
                        Writing patches to database...
                      </span>
                    </div>
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

// Section category label (subcategory heading)
function CategoryLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="sm-fw-600 sm-uppercase sm-ls-wide" style={{ fontSize: 9, color, marginBottom: 10, paddingLeft: 2 }}>
      {children}
    </div>
  );
}

const CODE_AUDIT_IDS = new Set([
  "code-audit",
  "dependency-vulnerability",
  "api-endpoint-security",
  "performance-audit",
  "secrets-exposure",
]);

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
        ...(w.category === 'audit' ? { auditType: CODE_AUDIT_IDS.has(w.id) ? 'code' as const : 'data' as const } : {}),
      } as AgentWorkflow;
    })
    .filter((w): w is AgentWorkflow => w !== null);

  if (availableWorkflows.length === 0) {
    return (
      <div className="sm-text-center sm-text3" style={{ padding: 40, fontSize: 13 }}>
        No AI agents available for {ticker.toUpperCase()} yet.
      </div>
    );
  }

  const THESIS_IDS = new Set(["thesis-review", "weekly-digest"]);
  const SEC_FINANCIALS_IDS = new Set(["earnings-call", "sec-filing-delta", "analyst-report"]);
  const OWNERSHIP_IDS = new Set(["insider-activity", "institutional-holdings"]);

  const thesisAgents = availableWorkflows.filter((w) => !w.requiresUserData && w.category !== 'audit' && THESIS_IDS.has(w.id));
  const capitalAgents = availableWorkflows.filter((w) => !w.requiresUserData && w.category !== 'audit' && !THESIS_IDS.has(w.id));
  const secFinancialsAgents = availableWorkflows.filter((w) => w.requiresUserData && w.category !== 'audit' && SEC_FINANCIALS_IDS.has(w.id));
  const ownershipAgents = availableWorkflows.filter((w) => w.requiresUserData && w.category !== 'audit' && OWNERSHIP_IDS.has(w.id));
  const intelAgents = availableWorkflows.filter((w) => w.requiresUserData && w.category !== 'audit' && !SEC_FINANCIALS_IDS.has(w.id) && !OWNERSHIP_IDS.has(w.id) && w.id !== "ask-agent");
  const codeAuditAgents = availableWorkflows.filter((w) => w.category === 'audit' && CODE_AUDIT_IDS.has(w.id));
  const dataAuditAgents = availableWorkflows.filter((w) => w.category === 'audit' && !CODE_AUDIT_IDS.has(w.id) && !w.requiresUserData);
  const dataInputAuditAgents = availableWorkflows.filter((w) => w.category === 'audit' && !CODE_AUDIT_IDS.has(w.id) && w.requiresUserData);
  const askAgent = availableWorkflows.find((w) => w.id === "ask-agent");

  return (
    <div className="sm-flex-col">
      {/* Hero */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">AI Analysis</div>
        <h2>AI Agents<span className="sm-accent">.</span></h2>
        <p>Run analysis agents against the database or paste raw data for instant AI-driven research. Each agent streams results in real time.</p>
      </div>

      {/* ── Database Analysis — Run Directly ──────────────────── */}
      {(thesisAgents.length > 0 || capitalAgents.length > 0) && (
        <div>
          <div className="sm-divider">
            <span className="sm-section-label" style={{ marginBottom: 0 }}>Database Analysis — Run Directly</span>
          </div>

          {thesisAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(130,200,130,0.5)">Thesis &amp; Strategy</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {thesisAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {capitalAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(130,200,130,0.5)">Capital Analysis</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {capitalAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Data Input — Paste & Analyze ────────────────────────── */}
      {(secFinancialsAgents.length > 0 || ownershipAgents.length > 0 || intelAgents.length > 0) && (
        <div>
          <div className="sm-divider">
            <span className="sm-section-label" style={{ marginBottom: 0 }}>Data Input — Paste &amp; Analyze</span>
          </div>

          {secFinancialsAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(121,192,255,0.5)">SEC &amp; Financials</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {secFinancialsAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {ownershipAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(121,192,255,0.5)">Ownership &amp; Governance</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {ownershipAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {intelAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(121,192,255,0.5)">Intelligence &amp; Research</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {intelAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Audits ────────────────────────────────────────────────── */}
      {(codeAuditAgents.length > 0 || dataAuditAgents.length > 0 || dataInputAuditAgents.length > 0) && (
        <div>
          <div className="sm-divider">
            <span className="sm-section-label" style={{ marginBottom: 0 }}>Audits</span>
          </div>

          {codeAuditAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(168,130,230,0.5)">Code &amp; Security</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {codeAuditAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {dataAuditAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(234,179,8,0.5)">Research Data Quality — database validation</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {dataAuditAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {dataInputAuditAgents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <CategoryLabel color="rgba(234,179,8,0.5)">Research Data Quality — paste &amp; analyze</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {dataInputAuditAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ask Agent — general-purpose query layer */}
      {askAgent && (
        <div>
          <div className="sm-divider">
            <span className="sm-section-label" style={{ marginBottom: 0 }}>Ask Agent — general-purpose query</span>
          </div>
          <div className="sm-flex-col sm-gap-8">
            <AgentRunner workflow={askAgent} ticker={tickerLower} />
          </div>
        </div>
      )}
    </div>
  );
};
