import React from "react";

const Header = ({ children }) => {
  return (
    <div className={`w-full text-center text-2xl font-semibold mb-4`}>
      {children}
    </div>
  );
};

export default Header;
