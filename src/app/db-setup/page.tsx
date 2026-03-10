'use client';

import { useState } from 'react';

export default function DbSetupPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>('');

  async function runSetup() {
    setStatus('running');
    setResult('');
    try {
      const res = await fetch('/api/db/setup', { method: 'POST' });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      setStatus(data.success ? 'success' : 'error');
    } catch (err) {
      setResult(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }

  return (
    <div className="db-setup-page">
      <h1>Database Setup</h1>
      <p>Creates all tables and seeds data. Safe to re-run.</p>
      <button
        onClick={runSetup}
        disabled={status === 'running'}
        className="db-setup-btn"
      >
        {status === 'running' ? 'Running...' : 'Run Setup'}
      </button>

      {result && (
        <pre className="db-setup-result" data-error={status === 'error' ? 'true' : undefined}>
          {result}
        </pre>
      )}
    </div>
  );
}
