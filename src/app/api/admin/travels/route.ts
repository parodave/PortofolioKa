import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  country: z.string().min(1),
  city: z.string().nullable().optional(),
  slug: z.string().min(1),
  summary: z.string().nullable().optional(),
  notes_md: z.string().nullable().optional(),
  travel_type: z.string().nullable().optional(),
  status: z.enum(['planned', 'visited', 'wishlist']).optional(),
  featured: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","country":"France","slug":"france-trip"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('travel_entries').select('*, travel_media(*)').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('travel_entries').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('travel_entries').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('travel_entries').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
