"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function Navbar() {
  const { t } = useTranslation();
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type")?.toUpperCase();
  const isSavedSelected = pathname === "/saved";
  const isSellSelected = !isSavedSelected && searchParams.get("intent") === "sell";
  const isBuySelected = !isSavedSelected && !isSellSelected && (!selectedType || selectedType === "SALE");
  const isRentSelected = !isSavedSelected && !isSellSelected && selectedType === "RENT";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const metadata = user?.user_metadata ?? {};
  const displayName = metadata.full_name || metadata.name || user?.email || "Usuario";
  const avatarUrl = metadata.avatar_url || metadata.picture || metadata.avatar;
  const initials = getInitials(displayName);

  useEffect(() => {
    setAvatarFailed(false);
  }, [avatarUrl]);

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut();
  };

  const navClass = (active: boolean, mobile = false) => active
    ? mobile
      ? "block rounded-md bg-mosque/10 px-3 py-2 text-base font-medium text-mosque"
      : "border-b-2 border-mosque px-1 py-1 text-sm font-medium text-mosque"
    : mobile
      ? "block rounded-md px-3 py-2 text-base font-medium text-nordic-dark hover:bg-black/5"
      : "px-1 py-1 text-sm font-medium text-nordic-dark/70 transition-all hover:border-b-2 hover:border-nordic-dark/20 hover:text-nordic-dark";

  return (
    <nav className="sticky top-0 z-50 border-b border-nordic-dark/10 bg-background-light/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-shrink-0 cursor-pointer items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nordic-dark"><span className="material-icons text-lg text-white">apartment</span></div><span className="text-xl font-semibold tracking-tight text-nordic-dark">{t("navbar.brand")}</span></Link>
        <div className="hidden items-center space-x-8 md:flex">
          <Link className={navClass(isBuySelected)} href="/?type=SALE" aria-current={isBuySelected ? "page" : undefined}>{t("navbar.buy")}</Link>
          <Link className={navClass(isRentSelected)} href="/?type=RENT" aria-current={isRentSelected ? "page" : undefined}>{t("navbar.rent")}</Link>
          <Link className={navClass(isSellSelected)} href="/?type=SALE&intent=sell" aria-current={isSellSelected ? "page" : undefined}>{t("navbar.sell")}</Link>
          <Link className={navClass(isSavedSelected)} href="/saved" aria-current={isSavedSelected ? "page" : undefined}>{t("navbar.savedHomes")}</Link>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-5"><LanguageSelector /><button className="text-nordic-dark transition-colors hover:text-mosque" title={t("navbar.search")}><span className="material-icons">search</span></button><button className="relative text-nordic-dark transition-colors hover:text-mosque" title={t("navbar.notifications")}><span className="material-icons">notifications_none</span><span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-background-light bg-red-500" /></button>
          {loading ? <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" aria-label={t("navbar.loading")} /> : user ? <div className="relative border-l border-nordic-dark/10 pl-2" ref={menuRef}><button type="button" onClick={() => setIsUserMenuOpen((open) => !open)} className="flex items-center gap-2" title={displayName} aria-label={t("navbar.userMenu")} aria-expanded={isUserMenuOpen} aria-haspopup="menu"><div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-mosque text-sm font-semibold text-white ring-2 ring-transparent transition-all hover:ring-mosque">{avatarUrl && !avatarFailed ? <img src={avatarUrl} alt={`Avatar de ${displayName}`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} /> : initials}</div><span className="material-icons text-base text-nordic-muted">expand_more</span></button>
            {isUserMenuOpen && <div className="absolute right-0 mt-3 w-64 rounded-xl border border-nordic-dark/10 bg-white p-2 shadow-xl" role="menu"><div className="border-b border-nordic-dark/5 px-3 py-2"><p className="truncate text-sm font-semibold text-nordic-dark">{displayName}</p>{user.email && <p className="truncate text-xs text-nordic-muted">{user.email}</p>}</div><Link href="/admin" className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-nordic-dark transition-colors hover:bg-mosque/10 hover:text-mosque" role="menuitem"><span className="material-icons text-base">admin_panel_settings</span>Panel administrativo</Link><button type="button" onClick={handleSignOut} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-nordic-dark transition-colors hover:bg-red-50 hover:text-red-600" role="menuitem"><span className="material-icons text-base">logout</span>{t("navbar.logout")}</button></div>}
          </div> : <Link href="/login" className="rounded-lg bg-mosque px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mosque/90">{t("navbar.login")}</Link>}
        </div>
      </div></div>
      <div className="space-y-1 border-t border-nordic-dark/5 bg-background-light px-4 py-2 md:hidden">
        <Link className={navClass(isBuySelected, true)} href="/?type=SALE" aria-current={isBuySelected ? "page" : undefined}>{t("navbar.buy")}</Link>
        <Link className={navClass(isRentSelected, true)} href="/?type=RENT" aria-current={isRentSelected ? "page" : undefined}>{t("navbar.rent")}</Link>
        <Link className={navClass(isSellSelected, true)} href="/?type=SALE&intent=sell" aria-current={isSellSelected ? "page" : undefined}>{t("navbar.sell")}</Link>
        <Link className={navClass(isSavedSelected, true)} href="/saved" aria-current={isSavedSelected ? "page" : undefined}>{t("navbar.savedHomes")}</Link>
        {!loading && !user && <Link className="block rounded-md bg-mosque px-3 py-2 text-base font-medium text-white" href="/login">{t("navbar.login")}</Link>}{!loading && user && <><Link className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-mosque hover:bg-mosque/10" href="/admin"><span className="material-icons text-base">admin_panel_settings</span>Panel administrativo</Link><button type="button" onClick={handleSignOut} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-red-50"><span className="material-icons text-base">logout</span>{t("navbar.logout")}</button></>}</div>
    </nav>
  );
}
