"use client";

import ReactMarkdown from "react-markdown";

export default function AuditReportSection({ content }: { content: string }) {
  return (
    <article className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
