import React from "react";
import LeftSide from "../common/LeftSide";
import Business_Details_Form from "../common/Business_Details_Form";

const BusinessRegistrationPage = async () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <LeftSide />
      <Business_Details_Form />
    </div>
  );
};

export default BusinessRegistrationPage;
