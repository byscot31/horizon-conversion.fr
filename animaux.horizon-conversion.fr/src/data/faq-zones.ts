// src/data/faq-zones.ts
import type { ZoneKey } from "./zones.ts";

export type FaqItem = { q: string; a: string };

// ✅ Déjà utilisé pour /zones/[ville] (si tu l’as déjà, garde-le)
export function getZoneFaq(zoneKey: ZoneKey, town: string, zoneName: string): FaqItem[] {
  const base: FaqItem[] = [
    {
      q: `Travaillez-vous uniquement sur ${town} ?`,
      a: `Non. On définit une zone réaliste autour de ${town} (villes proches, rayon, limites) pour capter les demandes utiles et éviter les leads hors secteur. Zone : ${zoneName}.`,
    },
  ];

  const sudOise60: FaqItem[] = [
    {
      q: `Déplacements autour de ${town} : rayon / contraintes ?`,
      a: `Dans le Sud Oise, on rencontre souvent des déplacements “inter-communes”. On structure pages + Maps/Ads autour d’un rayon cohérent et de villes proches, pour rester rentable et limiter les demandes trop éloignées.`,
    },
    {
      q: `Parking / accès : est-ce un sujet à ${town} ?`,
      a: `Ça dépend des centres-villes. On ajoute des infos d’accès (repères, secteurs servis) et des CTA adaptés (appel, itinéraire) pour fluidifier la prise de RDV.`,
    },
    {
      q: `Saisonnalité : quels pics en Sud Oise ?`,
      a: `Pics fréquents : vacances/ponts (pensions, garde) et reprises (éducation/soins). On anticipe via SEO (pages + contenu) et “boost” Ads sur semaines clés.`,
    },
  ];

  const valDoise95: FaqItem[] = [
    {
      q: `Circulation dans le 95 : impact sur les demandes autour de ${town} ?`,
      a: `Oui. Densité + heures de pointe influencent la zone réelle de déplacement. On priorise des secteurs cohérents et on évite d’élargir trop la couverture pour garder des leads qualifiés.`,
    },
    {
      q: `Parking / accès à ${town} : faut-il le traiter ?`,
      a: `Souvent oui (centres-villes plus denses). On ajoute réassurance (accès, secteurs) + CTA rapides (clic-to-call / formulaire court).`,
    },
    {
      q: `Saisonnalité dans le Val d’Oise : quand pousser les Ads ?`,
      a: `Le 95 peut être très concurrentiel : on planifie des boosts Ads sur périodes à forte intention (saisons, urgences, créneaux à remplir) et on renforce le SEO local pour stabiliser.`,
    },
  ];

  const byZone: Record<string, FaqItem[]> = {
    "sud-oise-60": sudOise60,
    "val-doise-95": valDoise95,
  };

  return [...(byZone[zoneKey] ?? []), ...base];
}

// ✅ NOUVEAU : FAQ “hub zone” (sans ville) — 0 duplication dans les pages zone
export function getZoneHubFaq(zoneKey: ZoneKey, zoneName: string): FaqItem[] {
  const common: FaqItem[] = [
    {
      q: "Pourquoi les pages “métier × ville” sont-elles clés ?",
      a: "Parce qu’elles matchent exactement l’intention (“toiletteur chien Argenteuil”). Google comprend mieux le sujet, et l’utilisateur convertit plus vite (CTA, FAQ spécifique, preuves).",
    },
    {
      q: "Quand activer les Ads ?",
      a: "Quand il faut des leads rapides, quand la concurrence est forte, ou pour lisser la saisonnalité. On pilote au coût par lead avec un tracking propre (appels + formulaires).",
    },
  ];

  const sudOise60: FaqItem[] = [
    {
      q: `Quel rayon d’intervention pour ${zoneName} ?`,
      a: "Souvent un rayon un peu plus large est possible (zone moins dense). On ajuste selon tes déplacements réels et ton agenda, pour éviter les demandes hors secteur.",
    },
    {
      q: `Saisonnalité en ${zoneName} : quels pics ?`,
      a: "Pics fréquents : vacances/ponts (pensions, garde) + reprises (éducation/soins). On prépare des pages et on déclenche des boosts Ads sur les semaines clés.",
    },
    {
      q: `Parking / accès : est-ce un sujet ?`,
      a: "Selon les centres-villes. On ajoute repères d’accès, secteurs couverts, et des CTA simples (appel/itinéraire) pour fluidifier la prise de RDV.",
    },
  ];

  const valDoise95: FaqItem[] = [
    {
      q: `Quel rayon d’intervention pour ${zoneName} ?`,
      a: "Zone plus dense et concurrentielle : un rayon plus serré (≈ 15–25 km) performe souvent mieux. On ajuste selon la réalité terrain et ta capacité.",
    },
    {
      q: `Circulation / stationnement dans le 95 : comment on s’adapte ?`,
      a: "On priorise des secteurs cohérents (villes proches, axes), on évite la couverture trop large, et on renforce les CTA rapides (clic-to-call, formulaire court) pour limiter la friction.",
    },
    {
      q: `Saisonnalité dans le 95 : comment lisser les creux ?`,
      a: "SEO local pour stabiliser (pages + GBP), et Ads “booster” sur les périodes à intention forte / créneaux à remplir, avec exclusions + qualification pour éviter les leads parasites.",
    },
  ];

  const byZone: Record<string, FaqItem[]> = {
    "sud-oise-60": sudOise60,
    "val-doise-95": valDoise95,
  };

  return [...(byZone[zoneKey] ?? []), ...common];
}