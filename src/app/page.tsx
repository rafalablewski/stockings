import Link from "next/link";
import { stockList } from "@/lib/stocks";

export default function HomePage() {
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
            Financial models, valuations, and expert perspectives.
          </p>
          <Link
            href="/stocks"
            className="inline-block text-[13px] text-white/60 hover:text-white border-b border-white/20 hover:border-white/60 pb-1 transition-colors"
          >
            View Research
          </Link>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-white/30 mb-3">Coverage</h2>
            <p className="text-white/50 text-sm max-w-md">
              Each analysis includes financial models, DCF valuations, Monte Carlo simulations, and multiple expert viewpoints.
            </p>
          </div>

          <div className="space-y-px">
            {stockList.map((stock, index) => (
              <Link
                key={stock.ticker}
                href={`/stocks/${stock.ticker}`}
                className="group block py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-8">
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="text-white/20 text-sm tabular-nums w-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-white font-medium">{stock.ticker}</span>
                        <span className="text-white/30 text-sm truncate">{stock.name}</span>
                      </div>
                      <p className="text-white/40 text-sm">{stock.description}</p>
                    </div>
                  </div>
                  <span className="text-white/20 text-xs uppercase tracking-wider shrink-0 group-hover:text-white/40 transition-colors">
                    {stock.sector}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-white/30 mb-12">Methodology</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm text-white mb-2">Financial Models</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Quarterly metrics, balance sheets, cash flow projections with adjustable assumptions.
              </p>
            </div>
            <div>
              <h3 className="text-sm text-white mb-2">Valuation</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                DCF analysis, Monte Carlo simulations, comparable company multiples.
              </p>
            </div>
            <div>
              <h3 className="text-sm text-white mb-2">Perspectives</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                CFA fundamental, hedge fund catalyst-driven, and CIO portfolio views.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
