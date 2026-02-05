// scripts/patch-seo-mapping.mjs
import fs from "node:fs";
import path from "node:path";

const INPUT = path.resolve("src/data/seo-mapping.json");
const OUTPUT = path.resolve("src/data/seo-mapping.json"); // in-place

const data = JSON.parse(fs.readFileSync(INPUT, "utf8"));

/** FAQ refs standards par type */
const FAQ_REFS = {
  home: ["time-to-results", "no-guarantee-positions", "interlocuteur-unique", "monthly-deliverables", "filter-bad-leads"],
  method: ["audit-how", "monthly-deliverables", "interlocuteur-unique", "kpi-tracking", "which-service-start"],
  pricing: ["which-service-start", "monthly-deliverables", "filter-bad-leads", "kpi-tracking", "audit-how"],
  proofs: ["interlocuteur-unique", "proofs-month-typical", "kpi-tracking", "proofs-access-accounts", "proofs-what-if-stagnates"],
  contact: ["contact-audit-duration", "contact-prepare", "contact-response-time", "contact-no-commitment", "contact-after-audit"],
  resourcesIndex: ["which-service-start", "filter-bad-leads", "maps-not-visible", "kpi-tracking", "cro-measure-impact"],

  zonesIndex: ["zones-only", "zones-multi-cities", "which-service-start", "audit-how", "monthly-deliverables"],
  zone: ["which-service-start", "thin-content-avoid", "ads-google-vs-meta", "filter-bad-leads", "kpi-tracking"],
  zoneVille: ["which-service-start", "multi-communes-alentours", "filter-bad-leads", "monthly-deliverables", "audit-how"],

  service_seo: ["time-to-results", "gbp-vs-site-first", "get-reviews-regularly", "multi-communes-alentours", "kpi-tracking"],
  service_ads: ["ads-min-budget", "ads-google-vs-meta", "ads-avoid-bad-leads", "ads-call-tracking", "ads-first-leads-when"],
  service_cro: ["cro-need-redesign", "cro-which-pages-first", "cro-iterations-per-month", "cro-measure-impact", "cro-compatible-site"],

  serviceVille_seo: ["maps-not-visible", "competitors-ahead-maps", "reviews-how-many", "multi-communes-alentours", "kpi-tracking"],
  serviceVille_ads: ["ads-min-budget", "ads-google-vs-meta", "ads-avoid-bad-leads", "ads-need-landing", "ads-call-tracking"],
  serviceVille_cro: ["cro-need-redesign", "cro-which-pages-first", "cro-proofs-what", "cro-measure-impact", "cro-iterations-per-month"]
};

/** hub -> leaf : pages locales “phares” + 1–2 ressources */
const HUB_LINKS = {
  "seo-local": [
    "/seo-local/chantilly",
    "/seo-local/senlis",
    "/seo-local/creil",
    "/seo-local/beaumont-sur-oise",
    "/seo-local/persan",
    "/seo-local/l-isle-adam",
    // ressources
    "/ressources/pourquoi-google-maps-ne-genere-pas-d-appels",
    "/ressources/plan-avis-google-process-simple"
  ],
  "ads-google-meta": [
    "/ads-google-meta/chantilly",
    "/ads-google-meta/creil",
    "/ads-google-meta/senlis",
    "/ads-google-meta/beaumont-sur-oise",
    "/ads-google-meta/persan",
    "/ads-google-meta/l-isle-adam",
    // ressources
    "/ressources/google-ads-local-filtrer-les-mauvais-leads",
    "/ressources/landing-page-locale-qui-convertit-checklist"
  ],
  "optimisation-site-cro": [
    "/optimisation-site-cro/chantilly",
    "/optimisation-site-cro/senlis",
    "/optimisation-site-cro/creil",
    "/optimisation-site-cro/pont-sainte-maxence",
    "/optimisation-site-cro/beaumont-sur-oise",
    "/optimisation-site-cro/persan",
    "/optimisation-site-cro/l-isle-adam",
    // ressources
    "/ressources/10-preuves-qui-augmentent-les-demandes",
    "/ressources/cro-mobile-local-3-changements-rapides"
  ]
};

