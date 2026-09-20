import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdminApi } from "@/utils/admin";

// POST /api/admin/upload — upload an image to property-images bucket
export async function POST(request: NextRequest) {
  const { response } = await requireAdminApi();
  if (response) return response;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = await createClient();
  const { error } = await supabase.storage.from("property-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from("property-images").getPublicUrl(path);
  return NextResponse.json({ url: publicUrl, path });
}

// DELETE /api/admin/upload — delete an image from property-images bucket
export async function DELETE(request: NextRequest) {
  const { response } = await requireAdminApi();
  if (response) return response;

  const { path } = await request.json();
  if (!path) return NextResponse.json({ error: "No path provided" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.storage.from("property-images").remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
