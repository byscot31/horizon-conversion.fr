// src/lib/validate.ts
import mapping from "../data/seo-mapping.generated.json";
import services from "../data/services.json";
import villes from "../data/villes.json";
import zones from "../data/zones.json";
import faqBank from "../data/faq-bank.json";

type Issue = {
  level: "error" | "warn";
  code: string;
  message: string;
  at?: string;
};

function isNonEmptyString(s: any): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

function normalizeUrl(u: string): string {
  if (!u) return "/";
  if (!u.startsWith("/")) u = `/${u}`;
  if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
  return u;
}

function pushIssue(
  issues: Issue[],
  level: Issue["level"],
  code: string,
  message: string,
  at?: string
) {
  issues.push({ level, code, message, at });
}

function getFaqIdSet(): Set<string> {
  const items = Array.isArray((faqBank as any)?.items) ? (faqBank as any).items : [];
  const ids = new Set<string>();
  for (const it of items) {
    if (isNonEmptyString(it?.id)) ids.add(String(it.id).trim());
  }
  return ids;
}

function validateMetaFields(page: any, at: string, issues: Issue[]) {
  if (!isNonEmptyString(page?.metaTitle))
    pushIssue(issues, "error", "META_TITLE_MISSING", "metaTitle manquant", at);
  if (!isNonEmptyString(page?.metaDescription))
    pushIssue(issues, "error", "META_DESC_MISSING", "metaDescription manquante", at);
  if (!isNonEmptyString(page?.h1)) pushIssue(issues, "error", "H1_MISSING", "h1 manquant", at);
}

function validateFaqRefs(page: any, at: string, issues: Issue[], faqIds: Set<string>) {
  if (!page || typeof page !== "object") return;
  if (!Array.isArray(page.faqRefs)) return;

  const seen = new Set<string>();

  for (const ref of page.faqRefs) {
    const id = isNonEmptyString(ref) ? String(ref).trim() : "";

    if (!id) {
      pushIssue(issues, "error", "FAQREF_INVALID", "faqRefs contient une valeur vide", at);
      continue;
    }

    if (seen.has(id)) {
      pushIssue(issues, "error", "FAQREF_DUPLICATE", `faqRefs dupliquée: "${id}"`, at);
      continue;
    }
    seen.add(id);

    if (!faqIds.has(id)) {
      pushIssue(
        issues,
        "error",
        "FAQREF_UNKNOWN",
        `faqRef inconnue: "${id}" (absente de src/data/faq-bank.json)`,
        at
      );
    }
  }
}

function isSkippableHref(href: string): boolean {
  const h = href.trim();
  return (
    h.startsWith("http://") ||
    h.startsWith("https://") ||
    h.startsWith("mailto:") ||
    h.startsWith("tel:") ||
    h.startsWith("#")
  );
}

function validateLinksOutFormat(page: any, at: string, issues: Issue[]) {
  if (!page || typeof page !== "object") return;
  if (!Array.isArray(page.linksOut)) return;

  for (const hrefRaw of page.linksOut) {
    if (!isNonEmptyString(hrefRaw)) {
      pushIssue(issues, "warn", "LINKSOUT_EMPTY", "linksOut contient un lien vide", at);
      continue;
    }

    const href = String(hrefRaw).trim();
    if (isSkippableHref(href)) continue;

    if (!href.startsWith("/")) {
      pushIssue(issues, "warn", "LINKSOUT_NOT_RELATIVE", `linksOut doit être une URL relative: "${href}"`, at);
    }

    // trailingSlash: never — on tolère "/" uniquement pour la home
    if (href.length > 1 && href.endsWith("/")) {
      pushIssue(
        issues,
        "warn",
        "LINKSOUT_TRAILING_SLASH",
        `linksOut ne doit pas finir par "/": "${href}"`,
        at
      );
    }
  }
}

function buildAllKnownUrlSet(): Set<string> {
  const set = new Set<string>();

  const add = (url: any) => {
    if (!isNonEmptyString(url)) return;
    set.add(normalizeUrl(String(url)));
  };

  const pages = Array.isArray((mapping as any).pages) ? (mapping as any).pages : [];
  for (const p of pages) add(p?.url);

  const c = (mapping as any).computed || {};
  const sv = Array.isArray(c.serviceVillePages) ? c.serviceVillePages : [];
  for (const p of sv) add(p?.url);

  const zv = Array.isArray(c.zoneVillePages) ? c.zoneVillePages : [];
  for (const p of zv) add(p?.url);

  const arts = Array.isArray(c.articles) ? c.articles : [];
  for (const a of arts) add(a?.url);

  return set;
}

function validateLinksOutTargets(page: any, at: string, issues: Issue[], knownUrls: Set<string>) {
  if (!page || typeof page !== "object") return;
  if (!Array.isArray(page.linksOut)) return;

  for (const hrefRaw of page.linksOut) {
    if (!isNonEmptyString(hrefRaw)) continue;

    const href = String(hrefRaw).trim();
    if (isSkippableHref(href)) continue;

    const target = normalizeUrl(href);

    // "/" est toujours OK
    if (target === "/") continue;

    if (!knownUrls.has(target)) {
      pushIssue(
        issues,
        "error",
        "LINKSOUT_TARGET_UNKNOWN",
        `linksOut pointe vers une URL inconnue/non générée: "${target}"`,
        at
      );
    }
  }
}

