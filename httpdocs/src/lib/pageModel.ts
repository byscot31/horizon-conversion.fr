// src/lib/pageModel.ts
import {
  site, seo, cta,
  heroPage, heroCard,
  benefices, livrables, preuves, processData, methode,
  maillageInterne,
  faqsServices, faqsVilles, faqsZones, faqsCibles,
  form, tarifs, articles, villes, zones, services, cibles, servicesPage,
} from "./data";

type Entity = { slug: string; name?: string; title?: string; segment?: "volume" | "premium" };

type BuildParams = {
  type:
    | "home"
    | "servicesIndex"
    | "zonesIndex"
    | "profilsIndex"
    | "service"
    | "zone"
    | "ville"
    | "cible"
    | "serviceVille"
    | "cibleVille";
  zone?: Entity;
  ville?: Entity;
  service?: Entity;
  cible?: Entity;
  canonical: string;
};

function pickSeo(params: BuildParams) {
  const serviceName = params.service?.name || params.service?.title;
  const cibleName = params.cible?.name || params.cible?.title;
  const villeName = params.ville?.name || params.ville?.title;
  const zoneName = params.zone?.name || params.zone?.title;

  // Titre : plus court selon type (évite des titres trop longs)
  let titleCore = site.name;

  if (params.type === "servicesIndex") titleCore = "Services";
  if (params.type === "zonesIndex") titleCore = "Zones couvertes";
  if (params.type === "profilsIndex") titleCore = "Profils";

  if (params.type === "service" && serviceName) titleCore = `${serviceName}`;
  if (params.type === "zone" && zoneName) titleCore = `Zone ${zoneName}`;
  if (params.type === "ville" && villeName) titleCore = `Obtenir plus de demandes à ${villeName}`;
  if (params.type === "serviceVille" && serviceName && villeName) titleCore = `${serviceName} à ${villeName}`;
  if (params.type === "cibleVille" && cibleName && villeName) titleCore = `${cibleName} à ${villeName}`;
  if (params.type === "cible" && cibleName) titleCore = `${cibleName}`;
  if (params.type === "home") titleCore = site.name;

  // ✅ évite "Horizon Conversion | Horizon Conversion"
  const title = titleCore === site.name ? site.name : `${titleCore} | ${site.name}`;

  // Description : fallback simple (tu peux raffiner ensuite dans seo.json si tu veux)
  const description =
    site.defaultDescription ??
    "Audit gratuit et plan clair pour générer des appels et des formulaires.";

  return { title, description, canonical: params.canonical };
}

function pickBreadcrumb(params: BuildParams) {
  const items: Array<{ label: string; href: string }> = [{ label: "Accueil", href: "/" }];

  // Index pages
  if (params.type === "home") return items;

  if (params.type === "servicesIndex") {
    items.push({ label: "Services", href: "/services/" });
    return items;
  }

  if (params.type === "zonesIndex") {
    items.push({ label: "Zones", href: "/zones/" });
    return items;
  }

  if (params.type === "profilsIndex") {
    items.push({ label: "Profils", href: "/profils/" });
    return items;
  }

  // Services (service)
  if (params.type === "service" && params.service) {
    items.push({ label: "Services", href: "/services/" });
    items.push({ label: params.service.name ?? params.service.slug, href: params.canonical });
    return items;
  }

  // Zones (zone / ville / serviceVille / cibleVille)
  if (
    (params.type === "zone" || params.type === "ville" || params.type === "serviceVille" || params.type === "cibleVille") &&
    params.zone
  ) {
    items.push({ label: "Zones", href: "/zones/" });
    items.push({ label: params.zone.name ?? params.zone.slug, href: `/zones/${params.zone.slug}/` });

    if ((params.type === "ville" || params.type === "serviceVille" || params.type === "cibleVille") && params.ville) {
      items.push({
        label: params.ville.name ?? params.ville.slug,
        href: `/zones/${params.zone.slug}/${params.ville.slug}/`,
      });
    }

    if (params.type === "serviceVille" && params.service) {
      items.push({ label: params.service.name ?? params.service.slug, href: params.canonical });
    }

    if (params.type === "cibleVille" && params.cible) {
      items.push({ label: params.cible.name ?? params.cible.slug, href: params.canonical });
    }

    return items;
  }

  // Cible “globale”
  if (params.type === "cible" && params.cible) {
    items.push({ label: "Profils", href: "/profils/" });
    items.push({ label: params.cible.name ?? params.cible.slug, href: params.canonical });
    return items;
  }

  return items;
}

function pickFaqs(params: BuildParams) {
  const list: any[] = [];

  // Index pages
  if (params.type === "servicesIndex") list.push(...faqsServices);
  if (params.type === "zonesIndex") list.push(...faqsZones);
  if (params.type === "profilsIndex") list.push(...faqsCibles);

  // Pages “détails”
  if (params.type === "service" && params.service) {
    list.push(...faqsServices.filter((f: any) => !f.serviceSlugs || f.serviceSlugs.includes(params.service!.slug)));
  }
  if ((params.type === "ville" || params.type === "serviceVille" || params.type === "cibleVille") && params.ville) {
    list.push(...faqsVilles.filter((f: any) => !f.villeSlugs || f.villeSlugs.includes(params.ville!.slug)));
  }
  if ((params.type === "zone" || params.type === "ville" || params.type === "serviceVille" || params.type === "cibleVille") && params.zone) {
    list.push(...faqsZones.filter((f: any) => !f.zoneSlugs || f.zoneSlugs.includes(params.zone!.slug)));
  }
  if ((params.type === "cible" || params.type === "cibleVille") && params.cible) {
    list.push(...faqsCibles.filter((f: any) => !f.cibleSlugs || f.cibleSlugs.includes(params.cible!.slug)));
  }

  // Dédup basique sur question
  const seen = new Set<string>();
  return list.filter((x: any) => {
    const k = (x.q || x.question || "").trim();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function buildModel(params: BuildParams) {
  return {
    site,
    seo: pickSeo(params),
    breadcrumbItems: pickBreadcrumb(params),
    cta,
    hero: { page: heroPage, card: heroCard },
    blocks: {
      benefices,
      livrables,
      preuves,
      process: processData,
      methode,
      maillageInterne,
      form,
      tarifs,
      articles,
      villes,
      zones,
      services,
      cibles,
      servicesPage,
      // exposer les FAQ “brutes” si une page veut filtrer à la main
      faqsCibles,
      faqsZones,
      faqsVilles,
      faqsServices,
    },
    faqs: pickFaqs(params),
    contexte: {
      type: params.type,
      zone: params.zone,
      ville: params.ville,
      service: params.service,
      cible: params.cible,
    },
  };
}
