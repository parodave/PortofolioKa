import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type AudioInsert = Database['public']['Tables']['audio_items']['Insert'];

export async function getPublishedAudioItems() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('audio_items').select('*').eq('status', 'published').order('published_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createAudioItem(payload: AudioInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('audio_items').insert(payload as any).select('*').single();
  if (error) throw error;
  return data;
}
