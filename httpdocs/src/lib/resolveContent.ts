// src/lib/resolveContent.ts
import services from "../data/services.json";
import cibles from "../data/cibles.json";
import objections from "../data/objections.json";

type ProfileLike = {
    tracking: { service: string; ville: string; metier: string };
    segment: "volume" | "premium" | "mix";
    variant?: { tone?: string; angle?: string };
    sections: {
        objections?: string[];
        benefits?: string[];
        deliverables?: string[];
        proofs?: string[];
        faqs?: string[];
        process?: string;
    };
};

function uniq<T>(arr: T[]): T[] {
    return Array.from(new Set(arr.filter(Boolean)));
}

function scoreByTags(itemTags: string[] = [], wantedTags: string[] = []) {
    if (!wantedTags.length) return 0;
    let s = 0;
    for (const t of wantedTags) if (itemTags.includes(t)) s++;
    return s;
}

// pick déterministe (stable)
function pickDeterministic<T>(arr: T[], seed: string, n: number): T[] {
    if (!arr.length) return [];
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    const out: T[] = [];
    const used = new Set<number>();
    while (out.length < Math.min(n, arr.length)) {
        h = (Math.imul(h, 1103515245) + 12345) >>> 0;
        const idx = h % arr.length;
        if (!used.has(idx)) { used.add(idx); out.push(arr[idx]); }
    }
    return out;
}

export function resolveContent(profile: ProfileLike) {
    const serviceId = `svc-${profile.tracking.service}`; // tracking.service = slug (ex "google-ads")
    const cibleId = `cible-${profile.tracking.metier}`;  // tracking.metier = slug cible (ex "artisans")

    // fallback: si chez toi tracking.metier est déjà un id, adapte ici
    const service = (services as any)[serviceId] || Object.values(services as any).find((s: any) => s.slug === profile.tracking.service);
    const cible = (cibles as any)[cibleId] || Object.values(cibles as any).find((c: any) => c.slug === profile.tracking.metier);

    // 1) Si la cible a déjà des objections explicites → on les utilise
    const explicit = (cible?.objections || []) as string[];
    if (explicit.length) {
        profile.sections.objections = pickDeterministic(explicit, `obj|${service?.id}|${cible?.id}`, 4);
        return profile;
    }

    // 2) Sinon, on déduit des tags “souhaités”
    const wantedTags = uniq([
        profile.segment,                 // "premium" / "mix" / "volume" (si tu tags aussi les objections avec ces mots)
        ...(service?.faqTags || []),
        ...(service?.benefitTags || []),
        ...(service?.proofTags || []),
        ...(cible?.faq_tags || []),
        ...(cible?.preuves_preferees || []),
        ...(cible?.outcomes || [])
    ].map(String));

    // 3) On score les objections disponibles
    const scored = (objections as any[])
        .map((o) => ({ o, score: scoreByTags(o.tags || [], wantedTags) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score);

    // 4) On prend un mix stable (top + rotation)
    const top = scored.slice(0, 8).map((x) => x.o.id);
    const picked = pickDeterministic(top.length ? top : (objections as any[]).map((o) => o.id), `obj|${service?.id}|${cible?.id}|${profile.variant?.tone}|${profile.variant?.angle}`, 4);

    profile.sections.objections = picked;
    return profile;
}
