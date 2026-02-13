// src/lib/data.ts
import site from "../data/site.json";
import seo from "../data/seo.json";
import cta from "../data/cta.json";

import zonesRaw from "../data/zones.json";
import villesRaw from "../data/villes.json";
import servicesRaw from "../data/services.json";
import ciblesRaw from "../data/cibles.json";

import heroPage from "../data/hero_page.json";
import heroCard from "../data/hero_card.json";

import benefices from "../data/benefices.json";
import livrables from "../data/livrables.json";
import preuves from "../data/preuves.json";
import processData from "../data/process.json";
import methode from "../data/methode.json";

import maillageInterne from "../data/maillage_interne.json";
import servicesPage from "../data/services_page.json";
import tarifs from "../data/tarifs.json";
import form from "../data/form.json";

import faqsServicesRaw from "../data/faqs_services.json";
import faqsVillesRaw from "../data/faqs_villes.json";
import faqsZonesRaw from "../data/faqs_zones.json";
import faqsCiblesRaw from "../data/faqs_cibles.json";

import articles from "../data/articles.json";

// ---- Helpers
function assertArray<T>(value: any, name: string): T[] {
  if (!Array.isArray(value)) {
    throw new Error(`[data] ${name} doit être un tableau JSON`);
  }
  return value as T[];
}

// ---- Normalisation tableaux
const zones = assertArray<any>(zonesRaw, "zones.json");
const villes = assertArray<any>(villesRaw, "villes.json");
const services = assertArray<any>(servicesRaw, "services.json");
const cibles = assertArray<any>(ciblesRaw, "cibles.json");

const faqsServices = assertArray<any>(faqsServicesRaw, "faqs_services.json");
const faqsVilles = assertArray<any>(faqsVillesRaw, "faqs_villes.json");
const faqsZones = assertArray<any>(faqsZonesRaw, "faqs_zones.json");
const faqsCibles = assertArray<any>(faqsCiblesRaw, "faqs_cibles.json");

export {
  site, seo, cta,
  zones, villes, services, cibles,
  heroPage, heroCard,
  benefices, livrables, preuves, processData, methode,
  maillageInterne, servicesPage, tarifs, form,
  faqsServices, faqsVilles, faqsZones, faqsCibles,
  articles,
};

export function bySlug<T extends { slug: string }>(list: T[], slug: string): T {
  const s = String(slug ?? "").trim();
  const item = list.find((x) => String(x.slug).trim() === s);
  if (!item) throw new Error(`Slug introuvable: ${s}`);
  return item;
}

export function byId<T extends { id: string | number }>(list: T[], id: string | number): T {
  const target = String(id ?? "").trim();
  const item = list.find((x) => String((x as any).id).trim() === target);
  if (!item) throw new Error(`ID introuvable: ${target}`);
  return item;
}
