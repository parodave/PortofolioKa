import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function getPublicProfile() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('profile').select('*').eq('is_public', true).limit(1).maybeSingle();
  if (error) throw error;
  return data;
}
