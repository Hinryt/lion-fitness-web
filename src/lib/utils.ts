import { siteConfig } from "@/data/demo";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price?: number, period?: string) {
  if (price === undefined) return "Consultá el precio";
  return `${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price)}${period ? ` / ${period}` : ""}`;
}

