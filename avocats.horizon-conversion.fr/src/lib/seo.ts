export function buildTitle(parts: string[]) {
    return parts.filter(Boolean).join(" | ");
}

export function canonical(url: URL) {
    // enlève les params pour canonical propre
    return `${url.origin}${url.pathname}`;
}

export function metaDescription(text: string, max = 155) {
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length > max ? clean.slice(0, max - 1).trim() + "…" : clean;
}