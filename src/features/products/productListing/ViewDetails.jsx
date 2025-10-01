import React from "react";
import useProductListingStore from "./MainListing/store";

const ViewDetails = () => {
  const { setViewDetails } = useProductListingStore();

  return <div>View Details</div>;
};

export default ViewDetails;
