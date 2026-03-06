import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/src/lib/database.types';

export const createSupabaseBrowserClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
