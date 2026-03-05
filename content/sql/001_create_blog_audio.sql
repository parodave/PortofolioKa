create extension if not exists pgcrypto;

create table if not exists public.blog_audio (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  content_hash text not null,
  voice_id text not null,
  audio_path text not null,
  audio_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_blog_audio_updated_at on public.blog_audio;

create trigger set_blog_audio_updated_at
before update on public.blog_audio
for each row
execute function public.set_updated_at();
