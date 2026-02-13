/**
 * Financial calculation constants
 * Centralized magic numbers for maintainability and clarity
 */

// Unit conversion constants
export const MILLION = 1_000_000;
export const BILLION = 1_000_000_000;
export const THOUSAND = 1_000;

// Financial calculation thresholds
export const MIN_SPREAD_FOR_GORDON_GROWTH = 0.01; // Minimum spread (r - g) for Gordon Growth Model to avoid division by zero
export const LOG_NORMAL_ADJUSTMENT = -0.5; // Adjustment factor for log-normal distribution: μ = -σ²/2 ensures E[exp(μ + σZ)] = 1

// Percentage conversion
export const PERCENT_TO_DECIMAL = 100; // Divide by 100 to convert percentage to decimal

// Standard periods
export const RSI_DEFAULT_PERIOD = 14;
export const BOLLINGER_DEFAULT_PERIOD = 20;
export const BOLLINGER_DEFAULT_STD_DEV = 2;

// Monte Carlo simulation limits
export const MAX_MONTE_CARLO_SIMULATIONS = 10000;

// Risk-free rate (annual)
export const RISK_FREE_RATE = 0.04; // 4% annual risk-free rate
