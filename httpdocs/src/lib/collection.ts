// src/lib/collection.ts
export function assertArray<T>(value: any, name: string): T[] {
  if (!Array.isArray(value)) throw new Error(`[data] ${name} doit être un tableau JSON`);
  return value as T[];
}

export function bySlug<T extends { slug: string }>(list: T[], slug: string, name = "liste"): T {
  const s = String(slug ?? "").trim();
  const item = list.find((x) => String(x?.slug ?? "").trim() === s);
  if (!item) throw new Error(`${name}: slug introuvable "${s}"`);
  return item;
}

export function splitInTwoColumns<T>(list: T[]): [T[], T[]] {
  const mid = Math.ceil(list.length / 2);
  return [list.slice(0, mid), list.slice(mid)];
}

export function pickVillesForZone<V extends { zoneSlug: string }, Z extends { slug: string }>(
  villes: V[],
  zone: Z,
  max = 10
): V[] {
  if (!Array.isArray(villes) || !zone?.slug) return [];
  return villes.filter((v) => v?.zoneSlug === zone.slug).slice(0, max);
}