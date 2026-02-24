// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import services from "../data/services.json";
import metiers from "../data/metiers.json";
import villes from "../data/villes.json";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://horizon-conversion.fr';

  const urls: string[] = [];

  // 1. Pages statiques
  urls.push(`${baseUrl}/`);
  urls.push(`${baseUrl}/services/`);
  urls.push(`${baseUrl}/metiers/`);
  urls.push(`${baseUrl}/villes/`);
  urls.push(`${baseUrl}/etudes-de-cas/`);
  urls.push(`${baseUrl}/methodologie/`);
  urls.push(`${baseUrl}/contact/`);

  // 2. Pages services individuels
  services.forEach(s => {
    urls.push(`${baseUrl}/services/${s.id}/`);
  });

  // 3. Pages métiers individuels
  metiers.forEach(m => {
    urls.push(`${baseUrl}/metiers/${m.id}/`);
  });

  // 4. Pages villes individuelles
  villes.forEach(v => {
    urls.push(`${baseUrl}/villes/${v.id}/`);
  });

  // 5. Pages combinées (576 pages)
  services.forEach(s => {
    metiers.forEach(m => {
      villes.forEach(v => {
        urls.push(`${baseUrl}/${s.id}/${m.id}/${v.id}/`);
      });
    });
  });

  // Générer le XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${url === `${baseUrl}/` ? '1.0' : url.includes('/services/') || url.includes('/metiers/') || url.includes('/villes/') ? '0.8' : '0.6'}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};