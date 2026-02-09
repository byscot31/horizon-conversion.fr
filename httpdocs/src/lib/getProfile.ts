// src/lib/getProfile.ts
import type { Profile, ProfileKey, Segment, AngleVariant, ToneVariant } from "../data/types";
import { toneVariants, angleVariants, segmentRules } from "../data/profiles";

// helpers simples et déterministes
function hashStr(s: string) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return (h >>> 0).toString(16);
}
function pick<T>(arr: T[], seed: string, n: number): T[] {
    if (!arr.length) return [];
    const out: T[] = [];
    let x = parseInt(hashStr(seed).slice(0, 8), 16);
    const used = new Set<number>();
    while (out.length < Math.min(n, arr.length)) {
        x = (1103515245 * x + 12345) & 0x7fffffff;
        const idx = x % arr.length;
        if (!used.has(idx)) { used.add(idx); out.push(arr[idx]); }
    }
    return out;
}

type Catalog = {
    services: any;
    villes: any;
    cibles: any;
    benefits: any; // ex: {id, tags[], text}
    deliverables: any;
    proofs: any;  // ex: {id, tags[], segment?, services?}
    faqs: any;    // ex: {id, tags[], services?, cibles?}
    articles: any;
};

function filterByTags(items: any[], tags: string[]) {
    return items.filter((it) => it.tags?.some((t: string) => tags.includes(t)));
}

export function getProfile(key: ProfileKey, catalog: Catalog): Profile {
    const svc = catalog.services[key.service];
    const city = catalog.villes[key.ville];
    const job = catalog.cibles[key.cible];

    const segment: Segment = (city.segment || job.segment || svc.segment || "mix") as Segment;

    // variant déterministe + bascule si collision simple
    const baseTone = segmentRules[segment].defaultTone as ToneVariant;
    const baseAngle = segmentRules[segment].defaultAngle as AngleVariant;

    const seedBase = `${key.service}|${key.ville}|${key.cible}`;
    const proofSet = `ps-${hashStr(seedBase).slice(0, 6)}`;

    // Rotation : on “tourne” tone/angle selon seed
    const tones = Object.keys(toneVariants) as ToneVariant[];
    const angles = Object.keys(angleVariants) as AngleVariant[];
    const tone = pick(tones, seedBase + "|tone", 1)[0] || baseTone;
    const angle = pick(angles, seedBase + "|angle", 1)[0] || baseAngle;

    const toneCfg = toneVariants[tone];
    const angleCfg = angleVariants[angle];

    const ctx = {
        serviceName: svc.name,
        villeName: city.name,
        cibleName: job.name,
        zoneName: city.zoneName,
    };

    // Pools taggés → sélection IDs (mélange service/cible/local)
    const benefitPool = filterByTags(catalog.benefits, angleCfg.benefitTags);
    const benefits = pick(benefitPool.map(b => b.id), seedBase + "|benefits", 5);

    const delivPool = catalog.deliverables.filter((d: any) =>
        d.services?.includes(key.service) || d.tags?.includes("socle")
    );
    const deliverables = pick(delivPool.map((d: any) => d.id), seedBase + "|deliverables", 8);

    const proofPoolBase = filterByTags(catalog.proofs, toneCfg.preferredProofTags)
        .filter((p: any) => !p.services || p.services.includes(key.service))
        .filter((p: any) => !p.segment || p.segment === segment);

    const proofs = pick(proofPoolBase.map((p: any) => p.id), seedBase + "|proofs", 3);

    const faqPoolBase = filterByTags(catalog.faqs, toneCfg.preferredFaqTags)
        .filter((f: any) => !f.services || f.services.includes(key.service))
        .filter((f: any) => !f.cibles || f.cibles.includes(key.cible));

    const faqs = pick(faqPoolBase.map((f: any) => f.id), seedBase + "|faqs", 8);

    // Hero bullets : on en prend 3, et on injecte 1 spécifique local/cible si dispo
    const heroBullets = pick(toneCfg.heroBulletsPool, seedBase + "|hero", 3);

    // Liens internes (contraints)
    const primary = [
        { label: "Demander un audit gratuit", href: "/audit" },
        { label: "Voir les tarifs", href: "/tarifs" },
    ];
    const secondary = [
        { label: "Notre méthode", href: "/methode" },
        { label: "Preuves & exemples", href: "/preuves" },
    ];

    const canonical = `/zones/${city.zoneSlug}/${city.slug}/${svc.slug}/`;

    return {
        pageId: `p-${key.service}_${key.ville}_${key.cible}`,
        segment,
        variant: { tone, angle, proofSet },
        seo: {
            title: `${svc.name} à ${city.name} – ${job.name} | Audit gratuit`,
            meta: `Obtenez plus d’appels et de demandes à ${city.name}. Audit gratuit, plan d’action clair.`,
            canonical,
            breadcrumbs: [
                { label: "Accueil", href: "/" },
                { label: svc.name, href: `/services/${svc.slug}/` },
                { label: city.name, href: `/zones/${city.zoneSlug}/${city.slug}/` },
            ],
        },
        hero: {
            h1: angleCfg.h1Pattern(ctx),
            sub: angleCfg.subPattern(ctx),
            bullets: heroBullets,
            ctaPrimary: { label: "Demander un audit gratuit", href: "/audit" },
            ctaSecondary: { label: "Être rappelé", href: "/contact?callback=1" },
        },
        sections: {
            benefits,
            deliverables,
            proofs,
            process: toneCfg.processKey,
            faqs,
        },
        internalLinks: { primary, secondary },
        tracking: { service: svc.slug, ville: city.slug, metier: job.slug },
    };
}
