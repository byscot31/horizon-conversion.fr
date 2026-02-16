# Fichier Connaissance — GPT “HC - Animaux” (Astro) — Horizon Conversion Animaux
Dernière mise à jour : 2026-02-06 (Europe/Paris)

## 1) Identité & NAP (à afficher et réutiliser partout)
- Nom : Horizon Conversion Animaux
- Téléphone : 06 60 92 10 08
- Email : contact@horizon-conversion.fr
- Positionnement : consultant senior orienté résultats + exécution type agence, spécialisé webmarketing local pour professionnels des animaux (SEO local, Google Maps, Google Ads, Meta Ads, CRO, tracking).

### Ton & style
- Direct, pragmatique, orienté livrables, sans blabla.
- Phrases courtes, bénéfices concrets, preuves alternatives (process, livrables, tracking) plutôt que “promesses”.
- Toujours localiser : Sud Oise (60) & Val d’Oise (95).

## 2) Objectif du site (priorité)
Générer des leads qualifiés (appels, formulaires, prise de RDV) pour les professionnels des animaux en 60/95.

KPI principaux :
- clic téléphone, clic email, clic WhatsApp, formulaire envoyé, prise RDV
- taux de conversion page service / landing
- (si Ads) CPL + taux de qualification
- GSC : impressions/clics + positions requêtes locales

## 3) Contraintes essentielles (règles non négociables)
- Stack : Astro (performance + SEO).
- Stratégie SEO : 1 intention = 1 page.
- Pages “villes” : OUI (villes prioritaires uniquement).
- Pages “alentours” : NON.  
  => On mentionne les communes proches *dans la page ville*, dans une section “Interventions autour de X”, sans créer d’URL dédiées.
- Toujours inclure NAP dans le footer + page Contact + données structurées.
- Éviter les pages clones : chaque page ville contient des éléments spécifiques (cas d’usage, points locaux, FAQ locale, liste d’alentours).

## 4) Métiers prioritaires (les plus pertinents pour acquisition locale)
Ces 5 verticales sont prioritaires car :
- volume de recherche local élevé,
- valeur client récurrente ou panier moyen intéressant,
- concurrence locale forte => besoin d’optimisation + ads.

### Verticales
1) Clinique vétérinaire / vétérinaire
2) Éducateur canin / comportementaliste
3) Toiletteur
4) Pension canine/féline / garderie / hôtel pour animaux
5) Ostéopathe animalier (chien/chat/cheval selon zone)

## 5) Zones prioritaires (villes) + “alentours à citer” (sans pages alentours)
Objectif : couvrir les bassins de demande en Sud Oise (60) et Val d’Oise (95), en citant les communes proches dans chaque page.

### Sud Oise (60) — Villes prioritaires
1) Chantilly  
   Alentours à citer : Gouvieux, Lamorlaye, Vineuil-Saint-Firmin, Coye-la-Forêt, Orry-la-Ville
2) Senlis  
   Alentours : Chamant, Mont-l’Évêque, Barbery, Pontarmé, Fleurines
3) Creil  
   Alentours : Montataire, Nogent-sur-Oise, Villers-Saint-Paul, Saint-Leu-d’Esserent, Thiverny
4) Nogent-sur-Oise  
   Alentours : Creil, Montataire, Laigneville, Villers-Saint-Paul, Rousseloy
5) Pont-Sainte-Maxence  
   Alentours : Brenouille, Les Ageux, Sacy-le-Grand, Verneuil-en-Halatte, Cinqueux
6) Clermont (Oise)  
   Alentours : Agnetz, Fitz-James, Liancourt, Breuil-le-Vert, Neuilly-sous-Clermont
7) Compiègne (option si extension, limite Sud Oise)  
   Alentours : Margny-lès-Compiègne, Venette, Le Meux, Lacroix-Saint-Ouen, Jaux

### Val d’Oise (95) — Villes prioritaires
1) Cergy  
   Alentours : Pontoise, Osny, Éragny, Saint-Ouen-l’Aumône, Jouy-le-Moutier
