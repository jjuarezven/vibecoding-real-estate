import { createClient } from "@/utils/supabase/server";
import AdminPropertiesContent from "@/components/admin/AdminPropertiesContent";

type Property = { id: string; title: string; location: string; type: string; price: number | string; beds: number; baths: number; area: number; images: unknown; property_category: string | null; is_featured: boolean; is_active: boolean };

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("id,title,location,type,price,beds,baths,area,images,property_category,is_featured,is_active").order("created_at", { ascending: false });
  return <AdminPropertiesContent properties={(data ?? []) as Property[]} error={Boolean(error)} />;
}
