// src/lib/routing.ts
// Helpers : URLs, breadcrumbs, maillage interne auto
// Routes Astro attendues :
// - /[service]/index.astro        -> /{service}
// - /[service]/[ville].astro      -> /{service}/{ville}
// - /zones/[zone]/index.astro     -> /zones/{zone}
// - /zones/[zone]/[ville].astro   -> /zones/{zone}/{ville}
// - /ressources/[article].astro   -> /ressources/{article}

import services from "../data/services.json";
import villes from "../data/villes.json";
import zones from "../data/zones.json";
import seoMapping from "../data/seo-mapping.json";

export type Breadcrumb = { label: string; href: string };

function normalizeUrl(u: string): string {
    if (!u.startsWith("/")) u = `/${u}`;
    if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
    return u;
}

const serviceLabelBySlug = new Map<string, string>(
    (services as any[]).map((s) => [String(s.slug), String(s.nom || s.name || s.slug)])
);

const villeBySlug = new Map<string, any>(
    (villes as any[]).map((v) => [String(v.slug), v])
);

const zoneLabelBySlug = new Map<string, string>(
    (zones as any[]).map((z) => [String(z.slug), String(z.nom || z.slug)])
);

const zoneBySlug = new Map<string, any>(
    (zones as any[]).map((z) => [String(z.slug), z])
);

const mapping = seoMapping as any;

/** URL helpers */
export function urlService(service: string): string {
    return normalizeUrl(`/${service}`);
}

export function urlServiceVille(service: string, ville: string): string {
    return normalizeUrl(`/${service}/${ville}`);
}

export function urlZonesIndex(): string {
    return "/zones";
}

export function urlZone(zone: string): string {
    return normalizeUrl(`/zones/${zone}`);
}

export function urlZoneVille(zone: string, ville: string): string {
    return normalizeUrl(`/zones/${zone}/${ville}`);
}

export function urlRessourcesIndex(): string {
    return "/ressources";
}

export function urlArticle(slug: string): string {
    return normalizeUrl(`/ressources/${slug}`);
}

/**
 * Breadcrumbs génériques.
 * type:
 * - "service" : /{service}
 * - "serviceVille" : /{service}/{ville}
 * - "zone" : /zones/{zone}
 * - "zoneVille" : /zones/{zone}/{ville}
 * - "article" : /ressources/{slug}
 * - "static" : pages fixes (tarifs, methode, contact...)
 */
export function getBreadcrumbs(input: {
    type: "service" | "serviceVille" | "zone" | "zoneVille" | "article" | "static";
    service?: string;
    zone?: string;
    ville?: string;
    article?: string;
    staticLabel?: string;
    staticUrl?: string;
}): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [{ label: "Accueil", href: "/" }];

    if (input.type === "static") {
        if (input.staticLabel && input.staticUrl) {
            crumbs.push({ label: input.staticLabel, href: normalizeUrl(input.staticUrl) });
        }
        return crumbs;
    }

    if (input.type === "service" || input.type === "serviceVille") {
        const s = String(input.service || "");
        const sLabel = serviceLabelBySlug.get(s) || s;
        crumbs.push({ label: sLabel, href: urlService(s) });

        if (input.type === "serviceVille") {
            const v = String(input.ville || "");
            const vObj = villeBySlug.get(v);
            crumbs.push({ label: vObj?.nom || v, href: urlServiceVille(s, v) });
        }
        return crumbs;
    }

    if (input.type === "zone" || input.type === "zoneVille") {
        crumbs.push({ label: "Zones", href: urlZonesIndex() });

        const z = String(input.zone || "");
        const zLabel = zoneLabelBySlug.get(z) || z;
        crumbs.push({ label: zLabel, href: urlZone(z) });

        if (input.type === "zoneVille") {
            const v = String(input.ville || "");
            const vObj = villeBySlug.get(v);
            crumbs.push({ label: vObj?.nom || v, href: urlZoneVille(z, v) });
        }
        return crumbs;
    }

    if (input.type === "article") {
        crumbs.push({ label: "Ressources", href: urlRessourcesIndex() });

        const slug = String(input.article || "");
        const art = (mapping?.computed?.articles || []).find((a: any) => a.slug === slug);
        crumbs.push({ label: art?.h1 || art?.metaTitle || slug, href: urlArticle(slug) });
        return crumbs;
    }

    return crumbs;
}

/**
 * Maillage interne auto (minimal, utile et anti-thin).
 * Retourne une liste de liens pertinents à afficher en bas de page.
 */
