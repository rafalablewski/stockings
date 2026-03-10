import Link from "next/link";
import { researchStocks, stockList } from "@/lib/stocks";
import InitiateResearch from "@/components/InitiateResearch";

export const metadata = {
  title: "Research | ABISON",
  description: "Investment research coverage universe",
};

export default function ResearchPage() {
  // Stocks without full research coverage (watchlist)
  const watchlistStocks = stockList.filter((s) => !s.hasResearch);

  // Group research stocks by sector
  const sectors = Array.from(new Set(researchStocks.map((s) => s.sector)));

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4">
            Coverage Universe
          </p>
          <h1 className="text-3xl font-light tracking-tight text-white mb-4">
            Research
          </h1>
          <div className="w-10 h-px bg-white/10 mb-6" />
          <p className="text-[14px] text-white/35 leading-relaxed max-w-lg">
            Deep-dive equity analysis across space technology, digital assets,
            and fintech infrastructure.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 mb-16 pb-12 border-b border-white/[0.04]">
          <div>
            <div className="text-xl font-light text-white/80 mb-0.5">
              {researchStocks.length}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              Active Research
            </div>
          </div>
          <div>
            <div className="text-xl font-light text-white/80 mb-0.5">
              {sectors.length}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              Sectors
            </div>
          </div>
          <div>
            <div className="text-xl font-light text-white/80 mb-0.5">
              {watchlistStocks.length}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              Watchlist
            </div>
          </div>
        </div>

        {/* Active Research — grouped by sector */}
        {sectors.map((sector) => {
          const sectorStocks = researchStocks.filter(
            (s) => s.sector === sector,
          );
          return (
            <div key={sector} className="mb-14">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/25 mb-5">
                {sector}
              </h2>
              <div className="grid gap-3">
                {sectorStocks.map((stock) => (
                  <Link
                    key={stock.ticker}
                    href={`/research/${stock.ticker}`}
                    className="group flex items-center justify-between p-5 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] font-mono font-medium text-white/80 w-12">
                        {stock.ticker}
                      </span>
                      <div>
                        <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">
                          {stock.name}
                        </span>
                        <p className="text-[11px] text-white/20 mt-0.5 leading-relaxed max-w-md">
                          {stock.description}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Watchlist */}
        {watchlistStocks.length > 0 && (
          <div className="mb-14">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/25 mb-2">
              Watchlist
            </h2>
            <p className="text-[11px] text-white/15 mb-5">
              Tracked tickers without full research coverage.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {watchlistStocks.map((stock) => (
                <div
                  key={stock.ticker}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]"
                >
                  <span className="text-[12px] font-mono text-white/40 w-10">
                    {stock.ticker}
                  </span>
                  <span className="text-[12px] text-white/25">
                    {stock.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initiate new research */}
        <div className="pt-8 border-t border-white/[0.04]">
          <InitiateResearch />
        </div>
      </div>
    </div>
  );
}
