export type Service = {
    slug: string;
    title: string;
    description: string; // court (cartes/listings)
    icon: string; // Bootstrap Icons, ex: "bi-tools"
    cas: string[]; // 2 phrases "cas typiques"
    qualif: string[]; // 2 phrases "ce que je qualifie"
};

export type Ville = {
    slug: string;
    name: string;
    description: string; // court (cartes/listings)
    zone: string; // 1 phrase "zone couverte"
    demandes: string; // 1 phrase "demandes fréquentes"
};

export type Metier = {
    slug: string;
    name: string;
    badge: string;
    pageTitleImage: string;
    introImage: string;
    services: Service[];
    villes: Ville[];
};

export const ZONE = "Sud de l’Oise et Nord Val d’Oise";

/**
 * ⚠️ Les phrases ci-dessous :
 * - pas de chiffres inventés
 * - concret pour les artisans
 * - suffisant pour “dé-template” les pages (service/ville)
 */

// -------------------------
// PLOMBIER
// -------------------------
const PLOMBIER_SERVICES: Service[] = [
    {
        slug: "depannage-plomberie",
        title: "Dépannage plomberie",
        description: "Fuite, panne, urgence : demandes simples et joignables.",
        icon: "bi-tools",
        cas: [
            "Fuite visible sous évier, lavabo, robinet ou raccord.",
            "WC qui coule, vanne bloquée, petite panne qui gêne au quotidien.",
        ],
        qualif: [
            "Adresse + accès + niveau d’urgence (fuite légère ou gros dégât).",
            "Symptômes + photos si possible (raccord, robinet, zone humide).",
        ],
    },
    {
        slug: "recherche-de-fuite",
        title: "Recherche de fuite",
        description: "Localiser l’origine avant réparation (sans perdre de temps).",
        icon: "bi-droplet-half",
        cas: [
            "Trace d’humidité au plafond/mur sans fuite visible.",
            "Surconsommation d’eau ou fuite “intermittente” difficile à trouver.",
        ],
        qualif: [
            "Zone approximative + type de logement (maison/appart, étage).",
            "Contexte (après pluie, après travaux, depuis quand).",
        ],
    },
    {
        slug: "debouchage-canalisation",
        title: "Débouchage canalisation",
        description: "Évier, douche, WC : refoulement, mauvais écoulement.",
        icon: "bi-water",
        cas: [
            "Douche/évier qui se vide mal et refoule.",
            "WC bouché ou écoulement très lent avec odeurs.",
        ],
        qualif: [
            "Quel point est bouché + depuis quand (et ce qui a été tenté).",
            "Accès (siphon, regard, étage) + urgence (usage bloqué ou pas).",
        ],
    },
    {
        slug: "chauffe-eau",
        title: "Chauffe-eau",
        description: "Panne, fuite, remplacement : demande claire et utile.",
        icon: "bi-thermometer-sun",
        cas: ["Plus d’eau chaude ou eau tiède en continu.", "Fuite au niveau du ballon / groupe de sécurité."],
        qualif: [
            "Type (électrique/gaz), capacité, âge approximatif (photo plaque si possible).",
            "Symptômes (disjoncte, bruit, fuite) + accessibilité du ballon.",
        ],
    },
    {
        slug: "wc-et-sanitaire",
        title: "WC & sanitaire",
        description: "Réparation, pose, remplacement : interventions récurrentes.",
        icon: "bi-wrench-adjustable",
        cas: ["Chasse d’eau HS, flotteur, fuite dans la cuvette.", "Remplacement robinetterie, lavabo, évier, siphon."],
        qualif: [
            "Photos + modèle si connu (ou au moins dimensions/standard).",
            "Accès + possibilité de couper l’eau + stationnement si besoin.",
        ],
    },
    {
        slug: "salle-de-bain",
        title: "Salle de bain",
        description: "Rénovation légère ou complète : demande souvent planifiée.",
        icon: "bi-house-heart",
        cas: ["Remplacement baignoire par douche, receveur, paroi.", "Reprise étanchéité/évacuation autour douche/baignoire."],
        qualif: [
            "Ce qui est conservé/remplacé + photos + contraintes (carrelage, accès).",
            "Délai souhaité + décisionnaire (proprio/locataire) + budget indicatif (même large).",
        ],
    },
];

