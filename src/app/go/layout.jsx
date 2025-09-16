import Sidebar from "@/shared/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex relative ">
      {/* Sidebar */}
      <div className="lg:static absolute">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 w-full h-screen">{children}</main>
    </div>
  );
};

export default Layout;
