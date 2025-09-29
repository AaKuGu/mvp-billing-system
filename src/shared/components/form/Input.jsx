import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  readOnly = false,
}) => {
  console.log("value : ", type, value);

  // Prevent scroll increment/decrement for number inputs
  const handleWheel = (e) => {
    if (type === "number") {
      e.target.blur(); // remove focus to stop scroll
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      onWheel={handleWheel}
      readOnly={readOnly}
      className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500`}
    />
  );
};
