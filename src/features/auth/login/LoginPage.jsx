import Logo from "@/re_usables/components/Logo";
import React from "react";
import RightSide from "./right-side/RightSide";

const LoginPage = () => {
  return (
    <div className={`w-full h-full flex-col md:flex justify-center `}>
      <div
        className={`w-full h-auto md:h-full flex items-center justify-center flex-col`}
      >
        <Logo style="text-4xl md:text-8xl" />
        {/* <span>Your Business Partner</span> */}
      </div>
      <div className={`w-full h-full flex items-center justify-center`}>
        <RightSide />
      </div>
    </div>
  );
};

export default LoginPage;
