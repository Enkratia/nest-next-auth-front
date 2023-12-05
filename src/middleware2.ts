// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { revalidatePath } from "next/cache";
// import withAuth from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
// export default withAuth(
//   function middleware(req) {
//     console.log("URL: ", req.url);

//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set("x-middleware-cache", "no-cache");
//     requestHeaders.set("cache-control", "no-store");

//     console.log("MIDDLEWARE");
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   },
//   {
//     callbacks: {
//       authorized: async ({ req, token }) => {
//         const expiresInRefresh = token?.backendTokens.refreshExpiresIn;
//         const timeNow = Date.now();

//         console.log("AUTHORIZE", Date.now());

//         if (expiresInRefresh && timeNow > expiresInRefresh) {
//           // console.log("FALSE");
//           return false;
//         }

//         // console.log("TOKEN: ", !!token);
//         return !!token;
//       },
//     },
//   },
// );

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("URL: ", request.url);

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-middleware-cache", "no-cache");
//   requestHeaders.set("cache-control", "no-store");

//   console.log("MIDDLEWARE");
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/dashboard:path*", "/profile"],
// };

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname === "/") {
//     const redirectUrl = Math.random() > 0.5 ? "/dashboard" : "/profile";
//     const response = NextResponse.redirect(new URL(redirectUrl, request.url));
//     response.headers.set("x-middleware-cache", "no-cache"); // Disables middleware caching
//     return response;
//   }
// }
