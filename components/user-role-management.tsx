'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserWithRole } from '@/lib/roles';
import { api } from '@/lib/api';

interface UserRoleManagementProps {
  token: string;
}

export default function UserRoleManagement({ token }: UserRoleManagementProps) {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<{id: string, name: string}[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Загрузка пользователей и ролей
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение ролей
        const rolesData = await api.get<{roles: {id: string, name: string}[]}>('/auth/roles');
        setRoles(rolesData.roles);
        
        // В реальном приложении здесь должен быть вызов для получения пользователей
        // Пока используем заглушку
        setUsers([
          { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', permissions: [] },
          { id: '2', name: 'Operator User', email: 'operator@example.com', role: 'operator', permissions: [] },
          { id: '3', name: 'Agronom User', email: 'agronom@example.com', role: 'agronom', permissions: [] }
        ]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleRoleChange = async () => {
    if (!selectedUserId || !selectedRole) {
      setError('Пожалуйста, выберите пользователя и роль');
      return;
    }

    try {
      await api.post<{success: boolean, error?: string}>('/auth/roles', {
        userId: selectedUserId,
        roleId: selectedRole
      });

      // Обновление состояния пользователей
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUserId
            ? { ...user, role: selectedRole }
            : user
        )
      );
      
      setError('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка подключения к серверу');
    }
  };

  if (loading) {
    return <div className="p-4">Загрузка...</div>;
  }

 return (
    <Card>
      <CardHeader>
        <CardTitle>Управление ролями пользователей</CardTitle>
        <CardDescription>Назначьте роли пользователям системы</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-select">Пользователь</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger id="user-select">
                  <SelectValue placeholder="Выберите пользователя" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-select">Новая роль</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role-select">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleRoleChange} disabled={!selectedUserId || !selectedRole}>
              Назначить роль
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Список пользователей</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.map(user => (
                <div key={user.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {roles.find(r => r.id === user.role)?.name || user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}