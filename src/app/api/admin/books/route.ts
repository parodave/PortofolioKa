import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  author: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  status: z.enum(['to_read', 'reading', 'completed', 'paused', 'dropped']).optional(),
  summary: z.string().optional().nullable(),
  featured: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","title":"Atomic Habits","slug":"atomic-habits"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('books').select('*').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('books').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('books').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('books').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
