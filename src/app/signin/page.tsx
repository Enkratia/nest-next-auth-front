import React from "react";

import { Login } from "../../components/Login";
import { revalidatePath } from "next/cache";

type SignInPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPage: React.FC<SignInPageProps> = ({ searchParams }) => {
  return (
    <div>
      <Login className="" error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
};

export default SignInPage;
