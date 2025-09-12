import { RedButton } from "@/shared/components/Button";
import React from "react";
import { handleRemove } from "./funcs";

const RemoveButton = () => {
  return (
    <RedButton
      type="button"
      onClick={handleRemove}
      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ✕
    </RedButton>
  );
};

export default RemoveButton;
