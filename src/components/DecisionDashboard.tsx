'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Decision {
  id: number;
  pm: string;
  engineerId: string;
  runId: number | null;
  ticker: string;
  title: string;
  category: string;
  payload: string;
  status: string;
  pmNotes: string | null;
  bossNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PatchItem {
  workflowId: string;
  action: string;
  anchor: string;
  content: string;
  finding_id: string;
  rationale: string;
}

interface RemediationOutput {
  findings_processed: number;
  patches: PatchItem[];
  skipped: Array<{ finding_id: string; reason: string }>;
}

const PM_META: Record<string, { label: string; color: string; badge: string }> = {
  'claude':       { label: 'Claude',      color: '#22d3ee', badge: 'ARCH' },
  'cursor':       { label: 'Cursor',      color: '#a78bfa', badge: 'UI' },
  'gemini':       { label: 'Gemini',      color: '#34d399', badge: 'R&D' },
  'maszka':       { label: 'Maszka',      color: '#f472b6', badge: 'UI' },
  'bobman':       { label: 'Bobman',      color: '#fb923c', badge: 'PM' },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'pending':        { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', label: 'Pending' },
  'pm-approved':    { bg: 'rgba(52, 211, 153, 0.15)', text: '#34d399', label: 'PM Approved' },
  'pm-rejected':    { bg: 'rgba(248, 113, 113, 0.15)', text: '#f87171', label: 'PM Rejected' },
  'boss-approved':  { bg: 'rgba(34, 211, 238, 0.15)', text: '#22d3ee', label: 'Boss Approved' },
  'boss-rejected':  { bg: 'rgba(248, 113, 113, 0.2)', text: '#ef4444', label: 'Boss Rejected' },
  'applied':        { bg: 'rgba(126, 231, 135, 0.15)', text: '#7ee787', label: 'Applied' },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function DecisionDashboard() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [activePm, setActivePm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);

  const fetchDecisions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activePm) params.set('pm', activePm);
      const res = await authFetch(`/api/decisions?${params}`);
      const data = await res.json();
      setDecisions(data.decisions || []);
    } catch {
      console.error('Failed to fetch decisions');
    } finally {
      setLoading(false);
    }
  }, [activePm]);

  useEffect(() => { fetchDecisions(); }, [fetchDecisions]);

  const updateStatus = async (id: number, status: string, notes?: string) => {
    const body: Record<string, unknown> = { id, status };
    if (status.startsWith('pm-')) body.pmNotes = notes || '';
    if (status.startsWith('boss-')) body.bossNotes = notes || '';

    await authFetch('/api/decisions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    fetchDecisions();
  };

  const applyPatches = async (decision: Decision) => {
    setApplying(decision.id);
    try {
      // Parse the remediation output to extract patches
      let patches: PatchItem[] = [];
      try {
        // The payload might be the raw engineer output containing JSON
        const jsonMatch = decision.payload.match(/\{[\s\S]*"patches"[\s\S]*\}/);
        if (jsonMatch) {
          const parsed: RemediationOutput = JSON.parse(jsonMatch[0]);
          patches = parsed.patches;
        }
      } catch {
        console.error('Failed to parse patches from payload');
        return;
      }

      if (patches.length === 0) return;

      // Call the apply endpoint in dry-run first
      const previewRes = await authFetch('/api/workflow/apply-prompt-patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patches, dryRun: true }),
      });
      const preview = await previewRes.json();

      if (!preview.valid || preview.valid === 0) {
        alert(`No valid patches. ${preview.invalid || 0} invalid.`);
        return;
      }

      // Apply for real
      const applyRes = await authFetch('/api/workflow/apply-prompt-patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patches, dryRun: false }),
      });
      const result = await applyRes.json();

      if (result.success) {
        await updateStatus(decision.id, 'applied', `Applied ${result.applied?.length || 0} patches, +${result.linesAdded || 0} lines`);
      } else {
        alert(`Apply failed: ${result.error}`);
      }
    } finally {
      setApplying(null);
    }
  };

  const applyDataPatches = async (decision: Decision) => {
    setApplying(decision.id);
    try {
      // Parse the ingestor output to extract data patches
      let patches: Array<{ file: string; action: string; anchor: string; content: string; oldValue?: string }> = [];
      try {
        const jsonMatch = decision.payload.match(/\{[\s\S]*"patches"[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          patches = (parsed.patches || []).map((p: Record<string, string>) => ({
            file: p.file,
            action: p.action,
            anchor: p.anchor,
            content: p.content,
            ...(p.oldValue ? { oldValue: p.oldValue } : {}),
          }));
        }
      } catch {
        console.error('Failed to parse data patches from payload');
        return;
      }

      if (patches.length === 0) return;

      const ticker = decision.ticker;

      // Dry-run validation first
      const previewRes = await authFetch('/api/workflow/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, agentId: decision.engineerId, patches, dryRun: true }),
      });
      const preview = await previewRes.json();

      if (!preview.validCount || preview.validCount === 0) {
        alert(`No valid data patches. ${preview.invalidCount || 0} invalid.`);
        return;
      }

      // Apply for real with validated patches
      const applyRes = await authFetch('/api/workflow/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, agentId: decision.engineerId, patches: preview.patches, dryRun: false }),
      });
      const result = await applyRes.json();

      if (result.applied > 0) {
        await updateStatus(decision.id, 'applied', `Applied ${result.applied} data patches to ${ticker.toUpperCase()}`);
      } else {
        alert(`Apply failed: ${result.summary || 'Unknown error'}`);
      }
    } finally {
      setApplying(null);
    }
  };

  const parsePatchCount = (payload: string): number => {
    try {
      const jsonMatch = payload.match(/\{[\s\S]*"patches"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.patches?.length || 0;
      }
    } catch { /* ignore */ }
    return 0;
  };

  const pms = Object.keys(PM_META);
  const pendingCounts = pms.reduce<Record<string, number>>((acc, pm) => {
    acc[pm] = decisions.filter(d => d.pm === pm && d.status === 'pending').length;
    return acc;
  }, {});

  return (
    <div className="dec-dashboard">
      {/* PM filter tabs */}
      <div className="eng-view-toggle-bar">
        <button
          className={`eng-view-toggle ${!activePm ? 'active' : ''}`}
          onClick={() => setActivePm(null)}
        >
          All PMs
        </button>
        {pms.map(pm => {
          const meta = PM_META[pm];
          const count = pendingCounts[pm] || 0;
          return (
            <button
              key={pm}
              className={`eng-view-toggle ${activePm === pm ? 'active' : ''}`}
              onClick={() => setActivePm(pm)}
            >
              <span className="eng-section-dot" style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}66` }} />
              {meta.label}
              {count > 0 && <span className="dec-pm-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Decision cards */}
      {loading ? (
        <div className="dec-empty">Loading decisions...</div>
      ) : decisions.length === 0 ? (
        <div className="dec-empty">No decisions pending. The pipeline is clear.</div>
      ) : (
        <div className="dec-list">
          {decisions.map(d => {
            const pm = PM_META[d.pm] || { label: d.pm, color: '#888', badge: '?' };
            const st = STATUS_STYLES[d.status] || STATUS_STYLES['pending'];
            const isExpanded = expandedId === d.id;
            const patchCount = parsePatchCount(d.payload);

            return (
              <div key={d.id} className="dec-card" style={{ '--pm-color': pm.color } as React.CSSProperties}>
                <div className="dec-card-header" onClick={() => setExpandedId(isExpanded ? null : d.id)}>
                  <div className="dec-card-left">
                    <span className="dec-card-badge" style={{ background: pm.color }}>{pm.badge}</span>
                    <div>
                      <div className="dec-card-title">{d.title}</div>
                      <div className="dec-card-meta">
                        {d.ticker} &middot; {d.engineerId} &middot; {new Date(d.createdAt).toLocaleString()}
                        {patchCount > 0 && <> &middot; {patchCount} patches</>}
                      </div>
                    </div>
                  </div>
                  <div className="dec-card-right">
                    <span className="dec-status-badge" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                    <span className="dec-expand-icon">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="dec-card-body">
                    {/* Payload preview */}
                    <div className="dec-payload-section">
                      <div className="dec-payload-label">Payload</div>
                      <pre className="dec-payload-pre">{d.payload.slice(0, 3000)}{d.payload.length > 3000 ? '\n...(truncated)' : ''}</pre>
                    </div>

                    {/* Notes */}
                    {d.pmNotes && (
                      <div className="dec-notes">
                        <strong>PM Notes:</strong> {d.pmNotes}
                      </div>
                    )}
                    {d.bossNotes && (
                      <div className="dec-notes">
                        <strong>Boss Notes:</strong> {d.bossNotes}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="dec-actions">
                      {d.status === 'pending' && (
                        <>
                          <button className="eng-btn" data-variant="active" onClick={() => updateStatus(d.id, 'pm-approved', 'Approved by PM')}>
                            PM Approve
                          </button>
                          <button className="eng-btn eng-btn-danger" onClick={() => updateStatus(d.id, 'pm-rejected', 'Rejected by PM')}>
                            PM Reject
                          </button>
                        </>
                      )}
                      {d.status === 'pm-approved' && (
                        <>
                          <button className="eng-btn" data-variant="run" onClick={() => updateStatus(d.id, 'boss-approved', 'Final approval by Boss')}>
                            Boss Approve
                          </button>
                          <button className="eng-btn eng-btn-danger" onClick={() => updateStatus(d.id, 'boss-rejected', 'Rejected by Boss')}>
                            Boss Reject
                          </button>
                        </>
                      )}
                      {d.status === 'boss-approved' && d.category === 'prompt-patch' && (
                        <button
                          className="eng-btn"
                          data-variant="active"
                          onClick={() => applyPatches(d)}
                          disabled={applying === d.id}
                        >
                          {applying === d.id ? 'Applying...' : 'Apply Patches to workflows.ts'}
                        </button>
                      )}
                      {d.status === 'boss-approved' && d.category === 'data-patch' && (
                        <button
                          className="eng-btn"
                          data-variant="active"
                          onClick={() => applyDataPatches(d)}
                          disabled={applying === d.id}
                        >
                          {applying === d.id ? 'Applying...' : 'Apply Data Patches to database'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
