const SITE = "https://assurance.horizon-conversion.fr";

type Crumb = { label: string; href: string };

export function absUrl(pathOrUrl: string) {
  if (!pathOrUrl) return SITE + "/";
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  // normalise: si on reçoit "contact/" au lieu de "/contact/"
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE}${p}`;
}

/** Organization (global) */
export function organizationJsonLd(params?: {
  name?: string;
  url?: string;
  logoUrl?: string; // optionnel
  sameAs?: string[]; // optionnel
}) {
  const name = params?.name ?? "Horizon Conversion";
  const url = absUrl(params?.url ?? "/");
  const logoUrl = params?.logoUrl ? absUrl(params.logoUrl) : undefined;

  const obj: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#org`,
    name,
    url
  };

  if (logoUrl) obj.logo = logoUrl;
  if (params?.sameAs?.length) obj.sameAs = params.sameAs;

  return obj;
}

/** WebSite + SearchAction (optionnel) */
export function websiteJsonLd(params?: {
  name?: string;
  url?: string;
  enableSearchAction?: boolean;
  searchPath?: string; // ex: "/recherche/?q={search_term_string}"
}) {
  const name = params?.name ?? "Assurance - Horizon Conversion";
  const url = absUrl(params?.url ?? "/");
  const enable = params?.enableSearchAction ?? false;

  const obj: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    name,
    url,
    publisher: { "@id": `${url}#org` }
  };

  if (enable) {
    const searchPath = params?.searchPath ?? "/recherche/?q={search_term_string}";
    obj.potentialAction = {
      "@type": "SearchAction",
      target: absUrl(searchPath),
      "query-input": "required name=search_term_string"
    };
  }

  return obj;
}

/** BreadcrumbList (toutes pages) */
export function breadcrumbJsonLd(crumbs: Crumb[], pageCanonical: string) {
  const pageUrl = absUrl(pageCanonical);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.label,
      item: absUrl(c.href)
    }))
  };
}

export type FaqItem = { q: string; a: string };

// -------------------------
// Strict++ sanitizers (FAQ)
// -------------------------

type UrlMode = "keep" | "remove" | "label";

function stripHtml(input: unknown) {
  let s = typeof input === "string" ? input : String(input ?? "");

  // retire scripts/styles (au cas où)
  s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");

  // convertit quelques séparateurs HTML en espaces
  s = s.replace(/<br\s*\/?>/gi, " ");
  s = s.replace(/<\/(p|div|li|ul|ol|h\d)>/gi, " ");

  // retire toutes les balises restantes
  s = s.replace(/<[^>]+>/g, " ");

  // décodage minimal d'entités courantes
  s = s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

  return s;
}

function stripUrls(text: string, keepDomains: string[] = []) {
  // supprime les URLs brutes (http/https/www)
  const urlRegex = /\bhttps?:\/\/[^\s)]+|\bwww\.[^\s)]+/gi;
  return text.replace(urlRegex, (m) => {
    try {
      const url = m.startsWith("http") ? new URL(m) : new URL("https://" + m);
      if (keepDomains.some((d) => url.hostname.endsWith(d))) return m; // conserve
    } catch {
      // ignore parsing errors
    }
    return "";
  });
}

function extractAnchorText(html: string) {
  // remplace <a ...>LIBELLE</a> par "LIBELLE"
  // (avant stripHtml global)
  return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (_m, inner) => ` ${inner} `);
}

function stripEmails(text: string) {
  // supprime les emails
  return text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "");
}

function stripPhones(text: string) {
  // supprime les numéros FR courants (avec espaces/points/tirets)
  // Ex: 06 12 34 56 78 / +33 6 12 34 56 78 / 01.23.45.67.89
  const phoneRegex = /(\+33\s?|0)\s*[1-9](?:[\s.\-]*\d{2}){4}\b/g;
  return text.replace(phoneRegex, "");
}

