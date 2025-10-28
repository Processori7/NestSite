'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
 const [username, setUsername] = useState('');

  // Загружаем настройки при инициализации страницы
 useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          setNotificationsEnabled(settings.notificationsEnabled);
          setUsername(settings.username);
        } else {
          console.error('Failed to load settings');
          toast.error('Не удалось загрузить настройки');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error('Не удалось загрузить настройки');
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationsEnabled,
          username,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Настройки сохранены:', result.settings);
        toast.success('Настройки успешно сохранены');
      } else {
        console.error('Failed to save settings');
        toast.error('Не удалось сохранить настройки');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Произошла ошибка при сохранении настроек');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      
      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Уведомления</h3>
            <p className="text-sm text-gray-500">Включить уведомления</p>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Имя пользователя
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя"
          />
        </div>

        <Button onClick={handleSave} className="mt-4">
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;