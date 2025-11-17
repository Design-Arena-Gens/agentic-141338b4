import { NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/gmail';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  try {
    const tokens = await exchangeCodeForTokens(code);
    // Display refresh token so user can store it in env
    return NextResponse.json({ tokens });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Auth error' }, { status: 500 });
  }
}
