"use client";

import { cloneElement, useId, type ReactElement } from "react";

type ControlProps = { id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string };

export function FormField({ label, error, children }: { label: string; error?: string; children: ReactElement<ControlProps> }) {
  const id = useId();
  const errorId = `${id}-error`;
  return <div className="grid gap-2 text-sm"><label htmlFor={id} className="font-bold text-white">{label}</label>{cloneElement(children, { id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}{error && <span id={errorId} className="field-error text-xs font-medium">{error}</span>}</div>;
}
