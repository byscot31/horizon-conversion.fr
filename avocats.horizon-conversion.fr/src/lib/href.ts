// src/lib/href.ts
const isExternal = (s: string) => /^https?:\/\//i.test(s);

export function href(p: string) {
    if (!p) return "/";
    if (isExternal(p)) return p;

    // garantit un leading slash
    let out = p.startsWith("/") ? p : `/${p}`;

    // enlève query/hash temporairement
    const [path, rest] = out.split(/(?=[?#])/);

    // force trailing slash (sauf "/")
    const normalized = path === "/" ? "/" : path.replace(/\/+$/, "") + "/";

    return rest ? normalized + rest : normalized;
}

export function canonicalUrl(site: string, path: string) {
    const base = site.replace(/\/+$/, "");
    return base + href(path);
}