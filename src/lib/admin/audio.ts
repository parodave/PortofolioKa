import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { audioItemCreateSchema, audioItemUpdateSchema, type AudioItemCreateInput, type AudioItemUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type AudioRow = TableRow<'audio_items'>;

export const listAudioItems = async (): Promise<AudioRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('audio_items').select('*').order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list audio items', error);
  return (data ?? []) as AudioRow[];
};

export const getAudioItemById = async (id: string): Promise<AudioRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('audio_items').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get audio item', error);
  return (data ?? null) as AudioRow | null;
};

export const createAudioItem = async (input: AudioItemCreateInput): Promise<AudioRow> => {
  const parsed = audioItemCreateSchema.parse(input);
  const shouldPublish = parsed.status === 'published';
  const payload = cleanUndefined({
    ...parsed,
    profile_id: resolveProfileId(parsed.profile_id),
    slug: parsed.slug ?? slugify(parsed.title),
    published_at: shouldPublish ? parsed.published_at ?? new Date().toISOString() : parsed.published_at ?? null,
  });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('audio_items').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create audio item', error);
  return data as AudioRow;
};

export const updateAudioItem = async (id: string, input: AudioItemUpdateInput): Promise<AudioRow> => {
  const parsed = audioItemUpdateSchema.parse(input);
  const payload = cleanUndefined({
    ...parsed,
    ...(parsed.title ? { slug: parsed.slug ?? slugify(parsed.title) } : {}),
    ...(parsed.status === 'published' ? { published_at: parsed.published_at ?? new Date().toISOString() } : {}),
  });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('audio_items').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update audio item', error);
  return data as AudioRow;
};

export const removeAudioItem = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('audio_items').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove audio item', error);
  return { id, removed: true };
};