2) Pontoise  
   Alentours : Cergy, Saint-Ouen-l’Aumône, Osny, Ennery, Auvers-sur-Oise
3) Argenteuil  
   Alentours : Bezons, Colombes (limitrophe), Sannois, Cormeilles-en-Parisis, Sartrouville (limitrophe)
4) Franconville  
   Alentours : Ermont, Sannois, Saint-Leu-la-Forêt, Taverny, Montigny-lès-Cormeilles
5) Taverny  
   Alentours : Saint-Leu-la-Forêt, Beauchamp, Montigny-lès-Cormeilles, Bessancourt, Frépillon
6) Sarcelles  
   Alentours : Garges-lès-Gonesse, Villiers-le-Bel, Arnouville, Gonesse, Saint-Brice-sous-Forêt
7) Gonesse  
   Alentours : Sarcelles, Villiers-le-Bel, Arnouville, Goussainville, Le Thillay
8) L’Isle-Adam  
   Alentours : Parmain, Mériel, Beaumont-sur-Oise, Presles, Champagne-sur-Oise

Règle de mise en page “alentours” :
- Une section H2 : “Interventions à [Ville] et autour”
- Liste courte (5–8 communes) + phrase “Sans frais cachés : on confirme la zone au moment de l’audit/appel.”

## 6) Architecture de site (Astro) — pages & collections
### Arborescence recommandée (site agence)
- / (Accueil)
- /prestations/ (hub)
  - /prestations/seo-local/
  - /prestations/google-ads/
  - /prestations/meta-ads/
  - /prestations/optimisation-google-maps/
  - /prestations/creation-site-astro/
  - /prestations/cro-tracking/
- /metiers/ (hub)
  - /metiers/veterinaire/
  - /metiers/educateur-canin/
  - /metiers/toiletteur/
  - /metiers/pension-garderie/
  - /metiers/osteopathe-animalier/
- /zones/ (hub)
  - /zones/sud-oise-60/
  - /zones/val-doise-95/
  - Pages villes (prioritaires uniquement) :
    - /zones/chantilly/
    - /zones/senlis/
    - /zones/creil/
    - /zones/nogent-sur-oise/
    - /zones/pont-sainte-maxence/
    - /zones/clermont-oise/
    - /zones/cergy/
    - /zones/pontoise/
    - /zones/argenteuil/
    - /zones/franconville/
    - /zones/taverny/
    - /zones/sarcelles/
    - /zones/gonesse/
    - /zones/lisle-adam/
- /methode/ (process + livrables + tracking)
- /preuves/ (preuves alternatives : exemples de livrables, reporting, avant/après anonymisés)
- /contact/ (formulaire + CTA + NAP)
- /mentions-legales/ + /politique-confidentialite/ + /cookies/

### Astro — organisation technique suggérée
- src/pages/… pour routage
- src/content/collections/ :
  - services (md/mdx)
  - metiers (md/mdx)
  - zones (md/mdx)
  - faq (md/mdx) (option)
- src/components/ :
  - Hero.astro, CTA.astro, Proofs.astro, ProcessSteps.astro, FAQ.astro, AreasServed.astro, InternalLinks.astro, Schema.astro
- Un “layout” unique SEO : LayoutSEO.astro (meta, og, canonical, JSON-LD, breadcrumbs)
- Images : formats modernes + dimensions fixes + lazyload

## 7) Gabarits (structure standard par type de page)
### 7.1 Page Prestation (ex: /prestations/seo-local/)
Objectif : conversion + preuve + clarté.
Structure :
1) Hero : “SEO local pour pros animaliers en 60/95” + CTA (Appeler / Audit)
2) Douleurs : symptômes (agenda vide, Maps invisible, CPC cher…)
3) Solution : process en 4–6 étapes (audit -> plan -> exécution -> reporting)
4) Livrables concrets (checklist)
5) Preuves alternatives (tracking, exemples, garanties de moyens)
6) FAQ (objections + questions SEO)
7) Liens internes : métiers + zones
8) CTA final + contact rapide

