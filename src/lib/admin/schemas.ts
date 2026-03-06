import { z } from 'zod';

const uuidSchema = z.string().uuid();
const nullableString = z.string().trim().min(1).nullable().optional();
const nullableUrl = z.string().url().nullable().optional();
const dateSchema = z.string().date().nullable().optional();

const baseCreateSchema = z
  .object({
    profile_id: uuidSchema.optional(),
  })
  .strict();

export const bookCreateSchema = baseCreateSchema
  .extend({
    title: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    author: nullableString,
    category: nullableString,
    status: z.enum(['to_read', 'reading', 'completed', 'paused', 'dropped']).default('to_read'),
    rating: z.number().min(0).max(5).nullable().optional(),
    summary: nullableString,
    personal_notes: nullableString,
    cover_image_url: nullableUrl,
    started_at: dateSchema,
    finished_at: dateSchema,
    language: nullableString,
    featured: z.boolean().default(false),
    source_link: nullableUrl,
  })
  .strict();

export const bookUpdateSchema = bookCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const blogPostCreateSchema = baseCreateSchema
  .extend({
    category_id: uuidSchema.nullable().optional(),
    title: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    excerpt: nullableString,
    content_md: nullableString,
    content_html: nullableString,
    cover_image_url: nullableUrl,
    status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('draft'),
    published: z.boolean().optional(),
    published_at: z.string().datetime().nullable().optional(),
    reading_time_minutes: z.number().int().positive().nullable().optional(),
    language: z.string().trim().min(2).default('en'),
    seo_title: nullableString,
    seo_description: nullableString,
    featured: z.boolean().default(false),
    author_name: nullableString,
    allow_audio: z.boolean().default(true),
    tags: z.array(z.string().trim().min(1)).default([]),
  })
  .strict();

export const blogPostUpdateSchema = blogPostCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const audioItemCreateSchema = baseCreateSchema
  .extend({
    title: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    source_type: z.enum(['blog_post', 'manual', 'podcast', 'other']).default('manual'),
    source_blog_id: uuidSchema.nullable().optional(),
    audio_url: nullableUrl,
    provider: nullableString,
    voice_name: nullableString,
    language: nullableString,
    duration_seconds: z.number().int().nonnegative().nullable().optional(),
    transcript_md: nullableString,
    cover_image_url: nullableUrl,
    status: z.enum(['draft', 'processing', 'published', 'archived']).default('draft'),
    published_at: z.string().datetime().nullable().optional(),
    featured: z.boolean().default(false),
  })
  .strict();

export const audioItemUpdateSchema = audioItemCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const travelEntryCreateSchema = baseCreateSchema
  .extend({
    country: z.string().trim().min(1),
    city: nullableString,
    slug: z.string().trim().min(1).optional(),
    start_date: dateSchema,
    end_date: dateSchema,
    summary: nullableString,
    notes_md: nullableString,
    latitude: z.number().min(-90).max(90).nullable().optional(),
    longitude: z.number().min(-180).max(180).nullable().optional(),
    travel_type: nullableString,
    featured: z.boolean().default(false),
    cover_image_url: nullableUrl,
    status: z.enum(['planned', 'visited', 'wishlist']).default('visited'),
  })
  .strict();

export const travelEntryUpdateSchema = travelEntryCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const projectCreateSchema = baseCreateSchema
  .extend({
    name: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    project_type: nullableString,
    status: z.enum(['draft', 'active', 'completed', 'archived', 'published']).default('draft'),
    start_date: dateSchema,
    end_date: dateSchema,
    short_summary: nullableString,
    full_description: nullableString,
    country: nullableString,
    industry: nullableString,
    stack: z.array(z.string().trim().min(1)).default([]),
    tags: z.array(z.string().trim().min(1)).default([]),
    website_url: nullableUrl,
    repo_url: nullableUrl,
    demo_url: nullableUrl,
    cover_image_url: nullableUrl,
    gallery: z.array(z.string().url()).default([]),
    featured: z.boolean().default(false),
    sort_order: z.number().int().default(0),
  })
  .strict();

export const projectUpdateSchema = projectCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const workExperienceCreateSchema = baseCreateSchema
  .extend({
    company: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1),
    location: nullableString,
    country: nullableString,
    employment_type: nullableString,
    start_date: dateSchema,
    end_date: dateSchema,
    is_current: z.boolean().default(false),
    short_summary: nullableString,
    full_description: nullableString,
    responsibilities: z.array(z.string().trim().min(1)).default([]),
    achievements: z.array(z.string().trim().min(1)).default([]),
    skills_used: z.array(z.string().trim().min(1)).default([]),
    company_url: nullableUrl,
    cover_image_url: nullableUrl,
    featured: z.boolean().default(false),
    sort_order: z.number().int().default(0),
  })
  .strict();

export const workExperienceUpdateSchema = workExperienceCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const certificationCreateSchema = baseCreateSchema
  .extend({
    name: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    issuer: nullableString,
    issue_date: dateSchema,
    expiry_date: dateSchema,
    credential_id: nullableString,
    credential_url: nullableUrl,
    status: z.enum(['active', 'expired', 'in_progress', 'revoked']).default('active'),
    category: nullableString,
    notes: nullableString,
    featured: z.boolean().default(false),
  })
  .strict();

export const certificationUpdateSchema = certificationCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export const skillCreateSchema = baseCreateSchema
  .extend({
    name: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    category: nullableString,
    level: nullableString,
    years_experience: z.number().nonnegative().nullable().optional(),
    featured: z.boolean().default(false),
    sort_order: z.number().int().default(0),
  })
  .strict();

export const skillUpdateSchema = skillCreateSchema.partial().strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required for update.',
});

export type BookCreateInput = z.infer<typeof bookCreateSchema>;
export type BookUpdateInput = z.infer<typeof bookUpdateSchema>;
export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
export type AudioItemCreateInput = z.infer<typeof audioItemCreateSchema>;
export type AudioItemUpdateInput = z.infer<typeof audioItemUpdateSchema>;
export type TravelEntryCreateInput = z.infer<typeof travelEntryCreateSchema>;
export type TravelEntryUpdateInput = z.infer<typeof travelEntryUpdateSchema>;
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type WorkExperienceCreateInput = z.infer<typeof workExperienceCreateSchema>;
export type WorkExperienceUpdateInput = z.infer<typeof workExperienceUpdateSchema>;
export type CertificationCreateInput = z.infer<typeof certificationCreateSchema>;
export type CertificationUpdateInput = z.infer<typeof certificationUpdateSchema>;
export type SkillCreateInput = z.infer<typeof skillCreateSchema>;
export type SkillUpdateInput = z.infer<typeof skillUpdateSchema>;
