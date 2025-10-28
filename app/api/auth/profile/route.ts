import { NextRequest } from 'next/server';
import { verifyToken, findUserById } from '@/lib/auth';
import { getAuthCookieFromRequest } from '@/lib/cookies';

export async function GET(request: NextRequest) {
  // Проверка токена из заголовков
  let token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  // Если токен не найден в заголовке, пробуем получить его из куки
  if (!token) {
    const cookieToken = getAuthCookieFromRequest(request);
    if (cookieToken) {
      token = cookieToken;
    }
  }
  
  if (!token) {
    return Response.json({ error: 'Токен не предоставлен' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return Response.json({ error: 'Невалидный токен' }, { status: 401 });
  }

  // Найти пользователя по ID из токена
  const user = findUserById(payload.userId as string);
  if (!user) {
    return Response.json({ error: 'Пользователь не найден' }, { status: 404 });
  }

  // Возвращаем информацию о пользователе (без пароля)
  const { password: _, ...userWithoutPassword } = user;
  return Response.json({ user: userWithoutPassword });
}