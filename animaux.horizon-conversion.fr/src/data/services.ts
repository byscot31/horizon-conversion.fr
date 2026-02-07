// src/data/services.ts
import type { ZoneKey } from "./zones.ts";

export type Service = {
    name: string;
    badge: string;
    headline: string;
    prestationSlug: string;

    deliverables: string[];
    kpis: string[];

    // ✅ anti-dup (variables)
    positioning?: {
        promise: string; // 1 phrase forte
        who: string[]; // “pour qui”
        notFor?: string[]; // “pas pour”
    };

    localAngles?: Partial<
        Record<
            ZoneKey,
            {
                whyItWorks: string[]; // 2–4 points (zone 60 vs 95)
                constraints: string[]; // circulation, densité, concurrence…
                seasonality?: string[]; // si pertinent
            }
            >
        >;

    useCases?: Array<{
        title: string; // “Remplir les creux semaine”
        situation: string; // contexte
        approach: string[]; // 3–5 bullets
        expectedKpis?: string[]; // KPIs typiques
    }>;

    plan14?: string[]; // plan d’actions court terme
    plan30?: string[]; // plan moyen terme

    pitfalls?: string[]; // erreurs fréquentes (3–6)
    objections?: Array<{ q: string; a: string }>; // objections “sales”
    proofSnippets?: Array<{
        label: string; // “+ appels”
        value: string; // “x2”
        note?: string;
    }>;

    faq?: Array<{ q: string; a: string }>; // FAQ de base service
};

