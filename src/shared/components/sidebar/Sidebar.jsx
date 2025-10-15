"use client";

import React, { useState } from "react";
import { sidebarMenus } from "../constants";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { RedButton } from "../Button";
import { logout } from "./funcs";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/loading";
import Logout from "./Logout";
import SmallScr from "./SmallScr";
import DesktopScr from "./DesktopScr";
import Main from "./Main";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:static absolute h-auto z-[200] bg-white w-fit">
      <SmallScr isOpen={isOpen} setIsOpen={setIsOpen} />
      <DesktopScr />

      {/* <div
        className={`fixed top-0 left-0 h-full w-[150px] md:w-[200px] bg-black text-black transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:w-[200px] p-1 flex flex-col justify-between`}
      >
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[4] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )} */}
    </div>
  );
};

export default Sidebar;
