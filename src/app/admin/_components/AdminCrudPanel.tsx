'use client';

import { useState } from 'react';

type Props = {
  title: string;
  endpoint: string;
  payloadExample: Record<string, unknown>;
};

export function AdminCrudPanel({ title, endpoint, payloadExample }: Props) {
  const [body, setBody] = useState(JSON.stringify(payloadExample, null, 2));
  const [result, setResult] = useState('');

  async function run(method: 'GET' | 'POST' | 'PATCH' | 'DELETE') {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method === 'GET' ? undefined : body,
    });
    const json = await response.json();
    setResult(JSON.stringify(json, null, 2));
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <textarea
          className="min-h-64 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 font-mono text-sm"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="space-y-2">
          {(['GET', 'POST', 'PATCH', 'DELETE'] as const).map((m) => (
            <button
              key={m}
              onClick={() => run(m)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800"
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <pre className="mt-4 overflow-auto rounded-lg bg-black/60 p-3 text-xs text-zinc-300">{result || 'Run a request to see output.'}</pre>
    </section>
  );
}
