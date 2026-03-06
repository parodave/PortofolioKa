// POST /api/admin/blog example: {"title":"How AI changed my vision of entrepreneurship","excerpt":"Why AI made my old ideas suddenly executable.","content_md":"# Title\n\nArticle content...","status":"draft","language":"en","featured":true}
import { createBlogPost, listBlogPosts, removeBlogPost, updateBlogPost } from '@/src/lib/admin/blog';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { blogPostCreateSchema, blogPostUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listBlogPosts());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = blogPostCreateSchema.parse(await req.json());
    return jsonSuccess(await createBlogPost(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = blogPostUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateBlogPost(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeBlogPost(id));
  } catch (error) {
    return jsonError(error);
  }
}
