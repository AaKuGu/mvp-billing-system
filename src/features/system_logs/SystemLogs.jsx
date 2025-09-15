"use client";

import Header from "@/shared/components/ui/Header";
import React, { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import LogsList from "./LogsList/LogsList";
import { fetchSystemLogs } from "./funcs";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";

const SystemLogs = () => {
  const [logsList, setLogsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemLogs(setLogsList, setLoading);
  }, []);

  return (
    <div className={`w-full h-full flex flex-col px-5`}>
      <LoadingWrapper loading={loading}>
        <Header>System Logs</Header>
        <Filters />
        <LogsList logsList={logsList} />
      </LoadingWrapper>
    </div>
  );
};

export default SystemLogs;
