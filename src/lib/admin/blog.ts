import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { blogPostCreateSchema, blogPostUpdateSchema, type BlogPostCreateInput, type BlogPostUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type BlogRow = TableRow<'blog_posts'>;

type BlogPostWithRelations = BlogRow & {
  blog_categories?: TableRow<'blog_categories'> | null;
  blog_post_tags?: Array<{ tag_id: string; blog_tags: TableRow<'blog_tags'> | null }>;
};

const syncTags = async (blogPostId: string, tags: string[]) => {
  const admin = getSupabaseAdmin() as any;
  const normalizedTags = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];

  const { error: clearError } = await admin.from('blog_post_tags').delete().eq('blog_post_id', blogPostId);
  if (clearError) handleSupabaseError('Failed to clear blog tag relations', clearError);

  if (normalizedTags.length === 0) return;

  const upsertPayload = normalizedTags.map((tag) => ({ name: tag, slug: slugify(tag) }));
  const { data: upsertedTags, error: upsertError } = await admin.from('blog_tags').upsert(upsertPayload, { onConflict: 'slug' }).select('id');
  if (upsertError) handleSupabaseError('Failed to upsert blog tags', upsertError);

  const relationPayload = (upsertedTags ?? []).map((tag: { id: string }) => ({ blog_post_id: blogPostId, tag_id: tag.id }));
  if (relationPayload.length === 0) return;

  const { error: relationError } = await admin.from('blog_post_tags').upsert(relationPayload, { onConflict: 'blog_post_id,tag_id' });
  if (relationError) handleSupabaseError('Failed to sync blog post tags', relationError);
};

export const listBlogPosts = async (): Promise<BlogPostWithRelations[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin
    .from('blog_posts')
    .select('*, blog_categories(*), blog_post_tags(tag_id, blog_tags(*))')
    .order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list blog posts', error);
  return (data ?? []) as BlogPostWithRelations[];
};

export const getBlogPostById = async (id: string): Promise<BlogPostWithRelations | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin
    .from('blog_posts')
    .select('*, blog_categories(*), blog_post_tags(tag_id, blog_tags(*))')
    .eq('id', id)
    .maybeSingle();
  if (error) handleSupabaseError('Failed to get blog post', error);
  return (data ?? null) as BlogPostWithRelations | null;
};

export const createBlogPost = async (input: BlogPostCreateInput): Promise<BlogPostWithRelations> => {
  const parsed = blogPostCreateSchema.parse(input);
  const { tags, ...rest } = parsed;
  const shouldPublish = rest.status === 'published' || rest.published === true;
  const payload = cleanUndefined({
    ...rest,
    profile_id: resolveProfileId(rest.profile_id),
    slug: rest.slug ?? slugify(rest.title),
    published: shouldPublish,
    published_at: shouldPublish ? rest.published_at ?? new Date().toISOString() : rest.published_at ?? null,
  });

  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('blog_posts').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create blog post', error);

  await syncTags(data.id as string, tags);
  const created = await getBlogPostById(data.id as string);
  if (!created) throw new Error('Blog post created but failed to reload.');
  return created;
};

export const updateBlogPost = async (id: string, input: BlogPostUpdateInput): Promise<BlogPostWithRelations> => {
  const parsed = blogPostUpdateSchema.parse(input);
  const { tags, ...rest } = parsed;
  const payload = cleanUndefined({
    ...rest,
    ...(rest.title ? { slug: rest.slug ?? slugify(rest.title) } : {}),
    ...(rest.status === 'published' || rest.published === true
      ? { published: true, published_at: rest.published_at ?? new Date().toISOString() }
      : {}),
  });

  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('blog_posts').update(payload).eq('id', id);
  if (error) handleSupabaseError('Failed to update blog post', error);

  if (tags) await syncTags(id, tags);

  const updated = await getBlogPostById(id);
  if (!updated) throw new Error('Blog post updated but failed to reload.');
  return updated;
};

export const removeBlogPost = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('blog_posts').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove blog post', error);
  return { id, removed: true };
};
