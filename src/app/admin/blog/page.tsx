import { AdminCrudPanel } from '@/src/app/admin/_components/AdminCrudPanel';

export default function AdminBlogPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <AdminCrudPanel title="Blog Manager" endpoint="/api/admin/blog" payloadExample={{ profile_id: '00000000-0000-0000-0000-000000000000', title: 'Post title', slug: 'post-title', status: 'draft' }} />
    </main>
  );
}
