import Login from "@/features/auth/login/LoginPage";
import { auth } from "@/lib/auth";
import Sidebar from "@/re_usables/components/sidebar/Sidebar";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(`/go`);
  }

  return <Login />;
};

export default page;
