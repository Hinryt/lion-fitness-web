import type { MetadataRoute } from "next";
import { activities, branches, equipmentProducts, siteConfig } from "@/data/demo";
export default function sitemap(): MetadataRoute.Sitemap { const paths = ["", "/sedes", "/actividades", "/horarios", "/planes", "/equipamiento", "/comunidad", "/nosotros", "/contacto", ...branches.map((item) => `/sedes/${item.slug}`), ...activities.map((item) => `/actividades/${item.slug}`), ...equipmentProducts.map((item) => `/equipamiento/${item.slug}`)]; return paths.map((path) => ({ url: `${siteConfig.baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : .7 })); }

