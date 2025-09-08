"use client";

import React, { useState } from "react";
import { sidebarMenus } from "./constants";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar (only visible on mobile) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-red-500 text-white">
        <h1 className="text-lg font-bold">My App</h1>
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[200px] bg-red-500 text-black transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:w-[200px]`}
      >
        {/* Close button (mobile only) */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarMenus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className="p-4 hover:bg-gray-100 cursor-pointer bg-gray-200"
              onClick={() => setIsOpen(false)} // auto-close when clicking a link on mobile
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay (when sidebar open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
