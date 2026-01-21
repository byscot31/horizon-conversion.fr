/**
 * src/pages/rss-avis.xml.ts
 *
 * Flux RSS dédié aux avis clients (uniquement).
 * URL finale : /rss-avis.xml
 *
 * Objectif :
 * - Permettre aux internautes / outils de s’abonner aux derniers avis publiés.
 * - Flux léger, trié du plus récent au plus ancien, avec échappement XML.
 */

import type { APIRoute } from "astro";

import villes from "../data/villes.json";
import metiers from "../data/metiers.json";
import services from "../data/services.json";
import avis from "../data/avis.json";

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

  // Tri avis du plus récent au plus ancien
  const avisSorted = [...avis].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  const items: Item[] = [];

  // Hub "Avis" (pratique pour l’abonné RSS)
  items.push({
    title: `Avis clients — ${BRAND}`,
    link: abs("/avis/"),
    description: `Consultez les derniers avis clients (${REGION_LABEL}).`,
    pubDate: new Date(now.getTime() - 60_000),
});

  // Items avis
  avisSorted.slice(0, MAX_ITEMS).forEach((r, idx) => {
    const vName = getVilleName(r.ville);
    const mName = getMetierName(r.metier);
    const sName = getServiceName(r.metier, r.service);

    const baseDate = dateFromYmd(r.date, now);

    const rating = r.rating ?? "—";
    const author = r.author ? String(r.author) : "Client";
    const text = r.text ? String(r.text) : "";

    // Description courte (RSS)
    const desc = `${author} (${rating}/5) — ${text}`.replace(/\s+/g, " ").trim().slice(0, 220);

    items.push({
      title: `Avis ${rating}/5 — ${mName} à ${vName} (${sName})`,
      link: abs(`/avis/${r.id}/`),
      description: desc,
      pubDate: new Date(baseDate.getTime() - idx * 60_000),
  });
  });

  // Tri final (sécurité) + limite
  const finalItems = items
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, MAX_ITEMS);

  const channelTitle = `${BRAND} — RSS Avis clients`;
  const channelLink = abs("/avis/");
  const channelDesc = `Derniers avis clients publiés — ${REGION_LABEL}.`;

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
