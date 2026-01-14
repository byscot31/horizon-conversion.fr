export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: string; // classe d’icône (Bootstrap Icons)
};

export type Ville = {
  slug: string;
  name: string;
  description: string;
};

export type Metier = {
  slug: string;
  name: string;
  badge: string;
  pageTitleImage: string; // image du bandeau (Page Title)
  introImage: string; // image dans le bloc intro
  services: Service[];
  villes: Ville[];
};

export const ZONE = "Sud de l’Oise et Nord Val d’Oise";

export const VILLES_PILOTE: Ville[] = [
  { slug: "chantilly", name: "Chantilly", description: "Chantilly et alentours." },
  { slug: "senlis", name: "Senlis", description: "Senlis et alentours." },
  { slug: "creil", name: "Creil", description: "Creil et alentours." },
  { slug: "nogent-sur-oise", name: "Nogent-sur-Oise", description: "Nogent-sur-Oise et alentours." },
  { slug: "cergy", name: "Cergy", description: "Cergy et alentours." },
  { slug: "pontoise", name: "Pontoise", description: "Pontoise et alentours." },
];

export const METIERS: Metier[] = [
  {
    slug: "plombier",
    name: "Plombier",
    badge: "Plomberie",
    pageTitleImage: "/images/services/page-title.jpg", // remplace quand tu veux
    introImage: "/images/services/hero.svg", // remplace par une icône plomberie si tu as
    services: [
      {
        slug: "depannage-plomberie",
        name: "Dépannage plomberie",
        description: "Fuite, panne, urgence, intervention rapide.",
        icon: "bi-tools",
      },
      {
        slug: "recherche-de-fuite",
        name: "Recherche de fuite",
        description: "Localiser l’origine avant réparation.",
        icon: "bi-droplet-half",
      },
      {
        slug: "debouchage-canalisation",
        name: "Débouchage canalisation",
        description: "Évier, douche, WC, canalisations bouchées.",
        icon: "bi-water",
      },
      {
        slug: "chauffe-eau",
        name: "Chauffe-eau",
        description: "Panne, remplacement, installation.",
        icon: "bi-thermometer-sun",
      },
      {
        slug: "wc-et-sanitaire",
        name: "WC & sanitaire",
        description: "Réparation, pose, remplacement.",
        icon: "bi-wrench-adjustable",
      },
      {
        slug: "salle-de-bain",
        name: "Salle de bain",
        description: "Rénovation, remplacement, aménagement.",
        icon: "bi-house-heart",
      },
    ],
    villes: VILLES_PILOTE,
  },

  {
    slug: "electricien",
    name: "Électricien",
    badge: "Électricité",

    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",

    services: [
      {
        slug: "depannage-electrique",
        titre: "Dépannage électrique (panne, disjoncteur)",
        description: "Coupure, disjoncteur qui saute, prise qui ne fonctionne plus, odeur de brûlé : demandes urgentes et joignables.",
      },
      {
        slug: "mise-aux-normes",
        titre: "Mise aux normes / sécurité électrique",
        description: "Mise en sécurité, remise aux normes, protections, différentiels : demandes “travaux” et devis.",
      },
      {
        slug: "tableau-electrique",
        titre: "Tableau électrique (remplacement, ajout)",
        description: "Changement de tableau, ajout de modules, disjoncteurs, différentiels : demandes claires, budget/urgence précisés.",
      },
      {
        slug: "prises-interrupteurs",
        titre: "Prises, interrupteurs, éclairage",
        description: "Ajout/déplacement de prises, éclairage intérieur, va-et-vient, spots : petites interventions récurrentes.",
      },
      {
        slug: "renovation-electrique",
        titre: "Rénovation électrique (maison / appart)",
        description: "Rénovation complète ou partielle, saignées, circuits, plans : demandes à plus forte valeur.",
      },
      {
        slug: "borne-recharge-irve",
        titre: "Borne de recharge (IRVE)",
        description: "Installation de borne à domicile : demandes qualifiées, besoin + lieu + délai (et idéalement photos).",
      },
    ],

    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Centre + alentours : dépannage et travaux.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Pavillons / appartements : demandes régulières.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Dépannage + remises en sécurité.",
      },
      {
        slug: "gouvieux",
        name: "Gouvieux",
        description: "Travaux, rénovations et demandes “confort”.",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : dépannage + projets.",
      },
      {
        slug: "fosses",
        name: "Fosses",
        description: "Zone active : demandes urgentes + devis.",
      },
    ],
  },

  {
    slug: "chauffagiste",
    name: "Chauffagiste",
    badge: "Chauffage",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",

    services: [
      {
        slug: "depannage-chaudiere",
        titre: "Dépannage chaudière",
        description: "Panne, erreur, plus d’eau chaude ou plus de chauffage : prise en charge rapide.",
      },
      {
        slug: "entretien-chaudiere",
        titre: "Entretien chaudière",
        description: "Entretien annuel, sécurité, réglages : pour éviter les pannes et rester conforme.",
      },
      {
        slug: "installation-chaudiere",
        titre: "Installation chaudière",
        description: "Remplacement / installation (gaz, condensation) : conseil + mise en service.",
      },
      {
        slug: "pompe-a-chaleur",
        titre: "Installation pompe à chaleur",
        description: "PAC air/eau : étude, dimensionnement, pose, mise en route.",
      },
      {
        slug: "depannage-pompe-a-chaleur",
        titre: "Dépannage pompe à chaleur",
        description: "PAC en défaut, baisse de performance, bruit : diagnostic + remise en service.",
      },
      {
        slug: "ballon-eau-chaude",
        titre: "Ballon d’eau chaude",
        description: "Remplacement chauffe-eau / ballon : fuite, résistance, groupe de sécurité.",
      },
    ],

    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Zone prioritaire : demandes fréquentes en dépannage et remplacement.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Beaucoup d’entretien chaudière + interventions rapides.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Dépannages + ballon d’eau chaude : forte demande.",
      },
      {
        slug: "pont-sainte-maxence",
        name: "Pont-Sainte-Maxence",
        description: "Secteur actif : entretien et remplacement chaudière.",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : dépannage + PAC en progression.",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : rénovation, chaudière condensation, PAC.",
      },
    ],
  },

  {
    slug: "couvreur",
    name: "Couvreur",
    badge: "Toiture",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",

    services: [
      {
        slug: "reparation-fuite-toiture",
        titre: "Réparation fuite toiture",
        description: "Infiltration, tuile cassée, trace au plafond : demande urgente et claire.",
      },
      {
        slug: "urgence-fuite-toiture",
        titre: "Urgence fuite toiture",
        description: "Intervention rapide : infiltration active, bâchage si besoin, sécurisation, puis réparation.",
      },
      {
        slug: "remplacement-tuiles-ardoises",
        titre: "Remplacement tuiles / ardoises",
        description: "Remplacement localisé ou zone complète (tempête, vieillissement).",
      },
      {
        slug: "zinguerie-gouttieres",
        titre: "Zinguerie & gouttières",
        description: "Gouttières, chéneaux, descentes : fuite, remplacement, débordement.",
      },
      {
        slug: "refection-faitage-solins",
        titre: "Réfection faîtage / solins",
        description: "Faîtage fissuré, solins/abergements à reprendre : source fréquente d’infiltrations.",
      },
      {
        slug: "renovation-toiture",
        titre: "Rénovation toiture",
        description: "Réfection, reprise partielle, isolation : chantiers plus gros et devis.",
      },
    ],

    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Toitures maisons, rénovations, demandes régulières.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Entretien + réparations, bon mix dépannage/travaux.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Dépannage fuite + remplacement tuiles après intempéries.",
      },
      {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Zone active : fuites, gouttières, interventions rapides.",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : mix entretien et réparations.",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : rénovations + zinguerie soignée.",
      },
    ],
  },

  {
    slug: "serrurier",
    name: "Serrurier",
    badge: "Serrurerie",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",

    services: [
      {
        slug: "ouverture-porte",
        titre: "Ouverture de porte (porte claquée / clé perdue)",
        description: "Porte claquée, clés perdues, serrure bloquée : demandes urgentes et joignables.",
      },
      {
        slug: "ouverture-porte-blindee",
        titre: "Ouverture de porte blindée",
        description: "Blocage, clé cassée, cylindre coincé : intervention + solution durable ensuite.",
      },
      {
        slug: "changement-serrure",
        titre: "Changement de serrure",
        description: "Remplacement standard ou sécurité renforcée (après perte de clés ou dysfonctionnement).",
      },
      {
        slug: "cylindre-barillet",
        titre: "Cylindre / barillet (remplacement)",
        description: "Cylindre usé, clé cassée, barillet à changer : demandes simples et fréquentes.",
      },
      {
        slug: "mise-en-securite",
        titre: "Mise en sécurité après effraction",
        description: "Porte abîmée, serrure forcée : sécurisation + remplacement des pièces nécessaires.",
      },
      {
        slug: "renforcement-porte",
        titre: "Renforcement de porte (serrure 3 points / cornières)",
        description: "Renforcer une porte existante : amélioration sécurité, devis, pose.",
      },
    ],

    villes: [
      { slug: "senlis", name: "Senlis", description: "Centre + alentours : urgences et remplacements." },
      { slug: "chantilly", name: "Chantilly", description: "Portes claquées + changement de serrures." },
      { slug: "creil", name: "Creil", description: "Fort volume : ouvertures et mises en sécurité." },
      { slug: "nogent-sur-oise", name: "Nogent-sur-Oise", description: "Urgences + cylindres/barillets." },
      { slug: "beaumont-sur-oise", name: "Beaumont-sur-Oise", description: "Nord Val d’Oise : dépannages et devis." },
      { slug: "l-isle-adam", name: "L’Isle-Adam", description: "Zone premium : renforcement et remplacements." },
    ],
  },

  {
    slug: "menuisier",
    name: "Menuisier",
    badge: "Menuiserie",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",

    services: [
      {
        slug: "pose-fenetres",
        titre: "Pose / remplacement de fenêtres",
        description: "PVC, alu, bois : remplacement, réglages, finitions. Demandes devis et chantiers.",
      },
      {
        slug: "pose-portes",
        titre: "Pose / remplacement de portes",
        description: "Porte d’entrée, porte intérieure : remplacement, ajustement, quincaillerie.",
      },
      {
        slug: "volets-roulants",
        titre: "Volets roulants (pose / réparation)",
        description: "Volet bloqué, sangle, moteur, remplacement : demandes fréquentes et urgences possibles.",
      },
      {
        slug: "porte-de-garage",
        titre: "Porte de garage (pose / réparation)",
        description: "Motorisation, réglage, remplacement : demandes claires et bon panier moyen.",
      },
      {
        slug: "veranda-pergola",
        titre: "Véranda / pergola (pose)",
        description: "Projet planifié : devis, mesures, pose. Demandes à plus forte valeur.",
      },
      {
        slug: "amenagement-interieur",
        titre: "Aménagement intérieur (placards, dressing)",
        description: "Placards, dressing, rangements : demandes sur-mesure, rendez-vous et devis.",
      },
    ],

    villes: [
      { slug: "senlis", name: "Senlis", description: "Fenêtres, portes et aménagements : demandes régulières." },
      { slug: "chantilly", name: "Chantilly", description: "Zone premium : rénovation + projets sur-mesure." },
      { slug: "creil", name: "Creil", description: "Volets roulants + dépannages + remplacements." },
      { slug: "nogent-sur-oise", name: "Nogent-sur-Oise", description: "Porte/volet : forte demande locale." },
      { slug: "beaumont-sur-oise", name: "Beaumont-sur-Oise", description: "Nord Val d’Oise : volets, portes, fenêtres." },
      { slug: "l-isle-adam", name: "L’Isle-Adam", description: "Zone premium : pergola/véranda et travaux de qualité." },
    ],
  },
];
