import Link from "next/link";
import { researchStocks } from "@/lib/stocks";

export default function HomePage() {
  return (
    <>
      {/* Sub-header */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-container-low border-b border-outline-variant/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary-fixed-dim rounded-full animate-pulse" />
            <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
              Engine Status: Optimal
            </span>
          </div>
          <h2 className="font-headline font-black text-2xl tracking-tighter text-on-surface">
            OVERVIEW <span className="text-primary">/ DASHBOARD</span>
          </h2>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-surface-container-highest border border-outline-variant/20 font-label text-[10px] font-bold tracking-widest uppercase hover:bg-surface-bright transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary font-label text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
            Run Simulation
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="p-4 grid grid-cols-12 gap-4">

        {/* Coverage Universe */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/15 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 neural-gradient opacity-30" />
          <div className="relative z-10 text-center">
            <span className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase mb-2 block">
              Active Coverage
            </span>
            <div className="text-[8rem] font-headline font-black leading-none tracking-tighter text-secondary-fixed-dim">
              {researchStocks.length}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-secondary-fixed-dim">
              <span className="material-symbols-outlined text-sm">monitoring</span>
              <span className="font-label font-bold text-sm uppercase">Research Stocks</span>
            </div>
          </div>
          <div className="w-full mt-12 grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-6">
            <div>
              <span className="font-label text-[9px] text-on-surface-variant uppercase block">Sectors</span>
              <span className="font-label text-lg font-bold text-on-surface">3</span>
            </div>
            <div>
              <span className="font-label text-[9px] text-on-surface-variant uppercase block">AI Engineers</span>
              <span className="font-label text-lg font-bold text-on-surface">7</span>
            </div>
          </div>
        </div>

        {/* Research Tickers Panel */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/15 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-label text-xs font-bold tracking-widest uppercase text-on-surface">
              Coverage Universe
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-secondary-fixed-dim" />
                <span className="font-label text-[9px] uppercase text-on-surface-variant">Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-outline" />
                <span className="font-label text-[9px] uppercase text-on-surface-variant">Monitoring</span>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            {researchStocks.map((stock) => (
              <Link
                key={stock.ticker}
                href={`/research/${stock.ticker}`}
                className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-label text-sm font-bold text-primary w-14">
                    {stock.ticker}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {stock.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 group-hover:text-on-surface-variant transition-colors">
                    {stock.sector}
                  </span>
                  <span className="material-symbols-outlined text-sm text-outline-variant group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-low border border-outline-variant/15 flex flex-col h-[420px]">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
            <h3 className="font-label text-xs font-bold tracking-widest uppercase text-on-surface">
              Intelligence Feed
            </h3>
            <span className="material-symbols-outlined text-primary text-sm">
              settings_input_component
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <FeedItem
              source="Press Intelligence"
              time="Live"
              color="secondary-fixed-dim"
              text="Real-time aggregation of press releases and corporate announcements across the coverage universe."
            />
            <FeedItem
              source="SEC Intelligence"
              time="Live"
              color="primary"
              text="EDGAR filing scanner monitoring new 10-Q, 10-K, 8-K, and S-1 filings with AI-powered analysis."
            />
            <FeedItem
              source="AI Engineers"
              time="Scheduled"
              color="tertiary"
              text="7 autonomous engineers: Thesis Monitor, Capital Structure, Earnings, Catalyst Tracker, Code Security, Data Quality, General Intel."
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4">
          <StatCard label="System Status" value="ONLINE" color="text-secondary-fixed-dim" bar={95} barColor="bg-secondary-fixed-dim" />
          <StatCard label="AI Sentiment" value="ACTIVE" color="text-primary" bar={82} barColor="bg-primary" />
          <div className="col-span-2 bg-surface-container-lowest border border-outline-variant/15 p-6">
            <h3 className="font-label text-xs font-bold tracking-widest uppercase text-on-surface mb-6">
              Platform Capabilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "psychology", label: "AI Analysis" },
                { icon: "query_stats", label: "Financial Models" },
                { icon: "casino", label: "Monte Carlo" },
                { icon: "compare_arrows", label: "Comps" },
              ].map((cap) => (
                <div
                  key={cap.label}
                  className="flex flex-col items-center gap-2 p-4 bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">{cap.icon}</span>
                  <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {cap.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FeedItem({
  source,
  time,
  color,
  text,
}: {
  source: string;
  time: string;
  color: string;
  text: string;
}) {
  return (
    <div className={`p-3 bg-surface-container border-l-2 border-${color}`}>
      <div className="flex justify-between mb-2">
        <span className={`font-label text-[10px] text-${color} font-bold uppercase`}>
          {source}
        </span>
        <span className="font-label text-[9px] text-on-surface-variant">{time}</span>
      </div>
      <p className="text-xs text-on-surface leading-relaxed">{text}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bar,
  barColor,
}: {
  label: string;
  value: string;
  color: string;
  bar: number;
  barColor: string;
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/15 p-4 flex flex-col justify-between">
      <div>
        <h4 className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
          {label}
        </h4>
        <div className={`text-3xl font-headline font-black ${color}`}>{value}</div>
      </div>
      <div className="mt-4 bg-surface-container-highest h-1 w-full overflow-hidden">
        <div className={`${barColor} h-full`} style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}
