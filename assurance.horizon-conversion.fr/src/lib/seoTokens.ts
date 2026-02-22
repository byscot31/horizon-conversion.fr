// src/lib/seoTokens.ts
type AnyObj = Record<string, any>;

function getByPath(obj: AnyObj, path: string): any {
  // support "kw.secondary.2"
  const parts = path.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    const idx = Number(p);
    cur = Number.isFinite(idx) && p === String(idx) ? cur[idx] : cur[p];
  }
  return cur;
}

function resolveToken(tokenPath: string, ctx: AnyObj): string {
  const val = getByPath(ctx, tokenPath);
  if (val == null) return "";
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
}

function replaceTokensInString(input: string, ctx: AnyObj): string {
  return input.replace(/\{([^}]+)\}/g, (_m, raw) => resolveToken(String(raw).trim(), ctx));
}

function deepHydrate(node: any, ctx: AnyObj): any {
  if (typeof node === "string") return replaceTokensInString(node, ctx);
  if (Array.isArray(node)) return node.map((x) => deepHydrate(x, ctx));
  if (node && typeof node === "object") {
    const out: AnyObj = {};
    for (const [k, v] of Object.entries(node)) out[k] = deepHydrate(v, ctx);
    return out;
  }
  return node;
}

/**
 * Standard pages:
 * - hydrate tous les champs string avec seoMap tokens
 * - remplace seo.title et seo.description via seoTemplates (source of truth)
 */
export function hydrateStandardPage<T extends AnyObj>(raw: T): T {
  const seoMap = raw?.seoMap ?? {};
  const ctx: AnyObj = { ...seoMap };

  // 1) hydrate tout le JSON (hero/sections/schema/…)
  const hydrated: AnyObj = deepHydrate(raw, ctx);

  // 2) seoTemplates -> seo.title/description (remplacement total)
  hydrated.seo = hydrated.seo ?? {};
  const tplTitle = hydrated?.seoTemplates?.title;
  const tplDesc = hydrated?.seoTemplates?.description;

  if (!tplTitle || !tplDesc) {
    throw new Error(
      `seoTemplates manquant: title/description requis pour la page standard "${hydrated?.key ?? "unknown"}"`
    );
  }

  hydrated.seo.title = replaceTokensInString(tplTitle, ctx);
  hydrated.seo.description = replaceTokensInString(tplDesc, ctx);

  return hydrated as T;
}