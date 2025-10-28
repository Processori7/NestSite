"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Zap, Eye, Palette } from "lucide-react";

interface LightingControlProps {
  zoneId?: string;
  title?: string;
}

export function LightingControl({ zoneId = "all", title = "Управление освещением теплицы" }: LightingControlProps) {
  const [intensity, setIntensity] = useState([75]);
  const [blueLight, setBlueLight] = useState([40]);
  const [redLight, setRedLight] = useState([60]);
  const [uvLight, setUvLight] = useState([10]);
  const [isOn, setIsOn] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving lighting settings:", {
      zoneId,
      intensity: intensity[0],
      blueLight: blueLight[0],
      redLight: redLight[0],
      uvLight: uvLight[0],
      isOn,
      scheduleEnabled
    });
    alert("Lighting settings saved successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Управление спектром и интенсивностью освещения теплицы
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Статус освещения</span>
          <Switch 
            checked={isOn} 
            onCheckedChange={setIsOn}
            aria-label="Toggle lighting"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="intensity">Интенсивность освещения</Label>
            <span className="text-sm font-medium">{intensity[0]}%</span>
          </div>
          <Slider
            id="intensity"
            min={0}
            max={100}
            step={1}
            value={intensity}
            onValueChange={setIntensity}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="blue" className="flex items-center gap-1">
              <Palette className="h-4 w-4 text-blue-500" />
              Blue Spectrum
            </Label>
            <span className="text-sm font-medium">{blueLight[0]}%</span>
          </div>
          <Slider
            id="blue"
            min={0}
            max={100}
            step={1}
            value={blueLight}
            onValueChange={setBlueLight}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="red" className="flex items-center gap-1">
              <Palette className="h-4 w-4 text-red-50" />
              Красный спектр
            </Label>
            <span className="text-sm font-medium">{redLight[0]}%</span>
          </div>
          <Slider
            id="red"
            min={0}
            max={100}
            step={1}
            value={redLight}
            onValueChange={setRedLight}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="uv" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              УФ спектр
            </Label>
            <span className="text-sm font-medium">{uvLight[0]}%</span>
          </div>
          <Slider
            id="uv"
            min={0}
            max={30}
            step={1}
            value={uvLight}
            onValueChange={setUvLight}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <Label htmlFor="schedule">Планирование</Label>
            <Switch 
              id="schedule" 
              checked={scheduleEnabled} 
              onCheckedChange={setScheduleEnabled}
              aria-label="Enable scheduling"
            />
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}