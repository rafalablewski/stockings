'use client';

import { useState, useEffect, useCallback } from 'react';

export interface MarketData {
  open: number | null;
  dayHigh: number | null;
  dayLow: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
}

interface UseLiveStockPriceOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  onPriceUpdate?: (price: number) => void;
}

interface UseLiveStockPriceReturn {
  price: number | null;
  previousClose: number | null;
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for fetching live stock prices
 */
export const useLiveStockPrice = (
  symbol: string,
  initialPrice: number,
  options: UseLiveStockPriceOptions = {}
): UseLiveStockPriceReturn => {
  const { autoRefresh = false, refreshInterval = 60000, onPriceUpdate } = options;

  const [price, setPrice] = useState<number | null>(initialPrice);
  const [previousClose, setPreviousClose] = useState<number | null>(null);
  const [marketData, setMarketData] = useState<MarketData>({ open: null, dayHigh: null, dayLow: null, fiftyTwoWeekHigh: null, fiftyTwoWeekLow: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrice = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/stock/${encodeURIComponent(symbol)}?range=1d&interval=5m`);
      if (!res.ok) {
        throw new Error('Failed to fetch price');
      }
      const data = await res.json();

      if (data.regularMarketPrice) {
        const newPrice = data.regularMarketPrice;
        setPrice(newPrice);
        setPreviousClose(data.previousClose || null);
        setMarketData({
          open: data.regularMarketOpen ?? null,
          dayHigh: data.regularMarketDayHigh ?? null,
          dayLow: data.regularMarketDayLow ?? null,
          fiftyTwoWeekHigh: data.fiftyTwoWeekHigh ?? null,
          fiftyTwoWeekLow: data.fiftyTwoWeekLow ?? null,
        });
        setLastUpdated(new Date());

        if (onPriceUpdate) {
          onPriceUpdate(newPrice);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [symbol, onPriceUpdate]);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(fetchPrice, refreshInterval);
    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, fetchPrice]);

  return {
    price,
    previousClose,
    marketData,
    isLoading,
    error,
    lastUpdated,
    refresh: fetchPrice,
  };
};

interface LivePriceDisplayProps {
  symbol: string;
  initialPrice: number;
  onPriceUpdate?: (price: number) => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
  showChange?: boolean;
  className?: string;
}

/**
 * Component that displays the stock price with refresh capability
 */
export const LivePriceDisplay = ({
  symbol,
  initialPrice,
  onPriceUpdate,
  autoRefresh = false,
  refreshInterval = 60000,
  showChange = true,
  className = '',
}: LivePriceDisplayProps) => {
  const { price, previousClose, isLoading, error, lastUpdated, refresh } = useLiveStockPrice(
    symbol,
    initialPrice,
    { autoRefresh, refreshInterval, onPriceUpdate }
  );

  const displayPrice = price ?? initialPrice;
  const priceChange = previousClose ? displayPrice - previousClose : null;
  const priceChangePercent = previousClose && priceChange ? (priceChange / previousClose) * 100 : null;

  return (
    <div className={`live-price-container ${className}`}>
      <div className="price-big sm-flex sm-items-center sm-gap-12">
        ${displayPrice.toFixed(2)}
        <button
          onClick={refresh}
          disabled={isLoading}
          title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Click to refresh'}
          className="sm-refresh-btn"
          data-loading={isLoading ? 'true' : undefined}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm-refresh-icon"
            data-loading={isLoading ? 'true' : undefined}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
        </button>
      </div>

      {showChange && priceChange !== null && priceChangePercent !== null && (
        <div className="sm-price-change" data-direction={priceChange >= 0 ? 'up' : 'down'}>
          {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          {lastUpdated && (
            <span className="sm-price-change-ts">
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      )}

      {error && (
        <div className="sm-price-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default LivePriceDisplay;
