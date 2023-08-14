import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req, res) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token && !pathname.startsWith("/admin/auth/login")) {
      return NextResponse.redirect(new URL("/admin/auth/login", req.url));
    }

    if (pathname === "/admin/auth/login" && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}
