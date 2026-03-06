import { AdminCrudPanel } from '@/src/app/admin/_components/AdminCrudPanel';

export default function AdminProjectsPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <AdminCrudPanel title="Projects Manager" endpoint="/api/admin/projects" payloadExample={{ profile_id: '00000000-0000-0000-0000-000000000000', name: 'Project name', slug: 'project-name', status: 'draft' }} />
    </main>
  );
}
