import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../../../lib/auth';
import { environment } from "../../../environment";

export async function POST(req: NextRequest) {
  const jwtSecret = environment.JWT_ACCESS_SECRET;
  const jwtRefSecret = environment.JWT_REFRESH_SECRET;

  if (!jwtSecret || !jwtRefSecret) {
    console.error('JWT secrets not defined in environment');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  try {
    await dbConnect();

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const { username, password , remember } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ username });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = signAccessToken({ id: user }, jwtSecret);

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role
      },
      accessToken
    });

    // Set HttpOnly cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours in milliseconds
      path: '/'
    });

    if(remember === 'on') {
      const refreshToken = signRefreshToken({ id: user }, jwtRefSecret);
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
    }

    return response;

  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
