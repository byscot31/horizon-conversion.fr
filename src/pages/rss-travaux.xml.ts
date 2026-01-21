/**
 * src/pages/rss-travaux.xml.ts
 *
 * Flux RSS dédié aux travaux / réalisations (uniquement).
 * URL finale : /rss-travaux.xml
 *
 * Objectif :
 * - Permettre aux internautes / outils de s’abonner aux derniers chantiers publiés.
 * - Flux léger, trié du plus récent au plus ancien, avec échappement XML.
 */

import type { APIRoute } from "astro";

import villes from "../data/villes.json";
import metiers from "../data/metiers.json";
import services from "../data/services.json";
import travaux from "../data/travaux.json";

const SITE_URL =
import.meta.env.PUBLIC_SITE_URL ??
  (import.meta.env.SITE ? String(import.meta.env.SITE) : "");

const BRAND = import.meta.env.PUBLIC_BRAND_NAME ?? "Horizon Conversion";
const REGION_LABEL = import.meta.env.PUBLIC_REGION_LABEL ?? "Sud Oise (60) / Nord 95";

const MAX_ITEMS = 250;

type Item = {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  guid?: string;
};

function abs(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function escapeXml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRssDate(d: Date) {
  return d.toUTCString();
}

// Convertit "YYYY-MM-DD" en Date (fallback: now)
function dateFromYmd(ymd?: string, fallback = new Date()) {
  if (!ymd) return fallback;
  const [y, m, d] = ymd.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return fallback;
  return new Date(Date.UTC(y, m - 1, d, 10, 0, 0));
}

function getVilleName(slug: string) {
  return villes.find((v) => v.slug === slug)?.name ?? slug;
}
function getMetierName(slug: string) {
  return metiers.find((m) => m.slug === slug)?.name ?? slug;
}
function getServiceName(mSlug: string, sSlug: string) {
  return services.find((s) => s.metier === mSlug && s.slug === sSlug)?.name ?? sSlug;
}

export const GET: APIRoute = async () => {
  if (!SITE_URL) {
    return new Response("Missing PUBLIC_SITE_URL in .env", { status: 500 });
  }

  const now = new Date();

  // Tri travaux du plus récent au plus ancien
  const travauxSorted = [...travaux].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  const items: Item[] = [];

  // Hub "Travaux" (pratique pour l’abonné RSS)
  items.push({
    title: `Travaux / Réalisations — ${BRAND}`,
    link: abs("/travaux/"),
    description: `Découvrez nos dernières interventions (${REGION_LABEL}).`,
    pubDate: new Date(now.getTime() - 60_000),
});

  // Items travaux
  travauxSorted.slice(0, MAX_ITEMS).forEach((t, idx) => {
    const vName = getVilleName(t.ville);
    const mName = getMetierName(t.metier);
    const sName = t.service ? getServiceName(t.metier, t.service) : "Service";

    const baseDate = dateFromYmd(t.date, now);

    const title = t.title ? String(t.title) : `${sName} à ${vName}`;
    const problem = t.problem ? String(t.problem) : "";
    const results = t.results ? String(t.results) : "";

    const desc = `${mName} à ${vName} — ${problem} → ${results}`
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);

    items.push({
      title: `${title} — ${mName} à ${vName}`,
      link: abs(`/travaux/${t.slug}/`),
      description: desc,
      pubDate: new Date(baseDate.getTime() - idx * 60_000),
  });

    // Bonus : liens connexes (utile pour l’utilisateur RSS)
    items.push({
      title: `${mName} à ${vName} — demander un devis`,
      link: abs(`/villes/${t.ville}/${t.metier}/`),
      description: `Voir les services fréquents et demander un devis pour ${mName} à ${vName}.`,
      pubDate: new Date(baseDate.getTime() - (idx * 60_000 + 10_000)),
  });

    if (t.service) {
      items.push({
        title: `${sName} à ${vName} — ${mName}`,
        link: abs(`/villes/${t.ville}/${t.metier}/${t.service}/`),
        description: `Page la plus précise : ${sName} à ${vName} (FAQ + demande de devis).`,
        pubDate: new Date(baseDate.getTime() - (idx * 60_000 + 20_000)),
    });
    }
  });

  // Tri final (sécurité) + limite
  const finalItems = items
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, MAX_ITEMS);

  const channelTitle = `${BRAND} — RSS Travaux / Réalisations`;
  const channelLink = abs("/travaux/");
  const channelDesc = `Derniers travaux publiés — ${REGION_LABEL}.`;

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
      "Cache-Control": "public, max-age=3600",
    },
  });
};
