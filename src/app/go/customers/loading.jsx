import Server_Side_Loading from "@/re_usables/components/Loading/Server_Side_Loading";
import React from "react";

const loading = () => {
  return <Server_Side_Loading message={`Customers Loading...`} />;
};

export default loading;
