import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  source_type: z.enum(['blog_post', 'manual', 'podcast', 'other']),
  source_blog_id: z.string().uuid().nullable().optional(),
  audio_url: z.string().url().nullable().optional(),
  provider: z.string().nullable().optional(),
  voice_name: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  status: z.enum(['draft', 'processing', 'published', 'archived']).optional(),
  featured: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","title":"Audio","slug":"audio","source_type":"manual"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('audio_items').select('*').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('audio_items').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('audio_items').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('audio_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
