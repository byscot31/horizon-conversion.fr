// scripts/audit-maillage.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, '../dist'); // Dossier de build

// URLs de base
const BASE_URL = 'https://horizon-conversion.fr';
const PAGES_A_TESTER = [
  '/',
  '/services/',
  '/metiers/',
  '/villes/',
  '/contact',
  '/methodologie',
  '/etudes-de-cas/',
];

// Charger les données pour générer des pages à tester
function loadData() {
  try {
    const services = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/services.json'), 'utf-8'));
    const metiers = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/metiers.json'), 'utf-8'));
    const villes = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/villes.json'), 'utf-8'));
    return { services, metiers, villes };
  } catch (e) {
    console.error('❌ Impossible de charger les données:', e.message);
    return { services: [], metiers: [], villes: [] };
  }
}

// Générer un échantillon de pages combinées à tester
function generateSamplePages(services, metiers, villes, sampleSize = 20) {
  const pages = [];
  for (let i = 0; i < sampleSize; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const metier = metiers[Math.floor(Math.random() * metiers.length)];
    const ville = villes[Math.floor(Math.random() * villes.length)];
    if (service && metier && ville) {
      pages.push(`/${service.id}/${metier.id}/${ville.id}/`);
    }
  }
  return [...new Set(pages)]; // Éliminer les doublons
}

// Vérifier si une page existe dans le build
function pageExists(urlPath) {
  const filePath = path.join(PAGES_DIR, urlPath, 'index.html');
  return fs.existsSync(filePath);
}

// Compter les liens sortants dans un fichier HTML
function countOutboundLinks(html, currentUrl) {
  const linkRegex = /href="([^"]+)"/g;
  const matches = [...html.matchAll(linkRegex)];
  const links = matches.map(m => m[1])
    .filter(href =>
      href.startsWith('/') && // Lien interne
      !href.startsWith('//') &&
      href !== '#' &&
      href !== currentUrl // Pas le même lien
    );
  return [...new Set(links)]; // URLs uniques
}

// Vérifier si une page a des backlinks
function hasBacklinks(html, targetUrl) {
  const count = (html.match(new RegExp(`href="${targetUrl}"`, 'g')) || []).length;
  return count > 0;
}

// Audit principal
async function runAudit() {
  console.log('\n🔍 AUDIT DU MAILLAGE INTERNE');
  console.log('============================\n');

  const { services, metiers, villes } = loadData();
  const pagesToTest = [
    ...PAGES_A_TESTER,
    ...generateSamplePages(services, metiers, villes, 15)
  ];

  console.log(`📊 Pages à analyser : ${pagesToTest.length}\n`);

  const results = {
    pagesSansLiensSortants: [],
    pagesSansBacklinks: [],
    pagesOrphelines: [],
    pages404: [],
    liensExternes: [],
    stats: {
      totalLiensInternes: 0,
      totalPagesAnalysees: 0
    }
  };

  for (const urlPath of pagesToTest) {
    process.stdout.write(`Analyse de ${urlPath}... `);

    if (!pageExists(urlPath)) {
      console.log('❌ 404');
      results.pages404.push(urlPath);
      continue;
    }

    results.stats.totalPagesAnalysees++;

    const html = fs.readFileSync(path.join(PAGES_DIR, urlPath, 'index.html'), 'utf-8');

    // Compter les liens sortants
    const outboundLinks = countOutboundLinks(html, urlPath);
    results.stats.totalLiensInternes += outboundLinks.length;

    if (outboundLinks.length === 0) {
      results.pagesSansLiensSortants.push(urlPath);
      console.log(`⚠️ 0 lien sortant`);
    } else {
      console.log(`✅ ${outboundLinks.length} liens sortants`);
    }

    // Vérifier les backlinks (sera fait après)
    results.pagesSansBacklinks[urlPath] = false;
  }

  // Deuxième passe : vérifier les backlinks
  console.log('\n🔄 Vérification des backlinks...\n');

  for (const urlPath of pagesToTest) {
    if (results.pages404.includes(urlPath)) continue;

    const html = fs.readFileSync(path.join(PAGES_DIR, urlPath, 'index.html'), 'utf-8');

    for (const targetPath of pagesToTest) {
      if (targetPath === urlPath) continue;
      if (hasBacklinks(html, targetPath)) {
        results.pagesSansBacklinks[targetPath] = true;
      }
    }
  }

  // Identifier les pages orphelines
  results.pagesOrphelines = pagesToTest.filter(p =>
    !results.pages404.includes(p) &&
    !results.pagesSansBacklinks[p]
  );

  // Rapport
  console.log('\n📈 RAPPORT D\'AUDIT');
  console.log('==================\n');

  console.log(`✅ Pages analysées : ${results.stats.totalPagesAnalysees}`);
  console.log(`🔗 Total liens internes : ${results.stats.totalLiensInternes}`);
  console.log(`📊 Moyenne liens par page : ${(results.stats.totalLiensInternes / results.stats.totalPagesAnalysees).toFixed(2)}\n`);

  if (results.pages404.length > 0) {
    console.log('❌ PAGES 404 (à créer) :');
    results.pages404.forEach(p => console.log(`   - ${p}`));
    console.log();
  }

  if (results.pagesSansLiensSortants.length > 0) {
    console.log('⚠️ PAGES SANS LIENS SORTANTS :');
    results.pagesSansLiensSortants.forEach(p => console.log(`   - ${p}`));
    console.log('   → Ces pages ne pointent vers aucune autre page. Ajoutez des liens vers des pages connexes.\n');
  }

  if (results.pagesOrphelines.length > 0) {
    console.log('🕳️ PAGES ORPHELINES (aucune page ne pointe vers elles) :');
    results.pagesOrphelines.forEach(p => console.log(`   - ${p}`));
    console.log('   → Ces pages ne sont accessibles depuis aucun lien interne. Ajoutez des liens depuis d\'autres pages.\n');
  }

  // Recommandations
  console.log('💡 RECOMMANDATIONS');
  console.log('==================\n');

  if (results.pagesSansLiensSortants.length > 0) {
    console.log('• Ajoutez des liens vers :');
    console.log('  - Les études de cas correspondantes');
    console.log('  - Les pages de services complémentaires');
    console.log('  - Les guides et ressources\n');
  }

  if (results.pagesOrphelines.length > 0) {
    console.log('• Rendez ces pages accessibles depuis :');
    console.log('  - Les pages hubs correspondantes');
    console.log('  - Le menu principal (si pertinent)');
    console.log('  - Le footer\n');
  }

  console.log('• Vérifiez que chaque page a au minimum :');
  console.log('  - 1 lien vers le hub de sa catégorie');
  console.log('  - 1 lien vers une étude de cas');
  console.log('  - 1 lien vers la page contact\n');
}

runAudit().catch(console.error);