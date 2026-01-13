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
        <Link
          href="/stocks"
          className="text-[13px] text-white/40 hover:text-white transition-colors"
        >
          ← Back to Research
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

  return <StockComponent />;
}
