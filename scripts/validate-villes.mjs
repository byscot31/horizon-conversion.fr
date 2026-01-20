import fs from "node:fs";

const villes = JSON.parse(fs.readFileSync("src/data/villes.json", "utf8"));
const bySlug = new Map(villes.map(v => [v.slug, v]));

const missing = [];
const selfRefs = [];
const duplicates = villes
    .map(v => v.slug)
    .filter((s, i, arr) => arr.indexOf(s) !== i);

for (const v of villes) {
    for (const a of (v.around || [])) {
        if (!bySlug.has(a)) missing.push({ from: v.slug, missing: a });
        if (a === v.slug) selfRefs.push(v.slug);
    }
}

console.log("Duplicates:", duplicates.length ? duplicates : "OK");
console.log("Self refs:", selfRefs.length ? selfRefs : "OK");
console.log("Missing around slugs:", missing.length ? missing : "OK");
