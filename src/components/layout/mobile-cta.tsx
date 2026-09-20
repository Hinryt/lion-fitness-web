"use client";

import { PawPrint } from "lucide-react";
import { useState } from "react";
import { TrialFlow } from "@/components/forms/trial-flow";

export function MobileCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
        <button type="button" onClick={() => setOpen(true)} className="button-base button-primary w-full">
          <PawPrint size={18} /> Quiero empezar
        </button>
      </div>
      <TrialFlow open={open} onClose={() => setOpen(false)} />
    </>
  );
}

