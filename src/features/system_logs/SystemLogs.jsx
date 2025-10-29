"use client";

import Header from "@/re_usables/components/ui/Header";
import React, { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import LogsList from "./LogsList/LogsList";
import { fetchSystemLogs } from "./funcs";

const SystemLogs = () => {
  const [logsList, setLogsList] = useState([]);
  const [parameter, setParameter] = useState(null);

  useEffect(() => {
    fetchSystemLogs(setLogsList, parameter);
  }, []);

  return (
    <div className={`w-full h-full flex flex-col px-5`}>
      <Header>System Logs</Header>
      <Filters />
      <LogsList logsList={logsList} />
    </div>
  );
};

export default SystemLogs;
