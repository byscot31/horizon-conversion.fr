// src/lib/mapping.ts
import mapping from "../data/seo-mapping.generated.json";
import services from "../data/services.json";
import faqData from "../data/faq.json";
import faqBank from "../data/faq-bank.json";

type AnyObj = Record<string, any>;
export type FaqItem = { q: string; a: string };
export type LinkOut = { href: string; label: string };

function normalizeUrl(u: string): string {
    if (!u) return "/";
    if (!u.startsWith("/")) u = `/${u}`;
    if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
    return u;
}

export function getMapping(): AnyObj {
    return mapping as AnyObj;
}

export function safeText(v: any, fallback = ""): string {
    return typeof v === "string" && v.trim().length ? v.trim() : fallback;
}

export function safeList(v: any): string[] {
    return Array.isArray(v) ? v.map(String).filter(Boolean) : [];
}

/** -----------------------------
 *  Recherche pages dans le mapping
 *  ----------------------------- */

export function getStaticPageByUrl(url: string): AnyObj | null {
    const m = mapping as AnyObj;
    const pages: AnyObj[] = Array.isArray(m.pages) ? m.pages : [];
    const target = normalizeUrl(url);
    return pages.find((p) => normalizeUrl(String(p.url || "")) === target) || null;
}

export function getServiceVillePage(service: string, ville: string): AnyObj | null {
    const m = mapping as AnyObj;
    const list: AnyObj[] = Array.isArray(m?.computed?.serviceVillePages) ? m.computed.serviceVillePages : [];
    const url = normalizeUrl(`/${service}/${ville}`);
    return list.find((p) => normalizeUrl(String(p.url || "")) === url) || null;
}

export function getZoneVillePage(zone: string, ville: string): AnyObj | null {
    const m = mapping as AnyObj;
    const list: AnyObj[] = Array.isArray(m?.computed?.zoneVillePages) ? m.computed.zoneVillePages : [];
    const url = normalizeUrl(`/zones/${zone}/${ville}`);
    return list.find((p) => normalizeUrl(String(p.url || "")) === url) || null;
}

export function getArticlePage(slug: string): AnyObj | null {
    const m = mapping as AnyObj;
    const list: AnyObj[] = Array.isArray(m?.computed?.articles) ? m.computed.articles : [];
    const url = normalizeUrl(`/ressources/${slug}`);
    return list.find((p) => normalizeUrl(String(p.url || "")) === url || String(p.slug || "") === slug) || null;
}

export function getAllServiceVillePages(): AnyObj[] {
    const m = mapping as AnyObj;
    return Array.isArray(m?.computed?.serviceVillePages) ? m.computed.serviceVillePages : [];
}

export function getAllZoneVillePages(): AnyObj[] {
    const m = mapping as AnyObj;
    return Array.isArray(m?.computed?.zoneVillePages) ? m.computed.zoneVillePages : [];
}

export function getAllArticles(): AnyObj[] {
    const m = mapping as AnyObj;
    return Array.isArray(m?.computed?.articles) ? m.computed.articles : [];
}

/** -----------------------------
 *  FAQ : support faqRefs (préféré) + fallback ancien faq (texte)
 *  Sources :
 *  - faq-bank.json -> items[{id,q,a,tags}]
 *  - services.json -> service.faq[{q,a}]
 *  - faq.json -> faqGlobal[{q,a}]
 *  - ancien mapping : page.faq ["question"] ou [{q,a}]
 *  ----------------------------- */

