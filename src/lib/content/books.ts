import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type BookInsert = Database['public']['Tables']['books']['Insert'];

export async function getBookLibrary() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('books').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBook(payload: BookInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('books').insert(payload as any).select('*').single();
  if (error) throw error;
  return data;
}
