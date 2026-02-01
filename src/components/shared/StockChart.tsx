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
  ComposedChart,
  Bar,
  Cell,
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

// Custom candlestick shape for Recharts
const CandlestickBar = (props: any) => {
  const { x, y, width, height, open, close, high, low, fill } = props;
  const isUp = close >= open;
  const color = isUp ? '#34d399' : '#f87171';

  // Calculate positions
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.abs(close - open);

  // Scale factor from price to pixels (using the bar's dimensions)
  const priceRange = high - low;
  const pixelPerPrice = Math.abs(height) / (priceRange || 1);

  const wickX = x + width / 2;
  const bodyY = y + (high - bodyBottom) * pixelPerPrice;
  const bodyPixelHeight = Math.max(bodyHeight * pixelPerPrice, 1);
  const wickTopY = y;
  const wickBottomY = y + Math.abs(height);

  return (
    <g>
      {/* Wick (high-low line) */}
      <line
        x1={wickX}
        y1={wickTopY}
        x2={wickX}
        y2={wickBottomY}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body (open-close rect) */}
      <rect
        x={x + 1}
        y={bodyY}
        width={Math.max(width - 2, 2)}
        height={Math.max(bodyPixelHeight, 2)}
        fill={isUp ? color : color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

export default function StockChart({ symbol, height = 220 }: StockChartProps) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState('3mo');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');

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

  const chartColor = isPositive ? '#34d399' : '#f87171'; // Bright mint / bright red

  // Prepare candlestick data with price range for each bar
  const candleData = chartData.map(d => ({
    ...d,
    // For candlestick, we need the range from low to high
    priceRange: [d.low, d.high],
  }));

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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Chart type toggle */}
          <div style={{ display: 'flex', gap: 2, background: 'var(--surface2)', borderRadius: 4, padding: 2 }}>
            <button
              onClick={() => setChartType('line')}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 3,
                border: 'none',
                cursor: 'pointer',
                background: chartType === 'line' ? 'var(--surface)' : 'transparent',
                color: chartType === 'line' ? 'var(--text)' : 'var(--text3)',
                transition: 'all 0.15s',
              }}
              title="Line chart"
            >
              📈
            </button>
            <button
              onClick={() => setChartType('candle')}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 3,
                border: 'none',
                cursor: 'pointer',
                background: chartType === 'candle' ? 'var(--surface)' : 'transparent',
                color: chartType === 'candle' ? 'var(--text)' : 'var(--text3)',
                transition: 'all 0.15s',
              }}
              title="Candlestick chart"
            >
              🕯️
            </button>
          </div>
          {/* Time range buttons */}
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

      {!loading && !error && chartData.length > 0 && chartType === 'line' && (
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

      {!loading && !error && chartData.length > 0 && chartType === 'candle' && (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={candleData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
              formatter={(value: number, name: string) => {
                if (name === 'priceRange') return null;
                return [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0]?.payload;
                if (!d) return null;
                return (
                  <div style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: 8,
                    fontSize: 12,
                  }}>
                    <div style={{ color: 'var(--text3)', marginBottom: 4 }}>
                      {new Date(label).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 12px' }}>
                      <span style={{ color: 'var(--text3)' }}>Open:</span>
                      <span style={{ fontFamily: 'Space Mono' }}>${d.open?.toFixed(2)}</span>
                      <span style={{ color: 'var(--text3)' }}>High:</span>
                      <span style={{ fontFamily: 'Space Mono' }}>${d.high?.toFixed(2)}</span>
                      <span style={{ color: 'var(--text3)' }}>Low:</span>
                      <span style={{ fontFamily: 'Space Mono' }}>${d.low?.toFixed(2)}</span>
                      <span style={{ color: 'var(--text3)' }}>Close:</span>
                      <span style={{ fontFamily: 'Space Mono', color: d.close >= d.open ? '#34d399' : '#f87171' }}>
                        ${d.close?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <ReferenceLine
              y={firstPrice}
              stroke="var(--text3)"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />
            <Bar
              dataKey="priceRange"
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                if (!payload) return null;
                const { open, close, high, low } = payload;
                const isUp = close >= open;
                const color = isUp ? '#34d399' : '#f87171';

                const barWidth = Math.max(width * 0.8, 3);
                const barX = x + (width - barWidth) / 2;
                const wickX = x + width / 2;

                return (
                  <g>
                    {/* Wick */}
                    <line
                      x1={wickX}
                      y1={y}
                      x2={wickX}
                      y2={y + height}
                      stroke={color}
                      strokeWidth={1}
                    />
                    {/* Body */}
                    <rect
                      x={barX}
                      y={y + height * (high - Math.max(open, close)) / (high - low)}
                      width={barWidth}
                      height={Math.max(height * Math.abs(close - open) / (high - low), 2)}
                      fill={isUp ? 'transparent' : color}
                      stroke={color}
                      strokeWidth={1.5}
                    />
                  </g>
                );
              }}
            >
              {candleData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
