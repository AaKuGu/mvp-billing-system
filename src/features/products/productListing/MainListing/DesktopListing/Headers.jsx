import React from "react";

const Headers = () => {
  return (
    <tr className="bg-gray-100 text-sm sm:text-base">
      <th className="p-2 border">No.</th>
      <th className="p-2 border">Product Name</th>
      <th className="p-2 border">Main Unit</th>
      <th className="p-2 border">Stock</th>
      <th className="p-2 border">Cost Price</th>
      <th className="p-2 border">Selling Price</th>
      <th className="p-2 border">Actions</th>
    </tr>
  );
};

export default Headers;
