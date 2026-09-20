import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-heading text-4xl uppercase leading-[0.94] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg">{description}</p>}
    </div>
  );
}

