import local from "../data/local/index.json";

export function getServiceArea() {
  return (local as any).serviceArea;
}
export function getLocalDefaults() {
  return (local as any).modulesDefaults;
}

// hash stable (pas crypto) basé sur la string (canonical/path)
export function hashStr(input: string) {
  let h = 2166136261; // FNV-1a base
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

// rotation déterministe : on prend une "fenêtre" qui dépend du seed
function rotateWindow(list: string[], seed: number, count: number) {
  if (!list.length) return [];
  const n = list.length;
  const start = seed % n;
  const out: string[] = [];
  for (let i = 0; i < Math.min(count, n); i++) {
    out.push(list[(start + i) % n]);
  }
  return out;
}

// Limite "variable" mais stable (entre min et max) selon le seed
function stableLimit(seed: number, min: number, max: number) {
  const span = Math.max(0, max - min);
  if (span === 0) return min;
  return min + (seed % (span + 1));
}

// rotation stable d'une liste entière
function rotateList<T>(list: T[], seed: number) {
  if (!list.length) return [];
  const n = list.length;
  const start = seed % n;
  return Array.from({ length: n }, (_, i) => list[(start + i) % n]);
}

// sélection stable "échantillon" de k éléments (sans random)
function stablePick<T>(list: T[], seed: number, k: number) {
  if (k <= 0) return [];
  if (k >= list.length) return list.slice();
  // On prend une fenêtre rotative sur une liste "rotated"
  const rotated = rotateList(list, seed);
  return rotated.slice(0, k);
}

/**
 * Anti-duplicate patterns:
 * - pick un sous-ensemble stable (k entre min/max)
 * - option rotation stable
 */
export function pickPatternsAntiDuplicate(params: {
  canonicalSeed: string;
  patterns: string[];
  pickMin?: number;
  pickMax?: number;
  rotate?: boolean;
}) {
  const defaults = getLocalDefaults();
  const antiDup = defaults?.antiDuplicate ?? { enabled: false };

  if (!antiDup?.enabled) return params.patterns;

  const seed = hashStr(params.canonicalSeed + "|patterns"); // seed dérivé
  const min = params.pickMin ?? antiDup.patterns?.pickMin ?? 2;
  const max = params.pickMax ?? antiDup.patterns?.pickMax ?? 4;
  const k = stableLimit(seed, min, Math.min(max, params.patterns.length));

  const picked = stablePick(params.patterns, seed, k);
  const doRotate = params.rotate ?? antiDup.patterns?.rotate ?? true;

  return doRotate ? rotateList(picked, seed) : picked;
}

/**
 * Max queries anti-duplicate : stable variation entre min/max
 */
export function pickMaxQueriesAntiDuplicate(params: {
  canonicalSeed: string;
  fallbackMax: number;
  maxMin?: number;
  maxMax?: number;
}) {
  const defaults = getLocalDefaults();
  const antiDup = defaults?.antiDuplicate ?? { enabled: false };
  if (!antiDup?.enabled) return params.fallbackMax;

  const seed = hashStr(params.canonicalSeed + "|qmax");
  const min = params.maxMin ?? antiDup.queries?.maxMin ?? 8;
  const max = params.maxMax ?? antiDup.queries?.maxMax ?? 12;

  return stableLimit(seed, min, max);
}

/**
 * Sélection anti-spam de secteurs:
 * - 2-3 villes pinned (si présentes)
 * - le reste en rotation stable selon seed (canonical)
 * - limite stable entre min/max
 */
export function pickSectorsAntiSpam(params: {
  canonicalSeed: string;
  limitMin?: number;
  limitMax?: number;
  pinned?: string[];
}) {
  const defaults = getLocalDefaults();
  const anti = defaults?.antiSpam ?? { enabled: false };

  const secteurs = (getServiceArea().secteurs as string[]) ?? [];
  if (!secteurs.length) return [];

  // si antiSpam désactivé => comportement simple
  if (!anti?.enabled) {
    const lim = params.limitMax ?? params.limitMin ?? 10;
    return secteurs.slice(0, Math.max(1, lim));
  }

  const seed = hashStr(params.canonicalSeed);

  const pinnedWanted = params.pinned ?? anti.zones?.basePinned ?? [];
  const pinned = pinnedWanted.filter((v: string) => secteurs.includes(v));

  const min = params.limitMin ?? anti.zones?.limitMin ?? 6;
  const max = params.limitMax ?? anti.zones?.limitMax ?? 10;
  const limit = stableLimit(seed, min, max);

  // pool sans pinned
  const pool = secteurs.filter((v) => !pinned.includes(v));

  // taille rotative = limite - pinned (min 1)
  const rotCount = Math.max(1, limit - pinned.length);
  const rotated = rotateWindow(pool, seed, rotCount);

  return uniq([...pinned, ...rotated]).slice(0, limit);
}

export function interpolate(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

export function buildLocalQueries(params: {
  patterns: string[];
  sectors: string[];
  vars: Record<string, string>;
  max?: number;
}) {
  const { patterns, sectors, vars, max = 10 } = params;
  const out: string[] = [];
  const seen = new Set<string>();

  for (const ville of sectors) {
    for (const p of patterns) {
      const q = interpolate(p, { ...vars, ville }).trim();
      const key = q.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(q);
      if (out.length >= max) return out;
    }
  }
  return out;
}

export function applyAntiCannibalPatterns(params: {
  canonicalSeed: string;
  mode: "metier" | "cross";
  patterns: string[];
  minSharePrefer?: number;
  preferContains?: string[];
  avoidContains?: string[];
}) {
  const defaults = getLocalDefaults();
  const anti = defaults?.antiCannibal ?? { enabled: false };
  if (!anti?.enabled) return params.patterns;

  const cfg = (anti as any)[params.mode] ?? {};
  const preferContains = params.preferContains ?? cfg.preferContains ?? [];
  const avoidContains = params.avoidContains ?? cfg.avoidContains ?? [];

  // Sépare les patterns en "prefer" / "other" selon tokens
  const hasAllPrefer = (p: string) => preferContains.every((t: string) => p.includes(t));
  const hasAnyAvoid = (p: string) => avoidContains.some((t: string) => p.includes(t));

  const prefer = params.patterns.filter((p) => hasAllPrefer(p) && !hasAnyAvoid(p));
  if (!prefer.length) return params.patterns;

  const preferSet = new Set(prefer);
  const other = params.patterns.filter((p) => !preferSet.has(p));

  // Priorisation simple et efficace : prefer d'abord, puis other (rotation stable)
  const seed = hashStr(params.canonicalSeed + `|anticannibal|${params.mode}`);
  const preferRot = rotateList(prefer, seed);
  const otherRot = rotateList(other, seed);

  const out = [...preferRot, ...otherRot];

  // uniq + fallback sécurité (garde tous les patterns à la fin si besoin)
  return Array.from(new Set(out)).concat(params.patterns).filter((v, idx, arr) => arr.indexOf(v) === idx);
}

export function enforceMinShareQueries(params: {
  queries: string[];
  minShare: number; // ex: 0.7
  mustContain: string; // ex: "Google Ads" ou "Ads local"
  buildReplacement: (count: number) => string[]; // fabrique des requêtes "presta"
}) {
  const { queries, minShare, mustContain, buildReplacement } = params;
  if (!queries?.length) return queries;

  const needle = mustContain.trim().toLowerCase();
  if (!needle) return queries;

  const hasNeedle = (q: string) => q.toLowerCase().includes(needle);

  const withNeedleIdx: number[] = [];
  const withoutNeedleIdx: number[] = [];

  queries.forEach((q, idx) => (hasNeedle(q) ? withNeedleIdx : withoutNeedleIdx).push(idx));

  const currentShare = withNeedleIdx.length / queries.length;
  if (currentShare >= minShare) return queries;

  const targetCount = Math.ceil(minShare * queries.length);
  const needed = Math.max(0, targetCount - withNeedleIdx.length);
  if (!needed) return queries;

  // Demande plus de candidats pour maximiser l'unicité après dédup
  const replacements = buildReplacement(Math.min(queries.length, needed * 2));
  if (!replacements?.length) return queries;

  // On remplace d’abord les requêtes sans needle (en gardant l’ordre stable)
  const out = queries.slice();
  let r = 0;

  for (let i = 0; i < withoutNeedleIdx.length && r < replacements.length; i++) {
    const idx = withoutNeedleIdx[i];
    out[idx] = replacements[r++];
  }

  // Déduplication soft (sans réordonner trop)
  const seen = new Set<string>();
  const deduped: string[] = [];
  for (const q of out) {
    const key = q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(q);
  }

  // Si on a perdu des éléments par dédup, on complète avec les originales restantes
  if (deduped.length < queries.length) {
    for (const q of queries) {
      const key = q.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(q);
      if (deduped.length >= queries.length) break;
    }
  }

  return deduped.slice(0, queries.length);
}