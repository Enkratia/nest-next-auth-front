"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const SignInButton = () => {
  const { data: session } = useSession();

  const onSignout = (e) => {
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
      <Link href="/signin" className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>

      {/* <button onClick={() => signIn()}>Sign In</button> */}

      <Link href="/signup" className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
        Sign Up
      </Link>
    </div>
  );
};
