import Sidebar from "@/shared/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex relative p-1 ">
      {/* Sidebar */}
        <Sidebar />
      

      {/* Main content */}
      <main className="flex-1 w-full h-full">{children}</main>
    </div>
  );
};

export default Layout;
