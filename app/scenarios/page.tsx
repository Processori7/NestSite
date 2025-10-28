"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Lightbulb, Palette, Clock, Sun, Moon, Zap, Droplets, Thermometer, Settings } from "lucide-react";

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: "Вегетативная фаза",
      description: "Синий спектр для вегетативного роста",
      blueLight: 60,
      redLight: 40,
      intensity: 75,
      uvLight: 5,
      cropType: "Листовые культуры",
      schedule: "06:00 - 20:00",
      createdAt: "2024-10-15",
      isActive: true, // Сценарий активен
      otherParameters: {
        temperature: 22,
        humidity: 65,
        duration: 14
      }
    },
    {
      id: 2,
      name: "Фаза цветения",
      description: "Красный спектр для цветения",
      blueLight: 30,
      redLight: 70,
      intensity: 85,
      uvLight: 10,
      cropType: "Плодовые растения",
      schedule: "08:00 - 18:00",
      createdAt: "2024-10-15",
      isActive: true, // Сценарий активен
      otherParameters: {
        temperature: 25,
        humidity: 70,
        duration: 21
      }
    },
    {
      id: 3,
      name: "Уход за рассадой",
      description: "Мягкий, сбалансированный спектр для рассады",
      blueLight: 50,
      redLight: 50,
      intensity: 45,
      uvLight: 2,
      cropType: "Все культуры",
      schedule: "07:00 - 19:00",
      createdAt: "2024-10-15",
      isActive: false, // Сценарий неактивен
      otherParameters: {
        temperature: 20,
        humidity: 60,
        duration: 10
      }
    },
  ]);

  const [newScenario, setNewScenario] = useState({
    name: "",
    description: "",
    blueLight: 50,
    redLight: 50,
    intensity: 60,
    uvLight: 5,
    cropType: "",
    schedule: "",
    isActive: false,
    otherParameters: {
      temperature: 22,
      humidity: 60,
      duration: 14
    }
  });

  const [editingScenario, setEditingScenario] = useState<{
    id: number;
    name: string;
    description: string;
    blueLight: number;
    redLight: number;
    intensity: number;
    uvLight: number;
    cropType: string;
    schedule: string;
    createdAt: string;
    isActive: boolean;
    otherParameters: {
      temperature: number;
      humidity: number;
      duration: number;
    };
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddScenario = () => {
    if (!newScenario.name) return;
    
    const scenario = {
      id: scenarios.length + 1,
      ...newScenario,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: false, // Новый сценарий по умолчанию неактивен
    };
    
    setScenarios([...scenarios, scenario]);
    resetForm();
  };

  const handleEditScenario = () => {
    if (!editingScenario?.name) return;
    
    setScenarios(scenarios.map(s => s.id === editingScenario.id ? editingScenario : s));
    resetForm();
  };

  const resetForm = () => {
    setNewScenario({
      name: "",
      description: "",
      blueLight: 50,
      redLight: 50,
      intensity: 60,
      uvLight: 5,
      cropType: "",
      schedule: "",
      isActive: false,
      otherParameters: {
        temperature: 22,
        humidity: 60,
        duration: 14
      }
    });
    setEditingScenario(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (scenario: {
    id: number;
    name: string;
    description: string;
    blueLight: number;
    redLight: number;
    intensity: number;
    uvLight: number;
    cropType: string;
    schedule: string;
    createdAt: string;
    isActive: boolean;
    otherParameters: {
      temperature: number;
      humidity: number;
      duration: number;
    };
  }) => {
    setEditingScenario({...scenario});
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md-items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Сценарии освещения</h1>
          <p className="text-muted-foreground">
            Создание и управление сценариями освещения с настройками спектров и других параметров
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать сценарий
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingScenario ? "Редактировать сценарий" : "Создать новый сценарий"}</DialogTitle>
              <DialogDescription>
                Определите параметры освещения и другие настройки для этого сценария
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название сценария</Label>
                  <Input
                    id="name"
                    placeholder="например, Фаза цветения"
                    value={editingScenario ? editingScenario.name : newScenario.name}
                    onChange={(e) => editingScenario
                      ? setEditingScenario({...editingScenario, name: e.target.value})
                      : setNewScenario({...newScenario, name: e.target.value})
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">Тип культуры</Label>
                  <Input
                    id="crop"
                    placeholder="например, Томаты, Перцы и т.д."
                    value={editingScenario ? editingScenario.cropType : newScenario.cropType}
                    onChange={(e) => editingScenario
                      ? setEditingScenario({...editingScenario, cropType: e.target.value})
                      : setNewScenario({...newScenario, cropType: e.target.value})
                    }
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="desc">Описание</Label>
                <Input
                  id="desc"
                  placeholder="Опишите назначение этого сценария"
                  value={editingScenario ? editingScenario.description : newScenario.description}
                  onChange={(e) => editingScenario
                    ? setEditingScenario({...editingScenario, description: e.target.value})
                    : setNewScenario({...newScenario, description: e.target.value})
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule">Расписание</Label>
                <Input
                  id="schedule"
                  placeholder="например, 06:00 - 20:00"
                  value={editingScenario ? editingScenario.schedule : newScenario.schedule}
                  onChange={(e) => editingScenario
                    ? setEditingScenario({...editingScenario, schedule: e.target.value})
                    : setNewScenario({...newScenario, schedule: e.target.value})
                  }
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="intensity">Интенсивность</Label>
                  <span className="text-sm font-medium">{editingScenario ? editingScenario.intensity : newScenario.intensity}%</span>
                </div>
                <Input
                  id="intensity"
                  type="range"
                  min="0"
                  max="10"
                  value={editingScenario ? editingScenario.intensity : newScenario.intensity}
                  onChange={(e) => editingScenario
                    ? setEditingScenario({...editingScenario, intensity: parseInt(e.target.value) || 0})
                    : setNewScenario({...newScenario, intensity: parseInt(e.target.value) || 0})
                  }
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uv">УФ-излучение</Label>
                  <span className="text-sm font-medium">{editingScenario ? editingScenario.uvLight : newScenario.uvLight}%</span>
                </div>
                <Input
                  id="uv"
                  type="range"
                  min="0"
                  max="30"
                  value={editingScenario ? editingScenario.uvLight : newScenario.uvLight}
                  onChange={(e) => editingScenario
                    ? setEditingScenario({...editingScenario, uvLight: parseInt(e.target.value) || 0})
                    : setNewScenario({...newScenario, uvLight: parseInt(e.target.value) || 0})
                  }
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blue" className="flex items-center gap-1">
                      <Palette className="h-4 w-4 text-blue-500" />
                      Синий спектр
                    </Label>
                    <span className="text-sm font-medium">{editingScenario ? editingScenario.blueLight : newScenario.blueLight}%</span>
                  </div>
                  <Input
                    id="blue"
                    type="range"
                    min="0"
                    max="10"
                    value={editingScenario ? editingScenario.blueLight : newScenario.blueLight}
                    onChange={(e) => editingScenario
                      ? setEditingScenario({...editingScenario, blueLight: parseInt(e.target.value) || 0})
                      : setNewScenario({...newScenario, blueLight: parseInt(e.target.value) || 0})
                    }
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="red" className="flex items-center gap-1">
                      <Palette className="h-4 w-4 text-red-500" />
                      Красный спектр
                    </Label>
                    <span className="text-sm font-medium">{editingScenario ? editingScenario.redLight : newScenario.redLight}%</span>
                  </div>
                  <Input
                    id="red"
                    type="range"
                    min="0"
                    max="100"
                    value={editingScenario ? editingScenario.redLight : newScenario.redLight}
                    onChange={(e) => editingScenario
                      ? setEditingScenario({...editingScenario, redLight: parseInt(e.target.value) || 0})
                      : setNewScenario({...newScenario, redLight: parseInt(e.target.value) || 0})
                    }
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Другие параметры</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temp" className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4" />
                        Температура
                      </Label>
                      <span className="text-sm font-medium">{editingScenario ? editingScenario.otherParameters.temperature : newScenario.otherParameters.temperature}°C</span>
                    </div>
                    <Input
                      id="temp"
                      type="range"
                      min="15"
                      max="35"
                      value={editingScenario ? editingScenario.otherParameters.temperature : newScenario.otherParameters.temperature}
                      onChange={(e) => editingScenario
                        ? setEditingScenario({
                            ...editingScenario,
                            otherParameters: {
                              ...editingScenario.otherParameters,
                              temperature: parseInt(e.target.value)
                            }
                          })
                        : setNewScenario({
                            ...newScenario,
                            otherParameters: {
                              ...newScenario.otherParameters,
                              temperature: parseInt(e.target.value)
                            }
                          })
                      }
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="humidity" className="flex items-center gap-1">
                        <Droplets className="h-4 w-4" />
                        Влажность
                      </Label>
                      <span className="text-sm font-medium">{editingScenario ? editingScenario.otherParameters.humidity : newScenario.otherParameters.humidity}%</span>
                    </div>
                    <Input
                      id="humidity"
                      type="range"
                      min="30"
                      max="90"
                      value={editingScenario ? editingScenario.otherParameters.humidity : newScenario.otherParameters.humidity}
                      onChange={(e) => editingScenario
                        ? setEditingScenario({
                            ...editingScenario,
                            otherParameters: {
                              ...editingScenario.otherParameters,
                              humidity: parseInt(e.target.value)
                            }
                          })
                        : setNewScenario({
                            ...newScenario,
                            otherParameters: {
                              ...newScenario.otherParameters,
                              humidity: parseInt(e.target.value)
                            }
                          })
                      }
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="duration" className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Длительность
                      </Label>
                      <span className="text-sm font-medium">{editingScenario ? editingScenario.otherParameters.duration : newScenario.otherParameters.duration} дней</span>
                    </div>
                    <Input
                      id="duration"
                      type="range"
                      min="1"
                      max="30"
                      value={editingScenario ? editingScenario.otherParameters.duration : newScenario.otherParameters.duration}
                      onChange={(e) => editingScenario
                        ? setEditingScenario({
                            ...editingScenario,
                            otherParameters: {
                              ...editingScenario.otherParameters,
                              duration: parseInt(e.target.value)
                            }
                          })
                        : setNewScenario({
                            ...newScenario,
                            otherParameters: {
                              ...newScenario.otherParameters,
                              duration: parseInt(e.target.value)
                            }
                          })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={editingScenario ? handleEditScenario : handleAddScenario} className="flex-1">
                  {editingScenario ? "Сохранить изменения" : "Создать сценарий"}
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего сценариев</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scenarios.length}</div>
            <p className="text-xs text-muted-foreground">+2 по сравнению с прошлым месяцем</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные сценарии</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scenarios.filter(s => s.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Применены в зонах</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Типы культур</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(scenarios.map(s => s.cropType))].length}</div>
            <p className="text-xs text-muted-foreground">Различные категории</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Запланировано</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scenarios.filter(s => s.schedule && s.schedule.length > 0).length}</div>
            <p className="text-xs text-muted-foreground">Автоматическое переключение сценариев</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Библиотека сценариев</CardTitle>
          <CardDescription>
            Все сохраненные сценарии освещения и конфигурации фаз роста
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Сценарий</TableHead>
                <TableHead>Тип культуры</TableHead>
                <TableHead>Интенсивность</TableHead>
                <TableHead>Спектр</TableHead>
                <TableHead>УФ</TableHead>
                <TableHead>Другие параметры</TableHead>
                <TableHead>Расписание</TableHead>
                <TableHead>Создан</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario) => (
                <TableRow key={scenario.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      {scenario.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{scenario.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{scenario.cropType}</Badge>
                  </TableCell>
                  <TableCell>{scenario.intensity}%</TableCell>
                  <TableCell>{scenario.blueLight}% / {scenario.redLight}%</TableCell>
                  <TableCell>{scenario.uvLight}%</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Темп: {scenario.otherParameters.temperature}°C</div>
                      <div>Влаж: {scenario.otherParameters.humidity}%</div>
                    </div>
                  </TableCell>
                  <TableCell>{scenario.schedule}</TableCell>
                  <TableCell>{scenario.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      Применить
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(scenario)}>
                      Редактировать
                    </Button>
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