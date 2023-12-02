import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      refreshExpiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      refreshExpiresIn: number;
    };
  }
}

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: number;
//       email: string;
//       name: string;
//       role: string | null;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   type JWT = {
//     user: {
//       id: number;
//       email: string;
//       name: string;
//       role: string | null;
//     };
//   };
// }
