import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import {
  certificationCreateSchema,
  certificationUpdateSchema,
  type CertificationCreateInput,
  type CertificationUpdateInput,
} from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type CertificationRow = TableRow<'certifications'>;

export const listCertifications = async (): Promise<CertificationRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('certifications').select('*').order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list certifications', error);
  return (data ?? []) as CertificationRow[];
};

export const getCertificationById = async (id: string): Promise<CertificationRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('certifications').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get certification', error);
  return (data ?? null) as CertificationRow | null;
};

export const createCertification = async (input: CertificationCreateInput): Promise<CertificationRow> => {
  const parsed = certificationCreateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(parsed.name) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('certifications').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create certification', error);
  return data as CertificationRow;
};

export const updateCertification = async (id: string, input: CertificationUpdateInput): Promise<CertificationRow> => {
  const parsed = certificationUpdateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, ...(parsed.name ? { slug: parsed.slug ?? slugify(parsed.name) } : {}) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('certifications').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update certification', error);
  return data as CertificationRow;
};

export const removeCertification = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('certifications').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove certification', error);
  return { id, removed: true };
};
