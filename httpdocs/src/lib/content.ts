import type { ServiceKey } from "./types";
import { pickVariant } from "./seo";

export const seoTemplates: Record<ServiceKey, {
  title: (place: string) => string;
  description: (place: string) => string;
  h1: (placeShort: string) => string;
}> = {
  "google-ads": {
    title: (p) => `Consultant Google Ads ${p} | Leads locaux (60/95)`,
    description: (p) => `Google Ads à ${p} : tracking, structure, annonces, landing pages et optimisation pour générer des leads qualifiés.`,
    h1: (p) => `Consultant Google Ads à ${p} : plus de demandes qualifiées`
  },
  "seo-local": {
    title: (p) => `Consultant SEO local ${p} | Google Business & pages locales`,
    description: (p) => `SEO local à ${p} : Google Business Profile, avis, citations, pages locales et plan 30/60/90 jours.`,
    h1: (p) => `Consultant SEO local à ${p} : être trouvé au bon moment`
  },
  "meta-ads": {
    title: (p) => `Consultant Meta Ads ${p} | Facebook & Instagram`,
    description: (p) => `Meta Ads à ${p} : acquisition + retargeting, messages, créas, tracking et optimisation pour générer des demandes.`,
    h1: (p) => `Consultant Meta Ads à ${p} : acquisition + retargeting`
  },
  "cro": {
    title: (p) => `CRO ${p} | Landing pages qui convertissent`,
    description: (p) => `CRO à ${p} : landing pages, preuves, friction, tracking et tests pour augmenter le taux de conversion.`,
    h1: (p) => `Optimisation CRO à ${p} : plus de leads sans plus de trafic`
  }
};

const introPool = [
  (city: string) => `À ${city}, l’objectif n’est pas “du trafic”, mais des appels, formulaires et RDV qualifiés. On commence par le tracking, puis on optimise.`,
  (city: string) => `Pour générer des leads à ${city}, on combine visibilité locale, acquisition payante et pages qui convertissent.`,
  (city: string) => `Vous voulez plus de demandes entrantes à ${city} ? On capte l’intention (Google), on mesure, puis on scale.`
];

const bulletPool = [
  `Pilotage orienté KPI : leads, taux de conversion, coût par lead.`,
  `Approche “tracking avant scaling” pour éviter le gaspillage.`,
  `Plan 30/60/90 jours + quick wins dès la première semaine.`,
  `Optimisation continue : messages, ciblages, pages, suivi des termes.`,
  `Système réplicable par ville/service, sans bricolage.`
];

export function buildCityBlocks(args: {
  cityName: string;
  deptName: string;
  serviceKey: ServiceKey;
  nearNames: string[];
}) {
  const seed = `${args.serviceKey}:${args.cityName}`;

  const intro = pickVariant(introPool, seed)(args.cityName);

  // 3 bullets stables et “différentes”
  const bullets = [
    pickVariant(bulletPool, seed + ":1"),
    pickVariant(bulletPool, seed + ":2"),
    pickVariant(bulletPool, seed + ":3")
  ];

  const nearLine = args.nearNames.length
    ? `Zones proches : ${args.nearNames.join(", ")}.`
    : "";

  const faq = [
    {
      q: "Combien de temps pour voir des résultats ?",
      a: "Ads : souvent en quelques jours/semaines. SEO local : progressif sur plusieurs semaines/mois."
    },
    {
      q: "Quel budget minimum ?",
      a: "On fixe un budget test viable selon concurrence, zone et objectif (au diagnostic)."
    },
    {
      q: "Comment mesure-t-on les leads ?",
      a: "Conversions (appels/formulaires/RDV), UTMs et tableau de bord KPI."
    }
  ];

  return { intro, bullets, nearLine, faq };
}