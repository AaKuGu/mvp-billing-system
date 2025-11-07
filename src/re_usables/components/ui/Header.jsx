import React from "react";

const Header = ({ style = null, children }) => {
  return (
    <div className={`w-full text-center text-xl font-semibold mb-2 ${style} `}>
      {children}
    </div>
  );
};

export default Header;


export const MainHeader = ({style=null, children}) => {
  return (
    <div className={`w-full text-end px-5 text-purple-950 font-bold mb-5 text-sm`}>
      {children}
      <hr />
    </div>
  )
}

export const ListHeader = ({ style = null, children }) => {
  return (
    <div
      className={`w-full text-start px-5 text-teal-800 font-bold my-2 text-[12px] `}
    >
      {children}
    </div>
  );
};
