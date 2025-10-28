import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, signToken } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';

// База данных пользователей (в реальном приложении это будет заменено на базу данных)
const users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users']
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Проверка обязательных полей
    if (!email || !password) {
      return Response.json(
        { error: 'Email и пароль обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Поиск пользователя по email
    const user = users.find(u => u.email === email);
    if (!user) {
      return Response.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Проверка пароля
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Создание JWT токена
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Возвращаем токен и информацию о пользователе
    const { ...userWithoutPassword } = user;
    const response = NextResponse.json({
      token,
      user: userWithoutPassword
    });
    
    setAuthCookie(response, token);
    
    return response;
  } catch (error) {
    console.error('Ошибка входа:', error);
    return Response.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}