export function getInternalLinks(input: {
    type: "service" | "serviceVille" | "zone" | "zoneVille" | "article";
    service?: string;
    zone?: string;
    ville?: string;
    article?: string;
    max?: number;
}): { label: string; href: string }[] {
    const max = input.max ?? 10;
    const links: { label: string; href: string }[] = [];

    const push = (label: string, href: string) => {
        const u = normalizeUrl(href);
        if (links.some((l) => l.href === u)) return;
        links.push({ label, href: u });
    };

    // Hubs constants (toujours utiles)
    push("Méthode 3C", "/methode");
    push("Tarifs", "/tarifs");
    push("Demander un audit gratuit", "/contact");

    if (input.type === "service") {
        const s = String(input.service || "");
        const sLabel = serviceLabelBySlug.get(s) || s;

        // Villes (ordre des zones.json -> priorité implicite)
        for (const z of zones as any[]) {
            for (const v of (z.villes || []) as string[]) {
                const vObj = villeBySlug.get(v);
                push(`${sLabel} à ${vObj?.nom || v}`, urlServiceVille(s, v));
                if (links.length >= max) return links.slice(0, max);
            }
        }

        // Cross-services (logique 3C)
        for (const [slug, label] of serviceLabelBySlug.entries()) {
            if (slug !== s) push(`Découvrir : ${label}`, urlService(slug));
        }

        return links.slice(0, max);
    }

    if (input.type === "serviceVille") {
        const s = String(input.service || "");
        const v = String(input.ville || "");
        const sLabel = serviceLabelBySlug.get(s) || s;
        const vObj = villeBySlug.get(v);
        const vName = vObj?.nom || v;

        // Parent service + zone + page zone×ville
        push(`Voir l’offre ${sLabel}`, urlService(s));
        if (vObj?.zone) {
            const z = String(vObj.zone);
            const zLabel = zoneLabelBySlug.get(z) || z;
            push(`Zone : ${zLabel}`, urlZone(z));
            push(`${vName} (zone)`, urlZoneVille(z, v));
        }

        // Services complémentaires (3C) pour la même ville
        for (const [slug, label] of serviceLabelBySlug.entries()) {
            if (slug !== s) push(`${label} à ${vName}`, urlServiceVille(slug, v));
        }

        // 2 villes voisines dans la même zone
        const zObj = vObj?.zone ? zoneBySlug.get(String(vObj.zone)) : null;
        if (zObj?.villes?.length) {
            const siblings = (zObj.villes as string[]).filter((x) => x !== v);
            for (const sib of siblings.slice(0, 2)) {
                const sibObj = villeBySlug.get(sib);
                push(`${sLabel} à ${sibObj?.nom || sib}`, urlServiceVille(s, sib));
            }
        }

        // 2 ressources pertinentes liées au service
        const articles = (mapping?.computed?.articles || [])
            .filter((a: any) => String(a.service || "") === s)
            .slice(0, 2);
        for (const a of articles) push(`Ressource : ${a.h1 || a.metaTitle}`, urlArticle(a.slug));

        return links.slice(0, max);
    }

    if (input.type === "zone") {
        const z = String(input.zone || "");
        const zObj = zoneBySlug.get(z);
        const zLabel = zoneLabelBySlug.get(z) || z;

        // Villes de la zone (pages zone×ville)
        if (zObj?.villes?.length) {
            for (const v of (zObj.villes as string[]).slice(0, 6)) {
                const vObj = villeBySlug.get(v);
                push(`${vObj?.nom || v} (zone)`, urlZoneVille(z, v));
            }
        }

        // Liens services pour la 1ère ville de la zone (pratique conversion)
        const firstVille = zObj?.villes?.[0];
        if (firstVille) {
            const fvObj = villeBySlug.get(String(firstVille));
            const fvName = fvObj?.nom || String(firstVille);
            for (const [sSlug, sLabel] of serviceLabelBySlug.entries()) {
                push(`${sLabel} à ${fvName}`, urlServiceVille(sSlug, String(firstVille)));
            }
        }

        push("Voir toutes les zones", urlZonesIndex());
        push(`Zone : ${zLabel}`, urlZone(z));

        const a = (mapping?.computed?.articles || [])[0];
        if (a) push(`Ressource : ${a.h1 || a.metaTitle}`, urlArticle(a.slug));

        return links.slice(0, max);
    }

    if (input.type === "zoneVille") {
        const z = String(input.zone || "");
        const v = String(input.ville || "");
        const zLabel = zoneLabelBySlug.get(z) || z;
        const vObj = villeBySlug.get(v);
        const vName = vObj?.nom || v;

        push("Zones", urlZonesIndex());
        push(`Zone : ${zLabel}`, urlZone(z));

        // Les 3 services pour la ville
        for (const [sSlug, sLabel] of serviceLabelBySlug.entries()) {
            push(`${sLabel} à ${vName}`, urlServiceVille(sSlug, v));
        }

        // 2 villes voisines (zone×ville)
        const zObj = zoneBySlug.get(z);
        if (zObj?.villes?.length) {
            const siblings = (zObj.villes as string[]).filter((x) => x !== v);
            for (const sib of siblings.slice(0, 2)) {
                const sibObj = villeBySlug.get(sib);
                push(`${sibObj?.nom || sib} (zone)`, urlZoneVille(z, sib));
            }
        }

        // Ressources : 1 SEO local + 1 CRO (par défaut)
        const wantedServices = ["seo-local", "optimisation-site-cro"];
        for (const ws of wantedServices) {
            const art = (mapping?.computed?.articles || []).find((a: any) => a.service === ws);
            if (art) push(`Ressource : ${art.h1 || art.metaTitle}`, urlArticle(art.slug));
        }

        return links.slice(0, max);
    }

    if (input.type === "article") {
        const slug = String(input.article || "");
        const art = (mapping?.computed?.articles || []).find((a: any) => a.slug === slug);

        push("Toutes les ressources", urlRessourcesIndex());

        // Lien vers le service lié
        if (art?.service) {
            const sLabel = serviceLabelBySlug.get(String(art.service)) || String(art.service);
            push(`Découvrir : ${sLabel}`, urlService(String(art.service)));
        }

        // 2 pages locales “phares” (conversion)
        const topVilles = ["chantilly", "senlis"];
        if (art?.service) {
            const s = String(art.service);
            for (const v of topVilles) {
                const vObj = villeBySlug.get(v);
                push(`${serviceLabelBySlug.get(s) || s} à ${vObj?.nom || v}`, urlServiceVille(s, v));
            }
        }

        return links.slice(0, max);
    }

    return links.slice(0, max);
}