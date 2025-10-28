'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/theme-context'; // Импортируем контекст темы
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface EnvironmentDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
 co2: number;
}

export default function EnvironmentHistoryChart() {
  const [data, setData] = useState<EnvironmentDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Получаем текущую тему

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      try {
        const response = await fetch('/api/environment/history');
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        const fetchedData: EnvironmentDataPoint[] = await response.json();
        setData(fetchedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironmentData();
  }, []);

  if (loading) {
    return <div className="h-full w-full flex items-center justify-center">Загрузка...</div>;
  }

  if (error) {
    return <div className="h-full w-full flex items-center justify-center text-red-500">Ошибка: {error}</div>;
  }

  // Форматируем метки времени для оси X
  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }));

  // Определяем цвета в зависимости от темы
  const gridColor = theme === 'dark' ? '#374151' : '#d1d5db';
  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const textColor = theme === 'dark' ? '#f9fafb' : '#111827';
  const backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        style={{
          backgroundColor: backgroundColor,
          borderRadius: '4px'
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: textColor }}
          stroke={axisColor}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 12, fill: textColor }}
          stroke={axisColor}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12, fill: textColor }}
          stroke={axisColor}
        />
        <Tooltip
          contentStyle={theme === 'dark' ? {
            backgroundColor: '#374151',
            borderColor: '#4b5563',
            color: '#f9fafb'
          } : {}}
          formatter={(value, name) => {
            if (name === 'temperature') return [`${value} °C`, 'Температура'];
            if (name === 'humidity') return [`${value}%`, 'Влажность'];
            if (name === 'co2') return [`${value} ppm`, 'CO2'];
            return [value, name];
          }}
          labelFormatter={(label) => `Время: ${label}`}
        />
        <Legend
          wrapperStyle={theme === 'dark' ? { color: '#f9fafb' } : {}}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          name="Температура"
          stroke={theme === 'dark' ? '#f87171' : '#ef4444'}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="humidity"
          name="Влажность"
          stroke={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="co2"
          name="CO2"
          stroke={theme === 'dark' ? '#34d399' : '#10b981'}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
