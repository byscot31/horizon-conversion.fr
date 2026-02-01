// src/lib/seo.ts
// Helper SEO + JSON-LD (ProfessionalService + FAQPage + BreadcrumbList) + titles/descriptions data-driven.
// Compatible avec BaseLayout.astro (props: title, description, canonical, ogImage, schema).

import services from "../data/services.json";
import specialites from "../data/specialites.json";
import villes from "../data/villes.json";
import zones from "../data/zones.json";

export type PageType =
    | "home"
    | "contact"
    | "pricing"
    | "method"
    | "proofs"
    | "service_hub"
    | "service_city"
    | "specialties_index"
    | "specialty_hub"
    | "specialty_city"
    | "zones_index"
    | "zone_hub"
    | "zone_city"
    | "resources_index"
    | "resource_article"
    | "legal"
    | "privacy";

export type SeoInput = {
    pageType: PageType;

    serviceSlug?: string;
    specialiteSlug?: string;
    villeSlug?: string;
    zoneSlug?: string;

    // Blog / article
    articleTitle?: string;
    articleSlug?: string;
    articleDescription?: string;

    // URL
    origin?: string;   // ex: Astro.url.origin
    pathname?: string; // ex: Astro.url.pathname
};

export type SeoOutput = {
    title: string;
    description: string;
    canonical?: string;
    ogImage: string;
    schema: Record<string, any> | Array<Record<string, any>>;
};

export type BreadcrumbItem = {
    label: string;
    href: string;
    position: number;
};

const SITE = {
    brand: "Horizon Conversion",
    domain: "nettoyage.horizon-conversion.fr",
    defaultOgImage: "/_assets_/images/og-default.jpg",

    phone: "+33 6 60 92 10 08",
    email: "contact@horizon-conversion.fr",

    areas: ["Sud Oise (60)", "Nord Val-d’Oise (95)"]
};

const S = services as any[];
const SP = specialites as any[];
const V = villes as any[];
const Z = zones as any[];

const getService = (slug?: string) => S.find((x) => x.slug === slug);
const getSpecialite = (slug?: string) => SP.find((x) => x.slug === slug);
const getVille = (slug?: string) => V.find((x) => x.slug === slug);
const getZone = (slug?: string) => Z.find((x) => x.slug === slug);

// -------------------- URL helpers --------------------
function buildCanonical(origin?: string, pathname?: string) {
    if (!origin || !pathname) return undefined;
    return new URL(pathname, origin).toString();
}

function pickZoneFromVille(villeSlug?: string): string | undefined {
    const ville = getVille(villeSlug);
    return ville?.zone?.slug;
}

function serviceUrl(serviceSlug: string) {
    return `/${serviceSlug}`;
}
function serviceCityUrl(serviceSlug: string, villeSlug: string) {
    return `/${serviceSlug}/${villeSlug}`;
}
function specIndexUrl() {
    return `/specialites`;
}
function specUrl(specSlug: string) {
    return `/specialites/${specSlug}`;
}
function specCityUrl(specSlug: string, villeSlug: string) {
    return `/specialites/${specSlug}/${villeSlug}`;
}
function zonesIndexUrl() {
    return `/zones`;
}
function zoneUrl(zoneSlug: string) {
    return `/zones/${zoneSlug}`;
}
function zoneCityUrl(zoneSlug: string, villeSlug: string) {
    return `/zones/${zoneSlug}/${villeSlug}`;
}
function resourcesIndexUrl() {
    return `/ressources`;
}
function resourceArticleUrl(articleSlug: string) {
    return `/ressources/${articleSlug}`;
}

// -------------------- Local context helpers --------------------
function safeCityNearbyText(villeSlug?: string): string {
    if (!villeSlug) return "";
    const ville = getVille(villeSlug);
    if (!ville) return "";
    const nearby = (ville.nearby ?? [])
        .map((slug: string) => getVille(slug)?.name)
        .filter(Boolean)
        .slice(0, 4);
    if (!nearby.length) return "";
    return ` et autour (${nearby.join(", ")})`;
}

// -------------------- Schema helpers --------------------
function baseServiceSchema(canonical?: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE.brand,
        url: canonical,
        areaServed: SITE.areas,
        email: SITE.email,
        telephone: SITE.phone
    };
}

function faqSchema(faq?: Array<{ q: string; a: string }>, canonical?: string) {
    if (!faq?.length) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: canonical,
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
    };
}

function normalizeBreadcrumbs(items: Array<{ label: string; href: string }>): BreadcrumbItem[] {
    return items.map((it, idx) => ({ ...it, position: idx + 1 }));
}

