export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <section className="border-b border-white/10 bg-card pt-32"><div className="container-shell py-14 sm:py-20"><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 max-w-5xl text-balance font-heading text-5xl uppercase leading-[.94] text-white sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>{children && <div className="mt-8">{children}</div>}</div></section>;
}

