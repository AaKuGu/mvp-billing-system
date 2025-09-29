import React from "react";
import StockManagement from "./StockManagement/StockManagement";
import PriceManagement from "./PriceManagement/PriceManagement";

const Manage = () => {
  return (
    <div className={`w-full h-full flex flex-col`}>
      <StockManagement />
      <PriceManagement />
    </div>
  );
};

export default Manage;
