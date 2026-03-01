import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import AuditDashboard from "@/components/AuditDashboard";
import RunAuditButton from "./RunAuditButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stockings Comprehensive Code Audit v1.0 | ABISON",
  description:
    "35-category institutional-grade code audit with CVSS scoring, CWE mapping, and compliance analysis",
};

export default function ComprehensiveCodeAuditPage() {
  const auditMd = readFileSync(join(process.cwd(), "audit/AUDIT.md"), "utf-8");

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
            Stockings Comprehensive Code Audit v1.0
          </h1>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-2xl">
            35-category institutional-grade analysis covering security
            vulnerabilities, authentication, data privacy, performance,
            accessibility, compliance, and architecture. CVSS v3.1 scoring with
            CWE and OWASP mapping.
          </p>
          <div className="mt-4">
            <RunAuditButton />
          </div>
        </div>
        <AuditDashboard auditMd={auditMd} />
      </div>
    </div>
  );
}
