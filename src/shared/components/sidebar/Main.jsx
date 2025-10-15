import React from "react";
import { sidebarMenus } from "../constants";
import Link from "next/link";
import Logout from "./Logout";
import Logo from "../Logo";

const Main = ({ setIsOpen }) => {
  return (
    <div className={`flex flex-col justify-center pl-2 h-full`}>
      <div className={`mb-5 ml-3`}>
        <Logo />
      </div>
      <nav className="hidden lg:flex flex-col gap-4 flex-1 text-black">
        {sidebarMenus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.link}
            className="p-4 hover:bg-teal-500 duration-300 hover:text-white font-bold cursor-pointer flex items-center gap-3 shadow-md shadow-teal-100"
          >
            <span className="text-xl">{menu.icon}</span>
            <span>{menu.label}</span>
          </Link>
        ))}
      </nav>
      <nav className="lg:hidden flex flex-col gap-8 flex-1 text-black">
        {sidebarMenus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.link}
            className="p-4 hover:bg-teal-500 duration-300 hover:text-white font-bold cursor-pointer flex items-center gap-3 shadow-md shadow-teal-100"
            onClick={() => setIsOpen(false)} // auto-close when clicking a link on mobile
          >
            <span className="text-xl">{menu.icon}</span>
            <span>{menu.label}</span>
          </Link>
        ))}
      </nav>
      <Logout />
    </div>
  );
};

export default Main;
