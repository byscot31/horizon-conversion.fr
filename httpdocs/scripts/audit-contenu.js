// scripts/audit-contenu.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, '../dist');
const SAMPLE_SIZE = 50; // Nombre de pages à analyser

// Charger les données
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

// Générer un échantillon varié de pages
function generateSamplePages(services, metiers, villes) {
  const pages = [];

  // Pages combinées variées
  for (let i = 0; i < SAMPLE_SIZE; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const metier = metiers[Math.floor(Math.random() * metiers.length)];
    const ville = villes[Math.floor(Math.random() * villes.length)];
    if (service && metier && ville) {
      pages.push({
        url: `/${service.id}/${metier.id}/${ville.id}/`,
        type: 'combinee',
        service: service.id,
        metier: metier.id,
        ville: ville.id
      });
    }
  }

  // Pages d'urgence
  const metiersUrgence = ['artisans', 'commerces'];
  for (const metier of metiers.filter(m => metiersUrgence.includes(m.id))) {
    for (let i = 0; i < 3; i++) {
      const ville = villes[Math.floor(Math.random() * villes.length)];
      pages.push({
        url: `/urgence/${metier.id}/${ville.id}/`,
        type: 'urgence',
        metier: metier.id,
        ville: ville.id
      });
    }
  }

  // Pages de comparaison
  for (let i = 0; i < 5; i++) {
    const metier = metiers[Math.floor(Math.random() * metiers.length)];
    const ville = villes[Math.floor(Math.random() * villes.length)];
    pages.push({
      url: `/urgence/comparer/${metier.id}/${ville.id}/`,
      type: 'comparaison',
      metier: metier.id,
      ville: ville.id
    });
  }

  return [...new Map(pages.map(p => [p.url, p])).values()]; // Éliminer doublons
}

// Extraire le contenu textuel d'un HTML
function extractTextContent(html) {
  // Supprimer les balises script et style
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

  // Supprimer toutes les balises HTML
  html = html.replace(/<[^>]*>/g, ' ');

  // Normaliser les espaces
  html = html.replace(/\s+/g, ' ').trim();

  return html;
}

// Calculer la similarité entre deux textes (Jaccard)
function calculateSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(w => w.length > 3));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

// Générer une empreinte du contenu
function getContentFingerprint(text) {
  const words = text.toLowerCase().split(/\s+/)
    .filter(w => w.length > 3)
    .sort()
    .slice(0, 50); // Top 50 mots
  return createHash('md5').update(words.join('')).digest('hex');
}

