"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from './theme-toggle';
import UserProfile from './user-profile';

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-bold"></div>
      <div className="flex items-center gap-4">
        <UserProfile token={typeof window !== 'undefined' ? localStorage.getItem('auth_token') || '' : ''} />
        <ThemeToggle />
      </div>
    </div>
  );
}