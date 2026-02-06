// src/data/zones.ts
export type ZoneKey = "sud-oise-60" | "val-doise-95";

export const ZONES = {
  "sud-oise-60": {
    key: "sud-oise-60",
    name: "Sud Oise (60)",
    deptLabel: "Oise (60)",
    headline:
      "SEO local, Google Maps et Ads pour capter des demandes qualifiées dans le Sud de l’Oise.",
    towns: [
      "Chantilly",
      "Senlis",
      "Lamorlaye",
      "Gouvieux",
      "Creil",
      "Nogent-sur-Oise",
      "Pont-Sainte-Maxence",
      "Clermont",
      "Méru",
      "Liancourt",
    ],
    intentExamples: [
      "éducateur canin Chantilly",
      "toiletteur chien Senlis",
      "pension canine Lamorlaye",
      "ostéopathe animalier Gouvieux",
      "vétérinaire Creil",
    ],
  },

  "val-doise-95": {
    key: "val-doise-95",
    name: "Val d’Oise (95)",
    deptLabel: "Val d’Oise (95)",
    headline:
      "Acquisition locale et pages dédiées par intention pour générer appels, formulaires et RDV.",
    towns: [
      "Cergy",
      "Pontoise",
      "L’Isle-Adam",
      "Enghien-les-Bains",
      "Sannois",
      "Argenteuil",
      "Franconville",
      "Herblay-sur-Seine",
      "Saint-Ouen-l’Aumône",
      "Gonesse",
    ],
    intentExamples: [
      "éducateur canin Cergy",
      "toiletteur chien Argenteuil",
      "pension canine Pontoise",
      "comportementaliste chien Franconville",
      "ostéopathe animalier L’Isle-Adam",
    ],
  },
} as const;

export type Zone = (typeof ZONES)[ZoneKey];

// ✅ Une “liste plate” de villes -> zone
export const VILLES = Object.values(ZONES).flatMap((z) =>
  z.towns.map((town) => ({
    town,
    zoneKey: z.key as ZoneKey,
  }))
);

// ✅ Helpers
export function slugifyCity(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findCityBySlug(slug: string) {
  const match = VILLES.find((v) => slugifyCity(v.town) === slug);
  if (!match) return null;
  return {
    ...match,
    zone: ZONES[match.zoneKey],
    slug,
  };
}