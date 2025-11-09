"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const ViewUpdateDelete = ({ actions, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {actions.view && (
        <Link
          href={actions.view}
          className="group relative flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <FiEye
            size={16}
            className="transition-transform group-hover:scale-110"
          />
          <span className="hidden sm:inline">View Details</span>
          <span className="inline sm:hidden">View</span>
        </Link>
      )}

      {actions.update && (
        <Link
          href={actions.update}
          className="group relative flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <FiEdit
            size={16}
            className="transition-transform group-hover:scale-110"
          />
          <span className="hidden sm:inline">Edit</span>
          <span className="inline sm:hidden">Edit</span>
        </Link>
      )}

      {actions.delete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="group relative flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <FiTrash2
            size={16}
            className={`transition-transform ${
              isDeleting ? "animate-pulse" : "group-hover:scale-110"
            }`}
          />
          <span className="hidden sm:inline">
            {isDeleting ? "Deleting..." : "Delete"}
          </span>
          <span className="inline sm:hidden">
            {isDeleting ? "..." : "Delete"}
          </span>
        </button>
      )}
    </div>
  );
};

export default ViewUpdateDelete;
