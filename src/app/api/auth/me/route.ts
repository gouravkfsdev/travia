import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, signAccessToken } from '../../../lib/auth';
import { environment } from "../../../environment";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const accessSecret = environment.JWT_ACCESS_SECRET!;
  const refreshSecret = environment.JWT_REFRESH_SECRET!;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
  const user = verifyAccessToken(accessToken, accessSecret);
  return NextResponse.json({ user, accessToken : 0 }, { status: 200 });
} catch (accessErr) {
  console.warn('Access token invalid, trying refresh token...');

  if (!refreshToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = verifyRefreshToken(refreshToken, refreshSecret);
    return NextResponse.json({ user, accessRefreshToken: 1 }, { status: 200 });
  } catch (refreshErr) {
    console.error('Error verifying refresh token:', refreshErr);
    return NextResponse.json({ error: 'Token expired or invalid' }, { status: 401 });
  }
}

}
