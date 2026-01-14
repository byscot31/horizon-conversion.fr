// src/data/catalogue.ts

export type Service = {
  slug: string;

  // Compat (certaines pages/composants utilisent "name", d'autres "titre")
  name?: string;
  titre?: string;

  // Phrase 1 : cas typiques (listing + page)
  description?: string;

  // Phrase 2 : ce que tu qualifies (listing + page)
  qualif?: string;

  // Icône (Bootstrap Icons). Optionnel pour éviter les crash si oublié.
  icon?: string;
};

export type Ville = {
  slug: string;

  // Compat
  name?: string;
  nom?: string;

  // Phrase 1 : zone couverte
  description?: string;

  // Phrase 2 : types de demandes fréquentes (sans chiffres)
  demandes?: string;
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

/**
 * Villes pilote utilisées sur Plombier (tu peux les réutiliser ailleurs si tu veux)
 * -> ici, description = zone ; demandes = types de demandes fréquentes (plomberie)
 */
export const VILLES_PILOTE: Ville[] = [
  {
    slug: "chantilly",
    name: "Chantilly",
    description: "Chantilly et alentours.",
    demandes: "Souvent : fuite, débouchage, chauffe-eau et petites réparations sanitaires.",
  },
  {
    slug: "senlis",
    name: "Senlis",
    description: "Senlis et alentours.",
    demandes: "Souvent : fuite, WC, chauffe-eau et dépannage urgent en maison/appartement.",
  },
  {
    slug: "creil",
    name: "Creil",
    description: "Creil et alentours.",
    demandes: "Souvent : dépannage, débouchage et interventions rapides (fuites, évacuations).",
  },
  {
    slug: "nogent-sur-oise",
    name: "Nogent-sur-Oise",
    description: "Nogent-sur-Oise et alentours.",
    demandes: "Souvent : fuite, débouchage, remplacement robinetterie/équipements.",
  },
  {
    slug: "cergy",
    name: "Cergy",
    description: "Cergy et alentours.",
    demandes: "Souvent : dépannage, débouchage et demandes planifiées (sanitaires, chauffe-eau).",
  },
  {
    slug: "pontoise",
    name: "Pontoise",
    description: "Pontoise et alentours.",
    demandes: "Souvent : fuites, petits remplacements et urgences (WC, évacuations).",
  },
];

export const METIERS: Metier[] = [
  // ======================================================
  // PLOMBIER
  // ======================================================
  {
    slug: "plombier",
    name: "Plombier",
    badge: "Plomberie",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "depannage-plomberie",
        name: "Dépannage plomberie",
        titre: "Dépannage plomberie",
        description: "Fuite, panne, urgence, intervention rapide.",
        qualif:
          "Je valide l’adresse, le problème exact, le niveau d’urgence et un contact joignable avant de vous l’envoyer.",
        icon: "bi-tools",
      },
      {
        slug: "recherche-de-fuite",
        name: "Recherche de fuite",
        titre: "Recherche de fuite",
        description: "Localiser l’origine avant réparation (visible ou non).",
        qualif:
          "Je demande le contexte (maison/appartement), les symptômes et si des photos sont possibles avant transfert.",
        icon: "bi-droplet-half",
      },
      {
        slug: "debouchage-canalisation",
        name: "Débouchage canalisation",
        titre: "Débouchage canalisation",
        description: "Évier, douche, WC : évacuation lente, bouchon, refoulement.",
        qualif:
          "Je confirme l’équipement concerné, l’accès sur place et le délai attendu avant de vous transmettre la demande.",
        icon: "bi-water",
      },
      {
        slug: "chauffe-eau",
        name: "Chauffe-eau",
        titre: "Chauffe-eau",
        description: "Panne, remplacement, installation (eau chaude absente ou instable).",
        qualif:
          "Je qualifie le type (élec/gaz), le symptôme et le délai souhaité, avec coordonnées vérifiées.",
        icon: "bi-thermometer-sun",
      },
      {
        slug: "wc-et-sanitaire",
        name: "WC & sanitaire",
        titre: "WC & sanitaire",
        description: "Réparation, pose, remplacement (chasse, fuite, mécanisme).",
        qualif:
          "Je vérifie la nature exacte du problème, l’urgence, et que c’est bien dans votre zone d’intervention.",
        icon: "bi-wrench-adjustable",
      },
      {
        slug: "salle-de-bain",
        name: "Salle de bain",
        titre: "Salle de bain",
        description: "Rénovation, remplacement, aménagement (devis et travaux planifiés).",
        qualif:
          "Je confirme le périmètre (partiel/total), le calendrier et les attentes (devis / chantier) avant transfert.",
        icon: "bi-house-heart",
      },
    ],
    villes: VILLES_PILOTE,
  },

  // ======================================================
  // ÉLECTRICIEN
  // ======================================================
  {
    slug: "electricien",
    name: "Électricien",
    badge: "Électricité",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "depannage-electrique",
        name: "Dépannage électrique (panne, disjoncteur)",
        titre: "Dépannage électrique (panne, disjoncteur)",
        description:
          "Coupure, disjoncteur qui saute, prise HS, odeur de brûlé : demandes urgentes.",
        qualif:
          "Je vérifie l’urgence, l’adresse, le contexte (partiel/total) et un contact joignable avant transfert.",
        icon: "bi-lightning-charge",
      },
      {
        slug: "mise-aux-normes",
        name: "Mise aux normes / sécurité électrique",
        titre: "Mise aux normes / sécurité électrique",
        description:
          "Mise en sécurité, différentiels, protections : demandes “travaux” et devis.",
        qualif:
          "Je confirme le type de logement, le périmètre (pièce/maison) et le délai souhaité avant envoi.",
        icon: "bi-shield-check",
      },
      {
        slug: "tableau-electrique",
        name: "Tableau électrique (remplacement, ajout)",
        titre: "Tableau électrique (remplacement, ajout)",
        description:
          "Remplacement, ajout de modules, disjoncteurs/différentiels : demande claire et cadrée.",
        qualif:
          "Je vérifie l’objectif (sécurité/extension), l’accès au tableau, et la disponibilité client avant transfert.",
        icon: "bi-grid-3x3-gap",
      },
      {
        slug: "prises-interrupteurs",
        name: "Prises, interrupteurs, éclairage",
        titre: "Prises, interrupteurs, éclairage",
        description:
          "Ajout/déplacement de prises, points lumineux, va-et-vient, spots : petites interventions récurrentes.",
        qualif:
          "Je qualifie création vs remplacement, l’accessibilité du chantier et la date souhaitée avant de vous l’envoyer.",
        icon: "bi-toggle-on",
      },
      {
        slug: "renovation-electrique",
        name: "Rénovation électrique (maison / appart)",
        titre: "Rénovation électrique (maison / appart)",
        description:
          "Rénovation complète/partielle, circuits, plans : demandes à plus forte valeur.",
        qualif:
          "Je demande les infos utiles (surface, état, objectif) et si c’est devis / chantier planifié avant transfert.",
        icon: "bi-house-gear",
      },
      {
        slug: "borne-recharge-irve",
        name: "Borne de recharge (IRVE)",
        titre: "Borne de recharge (IRVE)",
        description:
          "Installation de borne à domicile : besoin + lieu + délai (photos si possible).",
        qualif:
          "Je vérifie maison/copro, emplacement, puissance souhaitée et contact joignable avant envoi.",
        icon: "bi-ev-station",
      },
    ],
    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        demandes: "Souvent : dépannage (coupure/disjoncteur) et petites mises en sécurité.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        demandes: "Souvent : travaux planifiés (prises/éclairage) et remises en sécurité.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        demandes: "Souvent : dépannage et remises en sécurité rapides.",
      },
      {
        slug: "gouvieux",
        name: "Gouvieux",
        description: "Gouvieux et alentours.",
        demandes: "Souvent : rénovations, confort (éclairage) et projets IRVE.",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Luzarches et alentours.",
        demandes: "Souvent : dépannage + demandes de travaux (tableau, prises).",
      },
      {
        slug: "fosses",
        name: "Fosses",
        description: "Fosses et alentours.",
        demandes: "Souvent : urgences (panne) et devis (tableau / rénovation partielle).",
      },
    ],
  },

  // ======================================================
  // CHAUFFAGISTE
  // ======================================================
  {
    slug: "chauffagiste",
    name: "Chauffagiste",
    badge: "Chauffage",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "depannage-chaudiere",
        name: "Dépannage chaudière",
        titre: "Dépannage chaudière",
        description:
          "Chaudière en panne, code erreur, plus d’eau chaude ou plus de chauffage.",
        qualif:
          "Je confirme marque/type, symptôme, urgence et coordonnées vérifiées avant transfert.",
        icon: "bi-thermometer-sun",
      },
      {
        slug: "entretien-chaudiere",
        name: "Entretien chaudière",
        titre: "Entretien chaudière",
        description:
          "Entretien annuel, contrôle sécurité, réglages : pour éviter les pannes et rester conforme.",
        qualif:
          "Je valide la zone, le type de chaudière et la période souhaitée avant de vous envoyer la demande.",
        icon: "bi-calendar-check",
      },
      {
        slug: "installation-chaudiere",
        name: "Installation chaudière",
        titre: "Installation chaudière",
        description:
          "Remplacement / installation (gaz, condensation) : conseil + mise en service.",
        qualif:
          "Je qualifie l’existant, l’objectif (remplacement/rénovation) et le calendrier avant transfert.",
        icon: "bi-fire",
      },
      {
        slug: "pompe-a-chaleur",
        name: "Installation pompe à chaleur",
        titre: "Installation pompe à chaleur",
        description:
          "PAC air/eau : étude, dimensionnement, pose, mise en route (demande devis).",
        qualif:
          "Je vérifie la surface, le type d’installation actuelle et l’intention (devis/chantier) avant envoi.",
        icon: "bi-wind",
      },
      {
        slug: "depannage-pompe-a-chaleur",
        name: "Dépannage pompe à chaleur",
        titre: "Dépannage pompe à chaleur",
        description:
          "PAC en défaut, bruit, baisse de performance : diagnostic + remise en service.",
        qualif:
          "Je confirme symptômes, modèle si connu et urgence, avec un contact joignable avant transfert.",
        icon: "bi-tools",
      },
      {
        slug: "ballon-eau-chaude",
        name: "Ballon d’eau chaude",
        titre: "Ballon d’eau chaude",
        description:
          "Remplacement chauffe-eau/ballon : fuite, résistance, groupe de sécurité.",
        qualif:
          "Je qualifie type/volume si possible, symptôme et délai avant de vous transmettre la demande.",
        icon: "bi-droplet",
      },
    ],
    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        demandes: "Souvent : dépannage chaudière et remplacement chauffe-eau/ballon.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        demandes: "Souvent : entretien chaudière et interventions rapides (panne eau chaude).",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        demandes: "Souvent : dépannage + ballon d’eau chaude (pannes, fuites).",
      },
      {
        slug: "pont-sainte-maxence",
        name: "Pont-Sainte-Maxence",
        description: "Pont-Sainte-Maxence et alentours.",
        demandes: "Souvent : entretien et remplacements planifiés (chaudière / chauffe-eau).",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Luzarches et alentours.",
        demandes: "Souvent : dépannage + demandes de devis (PAC / remplacement).",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "L’Isle-Adam et alentours.",
        demandes: "Souvent : projets planifiés (PAC, chaudière condensation) et dépannages.",
      },
    ],
  },

  // ======================================================
  // COUVREUR
  // ======================================================
  {
    slug: "couvreur",
    name: "Couvreur",
    badge: "Toiture",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "reparation-fuite-toiture",
        name: "Réparation fuite toiture",
        titre: "Réparation fuite toiture",
        description:
          "Infiltration, tuile cassée, trace au plafond : demande urgente et claire.",
        qualif:
          "Je vérifie l’accès toiture, la situation (fuite active ou non) et un contact joignable avant transfert.",
        icon: "bi-house",
      },
      {
        slug: "urgence-fuite-toiture",
        name: "Urgence fuite toiture",
        titre: "Urgence fuite toiture",
        description:
          "Infiltration active : sécurisation, bâchage si besoin, puis réparation.",
        qualif:
          "Je confirme l’urgence, l’adresse exacte et l’accessibilité (hauteur/accès) avant de vous l’envoyer.",
        icon: "bi-exclamation-triangle",
      },
      {
        slug: "remplacement-tuiles-ardoises",
        name: "Remplacement tuiles / ardoises",
        titre: "Remplacement tuiles / ardoises",
        description:
          "Remplacement localisé ou zone complète (tempête, vieillissement).",
        qualif:
          "Je qualifie type de couverture, zone à reprendre et délai souhaité avant transfert.",
        icon: "bi-bricks",
      },
      {
        slug: "zinguerie-gouttieres",
        name: "Zinguerie & gouttières",
        titre: "Zinguerie & gouttières",
        description:
          "Gouttières, chéneaux, descentes : fuite, débordement, remplacement.",
        qualif:
          "Je confirme la nature (réparer/remplacer), l’accès et l’urgence avant de vous envoyer la demande.",
        icon: "bi-water",
      },
      {
        slug: "refection-faitage-solins",
        name: "Réfection faîtage / solins",
        titre: "Réfection faîtage / solins",
        description:
          "Faîtage fissuré, solins/abergements à reprendre : source fréquente d’infiltrations.",
        qualif:
          "Je valide les symptômes, la zone concernée et si des photos sont possibles avant transfert.",
        icon: "bi-hammer",
      },
      {
        slug: "renovation-toiture",
        name: "Rénovation toiture",
        titre: "Rénovation toiture",
        description:
          "Réfection, reprise partielle, isolation : chantiers plus gros et devis.",
        qualif:
          "Je qualifie l’objectif (réparer/renover), le calendrier et la zone d’intervention avant envoi.",
        icon: "bi-building",
      },
    ],
    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        demandes: "Souvent : fuites et réparations après pluie/vent + reprises localisées.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        demandes: "Souvent : réparations + zinguerie/gouttières et demandes planifiées.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        demandes: "Souvent : urgence fuite + remplacement de tuiles/ardoises.",
      },
      {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Nogent-sur-Oise et alentours.",
        demandes: "Souvent : fuites, gouttières, et petites reprises rapides.",
      },
      {
        slug: "luzarches",
        name: "Luzarches",
        description: "Luzarches et alentours.",
        demandes: "Souvent : réparations et reprises faîtage/solins.",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "L’Isle-Adam et alentours.",
        demandes: "Souvent : rénovations et zinguerie soignée (devis/chantier).",
      },
    ],
  },

  // ======================================================
  // SERRURIER
  // ======================================================
  {
    slug: "serrurier",
    name: "Serrurier",
    badge: "Serrurerie",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "ouverture-porte",
        name: "Ouverture de porte (porte claquée / clé perdue)",
        titre: "Ouverture de porte (porte claquée / clé perdue)",
        description:
          "Porte claquée, clés perdues, serrure bloquée : demandes urgentes et joignables.",
        qualif:
          "Je confirme que le client est sur place, la ville, et un contact joignable avant transfert.",
        icon: "bi-door-open",
      },
      {
        slug: "ouverture-porte-blindee",
        name: "Ouverture de porte blindée",
        titre: "Ouverture de porte blindée",
        description:
          "Blocage, clé cassée, cylindre coincé : intervention + solution durable ensuite.",
        qualif:
          "Je qualifie le contexte (claquée/verrouillée), et je confirme joignabilité + adresse avant envoi.",
        icon: "bi-shield-lock",
      },
      {
        slug: "changement-serrure",
        name: "Changement de serrure",
        titre: "Changement de serrure",
        description:
          "Remplacement standard ou sécurité renforcée (perte de clés / dysfonctionnement).",
        qualif:
          "Je vérifie le type de porte/serrure (si connu) et le délai souhaité avant transfert.",
        icon: "bi-key",
      },
      {
        slug: "cylindre-barillet",
        name: "Cylindre / barillet (remplacement)",
        titre: "Cylindre / barillet (remplacement)",
        description:
          "Cylindre usé, clé cassée, barillet à changer : demandes simples et fréquentes.",
        qualif:
          "Je demande les infos utiles (photo/format si possible) + adresse + créneau avant de vous l’envoyer.",
        icon: "bi-key-fill",
      },
      {
        slug: "mise-en-securite",
        name: "Mise en sécurité après effraction",
        titre: "Mise en sécurité après effraction",
        description:
          "Porte abîmée, serrure forcée : sécurisation + remplacement des pièces nécessaires.",
        qualif:
          "Je confirme l’urgence, l’état de la porte et la joignabilité avant transfert.",
        icon: "bi-shield-exclamation",
      },
      {
        slug: "renforcement-porte",
        name: "Renforcement de porte (serrure 3 points / cornières)",
        titre: "Renforcement de porte (serrure 3 points / cornières)",
        description:
          "Renforcer une porte existante : amélioration sécurité, devis, pose.",
        qualif:
          "Je qualifie l’intention (devis/pose), le type de porte et la zone d’intervention avant envoi.",
        icon: "bi-shield-plus",
      },
    ],
    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        demandes: "Souvent : portes claquées/verrouillées et remplacement cylindre/serrure.",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        demandes: "Souvent : ouvertures de porte et remplacements (suite à perte de clés).",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        demandes: "Souvent : urgences + mises en sécurité (effraction) et remplacements.",
      },
      {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Nogent-sur-Oise et alentours.",
        demandes: "Souvent : ouvertures et cylindres/barillets à remplacer.",
      },
      {
        slug: "beaumont-sur-oise",
        name: "Beaumont-sur-Oise",
        description: "Beaumont-sur-Oise et alentours.",
        demandes: "Souvent : dépannages, ouvertures et demandes de renforcement.",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "L’Isle-Adam et alentours.",
        demandes: "Souvent : renforcement et remplacements (projets planifiés + urgences).",
      },
    ],
  },

  // ======================================================
  // MENUISIER
  // ======================================================
  {
    slug: "menuisier",
    name: "Menuisier",
    badge: "Menuiserie",
    pageTitleImage: "/images/services/page-title.jpg",
    introImage: "/images/services/hero.svg",
    services: [
      {
        slug: "pose-fenetres",
        name: "Pose / remplacement de fenêtres",
        titre: "Pose / remplacement de fenêtres",
        description:
          "PVC/alu/bois : remplacement, réglages, finitions. Demandes devis et chantiers.",
        qualif:
          "Je qualifie le type (si connu), l’objectif (isolation/esthétique) et le délai avant de vous transmettre la demande.",
        icon: "bi-window",
      },
      {
        slug: "pose-portes",
        name: "Pose / remplacement de portes",
        titre: "Pose / remplacement de portes",
        description:
          "Porte d’entrée, porte intérieure : remplacement, ajustement, quincaillerie.",
        qualif:
          "Je demande le contexte (entrée/intérieur), et je confirme zone + créneau avant transfert.",
        icon: "bi-door-closed",
      },
      {
        slug: "volets-roulants",
        name: "Volets roulants (pose / réparation)",
        titre: "Volets roulants (pose / réparation)",
        description:
          "Volet bloqué, sangle, moteur, remplacement : demandes fréquentes et urgences possibles.",
        qualif:
          "Je qualifie manuel/motorisé, symptôme et urgence, avec coordonnées vérifiées avant envoi.",
        icon: "bi-sliders",
      },
      {
        slug: "porte-de-garage",
        name: "Porte de garage (pose / réparation)",
        titre: "Porte de garage (pose / réparation)",
        description:
          "Motorisation, réglage, remplacement : demandes claires et bon panier moyen.",
        qualif:
          "Je vérifie le type de porte, la panne/le besoin, et le délai souhaité avant transfert.",
        icon: "bi-house-door",
      },
      {
        slug: "veranda-pergola",
        name: "Véranda / pergola (pose)",
        titre: "Véranda / pergola (pose)",
        description:
          "Projet planifié : devis, mesures, pose. Demandes à plus forte valeur.",
        qualif:
          "Je qualifie l’intention (devis/pose), le calendrier et l’accès avant de vous envoyer la demande.",
        icon: "bi-sun",
      },
      {
        slug: "amenagement-interieur",
        name: "Aménagement intérieur (placards, dressing)",
        titre: "Aménagement intérieur (placards, dressing)",
        description:
          "Placards, dressing, rangements : demandes sur-mesure, rendez-vous et devis.",
        qualif:
          "Je demande les grandes lignes (pièce, dimensions approximatives) et le délai avant transfert.",
        icon: "bi-inboxes",
      },
    ],
    villes: [
      {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        demandes: "Souvent : fenêtres/portes et aménagement intérieur (placards/rangements).",
      },
      {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        demandes: "Souvent : projets premium (pergola/véranda) + remplacements fenêtres/portes.",
      },
      {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        demandes: "Souvent : volets roulants (pannes) et remplacements simples.",
      },
      {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Nogent-sur-Oise et alentours.",
        demandes: "Souvent : volets/portes et petites réparations/ajustements.",
      },
      {
        slug: "beaumont-sur-oise",
        name: "Beaumont-sur-Oise",
        description: "Beaumont-sur-Oise et alentours.",
        demandes: "Souvent : volets, portes, fenêtres et demandes planifiées.",
      },
      {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "L’Isle-Adam et alentours.",
        demandes: "Souvent : projets planifiés (pergola/véranda) et remplacements de qualité.",
      },
    ],
  },
];
