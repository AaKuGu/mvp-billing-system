import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { headers } from "next/headers";

const Layout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect(`/`);
  }

  if (session?.user?.hasBusiness) {
    redirect(`/go/dashboard`);
  }

  return <>{children}</>;
};

export default Layout;
