"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stocks, tickers } from "@/lib/stocks";

// Dynamically import stock analysis components (they use client-side hooks)
const stockComponents: Record<string, React.ComponentType> = {
  ASTS: dynamic(() => import("@/components/stocks/ASTS"), {
    loading: () => <LoadingState ticker="ASTS" />,
    ssr: false,
  }),
  BMNR: dynamic(() => import("@/components/stocks/BMNR"), {
    loading: () => <LoadingState ticker="BMNR" />,
    ssr: false,
  }),
  CRCL: dynamic(() => import("@/components/stocks/CRCL"), {
    loading: () => <LoadingState ticker="CRCL" />,
    ssr: false,
  }),
};

function LoadingState({ ticker }: { ticker: string }) {
  const stock = stocks[ticker];
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">{stock?.icon || "📊"}</div>
        <h2 className="text-2xl font-bold mb-2">Loading {ticker} Analysis</h2>
        <p className="text-gray-400">Preparing financial models...</p>
        <div className="mt-6 flex justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

function NotFoundState({ ticker }: { ticker: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-4">Stock Not Found</h1>
        <p className="text-gray-400 mb-6">
          We don&apos;t have analysis for <span className="font-mono text-white">{ticker}</span> yet.
        </p>
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">Currently covered stocks:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tickers.map((t) => (
              <Link
                key={t}
                href={`/stocks/${t}`}
                className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/stocks"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
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

  // Check if we have this stock
  if (!ticker || !tickers.includes(ticker)) {
    return <NotFoundState ticker={ticker || "Unknown"} />;
  }

  const StockComponent = stockComponents[ticker];

  if (!StockComponent) {
    return <NotFoundState ticker={ticker} />;
  }

  return (
    <div className="min-h-screen">
      {/* Back navigation */}
      <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/stocks"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Research
          </Link>
          <div className="flex items-center gap-4">
            {tickers.map((t) => (
              <Link
                key={t}
                href={`/stocks/${t}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  t === ticker
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Analysis Component */}
      <StockComponent />
    </div>
  );
}
