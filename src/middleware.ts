import { withAuth } from "next-auth/middleware";

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
