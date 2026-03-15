"use client";

import { useEffect, useState } from "react";
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
// Sub-components
// ---------------------------------------------------------------------------

function MetricCard({
  label,
  value,
  sub,
  color = "violet",
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="sm-card-colored" data-color={color}>
      <div className="sm-card-label">{label}</div>
      <div className="sm-card-value">{value}</div>
      {sub && (
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <div className="sm-section-label">{title}</div>;
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

  // Latest purchase for weekly delta
  const latestPurchase = BMNR_PURCHASE_HISTORY[0];
  const prevPurchase = BMNR_PURCHASE_HISTORY[1];
  const weeklyETHDelta = latestPurchase
    ? latestPurchase.totalEthAfter - (prevPurchase?.totalEthAfter ?? 0)
    : 0;

  // Latest timeline event
  const latestEvent = BMNR_TIMELINE_EVENTS[0];

  // Active common shares
  const commonShares = SHARE_CLASSES.find((s) => s.status === "active");

  // Critical & high catalysts
  const criticalCatalysts = UPCOMING_CATALYSTS.filter(
    (c) => c.impact === "Critical" || c.impact === "High"
  );

  // Recent milestones (last 5)
  const recentMilestones = COMPLETED_MILESTONES.slice(0, 5);

  // Latest quarterly data
  const latestQ = BMNR_QUARTERLY_DATA[0];

  // Investment scorecard
  const scorecard = BMNR_INVESTMENT_CURRENT.scorecard;

  return (
    <div className="stock-model-app" data-accent="violet">
      {/* ─── HERO ─── */}
      <div className="hero">
        <div className="hero-content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {COMPANY_INFO.ticker}
            </h1>
            <span
              style={{
                fontSize: 12,
                color: "var(--violet)",
                background: "var(--violet-dim)",
                padding: "3px 10px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              DASHBOARD
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--text3)",
              marginBottom: 16,
            }}
          >
            {COMPANY_INFO.name} &middot; {COMPANY_INFO.exchange} &middot;{" "}
            {COMPANY_INFO.sector}
          </div>

          {/* Price Row */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "var(--text)" }}
            >
              {loading
                ? "..."
                : `$${m.price.toFixed(2)}`}
            </span>
            {quote && (
              <span
                style={{
                  fontSize: 14,
                  color:
                    quote.change >= 0 ? "var(--mint)" : "var(--coral)",
                  fontWeight: 600,
                }}
              >
                {quote.change >= 0 ? "+" : ""}
                {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
              </span>
            )}
            {!quote && !loading && (
              <span style={{ fontSize: 13, color: "var(--text3)" }}>
                as of {DEFAULTS.priceAsOf}
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: 11,
              color: "var(--text3)",
              marginTop: 6,
            }}
          >
            Data: {DATA_FRESHNESS.dataAsOf} &middot;{" "}
            {DATA_FRESHNESS.lastFiling}
          </div>
        </div>
      </div>

      {/* ─── KEY METRICS GRID ─── */}
      <div style={{ padding: "0 24px", marginTop: 24 }}>
        <SectionHeader title="KEY METRICS" />
        <div className="sm-grid-4col-responsive" style={{ marginTop: 12 }}>
          <MetricCard
            label="Market Cap"
            value={fmt(m.mcap, 1)}
            sub={`${m.sharesM}M shares`}
          />
          <MetricCard
            label="ETH Holdings"
            value={`${fmtETH(ETH_HOLDINGS.totalETH)} ETH`}
            sub={`${pct(ETH_HOLDINGS.ethSupplyPercent)} of supply`}
            color="purple"
          />
          <MetricCard
            label="NAV/Share"
            value={`$${m.navPerShare.toFixed(2)}`}
            sub={`mNAV: ${m.mNAV.toFixed(2)}x`}
            color={m.mNAV < 1 ? "green" : m.mNAV > 1.5 ? "red" : "blue"}
          />
          <MetricCard
            label="ETH Value"
            value={fmt(m.ethValue, 1)}
            sub={`@ $${DEFAULTS.ethPrice.toLocaleString()}/ETH`}
            color="cyan"
          />
        </div>

        {/* Row 2 */}
        <div className="sm-grid-4col-responsive" style={{ marginTop: 12 }}>
          <MetricCard
            label="Cash"
            value={`$${DEFAULTS.cashOnHand}M`}
            sub={`Debt: $${DEFAULTS.totalDebt}`}
            color="green"
          />
          <MetricCard
            label="Staking"
            value={`${fmtETH(ETH_HOLDINGS.stakedETH)} ETH`}
            sub={`${pct(ETH_HOLDINGS.stakingRatio)} deployed · ${pct(STAKING_PARAMS.baseStakingAPY)} CESR`}
            color="violet"
          />
          <MetricCard
            label="Staking Revenue"
            value={fmt(m.annualStakingRev, 0)}
            sub="annualized"
            color="mint"
          />
          <MetricCard
            label="To Alchemy of 5%"
            value={`${fmtETH(m.ethToTarget)} ETH`}
            sub={`${ETH_HOLDINGS.progressToTarget}% complete`}
            color="yellow"
          />
        </div>
      </div>

      {/* ─── CAPITAL STRUCTURE ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="CAPITAL STRUCTURE" />
        <div className="sm-grid-sep" style={{ marginTop: 12 }}>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>Common Outstanding</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              {commonShares ? (commonShares.outstanding / 1e6).toFixed(0) + "M" : "—"}
            </span>
          </div>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>Authorized</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              {commonShares ? (commonShares.authorized / 1e6).toFixed(0) + "M" : "—"}
            </span>
          </div>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>Fully Diluted</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              {(m.totalFD / 1e6).toFixed(1)}M
            </span>
          </div>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>Dilution from FD</span>
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>
              +{pct(m.dilutionPct)}
            </span>
          </div>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>ATM Capacity</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              ${LIQUIDITY_POSITION.atmCapacity / 1000}B
            </span>
          </div>
          <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text2)" }}>Total Debt</span>
            <span style={{ color: "var(--mint)", fontWeight: 600 }}>$0</span>
          </div>
        </div>
      </div>

      {/* ─── WEEKLY PURCHASE TRACKER ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="LATEST WEEKLY PURCHASE" />
        {latestPurchase && (
          <div className="sm-grid-sep" style={{ marginTop: 12 }}>
            <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text2)" }}>Date</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>
                {latestPurchase.date}
              </span>
            </div>
            <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text2)" }}>ETH Bought</span>
              <span style={{ color: "var(--violet)", fontWeight: 600 }}>
                +{latestPurchase.ethBought.toLocaleString()} ETH
              </span>
            </div>
            <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text2)" }}>ETH Price</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>
                ${latestPurchase.ethPrice.toLocaleString()}
              </span>
            </div>
            <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text2)" }}>Cash Deployed</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>
                {fmt(latestPurchase.cashDeployed, 1)}
              </span>
            </div>
            <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text2)" }}>Running Total</span>
              <span style={{ color: "var(--mint)", fontWeight: 600 }}>
                {fmtETH(latestPurchase.totalEthAfter)} ETH
              </span>
            </div>
            {latestPurchase.mnavAtTime && (
              <div className="sm-grid-cell" style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text2)" }}>mNAV at Time</span>
                <span
                  style={{
                    color:
                      latestPurchase.mnavAtTime < 1
                        ? "var(--mint)"
                        : latestPurchase.mnavAtTime > 1.5
                          ? "var(--coral)"
                          : "var(--sky)",
                    fontWeight: 600,
                  }}
                >
                  {latestPurchase.mnavAtTime.toFixed(2)}x
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── INVESTMENT SCORECARD ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="INVESTMENT SCORECARD" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: BMNR_INVESTMENT_CURRENT.verdictColor === "mint" ? "var(--mint)" : "var(--text)",
              background:
                BMNR_INVESTMENT_CURRENT.verdictColor === "mint"
                  ? "var(--mint-dim)"
                  : "var(--surface2)",
              padding: "4px 12px",
              borderRadius: 6,
            }}
          >
            {BMNR_INVESTMENT_CURRENT.verdict}
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>
            {BMNR_INVESTMENT_CURRENT.tagline}
          </span>
        </div>
        <div className="sm-grid-sep">
          {scorecard.map((s) => (
            <div
              key={s.category}
              className="sm-grid-cell"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--text2)", fontSize: 13 }}>
                {s.category}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontWeight: 700,
                    color: s.color,
                    fontSize: 14,
                  }}
                >
                  {s.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATALYSTS ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="KEY CATALYSTS" />
        <div className="sm-grid-sep" style={{ marginTop: 12 }}>
          {criticalCatalysts.map((c) => (
            <div
              key={c.event}
              className="sm-grid-cell"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  color: "var(--text2)",
                  fontSize: 13,
                  flex: 1,
                }}
              >
                {c.event}
              </span>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 4,
                    background:
                      c.impact === "Critical"
                        ? "var(--coral-dim)"
                        : "var(--gold-dim)",
                    color:
                      c.impact === "Critical"
                        ? "var(--coral)"
                        : "var(--gold)",
                    fontWeight: 600,
                  }}
                >
                  {c.impact}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: "var(--surface2)",
                  }}
                >
                  {c.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── RECENT MILESTONES ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="RECENT MILESTONES" />
        <div className="sm-grid-sep" style={{ marginTop: 12 }}>
          {recentMilestones.map((ms, i) => (
            <div
              key={i}
              className="sm-grid-cell"
              style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text3)",
                  whiteSpace: "nowrap",
                  minWidth: 90,
                }}
              >
                {ms.date}
              </span>
              <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.4 }}>
                {ms.event}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── LATEST QUARTERLY ─── */}
      {latestQ && (
        <div style={{ padding: "0 24px", marginTop: 32 }}>
          <SectionHeader title={`QUARTERLY SNAPSHOT — ${latestQ.quarter}`} />
          <div className="sm-grid-4col-responsive" style={{ marginTop: 12 }}>
            <MetricCard label="Cash" value={`$${latestQ.cash}M`} color="green" />
            <MetricCard
              label="Crypto Assets"
              value={`$${(latestQ.crypto / 1000).toFixed(1)}B`}
              sub={latestQ.cryptoType}
              color="violet"
            />
            <MetricCard
              label="Revenue"
              value={`$${latestQ.revenue}M`}
              sub={latestQ.filing}
              color="blue"
            />
            <MetricCard
              label="Net Income"
              value={`$${latestQ.netIncome > 0 ? "" : ""}${latestQ.netIncome}M`}
              color={latestQ.netIncome >= 0 ? "green" : "red"}
            />
          </div>
          <div className="sm-grid-4col-responsive" style={{ marginTop: 12 }}>
            <MetricCard label="Total Assets" value={fmt(latestQ.assets * 1e6, 1)} color="blue" />
            <MetricCard label="Equity" value={fmt(latestQ.equity * 1e6, 1)} color="mint" />
            <MetricCard label="OpEx" value={`$${latestQ.opEx}M`} sub={`G&A: $${latestQ.opExGandA ?? "—"}M`} color="yellow" />
            <MetricCard label="Shares" value={`${latestQ.shares}M`} color="purple" />
          </div>
        </div>
      )}

      {/* ─── LATEST EVENT ─── */}
      {latestEvent && (
        <div style={{ padding: "0 24px", marginTop: 32 }}>
          <SectionHeader title="LATEST EVENT" />
          <div
            style={{
              marginTop: 12,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 11, color: "var(--text3)" }}>
                {latestEvent.date}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--violet)",
                  background: "var(--violet-dim)",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {latestEvent.category}
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--text)",
                fontWeight: 600,
                marginBottom: 8,
                lineHeight: 1.4,
              }}
            >
              {latestEvent.title}
            </div>
            {latestEvent.changes && latestEvent.changes.length > 0 && (
              <div style={{ marginTop: 12 }}>
                {latestEvent.changes.slice(0, 5).map(
                  (
                    ch: { metric: string; previous: string; new: string; change: string },
                    i: number
                  ) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        borderBottom:
                          i < 4 ? "1px solid var(--border)" : "none",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: "var(--text3)" }}>{ch.metric}</span>
                      <span style={{ color: "var(--text2)" }}>{ch.change}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── mNAV TREND (from purchase history) ─── */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <SectionHeader title="mNAV HISTORY (LAST 10 PURCHASES)" />
        <div className="sm-grid-sep" style={{ marginTop: 12 }}>
          {BMNR_PURCHASE_HISTORY.slice(0, 10).map((p, i) => (
            <div
              key={i}
              className="sm-grid-cell"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text3)", minWidth: 90 }}>
                {p.date}
              </span>
              <span style={{ fontSize: 12, color: "var(--text2)" }}>
                +{p.ethBought.toLocaleString()} ETH @ ${p.ethPrice.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color:
                    p.mnavAtTime === null
                      ? "var(--text3)"
                      : p.mnavAtTime < 1
                        ? "var(--mint)"
                        : p.mnavAtTime > 1.5
                          ? "var(--coral)"
                          : "var(--sky)",
                  minWidth: 50,
                  textAlign: "right",
                }}
              >
                {p.mnavAtTime !== null ? `${p.mnavAtTime.toFixed(2)}x` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div
        style={{
          padding: "32px 24px 48px",
          textAlign: "center",
          fontSize: 11,
          color: "var(--text3)",
        }}
      >
        All data referenced from /src/data/bmnr/* &middot; Zero duplication
        &middot; Live price via /api/stock/BMNR
      </div>
    </div>
  );
}
