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

// ============================================
// RISK & PERFORMANCE METRICS
// ============================================

// Calculate daily returns
const calculateReturns = (data: ChartDataPoint[]): number[] => {
  const returns: number[] = [];
  for (let i = 1; i < data.length; i++) {
    returns.push((data[i].close - data[i - 1].close) / data[i - 1].close);
  }
  return returns;
};

// Calculate annualized Sharpe Ratio (assuming risk-free rate of 4%)
const calculateSharpeRatio = (data: ChartDataPoint[], riskFreeRate: number = 0.04): number | null => {
  if (data.length < 2) return null;
  const returns = calculateReturns(data);
  if (returns.length === 0) return null;

  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return null;

  // Annualize (assuming 252 trading days)
  const annualizedReturn = avgReturn * 252;
  const annualizedStdDev = stdDev * Math.sqrt(252);

  return (annualizedReturn - riskFreeRate) / annualizedStdDev;
};

// Calculate Sortino Ratio (only considers downside deviation)
const calculateSortinoRatio = (data: ChartDataPoint[], riskFreeRate: number = 0.04): number | null => {
  if (data.length < 2) return null;
  const returns = calculateReturns(data);
  if (returns.length === 0) return null;

  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const negativeReturns = returns.filter(r => r < 0);

  if (negativeReturns.length === 0) return null; // No downside

  const downsideVariance = negativeReturns.reduce((sum, r) => sum + r * r, 0) / negativeReturns.length;
  const downsideStdDev = Math.sqrt(downsideVariance);

  if (downsideStdDev === 0) return null;

  // Annualize
  const annualizedReturn = avgReturn * 252;
  const annualizedDownsideStdDev = downsideStdDev * Math.sqrt(252);

  return (annualizedReturn - riskFreeRate) / annualizedDownsideStdDev;
};

// Calculate Maximum Drawdown with recovery info
const calculateMaxDrawdown = (data: ChartDataPoint[]): {
  maxDrawdown: number;
  peakDate: number;
  troughDate: number;
  recoveryDate: number | null;
  recoveryDays: number | null;
} | null => {
  if (data.length < 2) return null;

  let peak = data[0].close;
  let peakDate = data[0].date;
  let maxDrawdown = 0;
  let maxDrawdownPeakDate = data[0].date;
  let maxDrawdownTroughDate = data[0].date;
  let troughValue = data[0].close;

  for (const point of data) {
    if (point.close > peak) {
      peak = point.close;
      peakDate = point.date;
    }

    const drawdown = (peak - point.close) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownPeakDate = peakDate;
      maxDrawdownTroughDate = point.date;
      troughValue = point.close;
    }
  }

  // Find recovery date
  let recoveryDate: number | null = null;
  let recoveryDays: number | null = null;
  const troughIndex = data.findIndex(d => d.date === maxDrawdownTroughDate);

  for (let i = troughIndex + 1; i < data.length; i++) {
    if (data[i].close >= data.find(d => d.date === maxDrawdownPeakDate)!.close) {
      recoveryDate = data[i].date;
      recoveryDays = i - troughIndex;
      break;
    }
  }

  return {
    maxDrawdown,
    peakDate: maxDrawdownPeakDate,
    troughDate: maxDrawdownTroughDate,
    recoveryDate,
    recoveryDays
  };
};

// Calculate Rolling Volatility
const calculateRollingVolatility = (data: ChartDataPoint[], period: number): (number | null)[] => {
  const result: (number | null)[] = [];
  const returns = calculateReturns(data);

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      result.push(null);
      continue;
    }

    const periodReturns = returns.slice(i - period, i);
    const avgReturn = periodReturns.reduce((a, b) => a + b, 0) / period;
    const variance = periodReturns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / period;
    const annualizedVol = Math.sqrt(variance) * Math.sqrt(252) * 100; // As percentage
    result.push(annualizedVol);
  }

  return result;
};

// Calculate Value at Risk (Historical VaR at 95% confidence)
const calculateVaR = (data: ChartDataPoint[], confidence: number = 0.95): number | null => {
  if (data.length < 20) return null;
  const returns = calculateReturns(data);
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidence) * sortedReturns.length);
  return sortedReturns[index] * 100; // As percentage
};

