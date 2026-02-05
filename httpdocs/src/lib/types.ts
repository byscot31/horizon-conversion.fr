export type ServiceKey = "google-ads" | "seo-local" | "meta-ads" | "cro";

export type Service = { key: ServiceKey; label: string };
export type Department = { code: "60" | "95"; name: string };

export type City = {
  slug: string;
  name: string;
  dept: Department["code"];
  near?: string[];
};

export type SiteConfig = {
  siteName: string;
  baseUrl: string; // ex: https://ton-domaine.fr
  area: string;    // ex: Sud Oise (60) & Val d’Oise (95)
};