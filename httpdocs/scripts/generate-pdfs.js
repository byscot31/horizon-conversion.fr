import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public/guides');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const guides = [
  { slug: 'seo-local-artisans-2025', titre: 'SEO local pour artisans', pages: 45 },
  { slug: 'google-ads-petits-budgets', titre: 'Google Ads pour petits budgets', pages: 32 },
  { slug: 'avis-google-importance', titre: 'Guide des avis Google', pages: 28 },
  { slug: 'cro-pour-professions-liberales', titre: 'CRO pour professions libérales', pages: 38 }
];

guides.forEach(guide => {
  const pdfPath = path.join(PUBLIC_DIR, `${guide.slug}.pdf`);

  // Créer un en-tête PDF simple (factice)
  const pdfHeader = '%PDF-1.4\n%âãÏÓ\n';
  const pdfContent = `
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R >>
endobj

4 0 obj
<< /Length 51 >>
stream
BT
/F1 24 Tf
100 700 Td
(${guide.titre}) Tj
/F1 16 Tf
100 650 Td
(Guide de ${guide.pages} pages) Tj
/F1 12 Tf
100 600 Td
(www.horizon-conversion.fr) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000015 00000 n 
0000000060 00000 n 
0000000111 00000 n 
0000000176 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
293
%%EOF
`;

  fs.writeFileSync(pdfPath, pdfHeader + pdfContent);
  console.log(`✅ PDF créé : ${guide.slug}.pdf`);
});

console.log('🎉 Tous les PDF ont été générés !');