// POST /api/admin/travels example: {"country":"Indonesia","city":"Bali","start_date":"2018-01-10","end_date":"2018-01-25","summary":"First major trip outside Europe and North Africa.","notes_md":"This trip changed my mindset.","latitude":-8.4095,"longitude":115.1889,"featured":true}
import { createTravel, listTravels, removeTravel, updateTravel } from '@/src/lib/admin/travels';
import { getIdFromRequest, jsonError, jsonSuccess } from '@/src/lib/admin/http';
import { requireAdminToken } from '@/src/lib/admin/requireAdminToken';
import { travelEntryCreateSchema, travelEntryUpdateSchema } from '@/src/lib/admin/schemas';

export async function GET(req: Request) {
  try {
    requireAdminToken(req);
    return jsonSuccess(await listTravels());
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(req: Request) {
  try {
    requireAdminToken(req);
    const payload = travelEntryCreateSchema.parse(await req.json());
    return jsonSuccess(await createTravel(payload), 201);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    const payload = travelEntryUpdateSchema.parse(await req.json());
    return jsonSuccess(await updateTravel(id, payload));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdminToken(req);
    const id = getIdFromRequest(req);
    return jsonSuccess(await removeTravel(id));
  } catch (error) {
    return jsonError(error);
  }
}
