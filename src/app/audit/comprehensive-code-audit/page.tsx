import type { Metadata } from "next";
import AuditDashboard from "@/components/AuditDashboard";
import { workflows } from "@/data/workflows";

export const metadata: Metadata = {
  title: "Stockings Comprehensive Code Audit v1.0 | ABISON",
  description:
    "35-category institutional-grade code audit with CVSS scoring, CWE mapping, and compliance analysis",
};

const auditWorkflows = workflows.filter((w) => w.category === "audit");

export default function ComprehensiveCodeAuditPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
            Stockings Comprehensive Code Audit v1.0
          </h1>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-2xl">
            35-category institutional-grade analysis covering security
            vulnerabilities, authentication, data privacy, performance,
            accessibility, compliance, and architecture. CVSS v3.1 scoring with
            CWE and OWASP mapping.
          </p>
        </div>
        <AuditDashboard />

        {/* ── All Audits ───────────────────────────────────────────────── */}
        <div className="mt-20 pt-16 border-t border-white/[0.06]">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-8">
            All Audits
          </h2>
          <div className="grid gap-3">
            {auditWorkflows.map((audit) => (
              <div
                key={audit.id}
                className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[13px] font-medium text-white tracking-wide">
                        {audit.name}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500/70 border border-yellow-500/20">
                        {audit.id === "code-audit" ? "Code" : "DBV"}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/30 leading-relaxed">
                      {audit.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {audit.variants.map((v) => (
                        <span
                          key={v.ticker}
                          className="text-[10px] font-mono text-white/20 px-1.5 py-0.5 rounded bg-white/[0.03]"
                        >
                          {v.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/15 mt-4">
            Database validation audits run from the AI Agents tab on each stock page.
          </p>
        </div>
      </div>
    </div>
  );
}
