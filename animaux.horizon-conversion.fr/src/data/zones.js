"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ZONES = {
    "sud-oise-60": {
        key: "sud-oise-60",
        name: "Sud Oise (60)",
        deptLabel: "Oise (60)",
        headline: "SEO local, Google Maps et Ads pour capter des demandes qualifiées dans le Sud de l’Oise.",
        towns: [
            "Chantilly",
            "Senlis",
            "Lamorlaye",
            "Gouvieux",
            "Creil",
            "Nogent-sur-Oise",
            "Pont-Sainte-Maxence",
            "Clermont",
            "Méru",
            "Liancourt",
        ],
        intentExamples: [
            "éducateur canin Chantilly",
            "toiletteur chien Senlis",
            "pension canine Lamorlaye",
            "ostéopathe animalier Gouvieux",
            "vétérinaire Creil",
        ]
    },
    "val-doise-95": {
        key: "val-doise-95",
        name: "Val d’Oise (95)",
        deptLabel: "Val d’Oise (95)",
        headline: "Acquisition locale et pages dédiées par intention pour générer appels, formulaires et RDV.",
        towns: [
            "Cergy",
            "Pontoise",
            "L’Isle-Adam",
            "Enghien-les-Bains",
            "Sannois",
            "Argenteuil",
            "Franconville",
            "Herblay-sur-Seine",
            "Saint-Ouen-l’Aumône",
            "Gonesse",
        ],
        intentExamples: [
            "éducateur canin Cergy",
            "toiletteur chien Argenteuil",
            "pension canine Pontoise",
            "comportementaliste chien Franconville",
            "ostéopathe animalier L’Isle-Adam",
        ]
    }
};
// ✅ Une “liste plate” de villes -> zone
exports.VILLES = Object.values(exports.ZONES).flatMap(function (z) {
    return z.towns.map(function (town) { return ({
        town: town,
        zoneKey: z.key
    }); });
});
// ✅ Helpers
function slugifyCity(input) {
    return input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
exports.slugifyCity = slugifyCity;
function findCityBySlug(slug) {
    var match = exports.VILLES.find(function (v) { return slugifyCity(v.town) === slug; });
    if (!match)
        return null;
    return __assign({}, match, { zone: exports.ZONES[match.zoneKey], slug: slug });
}
exports.findCityBySlug = findCityBySlug;
