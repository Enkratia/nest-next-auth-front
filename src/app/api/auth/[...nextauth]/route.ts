import { redirect } from "next/navigation";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

import { Backend_URL } from "../../../../lib/Constants";

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  console.log(res.status);
  if (!res.status.toString().startsWith("2")) {
    // throw Error("Failed to refresh token");
    redirect("/auth/signin/"); // Middleware не срабатывает, когда вкладка в браузере долго не использовалась. Разлогинивается, но все еще продолжает находиться на приватной странице.
  }

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.status.toString().startsWith("2")) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   async profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: `${profile.given_name} ${profile.family_name}`,
    //       email: profile.email,
    //       role: profile.role ? profile.role : "user",
    //     };
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      // try {
      return await refreshToken(token);
      // } catch {
      //   redirect("/"); // Middleware не срабатывает, когда вкладка в браузере долго не использовалась. Разлогинивается, но все еще продолжает находиться на приватной странице.
      // }
    },
    async session({ token, session }) {
      // console.log(token);
      if (token.statusCode) {
        // console.log("SESSION", session);
      } else {
        session.user = token.user;
        session.backendTokens = token.backendTokens;
      }

      // console.log("SESSION");

      return session;
    },

    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    // async session({ token, session }) {
    //   session.user.role = token.role;
    //   return session;
    // },
  },

  // events: {
  //   signOut() {
  //     console.log("SIGNOUT");
  //     redirect("/"); // Middleware не срабатывает, когда вкладка в браузере долго не использовалась. Разлогинивается, но все еще продолжает находиться на приватной странице.
  //   },
  // },

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
