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
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
          {title}
        </h1>
        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
