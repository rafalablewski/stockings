import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import MarkdownPage from "@/components/shared/MarkdownPage";

export const metadata: Metadata = {
  title: "Documentation | ABISON",
  description: "ABISON project documentation — architecture, plans, and implementation notes",
};

export default function DocumentationPage() {
  const content = readFileSync(join(process.cwd(), "docs/documentation.md"), "utf-8");
  return <MarkdownPage title="Documentation" content={content} />;
}
