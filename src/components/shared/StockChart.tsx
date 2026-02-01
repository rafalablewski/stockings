'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ChartDataPoint {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockData {
  symbol: string;
  currency: string;
  regularMarketPrice: number;
  previousClose: number;
  chartPreviousClose: number;
  data: ChartDataPoint[];
}

interface StockChartProps {
  symbol: string;
  height?: number;
}

const RANGES = [
  { label: '1W', value: '5d', interval: '15m' },
  { label: '1M', value: '1mo', interval: '1d' },
  { label: '3M', value: '3mo', interval: '1d' },
  { label: '6M', value: '6mo', interval: '1d' },
  { label: '1Y', value: '1y', interval: '1d' },
  { label: '5Y', value: '5y', interval: '1wk' },
];

export default function StockChart({ symbol, height = 220 }: StockChartProps) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState('3mo');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const selectedRange = RANGES.find(r => r.value === range);
      const interval = selectedRange?.interval || '1d';

      try {
        const res = await fetch(`/api/stock/${symbol}?range=${range}&interval=${interval}`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Failed to load chart data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, range]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (range === '5d') {
      return date.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric' });
    }
    if (range === '1mo' || range === '3mo') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const formatPrice = (value: number) => `$${value.toFixed(2)}`;

  // Calculate price change
  const chartData = data?.data || [];
  const firstPrice = chartData[0]?.close || 0;
  const lastPrice = chartData[chartData.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  const chartColor = isPositive ? 'var(--mint)' : 'var(--red)';

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div className="card-title" style={{ marginBottom: 4 }}>{symbol}</div>
          {data && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 600, fontFamily: 'Space Mono' }}>
                ${data.regularMarketPrice?.toFixed(2) || lastPrice.toFixed(2)}
              </span>
              <span style={{
                fontSize: 14,
                color: isPositive ? 'var(--mint)' : 'var(--red)',
                fontFamily: 'Space Mono',
              }}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                background: range === r.value ? 'var(--accent)' : 'var(--surface2)',
                color: range === r.value ? 'white' : 'var(--text3)',
                transition: 'all 0.15s',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)' }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}>
          {error}
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10, fill: 'var(--text3)' }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
              minTickGap={50}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={formatPrice}
              tick={{ fontSize: 10, fill: 'var(--text3)' }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <ReferenceLine
              y={firstPrice}
              stroke="var(--text3)"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${symbol})`}
              dot={false}
              activeDot={{ r: 4, fill: chartColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
