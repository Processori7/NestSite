import { NextRequest } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { User } from '@/lib/auth';

// База данных пользователей (в реальном приложении это будет заменено на базу данных)
let users: User[] = [
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
    const { name, email, password } = await request.json();

    // Проверка обязательных полей
    if (!name || !email || !password) {
      return Response.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверка длины пароля
    if (password.length < 6) {
      return Response.json(
        { error: 'Пароль должен содержать не менее 6 символов' },
        { status: 400 }
      );
    }

    // Проверка, существует ли пользователь с таким email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return Response.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 409 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание нового пользователя
    const newUser: User = {
      id: Date.now().toString(), // В реальном приложении используйте UUID
      name,
      email,
      password: hashedPassword,
      role: 'user', // Назначаем роль по умолчанию
      permissions: ['read'] // Назначаем базовые разрешения
    };

    // Добавление пользователя в "базу данных"
    users.push(newUser);

    // Возвращаем успешный ответ без пароля
    const { password: _, ...userWithoutPassword } = newUser;
    return Response.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return Response.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}