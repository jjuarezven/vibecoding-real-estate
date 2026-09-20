import { createClient } from "@/utils/supabase/server";
import UserRoleTable from "@/components/admin/UserRoleTable";
import AdminUsersHeader from "@/components/admin/AdminUsersHeader";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabase.from("user_profiles").select("id,email,display_name,avatar_url,created_at").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id,role,updated_at"),
  ]);
  const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item]));
  const users = (profiles ?? []).map((profile) => ({
    ...profile,
    role: roleMap.get(profile.id)?.role ?? "user",
    role_updated_at: roleMap.get(profile.id)?.updated_at ?? null,
  }));

  return <section><AdminUsersHeader count={users.length} /><UserRoleTable users={users} /></section>;
}
