"use client";

import React from "react";
import Link from "next/link";

import { SignInButton } from "./SignInButton";

const AppBar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>

      <Link className="transition-colors hover:text-blue-500" href={"/hello"}>
        Hello
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
