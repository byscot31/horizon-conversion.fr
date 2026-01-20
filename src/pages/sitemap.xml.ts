import type { APIRoute } from "astro";

import villes from "../data/villes.json";
import metiers from "../data/metiers.json";
import services from "../data/services.json";

const SITE_URL =
import.meta.env.PUBLIC_SITE_URL ??
    (import.meta.env.SITE ? String(import.meta.env.SITE) : "");

function abs(urlPath: string) {
    const base = SITE_URL.replace(/\/$/, "");
    const path = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
    return `${base}${path}`;
}

function xmlEscape(str: string) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async () => {
    if (!SITE_URL) {
        return new Response(
            "Missing PUBLIC_SITE_URL (ex: https://example.com) in .env",
            { status: 500 }
        );
    }

    const now = new Date().toISOString();

    const urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }> = [];

    // Pages “hubs” fixes
    urls.push(
        { loc: abs("/"), lastmod: now, changefreq: "weekly", priority: "1.0" },
        { loc: abs("/contact/"), lastmod: now, changefreq: "monthly", priority: "0.8" },
        { loc: abs("/villes/"), lastmod: now, changefreq: "weekly", priority: "0.8" },
        { loc: abs("/metiers/"), lastmod: now, changefreq: "weekly", priority: "0.7" }
    );

    // Métier global: /[metier]/
    for (const m of metiers) {
        urls.push({
            loc: abs(`/${m.slug}/`),
            lastmod: now,
            changefreq: "weekly",
            priority: "0.7",
        });
    }

    // On n’indexe QUE les villes priority A
    const villesA = villes.filter((v) => v.priority === "A");

    // /villes/[ville]/
    for (const v of villesA) {
        urls.push({
            loc: abs(`/villes/${v.slug}/`),
            lastmod: now,
            changefreq: "weekly",
            priority: "0.7",
        });
    }

    // /villes/[ville]/[metier]/
    for (const v of villesA) {
        for (const m of metiers) {
            urls.push({
                loc: abs(`/villes/${v.slug}/${m.slug}/`),
                lastmod: now,
                changefreq: "weekly",
                priority: "0.7",
            });
        }
    }

    // /villes/[ville]/[metier]/[service]/  (money pages: top services)
    const topServices = services.filter((s) => s.is_top === true);

    for (const v of villesA) {
        for (const m of metiers) {
            const svcs = topServices.filter((s) => s.metier === m.slug);
            for (const s of svcs) {
                urls.push({
                    loc: abs(`/villes/${v.slug}/${m.slug}/${s.slug}/`),
                    lastmod: now,
                    changefreq: "weekly",
                    priority: "0.9",
                });
            }
        }
    }

    const body =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
            .map((u) => {
                return (
                    `  <url>\n` +
                    `    <loc>${xmlEscape(u.loc)}</loc>\n` +
                    (u.lastmod ? `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>\n` : "") +
                    (u.changefreq ? `    <changefreq>${xmlEscape(u.changefreq)}</changefreq>\n` : "") +
                    (u.priority ? `    <priority>${xmlEscape(u.priority)}</priority>\n` : "") +
                    `  </url>\n`
                );
            })
            .join("") +
        `</urlset>\n`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
};
