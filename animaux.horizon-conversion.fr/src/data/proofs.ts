// src/data/proofs.ts
export type ProofKpi = { label: string; before: string; after: string; note?: string };

export type ProofExample = {
  title: string;
  context: string;
  kpis: ProofKpi[];
  // Optionnel: tu peux poser des images dans /public/proofs/
  image?: { src: string; alt: string };
};

export const PROOF_EXAMPLES: ProofExample[] = [
  {
    title: "Exemple Ads (Search) — demandes parasites filtrées",
    context:
      "Structure campagnes + négatifs + landing dédiée. Objectif : moins de volume, plus de RDV utiles.",
    kpis: [
      { label: "CTR annonces", before: "2,1%", after: "4,6%", note: "annonces + extensions + pertinence" },
      { label: "Conv. landing", before: "3,2%", after: "7,8%", note: "preuve + CTA + formulaire qualifiant" },
      { label: "Appels / semaine", before: "4–6", after: "10–14", note: "suivi clic-to-call + numéros" },
    ],
    image: { src: "/proofs/proof-ads-anonyme.jpg", alt: "Exemple anonymisé — performances Ads" },
  },
  {
    title: "Exemple SEO local — pages “1 intention = 1 page”",
    context:
      "Création de pages ciblées (métier × ville × service) + FAQ + schémas + maillage interne.",
    kpis: [
      { label: "Clics organiques", before: "faibles", after: "progression continue", note: "effet cumulatif SEO" },
      { label: "Itinéraires (Maps)", before: "—", after: "+", note: "GBP + pages + cohérence NAP" },
      { label: "Leads qualifiés", before: "irréguliers", after: "stabilisés", note: "tracking + optimisations" },
    ],
    image: { src: "/proofs/proof-seo-anonyme.jpg", alt: "Exemple anonymisé — SEO local" },
  },
  {
    title: "Exemple conversion — formulaire qualifiant",
    context:
      "Ajout de champs (ville, délai, budget, objectif) + messages anti-hors-zone + relances.",
    kpis: [
      { label: "Taux de complétion", before: "—", after: "↑", note: "formulaire plus clair et plus court" },
      { label: "Leads hors zone", before: "fréquents", after: "rare", note: "filtrage + copy" },
      { label: "Temps de tri", before: "élevé", after: "réduit", note: "qualif stricte" },
    ],
    image: { src: "/proofs/proof-form-anonyme.jpg", alt: "Exemple anonymisé — formulaire qualifiant" },
  },
];

export const TRACKING_EVENTS = [
  { name: "click_to_call", detail: "clic sur téléphone (header, page, footer)" },
  { name: "form_submit", detail: "envoi formulaire contact (avec champs de qualif)" },
  { name: "cta_diagnostic", detail: "clic CTA “Demander un diagnostic”" },
  { name: "maps_route", detail: "clic itinéraire / Maps (si applicable)" },
  { name: "whatsapp_click", detail: "clic WhatsApp (si tu l’ajoutes)" },
];

export const LOCAL_PAGE_BLUEPRINT = {
  title: "Structure type d’une page locale (métier × ville)",
  sections: [
    "Hero : promesse claire + zone + CTA",
    "Problèmes fréquents (spécifiques au métier)",
    "Offre / Packs : Essentiel, Performance, Pack complet (liens tarifs)",
    "Preuves : mini cas anonymisé + KPIs",
    "Méthode : étapes (audit → implémentation → optimisation)",
    "FAQ spécifique (pas la même partout)",
    "CTA final + NAP",
  ],
  faq: [
    {
      q: "Intervenez-vous uniquement sur cette ville ?",
      a: "On définit une zone réaliste (villes proches, limites, rayon) pour éviter les demandes hors secteur.",
    },
    {
      q: "Ça marche si je n’ai pas beaucoup d’avis ?",
      a: "Oui : on compense par des preuves alternatives (process, livrables, tracking) et des pages locales utiles.",
    },
    {
      q: "Comment prouver l’origine des leads ?",
      a: "UTM + événements (clic-to-call, formulaires) + tableau de bord par source (SEO / Maps / Ads).",
    },
  ],
  jsonLdSnippet: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO local & Ads - Métier à Ville",
  "areaServed": ["Ville", "Sud Oise (60)", "Val d’Oise (95)"],
  "provider": {
    "@type": "Organization",
    "name": "Horizon Conversion Animaux",
    "url": "https://animaux.horizon-conversion.fr",
    "telephone": "+33660921008",
    "email": "contact@horizon-conversion.fr"
  }
}`,
};