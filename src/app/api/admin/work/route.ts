import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  company: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  employment_type: z.string().nullable().optional(),
  short_summary: z.string().nullable().optional(),
  full_description: z.string().nullable().optional(),
  featured: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","company":"Company","slug":"company","role":"Role"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('work_experiences').select('*').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('work_experiences').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('work_experiences').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('work_experiences').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
