import { MainHeader } from "@/re_usables/components/ui/Header";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import User_Details_Show from "./User_Details_Show";
import Business_Details_Show from "./business_details_show/Business_Details_Show";

const Account_Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_data = session.user;

  // console.log("user_data : /features/account/Account_page.jsx : ", session);

  return (
    <div className={`w-full h-full flex flex-col gap-2`}>
      <MainHeader>Account</MainHeader>
      <main className={`flex `}>
        <User_Details_Show user_data={user_data} />
        <Business_Details_Show user_id={user_data.id} />
      </main>
    </div>
  );
};

export default Account_Page;
