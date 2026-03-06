import { z } from 'zod';
import { createAudioItem, listAudioItems, removeAudioItem, updateAudioItem } from '@/src/lib/admin/audio';
import { createBlogPost, listBlogPosts, removeBlogPost, updateBlogPost } from '@/src/lib/admin/blog';
import { createBook, listBooks, removeBook, updateBook } from '@/src/lib/admin/books';
import { createCertification, listCertifications, removeCertification, updateCertification } from '@/src/lib/admin/certifications';
import { jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { createProject, listProjects, removeProject, updateProject } from '@/src/lib/admin/projects';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import {
  audioItemCreateSchema,
  audioItemUpdateSchema,
  blogPostCreateSchema,
  blogPostUpdateSchema,
  bookCreateSchema,
  bookUpdateSchema,
  certificationCreateSchema,
  certificationUpdateSchema,
  projectCreateSchema,
  projectUpdateSchema,
  skillCreateSchema,
  skillUpdateSchema,
  travelEntryCreateSchema,
  travelEntryUpdateSchema,
  workExperienceCreateSchema,
  workExperienceUpdateSchema,
} from '@/src/lib/admin/schemas';
import { createSkill, listSkills, removeSkill, updateSkill } from '@/src/lib/admin/skills';
import { createTravel, listTravels, removeTravel, updateTravel } from '@/src/lib/admin/travels';
import { createWorkExperience, listWorkExperiences, removeWorkExperience, updateWorkExperience } from '@/src/lib/admin/work';

const ingestSchema = z
  .object({
    entity: z.enum(['book', 'blog', 'audio', 'travel', 'project', 'work', 'certification', 'skill']),
    action: z.enum(['create', 'update', 'delete', 'list']),
    payload: z.record(z.any()).optional().default({}),
  })
  .strict();

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const { entity, action, payload } = ingestSchema.parse(await req.json());

    if (entity === 'book') {
      if (action === 'list') return jsonSuccess(await listBooks());
      if (action === 'create') return jsonSuccess(await createBook(bookCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateBook(z.string().uuid().parse(payload.id), bookUpdateSchema.parse(payload)));
      return jsonSuccess(await removeBook(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'blog') {
      if (action === 'list') return jsonSuccess(await listBlogPosts());
      if (action === 'create') return jsonSuccess(await createBlogPost(blogPostCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateBlogPost(z.string().uuid().parse(payload.id), blogPostUpdateSchema.parse(payload)));
      return jsonSuccess(await removeBlogPost(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'audio') {
      if (action === 'list') return jsonSuccess(await listAudioItems());
      if (action === 'create') return jsonSuccess(await createAudioItem(audioItemCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateAudioItem(z.string().uuid().parse(payload.id), audioItemUpdateSchema.parse(payload)));
      return jsonSuccess(await removeAudioItem(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'travel') {
      if (action === 'list') return jsonSuccess(await listTravels());
      if (action === 'create') return jsonSuccess(await createTravel(travelEntryCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateTravel(z.string().uuid().parse(payload.id), travelEntryUpdateSchema.parse(payload)));
      return jsonSuccess(await removeTravel(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'project') {
      if (action === 'list') return jsonSuccess(await listProjects());
      if (action === 'create') return jsonSuccess(await createProject(projectCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateProject(z.string().uuid().parse(payload.id), projectUpdateSchema.parse(payload)));
      return jsonSuccess(await removeProject(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'work') {
      if (action === 'list') return jsonSuccess(await listWorkExperiences());
      if (action === 'create') return jsonSuccess(await createWorkExperience(workExperienceCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateWorkExperience(z.string().uuid().parse(payload.id), workExperienceUpdateSchema.parse(payload)));
      return jsonSuccess(await removeWorkExperience(z.string().uuid().parse(payload.id)));
    }

    if (entity === 'certification') {
      if (action === 'list') return jsonSuccess(await listCertifications());
      if (action === 'create') return jsonSuccess(await createCertification(certificationCreateSchema.parse(payload)), 201);
      if (action === 'update') return jsonSuccess(await updateCertification(z.string().uuid().parse(payload.id), certificationUpdateSchema.parse(payload)));
      return jsonSuccess(await removeCertification(z.string().uuid().parse(payload.id)));
    }

    if (action === 'list') return jsonSuccess(await listSkills());
    if (action === 'create') return jsonSuccess(await createSkill(skillCreateSchema.parse(payload)), 201);
    if (action === 'update') return jsonSuccess(await updateSkill(z.string().uuid().parse(payload.id), skillUpdateSchema.parse(payload)));
    return jsonSuccess(await removeSkill(z.string().uuid().parse(payload.id)));
  } catch (error) {
    return jsonError(error);
  }
}