// Calculate Beta vs benchmark
const calculateBeta = (stockData: ChartDataPoint[], benchmarkData: ChartDataPoint[]): number | null => {
  if (stockData.length < 20 || benchmarkData.length < 20) return null;

  // Align data by date
  const stockMap = new Map(stockData.map(d => [d.date, d]));
  const alignedStock: number[] = [];
  const alignedBench: number[] = [];

  let prevStock: number | null = null;
  let prevBench: number | null = null;

  for (const bench of benchmarkData) {
    const stock = stockMap.get(bench.date);
    if (stock && prevStock !== null && prevBench !== null) {
      alignedStock.push((stock.close - prevStock) / prevStock);
      alignedBench.push((bench.close - prevBench) / prevBench);
    }
    if (stock) prevStock = stock.close;
    prevBench = bench.close;
  }

  if (alignedStock.length < 10) return null;

  // Calculate covariance and variance
  const avgStock = alignedStock.reduce((a, b) => a + b, 0) / alignedStock.length;
  const avgBench = alignedBench.reduce((a, b) => a + b, 0) / alignedBench.length;

  let covariance = 0;
  let benchVariance = 0;

  for (let i = 0; i < alignedStock.length; i++) {
    covariance += (alignedStock[i] - avgStock) * (alignedBench[i] - avgBench);
    benchVariance += Math.pow(alignedBench[i] - avgBench, 2);
  }

  if (benchVariance === 0) return null;

  return covariance / benchVariance;
};

// ============================================
// ADVANCED TECHNICAL INDICATORS
// ============================================

// Calculate Fibonacci Retracement Levels
const calculateFibonacciLevels = (data: ChartDataPoint[]): {
  high: number;
  low: number;
  levels: { level: number; price: number; label: string }[];
} | null => {
  if (data.length < 2) return null;

  const high = Math.max(...data.map(d => d.high));
  const low = Math.min(...data.map(d => d.low));
  const diff = high - low;

  const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  const levels = fibLevels.map(level => ({
    level,
    price: high - diff * level,
    label: `${(level * 100).toFixed(1)}%`
  }));

  return { high, low, levels };
};

// Calculate Volume Profile (price levels with most volume)
const calculateVolumeProfile = (data: ChartDataPoint[], bins: number = 20): {
  priceLevel: number;
  volume: number;
  percentage: number;
}[] => {
  if (data.length === 0) return [];

  const high = Math.max(...data.map(d => d.high));
  const low = Math.min(...data.map(d => d.low));
  const binSize = (high - low) / bins;

  const profile: Map<number, number> = new Map();

  for (let i = 0; i < bins; i++) {
    profile.set(i, 0);
  }

  let totalVolume = 0;
  for (const point of data) {
    const avgPrice = (point.high + point.low) / 2;
    const binIndex = Math.min(Math.floor((avgPrice - low) / binSize), bins - 1);
    profile.set(binIndex, (profile.get(binIndex) || 0) + point.volume);
    totalVolume += point.volume;
  }

  return Array.from(profile.entries()).map(([binIndex, volume]) => ({
    priceLevel: low + binSize * (binIndex + 0.5),
    volume,
    percentage: totalVolume > 0 ? (volume / totalVolume) * 100 : 0
  })).sort((a, b) => b.volume - a.volume);
};

// Calculate VWAP Bands (standard deviations)
const calculateVWAPBands = (data: ChartDataPoint[]): {
  vwap: (number | null)[];
  upper1: (number | null)[];
  lower1: (number | null)[];
  upper2: (number | null)[];
  lower2: (number | null)[];
  upper3: (number | null)[];
  lower3: (number | null)[];
} => {
  const vwap = calculateVWAP(data);
  const upper1: (number | null)[] = [];
  const lower1: (number | null)[] = [];
  const upper2: (number | null)[] = [];
  const lower2: (number | null)[] = [];
  const upper3: (number | null)[] = [];
  const lower3: (number | null)[] = [];

  let cumulativeSquaredDev = 0;
  let cumulativeVolume = 0;

  for (let i = 0; i < data.length; i++) {
    const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
    cumulativeVolume += data[i].volume;

    if (vwap[i] === null || cumulativeVolume === 0) {
      upper1.push(null);
      lower1.push(null);
      upper2.push(null);
      lower2.push(null);
      upper3.push(null);
      lower3.push(null);
      continue;
    }

    cumulativeSquaredDev += data[i].volume * Math.pow(typicalPrice - vwap[i]!, 2);
    const stdDev = Math.sqrt(cumulativeSquaredDev / cumulativeVolume);

    upper1.push(vwap[i]! + stdDev);
    lower1.push(vwap[i]! - stdDev);
    upper2.push(vwap[i]! + 2 * stdDev);
    lower2.push(vwap[i]! - 2 * stdDev);
    upper3.push(vwap[i]! + 3 * stdDev);
    lower3.push(vwap[i]! - 3 * stdDev);
  }

  return { vwap, upper1, lower1, upper2, lower2, upper3, lower3 };
};

