import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {auth} from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (session && (request.nextUrl.pathname.startsWith("/auth/sign-in") ||
      request.nextUrl.pathname.startsWith("/auth/sign-up"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};