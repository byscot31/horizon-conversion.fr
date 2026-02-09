// src/lib/resolve.ts
type ItemWithId = { id: string; [k: string]: any };

export function resolveByIds<T extends ItemWithId>(items: T[], ids: string[]): T[] {
    const map = new Map(items.map((it) => [it.id, it]));
    return ids.map((id) => map.get(id)).filter(Boolean) as T[];
}

export function resolveByTags<T extends ItemWithId>(
    items: T[],
    tags: string[],
    options?: { limit?: number; mustMatchAll?: boolean }
): T[] {
    const { limit = 8, mustMatchAll = false } = options || {};
    if (!tags?.length) return [];

    const scored = items
        .map((it) => {
            const itTags: string[] = it.tags || [];
            const matches = mustMatchAll
                ? tags.every((t) => itTags.includes(t)) ? tags.length : 0
                : tags.filter((t) => itTags.includes(t)).length;

            return { it, matches };
        })
        .filter((x) => x.matches > 0)
        .sort((a, b) => b.matches - a.matches)
        .slice(0, limit)
        .map((x) => x.it);

    return scored;
}
