import React from "react";
import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <FiLoader className="animate-spin text-blue-600 text-5xl" />
        <p className="text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
