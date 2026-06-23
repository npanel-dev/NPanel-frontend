"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import { Separator } from "@workspace/ui/components/separator";
import { Icon } from "@workspace/ui/composed/icon";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { cn } from "@workspace/ui/lib/utils";
import { useGlobalStore } from "@/stores/global";
import { LayoutSwitch } from "./layout-switch";
import { type NavItem, useNavs } from "./navs";
import TimezoneSwitch from "./timezone-switch";
import { UserNav } from "./user-nav";

function hasChildren(obj: NavItem): obj is NavItem & { items: NavItem[] } {
  return Array.isArray((obj as any).items) && (obj as any).items.length > 0;
}

export function TopbarLayout({ children }: { children: React.ReactNode }) {
  const navs = useNavs();
  const pathname = useLocation({ select: (l) => l.pathname });
  const { common } = useGlobalStore();
  const { site } = common;

  const normalize = (p: string) =>
    p.endsWith("/") && p !== "/" ? p.replace(/\/+$/, "") : p;
  const isActive = (url: string) => {
    const path = normalize(pathname);
    const target = normalize(url);
    if (target === "/dashboard") return path === target;
    return path === target || path.startsWith(`${target}/`);
  };
  const isGroupActive = (nav: NavItem) =>
    hasChildren(nav) && nav.items.some((i) => isActive(i.url ?? ""));

  return (
    <div className="flex min-h-svh flex-col">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-14 items-center gap-3 px-4">
          {/* Logo */}
          <Link className="flex shrink-0 items-center gap-2 mr-2" to="/">
            <img
              alt="logo"
              className="size-6"
              src={site.site_logo || "/favicon.svg"}
            />
            <span className="hidden font-semibold text-sm sm:block truncate max-w-[120px]">
              {site.site_name}
            </span>
          </Link>

          <Separator className="h-5" orientation="vertical" />

          {/* Navigation */}
          <NavigationMenu className="flex-1" viewport={false}>
            <NavigationMenuList className="flex flex-wrap gap-1 justify-start">
              {navs.map((nav) => {
                if (hasChildren(nav)) {
                  const active = isGroupActive(nav);
                  return (
                    <NavigationMenuItem key={nav.title}>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-8 px-3 text-sm rounded-md",
                          active && "text-primary font-medium"
                        )}
                      >
                        {"icon" in nav && (nav as any).icon && (
                          <Icon
                            className="mr-1.5 size-4 shrink-0"
                            icon={(nav as any).icon}
                          />
                        )}
                        {nav.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-56 gap-0.5 p-2">
                          {nav.items.map((item) => (
                            <li key={item.title}>
                              <Link
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                  isActive(item.url ?? "")
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                to={item.url ?? "/dashboard"}
                              >
                                {item.icon && (
                                  <Icon className="size-4 shrink-0" icon={item.icon} />
                                )}
                                <span className="truncate">{item.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={nav.title}>
                    <Link
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                        "url" in nav && isActive((nav as any).url ?? "")
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      to={"url" in nav ? (nav as any).url : "/dashboard"}
                    >
                      {"icon" in nav && (nav as any).icon && (
                        <Icon className="size-4 shrink-0" icon={(nav as any).icon} />
                      )}
                      {nav.title}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right controls */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <LanguageSwitch />
            <TimezoneSwitch />
            <LayoutSwitch />
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
