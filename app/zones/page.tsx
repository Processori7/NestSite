"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Thermometer, Droplets, Edit, Trash2 } from "lucide-react";

// Тип для зоны
type Zone = {
  id: number;
  name: string;
  status: string;
  temperature: number;
  humidity: number;
  lightIntensity: number;
  cropType: string;
};

export default function ZonesPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [, setLoading] = useState(true);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [newZone, setNewZone] = useState({
    name: "",
    cropType: "",
    temperature: 22,
    humidity: 65,
  });

  // Загрузка зон при монтировании компонента
  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const response = await fetch('/api/zones');
      const data = await response.json();
      if (response.ok) {
        setZones(data.zones);
      } else {
        console.error('Ошибка загрузки зон:', data.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки зон:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddZone = async () => {
    if (!newZone.name) return;
    
    try {
      const response = await fetch('/api/zones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newZone),
      });

      if (response.ok) {
        const data = await response.json();
        setZones([...zones, data.zone]);
        setNewZone({ name: "", cropType: "", temperature: 22, humidity: 65 });
      } else {
        const errorData = await response.json();
        console.error('Ошибка создания зоны:', errorData.error);
      }
    } catch (error) {
      console.error('Ошибка создания зоны:', error);
    }
  };

  const handleUpdateZone = async () => {
    if (!editingZone || !editingZone.name) return;
    
    try {
      const response = await fetch('/api/zones', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingZone),
      });

      if (response.ok) {
        const data = await response.json();
        setZones(zones.map(zone => zone.id === data.zone.id ? data.zone : zone));
        setEditingZone(null);
      } else {
        const errorData = await response.json();
        console.error('Ошибка обновления зоны:', errorData.error);
      }
    } catch (error) {
      console.error('Ошибка обновления зоны:', error);
    }
  };

  const handleDeleteZone = async (id: number) => {
    try {
      const response = await fetch(`/api/zones?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setZones(zones.filter(zone => zone.id !== id));
      } else {
        const errorData = await response.json();
        console.error('Ошибка удаления зоны:', errorData.error);
      }
    } catch (error) {
      console.error('Ошибка удаления зоны:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md-items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление зонами</h1>
          <p className="text-muted-foreground">
            Управление и мониторинг отдельных зон теплицы
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить зону
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новую зону</DialogTitle>
              <DialogDescription>
                Настройка новой зоны теплицы с определенными параметрами
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название зоны</Label>
                <Input 
                  id="name" 
                  placeholder="например, Зона E - Укоренение"
                  value={newZone.name}
                  onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop">Тип культуры</Label>
                <Input 
                  id="crop" 
                  placeholder="например, Базилик, Шпинат и т.д."
                  value={newZone.cropType}
                  onChange={(e) => setNewZone({...newZone, cropType: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp">Целевая температура (°C)</Label>
                  <Input 
                    id="temp" 
                    type="number"
                    value={newZone.temperature}
                    onChange={(e) => setNewZone({...newZone, temperature: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="humidity">Целевая влажность (%)</Label>
                  <Input 
                    id="humidity" 
                    type="number"
                    value={newZone.humidity}
                    onChange={(e) => setNewZone({...newZone, humidity: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <Button onClick={handleAddZone} className="w-full">Создать зону</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные зоны</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {zones.filter(z => z.status === 'активна').length}/{zones.length}
            </div>
            <p className="text-xs text-muted-foreground">+1 за последнюю неделю</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя температура</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(zones.reduce((sum, zone) => sum + zone.temperature, 0) / zones.length)}°C
            </div>
            <p className="text-xs text-muted-foreground">В оптимальном диапазоне</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя влажность</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(zones.reduce((sum, zone) => sum + zone.humidity, 0) / zones.length)}%
            </div>
            <p className="text-xs text-muted-foreground">В пределах нормы</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя интенсивность света</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(zones.reduce((sum, zone) => sum + zone.lightIntensity, 0) / zones.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Оптимизировано</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Обзор зон</CardTitle>
          <CardDescription>
            Подробный вид всех зон теплицы и их текущих параметров
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Зона</TableHead>
                <TableHead>Тип культуры</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Темп (°C)</TableHead>
                <TableHead>Влажность (%)</TableHead>
                <TableHead>Интенсивность света (%)</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{zone.cropType}</TableCell>
                  <TableCell>
                    <Badge variant={zone.status === "активна" ? "default" : "secondary"}>
                      {zone.status === "активна" ? "Активна" : zone.status === "обслуживание" ? "Обслуживание" : zone.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{zone.temperature}°C</TableCell>
                  <TableCell>{zone.humidity}%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${zone.lightIntensity}%` }}
                        ></div>
                      </div>
                      <span>{zone.lightIntensity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setEditingZone(zone)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Редактировать зону</DialogTitle>
                            <DialogDescription>
                              Изменить параметры зоны теплицы
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Название зоны</Label>
                              <Input
                                id="edit-name"
                                placeholder="например, Зона E - Укоренение"
                                value={editingZone?.name || ""}
                                onChange={(e) => setEditingZone(editingZone ? {...editingZone, name: e.target.value} : null)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-crop">Тип культуры</Label>
                              <Input
                                id="edit-crop"
                                placeholder="например, Базилик, Шпинат и т.д."
                                value={editingZone?.cropType || ""}
                                onChange={(e) => setEditingZone(editingZone ? {...editingZone, cropType: e.target.value} : null)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-temp">Целевая температура (°C)</Label>
                                <Input
                                  id="edit-temp"
                                  type="number"
                                  value={editingZone?.temperature || 0}
                                  onChange={(e) => setEditingZone(editingZone ? {...editingZone, temperature: parseInt(e.target.value) || 0} : null)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-humidity">Целевая влажность (%)</Label>
                                <Input
                                  id="edit-humidity"
                                  type="number"
                                  value={editingZone?.humidity || 0}
                                  onChange={(e) => setEditingZone(editingZone ? {...editingZone, humidity: parseInt(e.target.value) || 0} : null)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-status">Статус</Label>
                              <select
                                id="edit-status"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                value={editingZone?.status || "активна"}
                                onChange={(e) => setEditingZone(editingZone ? {...editingZone, status: e.target.value} : null)}
                              >
                                <option value="активна">Активна</option>
                                <option value="обслуживание">Обслуживание</option>
                                <option value="неактивна">Неактивна</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-light">Интенсивность света (%)</Label>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  id="edit-light"
                                  min={0}
                                  max={100}
                                  value={editingZone ? [editingZone.lightIntensity] : [0]}
                                  onValueChange={(value: number[]) => setEditingZone(editingZone ? {...editingZone, lightIntensity: value[0]} : null)}
                                  className="flex-1"
                                />
                                <span className="w-12 text-center font-medium">
                                  {editingZone ? editingZone.lightIntensity : 0}%
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <Button onClick={handleUpdateZone} className="flex-1">Сохранить</Button>
                              <Button variant="outline" className="flex-1" onClick={() => setEditingZone(null)}>Отмена</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteZone(zone.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}