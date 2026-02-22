// src/lib/data.ts
import metiersIndex from "../data/metiers/index.json";
import prestationsIndex from "../data/prestations/index.json";
import declinaisons from "../data/prestations/declinaisons-metiers.json";

type Meta = { title: string; description: string; canonical: string; robots?: string };

// Legacy metier hero (existant dans tes JSON métiers)
type Hero = {
  h1: string;
  sub?: string;
  ctaPrimary?: { label: string; href: string; icon?: string };
  ctaSecondary?: { label: string; href: string; icon?: string };
};

// UI hero unifié (pour ton composant Hero.astro + CtaButtons)
export type HeroUi = {
  id?: string;
  eyebrow?: string;
  title?: string;
  titleHtml?: string;
  subtitle?: string;
  ctas?: Array<{
    label: string;
    href: string; // URL | "WHATSAPP" | "TEL"
    icon?: string;
    variant?: "primary" | "secondary" | "light" | "dark" | "linkUnderline";
    external?: boolean;
  }>;
  note?: string;
};

export type Metier = {
  id: string;
  slug: string;
  label: string;
  meta: Meta;
  hero?: Hero;
  intentionsSEO?: Array<{ cluster: string; queries: string[] }>;
  objections?: Array<{ id: string; texte: string; reponse: string }>;
  kpis?: Array<{ name: string; target: string }>;
  livrables?: string[];
  faq?: Array<{ q: string; a: string }>;
  internalLinks?: {
    hubMetiers?: string;
    prestationsRecommandees?: string[];
    pagesAssociees?: string[];
  };
};

export type Prestation = {
  id: string;
  slug: string;
  label: string;
  shortLabel?: string;
  meta: Meta;
  promise?: string;
  pourQui?: string[];
  scope?: Record<string, string[]>;
  deliverables?: string[];
  kpis?: string[];
  cta?: {
    primary?: { label: string; href: string; icon?: string };
    secondary?: { label: string; href: string; icon?: string };
  };
};

const metierFiles: Record<string, () => Promise<{ default: Metier }>> = {
  "agence-assurance": () => import("../data/metiers/agence-assurance.json"),
  "courtier-assurance": () => import("../data/metiers/courtier-assurance.json"),
  "mutuelle-sante": () => import("../data/metiers/mutuelle-sante.json"),
  "assurance-emprunteur": () => import("../data/metiers/assurance-emprunteur.json"),
  "assurance-pro": () => import("../data/metiers/assurance-pro.json"),
  "assurance-vie-patrimoine": () => import("../data/metiers/assurance-vie-patrimoine.json"),
};

const prestationFiles: Record<string, () => Promise<{ default: Prestation }>> = {
  "seo-local": () => import("../data/prestations/seo-local.json"),
  "ads-local": () => import("../data/prestations/ads-local.json"),
  "cro": () => import("../data/prestations/cro.json"),
  "tracking-attribution": () => import("../data/prestations/tracking-attribution.json"),
  "contenus-preuves": () => import("../data/prestations/contenus-preuves.json"),
  "crm-workflow": () => import("../data/prestations/crm-workflow.json"),
};

export function listMetiers() {
  return metiersIndex.items as Array<{ id: string; slug: string; title: string }>;
}

export function listPrestations() {
  return prestationsIndex.items as Array<{ id: string; slug: string; title: string }>;
}

export async function getMetierBySlug(slug: string): Promise<Metier> {
  const loader = metierFiles[slug];
  if (!loader) throw new Error(`Metier slug inconnu: ${slug}`);
  return (await loader()).default;
}

export async function getPrestationBySlug(slug: string): Promise<Prestation> {
  const loader = prestationFiles[slug];
  if (!loader) throw new Error(`Prestation slug inconnu: ${slug}`);
  return (await loader()).default;
}

export function getDeclinaisonsForMetier(metierId: string) {
  return (declinaisons as any).matrix.find((m: any) => m.metierId === metierId)?.prestations ?? [];
}

export function getDeclinaison(prestaSlug: string, metierSlug: string) {
  const metier = (metiersIndex.items as any[]).find((m) => m.slug === metierSlug);
  const presta = (prestationsIndex.items as any[]).find((p) => p.slug === prestaSlug);
  if (!metier || !presta) return null;
  const row = (declinaisons as any).matrix.find((r: any) => r.metierId === metier.id);
  const cell = row?.prestations?.find((x: any) => x.prestaId === presta.id);
  return { metier, presta, cell };
}

/**
 * Normalise n'importe quel "hero data" vers le format attendu par <Hero />.
 * - Ne crée aucun texte : uniquement mapping de champs existants.
 * - Permet de garder tes JSON métiers legacy (h1/sub/ctaPrimary/ctaSecondary)
 *   tout en utilisant un composant Hero unique.
 */
export function normalizeHero(input: any): HeroUi {
  if (!input) return {};

  // Si c'est déjà un hero "page" (eyebrow/title/titleHtml/subtitle/ctas/note)
  if (
    "ctas" in input ||
    "titleHtml" in input ||
    "eyebrow" in input ||
    "subtitle" in input ||
    "note" in input
  ) {
    return {
      id: input.id,
      eyebrow: input.eyebrow,
      title: input.title,
      titleHtml: input.titleHtml,
      subtitle: input.subtitle,
      ctas: Array.isArray(input.ctas) ? input.ctas : [],
      note: input.note,
    };
  }

  // Hero métier legacy
  const h = input as Hero;

  const ctas: HeroUi["ctas"] = [];
  if (h.ctaPrimary?.label && h.ctaPrimary?.href) {
    ctas.push({
      label: h.ctaPrimary.label,
      href: h.ctaPrimary.href,
      icon: h.ctaPrimary.icon,
      variant: "primary",
    });
  }
  if (h.ctaSecondary?.label && h.ctaSecondary?.href) {
    ctas.push({
      label: h.ctaSecondary.label,
      href: h.ctaSecondary.href,
      icon: h.ctaSecondary.icon,
      variant: "secondary",
    });
  }

  return {
    title: h.h1,
    subtitle: h.sub,
    ctas,
  };
}