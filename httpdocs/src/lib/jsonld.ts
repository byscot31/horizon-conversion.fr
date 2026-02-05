import { site } from "./data";

export function serviceJsonLd(args: {
  serviceName: string;
  areaServed: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.serviceName,
    areaServed: args.areaServed,
    provider: {
      "@type": "ProfessionalService",
      name: site.siteName,
      url: site.baseUrl
    },
    url: args.url
  };
}