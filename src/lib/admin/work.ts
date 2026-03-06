import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { workExperienceCreateSchema, workExperienceUpdateSchema, type WorkExperienceCreateInput, type WorkExperienceUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type WorkRow = TableRow<'work_experiences'>;

export const listWorkExperiences = async (): Promise<WorkRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('work_experiences').select('*').order('sort_order').order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list work experiences', error);
  return (data ?? []) as WorkRow[];
};

export const getWorkExperienceById = async (id: string): Promise<WorkRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('work_experiences').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get work experience', error);
  return (data ?? null) as WorkRow | null;
};

export const createWorkExperience = async (input: WorkExperienceCreateInput): Promise<WorkRow> => {
  const parsed = workExperienceCreateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(`${parsed.company}-${parsed.role}`) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('work_experiences').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create work experience', error);
  return data as WorkRow;
};

export const updateWorkExperience = async (id: string, input: WorkExperienceUpdateInput): Promise<WorkRow> => {
  const parsed = workExperienceUpdateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, ...(parsed.company || parsed.role ? { slug: parsed.slug ?? slugify(`${parsed.company ?? 'company'}-${parsed.role ?? 'role'}`) } : {}) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('work_experiences').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update work experience', error);
  return data as WorkRow;
};

export const removeWorkExperience = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('work_experiences').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove work experience', error);
  return { id, removed: true };
};
