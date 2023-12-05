import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

import { Backend_URL } from "./Constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  if (!res.status.toString().startsWith("2")) {
    throw Error("Failed to refresh token");
    // console.log(typeof window);
    // if (typeof window !== "undefined") {
    //   window.location.reload();
    // }
    // redirect("/profile"); // Middleware не срабатывает, когда вкладка в браузере долго не использовалась. Разлогинивается, но все еще продолжает находиться на приватной странице.
  }

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
};

export const authOptions: NextAuthOptions = {
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

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },

    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    // async session({ token, session }) {
    //   session.user.role = token.role;
    //   return session;
    // },

    redirect({ url, baseUrl }) {
      // console.log("URLS: ", url, baseUrl);
      // redirect("/profile");
      // if (url !== baseUrl) revalidatePath("/", "layout");

      // async redirect() {
      // // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
      return url;
    },
  },

  // events: {
  //   session() {
  //     console.log("SESSION");
  //     revalidatePath("/profile");
  //   },
  // },

  pages: {
    signIn: "/signin",
  },
};
