// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import services from "../data/services.json";
import metiers from "../data/metiers.json";
import villes from "../data/villes.json";
import guides from "../data/guides.json";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://horizon-conversion.fr';
  const urls: string[] = [];
  const today = new Date().toISOString().split('T')[0];

  // 1. Pages statiques
  const staticPages = [
    '/', '/services/', '/metiers/', '/villes/',
    '/etudes-de-cas/', '/methodologie/', '/contact/',
    '/ressources/', '/ressources/blog/', '/ressources/guides/', '/ressources/faq/'
  ];
  staticPages.forEach(p => urls.push(`${baseUrl}${p}`));

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

  // 5. Pages combinées (CORRIGÉ avec /services/)
  services.forEach(s => {
    metiers.forEach(m => {
      villes.forEach(v => {
        urls.push(`${baseUrl}/services/${s.id}/${m.id}/${v.id}/`);
      });
    });
  });

  // 6. Pages d'urgence
  const metiersUrgence = ['artisans', 'commerces'];
  metiersUrgence.forEach(metierId => {
    villes.forEach(v => {
      urls.push(`${baseUrl}/urgence/${metierId}/${v.id}/`);
    });
  });

  // 7. Études de cas individuelles
  // À adapter selon ta structure (si tu as des fichiers individuels)
  const etudesCas = [
    'plombier-meru', 'electricien-beauvais', 'menuisier-chambly',
    'macon-creil', 'caviste-cergy', 'coiffeuse-argenteuil',
    'fleuriste-cergy', 'restaurateur-compiegne', 'avocat-montmorency',
    'medecin-senlis', 'notaire-chantilly', 'architecte-montmorency',
    'transport-compiegne', 'nettoyage-beauvais', 'garage-cergy',
    'franchise-cergy', 'hotel-chantilly', 'gite-senlis'
  ];
  etudesCas.forEach(e => {
    urls.push(`${baseUrl}/etudes-de-cas/${e}/`);
  });

  // 8. Guides individuels
  guides.forEach(g => {
    urls.push(`${baseUrl}/ressources/guides/${g.slug}/`);
  });

  // 9. Articles de blog (si tu en as)
  // À adapter selon ta structure
  const articles = [
    'seo-local-artisans-2025',
    'google-ads-petits-budgets',
    'avis-google-importance',
    'cro-pour-professions-liberales'
  ];
  articles.forEach(a => {
    urls.push(`${baseUrl}/ressources/blog/${a}/`);
  });

  // Fonction pour déterminer la priorité
  const getPriority = (url: string): string => {
    if (url === `${baseUrl}/`) return '1.0';
    if (url.includes('/services/') || url.includes('/metiers/') || url.includes('/villes/')) return '0.8';
    if (url.includes('/urgence/')) return '0.7';
    if (url.includes('/etudes-de-cas/')) return '0.7';
    if (url.includes('/ressources/')) return '0.6';
    return '0.5';
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${today}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${getPriority(url)}</priority>
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