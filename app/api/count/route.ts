import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSearchTerms, buildOrFilterString } from "@/utils/searchHelper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const beds = searchParams.get("beds");
  const baths = searchParams.get("baths");
  const amenities = searchParams.get("amenities");

  const supabase = await createClient();

  let query = supabase
    .from("properties")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  if (q && q.trim()) {
    const terms = getSearchTerms(q);
    const orFilter = buildOrFilterString(terms);
    if (orFilter) {
      query = query.or(orFilter);
    }
  }

  if (type && type !== "Any" && type !== "All") {
    query = query.eq("type", type);
  }

  if (category && category !== "Any" && category !== "Any Type" && category !== "All") {
    query = query.ilike("property_category", category);
  }

  if (minPrice && !isNaN(Number(minPrice))) {
    query = query.gte("price", Number(minPrice));
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    query = query.lte("price", Number(maxPrice));
  }

  if (beds && !isNaN(Number(beds)) && Number(beds) > 0) {
    query = query.gte("beds", Number(beds));
  }

  if (baths && !isNaN(Number(baths)) && Number(baths) > 0) {
    query = query.gte("baths", Number(baths));
  }

  if (amenities && amenities.trim()) {
    const list = amenities.split(",").map((a) => a.trim()).filter(Boolean);
    if (list.length > 0) {
      query = query.contains("amenities", list);
    }
  }

  const { count, error } = await query;

  if (error) {
    return NextResponse.json({ count: 0, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
