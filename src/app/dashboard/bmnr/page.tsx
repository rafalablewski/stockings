"use client";

import dynamic from "next/dynamic";

const BMNRDashboard = dynamic(
  () => import("@/components/stocks/BMNRDashboard"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-white/40">Loading dashboard</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function BMNRDashboardPage() {
  return <BMNRDashboard />;
}
