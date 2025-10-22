import { auth } from "@/lib/auth";
import Nav_Bar from "@/re_usables/components/Nav_Bar/Nav_Bar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect(`/`);
  }

  return (
    <div className={`w-full h-full flex flex-col`}>
      <Nav_Bar />
      {children}
    </div>
  );
};

export default layout;
