import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Lion Fitness — La fuerza de la manada", short_name: "Lion Fitness", description: "Sedes, clases, rutinas y equipamiento Lion Fitness.", start_url: "/", display: "standalone", background_color: "#0B0C0E", theme_color: "#FFD400", orientation: "portrait-primary", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }, { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }] }; }

