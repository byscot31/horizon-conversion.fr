// src/lib/cocon.ts
import mapping from "../data/mapping_cocon.json";
import { pickServicesUniques, buildServiceHref, resolveAroundLinks } from "./seoRules";

export const mappingCocon = mapping as any;

export const cocon = {
  mapping: mappingCocon,
  defaults: mappingCocon.defaults,
  pickServicesUniques,
  buildServiceHref,
  resolveAroundLinks,
};
