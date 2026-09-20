import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { isRole } from "@/utils/roles";
import { requireAdminApi } from "@/utils/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { auth, response } = await requireAdminApi();
  if (response) return response;
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!isRole(body?.role)) return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
  const supabase = await createClient();
  const { count } = await supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "admin");
  const { data: current } = await supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle();
  if (!current) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  if (id === auth.user.id && body.role !== "admin") return NextResponse.json({ error: "No puedes quitarte tu propio acceso de administrador" }, { status: 400 });
  if (current.role === "admin" && body.role !== "admin" && (count ?? 0) <= 1) return NextResponse.json({ error: "Debe existir al menos un administrador" }, { status: 400 });
  const { error } = await supabase.from("user_roles").update({ role: body.role, updated_at: new Date().toISOString() }).eq("user_id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, role: body.role });
}
