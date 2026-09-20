import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import PropertyFormContent from "@/components/admin/PropertyFormContent";

export const metadata = { title: "Edit Property — LuxeEstate Admin" };

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();

  if (error || !data) notFound();

  return <PropertyFormContent mode="edit" property={data} />;
}
