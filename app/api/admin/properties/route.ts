import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  const { response } = await requireAdminApi();
  if (response) return response;

  const body = await request.json();
  const { title, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category, description, year_built, parking } = body;

  if (!title || !location || !price || !type || beds === undefined || baths === undefined || area === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Auto-generate slug from title + timestamp
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;
  const id = slug;

  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").insert({
    id, slug, title, location,
    lat: lat ?? 0, lng: lng ?? 0,
    price: Number(price), type, beds: Number(beds), baths: Number(baths), area: Number(area),
    images: images ?? [],
    badge: badge ?? null,
    is_featured: is_featured ?? false,
    amenities: amenities ?? [],
    property_category: property_category ?? null,
    description: description ?? null,
    year_built: year_built ? Number(year_built) : null,
    parking: parking ? Number(parking) : null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ property: data }, { status: 201 });
}
