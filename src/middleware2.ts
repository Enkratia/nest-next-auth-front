// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";
// export { default } from "next-auth/middleware";

import withAuth from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       const expiresInRefresh = token?.backendTokens.refreshExpiresIn;
//       const timeNow = Date.now();

//       if (expiresInRefresh && timeNow > expiresInRefresh) {
//         return false;
//       }

//       return !!token;
//     },
//   },
// });

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // return NextResponse.redirect(new URL('/home', request.url))
//   console.log("MIDDLEWARE");
// }

// export default withAuth({
//   function middleware(req) {
//     console.log(req.nextauth.token)
//   },
//   {

//   }
// });

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const expiresInRefresh = token?.backendTokens.refreshExpiresIn;
      const timeNow = Date.now();

      if (expiresInRefresh && timeNow > expiresInRefresh) {
        return false;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard:path*", "/profile:path*"],
};