const PLOMBIER_VILLES: Ville[] = [
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Chantilly et alentours.",
        zone: "Chantilly et communes proches : interventions maison et appartement.",
        demandes: "Beaucoup de fuites visibles, chauffe-eau et petits dépannages du quotidien.",
    },
    {
        slug: "senlis",
        name: "Senlis",
        description: "Senlis et alentours.",
        zone: "Senlis + villages autour : déplacements faciles et réguliers.",
        demandes: "Dépannages plomberie, recherche de fuite et remplacements sanitaires.",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Creil et alentours.",
        zone: "Creil et secteur proche : dépannage + interventions rapides.",
        demandes: "Débouchages, fuites, réparations WC et demandes urgentes.",
    },
    {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Nogent-sur-Oise et alentours.",
        zone: "Nogent-sur-Oise et communes voisines : demandes régulières.",
        demandes: "Fuites, débouchages et chauffe-eau (panne ou remplacement).",
    },
    {
        slug: "cergy",
        name: "Cergy",
        description: "Cergy et alentours.",
        zone: "Cergy et agglomération : mix appartement/pavillon.",
        demandes: "Dépannages plomberie, sanitaires et besoins planifiés (SDB).",
    },
    {
        slug: "pontoise",
        name: "Pontoise",
        description: "Pontoise et alentours.",
        zone: "Pontoise et communes proches : demandes variées toute l’année.",
        demandes: "Fuites, WC/sanitaires et recherches de fuite en appartement.",
    },
];

// -------------------------
// ÉLECTRICIEN
// -------------------------
const ELECTRICIEN_SERVICES: Service[] = [
    {
        slug: "depannage-electrique",
        title: "Dépannage électrique (panne, disjoncteur)",
        description: "Coupure, disjoncteur qui saute, prise HS : demandes urgentes.",
        icon: "bi-lightning-charge",
        cas: ["Disjoncteur qui saute dès qu’on allume un appareil.", "Prise/boîte qui chauffe, odeur de brûlé, coupure partielle."],
        qualif: [
            "Symptômes précis + ce qui déclenche la panne + urgence (sécurité).",
            "Accès tableau + type logement (maison/appart) + possibilité de couper.",
        ],
    },
    {
        slug: "mise-aux-normes",
        title: "Mise aux normes / sécurité électrique",
        description: "Mise en sécurité, protections, différentiels : demandes “travaux”.",
        icon: "bi-shield-check",
        cas: ["Tableau ancien à sécuriser (fusibles, protections manquantes).", "Absence de terre/différentiel sur certaines lignes."],
        qualif: [
            "Photos du tableau + contexte (rénovation, location, vente).",
            "Objectif : mise en sécurité ciblée ou rénovation plus large.",
        ],
    },
    {
        slug: "tableau-electrique",
        title: "Tableau électrique (remplacement, ajout)",
        description: "Changement, ajout de modules : demande claire et cadrée.",
        icon: "bi-grid-3x3-gap",
        cas: ["Tableau saturé : besoin d’ajouter des protections/circuits.", "Remplacement tableau ancien pour fiabiliser l’installation."],
        qualif: [
            "Accès + photos + contraintes (emplacement, horaires de coupure).",
            "Besoin : ajout circuits / remplacement complet / mise en conformité.",
        ],
    },
    {
        slug: "prises-interrupteurs",
        title: "Prises, interrupteurs, éclairage",
        description: "Ajout/déplacement de prises, points lumineux, va-et-vient.",
        icon: "bi-plug",
        cas: ["Ajout de prises (cuisine/bureau) ou déplacement d’un point.", "Éclairage à revoir : spots, va-et-vient, extérieur."],
        qualif: [
            "Emplacements souhaités + contraintes (mur porteur, goulotte, faux plafond).",
            "Délai + présence sur place (rendez-vous, accès).",
        ],
    },
    {
        slug: "renovation-electrique",
        title: "Rénovation électrique (maison / appart)",
        description: "Rénovation partielle/complète : demandes à plus forte valeur.",
        icon: "bi-house-gear",
        cas: ["Rénovation avant emménagement (circuits, points, tableau).", "Maison ancienne : reprise des lignes et mise en sécurité globale."],
        qualif: [
            "Surface/nombre de pièces + plan si possible + niveau de finition attendu.",
            "Calendrier chantier + accès + coordination avec autres corps d’état.",
        ],
    },
    {
        slug: "borne-recharge-irve",
        title: "Borne de recharge (IRVE)",
        description: "Installation de borne : besoin + lieu + délai (photos utiles).",
        icon: "bi-ev-station",
        cas: ["Pose d’une borne en garage/parking privé.", "Adaptation tableau/terre pour supporter la borne."],
        qualif: [
            "Emplacement + distance tableau/borne + type compteur si connu.",
            "Puissance souhaitée + contraintes (copropriété, tranchée, perçage).",
        ],
    },
];

