import { AdminCrudPanel } from '@/src/app/admin/_components/AdminCrudPanel';

export default function AdminAudioPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <AdminCrudPanel title="Audio Manager" endpoint="/api/admin/audio" payloadExample={{ profile_id: '00000000-0000-0000-0000-000000000000', title: 'Audio title', slug: 'audio-title', source_type: 'manual' }} />
    </main>
  );
}
