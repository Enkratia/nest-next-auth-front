"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { FRONTEND_URL } from "../lib/Constants";

export const RouteProtector: React.FC = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/profile|\/dashboard)/);

  React.useEffect(() => {
    if (isForbidden) {
      router.replace(`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`);
    }
  }, [isForbidden]);

  return <></>;
};
