import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/src/lib/supabase/admin';

const schema = z.object({
  profile_id: z.string().uuid(),
  category_id: z.string().uuid().nullable().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  content_md: z.string().nullable().optional(),
  content_html: z.string().nullable().optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).optional(),
  published: z.boolean().optional(),
  published_at: z.string().datetime().nullable().optional(),
  featured: z.boolean().optional(),
  author_name: z.string().nullable().optional(),
  allow_audio: z.boolean().optional(),
});

// Payload example: {"profile_id":"uuid","title":"Post","slug":"post"}
export async function GET() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('blog_posts').select('*, blog_categories(*)').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('blog_posts').insert(input).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, ...payload } = z.object({ id: z.string().uuid() }).merge(schema.partial()).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from('blog_posts').update(payload).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const { id } = z.object({ id: z.string().uuid() }).parse(await req.json());
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('blog_posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
