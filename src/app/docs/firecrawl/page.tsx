import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import MarkdownPage from "@/components/shared/MarkdownPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Firecrawl | ABISON",
  description:
    "Firecrawl plugin documentation — web scraping, crawling, and search for Claude Code",
};

export default function FirecrawlPage() {
  const content = readFileSync(
    join(process.cwd(), "docs/firecrawl.md"),
    "utf-8",
  );
  return (
    <MarkdownPage
      title="Firecrawl"
      subtitle="Web scraping, crawling, and search plugin for Claude Code."
      content={content}
    />
  );
}
