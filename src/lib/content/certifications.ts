import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type CertificationInsert = Database['public']['Tables']['certifications']['Insert'];

export async function getPublicCertifications() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .in('status', ['active', 'in_progress', 'expired'])
    .order('featured', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createCertification(payload: CertificationInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('certifications').insert(payload).select('*').single();
  if (error) throw error;
  return data;
}
