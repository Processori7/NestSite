"use client";

import { LightingControl } from "@/components/lighting-control";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Zap, Palette } from "lucide-react";

export default function LightingControlPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Управление освещением</h1>
        <p className="text-muted-foreground">
          Управление и настройка систем освещения теплицы
        </p>
      </div>
      
      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">Глобальное управление</TabsTrigger>
          <TabsTrigger value="zones">По зонам</TabsTrigger>
          <TabsTrigger value="profiles">Профили</TabsTrigger>
          <TabsTrigger value="scheduling">Расписание</TabsTrigger>
        </TabsList>
        <TabsContent value="global" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <LightingControl 
              zoneId="all" 
              title="Глобальные настройки освещения"
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Предустановки фаз роста
                </CardTitle>
                <CardDescription>
                  Применение предварительно настроенных профилей освещения для различных фаз роста
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button className="rounded-lg border bg-muted p-4 text-left hover:bg-accent">
                    <div className="font-medium">Вегетативная</div>
                    <div className="text-xs text-muted-foreground">Спектр с преобладанием синего</div>
                  </button>
                  <button className="rounded-lg border bg-muted p-4 text-left hover:bg-accent">
                    <div className="font-medium">Цветение</div>
                    <div className="text-xs text-muted-foreground">Спектр с преобладанием красного</div>
                  </button>
                  <button className="rounded-lg border bg-muted p-4 text-left hover:bg-accent">
                    <div className="font-medium">Рассада</div>
                    <div className="text-xs text-muted-foreground">Мягкое, сбалансированное</div>
                  </button>
                  <button className="rounded-lg border bg-muted p-4 text-left hover:bg-accent">
                    <div className="font-medium">Сбор урожая</div>
                    <div className="text-xs text-muted-foreground">Конкретные длины волн</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Текущий статус освещения
              </CardTitle>
              <CardDescription>
                Обзор всех активных зон освещения и их текущих настроек
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Lightbulb className="h-8 w-8 mb-2 text-green-500" />
                  <div className="text-lg font-bold">Zone 1</div>
                  <div className="text-sm text-muted-foreground">85%</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Lightbulb className="h-8 w-8 mb-2 text-green-500" />
                  <div className="text-lg font-bold">Zone 2</div>
                  <div className="text-sm text-muted-foreground">72%</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Lightbulb className="h-8 w-8 mb-2 text-yellow-500" />
                  <div className="text-lg font-bold">Zone 3</div>
                  <div className="text-sm text-muted-foreground">45%</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Lightbulb className="h-8 w-8 mb-2 text-red-50" />
                  <div className="text-lg font-bold">Zone 4</div>
                  <div className="text-sm text-muted-foreground">Off</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="zones">
          <div className="grid gap-6 lg:grid-cols-2">
            <LightingControl 
              zoneId="zone1" 
              title="Зона 1 - Рассада"
            />
            <LightingControl 
              zoneId="zone2" 
              title="Зона 2 - Вегетативная"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            <LightingControl 
              zoneId="zone3" 
              title="Зона 3 - Цветение"
            />
            <LightingControl 
              zoneId="zone4" 
              title="Зона 4 - Сбор урожая"
            />
          </div>
        </TabsContent>
        <TabsContent value="profiles">
          <Card>
            <CardHeader>
              <CardTitle>Профили освещения</CardTitle>
              <CardDescription>
                Создание и управление повторно используемыми конфигурациями освещения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Интерфейс управления профилями будет отображен здесь
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduling">
          <Card>
            <CardHeader>
              <CardTitle>Запланированное освещение</CardTitle>
              <CardDescription>
                Настройка автоматических расписаний освещения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Интерфейс расписания будет отображен здесь
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}