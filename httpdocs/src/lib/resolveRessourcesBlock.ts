export function resolveRessourcesBlock(args: {
  ressourcesBlock: Record<string, any>;
  pageType?: string;
  contexte?: { ville?: { name?: string } };
}) {
  const rb = args.ressourcesBlock ?? {};
  const base = rb.default ?? {};
  const patch = (args.pageType && rb[args.pageType]) ? rb[args.pageType] : {};

  const merged = { ...base, ...patch };

  const villeName = args.contexte?.ville?.name ?? "";
  if (merged?.intro && villeName) {
    merged.intro = String(merged.intro).replace("{ville}", villeName);
  }

  return merged;
}
