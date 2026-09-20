"use client";

import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { activities, branches } from "@/data/demo";
import { cn, whatsappUrl } from "@/lib/utils";

const reasons = ["Clase de prueba", "Inscripción", "Consultar un plan", "Otra consulta"];
const contactMethods = ["WhatsApp", "Email", "Llamada"];

export function TrialFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selection, setSelection] = useState({ branch: "", activity: "", reason: "", contact: "" });
  const values = [selection.branch, selection.activity, selection.reason, selection.contact];
  const options = [
    branches.map((branch) => [branch.slug, branch.shortName]),
    activities.map((activity) => [activity.slug, activity.name]),
    reasons.map((reason) => [reason, reason]),
    contactMethods.map((method) => [method, method]),
  ];
  const labels = ["Elegí tu sede", "¿Qué querés entrenar?", "¿Cómo podemos ayudarte?", "¿Por dónde te contactamos?"];
  const keys = ["branch", "activity", "reason", "contact"] as const;

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);

  if (!open) return null;

  const finish = () => {
    if (selection.contact === "WhatsApp") {
      window.open(whatsappUrl(`Hola Lion Fitness. Quiero consultar por ${selection.reason.toLowerCase()} en ${selection.branch}, actividad ${selection.activity}.`), "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-black/75 p-0 sm:place-items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="trial-title">
      <div className="w-full max-w-xl border border-white/15 bg-card p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Paso {Math.min(step + 1, 4)} de 4</p>
          <button onClick={onClose} className="grid size-10 place-items-center border border-white/10 text-white" aria-label="Cerrar"><X /></button>
        </div>
        {submitted ? (
          <div className="py-10 text-center" aria-live="polite">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success"><Check size={30} /></span>
            <h2 id="trial-title" className="mt-6 font-heading text-4xl uppercase text-white">¡Ya sos parte del primer paso!</h2>
            <p className="mt-3 text-muted">Guardamos tu selección en modo demostración. Al conectar el CRM, esta solicitud quedará registrada automáticamente.</p>
            <button onClick={onClose} className="mt-7 button-base button-primary">Listo</button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex gap-2" aria-hidden="true">{[0, 1, 2, 3].map((index) => <span key={index} className={cn("h-1 flex-1 bg-white/10", index <= step && "bg-lion")} />)}</div>
            <h2 id="trial-title" className="mt-8 font-heading text-4xl uppercase text-white">{labels[step]}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {options[step].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={cn("min-h-14 border px-4 text-left text-sm font-bold transition", values[step] === value ? "border-lion bg-lion text-ink" : "border-white/15 text-white hover:border-white/40")}
                  onClick={() => setSelection((current) => ({ ...current, [keys[step]]: value }))}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between gap-3">
              <button type="button" disabled={step === 0} onClick={() => setStep((current) => current - 1)} className="button-base button-ghost disabled:opacity-30"><ChevronLeft size={18} /> Atrás</button>
              {step < 3 ? (
                <button type="button" disabled={!values[step]} onClick={() => setStep((current) => current + 1)} className="button-base button-primary disabled:cursor-not-allowed disabled:opacity-30">Continuar <ChevronRight size={18} /></button>
              ) : (
                <button type="button" disabled={!values[step]} onClick={finish} className="button-base button-primary disabled:opacity-30">Enviar solicitud <Check size={18} /></button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

