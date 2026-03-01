import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import MarkdownPage from "@/components/shared/MarkdownPage";

export const metadata: Metadata = {
  title: "Audit Report | ABISON",
  description: "ABISON unified audit report — code quality, security, financial model, and operational maturity",
};

export default function AuditReportPage() {
  const content = readFileSync(join(process.cwd(), "audit/AUDIT.md"), "utf-8");
  return <MarkdownPage title="Audit Report" content={content} />;
}
