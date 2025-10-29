import React from "react";
import LeftSide from "../common/LeftSide";
import Business_Details_Form from "../common/Business_Details_Form";

const Business_Details_Update = ({ data }) => {
  return (
    <div
      className={`w-full h-screen flex items-start justify-center p-1 bg-red-500 overflow-y-auto`}
    >
      <Business_Details_Form data={data} />
    </div>
  );
};

export default Business_Details_Update;
