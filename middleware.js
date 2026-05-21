import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token       = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage  = request.nextUrl.pathname === "/admin/login";
  const isAuthApi    = request.nextUrl.pathname.startsWith("/api/auth");

  if (isAuthApi) return NextResponse.next();

  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
