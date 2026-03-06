import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AdminAuthError } from '@/src/lib/admin/requireAdminToken';
import { AdminCrudError } from '@/src/lib/admin/common';

export const jsonSuccess = (data: unknown, status = 200) => NextResponse.json({ success: true, data }, { status });

export const jsonError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: 'Validation failed.',
          issues: error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  if (error instanceof AdminAuthError || error instanceof AdminCrudError) {
    return NextResponse.json({ success: false, data: null, error: error.message }, { status: error.status });
  }

  if (error instanceof Error) {
    return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: false, data: null, error: 'Unknown error.' }, { status: 500 });
};

export const getIdFromRequest = (req: Request): string => {
  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    throw new AdminCrudError('Missing id query parameter.', 400);
  }
  return id;
};
