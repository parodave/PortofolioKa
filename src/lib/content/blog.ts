import type { Database } from '@/src/lib/database.types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

type BlogInsert = Database['public']['Tables']['blog_posts']['Insert'];

export async function getPublishedBlogPosts() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(*)')
    .or('published.eq.true,status.eq.published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBlogPost(payload: BlogInsert) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('blog_posts').insert(payload).select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
  return { success: true };
}