function stripAccents(input: string): string {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeQuestion(q: string): string {
    const s = stripAccents(String(q || "").toLowerCase());
    return s
        .replace(/['’]/g, " ")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenSet(s: string): Set<string> {
    return new Set(s.split(" ").filter(Boolean));
}

function jaccard(a: Set<string>, b: Set<string>): number {
    if (!a.size && !b.size) return 1;
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    const union = a.size + b.size - inter;
    return union ? inter / union : 0;
}

type FaqIndexEntry = {
    q: string;
    qNorm: string;
    tokens: Set<string>;
    a: string;
};

type FaqBankEntry = {
    id: string;
    q: string;
    a: string;
    tags?: string[];
};

function buildFaqBankIndex(): Map<string, FaqBankEntry> {
    const items: any[] = Array.isArray((faqBank as any)?.items) ? (faqBank as any).items : [];
    const map = new Map<string, FaqBankEntry>();
    for (const it of items) {
        const id = safeText(it?.id);
        const q = safeText(it?.q);
        const a = safeText(it?.a);
        if (!id || !q || !a) continue;
        map.set(id, { id, q, a, tags: Array.isArray(it?.tags) ? it.tags.map(String) : undefined });
    }
    return map;
}

const FAQ_BANK_INDEX = buildFaqBankIndex();

function buildFaqTextIndex(): {
    byExact: Map<string, string>;
    byNorm: Map<string, FaqIndexEntry>;
    all: FaqIndexEntry[];
} {
    const byExact = new Map<string, string>();
    const byNorm = new Map<string, FaqIndexEntry>();
    const all: FaqIndexEntry[] = [];

    const push = (qRaw: string, aRaw: string) => {
        const q = safeText(qRaw);
        const a = safeText(aRaw);
        if (!q || !a) return;

        const qNorm = normalizeQuestion(q);
        const entry: FaqIndexEntry = { q, qNorm, tokens: tokenSet(qNorm), a };
        byExact.set(q, a);
        byNorm.set(qNorm, entry);
        all.push(entry);
    };

    // FAQ global (legacy)
    const globalFaq: any[] = Array.isArray((faqData as any)?.faqGlobal) ? (faqData as any).faqGlobal : [];
    for (const it of globalFaq) push(it?.q, it?.a);

    // FAQ services (legacy)
    for (const s of services as any[]) {
        const faq = Array.isArray(s?.faq) ? s.faq : [];
        for (const it of faq) push(it?.q, it?.a);
    }

    // FAQ bank (also enrich text matching)
    for (const it of FAQ_BANK_INDEX.values()) push(it.q, it.a);

    return { byExact, byNorm, all };
}

const FAQ_TEXT_INDEX = buildFaqTextIndex();

function resolveOneQuestionFuzzy(question: string): string | null {
    const q = safeText(question);
    if (!q) return null;

    // 1) exact
    const exact = FAQ_TEXT_INDEX.byExact.get(q);
    if (exact) return exact;

    const qNorm = normalizeQuestion(q);
    if (!qNorm) return null;

    // 2) normalized exact
    const normHit = FAQ_TEXT_INDEX.byNorm.get(qNorm);
    if (normHit?.a) return normHit.a;

    const qTokens = tokenSet(qNorm);

    // 3) includes
    for (const entry of FAQ_TEXT_INDEX.all) {
        if (entry.qNorm.includes(qNorm) || qNorm.includes(entry.qNorm)) return entry.a;
    }

    // 4) token similarity (Jaccard) with safe threshold
    let best: { score: number; a: string } | null = null;
    for (const entry of FAQ_TEXT_INDEX.all) {
        const score = jaccard(qTokens, entry.tokens);
        if (!best || score > best.score) best = { score, a: entry.a };
    }
    if (best && best.score >= 0.62) return best.a;

    return null;
}

/**
 * ✅ Résolution FAQ prioritaire :
 * - si faqRefs existe -> map direct via faq-bank.json (match garanti)
 * - sinon fallback legacy:
 *   - objets {q,a} -> direct
 *   - array de questions -> fuzzy
 * - sinon fallback service.faq (si serviceSlug)
 */
export function resolveFaqItems(params: {
    pageFaq?: any;        // legacy: faq
    pageFaqRefs?: any;    // new: faqRefs
    serviceSlug?: string;
}): FaqItem[] {
    const { pageFaq, pageFaqRefs, serviceSlug } = params;

    // 0) Priorité : faqRefs -> banque
    const refs = safeList(pageFaqRefs);
    if (refs.length) {
        const items = refs
            .map((id) => {
                const it = FAQ_BANK_INDEX.get(id);
                if (!it) return null; // la validation doit empêcher ce cas
                return { q: it.q, a: it.a } as FaqItem;
            })
            .filter(Boolean) as FaqItem[];

        return items;
    }

    // 1) Legacy: objets {q,a}
    if (Array.isArray(pageFaq) && pageFaq.length && typeof pageFaq[0] === "object") {
        return (pageFaq as any[])
            .map((it) => ({ q: safeText(it?.q), a: safeText(it?.a) }))
            .filter((x) => x.q && x.a);
    }

    // 2) Legacy: array questions -> fuzzy
    const questions = safeList(pageFaq);
    const resolved = questions
        .map((q) => {
            const a = resolveOneQuestionFuzzy(q);
            return a ? ({ q, a } as FaqItem) : null;
        })
        .filter(Boolean) as FaqItem[];

    if (resolved.length) return resolved;

    // 3) Fallback : FAQ service
    if (serviceSlug) {
        const s = (services as any[]).find((x) => String(x.slug) === String(serviceSlug));
        const faq = Array.isArray(s?.faq) ? s.faq : [];
        return faq
            .map((it: any) => ({ q: safeText(it?.q), a: safeText(it?.a) }))
            .filter((x: any) => x.q && x.a);
    }

    return [];
}

/** -----------------------------
 *  LinksOut : vrais labels SEO
 * ----------------------------- */

export function normalizeLinksOut(linksOut: any): LinkOut[] {
    if (!Array.isArray(linksOut) || !linksOut.length) return [];

    // Déjà au bon format
    if (typeof linksOut[0] === "object") {
        return (linksOut as any[])
            .map((it) => ({
                href: normalizeUrl(String(it?.href || "")),
                label: safeText(it?.label)
            }))
            .filter((x) => x.href && x.label);
    }

    // Strings -> label via mapping
    const m = mapping as AnyObj;
    const pages: AnyObj[] = Array.isArray(m.pages) ? m.pages : [];
    const sv: AnyObj[] = Array.isArray(m?.computed?.serviceVillePages) ? m.computed.serviceVillePages : [];
    const zv: AnyObj[] = Array.isArray(m?.computed?.zoneVillePages) ? m.computed.zoneVillePages : [];
    const arts: AnyObj[] = Array.isArray(m?.computed?.articles) ? m.computed.articles : [];

    const findTitle = (href: string) => {
        const target = normalizeUrl(href);

        const sHit = pages.find((p) => normalizeUrl(String(p.url || "")) === target);
        if (sHit) return safeText(sHit.h1, safeText(sHit.metaTitle, ""));

        const svHit = sv.find((p) => normalizeUrl(String(p.url || "")) === target);
        if (svHit) return safeText(svHit.h1, safeText(svHit.metaTitle, ""));

        const zvHit = zv.find((p) => normalizeUrl(String(p.url || "")) === target);
        if (zvHit) return safeText(zvHit.h1, safeText(zvHit.metaTitle, ""));

        const aHit = arts.find((p) => normalizeUrl(String(p.url || "")) === target);
        if (aHit) return safeText(aHit.h1, safeText(aHit.metaTitle, ""));

        return "";
    };

    const prettify = (href: string) => {
        const clean = normalizeUrl(href).replace(/^\/+/, "");
        const last = clean.split("/").filter(Boolean).pop() || clean;
        return last.replaceAll("-", " ").replace(/\b\w/g, (m2) => m2.toUpperCase());
    };

    return (linksOut as any[])
        .map((href) => {
            const h = normalizeUrl(String(href || ""));
            const label = findTitle(h) || prettify(h);
            return { href: h, label };
        })
        .filter((x) => x.href && x.label);
}