function limitMarketingPunctuation(text: string) {
  let s = text;

  // "!!!" / "???" / "..." => on limite à 1 ou 3 pour les ellipses
  s = s.replace(/!{2,}/g, "!");
  s = s.replace(/\?{2,}/g, "?");
  s = s.replace(/\.{4,}/g, "...");

  // Mélanges type "!?!!??" => on simplifie
  s = s.replace(/([!?]){3,}/g, "$1");

  // Nettoyage espaces avant ponctuation
  s = s.replace(/\s+([!?.,;:])/g, "$1");

  // Re-normalise espaces
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

/**
 * Applique un mode URL strict :
 * - keep: ne touche pas
 * - label: remplace d'abord les <a>..</a> par leur libellé, puis supprime URLs brutes
 * - remove: supprime URLs brutes (et les restes d'ancres seront nettoyés par stripHtml)
 */
function applyUrlMode(raw: unknown, mode: UrlMode, keepDomains: string[] = []) {
  let s = typeof raw === "string" ? raw : String(raw ?? "");

  if (mode === "label") {
    s = extractAnchorText(s);
    s = stripUrls(s, keepDomains);
    return s;
  }

  if (mode === "remove") {
    s = stripUrls(s, keepDomains);
    return s;
  }

  return s; // keep
}

// ---- strict++ safe fallback

function looksTruncatedOrWeak(text: string) {
  const t = text.trim();

  if (t.length < 25) return true;

  // finit par une préposition / déterminant typique → phrase coupée
  const tailWeak = /(au|aux|a|à|de|des|du|d’|pour|par|sur|avec|chez|vers|en|et|ou|via)\s*$/i;
  if (tailWeak.test(t)) return true;

  // finit par ":", "-" (souvent un début de liste)
  if (/[:\-–—]\s*$/.test(t)) return true;

  const words = t.split(/\s+/).filter(Boolean);
  if (words.length < 6) return true;

  return false;
}

function applySafeFallback(text: string, fallback: string) {
  const t = text.trim();
  if (!t) return fallback;
  if (looksTruncatedOrWeak(t)) return fallback;
  return t;
}

function applyStrictPlus(
  raw: unknown,
  opts?: {
    urlMode?: UrlMode;
    keepDomains?: string[];
    stripEmails?: boolean;
    stripPhones?: boolean;
    limitPunctuation?: boolean;

    // safe fallback
    safeMode?: boolean;
    safeFallback?: string;
  }
) {
  const urlMode = opts?.urlMode ?? "keep";
  const keepDomains = opts?.keepDomains ?? [];

  let s = applyUrlMode(raw, urlMode, keepDomains);

  if (opts?.stripEmails) s = stripEmails(s);
  if (opts?.stripPhones) s = stripPhones(s);

  s = stripHtml(s)
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (opts?.limitPunctuation) s = limitMarketingPunctuation(s);

  if (opts?.safeMode) {
    const fallback = opts?.safeFallback ?? "Contactez-nous via le formulaire de contact.";
    s = applySafeFallback(s, fallback);
  }

  return s;
}

function normalizeText(
  input: unknown,
  opts?: {
    urlMode?: UrlMode;
    keepDomains?: string[];
    stripEmails?: boolean;
    stripPhones?: boolean;
    limitPunctuation?: boolean;

    safeMode?: boolean;
    safeFallback?: string;
  }
) {
  return applyStrictPlus(input, opts);
}

function truncate(s: string, maxLen: number) {
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > Math.floor(maxLen * 0.6) ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/**
 * Nettoie et sécurise une FAQ avant JSON-LD (strict++ + safe)
 * - strip HTML
 * - URL mode (label/remove/keep)
 * - remove emails / phones
 * - limit marketing punctuation
 * - fallback sur réponses tronquées
 * - filtre items vides
 * - limite longueur Q/A
 * - limite nombre d’items
 * - dédupe par question (case-insensitive)
 */
export function validateFaq(
  items: Array<Partial<FaqItem>> | undefined | null,
  opts?: {
    maxItems?: number;
    maxQ?: number;
    maxA?: number;
    minQ?: number;
    minA?: number;

    safeMode?: boolean;
    safeFallbackAnswer?: string;

    urlMode?: UrlMode;
    keepDomains?: string[];
    stripEmails?: boolean;
    stripPhones?: boolean;
    limitPunctuation?: boolean;
  }
): FaqItem[] {
  const maxItems = opts?.maxItems ?? 8;
  const maxQ = opts?.maxQ ?? 120;
  const maxA = opts?.maxA ?? 500;
  const minQ = opts?.minQ ?? 8;
  const minA = opts?.minA ?? 15;

  if (!items?.length) return [];

  const strictBase = {
    urlMode: opts?.urlMode ?? "label",
    keepDomains: opts?.keepDomains ?? ["horizon-conversion.fr"],
    stripEmails: opts?.stripEmails ?? true,
    stripPhones: opts?.stripPhones ?? true,
    limitPunctuation: opts?.limitPunctuation ?? true
  };

  const safeEnabled = opts?.safeMode ?? true;
  const safeFallback = opts?.safeFallbackAnswer ?? "Contactez-nous via le formulaire de contact.";

  const out: FaqItem[] = [];
  const seenQ = new Set<string>();

  for (const it of items) {
    const q0 = normalizeText(it?.q, { ...strictBase, safeMode: false });
    const a0 = normalizeText(it?.a, {
      ...strictBase,
      safeMode: safeEnabled,
      safeFallback
    });

    if (!q0 || !a0) continue;
    if (q0.length < minQ || a0.length < minA) continue;

    const q = truncate(q0, maxQ);
    const a = truncate(a0, maxA);

    const key = q.toLowerCase();
    if (seenQ.has(key)) continue;
    seenQ.add(key);

    out.push({ q, a });
    if (out.length >= maxItems) break;
  }

  return out;
}

/** FAQPage (JSON-LD) */
export function faqJsonLd(faq: Array<{ q: string; a: string }>, pageCanonical: string) {
  const pageUrl = absUrl(pageCanonical);

  const clean = validateFaq(faq, {
    maxItems: 8,
    maxQ: 120,
    maxA: 500,

    // STRICT++ :
    urlMode: "label",
    keepDomains: ["horizon-conversion.fr"],
    stripEmails: true,
    stripPhones: true,
    limitPunctuation: true,

    // STRICT++ SAFE:
    safeMode: true,
    safeFallbackAnswer: "Contactez-nous via le formulaire de contact."
  });

  if (!clean.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: clean.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a }
    }))
  };
}

