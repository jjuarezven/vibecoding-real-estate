"use client";

import { useState } from "react";

type Role = "admin" | "manager" | "user";
type User = { id: string; email: string | null; display_name: string | null; created_at: string; role: string; role_updated_at: string | null };

export default function UserRoleTable({ users }: { users: User[] }) {
  const [rows, setRows] = useState(users);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const updateRole = async (id: string, role: Role) => {
    setSaving(id); setMessage(null);
    const response = await fetch(`/api/admin/users/${id}/role`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) setMessage(payload.error ?? "No se pudo actualizar el rol");
    else setRows((current) => current.map((user) => user.id === id ? { ...user, role } : user));
    setSaving(null);
  };
  return <div className="overflow-hidden rounded-2xl border border-nordic-dark/5 bg-white shadow-sm">{message && <p role="alert" className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">{message}</p>}<div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-nordic-dark text-white"><tr><th className="px-5 py-4 font-medium">Usuario</th><th className="px-5 py-4 font-medium">Alta</th><th className="px-5 py-4 font-medium">Rol</th><th className="px-5 py-4 font-medium">Acción</th></tr></thead><tbody className="divide-y divide-nordic-dark/5">{rows.map((user) => <tr key={user.id} className="hover:bg-background-light"><td className="px-5 py-4"><p className="font-semibold">{user.display_name || "Sin nombre"}</p><p className="text-xs text-nordic-muted">{user.email || "Sin email"}</p></td><td className="px-5 py-4 text-nordic-muted">{new Date(user.created_at).toLocaleDateString("es-MX")}</td><td className="px-5 py-4"><span className="rounded-full bg-mosque/10 px-2.5 py-1 text-xs font-semibold capitalize text-mosque">{user.role}</span></td><td className="px-5 py-4"><select aria-label={`Rol de ${user.email || user.id}`} value={user.role} disabled={saving === user.id} onChange={(event) => updateRole(user.id, event.target.value as Role)} className="rounded-lg border border-nordic-dark/10 bg-white px-3 py-2 text-sm outline-none focus:border-mosque">{["admin", "manager", "user"].map((role) => <option key={role} value={role}>{role}</option>)}</select>{saving === user.id && <span className="ml-2 text-xs text-nordic-muted">Guardando...</span>}</td></tr>)}</tbody></table></div>{rows.length === 0 && <p className="p-10 text-center text-nordic-muted">Todavía no hay usuarios sincronizados.</p>}</div>;
}
