import Image from "next/image";

export function EquipmentImage({ src, name, sizes, preload = false }: { src?: string; slug: string; name: string; sizes: string; preload?: boolean }) {
  if (!src) return <span className="absolute inset-0 grid place-items-center text-sm text-muted">Foto no disponible</span>;
  return <><Image src={src} alt={`Fotografía de referencia: ${name}`} fill preload={preload} sizes={sizes} className="bg-white object-contain p-3 transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 right-3 bg-ink/80 px-2 py-1 text-[10px] text-white">Foto de referencia</span></>;
}
