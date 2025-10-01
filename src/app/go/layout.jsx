"use client";

import Loading from "@/shared/components/Loading/Loading";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import useLoadingStore from "@/store/loading";
import React, { useEffect } from "react";

const Layout = ({ children }) => {
  const { loading } = useLoadingStore();

  return (
    <div className="w-full h-screen flex relative p-1 ">
      {/* <LoadingWrapper loading={loading}> */}
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 w-full h-full">{children}</main>
      {loading && <Loading /> }
      {/* </LoadingWrapper> */}
    </div>
  );
};

export default Layout;
