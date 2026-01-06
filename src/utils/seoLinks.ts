export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

export function pickRotated<T>(items: T[], seed: number, count: number): T[] {
  if (!items?.length) return [];
  const n = Math.min(count, items.length);
  const start = seed % items.length;

  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(items[(start + i) % items.length]);
  return out;
}
