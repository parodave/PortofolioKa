import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function getTimelineEvents() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('timeline_events').select('*').order('event_date', { ascending: false }).order('sort_order');
  if (error) throw error;
  return data;
}
