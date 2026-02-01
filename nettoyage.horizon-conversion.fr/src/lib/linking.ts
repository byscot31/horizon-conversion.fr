// src/lib/linking.ts
import services from "../data/services.json";
import specialites from "../data/specialites.json";
import villes from "../data/villes.json";
import zones from "../data/zones.json";

type PageType =
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
    | "resource_article";

export type LinkItem = { href: string; label: string; badge?: string };

export type InternalLinksGroups = {
    title: string;
    groups: Array<{
        title: string;
        links: LinkItem[];
    }>;
};

export type LinkContext = {
    pageType: PageType;
    serviceSlug?: string;
    villeSlug?: string;
    specialiteSlug?: string;
    zoneSlug?: string;

    // optionnel : utile pour blog/articles si tu ajoutes des tags plus tard
    articleTags?: string[];
};

// ---------- Data helpers ----------
const S = services as any[];
const SP = specialites as any[];
const V = villes as any[];
const Z = zones as any[];

const getService = (slug?: string) => S.find((x) => x.slug === slug);
const getSpecialite = (slug?: string) => SP.find((x) => x.slug === slug);
const getVille = (slug?: string) => V.find((x) => x.slug === slug);
const getZone = (slug?: string) => Z.find((x) => x.slug === slug);

const serviceUrl = (serviceSlug: string) => `/${serviceSlug}`;
const serviceCityUrl = (serviceSlug: string, villeSlug: string) =>
    `/${serviceSlug}/${villeSlug}`;

const specUrl = (specialiteSlug: string) => `/specialites/${specialiteSlug}`;
const specCityUrl = (specialiteSlug: string, villeSlug: string) =>
    `/specialites/${specialiteSlug}/${villeSlug}`;

const zoneUrl = (zoneSlug: string) => `/zones/${zoneSlug}`;
const zoneCityUrl = (zoneSlug: string, villeSlug: string) =>
    `/zones/${zoneSlug}/${villeSlug}`;

// ---------- Link makers ----------
function makeLink(href: string, label: string, badge?: string): LinkItem {
    return { href, label, badge };
}

function dedupeLinks(links: LinkItem[]): LinkItem[] {
    const seen = new Set<string>();
    return links.filter((l) => {
        if (!l?.href) return false;
        if (seen.has(l.href)) return false;
        seen.add(l.href);
        return true;
    });
}

function clampLinks(links: LinkItem[], max: number): LinkItem[] {
    return links.slice(0, Math.max(0, max));
}

function safeLabelCity(villeSlug: string) {
    const ville = getVille(villeSlug);
    return ville?.name ?? villeSlug;
}
function safeLabelZone(zoneSlug: string) {
    const zone = getZone(zoneSlug);
    return zone?.name ?? zoneSlug;
}
function safeLabelService(serviceSlug: string) {
    const s = getService(serviceSlug);
    return s?.name ?? serviceSlug;
}
function safeLabelSpecialite(specSlug: string) {
    const sp = getSpecialite(specSlug);
    return sp?.name ?? specSlug;
}

// Choisir 3–6 villes “proches” si possible
function pickNearbyVilleSlugs(baseVilleSlug?: string, count = 4): string[] {
    if (!baseVilleSlug) return clampLinks(V.map((x) => ({ href: x.slug, label: "" })), count).map((x) => x.href);

    const base = getVille(baseVilleSlug);
    const nearby = (base?.nearby ?? []).filter((slug: string) => getVille(slug));
    const fallbackSameZone = V.filter((x: any) => x?.zone?.slug === base?.zone?.slug)
        .map((x: any) => x.slug)
        .filter((slug: string) => slug !== baseVilleSlug);

    const merged = [...nearby, ...fallbackSameZone];
    const uniq: string[] = [];
    for (const s of merged) {
        if (!uniq.includes(s)) uniq.push(s);
        if (uniq.length >= count) break;
    }
    return uniq;
}

function pickZoneFromVille(villeSlug?: string): string | undefined {
    const ville = getVille(villeSlug);
    return ville?.zone?.slug;
}

// Sélection de services “recommandés” (priorité : données, sinon fallback)
function pickRecommendedServicesFromSpecialite(specSlug?: string): string[] {
    const sp = getSpecialite(specSlug);
    const rec = (sp?.recommendedServices ?? []).filter((x: string) => getService(x));
    if (rec.length) return rec;
    // fallback
    return ["seo-local", "cro-tracking", "google-ads"].filter((x) => getService(x));
}

