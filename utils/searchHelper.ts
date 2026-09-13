// Helper to normalize and expand search queries (Spanish <-> English city aliases, accents, title & location search)

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

  const lower = clean.toLowerCase();
  const set = new Set<string>();
  set.add(clean);

  // Check direct alias
  if (CITY_ALIASES[lower]) {
    CITY_ALIASES[lower].forEach((alias) => set.add(alias));
  }

  // Check sub-words
  const words = lower.split(/\s+/);
  for (const word of words) {
    if (CITY_ALIASES[word]) {
      CITY_ALIASES[word].forEach((alias) => set.add(alias));
    }
  }

  return Array.from(set);
}

// Builds a PostgREST .or() filter string for searching both location and title with all term variants
export function buildOrFilterString(terms: string[]): string {
  const parts: string[] = [];
  for (const term of terms) {
    const sanitized = term.replace(/[%_,]/g, "").trim();
    if (sanitized) {
      parts.push(`location.ilike.%${sanitized}%`);
      parts.push(`title.ilike.%${sanitized}%`);
    }
  }
  return parts.join(",");
}
