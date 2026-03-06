import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { travelEntryCreateSchema, travelEntryUpdateSchema, type TravelEntryCreateInput, type TravelEntryUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type TravelRow = TableRow<'travel_entries'>;

export const listTravels = async (): Promise<TravelRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('travel_entries').select('*').order('start_date', { ascending: false, nullsFirst: false });
  if (error) handleSupabaseError('Failed to list travel entries', error);
  return (data ?? []) as TravelRow[];
};

export const getTravelById = async (id: string): Promise<TravelRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('travel_entries').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get travel entry', error);
  return (data ?? null) as TravelRow | null;
};

export const createTravel = async (input: TravelEntryCreateInput): Promise<TravelRow> => {
  const parsed = travelEntryCreateSchema.parse(input);
  const slugBase = parsed.city ? `${parsed.country}-${parsed.city}` : parsed.country;
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(slugBase) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('travel_entries').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create travel entry', error);
  return data as TravelRow;
};

export const updateTravel = async (id: string, input: TravelEntryUpdateInput): Promise<TravelRow> => {
  const parsed = travelEntryUpdateSchema.parse(input);
  const payload = cleanUndefined({
    ...parsed,
    ...(parsed.country ? { slug: parsed.slug ?? slugify(`${parsed.country}-${parsed.city ?? ''}`) } : {}),
  });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('travel_entries').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update travel entry', error);
  return data as TravelRow;
};

export const removeTravel = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('travel_entries').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove travel entry', error);
  return { id, removed: true };
};
