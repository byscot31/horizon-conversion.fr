export const href = (p: string) => {
    if (!p) return "/";
    if (p === "/") return "/";
    // garde les URLs externes intactes
    if (/^https?:\/\//i.test(p)) return p.endsWith("/") ? p : p + "/";
    return p.endsWith("/") ? p : p + "/";
};

export const canonicalUrl = (base: string, path: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return href(`${cleanBase}${cleanPath}`);
};