function breadcrumbSchema(items: BreadcrumbItem[], origin?: string) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it) => ({
            "@type": "ListItem",
            position: it.position,
            name: it.label,
            item: origin ? new URL(it.href, origin).toString() : it.href
        }))
    };
}

// -------------------- Titles & Descriptions --------------------
function defaultTitle(input: SeoInput) {
    const { pageType, serviceSlug, specialiteSlug, villeSlug, zoneSlug, articleTitle } = input;

    const service = getService(serviceSlug);
    const spec = getSpecialite(specialiteSlug);
    const ville = getVille(villeSlug);

    const effectiveZoneSlug = zoneSlug ?? pickZoneFromVille(villeSlug);
    const zone = getZone(effectiveZoneSlug);

    switch (pageType) {
        case "home":
            return `${SITE.brand} | SEO local, Ads & conversion (entreprises de nettoyage 60/95)`;

        case "contact":
            return `Contact | Audit gratuit webmarketing (entreprises de nettoyage) | ${SITE.brand}`;

        case "pricing":
            return `Tarifs | SEO local, Google Ads & CRO (nettoyage) | ${SITE.brand}`;

        case "method":
            return `Notre méthode | SEO local, Ads & conversion (nettoyage) | ${SITE.brand}`;

        case "proofs":
            return `Preuves & exemples | SEO local et Ads (nettoyage) | ${SITE.brand}`;

        case "legal":
            return `Mentions légales | ${SITE.brand}`;

        case "privacy":
            return `Politique de confidentialité | ${SITE.brand}`;

        // Services
        case "service_hub":
            return `${service?.name ?? "Service"} pour entreprises de nettoyage | ${SITE.brand}`;

        case "service_city":
            return `${service?.name ?? "Service"} à ${ville?.name ?? "votre ville"} | Audit gratuit | ${SITE.brand}`;

        // Spécialités
        case "specialties_index":
            return `Spécialités | Webmarketing pour métiers du nettoyage | ${SITE.brand}`;

        case "specialty_hub":
            return `${spec?.name ?? "Spécialité"} : attirer plus de clients | ${SITE.brand}`;

        case "specialty_city":
            return `${spec?.name ?? "Spécialité"} à ${ville?.name ?? "votre ville"} | Audit gratuit | ${SITE.brand}`;

        // Zones
        case "zones_index":
            return `Zones d’intervention | Sud Oise (60) & Nord 95 | ${SITE.brand}`;

        case "zone_hub":
            return `Webmarketing entreprises de nettoyage | ${zone?.name ?? "Zone"} | ${SITE.brand}`;

        case "zone_city":
            return `À ${ville?.name ?? "votre ville"} (${zone?.name ?? "Zone"}) : SEO/Ads & conversion | ${SITE.brand}`;

        // Ressources
        case "resources_index":
            return `Ressources | SEO local, Ads & conversion (nettoyage) | ${SITE.brand}`;

        case "resource_article":
            return `${articleTitle ?? "Ressource"} | Guide pour entreprises de nettoyage | ${SITE.brand}`;

        default:
            return SITE.brand;
    }
}

