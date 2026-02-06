// src/data/services.ts
export const SERVICES = {
  "seo-local": {
    name: "SEO local & Google Maps",
    badge: "Visibilité durable",
    headline:
      "Optimisation GBP + pages locales utiles pour capter des recherches “métier + ville” et générer appels / itinéraires / demandes.",
    deliverables: [
      "Audit SEO local + plan d’actions",
      "Optimisation Google Business Profile (catégories, services, zones, posts)",
      "Pages locales (FAQ + JSON-LD + CTA) + Titles/Metas",
      "Cohérence NAP & citations",
      "Suivi conversions (clic-to-call, formulaires)",
    ],
    kpis: ["Appels", "Formulaires", "Itinéraires", "Positions locales", "CTR Maps"],
    prestationSlug: "seo-local",
  },
  "google-ads": {
    name: "Google Ads (Search)",
    badge: "Leads rapides",
    headline:
      "Campagnes Search orientées RDV : intentions fortes, exclusions anti-parasites, extensions d’appel et landing pages dédiées.",
    deliverables: [
      "Structure campagnes par service / ville / intention",
      "Mots-clés + négatifs (anti leads parasites)",
      "Annonces + extensions (appel, lieu, sitelinks)",
      "Landing page conversion (si besoin)",
      "Pilotage au coût par lead",
    ],
    kpis: ["CPL", "Taux de conv.", "CTR", "Part d’impr.", "Appels"],
    prestationSlug: "google-ads",
  },
  "meta-ads": {
    name: "Meta Ads (Facebook/Instagram)",
    badge: "Demande qualifiée",
    headline:
      "Ciblage local + créas orientées confiance pour générer des demandes qualifiées (pas du volume inutile).",
    deliverables: [
      "Angles & créas (UGC-like) + hooks",
      "Ciblage local + exclusions",
      "Formulaire qualifiant (ville, besoin, urgence)",
      "Retargeting (visiteurs / engagés)",
      "Optimisation sur événements (tracking)",
    ],
    kpis: ["Leads qualifiés", "Coût / lead", "Taux de qualif.", "Clics", "Fréquence"],
    prestationSlug: "meta-ads",
  },
  "landing-pages": {
    name: "Landing pages & conversion",
    badge: "Plus de RDV",
    headline:
      "Pages conçues pour convertir : preuve, réassurance, CTA, FAQ, vitesse, et structure SEO propre.",
    deliverables: [
      "Copywriting bénéfices + objections",
      "Sections : preuve / offre / FAQ / CTA",
      "Design léger (Core Web Vitals)",
      "Optimisation mobile-first",
      "Tests (CTA, formulaires, messages)",
    ],
    kpis: ["Taux de conv.", "Clic-to-call", "Form submit", "Temps de chargement", "Taux de rebond"],
    prestationSlug: "landing-pages",
  },
  "tracking": {
    name: "Tracking & pilotage",
    badge: "Preuve par la donnée",
    headline:
      "Mesurer appels / formulaires / sources (SEO/Maps/Ads) pour décider vite et optimiser au lead.",
    deliverables: [
      "Plan de tracking (UTM + événements)",
      "GA4 / Matomo + Pixel (si besoin)",
      "Clic-to-call & formulaires tagués",
      "Dashboard leads / coûts / taux",
      "Recommandations mensuelles data-driven",
    ],
    kpis: ["Leads", "Source/medium", "CPL", "Taux de conv.", "Coût total"],
    prestationSlug: "tracking",
  },
} as const;

export type ServiceKey = keyof typeof SERVICES;