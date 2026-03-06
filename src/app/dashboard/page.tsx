import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | ABISON",
  description: "Real-time intelligence feed across all coverage",
};

export default function DashboardPage() {
  return <Dashboard />;
}
