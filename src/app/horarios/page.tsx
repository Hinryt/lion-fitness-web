import type { Metadata } from "next";
import { ScheduleExplorer } from "@/components/explorers/schedule-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { activities, branches, schedules, trainers } from "@/data/demo";

export const metadata: Metadata = { alternates: { canonical: "/horarios" }, title: "Horarios", description: "Consultá horarios por sede, actividad, día y profesor." };
export default function SchedulesPage() { return <><PageHero eyebrow="Organizá tu semana" title="Encontrá tu próxima clase" description="Los horarios y cupos publicados son demostrativos hasta conectar el sistema de reservas real." /><section className="section-space"><div className="container-shell"><ScheduleExplorer schedules={schedules} branches={branches} activities={activities} trainers={trainers} /></div></section></>; }
