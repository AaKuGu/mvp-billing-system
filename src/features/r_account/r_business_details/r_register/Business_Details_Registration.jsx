import React from "react";
import LeftSide from "../common/LeftSide";
import Business_Details_Form from "../common/Business_Details_Form";

const BusinessRegistrationPage = async () => {
  return (
    <div
      className={`w-full h-screen flex items-start justify-center p-1 bg-red-500 overflow-y-auto`}
    >
      {/* <LeftSide /> */}
      <Business_Details_Form />
    </div>
  );
};

export default BusinessRegistrationPage;