function defaultDescription(input: SeoInput) {
    const { pageType, serviceSlug, specialiteSlug, villeSlug, zoneSlug, articleDescription } = input;

    const service = getService(serviceSlug);
    const spec = getSpecialite(specialiteSlug);
    const ville = getVille(villeSlug);

    const effectiveZoneSlug = zoneSlug ?? pickZoneFromVille(villeSlug);
    const zone = getZone(effectiveZoneSlug);

    const nearbyText = safeCityNearbyText(villeSlug);

    switch (pageType) {
        case "home":
            return `SEO local, Google Ads/Meta Ads et optimisation conversion pour entreprises de nettoyage en Sud Oise (60) et Nord 95. Audit gratuit et plan d’action priorisé.`;

        case "contact":
            return `Décrivez votre zone et vos objectifs : recevez un plan d’action priorisé (SEO/Ads/CRO) pour générer plus de demandes qualifiées.`;

        case "pricing":
            return `Offres claires : inclus, options, pilotage, mesure. Choisissez une base adaptée puis on ajuste selon votre zone et vos objectifs.`;

        case "method":
            return `Audit, plan d’action, mise en place et pilotage mensuel. Objectif : améliorer la visibilité et les demandes qualifiées (appels, devis).`;

        case "proofs":
            return `Exemples concrets : actions, livrables et ce qui est mesuré. Transparence sur la méthode et le pilotage.`;

        case "legal":
            return `Informations légales du site.`;

        case "privacy":
            return `Données, cookies et mesure des conversions : transparence et conformité.`;

        // Services
        case "service_hub":
            return `${service?.short ?? "Un levier pour générer plus de demandes qualifiées."} Zones : Sud Oise (60) + Nord 95.`;

        case "service_city":
            return `Développez vos demandes à ${ville?.name ?? "votre ville"}${nearbyText} : ${service?.name ?? "service"}, pilotage et mesure (appels, formulaires). Audit gratuit.`;

        // Spécialités
        case "specialties_index":
            return `Pages par spécialité : enjeux, messages, canaux recommandés et exemples de pages locales (60/95).`;

        case "specialty_hub":
            return `Pour ${spec?.name ?? "votre spécialité"} : stratégie SEO/Ads/CRO orientée demandes qualifiées, avec preuves et mesure.`;

        case "specialty_city":
            return `Développez ${spec?.name ?? "votre spécialité"} à ${ville?.name ?? "votre ville"}${nearbyText} : visibilité, demandes, conversion (appels/devis) et pilotage.`;

        // Zones
        case "zones_index":
            return `Zones et villes couvertes (60/95) : pages locales structurées pour SEO/Ads/CRO, sans duplication. Audit gratuit.`;

        case "zone_hub":
            return `Contexte, priorités et villes couvertes en ${zone?.name ?? "zone"} : SEO local, Ads et conversion pour entreprises de nettoyage.`;

        case "zone_city":
            return `À ${ville?.name ?? "votre ville"}${nearbyText} : combinez SEO local, Ads et conversion pour générer plus de demandes (appels, devis).`;

        // Ressources
        case "resources_index":
            return `Guides concrets : SEO local, Ads, conversion et tracking pour entreprises de nettoyage.`;

        case "resource_article":
            return articleDescription?.trim() || `Guide actionnable : étapes, erreurs fréquentes et checklist pour améliorer vos demandes.`;

        default:
            return `SEO local, Ads et conversion pour entreprises de nettoyage (60/95).`;
    }
}

// -------------------- FAQ selection --------------------
function pickFaqForSchema(input: SeoInput): Array<{ q: string; a: string }> | null {
    const { pageType, serviceSlug, zoneSlug, villeSlug } = input;

    // Pages service : on peut utiliser la FAQ du service
    if (pageType === "service_hub" || pageType === "service_city") {
        const service = getService(serviceSlug);
        return service?.faq ?? null;
    }

    // Zone hub : FAQ zone
    if (pageType === "zone_hub") {
        const zone = getZone(zoneSlug ?? pickZoneFromVille(villeSlug));
        return zone?.page?.faq ?? null;
    }

    // Les autres pages gèrent leur FAQ dans le contenu (ou via un autre système)
    return null;
}

// -------------------- OG image --------------------
function pickOgImage(input: SeoInput): string {
    // Convention simple : un OG par défaut.
    // Tu peux étendre : serviceSlug -> image dédiée si tu ajoutes des fichiers.
    return SITE.defaultOgImage;
}

// -------------------- Breadcrumbs --------------------
/**
 * buildBreadcrumbs()
 * Renvoie items + schema BreadcrumbList
 *
 * Affichage UI : bc.items
 * JSON-LD : bc.schema (à merger dans BaseLayout schema)
 */