const ELECTRICIEN_VILLES: Ville[] = [
    {
        slug: "senlis",
        name: "Senlis",
        description: "Centre + alentours : dépannage et travaux.",
        zone: "Senlis et villages proches : interventions rapides et planifiées.",
        demandes: "Pannes, tableaux à sécuriser et ajouts de prises/éclairage.",
    },
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Pavillons / appartements : demandes régulières.",
        zone: "Chantilly + communes voisines : mix maison/appartement.",
        demandes: "Dépannages, travaux “confort” et petites rénovations électriques.",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Dépannage + remises en sécurité.",
        zone: "Creil et secteur proche : dépannage + mises en sécurité.",
        demandes: "Disjoncteur qui saute, prises HS et tableaux à fiabiliser.",
    },
    {
        slug: "gouvieux",
        name: "Gouvieux",
        description: "Travaux, rénovations et demandes “confort”.",
        zone: "Gouvieux et alentours : demandes souvent planifiées.",
        demandes: "Ajouts de prises/éclairage et rénovations partielles.",
    },
    {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : dépannage + projets.",
        zone: "Luzarches et communes proches : déplacements réguliers.",
        demandes: "Pannes + mises en sécurité + projets de rénovation.",
    },
    {
        slug: "fosses",
        name: "Fosses",
        description: "Zone active : urgences + devis.",
        zone: "Fosses et alentours : demandes urgentes et demandes devis.",
        demandes: "Dépannages électriques et travaux de mise en sécurité.",
    },
];

// -------------------------
// CHAUFFAGISTE
// -------------------------
const CHAUFFAGISTE_SERVICES: Service[] = [
    {
        slug: "depannage-chaudiere",
        title: "Dépannage chaudière",
        description: "Panne, erreur, plus d’eau chaude/chauffage : demande urgente.",
        icon: "bi-tools",
        cas: ["Chaudière en défaut avec code erreur.", "Plus de chauffage ou plus d’eau chaude du jour au lendemain."],
        qualif: [
            "Marque/modèle + photo écran/code erreur si possible.",
            "Type énergie (gaz/fioul) + symptômes (pression, bruit, fuite).",
        ],
    },
    {
        slug: "entretien-chaudiere",
        title: "Entretien chaudière",
        description: "Entretien annuel, sécurité, réglages : demande planifiée.",
        icon: "bi-calendar-check",
        cas: ["Entretien annuel avant période de chauffe.", "Réglages/bruits : besoin d’un passage pour vérifier."],
        qualif: [
            "Type chaudière + dernier entretien (si connu).",
            "Accès + créneaux + besoin d’attestation (si applicable).",
        ],
    },
    {
        slug: "installation-chaudiere",
        title: "Installation chaudière",
        description: "Remplacement/installation (gaz, condensation) : devis utile.",
        icon: "bi-thermometer-sun",
        cas: ["Remplacement d’une chaudière vieillissante.", "Passage vers une chaudière plus récente/condensation."],
        qualif: [
            "Type logement + installation actuelle (photo possible).",
            "Contraintes évacuation/ventilation + délai souhaité.",
        ],
    },
    {
        slug: "pompe-a-chaleur",
        title: "Installation pompe à chaleur",
        description: "PAC air/eau : étude, dimensionnement, pose, mise en route.",
        icon: "bi-snow",
        cas: ["Projet de remplacement chaudière par PAC.", "Installation PAC sur maison (avec radiateurs/plancher)."],
        qualif: [
            "Type chauffage existant + place pour unité extérieure.",
            "Contraintes électriques + objectifs (chauffage seul / eau chaude).",
        ],
    },
    {
        slug: "depannage-pompe-a-chaleur",
        title: "Dépannage pompe à chaleur",
        description: "PAC en défaut, baisse de performance : diagnostic/remise en route.",
        icon: "bi-wrench",
        cas: ["PAC en erreur et arrêt complet.", "Baisse de performance, bruit anormal, cycles courts."],
        qualif: [
            "Marque/modèle + code défaut + photos si possible.",
            "Historique (entretien, modifications récentes) + symptômes actuels.",
        ],
    },
    {
        slug: "ballon-eau-chaude",
        title: "Ballon d’eau chaude",
        description: "Fuite, résistance, remplacement : demande souvent rapide.",
        icon: "bi-droplet",
        cas: ["Ballon qui fuit (groupe de sécurité, cuve) ou goutte-à-goutte.", "Plus d’eau chaude (résistance/thermostat)."],
        qualif: [
            "Capacité + vertical/horizontal + accès (placard, plafond, garage).",
            "Symptômes + photo plaque si possible + délai/urgence.",
        ],
    },
];

