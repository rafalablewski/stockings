import Link from "next/link";
import { stockList } from "@/lib/stocks";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Professional</span>
            <br />
            <span className="text-white">Investment Research</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Deep-dive analysis on high-conviction investment opportunities.
            Comprehensive financial models, DCF valuations, and expert perspectives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/stocks"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Explore Analysis
            </Link>
            <a
              href="#coverage"
              className="px-8 py-4 border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/5 transition-colors"
            >
              Our Coverage
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">{stockList.length}</div>
              <div className="text-gray-500 mt-1">Stocks Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">15+</div>
              <div className="text-gray-500 mt-1">Analysis Tabs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">3</div>
              <div className="text-gray-500 mt-1">Expert Views</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">Live</div>
              <div className="text-gray-500 mt-1">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Coverage</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each analysis includes financial models, DCF valuations, Monte Carlo simulations,
              and perspectives from CFA, Hedge Fund, and CIO viewpoints.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stockList.map((stock) => (
              <Link
                key={stock.ticker}
                href={`/stocks/${stock.ticker}`}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stock.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stock.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${stock.color} text-white`}>
                      {stock.sector}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stock.ticker}</h3>
                  <p className="text-gray-400 text-sm mb-3">{stock.name}</p>
                  <p className="text-gray-500 text-sm">{stock.description}</p>
                  <div className="mt-4 flex items-center text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    View Analysis
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Analysis Framework</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every stock receives the same rigorous analytical treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Financial Models", desc: "Quarterly/annual metrics, balance sheets, cash flow projections", icon: "📊" },
              { title: "DCF Valuation", desc: "Discounted cash flow with adjustable assumptions", icon: "💰" },
              { title: "Monte Carlo", desc: "Probabilistic price simulations and risk analysis", icon: "🎲" },
              { title: "Three Perspectives", desc: "CFA fundamental, Hedge Fund catalyst, CIO portfolio views", icon: "👁️" },
              { title: "Wall Street Coverage", desc: "Analyst ratings, price targets, and report summaries", icon: "🏛️" },
              { title: "Historical Archive", desc: "Complete audit trail of all analysis updates", icon: "📚" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-gray-400 mb-8">
            Access comprehensive analysis on our covered stocks.
          </p>
          <Link
            href="/stocks"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            View All Research
          </Link>
        </div>
      </section>
    </div>
  );
}
