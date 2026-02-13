export const routes = {
  zone: (zoneSlug: string) => `/zones/${zoneSlug}/`,
  ville: (zoneSlug: string, villeSlug: string) => `/zones/${zoneSlug}/${villeSlug}/`,
  service: (serviceSlug: string) => `/services/${serviceSlug}/`,
  serviceVille: (zoneSlug: string, villeSlug: string, serviceSlug: string) =>
    `/zones/${zoneSlug}/${villeSlug}/${serviceSlug}/`,
  cibleVille: (zoneSlug: string, villeSlug: string, cibleSlug: string) =>
    `/zones/${zoneSlug}/${villeSlug}/${cibleSlug}/`,
};
