import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken) as { id: string };
    const accessToken = signAccessToken({ id: payload.id });
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}