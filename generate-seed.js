const fs = require('fs');

const content = fs.readFileSync('./data/mockProperties.ts', 'utf8');

function extractProperties(arrayName) {
  const match = content.match(new RegExp(`export const ${arrayName}: Property\\[\\] = \\[(.*?)\\];`, 's'));
  if (!match) return [];
  const arrayContent = match[1];
  
  const properties = [];
  const itemRegex = /{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*location:\s*"([^"]+)",\s*price:\s*([\d.]+),\s*type:\s*"([^"]+)",\s*beds:\s*([\d.]+),\s*baths:\s*([\d.]+),\s*area:\s*([\d.]+),\s*imageUrl:\s*"([^"]+)",\s*imageAlt:\s*"([^"]+)"(?:,\s*badge:\s*"([^"]+)")?/g;
  
  let itemMatch;
  while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
    properties.push({
      id: itemMatch[1],
      title: itemMatch[2],
      location: itemMatch[3],
      price: itemMatch[4],
      type: itemMatch[5],
      beds: itemMatch[6],
      baths: itemMatch[7],
      area: itemMatch[8],
      imageUrl: itemMatch[9],
      imageAlt: itemMatch[10],
      badge: itemMatch[11] || null
    });
  }
  return properties;
}

const featured = extractProperties('featuredProperties');
const newMarket = extractProperties('newMarketProperties');

let sql = `CREATE TABLE IF NOT EXISTS properties (
  id text PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL,
  type text NOT NULL,
  beds integer NOT NULL,
  baths numeric NOT NULL,
  area numeric NOT NULL,
  "imageUrl" text NOT NULL,
  "imageAlt" text NOT NULL,
  badge text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);\n\n`;

sql += `TRUNCATE TABLE properties;\n\n`;

function toSqlVal(val) {
  if (val === null) return 'NULL';
  if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
  return val;
}

for (const p of featured) {
  sql += `INSERT INTO properties (id, title, location, price, type, beds, baths, area, "imageUrl", "imageAlt", badge, is_featured) VALUES (${toSqlVal(p.id)}, ${toSqlVal(p.title)}, ${toSqlVal(p.location)}, ${toSqlVal(p.price)}, ${toSqlVal(p.type)}, ${toSqlVal(p.beds)}, ${toSqlVal(p.baths)}, ${toSqlVal(p.area)}, ${toSqlVal(p.imageUrl)}, ${toSqlVal(p.imageAlt)}, ${toSqlVal(p.badge)}, true);\n`;
}

for (const p of newMarket) {
  sql += `INSERT INTO properties (id, title, location, price, type, beds, baths, area, "imageUrl", "imageAlt", badge, is_featured) VALUES (${toSqlVal(p.id)}, ${toSqlVal(p.title)}, ${toSqlVal(p.location)}, ${toSqlVal(p.price)}, ${toSqlVal(p.type)}, ${toSqlVal(p.beds)}, ${toSqlVal(p.baths)}, ${toSqlVal(p.area)}, ${toSqlVal(p.imageUrl)}, ${toSqlVal(p.imageAlt)}, ${toSqlVal(p.badge)}, false);\n`;
}

fs.writeFileSync('./seed.sql', sql);
console.log('SQL Generated');
