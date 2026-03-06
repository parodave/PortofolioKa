import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';
import type { Database } from '@/src/lib/database.types';

export class AdminCrudError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AdminCrudError';
    this.status = status;
  }
}

export const getSupabaseAdmin = () => createSupabaseAdminClient();

export const resolveProfileId = (profileId?: string) => {
  const fallback = process.env.DEFAULT_PROFILE_ID;
  const resolved = profileId ?? fallback;

  if (!resolved) {
    throw new AdminCrudError('profile_id is required. Set DEFAULT_PROFILE_ID or pass profile_id explicitly.', 400);
  }

  return resolved;
};

export type TableRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TableInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export const handleSupabaseError = (message: string, error: { message: string }) => {
  throw new AdminCrudError(`${message}: ${error.message}`, 500);
};

export const cleanUndefined = <T extends Record<string, unknown>>(value: T): T => {
  return Object.fromEntries(Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined)) as T;
};
