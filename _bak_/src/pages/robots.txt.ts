import type { APIRoute } from "astro";

const SITE_URL =
import.meta.env.PUBLIC_SITE_URL ??
    (import.meta.env.SITE ? String(import.meta.env.SITE) : "");

export const GET: APIRoute = async () => {
    if (!SITE_URL) {
        return new Response("Missing PUBLIC_SITE_URL in .env", { status: 500 });
    }

    const base = SITE_URL.replace(/\/$/, "");

    const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml

# Optionnel : bloquer des pages techniques
Disallow: /_astro/
Disallow: /api/
`;

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
};
