import { NextResponse } from 'next/server';
import { getOAuthClient, processMailbox } from '@/lib/gmail';
import { getOpenAIDrafter } from '@/lib/openaiDraft';

function assertEnv() {
  const required = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);
}

export async function POST() {
  try {
    assertEnv();
    // validate auth works
    const auth = getOAuthClient();
    await auth.getAccessToken();

    const drafter = getOpenAIDrafter();
    const stats = await processMailbox({ openaiDraft: drafter });
    return NextResponse.json({ ok: true, message: `Checked ${stats.checked}. Replied ${stats.repliesSent}. Unsubscribed ${stats.unsubscribed}. Skipped ${stats.skipped}.` });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Run failed' }, { status: 500 });
  }
}

export async function GET() { // allow GET for cron
  return POST();
}
