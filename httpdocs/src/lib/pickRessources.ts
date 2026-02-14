// src/lib/pickRessources.ts
type Article = {
  slug: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  image?: string;
  author?: string;
  intents?: string[];
  serviceSlugs?: string[];
  cibleSlugs?: string[];
  villeSlugs?: string[];
  category?: string;
};

type Contexte = {
  type?: string;
  service?: { slug: string };
  cible?: { slug: string };
  ville?: { slug: string };
};

function normArr(x: any): string[] {
  return Array.isArray(x) ? x.filter(Boolean).map(String) : [];
}

function parseDate(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

export function pickRessources(args: {
  articles: Article[];
  contexte?: Contexte;
  max?: number;
  intentsPriority?: string[];
}) {
  const max = args.max ?? 3;
  const intentsPriority = normArr(args.intentsPriority);

  const serviceSlug = args.contexte?.service?.slug;
  const cibleSlug = args.contexte?.cible?.slug;
  const villeSlug = args.contexte?.ville?.slug;

  const scored = (args.articles ?? [])
    .map((a) => {
      const aIntents = normArr(a.intents);
      const aServices = normArr(a.serviceSlugs);
      const aCibles = normArr(a.cibleSlugs);
      const aVilles = normArr(a.villeSlugs);

      let score = 0;

      // Matchs forts (prioritaires)
      if (serviceSlug && aServices.includes(serviceSlug)) score += 50;
      if (cibleSlug && aCibles.includes(cibleSlug)) score += 40;
      if (villeSlug && aVilles.includes(villeSlug)) score += 30;

      // Intents (bonus)
      for (let i = 0; i < intentsPriority.length; i++) {
        if (aIntents.includes(intentsPriority[i])) {
          score += Math.max(0, 20 - i * 2); // 20,18,16...
          break;
        }
      }

      // Fraîcheur (petit bonus)
      score += Math.min(10, Math.floor(parseDate(a.publishedAt) / (1000 * 60 * 60 * 24 * 30))); // très soft

      return { a, score };
    })
    .sort((x, y) => y.score - x.score);

  // Dédup par slug + garder les meilleurs
  const out: Article[] = [];
  const seen = new Set<string>();
  for (const { a } of scored) {
    if (!a?.slug || seen.has(a.slug)) continue;
    seen.add(a.slug);
    out.push(a);
    if (out.length >= max) break;
  }

  return out;
}
