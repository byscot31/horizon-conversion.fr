// src/data/profiles.ts
import type { ToneVariant, AngleVariant, Segment } from "./types";

export const toneVariants: Record<ToneVariant, {
    heroStyle: "court" | "reassurant" | "pedago" | "local";
    heroBulletsPool: string[];     // micro-phrases réutilisables (mais mixées)
    preferredProofTags: string[];  // ex: ["checklist", "mini-case"]
    preferredFaqTags: string[];    // ex: ["budget", "delais"]
    processKey: string;            // ex: "process-sprint" vs "process-accompagnement"
}> = {
    "direct-quickwins": {
        heroStyle: "court",
        heroBulletsPool: [
            "Des demandes rapidement (appels + formulaires)",
            "On va à l’essentiel, sans blabla",
            "Vous savez quoi faire chaque semaine",
            "On suit ce qui marche, on coupe le reste",
        ],
        preferredProofTags: ["mini-case", "checklist"],
        preferredFaqTags: ["delais", "budget", "priorites"],
        processKey: "process-sprint",
    },
    "direct-budget": {
        heroStyle: "court",
        heroBulletsPool: [
            "Budget maîtrisé, actions utiles",
            "Priorité aux leviers qui rapportent",
            "Suivi simple, décisions claires",
            "On évite les dépenses “pour rien”",
        ],
        preferredProofTags: ["checklist", "mesures"],
        preferredFaqTags: ["budget", "engagement"],
        processKey: "process-sprint",
    },
    "reassure-accompagnement": {
        heroStyle: "reassurant",
        heroBulletsPool: [
            "Un plan clair et un suivi régulier",
            "Qualité, cohérence et stabilité",
            "On sécurise ce qui est déjà en place",
            "Vous gardez la main, sans stress",
        ],
        preferredProofTags: ["method", "qualite"],
        preferredFaqTags: ["process", "confiance", "confidentialite"],
        processKey: "process-accompagnement",
    },
    "reassure-confiance": {
        heroStyle: "reassurant",
        heroBulletsPool: [
            "Transparence : ce qui est fait, pourquoi",
            "Décisions basées sur les retours réels",
            "Pas de promesses impossibles",
            "On vise du solide, pas du “buzz”",
        ],
        preferredProofTags: ["method", "mesures"],
        preferredFaqTags: ["confiance", "resultats", "risques"],
        processKey: "process-accompagnement",
    },
    "pedago-simple": {
        heroStyle: "pedago",
        heroBulletsPool: [
            "On vous explique simplement ce qu’on fait",
            "Vous comprenez d’où viennent les demandes",
            "Étapes claires, sans jargon",
            "Vous savez quoi attendre et quand",
        ],
        preferredProofTags: ["pedago", "checklist"],
        preferredFaqTags: ["comment-ca-marche", "delais"],
        processKey: "process-pedago",
    },
    "local-ancrage": {
        heroStyle: "local",
        heroBulletsPool: [
            "Pensé pour votre zone et vos clients locaux",
            "On cible les recherches “près de chez moi”",
            "Messages adaptés à votre secteur",
            "Objectif : appels et formulaires qualifiés",
        ],
        preferredProofTags: ["local", "mini-case"],
        preferredFaqTags: ["zone", "deplacement", "concurrence"],
        processKey: "process-local",
    },
};

export const angleVariants: Record<AngleVariant, {
    h1Pattern: (ctx: any) => string;
    subPattern: (ctx: any) => string;
    benefitTags: string[]; // tags pour piocher des bénéfices
}> = {
    "plus-appels": {
        h1Pattern: ({ serviceName, villeName, cibleName }: any) =>
            `${serviceName} à ${villeName} : plus d’appels de ${cibleName}`,
        subPattern: ({}: any) =>
            "On met en place ce qui déclenche des contacts, et on suit ce qui marche.",
        benefitTags: ["appels", "contacts", "qualif"],
    },
    "se-trouver-local": {
        h1Pattern: ({ serviceName, villeName, cibleName }: any) =>
            `Être trouvé à ${villeName} quand on cherche un ${cibleName}`,
        subPattern: ({ serviceName }: any) =>
            `Avec ${serviceName}, vous apparaissez au bon moment, au bon endroit.`,
        benefitTags: ["visibilite", "local", "intention"],
    },
    "demandes-rapides": {
        h1Pattern: ({ serviceName, villeName }: any) =>
            `${serviceName} à ${villeName} : des demandes rapidement`,
        subPattern: ({}: any) =>
            "Actions courtes, priorité à l’efficacité. On évite ce qui ne sert pas.",
        benefitTags: ["rapidite", "priorites", "rentable"],
    },
    "site-qui-convertit": {
        h1Pattern: ({ villeName, cibleName }: any) =>
            `Un site qui donne envie de vous contacter à ${villeName} (spécial ${cibleName})`,
        subPattern: ({}: any) =>
            "On clarifie l’offre, on rassure, et on facilite la prise de contact.",
        benefitTags: ["conversion", "confiance", "clarte"],
    },
};

export const segmentRules: Record<Segment, {
    defaultTone: ToneVariant;
    defaultAngle: AngleVariant;
}> = {
    volume: { defaultTone: "direct-quickwins", defaultAngle: "demandes-rapides" },
    premium: { defaultTone: "reassure-accompagnement", defaultAngle: "plus-appels" },
    mix: { defaultTone: "pedago-simple", defaultAngle: "se-trouver-local" },
};
