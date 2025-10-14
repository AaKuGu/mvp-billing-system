import React from "react";

const Header = ({ style = null, children }) => {
  return (
    <div className={`w-full text-center text-xl font-semibold mb-2 ${style}`}>
      {children}
    </div>
  );
};

export default Header;
