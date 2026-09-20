import { leadSchema, quoteSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) return Response.json({ ok: false, message: "Solicitud demasiado grande" }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ ok: false, message: "Formato inválido" }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ ok: false, message: "Datos inválidos" }, { status: 400 });
  const kind = "kind" in body ? body.kind : undefined;
  const parsed = kind === "quote" ? quoteSchema.safeParse(body) : leadSchema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, message: "Revisá los campos", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  if (parsed.data.website) return Response.json({ ok: true, demo: true });
  return Response.json({ ok: true, demo: true, message: "Solicitud validada en modo demostración" }, { status: 201 });
}

