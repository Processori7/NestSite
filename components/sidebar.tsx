"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Sun, Layers, Calendar, BarChart3, Settings, Thermometer, Droplets } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col justify-between py-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/dashboard" ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          <span>Панель управления</span>
        </Link>
        <Link
          href="/zones"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/zones") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Layers className="h-4 w-4" />
          <span>Зоны</span>
        </Link>
        <Link
          href="/scenarios"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/scenarios") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Calendar className="h-4 w-4" />
          <span>Сценарии</span>
        </Link>
        <Link
          href="/dashboard/analytics"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/dashboard/analytics") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Аналитика</span>
        </Link>
        <Link
          href="/settings"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/settings") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Настройки</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-4 py-2 text-xs text-muted-foreground">Окружение</div>
        <Link
          href="/environment"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/environment") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Thermometer className="h-4 w-4" />
          <span>Температура</span>
        </Link>
        <Link
          href="/environment"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/environment") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Droplets className="h-4 w-4" />
          <span>Влажность</span>
        </Link>
        <Link
          href="/environment"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.startsWith("/environment") ? "bg-muted" : "",
            "justify-start gap-2"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Освещение</span>
        </Link>
      </div>
    </div>
  );
}