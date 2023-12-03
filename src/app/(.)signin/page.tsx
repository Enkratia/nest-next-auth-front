// "use client";

import React from "react";

import { Login } from "../../components/Login";

import s from "./signin.module.css";
// import { usePathname } from "next/navigation";

type SignInPageInterceptedProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPageIntercepted: React.FC<SignInPageInterceptedProps> = ({ searchParams }) => {
  // const pathname = usePathname();

  // if (!pathname.startsWith("/signin")) {
  //   return null;
  // }

  return (
    <div className={s.modal}>
      <Login className="" error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
};

export default SignInPageIntercepted;
