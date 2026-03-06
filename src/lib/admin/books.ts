import { cleanUndefined, getSupabaseAdmin, handleSupabaseError, resolveProfileId, type TableRow } from '@/src/lib/admin/common';
import { bookCreateSchema, bookUpdateSchema, type BookCreateInput, type BookUpdateInput } from '@/src/lib/admin/schemas';
import { slugify } from '@/src/lib/utils/slugify';

type BookRow = TableRow<'books'>;

export const listBooks = async (): Promise<BookRow[]> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('books').select('*').order('updated_at', { ascending: false });
  if (error) handleSupabaseError('Failed to list books', error);
  return (data ?? []) as BookRow[];
};

export const getBookById = async (id: string): Promise<BookRow | null> => {
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('books').select('*').eq('id', id).maybeSingle();
  if (error) handleSupabaseError('Failed to get book', error);
  return (data ?? null) as BookRow | null;
};

export const createBook = async (input: BookCreateInput): Promise<BookRow> => {
  const parsed = bookCreateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, profile_id: resolveProfileId(parsed.profile_id), slug: parsed.slug ?? slugify(parsed.title) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('books').insert(payload).select('*').single();
  if (error) handleSupabaseError('Failed to create book', error);
  return data as BookRow;
};

export const updateBook = async (id: string, input: BookUpdateInput): Promise<BookRow> => {
  const parsed = bookUpdateSchema.parse(input);
  const payload = cleanUndefined({ ...parsed, ...(parsed.title ? { slug: parsed.slug ?? slugify(parsed.title) } : {}) });
  const admin = getSupabaseAdmin() as any;
  const { data, error } = await admin.from('books').update(payload).eq('id', id).select('*').single();
  if (error) handleSupabaseError('Failed to update book', error);
  return data as BookRow;
};

export const removeBook = async (id: string): Promise<{ id: string; removed: true }> => {
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('books').delete().eq('id', id);
  if (error) handleSupabaseError('Failed to remove book', error);
  return { id, removed: true };
};
