"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() : "U";
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const metadata = user?.user_metadata ?? {};
  const displayName = metadata.full_name || metadata.name || user?.email || "Usuario";
  const avatarUrl = metadata.avatar_url || metadata.picture || metadata.avatar;
  const initials = getInitials(displayName);

  useEffect(() => setAvatarFailed(false), [avatarUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navItems = [
    { href: "/admin", label: t("admin.nav.dashboard") },
    { href: "/admin/properties", label: t("admin.nav.listings") },
    { href: "/admin/users", label: t("admin.nav.users") },
  ];

  const isActive = (href: string) => href === "/admin" ? pathname === href : pathname.startsWith(href);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    setIsUserMenuOpen(false);

    try {
      await signOut();
    } finally {
      router.replace("/login");
    }
  };

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
            {loading ? <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" aria-label={t("navbar.loading")} /> : <div className="relative z-[100] border-l border-nordic-dark/10 pl-2" ref={menuRef}>
              <button type="button" onClick={() => setIsUserMenuOpen((open) => !open)} className="flex items-center gap-2" title={displayName} aria-label={t("navbar.userMenu")} aria-expanded={isUserMenuOpen} aria-haspopup="menu">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-mosque text-sm font-semibold text-white ring-2 ring-transparent transition-all hover:ring-mosque">
                  {avatarUrl && !avatarFailed ? <img src={avatarUrl} alt={t("login.avatarAlt")} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} /> : initials}
                </div>
                <span className="material-icons text-base text-nordic-muted">expand_more</span>
              </button>
              {isUserMenuOpen && <div className="absolute right-0 top-full z-[110] mt-3 w-64 rounded-xl border border-nordic-dark/10 bg-white p-2 shadow-xl" role="menu">
                <div className="border-b border-nordic-dark/5 px-3 py-2"><p className="truncate text-sm font-semibold text-nordic-dark">{displayName}</p>{user?.email && <p className="truncate text-xs text-nordic-muted">{user.email}</p>}</div>
                <Link href="/" onClick={() => setIsUserMenuOpen(false)} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-nordic-dark transition-colors hover:bg-mosque/10 hover:text-mosque" role="menuitem"><span className="material-icons text-base">home</span>{t("admin.nav.backToSite")}</Link>
                <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-nordic-dark transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-60" role="menuitem"><span className="material-icons text-base">logout</span>{isSigningOut ? t("navbar.signingOut") : t("navbar.logout")}</button>
              </div>}
            </div>}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <footer className="mt-auto border-t border-nordic-dark/5 py-6 text-center text-sm text-nordic-muted">{t("admin.footer")}</footer>
    </div>
  );
}
