import React from "react";
import clsx from "clsx"; // Optional: for cleaner conditional class merging

const TableData = ({ children, align = "left", className = "" }) => {
  return (
    <td
      className={clsx(
        "px-4 py-3 text-sm text-gray-700 whitespace-nowrap border-b border-gray-200 font-mono",
        `text-${align}`,
        className
      )}
    >
      {children}
    </td>
  );
};

export default TableData;
