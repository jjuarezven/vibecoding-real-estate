import { createClient } from "@/utils/supabase/server";

export const ROLES = ["admin", "manager", "user"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export async function getCurrentUserRole() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null as Role | null };

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return { user, role: isRole(data?.role) ? data.role : null };
}

export async function requireAdmin() {
  const result = await getCurrentUserRole();
  if (!result.user) return { ...result, authorized: false as const, status: 401 as const };
  if (result.role !== "admin") return { ...result, authorized: false as const, status: 403 as const };
  return { ...result, authorized: true as const };
}
