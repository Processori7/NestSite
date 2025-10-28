import { NextRequest, NextResponse } from 'next/server';

// В реальном приложении зоны будут храниться в базе данных
let zones = [
  { id: 1, name: "Zone A - Seedlings", status: "активна", temperature: 22, humidity: 65, lightIntensity: 60, cropType: "Lettuce" },
  { id: 2, name: "Zone B - Vegetative", status: "активна", temperature: 24, humidity: 70, lightIntensity: 75, cropType: "Tomatoes" },
  { id: 3, name: "Zone C - Flowering", status: "активна", temperature: 23, humidity: 68, lightIntensity: 80, cropType: "Peppers" },
  { id: 4, name: "Zone D - Harvest", status: "обслуживание", temperature: 21, humidity: 60, lightIntensity: 0, cropType: "Cucumbers" },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ zones });
  } catch (error) {
    console.error('Ошибка получения зон:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, cropType, temperature, humidity } = await request.json();

    // Проверка обязательных полей
    if (!name) {
      return NextResponse.json(
        { error: 'Название зоны обязательно для заполнения' },
        { status: 400 }
      );
    }

    // Создание новой зоны
    const newZone = {
      id: Math.max(...zones.map(z => z.id), 0) + 1,
      name,
      status: "активна",
      temperature: temperature || 22,
      humidity: humidity || 65,
      lightIntensity: 0,
      cropType: cropType || "",
    };

    zones.push(newZone);

    return NextResponse.json({ zone: newZone }, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания зоны:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, cropType, temperature, humidity, status } = await request.json();

    // Проверка обязательных полей
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID и название зоны обязательны для обновления' },
        { status: 400 }
      );
    }

    // Поиск зоны по ID
    const zoneIndex = zones.findIndex(z => z.id === id);
    if (zoneIndex === -1) {
      return NextResponse.json(
        { error: 'Зона не найдена' },
        { status: 404 }
      );
    }

    // Обновление зоны
    zones[zoneIndex] = {
      ...zones[zoneIndex],
      name,
      cropType: cropType || zones[zoneIndex].cropType,
      temperature: temperature || zones[zoneIndex].temperature,
      humidity: humidity || zones[zoneIndex].humidity,
      status: status || zones[zoneIndex].status,
    };

    return NextResponse.json({ zone: zones[zoneIndex] });
  } catch (error) {
    console.error('Ошибка обновления зоны:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json(
        { error: 'ID зоны обязателен для удаления' },
        { status: 400 }
      );
    }

    const initialLength = zones.length;
    zones = zones.filter(z => z.id !== id);

    if (zones.length === initialLength) {
      return NextResponse.json(
        { error: 'Зона не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Зона успешно удалена' });
  } catch (error) {
    console.error('Ошибка удаления зоны:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}