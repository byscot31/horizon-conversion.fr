//src/lib/resolveProcess.ts
type Step = { date?: string; title?: string; text?: any };
type ProcessBlock = { badge?: string; title?: string; intro?: string; label?: string; steps?: Step[] };

// variants[type] est un patch partiel (ex: intro + steps[1].title/text)
type ProcessVariants = Record<string, Partial<ProcessBlock>>;

function mergeSteps(baseSteps: Step[], patchSteps?: Step[]) {
  if (!Array.isArray(patchSteps) || patchSteps.length === 0) return baseSteps;

  const out = baseSteps.map((s) => ({ ...s }));
  for (let i = 0; i < patchSteps.length; i++) {
    const p = patchSteps[i];
    if (!p || typeof p !== "object") continue;
    if (!out[i]) out[i] = {};
    out[i] = { ...out[i], ...p };
  }
  return out;
}

export function resolveProcess(args: {
  processData: ProcessBlock;          // ton process.json actuel
  processVariants?: ProcessVariants;  // process_variants.json
  pageType?: string;                 // contexte.type / params.type
}): ProcessBlock {
  const { processData, processVariants, pageType } = args;

  const variants = processVariants ?? {};
  const base = (variants.default as ProcessBlock) ?? processData ?? {};
  const patch = (pageType && variants[pageType]) ? (variants[pageType] as ProcessBlock) : {};

  const baseSteps = Array.isArray(base.steps) ? base.steps : [];
  const patchSteps = Array.isArray(patch.steps) ? patch.steps : undefined;

  return {
    ...processData, // fallback global si default est incomplet
    ...base,
    ...patch,
    steps: mergeSteps(baseSteps, patchSteps),
  };
}
