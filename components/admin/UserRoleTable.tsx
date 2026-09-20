"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { ADMIN_PAGE_SIZE } from "@/constants/admin";
import AdminPagination from "@/components/admin/AdminPagination";

type Role = "admin" | "manager" | "user";
type User = { id: string; email: string | null; display_name: string | null; avatar_url?: string | null; created_at: string; role: string; role_updated_at: string | null };

function initials(user: User) {
  return (user.display_name || user.email || "U").split(/[ @]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function UserRoleTable({ users }: { users: User[] }) {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [rows, setRows] = useState(users);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Role>("all");
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const roleLabels: Record<Role, string> = { admin: t("admin.roles.admin"), manager: t("admin.roles.manager"), user: t("admin.roles.user") };

  const filtered = useMemo(() => rows.filter((user) => {
    const matchesQuery = `${user.display_name ?? ""} ${user.email ?? ""}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (filter === "all" || user.role === filter);
  }), [filter, query, rows]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ADMIN_PAGE_SIZE;
    return filtered.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [query, filter]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / ADMIN_PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [filtered.length, page]);

  const updateRole = async (id: string, role: Role) => {
    setSaving(id); setMessage(null);
    const response = await fetch(`/api/admin/users/${id}/role`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) setMessage(payload.error ?? t("admin.users.updateError"));
    else setRows((current) => current.map((user) => user.id === id ? { ...user, role } : user));
    setSaving(null);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 border-b border-nordic-dark/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-5 overflow-x-auto">
          {(["all", "manager", "admin", "user"] as const).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium ${filter === item ? "border-mosque font-semibold text-mosque" : "border-transparent text-nordic-muted hover:text-nordic-dark"}`}>{item === "all" ? t("admin.users.allUsers") : roleLabels[item]}</button>)}
        </div>
        <div className="relative w-full sm:w-80">
          <span className="material-icons absolute left-3 top-2.5 text-xl text-nordic-muted/60">search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("admin.users.searchPlaceholder")} className="w-full rounded-lg border-0 bg-white py-2.5 pl-10 pr-3 text-sm text-nordic-dark shadow-soft outline-none ring-mosque focus:ring-2" />
        </div>
      </div>
      {message && <p role="alert" className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
      <div className="mt-4 hidden grid-cols-12 gap-4 px-5 text-xs font-semibold uppercase tracking-wider text-nordic-muted md:grid"><div className="col-span-4">{t("admin.users.userDetails")}</div><div className="col-span-3">{t("admin.users.roleStatus")}</div><div className="col-span-3">{t("admin.users.account")}</div><div className="col-span-2 text-right">{t("admin.users.actions")}</div></div>
      <div className="mt-2 space-y-3">
        {paginated.map((user, index) => <div key={user.id} className={`group rounded-xl border border-transparent p-5 shadow-sm transition hover:shadow-soft md:grid md:grid-cols-12 md:items-center md:gap-4 ${index === 0 && page === 1 ? "bg-hint-green" : "bg-white hover:bg-hint-green/60"}`}>
          <div className="flex min-w-0 items-center md:col-span-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mosque text-sm font-bold text-white ring-2 ring-white">{user.avatar_url ? <img src={user.avatar_url} alt="" className="h-full w-full object-cover" /> : initials(user)}</div><div className="ml-4 min-w-0"><p className="truncate text-sm font-bold">{user.display_name || t("admin.users.noName")}</p><p className="truncate text-xs text-nordic-muted">{user.email || t("admin.users.noEmail")}</p><p className="mt-1 inline-block rounded bg-white/60 px-2 py-0.5 text-[10px] text-nordic-muted">ID: #{user.id.slice(0, 8).toUpperCase()}</p></div></div>
          <div className="mt-4 flex items-center justify-between gap-4 md:col-span-3 md:mt-0 md:justify-start"><span className={`rounded-md px-2.5 py-1 text-xs font-medium ${user.role === "admin" ? "bg-nordic-dark text-white" : "bg-mosque/10 text-mosque"}`}>{roleLabels[user.role as Role] ?? user.role}</span><span className="flex items-center text-xs text-nordic-muted"><span className="material-icons mr-1 text-[14px] text-mosque">check_circle</span>{t("admin.users.active")}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:col-span-3 md:mt-0"><div><p className="text-[10px] uppercase tracking-wider text-nordic-muted">{t("admin.users.joined")}</p><p className="text-sm font-semibold">{new Date(user.created_at).toLocaleDateString(locale)}</p></div><div><p className="text-[10px] uppercase tracking-wider text-nordic-muted">{t("admin.users.provider")}</p><p className="text-sm font-semibold">{t("admin.users.socialLogin")}</p></div></div>
          <div className="mt-4 flex justify-end md:col-span-2 md:mt-0"><select aria-label={`${t("admin.users.changeRole")}: ${user.email || user.id}`} value={user.role} disabled={saving === user.id} onChange={(event) => updateRole(user.id, event.target.value as Role)} className="w-full rounded-lg border border-nordic-dark/10 bg-white px-3 py-2 text-xs font-medium text-nordic-dark outline-none focus:border-mosque md:w-auto"><option value="admin">{roleLabels.admin}</option><option value="manager">{roleLabels.manager}</option><option value="user">{roleLabels.user}</option></select></div>
        </div>)}
      </div>
      {filtered.length === 0 && <div className="rounded-xl bg-white p-12 text-center text-sm text-nordic-muted shadow-sm">{t("admin.users.empty")}</div>}
      <AdminPagination page={page} pageSize={ADMIN_PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
    </div>
  );
}