export const SERVICES = {
    "seo-local": {
        name: "SEO local & Google Maps",
        badge: "Visibilité durable",
        headline:
            "Générer appels, itinéraires et demandes qualifiées grâce au SEO local et à Google Maps (pages locales + GBP + tracking).",
        prestationSlug: "seo-local",
        deliverables: [
            "Audit SEO local + priorités (quick wins) + plan d’actions",
            "Optimisation Google Business Profile (catégories, services, zones, posts)",
            "Pages locales “1 intention = 1 page” (ville / métier / service) + FAQ + schémas",
            "Cohérence NAP + citations locales (bases propres, sans spam)",
            "Tracking conversions (clic-to-call, formulaires, sources) + dashboard simple",
        ],
        kpis: ["Appels", "Itinéraires", "Formulaires", "Visibilité Maps", "Positions locales"],

        positioning: {
            promise:
                "Devenir visible là où les gens cherchent vraiment (Maps + requêtes locales) et transformer en appels/RDV.",
            who: [
                "Toiletteurs",
                "Éducateurs canins",
                "Comportementalistes",
                "Pensions / pet-sitters",
                "Ostéos animaliers",
                "Vétérinaires (selon services)",
            ],
            notFor: [
                "Ceux qui veulent un résultat “en 48h” sans travail de fond",
                "Les offres floues (pas de promesse, pas de périmètre, pas de créneau)",
            ],
        },

        localAngles: {
            "sud-oise-60": {
                whyItWorks: [
                    "Moins dense que le 95 : les quick wins (GBP + pages ciblées) se voient souvent plus vite.",
                    "La demande se concentre sur quelques communes “cœur” : un cluster propre (ville → pages money) ranke bien.",
                    "Les pages utiles (FAQ + preuve + CTA) filtrent mieux les demandes hors secteur.",
                ],
                constraints: [
                    "Déplacements : mieux vaut annoncer un périmètre réaliste et le répéter (page + formulaire).",
                    "Éviter les pages “alentours” en URL : citer 5–8 communes dans la page ville (sans dupliquer).",
                ],
                seasonality: [
                    "Pics selon métier (pensions avant vacances / toilettage printemps-été) : anticiper via posts GBP + pages dédiées.",
                ],
            },
            "val-doise-95": {
                whyItWorks: [
                    "Zone plus concurrentielle : des pages plus complètes (preuves, objections, FAQ) font la différence.",
                    "Le maillage (hub zone → ville → money pages) aide Google à comprendre le cluster et améliore la conversion.",
                    "Quand c’est trop compétitif : Ads sur intentions rentables pour accélérer, puis SEO consolide.",
                ],
                constraints: [
                    "Circulation / stationnement : penser prise de RDV et créneaux (message + FAQ + formulaire qualifiant).",
                    "Rayon trop large = leads parasites : cadrer le périmètre et ajouter des exclusions si Ads.",
                ],
                seasonality: [
                    "Plus de concurrence sur périodes fortes (week-ends/vacances) : mieux vaut publier + renforcer preuve/CTA.",
                ],
            },
        },

        useCases: [
            {
                title: "Fiche Google Maps “invisible” malgré une bonne activité",
                situation:
                    "La fiche existe, mais peu d’appels/itinéraires et aucune requête locale stable. Souvent : catégories/services/zones mal alignés + pages trop génériques.",
                approach: [
                    "Audit GBP (catégories, services, zones, contenus) + corrections prioritaires",
                    "Création/optimisation de 3–6 pages locales à forte intention (ville + service/métier)",
                    "Ajout de preuves alternatives (process, livrables, cas anonymisé) + CTA",
                    "Tracking clic-to-call + formulaire + sources pour piloter",
                ],
                expectedKpis: ["Appels", "Itinéraires", "Clics site depuis GBP", "Positions locales"],
            },
            {
                title: "Réduire les demandes hors zone",
                situation:
                    "Beaucoup de messages “vous venez où ?” ou demandes trop loin, ce qui fait perdre du temps (et dégrade la qualité).",
                approach: [
                    "Rayon annoncé + communes couvertes visibles (page + FAQ + footer si besoin)",
                    "Formulaire qualifiant (ville / besoin / délai) + messages clairs",
                    "Pages locales cohérentes avec le périmètre réel (pas de couverture artificielle)",
                ],
                expectedKpis: ["Taux de qualification", "Temps perdu réduit", "Formulaires exploitables"],
            },
        ],

        plan14: [
            "Audit SEO/GBP + quick wins (catégories, zones, services, posts)",
            "Définition périmètre (rayon + communes) + règles anti-parasites",
            "1–3 pages locales prioritaires (ville + service/métier) + FAQ + schémas",
            "Tracking de base (clic-to-call + formulaire + UTM si Ads)",
        ],
        plan30: [
            "Extension à 5–10 pages money (selon capacité/agenda)",
            "Maillage interne : zone hub ↔ villes ↔ money pages ↔ prestations",
            "Renforcement preuve : mini cas anonymisé + objections + réassurance",
            "Optimisation continue (GSC + GBP insights) + itérations titres/FAQ/CTA",
        ],

        pitfalls: [
            "Copier/coller le même texte sur toutes les pages ville (risque “pages similaires”)",
            "GBP et pages non alignées (services/zones incohérents)",
            "Pas de preuve/CTA/FAQ → trafic qui ne convertit pas",
            "Périmètre trop large annoncé → leads hors secteur",
        ],

        objections: [
            {
                q: "J’ai déjà une fiche Google, ça suffit non ?",
                a: "Souvent la fiche seule plafonne : les pages locales + maillage + preuve augmentent la pertinence et la conversion, et stabilisent les requêtes.",
            },
            {
                q: "Je n’ai pas d’avis : est-ce bloquant ?",
                a: "Non. On compense par preuve alternative (process, livrables, cas anonymisé) + pages très ciblées + tracking.",
            },
            {
                q: "Je veux être visible “partout” en 60/95.",
                a: "Mieux vaut une zone maîtrisée : on démarre sur les communes cœur rentables, puis on étend selon ce qui convertit réellement.",
            },
        ],

        proofSnippets: [
            { label: "Appels (Maps + pages)", value: "+ régularité", note: "Objectif : stabilité, pas des pics." },
            { label: "Positions locales", value: "↑", note: "Amélioration sur requêtes “service + ville”." },
            { label: "Leads hors zone", value: "↓", note: "Via périmètre + qualif + FAQ." },
        ],

        faq: [
            {
                q: "Combien de temps avant de voir des résultats ?",
                a: "Quick wins possibles en 2–4 semaines (GBP + premières pages + tracking). Le SEO local se consolide ensuite sur 2–3 mois avec itérations.",
            },
            {
                q: "Faut-il créer une page par ville ?",
                a: "Uniquement sur les villes prioritaires. On privilégie la qualité (pages utiles) plutôt que la quantité (pages clones).",
            },
            {
                q: "Est-ce compatible avec Ads ?",
                a: "Oui : Ads accélère sur intentions rentables, SEO/Maps consolide et réduit la dépendance long terme.",
            },
        ],
    },

    "google-ads": {
        name: "Google Ads (Search)",
        badge: "Leads rapides",
        headline:
            "Captez des demandes à forte intention avec des campagnes Search orientées RDV (ciblage local, exclusions, landing dédiée, tracking).",
        prestationSlug: "google-ads",
        deliverables: [
            "Structure campagnes par intention (service / ville / urgence) + négatifs",
            "Annonces + RSA + extensions (appel, sitelinks, accroches)",
            "Ciblage géographique propre + exclusions (zones non rentables)",
            "Landing pages dédiées (preuve + FAQ + CTA + filtres) si nécessaire",
            "Tracking conversions (clic-to-call, formulaires, UTM) + pilotage coût/lead",
        ],
        kpis: ["Coût par lead", "Taux de conversion", "CTR", "Part d’impression", "Qualité lead"],

        positioning: {
            promise: "Remplir des créneaux vite, sans brûler le budget sur des demandes hors zone/hors besoin.",
            who: ["Créneaux à remplir", "Offres saisonnières", "Lancement d’un service", "Zones concurrentielles"],
            notFor: [
                "Ceux qui refusent de filtrer (et veulent “prendre tout le monde”)",
                "Ceux qui n’ont pas de capacité de réponse (appels non traités, délais flous)",
            ],
        },

        localAngles: {
            "sud-oise-60": {
                whyItWorks: [
                    "Ciblage hyper local : on capte l’intention “service + ville” sans se disperser.",
                    "On peut souvent trouver des poches rentables en communes cœur avec une structure propre + négatifs.",
                ],
                constraints: [
                    "Cadrer le rayon et les villes couvertes pour éviter les clics inutiles.",
                    "Synchroniser Ads avec la réalité terrain (créneaux, déplacements).",
                ],
                seasonality: [
                    "Périodes fortes selon métier (vacances, week-ends) : campagnes “boost” temporaires + messages adaptés.",
                ],
            },
            "val-doise-95": {
                whyItWorks: [
                    "Concurrence forte : l’avantage vient du filtrage + landing plus convaincante + extensions (appel/lieux).",
                    "Pilotage au coût/lead : on coupe vite ce qui apporte du bruit.",
                ],
                constraints: [
                    "CPC parfois plus élevé : il faut une landing dédiée par intention pour garder la rentabilité.",
                    "Circulation/stationnement : intégrer des créneaux et un message “prise de RDV” pour éviter les demandes irréalistes.",
                ],
                seasonality: [
                    "Sur pics (week-ends/vacances), ajuster budgets et annonces pour rester rentable.",
                ],
            },
        },

        useCases: [
            {
                title: "Remplir des créneaux creux (semaine)",
                situation:
                    "Agenda irrégulier : beaucoup de demandes certaines périodes, puis des creux. Besoin d’un levier rapide, mesurable.",
                approach: [
                    "Campagnes Search sur intentions rentables (service + ville) + négatifs",
                    "Extensions (appel + sitelinks) + annonces orientées qualification",
                    "Landing dédiée : preuve + FAQ + CTA + filtres (ville/besoin/délai)",
                    "Optimisation hebdo au coût/lead + qualité lead",
                ],
                expectedKpis: ["Coût/lead", "Appels", "Taux de conv. landing", "Taux de qualification"],
            },
            {
                title: "Réduire les leads parasites",
                situation:
                    "Leads hors zone / hors budget / hors prestation. Souvent dû à mots-clés trop larges et absence de négatifs.",
                approach: [
                    "Reprise des mots-clés : focus exact/phrase sur intentions fortes",
                    "Ajout d’une liste de négatifs + exclusions géographiques",
                    "Réécriture annonces : critères + périmètre + CTA",
                    "Tracking + tableau simple (source → lead) pour décider",
                ],
                expectedKpis: ["Qualité lead", "Taux de conv.", "CPL", "Part d’impr. utile"],
            },
        ],

        plan14: [
            "Audit du compte (ou création) + tracking minimum viable",
            "Recherche mots-clés + intentions + liste initiale de négatifs",
            "Structure campagnes (service/ville) + annonces + extensions",
            "Ciblage géo propre + exclusions (rayon / communes non rentables)",
        ],
        plan30: [
            "Optimisations hebdo (termes de recherche, annonces, enchères, qualité lead)",
            "Landing dédiée par intention (si besoin) + itérations CTA/FAQ/sections",
            "Segmentation : appels vs formulaires, horaires, devices",
            "Règles anti-parasites renforcées (négatifs + filtres + messages)",
        ],

        pitfalls: [
            "Mots-clés trop larges (broad) sans négatifs → budget gaspillé",
            "Une seule landing pour tout → conversion faible",
            "Ciblage géo approximatif → leads hors zone",
            "Pas de tracking appels/formulaires → pilotage à l’aveugle",
        ],

        objections: [
            {
                q: "Quel budget minimum ?",
                a: "On adapte au contexte, mais l’important est la structure : mieux vaut un budget modeste bien filtré qu’un gros budget qui attire du bruit.",
            },
            {
                q: "Vous garantissez un nombre de leads ?",
                a: "On garantit une exécution propre (tracking, structure, optimisation). Les volumes dépendent de la demande locale, concurrence, offre, budget et capacité de réponse.",
            },
            {
                q: "Faut-il une landing page dédiée ?",
                a: "Idéalement oui : “1 intention = 1 page”. Ça augmente conversion et qualité, surtout en zone concurrentielle.",
            },
        ],

        proofSnippets: [
            { label: "CPL", value: "↓", note: "Par filtrage + landing + négatifs." },
            { label: "CTR", value: "↑", note: "Annonces + extensions + message plus clair." },
            { label: "Qualité lead", value: "↑", note: "Formulaire qualifiant + exclusions." },
        ],

        faq: [
            {
                q: "Ads ou SEO : lequel d’abord ?",
                a: "Ads si besoin rapide (jours/semaines). SEO/Maps si besoin durable (semaines/mois). Le combo est souvent le plus rentable.",
            },
            {
                q: "Comment éviter les demandes hors zone ?",
                a: "Ciblage géo propre + exclusions + annonces qui cadrent + landing/formulaire qui filtre.",
            },
            {
                q: "Comment suivez-vous la performance ?",
                a: "Tracking appels/formulaires + UTM + dashboard simple (leads, CPL, conv., qualité).",
            },
        ],
    },

    "meta-ads": {
        name: "Meta Ads (Facebook/Instagram)",
        badge: "Demande qualifiée",
        headline:
            "Générez des demandes locales qualifiées avec des angles crédibles (preuve, réassurance) + formulaire filtrant + retargeting.",
        prestationSlug: "meta-ads",
        deliverables: [
            "Structure campagnes (prospection + retargeting) + audiences locales",
            "Angles & scripts créatifs (UGC-like, confiance, objections)",
            "Créatifs (hooks, variations, formats) + déclinaisons",
            "Formulaire qualifiant (ville, besoin, délai) + redirection /merci/",
            "Tracking Pixel + événements + pilotage coût/lead et qualité",
        ],
        kpis: ["Coût par lead", "Taux de qualification", "CTR", "Volume utile", "RDV pris"],

        positioning: {
            promise:
                "Créer de la demande qualifiée quand le volume de recherche est limité (ou quand la concurrence Search est forte).",
            who: [
                "Éducateurs / comportementalistes",
                "Toiletteurs (offres/périodes)",
                "Pensions (pics vacances)",
                "Pros sans avis (preuve alternative)",
            ],
            notFor: [
                "Les offres impossibles à cadrer (pas de périmètre, pas de critères)",
                "Ceux qui ne veulent pas filtrer (leads non exploitables)",
            ],
        },

        localAngles: {
            "sud-oise-60": {
                whyItWorks: [
                    "Très efficace sur des angles “problème → solution” (chiot, agressivité, anxiété, etc.).",
                    "Le formulaire qualifiant évite de perdre du temps sur des demandes floues.",
                ],
                constraints: [
                    "Cadrer la zone : ville + rayon, sinon les demandes partent trop loin.",
                    "Avoir un message simple + une preuve (process, livrables) pour convertir sans avis.",
                ],
                seasonality: [
                    "Pensions/pet-sitting : pics avant vacances. Toiletteurs : périodes mue/été (campagnes temporaires).",
                ],
            },
            "val-doise-95": {
                whyItWorks: [
                    "Permet de se différencier quand Search/Maps est saturé : preuve + message + retargeting.",
                    "On peut segmenter finement par besoin et monter la qualité (au lieu du volume).",
                ],
                constraints: [
                    "Marché plus dense : il faut des créatifs crédibles + une offre cadrée (sinon CPL monte).",
                    "Trafic froid = plus d’objections : intégrer réassurance et critères dès l’annonce/formulaire.",
                ],
                seasonality: [
                    "Concurrence publicitaire plus forte sur pics : prévoir variations créatives et budgets contrôlés.",
                ],
            },
        },

        useCases: [
            {
                title: "Générer des demandes sur une problématique précise",
                situation:
                    "Besoin de leads sur un sujet clair (rééducation, anxiété, toilettage chat, garde vacances…), pas juste “plus de clients”.",
                approach: [
                    "Angle unique (1 promesse) + preuve (déroulé/process) + CTA",
                    "Ciblage local + exclusions + segmentation par besoin",
                    "Formulaire qualifiant (ville/besoin/délai) + tri automatique",
                    "Retargeting visiteurs/engagés pour augmenter la conversion",
                ],
                expectedKpis: ["CPL", "Taux de qualification", "RDV pris", "CTR"],
            },
            {
                title: "Relancer des visiteurs (retargeting)",
                situation:
                    "Le site reçoit du trafic (SEO/Maps/Ads), mais peu de passage à l’action. Le retargeting “rattrape” les hésitants.",
                approach: [
                    "Audiences : visiteurs pages clés + engagés",
                    "Créatifs “objections” (prix/délais/pas d’avis) + réassurance",
                    "CTA vers diagnostic ou appel + tracking",
                ],
                expectedKpis: ["Conv. retargeting", "Coût/RDV", "Taux de réponse"],
            },
        ],

        plan14: [
            "Définition offre/angle (1 promesse) + critères de qualification",
            "Création des audiences locales + exclusions",
            "Mise en place formulaire qualifiant + tracking (Pixel/événements)",
            "Production 3–6 créatifs (variations hooks) + lancement",
        ],
        plan30: [
            "Itérations créatives (hooks, formats) + amélioration du CPL",
            "Segmentation par besoin (ad sets) + priorisation des meilleurs segments",
            "Retargeting structuré (visiteurs/engagés) + séquence d’objections",
            "Optimisation sur événements (qualif/RDV) plutôt que volume",
        ],

        pitfalls: [
            "Ciblage trop large → volume inutile",
            "Créatifs “catalogue” sans preuve ni objection → faible confiance",
            "Formulaire non qualifiant → leads ingérables",
            "Optimisation sur “leads” bruts au lieu de qualité/RDV",
        ],

        objections: [
            {
                q: "Meta Ads, ce n’est pas que du volume peu qualifié ?",
                a: "Ça dépend du filtrage. Avec une offre cadrée + formulaire qualifiant + retargeting, on augmente fortement la qualité.",
            },
            {
                q: "Formulaire Meta ou landing page ?",
                a: "Formulaire Meta = rapide. Landing = souvent plus rassurante. On choisit selon objectif, budget et niveau de preuve nécessaire.",
            },
            {
                q: "Et si je n’ai pas d’avis ?",
                a: "On compense : process clair, livrables, cas anonymisé, et une promesse cadrée (sans sur-promettre).",
            },
        ],

        proofSnippets: [
            { label: "Qualif", value: "↑", note: "Questions + exclusions + message clair." },
            { label: "CPL utile", value: "↓", note: "Segmentation + itérations créatives." },
            { label: "RDV", value: "↑", note: "Retargeting + objections traitées." },
        ],

        faq: [
            {
                q: "Est-ce adapté à tous les métiers animaliers ?",
                a: "Oui, surtout quand l’offre est claire. On adapte l’angle selon urgence, saisonnalité et concurrence locale.",
            },
            {
                q: "Combien de créatifs faut-il ?",
                a: "On démarre avec 3–6 variations, puis on itère sur ce qui apporte des leads qualifiés (pas juste des clics).",
            },
            {
                q: "Comment éviter les demandes hors zone ?",
                a: "Ciblage local + exclusions + question “ville” obligatoire + message clair sur le périmètre.",
            },
        ],
    },

    "landing-pages": {
        name: "Landing pages & conversion",
        badge: "Plus de RDV",
        headline:
            "Des pages qui convertissent : message clair, preuve, FAQ, filtres, CTA — prêtes pour SEO local et Ads (sans effet template).",
        prestationSlug: "landing-pages",
        deliverables: [
            "Audit message/offre + friction conversion (ce qui bloque)",
            "Structure landing (bénéfice → preuve → offre → FAQ → CTA)",
            "Copywriting orienté qualification (périmètre, critères, délais)",
            "Design léger + rapide (mobile-first) + sections réutilisables",
            "Plan de tests (CTA, hooks, formulaire) + tracking events",
        ],
        kpis: ["Taux de conversion", "Taux de clic CTA", "Qualité lead", "Temps de chargement"],

        positioning: {
            promise:
                "Transformer des clics (SEO/Ads/Maps) en demandes exploitables, en filtrant les demandes parasites.",
            who: [
                "Pros qui font Ads mais convertissent mal",
                "Offres packagées (service clair)",
                "Activités avec beaucoup d’objections (confiance)",
            ],
            notFor: [
                "Ceux qui veulent une “jolie page” sans tracking ni itérations",
                "Les offres sans critères (impossible de filtrer)",
            ],
        },

        localAngles: {
            "sud-oise-60": {
                whyItWorks: [
                    "Une landing claire + FAQ locale suffit souvent à faire décoller la conversion sur communes cœur.",
                    "Le filtre “ville/besoin/délai” réduit le bruit sans perdre les bons leads.",
                ],
                constraints: [
                    "Ne pas sur-promettre : cadrer le périmètre et les créneaux disponibles.",
                    "Vitesse mobile : indispensable (beaucoup de trafic sur téléphone).",
                ],
            },
            "val-doise-95": {
                whyItWorks: [
                    "Concurrence plus forte : preuve + réassurance + objections traitées = gain direct en conversion.",
                    "Landing dédiée par intention (service + ville) évite la cannibalisation et augmente la pertinence.",
                ],
                constraints: [
                    "Leads plus “comparatifs” : il faut différenciation + process + critères.",
                    "Circulation/stationnement : intégrer prise de RDV et créneaux pour éviter les demandes irréalistes.",
                ],
            },
        },

        useCases: [
            {
                title: "Améliorer le taux de conversion (sans augmenter le budget)",
                situation:
                    "Tu as déjà du trafic (SEO/Ads/Maps), mais peu de demandes. Souvent : message trop générique + manque de preuve + CTA timide.",
                approach: [
                    "Clarifier la promesse (1 phrase) + pour qui / pas pour",
                    "Ajouter preuve alternative (process, livrables, mini cas anonymisé)",
                    "FAQ objections (prix, délais, zone, avis) + CTA visible",
                    "Formulaire court mais qualifiant (ville, besoin, délai)",
                ],
                expectedKpis: ["Taux de conversion", "Clic-to-call", "Taux de qualification"],
            },
            {
                title: "Filtrer les demandes hors prestation",
                situation:
                    "Beaucoup de demandes “pas votre service” ou hors critères (race, gabarit, urgence…).",
                approach: [
                    "Sections “ce qui est inclus / non inclus”",
                    "FAQ + critères clairs + formulaire qualifiant",
                    "Messages dans CTA et hero (périmètre + délais)",
                ],
                expectedKpis: ["Qualité lead", "Temps gagné", "Taux de qualification"],
            },
        ],

        plan14: [
            "Audit page actuelle + analyse frictions (message, preuve, CTA, formulaire)",
            "Rewriting hero + sections clés (bénéfices, preuve, offre, FAQ)",
            "Formulaire qualifiant + tracking events (call + form)",
            "Optimisation performance (mobile-first, chargement)",
        ],
        plan30: [
            "A/B tests (hooks, CTA, ordre sections) + itérations data-driven",
            "Déclinaisons par intention (service + ville) si nécessaire",
            "Ajout de mini cas anonymisés et objections spécifiques métier",
            "Amélioration du maillage interne (prestations ↔ métiers ↔ zones)",
        ],

        pitfalls: [
            "Page trop générique (mêmes phrases partout) → faible conversion + risque pages similaires",
            "Pas de preuve (ni process) → confiance faible",
            "Formulaire trop long (ou pas qualifiant) → leads ingérables",
            "CTA discret / pas répété → perte de conversions",
        ],

        objections: [
            {
                q: "Je peux garder ma page actuelle et juste “mettre de la pub” ?",
                a: "Tu peux, mais tu paieras plus cher : Ads amplifie ce qui existe. Une landing dédiée augmente la conversion et la qualité des leads.",
            },
            {
                q: "Ça ne va pas faire doublon avec les pages SEO ?",
                a: "On évite la cannibalisation en respectant “1 intention = 1 page” et en structurant proprement (ville/service).",
            },
            {
                q: "Est-ce que ça marche sans avis ?",
                a: "Oui : preuve alternative (process, livrables, cas anonymisé) + transparence + objections traitées.",
            },
        ],

        proofSnippets: [
            { label: "Conv.", value: "↑", note: "Message + preuve + CTA + FAQ." },
            { label: "Qualité lead", value: "↑", note: "Formulaire filtrant + critères." },
            { label: "CPL", value: "↓", note: "Conversion ↑ = coût/lead ↓ à budget égal." },
        ],

        faq: [
            {
                q: "Combien de pages faut-il ?",
                a: "On démarre avec 1–2 pages sur intentions fortes, puis on décline si les données montrent un gain (par service/ville).",
            },
            {
                q: "Vous gérez aussi le tracking ?",
                a: "Oui : clic-to-call, formulaires, UTM, événements et dashboard simple.",
            },
            {
                q: "C’est compatible SEO local ?",
                a: "Oui, si on structure proprement l’arborescence et qu’on évite les pages clones.",
            },
        ],
    },

    tracking: {
        name: "Tracking & pilotage",
        badge: "Preuve par la donnée",
        headline:
            "Mesurer appels, formulaires et sources (SEO/Maps/Ads) pour optimiser vite et décider sans débat.",
        prestationSlug: "tracking",
        deliverables: [
            "Plan de tracking (UTM, événements, naming, objectifs)",
            "Implémentation GA4/Matomo + GTM (si pertinent) + pixels",
            "Suivi clic-to-call & formulaires (avec qualif)",
            "Dashboard (leads, coût/lead, conversion, sources) + lecture mensuelle",
            "Recommandations basées data (ce qui marche / ce qui bloque)",
        ],
        kpis: ["Attribution", "Leads suivis", "Coût par lead", "Taux de conv.", "Qualité lead"],

        positioning: {
            promise:
                "Savoir d’où vient chaque lead (SEO/Maps/Ads) et piloter au coût/lead — sans “feeling”.",
            who: [
                "Pros multi-canaux (SEO + Maps + Ads)",
                "Ceux qui veulent réduire le gaspillage",
                "Ceux qui veulent un reporting lisible",
            ],
            notFor: [
                "Ceux qui ne veulent pas installer d’outils (aucune donnée = aucune optimisation)",
            ],
        },

        localAngles: {
            "sud-oise-60": {
                whyItWorks: [
                    "Avec moins de volume, chaque lead compte : l’attribution évite de couper un canal rentable par erreur.",
                    "On peut prioriser vite les communes/intentions qui convertissent réellement.",
                ],
                constraints: [
                    "Respect RGPD : cookies/consent si nécessaire selon outils.",
                    "Standardiser les UTM et événements pour éviter le chaos.",
                ],
            },
            "val-doise-95": {
                whyItWorks: [
                    "En zone concurrentielle, le tracking aide à arbitrer vite (Search vs Maps vs Meta) et à tenir la rentabilité.",
                    "Permet d’identifier les “leads parasites” et de corriger ciblage/pages.",
                ],
                constraints: [
                    "Plus de sources/campagnes : naming et dashboard obligatoires.",
                    "Mesurer les appels est crucial (sinon sous-estimation de Maps/SEO).",
                ],
            },
        },

        useCases: [
            {
                title: "Prouver l’origine des RDV (et arrêter de débattre)",
                situation:
                    "“Ça vient d’où ?” Personne ne sait. Résultat : décisions au feeling, budgets coupés au mauvais endroit.",
                approach: [
                    "UTM standard + événements (call, form, diagnostic) + objectifs",
                    "Tableau simple par canal (SEO/Maps/Ads) + pages d’entrée",
                    "Lecture mensuelle : actions concrètes (couper/renforcer/itérer)",
                ],
                expectedKpis: ["Attribution", "CPL", "Taux de conv.", "Qualité lead"],
            },
            {
                title: "Réduire le gaspillage Ads",
                situation:
                    "Ads tournent, mais beaucoup de demandes inutiles. Sans tracking, impossible d’optimiser proprement.",
                approach: [
                    "Mesure appels + formulaires (avec qualif) + source",
                    "Optimisation sur qualité (pas volume) : exclusions/négatifs/landing",
                    "Dashboard + revue régulière",
                ],
                expectedKpis: ["CPL", "Qualité lead", "Taux de conv."],
            },
        ],

        plan14: [
            "Définir les objectifs business (appel, formulaire, RDV) + événements",
            "Mettre en place UTM + conventions naming",
            "Installer/valider GA4 ou Matomo + événements call/form",
            "Premier dashboard (sources → leads) + checklist de tests",
        ],
        plan30: [
            "Affiner attribution (segments, pages, horaires, devices)",
            "Ajout d’événements avancés si utile (prise RDV, click_directions, WhatsApp)",
            "Reporting mensuel + itérations : pages, Ads, GBP",
            "Documentation tracking (pour éviter les régressions)",
        ],

        pitfalls: [
            "UTM absents → sources “direct/unknown”",
            "Clic-to-call non mesuré → sous-estimation SEO/Maps",
            "Événements non standardisés → dashboard inutilisable",
            "Pas de tests réguliers → données fausses",
        ],

        objections: [
            {
                q: "Je ne veux pas d’usine à gaz.",
                a: "On fait simple : 4–6 événements clés + UTM propre + un dashboard lisible. L’objectif : décider vite, pas collectionner des métriques.",
            },
            {
                q: "GA4 ou Matomo ?",
                a: "Les deux marchent. GA4 est standard, Matomo est apprécié pour le contrôle des données. On choisit selon contraintes et préférences.",
            },
            {
                q: "Vous mesurez aussi les appels ?",
                a: "Oui : clic-to-call (et call tracking si nécessaire selon besoin).",
            },
        ],

        proofSnippets: [
            { label: "Sources", value: "claires", note: "SEO / Maps / Ads attribués." },
            { label: "Décisions", value: "data", note: "On coupe/renforce sur preuves." },
            { label: "Temps perdu", value: "↓", note: "Moins de leads non exploitables." },
        ],

        faq: [
            {
                q: "Qu’est-ce que vous installez concrètement ?",
                a: "UTM + événements (call/form) + objectifs + dashboard. Option : pixels et call tracking selon besoin.",
            },
            {
                q: "En combien de temps c’est en place ?",
                a: "Les bases peuvent être prêtes en quelques jours, puis on fiabilise et on enrichit selon les retours terrain.",
            },
            {
                q: "Ça sert même sans Ads ?",
                a: "Oui : ça prouve la valeur SEO/Maps et aide à prioriser les pages qui convertissent réellement.",
            },
        ],
    },
} as const satisfies Record<string, Service>;

export type ServiceKey = keyof typeof SERVICES;