function validateSlugCoherence(issues: Issue[]) {
  const svcSlugs = new Set((services as any[]).map((s) => String(s.slug)));
  const villeSlugs = new Set((villes as any[]).map((v) => String(v.slug)));
  const zoneSlugs = new Set((zones as any[]).map((z) => String(z.slug)));

  // zones -> villes
  for (const z of zones as any[]) {
    const at = `zones[${z.slug}]`;
    const zVilles = Array.isArray(z.villes) ? z.villes : [];
    for (const vSlug of zVilles) {
      if (!villeSlugs.has(String(vSlug))) {
        pushIssue(issues, "error", "ZONE_VILLE_UNKNOWN", `zone référence une ville inconnue: "${vSlug}"`, at);
      }
    }
  }

  // villes -> zone
  for (const v of villes as any[]) {
    const at = `villes[${v.slug}]`;
    if (!zoneSlugs.has(String(v.zone))) {
      pushIssue(issues, "error", "VILLE_ZONE_UNKNOWN", `ville référence une zone inconnue: "${v.zone}"`, at);
    }
  }

  // mapping rules expected slugs (si présents)
  const rules = (mapping as any)?.rules?.slugRules;
  if (rules) {
    const expectedServices = Array.isArray(rules.services) ? rules.services : [];
    for (const s of expectedServices) {
      if (!svcSlugs.has(String(s))) {
        pushIssue(
          issues,
          "warn",
          "RULE_SERVICE_SLUG_MISSING",
          `rules.services contient un slug absent de services.json: "${s}"`
        );
      }
    }
    const expectedZones = Array.isArray(rules.zones) ? rules.zones : [];
    for (const z of expectedZones) {
      if (!zoneSlugs.has(String(z))) {
        pushIssue(
          issues,
          "warn",
          "RULE_ZONE_SLUG_MISSING",
          `rules.zones contient un slug absent de zones.json: "${z}"`
        );
      }
    }
  }
}

function validateMappingUrlsUnique(issues: Issue[]) {
  const urls = new Map<string, string>(); // url -> at
  const add = (url: string, at: string) => {
    const u = normalizeUrl(url);
    if (urls.has(u)) {
      pushIssue(issues, "error", "DUPLICATE_URL", `URL dupliquée "${u}" (déjà vue à ${urls.get(u)})`, at);
      return;
    }
    urls.set(u, at);
  };

  const pages = Array.isArray((mapping as any).pages) ? (mapping as any).pages : [];
  for (let i = 0; i < pages.length; i++) add(pages[i]?.url || "", `pages[${i}]`);

  const c = (mapping as any).computed || {};
  const sv = Array.isArray(c.serviceVillePages) ? c.serviceVillePages : [];
  for (let i = 0; i < sv.length; i++) add(sv[i]?.url || "", `computed.serviceVillePages[${i}]`);

  const zv = Array.isArray(c.zoneVillePages) ? c.zoneVillePages : [];
  for (let i = 0; i < zv.length; i++) add(zv[i]?.url || "", `computed.zoneVillePages[${i}]`);

  const arts = Array.isArray(c.articles) ? c.articles : [];
  for (let i = 0; i < arts.length; i++) add(arts[i]?.url || "", `computed.articles[${i}]`);
}

export function runValidation() {
  const issues: Issue[] = [];
  const faqIds = getFaqIdSet();

  // 1) Cohérence slugs zones/villes/services
  validateSlugCoherence(issues);

  // 2) Unicité URLs
  validateMappingUrlsUnique(issues);

  // ✅ 3) Build URL set pour valider le maillage
  const knownUrls = buildAllKnownUrlSet();

  // 4) Pages : meta + faqRefs + linksOut
  const pages = Array.isArray((mapping as any).pages) ? (mapping as any).pages : [];
  pages.forEach((p, i) => {
    const at = `pages[${i}](${p?.id || p?.url || "?"})`;
    validateMetaFields(p, at, issues);
    validateFaqRefs(p, at, issues, faqIds);
    validateLinksOutFormat(p, at, issues);
    validateLinksOutTargets(p, at, issues, knownUrls);
  });

  // 5) computed pages
  const c = (mapping as any).computed || {};
  const sv = Array.isArray(c.serviceVillePages) ? c.serviceVillePages : [];
  sv.forEach((p, i) => {
    const at = `computed.serviceVillePages[${i}](${p?.id || p?.url || "?"})`;
    validateMetaFields(p, at, issues);
    validateFaqRefs(p, at, issues, faqIds);
    validateLinksOutFormat(p, at, issues);
    validateLinksOutTargets(p, at, issues, knownUrls);
  });

  const zv = Array.isArray(c.zoneVillePages) ? c.zoneVillePages : [];
  zv.forEach((p, i) => {
    const at = `computed.zoneVillePages[${i}](${p?.id || p?.url || "?"})`;
    validateMetaFields(p, at, issues);
    validateFaqRefs(p, at, issues, faqIds);
    validateLinksOutFormat(p, at, issues);
    validateLinksOutTargets(p, at, issues, knownUrls);
  });

  // articles : meta ok, pas de faqRefs
  const arts = Array.isArray(c.articles) ? c.articles : [];
  arts.forEach((a, i) => {
    const at = `computed.articles[${i}](${a?.id || a?.url || "?"})`;
    validateMetaFields(a, at, issues);
    validateLinksOutFormat(a, at, issues);
    validateLinksOutTargets(a, at, issues, knownUrls);
  });

  const errors = issues.filter((x) => x.level === "error");
  const warnings = issues.filter((x) => x.level === "warn");

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    stats: { errors: errors.length, warnings: warnings.length, faqIds: faqIds.size, knownUrls: knownUrls.size }
  };
}