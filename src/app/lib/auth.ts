import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function signAccessToken(payload: object, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: '30m' });
}

export function signRefreshToken(payload: object, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: '30d' });
}

export function verifyAccessToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}

export function verifyRefreshToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}
