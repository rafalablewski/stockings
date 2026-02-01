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
  LineChart,
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
  { label: '1D', value: '1d', interval: '5m' },
  { label: '1W', value: '5d', interval: '15m' },
  { label: '1M', value: '1mo', interval: '1d' },
  { label: '3M', value: '3mo', interval: '1d' },
  { label: '6M', value: '6mo', interval: '1d' },
  { label: 'YTD', value: 'ytd', interval: '1d' },
  { label: '1Y', value: '1y', interval: '1d' },
  { label: '5Y', value: '5y', interval: '1wk' },
  { label: 'ALL', value: 'max', interval: '1wk' },
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

// Calculate EMA (Exponential Moving Average)
const calculateEMA = (data: number[], period: number): (number | null)[] => {
  const result: (number | null)[] = [];
  const multiplier = 2 / (period + 1);

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else if (i === period - 1) {
      // First EMA is SMA
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j];
      }
      result.push(sum / period);
    } else {
      const prevEMA = result[i - 1];
      if (prevEMA !== null) {
        result.push((data[i] - prevEMA) * multiplier + prevEMA);
      } else {
        result.push(null);
      }
    }
  }
  return result;
};

// Calculate RSI (Relative Strength Index)
const calculateRSI = (data: ChartDataPoint[], period: number = 14): (number | null)[] => {
  const result: (number | null)[] = [];
  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      gains.push(0);
      losses.push(0);
      result.push(null);
      continue;
    }

    const change = data[i].close - data[i - 1].close;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);

    if (i < period) {
      result.push(null);
      continue;
    }

    let avgGain = 0;
    let avgLoss = 0;

    if (i === period) {
      // First RSI uses simple average
      for (let j = 1; j <= period; j++) {
        avgGain += gains[i - period + j];
        avgLoss += losses[i - period + j];
      }
      avgGain /= period;
      avgLoss /= period;
    } else {
      // Subsequent RSI uses smoothed average
      const prevAvgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
      const prevAvgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
      avgGain = (prevAvgGain * (period - 1) + gains[i]) / period;
      avgLoss = (prevAvgLoss * (period - 1) + losses[i]) / period;
    }

    if (avgLoss === 0) {
      result.push(100);
    } else {
      const rs = avgGain / avgLoss;
      result.push(100 - (100 / (1 + rs)));
    }
  }
  return result;
};

// Calculate Bollinger Bands
const calculateBollingerBands = (data: ChartDataPoint[], period: number = 20, stdDev: number = 2): {
  upper: (number | null)[];
  middle: (number | null)[];
  lower: (number | null)[];
} => {
  const middle = calculateSMA(data, period);
  const upper: (number | null)[] = [];
  const lower: (number | null)[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1 || middle[i] === null) {
      upper.push(null);
      lower.push(null);
      continue;
    }

    // Calculate standard deviation
    let sumSquares = 0;
    for (let j = 0; j < period; j++) {
      const diff = data[i - j].close - middle[i]!;
      sumSquares += diff * diff;
    }
    const std = Math.sqrt(sumSquares / period);

    upper.push(middle[i]! + stdDev * std);
    lower.push(middle[i]! - stdDev * std);
  }

  return { upper, middle, lower };
};

// Calculate VWAP (Volume Weighted Average Price)
const calculateVWAP = (data: ChartDataPoint[]): (number | null)[] => {
  const result: (number | null)[] = [];
  let cumulativeTPV = 0; // Typical Price × Volume
  let cumulativeVolume = 0;

  for (let i = 0; i < data.length; i++) {
    const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
    cumulativeTPV += typicalPrice * data[i].volume;
    cumulativeVolume += data[i].volume;

    if (cumulativeVolume === 0) {
      result.push(null);
    } else {
      result.push(cumulativeTPV / cumulativeVolume);
    }
  }
  return result;
};

// Calculate MACD
const calculateMACD = (data: ChartDataPoint[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9): {
  macd: (number | null)[];
  signal: (number | null)[];
  histogram: (number | null)[];
} => {
  const closes = data.map(d => d.close);
  const fastEMA = calculateEMA(closes, fastPeriod);
  const slowEMA = calculateEMA(closes, slowPeriod);

  const macdLine: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (fastEMA[i] === null || slowEMA[i] === null) {
      macdLine.push(null);
    } else {
      macdLine.push(fastEMA[i]! - slowEMA[i]!);
    }
  }

  // Calculate signal line (EMA of MACD)
  const macdValues = macdLine.map(v => v ?? 0);
  const signalLine = calculateEMA(macdValues, signalPeriod);

  // Adjust signal line to have nulls where MACD is null
  const adjustedSignal: (number | null)[] = signalLine.map((v, i) =>
    macdLine[i] === null ? null : v
  );

  // Calculate histogram
  const histogram: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (macdLine[i] === null || adjustedSignal[i] === null) {
      histogram.push(null);
    } else {
      histogram.push(macdLine[i]! - adjustedSignal[i]!);
    }
  }

  return { macd: macdLine, signal: adjustedSignal, histogram };
};

