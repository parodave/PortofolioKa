import { createWorkExperience, listWorkExperiences, removeWorkExperience, updateWorkExperience } from '@/src/lib/admin/work';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { workExperienceCreateSchema, workExperienceUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listWorkExperiences());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = workExperienceCreateSchema.parse(await req.json());
    return jsonSuccess(await createWorkExperience(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = workExperienceUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateWorkExperience(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeWorkExperience(id));
  } catch (error) {
    return jsonError(error);
  }
}
