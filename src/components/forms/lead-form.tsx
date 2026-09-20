"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { branches } from "@/data/demo";
import { leadSchema, type LeadInput } from "@/lib/schemas";

export function LeadForm({ defaultReason = "Consulta general" }: { defaultReason?: string }) {
  const [serverState, setServerState] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { kind: "contact", name: "", email: "", phone: "", branch: "", reason: defaultReason, message: "", website: "" },
  });

  const onSubmit = async (data: LeadInput) => {
    setServerState("idle");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Request failed");
      setServerState("success");
      reset();
    } catch {
      setServerState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <input type="hidden" {...register("kind")} />
      <div className="hidden" aria-hidden="true"><label>Dejá este campo vacío<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" error={errors.name?.message}><input className="input" autoComplete="name" {...register("name")} /></Field>
        <Field label="Teléfono" error={errors.phone?.message}><input className="input" inputMode="tel" autoComplete="tel" {...register("phone")} /></Field>
      </div>
      <Field label="Email" error={errors.email?.message}><input className="input" type="email" autoComplete="email" {...register("email")} /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Sede" error={errors.branch?.message}>
          <select className="input" {...register("branch")}><option value="">Elegí una sede</option>{branches.map((branch) => <option key={branch.id} value={branch.slug}>{branch.shortName}</option>)}</select>
        </Field>
        <Field label="Motivo" error={errors.reason?.message}>
          <select className="input" {...register("reason")}><option>Consulta general</option><option>Clase de prueba</option><option>Inscripción</option><option>Planes</option><option>Horarios</option></select>
        </Field>
      </div>
      <Field label="Mensaje" error={errors.message?.message}><textarea className="input min-h-28 resize-y" {...register("message")} /></Field>
      {serverState === "success" && <Status type="success">Recibimos tu consulta de demostración. Te contactaríamos a la brevedad.</Status>}
      {serverState === "error" && <Status type="error">No pudimos enviar el formulario. Probá nuevamente o escribinos por WhatsApp.</Status>}
      <button type="submit" disabled={isSubmitting} className="button-base button-primary w-full disabled:opacity-60">
        {isSubmitting ? <><LoaderCircle className="animate-spin" size={18} /> Enviando…</> : "Enviar consulta"}
      </button>
      <p className="text-xs leading-5 text-muted">MVP demostrativo: la validación funciona en cliente y servidor; la persistencia se activa al conectar una base de datos o CRM.</p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-white">{label}{children}{error && <span className="text-xs font-medium text-error">{error}</span>}</label>;
}

function Status({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const Icon = type === "success" ? CheckCircle2 : TriangleAlert;
  return <div role="status" className={`flex gap-3 border p-4 text-sm ${type === "success" ? "border-success/40 bg-success/10 text-success" : "border-error/40 bg-error/10 text-error"}`}><Icon className="shrink-0" size={19} />{children}</div>;
}