const CHAUFFAGISTE_VILLES: Ville[] = [
    {
        slug: "senlis",
        name: "Senlis",
        description: "Zone prioritaire : dépannage et remplacement.",
        zone: "Senlis et alentours : interventions dépannage + devis remplacement.",
        demandes: "Pannes chaudière, entretien et remplacements avant l’hiver.",
    },
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Entretien + interventions rapides.",
        zone: "Chantilly et communes proches : entretien et dépannages.",
        demandes: "Entretiens chaudières et dépannages eau chaude/chauffage.",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Dépannages + ballon d’eau chaude.",
        zone: "Creil et secteur proche : demandes urgentes et planifiées.",
        demandes: "Dépannage chaudière et ballon d’eau chaude (panne/fuite).",
    },
    {
        slug: "pont-sainte-maxence",
        name: "Pont-Sainte-Maxence",
        description: "Secteur actif : entretien et remplacement.",
        zone: "Pont-Sainte-Maxence et alentours : déplacements réguliers.",
        demandes: "Entretiens + remplacements chaudières et demandes devis.",
    },
    {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : dépannage + PAC.",
        zone: "Luzarches et communes proches : interventions PAC/chaudière.",
        demandes: "Dépannages et projets PAC en progression sur le secteur.",
    },
    {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : rénovations, PAC, condensation.",
        zone: "L’Isle-Adam et alentours : chantiers souvent planifiés.",
        demandes: "Remplacements chaudière, projets PAC et rénovations chauffage.",
    },
];

