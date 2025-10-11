import React from "react";

const Header = ({ children }) => {
  return (
    <div className={`w-full text-center text-xl font-semibold mb-2`}>
      {children}
    </div>
  );
};

export default Header;
