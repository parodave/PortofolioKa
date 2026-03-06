import { AdminCrudPanel } from '@/src/app/admin/_components/AdminCrudPanel';

export default function AdminBooksPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <AdminCrudPanel title="Books Manager" endpoint="/api/admin/books" payloadExample={{ profile_id: '00000000-0000-0000-0000-000000000000', title: 'Book title', slug: 'book-title' }} />
    </main>
  );
}