// Detect Support and Resistance Levels
const detectSupportResistance = (data: ChartDataPoint[], sensitivity: number = 3): {
  supports: number[];
  resistances: number[];
} => {
  if (data.length < sensitivity * 2 + 1) return { supports: [], resistances: [] };

  const supports: number[] = [];
  const resistances: number[] = [];

  for (let i = sensitivity; i < data.length - sensitivity; i++) {
    let isSupport = true;
    let isResistance = true;

    for (let j = 1; j <= sensitivity; j++) {
      if (data[i].low >= data[i - j].low || data[i].low >= data[i + j].low) {
        isSupport = false;
      }
      if (data[i].high <= data[i - j].high || data[i].high <= data[i + j].high) {
        isResistance = false;
      }
    }

    if (isSupport) supports.push(data[i].low);
    if (isResistance) resistances.push(data[i].high);
  }

  // Cluster nearby levels (within 1% of each other)
  const clusterLevels = (levels: number[]): number[] => {
    if (levels.length === 0) return [];
    const sorted = [...levels].sort((a, b) => a - b);
    const clustered: number[] = [];
    let cluster: number[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      if ((sorted[i] - sorted[i - 1]) / sorted[i - 1] < 0.01) {
        cluster.push(sorted[i]);
      } else {
        clustered.push(cluster.reduce((a, b) => a + b, 0) / cluster.length);
        cluster = [sorted[i]];
      }
    }
    clustered.push(cluster.reduce((a, b) => a + b, 0) / cluster.length);
    return clustered;
  };

  return {
    supports: clusterLevels(supports).slice(-3), // Top 3 strongest
    resistances: clusterLevels(resistances).slice(-3)
  };
};

