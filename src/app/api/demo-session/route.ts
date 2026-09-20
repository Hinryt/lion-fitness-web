import { NextResponse } from "next/server";
import { z } from "zod";

const sessionSchema = z.object({ role: z.enum(["member", "admin"]) });

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const parsed = sessionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 422 });
  const response = NextResponse.json({ ok: true, destination: parsed.data.role === "admin" ? "/admin" : "/mi-cuenta" });
  response.cookies.set("lion_demo_role", parsed.data.role, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}

