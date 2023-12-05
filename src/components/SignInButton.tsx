"use client";

import qs from "qs";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FRONTEND_URL } from "@/lib/Constants";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export const SignInButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const onSignout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({
      redirect: false,
    });
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.email}</p>
        <Link
          href="/api/auth/signout"
          onClick={onSignout}
          className="flex gap-4 ml-auto text-red-600">
          Sign Out
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link
        href={`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
        className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>

      {/* <button onClick={() => signIn()}>Sign In</button> */}

      <Link href="/signup" className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
        Sign Up
      </Link>
    </div>
  );
};
