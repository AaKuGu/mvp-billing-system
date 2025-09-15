import React from "react";

const Modal = ({ children }) => {
  return (
    <div className={`w-full h-full absolute top-0 left-0 z-[10]`}>
      <div className={`w-full h-full bg-black opacity-80`}></div>
      <div className={`w-full h-full absolute top-0 left-0 text-white text-5xl`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
