import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/sistema")) {
    const session = request.cookies.get("sistema_session");
    // Client handles the login gate; middleware can be strengthened later
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sistema/:path*"],
};
