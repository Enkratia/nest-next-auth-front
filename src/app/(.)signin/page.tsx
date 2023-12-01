import React from "react";

import { Login } from "@/components/Login";
import { Modal } from "@/components/Modal";

import s from "./signin.module.css";

type SignInPageInterceptedProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPageIntercepted: React.FC<SignInPageInterceptedProps> = ({ searchParams }) => {
  return (
    <div className={s.modal}>
      {/* <Modal> */}
      // <Login className="" error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
      {/* </Modal> */}
    </div>
  );
};

export default SignInPageIntercepted;
