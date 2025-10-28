"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === "/dashboard" ? "bg-muted" : "",
          "text-lg font-bold"
        )}
      >
        Управление освещением в теплице
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === "/dashboard" ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Панель управления
      </Link>
      <Link
        href="/zones"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/zones") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Зоны
      </Link>
      <Link
        href="/scenarios"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/scenarios") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Сценарии
      </Link>
      <Link
        href="/dashboard/analytics"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/dashboard/analytics") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Аналитика
      </Link>
      <Link
        href="/settings"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/settings") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Настройки
      </Link>
      <Link
        href="/temperature"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/temperature") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Температура
      </Link>
      <Link
        href="/humidity"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/humidity") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Влажность
      </Link>
      <Link
        href="/environment"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname.startsWith("/environment") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"
        )}
      >
        Окружение
      </Link>
      <div className="ml-auto flex items-center space-x-2">
      </div>
    </nav>
  );
}
