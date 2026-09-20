import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { createClient } from "@/utils/supabase/server";
import { getSearchTerms, buildOrFilterString } from "@/utils/searchHelper";
import HomeContent from "@/components/HomeContent";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams;
  const page = typeof sp?.page === "string" ? parseInt(sp.page, 10) : 1;
  const ITEMS_PER_PAGE = 8;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  const q = typeof sp?.q === "string" ? sp.q.trim() : undefined;
  const type = typeof sp?.type === "string" ? sp.type : undefined;
  const category = typeof sp?.category === "string" ? sp.category : undefined;
  const minPrice = typeof sp?.minPrice === "string" ? sp.minPrice : undefined;
  const maxPrice = typeof sp?.maxPrice === "string" ? sp.maxPrice : undefined;
  const beds = typeof sp?.beds === "string" ? sp.beds : undefined;
  const baths = typeof sp?.baths === "string" ? sp.baths : undefined;
  const amenities = typeof sp?.amenities === "string" ? sp.amenities : undefined;
  const hasAnyFilter = Boolean(q || type || (category && category !== "All") || minPrice || maxPrice || beds || baths || amenities);

  const supabase = await createClient();
  const { data: featuredProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  let query = supabase.from("properties").select("*", { count: "exact" });

  if (q) {
    const orFilter = buildOrFilterString(getSearchTerms(q));
    if (orFilter) query = query.or(orFilter);
  }
  if (type && type !== "All" && type !== "Any") query = query.eq("type", type);
  if (category && category !== "All" && category !== "Any" && category !== "Any Type") {
    query = query.ilike("property_category", category);
  }
  if (minPrice && !isNaN(Number(minPrice))) query = query.gte("price", Number(minPrice));
  if (maxPrice && !isNaN(Number(maxPrice))) query = query.lte("price", Number(maxPrice));
  if (beds && !isNaN(Number(beds)) && Number(beds) > 0) query = query.gte("beds", Number(beds));
  if (baths && !isNaN(Number(baths)) && Number(baths) > 0) query = query.gte("baths", Number(baths));
  if (amenities) {
    const list = amenities.split(",").map((a) => a.trim()).filter(Boolean);
    if (list.length > 0) query = query.contains("amenities", list);
  }

  const { data: newMarketProperties, count } = await query
    .range(from, to)
    .order("created_at", { ascending: false });
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />
        <HomeContent
          hasAnyFilter={hasAnyFilter}
          featuredProperties={featuredProperties || []}
          newMarketProperties={newMarketProperties || []}
          count={count || 0}
          type={type}
          totalPages={totalPages}
          page={page}
          searchParams={sp}
        />
      </main>
    </>
  );
}
