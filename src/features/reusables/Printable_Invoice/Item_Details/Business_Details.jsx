import React from "react";

const Business_Details = ({ business_details }) => {
  const { businessName, businessTagline, businessDescription, gstNumber } =
    business_details || {};
  return (
    <div className="text-center mb-4 sm:mb-6 border-b border-gray-300 pb-3 sm:pb-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 uppercase break-words">
        {businessName}
      </h1>
      {businessTagline && (
        <p className="italic text-xs sm:text-sm text-gray-600 mt-1">
          {businessTagline}
        </p>
      )}
      {businessDescription && (
        <p className="italic text-xs sm:text-sm text-gray-600">
          {businessDescription}
        </p>
      )}
      {gstNumber && (
        <p className="text-xs sm:text-sm text-gray-700 mt-1">
          GSTIN: {gstNumber}
        </p>
      )}
    </div>
  );
};

export default Business_Details;
