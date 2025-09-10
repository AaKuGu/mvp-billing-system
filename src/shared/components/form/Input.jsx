import React from "react";

export const Input = ({ type, value, onChange }) => {
  console.log("value : ", type, value);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500`}
    />
  );
};
