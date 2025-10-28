import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Получаем настройки из куки
    const settingsCookie = request.cookies.get('user-settings');
    
    if (settingsCookie) {
      const settings = JSON.parse(settingsCookie.value);
      return new Response(JSON.stringify(settings), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Возвращаем настройки по умолчанию
      const defaultSettings = {
        notificationsEnabled: true,
        username: '',
      };
      return new Response(JSON.stringify(defaultSettings), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch settings',
        notificationsEnabled: true,
        username: '',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { notificationsEnabled, username } = await request.json();

    // Валидация данных
    if (typeof notificationsEnabled !== 'boolean' || typeof username !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid settings data' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Сохраняем настройки в куки
    const settings = {
      notificationsEnabled,
      username,
    };

    const response = NextResponse.json({
      message: 'Settings saved successfully',
      settings,
    });

    response.cookies.set('user-settings', JSON.stringify(settings), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 дней
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error saving settings:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save settings' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}