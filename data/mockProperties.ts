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
  lat: 49.4691,
  lng: -104.3572,
  }
];
