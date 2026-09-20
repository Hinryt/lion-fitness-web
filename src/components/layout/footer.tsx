import { ExternalLink, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { branches, siteConfig } from "@/data/demo";
import { whatsappUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070809] pb-24 pt-14 md:pb-8">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-md leading-7 text-muted">{siteConfig.description}</p>
          <a href={whatsappUrl("Hola Lion Fitness, quiero hacer una consulta.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-lion">
            <MessageCircle size={18} /> {siteConfig.phoneDisplay}
          </a>
        </div>
        <div>
          <h2 className="font-heading text-xl uppercase text-white">Explorá</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <Link href="/sedes">Sedes</Link><Link href="/actividades">Actividades</Link><Link href="/horarios">Horarios</Link><Link href="/planes">Planes</Link><Link href="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-xl uppercase text-white">La manada</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {branches.map((branch) => (
              <Link key={branch.id} href={`/sedes/${branch.slug}`} className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0" size={15} /> {branch.shortName}</Link>
            ))}
            <a href={siteConfig.socials.gym} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 text-white"><ExternalLink size={16} /> Instagram</a>
          </div>
        </div>
      </div>
      <div className="container-shell mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Lion Fitness. MVP demostrativo.</p>
        <p>Datos, precios y métricas de demostración hasta conectar servicios reales.</p>
      </div>
    </footer>
  );
}
