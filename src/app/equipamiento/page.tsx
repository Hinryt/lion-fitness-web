import type { Metadata } from "next";
import { EquipmentCatalog } from "@/components/explorers/equipment-catalog";
import { PageHero } from "@/components/ui/page-hero";
import { equipmentProducts } from "@/data/demo";

export const metadata: Metadata = { alternates: { canonical: "/equipamiento" }, title: "Equipamiento profesional", description: "Catálogo de máquinas y equipamiento profesional Lion Fitness." };
export default function EquipmentPage() { return <><PageHero eyebrow="Lion Equipamiento" title="Hecho para el entrenamiento real" description="Equipos fabricados y probados dentro del ecosistema Lion Fitness. Soluciones minoristas y mayoristas." /><section className="section-space"><div className="container-shell"><EquipmentCatalog products={equipmentProducts} /></div></section></>; }
