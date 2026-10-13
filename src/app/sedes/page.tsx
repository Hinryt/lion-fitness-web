import type { Metadata } from "next";
import { BranchExplorer } from "@/components/explorers/branch-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { activities, branches } from "@/data/demo";

export const metadata: Metadata = { alternates: { canonical: "/sedes" }, title: "Sedes", description: "Encontrá la sede Lion Fitness más cercana en Wilde, Sarandí o Lanús Este." };

export default function BranchesPage() {
  return <><PageHero eyebrow="Entrená cerca" title="Tu próxima sede está acá" description="Filtrá por zona o actividad y encontrá el espacio que mejor acompaña tu forma de entrenar." /><section className="section-space"><div className="container-shell"><BranchExplorer branches={branches} activities={activities} /><div className="mt-14 border border-white/10 bg-card p-7"><p className="eyebrow">Mapa</p><h2 className="mt-3 font-heading text-4xl uppercase text-white">Vista preparada para Google Maps o Mapbox</h2><p className="mt-3 max-w-2xl text-muted">En este MVP usamos enlaces de búsqueda verificados por dirección y no inventamos coordenadas. El adaptador de mapas puede conectarse cuando se disponga de una clave.</p></div></div></section></>;
}
