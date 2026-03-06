// POST /api/admin/books example: {"title":"The 4-Hour Workweek","author":"Tim Ferriss","category":"business","status":"reading","summary":"Book about leverage, systems, and freedom.","personal_notes":"Strong impact on my way of thinking.","featured":true}
import { createBook, listBooks, removeBook, updateBook } from '@/src/lib/admin/books';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { bookCreateSchema, bookUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listBooks());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = bookCreateSchema.parse(await req.json());
    return jsonSuccess(await createBook(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = bookUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateBook(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeBook(id));
  } catch (error) {
    return jsonError(error);
  }
}
