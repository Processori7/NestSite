'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserProfile from '@/components/user-profile';
import UserRoleManagement from '@/components/user-role-management';

export default function TestAuthPage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Получение токена из localStorage (в реальном приложении он будет установлен после входа)
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError('Токен аутентификации не найден. Пожалуйста, войдите в систему.');
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Тестирование системы аутентификации</h1>
      
      {error && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-red-500">{error}</p>
            <p className="mt-2">
              <a href="/login" className="text-blue-500 hover:underline">
                Перейти на страницу входа
              </a>
            </p>
          </CardContent>
        </Card>
      )}
      
      {token && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <UserProfile token={token} />
          </div>
          <div>
            <UserRoleManagement token={token} />
          </div>
        </div>
      )}
    </div>
  );
}