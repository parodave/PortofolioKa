import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  project_type: z.string().nullable().optional(),
  status: z.enum(['draft', 'active', 'completed', 'archived', 'published']).optional(),
  short_summary: z.string().nullable().optional(),
  full_description: z.string().nullable().optional(),
  stack: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","name":"KR Global Solutions LTD","slug":"kr-global-solutions-ltd"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('projects').select('*').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('projects').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('projects').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('projects').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
