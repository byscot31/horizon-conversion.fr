"use strict";
exports.__esModule = true;
{
    ZoneKey;
}
from;
"./zones.ts";
// ✅ Déjà utilisé pour /zones/[ville] (si tu l’as déjà, garde-le)
function getZoneFaq(zoneKey, town, zoneName) {
    var base = [
        {
            q: "Travaillez-vous uniquement sur " + town + " ?",
            a: "Non. On d\u00E9finit une zone r\u00E9aliste autour de " + town + " (villes proches, rayon, limites) pour capter les demandes utiles et \u00E9viter les leads hors secteur. Zone : " + zoneName + "."
        },
    ];
    var sudOise60 = [
        {
            q: "D\u00E9placements autour de " + town + " : rayon / contraintes ?",
            a: "Dans le Sud Oise, on rencontre souvent des d\u00E9placements \u201Cinter-communes\u201D. On structure pages + Maps/Ads autour d\u2019un rayon coh\u00E9rent et de villes proches, pour rester rentable et limiter les demandes trop \u00E9loign\u00E9es."
        },
        {
            q: "Parking / acc\u00E8s : est-ce un sujet \u00E0 " + town + " ?",
            a: "\u00C7a d\u00E9pend des centres-villes. On ajoute des infos d\u2019acc\u00E8s (rep\u00E8res, secteurs servis) et des CTA adapt\u00E9s (appel, itin\u00E9raire) pour fluidifier la prise de RDV."
        },
        {
            q: "Saisonnalit\u00E9 : quels pics en Sud Oise ?",
            a: "Pics fr\u00E9quents : vacances/ponts (pensions, garde) et reprises (\u00E9ducation/soins). On anticipe via SEO (pages + contenu) et \u201Cboost\u201D Ads sur semaines cl\u00E9s."
        },
    ];
    var valDoise95 = [
        {
            q: "Circulation dans le 95 : impact sur les demandes autour de " + town + " ?",
            a: "Oui. Densit\u00E9 + heures de pointe influencent la zone r\u00E9elle de d\u00E9placement. On priorise des secteurs coh\u00E9rents et on \u00E9vite d\u2019\u00E9largir trop la couverture pour garder des leads qualifi\u00E9s."
        },
        {
            q: "Parking / acc\u00E8s \u00E0 " + town + " : faut-il le traiter ?",
            a: "Souvent oui (centres-villes plus denses). On ajoute r\u00E9assurance (acc\u00E8s, secteurs) + CTA rapides (clic-to-call / formulaire court)."
        },
        {
            q: "Saisonnalit\u00E9 dans le Val d\u2019Oise : quand pousser les Ads ?",
            a: "Le 95 peut \u00EAtre tr\u00E8s concurrentiel : on planifie des boosts Ads sur p\u00E9riodes \u00E0 forte intention (saisons, urgences, cr\u00E9neaux \u00E0 remplir) et on renforce le SEO local pour stabiliser."
        },
    ];
    var byZone = {
        "sud-oise-60": sudOise60,
        "val-doise-95": valDoise95
    };
    return (byZone[zoneKey] ?  ? [] :  : ).concat(base);
}
exports.getZoneFaq = getZoneFaq;
// ✅ NOUVEAU : FAQ “hub zone” (sans ville) — 0 duplication dans les pages zone
function getZoneHubFaq(zoneKey, zoneName) {
    var common = [
        {
            q: "Pourquoi les pages “métier × ville” sont-elles clés ?",
            a: "Parce qu’elles matchent exactement l’intention (“toiletteur chien Argenteuil”). Google comprend mieux le sujet, et l’utilisateur convertit plus vite (CTA, FAQ spécifique, preuves)."
        },
        {
            q: "Quand activer les Ads ?",
            a: "Quand il faut des leads rapides, quand la concurrence est forte, ou pour lisser la saisonnalité. On pilote au coût par lead avec un tracking propre (appels + formulaires)."
        },
    ];
    var sudOise60 = [
        {
            q: "Quel rayon d\u2019intervention pour " + zoneName + " ?",
            a: "Souvent un rayon un peu plus large est possible (zone moins dense). On ajuste selon tes déplacements réels et ton agenda, pour éviter les demandes hors secteur."
        },
        {
            q: "Saisonnalit\u00E9 en " + zoneName + " : quels pics ?",
            a: "Pics fréquents : vacances/ponts (pensions, garde) + reprises (éducation/soins). On prépare des pages et on déclenche des boosts Ads sur les semaines clés."
        },
        {
            q: "Parking / acc\u00E8s : est-ce un sujet ?",
            a: "Selon les centres-villes. On ajoute repères d’accès, secteurs couverts, et des CTA simples (appel/itinéraire) pour fluidifier la prise de RDV."
        },
    ];
    var valDoise95 = [
        {
            q: "Quel rayon d\u2019intervention pour " + zoneName + " ?",
            a: "Zone plus dense et concurrentielle : un rayon plus serré (≈ 15–25 km) performe souvent mieux. On ajuste selon la réalité terrain et ta capacité."
        },
        {
            q: "Circulation / stationnement dans le 95 : comment on s\u2019adapte ?",
            a: "On priorise des secteurs cohérents (villes proches, axes), on évite la couverture trop large, et on renforce les CTA rapides (clic-to-call, formulaire court) pour limiter la friction."
        },
        {
            q: "Saisonnalit\u00E9 dans le 95 : comment lisser les creux ?",
            a: "SEO local pour stabiliser (pages + GBP), et Ads “booster” sur les périodes à intention forte / créneaux à remplir, avec exclusions + qualification pour éviter les leads parasites."
        },
    ];
    var byZone = {
        "sud-oise-60": sudOise60,
        "val-doise-95": valDoise95
    };
    return (byZone[zoneKey] ?  ? [] :  : ).concat(common);
}
exports.getZoneHubFaq = getZoneHubFaq;
