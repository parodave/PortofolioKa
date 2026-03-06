import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, data: null, error: 'Ingest proxy is disabled in production.' }, { status: 403 });
    }

    const token = process.env.ADMIN_API_TOKEN;
    if (!token) {
      return NextResponse.json({ success: false, data: null, error: 'ADMIN_API_TOKEN is not configured.' }, { status: 500 });
    }

    const body = await req.text();
    const targetUrl = new URL('/api/admin/ingest', req.url);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-admin-token': token,
      },
      body,
      cache: 'no-store',
    });

    const json = await response.json();
    return NextResponse.json(json, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown proxy error.';
    return NextResponse.json({ success: false, data: null, error: message }, { status: 500 });
  }
}
