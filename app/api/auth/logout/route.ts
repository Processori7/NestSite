import { NextResponse } from 'next/server';
import { deleteAuthCookie } from '@/lib/cookies'; // Импортируем новую функцию

export async function GET() {
   const response = NextResponse.json({ message: 'Выход успешен' });
   deleteAuthCookie(response); // Удаляем токен из куки
   return response;
 }

 export async function POST() {
   const response = NextResponse.json({ message: 'Выход успешен' });
   deleteAuthCookie(response); // Удаляем токен из куки
   return response;
 }