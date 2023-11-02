import { NextResponse } from "next/server";
export async function middleware(request) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;
  if (token && pathname === "/admin/auth/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!token && pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  return NextResponse.next();
}
