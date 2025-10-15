import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Main from "./Main";

const SmallScr = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`lg:hidden ${isOpen ? "w-[250px]" : "w-fit"} h-fit `}>
      {!isOpen ? (
        <div className="lg:hidden flex items-center justify-between p-2  bg-purple-100 text-purple-800">
          <button onClick={() => setIsOpen(true)} className="text-xl">
            <FaBars />
          </button>
        </div>
      ) : (
        <div className="lg:hidden flex justify-end p-2 flex-col w-full h-screen relative">
          <div className={`w-full flex justify-end`}>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl border w-fit text-purple-800 bg-purple-100 rounded-lg absolute"
            >
              <FaTimes />
            </button>
          </div>

          <Main setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default SmallScr;
