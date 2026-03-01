import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import MarkdownPage from "@/components/shared/MarkdownPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Changelog | ABISON",
  description: "ABISON changelog — commit history and feature timeline",
};

export default function ChangelogPage() {
  const content = readFileSync(join(process.cwd(), "docs/changelog.md"), "utf-8");
  return (
    <MarkdownPage
      title="Changelog"
      subtitle="Commit history and feature timeline for the ABISON platform."
      content={content}
    />
  );
}
