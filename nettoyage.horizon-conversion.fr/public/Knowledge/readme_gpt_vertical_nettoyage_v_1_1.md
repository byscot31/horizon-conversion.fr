# README – GPT Vertical Nettoyage (Horizon Conversion)

## But
Produire rapidement des livrables propres pour **nettoyage.horizon-conversion.fr** afin d’aider les **entreprises de nettoyage** (Sud Oise 60 + Nord 95) à obtenir :
- plus d’appels
- plus de demandes de devis
- une zone d’intervention mieux couverte (ville + alentours)

> Important : on **ne vend pas** de nettoyage. On vend de la visibilité sur Google, des annonces Google, et un site plus efficace.

---

## Stack
- Astro + template HTML (design “Cleaner”)
- Assets : `public/_assets_/style.css` + `public/_assets_/cleaner.css` + `public/_assets_/images/*`
- Données :
  - `src/data/services.json`
  - `src/data/specialites.json`
  - `src/data/villes.json`

---

## Routing (cible)
Pages standards :
- `/` (Accueil)
- `/methode`
- `/preuves`
- `/tarifs`
- `/contact`
- `/mentions-legales`
- `/politique-confidentialite`

Services (hubs + pages locales) :
- `/[service]`
- `/[service]/[ville]`

Marchés (spécialités nettoyage) :
- `/specialites`
- `/specialites/[specialite]`
- `/specialites/[specialite]/[ville]`

Zones (couverture 60/95) :
- `/zones`
- `/zones/[zone]`
- `/zones/[zone]/[ville]`

Ressources (articles / conseils) :
- `/ressources`
- `/ressources/[article]`

---

## Règles (non négociables)
### Qualité des pages
- Pas de pages “copiées-collées” en changeant juste le nom de la ville.
- Pas de promesses irréalistes (ex : “1er sur Google garanti”).
- Texte clair, phrases courtes, orienté **appels** et **devis**.

### Pages locales (ville / service+ville / marché+ville)
Chaque page locale doit contenir :
- 1 angle unique (problème concret local / type de client)
- 1 preuve (checklist, mini-cas, exemple de tableau mensuel, exemple d’analyse)
- 1 bloc “comment on s’y prend” (étapes simples)
- 1 CTA principal + 1 CTA secondaire + réassurance
- 3 liens internes minimum

### Maillage interne
- Les pages “services” renvoient vers leurs pages “service + ville”.
- Les pages “service + ville” renvoient vers :
  - le hub service (`/[service]`)
  - une page zone ville (`/zones/[zone]/[ville]`)
  - 1–2 pages “marché + ville” pertinentes
- Les pages “marchés” renvoient vers :
  - les 3 services
  - les pages “marché + ville”
  - tarifs + contact

---

## Données “canon”
### Services (3)
Slugs stables :
- `seo-local` (texte visible : “Visibilité Google (Maps)”)
- `google-ads` (texte visible : “Annonces Google”)
- `cro-tracking` (texte visible : “Optimisation du site”)

### Spécialités (8)
- `bureaux`
- `commerces`
- `coproprietes`
- `fin-de-chantier`
- `cabinets-medicaux`
- `vitrerie`
- `entretien-des-sols`
- `industriel`

### Villes
Les villes et leurs “alentours” sont dans `src/data/villes.json`.

---

## Ce que le GPT doit générer quand on lui demande “une page”
Toujours inclure :
- Meta title + meta description
- H1 + plan H2/H3
- Section “preuve” (checklist / exemple / mini cas)
- CTA principal + CTA secondaire + réassurance
- Liens internes (3 minimum)
- Suivi des actions (clic tel / email / itinéraire / boutons / formulaire)

---

## Suivi des actions (simple)
À mesurer (au minimum) :
- clic téléphone
- clic email
- clic itinéraire
- clic bouton principal
- envoi formulaire

But : savoir ce qui apporte des **appels** et des **devis** (pas juste des visites).

---

## Prompt de démarrage recommandé
“Génère les 3 JSON complets + les metas de toutes les pages hubs + 2 pages exemples :
- `/seo-local/senlis`
- `/specialites/fin-de-chantier/chantilly`
Inclure une preuve, 2 CTA, maillage interne, et le suivi des actions.”

