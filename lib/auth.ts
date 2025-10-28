import { SignJWT, jwtVerify } from 'jose';
import { compare, hash } from 'bcryptjs';
import { UserWithRole, hasPermission } from './roles';

// Типы для пользователя
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

// База данных пользователей (в реальном приложении это будет заменено на базу данных)
const users: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users']
  }
];

// Функция для поиска пользователя по email
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// Функция для поиска пользователя по ID
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Функция для хеширования пароля
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

// Функция для проверки пароля
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

// Функция для создания JWT токена
export const signToken = async (payload: any): Promise<string> => {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_secret_key_for_development'
  );
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  return token;
};

// Функция для верификации JWT токена
export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback_secret_key_for_development'
    );
    
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    return null;
  }
};

// Функция для получения пользователя из токена
export const getUserFromToken = async (token: string | undefined) => {
  if (!token) return null;
  
  const payload = await verifyToken(token);
  if (!payload) return null;
  
  return findUserById(payload.userId as string);
};

// Функция для проверки разрешений пользователя
export const checkPermission = (user: User, permission: string): boolean => {
  return user.permissions.includes(permission);
};

// Асинхронная функция для проверки разрешений пользователя на основе ролей
export const checkPermissionByRole = async (user: UserWithRole, permission: string): Promise<boolean> => {
  return hasPermission(user, permission);
};