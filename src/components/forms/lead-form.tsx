"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { activities, branches } from "@/data/demo";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { whatsappUrl } from "@/lib/utils";
import { FormField } from "@/components/forms/form-field";

type Props = { defaultReason?: string; defaultBranch?: string; defaultMessage?: string; defaultActivity?: string; context?: string };

export function LeadForm({ defaultReason = "Consulta general", defaultBranch = "", defaultMessage = "", defaultActivity = "", context = "" }: Props) {
  const [preparedMessage, setPreparedMessage] = useState("");
  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { kind: "contact", name: "", email: "", phone: "", branch: defaultBranch, reason: defaultReason, activity: defaultActivity, message: defaultMessage, website: "" },
  });
  const selectedBranch = useWatch({ control, name: "branch" });
  const availableActivities = activities.filter((item) => item.branchSlugs.includes(selectedBranch));
  const onSubmit = (data: LeadInput) => {
    const branch = branches.find((item) => item.slug === data.branch)?.shortName ?? data.branch;
    const activity = activities.find((item) => item.slug === data.activity)?.name;
    setPreparedMessage([`Hola Lion Fitness, soy ${data.name}.`, `Consulta: ${data.reason}.`, `Sede: ${branch}.`, activity ? `Actividad: ${activity}.` : "", `Teléfono: ${data.phone}.`, `Email: ${data.email}.`, data.message].filter(Boolean).join("\n"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={() => setPreparedMessage("")} className="grid gap-5" noValidate>
      <input type="hidden" {...register("kind")} />
      <div className="hidden" aria-hidden="true"><label>Dejá este campo vacío<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      {context && <p className="border-l-2 border-lion bg-lion/5 p-3 text-sm text-white">{context}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nombre" error={errors.name?.message}><input className="input" autoComplete="name" {...register("name")} /></FormField>
        <FormField label="Teléfono" error={errors.phone?.message}><input className="input" type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} /></FormField>
      </div>
      <FormField label="Email" error={errors.email?.message}><input className="input" type="email" autoComplete="email" spellCheck={false} {...register("email")} /></FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Sede" error={errors.branch?.message}><select className="input" {...register("branch", { onChange: () => setValue("activity", "") })}><option value="">Elegí una sede</option>{branches.map((branch) => <option key={branch.id} value={branch.slug}>{branch.shortName}</option>)}</select></FormField>
        <FormField label="Motivo" error={errors.reason?.message}><select className="input" {...register("reason")}><option>Consulta general</option><option>Clase de prueba</option><option>Inscripción</option><option>Planes</option><option>Horarios</option><option>Lista de espera</option></select></FormField>
      </div>
      <FormField label="Actividad (opcional)" error={errors.activity?.message}><select className="input" {...register("activity")}><option value="">Elegí una actividad</option>{availableActivities.map((activity) => <option key={activity.id} value={activity.slug}>{activity.name}</option>)}</select></FormField>
      <FormField label="Mensaje" error={errors.message?.message}><textarea className="input min-h-28 resize-y" {...register("message")} /></FormField>
      <button type="submit" disabled={isSubmitting} className="button-base button-primary w-full disabled:opacity-60">Preparar consulta</button>
      <div role="status" aria-live="polite">
        {preparedMessage && <div className="border border-lion/30 bg-lion/5 p-4"><p className="text-sm text-white">Tu mensaje está listo. Abrí WhatsApp y enviá el mensaje para completar la consulta.</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{preparedMessage}</p><a href={whatsappUrl(preparedMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 button-base button-primary"><MessageCircle size={18} aria-hidden="true" /> Abrir WhatsApp</a></div>}
      </div>
      <p className="text-xs leading-5 text-muted">No guardamos tus datos ni enviamos mensajes automáticamente. Los datos que completes se compartirán con Lion Fitness cuando abras WhatsApp y envíes la consulta.</p>
    </form>
  );
}
