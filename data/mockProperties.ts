export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "SALE" | "RENT";
  beds: number;
  baths: number;
  area: number;
  images: { url: string; alt: string }[];
  slug: string;
  lat: number;
  lng: number;
  badge?: string;
  amenities?: string[];
  property_category?: string;
}

export const featuredProperties: Property[] = [
  {
    id: "f1",
    title: "The Glass Pavilion",
    location: "Beverly Hills, California",
    price: 5250000,
    type: "SALE",
    beds: 5,
    baths: 4.5,
    area: 4200,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM", alt: "Luxury modern villa exterior with pool" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "the-glass-pavilion",
  lat: 40.2048,
  lng: -96.5239,
    badge: "Exclusive",
  },
  {
    id: "f2",
    title: "Azure Heights Penthouse",
    location: "Downtown, Vancouver",
    price: 3800000,
    type: "SALE",
    beds: 3,
    baths: 3,
    area: 2100,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s", alt: "Modern interior living room with view" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "azure-heights-penthouse",
  lat: 44.7133,
  lng: -77.6869,
    badge: "New Arrival",
  },
  {
    id: "f3",
    title: "Serene Oasis Estate",
    location: "Malibu, California",
    price: 6400000,
    type: "SALE",
    beds: 6,
    baths: 6.5,
    area: 5500,
    images: [
    { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", alt: "Luxury Malibu beach villa" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "serene-oasis-estate",
  lat: 37.5537,
  lng: -77.7644,
    badge: "Exclusive",
  },
  {
    id: "f4",
    title: "The Obsidian Villa",
    location: "Reykjavik, Iceland",
    price: 4100000,
    type: "SALE",
    beds: 4,
    baths: 4,
    area: 3200,
    images: [
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", alt: "Modern black Scandinavian villa" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "the-obsidian-villa",
  lat: 42.8996,
  lng: -76.6634,
    badge: "Design Award",
  }
];

export const newMarketProperties: Property[] = [
  {
    id: "n1",
    title: "Modern Family Home",
    location: "123 Pine St, Seattle",
    price: 850000,
    type: "SALE",
    beds: 3,
    baths: 2,
    area: 120,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E", alt: "Modern white house facade" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "modern-family-home",
  lat: 45.5992,
  lng: -118.114,
  },
  {
    id: "n2",
    title: "Urban Loft",
    location: "456 Elm Ave, Portland",
    price: 3200,
    type: "RENT",
    beds: 1,
    baths: 1,
    area: 85,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4", alt: "Stylish apartment living room" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "urban-loft",
  lat: 31.3203,
  lng: -98.6756,
  },
  {
    id: "n3",
    title: "Highland Retreat",
    location: "789 Mountain Rd, Bend",
    price: 620000,
    type: "SALE",
    beds: 2,
    baths: 2,
    area: 98,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro", alt: "Cabin in the woods exterior" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "highland-retreat",
  lat: 35.242,
  lng: -100.3743,
  },
  {
    id: "n4",
    title: "Sea View Penthouse",
    location: "321 Ocean Dr, Miami",
    price: 4500,
    type: "RENT",
    beds: 3,
    baths: 3,
    area: 180,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U", alt: "Bright bedroom with large window" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "sea-view-penthouse",
  lat: 36.5911,
  lng: -109.7741,
  },
  {
    id: "n5",
    title: "Central Studio",
    location: "555 Main St, Chicago",
    price: 550000,
    type: "SALE",
    beds: 1,
    baths: 1,
    area: 50,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE", alt: "Cozy apartment interior" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "central-studio",
  lat: 39.3464,
  lng: -97.5726,
  },
  {
    id: "n6",
    title: "Garden Villa",
    location: "999 Oak Ln, Austin",
    price: 2800,
    type: "RENT",
    beds: 2,
    baths: 2,
    area: 110,
    images: [
    { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8", alt: "Modern minimalist home exterior" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "garden-villa",
  lat: 46.0342,
  lng: -115.1847,
  },
  {
    id: "n7",
    title: "Scandinavian Cabin",
    location: "Oslo, Norway",
    price: 1200000,
    type: "SALE",
    beds: 2,
    baths: 1.5,
    area: 105,
    images: [
    { url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", alt: "Wood cabin in snowy landscape" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "scandinavian-cabin",
  lat: 30.5782,
  lng: -112.4355,
  },
  {
    id: "n8",
    title: "Mid-Century Residence",
    location: "Palm Springs, California",
    price: 1850000,
    type: "SALE",
    beds: 4,
    baths: 3,
    area: 220,
    images: [
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Mid-century modern house with pool" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "mid-century-residence",
  lat: 31.0683,
  lng: -81.4506,
  },
  {
    id: "n9",
    title: "Industrial Loft Studio",
    location: "Brooklyn, New York",
    price: 4200,
    type: "RENT",
    beds: 1,
    baths: 1,
    area: 78,
    images: [
    { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", alt: "Brooklyn brick loft interior" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "industrial-loft-studio",
  lat: 35.2456,
  lng: -92.7821,
  },
  {
    id: "n10",
    title: "Contemporary Lake House",
    location: "Lake Tahoe, Nevada",
    price: 2900000,
    type: "SALE",
    beds: 4,
    baths: 4.5,
    area: 310,
    images: [
    { url: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80", alt: "Lakefront villa with deck" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "contemporary-lake-house",
  lat: 38.7185,
  lng: -115.1124,
  },
  {
    id: "n11",
    title: "Boho Chic Apartment",
    location: "Ibiza, Spain",
    price: 3500,
    type: "RENT",
    beds: 2,
    baths: 2,
    area: 90,
    images: [
    { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", alt: "Ibiza apartment balcony view" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "boho-chic-apartment",
  lat: 45.8479,
  lng: -110.1863,
  },
  {
    id: "n12",
    title: "Kyoto Townhouse",
    location: "Kyoto, Japan",
    price: 950000,
    type: "SALE",
    beds: 3,
    baths: 2,
    area: 135,
    images: [
    { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", alt: "Traditional Japanese townhouse interior" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "kyoto-townhouse",
  lat: 46.9216,
  lng: -71.5931,
  },
  {
    id: "n13",
    title: "Skyline Penthouse Suite",
    location: "Singapore",
    price: 8500,
    type: "RENT",
    beds: 2,
    baths: 2.5,
    area: 140,
    images: [
    { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", alt: "Stunning penthouse bedroom with glass walls" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "skyline-penthouse-suite",
  lat: 39.7684,
  lng: -105.6131,
  },
  {
    id: "n14",
    title: "Tuscan Stone Villa",
    location: "Florence, Italy",
    price: 3400000,
    type: "SALE",
    beds: 5,
    baths: 5,
    area: 450,
    images: [
    { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", alt: "Rustic Italian villa facade" },
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Extra 1" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", alt: "Extra 2" }
  ],
  slug: "tuscan-stone-villa",
  lat: 43.7696,
  lng: 11.2558,
  amenities: ["pool", "parking", "ac", "wifi", "terrace"],
  property_category: "Villa"
  },
  {
    id: "n15",
    title: "South Beach Rooftop Penthouse",
    location: "South Beach, Miami, FL",
    price: 2850000,
    type: "SALE",
    beds: 3,
    baths: 3,
    area: 260,
    images: [
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", alt: "Rooftop pool with city skyline" },
      { url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80", alt: "Living area" },
      { url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80", alt: "Bedroom" }
    ],
    slug: "south-beach-rooftop-penthouse",
    lat: 25.7907,
    lng: -80.1300,
    badge: "Exclusive",
    amenities: ["pool", "gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Penthouse"
  },
  {
    id: "n16",
    title: "Manhattan Midtown Luxury Condo",
    location: "Midtown Manhattan, New York",
    price: 3500000,
    type: "SALE",
    beds: 2,
    baths: 2,
    area: 160,
    images: [
      { url: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80", alt: "NYC skyline from floor-to-ceiling windows" },
      { url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80", alt: "Modern kitchen" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "Bedroom suite" }
    ],
    slug: "manhattan-midtown-luxury-condo",
    lat: 40.7580,
    lng: -73.9855,
    badge: "New Arrival",
    amenities: ["gym", "parking", "ac", "wifi"],
    property_category: "Apartment"
  },
  {
    id: "n17",
    title: "El Poblado Modern Apartment",
    location: "El Poblado, Medellín, Colombia",
    price: 2800,
    type: "RENT",
    beds: 2,
    baths: 2,
    area: 95,
    images: [
      { url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80", alt: "Modern open-plan apartment interior" },
      { url: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80", alt: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80", alt: "Balcony view" }
    ],
    slug: "el-poblado-modern-apartment",
    lat: 6.2086,
    lng: -75.5687,
    amenities: ["pool", "gym", "ac", "wifi", "terrace"],
    property_category: "Apartment"
  },
  {
    id: "n18",
    title: "Dubai Marina Sky Tower",
    location: "Dubai Marina, Dubai, UAE",
    price: 12000,
    type: "RENT",
    beds: 4,
    baths: 4,
    area: 380,
    images: [
      { url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80", alt: "Ultra-luxury penthouse with marina views" },
      { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", alt: "Infinity pool" },
      { url: "https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=800&q=80", alt: "Master bedroom" }
    ],
    slug: "dubai-marina-sky-tower",
    lat: 25.0780,
    lng: 55.1396,
    badge: "Exclusive",
    amenities: ["pool", "gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Penthouse"
  },
  {
    id: "n19",
    title: "Alfama Historic Townhouse",
    location: "Alfama, Lisbon, Portugal",
    price: 890000,
    type: "SALE",
    beds: 3,
    baths: 2,
    area: 148,
    images: [
      { url: "https://images.unsplash.com/photo-1526549944634-4f58bef2dfbc?auto=format&fit=crop&w=800&q=80", alt: "Traditional Portuguese townhouse facade" },
      { url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80", alt: "Tiled interior" },
      { url: "https://images.unsplash.com/photo-1600585155452-990dced4db0d?auto=format&fit=crop&w=800&q=80", alt: "Rooftop terrace" }
    ],
    slug: "alfama-historic-townhouse",
    lat: 38.7139,
    lng: -9.1334,
    amenities: ["wifi", "terrace"],
    property_category: "Townhouse"
  },
  {
    id: "n20",
    title: "Shibuya Minimalist Apartment",
    location: "Shibuya, Tokyo, Japan",
    price: 3500,
    type: "RENT",
    beds: 1,
    baths: 1,
    area: 52,
    images: [
      { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80", alt: "Japanese minimalist bedroom" },
      { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80", alt: "Open kitchen" },
      { url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80", alt: "City view" }
    ],
    slug: "shibuya-minimalist-apartment",
    lat: 35.6598,
    lng: 139.7037,
    amenities: ["ac", "wifi"],
    property_category: "Apartment"
  },
  {
    id: "n21",
    title: "Bondi Beachside House",
    location: "Bondi Beach, Sydney, Australia",
    price: 2100000,
    type: "SALE",
    beds: 4,
    baths: 3,
    area: 245,
    images: [
      { url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80", alt: "Contemporary beach house exterior" },
      { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80", alt: "Open plan living" },
      { url: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80", alt: "Deck with ocean view" }
    ],
    slug: "bondi-beachside-house",
    lat: -33.8914,
    lng: 151.2767,
    badge: "New Arrival",
    amenities: ["pool", "parking", "ac", "wifi", "terrace"],
    property_category: "House"
  },
  {
    id: "n22",
    title: "Sea Point Clifftop Villa",
    location: "Sea Point, Cape Town, South Africa",
    price: 1700000,
    type: "SALE",
    beds: 5,
    baths: 4,
    area: 420,
    images: [
      { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80", alt: "Villa with Atlantic Ocean and Table Mountain views" },
      { url: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80", alt: "Infinity pool" },
      { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80", alt: "Panoramic living room" }
    ],
    slug: "sea-point-clifftop-villa",
    lat: -33.9167,
    lng: 18.3833,
    badge: "Exclusive",
    amenities: ["pool", "gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Villa"
  },
  {
    id: "n23",
    title: "Palermo Soho Loft",
    location: "Palermo Soho, Buenos Aires, Argentina",
    price: 1800,
    type: "RENT",
    beds: 2,
    baths: 1,
    area: 88,
    images: [
      { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", alt: "Industrial chic loft with exposed brick" },
      { url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80", alt: "Open kitchen" },
      { url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80", alt: "Bedroom mezzanine" }
    ],
    slug: "palermo-soho-loft",
    lat: -34.5833,
    lng: -58.4167,
    amenities: ["wifi", "ac"],
    property_category: "Apartment"
  },
  {
    id: "n24",
    title: "Eixample Design Apartment",
    location: "Eixample, Barcelona, Spain",
    price: 780000,
    type: "SALE",
    beds: 3,
    baths: 2,
    area: 128,
    images: [
      { url: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80", alt: "Bright modernist apartment with original floors" },
      { url: "https://images.unsplash.com/photo-1600573472573-ec3ecf0f01f9?auto=format&fit=crop&w=800&q=80", alt: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=800&q=80", alt: "Balcony with city view" }
    ],
    slug: "eixample-design-apartment",
    lat: 41.3900,
    lng: 2.1600,
    amenities: ["ac", "wifi", "terrace"],
    property_category: "Apartment"
  },
  {
    id: "n25",
    title: "Jordaan Canal House",
    location: "Jordaan, Amsterdam, Netherlands",
    price: 1400000,
    type: "SALE",
    beds: 4,
    baths: 3,
    area: 190,
    images: [
      { url: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80", alt: "Classic Dutch canal house" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Interior" },
      { url: "https://images.unsplash.com/photo-1560185008-a33f5a064ec4?auto=format&fit=crop&w=800&q=80", alt: "Rooftop terrace" }
    ],
    slug: "jordaan-canal-house",
    lat: 52.3764,
    lng: 4.8814,
    badge: "Design Award",
    amenities: ["parking", "wifi", "terrace"],
    property_category: "House"
  },
  {
    id: "n26",
    title: "Polanco Sky Penthouse",
    location: "Polanco, Mexico City, Mexico",
    price: 1200000,
    type: "SALE",
    beds: 3,
    baths: 3,
    area: 210,
    images: [
      { url: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80", alt: "Contemporary penthouse with city panorama" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "Rooftop terrace pool" },
      { url: "https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=800&q=80", alt: "Living room" }
    ],
    slug: "polanco-sky-penthouse",
    lat: 19.4326,
    lng: -99.1932,
    amenities: ["pool", "gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Penthouse"
  },
  {
    id: "n27",
    title: "Le Marais Haussmann Apartment",
    location: "Le Marais, Paris, France",
    price: 4200,
    type: "RENT",
    beds: 1,
    baths: 1,
    area: 62,
    images: [
      { url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80", alt: "Classic Parisian apartment with herringbone floors" },
      { url: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?auto=format&fit=crop&w=800&q=80", alt: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80", alt: "Bedroom" }
    ],
    slug: "le-marais-haussmann-apartment",
    lat: 48.8566,
    lng: 2.3522,
    amenities: ["ac", "wifi"],
    property_category: "Apartment"
  },
  {
    id: "n28",
    title: "Notting Hill Victorian House",
    location: "Notting Hill, London, United Kingdom",
    price: 3900000,
    type: "SALE",
    beds: 5,
    baths: 4,
    area: 370,
    images: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", alt: "Classic white Victorian London townhouse" },
      { url: "https://images.unsplash.com/photo-1600585155452-990dced4db0d?auto=format&fit=crop&w=800&q=80", alt: "Victorian interiors" },
      { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80", alt: "Private garden" }
    ],
    slug: "notting-hill-victorian-house",
    lat: 51.5167,
    lng: -0.2000,
    badge: "Exclusive",
    amenities: ["parking", "ac", "wifi", "terrace"],
    property_category: "House"
  },
  {
    id: "n29",
    title: "Seminyak Luxury Pool Villa",
    location: "Seminyak, Bali, Indonesia",
    price: 5500,
    type: "RENT",
    beds: 4,
    baths: 4,
    area: 350,
    images: [
      { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", alt: "Balinese villa with tropical pool garden" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", alt: "Open-air living pavilion" },
      { url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80", alt: "Bedroom with garden view" }
    ],
    slug: "seminyak-luxury-pool-villa",
    lat: -8.6897,
    lng: 115.1619,
    badge: "Exclusive",
    amenities: ["pool", "gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Villa"
  },
  {
    id: "n30",
    title: "Tulum Jungle Eco-Retreat",
    location: "Tulum, Quintana Roo, Mexico",
    price: 3800,
    type: "RENT",
    beds: 3,
    baths: 3,
    area: 280,
    images: [
      { url: "https://images.unsplash.com/photo-1464146072230-91cabc968ddb?auto=format&fit=crop&w=800&q=80", alt: "Jungle retreat with cenote pool" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", alt: "Thatched open living room" },
      { url: "https://images.unsplash.com/photo-1601918774516-88be32e9e706?auto=format&fit=crop&w=800&q=80", alt: "Outdoor shower" }
    ],
    slug: "tulum-jungle-eco-retreat",
    lat: 20.2119,
    lng: -87.4655,
    amenities: ["pool", "wifi", "terrace"],
    property_category: "Villa"
  },
  {
    id: "n31",
    title: "Santorini Caldera Cliff House",
    location: "Oia, Santorini, Greece",
    price: 7500,
    type: "RENT",
    beds: 2,
    baths: 2,
    area: 115,
    images: [
      { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", alt: "Santorini white-washed cave house over caldera" },
      { url: "https://images.unsplash.com/photo-1601918774516-88be32e9e706?auto=format&fit=crop&w=800&q=80", alt: "Infinity pool at sunset" },
      { url: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=800&q=80", alt: "Bedroom with volcano view" }
    ],
    slug: "santorini-caldera-cliff-house",
    lat: 36.4619,
    lng: 25.3753,
    badge: "Exclusive",
    amenities: ["pool", "ac", "wifi", "terrace"],
    property_category: "House"
  },
  {
    id: "n32",
    title: "Plateau-Mont-Royal Loft",
    location: "Plateau-Mont-Royal, Montreal, Canada",
    price: 620000,
    type: "SALE",
    beds: 2,
    baths: 1,
    area: 102,
    images: [
      { url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80", alt: "Montreal loft with exposed brick and beams" },
      { url: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80", alt: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80", alt: "Bedroom" }
    ],
    slug: "plateau-mont-royal-loft",
    lat: 45.5267,
    lng: -73.5781,
    amenities: ["parking", "wifi"],
    property_category: "Apartment"
  },
  {
    id: "n33",
    title: "Coal Harbour Waterfront Condo",
    location: "Coal Harbour, Vancouver, Canada",
    price: 1100000,
    type: "SALE",
    beds: 2,
    baths: 2,
    area: 118,
    images: [
      { url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80", alt: "Glass condo tower with marina and mountain views" },
      { url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80", alt: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80", alt: "Master bedroom" }
    ],
    slug: "coal-harbour-waterfront-condo",
    lat: 49.2900,
    lng: -123.1200,
    badge: "New Arrival",
    amenities: ["gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Apartment"
  },
  {
    id: "n34",
    title: "Gold Coast Skyline Penthouse",
    location: "Gold Coast, Chicago, IL",
    price: 2400000,
    type: "SALE",
    beds: 4,
    baths: 3,
    area: 295,
    images: [
      { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", alt: "Chicago Gold Coast penthouse with lake views" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "Terrace" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "Living room with lake view" }
    ],
    slug: "gold-coast-skyline-penthouse",
    lat: 41.9013,
    lng: -87.6266,
    badge: "Design Award",
    amenities: ["gym", "parking", "ac", "wifi", "terrace"],
    property_category: "Penthouse"
  }
];
