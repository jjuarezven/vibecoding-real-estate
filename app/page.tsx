import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCard from "@/components/FeaturedCard";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { createClient } from "@/utils/supabase/server";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams;
  const page = typeof sp?.page === "string" ? parseInt(sp.page, 10) : 1;
  const ITEMS_PER_PAGE = 10;

  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const supabase = await createClient();

  // Fetch featured properties
  const { data: featuredProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .limit(4);

  // Fetch new market properties with pagination
  const { data: newMarketProperties, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("is_featured", false)
    .range(from, to)
    .order("id", { ascending: true }); // ordering by id as a fallback

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />

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
              href="#"
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

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                New in Market
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                Fresh opportunities added this week.
              </p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
                All
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                Buy
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                Rent
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newMarketProperties?.map((property, idx) => {
              let className = "";
              if (idx === 4) className = "hidden xl:flex";
              if (idx === 5) className = "hidden lg:flex";
              
              return (
                <PropertyCard
                  key={property.id}
                  property={property}
                  className={className}
                />
              );
            })}
          </div>
          
          <Pagination currentPage={page} totalPages={totalPages} />
        </section>
      </main>
    </>
  );
}
