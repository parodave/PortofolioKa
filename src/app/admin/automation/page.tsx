'use client';

import { useState } from 'react';

const entities = ['book', 'blog', 'audio', 'travel', 'project', 'work', 'certification', 'skill'] as const;
const actions = ['create', 'update', 'delete', 'list'] as const;

export default function AutomationAdminPage() {
  const [entity, setEntity] = useState<(typeof entities)[number]>('book');
  const [action, setAction] = useState<(typeof actions)[number]>('create');
  const [payload, setPayload] = useState('{\n  "title": "The 4-Hour Workweek",\n  "author": "Tim Ferriss",\n  "status": "completed"\n}');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('No request sent yet.');

  const submit = async () => {
    setLoading(true);
    try {
      const parsedPayload = payload.trim() ? JSON.parse(payload) : {};
      const response = await fetch('/api/admin/ingest-proxy', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ entity, action, payload: parsedPayload }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setResult(JSON.stringify({ success: false, error: message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <h1 className="text-3xl font-semibold tracking-tight">Automation Command Center</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Local-only dashboard for testing Telegram/OpenClaw automation payloads through the secure ingest proxy.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Entity</span>
            <select
              value={entity}
              onChange={(event) => setEntity(event.target.value as (typeof entities)[number])}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-indigo-500/40 focus:ring"
            >
              {entities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Action</span>
            <select
              value={action}
              onChange={(event) => setAction(event.target.value as (typeof actions)[number])}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-indigo-500/40 focus:ring"
            >
              {actions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-sm text-zinc-300">JSON payload</span>
          <textarea
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            className="h-64 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4 font-mono text-sm outline-none ring-indigo-500/40 focus:ring"
            spellCheck={false}
          />
        </label>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="mt-6 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Send to /api/admin/ingest'}
        </button>

        <section className="mt-8">
          <h2 className="text-sm font-medium text-zinc-300">Result</h2>
          <pre className="mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-800 bg-black/70 p-4 text-xs text-emerald-300">{result}</pre>
        </section>
      </div>
    </main>
  );
}