// Calculate Correlation between two assets
const calculateCorrelation = (data1: ChartDataPoint[], data2: ChartDataPoint[]): number | null => {
  // Align by date
  const map1 = new Map(data1.map(d => [d.date, d.close]));
  const aligned1: number[] = [];
  const aligned2: number[] = [];

  for (const d of data2) {
    const val1 = map1.get(d.date);
    if (val1 !== undefined) {
      aligned1.push(val1);
      aligned2.push(d.close);
    }
  }

  if (aligned1.length < 10) return null;

  // Calculate returns
  const returns1: number[] = [];
  const returns2: number[] = [];
  for (let i = 1; i < aligned1.length; i++) {
    returns1.push((aligned1[i] - aligned1[i - 1]) / aligned1[i - 1]);
    returns2.push((aligned2[i] - aligned2[i - 1]) / aligned2[i - 1]);
  }

  const avg1 = returns1.reduce((a, b) => a + b, 0) / returns1.length;
  const avg2 = returns2.reduce((a, b) => a + b, 0) / returns2.length;

  let covariance = 0;
  let var1 = 0;
  let var2 = 0;

  for (let i = 0; i < returns1.length; i++) {
    covariance += (returns1[i] - avg1) * (returns2[i] - avg2);
    var1 += Math.pow(returns1[i] - avg1, 2);
    var2 += Math.pow(returns2[i] - avg2, 2);
  }

  if (var1 === 0 || var2 === 0) return null;

  return covariance / Math.sqrt(var1 * var2);
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

  // Professional features toggles
  const [showFibonacci, setShowFibonacci] = useState(false);
  const [showVWAPBands, setShowVWAPBands] = useState(false);
  const [showSupportResistance, setShowSupportResistance] = useState(false);
  const [showVolumeProfile, setShowVolumeProfile] = useState(false);
  const [showRiskMetrics, setShowRiskMetrics] = useState(false);
  const [showCorrelation, setShowCorrelation] = useState(false);

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

  // Professional metrics calculations
  const sharpeRatio = useMemo(() => calculateSharpeRatio(chartData), [chartData]);
  const sortinoRatio = useMemo(() => calculateSortinoRatio(chartData), [chartData]);
  const maxDrawdown = useMemo(() => calculateMaxDrawdown(chartData), [chartData]);
  const volatility30d = useMemo(() => calculateRollingVolatility(chartData, 30), [chartData]);
  const volatility90d = useMemo(() => calculateRollingVolatility(chartData, 90), [chartData]);
  const valueAtRisk = useMemo(() => calculateVaR(chartData), [chartData]);
  const fibonacciLevels = useMemo(() => calculateFibonacciLevels(chartData), [chartData]);
  const volumeProfile = useMemo(() => calculateVolumeProfile(chartData, 15), [chartData]);
  const vwapBands = useMemo(() => calculateVWAPBands(chartData), [chartData]);
  const supportResistance = useMemo(() => detectSupportResistance(chartData, 3), [chartData]);

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

  // Beta and correlations
  const betaVsSPY = useMemo(() => spyData ? calculateBeta(chartData, spyData) : null, [chartData, spyData]);
  const correlations = useMemo(() => ({
    spy: spyData ? calculateCorrelation(chartData, spyData) : null,
    qqq: qqqData ? calculateCorrelation(chartData, qqqData) : null,
    gold: goldData ? calculateCorrelation(chartData, goldData) : null,
    btc: btcData ? calculateCorrelation(chartData, btcData) : null,
  }), [chartData, spyData, qqqData, goldData, btcData]);

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
        // VWAP Bands
        vwapUpper1: vwapBands.upper1[i],
        vwapLower1: vwapBands.lower1[i],
        vwapUpper2: vwapBands.upper2[i],
        vwapLower2: vwapBands.lower2[i],
        vwapUpper3: vwapBands.upper3[i],
        vwapLower3: vwapBands.lower3[i],
        // Volatility
        vol30d: volatility30d[i],
        vol90d: volatility90d[i],
        // For comparison chart: stock's percentage change
        stockPctChange: ((d.close - stockBasePrice) / stockBasePrice) * 100,
        // Comparison percentage changes
        spyPctChange: spyNormalized?.get(d.date) ?? null,
        qqqPctChange: qqqNormalized?.get(d.date) ?? null,
        goldPctChange: goldNormalized?.get(d.date) ?? null,
        btcPctChange: btcPct,
      };
    });
  }, [chartData, sma20, sma50, sma200, rsi, bollinger, vwap, macd, atr, vwapBands, volatility30d, volatility90d, spyNormalized, qqqNormalized, goldNormalized, btcNormalized]);

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
    // Professional features
    fibonacci: '#a78bfa',  // Violet
    vwapBand1: '#f97316',  // Orange (lighter)
    vwapBand2: '#fb923c',  // Orange
    vwapBand3: '#fdba74',  // Orange (lightest)
    support: '#22c55e',    // Green
    resistance: '#ef4444', // Red
    volumeProfile: '#6366f1', // Indigo
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

      {/* Scale toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Scale:</span>
        <IndicatorToggle label="Log" active={logScale} onClick={() => setLogScale(!logScale)} />
      </div>

      {/* Comparison toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Compare:</span>
        <IndicatorToggle label="vs. SPY" active={showSPY} onClick={() => setShowSPY(!showSPY)} color={COLORS.spy} />
        <IndicatorToggle label="vs. QQQ" active={showQQQ} onClick={() => setShowQQQ(!showQQQ)} color={COLORS.qqq} />
        <IndicatorToggle label="vs. Gold" active={showGold} onClick={() => setShowGold(!showGold)} color={COLORS.gold} />
        <IndicatorToggle label="vs. BTC" active={showBTC} onClick={() => setShowBTC(!showBTC)} color={COLORS.btc} />
      </div>

      {/* Professional Analysis toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: 'var(--text3)', marginRight: 2 }}>Pro:</span>
        <IndicatorToggle label="Fib" active={showFibonacci} onClick={() => setShowFibonacci(!showFibonacci)} color={COLORS.fibonacci} />
        <IndicatorToggle label="VWAP±σ" active={showVWAPBands} onClick={() => setShowVWAPBands(!showVWAPBands)} color={COLORS.vwapBand1} />
        <IndicatorToggle label="S/R" active={showSupportResistance} onClick={() => setShowSupportResistance(!showSupportResistance)} color={COLORS.support} />
        <IndicatorToggle label="Vol Profile" active={showVolumeProfile} onClick={() => setShowVolumeProfile(!showVolumeProfile)} color={COLORS.volumeProfile} />
        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 2px' }} />
        <IndicatorToggle label="Risk Metrics" active={showRiskMetrics} onClick={() => setShowRiskMetrics(!showRiskMetrics)} />
        <IndicatorToggle label="Correlation" active={showCorrelation} onClick={() => setShowCorrelation(!showCorrelation)} />
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

              {/* VWAP Bands */}
              {showVWAPBands && (
                <>
                  <Line type="monotone" dataKey="vwapUpper1" stroke={COLORS.vwapBand1} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.8} />
                  <Line type="monotone" dataKey="vwapLower1" stroke={COLORS.vwapBand1} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.8} />
                  <Line type="monotone" dataKey="vwapUpper2" stroke={COLORS.vwapBand2} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.6} />
                  <Line type="monotone" dataKey="vwapLower2" stroke={COLORS.vwapBand2} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.6} />
                  <Line type="monotone" dataKey="vwapUpper3" stroke={COLORS.vwapBand3} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.4} />
                  <Line type="monotone" dataKey="vwapLower3" stroke={COLORS.vwapBand3} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.4} />
                </>
              )}

              {/* Fibonacci Retracement Levels */}
              {showFibonacci && fibonacciLevels && fibonacciLevels.levels.map((fib, i) => (
                <ReferenceLine
                  key={`fib-${i}`}
                  y={fib.price}
                  stroke={COLORS.fibonacci}
                  strokeDasharray="6 4"
                  strokeWidth={1}
                  strokeOpacity={fib.level === 0.5 || fib.level === 0.618 ? 1 : 0.5}
                  label={{ value: fib.label, fill: COLORS.fibonacci, fontSize: 8, position: 'right' }}
                />
              ))}

              {/* Support Levels */}
              {showSupportResistance && supportResistance.supports.map((level, i) => (
                <ReferenceLine
                  key={`support-${i}`}
                  y={level}
                  stroke={COLORS.support}
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  label={{ value: `S${i + 1}`, fill: COLORS.support, fontSize: 8, position: 'left' }}
                />
              ))}

              {/* Resistance Levels */}
              {showSupportResistance && supportResistance.resistances.map((level, i) => (
                <ReferenceLine
                  key={`resistance-${i}`}
                  y={level}
                  stroke={COLORS.resistance}
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  label={{ value: `R${i + 1}`, fill: COLORS.resistance, fontSize: 8, position: 'left' }}
                />
              ))}

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

              {/* VWAP Bands */}
              {showVWAPBands && (
                <>
                  <Line type="monotone" dataKey="vwapUpper1" stroke={COLORS.vwapBand1} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.8} />
                  <Line type="monotone" dataKey="vwapLower1" stroke={COLORS.vwapBand1} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.8} />
                  <Line type="monotone" dataKey="vwapUpper2" stroke={COLORS.vwapBand2} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.6} />
                  <Line type="monotone" dataKey="vwapLower2" stroke={COLORS.vwapBand2} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.6} />
                  <Line type="monotone" dataKey="vwapUpper3" stroke={COLORS.vwapBand3} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.4} />
                  <Line type="monotone" dataKey="vwapLower3" stroke={COLORS.vwapBand3} strokeWidth={1} strokeDasharray="4 2" dot={false} connectNulls={false} strokeOpacity={0.4} />
                </>
              )}

              {/* Fibonacci Retracement Levels */}
              {showFibonacci && fibonacciLevels && fibonacciLevels.levels.map((fib, i) => (
                <ReferenceLine
                  key={`fib-candle-${i}`}
                  y={fib.price}
                  stroke={COLORS.fibonacci}
                  strokeDasharray="6 4"
                  strokeWidth={1}
                  strokeOpacity={fib.level === 0.5 || fib.level === 0.618 ? 1 : 0.5}
                  label={{ value: fib.label, fill: COLORS.fibonacci, fontSize: 8, position: 'right' }}
                />
              ))}

              {/* Support Levels */}
              {showSupportResistance && supportResistance.supports.map((level, i) => (
                <ReferenceLine
                  key={`support-candle-${i}`}
                  y={level}
                  stroke={COLORS.support}
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  label={{ value: `S${i + 1}`, fill: COLORS.support, fontSize: 8, position: 'left' }}
                />
              ))}

              {/* Resistance Levels */}
              {showSupportResistance && supportResistance.resistances.map((level, i) => (
                <ReferenceLine
                  key={`resistance-candle-${i}`}
                  y={level}
                  stroke={COLORS.resistance}
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  label={{ value: `R${i + 1}`, fill: COLORS.resistance, fontSize: 8, position: 'left' }}
                />
              ))}

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

      {/* Risk Metrics Panel */}
      {!loading && !error && chartData.length > 0 && showRiskMetrics && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'var(--surface2)',
          borderRadius: 8,
          fontSize: 11,
        }}>
          <div style={{ color: 'var(--text)', marginBottom: 10, fontWeight: 600 }}>Risk & Performance Metrics</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {/* Sharpe Ratio */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Sharpe Ratio (Ann.)</div>
              <div style={{ color: sharpeRatio !== null && sharpeRatio > 1 ? '#22c55e' : sharpeRatio !== null && sharpeRatio < 0 ? '#ef4444' : 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                {sharpeRatio !== null ? sharpeRatio.toFixed(2) : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>{sharpeRatio !== null && sharpeRatio > 1 ? 'Good' : sharpeRatio !== null && sharpeRatio > 0 ? 'Moderate' : sharpeRatio !== null ? 'Negative' : ''}</div>
            </div>
            {/* Sortino Ratio */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Sortino Ratio (Ann.)</div>
              <div style={{ color: sortinoRatio !== null && sortinoRatio > 1.5 ? '#22c55e' : sortinoRatio !== null && sortinoRatio < 0 ? '#ef4444' : 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                {sortinoRatio !== null ? sortinoRatio.toFixed(2) : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>Downside risk-adjusted</div>
            </div>
            {/* Max Drawdown */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Max Drawdown</div>
              <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 14 }}>
                {maxDrawdown ? `-${(maxDrawdown.maxDrawdown * 100).toFixed(1)}%` : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>
                {maxDrawdown?.recoveryDays ? `Recovered in ${maxDrawdown.recoveryDays}d` : maxDrawdown ? 'Not recovered' : ''}
              </div>
            </div>
            {/* VaR */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Value at Risk (95%)</div>
              <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 14 }}>
                {valueAtRisk !== null ? `${valueAtRisk.toFixed(2)}%` : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>Daily worst case</div>
            </div>
            {/* Beta */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Beta vs SPY</div>
              <div style={{ color: betaVsSPY !== null && Math.abs(betaVsSPY) > 1.5 ? '#f59e0b' : 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                {betaVsSPY !== null ? betaVsSPY.toFixed(2) : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>
                {betaVsSPY !== null ? (betaVsSPY > 1 ? 'More volatile than market' : betaVsSPY < 1 ? 'Less volatile' : 'Market-like') : ''}
              </div>
            </div>
            {/* Rolling Volatility */}
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 6 }}>
              <div style={{ color: 'var(--text3)', fontSize: 9, marginBottom: 2 }}>Volatility (Ann.)</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
                {volatility30d[volatility30d.length - 1] !== null ? `${volatility30d[volatility30d.length - 1]!.toFixed(1)}%` : '—'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 9 }}>30-day rolling</div>
            </div>
          </div>
        </div>
      )}

      {/* Correlation Matrix */}
      {!loading && !error && chartData.length > 0 && showCorrelation && (showSPY || showQQQ || showGold || showBTC) && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'var(--surface2)',
          borderRadius: 8,
          fontSize: 11,
        }}>
          <div style={{ color: 'var(--text)', marginBottom: 10, fontWeight: 600 }}>Correlation Matrix</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {showSPY && correlations.spy !== null && (
              <div style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 6, minWidth: 80 }}>
                <div style={{ color: COLORS.spy, fontSize: 10, marginBottom: 2 }}>vs SPY</div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: Math.abs(correlations.spy) > 0.7 ? '#22c55e' : Math.abs(correlations.spy) < 0.3 ? '#ef4444' : 'var(--text)'
                }}>
                  {correlations.spy.toFixed(2)}
                </div>
              </div>
            )}
            {showQQQ && correlations.qqq !== null && (
              <div style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 6, minWidth: 80 }}>
                <div style={{ color: COLORS.qqq, fontSize: 10, marginBottom: 2 }}>vs QQQ</div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: Math.abs(correlations.qqq) > 0.7 ? '#22c55e' : Math.abs(correlations.qqq) < 0.3 ? '#ef4444' : 'var(--text)'
                }}>
                  {correlations.qqq.toFixed(2)}
                </div>
              </div>
            )}
            {showGold && correlations.gold !== null && (
              <div style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 6, minWidth: 80 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, marginBottom: 2 }}>vs Gold</div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: Math.abs(correlations.gold) > 0.7 ? '#22c55e' : Math.abs(correlations.gold) < 0.3 ? '#ef4444' : 'var(--text)'
                }}>
                  {correlations.gold.toFixed(2)}
                </div>
              </div>
            )}
            {showBTC && correlations.btc !== null && (
              <div style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 6, minWidth: 80 }}>
                <div style={{ color: COLORS.btc, fontSize: 10, marginBottom: 2 }}>vs BTC</div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: Math.abs(correlations.btc) > 0.7 ? '#22c55e' : Math.abs(correlations.btc) < 0.3 ? '#ef4444' : 'var(--text)'
                }}>
                  {correlations.btc.toFixed(2)}
                </div>
              </div>
            )}
          </div>
          <div style={{ color: 'var(--text3)', fontSize: 9, marginTop: 8 }}>
            Green = highly correlated (&gt;0.7), Red = low correlation (&lt;0.3)
          </div>
        </div>
      )}

      {/* Volume Profile */}
      {!loading && !error && chartData.length > 0 && showVolumeProfile && volumeProfile.length > 0 && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'var(--surface2)',
          borderRadius: 8,
          fontSize: 11,
        }}>
          <div style={{ color: 'var(--text)', marginBottom: 10, fontWeight: 600 }}>Volume Profile (Top Price Levels)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {volumeProfile.slice(0, 5).map((level, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 60, color: 'var(--text)', fontWeight: 500 }}>${level.priceLevel.toFixed(2)}</span>
                <div style={{ flex: 1, height: 12, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${level.percentage}%`,
                    height: '100%',
                    background: level.priceLevel <= lastPrice ? COLORS.support : COLORS.resistance,
                    opacity: 0.7,
                  }} />
                </div>
                <span style={{ width: 40, color: 'var(--text3)', textAlign: 'right' }}>{level.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
          <div style={{ color: 'var(--text3)', fontSize: 9, marginTop: 8 }}>
            High volume price levels often act as support/resistance
          </div>
        </div>
      )}

      {/* Chart Guide */}
      {!loading && !error && chartData.length > 0 && (
        <details style={{ marginTop: 12 }}>
          <summary style={{
            cursor: 'pointer',
            fontSize: 11,
            color: 'var(--text3)',
            userSelect: 'none',
            padding: '4px 0',
          }}>
            Chart Guide
          </summary>
          <div style={{
            marginTop: 8,
            padding: 12,
            background: 'var(--surface2)',
            borderRadius: 8,
            fontSize: 11,
            lineHeight: 1.6,
          }}>
            <div style={{ display: 'grid', gap: 16 }}>

              {/* INDICATORS SECTION */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: 12, borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  Indicators
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {/* SMA 20/50/200 */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.sma20, borderRadius: 1 }} />
                      <span style={{ width: 10, height: 2, background: COLORS.sma50, borderRadius: 1 }} />
                      <span style={{ width: 10, height: 2, background: COLORS.sma200, borderRadius: 1 }} />
                      SMA 20 / SMA 50 / SMA 200
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Simple Moving Averages for short, medium, and long-term trends. <em>Golden Cross</em> (50 above 200) = bullish; <em>Death Cross</em> = bearish.
                    </div>
                  </div>
                  {/* Bollinger */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.bbUpper, borderRadius: 1 }} />
                      Bollinger
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Bollinger Bands (20-period, 2σ). Band squeeze = low volatility, breakout imminent. Price at upper band = overbought; lower = oversold.
                    </div>
                  </div>
                  {/* VWAP */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.vwap, borderRadius: 1 }} />
                      VWAP
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Volume Weighted Average Price. Institutional benchmark. Above VWAP = bullish, below = bearish. Key for intraday trading.
                    </div>
                  </div>
                  {/* Volume */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Volume</div>
                    <div style={{ color: 'var(--text3)' }}>
                      Shows trading activity. High volume confirms moves; low volume breakouts often fail. Spikes indicate institutional activity.
                    </div>
                  </div>
                  {/* RSI */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.rsi, borderRadius: 1 }} />
                      RSI
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Relative Strength Index (14-period). Above 70 = overbought, below 30 = oversold. Divergences predict reversals.
                    </div>
                  </div>
                  {/* MACD */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.macd, borderRadius: 1 }} />
                      <span style={{ width: 10, height: 2, background: COLORS.macdSignal, borderRadius: 1 }} />
                      MACD
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Moving Average Convergence Divergence. MACD crossing above signal = bullish, below = bearish. Histogram shows momentum strength.
                    </div>
                  </div>
                  {/* ATR */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.atr, borderRadius: 1 }} />
                      ATR
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Average True Range (14-period). Measures volatility. Use for stop-loss placement (2× ATR) and position sizing.
                    </div>
                  </div>
                </div>
              </div>

              {/* SCALE SECTION */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: 12, borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  Scale
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Log</div>
                  <div style={{ color: 'var(--text3)' }}>
                    Logarithmic Y-axis. Shows percentage changes equally (100% gain looks same at any price level). Essential for long-term charts.
                  </div>
                </div>
              </div>

              {/* COMPARE SECTION */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: 12, borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  Compare
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.spy, borderRadius: 1 }} />
                      vs. SPY
                    </div>
                    <div style={{ color: 'var(--text3)' }}>S&P 500 ETF. Broad market benchmark — outperformance = generating alpha.</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.qqq, borderRadius: 1 }} />
                      vs. QQQ
                    </div>
                    <div style={{ color: 'var(--text3)' }}>NASDAQ-100 ETF. Tech-heavy benchmark for growth stock comparison.</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.gold, borderRadius: 1 }} />
                      vs. Gold
                    </div>
                    <div style={{ color: 'var(--text3)' }}>Gold ETF (GLD). Safe-haven asset — inverse correlation indicates risk-on behavior.</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.btc, borderRadius: 1 }} />
                      vs. BTC
                    </div>
                    <div style={{ color: 'var(--text3)' }}>Bitcoin. Crypto benchmark — useful for crypto-correlated equities.</div>
                  </div>
                </div>
              </div>

              {/* PRO SECTION */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: 12, borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  Pro (Professional Analysis)
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.fibonacci, borderRadius: 1 }} />
                      Fib
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Fibonacci retracement levels (23.6%, 38.2%, 50%, 61.8%, 78.6%). Key psychological levels where price often reverses. The 61.8% (golden ratio) is most significant.
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.vwapBand1, borderRadius: 1 }} />
                      VWAP±σ
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      VWAP with standard deviation bands (1σ, 2σ, 3σ). Statistical price zones. 68% of price action within 1σ, 95% within 2σ, 99% within 3σ.
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.support, borderRadius: 1 }} />
                      <span style={{ width: 10, height: 2, background: COLORS.resistance, borderRadius: 1 }} />
                      S/R
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Auto-detected support (green) and resistance (red) levels. Key price zones where buying/selling pressure historically emerged. S1/S2/S3 and R1/R2/R3.
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 2, background: COLORS.volumeProfile, borderRadius: 1 }} />
                      Vol Profile
                    </div>
                    <div style={{ color: 'var(--text3)' }}>
                      Volume Profile showing price levels with highest trading activity. High-volume nodes act as magnets; low-volume areas get passed quickly.
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Risk Metrics</div>
                    <div style={{ color: 'var(--text3)' }}>
                      Professional risk analytics: <strong>Sharpe Ratio</strong> (risk-adjusted return), <strong>Sortino</strong> (downside-only), <strong>Max Drawdown</strong> (largest peak-to-trough), <strong>VaR</strong> (worst daily loss at 95% confidence), <strong>Beta</strong> (market correlation), <strong>Volatility</strong> (annualized).
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Correlation</div>
                    <div style={{ color: 'var(--text3)' }}>
                      Shows correlation coefficient (-1 to +1) with enabled comparisons. High correlation (&gt;0.7) = moves together; low (&lt;0.3) = diversification benefit; negative = inverse relationship.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </details>
      )}
    </div>
  );
}
