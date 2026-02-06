import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "hc-animaux-knowledge-pack.yaml");

const OUT = {
  services: path.join(ROOT, "src", "content", "services"),
  metiers: path.join(ROOT, "src", "content", "metiers"),
  zones: path.join(ROOT, "src", "content", "zones"),
  hubs: path.join(ROOT, "src", "content", "hubs"),
};

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileSafe(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✓", path.relative(ROOT, filePath));
}

function compactPhone(phoneCompact) {
  return phoneCompact || "0660921008";
}

function fillPattern(str, vars) {
  if (!str) return "";
  return str
    .replaceAll("{phone}", vars.phone || "")
    .replaceAll("{phone_compact}", vars.phone_compact || "")
    .replaceAll("{zone}", vars.zone || "")
    .replaceAll("{ville}", vars.ville || "")
    .replaceAll("{metier}", vars.metier || "");
}

function frontmatter(obj) {
  // YAML frontmatter minimal (sans dépendance)
  // Échappe les ":" et guillemets si nécessaire.
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) {
        if (typeof item === "object") {
          lines.push(`  - q: "${String(item.q).replaceAll('"', '\\"')}"`);
          lines.push(`    a: "${String(item.a).replaceAll('"', '\\"')}"`);
        } else {
          lines.push(`  - "${String(item).replaceAll('"', '\\"')}"`);
        }
      }
    } else if (typeof v === "string") {
      lines.push(`${k}: "${v.replaceAll('"', '\\"')}"`);
    } else if (typeof v === "boolean") {
      lines.push(`${k}: ${v ? "true" : "false"}`);
    } else if (v == null) {
      // ignore
    } else {
      lines.push(`${k}: "${String(v).replaceAll('"', '\\"')}"`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function mdBody({ pageType, label, dept, around = [], pains = [], intent = "" }) {
  const lines = [];

  if (pageType === "prestation") {
    lines.push(`## Résultat visé`);
    lines.push(`Plus de demandes qualifiées en local, avec une méthode trackée et des livrables clairs.`);
    lines.push(``);
    lines.push(`## Ce qu’on met en place`);
    lines.push(`- Audit (SEO/Maps/Ads) + plan d’action priorisé`);
    lines.push(`- Structure 1 intention = 1 page (pages service / métier / ville)`);
    lines.push(`- Tracking conversions (appels, formulaires, RDV)`);
    lines.push(`- Optimisations régulières + reporting`);
    lines.push(``);
    lines.push(`## Livrables`);
    lines.push(`- Checklists d’actions + priorités`);
    lines.push(`- Recos sémantiques + maillage interne`);
    lines.push(`- Paramétrage events GA4 via GTM`);
    lines.push(`- Reporting simple (ce qui progresse / ce qui bloque / next actions)`);
  }

  if (pageType === "metier") {
    lines.push(`## Problèmes typiques`);
    if (pains.length) {
      pains.forEach((p) => lines.push(`- ${p}`));
    } else {
      lines.push(`- Visibilité locale insuffisante sur Google`);
      lines.push(`- Demandes irrégulières ou peu qualifiées`);
      lines.push(`- Concurrence locale agressive`);
    }
    lines.push(``);
    lines.push(`## Approche recommandée`);
    lines.push(`- Google Maps (GBP) : catégories/services, contenus, photos, posts, suivi appels/itinéraires`);
    lines.push(`- SEO local : pages intention, FAQ, maillage, preuves alternatives`);
    lines.push(`- Ads (si besoin de volume rapide) : mots-clés rentables + landing dédiée + exclusions`);
    lines.push(``);
    lines.push(`## Ce que vous recevez`);
    lines.push(`- Plan d’action priorisé + livrables clairs`);
    lines.push(`- Tracking GA4/GTM des conversions`);
    lines.push(`- Optimisations continues (pas “one shot”)`);
  }

  if (pageType === "ville") {
    lines.push(`## Contexte local`);
    lines.push(
      `${label} (${dept}) : la concurrence se joue souvent sur Google Maps + pages qui répondent exactement à l’intention (service/métier/ville).`
    );
    lines.push(``);
    lines.push(`## Interventions à ${label} et autour`);
    if (around.length) {
      lines.push(
        `Nous intervenons à ${label} et autour : ${around.join(", ")} (sans créer de pages “alentours” dédiées).`
      );
    } else {
      lines.push(`Nous intervenons à ${label} et sur les communes proches, selon le besoin.`);
    }
    lines.push(``);
    lines.push(`## Ce qu’on met en place`);
    lines.push(`- Audit visibilité locale (SEO + Maps + Ads si nécessaire)`);
    lines.push(`- Pages 1 intention = 1 page (services / métiers / ville)`);
    lines.push(`- Tracking conversions (appels, formulaires, RDV)`);
    lines.push(`- Itérations + reporting`);
    lines.push(``);
    lines.push(`## Prochaine étape`);
    lines.push(`Demander un audit local : on vous dit quoi faire en priorité, et quoi ignorer.`);
  }

  return lines.join("\n");
}

function build() {
  const raw = fs.readFileSync(INPUT, "utf8");
  const data = yaml.load(raw);

  const phoneCompactVal = compactPhone(data?.utils?.phone_compact);
  const varsBase = {
    phone: data?.brand?.phone || "06 60 92 10 08",
    phone_compact: phoneCompactVal,
  };

  // dirs
  Object.values(OUT).forEach(ensureDir);

  // Hubs optionnels (si tu veux des contenus hub en collection)
  if (data?.pages?.hubs?.length) {
    for (const hub of data.pages.hubs) {
      const slug = hub.slug;
      const fm = frontmatter({
        slug,
        title: hub.title,
        h1: hub.h1,
        intent: hub.intent,
        pageType: "hub",
      });

      const body = `## Objectif\n${hub.intent}\n\n## Navigation\n- Prestations\n- Métiers\n- Zones\n\n## Contact\n**${data.brand.company}** — ${data.brand.phone} — ${data.brand.email}\n`;

      writeFileSafe(path.join(OUT.hubs, `${slug}.md`), `${fm}\n${body}`);
    }
  }

  // Prestations
  if (data?.pages?.prestations?.length) {
    for (const s of data.pages.prestations) {
      const slug = s.slug;
      const zone = "Sud Oise (60) & Val d’Oise (95)";

      const title = fillPattern(s.title_pattern, { ...varsBase, zone });
      const description = fillPattern(s.meta_pattern, { ...varsBase, zone });
      const h1 = fillPattern(s.h1_pattern, { ...varsBase, zone });

      const fm = frontmatter({
        id: s.id,
        slug,
        label: s.label,
        pageType: "prestation",
        title,
        description,
        h1,
        faq: s.faq || [],
      });

      const body = mdBody({ pageType: "prestation", label: s.label });
      writeFileSafe(path.join(OUT.services, `${slug}.md`), `${fm}\n${body}\n`);
    }
  }

  // Métiers (depuis priorities.metiers)
  if (data?.priorities?.metiers?.length) {
    for (const m of data.priorities.metiers) {
      const slug = m.id;
      const zone = "Sud Oise (60) & Val d’Oise (95)";

      const title = `${m.label} : acquisition locale en ${zone} | ${data.brand.company}`;
      const description = `SEO local, Google Maps, Ads : plus de demandes qualifiées pour ${m.label} en 60/95. Audit rapide. ${data.brand.phone}.`;
      const h1 = `Acquisition locale pour ${m.label} en 60/95`;

      const faq = [
        {
          q: `Qu’est-ce qui marche le mieux pour ${m.label} en local ?`,
          a: `Un mix Google Maps + pages “intention” + tracking. On ajoute Ads si vous voulez du volume plus vite.`,
        },
        {
          q: `Peut-on avancer même sans avis ?`,
          a: `Oui : structure, contenu utile, preuves alternatives et optimisation Maps permettent d’obtenir des signaux rapidement.`,
        },
      ];

      const fm = frontmatter({
        id: m.id,
        slug,
        label: m.label,
        pageType: "metier",
        title,
        description,
        h1,
        faq,
      });

      const body = mdBody({
        pageType: "metier",
        pains: m.typical_pains || [],
        intent: m.intent_primary || "",
      });

      writeFileSafe(path.join(OUT.metiers, `${slug}.md`), `${fm}\n${body}\n`);
    }
  }

  // Zones (villes) depuis priorities.zones.*
  const zones = data?.priorities?.zones || {};
  for (const [zoneKey, zoneObj] of Object.entries(zones)) {
    const villes = zoneObj?.villes || [];
    for (const v of villes) {
      const slug = v.id;
      const label = v.label;
      const dept = v.dept;

      const title = `Acquisition locale à ${label} | ${data.brand.company}`;
      const description = `SEO local, Google Maps, Google Ads : plus de demandes qualifiées à ${label} (${dept}). Audit rapide. ${data.brand.phone}.`;
      const h1 = `Acquisition locale à ${label} pour professionnels des animaux`;

      const faq = [
        {
          q: `Intervenez-vous aussi en dehors de ${label} ?`,
          a: v.around?.length
            ? `Oui : ${v.around.join(", ")}, et plus largement en ${zoneObj.label} selon le besoin.`
            : `Oui, selon la zone et le besoin.`,
        },
        {
          q: `Faites-vous des pages pour chaque commune autour ?`,
          a: `Non : on regroupe les communes proches dans cette page pour rester utile et éviter les pages “clones”.`,
        },
      ];

      const fm = frontmatter({
        id: v.id,
        slug,
        label,
        dept,
        pageType: "ville",
        optional: !!v.optional,
        title,
        description,
        h1,
        around: v.around || [],
        faq,
      });

      const body = mdBody({
        pageType: "ville",
        label,
        dept,
        around: v.around || [],
      });

      writeFileSafe(path.join(OUT.zones, `${slug}.md`), `${fm}\n${body}\n`);
    }
  }

  console.log("\n✅ Génération terminée.");
}

build();