// -------------------------
// COUVREUR
// -------------------------
const COUVREUR_SERVICES: Service[] = [
    {
        slug: "reparation-fuite-toiture",
        title: "Réparation fuite toiture",
        description: "Infiltration, tuile cassée : demande urgente et claire.",
        icon: "bi-house",
        cas: ["Infiltration après pluie, trace au plafond/mur.", "Tuile cassée/ardoise manquante visible depuis le sol."],
        qualif: [
            "Zone approximative + photos si possible (extérieur/intérieur).",
            "Accès toiture + sécurité (hauteur, cour, voisinage).",
        ],
    },
    {
        slug: "urgence-fuite-toiture",
        title: "Urgence fuite toiture",
        description: "Infiltration active : sécurisation, bâchage si besoin, puis réparation.",
        icon: "bi-exclamation-triangle",
        cas: ["Infiltration active avec dégât en cours (pluie).", "Besoin de sécuriser vite avant réparation complète."],
        qualif: [
            "Niveau d’urgence + ce qui est protégé à l’intérieur (seaux/bâche).",
            "Accès et conditions (météo, hauteur, possibilité d’intervention).",
        ],
    },
    {
        slug: "remplacement-tuiles-ardoises",
        title: "Remplacement tuiles / ardoises",
        description: "Remplacement localisé ou zone complète (tempête, vieillissement).",
        icon: "bi-grid",
        cas: ["Remplacement après tempête (tuiles envolées/cassées).", "Zone vieillissante à reprendre pour éviter les infiltrations."],
        qualif: [
            "Type de couverture + photos + surface approximative à reprendre.",
            "Accès toiture + contraintes (échafaudage, voisinage).",
        ],
    },
    {
        slug: "zinguerie-gouttieres",
        title: "Zinguerie & gouttières",
        description: "Gouttières, chéneaux, descentes : fuite, remplacement, débordement.",
        icon: "bi-droplet-half",
        cas: ["Gouttière percée/décrochée, fuite sur façade.", "Chéneau qui déborde et crée des traces/mousses."],
        qualif: [
            "Type (PVC/zinc) + longueur/zone + photos si possible.",
            "Accès façade + hauteur + possibilité d’échelle/échafaudage.",
        ],
    },
    {
        slug: "refection-faitage-solins",
        title: "Réfection faîtage / solins",
        description: "Faîtage fissuré, solins/abergements : source fréquente d’infiltrations.",
        icon: "bi-wrench-adjustable",
        cas: ["Solin cheminée fissuré, infiltration autour de l’abergement.", "Faîtage dégradé, fissures, tuiles faîtières à reprendre."],
        qualif: [
            "Localisation (cheminée, rive, faîtage) + photos utiles.",
            "Reprise partielle ou réfection plus large selon l’état.",
        ],
    },
    {
        slug: "renovation-toiture",
        title: "Rénovation toiture",
        description: "Réfection, reprise partielle, isolation : chantiers plus gros et devis.",
        icon: "bi-hammer",
        cas: ["Rénovation complète d’une couverture vieillissante.", "Reprise partielle + amélioration isolation/étanchéité."],
        qualif: [
            "Type charpente/couverture + accès + contraintes (monuments, copro).",
            "Délai + besoin de devis détaillé (travaux planifiés).",
        ],
    },
];

const COUVREUR_VILLES: Ville[] = [
    {
        slug: "senlis",
        name: "Senlis",
        description: "Toitures maisons, rénovations, demandes régulières.",
        zone: "Senlis et alentours : maisons, toitures traditionnelles et dépannages.",
        demandes: "Fuites après pluie, remplacement tuiles et reprises faîtage/solins.",
    },
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Mix dépannage / travaux.",
        zone: "Chantilly + communes proches : interventions rapides et chantiers planifiés.",
        demandes: "Réparations, gouttières/zinguerie et entretien ponctuel.",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Dépannage fuite + remplacement tuiles.",
        zone: "Creil et secteur proche : demandes urgentes et remises en état.",
        demandes: "Urgences fuites, tuiles/ardoises à reprendre après intempéries.",
    },
    {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Zone active : fuites, gouttières, interventions rapides.",
        zone: "Nogent-sur-Oise et communes voisines : interventions fréquentes.",
        demandes: "Fuites toiture, zinguerie/gouttières et petites réparations.",
    },
    {
        slug: "luzarches",
        name: "Luzarches",
        description: "Nord Val d’Oise : mix entretien et réparations.",
        zone: "Luzarches et alentours : demandes toiture toute l’année.",
        demandes: "Réparations localisées et reprises faîtage/solins.",
    },
    {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : rénovations + zinguerie soignée.",
        zone: "L’Isle-Adam et environs : chantiers souvent planifiés.",
        demandes: "Rénovations toiture, zinguerie et finitions soignées.",
    },
];

