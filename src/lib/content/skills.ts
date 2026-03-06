import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type SkillInsert = Database['public']['Tables']['skills']['Insert'];

export async function getPublicSkills() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('skills').select('*').order('featured', { ascending: false }).order('sort_order');
  if (error) throw error;
  return data;
}

export async function createSkill(payload: SkillInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('skills').insert(payload as any).select('*').single();
  if (error) throw error;
  return data;
}
