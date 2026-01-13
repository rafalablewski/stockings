import Link from "next/link";
import { stockList } from "@/lib/stocks";

export const metadata = {
  title: "Research | ABISON",
  description: "Investment research coverage",
};

export default function StocksPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-white mb-3">Research</h1>
          <p className="text-[13px] text-white/40">
            Select a stock to access comprehensive analysis.
          </p>
        </div>

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
    </div>
  );
}
