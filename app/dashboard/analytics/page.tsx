'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsPage = () => {
  // Заглушка для данных аналитики
  const temperatureData = {
    avg: 2.5,
    min: 18.0,
    max: 26.5,
    unit: '°C'
  };

  const humidityData = {
    avg: 45.2,
    min: 35.0,
    max: 60.0,
    unit: '%'
  };

  const lightingData = {
    totalHours: 120,
    energyConsumption: 150, // в кВт*ч
    unit: 'кВт*ч'
  };

  const zoneData = [
    { name: 'Зона 1', activity: 85, statusChanges: 12 },
    { name: 'Зона 2', activity: 65, statusChanges: 8 },
    { name: 'Зона 3', activity: 90, statusChanges: 15 },
    { name: 'Зона 4', activity: 70, statusChanges: 10 }
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-foreground dark:text-foreground mb-2">Аналитика</h1>
      <p className="mt-4 mb-8 text-muted-foreground dark:text-muted-foreground text-lg">На этой странице отображается аналитическая информация по различным аспектам системы.</p>

      {/* Аналитика температуры */}
      <section className="mb-10 p-6 rounded-lg shadow-md bg-card dark:bg-gray-800 dark:text-foreground">
        <h2 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground">Аналитика температуры</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Средняя температура</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{temperatureData.avg}{temperatureData.unit}</p>
            </CardContent>
          </Card>
          <Card className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Минимальная температура</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{temperatureData.min}{temperatureData.unit}</p>
            </CardContent>
          </Card>
          <Card className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Максимальная температура</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{temperatureData.max}{temperatureData.unit}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Аналитика влажности */}
      <section className="mb-10 p-6 rounded-lg shadow-md bg-card dark:bg-gray-800 dark:text-foreground">
        <h2 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground">Аналитика влажности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Средняя влажность</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{humidityData.avg}{humidityData.unit}</p>
            </CardContent>
          </Card>
          <Card className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Минимальная влажность</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{humidityData.min}{humidityData.unit}</p>
            </CardContent>
          </Card>
          <Card className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Максимальная влажность</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{humidityData.max}{humidityData.unit}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Аналитика освещения */}
      <section className="mb-10 p-6 rounded-lg shadow-md bg-card dark:bg-gray-800 dark:text-foreground">
        <h2 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground">Аналитика освещения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Общее время работы освещения</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{lightingData.totalHours} часов</p>
            </CardContent>
          </Card>
          <Card className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 shadow-sm dark:text-foreground">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">Потребление энергии</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground dark:text-foreground">{lightingData.energyConsumption} {lightingData.unit}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Аналитика зон */}
      <section className="mb-10 p-6 rounded-lg shadow-md bg-card dark:bg-gray-800 dark:text-foreground">
        <h2 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground">Аналитика зон</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border dark:divide-gray-700">
            <thead className="bg-muted/50 dark:bg-gray-700 dark:text-foreground">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider">Зона</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider">Активность (%)</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider">Изменения статуса</th>
              </tr>
            </thead>
            <tbody className="bg-card dark:bg-gray-800 divide-y divide-border dark:divide-gray-700 dark:text-foreground">
              {zoneData.map((zone, index) => (
                <tr key={index} className="hover:bg-muted/30 dark:hover:bg-gray-700 transition-colors dark:text-foreground">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-foreground dark:text-foreground">{zone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-foreground dark:text-foreground">{zone.activity}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-foreground dark:text-foreground">{zone.statusChanges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;