// -------------------------
// SERRURIER
// -------------------------
const SERRURIER_SERVICES: Service[] = [
    {
        slug: "ouverture-porte",
        title: "Ouverture de porte (porte claquée / clé perdue)",
        description: "Porte claquée, clés perdues : demandes urgentes et joignables.",
        icon: "bi-door-open",
        cas: ["Porte claquée avec clés à l’intérieur.", "Clé perdue/cassée, serrure bloquée."],
        qualif: [
            "Type de porte (simple/blindée) + situation (claquée/fermée à clé).",
            "Preuve d’occupation (adresse, nom sur boîte aux lettres, etc.).",
        ],
    },
    {
        slug: "ouverture-porte-blindee",
        title: "Ouverture de porte blindée",
        description: "Blocage, clé cassée, cylindre coincé : intervention + solution durable.",
        icon: "bi-shield-lock",
        cas: ["Clé coincée/cassée dans cylindre de porte blindée.", "Porte blindée claquée, serrure qui ne répond plus."],
        qualif: [
            "Marque/serrure si connue + photos utiles (cylindre, poignée).",
            "Contexte (urgence, enfants, accès) + preuve d’occupation.",
        ],
    },
    {
        slug: "changement-serrure",
        title: "Changement de serrure",
        description: "Remplacement standard ou sécurité renforcée : demande claire.",
        icon: "bi-key",
        cas: ["Après déménagement/perte de clés : remplacement rapide.", "Serrure qui accroche, cylindre fatigué, clé difficile."],
        qualif: [
            "Type serrure (encastrée/applique) + photo utile.",
            "Niveau de sécurité souhaité + délai (urgent ou planifié).",
        ],
    },
    {
        slug: "cylindre-barillet",
        title: "Cylindre / barillet (remplacement)",
        description: "Cylindre usé, clé cassée : demandes fréquentes et simples.",
        icon: "bi-gear",
        cas: ["Cylindre usé, clé qui tourne mal.", "Clé cassée, barillet à remplacer."],
        qualif: [
            "Mesures du cylindre ou photo de l’existant (recto/verso).",
            "Nombre de clés souhaité + accès sur place.",
        ],
    },
    {
        slug: "mise-en-securite",
        title: "Mise en sécurité après effraction",
        description: "Serrure forcée, porte abîmée : sécurisation + remplacement.",
        icon: "bi-exclamation-octagon",
        cas: ["Serrure forcée, barillet arraché, porte endommagée.", "Besoin de sécuriser provisoirement puis réparer durablement."],
        qualif: [
            "État porte/encadrement + photos (pour prévoir pièces).",
            "Besoin : provisoire immédiat ou remise en état complète.",
        ],
    },
    {
        slug: "renforcement-porte",
        title: "Renforcement de porte (serrure 3 points / cornières)",
        description: "Renforcer une porte existante : amélioration sécurité, devis.",
        icon: "bi-hammer",
        cas: ["Ajout serrure 3 points sur porte existante.", "Pose cornières/renforts anti-pince sur porte sensible."],
        qualif: [
            "Type de porte + contraintes (copropriété, épaisseur, sens d’ouverture).",
            "Objectif : dissuasion simple ou sécurité renforcée (selon budget).",
        ],
    },
];

const SERRURIER_VILLES: Ville[] = [
    {
        slug: "senlis",
        name: "Senlis",
        description: "Urgences et remplacements.",
        zone: "Senlis et alentours : interventions ouverture + remplacement.",
        demandes: "Portes claquées, cylindres à changer et sécurisations après incident.",
    },
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Portes claquées + changements.",
        zone: "Chantilly et communes proches : dépannage et remplacements.",
        demandes: "Ouvertures de porte et changements de serrure après perte de clés.",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Fort volume : ouvertures et sécurisation.",
        zone: "Creil et secteur proche : urgences et mises en sécurité.",
        demandes: "Ouvertures, cylindres/barillets et remises en sécurité.",
    },
    {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Urgences + cylindres.",
        zone: "Nogent-sur-Oise et communes voisines : interventions rapides.",
        demandes: "Portes bloquées/claquées et remplacements de cylindres.",
    },
    {
        slug: "beaumont-sur-oise",
        name: "Beaumont-sur-Oise",
        description: "Nord Val d’Oise : dépannages et devis.",
        zone: "Beaumont-sur-Oise et alentours : urgences et chantiers planifiés.",
        demandes: "Ouvertures + changements serrure + renforcement de porte.",
    },
    {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : renforcement et remplacements.",
        zone: "L’Isle-Adam et environs : interventions souvent propres et planifiées.",
        demandes: "Renforcement de porte, remplacement serrure et solutions durables.",
    },
];

