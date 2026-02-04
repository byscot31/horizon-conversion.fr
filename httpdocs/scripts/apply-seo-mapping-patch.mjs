/**
 * Apply patch to src/data/seo-mapping.json:
 * - Convert legacy "faq" (string list) into "faqRefs" for selected pages by id
 * - Add missing business pages (/services, /villes, /cibles)
 * - Normalize linksOut (trailingSlash: never)
 *
 * Usage:
 *   node scripts/apply-seo-mapping-patch.mjs
 *
 * Files:
 *   - input:  src/data/seo-mapping.json
 *   - patch:  scripts/seo-mapping.patch.config.json
 *   - output: src/data/seo-mapping.json (overwrites)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "src", "data", "seo-mapping.json");
const PATCH = path.join(ROOT, "scripts", "seo-mapping.patch.config.json");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function normalizeUrlNeverSlash(u) {
  if (!u) return u;
  if (u === "/") return "/";
  // remove trailing slash
  return u.endsWith("/") ? u.slice(0, -1) : u;
}

function normalizeLinksOutArray(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  const seen = new Set();
  for (const x of arr) {
    if (typeof x !== "string") continue;
    const n = normalizeUrlNeverSlash(x.trim());
    if (!n) continue;
    if (!seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
}

function findPageIndex(pages, predicate) {
  return pages.findIndex((p) => p && predicate(p));
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`❌ Missing: ${INPUT}`);
    process.exit(1);
  }
  if (!fs.existsSync(PATCH)) {
    console.error(`❌ Missing: ${PATCH}`);
    process.exit(1);
  }

  const mapping = readJson(INPUT);
  const patch = readJson(PATCH);

  if (!mapping || typeof mapping !== "object") {
    console.error("❌ seo-mapping.json is not a JSON object");
    process.exit(1);
  }

  const pages = Array.isArray(mapping.pages) ? mapping.pages : (mapping.pages = []);

  // 1) Ensure trailingSlash never on urls + linksOut
  for (const p of pages) {
    if (!p || typeof p !== "object") continue;
    if (typeof p.url === "string") p.url = normalizeUrlNeverSlash(p.url);
    if (Array.isArray(p.linksOut)) p.linksOut = normalizeLinksOutArray(p.linksOut);
  }

  // 2) Replace legacy "faq" -> "faqRefs" for specific pages (by id)
  const list = Array.isArray(patch.replaceFaqToFaqRefsById) ? patch.replaceFaqToFaqRefsById : [];
  for (const item of list) {
    const id = item?.id;
    if (!id) continue;
    const idx = findPageIndex(pages, (p) => p.id === id);
    if (idx === -1) {
      console.warn(`⚠️ Page id not found (skip): ${id}`);
      continue;
    }
    const page = pages[idx];

    // set faqRefs
    page.faqRefs = Array.isArray(item.faqRefs) ? item.faqRefs : [];

    // delete legacy faq field if present
    if (page.faq) delete page.faq;

    // normalize linksOut
    if (patch.normalizeLinksOut && Array.isArray(page.linksOut)) {
      page.linksOut = normalizeLinksOutArray(page.linksOut);
    }
  }

  // 3) Add/replace pages by URL (business pages)
  const add = Array.isArray(patch.addOrReplacePagesByUrl) ? patch.addOrReplacePagesByUrl : [];
  for (const newPage of add) {
    if (!newPage?.url) continue;
    const url = normalizeUrlNeverSlash(newPage.url);

    const idx = findPageIndex(pages, (p) => normalizeUrlNeverSlash(p.url) === url);
    const finalPage = {
      ...newPage,
      url,
      linksOut: normalizeLinksOutArray(newPage.linksOut || []),
      faqRefs: Array.isArray(newPage.faqRefs) ? newPage.faqRefs : []
    };

    // remove legacy faq if any
    if (finalPage.faq) delete finalPage.faq;

    if (idx === -1) pages.push(finalPage);
    else pages[idx] = { ...pages[idx], ...finalPage };
  }

  // 4) Final pass normalize urls + linksOut
  for (const p of pages) {
    if (!p || typeof p !== "object") continue;
    if (typeof p.url === "string") p.url = normalizeUrlNeverSlash(p.url);
    if (Array.isArray(p.linksOut)) p.linksOut = normalizeLinksOutArray(p.linksOut);
  }

  // 5) Write back
  mapping.pages = pages;
  writeJson(INPUT, mapping);
  console.log("✅ seo-mapping.json patched successfully:");
  console.log(`   -> ${INPUT}`);
}

main();