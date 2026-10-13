import Image from "next/image";

// Visual references are separate from verified product photos and metadata.
const illustrativeImages: Record<string, string> = {
  "banco-plano-convergente": "/images/instagram/equipment-machine.jpg",
  "rack-profesional": "/images/instagram/equipment-delivery.jpg",
  "prensa": "/images/instagram/equipment-transform.jpg",
  "hack-squat": "/images/instagram/equipment-machine.jpg",
  "crossover": "/images/instagram/equipment-delivery.jpg",
};

export function EquipmentImage({ src, slug, name, sizes, preload = false }: { src?: string; slug: string; name: string; sizes: string; preload?: boolean }) {
  const image = illustrativeImages[slug] ?? src ?? "/images/instagram/equipment-machine.jpg";
  return <Image src={image} alt={image === src ? name : "Imagen ilustrativa de Lion Fitness Equipamiento"} fill preload={preload} sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-105" />;
}
