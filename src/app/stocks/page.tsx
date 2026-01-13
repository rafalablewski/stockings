import Link from "next/link";
import { stockList } from "@/lib/stocks";

export const metadata = {
  title: "Research | ABISON",
  description: "Investment research coverage",
};

export default function StocksPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <h1 className="text-2xl font-semibold text-white mb-3">Research</h1>
          <p className="text-sm text-white/40">
            Select a stock to access comprehensive analysis.
          </p>
        </div>

        <div className="space-y-px">
          {stockList.map((stock) => (
            <Link
              key={stock.ticker}
              href={`/stocks/${stock.ticker}`}
              className="group block py-5 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-white font-medium">{stock.ticker}</span>
                    <span className="text-white/30 text-sm">{stock.name}</span>
                  </div>
                  <p className="text-white/40 text-sm">{stock.description}</p>
                </div>
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-white/40 shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5">
          <p className="text-xs text-white/20 leading-relaxed max-w-sm">
            Each analysis includes 15+ tabs covering financials, valuations,
            scenarios, and perspectives from CFA, hedge fund, and CIO viewpoints.
          </p>
        </div>
      </div>
    </div>
  );
}
