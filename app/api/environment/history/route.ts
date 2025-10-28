import { NextResponse } from 'next/server';

interface EnvironmentDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
 co2: number;
}

export async function GET() {
  try {
    // Генерируем данные за последние 24 часа с интервалом 1 час
    const now = new Date();
    const data: EnvironmentDataPoint[] = [];

    // Создаем 24 точки данных за последние 24 часа
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now);
      timestamp.setHours(timestamp.getHours() - i);
      
      // Генерируем случайные данные с реалистичными диапазонами
      const temperature = 18 + Math.random() * 12; // 18-30°C
      const humidity = 30 + Math.random() * 40; // 30-70%
      const co2 = 400 + Math.random() * 600; // 400-1000 ppm
      
      data.push({
        timestamp: timestamp.toISOString(),
        temperature: parseFloat(temperature.toFixed(2)),
        humidity: parseFloat(humidity.toFixed(2)),
        co2: parseFloat(co2.toFixed(2))
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка при получении исторических данных:', error);
    return NextResponse.json(
      { error: 'Не удалось получить исторические данные' }, 
      { status: 500 }
    );
  }
}