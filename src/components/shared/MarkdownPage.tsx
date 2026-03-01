"use client";

import ReactMarkdown from "react-markdown";

/**
 * Renders a markdown string inside the ABISON app shell with matching styles.
 * Accepts pre-read markdown content (server components read the file, pass it here).
 *
 * Layout matches the /docs golden standard: py-20, max-w-6xl, semibold title,
 * optional subtitle, separator line before content.
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
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header — matches /docs page pattern ─────────────────────── */}
        <div className="mb-10 pb-6 border-b border-white/[0.06]">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-white/40 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
