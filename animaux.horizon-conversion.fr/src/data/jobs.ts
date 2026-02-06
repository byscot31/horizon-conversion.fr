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
  },
} as const;

export type JobKey = keyof typeof JOBS;