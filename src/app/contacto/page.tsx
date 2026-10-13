import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/ui/page-hero";
import { activities, branches, plans, schedules, siteConfig } from "@/data/demo";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Contacto", description: "Consultá por sedes, planes, clases de prueba o equipamiento Lion Fitness.", alternates: { canonical: "/contacto" } };
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const schedule = schedules.find((item) => item.id === value("horario"));
  const branch = branches.find((item) => item.slug === (schedule?.branchSlug ?? value("sede")));
  const activity = activities.find((item) => item.slug === (schedule?.activitySlug ?? value("actividad")));
  const plan = plans.find((item) => item.slug === value("plan"));
  const reason = value("motivo");
  const defaultReason = reason === "lista-espera" ? "Lista de espera" : reason.includes("clase") ? "Clase de prueba" : reason === "plan" ? "Planes" : ["inscripcion", "empezar"].includes(reason) ? "Inscripción" : "Consulta general";
  const defaultActivity = activity && branch?.activitySlugs.includes(activity.slug) ? activity.slug : "";
  const details = [plan ? `Plan: ${plan.name}.` : "", activity && !defaultActivity ? `Actividad: ${activity.name}.` : "", schedule ? `Horario: ${schedule.day} a las ${schedule.time}.` : ""].filter(Boolean).join(" ");
  const context = [branch?.shortName, plan?.name, activity?.name, schedule ? `${schedule.day} · ${schedule.time}` : ""].filter(Boolean).join(" · ");
  const defaults = { defaultReason, defaultBranch: branch?.slug ?? "", defaultActivity, defaultMessage: details, context };
  return <>
    <PageHero eyebrow="Hablemos" title="Tu consulta, en el canal que prefieras" description="Contanos qué necesitás y prepará un mensaje para hablar directamente con el equipo por WhatsApp." />
    <section className="section-space"><div className="container-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
      <aside className="space-y-5">
        <a href={whatsappUrl(`Hola Lion Fitness, quiero consultar por ${defaultReason.toLowerCase()}.${context ? ` ${context}.` : ""}`)} target="_blank" rel="noopener noreferrer" className="flex gap-4 border border-lion/30 bg-card p-5"><MessageCircle className="text-lion" aria-hidden="true" /><span><strong className="block text-white">WhatsApp</strong><small className="text-muted">{siteConfig.phoneDisplay}</small></span></a>
        <a href={`tel:+${siteConfig.phoneE164}`} className="flex gap-4 border border-white/10 bg-card p-5 hover:border-lion"><Phone className="text-lion" aria-hidden="true" /><span><strong className="block text-white">Llamanos</strong><small className="text-muted">{siteConfig.phoneDisplay}</small></span></a>
        {branches.map((branch) => <a key={branch.id} href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-4 border border-white/10 bg-card p-5 hover:border-lion"><MapPin className="shrink-0 text-lion" aria-hidden="true" /><span><strong className="block text-white">{branch.shortName}</strong><small className="text-muted">{branch.address}<br />{branch.schedule}</small><span className="mt-2 block text-xs font-bold text-lion">Cómo llegar</span></span></a>)}
      </aside>
      <div className="border border-white/10 bg-card p-6 sm:p-8"><h2 className="font-heading text-4xl text-white">Contanos qué necesitás</h2><div className="mt-7"><LeadForm key={JSON.stringify(defaults)} {...defaults} /></div></div>
    </div></section>
  </>;
}