// -------------------------
// MENUISIER
// -------------------------
const MENUISIER_SERVICES: Service[] = [
    {
        slug: "pose-fenetres",
        title: "Pose / remplacement de fenêtres",
        description: "PVC/alu/bois : remplacement, réglages, finitions (devis).",
        icon: "bi-window",
        cas: ["Remplacement simple vitrage/anciennes fenêtres.", "Fenêtre qui ferme mal, réglage ou reprise d’étanchéité."],
        qualif: [
            "Dimensions/nb de fenêtres + matériau souhaité (ou contraintes).",
            "Type de pose (rénovation/dépose totale) + photos utiles.",
        ],
    },
    {
        slug: "pose-portes",
        title: "Pose / remplacement de portes",
        description: "Porte d’entrée / intérieure : remplacement, ajustement, quincaillerie.",
        icon: "bi-door-open",
        cas: ["Remplacement porte d’entrée (sécurité, isolation).", "Pose/ajustement portes intérieures, quincaillerie."],
        qualif: [
            "Dimensions + sens ouverture + contraintes (sol, huisserie).",
            "Finition souhaitée + délai (planifié ou urgent).",
        ],
    },
    {
        slug: "volets-roulants",
        title: "Volets roulants (pose / réparation)",
        description: "Volet bloqué, sangle, moteur : demandes fréquentes.",
        icon: "bi-sliders",
        cas: ["Volet bloqué (tablier, sangle, treuil).", "Moteur HS : besoin de réparer ou remplacer."],
        qualif: [
            "Type (manuel/motorisé) + accès au coffre + photos utiles.",
            "Symptôme (bloqué en haut/bas, bruit, sangle cassée).",
        ],
    },
    {
        slug: "porte-de-garage",
        title: "Porte de garage (pose / réparation)",
        description: "Motorisation, réglage, remplacement : bon panier moyen.",
        icon: "bi-house-door",
        cas: ["Porte qui ne remonte plus, ressorts ou rails à vérifier.", "Motorisation à poser ou à réparer."],
        qualif: [
            "Type de porte (sectionnelle, basculante, enroulable) + dimensions.",
            "Accès + alimentation électrique disponible + usage (quotidien/occasionnel).",
        ],
    },
    {
        slug: "veranda-pergola",
        title: "Véranda / pergola (pose)",
        description: "Projet planifié : devis, mesures, pose (travaux).",
        icon: "bi-brightness-high",
        cas: ["Pergola alu sur terrasse, pose avec fixations propres.", "Projet véranda : besoin de métrés et chiffrage."],
        qualif: [
            "Surface + implantation + contraintes (mur, sol, évacuation).",
            "Contexte administratif si besoin (déclaration, copropriété).",
        ],
    },
    {
        slug: "amenagement-interieur",
        title: "Aménagement intérieur (placards, dressing)",
        description: "Placards, dressing, rangements : demandes sur-mesure.",
        icon: "bi-columns-gap",
        cas: ["Dressing sur-mesure (chambre), optimisation d’espace.", "Placards/rangements dans entrée ou sous escalier."],
        qualif: [
            "Dimensions mur/hauteur + besoin (penderie, étagères, tiroirs).",
            "Style + budget indicatif + délai (rendez-vous nécessaire).",
        ],
    },
];

