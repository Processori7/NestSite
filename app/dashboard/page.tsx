"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Sun, Thermometer, Droplets, Gauge, Eye } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import EnvironmentHistoryChart from "@/components/environment-history-chart";

export default function DashboardPage() {
  const [lightIntensity, setLightIntensity] = useState([78]);
  const [zoneCount, setZoneCount] = useState(0);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('/api/zones');
        if (response.ok) {
          const data = await response.json();
          // Типизируем зоны для избежания ошибок TypeScript
          interface Zone {
            id: number;
            name: string;
            status: string;
            temperature: number;
            humidity: number;
            lightIntensity: number;
            cropType: string;
          }
          
          setZoneCount(data.zones.filter((zone: Zone) => zone.status === 'активна').length);
        }
      } catch (error) {
        console.error('Ошибка при загрузке зон:', error);
      }
    };

    fetchZones();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground">
          Добро пожаловать в систему управления умным домом
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="zones">Зоны</TabsTrigger>
          <TabsTrigger value="environment">Окружение</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/zones" className="block">
              <Card className="hover:bg-accent hover:cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активные зоны</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{zoneCount}</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/lighting-control" className="block">
              <Card className="hover:bg-accent hover:cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Текущая интенсивность</CardTitle>
                  <Sun className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lightIntensity[0]}%</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/temperature" className="block">
              <Card className="hover:bg-accent hover:cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Температура</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24°C</div>
                  <p className="text-xs text-muted-foreground">В оптимальном диапазоне</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/humidity" className="block">
              <Card className="hover:bg-accent hover:cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Влажность</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65%</div>
                  <p className="text-xs text-muted-foreground">В пределах нормы</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Интенсивность освещения</CardTitle>
                <CardDescription>
                  Настройка интенсивности освещения во всех зонах
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Глобальная интенсивность</span>
                    <span className="text-sm font-medium">{lightIntensity[0]}%</span>
                  </div>
                  <Slider
                    value={lightIntensity}
                    onValueChange={setLightIntensity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Состояние системы</CardTitle>
                <CardDescription>
                  Текущее состояние системы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      <span>Потребление энергии</span>
                    </span>
                    <span className="text-sm font-medium">1.2 kW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>Активные зоны</span>
                    </span>
                    <span className="text-sm font-medium">{zoneCount}/16</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Текущий режим</span>
                    </span>
                    <span className="text-sm font-medium">Фаза роста</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="zones">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активные зоны</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{zoneCount}</div>
                <p className="text-xs text-muted-foreground">+1 за последнюю неделю</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средняя температура</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23°C</div>
                <p className="text-xs text-muted-foreground">В оптимальном диапазоне</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средняя влажность</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <p className="text-xs text-muted-foreground">В пределах нормы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средняя интенсивность света</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">Оптимизировано</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Обзор зон</CardTitle>
              <CardDescription>
                Подробный вид всех зон теплицы и их текущих параметров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Зона</th>
                      <th className="text-left py-2">Тип культуры</th>
                      <th className="text-left py-2">Статус</th>
                      <th className="text-left py-2">Темп (°C)</th>
                      <th className="text-left py-2">Влажность (%)</th>
                      <th className="text-left py-2">Интенсивность света (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Зона A - Рассада</td>
                      <td className="py-2">Салат</td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Активна
                        </span>
                      </td>
                      <td className="py-2">22°C</td>
                      <td className="py-2">65%</td>
                      <td className="py-2">60%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Зона B - Вегетативная</td>
                      <td className="py-2">Помидоры</td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Активна
                        </span>
                      </td>
                      <td className="py-2">24°C</td>
                      <td className="py-2">70%</td>
                      <td className="py-2">75%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Зона C - Цветение</td>
                      <td className="py-2">Перцы</td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Активна
                        </span>
                      </td>
                      <td className="py-2">23°C</td>
                      <td className="py-2">68%</td>
                      <td className="py-2">80%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Зона D - Сбор урожая</td>
                      <td className="py-2">Огурцы</td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-10 text-yellow-800">
                          Обслуживание
                        </span>
                      </td>
                      <td className="py-2">21°C</td>
                      <td className="py-2">60%</td>
                      <td className="py-2">0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="environment">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Температура</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24°C</div>
                <p className="text-xs text-muted-foreground">В оптимальном диапазоне</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Влажность</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">В пределах нормы</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO2 Уровень</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">420 ppm</div>
                <p className="text-xs text-muted-foreground">Нормальный уровень</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">pH Уровень</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.2</div>
                <p className="text-xs text-muted-foreground">В идеальном диапазоне</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>История параметров</CardTitle>
              <CardDescription>
                Графики изменения параметров окружающей среды за последние 24 часа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
                <EnvironmentHistoryChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}