// Calculate ATR (Average True Range)
const calculateATR = (data: ChartDataPoint[], period: number = 14): (number | null)[] => {
  const result: (number | null)[] = [];
  const trueRanges: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      // First TR is just high - low
      trueRanges.push(data[i].high - data[i].low);
      result.push(null);
      continue;
    }

    // True Range = max(high - low, |high - prevClose|, |low - prevClose|)
    const prevClose = data[i - 1].close;
    const tr = Math.max(
      data[i].high - data[i].low,
      Math.abs(data[i].high - prevClose),
      Math.abs(data[i].low - prevClose)
    );
    trueRanges.push(tr);

    if (i < period) {
      result.push(null);
      continue;
    }

    if (i === period) {
      // First ATR is simple average
      const sum = trueRanges.slice(0, period + 1).reduce((a, b) => a + b, 0);
      result.push(sum / (period + 1));
    } else {
      // Subsequent ATR uses smoothed average
      const prevATR = result[i - 1];
      if (prevATR !== null) {
        result.push((prevATR * (period - 1) + tr) / period);
      } else {
        result.push(null);
      }
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

export default function StockChart({ symbol, height = 280 }: StockChartProps) {
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
  const [showRSI, setShowRSI] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showVWAP, setShowVWAP] = useState(false);
  const [showMACD, setShowMACD] = useState(false);
  const [showATR, setShowATR] = useState(false);

  // Scale toggle
  const [logScale, setLogScale] = useState(false);

  // Refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(k => k + 1);

  // Comparison toggles
  const [showSPY, setShowSPY] = useState(false);
  const [showQQQ, setShowQQQ] = useState(false);
  const [showGold, setShowGold] = useState(false);
  const [showBTC, setShowBTC] = useState(false);

  // Comparison data
  const [spyData, setSpyData] = useState<ChartDataPoint[] | null>(null);
  const [qqqData, setQqqData] = useState<ChartDataPoint[] | null>(null);
  const [goldData, setGoldData] = useState<ChartDataPoint[] | null>(null);
  const [btcData, setBtcData] = useState<ChartDataPoint[] | null>(null);

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
  }, [symbol, range, refreshKey]);

  // Fetch comparison data when enabled
  useEffect(() => {
    const selectedRange = RANGES.find(r => r.value === range);
    const interval = selectedRange?.interval || '1d';

    const fetchComparisonData = async (
      ticker: string,
      setData: (data: ChartDataPoint[] | null) => void,
      enabled: boolean
    ) => {
      if (!enabled) {
        setData(null);
        return;
      }
      try {
        const res = await fetch(`/api/stock/${encodeURIComponent(ticker)}?range=${range}&interval=${interval}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (err) {
        console.error(`Failed to fetch ${ticker} data:`, err);
      }
    };

    fetchComparisonData('SPY', setSpyData, showSPY);
    fetchComparisonData('QQQ', setQqqData, showQQQ);
    fetchComparisonData('GLD', setGoldData, showGold);
    fetchComparisonData('BTC-USD', setBtcData, showBTC);
  }, [showSPY, showQQQ, showGold, showBTC, range]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (range === '1d') {
      // Show date + time since it may be showing previous trading day (e.g., Friday on weekends)
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }
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

  // Calculate indicators
  const sma20 = useMemo(() => calculateSMA(chartData, 20), [chartData]);
  const sma50 = useMemo(() => calculateSMA(chartData, 50), [chartData]);
  const sma200 = useMemo(() => calculateSMA(chartData, 200), [chartData]);
  const rsi = useMemo(() => calculateRSI(chartData, 14), [chartData]);
  const bollinger = useMemo(() => calculateBollingerBands(chartData, 20, 2), [chartData]);
  const vwap = useMemo(() => calculateVWAP(chartData), [chartData]);
  const macd = useMemo(() => calculateMACD(chartData), [chartData]);
  const atr = useMemo(() => calculateATR(chartData, 14), [chartData]);

  // Calculate high/low for current range
  const { rangeHigh, rangeLow } = useMemo(() => {
    if (chartData.length === 0) return { rangeHigh: null, rangeLow: null };
    const high = Math.max(...chartData.map(d => d.high));
    const low = Math.min(...chartData.map(d => d.low));
    return { rangeHigh: high, rangeLow: low };
  }, [chartData]);

  // Get label for current range
  const rangeLabel = RANGES.find(r => r.value === range)?.label || range;

  // Calculate comparison data (normalize to percentage change)
  const normalizeComparison = (compData: ChartDataPoint[] | null): Map<number, number> | null => {
    if (!compData || compData.length === 0) return null;
    const basePrice = compData[0]?.close;
    if (!basePrice) return null;
    const compMap = new Map<number, number>();
    compData.forEach(d => {
      const pctChange = ((d.close - basePrice) / basePrice) * 100;
      compMap.set(d.date, pctChange);
    });
    return compMap;
  };

  // For BTC (trades 24/7), normalize by calendar day in UTC
  const normalizeBtcComparison = (compData: ChartDataPoint[] | null): Map<string, number> | null => {
    if (!compData || compData.length === 0) return null;
    const basePrice = compData[0]?.close;
    if (!basePrice) return null;
    const compMap = new Map<string, number>();
    compData.forEach(d => {
      const pctChange = ((d.close - basePrice) / basePrice) * 100;
      const date = new Date(d.date);
      const dayKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
      compMap.set(dayKey, pctChange);
    });
    return compMap;
  };

  const getDayKey = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
  };

  const spyNormalized = useMemo(() => normalizeComparison(spyData), [spyData]);
  const qqqNormalized = useMemo(() => normalizeComparison(qqqData), [qqqData]);
  const goldNormalized = useMemo(() => normalizeComparison(goldData), [goldData]);
  const btcNormalized = useMemo(() => normalizeBtcComparison(btcData), [btcData]);

  const showAnyComparison = showSPY || showQQQ || showGold || showBTC;

  // Prepare chart data with all indicators
  const enrichedData = useMemo(() => {
    const stockBasePrice = chartData[0]?.close || 1;
    return chartData.map((d, i) => {
      // For BTC, look up by day key (UTC) since it trades 24/7
      const btcPct = btcNormalized?.get(getDayKey(d.date)) ?? null;

      return {
        ...d,
        sma20: sma20[i],
        sma50: sma50[i],
        sma200: sma200[i],
        rsi: rsi[i],
        bbUpper: bollinger.upper[i],
        bbMiddle: bollinger.middle[i],
        bbLower: bollinger.lower[i],
        vwap: vwap[i],
        macdLine: macd.macd[i],
        macdSignal: macd.signal[i],
        macdHistogram: macd.histogram[i],
        atr: atr[i],
        priceRange: [d.low, d.high],
        // For comparison chart: stock's percentage change
        stockPctChange: ((d.close - stockBasePrice) / stockBasePrice) * 100,
        // Comparison percentage changes
        spyPctChange: spyNormalized?.get(d.date) ?? null,
        qqqPctChange: qqqNormalized?.get(d.date) ?? null,
        goldPctChange: goldNormalized?.get(d.date) ?? null,
        btcPctChange: btcPct,
      };
    });
  }, [chartData, sma20, sma50, sma200, rsi, bollinger, vwap, macd, atr, spyNormalized, qqqNormalized, goldNormalized, btcNormalized]);

  // Colors
  const COLORS = {
    sma20: '#f59e0b',    // Amber
    sma50: '#8b5cf6',    // Purple
    sma200: '#06b6d4',   // Cyan
    rsi: '#ec4899',      // Pink
    bbUpper: '#64748b',  // Slate
    bbLower: '#64748b',  // Slate
    bbMiddle: '#94a3b8', // Slate lighter
    vwap: '#f97316',     // Orange
    macd: '#3b82f6',     // Blue
    macdSignal: '#ef4444', // Red
    macdHistogramUp: '#34d399',
    macdHistogramDown: '#f87171',
    atr: '#14b8a6',      // Teal
    rangeHigh: '#22c55e', // Green
    rangeLow: '#ef4444',  // Red
    spy: '#a855f7',        // Purple
    qqq: '#06b6d4',        // Cyan
    gold: '#eab308',       // Yellow/Gold
    btc: '#f97316',        // Orange
  };

  // Calculate heights - main chart stays fixed, sub-panels add to total
  const mainChartHeight = height;
  const subChartHeight = 70;

  // Get latest RSI value for display
  const latestRSI = rsi[rsi.length - 1];
  const rsiStatus = latestRSI !== null
    ? latestRSI > 70 ? 'Overbought' : latestRSI < 30 ? 'Oversold' : 'Neutral'
    : '';

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
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 4,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: 'var(--surface2)',
                color: 'var(--text3)',
                transition: 'all 0.15s',
                opacity: loading ? 0.5 : 1,
                marginLeft: 4,
              }}
              title="Refresh chart data"
            >
              ↻
            </button>
          </div>
        </div>
      </div>

      {/* Indicator toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Indicators:</span>
        <IndicatorToggle label="SMA 20" active={showSMA20} onClick={() => setShowSMA20(!showSMA20)} color={COLORS.sma20} />
        <IndicatorToggle label="SMA 50" active={showSMA50} onClick={() => setShowSMA50(!showSMA50)} color={COLORS.sma50} />
        <IndicatorToggle label="SMA 200" active={showSMA200} onClick={() => setShowSMA200(!showSMA200)} color={COLORS.sma200} />
        <IndicatorToggle label="Bollinger" active={showBollinger} onClick={() => setShowBollinger(!showBollinger)} color={COLORS.bbUpper} />
        <IndicatorToggle label="VWAP" active={showVWAP} onClick={() => setShowVWAP(!showVWAP)} color={COLORS.vwap} />
        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 2px' }} />
        <IndicatorToggle label="Volume" active={showVolume} onClick={() => setShowVolume(!showVolume)} />
        <IndicatorToggle label="RSI" active={showRSI} onClick={() => setShowRSI(!showRSI)} color={COLORS.rsi} />
        <IndicatorToggle label="MACD" active={showMACD} onClick={() => setShowMACD(!showMACD)} color={COLORS.macd} />
        <IndicatorToggle label="ATR" active={showATR} onClick={() => setShowATR(!showATR)} color={COLORS.atr} />
      </div>

      {/* Scale & Comparison toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Scale:</span>
        <IndicatorToggle label="Log" active={logScale} onClick={() => setLogScale(!logScale)} />
        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 6px' }} />
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Compare:</span>
        <IndicatorToggle label="vs. SPY" active={showSPY} onClick={() => setShowSPY(!showSPY)} color={COLORS.spy} />
        <IndicatorToggle label="vs. QQQ" active={showQQQ} onClick={() => setShowQQQ(!showQQQ)} color={COLORS.qqq} />
        <IndicatorToggle label="vs. Gold" active={showGold} onClick={() => setShowGold(!showGold)} color={COLORS.gold} />
        <IndicatorToggle label="vs. BTC" active={showBTC} onClick={() => setShowBTC(!showBTC)} color={COLORS.btc} />
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
                <linearGradient id={`bb-gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.bbUpper} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={COLORS.bbLower} stopOpacity={0.1} />
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
                scale={logScale ? 'log' : 'auto'}
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
                  if (value === null || value === undefined) return ['-', name];
                  if (name === 'close') return [`$${value.toFixed(2)}`, 'Price'];
                  if (name === 'sma20') return [`$${value.toFixed(2)}`, 'SMA 20'];
                  if (name === 'sma50') return [`$${value.toFixed(2)}`, 'SMA 50'];
                  if (name === 'sma200') return [`$${value.toFixed(2)}`, 'SMA 200'];
                  if (name === 'bbUpper') return [`$${value.toFixed(2)}`, 'BB Upper'];
                  if (name === 'bbLower') return [`$${value.toFixed(2)}`, 'BB Lower'];
                  if (name === 'vwap') return [`$${value.toFixed(2)}`, 'VWAP'];
                  return [`$${value.toFixed(2)}`, name];
                }}
              />
              <ReferenceLine y={firstPrice} stroke="var(--text3)" strokeDasharray="3 3" strokeOpacity={0.5} />

              {/* Bollinger Bands */}
              {showBollinger && (
                <>
                  <Area type="monotone" dataKey="bbUpper" stroke="none" fill={`url(#bb-gradient-${symbol})`} connectNulls={false} />
                  <Line type="monotone" dataKey="bbUpper" stroke={COLORS.bbUpper} strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="bbMiddle" stroke={COLORS.bbMiddle} strokeWidth={1} dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="bbLower" stroke={COLORS.bbLower} strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={false} />
                </>
              )}

              {/* Main price line */}
              <Area
                type="monotone"
                dataKey="close"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${symbol})`}
                dot={false}
                activeDot={{ r: 4, fill: chartColor }}
              />

              {/* VWAP */}
              {showVWAP && (
                <Line type="monotone" dataKey="vwap" stroke={COLORS.vwap} strokeWidth={1.5} strokeDasharray="5 2" dot={false} connectNulls={false} />
              )}

              {/* SMAs */}
              {showSMA20 && <Line type="monotone" dataKey="sma20" stroke={COLORS.sma20} strokeWidth={1.5} dot={false} connectNulls={false} />}
              {showSMA50 && <Line type="monotone" dataKey="sma50" stroke={COLORS.sma50} strokeWidth={1.5} dot={false} connectNulls={false} />}
              {showSMA200 && <Line type="monotone" dataKey="sma200" stroke={COLORS.sma200} strokeWidth={1.5} dot={false} connectNulls={false} />}
            </ComposedChart>
          </ResponsiveContainer>

          {/* Volume Panel */}
          {showVolume && (
            <ResponsiveContainer width="100%" height={subChartHeight}>
              <BarChart data={enrichedData} margin={{ top: 0, right: 5, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" hide />
                <YAxis tickFormatter={formatVolume} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  formatter={(value: number) => [formatVolume(value), 'Volume']}
                />
                <Bar dataKey="volume" fill="var(--text3)" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* RSI Panel */}
          {showRSI && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>
                RSI(14): <span style={{ color: latestRSI !== null && latestRSI > 70 ? '#f87171' : latestRSI !== null && latestRSI < 30 ? '#34d399' : 'var(--text2)' }}>
                  {latestRSI?.toFixed(1)} {rsiStatus}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 100]} ticks={[30, 70]} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                  <ReferenceLine y={70} stroke="#f87171" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <ReferenceLine y={30} stroke="#34d399" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number) => [value?.toFixed(1), 'RSI']}
                  />
                  <Line type="monotone" dataKey="rsi" stroke={COLORS.rsi} strokeWidth={1.5} dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* MACD Panel */}
          {showMACD && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>
                MACD(12,26,9)
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <ComposedChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number, name: string) => {
                      if (value === null) return ['-', name];
                      if (name === 'macdLine') return [value?.toFixed(3), 'MACD'];
                      if (name === 'macdSignal') return [value?.toFixed(3), 'Signal'];
                      if (name === 'macdHistogram') return [value?.toFixed(3), 'Histogram'];
                      return [value?.toFixed(3), name];
                    }}
                  />
                  <Bar dataKey="macdHistogram" fill={COLORS.macdHistogramUp}>
                    {enrichedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.macdHistogram && entry.macdHistogram >= 0 ? COLORS.macdHistogramUp : COLORS.macdHistogramDown} opacity={0.7} />
                    ))}
                  </Bar>
                  <Line type="monotone" dataKey="macdLine" stroke={COLORS.macd} strokeWidth={1.5} dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="macdSignal" stroke={COLORS.macdSignal} strokeWidth={1.5} dot={false} connectNulls={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* ATR Panel */}
          {showATR && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>
                ATR(14): <span style={{ color: COLORS.atr }}>
                  {atr[atr.length - 1]?.toFixed(2) || '-'}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => v.toFixed(1)} />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number) => [value?.toFixed(2), 'ATR']}
                  />
                  <Line type="monotone" dataKey="atr" stroke={COLORS.atr} strokeWidth={1.5} dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Comparison Panel */}
          {showAnyComparison && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1, display: 'flex', gap: 8 }}>
                <span>Relative Performance:</span>
                <span style={{ color: chartColor }}>{symbol}</span>
                {showSPY && <span style={{ color: COLORS.spy }}>vs. SPY</span>}
                {showQQQ && <span style={{ color: COLORS.qqq }}>vs. QQQ</span>}
                {showGold && <span style={{ color: COLORS.gold }}>vs. Gold</span>}
                {showBTC && <span style={{ color: COLORS.btc }}>vs. BTC</span>}
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight + 20}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => `${v.toFixed(0)}%`} />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number, name: string) => {
                      if (value === null || value === undefined) return ['-', name];
                      if (name === 'stockPctChange') return [`${value.toFixed(1)}%`, symbol];
                      if (name === 'spyPctChange') return [`${value.toFixed(1)}%`, 'SPY'];
                      if (name === 'qqqPctChange') return [`${value.toFixed(1)}%`, 'QQQ'];
                      if (name === 'goldPctChange') return [`${value.toFixed(1)}%`, 'Gold'];
                      if (name === 'btcPctChange') return [`${value.toFixed(1)}%`, 'BTC'];
                      return [`${value.toFixed(1)}%`, name];
                    }}
                  />
                  <Line type="monotone" dataKey="stockPctChange" stroke={chartColor} strokeWidth={2} dot={false} />
                  {showSPY && <Line type="monotone" dataKey="spyPctChange" stroke={COLORS.spy} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showQQQ && <Line type="monotone" dataKey="qqqPctChange" stroke={COLORS.qqq} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showGold && <Line type="monotone" dataKey="goldPctChange" stroke={COLORS.gold} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showBTC && <Line type="monotone" dataKey="btcPctChange" stroke={COLORS.btc} strokeWidth={1.5} dot={false} connectNulls={false} />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {!loading && !error && chartData.length > 0 && chartType === 'candle' && (
        <>
          <ResponsiveContainer width="100%" height={mainChartHeight}>
            <ComposedChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`bb-gradient-candle-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.bbUpper} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={COLORS.bbLower} stopOpacity={0.1} />
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
                scale={logScale ? 'log' : 'auto'}
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
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, fontSize: 12 }}>
                      <div style={{ color: 'var(--text3)', marginBottom: 4 }}>
                        {new Date(label).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 12px' }}>
                        <span style={{ color: 'var(--text3)' }}>Open:</span>
                        <span style={{ fontFamily: 'Space Mono' }}>${d.open?.toFixed(2)}</span>
                        <span style={{ color: 'var(--text3)' }}>High:</span>
                        <span style={{ fontFamily: 'Space Mono' }}>${d.high?.toFixed(2)}</span>
                        <span style={{ color: 'var(--text3)' }}>Low:</span>
                        <span style={{ fontFamily: 'Space Mono' }}>${d.low?.toFixed(2)}</span>
                        <span style={{ color: 'var(--text3)' }}>Close:</span>
                        <span style={{ fontFamily: 'Space Mono', color: d.close >= d.open ? '#34d399' : '#f87171' }}>${d.close?.toFixed(2)}</span>
                        {showVWAP && d.vwap && (<><span style={{ color: COLORS.vwap }}>VWAP:</span><span style={{ fontFamily: 'Space Mono' }}>${d.vwap?.toFixed(2)}</span></>)}
                      </div>
                    </div>
                  );
                }}
              />
              <ReferenceLine y={firstPrice} stroke="var(--text3)" strokeDasharray="3 3" strokeOpacity={0.5} />

              {/* Bollinger Bands */}
              {showBollinger && (
                <>
                  <Area type="monotone" dataKey="bbUpper" stroke="none" fill={`url(#bb-gradient-candle-${symbol})`} connectNulls={false} />
                  <Line type="monotone" dataKey="bbUpper" stroke={COLORS.bbUpper} strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="bbMiddle" stroke={COLORS.bbMiddle} strokeWidth={1} dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="bbLower" stroke={COLORS.bbLower} strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={false} />
                </>
              )}

              {/* Candlesticks */}
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
                      <line x1={wickX} y1={y} x2={wickX} y2={y + height} stroke={color} strokeWidth={1} />
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
                {enrichedData.map((entry, index) => (<Cell key={`cell-${index}`} />))}
              </Bar>

              {/* VWAP */}
              {showVWAP && <Line type="monotone" dataKey="vwap" stroke={COLORS.vwap} strokeWidth={1.5} strokeDasharray="5 2" dot={false} connectNulls={false} />}

              {/* SMAs */}
              {showSMA20 && <Line type="monotone" dataKey="sma20" stroke={COLORS.sma20} strokeWidth={1.5} dot={false} connectNulls={false} />}
              {showSMA50 && <Line type="monotone" dataKey="sma50" stroke={COLORS.sma50} strokeWidth={1.5} dot={false} connectNulls={false} />}
              {showSMA200 && <Line type="monotone" dataKey="sma200" stroke={COLORS.sma200} strokeWidth={1.5} dot={false} connectNulls={false} />}
            </ComposedChart>
          </ResponsiveContainer>

          {/* Volume Panel */}
          {showVolume && (
            <ResponsiveContainer width="100%" height={subChartHeight}>
              <BarChart data={enrichedData} margin={{ top: 0, right: 5, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" hide />
                <YAxis tickFormatter={formatVolume} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                <Bar dataKey="volume" fill="var(--text3)" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* RSI Panel */}
          {showRSI && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>
                RSI(14): <span style={{ color: latestRSI !== null && latestRSI > 70 ? '#f87171' : latestRSI !== null && latestRSI < 30 ? '#34d399' : 'var(--text2)' }}>
                  {latestRSI?.toFixed(1)} {rsiStatus}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 100]} ticks={[30, 70]} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                  <ReferenceLine y={70} stroke="#f87171" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <ReferenceLine y={30} stroke="#34d399" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <Line type="monotone" dataKey="rsi" stroke={COLORS.rsi} strokeWidth={1.5} dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* MACD Panel */}
          {showMACD && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>MACD(12,26,9)</div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <ComposedChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <Bar dataKey="macdHistogram" fill={COLORS.macdHistogramUp}>
                    {enrichedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.macdHistogram && entry.macdHistogram >= 0 ? COLORS.macdHistogramUp : COLORS.macdHistogramDown} opacity={0.7} />
                    ))}
                  </Bar>
                  <Line type="monotone" dataKey="macdLine" stroke={COLORS.macd} strokeWidth={1.5} dot={false} connectNulls={false} />
                  <Line type="monotone" dataKey="macdSignal" stroke={COLORS.macdSignal} strokeWidth={1.5} dot={false} connectNulls={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* ATR Panel */}
          {showATR && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1 }}>
                ATR(14): <span style={{ color: COLORS.atr }}>
                  {atr[atr.length - 1]?.toFixed(2) || '-'}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => v.toFixed(1)} />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number) => [value?.toFixed(2), 'ATR']}
                  />
                  <Line type="monotone" dataKey="atr" stroke={COLORS.atr} strokeWidth={1.5} dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Comparison Panel */}
          {showAnyComparison && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: 65, fontSize: 9, color: 'var(--text3)', zIndex: 1, display: 'flex', gap: 8 }}>
                <span>Relative Performance:</span>
                <span style={{ color: chartColor }}>{symbol}</span>
                {showSPY && <span style={{ color: COLORS.spy }}>vs. SPY</span>}
                {showQQQ && <span style={{ color: COLORS.qqq }}>vs. QQQ</span>}
                {showGold && <span style={{ color: COLORS.gold }}>vs. Gold</span>}
                {showBTC && <span style={{ color: COLORS.btc }}>vs. BTC</span>}
              </div>
              <ResponsiveContainer width="100%" height={subChartHeight + 20}>
                <LineChart data={enrichedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => `${v.toFixed(0)}%`} />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    formatter={(value: number, name: string) => {
                      if (value === null || value === undefined) return ['-', name];
                      if (name === 'stockPctChange') return [`${value.toFixed(1)}%`, symbol];
                      if (name === 'spyPctChange') return [`${value.toFixed(1)}%`, 'SPY'];
                      if (name === 'qqqPctChange') return [`${value.toFixed(1)}%`, 'QQQ'];
                      if (name === 'goldPctChange') return [`${value.toFixed(1)}%`, 'Gold'];
                      if (name === 'btcPctChange') return [`${value.toFixed(1)}%`, 'BTC'];
                      return [`${value.toFixed(1)}%`, name];
                    }}
                  />
                  <Line type="monotone" dataKey="stockPctChange" stroke={chartColor} strokeWidth={2} dot={false} />
                  {showSPY && <Line type="monotone" dataKey="spyPctChange" stroke={COLORS.spy} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showQQQ && <Line type="monotone" dataKey="qqqPctChange" stroke={COLORS.qqq} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showGold && <Line type="monotone" dataKey="goldPctChange" stroke={COLORS.gold} strokeWidth={1.5} dot={false} connectNulls={false} />}
                  {showBTC && <Line type="monotone" dataKey="btcPctChange" stroke={COLORS.btc} strokeWidth={1.5} dot={false} connectNulls={false} />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {/* Range High/Low */}
      {!loading && !error && chartData.length > 0 && rangeHigh && rangeLow && (
        <div style={{
          marginTop: 12,
          padding: '10px 14px',
          background: 'var(--surface2)',
          borderRadius: 8,
          fontSize: 11,
        }}>
          <div style={{ color: 'var(--text3)', marginBottom: 6, fontWeight: 500 }}>{rangeLabel} Range</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: COLORS.rangeLow, fontWeight: 600 }}>${rangeLow.toFixed(2)}</span>
            <div style={{
              flex: 1,
              height: 4,
              background: 'var(--border)',
              borderRadius: 2,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                left: `${((lastPrice - rangeLow) / (rangeHigh - rangeLow)) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 8,
                height: 8,
                background: chartColor,
                borderRadius: '50%',
                border: '2px solid var(--surface)',
              }} />
            </div>
            <span style={{ color: COLORS.rangeHigh, fontWeight: 600 }}>${rangeHigh.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Indicator Guide */}
      {!loading && !error && chartData.length > 0 && (
        <details open style={{ marginTop: 12 }}>
          <summary style={{
            cursor: 'pointer',
            fontSize: 11,
            color: 'var(--text3)',
            userSelect: 'none',
            padding: '4px 0',
          }}>
            Indicator Guide
          </summary>
          <div style={{
            marginTop: 8,
            padding: 12,
            background: 'var(--surface2)',
            borderRadius: 8,
            fontSize: 11,
            lineHeight: 1.6,
          }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {/* Moving Averages */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.sma20, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.sma50, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.sma200, borderRadius: 1 }} />
                  Simple Moving Averages (SMA)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  <strong>SMA 20</strong> (short-term): Captures recent momentum. Price above = bullish short-term trend.
                  <strong> SMA 50</strong> (medium-term): Institutional benchmark for intermediate trend.
                  <strong> SMA 200</strong> (long-term): Defines secular bull/bear markets.
                  <em> Golden Cross</em> (50 crosses above 200) signals bullish reversal; <em>Death Cross</em> (50 below 200) signals bearish reversal.
                  Widely watched by funds for trend confirmation and mean-reversion entries.
                </div>
              </div>

              {/* Bollinger Bands */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.bbUpper, borderRadius: 1 }} />
                  Bollinger Bands (20, 2σ)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Volatility envelope: middle band = 20-day SMA, upper/lower bands = ±2 standard deviations.
                  <strong> Band squeeze</strong> (narrow bands) indicates low volatility, often preceding breakouts.
                  <strong> Band expansion</strong> signals increased volatility. Price touching upper band suggests overbought conditions (mean reversion likely);
                  lower band suggests oversold. <em>Walk the band</em>: trending markets can ride upper/lower band for extended periods.
                  Use with RSI for confirmation.
                </div>
              </div>

              {/* VWAP */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.vwap, borderRadius: 1, borderStyle: 'dashed' }} />
                  VWAP (Volume Weighted Average Price)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Institutional execution benchmark. Calculated as cumulative (price × volume) ÷ cumulative volume.
                  <strong> Price above VWAP</strong>: buyers in control, institutions likely accumulated at favorable prices.
                  <strong> Price below VWAP</strong>: sellers dominating, distribution phase.
                  Algorithms target VWAP for order execution. Intraday traders use as dynamic support/resistance.
                  Most relevant on shorter timeframes (1W, 1M); loses significance on longer periods.
                </div>
              </div>

              {/* Volume */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  Volume
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Confirms price moves. <strong>Rising price + high volume</strong> = strong conviction, sustainable trend.
                  <strong> Rising price + declining volume</strong> = weakening momentum, potential reversal.
                  <strong> Breakout on high volume</strong> validates the move; low volume breakouts often fail.
                  Volume spikes indicate institutional activity or news-driven events.
                  Compare current volume to 20-day average for relative significance.
                </div>
              </div>

              {/* RSI */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.rsi, borderRadius: 1 }} />
                  RSI (Relative Strength Index, 14-period)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Momentum oscillator (0-100). <strong>Above 70</strong>: overbought—price extended, pullback likely but not guaranteed in strong trends.
                  <strong> Below 30</strong>: oversold—potential bounce, but can stay oversold in downtrends.
                  <strong> Divergence</strong>: price makes new high but RSI doesn't = bearish divergence (momentum weakening);
                  price makes new low but RSI doesn't = bullish divergence (selling exhaustion).
                  Most effective in range-bound markets; use trend filters in trending markets.
                </div>
              </div>

              {/* MACD */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.macd, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.macdSignal, borderRadius: 1 }} />
                  MACD (12, 26, 9)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Trend-following momentum indicator. <strong>MACD line</strong> (blue) = 12-day EMA − 26-day EMA.
                  <strong> Signal line</strong> (red) = 9-day EMA of MACD. <strong>Histogram</strong> = MACD − Signal (momentum strength).
                  <em>Bullish signal</em>: MACD crosses above signal line, histogram turns positive.
                  <em>Bearish signal</em>: MACD crosses below signal, histogram turns negative.
                  <strong>Zero-line crossover</strong>: MACD above zero = bullish trend, below = bearish.
                  Divergences between MACD and price predict reversals. Lagging indicator—confirms trends rather than predicting them.
                </div>
              </div>

              {/* ATR */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.atr, borderRadius: 1 }} />
                  ATR (Average True Range, 14-period)
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Volatility indicator measuring the average range between high and low prices.
                  <strong> Higher ATR</strong> = greater volatility, wider price swings. <strong>Lower ATR</strong> = calmer market, tighter ranges.
                  <strong> Position sizing</strong>: use ATR to set stop-losses (e.g., 2× ATR below entry) and calculate position size for consistent risk.
                  <strong> Breakout confirmation</strong>: ATR expansion during breakout confirms genuine move; contraction suggests false break.
                  Not directional—shows magnitude of moves, not direction. Often used with trend indicators for complete picture.
                </div>
              </div>

              {/* Comparison */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: COLORS.spy, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.qqq, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.gold, borderRadius: 1 }} />
                  <span style={{ width: 12, height: 2, background: COLORS.btc, borderRadius: 1 }} />
                  Relative Performance Comparison
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Compare stock performance against major benchmarks. Shows percentage change from period start.
                  <strong> SPY</strong> (S&P 500): broad market benchmark — outperformance = generating alpha.
                  <strong> QQQ</strong> (NASDAQ-100): tech-heavy benchmark — useful for growth stocks comparison.
                  <strong> Gold</strong> (GLD): safe-haven asset — inverse correlation indicates risk-on behavior.
                  <strong> BTC</strong> (Bitcoin): crypto benchmark — useful for crypto-correlated equities like BMNR.
                  Overlaying multiple comparisons reveals correlation patterns and relative strength across asset classes.
                </div>
              </div>

              {/* Log Scale */}
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  Log Scale
                </div>
                <div style={{ color: 'var(--text3)' }}>
                  Logarithmic Y-axis scale. Shows percentage changes equally regardless of price level.
                  <strong> Linear scale</strong>: $10 → $20 move looks same as $100 → $110 (same dollar amount).
                  <strong> Log scale</strong>: $10 → $20 (100% gain) looks same as $100 → $200 (100% gain).
                  Essential for long-term charts or comparing stocks at different price levels.
                  Reveals true return patterns and makes trend channels more consistent over time.
                </div>
              </div>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
