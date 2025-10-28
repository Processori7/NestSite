"use client";

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const TemperaturePage = () => {
  const [temperature, setTemperature] = useState<number>(2); // Начальная температура 22°C

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Температура</h1>
      
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Текущая температура: {temperature}°C</h2>
        </div>
        
        <div className="space-y-4">
          <Slider
            min={-10}
            max={40}
            step={1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
            className="w-full"
          />
          
          <div className="flex items-center space-x-4">
            <span>-10°C</span>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-md"
              min={-10}
              max={40}
            />
            <span>40°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperaturePage;