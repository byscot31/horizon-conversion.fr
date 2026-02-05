import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJSON = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf-8"));

const site = readJSON("src/data/mapping/site.json");
const globals = readJSON("src/data/mapping/globals.json");
const pagesStatic = readJSON("src/data/mapping/pages.static.json"); // tableau "pages"
const rules = readJSON("src/data/mapping/rules.json");

const services = readJSON("src/data/services.json");
const villes = readJSON("src/data/villes.json");
const zones = readJSON("src/data/zones.json");

const articles = readJSON("src/data/mapping/articles.json"); // tableau "articles"

// helpers
const normalizeUrl = (u) => {
  if (!u) return "/";
  if (!u.startsWith("/")) u = `/${u}`;
  if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
  return u;
};

const serviceLabel = (slug) => {
  const s = services.find((x) => String(x.slug) === String(slug));
  return s?.nom || slug;
};

const villeBySlug = new Map(villes.map((v) => [String(v.slug), v]));
const zoneBySlug = new Map(zones.map((z) => [String(z.slug), z]));

// 1) computed.serviceLabels
const serviceLabels = Object.fromEntries(
  services.map((s) => [String(s.slug), String(s.nom || s.slug)])
);

// 2) computed.serviceVillePages (génération)
const serviceVillePages = [];
for (const s of services) {
  for (const v of villes) {
    // si tu veux filtrer le set de pages, fais-le ici (ex: uniquement villes dans zones couvertes)
    const svcSlug = String(s.slug);
    const vSlug = String(v.slug);

    // exemple : page service×ville
    serviceVillePages.push({
      id: `${svcSlug}-${vSlug}`,
      type: "serviceVille",
      url: normalizeUrl(`/${svcSlug}/${vSlug}`),
      service: svcSlug,
      ville: vSlug,
      zone: String(v.zone),
      h1: `${serviceLabel(svcSlug)} à ${v.nom} : plus d’appels et demandes`,
      metaTitle: `${serviceLabel(svcSlug)} ${v.nom} | appels & demandes qualifiés`,
      metaDescription: `À ${v.nom}, générez des appels qualifiés : ${serviceLabel(svcSlug)} + méthode 3C. Pilotage senior + exécution d’agence. Audit gratuit.`,
      // IMPORTANT : conserve tes faqRefs “par service” (pas besoin d’éditer 27 pages à la main)
      faqRefs:
        svcSlug === "seo-local"
          ? ["maps-not-visible", "competitors-ahead-maps", "reviews-how-many", "multi-communes-alentours", "kpi-tracking"]
          : svcSlug === "ads-google-meta"
          ? ["ads-min-budget", "ads-google-vs-meta", "ads-avoid-bad-leads", "ads-need-landing", "ads-call-tracking"]
          : ["cro-need-redesign", "cro-which-pages-first", "cro-proofs-what", "cro-measure-impact", "cro-iterations-per-month"],
      linksOut: [
        `/${svcSlug}`,
        `/zones/${String(v.zone)}`,
        `/zones/${String(v.zone)}/${vSlug}`,
        "/methode",
        "/tarifs",
        "/contact",
        "/ressources"
      ]
    });
  }
}

// 3) computed.zoneVillePages
const zoneVillePages = [];
for (const z of zones) {
  for (const vSlug of (z.villes || [])) {
    const v = villeBySlug.get(String(vSlug));
    if (!v) continue;
    zoneVillePages.push({
      id: `zone-${z.slug}-${v.slug}`,
      type: "zoneVille",
      url: normalizeUrl(`/zones/${z.slug}/${v.slug}`),
      zone: String(z.slug),
      ville: String(v.slug),
      h1: `${v.nom} : générer des demandes qualifiées (${z.nom})`,
      metaTitle: `${v.nom} (${z.nom}) | appels & demandes qualifiés`,
      metaDescription: `À ${v.nom} et alentours, Horizon Conversion aide à générer des demandes qualifiées : SEO local, Ads et CRO. Audit gratuit.`,
      faqRefs: ["which-service-start", "multi-communes-alentours", "filter-bad-leads", "monthly-deliverables", "audit-how"],
      linksOut: [
        `/zones/${z.slug}`,
        `/seo-local/${v.slug}`,
        `/ads-google-meta/${v.slug}`,
        `/optimisation-site-cro/${v.slug}`,
        "/contact",
        "/tarifs",
        "/methode"
      ]
    });
  }
}

// 4) computed.articles (depuis mapping/articles.json)
const computedArticles = (articles || []).map((a) => ({
  ...a,
  url: normalizeUrl(a.url)
}));

// 5) output final
const out = {
  site,
  globals,
  entities: {
    services: services.map((s) => ({ slug: s.slug, nom: s.nom })),
    zones: zones.map((z) => ({ slug: z.slug, nom: z.nom })),
    villes: villes.map((v) => ({
      slug: v.slug,
      nom: v.nom,
      codePostal: v.codePostal,
      zone: v.zone,
      alentours: v.alentours,
      angleLocal: v.angleLocal
    }))
  },
  pages: pagesStatic, // ton tableau pages “business/service/static/legal/etc.”
  rules,
  computed: {
    serviceLabels,
    serviceVillePages,
    zoneVillePages,
    articles: computedArticles
  }
};

const outPath = path.join(root, "src/data/seo-mapping.generated.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
console.log(`✅ Generated: ${outPath}`);