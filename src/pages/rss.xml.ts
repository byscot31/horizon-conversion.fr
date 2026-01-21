/**
 * RSS du site (travaux, avis et pages importantes)
 *
 * À quoi ça sert ?
 * - Permet aux internautes (et à certains outils) de “s’abonner” aux nouveautés du site.
 * - À chaque nouveau contenu (travaux / avis), le flux RSS se met à jour automatiquement.
 *
 * Ce que contient le flux :
 * 1) Les pages principales (Accueil, Travaux, Avis, Villes, Métiers, Contact)
 * 2) Les derniers “Travaux / Réalisations”
 *    + en bonus : les pages liées (Ville × Métier) et (Service × Ville) associées à chaque travail
 * 3) Les derniers “Avis clients”
 *    + en bonus : les pages liées (Ville × Métier) et (Service × Ville) associées à chaque avis
 *
 * Limites / sécurité :
 * - On limite le nombre total d’items (MAX_ITEMS) pour garder un flux léger.
 * - On échappe le XML pour éviter de casser le flux (caractères spéciaux).
 * - On met un cache 1h (Cache-Control) pour éviter de régénérer à chaque requête.
 */

import type { APIRoute } from "astro";

import villes from "../data/villes.json";
import metiers from "../data/metiers.json";
import services from "../data/services.json";

import travaux from "../data/travaux.json";
import avis from "../data/avis.json";

const SITE_URL =
import.meta.env.PUBLIC_SITE_URL ??
  (import.meta.env.SITE ? String(import.meta.env.SITE) : "");

const BRAND = import.meta.env.PUBLIC_BRAND_NAME ?? "Horizon Conversion";
const REGION_LABEL = import.meta.env.PUBLIC_REGION_LABEL ?? "Sud Oise (60) / Nord 95";

/** Nombre maximum d’items dans le flux RSS */
const MAX_ITEMS = 250;

