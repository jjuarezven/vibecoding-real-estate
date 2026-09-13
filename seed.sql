CREATE TABLE IF NOT EXISTS properties (
  id text PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  location text NOT NULL,
  lat numeric NOT NULL,
  lng numeric NOT NULL,
  price numeric NOT NULL,
  type text NOT NULL,
  beds integer NOT NULL,
  baths numeric NOT NULL,
  area numeric NOT NULL,
  images jsonb NOT NULL,
  badge text,
  is_featured boolean DEFAULT false,
  amenities text[] DEFAULT '{}',
  property_category text DEFAULT 'House',
  created_at timestamptz DEFAULT now()
);

-- Add columns to existing table if upgrading
ALTER TABLE properties ADD COLUMN IF NOT EXISTS amenities text[] DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_category text DEFAULT 'House';

TRUNCATE TABLE properties;

-- ─── Featured Properties ───────────────────────────────────────────────────────
INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('f1', 'The Glass Pavilion', 'the-glass-pavilion', 'Beverly Hills, California', 34.0736, -118.4004, 5250000, 'SALE', 5, 4.5, 4200,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM","alt":"Luxury modern villa exterior with pool"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
'Exclusive', true, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('f2', 'Azure Heights Penthouse', 'azure-heights-penthouse', 'Downtown, Vancouver', 49.2827, -123.1207, 3800000, 'SALE', 3, 3, 2100,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s","alt":"Modern interior living room with view"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Living room"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
'New Arrival', true, ARRAY['gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('f3', 'Serene Oasis Estate', 'serene-oasis-estate', 'Malibu, California', 34.0259, -118.7798, 6400000, 'SALE', 6, 6.5, 5500,
'[{"url":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80","alt":"Luxury Malibu beach villa"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Pool"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
'Exclusive', true, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('f4', 'The Obsidian Villa', 'the-obsidian-villa', 'Reykjavik, Iceland', 64.1355, -21.8954, 4100000, 'SALE', 4, 4, 3200,
'[{"url":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80","alt":"Modern black Scandinavian villa"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Garden"}]'::jsonb,
'Design Award', true, ARRAY['parking','ac','wifi','terrace'], 'Villa');

-- ─── New Market Properties (existing updated) ─────────────────────────────────
INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n1', 'Modern Family Home', 'modern-family-home', '123 Pine St, Seattle, WA', 47.6062, -122.3321, 850000, 'SALE', 3, 2, 120,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E","alt":"Modern white house facade"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Living"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Garden"}]'::jsonb,
NULL, false, ARRAY['parking','ac','wifi'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n2', 'Urban Loft', 'urban-loft', '456 Elm Ave, Portland, OR', 45.5051, -122.6750, 3200, 'RENT', 1, 1, 85,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4","alt":"Stylish apartment living room"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Bedroom"}]'::jsonb,
NULL, false, ARRAY['wifi','ac'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n3', 'Highland Retreat', 'highland-retreat', '789 Mountain Rd, Bend, OR', 44.0582, -121.3153, 620000, 'SALE', 2, 2, 98,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro","alt":"Cabin in the woods exterior"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"View"}]'::jsonb,
NULL, false, ARRAY['parking','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n4', 'Sea View Penthouse', 'sea-view-penthouse', '321 Ocean Dr, Miami Beach, FL', 25.7907, -80.1300, 4500, 'RENT', 3, 3, 180,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U","alt":"Bright bedroom with large window"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Living room"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Terrace"}]'::jsonb,
NULL, false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n5', 'Central Studio', 'central-studio', '555 Main St, Chicago, IL', 41.8781, -87.6298, 550000, 'SALE', 1, 1, 50,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE","alt":"Cozy apartment interior"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"View"}]'::jsonb,
NULL, false, ARRAY['ac','wifi'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n6', 'Garden Villa', 'garden-villa', '999 Oak Ln, Austin, TX', 30.2672, -97.7431, 2800, 'RENT', 2, 2, 110,
'[{"url":"https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8","alt":"Modern minimalist home exterior"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Garden"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Interior"}]'::jsonb,
NULL, false, ARRAY['parking','ac','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n7', 'Scandinavian Cabin', 'scandinavian-cabin', 'Oslo, Norway', 59.9139, 10.7522, 1200000, 'SALE', 2, 1.5, 105,
'[{"url":"https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80","alt":"Wood cabin in snowy landscape"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
NULL, false, ARRAY['parking','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n8', 'Mid-Century Residence', 'mid-century-residence', 'Palm Springs, California', 33.8303, -116.5453, 1850000, 'SALE', 4, 3, 220,
'[{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Mid-century modern house with pool"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Pool"},{"url":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
NULL, false, ARRAY['pool','parking','ac','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n9', 'Industrial Loft Studio', 'industrial-loft-studio', 'Brooklyn, New York', 40.6782, -73.9442, 4200, 'RENT', 1, 1, 78,
'[{"url":"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80","alt":"Brooklyn brick loft interior"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Bedroom"}]'::jsonb,
NULL, false, ARRAY['wifi','ac'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n10', 'Contemporary Lake House', 'contemporary-lake-house', 'Lake Tahoe, Nevada', 39.0968, -120.0324, 2900000, 'SALE', 4, 4.5, 310,
'[{"url":"https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80","alt":"Lakefront villa with deck"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Deck"}]'::jsonb,
NULL, false, ARRAY['pool','parking','ac','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n11', 'Boho Chic Apartment', 'boho-chic-apartment', 'Ibiza, Spain', 38.9067, 1.4206, 3500, 'RENT', 2, 2, 90,
'[{"url":"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80","alt":"Ibiza apartment balcony view"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Living room"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Balcony"}]'::jsonb,
NULL, false, ARRAY['pool','ac','wifi','terrace'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n12', 'Kyoto Townhouse', 'kyoto-townhouse', 'Kyoto, Japan', 35.0116, 135.7681, 950000, 'SALE', 3, 2, 135,
'[{"url":"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80","alt":"Traditional Japanese townhouse interior"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Garden"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Exterior"}]'::jsonb,
NULL, false, ARRAY['parking','wifi'], 'Townhouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n13', 'Skyline Penthouse Suite', 'skyline-penthouse-suite', 'Marina Bay, Singapore', 1.2834, 103.8607, 8500, 'RENT', 2, 2.5, 140,
'[{"url":"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80","alt":"Stunning penthouse bedroom with glass walls"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Living room"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"View"}]'::jsonb,
NULL, false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n14', 'Tuscan Stone Villa', 'tuscan-stone-villa', 'Florence, Italy', 43.7696, 11.2558, 3400000, 'SALE', 5, 5, 450,
'[{"url":"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80","alt":"Rustic Italian villa facade"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Pool"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","alt":"Garden"}]'::jsonb,
NULL, false, ARRAY['pool','parking','ac','wifi','terrace'], 'Villa');

-- ─── 20 New Placeholder Properties (n15 – n34) ────────────────────────────────
INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n15', 'South Beach Rooftop Penthouse', 'south-beach-rooftop-penthouse', 'South Beach, Miami, FL', 25.7907, -80.1300, 2850000, 'SALE', 3, 3, 260,
'[{"url":"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80","alt":"Rooftop pool with city skyline"},{"url":"https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80","alt":"Living area"},{"url":"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80","alt":"Bedroom"}]'::jsonb,
'Exclusive', false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n16', 'Manhattan Midtown Luxury Condo', 'manhattan-midtown-luxury-condo', 'Midtown Manhattan, New York', 40.7580, -73.9855, 3500000, 'SALE', 2, 2, 160,
'[{"url":"https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80","alt":"NYC skyline from floor-to-ceiling windows"},{"url":"https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80","alt":"Modern kitchen"},{"url":"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80","alt":"Bedroom suite"}]'::jsonb,
'New Arrival', false, ARRAY['gym','parking','ac','wifi'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n17', 'El Poblado Modern Apartment', 'el-poblado-modern-apartment', 'El Poblado, Medellín, Colombia', 6.2086, -75.5687, 2800, 'RENT', 2, 2, 95,
'[{"url":"https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80","alt":"Modern open-plan apartment interior"},{"url":"https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80","alt":"Balcony view"}]'::jsonb,
NULL, false, ARRAY['pool','gym','ac','wifi','terrace'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n18', 'Dubai Marina Sky Tower', 'dubai-marina-sky-tower', 'Dubai Marina, Dubai, UAE', 25.0780, 55.1396, 12000, 'RENT', 4, 4, 380,
'[{"url":"https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80","alt":"Ultra-luxury penthouse with marina views"},{"url":"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80","alt":"Infinity pool"},{"url":"https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=800&q=80","alt":"Master bedroom"}]'::jsonb,
'Exclusive', false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n19', 'Alfama Historic Townhouse', 'alfama-historic-townhouse', 'Alfama, Lisbon, Portugal', 38.7139, -9.1334, 890000, 'SALE', 3, 2, 148,
'[{"url":"https://images.unsplash.com/photo-1526549944634-4f58bef2dfbc?auto=format&fit=crop&w=800&q=80","alt":"Traditional Portuguese townhouse facade"},{"url":"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80","alt":"Tiled interior"},{"url":"https://images.unsplash.com/photo-1600585155452-990dced4db0d?auto=format&fit=crop&w=800&q=80","alt":"Rooftop terrace"}]'::jsonb,
NULL, false, ARRAY['wifi','terrace'], 'Townhouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n20', 'Shibuya Minimalist Apartment', 'shibuya-minimalist-apartment', 'Shibuya, Tokyo, Japan', 35.6598, 139.7037, 3500, 'RENT', 1, 1, 52,
'[{"url":"https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80","alt":"Japanese minimalist bedroom"},{"url":"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80","alt":"Open kitchen"},{"url":"https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80","alt":"City view"}]'::jsonb,
NULL, false, ARRAY['ac','wifi'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n21', 'Bondi Beachside House', 'bondi-beachside-house', 'Bondi Beach, Sydney, Australia', -33.8914, 151.2767, 2100000, 'SALE', 4, 3, 245,
'[{"url":"https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80","alt":"Contemporary beach house exterior"},{"url":"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80","alt":"Open plan living"},{"url":"https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80","alt":"Deck with ocean view"}]'::jsonb,
'New Arrival', false, ARRAY['pool','parking','ac','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n22', 'Sea Point Clifftop Villa', 'sea-point-clifftop-villa', 'Sea Point, Cape Town, South Africa', -33.9167, 18.3833, 1700000, 'SALE', 5, 4, 420,
'[{"url":"https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80","alt":"Villa with Atlantic Ocean and Table Mountain views"},{"url":"https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80","alt":"Infinity pool"},{"url":"https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80","alt":"Panoramic living room"}]'::jsonb,
'Exclusive', false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n23', 'Palermo Soho Loft', 'palermo-soho-loft', 'Palermo Soho, Buenos Aires, Argentina', -34.5833, -58.4167, 1800, 'RENT', 2, 1, 88,
'[{"url":"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80","alt":"Industrial chic loft with exposed brick"},{"url":"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80","alt":"Open kitchen"},{"url":"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80","alt":"Bedroom mezzanine"}]'::jsonb,
NULL, false, ARRAY['wifi','ac'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n24', 'Eixample Design Apartment', 'eixample-design-apartment', 'Eixample, Barcelona, Spain', 41.3900, 2.1600, 780000, 'SALE', 3, 2, 128,
'[{"url":"https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80","alt":"Bright modernist apartment with original floors"},{"url":"https://images.unsplash.com/photo-1600573472573-ec3ecf0f01f9?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=800&q=80","alt":"Balcony with city view"}]'::jsonb,
NULL, false, ARRAY['ac','wifi','terrace'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n25', 'Jordaan Canal House', 'jordaan-canal-house', 'Jordaan, Amsterdam, Netherlands', 52.3764, 4.8814, 1400000, 'SALE', 4, 3, 190,
'[{"url":"https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80","alt":"Classic Dutch canal house"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","alt":"Interior"},{"url":"https://images.unsplash.com/photo-1560185008-a33f5a064ec4?auto=format&fit=crop&w=800&q=80","alt":"Rooftop terrace"}]'::jsonb,
'Design Award', false, ARRAY['parking','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n26', 'Polanco Sky Penthouse', 'polanco-sky-penthouse', 'Polanco, Mexico City, Mexico', 19.4326, -99.1932, 1200000, 'SALE', 3, 3, 210,
'[{"url":"https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80","alt":"Contemporary penthouse with city panorama"},{"url":"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80","alt":"Rooftop terrace pool"},{"url":"https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=800&q=80","alt":"Living room"}]'::jsonb,
NULL, false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Penthouse');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n27', 'Le Marais Haussmann Apartment', 'le-marais-haussmann-apartment', 'Le Marais, Paris, France', 48.8566, 2.3522, 4200, 'RENT', 1, 1, 62,
'[{"url":"https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80","alt":"Classic Parisian apartment with herringbone floors"},{"url":"https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80","alt":"Bedroom"}]'::jsonb,
NULL, false, ARRAY['ac','wifi'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n28', 'Notting Hill Victorian House', 'notting-hill-victorian-house', 'Notting Hill, London, United Kingdom', 51.5167, -0.2000, 3900000, 'SALE', 5, 4, 370,
'[{"url":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80","alt":"Classic white Victorian London townhouse"},{"url":"https://images.unsplash.com/photo-1600585155452-990dced4db0d?auto=format&fit=crop&w=800&q=80","alt":"Victorian interiors"},{"url":"https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80","alt":"Private garden"}]'::jsonb,
'Exclusive', false, ARRAY['parking','ac','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n29', 'Seminyak Luxury Pool Villa', 'seminyak-luxury-pool-villa', 'Seminyak, Bali, Indonesia', -8.6897, 115.1619, 5500, 'RENT', 4, 4, 350,
'[{"url":"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80","alt":"Balinese villa with tropical pool garden"},{"url":"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80","alt":"Open-air living pavilion"},{"url":"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80","alt":"Bedroom with garden view"}]'::jsonb,
'Exclusive', false, ARRAY['pool','gym','parking','ac','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n30', 'Tulum Jungle Eco-Retreat', 'tulum-jungle-eco-retreat', 'Tulum, Quintana Roo, Mexico', 20.2119, -87.4655, 3800, 'RENT', 3, 3, 280,
'[{"url":"https://images.unsplash.com/photo-1464146072230-91cabc968ddb?auto=format&fit=crop&w=800&q=80","alt":"Jungle retreat with cenote pool"},{"url":"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80","alt":"Thatched open living room"},{"url":"https://images.unsplash.com/photo-1601918774516-88be32e9e706?auto=format&fit=crop&w=800&q=80","alt":"Outdoor shower"}]'::jsonb,
NULL, false, ARRAY['pool','wifi','terrace'], 'Villa');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n31', 'Santorini Caldera Cliff House', 'santorini-caldera-cliff-house', 'Oia, Santorini, Greece', 36.4619, 25.3753, 7500, 'RENT', 2, 2, 115,
'[{"url":"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80","alt":"Santorini white-washed cave house over caldera"},{"url":"https://images.unsplash.com/photo-1601918774516-88be32e9e706?auto=format&fit=crop&w=800&q=80","alt":"Infinity pool at sunset"},{"url":"https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=800&q=80","alt":"Bedroom with volcano view"}]'::jsonb,
'Exclusive', false, ARRAY['pool','ac','wifi','terrace'], 'House');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n32', 'Plateau-Mont-Royal Loft', 'plateau-mont-royal-loft', 'Plateau-Mont-Royal, Montreal, Canada', 45.5267, -73.5781, 620000, 'SALE', 2, 1, 102,
'[{"url":"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80","alt":"Montreal loft with exposed brick and beams"},{"url":"https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80","alt":"Bedroom"}]'::jsonb,
NULL, false, ARRAY['parking','wifi'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n33', 'Coal Harbour Waterfront Condo', 'coal-harbour-waterfront-condo', 'Coal Harbour, Vancouver, Canada', 49.2900, -123.1200, 1100000, 'SALE', 2, 2, 118,
'[{"url":"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80","alt":"Glass condo tower with marina and mountain views"},{"url":"https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80","alt":"Kitchen"},{"url":"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80","alt":"Master bedroom"}]'::jsonb,
'New Arrival', false, ARRAY['gym','parking','ac','wifi','terrace'], 'Apartment');

INSERT INTO properties (id, title, slug, location, lat, lng, price, type, beds, baths, area, images, badge, is_featured, amenities, property_category) VALUES
('n34', 'Gold Coast Skyline Penthouse', 'gold-coast-skyline-penthouse', 'Gold Coast, Chicago, IL', 41.9013, -87.6266, 2400000, 'SALE', 4, 3, 295,
'[{"url":"https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80","alt":"Chicago Gold Coast penthouse with lake views"},{"url":"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80","alt":"Terrace"},{"url":"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80","alt":"Living room with lake view"}]'::jsonb,
'Design Award', false, ARRAY['gym','parking','ac','wifi','terrace'], 'Penthouse');
