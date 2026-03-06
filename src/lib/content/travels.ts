import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type TravelInsert = Database['public']['Tables']['travel_entries']['Insert'];

export async function getTravelEntries() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('travel_entries').select('*').order('featured', { ascending: false }).order('start_date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createTravelEntry(payload: TravelInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('travel_entries').insert(payload as any).select('*').single();
  if (error) throw error;
  return data;
}
