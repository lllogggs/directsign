import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();
  return NextResponse.json({
    ok: true,
    signed_at: new Date().toISOString(),
    signature_data: {
      ...payload,
      ip: req.headers.get('x-forwarded-for') ?? '127.0.0.1'
    }
  });
}
