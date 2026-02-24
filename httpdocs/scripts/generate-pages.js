// scripts/generate-pages.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Charger les données
const services = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/services.json'), 'utf-8'));
const metiers = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/metiers.json'), 'utf-8'));
const villes = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/villes.json'), 'utf-8'));

console.log('📊 Statistiques :');
console.log(`- ${services.length} services`);
console.log(`- ${metiers.length} métiers`);
console.log(`- ${villes.length} villes`);
console.log(`- ${services.length * metiers.length * villes.length} pages combinées au total`);

// Créer un fichier de test
const testDir = path.join(__dirname, '../src/pages/test');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// Générer une page de test avec les premières combinaisons
const firstService = services[0].id;
const firstMetier = metiers[0].id;
const firstVille = villes[0].id;

const testPage = `---
// Page de test générée automatiquement
// Cette page liste les premières combinaisons
import Layout from "../layouts/Layout.astro";
---

<Layout title="Test des combinaisons">
  <div class="container-custom py-8">
    <h1 class="text-3xl font-bold mb-4">Génération des pages</h1>
    
    <p class="mb-4">${services.length * metiers.length * villes.length} pages seront générées au build.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Premières combinaisons :</h2>
    
    <ul class="space-y-2">
      ${services.slice(0, 2).map(s =>
  metiers.slice(0, 2).map(m =>
    villes.slice(0, 3).map(v =>
      `<li><a href="/${s.id}/${m.id}/${v.id}" class="text-primary-600 hover:underline">/${s.id}/${m.id}/${v.id}/</a></li>`
    ).join('')
  ).join('')
).join('')}
    </ul>
  </div>
</Layout>`;

fs.writeFileSync(path.join(testDir, 'index.astro'), testPage);
console.log('✅ Page de test générée dans /test/');

// Mettre à jour package.json avec le script
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {
  ...packageJson.scripts,
  'generate:stats': 'node scripts/generate-pages.js',
  'build:full': 'npm run generate:stats && npm run build'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Scripts ajoutés à package.json');

console.log('\n🚀 Pour générer le site complet :');
console.log('npm run build:full');