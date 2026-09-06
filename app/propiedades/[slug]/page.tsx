import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ClientPropertyMap from "@/components/ClientPropertyMap";
import PropertyGallery from "@/components/PropertyGallery";

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
    .single();

  if (error || !property) {
    notFound();
  }

  const isRent = property.type === "RENT";
  const images = property.images || [];
  const mainImage = images[0];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-nordic-dark dark:text-white font-display antialiased">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold text-white ${isRent ? 'bg-mosque' : 'bg-nordic-dark'}`}>
                {isRent ? "FOR RENT" : "FOR SALE"}
              </span>
              {property.badge && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-white text-nordic-dark border border-nordic-dark/10 shadow-sm">
                  {property.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-light leading-tight">{property.title}</h1>
            <p className="text-nordic-muted text-sm flex items-center gap-1 mt-2">
              <span className="material-icons text-sm">place</span>
              {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl md:text-4xl font-semibold text-mosque">
              ${Number(property.price).toLocaleString()}
              {isRent && <span className="text-xl font-normal text-nordic-muted">/mo</span>}
            </p>
          </div>
        </div>

        {/* Interactive Image Gallery */}
        <PropertyGallery images={images} />

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-nordic-dark/10">
              <div className="flex items-center gap-2">
                <span className="material-icons text-mosque text-2xl">king_bed</span>
                <span className="text-xl font-medium">{property.beds} <span className="text-nordic-muted text-base font-normal">Beds</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-mosque text-2xl">bathtub</span>
                <span className="text-xl font-medium">{property.baths} <span className="text-nordic-muted text-base font-normal">Baths</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-mosque text-2xl">square_foot</span>
                <span className="text-xl font-medium">{property.area} <span className="text-nordic-muted text-base font-normal">m²</span></span>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-medium mb-4">About this property</h2>
              <p className="text-nordic-muted leading-relaxed">
                Experience unparalleled luxury in this stunning {property.type.toLowerCase()} property. 
                Located in the prestigious {property.location}, this home features {property.beds} bedrooms and {property.baths} bathrooms 
                across {property.area} square meters of beautifully designed living space. High-end finishes, 
                an open floor plan, and ample natural light make this {isRent ? "apartment" : "house"} a true sanctuary.
              </p>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Location</h2>
              <div className="h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                <ClientPropertyMap lat={property.lat} lng={property.lng} />
              </div>
              <p className="text-sm text-nordic-muted mt-2 text-center">Map data © OpenStreetMap contributors</p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-xl shadow-soft border border-nordic-dark/5">
              <h3 className="text-xl font-medium mb-4">Interested in this property?</h3>
              <p className="text-sm text-nordic-muted mb-6">Contact our premium agents to schedule a private viewing.</p>
              
              <div className="space-y-4">
                <button className="w-full py-3 px-4 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-mosque/20">
                  <span className="material-icons">event</span> Schedule a Tour
                </button>
                <button className="w-full py-3 px-4 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span className="material-icons">mail</span> Contact Agent
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-nordic-dark/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-nordic-dark">Sarah Jenkins</h4>
                  <p className="text-xs text-nordic-muted">Senior Luxury Agent</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
