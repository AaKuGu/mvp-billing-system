import React from "react";

const Label = ({ htmlFor, styles, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 mb-1 ${styles}`}
    >
      {children}
    </label>
  );
};

export default Label;
