import Link from 'next/link';

const pages = [
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/audio', label: 'Audio' },
  { href: '/admin/travels', label: 'Travels' },
  { href: '/admin/projects', label: 'Projects' },
];

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold">Portfolio Admin</h1>
        <p className="mb-10 text-zinc-400">Telegram/OpenClaw-ready management endpoints and dashboards.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 hover:bg-zinc-900">
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-sm text-zinc-400">Manage {item.label.toLowerCase()} content.</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
