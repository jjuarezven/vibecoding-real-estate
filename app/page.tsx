import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCard from "@/components/FeaturedCard";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { createClient } from "@/utils/supabase/server";
import { getSearchTerms, buildOrFilterString } from "@/utils/searchHelper";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams;
  const page = typeof sp?.page === "string" ? parseInt(sp.page, 10) : 1;
  const ITEMS_PER_PAGE = 8; // 8 items per page looks great in 4-column grid

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

  const hasAnyFilter = Boolean(
    q ||
      type ||
      (category && category !== "All") ||
      minPrice ||
      maxPrice ||
      beds ||
      baths ||
      amenities
  );

  const supabase = await createClient();

  // Fetch featured properties (shown when no deep filter, or always at top)
  const { data: featuredProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .limit(4);

  // Fetch new market properties with server-side filters and pagination
  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("is_featured", false);

  if (q) {
    const terms = getSearchTerms(q);
    const orFilter = buildOrFilterString(terms);
    if (orFilter) {
      query = query.or(orFilter);
    }
  }

  if (type && type !== "All" && type !== "Any") {
    query = query.eq("type", type);
  }

  if (category && category !== "All" && category !== "Any" && category !== "Any Type") {
    query = query.eq("property_category", category);
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

  if (amenities) {
    const list = amenities
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    if (list.length > 0) {
      query = query.contains("amenities", list);
    }
  }

  const { data: newMarketProperties, count } = await query
    .range(from, to)
    .order("id", { ascending: true });

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  // Helper for Buy / Rent tab URLs preserving other filters
  const buildTypeUrl = (newType?: string) => {
    const params = new URLSearchParams();
    Object.entries(sp || {}).forEach(([k, v]) => {
      if (k !== "page" && k !== "type" && typeof v === "string") {
        params.set(k, v);
      }
    });
    if (newType) {
      params.set("type", newType);
    }
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />

        {/* Featured section shown when not searching specific query or filters */}
        {!hasAnyFilter && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">
                  Featured Collections
                </h2>
                <p className="text-nordic-muted mt-1 text-sm">
                  Curated properties for the discerning eye.
                </p>
              </div>
              <a
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
                href="#all-properties"
              >
                View all <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProperties?.map((property) => (
                <FeaturedCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}

        <section id="all-properties">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                {hasAnyFilter ? "Search & Filter Results" : "New in Market"}
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                {hasAnyFilter
                  ? `Showing ${count || 0} ${
                      (count || 0) === 1 ? "property" : "properties"
                    } matching your criteria.`
                  : "Fresh opportunities added this week."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded-lg border border-nordic-dark/5 shadow-sm flex">
                <Link
                  href={buildTypeUrl(undefined)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    !type
                      ? "bg-nordic-dark text-white shadow-sm"
                      : "text-nordic-muted hover:text-nordic-dark"
                  }`}
                >
                  All
                </Link>
                <Link
                  href={buildTypeUrl("SALE")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    type === "SALE"
                      ? "bg-nordic-dark text-white shadow-sm"
                      : "text-nordic-muted hover:text-nordic-dark"
                  }`}
                >
                  Buy
                </Link>
                <Link
                  href={buildTypeUrl("RENT")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    type === "RENT"
                      ? "bg-nordic-dark text-white shadow-sm"
                      : "text-nordic-muted hover:text-nordic-dark"
                  }`}
                >
                  Rent
                </Link>
              </div>

              {hasAnyFilter && (
                <Link
                  href="/"
                  className="text-xs font-medium text-nordic-muted hover:text-mosque px-3 py-1.5 rounded-lg border border-nordic-dark/10 bg-white hover:border-mosque transition-all"
                >
                  Reset
                </Link>
              )}
            </div>
          </div>

          {newMarketProperties && newMarketProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newMarketProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm border border-nordic-dark/5 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
                <span className="material-icons text-3xl">search_off</span>
              </div>
              <h3 className="text-lg font-medium text-nordic-dark">
                No properties found
              </h3>
              <p className="text-sm text-nordic-muted">
                We couldn&apos;t find any properties matching your current search and
                filter combination.
              </p>
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mosque text-white text-sm font-medium hover:bg-mosque/90 transition-colors shadow-sm"
                >
                  Clear all filters
                </Link>
              </div>
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchParams={sp}
          />
        </section>
      </main>
    </>
  );
}