const MENUISIER_VILLES: Ville[] = [
    {
        slug: "senlis",
        name: "Senlis",
        description: "Fenêtres, portes et aménagements.",
        zone: "Senlis et alentours : chantiers réguliers, maison et appartement.",
        demandes: "Fenêtres/portes et aménagements intérieurs (placards, dressing).",
    },
    {
        slug: "chantilly",
        name: "Chantilly",
        description: "Zone premium : rénovation + sur-mesure.",
        zone: "Chantilly et communes proches : projets souvent planifiés.",
        demandes: "Fenêtres/portes et demandes sur-mesure (dressing, placards).",
    },
    {
        slug: "creil",
        name: "Creil",
        description: "Volets roulants + dépannages.",
        zone: "Creil et secteur proche : dépannages et remplacements rapides.",
        demandes: "Volets roulants bloqués, portes et petites réparations.",
    },
    {
        slug: "nogent-sur-oise",
        name: "Nogent-sur-Oise",
        description: "Porte/volet : forte demande locale.",
        zone: "Nogent-sur-Oise et communes voisines : interventions fréquentes.",
        demandes: "Volets roulants, portes et réglages/ajustements.",
    },
    {
        slug: "beaumont-sur-oise",
        name: "Beaumont-sur-Oise",
        description: "Nord Val d’Oise : volets, portes, fenêtres.",
        zone: "Beaumont-sur-Oise et alentours : chantiers réguliers.",
        demandes: "Fenêtres, portes et volets (réparation/pose).",
    },
    {
        slug: "l-isle-adam",
        name: "L’Isle-Adam",
        description: "Zone premium : pergola/véranda.",
        zone: "L’Isle-Adam et environs : projets planifiés et finitions soignées.",
        demandes: "Pergola/véranda et remplacements fenêtres/portes haut de gamme.",
    },
];

export const METIERS: Metier[] = [
    {
        slug: "plombier",
        name: "Plombier",
        badge: "Plomberie",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: PLOMBIER_SERVICES,
        villes: PLOMBIER_VILLES,
    },
    {
        slug: "electricien",
        name: "Électricien",
        badge: "Électricité",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: ELECTRICIEN_SERVICES,
        villes: ELECTRICIEN_VILLES,
    },
    {
        slug: "chauffagiste",
        name: "Chauffagiste",
        badge: "Chauffage",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: CHAUFFAGISTE_SERVICES,
        villes: CHAUFFAGISTE_VILLES,
    },
    {
        slug: "couvreur",
        name: "Couvreur",
        badge: "Toiture",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: COUVREUR_SERVICES,
        villes: COUVREUR_VILLES,
    },
    {
        slug: "serrurier",
        name: "Serrurier",
        badge: "Serrurerie",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: SERRURIER_SERVICES,
        villes: SERRURIER_VILLES,
    },
    {
        slug: "menuisier",
        name: "Menuisier",
        badge: "Menuiserie",
        pageTitleImage: "/images/services/page-title.jpg",
        introImage: "/images/services/hero.svg",
        services: MENUISIER_SERVICES,
        villes: MENUISIER_VILLES,
    },
];

// -------------------------
// HUB VILLES (déduites des villes des métiers)
// -------------------------
export type HubVille = Ville & {
    // Métiers disponibles dans cette ville
    metiers: Array<{ slug: string; name: string; badge: string }>;
    // Pour trier/afficher des “prioritaires”
    priority: boolean;
};

export const VILLES_HUB: HubVille[] = (() => {
    const map = new Map<string, HubVille>();

    for (const m of METIERS) {
        for (const v of m.villes) {
            const existing = map.get(v.slug);

            if (!existing) {
                map.set(v.slug, {
                    ...v,
                    metiers: [{ slug: m.slug, name: m.name, badge: m.badge }],
                    // “priority” = vrai par défaut si la ville apparaît déjà dans au moins 1 métier
                    // (tu peux raffiner ensuite : ex. si ville dans >=2 métiers, etc.)
                    priority: true,
                });
            } else {
                // Fusion : garde le texte ville existant, et ajoute le métier s’il manque
                const already = existing.metiers.some((x) => x.slug === m.slug);
                if (!already) existing.metiers.push({ slug: m.slug, name: m.name, badge: m.badge });

                // Option : enrichir description/zone/demandes si tu veux une règle de merge
                // (ici on garde “le premier”, pour éviter des textes incohérents)
            }
        }
    }

    // Tri : villes avec le plus de métiers en premier, puis alpha
    return Array.from(map.values()).sort((a, b) => {
        const d = b.metiers.length - a.metiers.length;
        return d !== 0 ? d : a.name.localeCompare(b.name, "fr");
    });
})();
