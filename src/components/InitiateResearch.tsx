"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/auth-fetch";

export default function InitiateResearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await authFetch("/api/research/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, name, sector, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to initiate research");
        return;
      }

      setSuccess(`Research initiated for ${data.ticker}`);
      setTicker("");
      setName("");
      setSector("");
      setDescription("");

      // Navigate to the new research page after a brief delay
      setTimeout(() => {
        router.push(`/stocks/${data.ticker}`);
        router.refresh();
      }, 1000);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="group relative block w-full p-6 rounded-2xl border border-dashed border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors">
            <svg
              className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">
              Initiate New Research
            </span>
            <p className="text-[11px] text-white/25 mt-0.5">
              Create data scaffold for a new company
            </p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[13px] font-medium text-white/80">Initiate New Research</h3>
        <button
          onClick={() => { setOpen(false); setError(null); setSuccess(null); }}
          className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-1.5">
              Ticker
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="AAPL"
              maxLength={6}
              required
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] transition-colors font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-1.5">
              Sector
            </label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Technology"
              required
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Apple Inc."
            required
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the company and investment angle"
            required
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] transition-colors"
          />
        </div>

        {error && (
          <p className="text-[12px] text-red-400/80">{error}</p>
        )}
        {success && (
          <p className="text-[12px] text-green-400/80">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-[13px] text-white/70 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Creating scaffold..." : "Initiate Research"}
        </button>
      </form>
    </div>
  );
}
