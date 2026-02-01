import services from "../data/services.json";
import specialites from "../data/specialites.json";
import villes from "../data/villes.json";
import zones from "../data/zones.json";

export { services, specialites, villes, zones };

export function getZoneBySlug(slug: string) {
    return (zones as any[]).find(z => z.slug === slug);
}
export function getVilleBySlug(slug: string) {
    return (villes as any[]).find(v => v.slug === slug);
}
export function getServiceBySlug(slug: string) {
    return (services as any[]).find(s => s.slug === slug);
}
export function getSpecialiteBySlug(slug: string) {
    return (specialites as any[]).find(s => s.slug === slug);
}