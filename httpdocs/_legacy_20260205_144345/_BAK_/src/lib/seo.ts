// src/lib/seo.ts
import type { Breadcrumb } from "./routing";
import {
    urlService,
    urlServiceVille,
    urlZone,
    urlZoneVille,
    urlArticle,
    urlZonesIndex,
    urlRessourcesIndex
} from "./routing";
import type { FaqItem } from "./mapping";

import villes from "../data/villes.json";
import zones from "../data/zones.json";
import services from "../data/services.json";
import seoMapping from "../data/seo-mapping.json";

/** -----------------------------
 *  Types Review / AggregateRating (optionnels)
 * ------------------------------ */
export type AggregateRatingInput = {
    ratingValue: number;     // ex: 4.8
    reviewCount: number;     // ex: 27
    bestRating?: number;     // ex: 5
    worstRating?: number;    // ex: 1
};

export type ReviewInput = {
    authorName: string;      // ex: "Marc D."
    ratingValue: number;     // ex: 5
    reviewBody?: string;     // ex: "Très bon accompagnement..."
    datePublished?: string;  // "YYYY-MM-DD" si tu l’as
};

/** -----------------------------
 *  Utils
 * ------------------------------ */
function safeText(v: any, fallback = ""): string {
    return typeof v === "string" && v.trim().length ? v.trim() : fallback;
}

function isFiniteNumber(n: any): n is number {
    return typeof n === "number" && Number.isFinite(n);
}

function getVilleBySlug(slug: string) {
    return (villes as any[]).find((v) => String(v.slug) === String(slug)) || null;
}

function getZoneBySlug(slug: string) {
    return (zones as any[]).find((z) => String(z.slug) === String(slug)) || null;
}

function getServiceBySlug(slug: string) {
    return (services as any[]).find((s) => String(s.slug) === String(slug)) || null;
}

/** -----------------------------
 *  BreadcrumbList JSON-LD
 * ------------------------------ */
