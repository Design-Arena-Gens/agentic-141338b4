import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/gmail';

export async function GET() {
  const hasCredentials = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const hasRefresh = Boolean(process.env.GMAIL_REFRESH_TOKEN);
  const authUrl = hasCredentials && !hasRefresh ? getAuthUrl() : null;
  return NextResponse.json({ hasCredentials: hasCredentials && hasRefresh, authUrl });
}
