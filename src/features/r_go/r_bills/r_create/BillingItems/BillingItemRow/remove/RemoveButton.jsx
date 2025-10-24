import { RedButton } from "@/re_usables/components/Button";
import React from "react";
import { handleRemove } from "./funcs";

const RemoveButton = ({ billingItems, setBillingItems, index, id }) => {
  return (
    <RedButton
      onClick={() => handleRemove(billingItems, setBillingItems, index, id)}
      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ✕
    </RedButton>
  );
};

export default RemoveButton;