/** Service (pages prestation + croisement) */
export function serviceJsonLd(params: {
  pageCanonical: string;
  name: string; // ex: "Google Ads"
  description?: string;
  providerOrgIdUrl?: string; // ex: "https://.../#org"
  serviceType?: string; // ex: "Local Lead Generation"
  areaServedText?: string; // ex: "Sud de l’Oise (60) & Nord du Val-d’Oise (95)"
}) {
  const pageUrl = absUrl(params.pageCanonical);
  const providerOrgIdUrl = params.providerOrgIdUrl ?? `${SITE}/#org`;

  const obj: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: params.name,
    url: pageUrl,
    provider: { "@id": providerOrgIdUrl },
    serviceType: params.serviceType ?? "Lead generation assurance (local)"
  };

  if (params.description) obj.description = params.description;
  if (params.areaServedText) {
    obj.areaServed = { "@type": "AdministrativeArea", name: params.areaServedText };
  }

  return obj;
}

/** Helper: assemble global + breadcrumb + optional service/faq */
export function buildJsonLd(params: {
  pageCanonical: string;
  breadcrumbs: Crumb[];
  includeWebsite?: boolean;
  includeSearchAction?: boolean;
  service?: { name: string; description?: string };
  faq?: Array<{ q: string; a: string }>;
}) {
  const pageCanonical = params.pageCanonical;

  const org = organizationJsonLd();
  const arr: any[] = [org];

  if (params.includeWebsite) {
    arr.push(websiteJsonLd({ enableSearchAction: !!params.includeSearchAction }));
  }

  arr.push(breadcrumbJsonLd(params.breadcrumbs, pageCanonical));

  if (params.service) {
    arr.push(
      serviceJsonLd({
        pageCanonical,
        name: params.service.name,
        description: params.service.description,
        areaServedText: "Sud de l’Oise (60) & Nord du Val-d’Oise (95)"
      })
    );
  }

  if (params.faq?.length) {
    const faqLd = faqJsonLd(params.faq, pageCanonical);
    if (faqLd) arr.push(faqLd);
  }

  return arr;
}