"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { FiHome } from "react-icons/fi"; // Home icon
import { MdKeyboardArrowRight } from "react-icons/md"; // Arrow icon

const Layout = ({ children }) => {
  const pathname = usePathname();

  // Split pathname into breadcrumb parts
  const parts = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full h-full flex flex-col p-6 bg-gray-50">
      {/* Header with breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-gray-700 text-sm font-medium">
        <FiHome className="text-blue-600" />
        <MdKeyboardArrowRight />
        {parts.length === 0 ? (
          <span className="text-blue-600 font-semibold">Home</span>
        ) : (
          parts.map((part, index) => (
            <React.Fragment key={index}>
              <span
                className={`capitalize ${
                  index === parts.length - 1
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {part}
              </span>
              {index < parts.length - 1 && <MdKeyboardArrowRight />}
            </React.Fragment>
          ))
        )}
      </div>

      {/* Page content */}
      <main className="flex-1 bg-white rounded-xl shadow p-6">{children}</main>
    </div>
  );
};

export default Layout;
