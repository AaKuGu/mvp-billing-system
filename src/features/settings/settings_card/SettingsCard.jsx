import React from "react";
import { FiEye, FiSettings } from "react-icons/fi"; // 👁️ Eye + ⚙️ Settings (gear)
import Buttons from "./Buttons";

const SettingsCard = ({ data }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gray-100 rounded-2xl shadow-md">
      {/* Left: Label */}
      <div className="text-lg font-semibold text-gray-800 min-w-[100px]">
        {data?.label}
      </div>

      <Buttons link={data?.link} />

      {/* Right: Last updated with gear */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <FiSettings />
        <span>Last Updated</span>
      </div>
    </div>
  );
};

export default SettingsCard;
