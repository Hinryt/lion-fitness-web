export default function Loading() { return <div className="page-shell container-shell" aria-label="Cargando"><div className="h-4 w-32 animate-pulse bg-lion/40" /><div className="mt-6 h-20 max-w-3xl animate-pulse bg-white/10" /><div className="mt-10 grid gap-4 sm:grid-cols-3">{[0,1,2].map((item) => <div key={item} className="h-64 animate-pulse bg-card" />)}</div></div>; }

