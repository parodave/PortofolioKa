import { createSkill, listSkills, removeSkill, updateSkill } from '@/src/lib/admin/skills';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { skillCreateSchema, skillUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listSkills());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = skillCreateSchema.parse(await req.json());
    return jsonSuccess(await createSkill(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = skillUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateSkill(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeSkill(id));
  } catch (error) {
    return jsonError(error);
  }
}