### 7.2 Page Métier (ex: /metiers/toiletteur/)
Objectif : verticaliser et augmenter la pertinence.
Structure :
1) Hero : “Remplir l’agenda d’un toiletteur en 60/95”
2) Problèmes typiques métier (pics saisonniers, concurrence, avis…)
3) Offre packagée (SEO + Maps + Ads) + livrables
4) Exemples (annonces, structure page service, tracking)
5) FAQ métier
6) CTA audit

### 7.3 Page Ville (ex: /zones/chantilly/)
Objectif : SEO local (ville) + conversion.
Structure :
1) Hero : “Acquisition locale à Chantilly pour pros animaliers”
2) Contexte local (1 paragraphe spécifique, pas générique)
3) Interventions à Chantilly et autour (liste d’alentours)
4) Ce qu’on met en place (process + livrables)
5) Services associés (liens vers prestations)
6) FAQ locale
7) CTA final + NAP + rappel zone 60/95

## 8) SEO On-site (règles de rédaction & balisage)
- Title : “{Prestation} {Métier/Zone} | Horizon Conversion Animaux”
- Meta description : bénéfice + local + CTA, 150–160 caractères
- H1 : intention exacte (service + métier/ville)
- H2 : blocs “douleurs”, “process”, “livrables”, “FAQ”, “alentours”
- Maillage interne “triangle” :
  - Prestation -> Métier -> Zone (ville) -> Prestation (liens contextuels)
- Éviter cannibalisation : une page = une requête principale, variantes en FAQ.
- Contenu minimal recommandé :
  - Prestation : 900–1400 mots
  - Métier : 900–1400 mots
  - Ville : 700–1100 mots (avec éléments spécifiques)

## 9) CRO (conversion) — règles UI/UX
- CTA principaux :
  - “Appeler” (tel:)
  - “Demander un audit”
  - “Recevoir un plan d’action”
- Mobile : barre sticky (Appeler / Audit)
- Formulaire : court (Nom, activité, ville, email/tel, message).  
  Option qualif : budget mensuel (facultatif), urgence (15j / 30j / 60j).
- Preuves alternatives (obligatoire si peu/pas d’avis) :
  - “Ce que vous recevez” (audit PDF, plan mots-clés, structure pages, tracking GA4, reporting)
  - Process transparent
  - Exemples anonymisés (Search Console / Ads / Maps)
- Objections à traiter en FAQ : prix, délai, “pas d’avis”, concurrence, budget pub.

## 10) Tracking (GTM + GA4) — événements standard
Événements à configurer :
- click_phone
- click_email
- click_whatsapp (si utilisé)
- form_submit
- book_call (si Calendly/prise RDV)
- click_directions (si bouton itinéraire)
Paramètres utiles :
- page_path
- page_type (prestation/metier/zone)
- zone (60/95 + ville)
- métier (si page métier)

## 11) Données structurées (JSON-LD) — à intégrer via composant Astro
À prévoir selon page :
- Organization / LocalBusiness (site global + page contact)
- Service (pages prestations)
- FAQPage (si FAQ présente)
- BreadcrumbList (toutes pages sauf accueil)
Règle : JSON-LD propre, sans sur-optimisation, cohérent avec contenu visible.

## 12) Messages clés (promesses cadrées)
Promesse : “Plus de demandes qualifiées en local, avec une méthode trackée et des livrables clairs.”
Différenciateurs :
- Spécialisation métiers animaliers
- Focus local 60/95
- Mise en place tracking + reporting
- Preuves alternatives (même sans avis)
- Qualification stricte (on ne prend pas tout le monde)

## 13) Checklist “Definition of Done” (avant mise en ligne)
- Perf : images optimisées, lazyload, CSS minimal, LCP ok
- SEO : titles/meta uniques, canonical, sitemap, robots, 404, redirections
- CRO : CTA visibles, formulaire testé, mobile ok
- Tracking : événements testés (debug view)
- RGPD : mentions, politique, cookies (si requis)
- NAP visible : footer + contact + schéma