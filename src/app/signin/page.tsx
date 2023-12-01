import React from "react";

import { Login } from "../../components/Login";

type SignInPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

// const test: Record<"callbackUrl" | "error", string> = {
//   callbackUrl: ""
// }
// console.log(test);

const SignInPage: React.FC<SignInPageProps> = ({ searchParams }) => {
  return (
    <div>
      <Login className="" error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
};

export default SignInPage;
