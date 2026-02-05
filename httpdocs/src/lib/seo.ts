import { site } from "./data";

export function absUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${clean}`;
}

export function pickVariant<T>(arr: T[], seed: string): T {
  // stable: même seed => même variante
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}