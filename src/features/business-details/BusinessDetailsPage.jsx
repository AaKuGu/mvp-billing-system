import React from "react";
import LeftSide from "./LeftSide";
import Business_Details from "./business_details/Business_Details";

const BusinessDetailsPage = () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <LeftSide />
      <Business_Details />
    </div>
  );
};

export default BusinessDetailsPage;
