"use client";

import { StartTrainingButton } from "@/components/layout/start-training-button";

export function MobileCta() {
  return (
    <>
      <div className="mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
        <StartTrainingButton className="button-base button-primary w-full" />
      </div>
    </>
  );
}
