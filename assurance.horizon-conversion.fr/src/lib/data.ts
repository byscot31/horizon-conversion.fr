import metiersIndex from "../data/metiers/index.json";
import prestationsIndex from "../data/prestations/index.json";
import declinaisons from "../data/prestations/declinaisons-metiers.json";

type Meta = { title: string; description: string; canonical: string; robots?: string };
type Hero = { h1: string; sub?: string; ctaPrimary?: { label: string; href: string }; ctaSecondary?: { label: string; href: string } };

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
  cta?: { primary?: { label: string; href: string }; secondary?: { label: string; href: string } };
};

const metierFiles: Record<string, () => Promise<{ default: Metier }>> = {
  "agence-assurance": () => import("../data/metiers/agence-assurance.json"),
  "courtier-assurance": () => import("../data/metiers/courtier-assurance.json"),
  "mutuelle-sante": () => import("../data/metiers/mutuelle-sante.json"),
  "assurance-emprunteur": () => import("../data/metiers/assurance-emprunteur.json"),
  "assurance-pro": () => import("../data/metiers/assurance-pro.json"),
  "assurance-vie-patrimoine": () => import("../data/metiers/assurance-vie-patrimoine.json")
};

const prestationFiles: Record<string, () => Promise<{ default: Prestation }>> = {
  "seo-local": () => import("../data/prestations/seo-local.json"),
  "ads-local": () => import("../data/prestations/ads-local.json"),
  "cro": () => import("../data/prestations/cro.json"),
  "tracking-attribution": () => import("../data/prestations/tracking-attribution.json"),
  "contenus-preuves": () => import("../data/prestations/contenus-preuves.json"),
  "crm-workflow": () => import("../data/prestations/crm-workflow.json")
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