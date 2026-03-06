import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { skillCreateSchema, skillUpdateSchema, type SkillCreateInput, type SkillUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type SkillRow = TableRow<'skills'>;

export const listSkills = async (): Promise<SkillRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('skills').select('*').order('sort_order').order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list skills', error);
  return (data ?? []) as SkillRow[];
};

export const getSkillById = async (id: string): Promise<SkillRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('skills').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get skill', error);
  return (data ?? null) as SkillRow | null;
};

export const createSkill = async (input: SkillCreateInput): Promise<SkillRow> => {
  const parsed = skillCreateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(parsed.name) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('skills').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create skill', error);
  return data as SkillRow;
};

export const updateSkill = async (id: string, input: SkillUpdateInput): Promise<SkillRow> => {
  const parsed = skillUpdateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, ...(parsed.name ? { slug: parsed.slug ?? slugify(parsed.name) } : {}) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('skills').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update skill', error);
  return data as SkillRow;
};

export const removeSkill = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('skills').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove skill', error);
  return { id, removed: true };
};