export function buildBreadcrumbs(input: SeoInput): { items: BreadcrumbItem[]; schema: Record<string, any> } {
    const { pageType, serviceSlug, specialiteSlug, villeSlug, zoneSlug, origin, articleTitle, articleSlug } = input;

    const service = getService(serviceSlug);
    const spec = getSpecialite(specialiteSlug);
    const ville = getVille(villeSlug);

    const effectiveZoneSlug = zoneSlug ?? pickZoneFromVille(villeSlug);
    const zone = getZone(effectiveZoneSlug);

    // Base : toujours Accueil (sauf si tu veux cacher sur home)
    const baseTrail: Array<{ label: string; href: string }> = [{ label: "Accueil", href: "/" }];
    let trail: Array<{ label: string; href: string }> = [];

    switch (pageType) {
        case "home":
            trail = [];
            break;

        case "contact":
            trail = [{ label: "Contact", href: "/contact" }];
            break;

        case "pricing":
            trail = [{ label: "Tarifs", href: "/tarifs" }];
            break;

        case "method":
            trail = [{ label: "Méthode", href: "/methode" }];
            break;

        case "proofs":
            trail = [{ label: "Preuves", href: "/preuves" }];
            break;

        case "legal":
            trail = [{ label: "Mentions légales", href: "/mentions-legales" }];
            break;

        case "privacy":
            trail = [{ label: "Politique de confidentialité", href: "/politique-confidentialite" }];
            break;

        // Services
        case "service_hub":
            if (serviceSlug) {
                trail = [{ label: service?.name ?? "Service", href: serviceUrl(serviceSlug) }];
            }
            break;

        case "service_city":
            if (serviceSlug && villeSlug) {
                trail = [
                    { label: service?.name ?? "Service", href: serviceUrl(serviceSlug) },
                    { label: ville?.name ?? "Ville", href: serviceCityUrl(serviceSlug, villeSlug) }
                ];
            }
            break;

        // Spécialités
        case "specialties_index":
            trail = [{ label: "Spécialités", href: specIndexUrl() }];
            break;

        case "specialty_hub":
            if (specialiteSlug) {
                trail = [
                    { label: "Spécialités", href: specIndexUrl() },
                    { label: spec?.name ?? "Spécialité", href: specUrl(specialiteSlug) }
                ];
            }
            break;

        case "specialty_city":
            if (specialiteSlug && villeSlug) {
                trail = [
                    { label: "Spécialités", href: specIndexUrl() },
                    { label: spec?.name ?? "Spécialité", href: specUrl(specialiteSlug) },
                    { label: ville?.name ?? "Ville", href: specCityUrl(specialiteSlug, villeSlug) }
                ];
            }
            break;

        // Zones
        case "zones_index":
            trail = [{ label: "Zones", href: zonesIndexUrl() }];
            break;

        case "zone_hub":
            if (effectiveZoneSlug) {
                trail = [
                    { label: "Zones", href: zonesIndexUrl() },
                    { label: zone?.name ?? "Zone", href: zoneUrl(effectiveZoneSlug) }
                ];
            }
            break;

        case "zone_city":
            if (effectiveZoneSlug && villeSlug) {
                trail = [
                    { label: "Zones", href: zonesIndexUrl() },
                    { label: zone?.name ?? "Zone", href: zoneUrl(effectiveZoneSlug) },
                    { label: ville?.name ?? "Ville", href: zoneCityUrl(effectiveZoneSlug, villeSlug) }
                ];
            }
            break;

        // Ressources
        case "resources_index":
            trail = [{ label: "Ressources", href: resourcesIndexUrl() }];
            break;

        case "resource_article":
            trail = [
                { label: "Ressources", href: resourcesIndexUrl() },
                {
                    label: articleTitle?.trim() || "Article",
                    href: articleSlug ? resourceArticleUrl(articleSlug) : resourcesIndexUrl()
                }
            ];
            break;

        default:
            trail = [];
    }

    const items = normalizeBreadcrumbs([...baseTrail, ...trail]);
    const schema = breadcrumbSchema(items, origin);

    return { items, schema };
}

// -------------------- Public API --------------------
/**
 * buildSeo()
 * Renvoie { title, description, canonical, ogImage, schema }
 * -> à passer dans BaseLayout
 */
export function buildSeo(input: SeoInput): SeoOutput {
    const title = defaultTitle(input);
    const description = defaultDescription(input);
    const canonical = buildCanonical(input.origin, input.pathname);
    const ogImage = pickOgImage(input);

    // Schema principal + FAQ si dispo
    const base = baseServiceSchema(canonical);
    const faq = pickFaqForSchema(input);
    const faqLd = faqSchema(faq ?? undefined, canonical);

    // Breadcrumb schema (optionnel, mais on le met par défaut)
    const bc = buildBreadcrumbs(input);
    const bcLd = bc?.schema;

    const schemaParts: Array<Record<string, any>> = [];
    schemaParts.push(base);
    if (faqLd) schemaParts.push(faqLd);
    if (bcLd) schemaParts.push(bcLd);

    const schema = schemaParts.length === 1 ? schemaParts[0] : schemaParts;

    return { title, description, canonical, ogImage, schema };
}

/**
 * buildLocalSchema()
 * Pour enrichir une page locale (ville/zone/service) si tu veux un JSON-LD “page-specific”.
 * Optionnel : tu peux l’utiliser en plus de buildSeo().schema, ou remplacer baseServiceSchema.
 */
export function buildLocalSchema(params: {
    origin?: string;
    pathname?: string;
    pageName: string; // ex: "SEO local à Chantilly"
    areaServed?: string[];
}) {
    const canonical = buildCanonical(params.origin, params.pathname);

    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: params.pageName,
        url: canonical,
        areaServed: params.areaServed ?? SITE.areas,
        provider: {
            "@type": "Organization",
            name: SITE.brand,
            url: canonical ? new URL("/", canonical).toString() : undefined
        },
        email: SITE.email,
        telephone: SITE.phone
    };
}