export function buildBreadcrumbListJsonLd(params: {
    baseUrl: string;
    crumbs: Breadcrumb[];
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: params.crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${base}${c.href.startsWith("/") ? c.href : `/${c.href}`}`
        }))
    };
}

/** -----------------------------
 *  FAQPage JSON-LD
 * ------------------------------ */
export function buildFaqPageJsonLd(params: { faq: FaqItem[] }) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: params.faq.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: it.a
            }
        }))
    };
}

/** -----------------------------
 *  WebSite + Organization JSON-LD (global)
 *  - sans SearchAction
 *  - AggregateRating / Review optionnels si fournis
 * ------------------------------ */
export function buildWebSiteJsonLd(params: {
    baseUrl: string;
    name?: string;
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: params.name || "Horizon Conversion",
        url: base
    };
}

function buildAggregateRatingJsonLd(input?: AggregateRatingInput) {
    if (!input) return undefined;
    if (!isFiniteNumber(input.ratingValue) || !isFiniteNumber(input.reviewCount)) return undefined;

    return {
        "@type": "AggregateRating",
        ratingValue: input.ratingValue,
        reviewCount: input.reviewCount,
        ...(isFiniteNumber(input.bestRating) ? { bestRating: input.bestRating } : {}),
        ...(isFiniteNumber(input.worstRating) ? { worstRating: input.worstRating } : {})
    };
}

function buildReviewsJsonLd(reviews?: ReviewInput[]) {
    if (!Array.isArray(reviews) || !reviews.length) return undefined;

    const cleaned = reviews
        .map((r) => ({
            authorName: safeText(r.authorName),
            ratingValue: r.ratingValue,
            reviewBody: safeText(r.reviewBody, ""),
            datePublished: safeText(r.datePublished, "")
        }))
        .filter((r) => r.authorName && isFiniteNumber(r.ratingValue));

    if (!cleaned.length) return undefined;

    return cleaned.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.authorName },
        reviewRating: { "@type": "Rating", ratingValue: r.ratingValue },
        ...(r.reviewBody ? { reviewBody: r.reviewBody } : {}),
        ...(r.datePublished ? { datePublished: r.datePublished } : {})
    }));
}

export function buildOrganizationJsonLd(params: {
    baseUrl: string;
    name?: string;
    logoUrl?: string;       // "/_assets_/images/logo.png"
    sameAs?: string[];      // réseaux
    aggregateRating?: AggregateRatingInput;
    reviews?: ReviewInput[];
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    const logo = params.logoUrl
        ? `${base}${params.logoUrl.startsWith("/") ? params.logoUrl : `/${params.logoUrl}`}`
        : undefined;

    const aggregateRating = buildAggregateRatingJsonLd(params.aggregateRating);
    const review = buildReviewsJsonLd(params.reviews);

    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: params.name || "Horizon Conversion",
        url: base,
        ...(logo ? { logo } : {}),
        ...(Array.isArray(params.sameAs) && params.sameAs.length ? { sameAs: params.sameAs } : {}),
        ...(aggregateRating ? { aggregateRating } : {}),
        ...(review ? { review } : {})
    };
}

/** -----------------------------
 *  PageContext + canonical
 * ------------------------------ */
export type PageContext =
    | { type: "static"; staticLabel: string; staticUrl: string }
    | { type: "service"; service: string }
    | { type: "serviceVille"; service: string; ville: string }
    | { type: "zonesIndex" }
    | { type: "zone"; zone: string }
    | { type: "zoneVille"; zone: string; ville: string }
    | { type: "ressourcesIndex" }
    | { type: "article"; article: string };

export function canonicalFromPageContext(ctx: PageContext): string {
    switch (ctx.type) {
        case "static":
            return ctx.staticUrl;
        case "service":
            return urlService(ctx.service);
        case "serviceVille":
            return urlServiceVille(ctx.service, ctx.ville);
        case "zonesIndex":
            return urlZonesIndex();
        case "zone":
            return urlZone(ctx.zone);
        case "zoneVille":
            return urlZoneVille(ctx.zone, ctx.ville);
        case "ressourcesIndex":
            return urlRessourcesIndex();
        case "article":
            return urlArticle(ctx.article);
        default:
            return "/";
    }
}

/** -----------------------------
 *  LocalBusiness JSON-LD (safe)
 *  - pas d’adresse / tel inventés
 * ------------------------------ */
function buildAreaServedForVille(vSlug: string) {
    const v = getVilleBySlug(vSlug);
    if (!v) return null;

    const around = Array.isArray(v.alentours) ? v.alentours.slice(0, 6) : [];
    return {
        "@type": "City",
        name: safeText(v.nom, vSlug),
        ...(around.length
            ? {
                containsPlace: around.map((name: string) => ({
                    "@type": "Place",
                    name: String(name)
                }))
            }
            : {})
    };
}

function buildAreaServedForZone(zSlug: string) {
    const z = getZoneBySlug(zSlug);
    if (!z) return null;
    return {
        "@type": "AdministrativeArea",
        name: safeText(z.nom, zSlug)
    };
}

export function buildLocalBusinessJsonLd(params: {
    baseUrl: string;
    ctx: PageContext;
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    const ctx = params.ctx;

    const eligible =
        ctx.type === "serviceVille" || ctx.type === "zone" || ctx.type === "zoneVille";
    if (!eligible) return null;

    let areaServed: any = null;
    let serviceType: string[] = [];

    if (ctx.type === "serviceVille") {
        const s = getServiceBySlug(ctx.service);
        areaServed = buildAreaServedForVille(ctx.ville);
        serviceType = [safeText(s?.nom, ctx.service)];
    }

    if (ctx.type === "zone") {
        areaServed = buildAreaServedForZone(ctx.zone);
        serviceType = (services as any[]).map((s) => safeText(s.nom, String(s.slug)));
    }

    if (ctx.type === "zoneVille") {
        areaServed = buildAreaServedForVille(ctx.ville) || buildAreaServedForZone(ctx.zone);
        serviceType = (services as any[]).map((s) => safeText(s.nom, String(s.slug)));
    }

    const knowsAbout = [
        "SEO local",
        "Google Ads",
        "Meta Ads",
        "Optimisation de conversion (CRO)",
        "Tracking & analytics"
    ];

    const url = canonicalFromPageContext(ctx);
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Horizon Conversion",
        url: `${base}${url}`,
        areaServed: areaServed || undefined,
        serviceType: serviceType.length ? serviceType : undefined,
        knowsAbout
    };
}

/** -----------------------------
 *  Service JSON-LD
 *  - sur pages service + service×ville
 *  - “safe” : pas de prix inventés
 * ------------------------------ */
export function buildServiceJsonLd(params: {
    baseUrl: string;
    ctx: PageContext;
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    const ctx = params.ctx;

    const eligible = ctx.type === "service" || ctx.type === "serviceVille";
    if (!eligible) return null;

    const sSlug = ctx.type === "service" ? ctx.service : ctx.service;
    const sObj = getServiceBySlug(sSlug);
    const serviceName = safeText(sObj?.nom, sSlug);

    // areaServed si service×ville (utile pour l’intention locale)
    const areaServed =
        ctx.type === "serviceVille" ? buildAreaServedForVille(ctx.ville) : undefined;

    const url = canonicalFromPageContext(ctx);

    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        serviceType: serviceName,
        provider: {
            "@type": "Organization",
            name: "Horizon Conversion",
            url: base
        },
        ...(areaServed ? { areaServed } : {}),
        url: `${base}${url}`
    };
}

/** -----------------------------
 *  Article JSON-LD (ressources)
 *  - pas de dates inventées
 * ------------------------------ */
function getArticleFromMapping(slug: string) {
    const m: any = seoMapping as any;
    const list: any[] = Array.isArray(m?.computed?.articles) ? m.computed.articles : [];
    return list.find((a) => String(a.slug) === String(slug)) || null;
}

export function buildArticleJsonLd(params: {
    baseUrl: string;
    ctx: PageContext;
}) {
    const base = params.baseUrl.replace(/\/$/, "");
    const ctx = params.ctx;
    if (ctx.type !== "article") return null;

    const art = getArticleFromMapping(ctx.article);
    if (!art) return null;

    const url = canonicalFromPageContext(ctx);
    const headline = safeText(art.h1, safeText(art.metaTitle, ctx.article));
    const description = safeText(art.metaDescription, "");

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${base}${url}`
        },
        headline,
        description: description || undefined,
        author: {
            "@type": "Organization",
            name: "Horizon Conversion"
        },
        publisher: {
            "@type": "Organization",
            name: "Horizon Conversion"
        },
        url: `${base}${url}`
    };
}