import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function getPublicEducation() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('is_public', true)
    .order('sort_order')
    .order('start_date', { ascending: false });
  if (error) throw error;
  return data;
}
