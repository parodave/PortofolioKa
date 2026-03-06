-- Portfolio full schema for Karim Hammouche
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text,
  short_bio text,
  long_bio text,
  nationalities jsonb not null default '[]'::jsonb,
  base_country text,
  public_email text,
  public_whatsapp text,
  website_url text,
  cv_url text,
  profile_image_url text,
  availability_status text not null default 'open',
  languages jsonb not null default '[]'::jsonb,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_availability_status_chk check (availability_status in ('open','limited','unavailable')),
  constraint profile_nationalities_array_chk check (jsonb_typeof(nationalities) = 'array'),
  constraint profile_languages_array_chk check (jsonb_typeof(languages) = 'array')
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  type text not null,
  label text,
  value text not null,
  is_primary boolean not null default false,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contacts_type_chk check (type in ('email','phone','whatsapp','telegram','linkedin','address','business','other'))
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  platform text not null,
  label text,
  url text not null,
  icon text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  name text not null,
  slug text not null unique,
  category text,
  level text,
  years_experience numeric(4,1),
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint skills_years_experience_chk check (years_experience is null or years_experience >= 0)
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  name text not null,
  slug text not null unique,
  issuer text,
  issue_date date,
  expiry_date date,
  credential_id text,
  credential_url text,
  status text not null default 'active',
  category text,
  notes text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint certifications_status_chk check (status in ('active','expired','in_progress','revoked')),
  constraint certifications_expiry_after_issue_chk check (expiry_date is null or issue_date is null or expiry_date >= issue_date)
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  school text not null,
  program text,
  degree text,
  location text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  description text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint education_end_after_start_chk check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  company text not null,
  slug text not null unique,
  role text not null,
  location text,
  country text,
  employment_type text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  short_summary text,
  full_description text,
  responsibilities jsonb not null default '[]'::jsonb,
  achievements jsonb not null default '[]'::jsonb,
  skills_used jsonb not null default '[]'::jsonb,
  company_url text,
  cover_image_url text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint work_end_after_start_chk check (end_date is null or start_date is null or end_date >= start_date),
  constraint work_json_arrays_chk check (
    jsonb_typeof(responsibilities) = 'array' and
    jsonb_typeof(achievements) = 'array' and
    jsonb_typeof(skills_used) = 'array'
  )
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  name text not null,
  slug text not null unique,
  project_type text,
  status text not null default 'draft',
  start_date date,
  end_date date,
  short_summary text,
  full_description text,
  country text,
  industry text,
  stack jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  website_url text,
  repo_url text,
  demo_url text,
  cover_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_status_chk check (status in ('draft','active','completed','archived','published')),
  constraint projects_end_after_start_chk check (end_date is null or start_date is null or end_date >= start_date),
  constraint projects_json_arrays_chk check (
    jsonb_typeof(stack) = 'array' and
    jsonb_typeof(tags) = 'array' and
    jsonb_typeof(gallery) = 'array'
  )
);

create table if not exists public.project_links (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  url text not null,
  link_type text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_links_type_chk check (link_type is null or link_type in ('website','repo','demo','video','article','other'))
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  category_id uuid references public.blog_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content_md text,
  content_html text,
  cover_image_url text,
  status text not null default 'draft',
  published boolean not null default false,
  published_at timestamptz,
  reading_time_minutes int,
  language text not null default 'en',
  seo_title text,
  seo_description text,
  featured boolean not null default false,
  author_name text,
  allow_audio boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_status_chk check (status in ('draft','scheduled','published','archived')),
  constraint blog_posts_reading_time_chk check (reading_time_minutes is null or reading_time_minutes > 0)
);

create table if not exists public.blog_post_tags (
  id uuid primary key default gen_random_uuid(),
  blog_post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_post_tags_unique unique (blog_post_id, tag_id)
);

