import { NextResponse } from "next/server";
import { requireAdmin } from "@/utils/roles";

export async function requireAdminApi() {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return { auth, response: NextResponse.json(
      { error: auth.status === 401 ? "No autenticado" : "No autorizado" },
      { status: auth.status }
    ) };
  }
  return { auth, response: null };
}
