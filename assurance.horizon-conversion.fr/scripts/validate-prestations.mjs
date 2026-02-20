import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dir = path.join(root, "src", "data", "prestations");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

if (!fs.existsSync(dir)) fail(`Dossier introuvable: ${dir}`);

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json") && f !== "index.json" && f !== "declinaisons-metiers.json");

if (!files.length) fail(`Aucun fichier prestation trouvé dans ${dir}`);

const errors = [];

for (const file of files) {
  const fp = path.join(dir, file);
  let data;
  try {
    data = readJson(fp);
  } catch (e) {
    errors.push(`${file}: JSON invalide (${e.message})`);
    continue;
  }

  const id = data?.id ?? "(id manquant)";
  const slug = data?.slug ?? "(slug manquant)";
  const shortLabel = data?.shortLabel;

  if (typeof shortLabel !== "string" || !shortLabel.trim()) {
    errors.push(`${file} [${id} | ${slug}] → shortLabel manquant ou vide`);
  } else if (shortLabel.trim().length > 30) {
    errors.push(`${file} [${id} | ${slug}] → shortLabel trop long (>30): "${shortLabel}"`);
  }
}

if (errors.length) {
  console.error("\n❌ Validation prestations échouée :\n");
  for (const e of errors) console.error(`- ${e}`);
  console.error("\n➡️ Ajoute shortLabel dans chaque fichier JSON prestation (ex: \"Google Ads\", \"SEO local\", \"CRO\").\n");
  process.exit(1);
}

console.log(`✅ Validation prestations OK (${files.length} fichiers)`);