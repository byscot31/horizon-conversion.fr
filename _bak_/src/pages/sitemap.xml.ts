import type { APIRoute } from "astro";

import villes from "../data/villes.json";
import metiers from "../data/metiers.json";
import services from "../data/services.json";
import travaux from "../data/travaux.json";
import avis from "../data/avis.json";

const SITE_URL =
import.meta.env.PUBLIC_SITE_URL ??
  (import.meta.env.SITE ? String(import.meta.env.SITE) : "");

function abs(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function urlEntry(
  loc: string,
  lastmod?: string,
  changefreq?: string,
  priority?: string
) {
  const parts = [
    `<url>`,
    `<loc>${loc}</loc>`,
    lastmod ? `<lastmod>${lastmod}</lastmod>` : "",
    changefreq ? `<changefreq>${changefreq}</changefreq>` : "",
    priority ? `<priority>${priority}</priority>` : "",
    `</url>`,
  ].filter(Boolean);
  return parts.join("");
}

export const GET: APIRoute = async () => {
  if (!SITE_URL)
    return new Response("Missing PUBLIC_SITE_URL in .env", { status: 500 });

  const urls: string[] = [];

  // Hubs B2C
  urls.push(abs("/"));
  urls.push(abs("/metiers/"));
  urls.push(abs("/villes/"));
  urls.push(abs("/travaux/"));
  urls.push(abs("/avis/"));
  urls.push(abs("/contact/"));
  urls.push(abs("/urgence/"));

  // Hubs / pages PRO (B2B)
  urls.push(abs("/pro/"));
  urls.push(abs("/pro/seo-local/"));
  urls.push(abs("/pro/google-ads/"));
  urls.push(abs("/pro/cro/"));
  urls.push(abs("/pro/contact/"));
  urls.push(abs("/pro/temoignages/"));
  urls.push(abs("/pro/realisations/"));

  // Pages métiers /[metier]/
  for (const m of metiers) {
    urls.push(abs(`/${m.slug}/`));
  }

  // Pages villes /villes/[ville]/
  for (const v of villes) {
    urls.push(abs(`/villes/${v.slug}/`));
  }

  // Pages ville×métier /villes/[ville]/[metier]/
  for (const v of villes) {
    for (const m of metiers) {
      urls.push(abs(`/villes/${v.slug}/${m.slug}/`));
    }
  }

  // Pages service×ville /villes/[ville]/[metier]/[service]/
  // -> top services seulement pour ne pas exploser la volumétrie
  const topServices = services.filter((s) => s.is_top === true);

  for (const v of villes) {
    for (const m of metiers) {
      const svcs = topServices.filter((s) => s.metier === m.slug);
      for (const s of svcs) {
        urls.push(abs(`/villes/${v.slug}/${m.slug}/${s.slug}/`));
      }
    }
  }

  // Travaux: /travaux/[slug]/
  for (const t of travaux) {
    urls.push(abs(`/travaux/${t.slug}/`));
  }

  // Avis: /avis/[id]/
  for (const a of avis) {
    urls.push(abs(`/avis/${a.id}/`));
  }

  // Dédup au cas où
  const uniq = Array.from(new Set(urls));

  // XML
  const now = new Date().toISOString().slice(0, 10);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    uniq
      .map((loc) => {
        const isHome = loc === abs("/");

        // hubs B2C
        const isHubB2C = /\/(metiers|villes|travaux|avis)\/$/.test(loc);

        // PRO
        const isProHome = /\/pro\/$/.test(loc);
        const isProOffer = /\/pro\/(seo-local|google-ads|cro)\/$/.test(loc);
        const isProSupport = /\/pro\/(contact|temoignages|realisations)\/$/.test(loc);

        let priority = "0.6";
        let changefreq = "monthly";

        if (isHome) {
          priority = "1.0";
          changefreq = "daily";
        } else if (isHubB2C) {
          priority = "0.8";
          changefreq = "weekly";
        } else if (isProHome) {
          priority = "0.9";
          changefreq = "weekly";
        } else if (isProOffer) {
          priority = "0.8";
          changefreq = "monthly";
        } else if (isProSupport) {
          priority = "0.7";
          changefreq = "monthly";
        }

        return urlEntry(loc, now, changefreq, priority);
      })
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
