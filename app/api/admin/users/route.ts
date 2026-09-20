import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdminApi } from "@/utils/admin";

export async function GET() {
  const { response } = await requireAdminApi();
  if (response) return response;
  const supabase = await createClient();
  const [{ data: profiles, error: profilesError }, { data: roles, error: rolesError }] = await Promise.all([
    supabase.from("user_profiles").select("id,email,display_name,avatar_url,created_at").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id,role,updated_at"),
  ]);
  if (profilesError || rolesError) return NextResponse.json({ error: profilesError?.message || rolesError?.message }, { status: 500 });
  const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item]));
  return NextResponse.json({ users: (profiles ?? []).map((profile) => ({ ...profile, role: roleMap.get(profile.id)?.role ?? "user", role_updated_at: roleMap.get(profile.id)?.updated_at ?? null })) });
}
