// src/lib/seoRules.ts

export type KeywordMode = "consultant" | "agence";

export type Entity = { slug: string; name?: string; label?: string };

export type Contexte = {
  type?: string; // ex: "service", "ville", "serviceVille", "cibleVille", etc.
  zone?: Entity;
  ville?: Entity;
  service?: Entity;
  cible?: Entity;
};

export type Service = { slug: string; name: string };
export type Ville = { slug: string; name: string; zoneSlug: string; around?: string[] };

export type Defaults = {
  primaryKeyword: KeywordMode; // ex: "consultant"
  variantKeyword: KeywordMode; // ex: "agence"
  servicesPrimary: string[];
  servicesSecondary: string[];
};

export type MappingCibles = {
  defaults: Defaults;
  cibles: Array<{
    slug: string;
    label: string;
    focus: string[];
    secondary: string[];
  }>;
};

/**
 * Alternance stable par service (quand on n'est PAS sur une page locale).
 * Règle voulue : stable partout, jamais au hasard.
 */
const MODE_BY_SERVICE: Record<string, KeywordMode> = {
  "seo-local": "consultant",
  "google-ads": "agence",
  "pages-locales": "consultant",
  "google-business-profile": "consultant",
  "meta-ads": "agence",
  tracking: "consultant",
};

/**
 * Mode stable par ville (pour service×ville).
 * Règle voulue : 1 seule version (consultant OU agence) sur TOUTES les pages service×ville de cette ville.
 */
function modeByVilleSlug(villeSlug: string, primary: KeywordMode): KeywordMode {
  // hash simple & stable
  let h = 0;
  for (let i = 0; i < villeSlug.length; i++) h = (h * 31 + villeSlug.charCodeAt(i)) >>> 0;

  const other: KeywordMode = primary === "consultant" ? "agence" : "consultant";
  return h % 2 === 0 ? primary : other;
}

/**
 * pickKeywordMode(contexte)
 * - Si ville présente => mode stable par ville (service×ville)
 * - Sinon => alternance stable par service (MODE_BY_SERVICE)
 * - Fallback => defaults.primaryKeyword
 */
export function pickKeywordMode(contexte: Contexte | undefined, defaults: Defaults): KeywordMode {
  const villeSlug = contexte?.ville?.slug;
  if (villeSlug) return modeByVilleSlug(villeSlug, defaults.primaryKeyword);

  const serviceSlug = contexte?.service?.slug;
  if (serviceSlug && MODE_BY_SERVICE[serviceSlug]) return MODE_BY_SERVICE[serviceSlug];

  return defaults.primaryKeyword;
}

/**
 * buildTitleH1({service, ville, mode})
 * - Title : "Consultant/Agence + Service + à + Ville | Brand"
 * - H1 : proche mais pas strictement identique au title (évite duplication)
 */
export function buildTitleH1(args: {
  service: Pick<Service, "slug" | "name">;
  ville: Pick<Ville, "slug" | "name">;
  mode: KeywordMode;
  brand?: string; // ex: "Horizon Conversion"
}) {
  const brand = args.brand ?? "Horizon Conversion";
  const keyword = args.mode === "consultant" ? "Consultant" : "Agence";

  const title = `${keyword} ${args.service.name} à ${args.ville.name} | ${brand}`;
  const h1 = `${keyword} ${args.service.name} à ${args.ville.name}`;

  return { title, h1 };
}

/**
 * pickServicesUniques({contexte, mappingCibles, defaults, max})
 * - Si contexte.cible => focus d’abord, puis secondary
 * - Sinon => defaults.servicesPrimary puis defaults.servicesSecondary
 * - Dédup en gardant l’ordre
 * - Retire le service courant (si présent)
 * - Clamp max
 */
export function pickServicesUniques(args: {
  contexte?: Contexte;
  mappingCibles: MappingCibles;
  defaults?: Defaults; // override éventuel, sinon mappingCibles.defaults
  max?: number;
}): string[] {
  const max = args.max ?? 6;
  const defaults = args.defaults ?? args.mappingCibles.defaults;

  const cibleSlug = args.contexte?.cible?.slug;
  const currentServiceSlug = args.contexte?.service?.slug;

  const cible = cibleSlug
    ? args.mappingCibles.cibles.find((c) => c.slug === cibleSlug)
    : undefined;

  const source = cible
    ? [...(cible.focus ?? []), ...(cible.secondary ?? [])]
    : [...(defaults.servicesPrimary ?? []), ...(defaults.servicesSecondary ?? [])];

  // dédup en gardant l’ordre, + exclure current service, + max
  const out: string[] = [];
  const seen = new Set<string>();

  for (const s of source) {
    if (!s) continue;
    if (currentServiceSlug && s === currentServiceSlug) continue;
    if (seen.has(s)) continue;

    seen.add(s);
    out.push(s);
    if (out.length >= max) break;
  }

  return out;
}

/**
 * resolveAroundLinks(ville.around, villes)
 * - around[] contient des noms “humains”
 * - On ne crée des liens QUE si on retrouve une ville dans villes.json (zéro mismatch)
 * - Retourne uniquement les matches (pas de "texte-only" ici)
 */
export function resolveAroundLinks(
  around: string[] | undefined,
  villes: Ville[],
  zoneSlug?: string // optionnel: prioriser les matchs dans la même zone
): Array<{ label: string; href: string; ville: Ville }> {
  if (!Array.isArray(around) || !around.length) return [];
  if (!Array.isArray(villes) || !villes.length) return [];

  const norm = (s: string) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // accents
      .replace(/[’']/g, "-")
      .replace(/[^a-z0-9- ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // index par nom normalisé
  const indexByName = new Map<string, Ville[]>();
  for (const v of villes) {
    const key = norm(v.name);
    if (!key) continue;
    const arr = indexByName.get(key) ?? [];
    arr.push(v);
    indexByName.set(key, arr);
  }

  const results: Array<{ label: string; href: string; ville: Ville }> = [];

  for (const label of around) {
    const key = norm(label);
    if (!key) continue;

    const candidates = indexByName.get(key);
    if (!candidates?.length) continue;

    const picked =
      zoneSlug ? candidates.find((c) => c.zoneSlug === zoneSlug) ?? candidates[0] : candidates[0];

    results.push({
      label,
      href: `/zones/${picked.zoneSlug}/${picked.slug}/`,
      ville: picked,
    });
  }

  // dédup par slug
  const seen = new Set<string>();
  return results.filter((x) => {
    if (seen.has(x.ville.slug)) return false;
    seen.add(x.ville.slug);
    return true;
  });
}

/**
 * buildServiceHref(contexte, serviceSlug)
 * - local (zone+ville) => /zones/:zone/:ville/:service/
 * - sinon => /services/:service/
 */
export function buildServiceHref(
  contexte: { zone?: { slug: string }; ville?: { slug: string } } | undefined,
  serviceSlug: string
) {
  const zoneSlug = contexte?.zone?.slug;
  const villeSlug = contexte?.ville?.slug;
  if (zoneSlug && villeSlug) return `/zones/${zoneSlug}/${villeSlug}/${serviceSlug}/`;
  return `/services/${serviceSlug}/`;
}
