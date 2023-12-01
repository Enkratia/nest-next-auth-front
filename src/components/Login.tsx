"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import InputBox from "./InputBox";
import { Button } from "./Button";

type LoginProps = {
  className: string;
  callbackUrl: string | undefined;
  error?: string;
};

export const Login: React.FC<LoginProps> = ({ className, callbackUrl, error }) => {
  const email = React.useRef("");
  const pass = React.useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: callbackUrl ?? "http://localhost:3000",
    });
  };

  return (
    <div className={className}>
      <div className="bg-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-slate-600">
        Login Form
      </div>

      {!!error && <p className="bg-red-100 text-red-600 text-center p-2">Authentication failed</p>}
      <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
        <InputBox
          name="email"
          labelText="Email"
          onChange={(e) => (email.current = e.target.value)}
        />

        <InputBox
          name="password"
          type="password"
          labelText="Password"
          onChange={(e) => (pass.current = e.target.value)}
        />

        <div className="flex items-center justify-center mt-2 gap-2">
          <Button type="submit" className="w-28">
            Sign In
          </Button>

          <Link
            href={callbackUrl ?? "/"}
            className="w-28 border border-red-600 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
