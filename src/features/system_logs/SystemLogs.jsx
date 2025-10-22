"use client";

import Header from "@/re_usables/components/ui/Header";
import React, { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import LogsList from "./LogsList/LogsList";
import { fetchSystemLogs } from "./funcs";
import LoadingWrapper from "@/re_usables/components/Loading/LoadingWrapper";

const SystemLogs = () => {
  const [logsList, setLogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parameter, setParameter] = useState(null);

  useEffect(() => {
    fetchSystemLogs(setLogsList, parameter, setLoading);
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
