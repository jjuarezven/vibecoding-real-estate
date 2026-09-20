import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ count: properties }, { count: users }, { count: admins }] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("user_profiles").select("id", { count: "exact", head: true }),
    supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "admin"),
  ]);
  const cards = [
    { label: "Propiedades", value: properties ?? 0, href: "/admin/properties", icon: "home_work" },
    { label: "Usuarios", value: users ?? 0, href: "/admin/users", icon: "group" },
    { label: "Administradores", value: admins ?? 0, href: "/admin/users", icon: "verified_user" },
  ];
  return <div className="space-y-8"><div><p className="text-sm font-semibold uppercase tracking-wider text-mosque">LuxeEstate</p><h1 className="mt-2 text-3xl font-semibold">Resumen administrativo</h1><p className="mt-2 text-nordic-muted">Gestiona el catálogo y los permisos de la aplicación.</p></div><div className="grid gap-5 md:grid-cols-3">{cards.map((card) => <Link key={card.label} href={card.href} className="rounded-2xl border border-nordic-dark/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><span className="material-icons text-mosque">{card.icon}</span><p className="mt-5 text-sm text-nordic-muted">{card.label}</p><p className="mt-1 text-3xl font-semibold">{card.value}</p><p className="mt-4 text-sm font-medium text-mosque">Ver detalle →</p></Link>)}</div><div className="grid gap-5 md:grid-cols-2"><Link href="/admin/properties" className="rounded-2xl bg-nordic-dark p-6 text-white transition hover:bg-nordic-dark/90"><span className="material-icons text-3xl text-primary">real_estate_agent</span><h2 className="mt-5 text-xl font-semibold">Propiedades actuales</h2><p className="mt-2 text-sm text-white/70">Consulta el inventario publicado y sus principales datos.</p></Link><Link href="/admin/users" className="rounded-2xl bg-mosque p-6 text-white transition hover:bg-mosque/90"><span className="material-icons text-3xl text-primary">manage_accounts</span><h2 className="mt-5 text-xl font-semibold">Gestionar roles</h2><p className="mt-2 text-sm text-white/80">Actualiza los permisos de los usuarios autenticados.</p></Link></div></div>;
}
