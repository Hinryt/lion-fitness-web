"use client";

import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { activities, branches } from "@/data/demo";
import { cn, whatsappUrl } from "@/lib/utils";

const reasons = [
  ["clase-de-prueba", "Clase de prueba"],
  ["inscripcion", "Inscripción"],
  ["plan", "Consultar un plan"],
  ["consulta", "Otra consulta"],
];

export function TrialFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({ branch: "", activity: "", reason: "" });
  const branch = branches.find((item) => item.slug === selection.branch);
  const activity = activities.find((item) => item.slug === selection.activity);
  const reason = reasons.find(([value]) => value === selection.reason)?.[1];
  const options = [
    branches.map((item) => [item.slug, item.shortName]),
    activities.filter((item) => branch?.activitySlugs.includes(item.slug)).map((item) => [item.slug, item.name]),
    reasons,
  ];
  const values = [selection.branch, selection.activity, selection.reason];
  const labels = ["Elegí tu sede", "¿Qué querés entrenar?", "¿Cómo podemos ayudarte?", "Tu consulta está lista"];
  const keys = ["branch", "activity", "reason"] as const;
  const query = new URLSearchParams({ motivo: selection.reason, sede: selection.branch, actividad: selection.activity });
  const message = `Hola Lion Fitness. Quiero consultar por ${reason?.toLowerCase() ?? "entrenamiento"} en ${branch?.shortName ?? ""}, actividad ${activity?.name ?? ""}.`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => { if (dialogRef.current?.open) titleRef.current?.focus(); }, [step]);

  return (
    <dialog ref={dialogRef} aria-labelledby="trial-title" aria-describedby="trial-description" onCancel={(event) => { event.preventDefault(); onClose(); }} className="trial-dialog fixed m-auto w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto border border-white/15 bg-card p-6 text-white shadow-2xl sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow" aria-live="polite">Paso {step + 1} de 4</p>
        <button type="button" onClick={onClose} className="grid size-11 place-items-center border border-white/15" aria-label="Cerrar"><X aria-hidden="true" /></button>
      </div>
      <div className="mt-6 flex gap-2" aria-hidden="true">{[0, 1, 2, 3].map((index) => <span key={index} className={cn("h-1 flex-1 bg-white/10", index <= step && "bg-lion")} />)}</div>
      <h2 ref={titleRef} tabIndex={-1} id="trial-title" className="mt-7 font-heading text-3xl">{labels[step]}</h2>
      <p id="trial-description" className="mt-3 text-sm leading-6 text-muted">{step < 3 ? "Elegí una opción para continuar. Podés volver y cambiarla." : "Abrí WhatsApp y enviá el mensaje para que el equipo reciba tu consulta. Todavía no se envió ni se guardó ninguna solicitud."}</p>
      {step < 3 ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {options[step].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={values[step] === value} className={cn("min-h-14 border px-4 py-3 text-left text-sm font-bold transition-colors", values[step] === value ? "border-lion bg-lion text-ink" : "border-white/15 hover:border-white/40")} onClick={() => setSelection((current) => ({ ...current, [keys[step]]: value, ...(step === 0 ? { activity: "" } : {}) }))}>{label}</button>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <dl className="grid gap-3 border border-white/10 p-4 text-sm"><div><dt className="text-muted">Sede</dt><dd className="font-bold">{branch?.shortName}</dd></div><div><dt className="text-muted">Actividad</dt><dd className="font-bold">{activity?.name}</dd></div><div><dt className="text-muted">Motivo</dt><dd className="font-bold">{reason}</dd></div></dl>
          <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="mt-6 button-base button-primary w-full"><MessageCircle size={18} aria-hidden="true" /> Continuar en WhatsApp</a>
          <Link href={`/contacto?${query}`} onClick={onClose} className="mt-4 block text-center text-sm font-bold text-lion">Agregar mis datos a la consulta</Link>
        </div>
      )}
      <div className="mt-8 flex justify-between gap-3">
        <button type="button" disabled={step === 0} onClick={() => setStep((current) => current - 1)} className="button-base button-ghost disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={18} aria-hidden="true" /> Atrás</button>
        {step < 3 && <button type="button" disabled={!values[step]} onClick={() => setStep((current) => current + 1)} className="button-base button-primary disabled:cursor-not-allowed disabled:opacity-40">Continuar <ChevronRight size={18} aria-hidden="true" /></button>}
      </div>
    </dialog>
  );
}
