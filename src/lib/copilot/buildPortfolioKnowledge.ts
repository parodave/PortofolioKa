import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function buildPortfolioKnowledge() {
  const supabase = await createSupabaseServerClient();

  const [
    profile,
    skills,
    certifications,
    education,
    work,
    projects,
    blogPosts,
    books,
    travels,
    overrides,
  ] = await Promise.all([
    supabase.from('profile').select('*').eq('is_public', true).limit(1).maybeSingle(),
    supabase.from('skills').select('*').order('featured', { ascending: false }).order('sort_order'),
    supabase.from('certifications').select('*').in('status', ['active', 'in_progress', 'expired']),
    supabase.from('education').select('*').eq('is_public', true).order('sort_order'),
    supabase.from('work_experiences').select('*').order('start_date', { ascending: false }),
    supabase.from('projects').select('*').in('status', ['active', 'completed', 'published']).order('featured', { ascending: false }),
    supabase.from('blog_posts').select('*').or('published.eq.true,status.eq.published').order('published_at', { ascending: false }),
    supabase.from('books').select('*').or('featured.eq.true,status.eq.completed').order('featured', { ascending: false }),
    supabase.from('travel_entries').select('*').in('status', ['visited', 'planned']).order('featured', { ascending: false }),
    supabase.from('copilot_knowledge_overrides').select('*').eq('is_active', true).order('priority', { ascending: false }),
  ]);

  const errors = [profile, skills, certifications, education, work, projects, blogPosts, books, travels, overrides]
    .map((r) => r.error)
    .filter(Boolean);

  if (errors.length > 0) {
    throw new Error(errors.map((e) => e?.message).join('; '));
  }

  return {
    generated_at: new Date().toISOString(),
    profile: profile.data,
    sections: {
      skills: skills.data ?? [],
      certifications: certifications.data ?? [],
      education: education.data ?? [],
      work_experiences: work.data ?? [],
      projects: projects.data ?? [],
      blog_posts: blogPosts.data ?? [],
      books: books.data ?? [],
      travel_entries: travels.data ?? [],
      copilot_knowledge_overrides: overrides.data ?? [],
    },
  };
}
