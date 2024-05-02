import { TOKEN_COOKIE } from "./network/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the 'authToken' cookie is present
  const token = request.cookies.get(TOKEN_COOKIE);

  // If the token is not present, redirect the user to the signup page
  if (!token) {
    // Use the `next/server` `NextResponse.redirect()` method
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // If the token is present, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - signup
     * - login
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signup|login).*)",
  ],
};
