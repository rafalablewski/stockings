"use client";

import Link from "next/link";
import { stocks } from "@/lib/stocks";

/**
 * GenericResearch — Placeholder component for newly initiated research stocks
 * that don't yet have a full custom analysis component (like ASTS.tsx, BMNR.tsx, CRCL.tsx).
 *
 * Shows company info, research status, and next steps for building out coverage.
 */

export default function GenericResearch({ ticker }: { ticker: string }) {
  const stock = stocks[ticker];
  if (!stock) return null;

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/stocks"
          className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-8 inline-block"
        >
          &larr; Back to Research
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[14px] font-mono font-semibold text-white tracking-wide">
              {stock.ticker}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded">
              {stock.sector}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-sky-400/60 bg-sky-400/[0.08] px-2 py-0.5 rounded">
              New Coverage
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">{stock.name}</h1>
          <p className="text-[13px] text-white/40 leading-relaxed">
            {stock.description}
          </p>
        </div>

        {/* Status card */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 mb-8">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-6">
            Research Status
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-sky-400/[0.04] border border-sky-400/[0.08]">
              <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-[13px] text-white/80 mb-1">Coverage Initiated</p>
                <p className="text-[12px] text-white/40">
                  Research scaffold created. Data files are ready for population at{" "}
                  <code className="text-[11px] text-sky-400/60">src/data/{stock.ticker.toLowerCase()}/</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data files overview */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 mb-8">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-6">
            Data Files
          </h2>
          <div className="grid gap-3">
            {[
              { file: "company.ts", desc: "Company info, market data, defaults" },
              { file: "catalysts.ts", desc: "Upcoming catalysts & completed milestones" },
              { file: "investment.ts", desc: "Investment thesis, scorecard, scenarios" },
              { file: "timeline.ts", desc: "Historical events & milestones" },
              { file: "index.ts", desc: "Central exports" },
            ].map((f) => (
              <div key={f.file} className="flex items-center gap-4 py-2">
                <code className="text-[11px] font-mono text-white/50 w-32 shrink-0">
                  {f.file}
                </code>
                <span className="text-[12px] text-white/30">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-6">
            Next Steps
          </h2>
          <ol className="grid gap-3 list-decimal list-inside">
            {[
              "Populate company.ts with market data, share structure, and fundamentals",
              "Add upcoming catalysts and milestones to catalysts.ts",
              "Build out investment thesis in investment.ts (scorecard, drivers, risks)",
              "Add historical timeline events to timeline.ts",
              "Create a custom analysis component at components/stocks/{TICKER}.tsx",
            ].map((step, i) => (
              <li key={i} className="text-[12px] text-white/40 leading-relaxed">
                {step.replace("{TICKER}", stock.ticker)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
