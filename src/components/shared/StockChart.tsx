'use client';

import { useState, useEffect, useMemo } from 'react';
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
  Line,
  BarChart,
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

// Calculate Simple Moving Average
const calculateSMA = (data: ChartDataPoint[], period: number): (number | null)[] => {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close;
      }
      result.push(sum / period);
    }
  }
  return result;
};

// Indicator toggle button component
const IndicatorToggle = ({
  label,
  active,
  onClick,
  color
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '3px 8px',
      fontSize: 10,
      fontWeight: 500,
      borderRadius: 3,
      border: active ? `1px solid ${color || 'var(--accent)'}` : '1px solid var(--border)',
      cursor: 'pointer',
      background: active ? `${color}20` : 'transparent',
      color: active ? color || 'var(--accent)' : 'var(--text3)',
      transition: 'all 0.15s',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}
  >
    {color && <span style={{ width: 8, height: 2, background: color, borderRadius: 1 }} />}
    {label}
  </button>
);

export default function StockChart({ symbol, height = 220 }: StockChartProps) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState('3mo');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');

  // Indicator toggles
  const [showSMA20, setShowSMA20] = useState(false);
  const [showSMA50, setShowSMA50] = useState(false);
  const [showSMA200, setShowSMA200] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

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
  const formatVolume = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
    return value.toString();
  };

  // Calculate price change
  const chartData = data?.data || [];
  const firstPrice = chartData[0]?.close || 0;
  const lastPrice = chartData[chartData.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  const chartColor = isPositive ? '#34d399' : '#f87171';

  // Calculate SMAs
  const sma20 = useMemo(() => calculateSMA(chartData, 20), [chartData]);
  const sma50 = useMemo(() => calculateSMA(chartData, 50), [chartData]);
  const sma200 = useMemo(() => calculateSMA(chartData, 200), [chartData]);

  // Prepare chart data with SMAs
  const enrichedData = useMemo(() => chartData.map((d, i) => ({
    ...d,
    sma20: sma20[i],
    sma50: sma50[i],
    sma200: sma200[i],
    priceRange: [d.low, d.high],
  })), [chartData, sma20, sma50, sma200]);

  // SMA colors
  const SMA_COLORS = {
    sma20: '#f59e0b',  // Amber
    sma50: '#8b5cf6',  // Purple
    sma200: '#06b6d4', // Cyan
  };

  const mainChartHeight = showVolume ? height - 60 : height;
  const volumeHeight = 50;

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

      {/* Indicator toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
        <IndicatorToggle
          label="SMA 20"
          active={showSMA20}
          onClick={() => setShowSMA20(!showSMA20)}
          color={SMA_COLORS.sma20}
        />
        <IndicatorToggle
          label="SMA 50"
          active={showSMA50}
          onClick={() => setShowSMA50(!showSMA50)}
          color={SMA_COLORS.sma50}
        />
        <IndicatorToggle
          label="SMA 200"
          active={showSMA200}
          onClick={() => setShowSMA200(!showSMA200)}
          color={SMA_COLORS.sma200}
        />
        <IndicatorToggle
          label="Volume"
          active={showVolume}
          onClick={() => setShowVolume(!showVolume)}
        />
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
        <>
          <ResponsiveContainer width="100%" height={mainChartHeight}>
            <ComposedChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
                formatter={(value: number, name: string) => {
                  if (name === 'close') return [`$${value.toFixed(2)}`, 'Price'];
                  if (name === 'sma20') return [`$${value.toFixed(2)}`, 'SMA 20'];
                  if (name === 'sma50') return [`$${value.toFixed(2)}`, 'SMA 50'];
                  if (name === 'sma200') return [`$${value.toFixed(2)}`, 'SMA 200'];
                  return [`$${value.toFixed(2)}`, name];
                }}
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
              {showSMA20 && (
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke={SMA_COLORS.sma20}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
              {showSMA50 && (
                <Line
                  type="monotone"
                  dataKey="sma50"
                  stroke={SMA_COLORS.sma50}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
              {showSMA200 && (
                <Line
                  type="monotone"
                  dataKey="sma200"
                  stroke={SMA_COLORS.sma200}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
          {showVolume && (
            <ResponsiveContainer width="100%" height={volumeHeight}>
              <BarChart data={enrichedData} margin={{ top: 0, right: 5, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" hide />
                <YAxis
                  tickFormatter={formatVolume}
                  tick={{ fontSize: 9, fill: 'var(--text3)' }}
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
                    month: 'short',
                    day: 'numeric',
                  })}
                  formatter={(value: number) => [formatVolume(value), 'Volume']}
                />
                <Bar dataKey="volume" fill="var(--text3)" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </>
      )}

      {!loading && !error && chartData.length > 0 && chartType === 'candle' && (
        <>
          <ResponsiveContainer width="100%" height={mainChartHeight}>
            <ComposedChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
                        {showSMA20 && d.sma20 && (
                          <>
                            <span style={{ color: SMA_COLORS.sma20 }}>SMA 20:</span>
                            <span style={{ fontFamily: 'Space Mono' }}>${d.sma20?.toFixed(2)}</span>
                          </>
                        )}
                        {showSMA50 && d.sma50 && (
                          <>
                            <span style={{ color: SMA_COLORS.sma50 }}>SMA 50:</span>
                            <span style={{ fontFamily: 'Space Mono' }}>${d.sma50?.toFixed(2)}</span>
                          </>
                        )}
                        {showSMA200 && d.sma200 && (
                          <>
                            <span style={{ color: SMA_COLORS.sma200 }}>SMA 200:</span>
                            <span style={{ fontFamily: 'Space Mono' }}>${d.sma200?.toFixed(2)}</span>
                          </>
                        )}
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
                {enrichedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
              {showSMA20 && (
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke={SMA_COLORS.sma20}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
              {showSMA50 && (
                <Line
                  type="monotone"
                  dataKey="sma50"
                  stroke={SMA_COLORS.sma50}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
              {showSMA200 && (
                <Line
                  type="monotone"
                  dataKey="sma200"
                  stroke={SMA_COLORS.sma200}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
          {showVolume && (
            <ResponsiveContainer width="100%" height={volumeHeight}>
              <BarChart data={enrichedData} margin={{ top: 0, right: 5, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" hide />
                <YAxis
                  tickFormatter={formatVolume}
                  tick={{ fontSize: 9, fill: 'var(--text3)' }}
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
                    month: 'short',
                    day: 'numeric',
                  })}
                  formatter={(value: number) => [formatVolume(value), 'Volume']}
                />
                <Bar dataKey="volume" fill="var(--text3)" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}
