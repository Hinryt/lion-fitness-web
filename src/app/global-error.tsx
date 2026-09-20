"use client";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <html lang="es"><body className="grid min-h-screen place-items-center bg-[#0B0C0E] p-5 text-center text-white"><div><h1 style={{ fontSize: "3rem", textTransform: "uppercase" }}>Lion Fitness</h1><p>No pudimos cargar la aplicación.</p><button onClick={reset} style={{ marginTop: "1.5rem", background: "#FFD400", color: "#0B0C0E", padding: "1rem 1.5rem", border: 0, fontWeight: 800 }}>Reintentar</button></div></body></html>; }

