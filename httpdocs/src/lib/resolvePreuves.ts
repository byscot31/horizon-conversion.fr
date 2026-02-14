// src/lib/resolvePreuves.ts
type PreuveItem = { title?: string; text?: string; meta?: string };
type PreuvesBlock = {
  badge?: string;
  title?: string;
  style?: { backgroundImage?: string; padding?: string };
  items?: PreuveItem[];
};

type PreuvesVariantsFile = {
  default?: Partial<PreuvesBlock>;
  [key: string]: Partial<PreuvesBlock> | undefined;
};

function mergeArrayByIndex<T extends Record<string, any>>(base: T[], patch?: T[]) {
  if (!Array.isArray(patch) || patch.length === 0) return base;
  const out = base.map((x) => ({ ...x }));
  for (let i = 0; i < patch.length; i++) {
    const p = patch[i];
    if (!p || typeof p !== "object") continue;
    out[i] = { ...(out[i] ?? {}), ...p };
  }
  return out;
}

export function resolvePreuves(args: {
  preuvesData: PreuvesBlock;
  preuvesVariants?: PreuvesVariantsFile;
  pageType?: string;
}): PreuvesBlock {
  const preuvesData = args.preuvesData ?? {};
  const variants = (args.preuvesVariants ?? {}) as PreuvesVariantsFile;
  const pageType = String(args.pageType ?? "").trim();

  const defaultPatch = (variants.default ?? {}) as Partial<PreuvesBlock>;
  const pagePatch = (pageType && variants[pageType] ? variants[pageType] : {}) as Partial<PreuvesBlock>;

  // merge style shallow (page overrides default overrides base)
  const style = {
    ...(preuvesData.style ?? {}),
    ...(defaultPatch.style ?? {}),
    ...(pagePatch.style ?? {}),
  };

  const baseItems = Array.isArray((defaultPatch.items ?? preuvesData.items)) ? (defaultPatch.items ?? preuvesData.items)! : [];
  const patchItems = Array.isArray(pagePatch.items) ? pagePatch.items : undefined;

  return {
    ...preuvesData,
    ...defaultPatch,
    ...pagePatch,
    style,
    items: mergeArrayByIndex(baseItems as any[], patchItems as any[]),
  };
}
