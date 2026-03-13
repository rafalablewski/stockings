'use client';

import { useState, useCallback, useEffect } from 'react';
import '../abison-pages.css';

interface HookCardProps {
  plugin: {
    id: string;
    name: string;
    version: string;
    phase: string;
    matchers: string[];
    description: string;
    config: { key: string; value: string }[];
    script: string;
  };
}

export default function HookCard({ plugin }: HookCardProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = useCallback(() => {
    navigator.clipboard.writeText(plugin.script);
    setCopiedPrompt(true);
  }, [plugin.script]);

  useEffect(() => {
    if (copiedPrompt) {
      const timerId = setTimeout(() => setCopiedPrompt(false), 2000);
      return () => clearTimeout(timerId);
    }
  }, [copiedPrompt]);

  const badgeColor = plugin.phase.includes("Pre") && plugin.phase.includes("Post")
    ? "pre+post"
    : plugin.phase.includes("Pre") ? "pre" : "post";

  return (
    <div id={plugin.id} className="ab-card" style={{ scrollMarginTop: 80 }}>
      <div className="ab-card-inner">
        <div className="ab-card-header">
          <div className="ab-card-name-row">
            <span className="ab-card-name">{plugin.name}</span>
            <span className="ab-badge" data-color={badgeColor}>{plugin.phase}</span>
            <span className="ab-card-version">v{plugin.version}</span>
            <span className="ab-badge" data-color="warning">Turned off</span>
          </div>
        </div>

        <div className="ab-card-desc">{plugin.description}</div>

        {/* Triggers */}
        <div className="ab-triggers">
          <span className="ab-triggers-label">Triggers</span>
          {plugin.matchers.map((m) => (
            <span key={m} className="ab-pill">{m}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button type="button" onClick={() => setShowPrompt(!showPrompt)} className="ab-btn">
            {showPrompt ? "Hide prompt" : "View prompt"}
          </button>
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="ab-btn"
            data-state={copiedPrompt ? "success" : undefined}
          >
            {copiedPrompt ? "Copied!" : "Copy prompt"}
          </button>
        </div>

        {showPrompt && (
          <div className="ab-prompt-box">
            <pre className="ab-prompt-pre">{plugin.script}</pre>
          </div>
        )}

        {/* Config */}
        <div className="ab-config-box">
          <div className="ab-config-label">Configuration</div>
          <div className="ab-config-grid">
            {plugin.config.map((c) => (
              <div key={c.key} className="ab-config-row">
                <span className="ab-config-key">{c.key}</span>
                <span className="ab-config-val">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
