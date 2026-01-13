"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stocks, tickers } from "@/lib/stocks";

const stockComponents: Record<string, React.ComponentType> = {
  ASTS: dynamic(() => import("@/components/stocks/ASTS"), {
    loading: () => <LoadingState />,
    ssr: false,
  }),
  BMNR: dynamic(() => import("@/components/stocks/BMNR"), {
    loading: () => <LoadingState />,
    ssr: false,
  }),
  CRCL: dynamic(() => import("@/components/stocks/CRCL"), {
    loading: () => <LoadingState />,
    ssr: false,
  }),
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-white/40">Loading analysis</p>
      </div>
    </div>
  );
}

function NotFoundState({ ticker }: { ticker: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h1 className="text-xl font-medium text-white mb-3">Not Found</h1>
        <p className="text-sm text-white/40 mb-8">
          No analysis available for {ticker}.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          {tickers.map((t) => (
            <Link
              key={t}
              href={`/stocks/${t}`}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
        <Link
          href="/stocks"
          className="text-sm text-white/40 hover:text-white border-b border-white/20 hover:border-white/40 pb-0.5 transition-colors"
        >
          Back to Research
        </Link>
      </div>
    </div>
  );
}

export default function StockPage() {
  const params = useParams();
  const ticker = (params.ticker as string)?.toUpperCase();

  if (!ticker || !tickers.includes(ticker)) {
    return <NotFoundState ticker={ticker || "Unknown"} />;
  }

  const StockComponent = stockComponents[ticker];

  if (!StockComponent) {
    return <NotFoundState ticker={ticker} />;
  }

  return (
    <div className="min-h-screen">
      {/* Minimal nav */}
      <div className="sticky top-14 z-40 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/stocks"
            className="text-[13px] text-white/40 hover:text-white transition-colors"
          >
            Research
          </Link>
          <div className="flex items-center gap-6">
            {tickers.map((t) => (
              <Link
                key={t}
                href={`/stocks/${t}`}
                className={`text-[13px] transition-colors ${
                  t === ticker
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <StockComponent />
    </div>
  );
}
