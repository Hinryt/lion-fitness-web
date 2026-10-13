"use client";

import { CalendarX2, Check, Clock, Users } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Activity, Branch, Schedule, Trainer } from "@/types/domain";
import { cn } from "@/lib/utils";

export function ScheduleExplorer({ schedules, branches, activities, trainers, privateMode = false }: { schedules: Schedule[]; branches: Branch[]; activities: Activity[]; trainers: Trainer[]; privateMode?: boolean }) {
  const [branch, setBranch] = useState("Todas"); const [activity, setActivity] = useState("Todas"); const [day, setDay] = useState("Todos"); const [trainer, setTrainer] = useState("Todos");
  const [booked, setBooked] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => schedules.filter((item) => (branch === "Todas" || item.branchSlug === branch) && (activity === "Todas" || item.activitySlug === activity) && (day === "Todos" || item.day === day) && (trainer === "Todos" || item.trainerId === trainer)), [schedules, branch, activity, day, trainer]);
  const name = (collection: Array<{ id?: string; slug?: string; name: string; shortName?: string }>, key: string) => collection.find((item) => item.id === key || item.slug === key)?.shortName ?? collection.find((item) => item.id === key || item.slug === key)?.name ?? key;
  const select = "input min-w-0";
  return (
    <div>
      <p role="status" className="mb-3 text-sm text-muted">{notice}</p>
      <div className="grid gap-3 border border-white/10 bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="filter-label">Sede<select className={select} value={branch} onChange={(event) => setBranch(event.target.value)}><option>Todas</option>{branches.map((item) => <option key={item.id} value={item.slug}>{item.shortName}</option>)}</select></label>
        <label className="filter-label">Actividad<select className={select} value={activity} onChange={(event) => setActivity(event.target.value)}><option>Todas</option>{activities.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
        <label className="filter-label">Día<select className={select} value={day} onChange={(event) => setDay(event.target.value)}><option>Todos</option>{[...new Set(schedules.map((item) => item.day))].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-label">Profesor<select className={select} value={trainer} onChange={(event) => setTrainer(event.target.value)}><option>Todos</option>{trainers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      {filtered.length === 0 ? <div className="empty-state"><CalendarX2 size={34} /><h2>No hay clases con estos filtros</h2><p>Cambiá la sede, actividad o día para ver más horarios.</p></div> : (
        <div className="mt-5 grid gap-3">{filtered.map((item) => {
          const full = item.available === 0; const low = item.available > 0 && item.available <= 4; const isBooked = booked.includes(item.id);
          return <article key={item.id} className="grid gap-4 border border-white/10 bg-card p-5 sm:grid-cols-[100px_1fr_auto] sm:items-center"><div><p className="font-heading text-3xl text-white">{item.time}</p><p className="text-xs uppercase tracking-wide text-muted">{item.day}</p></div><div><h2 className="text-lg font-bold text-white">{name(activities, item.activitySlug)}</h2><p className="mt-1 text-sm text-muted">{name(branches, item.branchSlug)} · {name(trainers, item.trainerId)}</p><p className={cn("mt-2 flex items-center gap-2 text-xs font-bold", full ? "text-error" : low ? "text-lion" : "text-success")}><Users size={14} />{full ? "Sin cupo" : low ? `¡Quedan ${item.available} cupos!` : `${item.available} cupos disponibles`}</p></div>{privateMode && !full ? <button disabled={isBooked} onClick={() => { setBooked((current) => [...current, item.id]); setNotice("Reserva simulada. No se guardó una reserva ni se modificaron los cupos reales."); }} className="button-base button-secondary min-w-36 disabled:opacity-50">{isBooked ? <><Check size={17} aria-hidden="true" /> Reserva demo</> : "Simular reserva"}</button> : <Link href={`/contacto?motivo=${full ? "lista-espera" : "clase"}&sede=${item.branchSlug}&actividad=${item.activitySlug}&horario=${item.id}`} className="button-base button-secondary min-w-36">{full ? <><Clock size={17} aria-hidden="true" /> Consultar lista de espera</> : "Solicitar clase"}</Link>}</article>;
        })}</div>
      )}
    </div>
  );
}
