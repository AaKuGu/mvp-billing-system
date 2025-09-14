import React from "react";

const Headers = () => {
  return (
    <tr className="bg-gray-100 text-sm sm:text-base">
      <th className="p-2 border">No.</th>
      <th className="p-2 border">Name</th>
      <th className="p-2 border">Cost</th>
      <th className="p-2 border">Wholesale</th>
      <th className="p-2 border">Retail</th>
      <th className="p-2 border">Actions</th>
    </tr>
  );
};

export default Headers;
