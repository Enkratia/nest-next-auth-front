"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { redirect, useRouter } from "next/navigation";

import { SignInButton } from "./SignInButton";

const AppBar = () => {
  // const prevStatus = React.useRef<string | null>();
  // const router = useRouter();

  const { data: session, status } = useSession();

  // React.useEffect(() => {
  //   if (status === "unauthenticated" && prevStatus.current === "authenticated") {
  //     console.log(
  //       "STATUS: ",
  //       status,
  //       status === "unauthenticated" && prevStatus.current === "authenticated",
  //     );
  //     prevStatus.current = status;
  // router.push("/signin");
  // router.refresh();
  // redirect("/signin");
  // window?.location.reload();
  // }

  //   prevStatus.current = status;
  // }, [status]);

  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>

      <Link className="transition-colors hover:text-blue-500" href={"/profile"}>
        Profile
      </Link>

      <Link className="transition-colors hover:text-blue-500" href={"/dashboard"}>
        DashBoard
      </Link>

      <SignInButton />
    </header>
  );
};

export default AppBar;
