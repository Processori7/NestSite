'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/theme-context'; // Импортируем контекст темы
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnvironmentDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
  co2: number;
}

const EnvironmentPage = () => {
  const [environmentData, setEnvironmentData] = useState<EnvironmentDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Получаем текущую тему

  useEffect(() => {
    const fetchEnvironmentHistory = async () => {
      try {
        const response = await fetch('/api/environment/history');
        if (!response.ok) {
          throw new Error('Не удалось загрузить исторические данные');
        }
        const data: EnvironmentDataPoint[] = await response.json();
        setEnvironmentData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Ошибка при загрузке исторических данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironmentHistory();
  }, []);

  // Форматирование метки времени для оси X
 const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-64">
        <div className="text-xl">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-64">
        <div className="text-xl text-red-50">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Окружение</h1>
      <div className={`p-6 rounded-lg shadow-md mb-8 ${theme === 'dark' ? 'bg-card' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Параметры окружающей среды за последние 24 часа</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={environmentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#d1d5db'} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTime}
                tick={{ fontSize: 12, fill: theme === 'dark' ? '#f9fafb' : '#111827' }}
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              />
              <YAxis
                tick={{ fill: theme === 'dark' ? '#f9fafb' : '#111827' }}
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              />
              <Tooltip
                contentStyle={theme === 'dark' ? {
                  backgroundColor: '#374151',
                  borderColor: '#4b5563',
                  color: '#f9fafb'
                } : {}}
                formatter={(value, name) => {
                  let unit = '';
                  if (name === 'temperature') unit = '°C';
                  else if (name === 'humidity') unit = '%';
                  else if (name === 'co2') unit = 'ppm';
                  return [`${value} ${unit}`, name === 'temperature' ? 'Температура' : name === 'humidity' ? 'Влажность' : 'CO2'];
                }}
                labelFormatter={(label) => `Время: ${formatTime(label)}`}
              />
              <Legend
                wrapperStyle={theme === 'dark' ? { color: '#f9fafb' } : {}}
              />
              <Line type="monotone" dataKey="temperature" stroke={theme === 'dark' ? '#60a5fa' : '#3b82f6'} activeDot={{ r: 8 }} name="Температура" />
              <Line type="monotone" dataKey="humidity" stroke={theme === 'dark' ? '#f87171' : '#ef4444'} name="Влажность" />
              <Line type="monotone" dataKey="co2" stroke={theme === 'dark' ? '#34d399' : '#10b981'} name="CO2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPage;