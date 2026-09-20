"use client";
import { TriangleAlert } from "lucide-react";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="page-shell container-shell grid place-items-center text-center"><div><TriangleAlert className="mx-auto text-error" size={44} /><h1 className="mt-5 font-heading text-5xl uppercase text-white">Algo no salió como esperábamos</h1><p className="mt-4 text-muted">Podés intentar nuevamente sin perder la navegación.</p><button onClick={reset} className="mt-7 button-base button-primary">Reintentar</button></div></section>; }

