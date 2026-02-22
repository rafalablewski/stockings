import Link from "next/link";
import { stockList } from "@/lib/stocks";
import { workflows } from "@/data/workflows";
import { PromptCard } from "@/components/PromptCard";
import { getAuditStats, AUDIT_METADATA } from "@/data/audit-findings";

export default function HomePage() {
  const workflowPrompts = workflows.map((w) => ({
    name: w.name,
    description: w.description,
    variants: w.variants.map((v) => ({
      label: v.label,
      content: v.prompt,
    })),
  }));

  const stats = getAuditStats();

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

      {/* Security & Risk Audit */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-10">
            Security &amp; Risk Audit
          </h2>

          <div className="grid gap-4">
            <Link
              href="/audit/comprehensive-code-audit"
              className="group relative block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[13px] font-medium text-white tracking-wide">
                      Comprehensive Code Audit
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-white/20">
                      {AUDIT_METADATA.date}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-3">
                    35-category institutional-grade analysis &middot; CVSS v3.1
                    scoring &middot; CWE &amp; OWASP mapping
                  </p>
                  <div className="flex items-center gap-3">
                    {stats.bySeverity.CRITICAL > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                        {stats.bySeverity.CRITICAL} critical
                      </span>
                    )}
                    {stats.bySeverity.HIGH > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {stats.bySeverity.HIGH} high
                      </span>
                    )}
                    {stats.bySeverity.MEDIUM > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        {stats.bySeverity.MEDIUM} medium
                      </span>
                    )}
                    {stats.bySeverity.LOW > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {stats.bySeverity.LOW} low
                      </span>
                    )}
                    <span className="text-[11px] text-white/20">
                      {stats.total} findings
                    </span>
                  </div>
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
          </div>
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
