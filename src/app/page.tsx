import Link from "next/link";
import { stockList } from "@/lib/stocks";
import { workflows } from "@/data/workflows";
import { PromptCard } from "@/components/PromptCard";
const CODE_AUDIT_IDS = new Set([
  "code-audit",
  "dependency-vulnerability",
  "api-endpoint-security",
  "performance-audit",
  "secrets-exposure",
]);

const codeAuditWorkflows = workflows.filter(
  (w) => w.category === "audit" && CODE_AUDIT_IDS.has(w.id)
);

const dataAuditWorkflows = workflows.filter(
  (w) => w.category === "audit" && !CODE_AUDIT_IDS.has(w.id)
);

const AUDIT_BADGE: Record<string, string> = {
  "code-audit": "Code",
  "dependency-vulnerability": "Deps",
  "api-endpoint-security": "API",
  "performance-audit": "Perf",
  "secrets-exposure": "Secrets",
  "capital-parity": "Capital",
  "crossref-integrity": "Integrity",
  "sources-completeness": "Sources",
  "data-freshness": "Freshness",
  "earnings-quality": "Earnings",
  "peer-comparables": "Comps",
  "disclosure-completeness": "Disclosure",
  "model-consistency": "Model",
};

export default function HomePage() {
  const workflowPrompts = workflows.map((w) => ({
    name: w.name,
    description: w.description,
    variants: w.variants.map((v) => ({
      label: v.label,
      content: v.prompt,
    })),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Investment Research
          </h1>
          <p className="text-lg text-white/50 mb-10 leading-relaxed">
            Deep-dive analysis on high-conviction opportunities.
          </p>
          <Link
            href="/stocks"
            className="inline-block text-[13px] text-white/50 hover:text-white transition-colors"
          >
            View all research →
          </Link>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-10">
            Coverage
          </h2>

          <div className="grid gap-4">
            {stockList.map((stock) => (
              <Link
                key={stock.ticker}
                href={`/stocks/${stock.ticker}`}
                className="group relative block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[13px] font-mono font-medium text-white tracking-wide">
                        {stock.ticker}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-white/20">
                        {stock.sector}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/40 leading-relaxed">
                      {stock.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
                    <svg
                      className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audits */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-10">
            Audits
          </h2>

          {/* Code & Security */}
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/20 mb-4">
            Code &amp; Security
          </p>
          <div className="grid gap-4 mb-10">
            {codeAuditWorkflows.map((audit) => (
              <div
                key={audit.id}
                className="relative block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[13px] font-medium text-white tracking-wide">
                        {audit.name}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400/70 border border-violet-500/20">
                        {AUDIT_BADGE[audit.id] ?? "Audit"}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/40 leading-relaxed mb-3">
                      {audit.description}
                    </p>
                    <div className="flex items-center gap-2">
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

          {/* Research Data Quality */}
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/20 mb-4">
            Research Data Quality
          </p>
          <div className="grid gap-4">
            {dataAuditWorkflows.map((audit) => (
              <div
                key={audit.id}
                className="relative block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[13px] font-medium text-white tracking-wide">
                        {audit.name}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400/70 border border-amber-500/20">
                        {AUDIT_BADGE[audit.id] ?? "Audit"}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/40 leading-relaxed mb-3">
                      {audit.description}
                    </p>
                    <div className="flex items-center gap-2">
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
            All audits run from the AI Agents tab on each stock page.
          </p>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-3">
            Workflow
          </h2>
          <p className="text-[12px] text-white/20 mb-10">
            AI agent prompts for structured analysis. Run these from the AI Agents tab inside each stock.
          </p>

          <div className="grid gap-4">
            {workflowPrompts.map((workflow) => (
              <PromptCard
                key={workflow.name}
                name={workflow.name}
                description={workflow.description}
                variants={workflow.variants}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-10">
            Methodology
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Financial Models", desc: "Quarterly metrics, balance sheets, cash flow projections" },
              { title: "Valuation", desc: "DCF analysis, Monte Carlo simulations, comparable multiples" },
              { title: "Perspectives", desc: "CFA fundamental, hedge fund catalyst, CIO portfolio views" },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="text-[13px] text-white/70">{item.title}</h3>
                <p className="text-[12px] text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
