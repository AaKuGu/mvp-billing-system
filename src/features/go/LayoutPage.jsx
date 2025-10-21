// "use client";

import Back from "@/shared/components/Back";
import Loading from "@/shared/components/Loading/Loading";
// import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import useLoadingStore from "@/store/loading";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import TopBar from "@/shared/components/Nav_Bar";
import { redirect } from "next/navigation";
import Nav_Bar from "@/shared/components/Nav_Bar";

const LayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect(`/`);
  }

  if (!session?.user?.hasBusiness) {
    redirect(`/account/business_details/register`);
  }

  return (
    <div className="w-full h-screen flex relative p-1  flex-col ">
      <Nav_Bar />
      <div className={`w-full flex flex-row flex-1 overflow-hidden`}>
        <Sidebar />
        <main className="w-full h-full relative overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
