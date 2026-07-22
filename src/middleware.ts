import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;
  const role = req.auth?.user?.role;

  if (!isLoggedIn && (path.startsWith("/admin") || path.startsWith("/library"))) {
    return NextResponse.redirect(new URL("/documents", req.url));
  }

  if (isLoggedIn && path === "/documents") {
    const dest = role === "ADMIN" ? "/admin" : "/library";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  if (isLoggedIn && path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/library", req.url));
  }

  if (isLoggedIn && path.startsWith("/library") && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/documents", "/admin/:path*", "/library/:path*"],
};
