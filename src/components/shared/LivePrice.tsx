'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLiveStockPriceOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  onPriceUpdate?: (price: number) => void;
}

interface UseLiveStockPriceReturn {
  price: number | null;
  previousClose: number | null;
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
      <div className="price-big" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        ${displayPrice.toFixed(2)}
        <button
          onClick={refresh}
          disabled={isLoading}
          title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Click to refresh'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: isLoading ? 'wait' : 'pointer',
            padding: 8,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            opacity: isLoading ? 0.5 : 0.7,
          }}
          onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'var(--surface2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = isLoading ? '0.5' : '0.7'; e.currentTarget.style.background = 'transparent'; }}
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
            style={{
              color: 'var(--text3)',
              animation: isLoading ? 'spin 1s linear infinite' : 'none',
            }}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
        </button>
      </div>

      {showChange && priceChange !== null && priceChangePercent !== null && (
        <div
          style={{
            fontSize: 12,
            fontFamily: 'Space Mono, monospace',
            color: priceChange >= 0 ? 'var(--mint)' : 'var(--coral)',
            marginTop: 4,
          }}
        >
          {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          {lastUpdated && (
            <span style={{ color: 'var(--text3)', marginLeft: 8, fontSize: 10 }}>
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      )}

      {error && (
        <div style={{ fontSize: 11, color: 'var(--coral)', marginTop: 4 }}>
          {error}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LivePriceDisplay;
