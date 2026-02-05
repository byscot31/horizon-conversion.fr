import type { City, Department, Service, SiteConfig } from "./types";

import citiesRaw from "../data/cities.json";
import departmentsRaw from "../data/departments.json";
import servicesRaw from "../data/services.json";
import siteRaw from "../data/site.json";

export const cities = citiesRaw as City[];
export const departments = departmentsRaw as Department[];
export const services = servicesRaw as Service[];
export const site = siteRaw as SiteConfig;

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
export const getDepartment = (code: string) => departments.find((d) => d.code === code);
export const getService = (key: string) => services.find((s) => s.key === key);
export const citiesByDept = (code: string) => cities.filter((c) => c.dept === code);