"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() : "U";
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const pathname = usePathname();
  const [avatarFailed, setAvatarFailed] = useState(false);
  const metadata = user?.user_metadata ?? {};
  const displayName = metadata.full_name || metadata.name || user?.email || "Usuario";
  const avatarUrl = metadata.avatar_url || metadata.picture || metadata.avatar;
  const initials = getInitials(displayName);

  useEffect(() => setAvatarFailed(false), [avatarUrl]);

  const navItems = [
    { href: "/admin", label: t("admin.nav.dashboard") },
    { href: "/admin/properties", label: t("admin.nav.listings") },
    { href: "/admin/users", label: t("admin.nav.users") },
  ];

  const isActive = (href: string) => href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background-light font-display text-nordic-dark">
      <nav className="sticky top-0 z-50 border-b border-mosque/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 sm:gap-12">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="material-icons text-2xl text-mosque">apartment</span>
              <span className="text-lg font-bold tracking-tight">LuxeEstate</span>
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={`border-b-2 px-1 py-5 text-sm font-medium transition-colors ${isActive(item.href) ? "border-mosque text-mosque" : "border-transparent text-nordic-muted hover:border-mosque/30 hover:text-mosque"}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-5">
            <button type="button" className="text-nordic-muted transition-colors hover:text-mosque" aria-label={t("navbar.notifications")}>
              <span className="material-icons text-xl">notifications_none</span>
            </button>
            <Link href="/" className="hidden text-sm font-medium text-nordic-muted hover:text-mosque sm:block">{t("admin.nav.backToSite")}</Link>
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-mosque text-sm font-semibold text-white ring-2 ring-mosque/10" title={displayName}>
              {avatarUrl && !avatarFailed ? <img src={avatarUrl} alt={t("login.avatarAlt")} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} /> : initials}
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <footer className="mt-auto border-t border-nordic-dark/5 py-6 text-center text-sm text-nordic-muted">{t("admin.footer")}</footer>
    </div>
  );
}
