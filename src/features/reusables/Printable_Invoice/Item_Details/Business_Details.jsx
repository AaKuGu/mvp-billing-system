import React from "react";

const Business_Details = ({ business_details }) => {
  const { businessName, businessTagline, businessDescription, gstNumber } =
    business_details || {};
  return (
    <div className="text-center mb-6 border-b border-gray-300 pb-4">
      <h1 className="text-3xl font-bold text-blue-800 uppercase">
        {businessName}
      </h1>
      {businessTagline && (
        <p className="italic text-sm text-gray-600">{businessTagline}</p>
      )}
      {businessDescription && (
        <p className="italic text-sm text-gray-600">{businessDescription}</p>
      )}
      {gstNumber && <p className="text-sm text-gray-700">GSTIN: {gstNumber}</p>}
    </div>
  );
};

export default Business_Details;
