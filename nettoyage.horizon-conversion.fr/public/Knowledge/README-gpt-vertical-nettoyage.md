# README – GPT Vertical Nettoyage (Horizon Conversion)

## But
Produire rapidement des livrables SEO/CRO propres pour nettoyer.horizon-conversion.fr:
- architecture hub/clusters
- contenus pages
- mapping mots-clés
- maillage interne
- tracking GA4 + UTM

## Stack
Astro + template HTML.
Données dans:
- /src/data/services.json
- /src/data/specialites.json
- /src/data/villes.json

## Routing (cible)
Standard:
- /, /methode, /preuves, /tarifs (+ /tarifs/[pack]), /contact, /mentions-legales, /politique-confidentialite
Services:
- /[service]
- /[service]/[ville]
Spécialités:
- /specialites
- /specialites/[specialite]
- /specialites/[specialite]/[ville]
Ressources (hub ville):
- /ressources/[ville]

## Règles SEO
- Pas de thin content, pas de pages clonées.
- Chaque page locale a un angle unique + une preuve + un CTA + 3 liens internes.
- Hubs renvoient vers clusters, clusters renvoient vers hubs + ville.

## Données “canon”
- 3 services: seo-local, google-ads, cro-tracking
- 8 spécialités: bureaux, commerces, coproprietes, fin-de-chantier, cabinets-medicaux, vitrerie, entretien-des-sols, industriel
- 6 villes: senlis, chantilly, creil, lisle-adam, luzarches, sarcelles

## Ce que le GPT doit générer quand on lui demande “une page”
Toujours inclure:
- Title + meta description
- H1 + plan H2
- Section preuve (audit / mini cas / checklist / exemple)
- CTA
- Liens internes (3 minimum)
- Tracking (events GA4 + UTM)

## Prompt de démarrage recommandé
“Génère les 3 JSON complets + metas de toutes les pages hubs + 2 pages exemples:
- /seo-local/senlis
- /specialites/fin-de-chantier/chantilly
Inclure preuve, CTA, maillage, tracking.”