import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdminApi } from "@/utils/admin";

export async function GET() {
  const { response } = await requireAdminApi();
  if (response) return response;
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ properties: data ?? [] });
}
