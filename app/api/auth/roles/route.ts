import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, findUserById } from '@/lib/auth';
import { roles, getRoleById } from '@/lib/roles';
import { getAuthCookieFromRequest } from '@/lib/cookies'; // Импортируем новую функцию

// В реальном приложении пользователи будут храниться в базе данных
let users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users']
  }
];

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
    return NextResponse.json({ error: 'Токен не предоставлен' }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Невалидный токен' }, { status: 401 });
    }

    // Проверка, является ли пользователь администратором
    const user = findUserById(payload.userId as string);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Недостаточно прав для просмотра ролей' }, { status: 403 });
    }

    // Возвращаем все доступные роли
    return NextResponse.json({ roles });
  } catch (err) {
    return NextResponse.json({ error: 'Невалидный токен' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
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
    return NextResponse.json({ error: 'Токен не предоставлен' }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Невалидный токен' }, { status: 401 });
    }

    // Проверка, является ли пользователь администратором
    const user = findUserById(payload.userId as string);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Недостаточно прав для управления ролями' }, { status: 403 });
    }

    try {
      const { userId, roleId } = await request.json();

      // Проверка обязательных полей
      if (!userId || !roleId) {
        return NextResponse.json(
          { error: 'ID пользователя и ID роли обязательны' },
          { status: 400 }
        );
      }

      // Проверка существования роли
      const role = getRoleById(roleId);
      if (!role) {
        return NextResponse.json(
          { error: 'Роль не найдена' },
          { status: 404 }
        );
      }

      // Найти пользователя для обновления
      const userToUpdate = users.find(u => u.id === userId);
      if (!userToUpdate) {
        return NextResponse.json(
          { error: 'Пользователь не найден' },
          { status: 404 }
        );
      }

      // Обновить роль пользователя
      userToUpdate.role = roleId;
      userToUpdate.permissions = role.permissions;

      // Возвращаем обновленного пользователя
      const { password: _, ...userWithoutPassword } = userToUpdate;
      return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Ошибка обновления роли пользователя:', error);
      return NextResponse.json(
        { error: 'Внутренняя ошибка сервера' },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: 'Невалидный токен' }, { status: 401 });
  }
}