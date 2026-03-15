"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import "./stock-model-styles.css";
import {
  DEFAULTS,
  COMPANY_INFO,
  ETH_HOLDINGS,
  STAKING_PARAMS,
  DATA_FRESHNESS,
  SHARE_CLASSES,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  BMNR_PURCHASE_HISTORY,
  BMNR_QUARTERLY_DATA,
  BMNR_INVESTMENT_CURRENT,
  BMNR_TIMELINE_EVENTS,
  LIQUIDITY_POSITION,
  getTotalFD,
  getDilutionPercent,
} from "@/data/bmnr";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StockQuote {
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
}

// ---------------------------------------------------------------------------
// Helpers — all derived from existing data, no duplication
// ---------------------------------------------------------------------------

function fmt(n: number, decimals = 2): string {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(decimals)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(decimals)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(decimals)}K`;
  return `$${n.toFixed(decimals)}`;
}

function pct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

function fmtETH(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(3)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}

function mnavColor(mnav: number | null): string {
  if (mnav === null) return "var(--text3)";
  if (mnav < 1) return "var(--mint)";
  if (mnav > 1.5) return "var(--coral)";
  return "var(--sky)";
}

function computeMetrics(livePrice?: number) {
  const price = livePrice ?? DEFAULTS.currentStockPrice;
  const sharesM = DEFAULTS.currentShares;
  const mcap = price * sharesM * 1e6;
  const ethValue = ETH_HOLDINGS.totalETH * DEFAULTS.ethPrice;
  const navPerShare = ethValue / (sharesM * 1e6);
  const mNAV = price / navPerShare;
  const totalFD = getTotalFD(sharesM);
  const dilutionPct = getDilutionPercent(sharesM);
  const annualStakingRev =
    ETH_HOLDINGS.stakedETH * DEFAULTS.ethPrice * (STAKING_PARAMS.baseStakingAPY / 100);
  const ethToTarget =
    (ETH_HOLDINGS.targetSupplyPercent / 100) * 120_700_000 - ETH_HOLDINGS.totalETH;

  return {
    price,
    sharesM,
    mcap,
    ethValue,
    navPerShare,
    mNAV,
    totalFD,
    dilutionPct,
    annualStakingRev,
    ethToTarget,
  };
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

export default function BMNRDashboard() {
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/stock/BMNR?range=1d&interval=1d`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.chart?.result?.[0]?.meta) {
          const meta = data.chart.result[0].meta;
          setQuote({
            price: meta.regularMarketPrice,
            change: meta.regularMarketPrice - meta.chartPreviousClose,
            changePercent:
              ((meta.regularMarketPrice - meta.chartPreviousClose) /
                meta.chartPreviousClose) *
              100,
            previousClose: meta.chartPreviousClose,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const m = computeMetrics(quote?.price);
  const latestPurchase = BMNR_PURCHASE_HISTORY[0];
  const latestEvent = BMNR_TIMELINE_EVENTS[0];
  const commonShares = SHARE_CLASSES.find((s) => s.status === "active");
  const criticalCatalysts = UPCOMING_CATALYSTS.filter(
    (c) => c.impact === "Critical" || c.impact === "High"
  );
  const recentMilestones = COMPLETED_MILESTONES.slice(0, 5);
  const latestQ = BMNR_QUARTERLY_DATA[0];
  const scorecard = BMNR_INVESTMENT_CURRENT.scorecard;

  return (
    <div className="stock-model-app" data-accent="violet">
      {/* ═══ HEADER — Concept 11c Edge Markers ═══ */}
      <div className="hdr">
        <div className="hdr-accent-line" />
        <div className="hdr-grid">
          {/* LEFT: Identity */}
          <div className="hdr-identity">
            <div className="hdr-status">
              <div className="hdr-status-dot" />
              <span className="hdr-status-text">DASHBOARD</span>
            </div>
            <div className="hdr-exchange">{COMPANY_INFO.exchange}</div>
            <h1 className="hdr-ticker">{COMPANY_INFO.ticker}</h1>
            <div className="hdr-company">{COMPANY_INFO.name}</div>
            <div className="hdr-meta">
              <div className="hdr-meta-sep" />
              <div className="hdr-meta-row">
                <span className="hdr-meta-label">Sector</span>
                <span className="hdr-meta-value">{COMPANY_INFO.sector}</span>
              </div>
              <div className="hdr-meta-row">
                <span className="hdr-meta-label">Data</span>
                <span className="hdr-meta-value">{DATA_FRESHNESS.dataAsOf}</span>
              </div>
            </div>
          </div>

          {/* CENTER: Price */}
          <div className="hdr-price">
            <div className="hdr-price-label sm-micro-label">MARKET PRICE</div>
            <div className="hdr-arc-wrap">
              <svg className="hdr-arc" viewBox="0 0 280 60">
                <path className="hdr-arc-track" d="M 20 55 A 130 130 0 0 1 260 55" />
                <path className="hdr-arc-fill" d="M 20 55 A 130 130 0 0 1 260 55" />
              </svg>
            </div>
            <div className="hdr-price-value">
              <span className="hdr-currency">$</span>
              {loading ? "..." : m.price.toFixed(2)}
            </div>
            {quote && (
              <div className={`hdr-change ${quote.change >= 0 ? "up" : "down"}`}>
                {quote.change >= 0 ? "+" : ""}{quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
              </div>
            )}
            {!quote && !loading && (
              <div className="sm-subtle-sm sm-mt-4">as of {DEFAULTS.priceAsOf}</div>
            )}
          </div>

          {/* RIGHT: HUD Spine */}
          <div className="hdr-spine">
            <div className="hdr-marker" data-sentiment="positive">
              <div className="hdr-marker-label">ETH</div>
              <div className="hdr-marker-value">{fmtETH(ETH_HOLDINGS.totalETH)}</div>
            </div>
            <div className="hdr-marker" data-sentiment="positive">
              <div className="hdr-marker-label">mNAV</div>
              <div className="hdr-marker-value">{m.mNAV.toFixed(2)}x</div>
            </div>
            <div className="hdr-marker" data-sentiment="positive">
              <div className="hdr-marker-label">SUPPLY</div>
              <div className="hdr-marker-value">{pct(ETH_HOLDINGS.ethSupplyPercent)}</div>
            </div>
            <div className="hdr-marker" data-sentiment="neutral">
              <div className="hdr-marker-label">STAKED</div>
              <div className="hdr-marker-value">{pct(ETH_HOLDINGS.stakingRatio)}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hdr-stats">
          {[
            { label: "MCAP", val: fmt(m.mcap, 1) },
            { label: "NAV/SH", val: `$${m.navPerShare.toFixed(2)}` },
            { label: "CASH", val: `$${DEFAULTS.cashOnHand}M` },
            { label: "DEBT", val: "$0" },
            { label: "STAKING REV", val: `${fmt(m.annualStakingRev, 0)}/yr` },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <span className="label">{s.label}</span>
              <span className="val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="main">

        {/* ─── KEY METRICS — KPI Grid ─── */}
        <div className="sm-divider sm-section-label">KEY METRICS</div>
        <div className="sm-grid-sep" style={{ "--cols": 4 } as CSSProperties}>
          {[
            { label: "MARKET CAP", value: fmt(m.mcap, 1), sub: `${m.sharesM}M shares`, color: "var(--violet)" },
            { label: "ETH HOLDINGS", value: `${fmtETH(ETH_HOLDINGS.totalETH)}`, sub: `${pct(ETH_HOLDINGS.ethSupplyPercent)} of supply`, color: "var(--accent)" },
            { label: "NAV / SHARE", value: `$${m.navPerShare.toFixed(2)}`, sub: `mNAV ${m.mNAV.toFixed(2)}x`, color: mnavColor(m.mNAV) },
            { label: "ETH VALUE", value: fmt(m.ethValue, 1), sub: `@ $${DEFAULTS.ethPrice.toLocaleString()}/ETH`, color: "var(--cyan)" },
            { label: "CASH", value: `$${DEFAULTS.cashOnHand}M`, sub: "Zero debt", color: "var(--mint)" },
            { label: "STAKING", value: `${fmtETH(ETH_HOLDINGS.stakedETH)}`, sub: `${pct(ETH_HOLDINGS.stakingRatio)} · ${pct(STAKING_PARAMS.baseStakingAPY)} CESR`, color: "var(--violet)" },
            { label: "STAKING REV", value: fmt(m.annualStakingRev, 0), sub: "annualized", color: "var(--mint)" },
            { label: "TO ALCHEMY 5%", value: `${fmtETH(m.ethToTarget)}`, sub: `${ETH_HOLDINGS.progressToTarget}% complete`, color: "var(--gold)" },
          ].map((kpi) => (
            <div key={kpi.label} className="sm-kpi-cell">
              <div className="sm-kpi-label">{kpi.label}</div>
              <div className="sm-kpi-value" style={{ "--kpi-color": kpi.color } as CSSProperties}>{kpi.value}</div>
              <div className="sm-kpi-sub">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* ─── Alchemy of 5% Progress ─── */}
        <div className="sm-mt-16">
          <div className="sm-progress-track">
            <div
              className="sm-progress-fill"
              style={{
                width: `${ETH_HOLDINGS.progressToTarget}%`,
                "--progress-color": "var(--accent)",
              } as CSSProperties}
            />
          </div>
          <div className="sm-flex-between sm-mt-4">
            <span className="sm-subtle-sm">{pct(ETH_HOLDINGS.ethSupplyPercent)} of ETH supply</span>
            <span className="sm-subtle-sm">Target: {pct(ETH_HOLDINGS.targetSupplyPercent)}</span>
          </div>
        </div>

        {/* ─── CAPITAL STRUCTURE — Glass List ─── */}
        <div className="sm-divider sm-section-label">CAPITAL STRUCTURE</div>
        <div className="sm-inv-glass-list">
          {[
            { label: "Common Outstanding", value: commonShares ? (commonShares.outstanding / 1e6).toFixed(0) + "M" : "—", cls: "sm-text" },
            { label: "Authorized", value: commonShares ? (commonShares.authorized / 1e6).toFixed(0) + "M" : "—", cls: "sm-text" },
            { label: "Fully Diluted", value: (m.totalFD / 1e6).toFixed(1) + "M", cls: "sm-text" },
            { label: "Dilution from FD", value: "+" + pct(m.dilutionPct), cls: "sm-gold" },
            { label: "ATM Capacity", value: "$" + (LIQUIDITY_POSITION.atmCapacity / 1000) + "B", cls: "sm-text" },
            { label: "Total Debt", value: "$0", cls: "sm-mint" },
          ].map((row) => (
            <div key={row.label} className="sm-inv-glass-item">
              <span className="sm-body-sm">{row.label}</span>
              <span className={`sm-mono-sm ${row.cls}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* ─── LATEST WEEKLY PURCHASE — Glass List ─── */}
        <div className="sm-divider sm-section-label">LATEST WEEKLY PURCHASE</div>
        {latestPurchase && (
          <div className="sm-inv-glass-list">
            {[
              { label: "Date", value: latestPurchase.date, cls: "sm-text" },
              { label: "ETH Bought", value: "+" + latestPurchase.ethBought.toLocaleString() + " ETH", cls: "sm-violet" },
              { label: "ETH Price", value: "$" + latestPurchase.ethPrice.toLocaleString(), cls: "sm-text" },
              { label: "Cash Deployed", value: fmt(latestPurchase.cashDeployed, 1), cls: "sm-text" },
              { label: "Running Total", value: fmtETH(latestPurchase.totalEthAfter) + " ETH", cls: "sm-mint" },
              ...(latestPurchase.mnavAtTime
                ? [{ label: "mNAV at Time", value: latestPurchase.mnavAtTime.toFixed(2) + "x", cls: "" }]
                : []),
            ].map((row) => (
              <div key={row.label} className="sm-inv-glass-item">
                <span className="sm-body-sm">{row.label}</span>
                <span
                  className="sm-mono-sm"
                  style={
                    row.label === "mNAV at Time"
                      ? { color: mnavColor(latestPurchase.mnavAtTime) }
                      : undefined
                  }
                >
                  <span className={row.cls}>{row.value}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ─── INVESTMENT SCORECARD ─── */}
        <div className="sm-divider sm-section-label">INVESTMENT SCORECARD</div>
        <div className="sm-flex sm-gap-12 sm-mb-16">
          <span
            className="sm-inv-verdict-badge"
            style={{ "--inv-accent": "var(--mint)" } as CSSProperties}
          >
            {BMNR_INVESTMENT_CURRENT.verdict}
          </span>
          <span className="sm-subtle">{BMNR_INVESTMENT_CURRENT.tagline}</span>
        </div>
        <div className="sm-inv-scorecard-grid">
          {scorecard.map((s) => (
            <div key={s.category} className="sm-inv-scorecard-item">
              <span className="sm-body-sm">{s.category}</span>
              <span
                className="sm-inv-scorecard-rating"
                style={{ "--rating-color": s.color } as CSSProperties}
              >
                {s.rating}
              </span>
            </div>
          ))}
        </div>

        {/* ─── KEY CATALYSTS ─── */}
        <div className="sm-divider sm-section-label">KEY CATALYSTS</div>
        <div className="sm-inv-glass-list">
          {criticalCatalysts.map((c) => (
            <div key={c.event} className="sm-inv-glass-item">
              <span className="sm-body-sm sm-flex-1">{c.event}</span>
              <div className="sm-flex sm-gap-8 sm-shrink-0">
                <span
                  className="sm-badge"
                  style={{
                    "--badge-color": c.impact === "Critical" ? "var(--coral)" : "var(--gold)",
                  } as CSSProperties}
                >
                  {c.impact}
                </span>
                <span
                  className="sm-badge"
                  style={{ "--badge-color": "var(--text3)" } as CSSProperties}
                >
                  {c.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── RECENT MILESTONES ─── */}
        <div className="sm-divider sm-section-label">RECENT MILESTONES</div>
        <div className="sm-inv-glass-list">
          {recentMilestones.map((ms, i) => (
            <div key={i} className="sm-inv-glass-item sm-items-start">
              <span className="sm-mono-sm sm-text3 sm-nowrap sm-shrink-0" style={{ minWidth: 90 }}>
                {ms.date}
              </span>
              <span className="sm-body-sm sm-lh-17">{ms.event}</span>
            </div>
          ))}
        </div>

        {/* ─── QUARTERLY SNAPSHOT ─── */}
        {latestQ && (
          <>
            <div className="sm-divider sm-section-label">QUARTERLY SNAPSHOT &mdash; {latestQ.quarter}</div>
            <div className="sm-grid-sep" style={{ "--cols": 4 } as CSSProperties}>
              {[
                { label: "CASH", value: `$${latestQ.cash}M`, color: "var(--mint)" },
                { label: "CRYPTO", value: `$${(latestQ.crypto / 1000).toFixed(1)}B`, color: "var(--violet)", sub: latestQ.cryptoType },
                { label: "REVENUE", value: `$${latestQ.revenue}M`, color: "var(--sky)", sub: latestQ.filing },
                { label: "NET INCOME", value: `$${latestQ.netIncome}M`, color: latestQ.netIncome >= 0 ? "var(--mint)" : "var(--coral)" },
                { label: "ASSETS", value: fmt(latestQ.assets * 1e6, 1), color: "var(--sky)" },
                { label: "EQUITY", value: fmt(latestQ.equity * 1e6, 1), color: "var(--mint)" },
                { label: "OPEX", value: `$${latestQ.opEx}M`, color: "var(--gold)", sub: `G&A: $${latestQ.opExGandA ?? "—"}M` },
                { label: "SHARES", value: `${latestQ.shares}M`, color: "var(--violet)" },
              ].map((kpi) => (
                <div key={kpi.label} className="sm-kpi-cell">
                  <div className="sm-kpi-label">{kpi.label}</div>
                  <div className="sm-kpi-value" style={{ "--kpi-color": kpi.color } as CSSProperties}>{kpi.value}</div>
                  {"sub" in kpi && kpi.sub && <div className="sm-kpi-sub">{kpi.sub}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── LATEST EVENT ─── */}
        {latestEvent && (
          <>
            <div className="sm-divider sm-section-label">LATEST EVENT</div>
            <div className="sm-panel">
              <div className="sm-flex-between sm-mb-8">
                <span className="sm-mono-sm sm-text3">{latestEvent.date}</span>
                <span
                  className="sm-badge"
                  style={{ "--badge-color": "var(--violet)" } as CSSProperties}
                >
                  {latestEvent.category}
                </span>
              </div>
              <div className="sm-panel-title sm-lh-17 sm-mb-8">{latestEvent.title}</div>
              {latestEvent.changes && latestEvent.changes.length > 0 && (
                <div className="sm-mt-12">
                  {latestEvent.changes.slice(0, 5).map(
                    (ch: { metric: string; previous: string; new: string; change: string }, i: number) => (
                      <div key={i} className="sm-row">
                        <span className="sm-row-label sm-subtle">{ch.metric}</span>
                        <span className="sm-row-value sm-mono-sm sm-text2">{ch.change}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ─── mNAV HISTORY ─── */}
        <div className="sm-divider sm-section-label">mNAV HISTORY (LAST 10)</div>
        <div className="sm-panel" style={{ padding: 0 }}>
          {BMNR_PURCHASE_HISTORY.slice(0, 10).map((p, i) => (
            <div
              key={i}
              className="sm-data-row"
              style={{ gridTemplateColumns: "100px 1fr 60px" }}
            >
              <span className="sm-mono-sm sm-text3">{p.date}</span>
              <span className="sm-subtle">
                +{p.ethBought.toLocaleString()} ETH @ ${p.ethPrice.toLocaleString()}
              </span>
              <span
                className="sm-mono-sm sm-text-right sm-fw-700"
                style={{ color: mnavColor(p.mnavAtTime) }}
              >
                {p.mnavAtTime !== null ? `${p.mnavAtTime.toFixed(2)}x` : "—"}
              </span>
            </div>
          ))}
        </div>

        {/* ─── FOOTER ─── */}
        <div className="sm-subtle-sm sm-text-center sm-mt-32 sm-mb-16 sm-opacity-40">
          All data referenced from /src/data/bmnr/* &middot; Zero duplication &middot; Live price via /api/stock/BMNR
        </div>
      </div>
    </div>
  );
}
