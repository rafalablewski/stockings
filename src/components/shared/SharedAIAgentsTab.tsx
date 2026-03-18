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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          ticker,
          workflowId: workflow.id,
          workflowName: workflow.name,
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
  }, [userData, workflow, ticker]);

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


  return (
    <div className="sm-rounded-12 sm-overflow-hidden sm-agent-card-border">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="sm-w-full sm-pointer sm-gap-16 sm-flex sm-items-start sm-text-left sm-justify-between sm-p-16-20 sm-bg-none sm-border-none"
      >
        <div className="sm-agent-header-name-col">
          <div className="sm-flex sm-gap-8 sm-agent-header-name-row">
            <span className="sm-fw-500 sm-agent-name">
              {workflow.name}
            </span>
            <span className="sm-ed-action-btn-sm" data-variant={workflow.auditType === 'code' ? "violet" : workflow.auditType === 'data' ? "gold" : workflow.requiresUserData ? "muted" : "mint"}>
              {workflow.auditType === 'code' ? "Code Audit" : workflow.auditType === 'data' ? "Data Audit" : workflow.requiresUserData ? "Paste data" : "Database"}
            </span>
          </div>
          <div className="sm-agent-desc">
            {workflow.description}
          </div>
        </div>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="sm-shrink-0 sm-agent-chevron" data-expanded={expanded}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="sm-border-t sm-agent-body">
          {/* View prompt toggle */}
          <div className="sm-flex sm-gap-6 sm-mb-16 sm-agent-prompt-toggle-row">
            <button type="button" onClick={() => setShowPrompt(!showPrompt)} className="sm-ed-action-btn-sm sm-ml-auto">
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
            <div className="sm-scrollbox-short sm-mb-16 sm-rounded-8 sm-bg-surface2 sm-p-16 sm-agent-prompt-box">
              <pre className="sm-subtle-sm sm-agent-prompt-pre">
                {workflow.prompt}
              </pre>
            </div>
          )}

          {/* Textarea — only for workflows that need user-pasted data */}
          {workflow.requiresUserData && (
            <div className="sm-mb-16 sm-agent-textarea-wrap">
              <textarea
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder="Paste your data here — earnings call transcript, SEC filing, Form 4 filings, news articles..."
                disabled={running}
                aria-label={`Data input for ${workflow.name}`}
                className="sm-agent-textarea sm-agent-textarea-resize"
              />
              {userData.length > 0 && (
                <div className="sm-text3 sm-fw-500 sm-agent-char-count">
                  {(userData.length / 1000).toFixed(1)}k chars
                </div>
              )}
            </div>
          )}

          {/* Run / Stop */}
          <div className="sm-flex sm-agent-run-row">
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
                <div className="sm-agent-pulse-dot" />
                <span className="sm-text3 sm-uppercase sm-fw-500 sm-agent-status-text">Analyzing...</span>
              </div>
            )}
          </div>

          {/* Error / AI-disabled info */}
          {error && (
            <div className="sm-agent-error-wrap">
              {error.includes('AI features are disabled') ? (
                <div className="sm-ed-ai-banner sm-agent-error-ai-banner">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  {error}
                </div>
              ) : (
                <p className="sm-coral sm-agent-error-msg">{error}</p>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <div ref={resultRef} className="sm-ed-analysis">
              <div className="sm-flex-between sm-mb-12">
                <span className="sm-section-label sm-agent-result-label-no-mb">Analysis Result</span>
              </div>
              <div className="sm-scrollbox-tall">
                <pre className="sm-ed-analysis-pre">{result}</pre>
              </div>

              {/* ── Action Toolbar ── */}
              {!running && (
                <div className="sm-mt-16 sm-border-t sm-agent-toolbar">
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
                    <button type="button" onClick={handleCopy} className="sm-ed-action-btn" data-state={copied ? "success" : undefined}>
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      {copied ? "Copied" : "Copy Markdown"}
                    </button>

                  </div>
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
function CategoryLabel({ children, variant }: { children: React.ReactNode; variant: 'mint' | 'blue' | 'violet' | 'gold' }) {
  return (
    <div className="sm-fw-600 sm-uppercase sm-ls-wide sm-agent-category-label" data-color-variant={variant}>
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
      // Prefer promptTemplate (works for any ticker) over per-ticker variants
      const prompt = w.promptTemplate ?? w.variants.find((v) => v.ticker === tickerLower)?.prompt;
      if (!prompt) return null;
      return {
        id: w.id,
        name: w.name,
        description: w.description,
        prompt,
        requiresUserData: w.requiresUserData,
        ...(w.category ? { category: w.category } : {}),
        ...(w.category === 'audit' ? { auditType: CODE_AUDIT_IDS.has(w.id) ? 'code' as const : 'data' as const } : {}),
      } as AgentWorkflow;
    })
    .filter((w): w is AgentWorkflow => w !== null);

  if (availableWorkflows.length === 0) {
    return (
      <div className="sm-text-center sm-text3 sm-agent-empty">
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
  const codeAuditAgents = availableWorkflows.filter((w) => w.category === 'audit' && CODE_AUDIT_IDS.has(w.id) && w.id !== 'code-audit');
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
            <span className="sm-section-label sm-agent-section-label-no-mb">Database Analysis — Run Directly</span>
          </div>

          {thesisAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="mint">Thesis &amp; Strategy</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {thesisAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {capitalAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="mint">Capital Analysis</CategoryLabel>
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
            <span className="sm-section-label sm-agent-section-label-no-mb">Data Input — Paste &amp; Analyze</span>
          </div>

          {secFinancialsAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="blue">SEC &amp; Financials</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {secFinancialsAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {ownershipAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="blue">Ownership &amp; Governance</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {ownershipAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {intelAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="blue">Intelligence &amp; Research</CategoryLabel>
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
            <span className="sm-section-label sm-agent-section-label-no-mb">Audits</span>
          </div>

          {codeAuditAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="violet">Code &amp; Security</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {codeAuditAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {dataAuditAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="gold">Research Data Quality — database validation</CategoryLabel>
              <div className="sm-flex-col sm-gap-8">
                {dataAuditAgents.map((wf) => <AgentRunner key={wf.id} workflow={wf} ticker={tickerLower} />)}
              </div>
            </div>
          )}

          {dataInputAuditAgents.length > 0 && (
            <div className="sm-agent-section-group">
              <CategoryLabel variant="gold">Research Data Quality — paste &amp; analyze</CategoryLabel>
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
            <span className="sm-section-label sm-agent-section-label-no-mb">Ask Agent — general-purpose query</span>
          </div>
          <div className="sm-flex-col sm-gap-8">
            <AgentRunner workflow={askAgent} ticker={tickerLower} />
          </div>
        </div>
      )}
    </div>
  );
};
