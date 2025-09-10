import React from "react";

const Select = ({ name, id, onChange, children, value }) => {
  return (
    <select
      name={name}
      id={id}
      value={value}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 bg-white text-gray-800"
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
