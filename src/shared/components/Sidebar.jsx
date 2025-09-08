import React from "react";
import { sidebarMenus } from "./constants";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[200px] bg-white flex flex-col gap-2 h-full bg-red-500">
      {sidebarMenus.map((menu) => (
        <Link
          key={menu.name}
          href={menu.link}
          className="p-4 hover:bg-gray-100 cursor-pointer text-black bg-gray-200"
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
