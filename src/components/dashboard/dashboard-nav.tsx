"use client";

import { Activity, BadgeCheck, BarChart3, CalendarDays, CreditCard, Dumbbell, Gift, LayoutDashboard, MapPin, Package, Settings2, TicketCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const memberItems = [
  ["Resumen", "/mi-cuenta", LayoutDashboard], ["Mi rutina", "/mi-cuenta/rutina", Dumbbell], ["Clases", "/mi-cuenta/clases", CalendarDays], ["Pagos", "/mi-cuenta/pagos", CreditCard], ["Progreso", "/mi-cuenta/progreso", BarChart3], ["Beneficios", "/mi-cuenta/beneficios", Gift], ["Credencial", "/mi-cuenta/credencial", BadgeCheck],
] as const;
const adminItems = [
  ["Dashboard", "/admin", LayoutDashboard], ["Sedes", "/admin/sedes", MapPin], ["Actividades", "/admin/actividades", Activity], ["Horarios", "/admin/horarios", CalendarDays], ["Profesores", "/admin/profesores", Users], ["Planes", "/admin/planes", TicketCheck], ["Productos", "/admin/productos", Package], ["Solicitudes", "/admin/solicitudes", Settings2], ["Socios", "/admin/socios", Users],
] as const;

export function DashboardNav({ mode }: { mode: "member" | "admin" }) {
  const pathname = usePathname(); const items = mode === "member" ? memberItems : adminItems;
  return <><aside className="fixed bottom-0 left-0 top-0 z-[60] hidden w-64 border-r border-white/10 bg-[#08090a] p-5 pt-7 lg:block"><Logo /><div className="mt-9 border border-lion/25 bg-lion/10 p-3 text-xs leading-5 text-[#fff1a0]"><strong className="block uppercase">Modo demostración</strong>{mode === "member" ? "Portal de socio" : "Panel administrativo"}</div><nav className="mt-6 grid gap-1" aria-label={mode === "member" ? "Navegación de socio" : "Navegación administrativa"}>{items.map(([label, href, Icon]) => <Link key={href} href={href} className={cn("flex items-center gap-3 px-3 py-3 text-sm font-bold text-muted hover:bg-white/5 hover:text-white", pathname === href && "bg-lion text-ink hover:bg-lion hover:text-ink")}><Icon size={18} />{label}</Link>)}</nav><Link href="/" className="absolute bottom-6 left-8 text-xs font-bold uppercase tracking-wide text-muted">← Volver al sitio</Link></aside><nav className="dashboard-mobile-nav fixed inset-x-0 bottom-0 z-[65] flex overflow-x-auto border-t border-white/10 bg-[#08090a] lg:hidden" aria-label="Navegación privada móvil">{items.slice(0, mode === "member" ? 7 : 5).map(([label, href, Icon]) => <Link key={href} href={href} className={cn("flex min-w-[76px] flex-1 flex-col items-center gap-1 px-2 py-3 text-[10px] font-bold text-muted", pathname === href && "bg-lion text-ink")}><Icon size={18} /><span>{label}</span></Link>)}</nav></>;
}
