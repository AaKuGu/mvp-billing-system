import React from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const ViewUpdateDelete = ({ actions, onDelete }) => {
  return (
    <div className="flex gap-2">
      {actions.view && (
        <Link
          href={actions.view}
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm transition"
        >
          <FiEye size={16} />
          View
        </Link>
      )}

      {actions.update && (
        <Link
          href={actions.update}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm transition"
        >
          <FiEdit size={16} />
          Update
        </Link>
      )}

      {actions.delete && (
        <button
          onClick={onDelete}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition"
        >
          <FiTrash2 size={16} />
          Delete
        </button>
      )}
    </div>
  );
};

export default ViewUpdateDelete;
