import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { projectCreateSchema, projectUpdateSchema, type ProjectCreateInput, type ProjectUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type ProjectRow = TableRow<'projects'>;

export const listProjects = async (): Promise<ProjectRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('projects').select('*').order('featured', { ascending: false }).order('sort_order');
  if (error) handleSupabaseError('Failed to list projects', error);
  return (data ?? []) as ProjectRow[];
};

export const getProjectById = async (id: string): Promise<ProjectRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('projects').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get project', error);
  return (data ?? null) as ProjectRow | null;
};

export const createProject = async (input: ProjectCreateInput): Promise<ProjectRow> => {
  const parsed = projectCreateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(parsed.name) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('projects').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create project', error);
  return data as ProjectRow;
};

export const updateProject = async (id: string, input: ProjectUpdateInput): Promise<ProjectRow> => {
  const parsed = projectUpdateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, ...(parsed.name ? { slug: parsed.slug ?? slugify(parsed.name) } : {}) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('projects').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update project', error);
  return data as ProjectRow;
};

export const removeProject = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('projects').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove project', error);
  return { id, removed: true };
};