function pickRecommendedSpecialitesFromService(serviceSlug?: string): string[] {
    const s = getService(serviceSlug);
    const rel = (s?.internalLinks?.relatedSpecialites ?? []).filter((x: string) => getSpecialite(x));
    if (rel.length) return rel;
    // fallback
    return ["nettoyage-bureaux", "nettoyage-fin-chantier", "nettoyage-coproprietes"].filter((x) => getSpecialite(x));
}

function pickRecommendedSpecialitesFromZone(zoneSlug?: string): string[] {
    const z = getZone(zoneSlug);
    const rel = (z?.recommendedSpecialites ?? []).filter((x: string) => getSpecialite(x));
    if (rel.length) return rel;
    return ["nettoyage-bureaux", "nettoyage-fin-chantier"].filter((x) => getSpecialite(x));
}

function pickRecommendedServicesFromZone(zoneSlug?: string): string[] {
    const z = getZone(zoneSlug);
    const rel = (z?.recommendedServices ?? []).filter((x: string) => getService(x));
    if (rel.length) return rel;
    return ["seo-local", "cro-tracking", "google-ads"].filter((x) => getService(x));
}

// ---------- Core builder ----------
export function buildInternalLinks(ctx: LinkContext): InternalLinksGroups {
    const villeSlug = ctx.villeSlug;
    const zoneSlug = ctx.zoneSlug ?? pickZoneFromVille(villeSlug);
    const serviceSlug = ctx.serviceSlug;
    const specialiteSlug = ctx.specialiteSlug;

    const villeName = villeSlug ? safeLabelCity(villeSlug) : undefined;
    const zoneName = zoneSlug ? safeLabelZone(zoneSlug) : undefined;

    // “Pages confiance / décision” : toujours utiles
    const trustLinks: LinkItem[] = dedupeLinks([
        makeLink("/methode", "Voir la méthode", "Process"),
        makeLink("/tarifs", "Voir les tarifs", "Clair"),
        makeLink("/preuves", "Preuves & exemples", "Réassurance"),
        makeLink("/contact", "Demander un audit gratuit", "CTA")
    ]);

    // --- Rules per page type ---
    if (ctx.pageType === "home") {
        const featuredServices = ["seo-local", "google-ads", "cro-tracking"]
            .filter((s) => getService(s))
            .map((s) => makeLink(serviceUrl(s), safeLabelService(s), "Service"));

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Commencer ici", links: trustLinks },
                { title: "Nos services", links: featuredServices },
                { title: "Zones couvertes", links: [makeLink("/zones", "Voir les zones (60/95)", "Local")] }
            ]
        };
    }

    if (ctx.pageType === "contact") {
        return {
            title: "Avant d’envoyer",
            groups: [
                {
                    title: "Pour comprendre notre approche",
                    links: dedupeLinks([
                        makeLink("/methode", "Notre méthode", "Process"),
                        makeLink("/tarifs", "Tarifs & inclus", "Clair"),
                        makeLink("/preuves", "Preuves & exemples", "Réassurance")
                    ])
                }
            ]
        };
    }

    if (ctx.pageType === "pricing") {
        return {
            title: "Comparer et décider",
            groups: [
                {
                    title: "Ce qui rassure avant de choisir",
                    links: dedupeLinks([
                        makeLink("/methode", "Voir la méthode", "Process"),
                        makeLink("/preuves", "Voir des preuves", "Réassurance"),
                        makeLink("/contact", "Demander un audit gratuit", "CTA")
                    ])
                }
            ]
        };
    }

    if (ctx.pageType === "method" || ctx.pageType === "proofs") {
        return {
            title: "Étapes suivantes",
            groups: [
                {
                    title: "Pour passer à l’action",
                    links: dedupeLinks([
                        makeLink("/tarifs", "Voir les tarifs", "Clair"),
                        makeLink("/contact", "Demander un audit gratuit", "CTA"),
                        makeLink("/zones", "Voir les zones (60/95)", "Local")
                    ])
                }
            ]
        };
    }

    if (ctx.pageType === "service_hub") {
        const relatedSpecialites = pickRecommendedSpecialitesFromService(serviceSlug)
            .slice(0, 3)
            .map((sp) => makeLink(specUrl(sp), safeLabelSpecialite(sp), "Spécialité"));

        // Villes “vitrine” : prends les 6 premières villes du dataset (ou filtre par zone si tu veux)
        const cityLinks = V.slice(0, 6)
            .map((v: any) =>
                makeLink(serviceCityUrl(serviceSlug!, v.slug), `${safeLabelService(serviceSlug!)} à ${v.name}`, "Local")
            );

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Pages utiles", links: trustLinks },
                {
                    title: "Pages locales (exemples)",
                    links: dedupeLinks(cityLinks)
                },
                {
                    title: "Cas d’usage (spécialités)",
                    links: dedupeLinks(relatedSpecialites)
                }
            ]
        };
    }

    if (ctx.pageType === "service_city") {
        const serviceHub = serviceSlug
            ? [makeLink(serviceUrl(serviceSlug), safeLabelService(serviceSlug), "Service")]
            : [];

        const zoneLinks =
            zoneSlug && villeSlug
                ? [
                    makeLink(zoneUrl(zoneSlug), `Zone ${zoneName}`, "Zone"),
                    makeLink(zoneCityUrl(zoneSlug, villeSlug), `${villeName} – zone ${zoneName}`, "Local")
                ]
                : zoneSlug
                ? [makeLink(zoneUrl(zoneSlug), `Zone ${zoneName}`, "Zone")]
                : [];

        const specLinks = (pickRecommendedSpecialitesFromService(serviceSlug) || [])
            .slice(0, 2)
            .map((sp) =>
                villeSlug
                    ? makeLink(specCityUrl(sp, villeSlug), `${safeLabelSpecialite(sp)} à ${villeName}`, "Spécialité")
                    : makeLink(specUrl(sp), safeLabelSpecialite(sp), "Spécialité")
            );

        const nearbyVilleSlugs = pickNearbyVilleSlugs(villeSlug, 4);
        const nearbyCityPages =
            serviceSlug && nearbyVilleSlugs.length
                ? nearbyVilleSlugs.map((vs) =>
                    makeLink(serviceCityUrl(serviceSlug, vs), `${safeLabelService(serviceSlug)} à ${safeLabelCity(vs)}`, "Proche")
                )
                : [];

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Service", links: dedupeLinks(serviceHub) },
                { title: "Zones & local", links: dedupeLinks(zoneLinks) },
                { title: "Spécialités utiles", links: dedupeLinks(specLinks) },
                { title: "Villes proches", links: dedupeLinks(nearbyCityPages) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "specialties_index") {
        const topSpecs = SP.slice(0, 6).map((sp: any) =>
            makeLink(specUrl(sp.slug), sp.name, "Spécialité")
        );

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Spécialités", links: dedupeLinks(topSpecs) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "specialty_hub") {
        const recServices = pickRecommendedServicesFromSpecialite(specialiteSlug)
            .slice(0, 3)
            .map((s) => makeLink(serviceUrl(s), safeLabelService(s), "Service"));

        const cityLinks = V.slice(0, 6).map((v: any) =>
            makeLink(specCityUrl(specialiteSlug!, v.slug), `${safeLabelSpecialite(specialiteSlug!)} à ${v.name}`, "Local")
        );

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Services recommandés", links: dedupeLinks(recServices) },
                { title: "Pages locales (exemples)", links: dedupeLinks(cityLinks) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "specialty_city") {
        const recServices = pickRecommendedServicesFromSpecialite(specialiteSlug)
            .slice(0, 2)
            .map((s) =>
                villeSlug
                    ? makeLink(serviceCityUrl(s, villeSlug), `${safeLabelService(s)} à ${villeName}`, "Service+Ville")
                    : makeLink(serviceUrl(s), safeLabelService(s), "Service")
            );

        const hubLinks = dedupeLinks([
            specialiteSlug ? makeLink(specUrl(specialiteSlug), safeLabelSpecialite(specialiteSlug), "Spécialité") : null,
            villeSlug && zoneSlug ? makeLink(zoneCityUrl(zoneSlug, villeSlug), `${villeName} – zone ${zoneName}`, "Local") : null
        ].filter(Boolean) as LinkItem[]);

        return {
            title: "Aller plus loin",
            groups: [
                { title: "À prioriser", links: dedupeLinks(recServices) },
                { title: "Contexte", links: hubLinks },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "zones_index") {
        const zoneLinks = Z.map((z: any) => makeLink(zoneUrl(z.slug), z.name, "Zone"));
        return {
            title: "Aller plus loin",
            groups: [
                { title: "Zones", links: dedupeLinks(zoneLinks) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "zone_hub") {
        const recServices = pickRecommendedServicesFromZone(zoneSlug)
            .slice(0, 3)
            .map((s) => makeLink(serviceUrl(s), safeLabelService(s), "Service"));

        const recSpecs = pickRecommendedSpecialitesFromZone(zoneSlug)
            .slice(0, 2)
            .map((sp) => makeLink(specUrl(sp), safeLabelSpecialite(sp), "Spécialité"));

        const z = getZone(zoneSlug);
        const zoneCities = (z?.cities ?? []).slice(0, 8);
        const zoneCityLinks = zoneCities.map((vs: string) =>
            makeLink(zoneCityUrl(zoneSlug!, vs), `${safeLabelCity(vs)} (${zoneName})`, "Ville")
        );

        return {
            title: "Aller plus loin",
            groups: [
                { title: "Services", links: dedupeLinks(recServices) },
                { title: "Spécialités", links: dedupeLinks(recSpecs) },
                { title: "Villes de la zone", links: dedupeLinks(zoneCityLinks) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "zone_city") {
        const zLinks =
            zoneSlug && villeSlug
                ? [
                    makeLink(zoneUrl(zoneSlug), `Zone ${zoneName}`, "Zone"),
                    makeLink(zoneCityUrl(zoneSlug, villeSlug), `${villeName} – zone ${zoneName}`, "Local")
                ]
                : [];

        // Le meilleur “money link” depuis une zone-ville : SEO local + ville (par défaut)
        const primaryServiceSlug = getService("seo-local") ? "seo-local" : (S[0]?.slug ?? null);
        const moneyLinks =
            villeSlug && primaryServiceSlug
                ? [
                    makeLink(serviceCityUrl(primaryServiceSlug, villeSlug), `SEO local à ${villeName}`, "Prioritaire"),
                    makeLink("/contact", "Demander un audit gratuit", "CTA")
                ]
                : [makeLink("/contact", "Demander un audit gratuit", "CTA")];

        // 2 spécialités recommandées zone -> vers spécialité+ville si possible
        const specLinks = pickRecommendedSpecialitesFromZone(zoneSlug)
            .slice(0, 2)
            .map((sp) =>
                villeSlug
                    ? makeLink(specCityUrl(sp, villeSlug), `${safeLabelSpecialite(sp)} à ${villeName}`, "Spécialité")
                    : makeLink(specUrl(sp), safeLabelSpecialite(sp), "Spécialité")
            );

        return {
            title: "Aller plus loin",
            groups: [
                { title: "À faire en priorité", links: dedupeLinks(moneyLinks) },
                { title: "Zone & contexte", links: dedupeLinks(zLinks) },
                { title: "Spécialités utiles", links: dedupeLinks(specLinks) },
                { title: "Réassurance", links: trustLinks }
            ]
        };
    }

    if (ctx.pageType === "resources_index") {
        return {
            title: "Aller plus loin",
            groups: [
                { title: "Réassurance", links: trustLinks },
                { title: "Pages utiles", links: dedupeLinks([makeLink("/zones", "Zones couvertes (60/95)", "Local")]) }
            ]
        };
    }

    if (ctx.pageType === "resource_article") {
        // Simple par défaut : pousser vers 1 service + preuves + contact
        const fallbackService = getService("seo-local") ? "seo-local" : (S[0]?.slug ?? null);
        const serviceLinks = fallbackService ? [makeLink(serviceUrl(fallbackService), safeLabelService(fallbackService), "Service")] : [];

        return {
            title: "Aller plus loin",
            groups: [
                { title: "À appliquer", links: dedupeLinks([...serviceLinks, makeLink("/preuves", "Preuves & exemples", "Réassurance")]) },
                { title: "Passer à l’action", links: dedupeLinks([makeLink("/contact", "Recevoir un plan d’action", "CTA"), makeLink("/tarifs", "Voir les tarifs", "Clair")]) }
            ]
        };
    }

    // Fallback générique
    return {
        title: "Aller plus loin",
        groups: [{ title: "Pages utiles", links: trustLinks }]
    };
}