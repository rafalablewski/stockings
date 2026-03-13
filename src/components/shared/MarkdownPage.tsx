"use client";

import ReactMarkdown from "react-markdown";
import "@/app/docs/docs.css";

/**
 * Renders a markdown string inside the ABISON app shell with Bloomberg styling.
 * Accepts pre-read markdown content (server components read the file, pass it here).
 */
export default function MarkdownPage({
  content,
  title,
  subtitle,
}: {
  content: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="docs-app">
      <div className="docs-header">
        <div className="docs-subtitle">Platform / Documentation</div>
        <div className="docs-title">{title}</div>
        {subtitle && <div className="docs-desc">{subtitle}</div>}
      </div>

      <div className="docs-feed">
        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
