import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoCrudTable } from "@/components/dashboard/demo-crud-table";
import { activities, branches, equipmentProducts, plans, schedules, trainers } from "@/data/demo";

const allowed = ["sedes", "actividades", "horarios", "profesores", "planes", "productos", "solicitudes", "cotizaciones", "consultas", "pruebas", "promociones", "socios"];
const titles: Record<string, string> = { sedes: "Sedes", actividades: "Actividades", horarios: "Horarios", profesores: "Profesores", planes: "Planes", productos: "Productos", solicitudes: "Solicitudes", cotizaciones: "Cotizaciones", consultas: "Consultas", pruebas: "Clases de prueba", promociones: "Promociones", socios: "Socios" };
type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() { return allowed.map((section) => ({ section })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { section } = await params; return { title: `${titles[section] ?? "Gestión"} · Admin`, robots: { index: false, follow: false } }; }
export default async function AdminSectionPage({ params }: Props) {
  const { section } = await params; if (!allowed.includes(section)) notFound();
  const rows = section === "sedes" ? branches.map((item) => ({ id: item.id, name: item.name, detail: item.address, status: "Publicada" })) : section === "actividades" ? activities.map((item) => ({ id: item.id, name: item.name, detail: item.level, status: "Activa" })) : section === "horarios" ? schedules.map((item) => ({ id: item.id, name: `${item.day} ${item.time}`, detail: `${item.activitySlug} · ${item.branchSlug}`, status: `${item.available} cupos` })) : section === "profesores" ? trainers.map((item) => ({ id: item.id, name: item.name, detail: item.specialty, status: "Activo" })) : section === "planes" ? plans.map((item) => ({ id: item.id, name: item.name, detail: item.description, status: "Sin precio publicado" })) : section === "productos" ? equipmentProducts.map((item) => ({ id: item.id, name: item.name, detail: item.category, status: item.availability })) : section === "socios" ? [{ id: "m1", name: "Alex Fernández", detail: "Plan Full · Wilde", status: "Demo activo" }, { id: "m2", name: "Perfil demostrativo 02", detail: "Musculación · Sarandí", status: "Demo pendiente" }] : section === "promociones" ? [{ id: "promo1", name: "Pase amigo", detail: "Beneficio mensual demostrativo", status: "Borrador" }] : [{ id: "req1", name: "Solicitud demostrativa", detail: "Consulta web · Wilde", status: "Nueva" }, { id: "req2", name: "Cotización demostrativa", detail: "Rack profesional · Mayorista", status: "En seguimiento" }];
  return <DemoCrudTable title={titles[section]} rows={rows} />;
}

