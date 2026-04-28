import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { contractId } = await req.json();

  return NextResponse.json({
    ok: true,
    contractId,
    pdf_url: `https://storage.example.com/contracts/${contractId}.pdf`,
    email_dispatched: true
  });
}
