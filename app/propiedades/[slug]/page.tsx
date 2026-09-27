import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PropertyDetailContent from "@/components/PropertyDetailContent";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-nordic-dark dark:text-white font-display antialiased">
      <Navbar />
      <PropertyDetailContent property={property} />
    </div>
  );
}
