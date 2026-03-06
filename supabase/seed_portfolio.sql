with upsert_profile as (
  insert into public.profile (
    full_name, headline, short_bio, long_bio, nationalities, base_country,
    public_email, website_url, cv_url, availability_status, languages, is_public
  ) values (
    'Karim Hammouche',
    'Maintenance, Operations & Digital Systems Professional',
    'Portfolio profile for Karim Hammouche.',
    'Karim Hammouche combines industrial maintenance experience with digital systems, automation, and product execution.',
    '["Algerian", "French"]'::jsonb,
    'France',
    'contact@karimhammouche.com',
    'https://karimhammouche.com',
    '/cv/Karim_Hammouche_CV_EN.pdf',
    'open',
    '["French", "English", "Arabic"]'::jsonb,
    true
  )
  on conflict do nothing
  returning id
),
resolved_profile as (
  select id from upsert_profile
  union all
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.contacts (profile_id, type, label, value, is_primary, is_public, sort_order)
select id, 'email', 'Public Email', 'contact@karimhammouche.com', true, true, 0 from resolved_profile
on conflict do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.social_links (profile_id, platform, label, url, icon, is_public, sort_order)
select id, 'github', 'GitHub', 'https://github.com/', 'github', true, 1 from profile_ref
union all
select id, 'linkedin', 'LinkedIn', 'https://linkedin.com/', 'linkedin', true, 2 from profile_ref
on conflict do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.skills (profile_id, name, slug, category, featured, sort_order)
select id, skill_name, skill_slug, skill_category, skill_featured, ord
from profile_ref,
unnest(array[
  'technical maintenance','electrical maintenance','preventive & corrective maintenance','troubleshooting','industrial safety','field operations','operations coordination','team management','workflow organization','task prioritization','decision making under pressure','Supabase','API integration','GitHub','Shopify','AI tools','automation tools','project management','process optimization','digital systems integration','e-commerce','digital marketing','SEO','prompt engineering'
]) with ordinality as s(skill_name, ord)
join lateral (
  select
    lower(replace(replace(replace(skill_name, '&', 'and'), ' ', '-'), '’', '')) as skill_slug,
    case when ord <= 11 then 'operations' else 'digital' end as skill_category,
    ord <= 8 as skill_featured
) meta on true
on conflict (slug) do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.projects (profile_id, name, slug, project_type, status, short_summary, featured, sort_order)
select id, name, slug, 'venture', 'published', 'Placeholder summary for portfolio project.', featured, sort_order
from profile_ref,
(values
  ('KR Global Solutions LTD','kr-global-solutions-ltd', true, 1),
  ('The Hand DAO','the-hand-dao', true, 2),
  ('FelizBella Cosmetics','felizbella-cosmetics', true, 3),
  ('KHH Global Projects','khh-global-projects', true, 4),
  ('Domaine Harrach','domaine-harrach', false, 5),
  ('TLFH','tlfh', false, 6),
  ('Wash Center','wash-center', false, 7),
  ('Turfu Driving','turfu-driving', false, 8),
  ('0’240 Fast-Food','0240-fast-food', false, 9)
) as p(name, slug, featured, sort_order)
on conflict (slug) do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.work_experiences (
  profile_id, company, slug, role, location, country, employment_type,
  start_date, short_summary, full_description, responsibilities, achievements, skills_used,
  featured, sort_order
)
select id, company, slug, role, 'TBD', 'TBD', 'full_time', date '2020-01-01',
  'Placeholder summary pending validated CV details.',
  'Placeholder description pending full experience details.',
  '["Details to be added"]'::jsonb,
  '["Details to be added"]'::jsonb,
  '["operations", "maintenance"]'::jsonb,
  featured,
  sort_order
from profile_ref,
(values
  ('Industrial Operations Company','industrial-operations-company','Operations Coordinator', true, 1),
  ('Maintenance Services Group','maintenance-services-group','Maintenance Technician', false, 2)
) as w(company, slug, role, featured, sort_order)
on conflict (slug) do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.education (
  profile_id, school, program, degree, location, start_date, end_date, is_current, description, is_public, sort_order
)
select id, school, program, degree, location, start_date, end_date, false,
  'Placeholder education entry awaiting exact transcript details.', true, sort_order
from profile_ref,
(values
  ('Lycée Léonard de Vinci','Technical Studies','Technical Diploma','France', date '2012-09-01', date '2015-06-30',1),
  ('Le Wagon','Web Development Bootcamp','Certificate','France', date '2023-01-01', date '2023-03-30',2)
) as e(school, program, degree, location, start_date, end_date, sort_order)
on conflict do nothing;

insert into public.blog_categories (name, slug, description)
values
  ('Career', 'career', 'Professional updates and work insights.'),
  ('Projects', 'projects', 'Project and venture updates.'),
  ('Automation', 'automation', 'Systems, AI, and workflow automation insights.'),
  ('Travel', 'travel', 'Travel reflections and location notes.')
on conflict (slug) do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.travel_entries (
  profile_id, country, city, slug, start_date, summary, notes_md, travel_type, featured, status
)
select id, country, city, slug, date '2024-01-01',
  'Placeholder travel summary.',
  'Detailed travel notes will be added from verified records.',
  'business',
  featured,
  'visited'
from profile_ref,
(values
  ('France','Paris','travel-france-paris', true),
  ('Thailand','Phuket','travel-thailand-phuket', false),
  ('Algeria','Algiers','travel-algeria-algiers', false)
) as t(country, city, slug, featured)
on conflict (slug) do nothing;

with profile_ref as (
  select id from public.profile where full_name = 'Karim Hammouche' limit 1
)
insert into public.certifications (
  profile_id, name, slug, issuer, status, category, notes, featured
)
select id, name, slug, issuer, 'in_progress', category,
  'Placeholder certification entry pending official document details.', featured
from profile_ref,
(values
  ('Industrial Safety Certification','industrial-safety-certification','TBD Issuer','Safety', true),
  ('Automation Systems Certification','automation-systems-certification','TBD Issuer','Automation', false),
  ('Digital Marketing Certification','digital-marketing-certification','TBD Issuer','Marketing', false)
) as c(name, slug, issuer, category, featured)
on conflict (slug) do nothing;