function uniq(arr) {
  return [...new Set(arr)];
}

function replaceFaqByFaqRefs(obj, refs) {
  if (!obj || typeof obj !== "object") return;
  if ("faq" in obj) delete obj.faq;
  obj.faqRefs = refs;
}

function patchPagesArray(pages) {
  for (const p of pages) {
    if (!p || typeof p !== "object") continue;

    // business pages by id/url
    if (p.id === "home" || p.url === "/") replaceFaqByFaqRefs(p, FAQ_REFS.home);
    else if (p.id === "method" || p.url === "/methode") replaceFaqByFaqRefs(p, FAQ_REFS.method);
    else if (p.id === "pricing" || p.url === "/tarifs") replaceFaqByFaqRefs(p, FAQ_REFS.pricing);
    else if (p.id === "proofs" || p.url === "/preuves") replaceFaqByFaqRefs(p, FAQ_REFS.proofs);
    else if (p.id === "contact" || p.url === "/contact") replaceFaqByFaqRefs(p, FAQ_REFS.contact);
    else if (p.id === "resources-index" || p.type === "resourcesIndex") replaceFaqByFaqRefs(p, FAQ_REFS.resourcesIndex);

    // zones
    else if (p.type === "zoneIndex") replaceFaqByFaqRefs(p, FAQ_REFS.zonesIndex);
    else if (p.type === "zone") replaceFaqByFaqRefs(p, FAQ_REFS.zone);

    // services hubs
    else if (p.type === "service" && p.service === "seo-local") replaceFaqByFaqRefs(p, FAQ_REFS.service_seo);
    else if (p.type === "service" && p.service === "ads-google-meta") replaceFaqByFaqRefs(p, FAQ_REFS.service_ads);
    else if (p.type === "service" && p.service === "optimisation-site-cro") replaceFaqByFaqRefs(p, FAQ_REFS.service_cro);

    // legal pages: no faqRefs
    else if (p.type === "legal") {
      if ("faq" in p) delete p.faq;
      if ("faqRefs" in p) delete p.faqRefs;
    }

    // ✅ hub -> leaf + ressources
    if (p.type === "service" && p.service && HUB_LINKS[p.service]) {
      const baseLinks = Array.isArray(p.linksOut) ? p.linksOut : [];
      p.linksOut = uniq([...baseLinks, ...HUB_LINKS[p.service]]);
    }
  }
}

function patchComputed() {
  const c = data.computed || {};

  // serviceVille pages
  if (Array.isArray(c.serviceVillePages)) {
    for (const p of c.serviceVillePages) {
      if (!p || typeof p !== "object") continue;
      if (p.type !== "serviceVille") continue;

      if (p.service === "seo-local") replaceFaqByFaqRefs(p, FAQ_REFS.serviceVille_seo);
      else if (p.service === "ads-google-meta") replaceFaqByFaqRefs(p, FAQ_REFS.serviceVille_ads);
      else if (p.service === "optimisation-site-cro") replaceFaqByFaqRefs(p, FAQ_REFS.serviceVille_cro);
      else {
        if ("faq" in p) delete p.faq;
      }
    }
  }

  // zoneVille pages
  if (Array.isArray(c.zoneVillePages)) {
    for (const p of c.zoneVillePages) {
      if (!p || typeof p !== "object") continue;
      if (p.type !== "zoneVille") continue;
      replaceFaqByFaqRefs(p, FAQ_REFS.zoneVille);
    }
  }

  // articles: no faqRefs by default
  if (Array.isArray(c.articles)) {
    for (const a of c.articles) {
      if (!a || typeof a !== "object") continue;
      if ("faq" in a) delete a.faq;
      if ("faqRefs" in a) delete a.faqRefs;
    }
  }

  data.computed = c;
}

// Apply
if (Array.isArray(data.pages)) patchPagesArray(data.pages);
patchComputed();

// Write
fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2), "utf8");
console.log("✅ seo-mapping.json patché : faq -> faqRefs + hub->leaf + ressources dans linksOut");