create table if not exists public.audio_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  title text not null,
  slug text not null unique,
  source_type text not null,
  source_blog_id uuid references public.blog_posts(id) on delete set null,
  audio_url text,
  provider text,
  voice_name text,
  language text,
  duration_seconds int,
  transcript_md text,
  cover_image_url text,
  status text not null default 'draft',
  published_at timestamptz,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audio_items_status_chk check (status in ('draft','processing','published','archived')),
  constraint audio_items_source_chk check (source_type in ('blog_post','manual','podcast','other')),
  constraint audio_items_duration_chk check (duration_seconds is null or duration_seconds >= 0)
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  title text not null,
  slug text not null unique,
  author text,
  category text,
  status text not null default 'to_read',
  rating numeric(2,1),
  summary text,
  personal_notes text,
  cover_image_url text,
  started_at date,
  finished_at date,
  language text,
  featured boolean not null default false,
  source_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint books_status_chk check (status in ('to_read','reading','completed','paused','dropped')),
  constraint books_rating_chk check (rating is null or (rating >= 0 and rating <= 5)),
  constraint books_finished_after_started_chk check (finished_at is null or started_at is null or finished_at >= started_at)
);

create table if not exists public.travel_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  country text not null,
  city text,
  slug text not null unique,
  start_date date,
  end_date date,
  summary text,
  notes_md text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  travel_type text,
  featured boolean not null default false,
  cover_image_url text,
  status text not null default 'visited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint travel_entries_status_chk check (status in ('planned','visited','wishlist')),
  constraint travel_entries_end_after_start_chk check (end_date is null or start_date is null or end_date >= start_date),
  constraint travel_entries_lat_chk check (latitude is null or (latitude >= -90 and latitude <= 90)),
  constraint travel_entries_lng_chk check (longitude is null or (longitude >= -180 and longitude <= 180))
);

create table if not exists public.travel_media (
  id uuid primary key default gen_random_uuid(),
  travel_entry_id uuid not null references public.travel_entries(id) on delete cascade,
  media_type text not null,
  url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint travel_media_type_chk check (media_type in ('image','video','audio','link'))
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  title text,
  file_url text not null,
  file_type text,
  alt_text text,
  width int,
  height int,
  related_table text,
  related_id uuid,
  storage_bucket text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_dimensions_chk check ((width is null or width > 0) and (height is null or height > 0))
);

create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  title text not null,
  event_date date,
  event_type text,
  summary text,
  related_table text,
  related_id uuid,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quotes_or_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  type text not null,
  title text,
  content text not null,
  language text not null default 'en',
  source_context text,
  published_at timestamptz,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quotes_or_notes_type_chk check (type in ('quote','note','reflection','snippet'))
);

