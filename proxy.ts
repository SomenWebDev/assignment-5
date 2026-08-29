import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  iat: number;
  exp: number;
}

const roleRoutes: Record<string, JwtPayload["role"]> = {
  "/dashboard/provider": "PROVIDER",
  "/dashboard/admin": "ADMIN",
  "/dashboard/customer": "CUSTOMER",
};

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  let payload: JwtPayload;

  try {
    payload = jwtDecode<JwtPayload>(accessToken);

    if (payload.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const matchedPrefix = Object.keys(roleRoutes).find((prefix) =>
    pathname.startsWith(prefix),
  );

  if (matchedPrefix && payload.role !== roleRoutes[matchedPrefix]) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
