import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const role = request.cookies.get("lion_demo_role")?.value;
  const pathname = request.nextUrl.pathname;
  const requiredRole = pathname.startsWith("/admin") ? "admin" : "member";
  if (role === requiredRole) return NextResponse.next();
  const loginUrl = new URL("/ingresar", request.url);
  loginUrl.searchParams.set("from", pathname);
  loginUrl.searchParams.set("role", requiredRole);
  return NextResponse.redirect(loginUrl);
}

export const config = { matcher: ["/admin/:path*", "/mi-cuenta/:path*"] };

