import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export async function getFeaturedProjects() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .in('status', ['active', 'completed', 'published'])
    .order('sort_order');
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, payload: ProjectUpdate) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await (admin as any).from('projects').update(payload).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}
