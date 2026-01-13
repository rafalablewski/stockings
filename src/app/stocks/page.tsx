import Link from "next/link";
import { stockList } from "@/lib/stocks";

export const metadata = {
  title: "Stock Research | Stockings",
  description: "Browse our comprehensive stock analysis and research coverage",
};

export default function StocksPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Research Coverage</h1>
          <p className="text-gray-400 max-w-2xl">
            Select a stock to access its full analysis, including financial models,
            valuation frameworks, and expert perspectives.
          </p>
        </div>

        {/* Stock Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockList.map((stock) => (
            <Link
              key={stock.ticker}
              href={`/stocks/${stock.ticker}`}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 card-hover"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stock.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Card content */}
              <div className="relative p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-4xl mb-2 block">{stock.icon}</span>
                    <h2 className="text-2xl font-bold">{stock.ticker}</h2>
                    <p className="text-gray-400">{stock.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${stock.color} text-white whitespace-nowrap`}>
                    {stock.sector}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {stock.description}
                </p>

                {/* Analysis Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['DCF', 'Monte Carlo', 'Wall Street', 'Scenarios'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                  Open Analysis
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-4">About Our Analysis</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <h4 className="text-white font-medium mb-2">Comprehensive Coverage</h4>
              <p>Each analysis includes 15+ tabs covering financials, valuations, scenarios, and expert perspectives.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Regular Updates</h4>
              <p>Models are updated after earnings, SEC filings, and material news with full historical archive.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Three Perspectives</h4>
              <p>CFA (fundamental), Hedge Fund (catalyst-driven), and CIO (portfolio allocation) viewpoints.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