create table if not exists public.copilot_knowledge_overrides (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profile(id) on delete cascade,
  key text not null unique,
  title text,
  content text not null,
  priority int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_contacts_profile_id on public.contacts(profile_id);
create index if not exists idx_contacts_public on public.contacts(is_public);
create index if not exists idx_contacts_type on public.contacts(type);
create index if not exists idx_social_links_profile_id on public.social_links(profile_id);
create index if not exists idx_social_links_public on public.social_links(is_public);
create index if not exists idx_skills_profile_id on public.skills(profile_id);
create index if not exists idx_skills_featured on public.skills(featured);
create index if not exists idx_certifications_profile_id on public.certifications(profile_id);
create index if not exists idx_certifications_featured on public.certifications(featured);
create index if not exists idx_certifications_status on public.certifications(status);
create index if not exists idx_education_profile_id on public.education(profile_id);
create index if not exists idx_education_public on public.education(is_public);
create index if not exists idx_work_profile_id on public.work_experiences(profile_id);
create index if not exists idx_work_featured on public.work_experiences(featured);
create index if not exists idx_work_dates on public.work_experiences(start_date desc, end_date desc);
create index if not exists idx_projects_profile_id on public.projects(profile_id);
create index if not exists idx_projects_featured on public.projects(featured);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_project_links_project_id on public.project_links(project_id);
create index if not exists idx_blog_posts_profile_id on public.blog_posts(profile_id);
create index if not exists idx_blog_posts_category_id on public.blog_posts(category_id);
create index if not exists idx_blog_posts_status on public.blog_posts(status);
create index if not exists idx_blog_posts_published on public.blog_posts(published);
create index if not exists idx_blog_posts_featured on public.blog_posts(featured);
create index if not exists idx_blog_posts_published_at on public.blog_posts(published_at desc);
create index if not exists idx_blog_post_tags_blog_post_id on public.blog_post_tags(blog_post_id);
create index if not exists idx_blog_post_tags_tag_id on public.blog_post_tags(tag_id);
create index if not exists idx_audio_items_profile_id on public.audio_items(profile_id);
create index if not exists idx_audio_items_status on public.audio_items(status);
create index if not exists idx_audio_items_source_blog_id on public.audio_items(source_blog_id);
create index if not exists idx_books_profile_id on public.books(profile_id);
create index if not exists idx_books_status on public.books(status);
create index if not exists idx_books_featured on public.books(featured);
create index if not exists idx_travel_entries_profile_id on public.travel_entries(profile_id);
create index if not exists idx_travel_entries_status on public.travel_entries(status);
create index if not exists idx_travel_entries_featured on public.travel_entries(featured);
create index if not exists idx_travel_entries_dates on public.travel_entries(start_date desc, end_date desc);
create index if not exists idx_travel_media_travel_entry_id on public.travel_media(travel_entry_id);
create index if not exists idx_media_assets_profile_id on public.media_assets(profile_id);
create index if not exists idx_media_assets_related on public.media_assets(related_table, related_id);
create index if not exists idx_media_assets_public on public.media_assets(is_public);
create index if not exists idx_timeline_events_profile_id on public.timeline_events(profile_id);
create index if not exists idx_timeline_events_date on public.timeline_events(event_date desc);
create index if not exists idx_timeline_events_featured on public.timeline_events(featured);
create index if not exists idx_quotes_or_notes_profile_id on public.quotes_or_notes(profile_id);
create index if not exists idx_quotes_or_notes_featured on public.quotes_or_notes(featured);
create index if not exists idx_copilot_overrides_profile_id on public.copilot_knowledge_overrides(profile_id);
create index if not exists idx_copilot_overrides_active_priority on public.copilot_knowledge_overrides(is_active, priority desc);

-- updated_at triggers
create trigger set_updated_at_profile before update on public.profile for each row execute function public.set_updated_at();
create trigger set_updated_at_contacts before update on public.contacts for each row execute function public.set_updated_at();
create trigger set_updated_at_social_links before update on public.social_links for each row execute function public.set_updated_at();
create trigger set_updated_at_skills before update on public.skills for each row execute function public.set_updated_at();
create trigger set_updated_at_certifications before update on public.certifications for each row execute function public.set_updated_at();
create trigger set_updated_at_education before update on public.education for each row execute function public.set_updated_at();
create trigger set_updated_at_work_experiences before update on public.work_experiences for each row execute function public.set_updated_at();
create trigger set_updated_at_projects before update on public.projects for each row execute function public.set_updated_at();
create trigger set_updated_at_project_links before update on public.project_links for each row execute function public.set_updated_at();
create trigger set_updated_at_blog_categories before update on public.blog_categories for each row execute function public.set_updated_at();
create trigger set_updated_at_blog_tags before update on public.blog_tags for each row execute function public.set_updated_at();
create trigger set_updated_at_blog_posts before update on public.blog_posts for each row execute function public.set_updated_at();
create trigger set_updated_at_blog_post_tags before update on public.blog_post_tags for each row execute function public.set_updated_at();
create trigger set_updated_at_audio_items before update on public.audio_items for each row execute function public.set_updated_at();
create trigger set_updated_at_books before update on public.books for each row execute function public.set_updated_at();
create trigger set_updated_at_travel_entries before update on public.travel_entries for each row execute function public.set_updated_at();
create trigger set_updated_at_travel_media before update on public.travel_media for each row execute function public.set_updated_at();
create trigger set_updated_at_media_assets before update on public.media_assets for each row execute function public.set_updated_at();
create trigger set_updated_at_timeline_events before update on public.timeline_events for each row execute function public.set_updated_at();
create trigger set_updated_at_quotes_or_notes before update on public.quotes_or_notes for each row execute function public.set_updated_at();
create trigger set_updated_at_copilot_knowledge_overrides before update on public.copilot_knowledge_overrides for each row execute function public.set_updated_at();

-- RLS
alter table public.profile enable row level security;
alter table public.contacts enable row level security;
alter table public.social_links enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.education enable row level security;
alter table public.work_experiences enable row level security;
alter table public.projects enable row level security;
alter table public.project_links enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.audio_items enable row level security;
alter table public.books enable row level security;
alter table public.travel_entries enable row level security;
alter table public.travel_media enable row level security;
alter table public.media_assets enable row level security;
alter table public.timeline_events enable row level security;
alter table public.quotes_or_notes enable row level security;
alter table public.copilot_knowledge_overrides enable row level security;

create policy profile_public_read on public.profile for select using (is_public = true);
create policy contacts_public_read on public.contacts for select using (is_public = true);
create policy social_links_public_read on public.social_links for select using (is_public = true);
create policy skills_public_read on public.skills for select using (true);
create policy certifications_public_read on public.certifications for select using (status in ('active','expired','in_progress'));
create policy education_public_read on public.education for select using (is_public = true);
create policy work_public_read on public.work_experiences for select using (true);
create policy projects_public_read on public.projects for select using (status in ('active','completed','published'));
create policy project_links_public_read on public.project_links for select using (
  exists (select 1 from public.projects p where p.id = project_id and p.status in ('active','completed','published'))
);
create policy blog_categories_public_read on public.blog_categories for select using (true);
create policy blog_tags_public_read on public.blog_tags for select using (true);
create policy blog_posts_public_read on public.blog_posts for select using (published = true or status = 'published');
create policy blog_post_tags_public_read on public.blog_post_tags for select using (
  exists (select 1 from public.blog_posts bp where bp.id = blog_post_id and (bp.published = true or bp.status = 'published'))
);
create policy audio_items_public_read on public.audio_items for select using (status = 'published');
create policy books_public_read on public.books for select using (featured = true or status = 'completed');
create policy travel_entries_public_read on public.travel_entries for select using (status in ('visited','planned'));
create policy travel_media_public_read on public.travel_media for select using (
  exists (select 1 from public.travel_entries te where te.id = travel_entry_id and te.status in ('visited','planned'))
);
create policy media_assets_public_read on public.media_assets for select using (is_public = true);
create policy timeline_events_public_read on public.timeline_events for select using (true);
create policy quotes_or_notes_public_read on public.quotes_or_notes for select using (published_at is not null);
create policy copilot_overrides_public_read on public.copilot_knowledge_overrides for select using (is_active = true);

-- Authenticated users (dashboard/admin) and service role can fully manage
create policy profile_auth_manage on public.profile for all to authenticated using (true) with check (true);
create policy contacts_auth_manage on public.contacts for all to authenticated using (true) with check (true);
create policy social_links_auth_manage on public.social_links for all to authenticated using (true) with check (true);
create policy skills_auth_manage on public.skills for all to authenticated using (true) with check (true);
create policy certifications_auth_manage on public.certifications for all to authenticated using (true) with check (true);
create policy education_auth_manage on public.education for all to authenticated using (true) with check (true);
create policy work_auth_manage on public.work_experiences for all to authenticated using (true) with check (true);
create policy projects_auth_manage on public.projects for all to authenticated using (true) with check (true);
create policy project_links_auth_manage on public.project_links for all to authenticated using (true) with check (true);
create policy blog_categories_auth_manage on public.blog_categories for all to authenticated using (true) with check (true);
create policy blog_tags_auth_manage on public.blog_tags for all to authenticated using (true) with check (true);
create policy blog_posts_auth_manage on public.blog_posts for all to authenticated using (true) with check (true);
create policy blog_post_tags_auth_manage on public.blog_post_tags for all to authenticated using (true) with check (true);
create policy audio_items_auth_manage on public.audio_items for all to authenticated using (true) with check (true);
create policy books_auth_manage on public.books for all to authenticated using (true) with check (true);
create policy travel_entries_auth_manage on public.travel_entries for all to authenticated using (true) with check (true);
create policy travel_media_auth_manage on public.travel_media for all to authenticated using (true) with check (true);
create policy media_assets_auth_manage on public.media_assets for all to authenticated using (true) with check (true);
create policy timeline_events_auth_manage on public.timeline_events for all to authenticated using (true) with check (true);
create policy quotes_or_notes_auth_manage on public.quotes_or_notes for all to authenticated using (true) with check (true);
create policy copilot_overrides_auth_manage on public.copilot_knowledge_overrides for all to authenticated using (true) with check (true);
