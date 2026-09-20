import { createClient } from "@/utils/supabase/server";
import UserRoleTable from "@/components/admin/UserRoleTable";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabase.from("user_profiles").select("id,email,display_name,avatar_url,created_at").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id,role,updated_at"),
  ]);
  const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item]));
  const users = (profiles ?? []).map((profile) => ({ ...profile, role: roleMap.get(profile.id)?.role ?? "user", role_updated_at: roleMap.get(profile.id)?.updated_at ?? null }));
  return <section className="space-y-6"><div><p className="text-sm font-semibold uppercase tracking-wider text-mosque">Acceso</p><h1 className="mt-2 text-3xl font-semibold">Usuarios y roles</h1><p className="mt-2 text-nordic-muted">Actualiza los permisos de usuarios autenticados.</p></div><UserRoleTable users={users} /></section>;
}
