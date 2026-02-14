// src/lib/hrefs.ts

type Contexte = {
  zone?: { slug: string };
  ville?: { slug: string };
};

/**
 * Génère le bon href pour un service:
 * - si on est dans une page locale (zone+ville) => /zones/:zone/:ville/:service/
 * - sinon => /services/:service/
 */
export function buildServiceHref(contexte: Contexte | undefined, serviceSlug: string): string {
  const zoneSlug = contexte?.zone?.slug;
  const villeSlug = contexte?.ville?.slug;

  if (zoneSlug && villeSlug) return `/zones/${zoneSlug}/${villeSlug}/${serviceSlug}/`;
  return `/services/${serviceSlug}/`;
}
