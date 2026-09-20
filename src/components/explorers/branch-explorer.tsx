"use client";

import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Activity, Branch } from "@/types/domain";

export function BranchExplorer({ branches, activities }: { branches: Branch[]; activities: Activity[] }) {
  const [query, setQuery] = useState("");
  const [locality, setLocality] = useState("Todas");
  const [activity, setActivity] = useState("Todas");
  const localities = ["Todas", ...new Set(branches.map((branch) => branch.locality))];
  const filtered = useMemo(() => branches.filter((branch) => {
    const term = query.toLowerCase();
    return (branch.name.toLowerCase().includes(term) || branch.address.toLowerCase().includes(term)) && (locality === "Todas" || branch.locality === locality) && (activity === "Todas" || branch.activitySlugs.includes(activity));
  }), [query, locality, activity, branches]);

  return (
    <>
      <div className="grid gap-3 border border-white/10 bg-card p-4 md:grid-cols-[1fr_220px_220px]">
        <label className="relative"><span className="sr-only">Buscar sede</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por sede o dirección" className="input pl-11" /></label>
        <label><span className="sr-only">Filtrar por localidad</span><select value={locality} onChange={(event) => setLocality(event.target.value)} className="input">{localities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Filtrar por actividad</span><select value={activity} onChange={(event) => setActivity(event.target.value)} className="input"><option>Todas</option>{activities.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
      </div>
      {filtered.length === 0 ? <div className="empty-state"><Search size={32} /><h2>No encontramos sedes</h2><p>Probá con otra búsqueda o quitá algún filtro.</p></div> : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">{filtered.map((branch) => (
          <article key={branch.id} className="group grid overflow-hidden border border-white/10 bg-card sm:grid-cols-[180px_1fr]">
            <div className="relative min-h-48 overflow-hidden"><Image src={branch.image} alt={`Entrenamiento en ${branch.name}`} fill sizes="(max-width: 640px) 100vw, 180px" className="object-cover transition duration-500 group-hover:scale-105" /></div>
            <div className="p-6"><span className={`unit-pill ${branch.unit === "box" ? "unit-box" : "unit-gym"}`}>{branch.unit === "box" ? "Lion Box" : "Gimnasio"}</span><h2 className="mt-4 font-heading text-3xl uppercase text-white">{branch.shortName}</h2><p className="mt-2 flex gap-2 text-sm text-muted"><MapPin className="shrink-0" size={16} />{branch.address}</p><p className="mt-4 text-sm leading-6 text-muted">{branch.schedule}</p><Link href={`/sedes/${branch.slug}`} className="mt-5 inline-flex font-bold text-lion">Ver sede →</Link></div>
          </article>
        ))}</div>
      )}
    </>
  );
}