// Audit principal
async function runAudit() {
  console.log('\n📝 AUDIT DE CONTENU (THIN / DUPLICATE)');
  console.log('=====================================\n');

  const { services, metiers, villes } = loadData();
  const pagesToTest = generateSamplePages(services, metiers, villes);

  console.log(`📊 Pages à analyser : ${pagesToTest.length}\n`);

  const results = {
    thinContent: [],
    duplicateContent: [],
    intentionsVerify: {},
    stats: {
      totalMots: 0,
      minMots: Infinity,
      maxMots: 0
    }
  };

  const pageContents = [];

  for (const page of pagesToTest) {
    process.stdout.write(`Analyse de ${page.url}... `);

    const filePath = path.join(PAGES_DIR, page.url, 'index.html');
    if (!fs.existsSync(filePath)) {
      console.log('❌ 404');
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');
    const text = extractTextContent(html);
    const wordCount = text.split(/\s+/).length;

    pageContents.push({
      ...page,
      text,
      wordCount,
      fingerprint: getContentFingerprint(text)
    });

    results.stats.totalMots += wordCount;
    results.stats.minMots = Math.min(results.stats.minMots, wordCount);
    results.stats.maxMots = Math.max(results.stats.maxMots, wordCount);

    console.log(`✅ ${wordCount} mots`);

    // Vérifier thin content
    if (wordCount < 300) {
      results.thinContent.push({
        url: page.url,
        mots: wordCount,
        type: page.type
      });
    }
  }

  // Détection du duplicate content
  console.log('\n🔄 Analyse des similarités...\n');

  for (let i = 0; i < pageContents.length; i++) {
    for (let j = i + 1; j < pageContents.length; j++) {
      const p1 = pageContents[i];
      const p2 = pageContents[j];

      // Même type mais pas même métier/ville
      if (p1.type === p2.type &&
        (p1.metier !== p2.metier || p1.ville !== p2.ville)) {

        const similarity = calculateSimilarity(p1.text, p2.text);

        if (similarity > 0.7) {
          results.duplicateContent.push({
            page1: p1.url,
            page2: p2.url,
            similarity: Math.round(similarity * 100) + '%',
            type: p1.type
          });
        }
      }
    }
  }

  // Vérification des intentions
  console.log('\n🎯 VÉRIFICATION DES INTENTIONS');
  console.log('=============================\n');

  for (const page of pageContents) {
    if (page.type === 'urgence') {
      const aDesMotsUrgence = /urgence|immédiat|appeler|dépannage|intervention/i.test(page.text);
      const aDesCtaUrgence = /appeler|rappel|30 min|24h/i.test(page.text);

      results.intentionsVerify[page.url] = {
        urgence: {
          motsUrgence: aDesMotsUrgence,
          ctaUrgence: aDesCtaUrgence,
          ok: aDesMotsUrgence && aDesCtaUrgence
        }
      };
    }

    if (page.type === 'comparaison') {
      const aDesMotsComparaison = /comparer|devis|tarifs|prix|vs|versus/i.test(page.text);
      results.intentionsVerify[page.url] = {
        comparaison: {
          motsComparaison: aDesMotsComparaison,
          ok: aDesMotsComparaison
        }
      };
    }
  }

  // RAPPORT
  console.log('\n📊 RAPPORT D\'AUDIT');
  console.log('==================\n');

  console.log(`📊 Statistiques générales :`);
  console.log(`   - Moyenne mots/page : ${Math.round(results.stats.totalMots / pageContents.length)}`);
  console.log(`   - Min mots/page : ${results.stats.minMots}`);
  console.log(`   - Max mots/page : ${results.stats.maxMots}\n`);

  if (results.thinContent.length > 0) {
    console.log('⚠️ PAGES AVEC THIN CONTENT (< 300 mots) :');
    results.thinContent.forEach(p => {
      console.log(`   - ${p.url} (${p.mots} mots) [${p.type}]`);
    });
    console.log('   → Ajoutez du contenu : description détaillée, avantages, exemples, FAQ.\n');
  } else {
    console.log('✅ Aucun thin content détecté !\n');
  }

  if (results.duplicateContent.length > 0) {
    console.log('🔄 PAGES AVEC CONTENU DUPLIQUÉ (similarité > 70%) :');
    results.duplicateContent.slice(0, 10).forEach(d => {
      console.log(`   - ${d.page1} ↔ ${d.page2}`);
      console.log(`     Similarité : ${d.similarity} [${d.type}]`);
      console.log(`     → Ajoutez du contenu unique : histoire du persona, statistiques locales, témoignages.\n`);
    });
    if (results.duplicateContent.length > 10) {
      console.log(`   ... et ${results.duplicateContent.length - 10} autres paires.`);
    }
  } else {
    console.log('✅ Aucun contenu dupliqué détecté !\n');
  }

  console.log('🎯 VÉRIFICATION DES INTENTIONS');
  console.log('----------------------------\n');

  let okUrgence = 0, totalUrgence = 0;
  let okComparaison = 0, totalComparaison = 0;

  for (const [url, intentions] of Object.entries(results.intentionsVerify)) {
    if (intentions.urgence) {
      totalUrgence++;
      if (intentions.urgence.ok) okUrgence++;
      else {
        console.log(`⚠️ Page d'urgence sans marqueurs forts : ${url}`);
        console.log(`   → Mots urgence: ${intentions.urgence.motsUrgence ? '✅' : '❌'}, CTA urgence: ${intentions.urgence.ctaUrgence ? '✅' : '❌'}`);
      }
    }
    if (intentions.comparaison) {
      totalComparaison++;
      if (intentions.comparaison.ok) okComparaison++;
      else {
        console.log(`⚠️ Page de comparaison sans marqueurs : ${url}`);
      }
    }
  }

  console.log(`\n📊 Intentions :`);
  console.log(`   - Urgence : ${okUrgence}/${totalUrgence} OK`);
  console.log(`   - Comparaison : ${okComparaison}/${totalComparaison} OK\n`);

  // Recommandations finales
  console.log('💡 RECOMMANDATIONS');
  console.log('==================\n');

  if (results.thinContent.length > 0) {
    console.log('• Pour le thin content :');
    console.log('  - Ajoutez une section "Pourquoi nous choisir"');
    console.log('  - Intégrez des témoignages clients');
    console.log('  - Développez une FAQ spécifique à la combinaison');
    console.log('  - Ajoutez des données locales (statistiques, spécificités)\n');
  }

  if (results.duplicateContent.length > 0) {
    console.log('• Pour le duplicate content :');
    console.log('  - Personnalisez l\'histoire du persona pour chaque métier/ville');
    console.log('  - Ajoutez des exemples locaux concrets');
    console.log('  - Intégrez des données spécifiques (prix, délais, spécificités)');
    console.log('  - Variez la structure des sections selon l\'intention\n');
  }

  const urgenceOkRate = okUrgence / totalUrgence;
  if (urgenceOkRate < 0.8) {
    console.log('• Pour les pages d\'urgence :');
    console.log('  - Renforcez les mots-clés d\'urgence dans les titres');
    console.log('  - Ajoutez un compteur d\'urgence dynamique');
    console.log('  - Mettez en avant le numéro de téléphone plus visiblement\n');
  }

  const comparaisonOkRate = okComparaison / totalComparaison;
  if (comparaisonOkRate < 0.8) {
    console.log('• Pour les pages de comparaison :');
    console.log('  - Ajoutez un tableau comparatif clair');
    console.log('  - Intégrez des témoignages clients');
    console.log('  - Proposez des études de cas correspondantes\n');
  }
}

runAudit().catch(console.error);