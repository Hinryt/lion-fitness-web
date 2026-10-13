import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { activities } from "@/data/demo";

export const metadata: Metadata = { alternates: { canonical: "/actividades" }, title: "Actividades", description: "Musculación, Cross, Funcional, GAP, Stretching, Boxeo, Oly y Spinning en Lion Fitness." };

export default function ActivitiesPage() {
  return <><PageHero eyebrow="Movete con intención" title="Hay una actividad para cada objetivo" description="Empezá donde estás. Nuestros profesores adaptan la intensidad y te ayudan a construir progreso real." /><section className="section-space"><div className="container-shell grid gap-4 md:grid-cols-2">{activities.map((activity) => <article key={activity.id} className={`border-l-4 ${activity.unit === "box" ? "border-lion" : "border-gym"} bg-card p-7`}><span className={`unit-pill ${activity.unit === "box" ? "unit-box" : "unit-gym"}`}>{activity.unit === "box" ? "Lion Box" : "Gimnasio"}</span><p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted">{activity.eyebrow}</p><h2 className="mt-2 font-heading text-4xl uppercase text-white">{activity.name}</h2><p className="mt-4 leading-7 text-muted">{activity.description}</p><div className="mt-5 flex gap-5 text-xs font-bold uppercase tracking-wide text-[#d8dce1]"><span>{activity.level}</span><span>{activity.duration}</span></div><Link href={`/actividades/${activity.slug}`} className="mt-7 inline-flex items-center gap-2 font-bold text-lion">Ver actividad <ArrowRight size={17} /></Link></article>)}</div></section></>;
}
