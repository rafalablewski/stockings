import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import AuditDashboard from "@/components/AuditDashboard";
import RunAuditButton from "./RunAuditButton";
import '../../abison-pages.css';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stockings Comprehensive Code Audit v1.0 | ABISON",
  description:
    "35-category institutional-grade code audit with CVSS scoring, CWE mapping, and compliance analysis",
};

export default function ComprehensiveCodeAuditPage() {
  const auditMd = readFileSync(join(process.cwd(), "audit/AUDIT.md"), "utf-8");

  return (
    <div className="ab-app">
      <div className="ab-header">
        <div className="ab-subtitle">Platform / Audit</div>
        <div className="ab-title">Comprehensive Code Audit v1.0</div>
        <div className="ab-desc">
          35-category institutional-grade analysis covering security
          vulnerabilities, authentication, data privacy, performance,
          accessibility, compliance, and architecture. CVSS v3.1 scoring with
          CWE and OWASP mapping.
        </div>
        <div style={{ marginTop: 12 }}>
          <RunAuditButton />
        </div>
      </div>
      <div className="ab-feed">
        <AuditDashboard auditMd={auditMd} />
      </div>
    </div>
  );
}
