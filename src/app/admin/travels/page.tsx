import { AdminCrudPanel } from '@/src/app/admin/_components/AdminCrudPanel';

export default function AdminTravelsPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <AdminCrudPanel title="Travels Manager" endpoint="/api/admin/travels" payloadExample={{ profile_id: '00000000-0000-0000-0000-000000000000', country: 'France', slug: 'france' }} />
    </main>
  );
}
