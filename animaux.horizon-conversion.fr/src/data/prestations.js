"use strict";
exports.__esModule = true;
// src/data/prestations.ts
exports.PRESTATIONS = {
    "seo-local": {
        name: "SEO local & Google Maps",
        badge: "Visibilité durable",
        headline: "Générer appels, itinéraires et demandes qualifiées grâce au SEO local et à Google Maps.",
        forWho: ["Toiletteurs", "Éducateurs canins", "Pensions", "Ostéos animaliers", "Vétos"],
        pains: [
            "Peu de visibilité sur Google Maps malgré un bon service.",
            "Une page “générale” qui ne ranke pas localement.",
            "Dépendance aux annuaires/plateformes et leads hors zone.",
        ],
        outcomes: [
            "Plus d’appels/itinéraires via Google Business Profile.",
            "Pages locales “1 intention = 1 page” (métier + ville + service).",
            "Preuves alternatives + FAQ + schémas pour convertir sans avis.",
        ],
        deliverables: [
            "Audit SEO local + plan d’actions priorisé",
            "Optimisation Google Business Profile (catégories, services, zones, posts)",
            "Pages locales : Titles/Metas/H1 + FAQ + JSON-LD",
            "Cohérence NAP + citations locales",
            "Tracking conversions (clic-to-call, formulaires)",
        ],
        kpis: ["Appels", "Itinéraires", "Formulaires", "Positions locales", "Visibilité Maps"],
        faq: [
            { q: "Est-ce utile si je n’ai pas beaucoup d’avis ?", a: "Oui : on renforce la confiance via process, livrables, transparence et une structure de pages très ciblée. Les avis accélèrent, mais ne sont pas indispensables pour démarrer." },
            { q: "Combien de pages faut-il pour démarrer ?", a: "On commence souvent par 5 à 10 pages à forte intention (métier + ville + service), puis on étend selon ce qui convertit et la concurrence." },
            { q: "Vous optimisez aussi la fiche Google Business Profile ?", a: "Oui : catégories, services, zones, posts, éléments de réassurance et cohérence NAP." },
        ]
    },
    "google-ads": {
        name: "Google Ads (Search)",
        badge: "Leads rapides",
        headline: "Captez des demandes à forte intention avec des campagnes Search orientées RDV (et anti-parasites).",
        forWho: ["Services urgents", "Créneaux à remplir", "Offres saisonnières"],
        pains: [
            "Budget dépensé sur des requêtes inutiles.",
            "Leads hors zone / hors besoin.",
            "Tracking incomplet : impossible de savoir ce qui marche.",
        ],
        outcomes: [
            "Mots-clés intention forte + exclusions (négatifs).",
            "Annonces + extensions qui augmentent le taux de clics.",
            "Landing pages dédiées qui convertissent (et filtrent).",
        ],
        deliverables: [
            "Structure par service / zone / intention",
            "Recherche mots-clés + liste de négatifs",
            "Annonces + RSA + extensions (appel, sitelinks, accroches)",
            "Landing pages dédiées (copy + sections conversion)",
            "Tracking (UTM + événements + conversions)",
        ],
        kpis: ["Coût par lead", "Taux de conv.", "Part d’impr.", "CTR", "Qualité des leads"],
        faq: [
            { q: "Vous garantissez un nombre de leads ?", a: "On s’engage sur l’exécution, le tracking et l’optimisation continue. Les volumes dépendent de la zone, concurrence, offre, budget et capacité de prise de RDV." },
            { q: "Comment évitez-vous les leads parasites ?", a: "Avec des négatifs, des ciblages géographiques propres, des annonces orientées qualification et un formulaire qui filtre (ville, besoin, délai)." },
            { q: "Faut-il une landing page dédiée ?", a: "Oui, idéalement : une page = une intention. Ça augmente la conversion et la qualité des demandes." },
        ]
    },
    "meta-ads": {
        name: "Meta Ads (Facebook/Instagram)",
        badge: "Demande qualifiée",
        headline: "Générez des demandes locales qualifiées avec des messages adaptés aux métiers animaliers.",
        forWho: ["Éducateurs", "Toiletteurs", "Pensions", "Services concurrentiels"],
        pains: [
            "Beaucoup de volume mais peu de qualité.",
            "Difficulté à filtrer les demandes hors zone.",
            "Créatifs peu crédibles → faible confiance.",
        ],
        outcomes: [
            "Ciblage local + angles de confiance.",
            "Formulaire qualifiant (ville, besoin, urgence).",
            "Retargeting pour transformer les visiteurs.",
        ],
        deliverables: [
            "Structure campagne (prospection + retargeting)",
            "Angles & scripts créatifs (UGC-like)",
            "Créatifs (hooks, variations, formats)",
            "Formulaire qualifiant + redirection /merci/",
            "Tracking Pixel + événements",
        ],
        kpis: ["Coût par lead", "Taux de qualification", "Volume utile", "CTR", "RDV pris"],
        faq: [
            { q: "Meta Ads marche-t-il pour tous les métiers animaliers ?", a: "Oui, surtout quand l’offre est claire et qu’on filtre correctement. La stratégie varie selon la saisonnalité, l’urgence et la concurrence locale." },
            { q: "Plutôt formulaire Meta ou landing page ?", a: "Les deux existent. Le formulaire Meta est rapide, la landing page convertit souvent mieux et renforce la confiance. On choisit selon objectif et budget." },
            { q: "Comment qualifier les demandes ?", a: "Via questions (ville, besoin, délai), exclusions, ciblage local, et messages qui cadrent l’offre." },
        ]
    },
    "landing-pages": {
        name: "Landing pages & conversion",
        badge: "Plus de RDV",
        headline: "Des pages qui convertissent : réassurance, preuve, FAQ, CTA — prêtes pour SEO local et Ads.",
        forWho: ["Ads", "SEO local", "Offres packagées", "Saisonniers"],
        pains: [
            "Pages trop génériques → faible conversion.",
            "Manque de confiance (surtout sans avis).",
            "Pas de tracking → pas d’optimisation.",
        ],
        outcomes: [
            "Message clair + sections conversion (process, preuve, FAQ).",
            "Formulaires courts mais qualifiants.",
            "A/B tests et optimisation continue.",
        ],
        deliverables: [
            "Copywriting orienté bénéfices",
            "Templates sections (réassurance, objections, FAQ, CTA)",
            "Design léger + rapide (mobile-first)",
            "Tracking events (form_submit, click_call)",
            "Plan de tests (CTA, hooks, formulaires)",
        ],
        kpis: ["Taux de conversion", "Taux de clic CTA", "Qualité lead", "Temps de chargement"],
        faq: [
            { q: "Vous fournissez la page “clé en main” ?", a: "Oui : structure, copy, sections, FAQ, schémas JSON-LD si besoin, et recommandations d’implémentation." },
            { q: "Combien de variations faut-il tester ?", a: "On démarre avec 1–2 variations (hook + CTA), puis on itère selon les données." },
            { q: "C’est compatible SEO local ?", a: "Oui, si on respecte “1 intention = 1 page” et qu’on évite la cannibalisation avec une arborescence propre." },
        ]
    },
    tracking: {
        name: "Tracking & pilotage",
        badge: "Preuve par la donnée",
        headline: "Mesurer appels, formulaires et sources (SEO/Maps/Ads) pour optimiser vite et sans débat.",
        forWho: ["Tous métiers", "Ads", "SEO", "Croissance"],
        pains: [
            "Leads non attribués : on ne sait pas d’où ça vient.",
            "Décisions au feeling → budget gaspillé.",
            "Pas de tableau de bord unifié.",
        ],
        outcomes: [
            "Sources claires (UTM + événements).",
            "Optimisations basées data (coût/lead, conversion).",
            "Reporting simple (ce qui marche / ce qui bloque).",
        ],
        deliverables: [
            "Plan de tracking (UTM, événements, naming)",
            "GA4 / Matomo + Pixel Meta (si besoin)",
            "Suivi clic-to-call & formulaires",
            "Dashboard (leads, coût, taux, sources)",
            "Recommandations mensuelles basées data",
        ],
        kpis: ["Attribution", "Coût par lead", "Taux de conv.", "Qualité des leads", "ROI"],
        faq: [
            { q: "GA4 ou Matomo ?", a: "Les deux fonctionnent. GA4 est standard, Matomo est apprécié pour le contrôle des données. On choisit selon contraintes et préférences." },
            { q: "Vous suivez aussi les appels ?", a: "Oui : clic-to-call + (si nécessaire) solutions de call tracking selon votre besoin." },
            { q: "À quoi ressemble le reporting ?", a: "Un dashboard simple avec leads, coût/lead, conversion, sources et prochaines actions." },
        ]
    }
};
