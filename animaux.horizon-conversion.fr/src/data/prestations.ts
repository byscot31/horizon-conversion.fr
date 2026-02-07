// src/data/prestations.ts
export const PRESTATIONS = {
    "seo-local": {
        name: "SEO local & Google Maps",
        badge: "Visibilité durable",
        headline:
            "Générer appels, itinéraires et demandes qualifiées grâce au SEO local et à Google Maps.",
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
            {
                q: "Est-ce utile si je n’ai pas beaucoup d’avis ?",
                a: "Oui : on renforce la confiance via process, livrables, transparence et une structure de pages très ciblée. Les avis accélèrent, mais ne sont pas indispensables pour démarrer.",
            },
            {
                q: "Combien de pages faut-il pour démarrer ?",
                a: "On commence souvent par 5 à 10 pages à forte intention (métier + ville + service), puis on étend selon ce qui convertit et la concurrence.",
            },
            {
                q: "Vous optimisez aussi la fiche Google Business Profile ?",
                a: "Oui : catégories, services, zones, posts, éléments de réassurance et cohérence NAP.",
            },
        ],

        // ✅ Nouveaux champs (anti pages similaires + auto contenu)
        processSteps: [
            {
                title: "Cadrage local (zone + offre)",
                detail:
                    "On fixe une zone réaliste (60/95) + services prioritaires + messages (qualif) pour éviter les demandes hors secteur.",
            },
            {
                title: "Fondations SEO local",
                detail:
                    "Structure du site + pages “1 intention = 1 page” (métier×ville / service×ville) + Titles/Metas/H1 cohérents.",
            },
            {
                title: "Google Maps / GBP",
                detail:
                    "Catégories, services, zone, posts, éléments de confiance et cohérence NAP pour soutenir le local pack.",
            },
            {
                title: "Preuves & conversion",
                detail:
                    "Process, livrables, FAQ, objections + CTA (appel / diagnostic) pour convertir même sans avis.",
            },
            {
                title: "Tracking & itérations",
                detail:
                    "Clic-to-call, formulaires, UTM + dashboard simple : on itère sur ce qui génère des leads utiles.",
            },
        ],
        mistakes: [
            "Une page “générale” unique qui essaie de couvrir toutes les villes (→ ne ranke pas).",
            "Zone affichée trop large (→ demandes hors secteur + baisse de confiance).",
            "GBP non alignée (catégories/services/zone incohérents) + NAP variable.",
            "Pas de tracking appels/formulaires (→ impossible de prouver ou d’optimiser).",
        ],
        activationScenarios: [
            "Votre fiche Google n’apparaît pas/peu sur Maps (même avec un bon service).",
            "Vous recevez des demandes hors zone (ou trop de “parasites”).",
            "Vous dépendez d’annuaires/plateformes et voulez une base durable.",
            "Vous ouvrez une nouvelle zone/commune (60/95) et voulez capter vite des requêtes locales.",
        ],
        proofs: [
            {
                title: "Mini cas (anonymisé) — SEO local + GBP",
                context:
                    "Objectif : augmenter appels/itinéraires et réduire les demandes hors zone. Actions : pages locales + GBP + FAQ + tracking clic-to-call/form.",
                kpis: [
                    { label: "Appels / semaine", before: "6–8", after: "12–16" },
                    { label: "Itinéraires", before: "faibles", after: "en hausse" },
                    { label: "Positions locales", before: "irrégulières", after: "plus stables" },
                    { label: "Demandes hors zone", before: "élevées", after: "réduites" },
                ],
                note:
                    "Données indicatives et anonymisées. Les résultats varient selon concurrence, zone, offre et capacité de prise de RDV.",
            },
            {
                title: "Exemple tracking — preuves par la donnée",
                context:
                    "Mise en place d’événements + UTM pour attribuer chaque lead (SEO/Maps/Ads) et piloter les priorités (pages/GBP/contenus).",
                kpis: [
                    { label: "Leads attribués", before: "incomplet", after: "fiable" },
                    { label: "Décisions", before: "au feeling", after: "sur données" },
                    { label: "Optimisations", before: "lentes", after: "plus rapides" },
                ],
                note: "Le tracking n’augmente pas “magiquement” les leads : il accélère l’optimisation et la preuve.",
            },
        ],
        internalLinks: {
            zones: ["sud-oise-60", "val-doise-95"],
            jobs: [
                "educateur-canin",
                "toiletteur",
                "pension-canine",
                "comportementaliste",
                "osteo-animalier",
                "veterinaire",
            ],
        },
    },

    "google-ads": {
        name: "Google Ads (Search)",
        badge: "Leads rapides",
        headline:
            "Captez des demandes à forte intention avec des campagnes Search orientées RDV (et anti-parasites).",
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
            {
                q: "Vous garantissez un nombre de leads ?",
                a: "On s’engage sur l’exécution, le tracking et l’optimisation continue. Les volumes dépendent de la zone, concurrence, offre, budget et capacité de prise de RDV.",
            },
            {
                q: "Comment évitez-vous les leads parasites ?",
                a: "Avec des négatifs, des ciblages géographiques propres, des annonces orientées qualification et un formulaire qui filtre (ville, besoin, délai).",
            },
            {
                q: "Faut-il une landing page dédiée ?",
                a: "Oui, idéalement : une page = une intention. Ça augmente la conversion et la qualité des demandes.",
            },
        ],

        // ✅ Nouveaux champs
        processSteps: [
            {
                title: "Cadrage (offre + zone + objectifs)",
                detail:
                    "On définit les services rentables, la zone réelle (60/95), et la notion de “lead utile” (RDV, devis, réservation).",
            },
            {
                title: "Mots-clés + négatifs",
                detail:
                    "On cible l’intention forte et on bloque le bruit (annonces d’emploi, gratuit, stages, prix non pertinents, etc.).",
            },
            {
                title: "Structure & annonces",
                detail:
                    "Groupes par intention + RSA + extensions (appel/sitelinks) orientés qualification et action.",
            },
            {
                title: "Landing page dédiée",
                detail:
                    "Une page = une intention : sections conversion + FAQ + preuve + formulaire qualifiant (ville/besoin/délai).",
            },
            {
                title: "Tracking & optimisation",
                detail:
                    "UTM + conversions (call/form) + dashboard coût/lead : on coupe ce qui attire du mauvais trafic et on scale le rentable.",
            },
        ],
        mistakes: [
            "Laisser des requêtes inutiles tourner (pas assez de négatifs).",
            "Envoyer tout le trafic sur une page générique (→ conversion faible).",
            "Ciblage geo trop large (→ leads hors zone).",
            "Optimiser sur clics plutôt que sur leads attribués (pas de tracking solide).",
        ],
        activationScenarios: [
            "Besoin de remplir l’agenda vite (jours/semaines).",
            "Offre saisonnière (pension/vacances, toilettage, bilans…).",
            "Concurrence forte sur Maps/SEO : Ads pour gagner du temps.",
            "Lancement d’une nouvelle prestation/service dans une ville prioritaire.",
        ],
        proofs: [
            {
                title: "Mini cas (anonymisé) — Search + exclusions + landing",
                context:
                    "Objectif : plus de RDV utiles, moins de bruit. Actions : structure campagnes + négatifs + landing dédiée + tracking call/form.",
                kpis: [
                    { label: "CTR", before: "2,0–2,8%", after: "4,0–5,5%" },
                    { label: "Taux de conv.", before: "2,5–3,5%", after: "5,5–8,0%" },
                    { label: "Coût / lead", before: "25–35€", after: "15–25€" },
                    { label: "Leads hors zone", before: "fréquents", after: "réduits" },
                ],
                note: "Indications anonymisées : dépend du budget, de l’offre et de la concurrence locale.",
            },
            {
                title: "Exemple “anti-parasites” (qualif)",
                context:
                    "Ajout de qualification (formulaire + messages) + exclusions : objectif = moins de volume, plus d’exploitables.",
                kpis: [
                    { label: "Qualité des leads", before: "mixte", after: "meilleure" },
                    { label: "Temps perdu", before: "élevé", after: "réduit" },
                    { label: "Pilotage", before: "flou", after: "coût/lead clair" },
                ],
            },
        ],
        internalLinks: {
            zones: ["sud-oise-60", "val-doise-95"],
            jobs: ["toiletteur", "pension-canine", "educateur-canin", "veterinaire"],
        },
    },

    "meta-ads": {
        name: "Meta Ads (Facebook/Instagram)",
        badge: "Demande qualifiée",
        headline:
            "Générez des demandes locales qualifiées avec des messages adaptés aux métiers animaliers.",
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
            {
                q: "Meta Ads marche-t-il pour tous les métiers animaliers ?",
                a: "Oui, surtout quand l’offre est claire et qu’on filtre correctement. La stratégie varie selon la saisonnalité, l’urgence et la concurrence locale.",
            },
            {
                q: "Plutôt formulaire Meta ou landing page ?",
                a: "Les deux existent. Le formulaire Meta est rapide, la landing page convertit souvent mieux et renforce la confiance. On choisit selon objectif et budget.",
            },
            {
                q: "Comment qualifier les demandes ?",
                a: "Via questions (ville, besoin, délai), exclusions, ciblage local, et messages qui cadrent l’offre.",
            },
        ],

        // ✅ Nouveaux champs
        processSteps: [
            {
                title: "Offre + angle",
                detail:
                    "On clarifie une offre simple (bénéfice + preuve) et 2–3 angles créatifs adaptés au métier animalier.",
            },
            {
                title: "Ciblage local",
                detail:
                    "Rayon + exclusions (si besoin) + audiences : on évite la zone trop large qui ramène du bruit.",
            },
            {
                title: "Créatifs (variantes)",
                detail:
                    "Hooks + formats + scripts (UGC-like) pour capter l’attention sans perdre la crédibilité.",
            },
            {
                title: "Qualification",
                detail:
                    "Formulaire (ville/besoin/délai) + message de cadrage. Option : landing page pour renforcer la confiance.",
            },
            {
                title: "Tracking & itérations",
                detail:
                    "Pixel + événements + UTM : on optimise sur “leads utiles” et pas sur le volume brut.",
            },
        ],
        mistakes: [
            "Chercher du volume sans qualification (→ beaucoup de demandes non exploitables).",
            "Ciblage trop large (→ hors zone / hors besoin).",
            "Créatifs “trop pub” (→ manque de confiance) ou trop génériques (→ pages clones).",
            "Pas de retargeting (→ on perd les prospects tièdes).",
        ],
        activationScenarios: [
            "Besoin d’alimenter la demande sur une zone concurrentielle (60/95) avec un message différenciant.",
            "Offre claire (pack/diagnostic) qui se prête au format social.",
            "Saisonnalité : booster une période (vacances, rentrée, périodes creuses).",
            "Retargeting pour transformer les visiteurs SEO/Maps en demandes.",
        ],
        proofs: [
            {
                title: "Mini cas (anonymisé) — Prospection + qualif",
                context:
                    "Objectif : plus de demandes utiles. Actions : angles confiance + formulaire qualifiant + retargeting + tracking.",
                kpis: [
                    { label: "Coût / lead", before: "8–14€", after: "6–10€" },
                    { label: "Taux de qualif", before: "faible/moyen", after: "meilleur" },
                    { label: "RDV pris", before: "irrégulier", after: "plus stable" },
                ],
                note: "Les résultats dépendent fortement de l’offre, du créatif, et de la capacité à répondre vite.",
            },
            {
                title: "Exemple retargeting (tièdes → chauds)",
                context:
                    "Relance des visiteurs (site/landing) avec preuve + CTA : objectif = augmenter le taux de transformation.",
                kpis: [
                    { label: "Taux de conversion", before: "—", after: "en hausse" },
                    { label: "Leads utiles", before: "—", after: "plus nombreux" },
                ],
            },
        ],
        internalLinks: {
            zones: ["sud-oise-60", "val-doise-95"],
            jobs: ["educateur-canin", "toiletteur", "pension-canine", "comportementaliste"],
        },
    },

    "landing-pages": {
        name: "Landing pages & conversion",
        badge: "Plus de RDV",
        headline:
            "Des pages qui convertissent : réassurance, preuve, FAQ, CTA — prêtes pour SEO local et Ads.",
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
            {
                q: "Vous fournissez la page “clé en main” ?",
                a: "Oui : structure, copy, sections, FAQ, schémas JSON-LD si besoin, et recommandations d’implémentation.",
            },
            {
                q: "Combien de variations faut-il tester ?",
                a: "On démarre avec 1–2 variations (hook + CTA), puis on itère selon les données.",
            },
            {
                q: "C’est compatible SEO local ?",
                a: "Oui, si on respecte “1 intention = 1 page” et qu’on évite la cannibalisation avec une arborescence propre.",
            },
        ],

        // ✅ Nouveaux champs
        processSteps: [
            {
                title: "Positionnement & offre",
                detail:
                    "Clarifier promesse, pour qui/pas pour qui, et l’action attendue (appel / RDV / devis).",
            },
            {
                title: "Structure conversion",
                detail:
                    "Hero + preuves + process + objections + FAQ + CTA répétés (sans lourdeur).",
            },
            {
                title: "Qualification",
                detail:
                    "Formulaire court mais filtrant (ville/besoin/délai) + messages anti-parasites.",
            },
            {
                title: "Vitesse & mobile",
                detail:
                    "Design léger, lisible, rapide. Objectif : réduire friction et augmenter le taux de conv.",
            },
            {
                title: "Tracking & tests",
                detail:
                    "Événements (click_call/form_submit) + UTM + plan de tests (hooks/CTA/form).",
            },
        ],
        mistakes: [
            "Trop de blabla, pas assez d’action (CTA noyé).",
            "Pas de preuve alternative (process/livrables/tracking) surtout sans avis.",
            "Formulaire trop long (ou au contraire pas qualifiant).",
            "Landing unique pour plusieurs intentions (→ conversion baisse).",
        ],
        activationScenarios: [
            "Vous faites des Ads et la page actuelle ne convertit pas.",
            "Vous voulez filtrer les demandes hors zone / hors budget.",
            "Vous lancez une offre (pack) et avez besoin d’une page dédiée.",
            "Vous voulez augmenter la conversion sans dépendre des avis.",
        ],
        proofs: [
            {
                title: "Mini cas (anonymisé) — Refonte landing + sections conversion",
                context:
                    "Objectif : augmenter RDV et réduire les demandes inutiles. Actions : copy bénéfices + FAQ + preuves + formulaire qualifiant.",
                kpis: [
                    { label: "Taux de conversion", before: "2,5–3,5%", after: "5,0–8,0%" },
                    { label: "Clic-to-call", before: "faible", after: "en hausse" },
                    { label: "Demandes hors zone", before: "fréquentes", after: "réduites" },
                ],
                note: "Résultats indicatifs. La conversion dépend aussi de l’offre et de la réactivité de réponse.",
            },
            {
                title: "Exemple A/B (hook + CTA)",
                context:
                    "Test d’un hook plus direct + CTA plus clair. Objectif : améliorer la compréhension et l’action.",
                kpis: [
                    { label: "CTR CTA", before: "baseline", after: "+20–40% (souvent)" },
                    { label: "Abandon form", before: "élevé", after: "réduit" },
                ],
            },
        ],
        internalLinks: {
            zones: ["sud-oise-60", "val-doise-95"],
            jobs: ["toiletteur", "educateur-canin", "pension-canine"],
        },
    },

    tracking: {
        name: "Tracking & pilotage",
        badge: "Preuve par la donnée",
        headline:
            "Mesurer appels, formulaires et sources (SEO/Maps/Ads) pour optimiser vite et sans débat.",
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
            {
                q: "GA4 ou Matomo ?",
                a: "Les deux fonctionnent. GA4 est standard, Matomo est apprécié pour le contrôle des données. On choisit selon contraintes et préférences.",
            },
            {
                q: "Vous suivez aussi les appels ?",
                a: "Oui : clic-to-call + (si nécessaire) solutions de call tracking selon votre besoin.",
            },
            {
                q: "À quoi ressemble le reporting ?",
                a: "Un dashboard simple avec leads, coût/lead, conversion, sources et prochaines actions.",
            },
        ],

        // ✅ Nouveaux champs
        processSteps: [
            {
                title: "Audit & objectifs",
                detail:
                    "On liste les actions à mesurer (appel, form, prise RDV) et les canaux (SEO/Maps/Ads).",
            },
            {
                title: "Plan UTM + naming",
                detail:
                    "Règles simples et stables : source/medium/campaign/adset — pour éviter le chaos dans les rapports.",
            },
            {
                title: "Événements & conversions",
                detail:
                    "click_to_call, form_submit, CTA, thank-you… + déduplication si besoin.",
            },
            {
                title: "Dashboard",
                detail:
                    "Un tableau clair : leads, coût/lead, taux de conv., sources, qualité (si dispo).",
            },
            {
                title: "Boucle d’optimisation",
                detail:
                    "Chaque mois : ce qui marche / ce qui bloque / actions concrètes (pages, Ads, GBP).",
            },
        ],
        mistakes: [
            "UTM incohérents (ou absents) → attribution impossible.",
            "Mesurer uniquement les clics et pas les conversions (appel/form).",
            "Pas de page /merci/ ou d’événements → reporting incomplet.",
            "Dashboard trop complexe : personne ne l’utilise.",
        ],
        activationScenarios: [
            "Vous ne savez pas si les leads viennent du SEO, Maps ou Ads.",
            "Vous dépensez en Ads mais ne pouvez pas prouver ce qui est rentable.",
            "Vous voulez piloter au coût/lead et améliorer la qualité (pas juste le volume).",
            "Vous voulez des décisions rapides et factuelles (sans débat).",
        ],
        proofs: [
            {
                title: "Mini cas (anonymisé) — Attribution clarifiée",
                context:
                    "Objectif : relier chaque lead à une source (SEO/Maps/Ads) pour arbitrer les priorités et budgets.",
                kpis: [
                    { label: "Leads attribués", before: "partiel", after: "quasi complet" },
                    { label: "Temps d’analyse", before: "long", after: "court" },
                    { label: "Décisions", before: "au feeling", after: "data-driven" },
                ],
                note:
                    "Le gain principal : vitesse d’optimisation + preuve. Les leads augmentent ensuite via meilleures décisions.",
            },
            {
                title: "Exemple “pilotage coût/lead”",
                context:
                    "Dashboard + règles : identifier campagnes/pages efficaces, couper le bruit, renforcer ce qui convertit.",
                kpis: [
                    { label: "Coût / lead", before: "instable", after: "maîtrisé" },
                    { label: "Qualité", before: "mixte", after: "meilleure (via qualif)" },
                ],
            },
        ],
        internalLinks: {
            zones: ["sud-oise-60", "val-doise-95"],
            jobs: [
                "educateur-canin",
                "toiletteur",
                "pension-canine",
                "comportementaliste",
                "osteo-animalier",
                "veterinaire",
            ],
        },
    },
} as const;

export type PrestationKey = keyof typeof PRESTATIONS;