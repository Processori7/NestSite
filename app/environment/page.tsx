'use client';

import React, { useState, useEffect } from 'react';
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
      <h1 className="text-3xl font-bold mb-6">Окружение</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Параметры окружающей среды за последние 24 часа</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={environmentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTime}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  let unit = '';
                  if (name === 'temperature') unit = '°C';
                  else if (name === 'humidity') unit = '%';
                  else if (name === 'co2') unit = 'ppm';
                  return [`${value} ${unit}`, name === 'temperature' ? 'Температура' : name === 'humidity' ? 'Влажность' : 'CO2'];
                }}
                labelFormatter={(label) => `Время: ${formatTime(label)}`}
              />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#3b82f6" activeDot={{ r: 8 }} name="Температура" />
              <Line type="monotone" dataKey="humidity" stroke="#ef4444" name="Влажность" />
              <Line type="monotone" dataKey="co2" stroke="#10b981" name="CO2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPage;