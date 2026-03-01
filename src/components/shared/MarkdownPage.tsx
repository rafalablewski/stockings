"use client";

import ReactMarkdown from "react-markdown";

/**
 * Renders a markdown string inside the ABISON app shell with matching styles.
 * Accepts pre-read markdown content (server components read the file, pass it here).
 */
export default function MarkdownPage({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  return (
    <div className="min-h-screen py-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[22px] font-light tracking-[0.15em] text-white/90 mb-8">
          {title}
        </h1>
        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