/** Construit une URL absolue à partir d’un chemin (ex: "/contact/") */
function abs(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Échappe les caractères spéciaux pour un XML valide */
function escapeXml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Convertit une date en format RSS (RFC 822 / UTCString) */
function toRssDate(d: Date) {
  return d.toUTCString();
}

type Item = {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  guid?: string;
};

function getVilleName(slug: string) {
  return villes.find((v) => v.slug === slug)?.name ?? slug;
}
function getMetierName(slug: string) {
  return metiers.find((m) => m.slug === slug)?.name ?? slug;
}
function getServiceName(mSlug: string, sSlug: string) {
  return (
    services.find((s) => s.metier === mSlug && s.slug === sSlug)?.name ?? sSlug
  );
}

/**
 * Convertit "YYYY-MM-DD" en Date.
 * Si la date est absente ou invalide, on prend "now".
 */
function dateFromYmd(ymd?: string, fallback = new Date()) {
  if (!ymd) return fallback;
  const [y, m, d] = ymd.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return fallback;
  // UTC pour éviter les surprises de fuseau horaire
  return new Date(Date.UTC(y, m - 1, d, 10, 0, 0));
}

export const GET: APIRoute = async () => {
  if (!SITE_URL) {
    return new Response("Missing PUBLIC_SITE_URL in .env", { status: 500 });
  }

  const now = new Date();
  const items: Item[] = [];

  /**
   * 1) Pages principales (hubs)
   * On leur donne des dates “récentes” (now - X minutes) pour qu’elles apparaissent dans le flux
   * même si aucun avis / travaux n’existe encore.
   */
  items.push(
    {
      title: `${BRAND} — Accueil`,
      link: abs("/"),
      description: `Artisans locaux — ${REGION_LABEL}. Dépannage, installation, devis rapide.`,
      pubDate: new Date(now.getTime() - 1 * 60_000),
},
  {
    title: `Travaux / Réalisations — ${BRAND}`,
      link: abs("/travaux/"),
    description: `Exemples concrets d’interventions dans ${REGION_LABEL}.`,
    pubDate: new Date(now.getTime() - 2 * 60_000),
  },
  {
    title: `Avis clients — ${BRAND}`,
      link: abs("/avis/"),
    description: `Avis clients vérifiés (preuves sociales).`,
    pubDate: new Date(now.getTime() - 3 * 60_000),
  },
  {
    title: `Villes d’intervention — ${REGION_LABEL}`,
      link: abs("/villes/"),
    description: `Toutes les villes couvertes (Sud Oise / Nord 95).`,
    pubDate: new Date(now.getTime() - 4 * 60_000),
  },
  {
    title: `Métiers — ${BRAND}`,
      link: abs("/metiers/"),
    description: `Plombier, électricien, serrurier, couvreur, chauffagiste, peintre.`,
    pubDate: new Date(now.getTime() - 5 * 60_000),
  },
  {
    title: `Contact / Devis — ${BRAND}`,
      link: abs("/contact/"),
    description: `Demander un devis gratuit.`,
    pubDate: new Date(now.getTime() - 6 * 60_000),
  }
);

  /**
   * 2) Travaux (les plus récents)
   * - On trie par date (desc)
   * - On ajoute aussi 1 à 2 pages liées pour faire du “maillage” dans le flux
   */
  const travauxSorted = [...travaux].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  travauxSorted.slice(0, 60).forEach((t, idx) => {
    const vName = getVilleName(t.ville);
    const mName = getMetierName(t.metier);
    const sName = t.service ? getServiceName(t.metier, t.service) : "Service";

    const baseDate = dateFromYmd(t.date);

    items.push({
      title: `${t.title} — ${mName} à ${vName}`,
      link: abs(`/travaux/${t.slug}/`),
      description: `${t.problem} → ${t.results}`.slice(0, 220),
      pubDate: new Date(baseDate.getTime() - idx * 60_000),
  });

    // Bonus : page Ville × Métier associée
    items.push({
      title: `${mName} à ${vName}`,
      link: abs(`/villes/${t.ville}/${t.metier}/`),
      description: `Page Ville × Métier : services fréquents, demande de devis, intervention locale.`,
      pubDate: new Date(baseDate.getTime() - (idx + 1) * 60_000),
  });

    // Bonus : page Service × Ville associée
    if (t.service) {
      items.push({
        title: `${sName} à ${vName} — ${mName}`,
        link: abs(`/villes/${t.ville}/${t.metier}/${t.service}/`),
        description: `Page Service × Ville : infos, FAQ, demande de devis.`,
        pubDate: new Date(baseDate.getTime() - (idx + 2) * 60_000),
    });
    }
  });

  /**
   * 3) Avis (les plus récents)
   * - On trie par date (desc)
   * - On ajoute aussi les pages liées (Ville × Métier) et (Service × Ville)
   */
  const avisSorted = [...avis].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  avisSorted.slice(0, 80).forEach((r, idx) => {
    const vName = getVilleName(r.ville);
    const mName = getMetierName(r.metier);
    const sName = getServiceName(r.metier, r.service);

    const baseDate = dateFromYmd(r.date);

    items.push({
      title: `Avis ${r.rating}/5 — ${mName} à ${vName}`,
      link: abs(`/avis/${r.id}/`),
      description: `${r.author} : ${r.text}`.slice(0, 220),
      pubDate: new Date(baseDate.getTime() - idx * 60_000),
  });

    items.push({
      title: `${mName} à ${vName}`,
      link: abs(`/villes/${r.ville}/${r.metier}/`),
      description: `Page Ville × Métier : services, délais, devis.`,
      pubDate: new Date(baseDate.getTime() - (idx + 1) * 60_000),
  });

    items.push({
      title: `${sName} à ${vName} — ${mName}`,
      link: abs(`/villes/${r.ville}/${r.metier}/${r.service}/`),
      description: `Page Service × Ville : infos, FAQ, demande de devis.`,
      pubDate: new Date(baseDate.getTime() - (idx + 2) * 60_000),
  });
  });

  /**
   * 4) Tri final + limite
   * On conserve uniquement MAX_ITEMS items, du plus récent au plus ancien.
   */
  const finalItems = items
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, MAX_ITEMS);

  const channelTitle = `${BRAND} — RSS (travaux, avis, pages)`;
  const channelLink = abs("/");
  const channelDesc = `Derniers contenus : travaux, avis, pages clés — ${REGION_LABEL}.`;

  /**
   * 5) Génération du XML RSS
   */
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `  <channel>\n` +
    `    <title>${escapeXml(channelTitle)}</title>\n` +
    `    <link>${escapeXml(channelLink)}</link>\n` +
    `    <description>${escapeXml(channelDesc)}</description>\n` +
    `    <language>fr-FR</language>\n` +
    `    <lastBuildDate>${escapeXml(toRssDate(now))}</lastBuildDate>\n` +
    `    <ttl>60</ttl>\n` +
    finalItems
      .map((it) => {
        const guid = it.guid ?? it.link;
        return (
          `    <item>\n` +
          `      <title>${escapeXml(it.title)}</title>\n` +
          `      <link>${escapeXml(it.link)}</link>\n` +
          `      <guid isPermaLink="true">${escapeXml(guid)}</guid>\n` +
          `      <pubDate>${escapeXml(toRssDate(it.pubDate))}</pubDate>\n` +
          `      <description>${escapeXml(it.description)}</description>\n` +
          `    </item>\n`
        );
      })
      .join("") +
    `  </channel>\n` +
    `</rss>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache 1 heure
      "Cache-Control": "public, max-age=3600",
    },
  });
};
