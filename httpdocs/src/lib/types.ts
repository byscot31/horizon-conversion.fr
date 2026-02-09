// src/lib/types.ts
export type Segment = "volume" | "premium" | "mix";

export type ToneVariant =
    | "direct-quickwins"
    | "direct-budget"
    | "reassure-accompagnement"
    | "reassure-confiance"
    | "pedago-simple"
    | "local-ancrage";

export type AngleVariant =
    | "plus-appels"
    | "se-trouver-local"
    | "demandes-rapides"
    | "site-qui-convertit";

export type ProfileKey = {
    service: string; // ex: "svc-google-ads"
    ville: string;   // ex: "city-luzarches"
    cible: string;   // ex: "job-plombier"
};

export type Profile = {
    pageId: string;
    segment: Segment;
    variant: { tone: ToneVariant; angle: AngleVariant; proofSet: string };
    seo: {
        title: string;
        meta: string;
        canonical: string;
        breadcrumbs: Array<{ label: string; href: string }>;
    };
    hero: {
        h1: string;
        sub: string;
        bullets: string[];
        ctaPrimary: { label: string; href: string };
        ctaSecondary: { label: string; href: string };
    };
    sections: {
        benefits: string[];     // ids
        deliverables: string[]; // ids
        proofs: string[];       // ids
        process: string;        // key variant
        faqs: string[];         // ids
    };
    internalLinks: {
        primary: Array<{ label: string; href: string }>;
        secondary: Array<{ label: string; href: string }>;
    };
    tracking: { service: string; ville: string; metier: string };
};
