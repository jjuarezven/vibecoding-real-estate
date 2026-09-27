// Normalize and expand search queries (including city aliases). PostgreSQL ILIKE
// comparisons used below are case-insensitive and match partial text.

const CITY_ALIASES: Record<string, string[]> = {
  tokio: ["tokyo", "tokio"],
  tokyo: ["tokyo", "tokio"],
  kioto: ["kyoto", "kioto"],
  kyoto: ["kyoto", "kioto"],
  "nueva york": ["new york", "nueva york", "ny", "nyc"],
  "new york": ["new york", "nueva york", "ny", "nyc"],
  londres: ["london", "londres"],
  london: ["london", "londres"],
  paris: ["paris", "parís"],
  parís: ["paris", "parís"],
  florencia: ["florence", "florencia"],
  florence: ["florence", "florencia"],
  singapur: ["singapore", "singapur"],
  singapore: ["singapore", "singapur"],
  medellin: ["medellín", "medellin"],
  medellín: ["medellin", "medellín"],
  sidney: ["sydney", "sidney"],
  sydney: ["sydney", "sidney"],
  mexico: ["méxico", "mexico", "mexico city", "cdmx", "polanco"],
  méxico: ["méxico", "mexico", "mexico city", "cdmx", "polanco"],
  lisboa: ["lisbon", "lisboa"],
  lisbon: ["lisbon", "lisboa"],
  amsterdam: ["ámsterdam", "amsterdam"],
  ámsterdam: ["amsterdam", "ámsterdam"],
  reikiavik: ["reykjavik", "reikiavik"],
  reykjavik: ["reikiavik", "reykjavik"],
  atenas: ["athens", "atenas"],
  athens: ["athens", "atenas"],
  grecia: ["greece", "grecia", "santorini"],
  greece: ["greece", "grecia", "santorini"],
  espana: ["españa", "spain", "espana"],
  españa: ["spain", "españa", "espana"],
  spain: ["spain", "españa", "espana"],
  italia: ["italy", "italia"],
  italy: ["italy", "italia"],
  japon: ["japan", "japón", "japon"],
  japón: ["japan", "japón", "japon"],
  japan: ["japan", "japón", "japon"],
};

export function getSearchTerms(rawQuery: string): string[] {
  const clean = rawQuery.trim();
  if (!clean) return [];

  const lower = clean.toLocaleLowerCase();
  const set = new Set<string>([clean]);

  const directAliases = CITY_ALIASES[lower];
  directAliases?.forEach((alias) => set.add(alias));

  for (const word of lower.split(/\s+/)) {
    CITY_ALIASES[word]?.forEach((alias) => set.add(alias));
  }

  return Array.from(set);
}

// Search titles, locations (including city/address), categories and slugs. ILIKE
// provides case-insensitive substring matching. Remove PostgREST filter syntax
// characters so user input cannot break the .or() expression.
export function buildOrFilterString(terms: string[]): string {
  const columns = ["title", "location", "property_category", "slug"];
  const parts: string[] = [];

  for (const term of terms) {
    const sanitized = term.replace(/[%,_().\\"']/g, "").trim();
    if (!sanitized) continue;

    for (const column of columns) {
      parts.push(`${column}.ilike.%${sanitized}%`);
    }
  }

  return parts.join(",");
}
