// src/data/nap.ts
export const NAP = {
  name: "Horizon Conversion Animaux",
  phoneDisplay: "06 60 92 10 08",
  phoneE164: "+33660921008",
  email: "contact@horizon-conversion.fr",
  url: "https://animaux.horizon-conversion.fr",

  // Zone de service claire (texte + schema)
  areaServed: ["Sud Oise (60)", "Val d’Oise (95)"],

  // Adresse: tu peux rester “soft” (pas de rue) si tu veux.
  // Laisser vide si tu ne souhaites rien afficher.
  address: {
    addressCountry: "FR",
    addressRegion: "Hauts-de-France / Île-de-France",
    // addressLocality: "Senlis", // optionnel
    // postalCode: "60300",       // optionnel
  },

  // Google Business Profile (si tu en as un). Laisse vide sinon.
  googleBusinessProfileUrl: "",

  // Page tarifs (si elle existe)
  tarifsUrl: "/tarifs/",
};