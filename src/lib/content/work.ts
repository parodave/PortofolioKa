import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type WorkUpdate = Database['public']['Tables']['work_experiences']['Update'];

export async function getPublicWorkExperiences() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('work_experiences')
    .select('*')
    .order('is_current', { ascending: false })
    .order('start_date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateWorkExperience(id: string, payload: WorkUpdate) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('work_experiences').update(payload).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}
