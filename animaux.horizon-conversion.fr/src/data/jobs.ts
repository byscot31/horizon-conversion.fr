// src/data/jobs.ts
export const JOBS = {
    "educateur-canin": {
        name: "Éducateur canin",
        headline: "Plus de bilans & séances, moins de demandes hors zone.",
        pains: [
            "Trop de demandes non qualifiées (hors zone / hors budget).",
            "Dépendance au bouche-à-oreille et aux plateformes.",
            "Concurrence locale forte sur “éducateur canin + ville”.",
        ],
        outcomes: [
            "Leads plus qualifiés (ville, besoin, urgence, budget).",
            "Pages locales “1 intention = 1 page” qui rankent.",
            "Ads pilotées au coût par lead (sans parasitage).",
        ],
        intents: [
            "éducateur canin + ville",
            "éducation chiot + ville",
            "rééducation chien + ville",
            "bilan comportemental + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Google Ads (Search)",
            "Meta Ads (Facebook/Instagram)",
            "Landing pages & conversion",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés (pour enrichissement 100% data-driven)
        seoTitle: "Éducateur canin – plus de RDV en Sud Oise (60) & Val d’Oise (95) | Horizon Conversion",
        seoDescription:
            "Acquisition locale pour éducateurs canins : pages métier×ville, Google Maps, Ads anti-parasites et tracking (appels/formulaires). Sud Oise 60 & Val d’Oise 95.",
        featuredTowns: ["Chantilly", "Senlis", "Creil", "Pont-Sainte-Maxence", "Cergy", "Pontoise", "Argenteuil", "Franconville"],
        recommendedPrestations: ["seo-local", "google-ads", "landing-pages"],
        intentExamples: [
            "éducateur canin Chantilly",
            "éducation chiot Senlis",
            "rééducation chien Creil",
            "bilan comportemental Cergy",
            "éducateur canin Argenteuil",
            "éducateur canin près de moi",
        ],
        specifics: {
            objections: [
                "“Je veux une solution rapidement, près de chez moi.”",
                "“Est-ce que ça marche pour mon cas (rappel, réactivité, chiot) ?”",
                "“Je n’ai pas envie d’un discours flou : je veux un plan.”",
            ],
            reassurance: [
                "Déroulé clair : bilan → plan → séances → suivi.",
                "Cadre : périmètre, objectifs réalistes, fréquence et durée.",
                "Qualification douce : ville, délai, besoin, budget (pour éviter les demandes inutiles).",
            ],
            differentiation: [
                "Pages par intention (chiot / rappel / rééducation) + ville.",
                "Preuves alternatives : process, livrables, tracking (sans dépendre des avis).",
                "Maillage zone → ville → métier×ville pour gagner en couverture locale.",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Éducateur canin (local)",
            context:
                "Mise en place de pages métier×ville + FAQ + CTA + tracking (clic-to-call + formulaires). Objectif : plus de bilans qualifiés et moins de demandes hors secteur.",
            kpis: [
                { label: "Leads qualifiés", value: "↑ via formulaire (ville/délai/besoin)" },
                { label: "Demandes hors zone", value: "↓ via rayon + messages + exclusions" },
                { label: "Conversion", value: "↑ via pages dédiées + réassurance" },
            ],
            note: "Exemple indicatif : les résultats varient selon l’offre, la concurrence et l’agenda.",
        },
        faq: [
            {
                q: "Comment éviter les demandes hors zone (ou trop loin) ?",
                a: "On combine pages locales (métier×ville), rayon/communes affichés, exclusions Ads et formulaire qualifiant (ville, délai, besoin).",
            },
            {
                q: "Qu’est-ce qui convertit le mieux pour un éducateur canin ?",
                a: "Une promesse simple (bilan/chiot/rééducation), un déroulé clair, une FAQ ciblée (objections) et un CTA rapide (appel + diagnostic).",
            },
            {
                q: "Je démarre et j’ai peu d’avis : est-ce bloquant ?",
                a: "Non. On renforce la confiance via preuves alternatives (process, livrables, transparence) et tracking (appels/formulaires).",
            },
        ],
    },

    comportementaliste: {
        name: "Comportementaliste",
        headline: "Des demandes qualifiées sur les troubles prioritaires.",
        pains: [
            "Demandes trop vagues, difficile à trier.",
            "Lead “gratuit” mais non transformable (hors périmètre).",
            "Manque de confiance si peu d’avis.",
        ],
        outcomes: [
            "Formulaires qualifiants (trouble, ville, délai).",
            "Preuves alternatives (process + tracking).",
            "Pages ciblées par intention (agressivité, peur, anxiété…).",
        ],
        intents: [
            "comportementaliste chien + ville",
            "anxiété séparation chien + ville",
            "chien agressif + ville",
            "chien peureux + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Landing pages & conversion",
            "Meta Ads (lead qualifié)",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés
        seoTitle: "Comportementaliste – demandes qualifiées (60/95) | Horizon Conversion",
        seoDescription:
            "Acquisition locale pour comportementalistes : pages par intention + ville, formulaire qualifiant, réassurance et tracking. Sud Oise (60) & Val d’Oise (95).",
        featuredTowns: ["Senlis", "Lamorlaye", "Gouvieux", "Chantilly", "Pontoise", "Cergy", "Enghien-les-Bains", "L’Isle-Adam"],
        recommendedPrestations: ["seo-local", "landing-pages", "meta-ads"],
        intentExamples: [
            "comportementaliste chien Senlis",
            "anxiété séparation chien Chantilly",
            "chien agressif Cergy",
            "chien peureux Pontoise",
            "comportementaliste près de moi",
        ],
        specifics: {
            objections: [
                "“Je ne veux pas être jugé, j’ai besoin d’un cadre.”",
                "“Est-ce que vous traitez ce type de trouble ?”",
                "“Je veux savoir à quoi m’attendre (déroulé, suivi).”",
            ],
            reassurance: [
                "Tonalité empathique + explication des limites + objectifs réalistes.",
                "FAQ par problématique (anxiété, agressivité, peurs, aboiements…).",
                "Qualification : contexte, urgence, ville, objectif (pour filtrer les demandes floues).",
            ],
            differentiation: [
                "Pages “problème → solution” (au lieu d’un texte générique).",
                "Réassurance forte : méthode, déroulé, ce qui est inclus.",
                "Tracking pour piloter la qualité (pas juste le volume).",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Comportementaliste",
            context:
                "Création de pages ciblées (problématique + ville) + formulaire qualifiant (trouble/urgence/ville) + tracking. Objectif : demandes plus exploitables et tri plus rapide.",
            kpis: [
                { label: "Qualité des demandes", value: "↑ via questions + pages dédiées" },
                { label: "Temps de tri", value: "↓ (moins de demandes vagues)" },
                { label: "Conversion", value: "↑ (réassurance + CTA clair)" },
            ],
            note: "Exemple indicatif : dépend du positionnement et du périmètre d’intervention.",
        },
        faq: [
            {
                q: "Comment filtrer les demandes trop vagues ?",
                a: "Avec un formulaire qualifiant (trouble, contexte, urgence, ville) + pages dédiées par problématique + messages qui cadrent l’offre.",
            },
            {
                q: "Peut-on cibler anxiété / peur / agressivité ?",
                a: "Oui, via pages et Ads sur intentions fortes, avec wording prudent et réassurance (déroulé, méthode, attentes réalistes).",
            },
            {
                q: "Comment rassurer sans beaucoup d’avis ?",
                a: "Preuves alternatives : process, livrables, cas anonymisés et tracking (appels/formulaires) + FAQ très spécifique.",
            },
        ],
    },

    toiletteur: {
        name: "Toiletteur",
        headline: "Remplir l’agenda avec des clients de proximité.",
        pains: [
            "Saisonnalité et trous dans l’agenda.",
            "Concurrence sur les requêtes locales.",
            "Clients hors zone / hors prestations.",
        ],
        outcomes: [
            "Plus d’appels et d’itinéraires via Google Maps.",
            "Pages “toiletteur chien/chat + ville” + FAQ.",
            "Ads locales sur périodes clés (tonte, mue, été).",
        ],
        intents: [
            "toiletteur chien + ville",
            "toiletteur chat + ville",
            "toilettage + ville",
            "tonte chien + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Google Ads (Search)",
            "Landing pages & conversion",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés
        seoTitle: "Toiletteur – remplir l’agenda en Sud Oise (60) & Val d’Oise (95) | Horizon Conversion",
        seoDescription:
            "Plus d’appels/itinéraires pour toiletteurs : Google Maps + pages par prestation×ville, Ads sur périodes clés et tracking (clic-to-call/formulaires). 60/95.",
        featuredTowns: ["Chantilly", "Creil", "Nogent-sur-Oise", "Pont-Sainte-Maxence", "Argenteuil", "Franconville", "Sannois", "Cergy"],
        recommendedPrestations: ["seo-local", "google-ads", "landing-pages"],
        intentExamples: [
            "toiletteur chien Chantilly",
            "toiletteur chat Creil",
            "toilettage Argenteuil",
            "tonte chien Franconville",
            "toiletteur près de moi",
        ],
        specifics: {
            objections: [
                "“Combien ça coûte / combien de temps ça prend ?”",
                "“Mon animal est difficile / gros gabarit.”",
                "“Je veux un créneau vite.”",
            ],
            reassurance: [
                "FAQ pratique : durées, races/gabarits, conditions, politique d’annulation.",
                "Prestation cadrée : ce qui est inclus / non inclus.",
                "CTA orienté RDV + filtre (race/gabarit/contraintes) pour éviter les demandes parasites.",
            ],
            differentiation: [
                "Pages par prestation (tonte, démêlage, chat…) + ville (intention forte).",
                "Saisonnalité (mue/été) : Ads ponctuelles + messages de planning.",
                "Tracking pour piloter coût/lead et remplissage des créneaux.",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Toiletteur",
            context:
                "Landing dédiée + Ads Search + suivi clic-to-call/formulaires. Objectif : remplir les créneaux semaine et réduire les demandes hors zone/hors prestation.",
            kpis: [
                { label: "Demandes qualifiées", value: "↑ via page dédiée + FAQ" },
                { label: "Demandes hors prestation", value: "↓ via filtre (race/gabarit)" },
                { label: "Pilotage", value: "clair (source → demande)" },
            ],
            note: "Exemple indicatif : dépend de la saison et de la concurrence locale.",
        },
        faq: [
            {
                q: "Comment remplir les créneaux creux ?",
                a: "Socle SEO/Maps + Ads ponctuelles sur périodes clés + landing dédiée (preuve/FAQ/CTA).",
            },
            {
                q: "Comment éviter les demandes hors prestations ?",
                a: "Pages par prestation + FAQ + formulaire (race/gabarit/contraintes) + exclusions Ads sur requêtes non pertinentes.",
            },
            {
                q: "Google Maps peut suffire ?",
                a: "Souvent oui en base, mais le combo Maps + pages locales + tracking stabilise et augmente la demande.",
            },
        ],
    },

    "pension-canine": {
        name: "Pension canine / Pet-sitter",
        headline: "Plus de réservations sans dépendre des plateformes.",
        pains: [
            "Dépendance à Rover / plateformes + commissions.",
            "Pics de demande (vacances) difficiles à capter.",
            "Leads non sérieux / hors critères.",
        ],
        outcomes: [
            "Pages locales par ville + périodes (vacances).",
            "Meta Ads pour générer des demandes qualifiées.",
            "Formulaire filtrant (dates, chien, conditions).",
        ],
        intents: [
            "pension canine + ville",
            "garde chien + ville",
            "pet sitter + ville",
            "pension chien vacances + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Meta Ads",
            "Landing pages & conversion",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés
        seoTitle: "Pension canine / Pet-sitter – plus de réservations (60/95) | Horizon Conversion",
        seoDescription:
            "Réservations locales pour pensions/pet-sitters : pages ville + périodes, Meta Ads qualifiantes, formulaire dates/conditions et tracking. Sud Oise 60 & Val d’Oise 95.",
        featuredTowns: ["Senlis", "Chantilly", "Clermont", "Pont-Sainte-Maxence", "Pontoise", "L’Isle-Adam", "Herblay-sur-Seine", "Gonesse"],
        recommendedPrestations: ["seo-local", "meta-ads", "landing-pages"],
        intentExamples: [
            "pension canine Senlis",
            "garde chien Chantilly",
            "pet sitter Pontoise",
            "pension chien vacances L’Isle-Adam",
            "pension canine près de moi",
        ],
        specifics: {
            objections: [
                "“Je veux être sûr de la sécurité et des conditions.”",
                "“Est-ce qu’il reste de la place à mes dates ?”",
                "“Je veux éviter les plateformes.”",
            ],
            reassurance: [
                "Conditions claires : capacité, règles, visites, protocole.",
                "Formulaire filtrant : dates, gabarit, besoins, compatibilités.",
                "Contenu local + preuves alternatives (process, transparence, tracking).",
            ],
            differentiation: [
                "Saisonnalité (vacances/WE) : pages + Ads + messages de calendrier.",
                "Maillage local (zone→ville) pour capter la demande de proximité.",
                "Optimisation sur leads qualifiés (pas sur volume).",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Pension canine / Pet-sitter",
            context:
                "Pages locales + formulaire dates/conditions + retargeting. Objectif : plus de demandes exploitables et moins de temps perdu sur demandes hors critères.",
            kpis: [
                { label: "Demandes qualifiées", value: "↑ (dates/conditions)" },
                { label: "Demandes hors critères", value: "↓ (filtrage)" },
                { label: "Saisonnalité", value: "mieux captée (vacances/WE)" },
            ],
            note: "Exemple indicatif : dépend de la capacité, des tarifs et des périodes.",
        },
        faq: [
            {
                q: "Comment réduire la dépendance aux plateformes ?",
                a: "Pages locales + contenus Google (GBP) + Meta Ads qualifiantes + retargeting, pour générer des demandes en direct.",
            },
            {
                q: "Comment filtrer les demandes non sérieuses ?",
                a: "Formulaire (dates, gabarit, besoins, conditions) + messages clairs + optimisation des campagnes sur leads qualifiés.",
            },
            {
                q: "Qu’est-ce qui rassure le plus ?",
                a: "Transparence : protocole, sécurité, capacité, visites, calendrier — et un parcours de réservation simple.",
            },
        ],
    },

    veterinaire: {
        name: "Vétérinaire",
        headline: "Visibilité locale et prises de RDV selon vos services.",
        pains: [
            "Concurrence (cartes Google + annuaires).",
            "Gestion des demandes urgentes vs non urgentes.",
            "Difficulté à mettre en avant certains services.",
        ],
        outcomes: [
            "Pages par service (vaccin, stérilisation, urgence…) + ville.",
            "Optimisation GBP (catégories, services, Q&R).",
            "Ads Search sur services prioritaires (selon règles).",
        ],
        intents: [
            "vétérinaire + ville",
            "urgence vétérinaire + ville",
            "vaccin chien + ville",
            "stérilisation chat + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Google Ads (Search)",
            "Landing pages & conversion",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés
        seoTitle: "Vétérinaire – visibilité locale & RDV (Sud Oise 60 / Val d’Oise 95) | Horizon Conversion",
        seoDescription:
            "Pages service×ville, Google Maps, Ads Search (si pertinent) et tracking appels/formulaires pour piloter les RDV. Zones : Sud Oise (60) & Val d’Oise (95).",
        featuredTowns: ["Creil", "Nogent-sur-Oise", "Chantilly", "Méru", "Argenteuil", "Cergy", "Pontoise", "Gonesse"],
        recommendedPrestations: ["seo-local", "google-ads", "tracking"],
        intentExamples: [
            "vétérinaire Creil",
            "urgence vétérinaire Argenteuil",
            "vaccin chien Cergy",
            "stérilisation chat Pontoise",
            "vétérinaire près de moi",
        ],
        specifics: {
            objections: [
                "“Urgence ou non : qui appeler et quand ?”",
                "“Je cherche un service précis (vaccin, chirurgie, NAC…).”",
                "“Je veux une info claire avant de me déplacer.”",
            ],
            reassurance: [
                "Parcours clair : urgence vs non urgence + CTA adaptés.",
                "Pages services + FAQ + schémas + GBP alignée (services/catégories).",
                "Tracking appels + formulaires pour mesurer et améliorer.",
            ],
            differentiation: [
                "Mettre en avant les services prioritaires (pages dédiées).",
                "Réduire la friction (infos pratiques, itinéraires, prise de contact).",
                "Pilotage par la donnée (sources → RDV).",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Cabinet vétérinaire",
            context:
                "Pages services + optimisation GBP + suivi clic-to-call. Objectif : améliorer la visibilité locale sur services prioritaires et clarifier le parcours urgence/non urgence.",
            kpis: [
                { label: "Appels mesurés", value: "↑ (clic-to-call suivi)" },
                { label: "Itinéraires", value: "↑ via GBP optimisée" },
                { label: "Services prioritaires", value: "mieux identifiés (pages dédiées)" },
            ],
            note: "Exemple indicatif : attention aux contraintes et règles spécifiques du secteur.",
        },
        faq: [
            {
                q: "Peut-on séparer urgence / non urgence ?",
                a: "Oui : pages et CTA distincts, infos pratiques, et tracking appels pour mesurer l’impact et ajuster.",
            },
            {
                q: "Comment mettre en avant certains services ?",
                a: "Pages service×ville + GBP alignée (services/catégories/Q&R) + Ads Search si nécessaire selon priorités.",
            },
            {
                q: "Comment prouver l’origine des RDV ?",
                a: "Tracking appels + formulaires + UTM sur Ads + tableau de bord par canal (SEO/Maps/Ads).",
            },
        ],
    },

    "osteo-animalier": {
        name: "Ostéopathe animalier",
        headline: "Des RDV réguliers avec une zone maîtrisée.",
        pains: [
            "Zone large = déplacements coûteux.",
            "Requêtes dispersées (chien, cheval, chat…).",
            "Confiance à construire sans avis.",
        ],
        outcomes: [
            "Pages par espèce + ville (ostéo chien/cheval…).",
            "Ads sur intentions fortes (douleur, boiterie…).",
            "Preuves alternatives (process + tracking).",
        ],
        intents: [
            "ostéopathe animalier + ville",
            "ostéo chien + ville",
            "ostéo cheval + ville",
            "boiterie cheval + ville",
        ],
        services: [
            "SEO local & Google Maps",
            "Google Ads (Search)",
            "Landing pages & conversion",
            "Tracking & pilotage",
        ],

        // ✅ champs ajoutés
        seoTitle: "Ostéopathe animalier – RDV réguliers & zone maîtrisée (60/95) | Horizon Conversion",
        seoDescription:
            "Pages par espèce×ville (chien/chat/cheval), rayon d’intervention clair, Ads sur intentions fortes et tracking pour piloter les RDV. Sud Oise 60 & Val d’Oise 95.",
        featuredTowns: ["Lamorlaye", "Gouvieux", "Senlis", "Chantilly", "L’Isle-Adam", "Enghien-les-Bains", "Herblay-sur-Seine", "Pontoise"],
        recommendedPrestations: ["seo-local", "google-ads", "tracking"],
        intentExamples: [
            "ostéo chien Chantilly",
            "ostéo cheval Senlis",
            "ostéopathe animalier Lamorlaye",
            "boiterie cheval Pontoise",
            "ostéo animalier près de moi",
        ],
        specifics: {
            objections: [
                "“Vous vous déplacez jusqu’où ?”",
                "“C’est pour chien/chat/cheval : est-ce adapté ?”",
                "“Quels résultats concrets / en combien de séances ?”",
            ],
            reassurance: [
                "Rayon explicite + frais éventuels + communes couvertes (cohérence pages).",
                "Pages par espèce + FAQ (douleur/boiterie/récupération) + déroulé.",
                "Preuves alternatives : process, livrables, tracking (appels/formulaires).",
            ],
            differentiation: [
                "Zone maîtrisée : moins de demandes non rentables.",
                "Pages espèce×ville : meilleure pertinence (requêtes dispersées).",
                "Pilotage au coût/lead (Ads) quand il faut accélérer.",
            ],
        },
        miniCase: {
            title: "Mini cas (anonymisé) — Ostéo animalier",
            context:
                "Définition d’un rayon rentable + pages espèce×ville + tracking appels/formulaires. Objectif : réduire les demandes hors zone et stabiliser les RDV.",
            kpis: [
                { label: "Demandes hors zone", value: "↓ (rayon + FAQ + filtrage)" },
                { label: "Intention forte", value: "↑ (espèce×ville + besoins)" },
                { label: "Pilotage", value: "amélioré (sources → demandes)" },
            ],
            note: "Exemple indicatif : dépend du rayon réel, de la densité locale et de l’agenda.",
        },
        faq: [
            {
                q: "Comment gérer une zone trop large ?",
                a: "On définit un rayon rentable, on liste les communes couvertes et on filtre via formulaire + ciblage/exclusions Ads.",
            },
            {
                q: "Peut-on cibler chien / chat / cheval ?",
                a: "Oui : pages par espèce×ville, angles adaptés (douleur/boiterie/récupération) + réassurance + CTA.",
            },
            {
                q: "Sans avis, comment rassurer ?",
                a: "Process clair, livrables visibles, cas anonymisés et tracking (appels/formulaires) pour prouver l’impact.",
            },
        ],
    },
} as const;

export type JobKey = keyof typeof JOBS;