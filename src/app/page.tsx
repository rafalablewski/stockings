import Link from "next/link";
import { researchStocks } from "@/lib/stocks";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-40 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/25 mb-6">
            Investment Research
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-8">
            <span className="tracking-[0.15em]">ABISON</span>
          </h1>
          <div className="w-12 h-px bg-white/10 mx-auto mb-8" />
          <p className="text-[15px] text-white/35 leading-relaxed max-w-md mx-auto">
            Deep-dive analysis on high-conviction opportunities across space technology, digital assets, and fintech infrastructure.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.04] py-10 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-16 md:gap-24">
          <div className="text-center">
            <div className="text-2xl font-light text-white/80 mb-1">{researchStocks.length}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">Active Research</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white/80 mb-1">3</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">Sectors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white/80 mb-1">20+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">Press Coverage</div>
          </div>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Research */}
            <Link
              href="/research"
              className="group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-4">
                Research
              </div>
              <h3 className="text-lg text-white/80 group-hover:text-white transition-colors mb-3">
                Equity Analysis
              </h3>
              <p className="text-[12px] text-white/30 leading-relaxed mb-6">
                Financial models, investment theses, catalysts, and multi-perspective analysis across our coverage universe.
              </p>
              <div className="flex items-center gap-2">
                {researchStocks.map((s) => (
                  <span
                    key={s.ticker}
                    className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded bg-white/[0.04]"
                  >
                    {s.ticker}
                  </span>
                ))}
              </div>
            </Link>

            {/* Press Intelligence */}
            <Link
              href="/press-intelligence"
              className="group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-4">
                Intelligence
              </div>
              <h3 className="text-lg text-white/80 group-hover:text-white transition-colors mb-3">
                Press &amp; Wire Feed
              </h3>
              <p className="text-[12px] text-white/30 leading-relaxed mb-6">
                Real-time aggregation of press releases, SEC filings, and corporate announcements across 20+ tickers.
              </p>
              <span className="text-[10px] font-mono text-white/20">
                Live feed &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Holdings */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-10 text-center">
            Coverage Universe
          </h2>

          <div className="grid gap-4">
            {researchStocks.map((stock) => (
              <Link
                key={stock.ticker}
                href={`/research/${stock.ticker}`}
                className="group flex items-center justify-between p-5 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-mono font-medium text-white/70 w-12">
                    {stock.ticker}
                  </span>
                  <span className="text-[13px] text-white/35">
                    {stock.name}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/15 group-hover:text-white/30 transition-colors">
                  {stock.sector}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-10 text-center">
            Our Strategies
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: "Core",
                title: "Growth Equity Investing",
                desc: "Concentrated positions in high-growth companies at inflection points — revenue ramps, market expansions, and technology breakthroughs. Deep fundamental research to identify asymmetric risk/reward before the market reprices.",
              },
              {
                label: "Tactical",
                title: "Catalyst-Driven Trading",
                desc: "Sized around discrete, identifiable catalysts — satellite launches, FDA approvals, earnings inflections, contract awards. Enter ahead of the event, manage risk around the binary outcome.",
              },
              {
                label: "Yield",
                title: "Carry Trade",
                desc: "Exploiting yield differentials and funding rate dislocations across asset classes. Structured to generate steady income while maintaining exposure to underlying equity upside.",
              },
              {
                label: "Amplification",
                title: "Leverage Amplification",
                desc: "LEAPS, margin, and defined-risk options structures to amplify conviction in highest-confidence positions. Strict position sizing and drawdown limits to cap downside exposure.",
              },
            ].map((strategy) => (
              <div
                key={strategy.title}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-3">
                  {strategy.label}
                </div>
                <h3 className="text-[14px] text-white/70 mb-3">{strategy.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed">
                  {strategy.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Fundamental Analysis", desc: "Quarterly metrics, balance sheets, DCF models, and scenario analysis" },
              { title: "Catalyst Tracking", desc: "Real-time monitoring of milestones, filings, and inflection points" },
              { title: "Multi-Perspective", desc: "CFA fundamental, hedge fund catalyst, and CIO portfolio viewpoints" },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-[12px] text-white/50 mb-2">{item.title}</h3>
                <p className="text-[11px] text-white/20 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
