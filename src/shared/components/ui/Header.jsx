import React from "react";

const Header = ({ children }) => {
  return (
    <div className={`w-full text-lg font-semibold text-gray-800 border-b pb-1`}>
      {children}
    </div>
  );
};

export default Header;
