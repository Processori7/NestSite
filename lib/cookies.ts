import { NextRequest, NextResponse } from 'next/server';

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 день
    path: '/',
  });
}

export function deleteAuthCookie(response: NextResponse) {
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}

export function getAuthCookieFromRequest(request: NextRequest): string | undefined {
  return request.cookies.get('auth_token')?.value;
}