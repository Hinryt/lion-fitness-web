"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const navigation = [
  ["Inicio", "/"],
  ["Sedes", "/sedes"],
  ["Actividades", "/actividades"],
  ["Horarios", "/horarios"],
  ["Planes", "/planes"],
  ["Equipamiento", "/equipamiento"],
  ["Comunidad", "/comunidad"],
  ["Nosotros", "/nosotros"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 xl:flex">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn("nav-link", pathname === href && "text-lion")}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/ingresar" className="button-base button-ghost h-10 px-4 text-xs">Ingresar</Link>
          <Link href="/contacto?motivo=empezar" className="button-base button-primary h-10 px-4 text-xs">Quiero empezar</Link>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center border border-white/15 text-white xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-t border-white/10 bg-card px-5 py-5 xl:hidden">
          <div className="grid gap-1">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/8 px-2 py-3 font-bold uppercase tracking-wide text-white">
                {label}
              </Link>
            ))}
            <Link href="/ingresar" onClick={() => setOpen(false)} className="mt-3 button-base button-secondary">Ingresar</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

