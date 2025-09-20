import Link from "next/link";
import React from "react";
import { FiEye, FiSettings } from "react-icons/fi";

const Buttons = ({ link }) => {
  return (
    <div className="flex gap-2">
      {/* View Button */}
      <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        <FiEye />
        <span className="hidden md:block">View</span>
      </button>

      {/* Settings Button */}
      <Link
        href={link}
        className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        <FiSettings />
        <span className="hidden md:block">Update</span>
      </Link>
    </div>
  );
};

export default Buttons;
