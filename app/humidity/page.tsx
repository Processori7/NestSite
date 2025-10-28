'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HumidityPage = () => {
  const [humidity, setHumidity] = useState([45]); // Значение по умолчанию 45%

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Влажность</h1>
      
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Регулировка влажности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Текущая влажность:</span>
              <span className="text-2xl font-bold text-blue-600">{humidity[0]}%</span>
            </div>
            <Slider
              value={humidity}
              onValueChange={setHumidity}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HumidityPage;