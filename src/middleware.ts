import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
  console.log(request.url);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-middleware-cache", "no-cache");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/:path*",
// };

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname === "/") {
//     const redirectUrl = Math.random() > 0.5 ? "/dashboard" : "/profile";
//     const response = NextResponse.redirect(new URL(redirectUrl, request.url));
//     response.headers.set("x-middleware-cache", "no-cache"); // Disables middleware caching
//     return response;
//   }
// }
