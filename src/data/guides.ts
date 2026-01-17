export const GUIDES = [
    {
        slug: "plombier",
        title: "Guide Plombier",
        subtitle: "Checklist + critères de qualification + erreurs à éviter",
        bullets: [
            "Définir un lead “qualifié” (zone, besoin, urgence, budget, dispo)",
            "Checklist de qualification en 60 secondes",
            "Comment éviter les demandes hors-zone / injoignables",
            "Questions à poser avant d’envoyer le lead",
        ],
    },
    {
        slug: "electricien",
        title: "Guide Électricien",
        subtitle: "Demandes entrantes : tri, qualification et priorisation",
        bullets: [
            "Différencier dépannage / mise aux normes / devis travaux",
            "Filtrer les demandes irréalistes ou inexploitables",
            "Check rapide : urgence, accès, matériel, délai",
            "Script d’appel pour clarifier avant transmission",
        ],
    },
    {
        slug: "serrurier",
        title: "Guide Serrurier",
        subtitle: "Urgences, devis et demandes : éviter les pertes de temps",
        bullets: [
            "Qualification express des urgences (porte claquée, serrure, etc.)",
            "Zone + délai : les 2 filtres qui sauvent ton planning",
            "Questions anti-arnaques / anti-ping-pong",
            "Comment augmenter le taux de transformation au téléphone",
        ],
    },
] as const;

export type GuideSlug = (typeof GUIDES)[number]["slug"];
