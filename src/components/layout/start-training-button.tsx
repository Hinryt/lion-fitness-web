"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const TrialFlow = dynamic(() => import("@/components/forms/trial-flow").then((module) => module.TrialFlow), { ssr: false });

export function StartTrainingButton({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" onClick={() => setOpen(true)} className={className}>Quiero empezar</button>{open && <TrialFlow open onClose={() => setOpen(false)} />}</>;
}
