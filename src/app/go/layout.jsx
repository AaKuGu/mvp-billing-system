import Sidebar from "@/shared/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className={`w-full min-h-screen h-screen flex`}>
      <Sidebar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default layout;
