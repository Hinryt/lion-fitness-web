import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Lion Fitness, inicio">
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-white/20 bg-black shadow-[0_0_0_2px_rgba(255,214,0,.75)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
        <Image src="/brand/lion-mark.jpg" alt="" fill sizes="44px" className="object-cover" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-2xl tracking-wide text-white">LION FITNESS</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.26em] text-lion">La fuerza de la manada</span>
        </span>
      )}
    </Link>
  );
}
