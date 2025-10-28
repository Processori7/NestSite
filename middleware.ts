import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthCookieFromRequest } from '@/lib/cookies';

export async function middleware(request: NextRequest) {
  
  // Пути, которые не требуют аутентификации
  const publicPaths = ['/login', '/register', '/api/auth/login', '/api/auth/register'];
  
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname === path ||
    request.nextUrl.pathname.startsWith(path + '/')
  );
  
  // Получение токена из заголовков
  let token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  // Если токен не найден в заголовке, пробуем получить его из куки
  if (!token) {
    const cookieToken = getAuthCookieFromRequest(request);
    if (cookieToken) {
      token = cookieToken;
    }
  }
  
  // Если путь публичный, разрешаем доступ
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Если токен не предоставлен, перенаправляем на страницу входа
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Проверяем валидность токена
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Если токен действителен, разрешаем доступ
 return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Сопоставляем все пути, кроме тех, которые начинаются с api, _next/static, _next/image, favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}