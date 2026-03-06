import { createProject, listProjects, removeProject, updateProject } from '@/src/lib/admin/projects';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { projectCreateSchema, projectUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listProjects());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = projectCreateSchema.parse(await req.json());
    return jsonSuccess(await createProject(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = projectUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateProject(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeProject(id));
  } catch (error) {
    return jsonError(error);
  }
}
