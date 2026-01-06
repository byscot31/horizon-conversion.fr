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
    pageTitleImage: "/images/services/adwords-title.jpg", // remplace quand tu veux
    introImage: "/images/services/adwords.svg", // remplace par une icône plomberie si tu as
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

  // Préparé pour les prochains métiers (tu complètes au fur et à mesure)
  { slug: "electricien", name: "Électricien", badge: "Électricité", pageTitleImage: "/images/services/analysis-title.jpg", introImage: "/images/services/analysis.svg", services: [], villes: VILLES_PILOTE },
  { slug: "chauffagiste", name: "Chauffagiste", badge: "Chauffage", pageTitleImage: "/images/services/analysis-title.jpg", introImage: "/images/services/analysis.svg", services: [], villes: VILLES_PILOTE },
  { slug: "couvreur", name: "Couvreur", badge: "Toiture", pageTitleImage: "/images/services/analysis-title.jpg", introImage: "/images/services/analysis.svg", services: [], villes: VILLES_PILOTE },
  { slug: "serrurier", name: "Serrurier", badge: "Serrurerie", pageTitleImage: "/images/services/analysis-title.jpg", introImage: "/images/services/analysis.svg", services: [], villes: VILLES_PILOTE },
  { slug: "menuisier", name: "Menuisier", badge: "Menuiserie", pageTitleImage: "/images/services/analysis-title.jpg", introImage: "/images/services/analysis.svg", services: [], villes: VILLES_PILOTE },
];
