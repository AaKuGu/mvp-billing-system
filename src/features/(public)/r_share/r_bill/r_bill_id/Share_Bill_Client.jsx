import Printable_Invoice from "@/features/reusables/Printable_Invoice/Item_Details/Printable_Invoice";
import React from "react";

const Share_Bill_Client = ({ bill }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center `}>
      <Printable_Invoice bill={bill} />
    </div>
  );
};

export default Share_Bill_Client;
